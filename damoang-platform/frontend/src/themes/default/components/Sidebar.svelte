<script>
  import { currentTheme, availableThemes, switchTheme } from '$lib/theme/themeStore.js';
  
  // 인기 게시판 더미 데이터
  const popularBoards = [
    { name: 'free', title: '자유게시판', count: 1247 },
    { name: 'notice', title: '공지사항', count: 45 },
    { name: 'qna', title: 'Q&A', count: 892 },
    { name: 'gallery', title: '갤러리', count: 634 },
    { name: 'tech', title: '기술토론', count: 521 }
  ];
  
  // 최신 댓글 더미 데이터
  const recentComments = [
    { 
      postTitle: '다모앙 플랫폼 오픈 베타 시작!',
      author: 'user123',
      content: '정말 기대됩니다!',
      time: '5분 전'
    },
    { 
      postTitle: '테마 시스템이 정말 좋네요',
      author: 'designer',
      content: 'UI가 깔끔하네요',
      time: '12분 전'
    },
    { 
      postTitle: '미니홈페이지 기능 언제...',
      author: 'waiting_user',
      content: '저도 궁금해요',
      time: '1시간 전'
    }
  ];
  
  // 온라인 사용자 더미 데이터
  const onlineUsers = [
    { name: 'admin', status: 'online', avatar: '👤' },
    { name: 'user123', status: 'online', avatar: '🧑‍💻' },
    { name: 'designer', status: 'online', avatar: '🎨' },
    { name: 'developer', status: 'away', avatar: '👨‍💻' }
  ];
  
  // 테마 변경 핸들러
  async function handleThemeChange(event) {
    const newTheme = event.target.value;
    await switchTheme(newTheme);
  }
</script>

