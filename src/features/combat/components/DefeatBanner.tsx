import { Pressable, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { FlowText } from '@/components/ui/flow-text'
import { ChunkyButton, CHUNKY_COLORS } from '@/components/ui/chunky-button'
import { ArenaFrame, ArenaPlinth } from './ArenaFrame'
import { CartoonBoss, CartoonHero } from './CartoonSprites'
import type { DefeatBannerParams } from '../types'

export const DefeatBanner = ({ onRetry, onGoHome }: DefeatBannerParams) => (
  <SafeAreaView className="flex-1 bg-brand-bg">
    <View className="flex-1 px-5 pb-4 pt-3" style={{ gap: 16 }}>
      <ArenaFrame tone="defeat" style={{ flex: 1, minHeight: 300 }}>
        <ArenaPlinth width={150} style={{ left: '7%', bottom: 32 }} />
        <View style={{ position: 'absolute', left: '6%', bottom: 40 }}>
          <CartoonHero anim="death" width={150} height={112} />
        </View>
        <View style={{ position: 'absolute', right: '6%', bottom: 44, opacity: 0.92 }}>
          <CartoonBoss anim="idle" width={140} height={140} />
        </View>

        <View
          style={{
            position: 'absolute',
            top: 38,
            alignSelf: 'center',
            backgroundColor: '#1d0b2b',
            borderWidth: 1.5,
            borderColor: 'rgba(239,68,68,0.5)',
            borderRadius: 999,
            paddingHorizontal: 32,
            paddingVertical: 10,
          }}
        >
          <FlowText
            className="text-2xl font-black"
            style={{ color: '#fca5a5', letterSpacing: 1 }}
          >
            Défaite…
          </FlowText>
        </View>
      </ArenaFrame>

      <View
        className="min-h-[48px] justify-center rounded-2xl px-4 py-3"
        style={{
          backgroundColor: '#160826',
          borderWidth: 1.5,
          borderColor: 'rgba(168,85,247,0.45)',
        }}
      >
        <FlowText className="text-center text-sm font-bold leading-5 text-white">
          L&apos;Envie l&apos;emporte <FlowText className="text-sm font-extrabold text-white">cette fois</FlowText>.
          {' '}Un combat perdu n&apos;efface pas ta série, héros.
        </FlowText>
      </View>

      <ChunkyButton
        label="Réessayer"
        palette={CHUNKY_COLORS.green}
        height={58}
        fontSize={16}
        letterSpacing={1}
        onPress={onRetry}
      />

      <Pressable
        onPress={onGoHome}
        accessibilityRole="button"
        accessibilityLabel="Retour à l'accueil"
        className="min-h-[52px] items-center justify-center rounded-full border-[1.5px] border-[rgba(255,255,255,0.2)] active:opacity-80"
      >
        <FlowText className="text-base font-semibold text-[#e9d5ff]">
          Retour à l&apos;accueil
        </FlowText>
      </Pressable>
    </View>
  </SafeAreaView>
)
