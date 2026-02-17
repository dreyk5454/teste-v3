FROM node:20-alpine AS base
WORKDIR /app

FROM base AS deps
COPY package*.json ./
RUN npm ci

FROM base AS builder
COPY package*.json ./
RUN npm ci
COPY . .
# Create default .env for build-time
RUN echo "NEXT_PUBLIC_API_URL=http://localhost:3000" > .env.local && \
    echo "NODE_ENV=production" >> .env.local
RUN npm run build

FROM base AS runner
ENV NODE_ENV production
COPY --from=deps /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY package.json ./

EXPOSE 3000
CMD ["npm", "run", "start"]
