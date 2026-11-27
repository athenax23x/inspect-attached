#!/usr/bin/env python3
"""Cari dan unduh calon foto produk dari Openverse (agregator berlisensi).

Openverse menyatukan Flickr, Wikimedia Commons, dan lainnya, dan setiap hasil
membawa metadata lisensi. Hanya lisensi yang boleh dipakai komersial yang
diambil (license_type=commercial).

Pakai: source-product-photos.py <daftar-istilah.json> <direktori-keluaran>
"""

import json
import sys
import time
import urllib.parse
import urllib.request
from pathlib import Path

API = "https://api.openverse.org/v1/images/"
UA = "dirt-dawn-theme/1.0 (product image sourcing)"


def search(term: str, limit: int = 12) -> list:
    query = urllib.parse.urlencode(
        {"q": term, "license_type": "commercial", "page_size": limit, "mature": "false"}
    )
    request = urllib.request.Request(f"{API}?{query}", headers={"User-Agent": UA})
    with urllib.request.urlopen(request, timeout=40) as response:
        results = json.load(response).get("results", [])
    # Hanya foto: buang ilustrasi, gambar vektor, dan animasi.
    keep = []
    for item in results:
        if item.get("category") not in (None, "photograph"):
            continue
        if (item.get("filetype") or "jpg") not in ("jpg", "jpeg", "png", "webp"):
            continue
        keep.append(item)
    return keep


def download(url: str, dest: Path) -> bool:
    if not url:
        return False
    try:
        request = urllib.request.Request(url, headers={"User-Agent": UA})
        with urllib.request.urlopen(request, timeout=40) as response:
            dest.write_bytes(response.read())
        return True
    except Exception as exc:  # noqa: BLE001 - laporan sederhana untuk skrip bantu
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
        print(f"== {slug}: {term}")
        try:
            results = search(term)
        except Exception as exc:  # noqa: BLE001
            print(f"   pencarian gagal: {exc}")
            results = []
            time.sleep(5)
        kept = []
        for i, item in enumerate(results):
            thumb = item.get("thumbnail") or item.get("url")
            dest = out_dir / f"{slug}-{i}.jpg"
            if download(thumb, dest):
                kept.append(
                    {
                        "file": dest.name,
                        "title": item.get("title"),
                        "license": item.get("license"),
                        "source": item.get("source"),
                        "creator": item.get("creator"),
                        "foreign_landing_url": item.get("foreign_landing_url"),
                        "url": item.get("url"),
                    }
                )
                print(f"   ok {dest.name}  {(item.get('title') or '')[:50]}")
        index[slug] = kept
        time.sleep(2)

    (out_dir / "index.json").write_text(json.dumps(index, indent=2, ensure_ascii=False), encoding="utf-8")
    print(f"\nTotal calon: {sum(len(v) for v in index.values())} -> {out_dir}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
