# node-grpc-base

This repository demonstrates how to dockerize a node-grpc application for both server and client side.

## Docker Image

There is an official node-grpc docker image, but it doesn't seem to work in the latest release. The `Dockerfile` is as follow:

```Dockerfile
FROM grpc/node:0.11-onbuild
EXPOSE 50051
```

Instead, we use our own Dockerfile, with node-gyp installed to run the gRPC:

```Dockerfile
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
```

## Build


```bash
$ docker-compose build
```

## Verify Build

```bash
$ docker ps -a
```

Output:

```bash
CONTAINER ID        IMAGE                 COMMAND             CREATED             STATUS                    PORTS                        NAMES
a51f05979b50        nodegrpcbase_server   "node index.js"     27 seconds ago      Up 27 seconds             127.0.0.1:50051->50051/tcp   nodegrpcbase_server_1
2d7a4812a0b7        nodegrpcbase_client   "node index.js"     38 seconds ago      Exited (0) 1 second ago                                nodegrpcbase_client_1
```

## Docker Build

Check the gRPC server docker image size:

```bash
$ docker ps -a | grep server
nodegrpcbase_server                             latest              2bc96e04384a        8 minutes ago       200MB
```

Check the gRPC client docker image size:

```bash
$ docker ps -a | grep client
nodegrpcbase_client                             latest              c4c84877a017        2 minutes ago       254MB
```

## Test

```bash
$ docker-compose up client
```

Output:

```bash
Starting nodegrpcbase_client_1 ... done
Attaching to nodegrpcbase_client_1
client_1  | greeting from a51f05979b50: Hello, John Doe
nodegrpcbase_client_1 exited with code 0
```