<script lang="ts">
	import { onMount } from 'svelte';
	import favicon from '$lib/assets/favicon.svg';
	import { initTheme, currentTheme } from '$lib/theme/themeStore.js';

	let { children } = $props();
	
	// 테마 초기화
	onMount(async () => {
		await initTheme();
	});
</script>

<svelte:head>
	<title>다모앙 - 차세대 커뮤니티 플랫폼</title>
	<meta name="description" content="싸이월드의 향수와 현대적인 소셜 미디어의 만남" />
	<link rel="icon" href={favicon} />
	<link rel="preconnect" href="https://fonts.googleapis.com">
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
	<link href="https://fonts.googleapis.com/css2?family=Pretendard:wght@300;400;500;600;700&display=swap" rel="stylesheet">
</svelte:head>

<div class="theme-{$currentTheme}">
	<!-- 헤더 -->
	<header class="header">
		<div class="header-container">
			<a href="/" class="logo">
				🏠 다모앙
			</a>
			
			<nav>
				<ul class="nav-menu">
					<li><a href="/board/free">자유게시판</a></li>
					<li><a href="/board/notice">공지사항</a></li>
					<li><a href="/board/qna">Q&A</a></li>
					<li><a href="/board/gallery">갤러리</a></li>
					<li><a href="/feed">피드</a></li>
					<li><a href="/mini">미니홈</a></li>
				</ul>
			</nav>
			
			<div class="header-actions">
				<a href="/login" class="btn btn-secondary">로그인</a>
				<a href="/register" class="btn btn-primary">회원가입</a>
			</div>
		</div>
	</header>

	<!-- 메인 콘텐츠 -->
	<main>
		{@render children?.()}
	</main>

	<!-- 푸터 -->
	<footer class="footer">
		<div class="footer-container">
			<p>&copy; 2024 다모앙. 차세대 커뮤니티 플랫폼</p>
			<div class="footer-links">
				<a href="/about">소개</a>
				<a href="/privacy">개인정보처리방침</a>
				<a href="/terms">이용약관</a>
				<a href="/contact">문의</a>
			</div>
		</div>
	</footer>
</div>

<style>
	:global(body) {
		margin: 0;
		padding: 0;
		font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, system-ui, sans-serif;
	}
	
	.header-actions {
		display: flex;
		gap: 0.5rem;
	}
	
	.footer {
		background: var(--bg-tertiary);
		border-top: 1px solid var(--border-color);
		margin-top: 4rem;
		padding: 2rem 0;
	}
	
	.footer-container {
		max-width: 1200px;
		margin: 0 auto;
		padding: 0 1rem;
		display: flex;
		justify-content: space-between;
		align-items: center;
		color: var(--text-muted);
		font-size: var(--font-size-sm);
	}
	
	.footer-links {
		display: flex;
		gap: 1.5rem;
	}
	
	.footer-links a {
		color: var(--text-muted);
		text-decoration: none;
		transition: color 0.2s;
	}
	
	.footer-links a:hover {
		color: var(--text-primary);
	}
	
	@media (max-width: 768px) {
		.header-actions {
			display: none;
		}
		
		.footer-container {
			flex-direction: column;
			gap: 1rem;
			text-align: center;
		}
		
		.footer-links {
			gap: 1rem;
		}
	}
</style>
