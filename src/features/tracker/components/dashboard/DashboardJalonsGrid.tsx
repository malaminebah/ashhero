import { View, Text, ScrollView } from 'react-native'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { DASHBOARD_JALONS } from './jalonsConfig'

type Props = {
  hoursSinceQuit: number
}

export const DashboardJalonsGrid = ({ hoursSinceQuit }: Props) => {
  const unlockedCount = DASHBOARD_JALONS.filter((j) => hoursSinceQuit >= j.hours).length

  return (
    <View className="mb-6">
      <View className="mb-3 flex-row items-center justify-between">
        <Text className="font-mono text-[10px] font-bold uppercase tracking-[0.25rem] text-white/80">
          Tes jalons
        </Text>
        <Text className="font-mono text-[10px] text-white/45">
          {unlockedCount} / {DASHBOARD_JALONS.length} débloqués
        </Text>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: 10, paddingRight: 4 }}
      >
        {DASHBOARD_JALONS.map((j) => {
          const active = hoursSinceQuit >= j.hours
          return (
            <View
              key={j.key}
              className={`w-[72px] items-center rounded-xl border px-2 py-3 ${
                active
                  ? 'border-brand-success/50 bg-brand-success/10'
                  : 'border-white/10 bg-white/[0.02]'
              }`}
            >
              <Text
                className={`text-center font-mono text-[9px] font-bold uppercase tracking-wide ${
                  active ? 'text-brand-success' : 'text-white/35'
                }`}
              >
                {j.label}
              </Text>
              <View className="mt-2 h-5 items-center justify-center">
                {active ? (
                  <MaterialIcons name="check-circle" size={18} color="#22c55e" />
                ) : (
                  <MaterialIcons name="lock" size={16} color="rgba(255,255,255,0.3)" />
                )}
              </View>
            </View>
          )
        })}
      </ScrollView>
    </View>
  )
}
