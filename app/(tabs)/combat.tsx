import { useState } from 'react'
import { View, Text, Pressable, ScrollView } from 'react-native'
import { CombatModal } from '@/src/features/tracker'

export default function CombatScreen() {
  const [open, setOpen] = useState(false)

  return (
    <View className="flex-1 bg-brand-bg">
      <ScrollView
        className="flex-1 px-5 pb-10 pt-12"
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <Text className="font-mono text-[10px] uppercase tracking-[0.35rem] text-white/60">
          Arena
        </Text>
        <Text className="mt-2 text-3xl font-bold tracking-tight text-brand-accent">
          COMBAT
        </Text>
        <Text className="mt-3 font-mono text-sm leading-5 text-white/50">
          Face the craving: each win earns XP. Special moves unlock after a 7-day streak.
        </Text>
        <Pressable
          onPress={() => setOpen(true)}
          className="mt-10 w-full flex-row items-center justify-center gap-2 rounded-2xl border-2 border-brand-accent bg-brand-accent py-5 active:opacity-90"
        >
          <Text className="text-xl">⚔️</Text>
          <Text className="font-mono text-xs uppercase tracking-[0.2rem] text-white">
            Start a battle
          </Text>
        </Pressable>
      </ScrollView>
      <CombatModal visible={open} onClose={() => setOpen(false)} />
    </View>
  )
}
