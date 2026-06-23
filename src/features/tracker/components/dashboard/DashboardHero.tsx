import { View } from 'react-native'
import { Image } from 'expo-image'
import { FlowText } from '@/components/ui/flow-text'
import { getCheerMessage } from '../../utils/cheerMessage'

import type { DashboardHeroParams } from '../../types'

const heroAvatar = require('@/assets/caracter/hero-avatar.png')

export const DashboardHero = ({ dayCount }: DashboardHeroParams) => (
  <View className="mb-6 items-center">
    <View className="h-24 w-24 items-center justify-center overflow-hidden rounded-[28px] bg-flow-mascot">
      <Image
        source={heroAvatar}
        style={{ width: 88, height: 88 }}
        contentFit="contain"
        accessibilityLabel="Avatar du héros"
      />
    </View>
    <FlowText className="mt-6 text-5xl font-bold text-flow-text">{dayCount}</FlowText>
    <FlowText className="mt-1 text-sm text-flow-muted">Jours sans vape</FlowText>
    <FlowText className="mt-3 text-center text-[15px] text-flow-muted">
      {getCheerMessage(dayCount)}
    </FlowText>
  </View>
)
