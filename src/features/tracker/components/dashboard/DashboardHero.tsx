import { View, Pressable } from 'react-native'
import { useRouter } from 'expo-router'
import { LinearGradient } from 'expo-linear-gradient'
import { HeroSprite } from '@/components/characters/HeroSprite'
import { GameLabel } from '@/components/ui/game-label'
import { FlowText } from '@/components/ui/flow-text'
import { XpBar } from '@/components/ui/xp-bar'

import { getMotivation } from '@/src/features/onboarding/profileFacts'
import { xpProgressInLevel } from '../../utils/levelProgress'
import { useTrackerStore } from '../../store'
import type { DashboardHeroParams } from '../../types'

export const DashboardHero = ({ dayCount, level, xp }: DashboardHeroParams) => {
  const router = useRouter()
  const motivations = useTrackerStore((s) => s.motivations)
  const { nextCap, pct } = xpProgressInLevel(xp)
  const progress = pct / 100
  const mainMotivation = motivations.length > 0 ? getMotivation(motivations[0]) : null

  return (
    <Pressable
      onPress={() => router.push('/level' as never)}
      accessibilityRole="button"
      accessibilityLabel={`${dayCount} jours sans vape, niveau ${level}`}
      className="mb-3 overflow-hidden rounded-[20px] border border-[rgba(255,255,255,0.07)] active:opacity-95"
    >
      <LinearGradient colors={['#1c0733', '#12051f']} style={{ padding: 22, alignItems: 'center' }}>
        <HeroSprite pose="idle" width={92} height={112} />
        <FlowText
          className="mt-2 text-brand-success"
          style={{ fontSize: 56, fontWeight: '900', letterSpacing: -2, lineHeight: 60 }}
        >
          {dayCount}
        </FlowText>
        <FlowText className="text-[15px] font-bold text-white">jours sans vape</FlowText>
        {mainMotivation ? (
          <GameLabel className="mt-1 normal-case tracking-normal">
            Tu te bats pour {mainMotivation.label.toLowerCase()}
          </GameLabel>
        ) : null}
        <View className="mb-1.5 mt-4 w-full flex-row items-center justify-between">
          <GameLabel>Niveau {level}</GameLabel>
          <GameLabel className="text-brand-gold">
            {xp} / {nextCap} XP
          </GameLabel>
        </View>
        <View className="w-full">
          <XpBar progress={progress} />
        </View>
      </LinearGradient>
    </Pressable>
  )
}
