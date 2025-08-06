<script>
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  
  let post = null;
  let loading = true;
  let error = null;
  
  // 댓글 폼 데이터
  let newComment = {
    author: '',
    content: ''
  };
  let submittingComment = false;
  
  // 게시글 ID
  $: postId = $page.params.id;
  
  // 게시글 로드
  async function loadPost() {
    try {
      loading = true;
      const response = await fetch(`http://localhost:8001/api/posts/${postId}`);
      const result = await response.json();
      
      if (result.success) {
        post = result.post;
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
  
  // 댓글 작성
  async function submitComment() {
    if (!newComment.author.trim() || !newComment.content.trim()) {
      alert('작성자와 댓글 내용을 입력해주세요.');
      return;
    }
    
    try {
      submittingComment = true;
      const response = await fetch(`http://localhost:8001/api/posts/${postId}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          author: newComment.author.trim(),
          content: newComment.content.trim()
        })
      });
      
      const result = await response.json();
      
      if (result.success) {
        // 댓글 목록 새로고침
        await loadPost();
        // 폼 초기화
        newComment = { author: '', content: '' };
      } else {
        alert(result.message || '댓글 작성에 실패했습니다.');
      }
    } catch (err) {
      alert('서버에 연결할 수 없습니다.');
      console.error('댓글 작성 오류:', err);
    } finally {
      submittingComment = false;
    }
  }
  
  // 날짜 포맷팅
  function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
  
  // 내용의 줄바꿈을 HTML로 변환
  function formatContent(content) {
    return content.replace(/\n/g, '<br>');
  }
  
  onMount(() => {
    loadPost();
  });
</script>

<svelte:head>
  <title>{post ? post.title : '게시글'} - 다모앙</title>
</svelte:head>

<div class="post-container">
  <!-- 네비게이션 -->
  <nav class="breadcrumb">
    <a href="/">🏠 홈</a>
    <span>></span>
    <a href="/">자유게시판</a>
    <span>></span>
    <span>게시글</span>
  </nav>
  
  {#if loading}
    <div class="loading">
      <div class="spinner"></div>
      <p>게시글을 불러오는 중...</p>
    </div>
  {:else if error}
    <div class="error">
      <h2>❌ 오류 발생</h2>
      <p>{error}</p>
      <button class="btn btn-primary" on:click={() => goto('/')}>
        목록으로 돌아가기
      </button>
    </div>
  {:else if post}
    <!-- 게시글 내용 -->
    <article class="post">
      <header class="post-header">
        {#if post.isNotice}
          <span class="notice-badge">📌 공지</span>
        {/if}
        <h1 class="post-title">{post.title}</h1>
        
        <div class="post-meta">
          <span class="author">👤 {post.author}</span>
          <span class="date">📅 {formatDate(post.createdAt)}</span>
          <span class="views">👁️ {post.viewCount.toLocaleString()}</span>
          <span class="comments">💬 {post.comments ? post.comments.length : 0}</span>
        </div>
      </header>
      
      <div class="post-content">
        {@html formatContent(post.content)}
      </div>
    </article>
    
    <!-- 댓글 섹션 -->
    <section class="comments-section">
      <h2 class="comments-title">
        💬 댓글 {post.comments ? post.comments.length : 0}개
      </h2>
      
      <!-- 댓글 작성 폼 -->
      <div class="comment-form">
        <h3>댓글 작성</h3>
        <div class="form-group">
          <input 
            type="text" 
            class="form-input"
            placeholder="작성자 이름"
            bind:value={newComment.author}
            disabled={submittingComment}
          />
        </div>
        <div class="form-group">
          <textarea 
            class="form-textarea"
            placeholder="댓글을 입력하세요..."
            rows="4"
            bind:value={newComment.content}
            disabled={submittingComment}
          ></textarea>
        </div>
        <button 
          class="btn btn-primary"
          on:click={submitComment}
          disabled={submittingComment}
        >
          {submittingComment ? '작성 중...' : '댓글 작성'}
        </button>
      </div>
      
      <!-- 댓글 목록 -->
      {#if post.comments && post.comments.length > 0}
        <div class="comments-list">
          {#each post.comments as comment (comment.id)}
            <div class="comment">
              <div class="comment-header">
                <span class="comment-author">👤 {comment.author}</span>
                <span class="comment-date">{formatDate(comment.createdAt)}</span>
              </div>
              <div class="comment-content">
                {@html formatContent(comment.content)}
              </div>
            </div>
          {/each}
        </div>
      {:else}
        <div class="no-comments">
          <p>아직 댓글이 없습니다. 첫 번째 댓글을 작성해보세요! 💭</p>
        </div>
      {/if}
    </section>
    
    <!-- 하단 액션 버튼 -->
    <div class="post-actions">
      <button class="btn btn-secondary" on:click={() => goto('/')}>
        📋 목록으로
      </button>
      <button class="btn btn-primary" on:click={() => goto('/board/free/write')}>
        ✏️ 글쓰기
      </button>
    </div>
  {/if}
</div>

<style>
  .post-container {
    max-width: 800px;
    margin: 0 auto;
    padding: 2rem;
  }
  
  .breadcrumb {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 2rem;
    font-size: 0.9rem;
    color: var(--text-secondary);
  }
  
  .breadcrumb a {
    color: var(--primary-color);
    text-decoration: none;
  }
  
  .loading {
    text-align: center;
    padding: 4rem 2rem;
  }
  
  .spinner {
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
  
  .error {
    text-align: center;
    padding: 4rem 2rem;
  }
  
  .post {
    background: var(--bg-primary);
    border-radius: var(--border-radius);
    border: 1px solid var(--border-color);
    margin-bottom: 2rem;
    overflow: hidden;
  }
  
  .post-header {
    padding: 2rem;
    border-bottom: 1px solid var(--border-color);
  }
  
  .notice-badge {
    display: inline-block;
    background: linear-gradient(135deg, #ff6b6b, #ee5a24);
    color: white;
    padding: 0.25rem 0.75rem;
    border-radius: 1rem;
    font-size: 0.8rem;
    font-weight: bold;
    margin-bottom: 1rem;
  }
  
  .post-title {
    font-size: 1.8rem;
    font-weight: bold;
    color: var(--text-primary);
    margin: 0 0 1rem 0;
    line-height: 1.3;
  }
  
  .post-meta {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    font-size: 0.9rem;
    color: var(--text-secondary);
  }
  
  .post-content {
    padding: 2rem;
    line-height: 1.8;
    color: var(--text-primary);
    font-size: 1.1rem;
  }
  
  .comments-section {
    background: var(--bg-primary);
    border-radius: var(--border-radius);
    border: 1px solid var(--border-color);
    padding: 2rem;
    margin-bottom: 2rem;
  }
  
  .comments-title {
    font-size: 1.5rem;
    font-weight: bold;
    color: var(--text-primary);
    margin: 0 0 2rem 0;
    padding-bottom: 1rem;
    border-bottom: 2px solid var(--primary-color);
  }
  
  .comment-form {
    background: var(--bg-secondary);
    padding: 1.5rem;
    border-radius: var(--border-radius);
    margin-bottom: 2rem;
  }
  
  .comment-form h3 {
    margin: 0 0 1rem 0;
    color: var(--text-primary);
  }
  
  .form-group {
    margin-bottom: 1rem;
  }
  
  .form-input, .form-textarea {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid var(--border-color);
    border-radius: var(--border-radius);
    font-size: 1rem;
    background: var(--bg-primary);
    color: var(--text-primary);
  }
  
  .form-input:focus, .form-textarea:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 2px rgba(102, 126, 234, 0.1);
  }
  
  .form-textarea {
    resize: vertical;
    min-height: 100px;
  }
  
  .comments-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  
  .comment {
    background: var(--bg-secondary);
    padding: 1.5rem;
    border-radius: var(--border-radius);
    border-left: 4px solid var(--primary-color);
  }
  
  .comment-header {
    display: flex;
    gap: 1rem;
    margin-bottom: 0.75rem;
    font-size: 0.9rem;
    color: var(--text-secondary);
  }
  
  .comment-content {
    color: var(--text-primary);
    line-height: 1.6;
  }
  
  .no-comments {
    text-align: center;
    padding: 3rem;
    color: var(--text-secondary);
  }
  
  .post-actions {
    display: flex;
    gap: 1rem;
    justify-content: center;
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
  
  .btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
  
  @media (max-width: 768px) {
    .post-container {
      padding: 1rem;
    }
    
    .post-header, .post-content, .comments-section {
      padding: 1.5rem;
    }
    
    .post-meta {
      font-size: 0.8rem;
    }
    
    .post-actions {
      flex-direction: column;
    }
  }
</style>