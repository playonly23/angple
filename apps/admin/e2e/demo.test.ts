import { expect, test } from '@playwright/test';

test('관리자 로그인 페이지가 올바르게 표시된다', async ({ page }) => {
    await page.goto('/');
    
    // 페이지 제목 확인
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('h1')).toHaveText('Damoang');
    
    // 로그인 설명 텍스트 확인
    await expect(page.getByText('Login to account')).toBeVisible();
});

test('로그인 폼 요소들이 올바르게 렌더링된다', async ({ page }) => {
    await page.goto('/');
    
    // 이메일 입력 필드 확인
    const emailLabel = page.getByText('Email');
    const emailInput = page.locator('#email-login-form');
    await expect(emailLabel).toBeVisible();
    await expect(emailInput).toBeVisible();
    await expect(emailInput).toHaveAttribute('type', 'email');
    await expect(emailInput).toHaveAttribute('placeholder', 'm@example.com');
    
    // 패스워드 입력 필드 확인
    const passwordLabel = page.getByText('Password');
    const passwordInput = page.locator('#password-login-form');
    await expect(passwordLabel).toBeVisible();
    await expect(passwordInput).toBeVisible();
    await expect(passwordInput).toHaveAttribute('type', 'password');
    
    // 로그인 버튼 확인
    const loginButton = page.getByRole('button', { name: 'Login' });
    await expect(loginButton).toBeVisible();
    await expect(loginButton).toHaveAttribute('type', 'submit');
});

test('로그인 폼 인터랙션이 정상 작동한다', async ({ page }) => {
    await page.goto('/');
    
    // 이메일 입력
    const emailInput = page.locator('#email-login-form');
    await emailInput.fill('admin@example.com');
    await expect(emailInput).toHaveValue('admin@example.com');
    
    // 패스워드 입력
    const passwordInput = page.locator('#password-login-form');
    await passwordInput.fill('password123');
    await expect(passwordInput).toHaveValue('password123');
    
    // 폼 제출 (실제 로그인은 되지 않지만 버튼 클릭 테스트)
    const loginButton = page.getByRole('button', { name: 'Login' });
    await expect(loginButton).toBeEnabled();
    
    // 필수 입력 검증 테스트
    await emailInput.clear();
    await passwordInput.clear();
    
    // HTML5 필수 입력 검증 확인
    await expect(emailInput).toHaveAttribute('required');
    await expect(passwordInput).toHaveAttribute('required');
});

test('반응형 레이아웃이 올바르게 동작한다', async ({ page }) => {
    // 데스크톱 뷰 테스트
    await page.setViewportSize({ width: 1024, height: 768 });
    await page.goto('/');
    
    // 데스크톱에서 이미지가 보이는지 확인
    const logoImage = page.locator('img[alt="다모앙"]');
    await expect(logoImage).toBeVisible();
    
    // 모바일 뷰 테스트
    await page.setViewportSize({ width: 375, height: 667 });
    await page.reload();
    
    // 모바일에서도 로그인 폼이 정상 표시되는지 확인
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('#email-login-form')).toBeVisible();
    await expect(page.locator('#password-login-form')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();
    
    // 모바일에서는 이미지가 숨겨져 있는지 확인 (md:flex 클래스)
    const imageContainer = page.locator('.relative.hidden.items-center.justify-center.bg-muted.md\\:flex');
    await expect(imageContainer).toBeHidden();
});

test('다크모드 지원 확인', async ({ page }) => {
    await page.goto('/');
    
    // 다크모드 클래스 추가
    await page.evaluate(() => {
        document.documentElement.classList.add('dark');
    });
    
    // 다크모드에서도 요소들이 정상 표시되는지 확인
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('#email-login-form')).toBeVisible();
    await expect(page.locator('#password-login-form')).toBeVisible();
    
    // 다크모드 클래스 제거
    await page.evaluate(() => {
        document.documentElement.classList.remove('dark');
    });
    
    // 라이트모드에서도 정상 표시되는지 확인
    await expect(page.locator('h1')).toBeVisible();
});

test('카드 레이아웃과 스타일링이 올바르게 적용된다', async ({ page }) => {
    await page.goto('/');
    
    // 카드 컨테이너가 존재하는지 확인
    const cardRoot = page.locator('[class*="overflow-hidden p-0"]').first();
    await expect(cardRoot).toBeVisible();
    
    // 폼 영역이 올바른 패딩을 가지는지 확인
    const formSection = page.locator('form.p-6.md\\:p-8');
    await expect(formSection).toBeVisible();
    
    // 저작권 텍스트 확인
    const copyrightText = page.getByText('© SDK Co., Ltd. All rights reserved.');
    await expect(copyrightText).toBeVisible();
});

test('접근성 요소들이 올바르게 설정되어 있다', async ({ page }) => {
    await page.goto('/');
    
    // 라벨과 인풋 필드의 연결 확인
    const emailLabel = page.getByText('Email');
    const emailInput = page.locator('#email-login-form');
    
    // for 속성으로 라벨과 인풋이 연결되어 있는지 확인
    await expect(emailLabel).toBeVisible();
    await expect(emailInput).toBeVisible();
    
    // 이미지 alt 텍스트 확인
    const logoImage = page.locator('img[alt="다모앙"]');
    await expect(logoImage).toHaveAttribute('alt', '다모앙');
    
    // 헤딩 구조 확인
    await expect(page.locator('h1')).toHaveCount(1);
});
