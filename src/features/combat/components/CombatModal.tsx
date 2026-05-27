import { useCallback, useEffect, useRef } from 'react'
import { Modal, View, Text, Pressable, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { COMBAT_XP_BY_ACTION } from '@/src/features/tracker/combatXpTable'
import { useTrackerStore } from '@/src/features/tracker/store'
import { getDayCount } from '@/src/features/tracker/utils/calculations'
import { displayHeroName } from '@/src/features/tracker/utils/heroName'
import { PlayerHeroEmoji } from '@/src/features/tracker/components/PlayerHeroEmoji'
import { COMBAT_SPECIAL_LOCKED_HINT, combatActionLabel } from '../constants'
import { useTurnCombat } from '../hooks/useTurnCombat'
import { ActionButton } from './ActionButton'
import { BreatheTimer } from './BreatheTimer'
import { CombatArenaView } from './CombatArenaView'
import { CombatHpBar } from './CombatHpBar'
import { CombatMessageBox } from './CombatMessageBox'
import { DefeatBanner } from './DefeatBanner'
import { VictoryBanner } from './VictoryBanner'

const END_SCREEN_MS = 2200

type Props = {
  visible: boolean
  onClose: () => void
}

export const CombatModal = ({ visible, onClose }: Props) => {
  const quitDate = useTrackerStore((s) => s.quitDate)
  const level = useTrackerStore((s) => s.level)
  const heroName = useTrackerStore((s) => s.heroName)
  const streakDays = getDayCount(quitDate)
  const heroLabel = displayHeroName(heroName).toUpperCase()

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
    currentAttackEmoji,
    turnCount,
    showActionButtons,
    showBreatheTimer,
    showAbandon,
    chooseBreathe,
    onBreatheComplete,
    chooseInstantAction,
    abandon,
  } = useTurnCombat({ enabled: visible })

  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const closeWithReset = useCallback(() => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current)
      closeTimerRef.current = null
    }
    onClose()
  }, [onClose])

  useEffect(() => {
    if (!visible && closeTimerRef.current) {
      clearTimeout(closeTimerRef.current)
      closeTimerRef.current = null
    }
  }, [visible])

  useEffect(() => {
    const shouldAutoClose =
      phase === 'victory' ||
      (phase === 'defeat' && defeatSource === 'riposte')
    if (!shouldAutoClose) return
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current)
    closeTimerRef.current = setTimeout(() => {
      closeTimerRef.current = null
      closeWithReset()
    }, END_SCREEN_MS)
    return () => {
      if (closeTimerRef.current) {
        clearTimeout(closeTimerRef.current)
        closeTimerRef.current = null
      }
    }
  }, [phase, defeatSource, closeWithReset])

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

  return (
    <Modal
      visible={visible}
      animationType="fade"
      presentationStyle="fullScreen"
      onRequestClose={handleRequestClose}
    >
      <SafeAreaView className="flex-1 bg-[#05000a]">
        <ScrollView
          className="flex-1"
          contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 20, paddingBottom: 24 }}
          showsVerticalScrollIndicator={false}
        >
          <View className="mb-4 flex-row items-center justify-between pt-2">
            <Pressable
              onPress={handleRequestClose}
              accessibilityRole="button"
              accessibilityLabel="Fermer le combat"
              className="h-10 w-10 items-center justify-center rounded-lg border border-white/15 bg-white/[0.04] active:opacity-80"
            >
              <MaterialIcons name="close" size={20} color="#f3e8ff" />
            </Pressable>
            <Text className="font-mono text-xs uppercase tracking-wider text-white/70">
              Tour : {turnCount} / ∞
            </Text>
          </View>

          {phase === 'victory' && victoryAction != null ? (
            <VictoryBanner xpGained={xpGained} streakDays={streakDays} />
          ) : phase === 'defeat' && defeatSource === 'riposte' ? (
            <DefeatBanner />
          ) : phase === 'defeat' && defeatSource === 'abandon' ? null : (
            <View className="flex-1">
              <View className="mb-3">
                <Text className="mb-2 font-mono text-sm font-bold uppercase text-white">
                  L&apos;envie 👿
                </Text>
                <CombatHpBar hp={bossHp} maxHp={bossMaxHp} fillColor="#a855f7" />
              </View>

              <CombatArenaView
                level={level}
                bossShakeKey={bossShakeKey}
                playerShakeKey={playerShakeKey}
                attackEmoji={currentAttackEmoji}
              />

              <View className="mb-4 flex-row items-center gap-2">
                <Text className="font-mono text-sm font-bold uppercase text-white">
                  {heroLabel}
                </Text>
                <PlayerHeroEmoji level={level} variant="profile" />
              </View>
              <View className="mb-4">
                <CombatHpBar hp={playerHp} maxHp={playerMaxHp} fillColor="#22c55e" />
              </View>

              <CombatMessageBox
                message={battleMessage}
                showPrompt={phase === 'player_turn' && !showBreatheTimer}
              />

              {showBreatheTimer ? <BreatheTimer onComplete={onBreatheComplete} /> : null}

              <View className="mt-2 gap-2">
                {showActionButtons ? (
                  <>
                    <ActionButton
                      variant="breathe"
                      label={combatActionLabel('breathe')}
                      onPress={chooseBreathe}
                      badge="60s"
                      accessibilityLabel="Respirer"
                    />
                    <ActionButton
                      variant="water"
                      label={combatActionLabel('water')}
                      onPress={() => chooseInstantAction('water')}
                      accessibilityLabel="Boire de l'eau"
                    />
                    <ActionButton
                      variant="distract"
                      label={combatActionLabel('distract')}
                      onPress={() => chooseInstantAction('distract')}
                      accessibilityLabel="Se distraire"
                    />
                    <ActionButton
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
                  </>
                ) : null}

                {showAbandon ? (
                  <Pressable
                    onPress={() => void onAbandon()}
                    accessibilityRole="button"
                    accessibilityLabel="Abandonner le combat"
                    className="mt-3 items-center py-3 active:opacity-70"
                  >
                    <Text className="font-mono text-[10px] uppercase tracking-wider text-white/45">
                      Abandonner le combat
                    </Text>
                  </Pressable>
                ) : null}
              </View>
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    </Modal>
  )
}
