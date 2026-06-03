import { useCallback, useEffect, useRef, useState } from 'react'
import * as Haptics from 'expo-haptics'
import { useCombat } from '@/src/features/tracker/hooks/useCombat'
import type { CombatAction } from '@/src/features/tracker/types'
import {
  ATTACK_FX_FRAME_COUNT,
  ATTACK_FX_FRAME_MS,
  type AttackEffectKey,
} from '../attackFxSheet'
import type { BattleMessage, CombatPhase, FloatDamagePayload } from '../types'

export type { CombatPhase } from '../types'
import {
  COMBAT_BOSS_MAX_HP,
  COMBAT_PLAYER_MAX_HP,
  DAMAGE_TO_BOSS,
  COMBAT_BREATHE_STATUS,
  combatActionLabel,
  randomBossAttackName,
  rollBossRiposteDamage,
} from '../constants'

const INTRO_DURATION_MS = 1500

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

  const [phase, setPhase] = useState<CombatPhase>('entering')
  const [playerHp, setPlayerHp] = useState(COMBAT_PLAYER_MAX_HP)
  const [bossHp, setBossHp] = useState(COMBAT_BOSS_MAX_HP)
  const [battleMessage, setBattleMessage] = useState<BattleMessage>({ kind: 'idle' })
  const [bossShakeKey, setBossShakeKey] = useState(0)
  const [playerShakeKey, setPlayerShakeKey] = useState(0)
  const [victoryAction, setVictoryAction] = useState<CombatAction | null>(null)
  const [defeatSource, setDefeatSource] = useState<'riposte' | 'abandon' | null>(null)
  const [currentAttackEffect, setCurrentAttackEffect] = useState<AttackEffectKey | null>(
    null
  )
  const [turnCount, setTurnCount] = useState(1)

  const endedRef = useRef(false)
  const inputLockRef = useRef(false)
  const enemyTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const enemyWindupTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const attackFxTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const introTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const floatTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const [floatDamage, setFloatDamage] = useState<FloatDamagePayload | null>(null)

  const clearEnemyTimer = useCallback(() => {
    if (enemyTimerRef.current) {
      clearTimeout(enemyTimerRef.current)
      enemyTimerRef.current = null
    }
    if (enemyWindupTimerRef.current) {
      clearTimeout(enemyWindupTimerRef.current)
      enemyWindupTimerRef.current = null
    }
    if (attackFxTimerRef.current) {
      clearTimeout(attackFxTimerRef.current)
      attackFxTimerRef.current = null
    }
    if (introTimerRef.current) {
      clearTimeout(introTimerRef.current)
      introTimerRef.current = null
    }
    if (floatTimerRef.current) {
      clearTimeout(floatTimerRef.current)
      floatTimerRef.current = null
    }
  }, [])

  const showFloatDamage = useCallback((target: 'boss' | 'player', amount: number) => {
    if (floatTimerRef.current) {
      clearTimeout(floatTimerRef.current)
      floatTimerRef.current = null
    }
    setFloatDamage({ target, amount, key: Date.now() })
    floatTimerRef.current = setTimeout(() => {
      floatTimerRef.current = null
      setFloatDamage(null)
    }, 1100)
  }, [])

  const reset = useCallback(() => {
    clearEnemyTimer()
    endedRef.current = false
    inputLockRef.current = false
    setPhase('entering')
    setPlayerHp(COMBAT_PLAYER_MAX_HP)
    setBossHp(COMBAT_BOSS_MAX_HP)
    setBattleMessage({ kind: 'status', text: "L'Envie apparaît !" })
    setBossShakeKey(0)
    setPlayerShakeKey(0)
    setVictoryAction(null)
    setDefeatSource(null)
    setCurrentAttackEffect(null)
    setFloatDamage(null)
    setTurnCount(1)
    introTimerRef.current = setTimeout(() => {
      introTimerRef.current = null
      setPhase('player_turn')
      setBattleMessage({ kind: 'idle' })
    }, INTRO_DURATION_MS)
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

  const attackFxDurationMs = ATTACK_FX_FRAME_COUNT * ATTACK_FX_FRAME_MS

  const showAttackEffect = useCallback(
    (effect: AttackEffectKey) => {
      if (attackFxTimerRef.current) {
        clearTimeout(attackFxTimerRef.current)
        attackFxTimerRef.current = null
      }
      setCurrentAttackEffect(effect)
      attackFxTimerRef.current = setTimeout(() => {
        attackFxTimerRef.current = null
        setCurrentAttackEffect(null)
      }, attackFxDurationMs)
    },
    [attackFxDurationMs]
  )

  const runEnemyTurn = useCallback(() => {
    if (endedRef.current) return
    const dmg = rollBossRiposteDamage()
    const name = randomBossAttackName()
    showAttackEffect('boss')
    void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium).catch(() => {})
    setBattleMessage({
      kind: 'boss_hit',
      attackName: name,
      damage: dmg,
    })
    setPlayerShakeKey((k) => k + 1)
    showFloatDamage('player', dmg)

    setPlayerHp((prev) => {
      const next = Math.max(0, prev - dmg)
      if (next === 0) {
        queueMicrotask(() => void finalizeDefeat('riposte'))
      } else {
        queueMicrotask(() => {
          inputLockRef.current = false
          setPhase('player_turn')
          setTurnCount((c) => c + 1)
        })
      }
      return next
    })
  }, [finalizeDefeat, showAttackEffect, showFloatDamage])

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
      showAttackEffect(action)
      void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {})
      setBattleMessage({
        kind: 'player_hit',
        actionLabel: combatActionLabel(action),
        damage,
      })
      setBossShakeKey((k) => k + 1)
      showFloatDamage('boss', damage)
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
    [finalizeVictory, scheduleEnemyTurn, showAttackEffect, showFloatDamage]
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
      text: COMBAT_BREATHE_STATUS,
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
    if (phase === 'entering' || phase === 'victory' || phase === 'defeat') return
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
    currentAttackEffect,
    floatDamage,
    turnCount,
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
