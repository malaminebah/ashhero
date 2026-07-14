import { useRouter } from 'expo-router'
import { OnboardingBreatheScreen } from '@/src/features/onboarding/components/OnboardingBreatheScreen'

export default function BreatheInterstitialScreen() {
  const router = useRouter()
  return (
    <OnboardingBreatheScreen
      onDone={() => router.replace('/onboarding/step1' as never)}
    />
  )
}
