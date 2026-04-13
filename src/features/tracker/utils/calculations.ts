import { SmokingType } from "../../onboarding/types"
import type { Etape } from "../types"

const oneDay = 86_400_000

/** Estimated life minutes regained per avoided cigarette (tobacco). */
export const MINUTES_LIFE_PER_CIGARETTE_AVOIDED = 11

/** Estimated life minutes regained per avoided vape equivalent (session). */
export const MINUTES_LIFE_PER_VAPE_EQUIVALENT_AVOIDED = 3.75

export function getLifeRegainedMinutes(
  smokingType: SmokingType,
  avoidedCount: number
): number {
  const perUnit =
    smokingType === "vape"
      ? MINUTES_LIFE_PER_VAPE_EQUIVALENT_AVOIDED
      : MINUTES_LIFE_PER_CIGARETTE_AVOIDED
  return avoidedCount * perUnit
}

export type VapePricingInput = {
  bottleVolumeMl: number | null
  bottlePriceEuro: number | null
  mlPerWeek: number | null
}

export function getDayCount(quitDate: Date | null): number {
  if (!quitDate) return 0
  const raw = Math.floor((Date.now() - quitDate.getTime()) / oneDay)
  return Math.max(0, raw)
}

/**
 * Tobacco: quantityPerDay = cigarettes/day, pricePerPack = pack price (€).
 * Vape: if vapePricing is complete → € = (days/7) × (ml/week × bottlePrice/bottleVolume).
 * Else legacy fallback: days × sessions/day × pricePerPack (older onboarding).
 */
export function getMoneySaved(
  smokingType: SmokingType,
  quitDate: Date | null,
  quantityPerDay: number,
  pricePerPack: number | null,
  vapePricing: VapePricingInput | null
): number {
  if (!quitDate) return 0
  const days = (Date.now() - quitDate.getTime()) / oneDay

  if (smokingType === "vape") {
    const vol = vapePricing?.bottleVolumeMl
    const pr = vapePricing?.bottlePriceEuro
    const mlW = vapePricing?.mlPerWeek
    if (
      vol != null &&
      pr != null &&
      mlW != null &&
      vol > 0 &&
      pr >= 0 &&
      mlW >= 0
    ) {
      const pricePerMl = pr / vol
      const weeklyEuro = mlW * pricePerMl
      return Math.round((days / 7) * weeklyEuro)
    }
    if (pricePerPack != null && pricePerPack >= 0 && quantityPerDay >= 0) {
      return Math.round(days * quantityPerDay * pricePerPack)
    }
    return 0
  }

  if (pricePerPack == null || pricePerPack < 0) return 0
  const moneySaved = ((days * quantityPerDay) / 20) * pricePerPack
  return Math.round(moneySaved)
}

export const etapes: Etape[] = [
  {
    hours: 1,
    label: "1 hours",
    title: "1 hour of no smoking",
    xp: 50,
  },
  {
    hours: 24,
    label: "24hours",
    title: "24 hours of no smoking heart rate normalized",
    xp: 200,
  },
  {
    hours: 72,
    label: "72 hours",
    title: "72 hours of no smoking heart rate normalized & nicotine free",
    xp: 300,
  },
  {
    hours: 168,
    label: "1 week",
    title: "1 week small warriors & nicotine free",
    xp: 400,
  },
  {
    hours: 336,
    label: "15 days",
    title: "2 weeks better inhalation better lung capacity",
    xp: 600,
  },
  {
    hours: 672,
    label: "30 days",
    title: "1 month better inhalation you are a champ",
    xp: 1000,
  },
  {
    hours: 2160,
    label: "90 days",
    title: "3 months of no smoking you are a warrior",
    xp: 3000,
  },
]
