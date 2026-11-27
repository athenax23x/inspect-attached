#!/usr/bin/env python3
"""Bikin wordmark DIRT & DAWN sebagai SVG mandiri di tema.

Font Fraunces disematkan sebagai base64 di dalam SVG supaya logo tetap tampil
dengan huruf merek walau dipakai sebagai <img> (mis. Site Logo WordPress),
di mana font halaman tidak tersedia.
"""

import base64
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
THEME = ROOT / "wordpress-theme" / "dirt-dawn"
FONT = THEME / "assets" / "fonts" / "fraunces-latin.woff2"
OUT = THEME / "assets" / "logo.svg"

WIDTH, HEIGHT = 300, 52
INK = "#20211e"
AMP = "#82735f"


def main() -> int:
    if not FONT.is_file():
        print(f"Font tidak ditemukan: {FONT}")
        return 1

    encoded = base64.b64encode(FONT.read_bytes()).decode("ascii")
    svg = f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {WIDTH} {HEIGHT}" width="{WIDTH}" height="{HEIGHT}" role="img" aria-label="Dirt &amp; Dawn">
<style>
@font-face{{font-family:'FrauncesEmbed';src:url(data:font/woff2;base64,{encoded}) format('woff2');font-weight:100 900;font-style:normal;font-display:swap;}}
.dnd-wordmark{{font-family:'FrauncesEmbed',Georgia,'Times New Roman',serif;font-weight:500;font-size:34px;fill:{INK};}}
</style>
<text class="dnd-wordmark" x="2" y="38" textLength="{WIDTH - 4}" lengthAdjust="spacing">DIRT <tspan fill="{AMP}">&amp;</tspan> DAWN</text>
</svg>
"""
    OUT.write_text(svg, encoding="utf-8")
    print(f"Dibuat: {OUT} ({len(svg)} karakter, font {FONT.stat().st_size} byte disematkan)")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
