import { View, ScrollView, Pressable } from 'react-native'
import { useRouter } from 'expo-router'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { FLOW } from '@/constants/flowTheme'
import { badgeSurface, flowCardShadow, flowSurface } from '@/constants/flowSurfaces'
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
    <View className="mb-8">
      <View className="mb-1 flex-row items-center justify-between">
        <FlowText className="text-sm font-bold text-flow-text">Parcours de niveau</FlowText>
        <View className="rounded-full border border-flow-cta/20 bg-flow-secondary px-2.5 py-1">
          <FlowText className="text-[11px] font-bold text-flow-cta">
            {unlockedCount}/{PROFILE_LEVEL_STEPS.length}
          </FlowText>
        </View>
      </View>
      <FlowText className="mb-4 text-xs leading-4 text-flow-faint">
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
              className={`relative items-center justify-between px-2 py-3 active:opacity-90 ${flowSurface.badge} ${badgeSurface(unlocked)} ${
                isCurrent ? 'border-flow-cta/50 bg-flow-secondary' : ''
              }`}
              style={[
                flowCardShadow,
                { width: LEVEL_CARD_W, height: LEVEL_CARD_H },
                isCurrent ? { borderColor: FLOW.cta, borderWidth: 1.5 } : null,
              ]}
            >
              <FlowText
                className={`text-[11px] font-bold ${unlocked ? 'text-flow-cta' : 'text-flow-faint'}`}
              >
                Niv. {step.level}
              </FlowText>

              <View
                className={`h-11 w-11 items-center justify-center rounded-2xl ${
                  unlocked ? flowSurface.iconWell : 'bg-flow-border/30'
                }`}
              >
                {unlocked ? (
                  <LevelTierIcon level={step.level} size={22} unlocked />
                ) : (
                  <MaterialIcons name="lock-outline" size={18} color={FLOW.faint} />
                )}
              </View>

              <FlowText
                className={`text-[10px] ${unlocked ? 'text-flow-muted' : 'text-flow-faint'}`}
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
        <FlowText className="text-xs font-bold text-flow-cta">Voir la progression</FlowText>
        <MaterialIcons name="chevron-right" size={16} color={FLOW.cta} />
      </Pressable>

      {xp < nextCap ? (
        <FlowText className="mt-1 text-center text-[11px] text-flow-faint">
          Prochain palier à {nextCap} XP
        </FlowText>
      ) : null}
    </View>
  )
}
