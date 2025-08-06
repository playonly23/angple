import { writable } from 'svelte/store';
import { browser } from '$app/environment';

// 🎨 테마 스토어 - 현재 활성화된 테마를 관리
export const currentTheme = writable('default');

// 🎯 사용 가능한 테마 목록
export const availableThemes = writable([
    {
        id: 'default',
        name: '기본 테마',
        description: '다모앙의 기본 테마입니다',
        author: 'Damoang Team',
        version: '1.0.0',
        preview: '/themes/default/preview.jpg'
    },
    {
        id: 'modern',
        name: '모던 테마',
        description: '깔끔하고 현대적인 디자인',
        author: 'Damoang Team',
        version: '1.0.0',
        preview: '/themes/modern/preview.jpg'
    },
    {
        id: 'classic',
        name: '클래식 테마',
        description: '전통적인 게시판 스타일',
        author: 'Damoang Team',
        version: '1.0.0',
        preview: '/themes/classic/preview.jpg'
    }
]);

// 🔧 테마 로더 클래스
class ThemeLoader {
    constructor() {
        this.loadedThemes = new Map();
        this.currentThemeId = 'default';
    }

    // 테마 초기화 (브라우저에서만)
    async init() {
        if (!browser) return;
        
        // 로컬스토리지에서 저장된 테마 불러오기
        const savedTheme = localStorage.getItem('damoang-theme');
        if (savedTheme && this.isValidTheme(savedTheme)) {
            await this.switchTheme(savedTheme);
        }
    }

    // 테마 유효성 검사
    isValidTheme(themeId) {
        const validThemes = ['default', 'modern', 'classic'];
        return validThemes.includes(themeId);
    }

    // 테마 스위치
    async switchTheme(themeId) {
        if (!this.isValidTheme(themeId)) {
            console.error(`❌ 유효하지 않은 테마: ${themeId}`);
            return false;
        }

        try {
            // 기존 테마 CSS 제거
            this.removeThemeCSS();
            
            // 새 테마 CSS 로드
            await this.loadThemeCSS(themeId);
            
            // 스토어 업데이트
            currentTheme.set(themeId);
            this.currentThemeId = themeId;
            
            // 로컬스토리지에 저장
            if (browser) {
                localStorage.setItem('damoang-theme', themeId);
            }
            
            console.log(`✅ 테마 변경 완료: ${themeId}`);
            return true;
        } catch (error) {
            console.error(`❌ 테마 로드 실패: ${themeId}`, error);
            return false;
        }
    }

    // 테마 CSS 로드
    async loadThemeCSS(themeId) {
        return new Promise((resolve, reject) => {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = `/themes/${themeId}/theme.css`;
            link.id = `theme-${themeId}`;
            
            link.onload = () => resolve();
            link.onerror = () => reject(new Error(`테마 CSS 로드 실패: ${themeId}`));
            
            document.head.appendChild(link);
        });
    }

    // 기존 테마 CSS 제거
    removeThemeCSS() {
        const existingThemes = document.querySelectorAll('[id^="theme-"]');
        existingThemes.forEach(link => link.remove());
    }

    // 현재 테마 정보 가져오기
    getCurrentThemeInfo() {
        return availableThemes.get().find(theme => theme.id === this.currentThemeId);
    }
}

// 🌟 테마 로더 인스턴스 (싱글톤)
export const themeLoader = new ThemeLoader();

// 🚀 테마 스위치 헬퍼 함수
export const switchTheme = (themeId) => themeLoader.switchTheme(themeId);

// 📱 다크모드 감지 및 자동 테마 적용
export const detectSystemTheme = () => {
    if (!browser) return 'default';
    
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return prefersDark ? 'modern' : 'default';
};

// 🎯 테마 초기화 (앱 시작시 호출)
export const initTheme = async () => {
    await themeLoader.init();
};