import { useEffect, useState, forwardRef, useImperativeHandle, useRef } from 'react'
import { View, TextInput, Pressable, type TextStyle } from 'react-native'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { flowFontFamily } from '@/constants/flowTheme'
import { HeroSprite } from '@/components/characters/HeroSprite'
import { GameLabel } from '@/components/ui/game-label'
import { XpBar } from '@/components/ui/xp-bar'
import { xpProgressInLevel } from '../../utils/levelProgress'
import {
  DEFAULT_HERO_NAME,
  displayHeroName,
  HERO_NAME_MAX_LEN,
  normalizeHeroName,
} from '../../utils/heroName'

import type { ProfileHeroCardHandle, ProfileHeroCardParams } from '../../types'

export type { ProfileHeroCardHandle } from '../../types'

const inputStyle: TextStyle = { fontFamily: flowFontFamily.sans }

export const ProfileHeroCard = forwardRef<ProfileHeroCardHandle, ProfileHeroCardParams>(
  ({ level, xp, heroName, onSaveName }, ref) => {
    const inputRef = useRef<TextInput>(null)
    const [draft, setDraft] = useState(() => displayHeroName(heroName))
    const { nextCap, pct } = xpProgressInLevel(xp)

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
      <View className="mb-5 items-center">
        <View className="h-24 w-24 items-center justify-end overflow-hidden rounded-full border-[3px] border-brand-success bg-brand-track">
          <View style={{ marginBottom: -12 }}>
            <HeroSprite pose="idle" width={66} height={80} />
          </View>
        </View>

        <View className="mt-2 flex-row items-center">
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
            placeholderTextColor="#5b4a75"
            className="py-1 text-center text-[22px] font-extrabold text-white"
            style={inputStyle}
          />
          <Pressable
            onPress={() => inputRef.current?.focus()}
            accessibilityRole="button"
            accessibilityLabel="Modifier le nom"
            className="ml-2 h-8 w-8 items-center justify-center"
          >
            <MaterialIcons name="edit" size={16} color="#8b7aa8" />
          </Pressable>
        </View>
        <GameLabel>Héros niveau {level}</GameLabel>

        <View className="mt-4 w-full">
          <View className="mb-1.5 flex-row items-center justify-between">
            <GameLabel>Niveau {level}</GameLabel>
            <GameLabel className="text-brand-gold">
              {xp} / {nextCap} XP
            </GameLabel>
          </View>
          <XpBar progress={pct / 100} />
        </View>
      </View>
    )
  }
)

ProfileHeroCard.displayName = 'ProfileHeroCard'
