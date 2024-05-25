# Use the official Node.js 14 image as the base image
FROM node:20-bullseye-slim

RUN npm install bun

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN bun install

# Copy the rest of the application code to the working directory
COPY . .

# Build the TypeScript code
RUN bun run build

# Expose the port that the application will run on
EXPOSE 3000

# Start the application
CMD ["npm", "start"]