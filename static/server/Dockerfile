FROM mhart/alpine-node:9.11.1

WORKDIR /app

COPY package.json yarn.lock ./

RUN apk add --no-cache --virtual .gyp \
        python \
        make \
        g++ \
    && yarn install --production \
    && apk del .gyp gcc g++ python

COPY . .

EXPOSE 50051

CMD ["node", "index.js"]