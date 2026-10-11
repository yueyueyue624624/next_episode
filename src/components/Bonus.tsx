import { Text, View } from '@tarojs/components'
import type { Issue } from '../types'
import { CloseButton, Masthead, Meta, PrimaryButton } from './Primitives'

export function Bonus({ issue, onClose, onCollect }: { issue:Issue; onClose:()=>void; onCollect:()=>void }) {
 return <View className='screen bonus-screen' style={{'--accent':issue.card.accent} as any}><Masthead issue={String(issue.issueNumber).padStart(3,'0')} action={<CloseButton onClick={onClose}/>}/>
  <View className='bonus-heading'><View><Meta>BONUS PAGE</Meta><Text className='display-title'>本集彩蛋</Text></View><Text className='bonus-issue'>ISSUE {issue.issueNumber}</Text></View>
  <View className='bonus-poster'><View className='bonus-sun'/><Text className='bonus-rarity'>RARE{`\n`}稀有</Text><Text className='bonus-hand'>有些故事{`\n`}会回来，{`\n`}以全新的方式。</Text></View>
  <Text className='bonus-title'>返场</Text><Text className='bonus-body'>你以为已经结束的，或许只是换了一种方式回来。这一次，你会看得更清楚。</Text>
  <PrimaryButton onClick={onCollect}>{issue.bonusCollected?'已收进今天这一期　✓':'收进今天这一期'}</PrimaryButton>
  <Text className='footnote'>SOME STORIES ALWAYS RETURN.</Text>
 </View>
}
