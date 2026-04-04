# Stage 1 — install dependencies
FROM node:20-slim AS deps

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

# Stage 2 — render
FROM node:20-slim AS renderer

# Remotion needs Chromium and these system libs to render frames
RUN apt-get update && apt-get install -y \
    chromium \
    ca-certificates \
    fonts-liberation \
    libatk-bridge2.0-0 \
    libatk1.0-0 \
    libcups2 \
    libdbus-1-3 \
    libdrm2 \
    libgbm1 \
    libglib2.0-0 \
    libgtk-3-0 \
    libnspr4 \
    libnss3 \
    libx11-6 \
    libxcomposite1 \
    libxdamage1 \
    libxext6 \
    libxfixes3 \
    libxrandr2 \
    libxshmfence1 \
    xdg-utils \
    --no-install-recommends \
  && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy deps from stage 1
COPY --from=deps /app/node_modules ./node_modules

# Copy source
COPY . .

# Tell Remotion to use the system Chromium
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium

# Output directory
RUN mkdir -p /app/output

# Render the video on container start
CMD ["npx", "remotion", "render", "MinuOrganicsDemo", "output/minu-final.mp4", "--log=verbose"]
