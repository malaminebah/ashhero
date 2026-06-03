#!/usr/bin/env python3
"""Slice assets/32x32.png into categorized assets/icons folders."""

from __future__ import annotations

import json
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "assets" / "32x32.png"
OUT = ROOT / "assets" / "icons"

CELL = 32
COLS = 16

# Row bands for 137-row sheet (scaled from original 60-row layout).
ROW_BANDS: list[tuple[str, int, int]] = [
    ("misc", 0, 18),
    ("materials", 18, 37),
    ("food", 37, 50),
    ("potions", 50, 64),
    ("magic", 64, 82),
    ("crafting", 82, 96),
    ("weapons", 96, 119),
    ("armor", 119, 137),
]

CATEGORIES = [name for name, _, _ in ROW_BANDS]


def category_for_row(row: int) -> str:
    for name, start, end in ROW_BANDS:
        if start <= row < end:
            return name
    return "misc"


def is_empty(icon: Image.Image, threshold: int = 80) -> bool:
    px = icon.load()
    opaque = 0
    for y in range(icon.height):
        for x in range(icon.width):
            if px[x, y][3] > 10:
                opaque += 1
    return opaque < threshold


def main() -> None:
    if not SOURCE.exists():
        raise SystemExit(f"Missing source sheet: {SOURCE}")

    sheet = Image.open(SOURCE).convert("RGBA")
    w, h = sheet.size
    cols = w // CELL
    rows = h // CELL

    if cols < COLS:
        raise SystemExit(f"Sheet width {w} too small for {COLS} cols at {CELL}px")

    for cat in CATEGORIES:
        (OUT / cat).mkdir(parents=True, exist_ok=True)

    (OUT / "tabs").mkdir(parents=True, exist_ok=True)

    manifest: list[dict[str, int | str]] = []

    for row in range(rows):
        category = category_for_row(row)
        folder = OUT / category

        for col in range(cols):
            x0, y0 = col * CELL, row * CELL
            icon = sheet.crop((x0, y0, x0 + CELL, y0 + CELL))
            if is_empty(icon):
                continue

            name = f"r{row:03d}_c{col:02d}.png"
            icon.save(folder / name)

            manifest.append(
                {
                    "id": f"{category}/{name[:-4]}",
                    "category": category,
                    "row": row,
                    "col": col,
                    "file": f"icons/{category}/{name}",
                }
            )

    meta = {
        "source": "assets/32x32.png",
        "cellPx": CELL,
        "cols": cols,
        "rows": rows,
        "bands": [{"category": n, "rowStart": s, "rowEnd": e} for n, s, e in ROW_BANDS],
        "count": len(manifest),
        "icons": manifest,
    }

    (OUT / "manifest.json").write_text(json.dumps(meta, indent=2), encoding="utf-8")

    readme = f"""# Icônes RPG (32×32)

Source : `assets/32x32.png` — grille **{cols}×{rows}**, cellules **{CELL}×{CELL} px**.

## Dossiers

| Dossier | Lignes | Contenu |
|---------|--------|---------|
| `misc` | 0–17 | UI, clés, coffres |
| `materials` | 18–36 | minerais, gemmes |
| `food` | 37–49 | nourriture |
| `potions` | 50–63 | potions |
| `magic` | 64–81 | sorts |
| `crafting` | 82–95 | craft |
| `weapons` | 96–118 | armes |
| `armor` | 119–136 | armures |

## Regénérer

```bash
python3 scripts/slice-icon-sheet.py
```
"""
    (OUT / "README.md").write_text(readme, encoding="utf-8")
    print(f"Exported {len(manifest)} icons ({cols}x{rows} @ {CELL}px) to {OUT}")


if __name__ == "__main__":
    main()
