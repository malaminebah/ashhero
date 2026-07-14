#!/usr/bin/env python3
"""Build Hero.png from the perso.png reference sheet (labelled animation bands)."""

from __future__ import annotations

from collections import deque
from pathlib import Path

from PIL import Image

CELL = 100
COLS = 3
ROWS = 8

# (x0, x1) crops on perso.png — one row per soldierSheet animation row.
FRAME_BOXES: list[list[tuple[int, int]]] = [
    # idle — IDLE (de dos, bande du haut)
    [(28, 58), (68, 92), (101, 130)],
    # attackBreathe — RESPIRER (vert)
    [(401, 450), (461, 511), (520, 605)],
    # attackWater — EAU
    [(23, 58), (75, 150), (162, 217)],
    # attackDistract — étoiles
    [(303, 352), (362, 420), (431, 475)],
    # attackSpecial — SPÉCIALE violet
    [(24, 73), (89, 168), (370, 428)],
    # hurt — DÉGÂTS
    [(24, 60), (75, 116), (127, 166)],
    # death — KO
    [(200, 244), (264, 337)],
    # victory
    [(388, 422), (456, 502)],
]

ROW_Y: list[tuple[int, int]] = [
    (35, 85),
    (40, 86),
    (130, 175),
    (130, 175),
    (222, 268),
    (314, 356),
    (314, 356),
    (314, 356),
]


def is_perso_background(r: int, g: int, b: int, a: int) -> bool:
    if a < 12:
        return True
    return r + g + b <= 3


def flood_strip(img: Image.Image) -> Image.Image:
    rgba = img.convert("RGBA")
    px = rgba.load()
    w, h = rgba.size
    seeds: deque[tuple[int, int]] = deque()

    for x in range(w):
        seeds.append((x, 0))
        seeds.append((x, h - 1))
    for y in range(h):
        seeds.append((0, y))
        seeds.append((w - 1, y))

    seen: set[tuple[int, int]] = set()
    while seeds:
        x, y = seeds.popleft()
        if (x, y) in seen or x < 0 or y < 0 or x >= w or y >= h:
            continue
        seen.add((x, y))
        r, g, b, a = px[x, y]
        if not is_perso_background(r, g, b, a):
            continue
        px[x, y] = (0, 0, 0, 0)
        seeds.extend(((x + 1, y), (x - 1, y), (x, y + 1), (x, y - 1)))

    return rgba


def frame_to_cell(frame: Image.Image, *, cell: int = CELL) -> Image.Image:
    frame = flood_strip(frame)
    bbox = frame.getbbox()
    if not bbox:
        return Image.new("RGBA", (cell, cell), (0, 0, 0, 0))

    content = frame.crop(bbox)
    cw, ch = content.size
    max_h, max_w = 90, 88
    scale = min(max_w / cw, max_h / ch)
    nw = max(1, int(round(cw * scale)))
    nh = max(1, int(round(ch * scale)))
    content = content.resize((nw, nh), Image.NEAREST)

    out = Image.new("RGBA", (cell, cell), (0, 0, 0, 0))
    x = (cell - nw) // 2
    y = cell - nh - 8
    out.paste(content, (x, y), content)
    return out


def build_hero_sheet(src: Path, out: Path) -> None:
    src_img = Image.open(src).convert("RGBA")
    sheet = Image.new("RGBA", (COLS * CELL, ROWS * CELL), (0, 0, 0, 0))

    for row, boxes in enumerate(FRAME_BOXES):
        y0, y1 = ROW_Y[row]
        for col, (x0, x1) in enumerate(boxes):
            raw = src_img.crop((x0, y0, x1, y1))
            cell = frame_to_cell(raw)
            sheet.paste(cell, (col * CELL, row * CELL))

    out.parent.mkdir(parents=True, exist_ok=True)
    sheet.save(out, "PNG")
    print(f"Hero sheet → {out} ({sheet.size[0]}×{sheet.size[1]})")


def main() -> None:
    root = Path(__file__).resolve().parents[1]
    build_hero_sheet(
        root / "assets" / "images" / "perso.png",
        root / "assets" / "caracter" / "Hero.png",
    )


if __name__ == "__main__":
    main()
