import {
  BOSS_ANIMS,
  BOSS_DISPLAY_SCALE,
  BOSS_FRAME_SIZE,
  BOSS_SHEET_COLS,
  BOSS_SHEET_H,
  bossSheet,
} from '../bossSheet'
import type { BossSpriteParams } from '../types'
import { SheetSprite } from './SheetSprite'

export const BossSprite = ({ anim, muted = false }: BossSpriteParams) => {
  const cfg = BOSS_ANIMS[anim]

  return (
    <SheetSprite
      sheet={bossSheet}
      frameSize={BOSS_FRAME_SIZE}
      sheetH={BOSS_SHEET_H}
      sheetCols={BOSS_SHEET_COLS}
      displayScale={BOSS_DISPLAY_SCALE}
      row={cfg.row}
      frames={cfg.frames}
      frameMs={cfg.frameMs}
      loop={cfg.loop}
      animKey={anim}
      accessibilityLabel="L'Envie"
      muted={muted}
    />
  )
}
