FROM node:lts

WORKDIR /app

COPY package.json /app

RUN npm install

COPY /src /app/src

CMD ["npm", "start"]