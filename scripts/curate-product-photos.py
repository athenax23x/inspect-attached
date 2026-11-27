#!/usr/bin/env python3
"""Pilih foto produk asli dari hasil Burst dan beri nama sesuai produknya.

Skrip ini menyalin berkas terpilih dari hasil unduhan Burst ke
wordpress-import/product-images/photos/ dengan slug produk, lalu menulis
CREDITS.md berisi judul asli, ID, dan tautan setiap foto untuk catatan lisensi.

Foto Burst adalah foto asli (bukan ilustrasi) dan boleh dipakai komersial.

Pakai: curate-product-photos.py <direktori-berisi-bs-dan-bs3>
"""

import json
import shutil
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "wordpress-import" / "product-images" / "photos"
CREDITS = ROOT / "wordpress-import" / "product-images" / "PHOTO-CREDITS.md"

# slug produk -> berkas Burst terpilih (dinilai satu per satu: hanya produk).
# Nilai kedua adalah direktori sumber, karena hasil unduhan datang dari dua
# putaran pencarian.
SELECTION = {
    # Apparel
    "tee-charcoal": ("tee-3", "bs"),
    "tee-red": ("tee-10", "bs"),
    "tee-navy": ("tee-2", "bs"),
    "tee-forest": ("tee-0", "bs"),
    "shorts-teal": ("shorts-4", "bs"),
    "shorts-pattern": ("shorts-5", "bs"),
    "bra-white": ("bra-18", "bs"),
    "bra-black": ("bra-12", "bs"),
    "tights": ("leggings-flat-18", "bs3"),
    "tights-warm": ("leggings-flat-19", "bs3"),
    # Equipment
    "backpack-28": ("backpack-1", "bs"),
    "backpack-20": ("backpack-2", "bs"),
    "backpack-day": ("backpack-17", "bs"),
    "bottle-500": ("bottle-4", "bs"),
    "bottle-250": ("bottle-5", "bs"),
    "bottle-steel": ("bottle-8", "bs"),
    "mat": ("mat-0", "bs"),
    # Recovery
    "roller-blue": ("roller-5", "bs"),
    "roller-black": ("roller-6", "bs"),
    "roller-teal": ("roller-7", "bs"),
    # Accessories
    "socks-white": ("socks-3", "bs"),
    "socks-pattern": ("socks-10", "bs"),
    "socks-stripe": ("socks-6", "bs"),
    "cap": ("cap-0", "bs"),
    "glasses-aviator": ("sunglasses-4", "bs"),
    "glasses-white": ("sunglasses-0", "bs"),
    "glasses-tortoise": ("sunglasses-16", "bs"),
    # Electronics
    "watch": ("sports-watch-2", "bs3"),
    "tracker": ("smartwatch-2", "bs3"),
    # Footwear
    "shoe-trail": ("shoes-0", "bs"),
    "shoe-road": ("shoes-4", "bs"),
}


def main() -> int:
    if len(sys.argv) != 2:
        print(__doc__)
        return 2

    base_dir = Path(sys.argv[1])
    OUT.mkdir(parents=True, exist_ok=True)

    index = {}
    for name in ("bs", "bs3"):
        path = base_dir / name / "index.json"
        if path.is_file():
            index.update(json.loads(path.read_text(encoding="utf-8")))

    # Peta berkas -> metadata asli, supaya kredit bisa ditulis.
    by_file = {}
    for entries in index.values():
        for entry in entries:
            by_file[entry["file"]] = entry

    lines = [
        "# Kredit foto produk",
        "",
        "Semua foto produk di folder ini berasal dari **Burst** "
        "(https://burst.shopify.com), perpustakaan foto gratis Shopify:",
        "foto asli, boleh dipakai untuk keperluan komersial, tanpa atribusi wajib.",
        "Kredit tetap dicatat di sini sebagai bukti asal-usul.",
        "",
        "| Produk (slug) | Judul foto | ID | Tautan |",
        "| --- | --- | --- | --- |",
    ]

    copied = 0
    missing = []
    for slug, (source, source_dir) in SELECTION.items():
        candidates = sorted((base_dir / source_dir).glob(f"{source}.jpg"))
        if not candidates:
            missing.append(source)
            continue
        dest = OUT / f"{slug}.jpg"
        shutil.copy(candidates[0], dest)
        copied += 1

        meta = by_file.get(f"{source}.jpg") or {}
        title = meta.get("title") or source
        photo_id = meta.get("id") or ""
        url = f"https://burst.shopify.com/photos/{source}" if photo_id else ""
        lines.append(f"| `{slug}` | {title} | {photo_id} | {url} |")

    CREDITS.write_text("\n".join(lines) + "\n", encoding="utf-8")
    print(f"{copied} foto disalin ke {OUT}")
    if missing:
        print(f"tidak ditemukan: {missing}")
    print(f"kredit: {CREDITS}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
