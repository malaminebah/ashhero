import { useCallback, useEffect, useRef } from 'react'
import { Modal, View, Text, Pressable, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { COMBAT_XP_BY_ACTION } from '@/src/features/tracker/combatXpTable'
import { useTrackerStore } from '@/src/features/tracker/store'
import { getDayCount } from '@/src/features/tracker/utils/calculations'
import { combatActionLabel } from '../constants'
import { useTurnCombat } from '../hooks/useTurnCombat'
import { ActionButton } from './ActionButton'
import { BreatheTimer } from './BreatheTimer'
import { CombatMessageBox } from './CombatMessageBox'
import { CombatMonster } from './CombatMonster'
import { CombatPlayerPanel } from './CombatPlayerPanel'
import { DefeatBanner } from './DefeatBanner'
import { VictoryBanner } from './VictoryBanner'

const END_SCREEN_MS = 2200

type Props = {
  visible: boolean
  onClose: () => void
}

export const CombatModal = ({ visible, onClose }: Props) => {
  const quitDate = useTrackerStore((s) => s.quitDate)
  const streakDays = getDayCount(quitDate)

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
      <SafeAreaView className="flex-1 bg-brand-bg">
        <ScrollView
          className="flex-1 px-5 pb-8 pt-4"
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <Text className="mb-3 text-center font-mono text-lg uppercase tracking-[0.2rem] text-white">
            Battle
          </Text>
          <Text className="mb-2 text-center font-mono text-[10px] uppercase tracking-[0.15rem] text-white/40">
            Each turn: your move, then the Craving strikes back.
          </Text>

          {phase === 'victory' && victoryAction != null ? (
            <VictoryBanner xpGained={xpGained} streakDays={streakDays} />
          ) : phase === 'defeat' && defeatSource === 'riposte' ? (
            <DefeatBanner />
          ) : phase === 'defeat' && defeatSource === 'abandon' ? null : (
            <>
              <Text className="mb-2 text-center font-mono text-[10px] text-brand-accent">
                Opponent
              </Text>
              <CombatMonster
                hp={bossHp}
                maxHp={bossMaxHp}
                shakeKey={bossShakeKey}
              />

              <Text className="mb-2 mt-2 text-center font-mono text-[10px] text-emerald-400/90">
                You
              </Text>
              <CombatPlayerPanel
                hp={playerHp}
                maxHp={playerMaxHp}
                shakeKey={playerShakeKey}
              />

              <CombatMessageBox message={battleMessage} />

              {phase === 'enemy_turn' ? (
                <Text className="mb-4 text-center font-mono text-sm text-white/60">
                  The Craving&apos;s turn…
                </Text>
              ) : null}

              {showBreatheTimer ? (
                <BreatheTimer onComplete={onBreatheComplete} />
              ) : null}

              {showActionButtons ? (
                <View>
                  <ActionButton
                    label={combatActionLabel('breathe')}
                    onPress={chooseBreathe}
                  />
                  <ActionButton
                    label={combatActionLabel('water')}
                    onPress={() => chooseInstantAction('water')}
                  />
                  <ActionButton
                    label={combatActionLabel('distract')}
                    onPress={() => chooseInstantAction('distract')}
                  />
                  <ActionButton
                    label={combatActionLabel('special')}
                    onPress={() => chooseInstantAction('special')}
                    disabled={!canUseSpecial}
                  />
                </View>
              ) : null}

              {phase === 'resolving_instant' && !showBreatheTimer ? (
                <Text className="text-center font-mono text-xs text-white/50">
                  …
                </Text>
              ) : null}
            </>
          )}

          {showAbandon ? (
            <Pressable
              onPress={() => void onAbandon()}
              className="mt-8 w-full items-center rounded-xl border border-white/20 py-4 active:opacity-80"
            >
              <Text className="font-mono text-xs uppercase tracking-widest text-white/70">
                Surrender
              </Text>
            </Pressable>
          ) : null}
        </ScrollView>
      </SafeAreaView>
    </Modal>
  )
}
