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
