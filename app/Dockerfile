FROM alpine:latest

RUN apk add --update nodejs nodejs-npm
RUN npm install -g typescript

WORKDIR /usr/src/app

COPY ./package*.json ./
RUN npm install

COPY . .

RUN tsc

COPY --from=registry.lucasrobin.fr/i2fc-fa-devis-habitation-static /app/dist ./dist/public

CMD ["node", "./dist/server.js"]

EXPOSE 3000


