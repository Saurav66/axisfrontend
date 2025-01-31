FROM node:16.3.0-alpine
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm run install
COPY . .
EXPOSE 3000
CMD ["npm", "run", "start"]

