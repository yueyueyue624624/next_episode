import type { Focus, Issue, Profile, Story, TarotCard } from '../types'

export interface StoryContext {
  date?: string
  history?: Issue[]
  variant?: number
}

const focusScenes: Record<Focus, string[]> = {
  工作发展: ['一条还没发出的消息', '一次临时调整', '被拖延的小决定', '会议里没有被接住的那句话'],
  感情关系: ['一句回复的语气', '一次没有说完的对话', '突然安静下来的片刻', '你本来想追问却停住的问题'],
  生活状态: ['一个习惯性的安排', '一段难得的独处时间', '今天忽然想取消的计划', '身体先于脑子发出的疲惫信号'],
  创造力: ['一个还不成形的念头', '被删掉又写回来的句子', '一次不够完美的新尝试', '你忍不住反复修改的细节'],
  财富与安全感: ['一笔计划内的花费', '一个长期选择', '你对“够不够”的判断', '一项需要重新排序的支出'],
  自我成长: ['一个过去默认接受的答案', '第一次认真听见的不同意见', '你不再想配合的旧习惯', '一个正在松动的自我评价']
}

const stateAngles: Record<Profile['currentState'], string[]> = {
  想做些改变: ['先分清你想离开什么，再决定要去哪里', '改变可以先从一个可撤回的小动作开始'],
  有点迷茫: ['现在缺的也许不是答案，而是再多一个事实', '看不清时，先把猜测和已经发生的事分开'],
  需要确认: ['真正值得确认的是边界，不是别人的即时反应', '先问清标准，再判断这件事有没有偏离'],
  正在恢复: ['恢复不是回到原样，而是重新安排力气', '今天的进度可以用稳定衡量，不必用速度衡量'],
  一切还不错: ['顺利时也值得看清是什么在起作用', '不用制造转折，延长现在有效的节奏就很好']
}

const lenses = [
  { id: 'DETAIL', cue: '把镜头推近一点', action: '记录一个具体细节，再决定它意味着什么' },
  { id: 'BOUNDARY', cue: '把边界重新描清', action: '为今天的一件事明确一个可以接受的范围' },
  { id: 'PACE', cue: '调整这一集的节奏', action: '删掉一个并不急迫的步骤，给重要的事留出位置' },
  { id: 'DIALOGUE', cue: '让对话回到事实', action: '把一句猜测改写成一个可以直接询问的问题' },
  { id: 'EXPERIMENT', cue: '先拍一个小样', action: '用十分钟试一次，不急着把它变成长期开关' },
  { id: 'CLOSURE', cue: '给旧段落一个句号', action: '完成一件已经足够好的小事，不再追加解释' }
] as const

const observations = [
  '第一反应很响，但不一定最准确', '你停顿的地方，通常比你说得顺的地方更有信息',
  '如果同一件事已经解释了两遍，第三遍或许应该换成行动', '今天不需要把所有感受都翻译成结论',
  '先看这件事消耗了什么，再看它承诺了什么', '真正的变化常常先表现为：你不想再照旧处理'
]

const hookOpeners = ['今天不急着预测结果。', '这一期先不讨论命运安排。', '把答案暂时放到一边。', '今天的线索藏在一个很小的停顿里。']
const endingOpeners = ['到了晚上，你可能不会得到一个戏剧性的答案，', '这一集真正的推进不一定被别人看见，', '如果今天只能留下一个变化，', '不用等到一切想通以后再行动，']

