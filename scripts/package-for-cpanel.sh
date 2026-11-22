#!/usr/bin/env bash
# Build a cPanel-ready zip of the Neotelabs Laravel app.
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

OUT_DIR="${1:-/opt/cursor/artifacts}"
STAMP="$(date -u +%Y%m%d-%H%M%S)"
NAME="neotelabs-cpanel-${STAMP}"
STAGE="$(mktemp -d)/${NAME}"
ZIP_PATH="${OUT_DIR}/${NAME}.zip"

mkdir -p "$OUT_DIR" "$STAGE"

echo "==> Installing PHP deps (no-dev)…"
composer install --no-dev --optimize-autoloader --no-interaction

echo "==> Building frontend assets…"
npm ci --silent
npm run build

echo "==> Assembling package…"
tar -C "$ROOT" \
  --exclude='.git' \
  --exclude='.cursor' \
  --exclude='node_modules' \
  --exclude='tests' \
  --exclude='.phpunit.result.cache' \
  --exclude='storage/logs' \
  --exclude='storage/framework/cache/data' \
  --exclude='storage/framework/sessions' \
  --exclude='storage/framework/views' \
  --exclude='storage/pail' \
  --exclude='.env' \
  --exclude='.env.backup' \
  --exclude='public/hot' \
  --exclude='public/storage' \
  --exclude='*.zip' \
  --exclude='Homestead.json' \
  --exclude='Homestead.yaml' \
  --exclude='_ide_helper.php' \
  -cf - . | tar -C "$STAGE" -xf -
# Keep empty storage dirs
mkdir -p \
  "$STAGE/storage/app/public" \
  "$STAGE/storage/framework/cache/data" \
  "$STAGE/storage/framework/sessions" \
  "$STAGE/storage/framework/views" \
  "$STAGE/storage/logs"
touch \
  "$STAGE/storage/app/.gitignore" \
  "$STAGE/storage/framework/cache/data/.gitignore" \
  "$STAGE/storage/framework/sessions/.gitignore" \
  "$STAGE/storage/framework/views/.gitignore" \
  "$STAGE/storage/logs/.gitignore"

# Production env template for the host
cp "$ROOT/.env.cpanel.example" "$STAGE/.env.example"
cp "$ROOT/.env.cpanel.example" "$STAGE/.env.cpanel.example"

# Drop local SQLite if present
rm -f "$STAGE/database/database.sqlite"

# Include a short upload readme
cat > "$STAGE/UPLOAD-TO-CPANEL.txt" <<'EOF'
Neotelabs — cPanel upload package
=================================

1. Unzip into ~/neoteagency (or public_html).
2. Point the domain document root to the /public folder
   OR keep the root .htaccess that rewrites into /public.
3. Copy .env.cpanel.example to .env and fill APP_URL + MySQL + SMTP.
4. SSH / Terminal:
     php artisan key:generate
     php artisan migrate --force
     php artisan db:seed --force
     php artisan storage:link
     php artisan config:cache
     php artisan route:cache
     php artisan view:cache
     chmod -R 775 storage bootstrap/cache
5. Add cron (every minute):
     * * * * * cd /home/USER/neoteagency && php artisan schedule:run >> /dev/null 2>&1
6. Login: /login  →  admin@neotelabs.com / password  (change immediately)

Full guide: DEPLOY-CPANEL.md
EOF

echo "==> Zipping…"
(
  cd "$(dirname "$STAGE")"
  zip -rq "$ZIP_PATH" "$(basename "$STAGE")"
)

# Stable copy for the latest package
cp -f "$ZIP_PATH" "${OUT_DIR}/neotelabs-cpanel-latest.zip"

# Size report
du -h "$ZIP_PATH"
echo "Package ready: $ZIP_PATH"
echo "Also copied as: ${OUT_DIR}/neotelabs-cpanel-latest.zip"
