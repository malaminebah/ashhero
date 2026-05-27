import { useState } from 'react'
import { View } from 'react-native'
import { CombatArenaScreen } from '@/src/features/combat/components/CombatArenaScreen'
import { CombatModal } from '@/src/features/tracker'

export default function CombatScreen() {
  const [open, setOpen] = useState(false)

  return (
    <View className="flex-1 bg-brand-bg">
      <CombatArenaScreen onLaunchCombat={() => setOpen(true)} />
      <CombatModal visible={open} onClose={() => setOpen(false)} />
    </View>
  )
}
