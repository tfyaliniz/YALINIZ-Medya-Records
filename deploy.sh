#!/usr/bin/env bash
set -e

echo "=== Deploying YALINIZ Records to Ubuntu Host ==="
git pull origin master
npm ci
npm run build
pm2 reload ecosystem.config.js || pm2 start ecosystem.config.js
echo "=== Deployment Succeeded: records.yalinizmedya.com (Port 3015) ==="
