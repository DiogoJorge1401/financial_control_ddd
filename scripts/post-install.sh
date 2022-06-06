#!/bin/bash

# This file checks the environment and executes a specific command

NODEJS_ENV="$(printenv | awk '/^NODE_ENV/{print $1}' | cut -d '=' -f2)";

if [[ "$NODEJS_ENV" == "production" ]]; then

  echo "Production";

else

  npm run generate:gql

fi