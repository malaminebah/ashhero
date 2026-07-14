import {
  soldierSheet,
  SOLDIER_ANIMS,
  SOLDIER_DISPLAY_SCALE,
  SOLDIER_SHEET_COLS,
  SOLDIER_SHEET_H,
  SOLDIER_SHEET_ROWS,
  SOLDIER_SHEET_W,
} from '../soldierSheet'
import type { PlayerSoldierSpriteParams } from '../types'
import { SheetSprite } from './SheetSprite'

export const PlayerSoldierSprite = ({ anim, scale = 1 }: PlayerSoldierSpriteParams) => {
  const cfg = SOLDIER_ANIMS[anim]

  return (
    <SheetSprite
      sheet={soldierSheet}
      sheetW={SOLDIER_SHEET_W}
      sheetH={SOLDIER_SHEET_H}
      sheetCols={SOLDIER_SHEET_COLS}
      sheetRows={SOLDIER_SHEET_ROWS}
      displayScale={SOLDIER_DISPLAY_SCALE * scale}
      row={cfg.row}
      col={cfg.col ?? 0}
      frames={cfg.frames}
      frameMs={cfg.frameMs}
      loop={cfg.loop}
      animKey={anim}
      accessibilityLabel="Héros"
    />
  )
}
