#!/usr/bin/env python3
"""Copy Ideogram combat assets from Desktop/assets into app prod paths."""

from __future__ import annotations

import shutil
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DEFAULT_SRC = Path.home() / "Desktop" / "assets"

TARGETS: dict[str, Path] = {
    "Hero.png": ROOT / "assets" / "caracter" / "Hero.png",
    "boss-sheet.png": ROOT / "assets" / "combat" / "boss-sheet.png",
    "arena-bg.png": ROOT / "assets" / "combat" / "arena-bg.png",
}

EXPECTED: dict[str, tuple[int, int]] = {
    "Hero.png": (300, 800),
    "boss-sheet.png": (300, 400),
    "arena-bg.png": (1000, 1200),
}


def main() -> None:
    src_dir = DEFAULT_SRC
    if not src_dir.is_dir():
        raise SystemExit(f"Missing source folder: {src_dir}")

    from PIL import Image

    for name, dest in TARGETS.items():
        src = src_dir / name
        if not src.is_file():
            raise SystemExit(f"Missing {src}")
        img = Image.open(src)
        exp = EXPECTED[name]
        if img.size != exp:
            raise SystemExit(f"{name}: expected {exp[0]}×{exp[1]}, got {img.size[0]}×{img.size[1]}")
        dest.parent.mkdir(parents=True, exist_ok=True)
        shutil.copy2(src, dest)
        print(f"{dest.relative_to(ROOT)} ← {src}")


if __name__ == "__main__":
    main()
