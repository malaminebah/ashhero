import { View, Text, Pressable } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { PlayerSoldierSprite } from './PlayerSoldierSprite'
import type { DefeatBannerParams } from '../types'

export const DefeatBanner = ({ onRetry, onGoHome }: DefeatBannerParams) => (
  <View className="flex-1 items-center justify-center px-2 py-6">
    <View className="mb-5 rounded-lg border-2 border-brand-red bg-brand-red px-10 py-2.5">
      <Text className="font-mono text-base font-bold uppercase tracking-wider text-white">
        Défaite
      </Text>
    </View>

    <View className="mb-2 w-full items-center">
      <PlayerSoldierSprite anim="death" />
    </View>

    <Text className="mt-4 text-center font-mono text-sm text-white/75">
      L&apos;envie a pris le dessus…
    </Text>
    <Text className="mt-1 text-center font-mono text-sm font-bold text-white">
      Ce n&apos;est pas un échec.
    </Text>

    <View className="mt-8 w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-4">
      <Text className="text-center font-mono text-[10px] font-bold uppercase tracking-wider text-white/45">
        Tu peux toujours revenir
      </Text>
      <Text className="mt-2 text-center font-mono text-xs text-white/70">
        Chaque combat te rend plus fort.
      </Text>
    </View>

    <Pressable
      onPress={onRetry}
      accessibilityRole="button"
      accessibilityLabel="Réessayer"
      className="mt-8 w-full active:opacity-90"
    >
      <LinearGradient
        colors={['#b91c1c', '#ef4444', '#dc2626']}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
        style={{
          borderRadius: 12,
          paddingVertical: 16,
          alignItems: 'center',
        }}
      >
        <Text className="font-mono text-sm font-bold uppercase tracking-wider text-white">
          Réessayer
        </Text>
      </LinearGradient>
    </Pressable>

    <Pressable
      onPress={onGoHome}
      accessibilityRole="button"
      accessibilityLabel="Retour accueil"
      className="mt-3 w-full items-center rounded-xl border border-white/20 py-4 active:opacity-85"
    >
      <Text className="font-mono text-sm font-bold uppercase tracking-wider text-white/80">
        Retour accueil
      </Text>
    </Pressable>
  </View>
)
