FROM node:latest

RUN mkdir -p /usr/src/transcendence

WORKDIR /usr/src/transcendence

COPY /frontend/package*.json /usr/src/transcendence

RUN npm install

COPY /frontend .

CMD ["npm", "run", "dev"]