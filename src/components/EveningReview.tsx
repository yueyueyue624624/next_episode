import { Button, Text, View } from '@tarojs/components'
import type { Feedback, Issue } from '../types'
import { CloseButton, Meta } from './Primitives'

const options: [Feedback,string][]=[['accurate','有，甚至有点准'],['partial','好像有一点'],['miss','完全没有']]
export function EveningReview({ issue, onClose, onFeedback }: { issue:Issue; onClose:()=>void; onFeedback:(f:Feedback)=>void }) {
 return <View className='modal-layer'><View className='modal-dim' onClick={onClose}/><View className='review-sheet'><View className='sheet-grab'/><CloseButton onClick={onClose}/><Meta>EVENING REVIEW｜晚间回看</Meta><Text className='review-title'>今天这一集，{`\n`}有发生吗？</Text><Text className='review-clue'>今日伏笔　「{issue.story.foreshadow}」</Text>
  <View className='feedback-list'>{options.map(([id,label])=><Button className={issue.feedback===id?'selected':''} key={id} onClick={()=>onFeedback(id)}>{issue.feedback===id?'✓　':''}{label}</Button>)}</View>
  {issue.feedback ? <View className='tomorrow'><Meta>NEXT EPISODE</Meta><Text>明日关键词</Text><Text className='tomorrow-word'>{issue.story.tomorrowKeyword}</Text><Text className='subtitle'>完整剧情明天解锁。</Text></View> : <Text className='review-note'>没有标准答案。编辑部只会参考，不会替你定义今天。</Text>}
 </View></View>
}
