import { apiClient } from '$lib/api/index.js';
import type { PageLoad } from './$types.js';

export const load: PageLoad = async ({ url }) => {
    const page = Number(url.searchParams.get('page')) || 1;
    const limit = Number(url.searchParams.get('limit')) || 20;

    try {
        const data = await apiClient.getFreePosts(page, limit);
        return {
            posts: data.items,
            pagination: {
                total: data.total,
                page: data.page,
                limit: data.limit,
                totalPages: data.total_pages
            }
        };
    } catch (error) {
        console.error('게시글 로딩 에러:', error);
        return {
            posts: [],
            pagination: {
                total: 0,
                page: 1,
                limit: 20,
                totalPages: 0
            },
            error: '게시글을 불러오는데 실패했습니다.'
        };
    }
};
