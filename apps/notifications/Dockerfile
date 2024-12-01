# Development Stage
FROM node:alpine AS development

# Set the working directory
WORKDIR /usr/src/app

# Copy only the package.json and pnpm-lock.yaml to optimize caching
COPY package.json ./
COPY yarn.lock ./ 
COPY tsconfig.json tsconfig.json
COPY nest-cli.json nest-cli.json

# Install pnpm and dependencies
RUN apk add --no-cache yarn
RUN yarn install

# Copy the remaining application files
# COPY . .
COPY apps/notifications apps/notifications
COPY libs libs

# Install dependencies in the auth app using Yarn
RUN cd apps/notifications && yarn install

# Build the application
RUN yarn build notifications

# Production Stage
FROM node:alpine AS production

# Set environment to production
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

# Set the working directory
WORKDIR /usr/src/app

# Copy the package.json and pnpm-lock.yaml
COPY package.json ./ 
COPY yarn.lock ./ 

# Install pnpm and production dependencies
RUN apk add --no-cache yarn

# Install only production dependencies with Yarn
RUN yarn install --prod

# Copy the built application from the development stage
COPY --from=development /usr/src/app/dist ./dist

# Set the entry point for production
CMD ["node", "dist/apps/notifications/main"]
