import { Button, Text, View } from '@tarojs/components'
import type { Issue } from '../types'
import { BackButton, Masthead, Meta, PrimaryButton, Rule } from './Primitives'
import { roman } from '../data/cards'

const trend={up:'↑',flat:'→',down:'↓'}
export function Story({ issue, onBack, onComplete, onShare }: { issue:Issue; onBack:()=>void; onComplete:()=>void; onShare:()=>void }) {
 const {story,card}=issue
 return <View className='screen safe-header-screen story-screen' style={{'--accent':card.accent} as any}>
  <Masthead issue={String(issue.issueNumber).padStart(3,'0')} back={<BackButton onClick={onBack}/>}/>
  <View className='story-heading'><Meta>FEATURE STORY</Meta><Text className='story-title'>{story.title}</Text><Text className='story-inspired'>INSPIRED BY {card.name} · {roman(card.number)}</Text></View>
  <View className='story-hero'><Text className='story-hero-symbol'>{card.symbol}</Text><Text>模糊之中，也有方向。</Text></View>
  {[['01','OPENING',story.opening],['02','TURNING POINT',story.turningPoint],['03','ENDING',story.ending]].map(([n,title,body])=><View className='story-section' key={n}><Text className='section-number'>{n}</Text><View><Meta>{title}</Meta><Text className='story-body'>{body}</Text></View></View>)}
  <View className='editors-note'><Meta>EDITOR'S NOTE｜编剧旁白</Meta><Text className='quote'>“{story.editorsNote}”</Text></View>
  <View className='signals'><View className='section-head'><Meta>TODAY'S SIGNAL｜今日信号</Meta></View>{Object.entries(story.signals).map(([key,value])=><View className='signal' key={key}><Text className='signal-name'>{key.toUpperCase()}</Text><Text className='signal-score'>{value.score} {trend[value.trend]}</Text><Text className='signal-text'>{value.text}</Text></View>)}</View>
  <View className='foreshadow'><Meta>FORESHADOW｜本集伏笔</Meta><Text className='foreshadow-text'>{story.foreshadow}</Text><Text className='subtitle'>今天结束以后，再回来看看。</Text></View>
  <Rule/><PrimaryButton onClick={onComplete}>读完了，收进今天这一期</PrimaryButton><Button className='share-inline' onClick={onShare}>生成分享卡　↗</Button>
 </View>
}
