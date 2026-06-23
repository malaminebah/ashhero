import { ScrollView, View } from 'react-native'
import { useRouter } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import { FlowBackButton } from '@/components/ui/flow-back-button'
import { FlowText } from '@/components/ui/flow-text'
import { FLOW } from '@/constants/flowTheme'
import { flowCardShadow, flowSurface } from '@/constants/flowSurfaces'
import { LevelStepRow } from '@/src/features/tracker/components/profile/LevelStepRow'
import { LevelTierIcon } from '@/src/features/tracker/components/profile/LevelTierIcon'
import { useTrackerStore } from '@/src/features/tracker/store'
import {
  MAX_PROFILE_LEVEL,
  PROFILE_LEVEL_STEPS,
  XP_PER_LEVEL,
  xpProgressInLevel,
} from '@/src/features/tracker/utils/levelProgress'

export default function LevelProgressScreen() {
  const router = useRouter()
  const xp = useTrackerStore((s) => s.xp)
  const level = useTrackerStore((s) => s.level)
  const { nextCap, pct } = xpProgressInLevel(xp)
  const xpToNext = Math.max(0, nextCap - xp)
  const unlockedCount = PROFILE_LEVEL_STEPS.filter((step) => level >= step.level).length

  return (
    <SafeAreaView className="flex-1 bg-flow-bg" edges={['top', 'left', 'right']}>
      <StatusBar style="dark" />
      <View className="px-6 pt-2">
        <FlowBackButton onPress={() => router.back()} label="Profil" />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 40 }}
      >
        <FlowText className="text-[22px] font-bold leading-8 text-flow-text">Progression</FlowText>
        <FlowText className="mt-1 text-[15px] leading-6 text-flow-muted">
          Monte en niveau en gagnant des combats
        </FlowText>

        <View
          className={`mt-6 overflow-hidden rounded-2xl border border-flow-cta/25 p-5 ${flowSurface.cardActive}`}
          style={flowCardShadow}
        >
          <View className="flex-row items-center gap-4">
            <View className={`h-[72px] w-[72px] ${flowSurface.iconWell} items-center justify-center`}>
              <LevelTierIcon level={level} size={36} unlocked />
            </View>
            <View className="flex-1">
              <FlowText className="text-xs font-bold uppercase tracking-wide text-flow-muted">
                Ton niveau
              </FlowText>
              <FlowText className="mt-1 text-[32px] font-bold leading-9 text-flow-text">
                Niveau {level}
              </FlowText>
            </View>
            <View className="rounded-full border border-flow-cta/20 bg-flow-bg px-3 py-1.5">
              <FlowText className="text-xs font-bold text-flow-cta">
                {unlockedCount}/{MAX_PROFILE_LEVEL}
              </FlowText>
            </View>
          </View>

          <View className="mt-6">
            <View className="flex-row items-baseline justify-between">
              <FlowText className="text-xs font-bold text-flow-muted">XP</FlowText>
              <FlowText className="text-sm font-bold text-flow-text">
                {xp}{' '}
                <FlowText className="text-sm font-normal text-flow-faint">/ {nextCap}</FlowText>
              </FlowText>
            </View>
            <View className="mt-2.5 h-3 overflow-hidden rounded-full bg-flow-border">
              <View className="h-full rounded-full bg-flow-cta" style={{ width: `${pct}%` }} />
            </View>
            <FlowText className="mt-2.5 text-xs leading-4 text-flow-faint">
              {xpToNext > 0
                ? `Encore ${xpToNext} XP pour atteindre le niveau ${level + 1}`
                : level >= MAX_PROFILE_LEVEL
                  ? 'Tu as atteint le palier max affiché — bravo !'
                  : 'Palier suivant débloqué — continue sur ta lancée !'}
            </FlowText>
          </View>
        </View>

        <View
          className={`mt-4 flex-row items-center gap-3 rounded-2xl border border-flow-border px-4 py-3.5 ${flowSurface.card}`}
          style={flowCardShadow}
        >
          <View className={`h-10 w-10 items-center justify-center rounded-xl ${flowSurface.iconWell}`}>
            <MaterialCommunityIcons name="lightning-bolt" size={20} color={FLOW.cta} />
          </View>
          <View className="flex-1">
            <FlowText className="text-sm font-bold text-flow-text">
              {XP_PER_LEVEL} XP par niveau
            </FlowText>
            <FlowText className="mt-0.5 text-xs leading-4 text-flow-muted">
              Chaque victoire en combat te rapproche du palier suivant
            </FlowText>
          </View>
        </View>

        <View className="mb-4 mt-8 flex-row items-end justify-between">
          <FlowText className="text-sm font-bold text-flow-text">Tous les paliers</FlowText>
          <FlowText className="text-xs text-flow-faint">{unlockedCount} débloqués</FlowText>
        </View>

        <View className="gap-2.5">
          {PROFILE_LEVEL_STEPS.map((step) => (
            <LevelStepRow
              key={step.level}
              stepLevel={step.level}
              xpRequired={step.xpRequired}
              userLevel={level}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
