#!/bin/bash

GREEN='\033[0;32m'
NO_COLOR='\033[0m'

function run() {
  echo -e "\n - ($GREEN$1$NO_COLOR) run $GREEN$2$NO_COLOR" && yarn run $2;
}

function goAndRun() {
  cd ./$1 && run $1 $2 && cd ../
}

run / prettier && \

goAndRun shared build && \
goAndRun shared lint && \

goAndRun be-db build && \
goAndRun be-db lint && \

goAndRun be-api typecheck && \
goAndRun be-api build:po && \
goAndRun be-api build && \
goAndRun be-api lint && \
goAndRun be-api test && \

goAndRun fe-web build:po && \
goAndRun fe-web typecheck && \
goAndRun fe-web build && \
goAndRun fe-web lint && \
