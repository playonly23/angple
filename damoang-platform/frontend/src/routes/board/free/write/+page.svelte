<script>
  import { goto } from '$app/navigation';
  
  // 폼 데이터
  let formData = {
    title: '',
    content: '',
    author: ''
  };
  
  let submitting = false;
  let errors = {};
  
  // 폼 검증
  function validateForm() {
    errors = {};
    
    if (!formData.title.trim()) {
      errors.title = '제목을 입력해주세요.';
    } else if (formData.title.trim().length < 2) {
      errors.title = '제목은 2자 이상 입력해주세요.';
    }
    
    if (!formData.content.trim()) {
      errors.content = '내용을 입력해주세요.';
    } else if (formData.content.trim().length < 10) {
      errors.content = '내용은 10자 이상 입력해주세요.';
    }
    
    if (!formData.author.trim()) {
      errors.author = '작성자를 입력해주세요.';
    }
    
    return Object.keys(errors).length === 0;
  }
  
  // 게시글 작성 제출
  async function submitPost() {
    if (!validateForm()) {
      return;
    }
    
    try {
      submitting = true;
      
      const response = await fetch('http://localhost:8001/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: formData.title.trim(),
          content: formData.content.trim(), 
          author: formData.author.trim()
        })
      });
      
      const result = await response.json();
      
      if (result.success) {
        alert('게시글이 작성되었습니다! 🎉');
        goto(`/board/free/post/${result.post.id}`);
      } else {
        alert(result.message || '게시글 작성에 실패했습니다.');
      }
    } catch (err) {
      alert('서버에 연결할 수 없습니다.');
      console.error('게시글 작성 오류:', err);
    } finally {
      submitting = false;
    }
  }
  
  // 취소
  function handleCancel() {
    if (formData.title || formData.content || formData.author) {
      if (confirm('작성 중인 내용이 있습니다. 정말 취소하시겠습니까?')) {
        goto('/');
      }
    } else {
      goto('/');
    }
  }
</script>

<svelte:head>
  <title>글쓰기 - 자유게시판 - 다모앙</title>
</svelte:head>

