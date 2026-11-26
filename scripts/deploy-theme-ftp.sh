#!/usr/bin/env bash
#
# Deploy tema Dirt & Dawn ke Hostinger lewat FTP/FTPS sekaligus merapikan
# public_html dari sisa export Next.js. Kredensial dibaca dari environment dan
# tidak pernah ditulis ke repo.
#
# Environment:
#   FTP_HOST  (wajib) host FTP, mis. ftp.domainanda.com atau IP hosting
#   FTP_USER  (wajib) username akun FTP
#   FTP_PASS  (wajib) password akun FTP
#   FTP_PORT  opsional, default 21
#   FTP_TLS   opsional, "no" untuk FTP polos (default: FTPS explicit)
#   FTP_ROOT  opsional, path relatif ke public_html kalau akun FTP berakar di
#             home directory (mis. domains/domainanda.com/public_html)
set -euo pipefail

MODE="${1:-}"

usage() {
  cat >&2 <<'TXT'
Pakai: deploy-theme-ftp.sh <theme|repair|all>

  theme   upload wordpress-theme/dirt-dawn/ ke wp-content/themes/dirt-dawn/
  repair  pindahkan sisa export Next.js di public_html ke _static-export-backup/
          dan pasang .htaccess WordPress yang benar
  all     repair lalu theme
TXT
  exit 2
}

case "$MODE" in
  theme|repair|all) ;;
  *) usage ;;
esac

: "${FTP_HOST:?Set FTP_HOST dulu}"
: "${FTP_USER:?Set FTP_USER dulu}"
: "${FTP_PASS:?Set FTP_PASS dulu}"

FTP_PORT="${FTP_PORT:-21}"
FTP_TLS="${FTP_TLS:-yes}"
FTP_ROOT="${FTP_ROOT:-}"
ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
THEME_SRC="$ROOT_DIR/wordpress-theme/dirt-dawn"
HTACCESS_SRC="$ROOT_DIR/wordpress-import/public_html-repair/htaccess"

# Semua path di bawah ini relatif terhadap direktori login FTP, dan sesi lftp
# selalu di-cd ke FTP_ROOT lebih dulu supaya tidak ada path bersarang.
THEME_DEST="wp-content/themes/dirt-dawn"
BACKUP_DIR="_static-export-backup"

TMP="$(mktemp)"
chmod 600 "$TMP"
trap 'rm -f "$TMP"' EXIT

# Sisa export Next.js yang dulu ada di root repo dan sekarang menutupi WordPress.
LEFTOVERS=(
  _next icons _not-found
  404.html index.html robots.txt sitemap.xml
  next.svg vercel.svg globe.svg file.svg window.svg
  account admin cancellation-policy cart checkout contact cookie-policy order
  payment-policy policies privacy-policy product returns-and-refunds
  shipping-and-delivery shop story terms-and-conditions warranty-policy wishlist
)

write_header() {
  {
    echo "set net:timeout 20"
    echo "set net:max-retries 3"
    echo "set net:reconnect-interval-base 5"
    echo "set ssl:verify-certificate no"
    if [ "$FTP_TLS" = "yes" ]; then
      echo "set ftp:ssl-force yes"
      echo "set ftp:ssl-protect-data yes"
    else
      echo "set ftp:ssl-force no"
      echo "set ftp:ssl-protect-data no"
    fi
    echo "set cmd:fail-exit no"
    echo "set mirror:parallel-transfer-count 4"
    if [ -n "$FTP_ROOT" ]; then
      echo "cd '$FTP_ROOT'"
    fi
  } > "$TMP"
}

run_script() {
  lftp -u "$FTP_USER,$FTP_PASS" -p "$FTP_PORT" "$FTP_HOST" < "$TMP"
}

# Nama entri di direktori login FTP. lftp menandai folder dengan garis miring
# di akhir, jadi di-strip dulu supaya bisa dibandingkan dengan nama polos.
remote_listing() {
  write_header
  echo "cls -1" >> "$TMP"
  run_script | tr -d '\r' | sed -e 's:/$::' -e '/^$/d' || true
}

deploy_theme() {
  echo ">> Upload tema ke $THEME_DEST"
  write_header
  echo "mirror -R --delete --verbose '$THEME_SRC' '$THEME_DEST'" >> "$TMP"
  run_script
}

collect_leftovers() {
  local listing name
  listing="$(remote_listing)"
  {
    for name in "${LEFTOVERS[@]}"; do
      if grep -qxF "$name" <<<"$listing"; then
        echo "$name"
      fi
    done
    while IFS= read -r name; do
      case "$name" in
        *.txt) echo "$name" ;;
      esac
    done <<<"$listing"
  } | sort -u
}

repair_public_html() {
  echo ">> Pindai isi public_html"
  local moves; moves="$(collect_leftovers)"

  echo ">> Pindahkan sisa export ke $BACKUP_DIR"
  write_header
  {
    echo "mkdir -p '$BACKUP_DIR'"
    while IFS= read -r name; do
      if [ -n "$name" ]; then
        echo "mv '$name' '$BACKUP_DIR'/"
      fi
    done <<<"$moves"
    # Rename .htaccess lama; kalau tidak ada, lftp hanya melapor dan lanjut
    # karena cmd:fail-exit no.
    echo "mv '.htaccess' '.htaccess.export-bak'"
    echo "put '$HTACCESS_SRC' -o '.htaccess'"
    echo "chmod 644 '.htaccess'"
  } >> "$TMP"
  run_script

  echo ">> Dipindahkan:"
  echo "${moves:-   (tidak ada sisa export)}" | sed 's/^/   /'
}

verify() {
  echo ">> public_html sekarang:"
  remote_listing | sed 's/^/   /'
  echo ">> $THEME_DEST:"
  write_header
  echo "cls -1 '$THEME_DEST'" >> "$TMP"
  run_script | tr -d '\r' | sed '/^$/d' | sed 's/^/   /' || true
}

case "$MODE" in
  repair) repair_public_html; verify ;;
  theme)  deploy_theme; verify ;;
  all)    repair_public_html; deploy_theme; verify ;;
esac
