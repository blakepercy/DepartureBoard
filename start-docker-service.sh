#!/bin/bash

docker service create \
  --name="departure-board-service" \
  --publish=8080:8080/tcp \
  departure-board

docker service create \
  --name="visualiser-service" \
  --publish=8081:8080/tcp \
  --constraint=node.role==manager \
  --mount=type=bind,src=/var/run/docker.sock,dst=/var/run/docker.sock \
  alexellis2/visualizer-arm:latest
