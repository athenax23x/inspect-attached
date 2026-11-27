#!/usr/bin/env python3
"""Ambil calon foto produk dari Burst (perpustakaan foto gratis Shopify).

Burst berisi foto asli, bukan ilustrasi, dan lisensinya mengizinkan pemakaian
komersial tanpa atribusi. Halaman pencariannya dirender di server, jadi hasilnya
bisa dibaca langsung.

Judul foto dipakai untuk menyaring: kandidat yang judulnya menyebut orang,
tangan, atau kaki dibuang, karena yang dicari adalah foto produk saja.

Pakai: source-burst-photos.py <daftar-istilah.json> <direktori-keluaran>
"""

import html
import json
import re
import sys
import time
import urllib.parse
import urllib.request
from pathlib import Path

SEARCH = "https://burst.shopify.com/photos/search?q="
UA = "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36"

# Kata yang menandakan ada orang di foto; kandidat seperti ini dibuang.
PEOPLE = (
    "hand", "hands", "person", "people", "man", "men", "woman", "women",
    "girl", "boy", "child", "children", "kid", "baby", "feet", "foot",
    "legs", "arm", "finger", "wearing", "wears", "model", "portrait",
    "face", "head", "shoulder", "holds", "holding", "carrying", "walking",
    "running", "sitting", "standing", "lying", "crouching", "jumping",
)


def fetch(url: str) -> str:
    request = urllib.request.Request(url, headers={"User-Agent": UA})
    with urllib.request.urlopen(request, timeout=45) as response:
        return response.read().decode("utf-8", errors="replace")


def parse_cards(page: str) -> list:
    """Ambil (judul, url) dari kartu foto di halaman hasil."""
    cards = []
    pattern = re.compile(
        r'data-photo-title="(?P<title>[^"]+)"[^>]*data-photo-id="(?P<id>\d+)"'
        r'[^>]*src="(?P<src>https://burst\.shopifycdn\.com/photos/[^"?]+)',
        re.S,
    )
    for match in pattern.finditer(page):
        cards.append(
            {
                "title": html.unescape(match.group("title")),
                "id": match.group("id"),
                "url": html.unescape(match.group("src")),
            }
        )
    return cards


def is_product_only(title: str) -> bool:
    low = f" {title.lower()} "
    return not any(f" {word} " in low or low.startswith(f" {word}") for word in PEOPLE)


def download(url: str, dest: Path) -> bool:
    try:
        request = urllib.request.Request(
            f"{url}?width=1000&format=pjpg&exif=0&iptc=0", headers={"User-Agent": UA}
        )
        with urllib.request.urlopen(request, timeout=45) as response:
            dest.write_bytes(response.read())
        return True
    except Exception as exc:  # noqa: BLE001
        print(f"      gagal: {exc}")
        return False


def main() -> int:
    if len(sys.argv) != 3:
        print(__doc__)
        return 2

    terms = json.loads(Path(sys.argv[1]).read_text(encoding="utf-8"))
    out_dir = Path(sys.argv[2])
    out_dir.mkdir(parents=True, exist_ok=True)

    index = {}
    for slug, term in terms.items():
        url = SEARCH + urllib.parse.quote_plus(term)
        try:
            cards = parse_cards(fetch(url))
        except Exception as exc:  # noqa: BLE001
            print(f"== {slug}: pencarian gagal ({exc})")
            cards = []

        kept = []
        for card in cards:
            if not is_product_only(card["title"]):
                continue
            dest = out_dir / f"{slug}-{len(kept)}.jpg"
            if download(card["url"], dest):
                kept.append({**card, "file": dest.name})
        index[slug] = kept
        print(f"== {slug:12s} {len(cards):3d} hasil -> {len(kept):2d} foto produk")
        time.sleep(1)

    (out_dir / "index.json").write_text(json.dumps(index, indent=2, ensure_ascii=False), encoding="utf-8")
    print(f"\nTotal: {sum(len(v) for v in index.values())} berkas -> {out_dir}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
