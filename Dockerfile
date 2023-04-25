FROM node:16.3.0-alpine
WORKDIR /app
RUN apk add -U tzdata
RUN ln -fs /usr/share/zoneinfo/Asia/Kolkata /etc/localtime
RUN echo "Asia/Kolkata" >  /etc/timezone
COPY package.json ./
COPY package-lock.json ./
COPY ./ ./
RUN npm i
RUN npm run build
EXPOSE 5432
EXPOSE 8080
EXPOSE 9000
EXPOSE 3000
CMD ["npm", "run", "start"]
