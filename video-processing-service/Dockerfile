# Stage 1: Build
FROM node:18 AS builder

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json into the working directory
COPY package*.json ./

RUN npm install

# Copy the rest of application code into the container
COPY . .

RUN npm run build

# Stage 2: Production
FROM node:18

# Install ffmpeg
RUN apt-get update && apt-get install -y ffmpeg

WORKDIR /app

COPY package*.json ./

RUN npm install --only=production

COPY --from=builder /app/dist ./dist

EXPOSE 3000

# Define the command to run app using CMD
CMD [ "npm", "run", "serve"]