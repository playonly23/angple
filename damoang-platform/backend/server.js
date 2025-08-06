const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 8001;

// JSON 파일 경로
const DATA_DIR = path.join(__dirname, 'data');
const POSTS_FILE = path.join(DATA_DIR, 'posts.json');

// 데이터 파일이 없으면 생성
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// JSON 파일 읽기/쓰기 헬퍼 함수
function readPosts() {
  try {
    if (!fs.existsSync(POSTS_FILE)) {
      return [];
    }
    const data = fs.readFileSync(POSTS_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('게시글 읽기 오류:', error);
    return [];
  }
}

function writePosts(posts) {
  try {
    fs.writeFileSync(POSTS_FILE, JSON.stringify(posts, null, 2));
    return true;
  } catch (error) {
    console.error('게시글 저장 오류:', error);
    return false;
  }
}

function getNextId(posts) {
  return posts.length > 0 ? Math.max(...posts.map(p => p.id)) + 1 : 1;
}

// 미들웨어 설정
app.use(cors());
app.use(express.json());

// 로깅 미들웨어
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// 🏠 다모앙 API 라우트

// 헬스 체크
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    service: 'damoang-backend',
    version: '1.0.0',
    message: '🚀 다모앙 백엔드 서버가 정상 작동 중입니다!',
    timestamp: new Date().toISOString()
  });
});

// API 정보
app.get('/api', (req, res) => {
  res.json({
    name: '🏠 다모앙 API',
    version: '1.0.0',
    description: '차세대 커뮤니티 플랫폼 API',
    endpoints: [
      'GET /health - 서버 상태 확인',
      'GET /api - API 정보',
      'GET /api/status - 시스템 상태',
      'POST /api/auth/login - 로그인 (개발 중)',
      'GET /api/posts - 게시글 목록 (개발 중)',
      'POST /api/posts - 게시글 작성 (개발 중)'
    ]
  });
});

// 시스템 상태
app.get('/api/status', (req, res) => {
  const uptime = process.uptime();
  const memoryUsage = process.memoryUsage();
  
  res.json({
    status: 'running',
    uptime: `${Math.floor(uptime / 60)}분 ${Math.floor(uptime % 60)}초`,
    memory: {
      used: `${Math.round(memoryUsage.heapUsed / 1024 / 1024)}MB`,
      total: `${Math.round(memoryUsage.heapTotal / 1024 / 1024)}MB`
    },
    nodeVersion: process.version,
    platform: process.platform
  });
});

// 임시 로그인 API (개발용)
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  
  // 간단한 더미 인증
  if (email === 'admin@damoang.dev' && password === 'damoang123') {
    res.json({
      success: true,
      message: '✅ 로그인 성공!',
      user: {
        id: 1,
        email: email,
        name: '다모앙 관리자',
        role: 'admin'
      },
      token: 'damoang-demo-token-' + Date.now()
    });
  } else {
    res.status(401).json({
      success: false,
      message: '❌ 이메일 또는 비밀번호가 잘못되었습니다',
      hint: '개발용 계정: admin@damoang.dev / damoang123'
    });
  }
});

// 게시글 목록 조회
app.get('/api/posts', (req, res) => {
  try {
    const posts = readPosts();
    const postsWithCommentCount = posts.map(post => ({
      id: post.id,
      title: post.title,
      author: post.author,
      createdAt: post.createdAt,
      viewCount: post.viewCount,
      commentCount: post.comments ? post.comments.length : 0,
      isNotice: post.isNotice || false
    }));
    
    res.json({
      success: true,
      posts: postsWithCommentCount,
      total: postsWithCommentCount.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: '게시글 목록을 불러오는데 실패했습니다.',
      error: error.message
    });
  }
});

