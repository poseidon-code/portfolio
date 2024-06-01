#!/usr/bin/env sh
# must be ran inside scripts/ directory

git clone https://github.com/poseidon-code/poseidon-code

cp -f ./poseidon-code/README.md ../

cp -Rf ./poseidon-code/assets/ ../

cp -f "./poseidon-code/assets/resume/Resume - Pritam Halder.pdf" ../public/

rm -rf ./poseidon-code
