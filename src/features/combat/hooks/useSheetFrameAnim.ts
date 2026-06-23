import { useEffect } from 'react'
import {
  cancelAnimation,
  Easing,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated'

export type SheetFrameAnimConfig = {
  frames: number
  frameMs: number
  loop: boolean
}

/** Linear progress 0..frames on the UI thread (SheetSprite floors to frame index). */
export function useSheetFrameAnim(config: SheetFrameAnimConfig, animKey: string) {
  const progress = useSharedValue(0)

  useEffect(() => {
    cancelAnimation(progress)
    progress.value = 0

    const duration = config.frames * config.frameMs
    const timing = withTiming(config.frames, {
      duration,
      easing: Easing.linear,
    })

    progress.value = config.loop ? withRepeat(timing, -1, false) : timing

    return () => cancelAnimation(progress)
  }, [animKey, config.frameMs, config.frames, config.loop, progress])

  return progress
}
