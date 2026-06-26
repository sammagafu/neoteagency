#!/bin/sh
set -e

mkdir -p \
  /app/data \
  /app/public/uploads/case-studies \
  /app/public/uploads/gallery \
  /app/public/uploads/team \
  /app/public/uploads/clients

chown -R nextjs:nodejs /app/data /app/public/uploads

if [ "$(id -u)" = "0" ]; then
  exec su -s /bin/sh nextjs -c 'cd /app && exec "$@"' sh "$@"
fi

exec "$@"
