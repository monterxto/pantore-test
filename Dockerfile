FROM node:22.11.0-alpine AS build

RUN apk add --no-cache bash
RUN npm i -g @nestjs/cli typescript ts-node

WORKDIR /usr/src/app

COPY --chown=node:node package*.json ./

RUN npm ci

COPY --chown=node:node . .

RUN npm run build

ENV NODE_ENV=production

RUN npm ci --only=production && npm cache clean --force

USER node

FROM node:22.11.0-alpine AS production

COPY --chown=node:node --from=build /usr/src/app/node_modules ./node_modules
COPY --chown=node:node --from=build /usr/src/app/dist ./dist

CMD [ "node", "dist/main.js" ]
