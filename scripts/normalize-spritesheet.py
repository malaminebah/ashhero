#!/usr/bin/env python3
"""Re-anchor every frame of a sprite grid to a consistent foot baseline.

Keeps the original pixel art untouched (no repaint); only translates/scales each
cell so the character stands in the same spot frame-to-frame. Fixes horizontal
drift and head clipping caused by inconsistent per-frame anchoring.
"""
import sys
from PIL import Image

TOP_MARGIN = 4
BOTTOM_MARGIN = 3
SIDE_MARGIN = 3
FEET_BAND = 16  # px from content bottom used to find the horizontal foot center


def alpha_bbox(cell):
    # Full alpha bbox so no real pixel art (faint hair tips) is ever cropped.
    return cell.split()[3].getbbox()


def foot_center_x(cell, bbox):
    x0, y0, x1, y1 = bbox
    band_top = max(y0, y1 - FEET_BAND)
    a = cell.split()[3]
    total = 0
    wsum = 0
    px = a.load()
    for y in range(band_top, y1):
        for x in range(x0, x1):
            v = px[x, y]
            if v:
                total += v
                wsum += v * x
    if total == 0:
        return (x0 + x1) / 2
    return wsum / total


def normalize(path, out, cols, rows, cell, mode="feet"):
    im = Image.open(path).convert("RGBA")
    dst = Image.new("RGBA", im.size, (0, 0, 0, 0))
    usable_h = cell - TOP_MARGIN - BOTTOM_MARGIN
    usable_w = cell - 2 * SIDE_MARGIN
    for r in range(rows):
        for c in range(cols):
            src = im.crop((c * cell, r * cell, (c + 1) * cell, (r + 1) * cell))
            bb = alpha_bbox(src)
            if bb is None:
                continue
            x0, y0, x1, y1 = bb
            w, h = x1 - x0, y1 - y0
            s = min(1.0, usable_h / h, usable_w / w)
            content = src.crop(bb)
            if s < 1.0:
                content = content.resize(
                    (max(1, round(w * s)), max(1, round(h * s))), Image.NEAREST
                )
            cw, ch = content.size
            if mode == "feet":
                fx = foot_center_x(src, bb)
                anchor_x = (fx - x0) * s
                paste_x = round(cell / 2 - anchor_x)
            else:
                paste_x = round((cell - cw) / 2)
            paste_y = cell - BOTTOM_MARGIN - ch
            paste_x = max(0, min(cell - cw, paste_x))
            paste_y = max(0, min(cell - ch, paste_y))
            dst.alpha_composite(content, (c * cell + paste_x, r * cell + paste_y))
    dst.save(out)
    print("wrote", out, dst.size)


if __name__ == "__main__":
    path, out, cols, rows, cell = sys.argv[1:6]
    mode = sys.argv[6] if len(sys.argv) > 6 else "feet"
    normalize(path, out, int(cols), int(rows), int(cell), mode)
