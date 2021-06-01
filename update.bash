#!/bin/bash

forever stopall
npm i
npm run build
npm install -g serve
forever start -c "serve -l 3000 -s" ./build