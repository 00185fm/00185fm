FROM alpine:latest AS production
ARG PB_PORT
ENV PB_PORT $PB_PORT
WORKDIR /pb
COPY ./pocketbase ./
EXPOSE $PB_PORT