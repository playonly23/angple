# 🏠 다모앙 (Damoang) Platform

> **차세대 커뮤니티 플랫폼**: 미니홈페이지 + 소셜 피드 + 커머스가 하나로!

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Go Version](https://img.shields.io/badge/Go-1.21+-blue.svg)](https://golang.org)
[![Svelte](https://img.shields.io/badge/Svelte-4.0+-red.svg)](https://svelte.dev)
[![Docker](https://img.shields.io/badge/Docker-ready-blue.svg)](https://docker.com)
[![Open Source](https://img.shields.io/badge/Open%20Source-❤️-green.svg)](https://github.com/damoang/damoang-platform)

## 🌟 프로젝트 비전

**다모앙**은 **싸이월드의 향수**와 **현대적인 소셜 미디어**를 결합한 혁신적인 플랫폼입니다.

- 📱 **유튜브 숏츠** 스타일의 세로 스크롤 피드
- 🏠 **미니 홈페이지** 빌더로 개인 공간 꾸미기
- 🛍️ **소셜 커머스**로 피드에서 바로 쇼핑
- 🎨 **컨텐츠 마켓**에서 디지털 에셋 거래
- 🗺️ **통합 서비스** (지도, 리뷰, 채팅 등)

## 🚀 빠른 시작

### 필수 요구사항

- **Node.js** 18+
- **Go** 1.21+
- **Docker** & **Docker Compose**
- **Git**

### 30초 만에 시작하기

```bash
# 1. 저장소 클론
git clone https://github.com/damoang/damoang-platform.git
cd damoang-platform

# 2. 의존성 설치 & 환경 설정
make setup

# 3. 개발 서버 실행
make dev

# 4. 브라우저에서 확인
# 🌐 메인 앱: http://localhost:5173
# 🔐 Keycloak: http://localhost:8080
# 📊 Grafana: http://localhost:3000
```

### 개발자 온보딩

```bash
# 새 개발자를 위한 완벽한 안내
make onboard
```

## 🏗️ 아키텍처

### 📦 모노레포 구조

```
damoang-platform/
├── apps/              # 프론트엔드 애플리케이션
│   ├── web/          # SvelteKit 웹앱
│   └── admin/        # 관리자 대시보드
├── services/         # Go 마이크로서비스
│   ├── auth/         # 인증 서비스
│   ├── user/         # 사용자 관리
│   ├── post/         # 게시글 관리
│   ├── feed/         # 피드 알고리즘
│   └── media/        # 미디어 처리
├── packages/         # 공유 패키지
│   ├── types/        # TypeScript 타입
│   ├── ui/          # UI 컴포넌트 라이브러리
│   └── api-client/  # API 클라이언트 SDK
└── infrastructure/   # 인프라 코드
    ├── docker/      # Docker 설정
    └── k8s/         # Kubernetes 매니페스트
```

### 🔧 기술 스택

**Frontend**

- 🎨 **SvelteKit** - 현대적인 풀스택 프레임워크
- 📱 **TypeScript** - 타입 안전성
- 🎭 **Tailwind CSS** - 유틸리티 우선 CSS
- 📦 **Vite** - 초고속 빌드 도구

**Backend**

- ⚡ **Go + Fiber** - 고성능 웹 프레임워크
- 🏗️ **Clean Architecture** - 확장 가능한 구조
- 🔐 **Keycloak** - 엔터프라이즈급 인증
- 🗄️ **PostgreSQL** - 안정적인 관계형 DB
- ⚡ **Redis** - 고속 캐싱 & 세션

**Infrastructure**

- 🐳 **Docker** - 컨테이너화
- ☁️ **Kubernetes** - 오케스트레이션
- 📊 **Prometheus + Grafana** - 모니터링
- 🔍 **Jaeger** - 분산 추적
- 🔍 **Elasticsearch** - 검색 엔진

## 🎯 핵심 기능

### 📱 소셜 피드 시스템

- **세로 스크롤** 숏폼 인터페이스
- **AI 기반** 개인화 추천
- **실시간** 좋아요/댓글/공유
- **무한 스크롤** & 미리 로딩

### 🏠 미니 홈페이지 빌더

- **드래그 앤 드롭** 에디터
- **다양한 테마** 및 위젯
- **방명록** & 방문자 통계
- **커스텀 도메인** 지원

### 🛍️ 소셜 커머스

- **피드 연동** 쇼핑
- **즉시 구매** 기능
- **판매자 도구** 제공
- **결제 시스템** 통합

### 🎨 컨텐츠 마켓플레이스

- **디지털 에셋** 거래
- **라이센스 관리** 시스템
- **크리에이터** 수익화 도구
- **로열티** 분배 시스템

## 🤝 기여하기

다모앙은 **오픈소스 커뮤니티**의 힘으로 성장합니다! 🌱

### 기여 방법

1. **🍴 Fork** 이 저장소
2. **🌿 브랜치** 생성 (`git checkout -b feature/amazing-feature`)
3. **💫 커밋** 작성 (`git commit -m 'Add amazing feature'`)
4. **📤 푸시** (`git push origin feature/amazing-feature`)
5. **🎯 PR** 생성

### 개발 환경 설정

```bash
# 개발 환경 준비
make setup

# 코드 품질 검사
make lint

# 테스트 실행
make test

# 포맷팅
make format
```

### 기여 가이드라인

- 📋 [기여 가이드](CONTRIBUTING.md) 읽기
- 🐛 [이슈 템플릿](https://github.com/damoang/damoang-platform/issues/new/choose) 사용
- 💬 [디스커션](https://github.com/damoang/damoang-platform/discussions) 참여
- 📝 [코드 스타일 가이드](docs/guides/code-style.md) 준수

## 🔄 CI/CD & 포크 정책

### 포크된 저장소에서의 동작

이 프로젝트를 포크하면 **자동으로 안전한 CI 파이프라인**이 작동합니다:

✅ **실행되는 단계**:
- 🔍 **린트 검사** - 코드 품질 확인
- 🧪 **단위 테스트** - 프론트엔드/백엔드 테스트
- 🏗️ **빌드 테스트** - 컴파일 및 빌드 검증

❌ **실행되지 않는 단계** (보안상 제한):
- 🐳 **Docker 빌드** - AWS ECR 푸시 없음
- 🚀 **배포** - EC2 인스턴스 접근 없음
- 🔄 **통합 테스트** - 외부 서비스 의존성

### 원본 저장소 권한

민감한 작업들은 **원본 저장소**(`damoang/angple`)에서만 실행됩니다:

```yaml
# .github/workflows/ci.yml
if: github.repository == 'damoang/angple'
```

이를 통해 다음이 보장됩니다:
- 🔒 **보안**: AWS 자격증명 보호
- 💰 **비용**: 불필요한 클라우드 리소스 사용 방지  
- ⚡ **속도**: 포크에서 빠른 피드백 제공

## 📋 로드맵

### 🎯 2024 Q1-Q2: MVP Core

- [x] 기본 인증 시스템
- [x] 사용자 관리
- [ ] 피드 시스템
- [ ] 미니 홈페이지 빌더
- [ ] 기본 상거래

### 🚀 2024 Q3: Social Features

- [ ] 팔로우/친구 시스템
- [ ] 실시간 알림
- [ ] 고급 검색
- [ ] 모바일 앱

### 🌟 2024 Q4: Advanced Features

- [ ] AI 추천 시스템
- [ ] 컨텐츠 마켓플레이스
- [ ] 고급 분석
- [ ] 국제화

더 자세한 로드맵은 [여기](docs/roadmap.md)에서 확인하세요!

## 📊 현재 상태

- **⭐ Stars**: 아직 시작 단계!
- **🍴 Forks**: 첫 기여자를 찾고 있어요
- **🐛 Issues**:
- **👥 Contributors**:
- **📈 활성도**: 🔥 매일 커밋 중

## 🏃‍♂️ 성능

- **⚡ 페이지 로드**: < 1초
- **📱 모바일 최적화**: 90+ Lighthouse 점수
- **🚀 API 응답**: < 100ms
- **💾 메모리 사용량**: 효율적인 Go 서비스

## 📖 문서

- 📚 [API 문서](docs/api/)
- 🛠️ [개발 가이드](docs/guides/)
- 🏗️ [아키텍처](docs/architecture/)
- 🚀 [배포 가이드](docs/deployment/)

## 🌍 커뮤니티

- 💬 [Discord](https://discord.gg/damoang) - 실시간 채팅
- 📱 [Twitter](https://twitter.com/damoang) - 업데이트 소식
- 📧 [Newsletter](https://damoang.dev/newsletter) - 월간 뉴스레터
- 🎥 [YouTube](https://youtube.com/damoang) - 개발 과정 공유

## 🛡️ 보안

보안 이슈를 발견하셨나요? [security@damoang.dev](mailto:security@damoang.dev)로 연락주세요.

- 🔒 **인증**: Keycloak 기반 엔터프라이즈급 보안
- 🛡️ **API**: JWT 토큰 기반 인증
- 🔐 **데이터**: 암호화된 민감 정보 저장
- 🚨 **모니터링**: 실시간 보안 이벤트 추적

## 📄 라이센스

이 프로젝트는 [MIT 라이센스](LICENSE)를 따릅니다.

```
MIT License - 자유롭게 이용하세요! ❤️
```

## 🙏 감사의 말

다모앙 플랫폼은 다음 오픈소스 프로젝트들의 도움을 받아 만들어졌습니다:

- [Svelte](https://svelte.dev) - 혁신적인 프론트엔드 프레임워크
- [Go](https://golang.org) - 간결하고 강력한 백엔드 언어
- [Keycloak](https://keycloak.org) - 오픈소스 인증 솔루션
- [PostgreSQL](https://postgresql.org) - 세계에서 가장 진보한 오픈소스 DB

## 🚀 시작해보세요!

```bash
# 지금 바로 시작해보세요! 🎉
git clone https://github.com/damoang/damoang-platform.git
cd damoang-platform
make onboard
make dev
```

**다모앙**과 함께 차세대 커뮤니티 플랫폼을 만들어나가요! 🚀

---

<div align="center">
  <img src="docs/images/damoang-logo.png" alt="Damoang Logo" width="100">
  
  **Made with ❤️ by the Damoang Team**
  
  [Website](https://damoang.dev) • [Docs](https://docs.damoang.dev) • [Community](https://community.damoang.dev)
</div>
