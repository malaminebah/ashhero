import { addCombat, getCurrentUid, saveProfile } from '@/src/services'
import { useCallback } from 'react'
import { COMBAT_XP_BY_ACTION } from '../combatXpTable'
import { useTrackerStore } from '../store'
import { trackerProfileFromStore, type CombatAction } from '../types'
import { levelFromXp } from '../utils/levelProgress'

const COMBAT_PERSIST_ERROR =
  'Impossible d’enregistrer le combat. Vérifie ton réseau et réessaie.'

function profileAfterVictory(xpGained: number) {
  const state = useTrackerStore.getState()
  const xp = state.xp + xpGained
  return trackerProfileFromStore({
    ...state,
    xp,
    level: levelFromXp(xp),
    combatsWon: state.combatsWon + 1,
  })
}

function profileAfterDefeat() {
  const state = useTrackerStore.getState()
  return trackerProfileFromStore({
    ...state,
    combatsLost: state.combatsLost + 1,
  })
}

export const useCombat = () => {
  const winCombat = useTrackerStore((s) => s.winCombat)
  const loseCombat = useTrackerStore((s) => s.loseCombat)

  const handleVictory = useCallback(
    async (action: CombatAction, xpGained: number) => {
      const uid = getCurrentUid()
      if (!uid) {
        winCombat(action, xpGained)
        return
      }

      const nextProfile = profileAfterVictory(xpGained)
      try {
        await saveProfile(uid, nextProfile)
        await addCombat(uid, { action, xpGained, result: 'victory' })
      } catch {
        throw new Error(COMBAT_PERSIST_ERROR)
      }
      winCombat(action, xpGained)
    },
    [winCombat]
  )

  const handleDefeat = useCallback(async () => {
    const uid = getCurrentUid()
    if (!uid) {
      loseCombat()
      return
    }

    const nextProfile = profileAfterDefeat()
    try {
      await saveProfile(uid, nextProfile)
      await addCombat(uid, {
        action: 'distract',
        xpGained: 0,
        result: 'defeat',
      })
    } catch {
      throw new Error(COMBAT_PERSIST_ERROR)
    }
    loseCombat()
  }, [loseCombat])

  return { handleVictory, handleDefeat, XP_TABLE: COMBAT_XP_BY_ACTION }
}
