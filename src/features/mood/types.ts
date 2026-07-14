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

export type MoodTodayCardParams = {
  canFillToday: boolean
  todayLabel?: string
  todayMood?: PrimaryMood
}

export type MoodWeekChartParams = {
  weekDays: WeekDayCell[]
  entriesByDate: Record<string, MoodEntry>
}

export type WeeklyMoodStripParams = {
  weekDays: WeekDayCell[]
  entriesByDate: Record<string, MoodEntry>
}

export type MoodFlowProgressParams = {
  step: 1 | 2
}

export type MoodIconParams = {
  mood: PrimaryMood
  /** Diameter of the tinted circle in px. */
  size?: number
}
