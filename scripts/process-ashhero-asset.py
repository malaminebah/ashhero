#!/usr/bin/env python3
"""Post-process AshHero PNG assets: transparency cleanup + exact resize."""

from __future__ import annotations

import argparse
from pathlib import Path

from PIL import Image


def is_background(r: int, g: int, b: int, a: int, *, aggressive: bool) -> bool:
    if a < 12:
        return True
    if r < 18 and g < 18 and b < 18:
        return True
    if aggressive:
        if r > 165 and g > 165 and b > 165 and max(abs(r - g), abs(g - b)) < 30:
            return True
        if max(r, g, b) - min(r, g, b) < 18 and min(r, g, b) > 140:
            return True
    return False


def strip_background(img: Image.Image, *, aggressive: bool) -> Image.Image:
    rgba = img.convert("RGBA")
    px = rgba.load()
    w, h = rgba.size
    for y in range(h):
        for x in range(w):
            r, g, b, a = px[x, y]
            if is_background(r, g, b, a, aggressive=aggressive):
                px[x, y] = (0, 0, 0, 0)
    return rgba


def content_bbox(img: Image.Image) -> tuple[int, int, int, int]:
    px = img.load()
    w, h = img.size
    min_x, min_y, max_x, max_y = w, h, 0, 0
    found = False
    for y in range(h):
        for x in range(w):
            if px[x, y][3] > 0:
                found = True
                min_x = min(min_x, x)
                min_y = min(min_y, y)
                max_x = max(max_x, x)
                max_y = max(max_y, y)
    if not found:
        return 0, 0, w, h
    return min_x, min_y, max_x + 1, max_y + 1


def resize_exact(img: Image.Image, width: int, height: int, *, resample) -> Image.Image:
    return img.resize((width, height), resample)


def process_sheet(src: Path, out: Path, width: int, height: int) -> None:
    img = strip_background(Image.open(src), aggressive=True)
    box = content_bbox(img)
    cropped = img.crop(box)
    final = resize_exact(cropped, width, height, resample=Image.NEAREST)
    out.parent.mkdir(parents=True, exist_ok=True)
    final.save(out, "PNG")
    print(f"sheet → {out} ({final.size[0]}×{final.size[1]}) RGBA")


def process_arena(src: Path, out: Path, width: int, height: int) -> None:
    img = Image.open(src).convert("RGB")
    final = resize_exact(img, width, height, resample=Image.LANCZOS)
    out.parent.mkdir(parents=True, exist_ok=True)
    final.save(out, "PNG")
    print(f"arena → {out} ({final.size[0]}×{final.size[1]}) RGB")


def main() -> None:
    parser = argparse.ArgumentParser(description="Process AshHero PNG assets")
    sub = parser.add_subparsers(dest="kind", required=True)

    sheet = sub.add_parser("sheet", help="Transparent spritesheet")
    sheet.add_argument("--in", dest="src", required=True)
    sheet.add_argument("--out", required=True)
    sheet.add_argument("--width", type=int, required=True)
    sheet.add_argument("--height", type=int, required=True)

    arena = sub.add_parser("arena", help="Opaque arena background")
    arena.add_argument("--in", dest="src", required=True)
    arena.add_argument("--out", required=True)
    arena.add_argument("--width", type=int, default=1000)
    arena.add_argument("--height", type=int, default=1200)

    args = parser.parse_args()
    src = Path(args.src)
    out = Path(args.out)

    if args.kind == "sheet":
        process_sheet(src, out, args.width, args.height)
    else:
        process_arena(src, out, args.width, args.height)


if __name__ == "__main__":
    main()
