# 🎨 다모앙 테마 개발 가이드

> **다모앙 플랫폼을 위한 완전한 테마 개발 가이드**

## 📋 목차
- [소개](#소개)
- [테마 구조](#테마-구조)
- [개발 환경 설정](#개발-환경-설정)
- [기본 테마 분석](#기본-테마-분석)
- [새 테마 만들기](#새-테마-만들기)
- [테마 컴포넌트](#테마-컴포넌트)
- [스타일 가이드](#스타일-가이드)
- [테마 배포](#테마-배포)

---

## 🌟 소개

다모앙은 **그누보드**와 **워드프레스** 스타일의 테마 시스템을 제공합니다. 개발자들이 쉽게 새로운 테마를 만들고 배포할 수 있도록 설계되었습니다.

### ✨ 테마 시스템의 장점
- 🔄 **실시간 테마 전환** - 페이지 새로고침 없이 즉시 변경
- 🎨 **완전한 커스터마이징** - CSS부터 컴포넌트까지 모든 것을 수정 가능
- 📱 **반응형 기본 지원** - 모바일 우선 설계
- 🔌 **플러그인 호환** - 다양한 플러그인과 완벽 연동

---

## 🏗️ 테마 구조

### 📂 기본 폴더 구조

```
themes/
├── default/                    # 기본 테마
│   ├── components/            # Svelte 컴포넌트
│   │   ├── BoardList.svelte  # 게시판 목록 컴포넌트
│   │   ├── Sidebar.svelte    # 사이드바 컴포넌트
│   │   ├── PostDetail.svelte # 게시글 상세 컴포넌트
│   │   └── Header.svelte     # 헤더 컴포넌트
│   └── theme.json            # 테마 메타정보
├── modern/                     # 모던 테마
└── classic/                    # 클래식 테마

static/
└── themes/                     # 테마 정적 파일
    ├── default/
    │   ├── theme.css          # 메인 CSS
    │   ├── preview.jpg        # 테마 미리보기
    │   └── assets/            # 이미지, 폰트 등
    ├── modern/
    └── classic/
```

### 📄 theme.json 구조

```json
{
  "id": "default",
  "name": "기본 테마",
  "description": "다모앙의 기본 테마입니다",
  "version": "1.0.0",
  "author": "Damoang Team",
  "homepage": "https://damoang.dev",
  "repository": "https://github.com/damoang/theme-default",
  "license": "MIT",
  "tags": ["기본", "깔끔", "반응형"],
  "supports": {
    "darkMode": false,
    "rtl": false,
    "customColors": true,
    "customFonts": true
  },
  "screenshots": [
    "/themes/default/preview.jpg",
    "/themes/default/preview-mobile.jpg"
  ],
  "demo": "https://demo.damoang.dev/theme/default"
}
```

---

## ⚙️ 개발 환경 설정

### 1. 프로젝트 클론 및 설치

```bash
# 프로젝트 클론
git clone https://github.com/damoang/damoang-platform.git
cd damoang-platform

# 의존성 설치
cd frontend
npm install

# 개발 서버 시작
npm run dev
```

### 2. 테마 개발 모드 활성화

```bash
# 환경변수 설정
echo "VITE_THEME_DEV=true" >> .env.local

# 핫 리로드 활성화
echo "VITE_THEME_HOT_RELOAD=true" >> .env.local
```

---

## 🔍 기본 테마 분석

### CSS 변수 시스템

기본 테마는 **CSS Custom Properties**를 사용하여 일관된 디자인을 제공합니다:

```css
:root {
  /* 🎨 컬러 팔레트 */
  --primary-color: #3b82f6;
  --primary-hover: #2563eb;
  --secondary-color: #64748b;
  
  /* 배경색 */
  --bg-primary: #ffffff;
  --bg-secondary: #f8fafc;
  --bg-tertiary: #f1f5f9;
  
  /* 텍스트 색상 */
  --text-primary: #1e293b;
  --text-secondary: #64748b;
  --text-muted: #94a3b8;
}
```

### 컴포넌트 클래스 규칙

```css
/* ✅ 좋은 예 - 네임스페이스 사용 */
.theme-default .board-container { }
.theme-default .post-item { }
.theme-default .sidebar { }

/* ❌ 나쁜 예 - 글로벌 클래스 */
.container { }
.item { }
```

---

## 🆕 새 테마 만들기

### 1단계: 테마 폴더 생성

```bash
# 테마 폴더 생성
mkdir -p frontend/src/themes/mytheme
mkdir -p frontend/static/themes/mytheme

# 기본 파일 생성
touch frontend/src/themes/mytheme/theme.json
touch frontend/static/themes/mytheme/theme.css
```

### 2단계: theme.json 작성

```json
{
  "id": "mytheme",
  "name": "나만의 테마",
  "description": "개성 넘치는 나만의 테마",
  "version": "1.0.0",
  "author": "Your Name",
  "tags": ["개성", "독창적", "현대적"]
}
```

### 3단계: CSS 기본 구조 작성

```css
/* 🎨 나만의 테마 CSS */

:root {
  /* 고유한 컬러 팔레트 */
  --primary-color: #8b5cf6;
  --primary-hover: #7c3aed;
  --accent-color: #f59e0b;
  
  /* 배경 - 다크모드 스타일 */
  --bg-primary: #1f2937;
  --bg-secondary: #111827;
  --bg-tertiary: #374151;
  
  /* 텍스트 */
  --text-primary: #f9fafb;
  --text-secondary: #d1d5db;
  --text-muted: #9ca3af;
}

/* 테마 기본 스타일 */
.theme-mytheme {
  font-family: 'Inter', sans-serif;
  background: var(--bg-secondary);
  color: var(--text-primary);
}

/* 게시판 스타일 재정의 */
.theme-mytheme .board-container {
  background: var(--bg-primary);
  border: 2px solid var(--primary-color);
  border-radius: 1rem;
  box-shadow: 0 0 20px rgba(139, 92, 246, 0.3);
}
```

### 4단계: 테마 등록

```javascript
// lib/theme/themeStore.js에 추가
export const availableThemes = writable([
  // ... 기존 테마들
  {
    id: 'mytheme',
    name: '나만의 테마',
    description: '개성 넘치는 나만의 테마',
    author: 'Your Name',
    version: '1.0.0',
    preview: '/themes/mytheme/preview.jpg'
  }
]);
```

---

## 🧩 테마 컴포넌트

### BoardList 컴포넌트 커스터마이징

```svelte
<!-- themes/mytheme/components/BoardList.svelte -->
<script>
  // 기본 BoardList의 모든 props 상속
  export let boardName = 'free';
  export let boardTitle = '게시판';
  export let boardDescription = '';
  
  // 테마별 추가 기능
  let viewMode = 'list'; // 'list' | 'grid' | 'card'
  
  function toggleViewMode() {
    viewMode = viewMode === 'list' ? 'grid' : 
               viewMode === 'grid' ? 'card' : 'list';
  }
</script>

<div class="mytheme-board">
  <!-- 뷰 모드 토글 버튼 추가 -->
  <div class="board-controls">
    <button class="view-toggle" on:click={toggleViewMode}>
      {viewMode === 'list' ? '📋' : viewMode === 'grid' ? '⌗' : '🗃️'}
    </button>
  </div>
  
  <!-- 기본 게시판 기능 + 커스텀 스타일 -->
  <div class="board-content {viewMode}">
    <!-- 게시글 목록 ... -->
  </div>
</div>

<style>
  .mytheme-board {
    /* 테마별 고유 스타일 */
  }
</style>
```

### 컴포넌트 오버라이드 시스템

```javascript
// lib/theme/componentLoader.js
export async function loadThemeComponent(themeName, componentName) {
  try {
    // 테마별 컴포넌트가 있는지 확인
    const themeComponent = await import(`../themes/${themeName}/components/${componentName}.svelte`);
    return themeComponent.default;
  } catch {
    // 없으면 기본 컴포넌트 사용
    const defaultComponent = await import(`../themes/default/components/${componentName}.svelte`);
    return defaultComponent.default;
  }
}
```

---

## 🎨 스타일 가이드

### 색상 시스템

```css
/* 📝 색상 명명 규칙 */

/* 기능별 색상 */
--color-primary: #3b82f6;      /* 주요 액션 */
--color-secondary: #64748b;    /* 보조 액션 */
--color-success: #10b981;      /* 성공 메시지 */
--color-warning: #f59e0b;      /* 경고 메시지 */
--color-error: #ef4444;        /* 오류 메시지 */

/* 의미별 색상 */
--color-bg-primary: #ffffff;   /* 주 배경 */
--color-bg-secondary: #f8fafc; /* 보조 배경 */
--color-text-primary: #1e293b; /* 주 텍스트 */
--color-text-secondary: #64748b; /* 보조 텍스트 */
```

### 타이포그래피

```css
/* 📖 텍스트 스케일 */
--font-size-xs: 0.75rem;    /* 12px */
--font-size-sm: 0.875rem;   /* 14px */
--font-size-base: 1rem;     /* 16px */
--font-size-lg: 1.125rem;   /* 18px */
--font-size-xl: 1.25rem;    /* 20px */
--font-size-2xl: 1.5rem;    /* 24px */
--font-size-3xl: 1.875rem;  /* 30px */

/* 📏 라인 높이 */
--line-height-tight: 1.25;
--line-height-normal: 1.5;
--line-height-relaxed: 1.75;
```

### 간격 시스템

```css
/* 📐 스페이싱 */
--spacing-1: 0.25rem;  /* 4px */
--spacing-2: 0.5rem;   /* 8px */
--spacing-3: 0.75rem;  /* 12px */
--spacing-4: 1rem;     /* 16px */
--spacing-6: 1.5rem;   /* 24px */
--spacing-8: 2rem;     /* 32px */
--spacing-12: 3rem;    /* 48px */
--spacing-16: 4rem;    /* 64px */
```

---

## 📱 반응형 디자인

### 브레이크포인트

```css
/* 📱 모바일 우선 반응형 */

/* 모바일 (기본) */
.theme-mytheme .board-container {
  padding: 1rem;
  grid-template-columns: 1fr;
}

/* 태블릿 */
@media (min-width: 768px) {
  .theme-mytheme .board-container {
    padding: 1.5rem;
    grid-template-columns: 1fr 300px;
  }
}

/* 데스크톱 */
@media (min-width: 1024px) {
  .theme-mytheme .board-container {
    padding: 2rem;
    max-width: 1200px;
    margin: 0 auto;
  }
}

/* 와이드 스크린 */
@media (min-width: 1280px) {
  .theme-mytheme .board-container {
    max-width: 1400px;
  }
}
```

---

## 🔌 플러그인 연동

### 플러그인 훅 시스템

```javascript
// 테마에서 플러그인 훅 사용
import { pluginHooks } from '$lib/plugins/hookSystem.js';

// 게시글 렌더링 전 훅
pluginHooks.beforePostRender.subscribe((postData) => {
  // 테마별 커스텀 처리
  return enhancePostData(postData);
});

// 게시글 렌더링 후 훅
pluginHooks.afterPostRender.subscribe((element) => {
  // DOM 조작 또는 이벤트 추가
  addThemeSpecificFeatures(element);
});
```

### 플러그인 스타일 오버라이드

```css
/* 플러그인 스타일 테마별 커스터마이징 */
.theme-mytheme .plugin-social-share {
  background: var(--primary-color);
  border-radius: 2rem;
  box-shadow: 0 4px 12px rgba(139, 92, 246, 0.4);
}

.theme-mytheme .plugin-comment-box {
  border: 2px solid var(--accent-color);
  background: var(--bg-primary);
}
```

---

## 🚀 테마 최적화

### 성능 최적화

```css
/* 🏃‍♂️ 성능 최적화 팁 */

/* GPU 가속 사용 */
.theme-mytheme .smooth-animation {
  transform: translateZ(0);
  will-change: transform;
}

/* 효율적인 선택자 사용 */
.theme-mytheme .post-item { /* ✅ 좋음 */ }
.theme-mytheme div.post-item { /* ❌ 비효율적 */ }

/* 미디어 쿼리 그룹화 */
@media (max-width: 768px) {
  .theme-mytheme .header { /* ... */ }
  .theme-mytheme .sidebar { /* ... */ }
  .theme-mytheme .footer { /* ... */ }
}
```

### 리소스 최적화

```css
/* 🖼️ 이미지 최적화 */
.theme-mytheme .hero-image {
  background-image: 
    image-set(
      "/themes/mytheme/hero.webp" type("image/webp"),
      "/themes/mytheme/hero.jpg" type("image/jpeg")
    );
}

/* 📱 고해상도 대응 */
@media (-webkit-min-device-pixel-ratio: 2) {
  .theme-mytheme .logo {
    background-image: url("/themes/mytheme/logo@2x.png");
    background-size: 200px 50px;
  }
}
```

---

## 🧪 테마 테스트

### 자동화된 테스트

```javascript
// tests/theme.test.js
import { render } from '@testing-library/svelte';
import { switchTheme } from '$lib/theme/themeStore.js';
import BoardList from '$themes/mytheme/components/BoardList.svelte';

describe('MyTheme Components', () => {
  beforeEach(async () => {
    await switchTheme('mytheme');
  });

  test('BoardList renders correctly', () => {
    const { getByText } = render(BoardList, {
      boardTitle: '테스트 게시판'
    });
    
    expect(getByText('테스트 게시판')).toBeInTheDocument();
  });

  test('Theme styles are applied', () => {
    const element = document.querySelector('.theme-mytheme');
    expect(element).toHaveClass('theme-mytheme');
  });
});
```

### 수동 테스트 체크리스트

- [ ] 모든 페이지에서 테마가 정상 적용되는가?
- [ ] 모바일/태블릿/데스크톱에서 레이아웃이 깨지지 않는가?
- [ ] 다크모드/라이트모드 전환이 정상 작동하는가?
- [ ] 접근성 기준을 충족하는가? (색대비, 키보드 네비게이션)
- [ ] 플러그인과 충돌하지 않는가?

---

## 📦 테마 배포

### 1단계: 테마 패키징

```bash
# 테마 빌드
npm run build:theme mytheme

# 압축 파일 생성
tar -czf mytheme-v1.0.0.tar.gz themes/mytheme/ static/themes/mytheme/
```

### 2단계: 테마 검증

```bash
# 테마 유효성 검사
npm run validate:theme mytheme

# 스크린샷 생성
npm run screenshot:theme mytheme
```

### 3단계: 배포

```bash
# 다모앙 테마 스토어에 업로드
damoang-cli theme publish mytheme-v1.0.0.tar.gz

# GitHub 릴리즈 생성
gh release create v1.0.0 mytheme-v1.0.0.tar.gz
```

---

## 🤝 기여하기

### 테마 기여 가이드라인

1. **이슈 생성**: 새 테마 아이디어를 이슈로 등록
2. **브랜치 생성**: `theme/테마명` 형식으로 브랜치 생성
3. **개발**: 이 가이드를 따라 테마 개발
4. **테스트**: 모든 테스트 통과 확인
5. **PR 생성**: 상세한 설명과 함께 풀 리퀘스트 생성

### 코드 리뷰 체크포인트

- [ ] CSS 변수 시스템 준수
- [ ] 네임스페이스 클래스 사용
- [ ] 반응형 디자인 구현
- [ ] 접근성 기준 충족
- [ ] 성능 최적화 적용
- [ ] 테스트 코드 작성

---

## 🔗 참고 자료

- [SvelteKit 공식 문서](https://kit.svelte.dev/)
- [CSS Custom Properties](https://developer.mozilla.org/en-US/docs/Web/CSS/--*)
- [웹 접근성 가이드](https://www.w3.org/WAI/WCAG21/quickref/)
- [다모앙 디자인 시스템](https://design.damoang.dev)

---

## 💬 커뮤니티

- 💭 [GitHub Discussions](https://github.com/damoang/damoang-platform/discussions)
- 🐦 [Twitter @damoang_dev](https://twitter.com/damoang_dev)
- 💬 [Discord 서버](https://discord.gg/damoang)
- 📧 [이메일 문의](mailto:themes@damoang.dev)

---

<div align="center">
  <strong>🎨 멋진 테마로 다모앙을 더욱 아름답게 만들어주세요! ✨</strong>
</div>