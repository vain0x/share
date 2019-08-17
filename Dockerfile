FROM node:10

WORKDIR /usr/src/app
COPY . .

EXPOSE 80

ENTRYPOINT ["yarn", "prod"]
