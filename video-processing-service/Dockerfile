# Official Node runtime
FROM node:18

# Set working directory
WORKDIR /app

# Install ffmpeg
RUN apt-get update && apt-get install -y ffmpeg

# Copy package.json and package-lock.json into the working directory
COPY package*.json ./

RUN npm install

# Copy the rest of application code into the container.
COPY . .

EXPOSE 3000

# Define the command to run app using CMD
CMD [ "npm", "start"]