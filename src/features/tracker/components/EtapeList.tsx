import React from 'react'
import { View, Text } from 'react-native'
import { etapes } from '../utils/calculations'
import { useEtapes } from '../hooks/useEtapes'
import { EtapesRow } from './EtapesRow'


export const EtapeList = () => {
  const { currentEtape, nextEtape } = useEtapes()
  const doneCount = currentEtape ? etapes.filter((e) => e.hours <= currentEtape.hours).length : 0

  return (
    <View className="rounded-xl p-3.5 bg-white/[0.03] border border-brand-accent/15 mb-4 mt-4">
      <View className="flex-row justify-between items-center mb-3">
        <Text className="text-[9px] tracking-[0.2rem] text-white/20 uppercase font-mono">
          Jalons débloqués
        </Text>
        <Text className="text-[10px] text-brand-accent font-mono">
          {doneCount} / {etapes.length}
        </Text>
      </View>
      {etapes.map((etape) => {
        const done = currentEtape != null && etape.hours <= currentEtape.hours
        const current = nextEtape != null && etape.hours === nextEtape.hours
        return (
          <EtapesRow
            key={etape.hours}
            etape={etape}
            done={done}
            current={current}
          />
        )
      })}
    </View>
  )
}
