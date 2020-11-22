FROM node:14.15
WORKDIR /app
EXPOSE 8080
COPY ./app/package.json .
#RUN npm install
#EXPOSE 8080
