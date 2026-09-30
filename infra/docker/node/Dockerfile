FROM node:22-alpine AS builder

WORKDIR /app
RUN npm install -g pnpm

COPY package.json pnpm-workspace.yaml tsconfig.base.json ./
COPY packages ./packages
COPY apps ./apps
COPY courses ./courses

RUN pnpm install --frozen-lockfile
RUN pnpm build

FROM node:22-alpine AS runner
WORKDIR /app
RUN npm install -g serve

COPY --from=builder /app/apps/playground/dist ./dist

EXPOSE 3000
CMD ["serve", "-s", "dist", "-l", "3000"]
