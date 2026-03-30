import { create } from 'zustand';
import { OnboardingData} from './types';

const initialState: OnboardingData = {
  smokingType: null,
  quantityPerDay: null,
  isFirstTime: null,
  pricePerUnit: null,
  vapeBottleVolumeMl: null,
  vapeBottlePriceEuro: null,
  vapeMlPerWeek: null,
  quitDate: null,
}

type OnboardingStore = OnboardingData&{
    setField: (field: keyof OnboardingData, value: OnboardingData[keyof OnboardingData]) => void
    reset: () => void
}

export const useOnboardingStore = create<OnboardingStore>()((set) =>({
    ...initialState,
    setField: (field, value) => set({[field]: value}),
    reset: () => set(initialState)
}))