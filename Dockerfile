# Use official Playwright image with Node 24 and all dependencies included
FROM mcr.microsoft.com/playwright:v1.61.1-noble

WORKDIR /app

# Copy package files
COPY package.json package-lock.json* ./

# Install dependencies
RUN npm ci

# Copy application code
COPY . .

# Expose port for reports (optional)
EXPOSE 9323

# Default command to run tests
CMD ["npm", "run", "test"]
