import { useCallback, useEffect, useRef, useState } from 'react'
import { useCombat } from '@/src/features/tracker/hooks/useCombat'
import type { CombatAction } from '@/src/features/tracker/types'
import type { BattleMessage } from '../battleMessage'
import {
  COMBAT_BOSS_MAX_HP,
  COMBAT_PLAYER_MAX_HP,
  DAMAGE_TO_BOSS,
  combatActionLabel,
  randomBossAttackName,
  rollBossRiposteDamage,
} from '../constants'

export type CombatPhase =
  | 'player_turn'
  | 'resolving_instant'
  | 'breathe_pending'
  | 'enemy_turn'
  | 'victory'
  | 'defeat'

/** Wait after your hit (message + boss shake) before switching to the enemy phase. */
const PAUSE_AFTER_PLAYER_HIT_MS = 750
/** Delay while “enemy turn” is shown before the boss attack resolves. */
const ENEMY_ATTACK_DELAY_MS = 1100

type Options = {
  /** When true, resets battle state (e.g. modal opened). */
  enabled: boolean
}

export function useTurnCombat({ enabled }: Options) {
  const { handleVictory, handleDefeat, canUseSpecial } = useCombat()

  const [phase, setPhase] = useState<CombatPhase>('player_turn')
  const [playerHp, setPlayerHp] = useState(COMBAT_PLAYER_MAX_HP)
  const [bossHp, setBossHp] = useState(COMBAT_BOSS_MAX_HP)
  const [battleMessage, setBattleMessage] = useState<BattleMessage>({ kind: 'idle' })
  const [bossShakeKey, setBossShakeKey] = useState(0)
  const [playerShakeKey, setPlayerShakeKey] = useState(0)
  const [victoryAction, setVictoryAction] = useState<CombatAction | null>(null)
  const [defeatSource, setDefeatSource] = useState<'riposte' | 'abandon' | null>(null)

  const endedRef = useRef(false)
  const inputLockRef = useRef(false)
  const enemyTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const enemyWindupTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const clearEnemyTimer = useCallback(() => {
    if (enemyTimerRef.current) {
      clearTimeout(enemyTimerRef.current)
      enemyTimerRef.current = null
    }
    if (enemyWindupTimerRef.current) {
      clearTimeout(enemyWindupTimerRef.current)
      enemyWindupTimerRef.current = null
    }
  }, [])

  const reset = useCallback(() => {
    clearEnemyTimer()
    endedRef.current = false
    inputLockRef.current = false
    setPhase('player_turn')
    setPlayerHp(COMBAT_PLAYER_MAX_HP)
    setBossHp(COMBAT_BOSS_MAX_HP)
    setBattleMessage({ kind: 'idle' })
    setBossShakeKey(0)
    setPlayerShakeKey(0)
    setVictoryAction(null)
    setDefeatSource(null)
  }, [clearEnemyTimer])

  useEffect(() => {
    if (enabled) reset()
  }, [enabled, reset])

  useEffect(() => {
    return () => clearEnemyTimer()
  }, [clearEnemyTimer])

  const finalizeVictory = useCallback(
    async (action: CombatAction) => {
      if (endedRef.current) return
      endedRef.current = true
      inputLockRef.current = true
      await handleVictory(action)
      setVictoryAction(action)
      setPhase('victory')
    },
    [handleVictory]
  )

  const finalizeDefeat = useCallback(
    async (source: 'riposte' | 'abandon') => {
      if (endedRef.current) return
      endedRef.current = true
      inputLockRef.current = true
      await handleDefeat()
      setDefeatSource(source)
      setPhase('defeat')
    },
    [handleDefeat]
  )

  const runEnemyTurn = useCallback(() => {
    if (endedRef.current) return
    const dmg = rollBossRiposteDamage()
    const name = randomBossAttackName()
    setBattleMessage({
      kind: 'boss_hit',
      attackName: name,
      damage: dmg,
    })
    setPlayerShakeKey((k) => k + 1)

    setPlayerHp((prev) => {
      const next = Math.max(0, prev - dmg)
      if (next === 0) {
        queueMicrotask(() => void finalizeDefeat('riposte'))
      } else {
        queueMicrotask(() => {
          inputLockRef.current = false
          setPhase('player_turn')
        })
      }
      return next
    })
  }, [finalizeDefeat])

  const scheduleEnemyTurn = useCallback(() => {
    clearEnemyTimer()
    enemyWindupTimerRef.current = setTimeout(() => {
      enemyWindupTimerRef.current = null
      setPhase('enemy_turn')
      enemyTimerRef.current = setTimeout(() => {
        enemyTimerRef.current = null
        runEnemyTurn()
      }, ENEMY_ATTACK_DELAY_MS)
    }, PAUSE_AFTER_PLAYER_HIT_MS)
  }, [clearEnemyTimer, runEnemyTurn])

  const applyDamageToBoss = useCallback(
    (action: CombatAction, damage: number) => {
      setBattleMessage({
        kind: 'player_hit',
        actionLabel: combatActionLabel(action),
        damage,
      })
      setBossShakeKey((k) => k + 1)
      setBossHp((prev) => {
        const next = Math.max(0, prev - damage)
        if (next === 0) {
          queueMicrotask(() => void finalizeVictory(action))
        } else {
          queueMicrotask(() => scheduleEnemyTurn())
        }
        return next
      })
    },
    [finalizeVictory, scheduleEnemyTurn]
  )

  const chooseInstantAction = useCallback(
    (action: 'water' | 'distract' | 'special') => {
      if (phase !== 'player_turn' || endedRef.current || inputLockRef.current) return
      inputLockRef.current = true
      setPhase('resolving_instant')
      const dmg = DAMAGE_TO_BOSS[action]
      applyDamageToBoss(action, dmg)
    },
    [phase, applyDamageToBoss]
  )

  const chooseBreathe = useCallback(() => {
    if (phase !== 'player_turn' || endedRef.current || inputLockRef.current) return
    inputLockRef.current = true
    setBattleMessage({
      kind: 'status',
      text: 'Stay with it: breathe until the timer ends.',
    })
    setPhase('breathe_pending')
  }, [phase])

  const onBreatheComplete = useCallback(() => {
    if (phase !== 'breathe_pending' || endedRef.current) return
    setPhase('resolving_instant')
    const dmg = DAMAGE_TO_BOSS.breathe
    applyDamageToBoss('breathe', dmg)
  }, [phase, applyDamageToBoss])

  const abandon = useCallback(async () => {
    if (endedRef.current) return
    if (phase === 'victory' || phase === 'defeat') return
    clearEnemyTimer()
    await finalizeDefeat('abandon')
  }, [phase, clearEnemyTimer, finalizeDefeat])

  return {
    phase,
    playerHp,
    playerMaxHp: COMBAT_PLAYER_MAX_HP,
    bossHp,
    bossMaxHp: COMBAT_BOSS_MAX_HP,
    battleMessage,
    bossShakeKey,
    playerShakeKey,
    victoryAction,
    defeatSource,
    canUseSpecial,
    showActionButtons: phase === 'player_turn',
    showBreatheTimer: phase === 'breathe_pending',
    showAbandon: phase === 'player_turn' || phase === 'breathe_pending',
    chooseBreathe,
    onBreatheComplete,
    chooseInstantAction,
    abandon,
    reset,
  }
}
