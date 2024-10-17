# Here we are using node:20-alpine as the base image, alpine is a lightweight Linux distribution. And builder is the name of the stage. 
FROM node:20-alpine AS builder

# Create a directory to hold the application code inside the image, this will be the working directory for your application.
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install the dependencies, ci is used to install the dependencies from the package-lock.json file
RUN npm ci

# Copy the rest of the application code to the working directory
COPY . .

# Build the application
RUN npm run build

# Start a new stage with the production image

FROM node:20-alpine AS runner

WORKDIR /app

COPY package*.json ./

# Install only production dependencies (no devDependencies)
ENV NODE_ENV=production

RUN npm ci
# --omit=dev

# Copy the build output from the builder stage to the working directory
COPY --from=builder /app/build ./build

# Change the ownership of the /app directory to the node user, node is the default user in the node image
RUN chown -R node:node /app && chmod -R 755 /app

# Run the application contisously using pm2 process manager
RUN npm i pm2 -g

# ecosystem.config.js is a configuration file for pm2 process manager that tells pm2 how to run the application and how many instances to run etc.
COPY ecosystem.config.js .

# Switch to the node user to run the application as a non-root user 
USER node

EXPOSE 5000

CMD ["pm2-runtime", "start", "ecosystem.config.js"]