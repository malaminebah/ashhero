import { useEffect, useState } from 'react'
import { View } from 'react-native'
import { Image } from 'expo-image'
import {
  soldierSheet,
  SOLDIER_ANIMS,
  SOLDIER_DISPLAY_SCALE,
  SOLDIER_FRAME_SIZE,
  SOLDIER_SHEET_COLS,
  SOLDIER_SHEET_H,
  SOLDIER_SHEET_W,
} from '../soldierSheet'
import type { PlayerSoldierSpriteParams } from '../types'

const scale = SOLDIER_DISPLAY_SCALE
const viewport = Math.round(SOLDIER_FRAME_SIZE * scale)
const sheetDisplayW = SOLDIER_SHEET_COLS * SOLDIER_FRAME_SIZE * scale
const sheetDisplayH = SOLDIER_SHEET_H * scale

export const PlayerSoldierSprite = ({ anim }: PlayerSoldierSpriteParams) => {
  const [frame, setFrame] = useState(0)
  const cfg = SOLDIER_ANIMS[anim]

  useEffect(() => {
    setFrame(0)
    let index = 0

    const id = setInterval(() => {
      index += 1
      if (cfg.loop) {
        setFrame(index % cfg.frames)
        return
      }
      if (index < cfg.frames) {
        setFrame(index)
        return
      }
      clearInterval(id)
    }, cfg.frameMs)

    return () => clearInterval(id)
  }, [anim, cfg.frames, cfg.frameMs, cfg.loop])

  const offsetX = -frame * SOLDIER_FRAME_SIZE * scale
  const offsetY = -cfg.row * SOLDIER_FRAME_SIZE * scale

  return (
    <View
      style={{ width: viewport, height: viewport, overflow: 'hidden' }}
      accessibilityLabel="Héros"
    >
      <Image
        source={soldierSheet}
        style={{
          width: sheetDisplayW,
          height: sheetDisplayH,
          transform: [{ translateX: offsetX }, { translateY: offsetY }],
        }}
        contentFit="fill"
      />
    </View>
  )
}
