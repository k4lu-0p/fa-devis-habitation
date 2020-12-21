FROM node:12 AS builder

WORKDIR /app

COPY ./frontend ./
COPY ./frontend/package*.json ./

RUN npm install
RUN npm run build

FROM alpine:latest

RUN apk add --update nodejs nodejs-npm
RUN npm install -g typescript

WORKDIR /usr/src/app

COPY ./package*.json ./
RUN npm install

COPY . .

RUN tsc

COPY --from=builder /app/dist ./dist/public

CMD ["node", "./dist/server.js"]

EXPOSE 3000


