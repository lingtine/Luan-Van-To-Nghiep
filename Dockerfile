# Frontend/Dockerfile

# Stage 1: Build the React app
FROM node:16 AS build

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the React app
RUN npm run build

# Stage 2: Serve the app using Nginx
FROM nginx:alpine

# Copy the build output from the first stage to the Nginx HTML directory
COPY --from=build /app/build /usr/share/nginx/html

# Copy custom Nginx configuration
COPY .nginx/default.conf /etc/nginx/conf.d/default.conf

# Expose port 80 to allow outside access
EXPOSE 80

# Command to run Nginx
CMD ["nginx", "-g", "daemon off;"]
