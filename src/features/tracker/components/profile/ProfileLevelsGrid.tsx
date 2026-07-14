import { View, ScrollView, Pressable } from 'react-native'
import { useRouter } from 'expo-router'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { GameLabel } from '@/components/ui/game-label'
import { FlowText } from '@/components/ui/flow-text'
import { LevelTierIcon } from './LevelTierIcon'
import { PROFILE_LEVEL_STEPS, XP_PER_LEVEL } from '../../utils/levelProgress'
import type { ProfileLevelsGridParams } from '../../types'

const LEVEL_CARD_W = 84
const LEVEL_CARD_H = 112

export const ProfileLevelsGrid = ({ level, xp }: ProfileLevelsGridParams) => {
  const router = useRouter()
  const unlockedCount = PROFILE_LEVEL_STEPS.filter((step) => level >= step.level).length
  const nextCap = Math.ceil(xp / XP_PER_LEVEL) * XP_PER_LEVEL

  return (
    <View className="mb-6">
      <View className="mb-1 flex-row items-center justify-between">
        <GameLabel>Parcours de niveau</GameLabel>
        <GameLabel className="text-brand-gold">
          {unlockedCount}/{PROFILE_LEVEL_STEPS.length}
        </GameLabel>
      </View>
      <FlowText className="mb-3 text-xs leading-4 text-brand-locked">
        {XP_PER_LEVEL} XP par palier · {xp} XP au total
      </FlowText>

      <ScrollView
        horizontal
        nestedScrollEnabled
        showsHorizontalScrollIndicator={false}
        style={{ height: LEVEL_CARD_H, flexGrow: 0 }}
        contentContainerStyle={{ gap: 10, paddingRight: 4, alignItems: 'stretch' }}
      >
        {PROFILE_LEVEL_STEPS.map((step) => {
          const unlocked = level >= step.level
          const isCurrent = level === step.level

          return (
            <Pressable
              key={step.level}
              onPress={() => router.push('/level' as never)}
              accessibilityRole="button"
              accessibilityLabel={`Niveau ${step.level}, ${step.xpRequired} XP`}
              className={`items-center justify-between rounded-[16px] border bg-brand-card px-2 py-3 active:opacity-90 ${
                isCurrent
                  ? 'border-brand-gold'
                  : unlocked
                    ? 'border-brand-success'
                    : 'border-[rgba(255,255,255,0.1)]'
              }`}
              style={{ width: LEVEL_CARD_W, height: LEVEL_CARD_H }}
            >
              <FlowText
                className={`text-[11px] font-extrabold ${
                  unlocked ? 'text-brand-success' : 'text-brand-locked'
                }`}
              >
                Niv. {step.level}
              </FlowText>

              <View className="h-11 w-11 items-center justify-center rounded-2xl bg-brand-track">
                {unlocked ? (
                  <LevelTierIcon level={step.level} size={22} unlocked />
                ) : (
                  <MaterialIcons name="lock-outline" size={18} color="#5b4a75" />
                )}
              </View>

              <FlowText
                className={`text-[10px] ${unlocked ? 'text-brand-muted' : 'text-brand-locked'}`}
              >
                {step.xpRequired} XP
              </FlowText>
            </Pressable>
          )
        })}
      </ScrollView>

      <Pressable
        onPress={() => router.push('/level' as never)}
        accessibilityRole="button"
        accessibilityLabel="Voir toute la progression"
        className="mt-3 flex-row items-center justify-center gap-1 active:opacity-80"
      >
        <FlowText className="text-xs font-bold text-brand-accent">Voir la progression</FlowText>
        <MaterialIcons name="chevron-right" size={16} color="#a855f7" />
      </Pressable>

      {xp < nextCap ? (
        <FlowText className="mt-1 text-center text-[11px] text-brand-locked">
          Prochain palier à {nextCap} XP
        </FlowText>
      ) : null}
    </View>
  )
}
