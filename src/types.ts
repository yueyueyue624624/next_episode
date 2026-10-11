export type Focus = '工作发展' | '感情关系' | '生活状态' | '创造力' | '财富与安全感' | '自我成长'
export type CurrentState = '想做些改变' | '有点迷茫' | '需要确认' | '正在恢复' | '一切还不错'
export type TodayState = 'not_drawn' | 'card_revealed' | 'story_ready' | 'active_day' | 'evening_review_available' | 'issue_closed'
export type Feedback = 'accurate' | 'partial' | 'miss'
export type Trend = 'up' | 'flat' | 'down'

export interface TarotCard {
  number: number
  id: string
  name: string
  cnName: string
  alias: string
  core: string
  positive: string
  shadow: string
  safety: string
  accent: string
  symbol: string
}

export interface Signal { score: number; trend: Trend; text: string }
export interface Story {
  title: string
  hook: string
  opening: string
  turningPoint: string
  ending: string
  editorsNote: string
  foreshadow: string
  foreshadowType: string
  tomorrowKeyword: string
  storyLens: string
  safetyFlags: string[]
  signals: { action: Signal; relation: Signal; emotion: Signal }
  tags: string[]
}

export interface Issue {
  id: string
  localDate: string
  issueNumber: number
  card: TarotCard
  drawMethod: 'manual' | 'auto'
  selectedSlot?: number
  state: TodayState
  story: Story
  bonusOpened: boolean
  bonusCollected: boolean
  feedback?: Feedback
  createdAt: number
}

export interface Profile { nickname: string; focuses: Focus[]; currentState: CurrentState; onboardingDone: boolean }
export interface AppData { version: 2; profile: Profile; issues: Issue[]; favorites: string[] }
