<script lang="ts">
    import '../app.css';
    import favicon from '$lib/assets/favicon.png';
    import Header from '$lib/components/layout/header.svelte';
    import Footer from '$lib/components/layout/footer.svelte';
    import LeftBanner from '$lib/components/layout/left-banner.svelte';
    import RightBanner from '$lib/components/layout/right-banner.svelte';

    let { children } = $props();
</script>

<svelte:head>
    <link rel="icon" href={favicon} />
    <title>다모앙 - 미니홈페이지와 소셜 커머스가 결합된 차세대 커뮤니티 플랫폼</title>
    <meta
        name="description"
        content="개인의 창의성을 표현하고 소통하며 비즈니스 기회를 창출할 수 있는 다모앙 플랫폼에서 새로운 디지털 경험을 시작하세요."
    />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
</svelte:head>

<div class="relative flex min-h-screen flex-col bg-white dark:bg-gray-950">
    <!-- 헤더 -->
    <Header />

    <!-- 메인 콘텐츠 영역 -->
    <div class="flex flex-1 justify-center px-4 py-6">
        <!-- 메인 콘텐츠 - 1200px 고정 -->
        <main class="w-full max-w-[1200px] bg-white dark:bg-gray-900">
            <div class="p-6">
                {@render children?.()}
            </div>
        </main>
    </div>

    <!-- 왼쪽 배너 - 절대 위치, 1200px 밖에 배치 -->
    <aside class="fixed left-4 top-1/2 z-30 hidden w-[160px] -translate-y-1/2 xl:block">
        <LeftBanner />
    </aside>

    <!-- 오른쪽 배너 - 절대 위치, 1200px 밖에 배치 -->
    <aside class="fixed right-4 top-1/2 z-30 hidden w-[160px] -translate-y-1/2 xl:block">
        <RightBanner />
    </aside>

    <!-- 푸터 -->
    <Footer />
</div>
