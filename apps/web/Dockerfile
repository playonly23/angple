# Web SvelteKit Application Dockerfile
FROM node:20-alpine AS development

WORKDIR /app

RUN npm install -g pnpm

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .

EXPOSE 5174

CMD ["pnpm", "dev", "--host", "0.0.0.0", "--port", "5174"]

# Production build stage
FROM node:20-alpine AS build

WORKDIR /app

RUN npm install -g pnpm

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .
RUN pnpm build

# Production stage
FROM node:20-alpine AS production

WORKDIR /app

RUN npm install -g pnpm

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --prod --frozen-lockfile

COPY --from=build /app/build ./build
COPY --from=build /app/package.json ./

EXPOSE 3000

CMD ["node", "build"]