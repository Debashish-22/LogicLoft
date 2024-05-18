# Use the latest LTS version of Node.js
FROM node:20.9.0

# Install PM2 globally
RUN npm install -g pm2

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose port 8000 (or any other port your Express app listens on)
EXPOSE 8000

# Command to run the application using PM2
CMD ["pm2-runtime", "app.js", "--max-restarts", "5"]