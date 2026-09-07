# Use official Node.js Alpine image
FROM node:20-alpine

# Set working directory inside container
WORKDIR /app

# Copy package.json for layer caching
COPY package.json ./

# Install project dependencies
RUN npm install

# Copy remaining frontend source code
COPY . .

# Expose Vite development server port
EXPOSE 5173

# Start Vite development server accessible externally
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
