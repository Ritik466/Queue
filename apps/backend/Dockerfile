#Use Node.js 18 Debian slim for Prisma/OpenSSL compatibility
FROM node:18-bullseye-slim AS base

#Install dependencies only when needed
FROM base AS deps
WORKDIR /app

#Copy package files
COPY package*.json ./
RUN npm ci && npm cache clean --force

#Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

#Generate Prisma client
RUN npx prisma generate

#Build the application
RUN npm run build

#Copy runtime healthcheck script into dist
RUN cp src/healthcheck.js dist/healthcheck.js

#Production image, copy all the files and run the app
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production

#Create non-root user for security
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

#Copy built application
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/prisma ./prisma

#Remove devDependencies for smaller/safer runtime image
RUN npm prune --omit=dev && npm cache clean --force

#Set permissions
USER nextjs

#Expose port
EXPOSE 5001

#Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node dist/healthcheck.js || exit 1

#Start the application
CMD ["node", "dist/app.js"]
