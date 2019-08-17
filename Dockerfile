FROM node:10

ENV WEB_HOME=/

WORKDIR /usr/src/app
COPY . .

EXPOSE 80

ENTRYPOINT ["yarn", "prod"]
