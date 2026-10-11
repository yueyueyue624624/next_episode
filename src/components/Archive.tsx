import { Button, Text, View } from '@tarojs/components'
import type { Issue } from '../types'
import { Masthead, Meta, PrimaryButton, TarotArtwork } from './Primitives'

export function Archive({ issues, onIssue, onDraw }: { issues:Issue[]; onIssue:(i:Issue)=>void; onDraw:()=>void }) {
 const now=new Date()
 const year=now.getFullYear()
 const month=now.getMonth()
 const dayCount=new Date(year,month+1,0).getDate()
 const mondayOffset=(new Date(year,month,1).getDay()+6)%7
 const days:(number|null)[]=[...Array.from({length:mondayOffset},()=>null),...Array.from({length:dayCount},(_,i)=>i+1)]
 return <View className='screen archive-screen'><Masthead action={<Meta>YOUR STORY</Meta>}/><Text className='archive-title'>回看</Text><Text className='archive-subtitle'>你的剧情档案</Text>
  <View className='archive-mode'><Text className='active'>日历</Text><Text>时间线</Text></View>
  <View className='calendar-card'><View className='calendar-head'><Text>{year}年{month+1}月</Text><Text>›</Text></View><View className='week-row'>{['一','二','三','四','五','六','日'].map(x=><Text key={x}>{x}</Text>)}</View><View className='calendar-grid'>{days.map((day,index)=><Text key={`${day||'blank'}-${index}`} className={day===now.getDate()?'today-dot':''}>{day||''}</Text>)}</View></View>
  <View className='archive-tabs'><Text className='active'>ALL ISSUES</Text><Text>COLLECTED</Text></View>
  <View className='current-chapter'><View><Meta>CURRENT CHAPTER · 03</Meta><Text className='chapter-big'>重新选择</Text><Text className='subtitle'>最近你开始重新评估，一些过去默认接受的事情。</Text></View><Text className='chapter-mark'>↗</Text></View>
  {issues.length ? <View className='archive-list'>{issues.map(issue=><Button className='archive-row' key={issue.id} onClick={()=>onIssue(issue)}><View className='archive-num'><Meta>ISSUE</Meta><Text>{String(issue.issueNumber).padStart(3,'0')}</Text></View><TarotArtwork card={issue.card} compact/><View className='archive-copy'><Meta>{issue.card.name}</Meta><Text>{issue.story.title}</Text><Text className='archive-date'>{issue.localDate}</Text></View><Text>→</Text></Button>)}</View> : <View className='empty-state'><Text className='empty-mark'>□</Text><Text className='empty-title'>你的刊物还是空白页</Text><Text className='subtitle'>抽出第一张今日牌，这里就会开始连载。</Text><PrimaryButton onClick={onDraw}>开始第一集</PrimaryButton></View>}
 </View>
}
