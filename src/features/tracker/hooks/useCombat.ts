import { useCallback } from 'react'
import { useTrackerStore } from '../store'
import { addCombat, getCurrentUid, saveProfile } from '@/src/services'
import { COMBAT_XP_BY_ACTION } from '../combatXpTable'
import { trackerProfileFromStore, type CombatAction } from '../types'

const persistProfile = (): Promise<void> => {
  const uid = getCurrentUid()
  if (!uid) return Promise.resolve()
  return saveProfile(uid, trackerProfileFromStore(useTrackerStore.getState()))
}

export const useCombat = () => {
  const winCombat = useTrackerStore((s) => s.winCombat)
  const loseCombat = useTrackerStore((s) => s.loseCombat)
  const bestStreak = useTrackerStore((s) => s.bestStreak)

  const streak = bestStreak ?? 0
  const canUseSpecial = streak >= 7

  const handleVictory = useCallback(
    async (action: CombatAction) => {
      const xpGained = COMBAT_XP_BY_ACTION[action]
      winCombat(action, xpGained)
      const uid = getCurrentUid()
      if (uid) {
        await addCombat(uid, { action, xpGained, result: 'victory' })
        await persistProfile()
      }
    },
    [winCombat]
  )

  const handleDefeat = useCallback(async () => {
    loseCombat()
    const uid = getCurrentUid()
    if (uid) {
      await addCombat(uid, {
        action: 'distract',
        xpGained: 0,
        result: 'defeat',
      })
      await persistProfile()
    }
  }, [loseCombat])

  return { handleVictory, handleDefeat, canUseSpecial, XP_TABLE: COMBAT_XP_BY_ACTION }
}
