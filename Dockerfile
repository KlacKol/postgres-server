FROM node:14.8.0-alpine
WORKDIR /app
COPY package*.json ./
RUN npm i
COPY . /app
EXPOSE 8080
CMD ["npm","run","dev"]
FROM nginx:1.19.2-alpine
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
