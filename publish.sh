#!/bin/bash

cp -r ~/git/Torchbearer/web/* ~/git/PaulMurrayCbr.github.io/Torchbearer0
pushd ~/git/PaulMurrayCbr.github.io
git add Torchbearer0
git status
git commit -m 'Torchbearer'
git push
popd

