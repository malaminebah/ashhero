import { View, Text } from 'react-native'
import { titleSerif } from '@/constants/theme'

const TOTAL = 6

type Props = {
  step: number
  title: string
  subtitle?: string
}

export const OnboardingHeader = ({ step, title, subtitle }: Props) => (
  <View className="mb-8">
    <Text className="font-mono text-[10px] uppercase tracking-[0.35rem] text-white/55">
      Onboarding · Étape {step}/{TOTAL}
    </Text>
    <Text
      className="mt-2 text-3xl font-bold tracking-tight text-brand-accent"
      style={{ fontFamily: titleSerif }}
    >
      {title}
    </Text>
    {subtitle ? (
      <Text className="mt-3 font-mono text-sm leading-5 text-white/50">{subtitle}</Text>
    ) : null}
  </View>
)
