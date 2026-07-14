import { useState } from 'react'
import { View } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { CombatArenaScreen } from '@/src/features/combat/components/CombatArenaScreen'
import { CombatModal } from '@/src/features/combat/components/CombatModal'

export default function CombatScreen() {
  const [open, setOpen] = useState(false)

  return (
    <View className="flex-1 bg-brand-bg">
      <StatusBar style="light" />
      <CombatArenaScreen onLaunchCombat={() => setOpen(true)} />
      <CombatModal visible={open} onClose={() => setOpen(false)} />
    </View>
  )
}
