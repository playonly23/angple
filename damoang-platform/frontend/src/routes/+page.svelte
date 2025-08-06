<script>
  import BoardList from '../themes/default/components/BoardList.svelte';
  import Sidebar from '../themes/default/components/Sidebar.svelte';
</script>

<svelte:head>
  <title>다모앙 - 차세대 커뮤니티 플랫폼</title>
  <meta name="description" content="싸이월드의 향수와 현대적인 소셜 미디어의 만남" />
</svelte:head>

<div class="main-container">
  <!-- 메인 콘텐츠 영역 -->
  <div class="content-area">
    <!-- 환영 메시지 -->
    <div class="welcome-section fade-in">
      <h1>🏠 다모앙에 오신 것을 환영합니다!</h1>
      <p>차세대 커뮤니티 플랫폼과 함께 새로운 소통의 경험을 시작하세요</p>
    </div>
    
    <!-- 메인 게시판 (자유게시판) -->
    <BoardList 
      boardName="free"
      boardTitle="🔥 실시간 인기글"
      boardDescription="지금 가장 핫한 이야기들을 확인해보세요"
    />
  </div>
  
  <!-- 사이드바 -->
  <Sidebar />
</div>

<style>
  .welcome-section {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    text-align: center;
    padding: 3rem 2rem;
    border-radius: var(--border-radius);
    margin-bottom: 2rem;
    box-shadow: var(--shadow-lg);
  }
  
  .welcome-section h1 {
    font-size: 2.5rem;
    font-weight: bold;
    margin: 0 0 1rem 0;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  }
  
  .welcome-section p {
    font-size: 1.25rem;
    margin: 0;
    opacity: 0.9;
    line-height: 1.6;
  }
  
  @media (max-width: 768px) {
    .welcome-section {
      padding: 2rem 1rem;
    }
    
    .welcome-section h1 {
      font-size: 2rem;
    }
    
    .welcome-section p {
      font-size: 1rem;
    }
  }
</style>