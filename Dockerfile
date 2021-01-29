FROM node:lts-slim

LABEL application="client-details-mock"
LABEL maintainer="Karan Shah"
LABEL version="1.0.0"

USER node

RUN mkdir -p /home/node/app

WORKDIR /home/node/app

COPY --chown=node:node package.json package-lock.json ./

RUN npm ci --only=production --no-optional --no-audit

COPY --chown=node:node . .

EXPOSE 8000

CMD [ "node", "server.js" ]

