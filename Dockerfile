# -----------------------------
# Stage 1 - Install dependencies
# -----------------------------
FROM node:22-alpine AS deps

WORKDIR /app

COPY package*.json ./

RUN npm ci --omit=dev

# -----------------------------
# Stage 2 - Production
# -----------------------------
FROM node:22-alpine

ENV NODE_ENV=production

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Create a non-root user
RUN addgroup -S nodejs && adduser -S express -G nodejs

USER express

EXPOSE 3000

CMD ["node", "server.js"]
