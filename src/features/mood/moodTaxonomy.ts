import type { PrimaryMood } from './types'

export type PrimaryMoodDef = {
  id: PrimaryMood
  label: string
  circleColor: string
}

export type SubMoodDef = {
  id: string
  label: string
}

export const PRIMARY_MOODS: PrimaryMoodDef[] = [
  { id: 'calm', label: 'Calme', circleColor: '#7dd3fc' },
  { id: 'joy', label: 'Joie', circleColor: '#fdba74' },
  { id: 'sadness', label: 'Tristesse', circleColor: '#94a3b8' },
  { id: 'anger', label: 'Colère', circleColor: '#f87171' },
  { id: 'fear', label: 'Peur', circleColor: '#c084fc' },
  { id: 'disgust', label: 'Dégoût', circleColor: '#86efac' },
]

export const SUB_MOODS: Record<PrimaryMood, SubMoodDef[]> = {
  calm: [
    { id: 'serenity', label: 'Sérénité' },
    { id: 'relief', label: 'Soulagement' },
    { id: 'focused', label: 'Concentré' },
    { id: 'neutral', label: 'Neutre' },
  ],
  joy: [
    { id: 'rejoicing', label: 'Réjouissance' },
    { id: 'gratitude', label: 'Gratitude' },
    { id: 'enthusiasm', label: 'Enthousiasme' },
    { id: 'lightness', label: 'Légèreté' },
  ],
  sadness: [
    { id: 'melancholy', label: 'Mélancolie' },
    { id: 'lonely', label: 'Solitude' },
    { id: 'disappointed', label: 'Déception' },
    { id: 'empty', label: 'Vide' },
  ],
  anger: [
    { id: 'irritated', label: 'Irrité' },
    { id: 'frustrated', label: 'Frustré' },
    { id: 'resentful', label: 'Rancœur' },
    { id: 'helpless', label: 'Impuissant' },
  ],
  fear: [
    { id: 'anxious', label: 'Anxieux' },
    { id: 'stressed', label: 'Stressé' },
    { id: 'worried', label: 'Inquiet' },
    { id: 'wary', label: 'Méfiant' },
  ],
  disgust: [
    { id: 'repulsed', label: 'Écœuré' },
    { id: 'ashamed', label: 'Honteux' },
    { id: 'rejecting', label: 'Rejet' },
    { id: 'uncomfortable', label: 'Mal à l\'aise' },
  ],
}

export function getPrimaryMood(id: PrimaryMood): PrimaryMoodDef {
  const found = PRIMARY_MOODS.find((m) => m.id === id)
  if (!found) throw new Error(`Unknown primary mood: ${id}`)
  return found
}

export function getSubMoods(primary: PrimaryMood): SubMoodDef[] {
  return SUB_MOODS[primary]
}

export function getSubMoodLabel(primary: PrimaryMood, subId: string): string {
  return getSubMoods(primary).find((s) => s.id === subId)?.label ?? subId
}
