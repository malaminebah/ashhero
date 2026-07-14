import { View } from 'react-native'
import { useRouter } from 'expo-router'
import { LinearGradient } from 'expo-linear-gradient'
import { BossSprite } from '@/components/characters/BossSprite'
import { HeroSprite } from '@/components/characters/HeroSprite'
import { ChunkyButton, CHUNKY_COLORS } from '@/components/ui/chunky-button'
import { GameLabel } from '@/components/ui/game-label'
import { StarField } from '@/components/ui/star-field'
import { FlowText } from '@/components/ui/flow-text'

export const DashboardCombatCta = () => {
  const router = useRouter()

  return (
    <View className="mt-5 overflow-hidden rounded-[20px] border border-[rgba(168,85,247,0.35)] bg-brand-card">
      <LinearGradient
        colors={['#1c0733', '#2d0a4e', '#0d3321']}
        locations={[0, 0.6, 1]}
        style={{ height: 130 }}
      >
        <StarField />
        <View style={{ position: 'absolute', left: 24, bottom: 10 }}>
          <HeroSprite pose="idle" width={64} height={78} />
        </View>
        <View style={{ position: 'absolute', right: 22, bottom: 12 }}>
          <BossSprite pose="idle" width={72} height={72} />
        </View>
      </LinearGradient>
      <View className="p-4">
        <FlowText className="text-base font-extrabold text-white">
          Une envie ? Affronte-la.
        </FlowText>
        <GameLabel className="mt-1">Chaque combat gagné = XP + or</GameLabel>
        <View className="mt-3.5">
          <ChunkyButton
            label="COMBATTRE"
            palette={CHUNKY_COLORS.green}
            height={56}
            fontSize={16}
            letterSpacing={1}
            onPress={() => router.push('/(tabs)/combat' as never)}
          />
        </View>
      </View>
    </View>
  )
}
