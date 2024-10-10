# Step 1: Use the official Node.js image as the base
FROM node:20-alpine AS builder

# Step 2: Set the working directory inside the container
WORKDIR /app

# Step 3: Copy the package.json and package-lock.json
COPY package.json package-lock.json ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy the entire project to the working directory
COPY . .

# Step 6: Build the Next.js application for production
RUN npm run build

# Step 7: Use a lightweight image to serve the app in production
FROM node:20-alpine AS runner

# Step 8: Set the working directory for the production app
WORKDIR /app

# Step 9: Copy the production-ready build files from the builder stage
COPY --from=builder /app ./

# Step 10: Install only production dependencies
RUN npm install --production

# Step 11: Expose the port the app will run on
EXPOSE 4000

# Step 12: Start the Next.js app in production mode
CMD ["npm", "start"]
