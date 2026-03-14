import { useTrackerStore } from '../store'
import { getDayCount } from '../utils/calculations'
import { useNow } from './useNow'

export const useDayCount = () => {
    useNow()
  const quitDate = useTrackerStore((state) => state.quitDate)


  return getDayCount(quitDate)
}
