FROM node:14 AS builder
WORKDIR .
COPY package*.json ./
RUN npm cache verify
RUN npm install
COPY . .
RUN npm cache verify
ENV GENERATE_SOURCEMAP false
RUN yarn build

FROM nginx
EXPOSE 3000
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /build /usr/share/nginx/html