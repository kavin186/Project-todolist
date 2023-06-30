FROM node:alpine AS development
WORKDIR /app
COPY ./package.json /app
RUN npm install axios
RUN npm install
COPY . .
EXPOSE 3000
CMD npm start
