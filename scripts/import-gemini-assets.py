#!/usr/bin/env python3
"""Slice Gemini spritesheets into exact AshHero grid sheets."""

from __future__ import annotations

from collections import deque
from pathlib import Path

from PIL import Image


def is_flood_background(r: int, g: int, b: int, a: int, *, mode: str) -> bool:
    if a < 12:
        return True
    if mode == "boss":
        if r > 190 and g > 190 and b > 190:
            return True
        if max(r, g, b) - min(r, g, b) < 20 and min(r, g, b) > 165:
            return True
        return False
    # Hero: only light checkerboard / white + pure black grid from edges.
    if r + g + b <= 6:
        return True
    if min(r, g, b) >= 155 and max(r, g, b) - min(r, g, b) < 40:
        return True
    return False


def flood_strip(img: Image.Image, *, mode: str) -> Image.Image:
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

    seen = set()
    while seeds:
        x, y = seeds.popleft()
        if (x, y) in seen or x < 0 or y < 0 or x >= w or y >= h:
            continue
        seen.add((x, y))
        r, g, b, a = px[x, y]
        if not is_flood_background(r, g, b, a, mode=mode):
            continue
        px[x, y] = (0, 0, 0, 0)
        seeds.append((x + 1, y))
        seeds.append((x - 1, y))
        seeds.append((x, y + 1))
        seeds.append((x, y - 1))

    return rgba


def strip_interior_checkerboard(img: Image.Image) -> Image.Image:
    """Remove checkerboard trapped inside a cell without eating white sneakers."""
    rgba = img.convert("RGBA")
    px = rgba.load()
    w, h = rgba.size
    for y in range(h):
        for x in range(w):
            r, g, b, a = px[x, y]
            if a == 0:
                continue
            if not (min(r, g, b) >= 155 and max(r, g, b) - min(r, g, b) < 40):
                continue
            has_dark_neighbor = False
            for dy in range(-2, 3):
                for dx in range(-2, 3):
                    nx, ny = x + dx, y + dy
                    if 0 <= nx < w and 0 <= ny < h:
                        nr, ng, nb, na = px[nx, ny]
                        if na > 0 and nr + ng + nb < 200:
                            has_dark_neighbor = True
                            break
                if has_dark_neighbor:
                    break
            if not has_dark_neighbor:
                px[x, y] = (0, 0, 0, 0)
    return rgba


def remove_orphan_light(img: Image.Image) -> Image.Image:
    rgba = img.convert("RGBA")
    px = rgba.load()
    w, h = rgba.size
    for y in range(h):
        for x in range(w):
            r, g, b, a = px[x, y]
            if a == 0:
                continue
            if not (min(r, g, b) >= 140 and max(r, g, b) - min(r, g, b) < 45):
                continue
            neighbors = ((x + 1, y), (x - 1, y), (x, y + 1), (x, y - 1))
            if all(
                0 <= nx < w and 0 <= ny < h and px[nx, ny][3] == 0 for nx, ny in neighbors
            ):
                px[x, y] = (0, 0, 0, 0)
    return rgba


def slice_grid_sheet(
    src: Path,
    out: Path,
    *,
    cols: int,
    rows: int,
    cell: int,
    mode: str,
) -> None:
    src_img = Image.open(src).convert("RGBA")
    w, h = src_img.size
    cell_w = w / cols
    cell_h = h / rows
    sheet = Image.new("RGBA", (cols * cell, rows * cell), (0, 0, 0, 0))

    for row in range(rows):
        for col in range(cols):
            left = int(round(col * cell_w))
            top = int(round(row * cell_h))
            right = int(round((col + 1) * cell_w))
            bottom = int(round((row + 1) * cell_h))
            frame = src_img.crop((left, top, right, bottom)).resize(
                (cell, cell), Image.NEAREST
            )
            frame = flood_strip(frame, mode=mode)
            if mode == "hero":
                frame = strip_interior_checkerboard(frame)
                frame = remove_orphan_light(frame)
            sheet.paste(frame, (col * cell, row * cell))

    out.parent.mkdir(parents=True, exist_ok=True)
    sheet.save(out, "PNG")
    print(f"grid sheet → {out} ({sheet.size[0]}×{sheet.size[1]})")


def process_arena(src: Path, out: Path, width: int, height: int) -> None:
    img = Image.open(src).convert("RGB")
    final = img.resize((width, height), Image.LANCZOS)
    out.parent.mkdir(parents=True, exist_ok=True)
    final.save(out, "PNG", optimize=True)
    print(f"arena → {out} ({width}×{height})")


def main() -> None:
    root = Path(__file__).resolve().parents[1]
    images = root / "assets" / "images"

    slice_grid_sheet(
        images / "Gemini_Generated_Image_qwspbcqwspbcqwsp.png",
        root / "assets" / "caracter" / "Hero.png",
        cols=3,
        rows=8,
        cell=100,
        mode="hero",
    )
    slice_grid_sheet(
        images / "Gemini_Generated_Image_fwbwkefwbwkefwbw.png",
        root / "assets" / "combat" / "boss-sheet.png",
        cols=3,
        rows=4,
        cell=100,
        mode="boss",
    )
    process_arena(
        images / "Gemini_Generated_Image_ad2ft1ad2ft1ad2f.png",
        root / "assets" / "combat" / "arena-bg.png",
        1000,
        1200,
    )


if __name__ == "__main__":
    main()
