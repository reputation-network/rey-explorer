FROM node:8-alpine

RUN apk add --no-cache git python make g++
RUN yarn global add lerna

WORKDIR /app
COPY package.json ./
COPY yarn.lock ./
COPY gulpfile.js ./

RUN yarn install --no-cache
COPY . .
RUN yarn prepare

EXPOSE 8000
CMD ["yarn", "start"]