<div class="sidebar">
  <!-- 테마 선택 위젯 -->
  <div class="widget">
    <div class="widget-header">
      <h3 class="widget-title">🎨 테마 선택</h3>
    </div>
    <div class="widget-content">
      <select class="theme-selector" on:change={handleThemeChange} value={$currentTheme}>
        {#each $availableThemes as theme}
          <option value={theme.id}>{theme.name}</option>
        {/each}
      </select>
      <p class="theme-description">
        {$availableThemes.find(t => t.id === $currentTheme)?.description}
      </p>
    </div>
  </div>
  
  <!-- 인기 게시판 위젯 -->
  <div class="widget">
    <div class="widget-header">
      <h3 class="widget-title">🔥 인기 게시판</h3>
    </div>
    <div class="widget-content">
      <ul class="board-list">
        {#each popularBoards as board}
          <li class="board-item">
            <a href="/board/{board.name}" class="board-link">
              <span class="board-title">{board.title}</span>
              <span class="board-count">{board.count.toLocaleString()}</span>
            </a>
          </li>
        {/each}
      </ul>
    </div>
  </div>
  
  <!-- 최신 댓글 위젯 -->
  <div class="widget">
    <div class="widget-header">
      <h3 class="widget-title">💬 최신 댓글</h3>
    </div>
    <div class="widget-content">
      <ul class="comment-list">
        {#each recentComments as comment}
          <li class="comment-item">
            <div class="comment-post-title">
              {comment.postTitle.length > 20 
                ? comment.postTitle.substring(0, 20) + '...' 
                : comment.postTitle}
            </div>
            <div class="comment-content">
              "{comment.content}"
            </div>
            <div class="comment-meta">
              <span class="comment-author">👤 {comment.author}</span>
              <span class="comment-time">⏰ {comment.time}</span>
            </div>
          </li>
        {/each}
      </ul>
    </div>
  </div>
  
  <!-- 온라인 사용자 위젯 -->
  <div class="widget">
    <div class="widget-header">
      <h3 class="widget-title">🟢 온라인 사용자</h3>
    </div>
    <div class="widget-content">
      <div class="online-stats">
        <span class="total-users">전체: {onlineUsers.length}명</span>
        <span class="online-count">
          온라인: {onlineUsers.filter(u => u.status === 'online').length}명
        </span>
      </div>
      
      <ul class="user-list">
        {#each onlineUsers as user}
          <li class="user-item">
            <span class="user-avatar">{user.avatar}</span>
            <span class="user-name">{user.name}</span>
            <span class="user-status {user.status}">
              {user.status === 'online' ? '🟢' : '🟡'}
            </span>
          </li>
        {/each}
      </ul>
    </div>
  </div>
  
  <!-- 통계 위젯 -->
  <div class="widget">
    <div class="widget-header">
      <h3 class="widget-title">📊 사이트 통계</h3>
    </div>
    <div class="widget-content">
      <div class="stats-grid">
        <div class="stat-item">
          <div class="stat-number">12,547</div>
          <div class="stat-label">총 게시글</div>
        </div>
        <div class="stat-item">
          <div class="stat-number">8,923</div>
          <div class="stat-label">총 댓글</div>
        </div>
        <div class="stat-item">  
          <div class="stat-number">1,234</div>
          <div class="stat-label">가입 회원</div>
        </div>
        <div class="stat-item">
          <div class="stat-number">156</div>
          <div class="stat-label">오늘 방문</div>
        </div>
      </div>
    </div>
  </div>
</div>

<style>
  .theme-selector {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid var(--border-color);
    border-radius: var(--border-radius);
    background: var(--bg-primary);
    color: var(--text-primary);
    font-size: var(--font-size-base);
  }
  
  .theme-description {
    margin: 0.5rem 0 0 0;
    font-size: var(--font-size-sm);
    color: var(--text-muted);
  }
  
  .board-list, .comment-list, .user-list {
    list-style: none;
    margin: 0;
    padding: 0;
  }
  
  .board-item {
    margin-bottom: 0.5rem;
  }
  
  .board-link {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem;
    background: var(--bg-secondary);
    border-radius: var(--border-radius);
    text-decoration: none;
    color: var(--text-primary);
    transition: background-color 0.2s;
  }
  
  .board-link:hover {
    background: var(--border-color);
  }
  
  .board-title {
    font-weight: 500;
  }
  
  .board-count {
    font-size: var(--font-size-sm);
    color: var(--text-muted);
    background: var(--bg-primary);
    padding: 0.125rem 0.5rem;
    border-radius: 1rem;
  }
  
  .comment-item {
    padding: 0.75rem 0;
    border-bottom: 1px solid var(--border-color);
  }
  
  .comment-item:last-child {
    border-bottom: none;
  }
  
  .comment-post-title {
    font-size: var(--font-size-sm);
    font-weight: 600;
    color: var(--text-primary);
    margin-bottom: 0.25rem;
  }
  
  .comment-content {
    font-size: var(--font-size-sm);
    color: var(--text-secondary);
    margin-bottom: 0.25rem;
    font-style: italic;
  }
  
  .comment-meta {
    display: flex;
    gap: 0.5rem;
    font-size: var(--font-size-xs);
    color: var(--text-muted);
  }
  
  .online-stats {
    display: flex;
    justify-content: space-between;
    margin-bottom: 1rem;
    font-size: var(--font-size-sm);
    color: var(--text-secondary);
  }
  
  .user-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.25rem 0;
  }
  
  .user-avatar {
    font-size: var(--font-size-lg);
  }
  
  .user-name {
    flex: 1;
    font-size: var(--font-size-sm);
    color: var(--text-primary);
  }
  
  .user-status {
    font-size: var(--font-size-xs);
  }
  
  .stats-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }
  
  .stat-item {
    text-align: center;
    padding: 0.75rem;
    background: var(--bg-secondary);
    border-radius: var(--border-radius);
  }
  
  .stat-number {
    font-size: var(--font-size-lg);
    font-weight: bold;
    color: var(--primary-color);
  }
  
  .stat-label {
    font-size: var(--font-size-xs);
    color: var(--text-muted);
    margin-top: 0.25rem;
  }
</style>