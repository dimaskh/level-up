FROM node:20-slim

WORKDIR /workspace

# Install global dependencies
RUN npm install -g pnpm @nestjs/cli

# Copy root package files
COPY package.json pnpm-lock.yaml ./
COPY packages/backend/package.json ./packages/backend/

# Install dependencies
RUN pnpm install

# Clean dist directory if it exists
RUN rm -rf packages/backend/dist

EXPOSE 4000

# Use globally installed nest
CMD ["nest", "start", "--watch"]
