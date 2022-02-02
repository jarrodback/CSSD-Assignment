# syntax=docker/dockerfile:1
FROM node:16-alpine
RUN apk add --no-cache python2 g++ make
WORKDIR /server
COPY . .
RUN npm install
CMD ["node", "bin/www"]