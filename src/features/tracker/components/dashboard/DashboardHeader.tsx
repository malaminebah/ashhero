import { View, Pressable } from 'react-native'
import { useRouter } from 'expo-router'
import { HeroSprite } from '@/components/characters/HeroSprite'
import { GameIcon } from '@/components/ui/game-icon'
import { GameLabel } from '@/components/ui/game-label'
import { FlowText } from '@/components/ui/flow-text'

import type { DashboardHeaderParams } from '../../types'

export const DashboardHeader = ({ level, xp }: DashboardHeaderParams) => {
  const router = useRouter()

  return (
    <View className="mb-4 flex-row items-center justify-between">
      <Pressable
        onPress={() => router.push('/(tabs)/profile' as never)}
        accessibilityRole="button"
        accessibilityLabel="Voir le profil"
        className="flex-row items-center gap-2.5 active:opacity-90"
      >
        <View className="h-11 w-11 items-center justify-center overflow-hidden rounded-full border-2 border-brand-success bg-brand-track">
          <View style={{ marginTop: 8 }}>
            <HeroSprite pose="idle" width={30} height={36} />
          </View>
        </View>
        <View>
          <FlowText className="text-[15px] font-extrabold text-white">Ash</FlowText>
          <GameLabel>Niveau {level}</GameLabel>
        </View>
      </Pressable>

      <Pressable
        onPress={() => router.push('/level' as never)}
        accessibilityRole="button"
        accessibilityLabel={`${xp} points d'expérience`}
        className="flex-row items-center gap-1.5 rounded-full border border-[rgba(251,191,36,0.4)] bg-brand-card px-3 py-1.5 active:opacity-90"
      >
        <GameIcon name="gem" size={15} color="#fbbf24" />
        <FlowText className="text-[13px] font-bold text-brand-gold">{xp} XP</FlowText>
      </Pressable>
    </View>
  )
}
