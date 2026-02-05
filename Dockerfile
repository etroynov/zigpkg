FROM oven/bun:1.3-alpine AS base

FROM base AS deps
WORKDIR /app
COPY package.json bun.lock ./
RUN --mount=type=cache,target=/root/.bun/install/cache \
    bun install --frozen-lockfile

FROM base AS prod-deps
WORKDIR /app
COPY package.json bun.lock ./
RUN --mount=type=cache,target=/root/.bun/install/cache \
    bun install --frozen-lockfile --production

FROM oven/bun:1.1-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN bun run build

FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production PORT=3000

RUN apk add --no-cache tini && \
    addgroup -g 1001 -S app && \
    adduser -S app -u 1001 -G app

COPY --from=prod-deps --chown=app:app /app/node_modules ./node_modules
COPY --from=builder --chown=app:app /app/build ./build
COPY --from=builder --chown=app:app /app/package.json ./

USER app
EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
    CMD wget -qO- http://localhost:3000/healthz || exit 1

ENTRYPOINT ["/sbin/tini", "--"]
CMD ["bun", "./build/index.js"]
