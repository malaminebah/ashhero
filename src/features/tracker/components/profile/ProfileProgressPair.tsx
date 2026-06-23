import { View, Pressable } from 'react-native'
import { useRouter } from 'expo-router'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { FLOW } from '@/constants/flowTheme'
import { FlowText } from '@/components/ui/flow-text'
import { flowCardShadow, flowSurface } from '@/constants/flowSurfaces'
import { LevelTierIcon } from './LevelTierIcon'
import { xpProgressInLevel } from '../../utils/levelProgress'

import type { ProfileProgressPairParams } from '../../types'

const CARD_H = 92

export const ProfileProgressPair = ({ level, xp }: ProfileProgressPairParams) => {
  const router = useRouter()
  const { nextCap, pct } = xpProgressInLevel(xp)

  return (
    <View className="mb-6 flex-row gap-3" style={{ height: CARD_H }}>
      <Pressable
        onPress={() => router.push('/level' as never)}
        accessibilityRole="button"
        accessibilityLabel={`Niveau ${level}, voir la progression`}
        className="flex-1 active:opacity-90"
        style={{ height: CARD_H }}
      >
        <View
          className={`h-full flex-row items-center gap-3 px-3.5 py-3 ${flowSurface.cardActive}`}
          style={flowCardShadow}
        >
          <View className={`h-11 w-11 items-center justify-center rounded-2xl ${flowSurface.iconWell}`}>
            <LevelTierIcon level={level} size={22} unlocked />
          </View>
          <View className="min-w-0 flex-1">
            <FlowText className="text-[11px] font-bold uppercase tracking-wide text-flow-muted">
              Niveau
            </FlowText>
            <FlowText className="text-lg font-bold text-flow-cta">{level}</FlowText>
          </View>
          <MaterialIcons name="chevron-right" size={20} color={FLOW.cta} />
        </View>
      </Pressable>

      <Pressable
        onPress={() => router.push('/level' as never)}
        accessibilityRole="button"
        accessibilityLabel="Voir la progression XP"
        className="flex-1 active:opacity-90"
        style={{ height: CARD_H }}
      >
        <View className={`h-full justify-center px-3.5 py-3 ${flowSurface.card}`} style={flowCardShadow}>
          <View className="flex-row items-baseline justify-between">
            <FlowText className="text-[11px] font-bold text-flow-muted">XP</FlowText>
            <FlowText className="text-xs font-bold text-flow-text">
              {xp}
              <FlowText className="text-xs font-normal text-flow-faint"> / {nextCap}</FlowText>
            </FlowText>
          </View>
          <View className="mt-2.5 h-2.5 w-full overflow-hidden rounded-full bg-flow-border">
            <View className="h-full rounded-full bg-flow-cta" style={{ width: `${pct}%` }} />
          </View>
        </View>
      </Pressable>
    </View>
  )
}
