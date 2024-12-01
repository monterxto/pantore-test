FROM node:22.11.0-alpine

RUN apk add --no-cache bash
RUN npm i -g @nestjs/cli typescript ts-node

WORKDIR /usr/src/app

COPY package*.json ./

COPY . .

RUN npm install
RUN chmod +x ./wait-for-it.sh
RUN chmod +x ./start-dev.sh
RUN sed -i 's/\r//g' ./wait-for-it.sh
RUN sed -i 's/\r//g' ./start-dev.sh

RUN if [ ! -f .env ]; then cp env-example .env; fi

CMD ["/usr/src/app/start-dev.sh"]