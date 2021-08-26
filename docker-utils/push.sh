#!/bin/sh

export $(cat .env | xargs)

TAG=$1

docker push $DOCKER_REPO/$DOCKER_IMAGE:$TAG
docker push $DOCKER_REPO/$DOCKER_IMAGE:latest
