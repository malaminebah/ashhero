import { useEffect } from 'react'
import { useSharedValue } from 'react-native-reanimated'

export type SheetFrameAnimConfig = {
  frames: number
  frameMs: number
  loop: boolean
}

export function useSheetFrameAnim(config: SheetFrameAnimConfig, animKey: string) {
  const frame = useSharedValue(0)

  useEffect(() => {
    frame.value = 0
    let index = 0

    const id = setInterval(() => {
      index += 1
      if (config.loop) {
        frame.value = index % config.frames
        return
      }
      if (index < config.frames) {
        frame.value = index
        return
      }
      clearInterval(id)
    }, config.frameMs)

    return () => clearInterval(id)
  }, [animKey, config.frameMs, config.frames, config.loop, frame])

  return frame
}
