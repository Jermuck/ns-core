FROM node:18.16-alpine

WORKDIR /app

COPY *.json ./

RUN npm install

COPY . .

CMD ["npm", "run", "start:dev"]
