#!/usr/bin/env python3
"""Bikin ulang wordpress-theme/dirt-dawn-theme.zip dari folder wordpress-theme/dirt-dawn.

Zip-nya bisa di-upload manual: wp-admin -> Appearance -> Themes -> Add New -> Upload Theme.
"""

import os
import sys
import zipfile
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "wordpress-theme" / "dirt-dawn"
OUT = ROOT / "wordpress-theme" / "dirt-dawn-theme.zip"


def main() -> int:
    if not (SRC / "style.css").is_file():
        print(f"Tidak menemukan {SRC / 'style.css'}", file=sys.stderr)
        return 1

    OUT.unlink(missing_ok=True)
    with zipfile.ZipFile(OUT, "w", zipfile.ZIP_DEFLATED) as archive:
        for dirpath, dirnames, filenames in os.walk(SRC):
            dirnames[:] = sorted(d for d in dirnames if d != ".git")
            rel = Path(dirpath).relative_to(SRC.parent)
            archive.writestr(f"{rel.as_posix()}/", "")
            for name in sorted(filenames):
                if name == ".DS_Store":
                    continue
                path = Path(dirpath) / name
                archive.write(path, (rel / name).as_posix())

    print(f"Dibuat: {OUT}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
