import type { PropsWithChildren } from 'react'
import { Image } from 'expo-image'
import { LinearGradient } from 'expo-linear-gradient'
import { StyleSheet, View, type ViewStyle } from 'react-native'
import {
  ARENA_BANNER_MAX_HEIGHT,
  ARENA_GRADIENT_FLOW,
  ARENA_GRADIENT_GAME,
  ARENA_IMAGE_FOCUS,
  ARENA_PANEL_ASPECT,
  arenaBackground,
} from '../arenaAssets'

type ArenaBackgroundPanelParams = {
  variant: 'fill' | 'banner'
  tone?: 'game' | 'flow'
  maxHeight?: ViewStyle['maxHeight']
  className?: string
}

export const ArenaBackgroundPanel = ({
  variant,
  tone = 'game',
  maxHeight = ARENA_BANNER_MAX_HEIGHT,
  className = '',
  children,
}: PropsWithChildren<ArenaBackgroundPanelParams>) => {
  const gradient = tone === 'flow' ? ARENA_GRADIENT_FLOW : ARENA_GRADIENT_GAME
  const panelStyle: ViewStyle =
    variant === 'fill'
      ? { flex: 1, width: '100%', minHeight: 220 }
      : { width: '100%', aspectRatio: ARENA_PANEL_ASPECT, maxHeight }

  return (
    <View className={`relative overflow-hidden ${className}`} style={panelStyle}>
      <Image
        source={arenaBackground}
        style={StyleSheet.absoluteFill}
        contentFit="cover"
        contentPosition={ARENA_IMAGE_FOCUS}
        accessibilityIgnoresInvertColors
      />
      <LinearGradient
        colors={[...gradient.colors]}
        locations={[...gradient.locations]}
        style={StyleSheet.absoluteFill}
        pointerEvents="none"
      />
      {children}
    </View>
  )
}
