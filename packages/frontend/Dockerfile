FROM node:20-slim

WORKDIR /workspace

# Install pnpm
RUN npm install -g pnpm

# Copy workspace files
COPY pnpm-workspace.yaml ./
COPY package.json pnpm-lock.yaml tsconfig.json ./
COPY packages/frontend/package.json ./packages/frontend/

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy frontend source
COPY packages/frontend ./packages/frontend

EXPOSE 5173

WORKDIR /workspace/packages/frontend

CMD ["pnpm", "dev", "--", "--host"]
