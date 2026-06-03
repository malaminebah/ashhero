import { useCallback, useMemo } from 'react'
import { Modal, View, Text, Pressable } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useRouter } from 'expo-router'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { COMBAT_XP_BY_ACTION } from '@/src/features/tracker/combatXpTable'
import { useTrackerStore } from '@/src/features/tracker/store'
import { displayHeroName } from '@/src/features/tracker/utils/heroName'
import { COMBAT_SPECIAL_LOCKED_HINT, combatActionLabel } from '../constants'
import { useTurnCombat } from '../hooks/useTurnCombat'
import { getPlayerSoldierAnim } from '../utils/playerSoldierAnim'
import { ActionButton } from './ActionButton'
import { BreatheTimer } from './BreatheTimer'
import { CombatArenaView } from './CombatArenaView'
import { CombatHpBar } from './CombatHpBar'
import { CombatMessageBox } from './CombatMessageBox'
import { DefeatBanner } from './DefeatBanner'
import { FloatingDamage } from './FloatingDamage'
import { VictoryBanner } from './VictoryBanner'
import type { CombatModalParams } from '../types'

export const CombatModal = ({ visible, onClose }: CombatModalParams) => {
  const router = useRouter()
  const level = useTrackerStore((s) => s.level)
  const heroName = useTrackerStore((s) => s.heroName)
  const heroLabel = displayHeroName(heroName).toUpperCase()
  const heroDialogName = displayHeroName(heroName)

  const {
    phase,
    playerHp,
    playerMaxHp,
    bossHp,
    bossMaxHp,
    battleMessage,
    bossShakeKey,
    playerShakeKey,
    victoryAction,
    defeatSource,
    canUseSpecial,
    currentAttackEffect,
    floatDamage,
    turnCount,
    showActionButtons,
    showBreatheTimer,
    showAbandon,
    chooseBreathe,
    onBreatheComplete,
    chooseInstantAction,
    abandon,
    reset,
  } = useTurnCombat({ enabled: visible })

  const closeWithReset = useCallback(() => {
    onClose()
  }, [onClose])

  const onGoHome = useCallback(() => {
    closeWithReset()
    router.replace('/(tabs)/' as never)
  }, [closeWithReset, router])

  const onAbandon = async () => {
    await abandon()
    closeWithReset()
  }

  const handleRequestClose = () => {
    if (phase === 'victory' || phase === 'defeat') {
      closeWithReset()
      return
    }
    void abandon().then(() => closeWithReset())
  }

  const xpGained =
    victoryAction != null ? COMBAT_XP_BY_ACTION[victoryAction] : 0

  const isResultScreen = phase === 'victory' || phase === 'defeat'

  const playerAnim = useMemo(
    () => getPlayerSoldierAnim(phase, playerHp, currentAttackEffect),
    [phase, playerHp, currentAttackEffect]
  )

  return (
    <Modal
      visible={visible}
      animationType="fade"
      presentationStyle="fullScreen"
      onRequestClose={handleRequestClose}
    >
      <SafeAreaView className="flex-1 bg-[#05000a]">
        {isResultScreen ? (
          <View className="flex-1 px-5 pb-6">
            {phase === 'victory' && victoryAction != null ? (
              <VictoryBanner
                xpGained={xpGained}
                level={level}
                onContinue={closeWithReset}
              />
            ) : phase === 'defeat' && defeatSource != null ? (
              <DefeatBanner onRetry={reset} onGoHome={onGoHome} />
            ) : null}
          </View>
        ) : (
          <View className="flex-1 px-4 pb-4">
            <View className="mb-2 flex-row items-center justify-between pt-1">
              <Pressable
                onPress={handleRequestClose}
                accessibilityRole="button"
                accessibilityLabel="Fermer le combat"
                className="h-10 w-10 items-center justify-center rounded-lg border border-white/15 bg-white/[0.04] active:opacity-80"
              >
                <MaterialIcons name="close" size={20} color="#f3e8ff" />
              </Pressable>
              <Text className="font-mono text-xs uppercase tracking-wider text-white/70">
                Tour {turnCount}
              </Text>
            </View>

            <View className="mb-2 min-h-[200px] flex-1">
              <CombatArenaView
                bossDefeated={bossHp <= 0}
                bossShakeKey={bossShakeKey}
                playerShakeKey={playerShakeKey}
                attackEffect={currentAttackEffect}
                playerAnim={playerAnim}
              >
                <View className="absolute left-3 top-3 z-10">
                  <CombatHpBar
                    overlay
                    variant="boss"
                    name="L'ENVIE"
                    level={level + 1}
                    hp={bossHp}
                    maxHp={bossMaxHp}
                  />
                </View>

                <View className="absolute bottom-3 right-3 z-10 items-end">
                  <CombatHpBar
                    overlay
                    variant="player"
                    name={heroLabel}
                    level={level}
                    hp={playerHp}
                    maxHp={playerMaxHp}
                  />
                </View>

                {floatDamage != null ? (
                  <FloatingDamage floatDamage={floatDamage} />
                ) : null}
              </CombatArenaView>
            </View>

            <CombatMessageBox
              message={battleMessage}
              heroName={heroDialogName}
              showPrompt={phase === 'player_turn' && !showBreatheTimer}
            />

            {showBreatheTimer ? <BreatheTimer onComplete={onBreatheComplete} /> : null}

            {showActionButtons ? (
              <View className="mt-2 flex-row flex-wrap justify-between gap-y-2">
                <View className="w-[48%]">
                  <ActionButton
                    compact
                    variant="breathe"
                    label={combatActionLabel('breathe')}
                    onPress={chooseBreathe}
                    badge="60s"
                    accessibilityLabel="Respirer"
                  />
                </View>
                <View className="w-[48%]">
                  <ActionButton
                    compact
                    variant="water"
                    label={combatActionLabel('water')}
                    onPress={() => chooseInstantAction('water')}
                    accessibilityLabel="Boire de l'eau"
                  />
                </View>
                <View className="w-[48%]">
                  <ActionButton
                    compact
                    variant="distract"
                    label={combatActionLabel('distract')}
                    onPress={() => chooseInstantAction('distract')}
                    accessibilityLabel="Se distraire"
                  />
                </View>
                <View className="w-[48%]">
                  <ActionButton
                    compact
                    variant="special"
                    label={combatActionLabel('special')}
                    onPress={() => chooseInstantAction('special')}
                    disabled={!canUseSpecial}
                    lockHint={!canUseSpecial ? COMBAT_SPECIAL_LOCKED_HINT : undefined}
                    accessibilityLabel={
                      canUseSpecial
                        ? 'Attaque spéciale'
                        : `Attaque spéciale, débloquée après ${COMBAT_SPECIAL_LOCKED_HINT}`
                    }
                  />
                </View>
              </View>
            ) : null}

            {showAbandon ? (
              <Pressable
                onPress={() => void onAbandon()}
                accessibilityRole="button"
                accessibilityLabel="Abandonner le combat"
                className="mt-2 items-center py-2 active:opacity-70"
              >
                <Text className="font-mono text-[10px] uppercase tracking-wider text-white/45">
                  Abandonner le combat
                </Text>
              </Pressable>
            ) : null}
          </View>
        )}
      </SafeAreaView>
    </Modal>
  )
}
