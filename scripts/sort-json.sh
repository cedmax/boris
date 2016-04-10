#!/bin/bash
FILES=./data/*
for f in $FILES
do
  npm run sort-json -- $f
done
