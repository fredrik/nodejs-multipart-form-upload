#!/bin/bash
if [ -z "$1" ]; then 
  echo usage: $0 directory "Provide a file name (without the .srt, .amr, .wav suffixes)"
   exit
fi
echo "======================================================="

echo ==Moving to data folder
cd ../nodejs-pocketsphinxdata

touch ../nodejs-pocketsphinxtemp/$1_server.srt
echo ==Creating files _client, _server and .srt
cp ../nodejs-pocketsphinxtemp/$1_client.srt $1.srt

echo ==Branching to user branch
git checkout User
git add *.srt
git commit -m "added file $1 from user"

echo ==Branching to machinetranscription branch
git checkout MachineTranscription
git merge User

echo ==Converting mp3/amr $1.amr to pcm/wav $1.wav
ffmpeg -y -i ../nodejs-pocketsphinxtemp/$1.amr ../nodejs-pocketsphinxtemp/$1.wav

echo ==Running pocketsphinx
echo "0:00:00.020,0:00:00.020\nResults of the machine transcription will appear below when ready.\n\n" >> $1.srt
#170word gramamr: java -jar ../nodejs-pocketsphinx/sphinx4files/transcriber/bin/Transcriber.jar ../nodejs-pocketsphinxtemp/$1.wav 2>&1 | tee -a $1.srt 
java -jar /home/gina/.groovy/lib/sphinx4/bin/LatticeDemo.jar ../nodejs-pocketsphinxtemp/$1.wav | grep "I heard:" | sed -e 's/I heard://' 2>&1 | tee -a $1.srt 

cp $1.srt ../nodejs-pocketsphinxtemp/$1_server.srt
#cd ../nodejs-pocketsphinx/testinstallpocketsphinx
#./hello_ps goforward.raw | grep Recognized >> ../../nodejs-pocketsphinxdata/$1
#cd ../../nodejs-pocketsphinxdata

echo "==Committing new transcripion"
git add *.srt
git commit -m "ran pocketsphinx on $1"

echo "==Processing prosody with Praat"
praat ../nodejs-pocketsphinx/praatfiles/praat-script-syllable-nuclei-v2file.praat -25 2 0.3 yes /home/gina/aublog/nodejs-pocketsphinxworkspace/nodejs-pocketsphinxtemp $1.wav 2>&1 | tee -a praatresults.csv

echo "==Commiting new acoustic results"
git add praatresults.csv
git commit -m "ran praat on $1"

echo "==Server transcription is ready."
#git checkout master #leave it in the MachineTranascription branch so that the node will copy the right version of the file into the server's response.

cd ../nodejs-pocketsphinx

echo "==============================================================="
