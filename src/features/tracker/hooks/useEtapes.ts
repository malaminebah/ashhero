import { useTrackerStore } from '../store'
import { etapes } from '../utils/calculations'
import { Etape } from '../types'
import { useNow } from './useNow'
import { useEffect, useMemo, useRef } from 'react'
import { addEtape, getCurrentUid, saveProfile } from '@/src/services'
import { trackerProfileFromStore } from '../types'


type EtapesResult = {
  currentEtape: Etape | null
  nextEtape: Etape | null
  percentageComplete: number
  unlockedEtapes: string[]
}

export const useEtapes = (): EtapesResult => {
  useNow()
  const quitDate = useTrackerStore((state) => state.quitDate)
  const unlockedEtapes = useTrackerStore((state) => state.unlockedEtapes)
  const unlockEtape = useTrackerStore((state) => state.unlockEtape)

  const hoursSinceQuit = quitDate
    ? Math.floor((Date.now() - quitDate.getTime()) / 3600000)
    : 0

  const reached = etapes.filter((etape: Etape) => hoursSinceQuit >= etape.hours)
  const processingRef = useRef<Set<string>>(new Set())

  useEffect(() => {
    const uid = getCurrentUid()
    console.log('[useEtapes] useEffect', {
      uid: uid ?? 'null',
      reachedCount: reached.length,
      reachedLabels: reached.map((e) => e.label),
      unlockedCount: unlockedEtapes.length,
      unlockedEtapes,
    })
    if (!uid) return

    let didUnlock = false
    reached.forEach((etape) => {
      if (!unlockedEtapes.includes(etape.label) && !processingRef.current.has(etape.label)) {
        processingRef.current.add(etape.label)
        unlockEtape(etape.label)
        addEtape(uid, etape.label)
        didUnlock = true
      }
    })

    if (didUnlock) {
      const profile = trackerProfileFromStore(useTrackerStore.getState())
      console.log('[useEtapes] saving profile', { didUnlock, unlockedEtapes: profile.unlockedEtapes })
      saveProfile(uid, profile).catch((err) => console.warn('[useEtapes] saveProfile error', err))
    }
  }, [reached, unlockedEtapes, unlockEtape])

  const result = useMemo(() => {
    if (!quitDate)
      return { currentEtape: null, nextEtape: null, percentageComplete: 0 , unlockedEtapes: []}

    const nextEtape = etapes.find((etape: Etape) => hoursSinceQuit < etape.hours)
    const currentEtape = reached.length > 0 ? reached[reached.length - 1] : null

    const percentageComplete =
      currentEtape && nextEtape
        ? Math.min(1, (hoursSinceQuit - currentEtape.hours) / (nextEtape.hours - currentEtape.hours))
        : 0

    return {
      currentEtape: currentEtape || null,
      nextEtape: nextEtape || null,
      percentageComplete: percentageComplete || 0,
      unlockedEtapes: unlockedEtapes, 
    }
  }, [quitDate, hoursSinceQuit, reached, unlockedEtapes])

  return result
}