#!/bin/bash

scp package-lock.json idris-frontend:~/idris/
scp package.json idris-frontend:~/idris/
scp update.bash idris-frontend:~/idris/
scp -r public idris-frontend:~/idris/
scp -r src idris-frontend:~/idris/
