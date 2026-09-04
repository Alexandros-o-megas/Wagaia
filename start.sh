#!/bin/bash
set -e
ROOT="$(cd "$(dirname "$0")" && pwd)"

cd "$ROOT/backend"
if [ ! -d node_modules ]; then
  npm install
fi

cd "$ROOT/frontend"
if [ ! -d node_modules ]; then
  npm install
fi

cd "$ROOT/backend"
npm run start &
API_PID=$!

cd "$ROOT/frontend"
npm run dev

trap "kill $API_PID" EXIT
