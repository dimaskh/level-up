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

# We'll mount the source code as a volume instead of copying it
# This allows for hot reloading
EXPOSE 3000

WORKDIR /workspace/packages/frontend

# Use development command
CMD ["pnpm", "dev"]
