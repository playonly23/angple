// API 응답 타입
export interface ApiResponse<T> {
    success: boolean;
    data: T;
    message?: string;
}

// 페이지네이션 응답
export interface PaginatedResponse<T> {
    items: T[];
    total: number;
    page: number;
    limit: number;
    total_pages: number;
}

// 자유게시판 게시글 타입
export interface FreePost {
    id: string;
    title: string;
    content: string;
    author: string;
    author_id: string;
    views: number;
    likes: number;
    comments_count: number;
    created_at: string;
    updated_at: string;
    tags?: string[];
    images?: string[];
}

// API 키 등록 요청/응답
export interface RegisterApiKeyRequest {
    name: string;
    email: string;
}

export interface ApiKeyResponse {
    id: string;
    name: string;
    email: string;
    token: string;
    expires_at: string;
}

// 토큰 재발급 요청
export interface RefreshTokenRequest {
    email: string;
}

// API 에러
export interface ApiError {
    success: false;
    error: string;
    code?: string;
}
