#!/usr/bin/env bash
#
# Render SVG produk (dari build-product-images.py) menjadi PNG 700x700 dengan
# Chrome headless. Hasilnya masuk ke wordpress-import/product-images/.
#
# Pakai: render-product-images.sh
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SVG_DIR="$ROOT/wordpress-import/product-images/svg"
PNG_DIR="$ROOT/wordpress-import/product-images/png"
CHROME="${CHROME:-google-chrome}"

python3 "$ROOT/scripts/build-product-images.py" "$SVG_DIR"
mkdir -p "$PNG_DIR"

count=0
for svg in "$SVG_DIR"/*.svg; do
  name="$(basename "$svg" .svg)"
  "$CHROME" --headless --disable-gpu --no-sandbox --hide-scrollbars \
    --window-size=700,700 --force-device-scale-factor=1 \
    --virtual-time-budget=4000 \
    --screenshot="$PNG_DIR/$name.png" "file://$svg" >/dev/null 2>&1
  count=$((count + 1))
done

echo "$count PNG -> $PNG_DIR"
