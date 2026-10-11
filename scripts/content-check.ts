import { CARDS } from '../src/data/cards.ts'
import { createStory } from '../src/services/storyEngine.ts'
import type { Focus, Issue, Profile } from '../src/types.ts'

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) throw new Error(message)
}

assert(CARDS.length === 22, `Expected 22 Major Arcana cards, received ${CARDS.length}`)
assert(new Set(CARDS.map(card => card.id)).size === 22, 'Card ids must be unique')
assert(new Set(CARDS.map(card => card.number)).size === 22, 'Card numbers must be unique')

for (const card of CARDS) {
  assert(card.number >= 0 && card.number <= 21, `${card.name}: invalid number`)
  for (const field of ['name', 'cnName', 'alias', 'core', 'positive', 'shadow', 'safety', 'accent', 'symbol'] as const) {
    assert(card[field].trim().length > 0, `${card.name}: missing ${field}`)
  }
}

const profile: Profile = {
  nickname: '内容检查员',
  focuses: ['工作发展', '自我成长'],
  currentState: '有点迷茫',
  onboardingDone: true
}
const history: Issue[] = []

for (let day = 0; day < 14; day++) {
  const date = `2026-10-${String(day + 1).padStart(2, '0')}`
  const card = CARDS[day]
  const story = createStory(card, profile, { date, history, variant: day })
  assert(story.storyLens !== history[0]?.story.storyLens, `Story lens repeated on ${date}`)
  assert(!history.slice(0, 3).some(issue => issue.story.foreshadowType === story.foreshadowType), `Foreshadow type repeated within three days on ${date}`)
  assert(story.safetyFlags.length === 0, `${date}: unexpected safety flag`)
  history.unshift({
    id: `check-${date}`, localDate: date, issueNumber: day + 1, card, story,
    drawMethod: 'auto', selectedSlot: day % 3, state: 'issue_closed',
    bonusOpened: true, bonusCollected: false, createdAt: Date.now()
  })
}

const focuses: Focus[] = ['工作发展', '感情关系', '生活状态', '创造力', '财富与安全感', '自我成长']
const hooks = focuses.map(focus => createStory(CARDS[17], { ...profile, focuses: [focus] }, { date: '2026-11-01' }).hook)
assert(new Set(hooks).size === focuses.length, 'Focus personalization must produce distinct hooks')

console.log(`Content check passed: ${CARDS.length} cards, 14-day de-duplication, ${focuses.length} focus variants.`)

