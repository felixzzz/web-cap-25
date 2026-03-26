# Stage 1: Install dependencies
FROM node:20-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json package-lock.json* ./
RUN --mount=type=cache,target=/root/.npm npm ci

# Stage 2: Build the application
FROM node:20-alpine AS builder
WORKDIR /app

# Cap V8 heap to 1.5GB to prevent OOM on low-RAM servers (4GB)
ENV NODE_OPTIONS="--max-old-space-size=1536"
ENV NEXT_TELEMETRY_DISABLED=1

# Use prebuilt sharp binary instead of compiling from source on Alpine
ENV NEXT_SHARP_PATH=/app/node_modules/sharp

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Cache .next/cache between builds for faster static page regeneration
RUN --mount=type=cache,target=/app/.next/cache npm run build

# Stage 3: Production runner (minimal image)
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3045

# Create non-root user and prerender cache dir in a single layer
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs && \
    mkdir .next && \
    chown nextjs:nodejs .next

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3045

CMD ["node", "server.js"]
