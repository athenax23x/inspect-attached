#!/usr/bin/env bash
#
# Upload folder tema ke Hostinger lewat FTP/FTPS.
#
# TIDAK PERNAH menghapus apa pun di server: cermin dijalankan tanpa --delete,
# jadi file yang tidak ada di repo (mis. template woocommerce/ milik versi
# sebelumnya) tetap utuh. Untuk merapikan folder web, pakai cleanup-webroot.sh.
#
# Environment: FTP_HOST, FTP_USER, FTP_PASS, opsional FTP_PORT/FTP_TLS/FTP_ROOT.
set -euo pipefail

: "${FTP_HOST:?Set FTP_HOST dulu}"
: "${FTP_USER:?Set FTP_USER dulu}"
: "${FTP_PASS:?Set FTP_PASS dulu}"

FTP_PORT="${FTP_PORT:-21}"
FTP_TLS="${FTP_TLS:-yes}"
FTP_ROOT="${FTP_ROOT:-}"
ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
THEME_SRC="$ROOT_DIR/wordpress-theme/dirt-dawn"
THEME_DEST="${FTP_ROOT%/}/wp-content/themes/dirt-dawn"

TMP="$(mktemp)"
chmod 600 "$TMP"
trap 'rm -f "$TMP"' EXIT

{
  echo "set net:timeout 25"
  echo "set net:max-retries 3"
  echo "set ssl:verify-certificate no"
  echo "set cmd:fail-exit yes"
  echo "set mirror:parallel-transfer-count 4"
  if [ "$FTP_TLS" = "yes" ]; then
    echo "set ftp:ssl-force yes"
    echo "set ftp:ssl-protect-data yes"
  else
    echo "set ftp:ssl-force no"
    echo "set ftp:ssl-protect-data no"
  fi
  [ -n "$FTP_ROOT" ] && echo "cd '$FTP_ROOT'" || true
  # -R = rekursif naik, --only-newer tidak dipakai, TANPA --delete.
  echo "mirror -R --verbose '$THEME_SRC' '$THEME_DEST'"
} > "$TMP"

echo ">> Upload $THEME_SRC -> $THEME_DEST (tanpa hapus)"
lftp -u "$FTP_USER,$FTP_PASS" -p "$FTP_PORT" "$FTP_HOST" < "$TMP"
echo ">> Selesai"
