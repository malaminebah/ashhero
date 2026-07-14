import type { ReactNode } from 'react'
import { StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { FlowText } from '@/components/ui/flow-text'
import { StarField } from '@/components/ui/star-field'

export type ArenaFrameParams = {
  children?: ReactNode
  label?: string
  /** Defeat screen — red vignette over the arena. */
  tone?: 'night' | 'defeat'
  style?: StyleProp<ViewStyle>
}

/** Mockup arena panel — night gradient, stars and mossy ground in a rounded frame. */
export const ArenaFrame = ({ children, label, tone = 'night', style }: ArenaFrameParams) => (
  <View
    style={[
      {
        borderRadius: 20,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.08)',
        overflow: 'hidden',
        backgroundColor: '#160329',
      },
      style,
    ]}
  >
    <LinearGradient
      colors={
        tone === 'defeat'
          ? ['#1a0410', '#2d0a2e', '#1a0d10']
          : ['#160329', '#2d0a4e', '#0d3321']
      }
      locations={[0, 0.48, 1]}
      style={StyleSheet.absoluteFillObject}
      pointerEvents="none"
    />
    <StarField opacity={tone === 'defeat' ? 0.4 : 1} />
    <LinearGradient
      colors={['transparent', tone === 'defeat' ? 'rgba(88,16,32,0.7)' : 'rgba(14,58,36,0.8)']}
      style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 86 }}
      pointerEvents="none"
    />
    {tone === 'defeat' ? (
      <View
        pointerEvents="none"
        style={[StyleSheet.absoluteFillObject, { backgroundColor: 'rgba(239,68,68,0.08)' }]}
      />
    ) : null}
    {label ? (
      <FlowText
        className="absolute left-0 right-0 top-4 text-center text-xs font-extrabold text-[#e9d5ff]"
        style={{ letterSpacing: 2, opacity: 0.8 }}
      >
        {label}
      </FlowText>
    ) : null}
    {children}
  </View>
)

export type ArenaPlinthParams = {
  width: number
  style?: StyleProp<ViewStyle>
}

/** Dark ellipse under a sprite's feet. */
export const ArenaPlinth = ({ width, style }: ArenaPlinthParams) => (
  <View
    pointerEvents="none"
    style={[
      {
        position: 'absolute',
        width,
        height: 22,
        borderRadius: 11,
        backgroundColor: 'rgba(0,0,0,0.5)',
      },
      style,
    ]}
  />
)
