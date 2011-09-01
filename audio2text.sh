#!/bin/bash
if [ -z "$1" ]; then 
   echo usage: $0 directory "Provide a file name"
   exit
fi
echo =======================================================

echo Moving to data folder
cd ../nodejs-pocketsphinxdata

echo Branching to user branch
git checkout User

echo Commiting new transcription
git add $1
git commit -m "added file from user"

echo Branching to machinetranscription branch
git checkout MachineTranscription
git merge User

echo Converting mp3 to pcm


echo Running pocketsphinx
echo "0:00:00.020,0:00:00.020\nResults of the machine transcription will appear below when ready.\n\n" >> $1
cd ../nodejs-pocketsphinx/testinstallpocketsphinx
./hello_ps goforward.raw | grep Recognized >> ../../nodejs-pocketsphinxdata/$1
cd ../../nodejs-pocketsphinxdata

echo Committing new transcripion
git add $1
git commit -m "ran pocketsphinx"


echo Server transcription ready, change status to transcription fresh
git checkout master

cd ../nodejs-pocketsphinx

echo ===============================================================
