#!/bin/bash

# 🚀 다모앙 플랫폼 개발 환경 설정 스크립트

set -e

echo "🏠 다모앙 플랫폼 개발 환경을 설정합니다..."

# 색상 정의
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 로그 함수들
log_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

log_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

log_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

log_error() {
    echo -e "${RED}❌ $1${NC}"
}

# 1. 필수 도구 설치 확인
check_requirements() {
    log_info "필수 도구 설치 확인 중..."
    
    # Node.js 확인
    if ! command -v node &> /dev/null; then
        log_error "Node.js가 설치되어 있지 않습니다. https://nodejs.org에서 설치해주세요."
        exit 1
    fi
    log_success "Node.js $(node --version) 확인됨"
    
    # Go 확인
    if ! command -v go &> /dev/null; then
        log_error "Go가 설치되어 있지 않습니다. https://golang.org에서 설치해주세요."
        exit 1
    fi
    log_success "Go $(go version | cut -d' ' -f3) 확인됨"
    
    # Docker 확인
    if ! command -v docker &> /dev/null; then
        log_error "Docker가 설치되어 있지 않습니다. https://docker.com에서 설치해주세요."
        exit 1
    fi
    log_success "Docker $(docker --version | cut -d' ' -f3 | cut -d',' -f1) 확인됨"
    
    # Docker Compose 확인
    if ! command -v docker-compose &> /dev/null; then
        log_error "Docker Compose가 설치되어 있지 않습니다."
        exit 1
    fi
    log_success "Docker Compose $(docker-compose --version | cut -d' ' -f3 | cut -d',' -f1) 확인됨"
}

# 2. 환경 변수 파일 생성
create_env_files() {
    log_info "환경 변수 파일 생성 중..."
    
    # 루트 .env 파일
    if [ ! -f ".env" ]; then
        cat > .env << EOF
# 🏠 다모앙 플랫폼 개발 환경 설정
NODE_ENV=development
DATABASE_URL=postgres://damoang:damoang123@localhost:5432/damoang
REDIS_URL=redis://localhost:6379
AUTH_PORT=8001
USER_PORT=8002
POST_PORT=8003
FEED_PORT=8004
MEDIA_PORT=8005
JWT_SECRET=damoang-dev-secret-key-change-in-production
VITE_API_BASE_URL=http://localhost:8001
KEYCLOAK_URL=http://localhost:8080
MINIO_ENDPOINT=localhost:9000
MINIO_ACCESS_KEY=damoang
MINIO_SECRET_KEY=damoang123
EOF
        log_success ".env 파일 생성됨"
    else
        log_warning ".env 파일이 이미 존재합니다"
    fi
    
    # 서비스별 .env 파일들
    for service in auth user post feed media; do
        service_dir="services/$service"
        if [ -d "$service_dir" ] && [ ! -f "$service_dir/.env" ]; then
            cp .env "$service_dir/.env"
            log_success "$service 서비스 .env 파일 생성됨"
        fi
    done
    
    # 웹앱 .env 파일
    if [ -d "apps/web" ] && [ ! -f "apps/web/.env" ]; then
        cat > apps/web/.env << EOF
VITE_API_BASE_URL=http://localhost:8001
VITE_WS_URL=ws://localhost:8001
VITE_APP_NAME=다모앙
VITE_APP_VERSION=0.1.0
EOF
        log_success "웹앱 .env 파일 생성됨"
    fi
}

# 3. PostgreSQL 다중 데이터베이스 초기화 스크립트
create_postgres_init_script() {
    log_info "PostgreSQL 초기화 스크립트 생성 중..."
    
    mkdir -p infrastructure/docker/postgres
    
    cat > infrastructure/docker/postgres/init-multiple-databases.sh << 'EOF'
#!/bin/bash
set -e

function create_user_and_database() {
    local database=$1
    echo "Creating user and database '$database'"
    psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" <<-EOSQL
        CREATE DATABASE $database;
        GRANT ALL PRIVILEGES ON DATABASE $database TO $POSTGRES_USER;
EOSQL
}

if [ -n "$POSTGRES_MULTIPLE_DATABASES" ]; then
    echo "Multiple database creation requested: $POSTGRES_MULTIPLE_DATABASES"
    for db in $(echo $POSTGRES_MULTIPLE_DATABASES | tr ',' ' '); do
        create_user_and_database $db
    done
    echo "Multiple databases created"
fi
EOF
    
    chmod +x infrastructure/docker/postgres/init-multiple-databases.sh
    log_success "PostgreSQL 초기화 스크립트 생성됨"
}

# 4. 의존성 설치
install_dependencies() {
    log_info "의존성 설치 중..."
    
    # NPM 의존성
    npm install
    log_success "NPM 의존성 설치 완료"
    
    # Go 모듈 초기화 및 의존성 설치
    for service in auth user post feed media; do
        service_dir="services/$service"
        if [ -d "$service_dir" ]; then
            cd "$service_dir"
            if [ ! -f "go.mod" ]; then
                go mod init "damoang-platform/services/$service"
            fi
            go mod tidy
            cd ../..
            log_success "$service 서비스 Go 의존성 설치 완료"
        fi
    done
}

