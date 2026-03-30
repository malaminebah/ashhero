import { useCallback, useEffect, useRef, useState } from 'react'
import { Modal, View, Text, Pressable, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useCombat } from '@/src/features/tracker/hooks/useCombat'
import { useTrackerStore } from '@/src/features/tracker/store'
import { getDayCount } from '@/src/features/tracker/utils/calculations'
import type { CombatAction } from '@/src/features/tracker/types'
import { ActionButton } from './ActionButton'
import { BreatheTimer } from './BreatheTimer'
import { CombatMonster } from './CombatMonster'
import { VictoryBanner } from './VictoryBanner'

const MONSTER_HP_MAX = 100

type Phase = 'actions' | 'breathe' | 'victory'

type Props = {
  visible: boolean
  onClose: () => void
}

export const CombatModal = ({ visible, onClose }: Props) => {
  const { handleVictory, handleDefeat, canUseSpecial, XP_TABLE } = useCombat()
  const quitDate = useTrackerStore((s) => s.quitDate)
  const streakDays = getDayCount(quitDate)

  const [phase, setPhase] = useState<Phase>('actions')
  const [monsterHp, setMonsterHp] = useState(MONSTER_HP_MAX)
  const [bannerXp, setBannerXp] = useState(0)
  const victoryCloseTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const monsterDeadRef = useRef(false)

  useEffect(() => {
    if (visible) {
      monsterDeadRef.current = false
      setPhase('actions')
      setMonsterHp(MONSTER_HP_MAX)
      setBannerXp(0)
    } else if (victoryCloseTimerRef.current) {
      clearTimeout(victoryCloseTimerRef.current)
      victoryCloseTimerRef.current = null
    }
  }, [visible])

  const closeWithReset = useCallback(() => {
    setPhase('actions')
    setMonsterHp(MONSTER_HP_MAX)
    setBannerXp(0)
    onClose()
  }, [onClose])

  const runVictory = useCallback(
    async (action: CombatAction) => {
      const xp = XP_TABLE[action]
      await handleVictory(action)
      setBannerXp(xp)
      setPhase('victory')
      if (victoryCloseTimerRef.current) clearTimeout(victoryCloseTimerRef.current)
      victoryCloseTimerRef.current = setTimeout(() => {
        victoryCloseTimerRef.current = null
        closeWithReset()
      }, 2000)
    },
    [XP_TABLE, handleVictory, closeWithReset]
  )

  const applyHit = useCallback(
    (action: CombatAction, opts?: { resumeActionsIfAlive?: boolean }) => {
      if (monsterDeadRef.current) return
      const dmg = XP_TABLE[action]
      setMonsterHp((prev) => {
        const next = Math.max(0, prev - dmg)
        if (next === 0 && !monsterDeadRef.current) {
          monsterDeadRef.current = true
          queueMicrotask(() => void runVictory(action))
        } else if (opts?.resumeActionsIfAlive && next > 0) {
          queueMicrotask(() => setPhase('actions'))
        }
        return next
      })
    },
    [XP_TABLE, runVictory]
  )

  const onAbandon = async () => {
    await handleDefeat()
    closeWithReset()
  }

  return (
    <Modal
      visible={visible}
      animationType="fade"
      presentationStyle="fullScreen"
      onRequestClose={closeWithReset}
    >
      <SafeAreaView className="flex-1 bg-brand-bg">
        <ScrollView
          className="flex-1 px-5 pb-8 pt-4"
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <Text className="mb-4 text-center font-mono text-lg uppercase tracking-[0.2rem] text-white">
            Résiste à l&apos;envie
          </Text>

          {phase === 'victory' ? (
            <VictoryBanner xpGained={bannerXp} streakDays={streakDays} />
          ) : (
            <>
              <CombatMonster hp={monsterHp} maxHp={MONSTER_HP_MAX} />
              {phase === 'breathe' ? (
                <BreatheTimer
                  onComplete={() => applyHit('breathe', { resumeActionsIfAlive: true })}
                />
              ) : (
                <View>
                  <ActionButton
                    label="Respirer"
                    onPress={() => setPhase('breathe')}
                  />
                  <ActionButton
                    label={"Boire de l'eau"}
                    onPress={() => applyHit('water')}
                  />
                  <ActionButton
                    label="Se distraire"
                    onPress={() => applyHit('distract')}
                  />
                  <ActionButton
                    label="Attaque spéciale"
                    onPress={() => applyHit('special')}
                    disabled={!canUseSpecial}
                  />
                </View>
              )}
            </>
          )}

          {phase === 'actions' && (
            <Pressable
              onPress={() => void onAbandon()}
              className="mt-8 w-full items-center rounded-xl border border-white/20 py-4 active:opacity-80"
            >
              <Text className="font-mono text-xs uppercase tracking-widest text-white/70">
                Abandonner
              </Text>
            </Pressable>
          )}
        </ScrollView>
      </SafeAreaView>
    </Modal>
  )
}
