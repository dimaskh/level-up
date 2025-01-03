FROM node:20-slim

WORKDIR /workspace

# Install global dependencies
RUN npm install -g pnpm vite

# Copy root package files
COPY package.json pnpm-lock.yaml ./
COPY packages/frontend/package.json ./packages/frontend/

# Install dependencies
RUN pnpm install

EXPOSE 5173

# Use globally installed vite
CMD ["vite", "--host"]
