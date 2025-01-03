FROM node:20-slim

WORKDIR /workspace

# Install system dependencies
RUN apt-get update && apt-get install -y \
    procps \
    && rm -rf /var/lib/apt/lists/*

# Install global dependencies
RUN npm install -g pnpm @nestjs/cli @swc/cli @swc/core

# Copy root package files
COPY package.json pnpm-lock.yaml ./
COPY packages/backend/package.json ./packages/backend/

# Install dependencies with frozen lockfile
RUN pnpm install --frozen-lockfile

# Copy the entire workspace for proper module resolution
COPY . .

EXPOSE 4000

WORKDIR /workspace/packages/backend

# Start in development mode without trying to remove dist
CMD ["sh", "-c", "rm -rf dist/* || true && nest start --watch"]
