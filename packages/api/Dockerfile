FROM node:12.13.0-alpine AS alpine

WORKDIR /api

COPY package.json .

RUN npm install -g concurrently
RUN npm install

COPY . .

EXPOSE 4000

ARG AWS_ACCESS_KEY_ID
ARG AWS_SECRET_ACCESS_KEY
ENV AWS_ACCESS_KEY_ID=$AWS_ACCESS_KEY_ID
ENV AWS_SECRET_ACCESS_KEY=$AWS_SECRET_ACCESS_KEY
ENV AWS_REGION='us-east-1'
ENV NODE_ENV production

CMD ["concurrently","npm:start", "npm:start-subscriber"]