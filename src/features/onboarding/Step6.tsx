import React from 'react'
import { View, Pressable, Text } from 'react-native'
import { useRouter } from 'expo-router'
import { useOnboardingStore } from './store'
import { useTrackerStore } from '@/src/features/tracker/store'
import { getCurrentUid, saveProfile } from '@/src/services'

const Step6 = () => {
  const router = useRouter()
  const onboarding = useOnboardingStore()
  const { initialize } = useTrackerStore()

  const onStart = async () => {
    const profile = {
      smokingType: onboarding.smokingType,
      quantityPerDay: onboarding.quantityPerDay,
      pricePerUnit: onboarding.pricePerUnit,
      quitDate: onboarding.quitDate,
      isFirstTime: onboarding.isFirstTime,
      unlockedEtapes: [], 
    }
    initialize(profile)

    const uid = getCurrentUid()
    console.log(uid);
    
    if (uid) {
      try {
        await saveProfile(uid, profile)
        console.log('====================================');
        console.log('profile save ', uid);
        console.log('====================================');
      } catch (error) {
        console.log('error uid', error)
      }
     
    }
    else{
      console.log('2. ❌ uid null')
    }
      onboarding.reset()
      router.replace('/(tabs)' as never)
  }

  return (
    <View className="flex-1 bg-brand-bg p-6 pt-12 justify-center">
      <Text className="text-white text-2xl font-mono mb-2">Tu es prêt ⚔️</Text>
      <Text className="text-white/70 text-lg font-mono mb-12">
        Ton aventure commence maintenant.
      </Text>
      <Pressable
        onPress={onStart}
        className="w-full py-4 rounded-xl items-center justify-center bg-brand-accentDark active:opacity-90"
      >
        <Text className="text-white text-sm font-mono tracking-widest uppercase">
          Commencer
        </Text>
      </Pressable>
    </View>
  )
}

export default Step6
