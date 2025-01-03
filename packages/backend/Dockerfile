FROM node:20-slim

WORKDIR /workspace

# Install system dependencies
RUN apt-get update && apt-get install -y \
    procps \
    && rm -rf /var/lib/apt/lists/*

# Install pnpm and NestJS CLI
RUN npm install -g pnpm @nestjs/cli

# Copy package files and tsconfig
COPY package.json pnpm-lock.yaml tsconfig.json ./
COPY packages/backend/package.json ./packages/backend/

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy backend source
COPY packages/backend ./packages/backend

# Clean and create dist directory
RUN cd packages/backend && rm -rf dist && mkdir dist

EXPOSE 4000

WORKDIR /workspace/packages/backend

CMD ["pnpm", "start:dev"]