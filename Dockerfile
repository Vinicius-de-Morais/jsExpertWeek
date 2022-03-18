FROM node:17-slim

RUN apt-get update \
  && apt-get install -y sox libsox-fmt-mp3

# libsox-fmt-all

WORKDIR /spotify-radio/

COPY package.json yarn.lock /spotify-radio/

RUN apt install yarn -y \ 
    && yarn install --frozen-lockfile

COPY . .

USER node

CMD npm run live-reload