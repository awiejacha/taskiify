FROM node:16.3-buster-slim

LABEL Maintainer="Adrian Wiejacha"
LABEL Email="adrian.wiejacha@gmail.com"

RUN npm install --global fastify-cli
