#!/bin/bash

function newWindow() {
  TARGET=$(tmux new-window -P)
}

function splitHorizontally() {
  TARGET=$(tmux split-window -P -v -l ${1:-50}% -t ${2:-$TARGET})
}

function splitVertically() {
  TARGET=$(tmux split-window -P -h -l ${1:-50}% -t ${2:-$TARGET})
}

function run() {
  tmux send-keys -t ${TARGET} "$1" C-m
}

if [[ $TMUX ]]; then
  tmux bind q kill-session

  newWindow

  run "cd be-api && yarn run watch:po"

  splitHorizontally 80

  run "cd fe-web && yarn run watch:po"

  splitHorizontally 75

  run "cd be-db && yarn run pg:start"

  splitHorizontally 66

  run "cd shared && yarn run watch"

  splitHorizontally 50

  run "cd fe-web && yarn run watch"

  splitVertically 66 :2.1

  run "cd be-db && yarn run build && NODE_ENV=development yarn run pg:migrate up"

  splitVertically 66 :2.3

  run "cd fe-web && yarn run watch:storybook"

  splitVertically 66 :2.5

  run "cd be-api && yarn run watch";
else
  tmux new-session $0;
fi
