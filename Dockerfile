# Use the official Node.js 14 image as the base image
FROM node:20-bullseye-slim


RUN npm install -g typescript

WORKDIR /app

COPY package.json ./

COPY . .

RUN npm install

EXPOSE 3000

CMD ["npm","run","start"]