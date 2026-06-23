#!/usr/bin/env python3
"""Import AshHero badge PNGs: strip light/checker BG, normalize 128×128."""

from __future__ import annotations

from collections import deque
from pathlib import Path

from PIL import Image

CELL = 128
ROOT = Path(__file__).resolve().parents[1]
OUT_DIR = ROOT / "assets" / "icons" / "badges"

SRC_DIRS = (
    Path.home() / "Desktop" / "ashhero-images-generees",
    Path.home() / "Downloads" / "ashhero-images-generees",
    Path.home() / "Downloads",
)

PROFILE_MAP: dict[str, str] = {
    "jour1": "badge-tier01-bronze-ribbon-etincelle-verte",
    "jours3": "badge-tier01-bronze-piece-etincelle-verte",
    "sem1": "badge-sem1-flamme-verte-ribbon-argent",
    "sem2": "badge-tier04-silver-souffle-mint-djinn",
    "mois1": "badge-mois1-laurier-or-gemme-violette",
    "combat1": "badge-combat1-etoile-or",
    "combat3": "badge-combat3-bouclier-epees-laurier-or",
    "combat10": "badge-niv10-ecu-violet-laurier-elite",
    "niv3": "badge-tier04-bois-vent-gemme-verte",
    "niv5": "badge-niv5-sceau-rang-violet-or",
    "niv10": "badge-niv10-gemme-lavande-laurier-or",
    "xp500": "badge-xp500-portail-vert-laurier-texte",
    "xp2000": "badge-xp2000-sceau-or-violet-texte",
    "eco50": "badge-tier01-bronze-piece-etincelle-verte",
    "eco200": "badge-eco200-coffre-tresor-gemmes-violettes",
}

DEFENSE_MAP: dict[str, str] = {
    "defense-week1": "badge-sem1-flamme-verte-ribbon-argent",
    "defense-week2": "badge-tier04-silver-souffle-mint-djinn",
    "defense-week3": "badge-combat3-bouclier-epees-laurier-or",
}


def is_background(r: int, g: int, b: int, a: int) -> bool:
    if a < 12:
        return True
    if r + g + b <= 8:
        return True
    if r + g + b > 720:
        return True
    if min(r, g, b) > 200 and max(r, g, b) - min(r, g, b) < 35:
        return True
    if min(r, g, b) > 140 and max(r, g, b) - min(r, g, b) < 40:
        return True
    return False


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
        if not is_background(r, g, b, a):
            continue
        px[x, y] = (0, 0, 0, 0)
        seeds.extend(((x + 1, y), (x - 1, y), (x, y + 1), (x, y - 1)))
    return rgba


def normalize_cell(img: Image.Image) -> Image.Image:
    rgba = flood_strip(img)
    bbox = rgba.getbbox()
    if not bbox:
        return Image.new("RGBA", (CELL, CELL), (0, 0, 0, 0))
    content = rgba.crop(bbox)
    cw, ch = content.size
    scale = min(88 / cw, 88 / ch)
    nw = max(1, int(round(cw * scale)))
    nh = max(1, int(round(ch * scale)))
    content = content.resize((nw, nh), Image.NEAREST)
    out = Image.new("RGBA", (CELL, CELL), (0, 0, 0, 0))
    out.paste(content, ((CELL - nw) // 2, (CELL - nh) // 2), content)
    return out


def find_source(stem: str) -> Path:
    patterns = (f"{stem}__*.png", f"{stem}.png", f"*{stem}*.png")
    for src_dir in SRC_DIRS:
        if not src_dir.is_dir():
            continue
        for pattern in patterns:
            matches = sorted(src_dir.glob(pattern))
            if matches:
                return matches[0]
    raise FileNotFoundError(f"missing source for {stem} in {SRC_DIRS}")


def import_map(mapping: dict[str, str]) -> None:
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    for out_id, stem in mapping.items():
        src = find_source(stem)
        cell = normalize_cell(Image.open(src))
        dest = OUT_DIR / f"{out_id}.png"
        cell.save(dest, "PNG")
        print(f"{dest.name} ← {src.name} ({cell.size[0]}×{cell.size[1]})")


def main() -> None:
    import_map(PROFILE_MAP)
    import_map(DEFENSE_MAP)
    print(f"Done → {OUT_DIR}")


if __name__ == "__main__":
    main()
