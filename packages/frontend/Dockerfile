FROM node:20-slim

WORKDIR /workspace

# Install pnpm
RUN npm install -g pnpm

# Copy root package files
COPY package.json pnpm-lock.yaml ./
COPY packages/frontend/package.json ./packages/frontend/

# Install dependencies
RUN pnpm install

# Copy the entire workspace for build configuration
COPY . .

EXPOSE 5173

# Use pnpm to run the dev server
CMD ["sh", "-c", "cd packages/frontend && pnpm dev -- --host"]
