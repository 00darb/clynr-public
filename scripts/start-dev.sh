#!/bin/bash

# Start all development servers
# 1. Expo dev server (port 8081)
# 2. Express server (port 5000) 
# 3. Vite dev server for web dashboard (port 3000)

# Start Vite dev server for web dashboard
cd web && npx vite --host &
VITE_PID=$!

# Go back to root
cd ..

# Start Expo dev server
EXPO_PACKAGER_PROXY_URL=https://$REPLIT_DEV_DOMAIN \
REACT_NATIVE_PACKAGER_HOSTNAME=$REPLIT_DEV_DOMAIN \
EXPO_PUBLIC_DOMAIN=$REPLIT_DEV_DOMAIN \
npx expo start --localhost &
EXPO_PID=$!

# Start Express server
NODE_ENV=development tsx server/index.ts &
SERVER_PID=$!

# Handle shutdown
trap "kill $VITE_PID $EXPO_PID $SERVER_PID 2>/dev/null" EXIT

# Wait for any process to exit
wait
