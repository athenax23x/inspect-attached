#!/usr/bin/env python3
"""Susun contact sheet dari banyak gambar supaya bisa ditinjau sekali lihat.

Pakai: make-contact-sheet.py <direktori> <keluaran.png> [kolom] [lebar-sel]
"""

import sys
from pathlib import Path

from PIL import Image, ImageDraw


def main() -> int:
    if len(sys.argv) < 3:
        print(__doc__)
        return 2

    src = Path(sys.argv[1])
    out = Path(sys.argv[2])
    cols = int(sys.argv[3]) if len(sys.argv) > 3 else 5
    cell = int(sys.argv[4]) if len(sys.argv) > 4 else 260

    files = sorted(p for p in src.iterdir() if p.suffix.lower() in {".jpg", ".jpeg", ".png", ".webp"})
    if not files:
        print("tidak ada gambar")
        return 1

    rows = (len(files) + cols - 1) // cols
    label_h = 22
    sheet = Image.new("RGB", (cols * cell, rows * (cell + label_h)), "white")
    draw = ImageDraw.Draw(sheet)

    for i, path in enumerate(files):
        try:
            with Image.open(path) as im:
                im = im.convert("RGB")
                im.thumbnail((cell - 8, cell - 8))
                x = (i % cols) * cell + (cell - im.width) // 2
                y = (i // cols) * (cell + label_h) + (cell - im.height) // 2
                sheet.paste(im, (x, y))
        except Exception as exc:  # noqa: BLE001
            print(f"lewati {path.name}: {exc}")
        draw.text(((i % cols) * cell + 4, (i // cols) * (cell + label_h) + cell + 4), path.stem[:34], fill="black")

    if out.suffix.lower() in {".jpg", ".jpeg"}:
        sheet.save(out, quality=80, optimize=True)
    else:
        sheet.save(out)
    print(f"{len(files)} gambar -> {out} ({sheet.width}x{sheet.height})")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
