#to install dependencies

FROM node:18-alpine AS dependencies
WORKDIR /app
COPY package*.json package-lock.json*  ./
RUN npm install
#to build the source code
FROM node:18-alpine AS builder
WORKDIR /app
COPY --from=dependencies /app/node_modules ./node_modules
COPY . .
RUN npm run build
#to run the app
FROM node:18-alpine AS runner
WORKDIR /app
#to set the environment to production
ENV NODE_ENV production
#to copy the public folder  
COPY --from=builder /app/public ./public
#to copy the next folder
COPY --from=builder /app/.next ./.next
#to copy the node_modules folder
COPY --from=builder /app/node_modules ./node_modules
#to copy the package.json file 
COPY --from=builder /app/package.json ./package.json

#to expose the port

EXPOSE 3000
#to start the app
CMD ["npm", "start"]