// 게시글 상세 조회
app.get('/api/posts/:id', (req, res) => {
  try {
    const postId = parseInt(req.params.id);
    const posts = readPosts();
    const post = posts.find(p => p.id === postId);
    
    if (!post) {
      return res.status(404).json({
        success: false,
        message: '게시글을 찾을 수 없습니다.'
      });
    }
    
    // 조회수 증가
    post.viewCount = (post.viewCount || 0) + 1;
    writePosts(posts);
    
    res.json({
      success: true,
      post: post
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: '게시글을 불러오는데 실패했습니다.',
      error: error.message
    });
  }
});

// 게시글 작성
app.post('/api/posts', (req, res) => {
  try {
    const { title, content, author } = req.body;
    
    if (!title || !content || !author) {
      return res.status(400).json({
        success: false,
        message: '제목, 내용, 작성자는 필수 항목입니다.'
      });
    }
    
    const posts = readPosts();
    const newPost = {
      id: getNextId(posts),
      title,
      content,
      author,
      createdAt: new Date().toISOString(),
      viewCount: 0,
      isNotice: false,
      comments: []
    };
    
    posts.unshift(newPost); // 최신 글이 위로 오도록
    writePosts(posts);
    
    res.json({
      success: true,
      message: '게시글이 작성되었습니다.',
      post: newPost
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: '게시글 작성에 실패했습니다.',
      error: error.message
    });
  }
});

// 댓글 작성
app.post('/api/posts/:id/comments', (req, res) => {
  try {
    const postId = parseInt(req.params.id);
    const { author, content } = req.body;
    
    if (!author || !content) {
      return res.status(400).json({
        success: false,
        message: '작성자와 댓글 내용은 필수 항목입니다.'
      });
    }
    
    const posts = readPosts();
    const post = posts.find(p => p.id === postId);
    
    if (!post) {
      return res.status(404).json({
        success: false,
        message: '게시글을 찾을 수 없습니다.'
      });
    }
    
    if (!post.comments) {
      post.comments = [];
    }
    
    const newComment = {
      id: post.comments.length > 0 ? Math.max(...post.comments.map(c => c.id)) + 1 : 1,
      author,
      content,
      createdAt: new Date().toISOString()
    };
    
    post.comments.push(newComment);
    writePosts(posts);
    
    res.json({
      success: true,
      message: '댓글이 작성되었습니다.',
      comment: newComment
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: '댓글 작성에 실패했습니다.',
      error: error.message
    });
  }
});

// 404 핸들러
app.use('*', (req, res) => {
  res.status(404).json({
    error: '404 Not Found',
    message: `경로를 찾을 수 없습니다: ${req.method} ${req.originalUrl}`,
    availableEndpoints: ['/health', '/api', '/api/status', '/api/auth/login', '/api/posts']
  });
});

// 에러 핸들러
app.use((error, req, res, next) => {
  console.error('서버 에러:', error);
  res.status(500).json({
    error: 'Internal Server Error',
    message: '서버 내부 오류가 발생했습니다',
    timestamp: new Date().toISOString()
  });
});

// 서버 시작
app.listen(PORT, () => {
  console.log('');
  console.log('🏠🚀 다모앙 백엔드 서버 시작!');
  console.log('='.repeat(50));
  console.log(`📍 서버 주소: http://localhost:${PORT}`);
  console.log(`📍 헬스체크: http://localhost:${PORT}/health`);
  console.log(`📍 API 정보: http://localhost:${PORT}/api`);
  console.log(`📍 시스템 상태: http://localhost:${PORT}/api/status`);
  console.log('='.repeat(50));
  console.log('');
  console.log('💡 개발용 로그인 정보:');
  console.log('   이메일: admin@damoang.dev');
  console.log('   비밀번호: damoang123');
  console.log('');
  console.log('🔄 서버를 중지하려면 Ctrl+C를 누르세요');
  console.log('');
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('🛑 다모앙 서버를 종료합니다...');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('\n🛑 다모앙 서버를 종료합니다...');
  process.exit(0);
});