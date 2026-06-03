import { titleSerif } from '@/constants/theme'
import { Image } from 'expo-image'
import { Pressable, Text, View } from 'react-native'
import type { CombatArenaScreenParams } from '../types'

const arenaSwordHero = require('@/assets/icons/weapons/r117_c08.png')
const arenaSwordLaunch = require('@/assets/icons/weapons/r100_c08.png')

export const CombatArenaScreen = ({ onLaunchCombat }: CombatArenaScreenParams) => (
  <View className="flex-1 bg-brand-bg">
    <View className="h-[42%] min-h-[240px] max-h-[360px] w-full overflow-hidden" />

    <View className="flex-1 items-center px-6 pt-2">
      <Image
        source={arenaSwordHero}
        style={{ width: 72, height: 72, marginBottom: 8 }}
        contentFit="contain"
      />
      <Text
        className="text-3xl font-bold uppercase tracking-[0.12rem] text-white"
        style={{ fontFamily: titleSerif }}
      >
        Arène
      </Text>
      <Text className="mt-4 max-w-[300px] text-center font-mono text-sm leading-6 text-white/65">
        Affronte l&apos;envie, gagne de l&apos;XP et deviens plus fort chaque
        jour.
      </Text>

      <Pressable
        onPress={onLaunchCombat}
        accessibilityRole="button"
        accessibilityLabel="Lancer un combat"
        className="mt-auto mb-10 items-center active:opacity-90"
      >
        <Image
          source={arenaSwordLaunch}
          style={{ width: 64, height: 64 }}
          contentFit="contain"
        />
        <Text className="mt-2 text-center font-mono text-[9px] font-bold uppercase leading-3 tracking-wider text-white">
          Lancer{'\n'}un combat
        </Text>
      </Pressable>
    </View>
  </View>
)
