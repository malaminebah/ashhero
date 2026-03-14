import { SmokingType } from "../../onboarding/types"
import type { Etape } from "../types"

const oneDay = 86_400_000
export function getDayCount(quitDate: Date | null): number {
  if (!quitDate) return 0
  return Math.floor((Date.now() - quitDate.getTime()) / oneDay)
}

export function getMoneySaved(
  smokingType: SmokingType,
  quitDate: Date | null,
  quantityPerDay: number,
  pricePerUnit: number
): number {
  if (!quitDate) return 0
  const days = (Date.now() - quitDate.getTime()) / oneDay
  if (smokingType === 'vape') {
    return Math.round(days * quantityPerDay * pricePerUnit)
  }
  const moneySaved =((days * quantityPerDay) / 20) * pricePerUnit
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