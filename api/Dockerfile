FROM node:18.16-alpine

WORKDIR /app

COPY *.json ./

RUN npm install

COPY . .

EXPOSE 7164

CMD ["npm", "run", "start:dev"]