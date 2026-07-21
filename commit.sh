#!/bin/bash

if [ $# -eq 0 ]; then
    echo "Usage: $0 commit message"
    exit 1
fi

MESSAGE="$*"

git add web/
git commit -m "$MESSAGE"
TAG=$(git describe --tags --always)
git log -1 --format='export gitinfo = {"commit":"%h","hash":"%H","timestamp":"%cI","message":"%s","tag"="'$TAG'","ref":"%D"};' > web/js/gitinfo.js
git log -1 --oneline
git add web/js/commit.json
git commit -m "$MESSAGE"
