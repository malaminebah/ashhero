import { useEffect, useState, forwardRef, useImperativeHandle, useRef } from 'react'
import { View, Text, TextInput, Platform, Pressable } from 'react-native'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
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

import type { ProfileHeroCardHandle, ProfileHeroCardParams } from '../../types'

export type { ProfileHeroCardHandle } from '../../types'

export const ProfileHeroCard = forwardRef<ProfileHeroCardHandle, ProfileHeroCardParams>(
  ({ level, heroName, onSaveName }, ref) => {
    const inputRef = useRef<TextInput>(null)
    const [draft, setDraft] = useState(() => displayHeroName(heroName))

    useImperativeHandle(ref, () => ({
      focusName: () => inputRef.current?.focus(),
    }))

    useEffect(() => {
      setDraft(displayHeroName(heroName))
    }, [heroName])

    const commitName = () => {
      if (normalizeHeroName(draft) === heroName) return
      onSaveName(draft)
    }

    return (
      <View className="mb-5 flex-row items-center gap-4">
        <View
          className="h-[96px] w-[96px] items-center justify-center rounded-full border-2 border-brand-success/45 bg-brand-bg2"
          style={{
            shadowColor: '#22c55e',
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0.4,
            shadowRadius: 16,
            elevation: 10,
          }}
        >
          <PlayerHeroEmoji level={level} variant="profile" />
        </View>
        <View className="relative flex-1">
          <TextInput
            ref={inputRef}
            value={draft}
            onChangeText={setDraft}
            onBlur={commitName}
            onSubmitEditing={commitName}
            maxLength={HERO_NAME_MAX_LEN}
            returnKeyType="done"
            accessibilityLabel="Nom du héros"
            placeholder={DEFAULT_HERO_NAME}
            placeholderTextColor="rgba(255,255,255,0.35)"
            className="rounded-xl border border-white/10 bg-white/[0.06] py-3 pl-4 pr-10 text-lg font-bold text-white"
            style={{ fontFamily: nameSerif }}
          />
          <Pressable
            onPress={() => inputRef.current?.focus()}
            accessibilityRole="button"
            accessibilityLabel="Modifier le nom"
            className="absolute bottom-0 right-0 top-0 w-10 items-center justify-center"
          >
            <MaterialIcons name="edit" size={16} color="rgba(255,255,255,0.45)" />
          </Pressable>
        </View>
      </View>
    )
  }
)

ProfileHeroCard.displayName = 'ProfileHeroCard'
