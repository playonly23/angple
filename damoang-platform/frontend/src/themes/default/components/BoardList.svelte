<script>
  import { onMount } from 'svelte';
  
  // Props
  export let boardName = 'free';
  export let boardTitle = '자유게시판';
  export let boardDescription = '자유롭게 소통하는 공간입니다';
  
  // 게시글 데이터
  let posts = [];
  let loading = true;
  let error = null;
  
  // 페이지네이션
  let currentPage = 1;
  let totalPages = 5;
  let searchQuery = '';
  
  // 게시글 목록 로드
  async function loadPosts() {
    try {
      loading = true;
      error = null;
      
      const response = await fetch('http://localhost:8001/api/posts');
      const result = await response.json();
      
      if (result.success) {
        posts = result.posts;
        totalPages = Math.ceil(result.total / 10); // 페이지당 10개씩
      } else {
        error = result.message || '게시글을 불러올 수 없습니다.';
      }
    } catch (err) {
      error = '서버에 연결할 수 없습니다.';
      console.error('게시글 로드 오류:', err);
    } finally {
      loading = false;
    }
  }
  
  // 검색 함수
  function handleSearch() {
    console.log('검색:', searchQuery);
    // TODO: 검색 API 구현
    loadPosts();
  }
  
  onMount(() => {
    loadPosts();
  });
  
  // 날짜 포맷팅
  function formatDate(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return '오늘';
    if (diffDays === 2) return '어제';
    if (diffDays <= 7) return `${diffDays-1}일 전`;
    
    return date.toLocaleDateString('ko-KR');
  }
</script>

<div class="board-container fade-in">
  <!-- 게시판 헤더 -->
  <div class="board-header">
    <h1 class="board-title">{boardTitle}</h1>
    <p class="board-description">{boardDescription}</p>
  </div>
  
  <!-- 게시판 액션 (검색, 글쓰기) -->
  <div class="board-actions">
    <div class="search-form">
      <input 
        type="text" 
        class="search-input" 
        placeholder="게시글 검색..." 
        bind:value={searchQuery}
        on:keydown={(e) => e.key === 'Enter' && handleSearch()}
      />
      <button class="btn btn-secondary" on:click={handleSearch}>
        🔍 검색
      </button>
    </div>
    
    <a href="/board/{boardName}/write" class="btn btn-primary">
      ✏️ 글쓰기
    </a>
  </div>
  
  <!-- 게시글 목록 -->
  {#if loading}
    <div class="loading">
      <div class="spinner"></div>
      <p>게시글을 불러오는 중...</p>
    </div>
  {:else if error}
    <div class="error">
      <h3>❌ 오류 발생</h3>
      <p>{error}</p>
      <button class="btn btn-primary" on:click={loadPosts}>다시 시도</button>
    </div>
  {:else if posts.length === 0}
    <div class="empty">
      <h3>📝 첫 번째 게시글을 작성해보세요!</h3>
      <p>아직 게시글이 없습니다.</p>
      <a href="/board/{boardName}/write" class="btn btn-primary">
        ✏️ 글쓰기
      </a>
    </div>
  {:else}
    <ul class="post-list">
      {#each posts as post (post.id)}
        <li class="post-item {post.isNotice ? 'notice' : ''}">
          <div class="post-number">
            {post.isNotice ? '📌' : post.id}
          </div>
          
          <div class="post-content">
            <a href="/board/{boardName}/post/{post.id}" class="post-title">
              {post.title}
              {#if post.commentCount > 0}
                <span class="comment-badge">{post.commentCount}</span>
              {/if}
            </a>
            
            <div class="post-meta">
              <span>👤 {post.author}</span>
              <span>📅 {formatDate(post.createdAt)}</span>
            </div>
          </div>
          
          <div class="post-stats">
            <span>👁️ {post.viewCount.toLocaleString()}</span>
            <span>💬 {post.commentCount}</span>
          </div>
        </li>
      {/each}
    </ul>
  {/if}
  
  <!-- 페이지네이션 -->
  <div class="pagination">
    <button 
      class="btn btn-secondary" 
      disabled={currentPage === 1}
      on:click={() => currentPage--}
    >
      ← 이전
    </button>
    
    <div class="page-numbers">
      {#each Array(totalPages) as _, i}
        <button 
          class="page-btn {currentPage === i + 1 ? 'active' : ''}"
          on:click={() => currentPage = i + 1}
        >
          {i + 1}
        </button>
      {/each}
    </div>
    
    <button 
      class="btn btn-secondary"
      disabled={currentPage === totalPages}
      on:click={() => currentPage++}
    >
      다음 →
    </button>
  </div>
</div>

<style>
  .loading, .error, .empty {
    text-align: center;
    padding: 4rem 2rem;
    color: var(--text-secondary);
  }
  
  .loading .spinner {
    width: 40px;
    height: 40px;
    border: 4px solid #f3f3f3;
    border-top: 4px solid var(--primary-color);
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin: 0 auto 1rem;
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  
  .error h3, .empty h3 {
    color: var(--text-primary);
    margin-bottom: 1rem;
  }
  
  .error .btn, .empty .btn {
    margin-top: 1rem;
  }
  
  .btn {
    padding: 0.75rem 1.5rem;
    border-radius: var(--border-radius);
    border: none;
    font-size: 1rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
  }
  
  .btn-primary {
    background: var(--primary-color);
    color: white;
  }
  
  .btn-primary:hover {
    background: var(--primary-hover);
    transform: translateY(-1px);
  }
  
  .btn-secondary {
    background: var(--bg-secondary);
    color: var(--text-primary);
    border: 1px solid var(--border-color);
  }
  
  .btn-secondary:hover {
    background: var(--bg-primary);
  }
  
  .pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    padding: 2rem;
    border-top: 1px solid var(--border-color);
  }
  
  .page-numbers {
    display: flex;
    gap: 0.5rem;
  }
  
  .page-btn {
    padding: 0.5rem 0.75rem;
    border: 1px solid var(--border-color);
    background: var(--bg-primary);
    color: var(--text-secondary);
    border-radius: var(--border-radius);
    cursor: pointer;
    transition: all 0.2s;
  }
  
  .page-btn:hover {
    background: var(--bg-secondary);
  }
  
  .page-btn.active {
    background: var(--primary-color);
    color: white;
    border-color: var(--primary-color);
  }
  
  @media (max-width: 768px) {
    .pagination {
      flex-direction: column;
      gap: 1rem;
    }
    
    .page-numbers {
      flex-wrap: wrap;
      justify-content: center;
    }
  }
</style>