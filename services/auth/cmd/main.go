package main

import (
	"log"
	"os"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/logger"
	"github.com/gofiber/fiber/v2/middleware/recover"
	"github.com/joho/godotenv"
)

func main() {
	// .env 파일 로드
	if err := godotenv.Load(); err != nil {
		log.Println("⚠️  .env 파일을 찾을 수 없습니다. 환경 변수를 직접 설정해주세요.")
	}

	// Fiber 앱 생성
	app := fiber.New(fiber.Config{
		AppName: "🔐 Damoang Auth Service v1.0.0",
		ServerHeader: "DamoangAuth",
	})

	// 미들웨어 설정
	app.Use(recover.New())
	app.Use(logger.New(logger.Config{
		Format: "🕐 ${time} | ${status} | ${latency} | ${ip} | ${method} ${path}\n",
	}))
	app.Use(cors.New(cors.Config{
		AllowOrigins: "*", // 개발 단계에서는 모든 도메인 허용
		AllowMethods: "GET,POST,PUT,DELETE,OPTIONS",
		AllowHeaders: "Origin,Content-Type,Authorization",
	}))

	// 헬스체크 엔드포인트
	app.Get("/health", func(c *fiber.Ctx) error {
		return c.JSON(fiber.Map{
			"status":  "healthy",
			"service": "auth",
			"version": "1.0.0",
			"message": "🚀 다모앙 인증 서비스가 정상 작동 중입니다!",
		})
	})

	// API 루트
	api := app.Group("/api/v1")
	
	// 인증 라우트 그룹
	auth := api.Group("/auth")

	// 기본 인증 엔드포인트들
	auth.Get("/", func(c *fiber.Ctx) error {
		return c.JSON(fiber.Map{
			"message": "🔐 다모앙 인증 API",
			"endpoints": []string{
				"GET /api/v1/auth - API 정보",
				"POST /api/v1/auth/login - 로그인",
				"POST /api/v1/auth/register - 회원가입",
				"POST /api/v1/auth/refresh - 토큰 갱신",
				"POST /api/v1/auth/logout - 로그아웃",
				"GET /api/v1/auth/profile - 프로필 조회",
			},
		})
	})

	// 임시 로그인 엔드포인트 (MVP용)
	auth.Post("/login", func(c *fiber.Ctx) error {
		type LoginRequest struct {
			Email    string `json:"email"`
			Password string `json:"password"`
		}

		var req LoginRequest
		if err := c.BodyParser(&req); err != nil {
			return c.Status(400).JSON(fiber.Map{
				"error": "잘못된 요청 형식입니다",
			})
		}

		// MVP 단계에서는 간단한 더미 인증
		if req.Email == "admin@damoang.dev" && req.Password == "damoang123" {
			return c.JSON(fiber.Map{
				"success": true,
				"message": "✅ 로그인 성공!",
				"user": fiber.Map{
					"id":    1,
					"email": req.Email,
					"name":  "다모앙 관리자",
				},
				"token": "damoang-jwt-token-placeholder",
			})
		}

		return c.Status(401).JSON(fiber.Map{
			"success": false,
			"error":   "이메일 또는 비밀번호가 올바르지 않습니다",
		})
	})

	// 임시 회원가입 엔드포인트 (MVP용)
	auth.Post("/register", func(c *fiber.Ctx) error {
		type RegisterRequest struct {
			Email    string `json:"email"`
			Password string `json:"password"`
			Name     string `json:"name"`
		}

		var req RegisterRequest
		if err := c.BodyParser(&req); err != nil {
			return c.Status(400).JSON(fiber.Map{
				"error": "잘못된 요청 형식입니다",
			})
		}

		// 간단한 유효성 검사
		if req.Email == "" || req.Password == "" || req.Name == "" {
			return c.Status(400).JSON(fiber.Map{
				"error": "모든 필드를 입력해주세요",
			})
		}

		return c.Status(201).JSON(fiber.Map{
			"success": true,
			"message": "🎉 회원가입이 완료되었습니다!",
			"user": fiber.Map{
				"id":    2,
				"email": req.Email,
				"name":  req.Name,
			},
		})
	})

	// 토큰 검증 엔드포인트
	auth.Get("/profile", func(c *fiber.Ctx) error {
		// Authorization 헤더 체크
		authHeader := c.Get("Authorization")
		if authHeader == "" {
			return c.Status(401).JSON(fiber.Map{
				"error": "인증 토큰이 필요합니다",
			})
		}

		// MVP 단계에서는 간단한 토큰 체크
		if authHeader == "Bearer damoang-jwt-token-placeholder" {
			return c.JSON(fiber.Map{
				"success": true,
				"user": fiber.Map{
					"id":    1,
					"email": "admin@damoang.dev",
					"name":  "다모앙 관리자",
					"role":  "admin",
				},
			})
		}

		return c.Status(401).JSON(fiber.Map{
			"error": "유효하지 않은 토큰입니다",
		})
	})

	// 404 핸들러
	app.Use(func(c *fiber.Ctx) error {
		return c.Status(404).JSON(fiber.Map{
			"error":   "페이지를 찾을 수 없습니다",
			"path":    c.Path(),
			"method":  c.Method(),
			"message": "API 엔드포인트를 확인해주세요",
		})
	})

	// 서버 시작
	port := os.Getenv("PORT")
	if port == "" {
		port = "8001" // 인증 서비스 기본 포트
	}

	log.Printf("🚀 다모앙 인증 서비스가 포트 %s에서 시작됩니다!", port)
	log.Printf("📍 헬스체크: http://localhost:%s/health", port)
	log.Printf("📍 API 문서: http://localhost:%s/api/v1/auth", port)
	
	if err := app.Listen(":" + port); err != nil {
		log.Fatalf("❌ 서버 시작 실패: %v", err)
	}
} 