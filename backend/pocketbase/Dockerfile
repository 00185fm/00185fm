FROM alpine:latest

WORKDIR /pb

ARG PB_VERSION=0.19.3
ARG PB_PORT=4090

RUN apk add --no-cache \
    unzip \
    ca-certificates

ADD https://github.com/pocketbase/pocketbase/releases/download/v${PB_VERSION}/pocketbase_${PB_VERSION}_linux_amd64.zip /tmp/pb.zip
RUN unzip /tmp/pb.zip -d /pb/

EXPOSE $PB_PORT