# Development Stage
FROM node:alpine AS development

WORKDIR /usr/src/app

# Copy package.json and yarn.lock
COPY package.json ./ 
COPY pnpm-lock.yaml ./
COPY tsconfig.json tsconfig.json
COPY nest-cli.json nest-cli.json

# Install Yarn using Alpine's package manager
RUN npm install -g pnpm

# Install dependencies using Yarn
RUN pnpm install

# Copy application code
COPY apps/auth apps/auth
COPY libs libs

# Install dependencies in the auth app using Yarn
RUN cd apps/auth && pnpm install

# Build the application
RUN pnpm run build auth

# Production Stage
FROM node:alpine as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

# Copy package.json and yarn.lock again for production
COPY package.json ./ 
COPY pnpm-lock.yaml ./

# Install Yarn in the production environment
RUN npm install -g pnpm

# Install only production dependencies with Yarn
RUN pnpm install --prod
# Copy the built app from the development stage
COPY --from=development /usr/src/app/dist ./dist

# Copy proto folders
COPY proto proto

# Set the start command
CMD ["node", "dist/apps/auth/main"]
