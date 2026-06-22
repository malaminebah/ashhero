import {
  soldierSheet,
  SOLDIER_ANIMS,
  SOLDIER_DISPLAY_SCALE,
  SOLDIER_FRAME_SIZE,
  SOLDIER_SHEET_COLS,
  SOLDIER_SHEET_H,
} from '../soldierSheet'
import type { PlayerSoldierSpriteParams } from '../types'
import { SheetSprite } from './SheetSprite'

export const PlayerSoldierSprite = ({ anim }: PlayerSoldierSpriteParams) => {
  const cfg = SOLDIER_ANIMS[anim]

  return (
    <SheetSprite
      sheet={soldierSheet}
      frameSize={SOLDIER_FRAME_SIZE}
      sheetH={SOLDIER_SHEET_H}
      sheetCols={SOLDIER_SHEET_COLS}
      displayScale={SOLDIER_DISPLAY_SCALE}
      row={cfg.row}
      frames={cfg.frames}
      frameMs={cfg.frameMs}
      loop={cfg.loop}
      animKey={anim}
      accessibilityLabel="Héros"
    />
  )
}
