import {
  BOSS_ANIMS,
  BOSS_DISPLAY_SCALE,
  BOSS_SHEET_COLS,
  BOSS_SHEET_H,
  BOSS_SHEET_ROWS,
  BOSS_SHEET_W,
  bossSheet,
} from '../bossSheet'
import type { BossSpriteParams } from '../types'
import { SheetSprite } from './SheetSprite'

export const BossSprite = ({ anim, muted = false, scale = 1 }: BossSpriteParams) => {
  const cfg = BOSS_ANIMS[anim]

  return (
    <SheetSprite
      sheet={bossSheet}
      sheetW={BOSS_SHEET_W}
      sheetH={BOSS_SHEET_H}
      sheetCols={BOSS_SHEET_COLS}
      sheetRows={BOSS_SHEET_ROWS}
      displayScale={BOSS_DISPLAY_SCALE * scale}
      row={cfg.row}
      col={cfg.col ?? 0}
      frames={cfg.frames}
      frameMs={cfg.frameMs}
      loop={cfg.loop}
      animKey={anim}
      accessibilityLabel="L'Envie"
      muted={muted}
    />
  )
}
