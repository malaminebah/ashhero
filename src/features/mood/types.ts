export type PrimaryMood =
  | 'calm'
  | 'joy'
  | 'sadness'
  | 'anger'
  | 'fear'
  | 'disgust'

export type MoodEntry = {
  date: string
  weekId: string
  primary: PrimaryMood
  sub: string
  createdAt: string
}

export type WeekDayCell = {
  date: string
  weekdayLabel: string
  isToday: boolean
  isFuture: boolean
  isPast: boolean
}
