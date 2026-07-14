import { View } from 'react-native'
import { useRouter } from 'expo-router'
import Svg, { Path, Text as SvgText } from 'react-native-svg'
import { flowShadow } from '@/constants/flowTheme'
import { flowSurface } from '@/constants/flowSurfaces'
import { OnboardingPrimaryButton } from './components/OnboardingPrimaryButton'
import { OnboardingScreen } from './components/OnboardingScreen'
import { OnboardingText } from './components/OnboardingText'

const Laurels = () => (
  <Svg width={190} height={110} viewBox="0 0 190 110">
    <Path
      d="M40 96 C10 78 4 40 16 14 C20 42 30 66 56 84"
      stroke="#F5C518"
      strokeWidth={7}
      strokeLinecap="round"
      fill="none"
    />
    <Path
      d="M150 96 C180 78 186 40 174 14 C170 42 160 66 134 84"
      stroke="#F5C518"
      strokeWidth={7}
      strokeLinecap="round"
      fill="none"
    />
    <SvgText
      x={95}
      y={66}
      textAnchor="middle"
      fontFamily="Nunito_800ExtraBold"
      fontSize={42}
      fill="#171717"
    >
      87 %
    </SvgText>
  </Svg>
)

const StatCard = ({ value, label, color }: { value: string; label: string; color: string }) => (
  <View className={`flex-1 p-4 ${flowSurface.card}`} style={flowShadow.card}>
    <OnboardingText className="text-2xl font-extrabold" style={{ color }}>
      {value}
    </OnboardingText>
    <OnboardingText className="mt-1 text-[13px] text-flow-faint">{label}</OnboardingText>
  </View>
)

const OnboardingSocialProof = () => {
  const router = useRouter()

  return (
    <OnboardingScreen
      centered
      footer={
        <OnboardingPrimaryButton
          label="C'est parti !"
          onPress={() => router.replace('/(tabs)' as never)}
        />
      }
    >
      <View className="items-center">
        <Laurels />
        <OnboardingText className="mt-5 text-center text-[22px] font-bold leading-8 text-flow-text">
          réduisent leur conso{'\n'}dès la 1ʳᵉ semaine
        </OnboardingText>
        <OnboardingText className="mt-3 max-w-[300px] text-center text-[15px] leading-6 text-flow-muted">
          Rejoins 12 000 héros qui affrontent l&apos;Envie chaque jour avec AshHero. Ta
          quête commence maintenant.
        </OnboardingText>
        <View className="mt-9 w-full flex-row gap-3">
          <StatCard value="12 000+" label="héros actifs" color="#7C3AED" />
          <StatCard value="340 k" label="combats gagnés" color="#22c55e" />
        </View>
      </View>
    </OnboardingScreen>
  )
}

export default OnboardingSocialProof
