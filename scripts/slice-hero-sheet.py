#!/usr/bin/env python3
"""Build assets/caracter/Hero.png from the labelled reference sheet."""

from __future__ import annotations

from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
SRC = ROOT / "assets/caracter/ChatGPT Image 15 juin 2026, 21_21_40.png"
OUT = ROOT / "assets/caracter/Hero.png"
CELL = 100

# (x0, y0, x1, y1) on the reference sheet — one row per combat animation.
ANIM_ROWS: list[list[tuple[int, int, int, int]]] = [
    [(215, 330, 285, 479), (782, 330, 852, 479), (943, 330, 1016, 479)],
    [(782, 330, 852, 479), (943, 330, 1016, 479), (1131, 330, 1202, 479)],
    [(65, 330, 138, 479), (242, 587, 314, 731), (429, 587, 501, 731)],
    [(778, 587, 853, 731), (944, 587, 1016, 731), (1091, 587, 1162, 731)],
    [(75, 587, 162, 731), (778, 587, 853, 731), (1091, 587, 1162, 731)],
    [(67, 845, 146, 979), (212, 845, 286, 979), (342, 845, 417, 979)],
    [(525, 845, 601, 979), (700, 845, 839, 979)],
    [(962, 845, 1038, 979), (1136, 845, 1208, 979)],
]


def paste_centered(sheet: Image.Image, row: int, col: int, box: tuple[int, int, int, int], src: Image.Image) -> None:
    crop = src.crop(box)
    cw, ch = crop.size
    scale = min((CELL - 8) / cw, (CELL - 8) / ch)
    nw, nh = max(1, int(cw * scale)), max(1, int(ch * scale))
    resized = crop.resize((nw, nh), Image.NEAREST)
    cell = Image.new("RGBA", (CELL, CELL), (0, 0, 0, 0))
    cell.paste(resized, ((CELL - nw) // 2, CELL - nh - 4), resized)
    sheet.paste(cell, (col * CELL, row * CELL))


def main() -> None:
    if not SRC.exists():
        raise SystemExit(f"Missing source sheet: {SRC}")

    src = Image.open(SRC).convert("RGBA")
    max_cols = max(len(row) for row in ANIM_ROWS)
    sheet = Image.new("RGBA", (max_cols * CELL, len(ANIM_ROWS) * CELL), (0, 0, 0, 0))

    for row_index, frames in enumerate(ANIM_ROWS):
        for col_index, box in enumerate(frames):
            paste_centered(sheet, row_index, col_index, box, src)

    OUT.parent.mkdir(parents=True, exist_ok=True)
    sheet.save(OUT)
    print(f"Saved {OUT} ({sheet.width}x{sheet.height})")


if __name__ == "__main__":
    main()
