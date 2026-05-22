import { useCallback, useEffect, useRef } from 'react'
import { Modal, View, Text, Pressable } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { COMBAT_XP_BY_ACTION } from '@/src/features/tracker/combatXpTable'
import { useTrackerStore } from '@/src/features/tracker/store'
import { getDayCount } from '@/src/features/tracker/utils/calculations'
import { COMBAT_SPECIAL_LOCKED_HINT, combatActionLabel } from '../constants'
import { useTurnCombat } from '../hooks/useTurnCombat'
import { ActionButton } from './ActionButton'
import { AttackEffect } from './AttackEffect'
import { BreatheTimer } from './BreatheTimer'
import { CombatMessageBox } from './CombatMessageBox'
import { CombatMonster } from './CombatMonster'
import { CombatPlayerPanel } from './CombatPlayerPanel'
import { DefeatBanner } from './DefeatBanner'
import { VictoryBanner } from './VictoryBanner'

const END_SCREEN_MS = 2200
const ENEMY_TURN_LABEL = "L'Envie riposte…"

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
    currentAttackEmoji,
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

  const showEnemyRiposte =
    phase === 'enemy_turn' ||
    (phase === 'resolving_instant' && !showBreatheTimer)

  return (
    <Modal
      visible={visible}
      animationType="fade"
      presentationStyle="fullScreen"
      onRequestClose={handleRequestClose}
    >
      <SafeAreaView className="flex-1 bg-[#05000a]">
        <View className="flex-1 px-5 pb-6 pt-4">
          <Text className="mb-2 text-center font-mono text-lg uppercase tracking-[0.2rem] text-white">
            Combat
          </Text>
          <Text className="mb-3 text-center font-mono text-xs leading-5 text-white/60">
            À chaque tour : ton action, puis la riposte de l&apos;Envie.
          </Text>

          {phase === 'victory' && victoryAction != null ? (
            <VictoryBanner xpGained={xpGained} streakDays={streakDays} />
          ) : phase === 'defeat' && defeatSource === 'riposte' ? (
            <DefeatBanner />
          ) : phase === 'defeat' && defeatSource === 'abandon' ? null : (
            <View className="flex-1">
              <Text className="mb-2 text-center font-mono text-xs text-white/80">
                L&apos;Envie
              </Text>
              <CombatMonster
                hp={bossHp}
                maxHp={bossMaxHp}
                shakeKey={bossShakeKey}
              />

              <Text className="mb-2 mt-2 text-center font-mono text-xs text-emerald-400/90">
                Toi
              </Text>
              <CombatPlayerPanel
                hp={playerHp}
                maxHp={playerMaxHp}
                shakeKey={playerShakeKey}
              />

              <CombatMessageBox message={battleMessage} />

              <AttackEffect
                emoji={currentAttackEmoji ?? ''}
                visible={currentAttackEmoji != null}
              />

              {showEnemyRiposte ? (
                <Text className="mb-3 text-center font-mono text-xs text-white/60">
                  {ENEMY_TURN_LABEL}
                </Text>
              ) : null}

              {showBreatheTimer ? (
                <BreatheTimer onComplete={onBreatheComplete} />
              ) : null}

              <View className="mt-auto gap-2 pt-2">
                {showActionButtons ? (
                  <>
                    <ActionButton
                      variant="primary"
                      label={combatActionLabel('breathe')}
                      onPress={chooseBreathe}
                      accessibilityLabel="Respirer"
                    />
                    <ActionButton
                      variant="secondary"
                      label={combatActionLabel('water')}
                      onPress={() => chooseInstantAction('water')}
                      accessibilityLabel="Boire de l'eau"
                    />
                    <ActionButton
                      variant="secondary"
                      label={combatActionLabel('distract')}
                      onPress={() => chooseInstantAction('distract')}
                      accessibilityLabel="Se distraire"
                    />
                    <ActionButton
                      variant="special"
                      label={combatActionLabel('special')}
                      onPress={() => chooseInstantAction('special')}
                      disabled={!canUseSpecial}
                      hint={!canUseSpecial ? COMBAT_SPECIAL_LOCKED_HINT : undefined}
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
                    android_ripple={{ color: 'rgba(255,255,255,0.08)' }}
                    className="mt-2 min-h-[48px] w-full items-center justify-center rounded-md border border-white/20 px-4 py-3"
                    style={({ pressed }) =>
                      pressed ? { opacity: 0.85, transform: [{ scale: 0.99 }] } : undefined
                    }
                  >
                    <Text className="font-mono text-xs uppercase tracking-widest text-white/70">
                      Abandonner
                    </Text>
                  </Pressable>
                ) : null}
              </View>
            </View>
          )}
        </View>
      </SafeAreaView>
    </Modal>
  )
}
