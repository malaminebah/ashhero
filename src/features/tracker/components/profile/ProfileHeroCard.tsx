import { useEffect, useState } from 'react'
import { View, Text, TextInput, Platform } from 'react-native'
import { PlayerHeroEmoji } from '../PlayerHeroEmoji'
import {
  DEFAULT_HERO_NAME,
  displayHeroName,
  HERO_NAME_MAX_LEN,
  normalizeHeroName,
} from '../../utils/heroName'

const nameSerif = Platform.select({
  ios: 'Georgia',
  android: 'serif',
  default: 'serif',
})

type Props = {
  level: number
  xp: number
  heroName: string | null
  onSaveName: (name: string) => void
}

export const ProfileHeroCard = ({ level, xp, heroName, onSaveName }: Props) => {
  const [draft, setDraft] = useState(() => displayHeroName(heroName))

  useEffect(() => {
    setDraft(displayHeroName(heroName))
  }, [heroName])

  const commitName = () => {
    if (normalizeHeroName(draft) === heroName) return
    onSaveName(draft)
  }

  return (
    <View
      className="mb-8 rounded-2xl border border-brand-accent/35 bg-brand-bg2/80 p-4"
      style={{
        shadowColor: '#a855f7',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.35,
        shadowRadius: 16,
        elevation: 10,
      }}
    >
      <View className="flex-row items-center gap-4">
        <View
          className="h-[88px] w-[88px] items-center justify-center rounded-xl border-2 border-brand-accent/45 bg-brand-bg"
          style={{
            shadowColor: '#a855f7',
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0.4,
            shadowRadius: 12,
            elevation: 8,
          }}
        >
          <PlayerHeroEmoji level={level} variant="profile" />
        </View>
        <View className="flex-1">
          <Text className="mb-1 font-mono text-[9px] uppercase tracking-wider text-white/45">
            Nom du héros
          </Text>
          <TextInput
            value={draft}
            onChangeText={setDraft}
            onBlur={commitName}
            onSubmitEditing={commitName}
            maxLength={HERO_NAME_MAX_LEN}
            returnKeyType="done"
            accessibilityLabel="Nom du héros"
            placeholder={DEFAULT_HERO_NAME}
            placeholderTextColor="rgba(255,255,255,0.35)"
            className="rounded-md border border-white/10 bg-black/20 px-2 py-1.5 text-lg font-bold leading-6 text-white"
            style={{ fontFamily: nameSerif }}
          />
          <View className="mt-3 flex-row flex-wrap gap-2">
            <View className="rounded-full border border-brand-accent/50 bg-brand-accent/20 px-3 py-1">
              <Text className="font-mono text-[10px] font-bold uppercase tracking-wider text-brand-accent">
                Niveau {level}
              </Text>
            </View>
            <View className="rounded-full border border-brand-gold/50 bg-brand-gold/15 px-3 py-1">
              <Text className="font-mono text-[10px] font-bold text-brand-gold">{xp} XP</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  )
}
