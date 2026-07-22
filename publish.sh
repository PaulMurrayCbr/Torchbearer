#!/bin/bash

cp -r ~/git/Torchbearer/web/* ~/git/PaulMurrayCbr.github.io/Torchbearer
pushd ~/git/PaulMurrayCbr.github.io
git add Torchbearer
git status
git commit -m 'Torchbearer'
git push
popd

