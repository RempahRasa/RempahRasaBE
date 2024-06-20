FROM node:20-bullseye-slim

WORKDIR /app

ENV PORT 3000
COPY package.json ./

COPY . .

RUN npm i typescript

EXPOSE 3000

CMD ["npm","run","start"]