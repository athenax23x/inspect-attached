#!/usr/bin/env bash
#
# Jalankan installer halaman sekali pakai di server lalu bersihkan.
#
# Environment: FTP_HOST, FTP_USER, FTP_PASS, SITE_URL (mis. https://domain),
# opsional FTP_PORT / FTP_TLS / FTP_ROOT / MODE (create|force).
set -euo pipefail

: "${FTP_HOST:?Set FTP_HOST dulu}"
: "${FTP_USER:?Set FTP_USER dulu}"
: "${FTP_PASS:?Set FTP_PASS dulu}"
: "${SITE_URL:?Set SITE_URL dulu}"

MODE="${MODE:-create}"
FTP_PORT="${FTP_PORT:-21}"
FTP_TLS="${FTP_TLS:-yes}"
FTP_ROOT="${FTP_ROOT:-}"
ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SRC="$ROOT_DIR/wordpress-import/remote"
PAGES_JSON="$ROOT_DIR/wordpress-import/wp-install-pages.json"

STAMP="$(date -u +%Y%m%d%H%M%S)-$$"
REMOTE_PHP="wpi-$STAMP.php"
REMOTE_TOKEN="wp-install-token.txt"
TOKEN="$(head -c 48 /dev/urandom | base64 | tr -dc 'A-Za-z0-9' | head -c 40)"

WORK="$(mktemp -d)"
chmod 700 "$WORK"
trap 'rm -rf "$WORK"' EXIT

printf '%s' "$TOKEN" > "$WORK/$REMOTE_TOKEN"

LFTP_OPTS=(-u "$FTP_USER,$FTP_PASS" -p "$FTP_PORT")
SETTINGS=(
  "set net:timeout 25"
  "set net:max-retries 3"
  "set ssl:verify-certificate no"
  "set cmd:fail-exit yes"
)
if [ "$FTP_TLS" = "yes" ]; then
  SETTINGS+=("set ftp:ssl-force yes" "set ftp:ssl-protect-data yes")
else
  SETTINGS+=("set ftp:ssl-force no" "set ftp:ssl-protect-data no")
fi

lftp_run() {
  local script="$1"
  { for s in "${SETTINGS[@]}"; do echo "$s"; done; cat "$script"; } \
    | lftp "${LFTP_OPTS[@]}" "$FTP_HOST"
}

cleanup_remote() {
  local script="$WORK/cleanup.lftp"
  : > "$script"
  if [ -n "$FTP_ROOT" ]; then echo "cd '$FTP_ROOT'" >> "$script"; fi
  {
    echo "rm -f '$REMOTE_PHP'"
    echo "rm -f '$REMOTE_TOKEN'"
    echo "rm -f 'wp-install-pages.json'"
  } >> "$script"
  lftp_run "$script" >/dev/null 2>&1 || true
}

echo ">> Upload installer + data halaman"
{
  if [ -n "$FTP_ROOT" ]; then echo "cd '$FTP_ROOT'"; fi
  echo "put '$SRC/wp-install-pages.php' -o '$REMOTE_PHP'"
  echo "put '$PAGES_JSON' -o 'wp-install-pages.json'"
  echo "put '$WORK/$REMOTE_TOKEN' -o '$REMOTE_TOKEN'"
} > "$WORK/upload.lftp"
lftp_run "$WORK/upload.lftp"

echo ">> Jalankan installer"
RESPONSE="$(curl -sS --max-time 120 "$SITE_URL/$REMOTE_PHP?token=$TOKEN&mode=$MODE" || true)"
printf '%s\n' "$RESPONSE"

echo ">> Bersihkan file installer dari server"
cleanup_remote
echo ">> Selesai"
