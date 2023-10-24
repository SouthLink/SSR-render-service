FROM node:16-alpine
WORKDIR /www
RUN sed -i 's/dl-cdn.alpinelinux.org/mirrors.aliyun.com/g' /etc/apk/repositories
RUN apk add --update chromium nginx
RUN npm install npm -g
RUN npm config set registry=http://registry.npm.taobao.org
COPY package.json package.json
RUN npm install
COPY nginx.conf /etc/nginx/nginx.conf
RUN mkdir -p /run/nginx
COPY ./ /www
# CMD nginx && EGG_SERVER_ENV=prod npm start
CMD nginx && npm run dev
