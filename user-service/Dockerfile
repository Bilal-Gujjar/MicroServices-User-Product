# Use the official Node.js image.
FROM node:16

# Create and change to the app directory.
WORKDIR /usr/src/app

# Install app dependencies.
COPY package*.json ./
RUN npm install

# Copy app files.
COPY . .

# Expose the port the app runs on.
EXPOSE 4000

# Run the app.
CMD ["npm", "run", "start:dev"]
