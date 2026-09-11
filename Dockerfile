# Stage 1: Build Next.js application
FROM node:20-alpine AS builder

WORKDIR /app

# Copy dependency manifests
COPY package.json ./

# Install dependencies
RUN npm install

# Copy source code (must include real Git LFS files — run `git lfs pull` on the host before build)
COPY . .

# Fail the build early if catalogue videos are still LFS pointer stubs
RUN for f in /app/public/videos/catalogue/*.mp4; do \
      if [ ! -f "$f" ]; then echo "ERROR: missing $f" >&2; exit 1; fi; \
      size=$(wc -c < "$f" | tr -d ' '); \
      if [ "$size" -lt 1000000 ]; then \
        echo "ERROR: $f is only ${size} bytes (Git LFS pointer?). Run: git lfs pull" >&2; \
        head -c 200 "$f" >&2 || true; \
        exit 1; \
      fi; \
    done

# Build the Next.js static export
RUN npm run build

# Stage 2: Serve application using lightweight unprivileged Nginx
FROM nginxinc/nginx-unprivileged:alpine AS runner

# Copy custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy static export files from builder stage
COPY --from=builder /app/out /usr/share/nginx/html

# Expose HTTP port (unprivileged port 8080)
EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
