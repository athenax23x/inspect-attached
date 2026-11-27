#!/usr/bin/env bash
#
# Unggah gambar produk + katalog + importer ke server, jalankan, lalu bersihkan.
#
# Environment: FTP_HOST, FTP_USER, FTP_PASS, SITE_URL,
# opsional FTP_PORT / FTP_TLS / FTP_ROOT.
set -euo pipefail

: "${FTP_HOST:?Set FTP_HOST dulu}"
: "${FTP_USER:?Set FTP_USER dulu}"
: "${FTP_PASS:?Set FTP_PASS dulu}"
: "${SITE_URL:?Set SITE_URL dulu}"

FTP_PORT="${FTP_PORT:-21}"
FTP_TLS="${FTP_TLS:-yes}"
FTP_ROOT="${FTP_ROOT:-}"
ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
REMOTE_DIR="$ROOT_DIR/wordpress-import/remote"
PNG_DIR="$ROOT_DIR/wordpress-import/product-images/png"
CATALOG="$ROOT_DIR/wordpress-import/products-catalog.json"

STAMP="$(date -u +%Y%m%d%H%M%S)-$$"
REMOTE_PHP="wip-$STAMP.php"
TOKEN="$(head -c 48 /dev/urandom | base64 | tr -dc 'A-Za-z0-9' | head -c 40)"

WORK="$(mktemp -d)"
chmod 700 "$WORK"
trap 'rm -rf "$WORK"' EXIT

printf '%s' "$TOKEN" > "$WORK/wp-import-token.txt"

SETTINGS=(
  "set net:timeout 30"
  "set net:max-retries 3"
  "set ssl:verify-certificate no"
  "set cmd:fail-exit yes"
  "set mirror:parallel-transfer-count 3"
)
if [ "$FTP_TLS" = "yes" ]; then
  SETTINGS+=("set ftp:ssl-force yes" "set ftp:ssl-protect-data yes")
else
  SETTINGS+=("set ftp:ssl-force no" "set ftp:ssl-protect-data no")
fi

lftp_run() {
  { for s in "${SETTINGS[@]}"; do echo "$s"; done; cat "$1"; } \
    | lftp -u "$FTP_USER,$FTP_PASS" -p "$FTP_PORT" "$FTP_HOST"
}

cd_into_root() {
  if [ -n "$FTP_ROOT" ]; then echo "cd '$FTP_ROOT'"; fi
}

echo ">> Unggah importer, katalog, dan $(ls "$PNG_DIR"/*.png | wc -l) gambar produk"
{
  cd_into_root
  echo "put '$REMOTE_DIR/wp-import-products.php' -o '$REMOTE_PHP'"
  echo "put '$CATALOG' -o 'products-catalog.json'"
  echo "put '$WORK/wp-import-token.txt' -o 'wp-import-token.txt'"
  echo "mkdir -p 'product-images'"
} > "$WORK/upload.lftp"
lftp_run "$WORK/upload.lftp"

{
  cd_into_root
  echo "mirror -R '$PNG_DIR' 'product-images'"
} > "$WORK/images.lftp"
lftp_run "$WORK/images.lftp"

echo ">> Jalankan importer"
curl -sS --max-time 300 "$SITE_URL/$REMOTE_PHP?token=$TOKEN" || true
echo

echo ">> Bersihkan berkas importer dari server"
{
  cd_into_root
  echo "rm -f '$REMOTE_PHP' 'wp-import-token.txt' 'products-catalog.json'"
  echo "rm -rf 'product-images'"
} > "$WORK/cleanup.lftp"
lftp_run "$WORK/cleanup.lftp" >/dev/null 2>&1 || true
echo ">> Selesai"
