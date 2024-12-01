#!/usr/bin/env bash
set -e

/usr/src/app/wait-for-it.sh mongo:27017

npm run start:dev
