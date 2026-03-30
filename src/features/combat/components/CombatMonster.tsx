import { View, Text } from 'react-native'

type Props = {
  hp: number
  maxHp: number
}

export const CombatMonster = ({ hp, maxHp }: Props) => {
  const pct = Math.max(0, Math.min(100, (hp / maxHp) * 100))
  const clampedHp = Math.max(0, hp)

  return (
    <View className="mb-6 w-full items-center">
      <View className="w-full max-w-[220px] items-center border-4 border-brand-accent bg-brand-bg2 p-5">
        <Text className="text-[72px] leading-[80px]">👾</Text>
        <Text className="mt-2 font-mono text-[10px] uppercase tracking-[0.3rem] text-brand-accent">
          L&apos;envie
        </Text>
      </View>
      <View className="mt-4 w-full max-w-[220px]">
        <View className="mb-1 flex-row justify-between">
          <Text className="font-mono text-[10px] text-white/50">PV</Text>
          <Text className="font-mono text-[10px] text-white">
            {clampedHp} / {maxHp}
          </Text>
        </View>
        <View className="h-3 w-full overflow-hidden border-2 border-brand-border bg-white/10">
          <View className="h-full bg-brand-accent" style={{ width: `${pct}%` }} />
        </View>
      </View>
    </View>
  )
}
