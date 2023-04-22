FROM node:14.5.0-alpine
WORKDIR /app
COPY package.json ./
COPY package-lock.json ./
COPY ./ ./
RUN npm i
RUN npm run build
RUN  npm install -g serve
EXPOSE 5432
EXPOSE 8080
EXPOSE 9000
EXPOSE 3000
CMD ["npm", "run", "start"]
