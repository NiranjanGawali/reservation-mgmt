# Development Stage
FROM node:alpine AS development

WORKDIR /usr/src/app

# Copy package.json and yarn.lock
COPY package.json ./ 
COPY yarn.lock ./ 
COPY tsconfig.json tsconfig.json
COPY nest-cli.json nest-cli.json

# Install Yarn using Alpine's package manager
RUN apk add --no-cache yarn

# Install dependencies using Yarn
RUN yarn install

# Copy application code
COPY apps/auth apps/auth
COPY libs libs

# Install dependencies in the auth app using Yarn
RUN cd apps/auth && yarn install

# Build the auth app
RUN yarn build auth

# Production Stage
FROM node:alpine as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

# Copy package.json and yarn.lock again for production
COPY package.json ./ 
COPY yarn.lock ./ 

# Install Yarn in the production environment
RUN apk add --no-cache yarn

# Install only production dependencies with Yarn
RUN yarn install --prod

# Copy the built app from the development stage
COPY --from=development /usr/src/app/dist ./dist

# Set the start command
CMD ["node", "dist/apps/auth/main"]
