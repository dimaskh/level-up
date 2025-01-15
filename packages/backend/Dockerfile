FROM node:20-slim

WORKDIR /workspace

# Install system dependencies required for bcrypt
RUN apt-get update && apt-get install -y \
    python3 \
    make \
    g++ \
    procps \
    netcat-traditional \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Install pnpm
RUN npm install -g pnpm

# Copy workspace files
COPY pnpm-workspace.yaml ./
COPY package.json pnpm-lock.yaml tsconfig.json ./
COPY packages/backend/package.json ./packages/backend/

# Install dependencies with production flag to ensure all dependencies are installed
RUN pnpm install --frozen-lockfile --prod=false

# Copy backend source
COPY packages/backend ./packages/backend

EXPOSE 4000

WORKDIR /workspace/packages/backend

# Create a startup script
COPY packages/backend/docker-entrypoint.sh ./
RUN chmod +x docker-entrypoint.sh

CMD ["./docker-entrypoint.sh"]