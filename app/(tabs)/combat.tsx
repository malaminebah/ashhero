import { useState } from 'react'
import { View, Text, Pressable } from 'react-native'
import { CombatModal } from '@/src/features/tracker'

export default function CombatScreen() {
  const [open, setOpen] = useState(false)

  return (
    <View className="flex-1 bg-brand-bg px-5">
      <View className="flex-1 items-center justify-center">
        <Text className="font-mono text-xs uppercase tracking-[0.35rem] text-white/60">
          Arène
        </Text>
        <Text className="mt-2 text-center text-3xl font-bold tracking-tight text-brand-accent">
          COMBAT
        </Text>
        <Text className="mt-3 max-w-[280px] text-center font-mono text-sm leading-5 text-white/60">
          Affronte l&apos;envie : chaque victoire te rapporte de l&apos;XP. L&apos;attaque
          spéciale se débloque après 7 jours de série.
        </Text>

        <Pressable
          onPress={() => setOpen(true)}
          accessibilityRole="button"
          accessibilityLabel="Lancer un combat"
          className="mt-10 h-28 w-28 items-center justify-center rounded-full border-2 border-brand-accent bg-brand-accent active:opacity-90"
          style={{
            shadowColor: '#a855f7',
            shadowOffset: { width: 0, height: 8 },
            shadowOpacity: 0.45,
            shadowRadius: 20,
            elevation: 10,
          }}
        >
          <Text className="text-3xl">⚔️</Text>
        </Pressable>
        <Text className="mt-4 font-mono text-xs uppercase tracking-[0.2rem] text-white/70">
          Lancer un combat
        </Text>
      </View>

      <CombatModal visible={open} onClose={() => setOpen(false)} />
    </View>
  )
}
