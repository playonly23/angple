# Damoang Platform Development Makefile

.PHONY: help setup dev build test clean docker-up docker-down

# 기본 목표
help: ## 도움말 표시
	@echo "다모앙 플랫폼 개발 명령어:"
	@echo ""
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}'

# 초기 설정
setup: ## 프로젝트 초기 설정
	@echo "🚀 다모앙 플랫폼 설정 중..."
	npm install
	go mod tidy -C services/auth
	go mod tidy -C services/user
	go mod tidy -C services/post
	go mod tidy -C services/feed
	go mod tidy -C services/media
	@echo "✅ 설정 완료!"

# 개발 서버 실행
dev: ## 전체 개발 서버 실행
	@echo "🔥 개발 서버 시작..."
	docker-compose up -d postgres redis
	sleep 3
	concurrently \
		"cd apps/web && npm run dev" \
		"cd services/auth && go run cmd/main.go" \
		"cd services/user && go run cmd/main.go" \
		"cd services/post && go run cmd/main.go" \
		"cd services/feed && go run cmd/main.go"

# 프론트엔드만 실행
dev-web: ## 웹 애플리케이션만 실행
	cd apps/web && npm run dev

# 특정 서비스 실행
dev-auth: ## 인증 서비스만 실행
	cd services/auth && go run cmd/main.go

dev-user: ## 사용자 서비스만 실행
	cd services/user && go run cmd/main.go

# 빌드
build: ## 전체 프로젝트 빌드
	@echo "🔨 빌드 시작..."
	cd apps/web && npm run build
	cd services/auth && go build -o bin/auth cmd/main.go
	cd services/user && go build -o bin/user cmd/main.go
	cd services/post && go build -o bin/post cmd/main.go
	cd services/feed && go build -o bin/feed cmd/main.go
	cd services/media && go build -o bin/media cmd/main.go
	@echo "✅ 빌드 완료!"

# 테스트
test: ## 전체 테스트 실행
	@echo "🧪 테스트 실행..."
	cd apps/web && npm run test
	cd services/auth && go test ./...
	cd services/user && go test ./...
	cd services/post && go test ./...
	cd services/feed && go test ./...
	cd services/media && go test ./...

# Docker 관련
docker-up: ## Docker 컨테이너 시작
	docker-compose up -d

docker-down: ## Docker 컨테이너 종료
	docker-compose down

docker-logs: ## Docker 로그 확인
	docker-compose logs -f

docker-build: ## Docker 이미지 빌드
	docker-compose build

# 데이터베이스
db-migrate: ## 데이터베이스 마이그레이션
	cd services/auth && go run migrations/migrate.go up
	cd services/user && go run migrations/migrate.go up
	cd services/post && go run migrations/migrate.go up

db-seed: ## 초기 데이터 생성
	cd services/user && go run cmd/seed/main.go
	cd services/post && go run cmd/seed/main.go

# 정리
clean: ## 빌드 파일 정리
	rm -rf apps/web/build
	rm -rf services/*/bin
	rm -rf node_modules
	docker-compose down -v

# 코드 품질
lint: ## 코드 린팅
	cd apps/web && npm run lint
	cd services/auth && golangci-lint run
	cd services/user && golangci-lint run
	cd services/post && golangci-lint run
	cd services/feed && golangci-lint run

format: ## 코드 포맷팅
	cd apps/web && npm run format
	cd services/auth && gofmt -w .
	cd services/user && gofmt -w .
	cd services/post && gofmt -w .
	cd services/feed && gofmt -w .

# 문서 생성
docs: ## API 문서 생성
	@echo "📚 문서 생성 중..."
	cd services/auth && swag init -g cmd/main.go
	cd services/user && swag init -g cmd/main.go
	cd services/post && swag init -g cmd/main.go
	cd services/feed && swag init -g cmd/main.go

# 프로덕션 배포
deploy: ## 프로덕션 배포
	@echo "🚀 배포 시작..."
	./infrastructure/scripts/deploy.sh

# 개발자 온보딩
onboard: ## 새 개발자 온보딩
	@echo "👋 다모앙 플랫폼에 오신 것을 환영합니다!"
	@echo ""
	@echo "1. 필수 도구 설치 확인:"
	@echo "   - Node.js (v18+): $(shell node --version 2>/dev/null || echo '❌ 설치 필요')"
	@echo "   - Go (v1.21+): $(shell go version 2>/dev/null || echo '❌ 설치 필요')"
	@echo "   - Docker: $(shell docker --version 2>/dev/null || echo '❌ 설치 필요')"
	@echo ""
	@echo "2. 다음 명령어로 시작하세요:"
	@echo "   make setup    # 초기 설정"
	@echo "   make dev      # 개발 서버 실행"
	@echo ""
	@echo "3. 브라우저에서 http://localhost:5173 접속"
	@echo ""
	@echo "📖 자세한 내용은 docs/guides/getting-started.md 참조" 