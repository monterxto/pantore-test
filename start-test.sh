#!/usr/bin/env bash
set -e

/usr/src/app/wait-for-it.sh mongo:27017

npm run seed:run

npm run start
