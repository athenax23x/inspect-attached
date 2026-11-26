#!/usr/bin/env bash
#
# Pindahkan sisa export Next.js + file source repo keluar dari folder web ke
# _static-export-backup/ supaya halaman WordPress bisa diakses dan source tidak
# terbaca publik. TIDAK PERNAH menghapus apa pun dan TIDAK menyentuh file inti
# WordPress: hanya nama di daftar LEFTOVERS yang dipindah.
#
# Pakai: cleanup-webroot.sh <preview|apply|purge-preview|purge>
#
# Environment: FTP_HOST, FTP_USER, FTP_PASS, opsional FTP_PORT/FTP_TLS/FTP_ROOT.
set -euo pipefail

MODE="${1:-preview}"
case "$MODE" in
  preview|apply|purge-preview|purge) ;;
  *) echo "Pakai: cleanup-webroot.sh <preview|apply|purge-preview|purge>" >&2; exit 2 ;;
esac

: "${FTP_HOST:?Set FTP_HOST dulu}"
: "${FTP_USER:?Set FTP_USER dulu}"
: "${FTP_PASS:?Set FTP_PASS dulu}"

FTP_PORT="${FTP_PORT:-21}"
FTP_TLS="${FTP_TLS:-yes}"
FTP_ROOT="${FTP_ROOT:-}"
BACKUP_DIR="_static-export-backup"

# Folder + file hasil export Next.js dan salinan source repo. Tidak ada nama
# inti WordPress di sini (wp-*.php, index.php, .htaccess, license.txt,
# readme.html, wp-admin, wp-includes, wp-content).
LEFTOVERS=(
  _next _not-found icons policies product public src stock wordpress
  account admin cancellation-policy cart checkout contact cookie-policy order
  payment-policy privacy-policy returns-and-refunds shipping-and-delivery
  shop story terms-and-conditions warranty-policy wishlist
  404.html next.svg vercel.svg globe.svg file.svg window.svg
  sitemap.xml shop.html shop.txt index.txt robots.txt index.html.bak
  package.json package-lock.json next.config.ts tsconfig.json
  eslint.config.mjs AGENTS.md README.md .gitignore .mlai
  .htaccess.bak .htaccess_original
)

TMP="$(mktemp)"
chmod 600 "$TMP"
trap 'rm -f "$TMP"' EXIT

{
  echo "set net:timeout 25"
  echo "set net:max-retries 3"
  echo "set ssl:verify-certificate no"
  echo "set cmd:fail-exit no"
  if [ "$FTP_TLS" = "yes" ]; then
    echo "set ftp:ssl-force yes"
    echo "set ftp:ssl-protect-data yes"
  else
    echo "set ftp:ssl-force no"
    echo "set ftp:ssl-protect-data no"
  fi
  if [ -n "$FTP_ROOT" ]; then echo "cd '$FTP_ROOT'"; fi
  echo "cls -1"
} > "$TMP"

LISTING="$(lftp -u "$FTP_USER,$FTP_PASS" -p "$FTP_PORT" "$FTP_HOST" < "$TMP" \
  | tr -d '\r' | sed -e 's:/$::' -e '/^$/d' || true)"

PRESENT=()
for name in "${LEFTOVERS[@]}"; do
  if grep -qxF "$name" <<<"$LISTING"; then
    PRESENT+=("$name")
  fi
done

echo ">> Ditemukan ${#PRESENT[@]} item sisa export di folder web:"
printf '   %s\n' "${PRESENT[@]}"

if [ "$MODE" = "preview" ]; then
  echo ">> Mode preview: tidak ada yang diubah."
  exit 0
fi

# --- Mode purge: hapus sisa export yang tidak dipakai WordPress -------------
# Daftar eksplisit; tidak ada nama inti WordPress di sini. Folder backup dari
# mode apply juga dihapus karena isinya source repo yang sebelumnya bisa dibaca
# publik (mis. /_static-export-backup/package.json).
if [ "$MODE" = "purge" ] || [ "$MODE" = "purge-preview" ]; then
  PURGE_FILES=(
    _not-found.html _not-found.txt
    account.html account.txt admin.html admin.txt
    cancellation-policy.html cancellation-policy.txt
    cart.html cart.txt checkout.html checkout.txt
    contact.html contact.txt cookie-policy.html cookie-policy.txt
    order.html order.txt payment-policy.html payment-policy.txt
    privacy-policy.html privacy-policy.txt
    returns-and-refunds.html returns-and-refunds.txt
    shipping-and-delivery.html shipping-and-delivery.txt
    story.html story.txt
    terms-and-conditions.html terms-and-conditions.txt
    warranty-policy.html warranty-policy.txt
    wishlist.html wishlist.txt
  )
  PURGE_DIRS=( "_static-export-backup" )

  echo ">> Akan dihapus:"
  printf '   %s\n' "${PURGE_FILES[@]}"
  printf '   %s/\n' "${PURGE_DIRS[@]}"

  if [ "$MODE" = "purge-preview" ]; then
    echo ">> Mode purge-preview: tidak ada yang dihapus."
    exit 0
  fi

  {
    echo "set net:timeout 25"
    echo "set net:max-retries 3"
    echo "set ssl:verify-certificate no"
    echo "set cmd:fail-exit no"
    if [ "$FTP_TLS" = "yes" ]; then
      echo "set ftp:ssl-force yes"
      echo "set ftp:ssl-protect-data yes"
    fi
    if [ -n "$FTP_ROOT" ]; then echo "cd '$FTP_ROOT'"; fi
    for name in "${PURGE_FILES[@]}"; do
      echo "rm -f '$name'"
    done
    for name in "${PURGE_DIRS[@]}"; do
      echo "rm -rf '$name'"
    done
  } > "$TMP"

  lftp -u "$FTP_USER,$FTP_PASS" -p "$FTP_PORT" "$FTP_HOST" < "$TMP"
  echo ">> Purge selesai. Cek: /wp-admin/, /shop/, /story/, /contact/ harus 200."
  exit 0
fi

{
  echo "set net:timeout 25"
  echo "set net:max-retries 3"
  echo "set ssl:verify-certificate no"
  echo "set cmd:fail-exit no"
  if [ "$FTP_TLS" = "yes" ]; then
    echo "set ftp:ssl-force yes"
    echo "set ftp:ssl-protect-data yes"
  else
    echo "set ftp:ssl-force no"
    echo "set ftp:ssl-protect-data no"
  fi
  if [ -n "$FTP_ROOT" ]; then echo "cd '$FTP_ROOT'"; fi
  echo "mkdir -p '$BACKUP_DIR'"
  for name in "${PRESENT[@]}"; do
    echo "mv '$name' '$BACKUP_DIR'/"
  done
} > "$TMP"

echo ">> Memindahkan ke $BACKUP_DIR/"
lftp -u "$FTP_USER,$FTP_PASS" -p "$FTP_PORT" "$FTP_HOST" < "$TMP"

echo ">> Isi folder web sekarang:"
{
  echo "set net:timeout 25"
  echo "set ssl:verify-certificate no"
  if [ "$FTP_TLS" = "yes" ]; then
    echo "set ftp:ssl-force yes"
    echo "set ftp:ssl-protect-data yes"
  fi
  if [ -n "$FTP_ROOT" ]; then echo "cd '$FTP_ROOT'"; fi
  echo "cls -1"
} > "$TMP"
lftp -u "$FTP_USER,$FTP_PASS" -p "$FTP_PORT" "$FTP_HOST" < "$TMP" \
  | tr -d '\r' | sed '/^$/d' | sed 's/^/   /' || true