const cardNotes: Record<string, string> = {
  THE_FOOL: '新的开场不要求你毫无顾虑，只要求你知道第一步有多大。',
  THE_MAGICIAN: '先清点已经在手里的资源，别把等待新条件当成准备。',
  THE_HIGH_PRIESTESS: '直觉可以提醒你停一下，但结论仍然要交给事实。',
  THE_EMPRESS: '照顾自己不是奖励，而是让后续剧情继续运转的制作预算。',
  THE_EMPEROR: '边界不是把人推远，而是让责任终于有清楚的署名。',
  THE_HIEROPHANT: '规则曾经有用，不代表它永远不用修订。',
  THE_LOVERS: '真正重要的选择，通常是在靠近别人时仍然不离开自己。',
  THE_CHARIOT: '方向比速度更值得确认，用力之前先看车头朝向哪里。',
  STRENGTH: '温和不是退让，它是不用提高音量也能保持立场。',
  THE_HERMIT: '暂时离开噪音，不等于退出关系或放弃问题。',
  WHEEL_OF_FORTUNE: '变量出现时先调整计划，不必急着把它命名为好运或坏运。',
  JUSTICE: '公平不是每个人得到一样多，而是标准能够被说清楚。',
  THE_HANGED_MAN: '暂停不是空白期，它能让你看见原来被速度遮住的东西。',
  DEATH: '收尾不是失败证明，它只是告诉你资源可以重新分配了。',
  TEMPERANCE: '平衡不是把所有事都留住，而是知道什么该少一点。',
  THE_DEVIL: '先辨认那个重复出现的交换：你得到了什么，又持续付出了什么。',
  THE_TOWER: '计划需要改写时，先保留事实，放下对自己的否定。',
  THE_STAR: '希望最好落在一个可执行的动作上，而不是只停在等待里。',
  THE_MOON: '不确定不等于坏消息；今晚先不要替未知补写剧情。',
  THE_SUN: '清晰也需要核对细节，乐观不必以忽略问题为代价。',
  JUDGEMENT: '重新回答不是反复，它可能说明你已经不是上一次的你。',
  THE_WORLD: '完成不是做到无可修改，而是知道这一版已经可以交付。'
}

const foreshadows = [
  { type: 'MESSAGE', texts: ['一条被搁置的消息。', '一个迟到但更准确的回复。'] },
  { type: 'DIALOGUE', texts: ['一句没说完的话。', '一次语气比内容更诚实的对话。'] },
  { type: 'ORDER', texts: ['一个临时改变的顺序。', '一项被重新排到前面的安排。'] },
  { type: 'DETAIL', texts: ['一个第二次出现的小细节。', '一个你差点忽略的数字或时间。'] },
  { type: 'PAUSE', texts: ['一次没有立刻答应的停顿。', '一段主动留白的十分钟。'] },
  { type: 'RETURN', texts: ['一个以不同形式返场的旧问题。', '一件以为结束、其实只差收尾的小事。'] }
] as const

const tomorrowKeywords: Record<Focus, string[]> = {
  工作发展: ['先做小样', '确认优先级', '把标准写下来', '少解释一次'],
  感情关系: ['直接确认', '保留边界', '听完再回答', '不替别人补话'],
  生活状态: ['留一点空白', '恢复秩序', '减少一个安排', '先照顾体力'],
  创造力: ['允许粗糙', '换一种顺序', '完成第一版', '保留怪念头'],
  财富与安全感: ['看清交换', '延迟决定', '重新排序', '只算真实数字'],
  自我成长: ['改写旧答案', '停止自证', '承认新想法', '把选择拿回来']
}

const actionSignals = ['先完成最小的一步，别把启动和交付绑在一起。', '今天适合推进一件已经想过两遍的小事。', '把复杂计划缩成一个二十分钟内可以完成的动作。', '先处理最影响后续的一环，其余暂时不展开。']
const relationSignals = ['别从回复速度里推导关系结论。', '比起猜测语气，今天更适合直接确认。', '给彼此一点不必立刻回应的空间。', '需要被说清楚的不是态度，而是双方的期待。']
const emotionSignals = ['晚上的判断可能比白天更悲观，重要决定可以睡一晚。', '情绪不是证据，但值得被认真听见。', '先照顾身体感受，再处理那个反复出现的念头。', '如果注意力一直散开，先减少输入，不必责怪自己。']

