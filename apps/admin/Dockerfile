# Admin SvelteKit Application Dockerfile
FROM node:24-alpine AS development

WORKDIR /app

RUN npm install -g pnpm

COPY apps/admin/package.json apps/admin/pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .

EXPOSE 5173

CMD ["pnpm", "dev", "--host", "0.0.0.0", "--port", "5173"]

# Production build stage
FROM node:24-alpine AS build

WORKDIR /app

RUN npm install -g pnpm

COPY apps/admin/package.json apps/admin/pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile
RUN pnpm add @sveltejs/adapter-static

COPY . .
RUN pnpm build

# Production stage with nginx
FROM nginx:alpine AS production

# 빌드된 파일을 nginx로 복사
COPY --from=build /app/apps/admin/build /usr/share/nginx/html

# nginx 설정 (SPA용)
RUN echo 'server { \
    listen 80; \
    server_name localhost; \
    root /usr/share/nginx/html; \
    index index.html; \
    location / { \
        try_files $uri $uri/ /index.html; \
    } \
}' > /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]