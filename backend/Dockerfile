# Use an official Node.js runtime as a parent image
FROM node:16

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Expose any ports if needed (e.g., for webhooks)
EXPOSE 3000

# Command to run the bot
CMD [ "node", "bot.js" ]
