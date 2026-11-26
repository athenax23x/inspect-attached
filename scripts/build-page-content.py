#!/usr/bin/env python3
"""Bangun wordpress-import/wp-install-pages.json dari pages.xml + sumber tambahan.

JSON ini jadi sumber tunggal untuk halaman yang belum ada di WordPress:
9 halaman dari pages.xml (kebijakan + kontak), halaman Story, dan Home.
"""

import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
WXR = ROOT / "wordpress-import" / "pages.xml"
STORY_SRC = ROOT / "wordpress-import" / "pages-source" / "story.html"
OUT = ROOT / "wordpress-import" / "wp-install-pages.json"


def clean_html(html: str) -> str:
    """Buang hal yang tidak boleh ada di isi halaman WordPress.

    - <style>: WordPress membuang tag ini untuk pengguna tanpa izin
      unfiltered_html, dan teks CSS-nya lalu tampil sebagai isi halaman.
      Gaya blok kebijakan/Story sekarang tinggal di style.css tema.
    - komentar HTML pengarang: ikut tampil sebagai teks di dalam paragraf.
    """
    html = re.sub(r"<style\b.*?</style>", "", html, flags=re.S | re.I)
    html = re.sub(r"<!--.*?-->", "", html, flags=re.S)
    html = re.sub(r"^\s+", "", html)
    return html.strip() + "\n"


def parse_wxr(text: str) -> list:
    pages = []
    for item in re.findall(r"<item>.*?</item>", text, re.S):
        name = re.search(r"<wp:post_name><!\[CDATA\[(.*?)\]\]></wp:post_name>", item, re.S)
        title = re.search(r"<title>(.*?)</title>", item, re.S)
        content = re.search(r"<content:encoded><!\[CDATA\[(.*?)\]\]></content:encoded>", item, re.S)
        if not (name and title and content):
            continue
        pages.append(
            {
                "slug": name.group(1).strip(),
                "title": title.group(1).strip().replace("&amp;", "&"),
                "content": clean_html(content.group(1)),
            }
        )
    return pages


def build() -> list:
    pages = parse_wxr(WXR.read_text(encoding="utf-8"))

    pages.append(
        {
            "slug": "story",
            "title": "Our Story",
            "content": clean_html( STORY_SRC.read_text(encoding="utf-8") ),
            # Tema lama mencari slug 'about'; simpan sebagai alias.
            "aliases": ["about"],
        }
    )
    # Halaman kosong untuk homepage statis; front-page.php yang mengisinya.
    pages.append({"slug": "home", "title": "Home", "content": ""})
    return pages


def main() -> int:
    pages = build()
    OUT.write_text(json.dumps(pages, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    print(f"Dibuat: {OUT} ({len(pages)} halaman)")
    for page in pages:
        print("  %-24s %-34s %d karakter" % (page["slug"], page["title"][:32], len(page["content"])))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
