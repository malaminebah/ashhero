import { useTrackerStore } from '../store'
import { getMoneySaved, getDayCount } from '../utils/calculations'
import { useNow } from './useNow'
export const useStats = () => {
  useNow()
  const quitDate = useTrackerStore((state) => state.quitDate)
  const smokingType = useTrackerStore((state) => state.smokingType)
  const quantityPerDay = useTrackerStore((state) => state.quantityPerDay)
  const pricePerPack = useTrackerStore((state) => state.pricePerUnit)


if(!smokingType || !quantityPerDay || !pricePerPack){
  return {
    moneySaved: 0,
    cigarettesAvoided: 0,
    dayCount: getDayCount(quitDate),
    lifeRegained: 0

  }
}
  const cigarettesAvoided =  quantityPerDay * getDayCount(quitDate)
  return {
    moneySaved: getMoneySaved(smokingType, quitDate, quantityPerDay, pricePerPack),
    cigarettesAvoided,
    dayCount: getDayCount(quitDate),
    lifeRegained: cigarettesAvoided * 11


  }
}