# 5. 기본 디렉토리 구조 생성
create_directory_structure() {
    log_info "디렉토리 구조 생성 중..."
    
    # 기본 디렉토리들
    mkdir -p {apps/{web/src/{lib/{components,stores,utils,types},routes}},packages/{types,ui,utils,api-client},services/{auth,user,post,feed,media}/{cmd,internal/{handlers,services,models,repository},pkg},infrastructure/{docker/{nginx,prometheus,grafana},k8s,scripts},docs/{api,guides,architecture},tools/{testing,dev-server}}
    
    log_success "디렉토리 구조 생성 완료"
}

# 6. 기본 Go 파일들 생성
create_basic_go_services() {
    log_info "기본 Go 서비스 파일 생성 중..."
    
    for service in user post feed media; do
        service_dir="services/$service"
        main_file="$service_dir/cmd/main.go"
        
        if [ ! -f "$main_file" ]; then
            port=$((8001 + $(echo "auth user post feed media" | tr ' ' '\n' | grep -n "$service" | cut -d: -f1)))
            
            cat > "$main_file" << EOF
package main

import (
	"log"
	"os"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/logger"
	"github.com/gofiber/fiber/v2/middleware/recover"
)

func main() {
	app := fiber.New(fiber.Config{
		AppName: "🚀 Damoang ${service^} Service v1.0.0",
	})

	app.Use(recover.New())
	app.Use(logger.New())
	app.Use(cors.New())

	app.Get("/health", func(c *fiber.Ctx) error {
		return c.JSON(fiber.Map{
			"status":  "healthy",
			"service": "$service",
			"version": "1.0.0",
			"message": "🚀 다모앙 $service 서비스가 정상 작동 중입니다!",
		})
	})

	port := os.Getenv("PORT")
	if port == "" {
		port = "$port"
	}

	log.Printf("🚀 다모앙 $service 서비스가 포트 %s에서 시작됩니다!", port)
	if err := app.Listen(":" + port); err != nil {
		log.Fatalf("❌ 서버 시작 실패: %v", err)
	}
}
EOF
            log_success "$service 서비스 메인 파일 생성됨"
        fi
    done
}

# 7. Docker 인프라 시작
start_infrastructure() {
    log_info "Docker 인프라 시작 중..."
    
    # Docker 컨테이너 시작 (백그라운드)
    docker-compose up -d postgres redis keycloak minio mailhog
    
    log_success "인프라 서비스 시작됨"
    log_info "서비스들이 준비될 때까지 30초 대기 중..."
    sleep 30
}

# 8. 헬스체크
health_check() {
    log_info "서비스 헬스체크 중..."
    
    # PostgreSQL 체크
    if docker-compose exec -T postgres pg_isready -U damoang > /dev/null 2>&1; then
        log_success "PostgreSQL 정상"
    else
        log_warning "PostgreSQL 연결 실패"
    fi
    
    # Redis 체크
    if docker-compose exec -T redis redis-cli ping > /dev/null 2>&1; then
        log_success "Redis 정상"
    else
        log_warning "Redis 연결 실패"
    fi
    
    # Keycloak 체크 (더 오래 걸릴 수 있음)
    if curl -sf http://localhost:8080/health/ready > /dev/null 2>&1; then
        log_success "Keycloak 정상"
    else
        log_warning "Keycloak이 아직 준비되지 않았습니다 (시간이 더 필요할 수 있습니다)"
    fi
}

# 9. 개발 서버 시작 안내
show_startup_info() {
    echo ""
    echo "🎉 다모앙 플랫폼 개발 환경 설정이 완료되었습니다!"
    echo ""
    echo "📋 다음 단계:"
    echo "  1. 개발 서버 시작: make dev"
    echo "  2. 또는 개별 서비스:"
    echo "     - 인증 서비스: make dev-auth"
    echo "     - 웹 앱: make dev-web"
    echo ""
    echo "🌐 접속 주소:"
    echo "  - 웹 앱: http://localhost:5173"
    echo "  - 인증 API: http://localhost:8001"
    echo "  - Keycloak: http://localhost:8080"
    echo "  - MinIO: http://localhost:9001"
    echo "  - MailHog: http://localhost:8025"
    echo ""
    echo "🔧 관리 명령어:"
    echo "  - make help     # 모든 명령어 보기"
    echo "  - make onboard  # 새 개발자 안내"
    echo "  - make clean    # 정리"
    echo ""
}

# 메인 실행
main() {
    echo "🚀 다모앙 플랫폼 개발 환경 설정을 시작합니다..."
    echo ""
    
    check_requirements
    create_directory_structure
    create_env_files
    create_postgres_init_script
    install_dependencies
    create_basic_go_services
    start_infrastructure
    health_check
    show_startup_info
    
    log_success "설정 완료! 🎉"
}

# 스크립트 실행
main "$@" 