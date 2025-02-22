FROM node:22-alpine AS build
RUN apk add --no-cache openssl

WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
RUN npm run migrate
CMD ["npm", "run", "start"]