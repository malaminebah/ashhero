import { View, Text } from 'react-native'
import { useEtapes } from '../hooks/useEtapes'

export const EtapeBarComponent = () => {
  const etapes = useEtapes()
  const pct = Math.min(100, (etapes.percentageComplete ?? 0) * 100)

  return (
    <View className="mb-5">
      <View className="flex-row justify-between mb-2.5">
        <Text className="text-xs text-white/40 font-mono" numberOfLines={1}>
          {etapes.currentEtape?.title ?? '—'}
        </Text>
        <Text className="text-xs text-brand-accent font-mono">
          → {etapes.nextEtape?.title ?? 'Terminé'}
        </Text>
      </View>
      <View className="h-2 w-full rounded bg-white/5 overflow-hidden">
        <View
          className="h-full rounded bg-brand-accent"
          style={{ width: `${pct}%` }}
        />
      </View>
    </View>
  )
}
