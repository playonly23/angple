# 🏠 다모앙 (Damoang) 플랫폼

> **차세대 커뮤니티 플랫폼**: 미니홈페이지 + 소셜 피드 + 커머스가 하나로!

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-brightgreen.svg)](https://nodejs.org)
[![SvelteKit](https://img.shields.io/badge/SvelteKit-Latest-orange.svg)](https://kit.svelte.dev)

## 🚀 30초 만에 시작하기

```bash
# 1. 저장소 클론
git clone https://github.com/damoang/damoang-platform.git
cd damoang-platform

# 2. 백엔드 서버 시작 (터미널 1)
cd backend
npm install
npm start

# 3. 프론트엔드 시작 (터미널 2)
cd frontend
npm install
npm run dev

# 4. 브라우저에서 확인
# 🌐 프론트엔드: http://localhost:5173
# 🔗 백엔드 API: http://localhost:8001/health
```

## 🎯 프로젝트 비전

**다모앙**은 **싸이월드의 향수**와 **현대적인 소셜 미디어**를 결합한 혁신적인 플랫폼입니다.

- 📱 **유튜브 숏츠** 스타일의 세로 스크롤 피드
- 🏠 **미니 홈페이지** 빌더로 개인 공간 꾸미기
- 🛍️ **소셜 커머스**로 피드에서 바로 쇼핑
- 🔌 **플러그인 시스템**으로 무한 확장
- 🌍 **오픈소스**로 커뮤니티와 함께 성장

## 📂 프로젝트 구조

```
damoang-platform/
├── frontend/          # SvelteKit 웹 애플리케이션
│   ├── src/
│   │   ├── routes/    # 페이지 라우팅
│   │   └── lib/       # 공통 컴포넌트
│   └── package.json
├── backend/           # Node.js Express API 서버
│   ├── server.js      # 메인 서버 파일
│   └── package.json
└── README.md          # 이 파일
```

## 🛠️ 개발 환경

### 필수 요구사항

- **Node.js** 18+
- **npm** 또는 **yarn**
- **Git**

### 개발 모드 실행

```bash
# 백엔드 개발 서버
cd backend
npm run dev     # http://localhost:8001

# 프론트엔드 개발 서버
cd frontend
npm run dev     # http://localhost:5173
```

## 🌟 주요 기능 (개발 중)

- [x] 기본 웹 인터페이스
- [x] Express API 서버
- [x] CORS 설정 완료
- [ ] 사용자 인증 시스템
- [ ] 숏폼 피드 UI
- [ ] 미니홈페이지 빌더
- [ ] 게시글 CRUD
- [ ] 실시간 채팅
- [ ] 플러그인 시스템

## 🔗 API 엔드포인트

| 메서드 | 경로              | 설명                      |
| ------ | ----------------- | ------------------------- |
| `GET`  | `/health`         | 서버 상태 확인            |
| `GET`  | `/api`            | API 정보                  |
| `GET`  | `/api/status`     | 시스템 상태               |
| `POST` | `/api/auth/login` | 로그인 (개발용)           |
| `GET`  | `/api/posts`      | 게시글 목록 (더미 데이터) |

### 개발용 로그인 정보

- **이메일**: `admin@damoang.dev`
- **비밀번호**: `damoang123`

## 🤝 기여하기

다모앙은 오픈소스 프로젝트입니다! 기여를 환영합니다. 🌱

1. **Fork** 이 저장소
2. **Feature branch** 생성 (`git checkout -b feature/amazing-feature`)
3. **Commit** 변경사항 (`git commit -m 'Add amazing feature'`)
4. **Push** to branch (`git push origin feature/amazing-feature`)
5. **Pull Request** 생성

## 📄 라이센스

이 프로젝트는 [MIT 라이센스](LICENSE)를 따릅니다.

```
MIT License - 자유롭게 이용하세요! ❤️
```

## 🙏 감사의 말

- [SvelteKit](https://kit.svelte.dev) - 현대적인 웹 프레임워크
- [Express.js](https://expressjs.com) - 빠르고 간결한 Node.js 프레임워크
- 오픈소스 커뮤니티의 모든 기여자들

## 🌍 커뮤니티

- 💬 [GitHub Issues](https://github.com/damoang/damoang-platform/issues) - 버그 리포트 & 기능 요청
- 📧 [이메일](mailto:hello@damoang.dev) - 일반 문의
- 🐦 [Twitter](https://twitter.com/damoang) - 업데이트 소식

---

<div align="center">
  <strong>Made with ❤️ by the Damoang Team</strong>
  <br>
  <sub>차세대 커뮤니티 플랫폼과 함께 성장해요! 🚀</sub>
</div>