<div class="write-container">
  <!-- 네비게이션 -->
  <nav class="breadcrumb">
    <a href="/">🏠 홈</a>
    <span>></span>
    <a href="/">자유게시판</a>
    <span>></span>
    <span>글쓰기</span>
  </nav>
  
  <!-- 페이지 헤더 -->
  <header class="page-header">
    <h1>✏️ 글쓰기</h1>
    <p>자유롭게 이야기를 나누어 보세요!</p>
  </header>
  
  <!-- 글쓰기 폼 -->
  <form class="write-form" on:submit|preventDefault={submitPost}>
    <!-- 작성자 -->
    <div class="form-group">
      <label for="author" class="form-label">
        👤 작성자 <span class="required">*</span>
      </label>
      <input 
        id="author"
        type="text" 
        class="form-input {errors.author ? 'error' : ''}"
        placeholder="작성자 이름을 입력하세요"
        bind:value={formData.author}
        disabled={submitting}
      />
      {#if errors.author}
        <div class="error-message">{errors.author}</div>
      {/if}
    </div>
    
    <!-- 제목 -->
    <div class="form-group">
      <label for="title" class="form-label">
        📝 제목 <span class="required">*</span>
      </label>
      <input 
        id="title"
        type="text" 
        class="form-input {errors.title ? 'error' : ''}"
        placeholder="제목을 입력하세요"
        bind:value={formData.title}
        disabled={submitting}
        maxlength="100"
      />
      <div class="input-help">
        {formData.title.length}/100
      </div>
      {#if errors.title}
        <div class="error-message">{errors.title}</div>
      {/if}
    </div>
    
    <!-- 내용 -->
    <div class="form-group">
      <label for="content" class="form-label">
        📄 내용 <span class="required">*</span>
      </label>
      <textarea 
        id="content"
        class="form-textarea {errors.content ? 'error' : ''}"
        placeholder="내용을 입력하세요&#10;&#10;- 줄바꿈은 자동으로 적용됩니다&#10;- 최소 10자 이상 입력해주세요&#10;- 서로 존중하는 마음으로 작성해주세요 😊"
        rows="15"
        bind:value={formData.content}
        disabled={submitting}
      ></textarea>
      <div class="input-help">
        {formData.content.length}자
      </div>
      {#if errors.content}
        <div class="error-message">{errors.content}</div>
      {/if}
    </div>
    
    <!-- 작성 가이드 -->
    <div class="writing-guide">
      <h3>💡 글쓰기 가이드</h3>
      <ul>
        <li>건전하고 유익한 내용으로 작성해주세요</li>
        <li>다른 사용자를 존중하는 마음으로 작성해주세요</li>
        <li>개인정보나 민감한 정보는 포함하지 마세요</li>
        <li>스팸이나 광고성 내용은 삭제될 수 있습니다</li>
      </ul>
    </div>
    
    <!-- 액션 버튼 -->
    <div class="form-actions">
      <button 
        type="button" 
        class="btn btn-secondary"
        on:click={handleCancel}
        disabled={submitting}
      >
        취소
      </button>
      
      <button 
        type="submit" 
        class="btn btn-primary"
        disabled={submitting}
      >
        {submitting ? '작성 중...' : '🚀 게시글 작성'}
      </button>
    </div>
  </form>
</div>

<style>
  .write-container {
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
  
  .page-header {
    text-align: center;
    margin-bottom: 3rem;
    padding: 2rem;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border-radius: var(--border-radius);
  }
  
  .page-header h1 {
    font-size: 2rem;
    font-weight: bold;
    margin: 0 0 0.5rem 0;
  }
  
  .page-header p {
    font-size: 1.1rem;
    margin: 0;
    opacity: 0.9;
  }
  
  .write-form {
    background: var(--bg-primary);
    padding: 2rem;
    border-radius: var(--border-radius);
    border: 1px solid var(--border-color);
  }
  
  .form-group {
    margin-bottom: 2rem;
  }
  
  .form-label {
    display: block;
    font-weight: 600;
    color: var(--text-primary);
    margin-bottom: 0.5rem;
    font-size: 1.1rem;
  }
  
  .required {
    color: #e74c3c;
  }
  
  .form-input, .form-textarea {
    width: 100%;
    padding: 1rem;
    border: 2px solid var(--border-color);
    border-radius: var(--border-radius);
    font-size: 1rem;
    background: var(--bg-secondary);
    color: var(--text-primary);
    transition: border-color 0.2s, box-shadow 0.2s;
    font-family: inherit;
  }
  
  .form-input:focus, .form-textarea:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }
  
  .form-input.error, .form-textarea.error {
    border-color: #e74c3c;
  }
  
  .form-textarea {
    resize: vertical;
    min-height: 300px;
    line-height: 1.6;
  }
  
  .input-help {
    text-align: right;
    font-size: 0.85rem;
    color: var(--text-secondary);
    margin-top: 0.25rem;
  }
  
  .error-message {
    color: #e74c3c;
    font-size: 0.9rem;
    margin-top: 0.5rem;
    display: flex;
    align-items: center;
    gap: 0.25rem;
  }
  
  .error-message:before {
    content: '⚠️';
  }
  
  .writing-guide {
    background: var(--bg-secondary);
    padding: 1.5rem;
    border-radius: var(--border-radius);
    margin-bottom: 2rem;
    border-left: 4px solid var(--primary-color);
  }
  
  .writing-guide h3 {
    margin: 0 0 1rem 0;
    color: var(--text-primary);
    font-size: 1.1rem;
  }
  
  .writing-guide ul {
    margin: 0;
    padding-left: 1.5rem;
    color: var(--text-secondary);
  }
  
  .writing-guide li {
    margin-bottom: 0.5rem;
    line-height: 1.5;
  }
  
  .form-actions {
    display: flex;
    gap: 1rem;
    justify-content: center;
    padding-top: 1rem;
    border-top: 1px solid var(--border-color);
  }
  
  .btn {
    padding: 1rem 2rem;
    border-radius: var(--border-radius);
    border: none;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    min-width: 120px;
    justify-content: center;
  }
  
  .btn-primary {
    background: var(--primary-color);
    color: white;
  }
  
  .btn-primary:hover:not(:disabled) {
    background: var(--primary-hover);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
  }
  
  .btn-secondary {
    background: var(--bg-secondary);
    color: var(--text-primary);
    border: 2px solid var(--border-color);
  }
  
  .btn-secondary:hover:not(:disabled) {
    background: var(--bg-primary);
    border-color: var(--text-secondary);
  }
  
  .btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none !important;
  }
  
  @media (max-width: 768px) {
    .write-container {
      padding: 1rem;
    }
    
    .write-form {
      padding: 1.5rem;
    }
    
    .page-header {
      padding: 1.5rem;
    }
    
    .page-header h1 {
      font-size: 1.5rem;
    }
    
    .form-actions {
      flex-direction: column;
    }
    
    .btn {
      width: 100%;
    }
  }
</style>