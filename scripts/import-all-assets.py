#!/usr/bin/env python3
"""Import all AshHero assets: Ideogram combat sheets + badges with BG cleanup."""

from __future__ import annotations

import shutil
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SCRIPTS = ROOT / "scripts"
DOWNLOADS_OUT = Path.home() / "Downloads" / "ashhero-images-generees"
IDEogram_SRC = Path.home() / "Desktop" / "assets"

PROD = {
    "Hero.png": ROOT / "assets" / "caracter" / "Hero.png",
    "boss-sheet.png": ROOT / "assets" / "combat" / "boss-sheet.png",
    "arena-bg.png": ROOT / "assets" / "combat" / "arena-bg.png",
}


def run(script: str) -> None:
    subprocess.run([sys.executable, str(SCRIPTS / script)], check=True)


def sync_downloads_folder() -> None:
    DOWNLOADS_OUT.mkdir(parents=True, exist_ok=True)
    sources = [
        Path.home() / "Desktop" / "ashhero-images-generees",
        IDEogram_SRC,
    ]
    copied = 0
    for src_dir in sources:
        if not src_dir.is_dir():
            continue
        for path in sorted(src_dir.glob("*.png")):
            dest = DOWNLOADS_OUT / path.name
            if dest.exists() and dest.stat().st_size == path.stat().st_size:
                continue
            shutil.copy2(path, dest)
            copied += 1
    for name, prod in PROD.items():
        if prod.is_file():
            shutil.copy2(prod, DOWNLOADS_OUT / f"prod-{name}")
    for badge in (ROOT / "assets" / "icons" / "badges").glob("*.png"):
        shutil.copy2(badge, DOWNLOADS_OUT / f"prod-{badge.name}")
    print(f"Synced → {DOWNLOADS_OUT} ({copied} new copies)")


def main() -> None:
    run("import-ideogram-assets.py")
    run("import-badges.py")
    sync_downloads_folder()
    print("All assets imported into app.")


if __name__ == "__main__":
    main()
