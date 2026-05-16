# syntax=docker/dockerfile:1.7

FROM node:22-slim AS base

RUN apt-get update \
  && apt-get install -y --no-install-recommends openssl ca-certificates \
  && rm -rf /var/lib/apt/lists/*

WORKDIR /app

FROM base AS deps

COPY package*.json ./
RUN npm ci

FROM base AS builder

COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN DATABASE_URL="postgresql://user:password@localhost:5432/hagemsa_activos?schema=public" npx prisma generate
RUN npm run build

FROM base AS production-deps

COPY package*.json ./
COPY --from=deps /app/node_modules ./node_modules
RUN npm prune --omit=dev

FROM base AS runner

ENV NODE_ENV=production
ENV PORT=8080
ENV HOME=/tmp

RUN addgroup --system --gid 1001 nodejs \
  && adduser --system --uid 1001 nestjs

COPY package*.json prisma.config.ts ./
COPY prisma ./prisma
COPY --from=production-deps /app/node_modules ./node_modules
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/dist ./dist

RUN chown -R nestjs:nodejs /app

USER nestjs

EXPOSE 8080

CMD ["sh", "-c", "./node_modules/.bin/prisma migrate deploy && node dist/src/main.js"]
