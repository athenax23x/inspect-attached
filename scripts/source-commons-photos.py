#!/usr/bin/env python3
"""Cari calon foto produk di Wikimedia Commons dan unduh thumbnailnya.

Commons menyimpan foto produk asli dengan metadata lisensi yang jelas. Hanya
berkas berlisensi bebas (CC0, public domain, CC BY, CC BY-SA) yang diambil;
lisensi non-bebas dan berkas non-foto disaring.

Pakai: source-commons-photos.py <daftar-istilah.json> <direktori-keluaran>
"""

import json
import sys
import urllib.parse
import urllib.request
from pathlib import Path

API = "https://commons.wikimedia.org/w/api.php"
UA = "dirt-dawn-theme/1.0 (product photo sourcing; contact: store owner)"
FREE = ("cc0", "public domain", "cc by", "cc-by", "pd-")


def api(params: dict) -> dict:
    params = {**params, "format": "json", "action": "query"}
    request = urllib.request.Request(
        f"{API}?{urllib.parse.urlencode(params)}", headers={"User-Agent": UA}
    )
    with urllib.request.urlopen(request, timeout=45) as response:
        return json.load(response)


def search(term: str, limit: int = 10) -> list:
    data = api(
        {
            "generator": "search",
            "gsrsearch": f"{term} filetype:bitmap",
            "gsrnamespace": 6,
            "gsrlimit": limit,
            "prop": "imageinfo",
            "iiprop": "url|extmetadata|size",
            "iiurlwidth": 600,
        }
    )
    return list(((data.get("query") or {}).get("pages") or {}).values())


def info_of(page: dict) -> dict:
    info = (page.get("imageinfo") or [{}])[0]
    meta = info.get("extmetadata") or {}
    return {
        "title": (page.get("title") or "").replace("File:", ""),
        "thumb": info.get("thumburl"),
        "width": info.get("width"),
        "height": info.get("height"),
        "license": ((meta.get("LicenseShortName") or {}).get("value") or "").strip(),
        "artist": ((meta.get("Artist") or {}).get("value") or "").strip(),
        "page": info.get("descriptionurl"),
    }


def is_free(license_name: str) -> bool:
    low = license_name.lower()
    return any(token in low for token in FREE)


def download(url: str, dest: Path) -> bool:
    if not url:
        return False
    try:
        request = urllib.request.Request(url, headers={"User-Agent": UA})
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
        pages = search(term)
        kept = []
        for page in pages:
            info = info_of(page)
            if not is_free(info["license"]):
                continue
            dest = out_dir / f"{slug}-{len(kept)}.jpg"
            if download(info["thumb"], dest):
                kept.append({**info, "file": dest.name})
        index[slug] = kept
        print(f"== {slug:10s} {len(kept):2d} kandidat  ({term})")

    (out_dir / "index.json").write_text(json.dumps(index, indent=2, ensure_ascii=False), encoding="utf-8")
    print(f"\nTotal: {sum(len(v) for v in index.values())} berkas -> {out_dir}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
