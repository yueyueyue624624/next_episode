import Taro from '@tarojs/taro'
import type { AppData, Issue, Profile } from '../types'
import { CARDS } from '../data/cards'
import { createStory } from './storyEngine'

const KEY = 'next_episode_v1'
export const defaultProfile: Profile = { nickname: '未命名主角', focuses: [], currentState: '想做些改变', onboardingDone: false }
const initial: AppData = { version: 2, profile: defaultProfile, issues: [], favorites: [] }
type StoredData = Omit<AppData, 'version'> & { version: 1 | 2 }

export const localDate = () => {
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`
}

export function loadData(): AppData {
  try {
    const value = Taro.getStorageSync(KEY) as StoredData | undefined
    if (value && (value.version === 1 || value.version === 2)) {
      const hydratedIssues = value.issues.map(issue => ({
        ...issue,
        card: CARDS.find(card => card.id === issue.card.id) || issue.card
      }))
      const issues = hydratedIssues.map((issue, index) => issue.story.storyLens ? issue : ({
        ...issue,
        story: createStory(issue.card, value.profile, {
          date: issue.localDate,
          history: hydratedIssues.slice(index + 1),
          variant: index
        })
      }))
      return { ...value, version: 2, issues }
    }
  } catch { /* local fallback below */ }
  return initial
}

export function saveData(data: AppData) { Taro.setStorageSync(KEY, data) }

function hash(text: string) {
  let h = 2166136261
  for (let i=0;i<text.length;i++) h = Math.imul(h ^ text.charCodeAt(i), 16777619)
  return h >>> 0
}

export function dailySpread(data: AppData, date = localDate()) {
  const recentCardIds = new Set(data.issues.slice(0, 7).map(issue => issue.card.id))
  const score = (card: typeof CARDS[number]) => hash(`${date}:${data.profile.nickname}:${card.id}:spread`)
  const freshCards = CARDS.filter(card => !recentCardIds.has(card.id)).sort((left, right) => score(left) - score(right))
  const recentCards = CARDS.filter(card => recentCardIds.has(card.id)).sort((left, right) => score(left) - score(right))
  return [...freshCards, ...recentCards].slice(0, 3)
}

export function drawToday(data: AppData, method: 'manual'|'auto', slot = 0): AppData {
  const date = localDate()
  if (data.issues.some(i => i.localDate === date)) return data
  const seed = hash(`${date}:${data.profile.nickname}:${method}:${slot}`)
  const spread = dailySpread(data, date)
  const selectedSlot = method === 'manual' ? Math.max(0, Math.min(slot, 2)) : seed % spread.length
  const card = spread[selectedSlot]
  const issue: Issue = {
    id: `issue_${date}`, localDate: date, issueNumber: 27 + data.issues.length,
    card, drawMethod: method, selectedSlot,
    state: 'card_revealed', story: createStory(card, data.profile, { date, history: data.issues, variant: data.issues.length }),
    bonusOpened: false, bonusCollected: false, createdAt: Date.now()
  }
  return { ...data, issues: [issue, ...data.issues] }
}

export function demoArchive(data: AppData): AppData {
  if (data.issues.length > 1) return data
  const samples = [CARDS[9], CARDS[0]].map((card, index): Issue => {
    const date=new Date()
    date.setDate(date.getDate()-(index+1))
    const sampleDate=[date.getFullYear(),String(date.getMonth()+1).padStart(2,'0'),String(date.getDate()).padStart(2,'0')].join('-')
    return {
    id:'demo_'+index, localDate:sampleDate, issueNumber:26-index, card,
    drawMethod:'manual', selectedSlot:index+1, state:'issue_closed',
    story:createStory(card,data.profile,{date:sampleDate,history:data.issues,variant:index+1}), bonusOpened:true, bonusCollected:index===0,
    feedback:index===0?'partial':undefined, createdAt:Date.now()-(index+1)*86400000
  }})
  return { ...data, issues:[...data.issues,...samples] }
}
