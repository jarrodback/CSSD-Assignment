FROM node:16-alpine
RUN npm install -g http-server
WORKDIR /ui
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 8080
CMD ["npm", "run", "serve"]