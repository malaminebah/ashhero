import { View, Text } from 'react-native'
import { DASHBOARD_JALONS } from './jalonsConfig'

type Props = {
  hoursSinceQuit: number
}

export const DashboardJalonsGrid = ({ hoursSinceQuit }: Props) => (
  <View className="mb-6">
    <Text className="mb-3 font-mono text-[10px] uppercase tracking-[0.25rem] text-white/70">
      Jalons
    </Text>
    <View className="flex-row flex-wrap justify-between gap-y-3">
      {DASHBOARD_JALONS.map((j) => {
        const active = hoursSinceQuit >= j.hours
        return (
          <View
            key={j.key}
            className={`aspect-square w-[48%] items-center justify-center rounded-xl border-2 p-3 ${
              active
                ? 'border-brand-accent/60 bg-brand-accent/10'
                : 'border-white/10 bg-white/[0.02] opacity-45'
            }`}
          >
            <Text className={`text-2xl ${active ? '' : 'opacity-50'}`}>{j.icon}</Text>
            <Text
              className={`mt-2 text-center font-mono text-[9px] uppercase tracking-wider ${
                active ? 'text-white' : 'text-white/40'
              }`}
            >
              {j.label}
            </Text>
          </View>
        )
      })}
    </View>
  </View>
)
