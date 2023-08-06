FROM node:18.16-alpine

WORKDIR /app

COPY *.json ./

RUN npm install

COPY . .

EXPOSE 4444

RUN npm run prisma:start

CMD ["npm", "run", "deploy"]