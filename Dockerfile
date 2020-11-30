FROM node:14

WORKDIR /usr/src/app

COPY ./package*.json ./
RUN npm install

COPY ./dist .

CMD ["node", "server.js"]

EXPOSE 3000


