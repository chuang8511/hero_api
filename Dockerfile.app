FROM node:19

WORKDIR /usr/src/app
COPY package*.json ./

RUN npm install

RUN apt-get update && \
    apt-get install -y redis-server postgresql-client && \
    rm -rf /var/lib/apt/lists/*

COPY . .

RUN npm run build

EXPOSE 3000
EXPOSE 5432
EXPOSE 1311
EXPOSE 6379

CMD [ "npm", "run", "serve"]