function hash(text: string) {
  let value = 2166136261
  for (let index = 0; index < text.length; index++) value = Math.imul(value ^ text.charCodeAt(index), 16777619)
  return value >>> 0
}

function choose<T>(items: readonly T[], seed: number, offset = 0) {
  const mixed = (seed + Math.imul(offset + 1, 2654435761)) >>> 0
  return items[mixed % items.length]
}

function chooseAvoiding<T>(items: readonly T[], seed: number, blocked: Set<T>) {
  const available = items.filter(item => !blocked.has(item))
  return choose(available.length ? available : items, seed)
}

export function createStory(card: TarotCard, profile: Profile, input: StoryContext | number = {}): Story {
  const context = typeof input === 'number' ? { variant: input } : input
  const history = context.history || []
  const variant = context.variant || 0
  const date = context.date || new Date().toISOString().slice(0, 10)
  const baseSeed = hash([date, profile.nickname, profile.currentState, profile.focuses.join('|'), card.id, variant].join(':'))
  const focus: Focus = profile.focuses.length ? choose(profile.focuses, baseSeed, 1) : '生活状态'
  const scene = choose(focusScenes[focus], baseSeed, 2)
  const recentLensIds = new Set(history.slice(0, 2).map(issue => issue.story.storyLens).filter(Boolean))
  const lens = chooseAvoiding(lenses, baseSeed, new Set(lenses.filter(item => recentLensIds.has(item.id))))
  const recentForeshadowTypes = new Set(history.slice(0, 3).map(issue => issue.story.foreshadowType).filter(Boolean))
  const foreshadow = chooseAvoiding(foreshadows, baseSeed + 17, new Set(foreshadows.filter(item => recentForeshadowTypes.has(item.type))))
  const lastFeedback = history.find(issue => issue.feedback)?.feedback
  const feedbackCue = lastFeedback === 'miss'
    ? '上一次的内容没有完全贴合，所以今天只保留可以观察和验证的部分。'
    : lastFeedback === 'accurate'
      ? '上一次被你确认过的线索，今天换一个角度继续观察。'
      : '不用强行对号入座，只留下与你有关的那一部分。'
  const core = card.core.split(' · ')[0]

  return {
    title: card.alias,
    hook: `${choose(hookOpeners, baseSeed, 3)}看看「${focus}」里，${lens.cue}之后会多出什么信息。`,
    opening: `今天更值得留意的是${scene}。${choose(observations, baseSeed, 4)}。${feedbackCue}`,
    turningPoint: `${choose(stateAngles[profile.currentState], baseSeed, 5)}。${card.cnName}对应的「${core}」提醒你尝试${card.positive}，同时留意自己是否正在${card.shadow}。`,
    ending: `${choose(endingOpeners, baseSeed, 6)}就让它是：${lens.action}。这不是命运安排，而是今天可以亲自完成的一次编辑。`,
    editorsNote: cardNotes[card.id],
    foreshadow: choose(foreshadow.texts, baseSeed, 7),
    foreshadowType: foreshadow.type,
    tomorrowKeyword: choose(tomorrowKeywords[focus], baseSeed, 8),
    storyLens: lens.id,
    safetyFlags: [],
    signals: {
      action: { score: 56 + (baseSeed % 35), trend: baseSeed % 3 === 0 ? 'flat' : 'up', text: choose(actionSignals, baseSeed, 9) },
      relation: { score: 48 + ((baseSeed >>> 3) % 38), trend: baseSeed % 2 ? 'up' : 'flat', text: choose(relationSignals, baseSeed, 10) },
      emotion: { score: 45 + ((baseSeed >>> 5) % 40), trend: baseSeed % 4 === 0 ? 'down' : 'flat', text: choose(emotionSignals, baseSeed, 11) }
    },
    tags: [focus, core, lens.id]
  }
}
