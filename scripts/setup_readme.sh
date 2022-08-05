#!/bin/sh
# must be ran inside scripts/ directory

git clone https://github.com/poseidon-code/poseidon-code

cp ./poseidon-code/README.md ../

cp -R ./poseidon-code/assets/ ../

cp "./poseidon-code/assets/resume/Resume - Pritam Halder.pdf" ../public/

rm -rf ./poseidon-code
