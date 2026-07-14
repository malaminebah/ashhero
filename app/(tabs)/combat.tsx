import { useState } from 'react'
import { View } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { CombatArenaScreen } from '@/src/features/combat/components/CombatArenaScreen'
import { CombatModal } from '@/src/features/combat/components/CombatModal'
import type { CravingTier } from '@/src/features/combat/types'

export default function CombatScreen() {
  const [tier, setTier] = useState<CravingTier | null>(null)

  return (
    <View className="flex-1 bg-brand-bg">
      <StatusBar style="light" />
      <CombatArenaScreen onLaunchCombat={setTier} />
      <CombatModal visible={tier != null} tier={tier ?? 'soft'} onClose={() => setTier(null)} />
    </View>
  )
}
