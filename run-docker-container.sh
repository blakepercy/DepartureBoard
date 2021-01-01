#!/bin/bash

docker run -p 8080:8080/tcp --detach -it --rm --name departure-board-running departure-board
