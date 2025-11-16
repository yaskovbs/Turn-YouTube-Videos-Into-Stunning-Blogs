# Use Node.js version 20 on Alpine Linux for a secure and small base image.
FROM node:20-alpine

# Set the working directory.
WORKDIR /usr/src/app

# Install OS-level dependencies required for building native Node.js modules.
# `python3`, `make`, and `g++` are needed for `node-gyp` which is used by `better-sqlite3`.
RUN apk add --no-cache python3 make g++

# Copy package.json and package-lock.json to leverage Docker layer caching.
COPY package*.json ./

# Install ALL dependencies, including devDependencies needed for the build step.
RUN npm install

# Copy the rest of the application source code.
COPY . .

# Run the build script to compile TypeScript and bundle the frontend.
# This needs devDependencies like `vite` and `typescript`.
RUN npm run build

# After the build is complete, prune the devDependencies to reduce the final image size.
RUN npm prune --production

# Expose the port the app will listen on.
EXPOSE 8080

# The command to start the production server.
CMD ["node", "dist/server/index.js"]
