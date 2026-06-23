import type { PropsWithChildren } from 'react'
import { Image } from 'expo-image'
import { LinearGradient } from 'expo-linear-gradient'
import { StyleSheet, useWindowDimensions, View, type ViewStyle } from 'react-native'
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

function resolveBannerHeight(
  screenWidth: number,
  screenHeight: number,
  maxHeight: ViewStyle['maxHeight']
): number {
  const fromAspect = screenWidth / ARENA_PANEL_ASPECT
  let cap = screenHeight
  if (typeof maxHeight === 'string' && maxHeight.endsWith('%')) {
    cap = screenHeight * (parseFloat(maxHeight) / 100)
  } else if (typeof maxHeight === 'number') {
    cap = maxHeight
  }
  return Math.min(fromAspect, cap)
}

export const ArenaBackgroundPanel = ({
  variant,
  tone = 'game',
  maxHeight = ARENA_BANNER_MAX_HEIGHT,
  className = '',
  children,
}: PropsWithChildren<ArenaBackgroundPanelParams>) => {
  const { width: screenWidth, height: screenHeight } = useWindowDimensions()
  const gradient = tone === 'flow' ? ARENA_GRADIENT_FLOW : ARENA_GRADIENT_GAME
  const panelStyle: ViewStyle =
    variant === 'fill'
      ? { flex: 1, width: '100%', alignSelf: 'stretch', minHeight: 220 }
      : {
          width: '100%',
          alignSelf: 'stretch',
          height: resolveBannerHeight(screenWidth, screenHeight, maxHeight),
        }

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
