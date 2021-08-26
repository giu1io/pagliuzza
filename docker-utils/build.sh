#!/bin/sh

export $(cat .env | xargs)

TAG=$1

docker build . -t $DOCKER_REPO/$DOCKER_IMAGE:$TAG
docker tag $DOCKER_REPO/$DOCKER_IMAGE:$TAG $DOCKER_REPO/$DOCKER_IMAGE:latest
