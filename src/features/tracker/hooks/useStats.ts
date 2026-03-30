import { useTrackerStore } from '../store'
import {
  getMoneySaved,
  getDayCount,
  getLifeRegainedMinutes,
  type VapePricingInput,
} from '../utils/calculations'
import { useNow } from './useNow'

const emptyStats = {
  moneySaved: 0,
  cigarettesAvoided: 0,
  dayCount: 0,
  lifeRegained: 0,
  lifeRegainedCardLabel: 'Minutes de vie regagnées' as const,
  equivalentAvoidedLabel: '—' as const,
}

export const useStats = () => {
  useNow()
  const quitDate = useTrackerStore((state) => state.quitDate)
  const smokingType = useTrackerStore((state) => state.smokingType)
  const quantityPerDay = useTrackerStore((state) => state.quantityPerDay)
  const pricePerPack = useTrackerStore((state) => state.pricePerUnit)
  const vapeBottleVolumeMl = useTrackerStore((state) => state.vapeBottleVolumeMl)
  const vapeBottlePriceEuro = useTrackerStore((state) => state.vapeBottlePriceEuro)
  const vapeMlPerWeek = useTrackerStore((state) => state.vapeMlPerWeek)

  const dayCount = getDayCount(quitDate)

  if (!smokingType || quantityPerDay == null || quantityPerDay <= 0) {
    return { ...emptyStats, dayCount }
  }

  const cigarettesAvoided = quantityPerDay * dayCount
  const lifeRegained = getLifeRegainedMinutes(smokingType, cigarettesAvoided)
  const lifeRegainedCardLabel =
    smokingType === 'vape'
      ? 'Min. vie (3,75 min / pause évitée)'
      : 'Min. vie (11 min / cigarette évitée)'

  const vapePricing: VapePricingInput = {
    bottleVolumeMl: vapeBottleVolumeMl,
    bottlePriceEuro: vapeBottlePriceEuro,
    mlPerWeek: vapeMlPerWeek,
  }

  if (smokingType === 'cigarette') {
    if (pricePerPack == null || pricePerPack < 0) {
      return {
        moneySaved: 0,
        cigarettesAvoided,
        dayCount,
        lifeRegained,
        lifeRegainedCardLabel,
        equivalentAvoidedLabel: 'Cigarettes évitées' as const,
      }
    }
    return {
      moneySaved: getMoneySaved(
        'cigarette',
        quitDate,
        quantityPerDay,
        pricePerPack,
        null
      ),
      cigarettesAvoided,
      dayCount,
      lifeRegained,
      lifeRegainedCardLabel,
      equivalentAvoidedLabel: 'Cigarettes évitées' as const,
    }
  }

  return {
    moneySaved: getMoneySaved(
      'vape',
      quitDate,
      quantityPerDay,
      pricePerPack,
      vapePricing
    ),
    cigarettesAvoided,
    dayCount,
    lifeRegained,
    lifeRegainedCardLabel,
    equivalentAvoidedLabel: 'Équiv. cigarettes (pauses)' as const,
  }
}
