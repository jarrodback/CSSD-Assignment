# syntax=docker/dockerfile:1
FROM node:16-alpine
RUN apk add --no-cache python2 g++ make
WORKDIR /server
COPY . .
RUN npm install
ENV NODE_ENV production
CMD ["node", "bin/www"]