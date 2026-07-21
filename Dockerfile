# Stage 1: Build Next.js application
FROM node:20-alpine AS builder

WORKDIR /app

# Copy dependency manifests
COPY package.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Build the Next.js static export
RUN npm run build

# Stage 2: Serve application using lightweight Nginx
FROM nginx:alpine AS runner

# Copy static export files from builder stage
COPY --from=builder /app/out /usr/share/nginx/html

# Expose HTTP port
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
