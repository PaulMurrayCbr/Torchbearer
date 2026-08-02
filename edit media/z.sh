#!/bin/bash

rm ignite* extinguish* darkness*


cp djart* ignite-1.mp3
cp musicho* extinguish-1.mp3
cp univer* darkness-1.mp3


#This does:
#
#remove first 30 ms
#keep 1 second total
#10 ms fade-in (prevents clicks)
#200 ms fade-out
#
#ffmpeg -i whoosh.mp3 \
#  -ss 0.03 \
#  -t 1.0 \
#  -af "afade=t=in:st=0:d=0.01,afade=t=out:st=0.8:d=0.2" \
#  whoosh.ogg

ffmpeg -i ignite-1.mp3 \
-ac 1 -ar 48000 -c:a libopus -b:a 48k \
 -ss 1 \
  ignite-2.ogg

ffmpeg -i extinguish-1.mp3 \
-ac 1 -ar 48000 -c:a libopus -b:a 48k \
  extinguish-2.ogg

ffmpeg -i darkness-1.mp3 \
-ac 1 -ar 48000 -c:a libopus -b:a 48k \
  darkness-2.ogg




ls -ltr
