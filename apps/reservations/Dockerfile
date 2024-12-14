# Development Stage
FROM node:alpine AS development

# Set the working directory
WORKDIR /usr/src/app

# Copy only the package.json and pnpm-lock.yaml to optimize caching
COPY package.json ./ 
COPY pnpm-lock.yaml ./
COPY tsconfig.json tsconfig.json
COPY nest-cli.json nest-cli.json

# Install pnpm and NestJS CLI globally
RUN npm install -g pnpm @nestjs/cli

# Install dependencies using Yarn
RUN pnpm install

# Copy the remaining application files
# COPY . .
COPY apps/reservations apps/reservations
COPY libs libs

# Build the application
RUN pnpm run build reservations

# Production Stage
FROM node:alpine AS production

# Set environment to production
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

# Set the working directory
WORKDIR /usr/src/app

# Copy the package.json and pnpm-lock.yaml
COPY package.json ./ 
COPY pnpm-lock.yaml ./ 

# Install pnpm and production dependencies
RUN npm install -g pnpm

# Install only production dependencies with Yarn
RUN pnpm install --prod

# Copy the built application from the development stage
COPY --from=development /usr/src/app/dist ./dist

# Set the entry point for production
CMD ["node", "dist/apps/reservations/main"]
