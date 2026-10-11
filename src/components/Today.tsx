import { Button, Text, View } from '@tarojs/components'
import type { Issue, Profile } from '../types'
import { Masthead, Meta, PrimaryButton, TarotArtwork } from './Primitives'

export function Today({ profile, issue, onDraw, onResult, onStory, onBonus, onReview, onShare }: {
  profile:Profile; issue?:Issue; onDraw:()=>void; onResult:()=>void; onStory:()=>void; onBonus:()=>void; onReview:()=>void; onShare:()=>void
}) {
  const num=String(issue?.issueNumber||27).padStart(3,'0')
  const now=new Date()
  const months=['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC']
  const weekdays=['SUN','MON','TUE','WED','THU','FRI','SAT']
  const dateLabel=`${months[now.getMonth()]} ${String(now.getDate()).padStart(2,'0')} · ${weekdays[now.getDay()]}`
  const chapterByState:Record<string,string>={想做些改变:'重新选择',有点迷茫:'等雾散一点',需要确认:'把答案留给事实',正在恢复:'慢慢回到自己',一切还不错:'把好状态延长'}
  const focus=profile.focuses[0]||'生活状态'
  if(!issue) return <View className='screen today-screen today-empty'>
    <Masthead issue={num}/>
    <View className='home-greeting'>
      <Text className='home-brand'>NEXT EPISODE</Text>
      <Text className='today-question'>{'你好，'+profile.nickname+'\n今天也是新的一集 ✨'}</Text>
      <Text className='date-line'>{dateLabel}</Text>
    </View>
    <View className='daily-draw-card'>
      <View className='draw-card-copy'><Text className='draw-card-title'>今日抽牌</Text><Text>从三张牌中，选择一张</Text><Text>开启你的今日剧情。</Text></View>
      <View className='mini-deck'>
        <View className='mini-card left'><TarotArtwork compact back/></View>
        <View className='mini-card center'><TarotArtwork compact back/></View>
        <View className='mini-card right'><TarotArtwork compact back/></View>
      </View>
    </View>
    <PrimaryButton onClick={onDraw}>开始今日抽牌</PrimaryButton>
    <View className='chapter-preview'><Meta>CURRENT CHAPTER · {String(Math.max(profile.focuses.length,1)).padStart(2,'0')}</Meta><Text className='chapter-title'>{chapterByState[profile.currentState]}</Text><Text className='subtitle'>围绕「{focus}」，今天从一个小变化开始。你现在的状态是：{profile.currentState}。</Text></View>
  </View>

  return <View className='screen today-screen active' style={{'--accent':issue.card.accent} as any}>
    <Masthead issue={num}/>
    <View className='active-heading'><View><Text className='today-word small'>TODAY</Text><Text className='date-line'>今天 · {dateLabel}</Text></View><View className='issue-block'><Meta>ISSUE</Meta><Text>{num}</Text></View></View>
    <Button className='active-feature' onClick={onResult}><TarotArtwork card={issue.card}/><View className='active-copy'><Meta>{issue.card.name}</Meta><Text>{issue.story.title}</Text><Text>查看今日牌　→</Text></View></Button>
    <View className='issue-toc'>
      <Button className='toc-row' onClick={onStory}><Text className='toc-index'>01</Text><View><Text className='toc-title'>今日剧情</Text><Text className='subtitle'>{issue.story.editorsNote}</Text></View><Text>→</Text></Button>
      <Button className='toc-row' onClick={onBonus}><Text className='toc-index'>02</Text><View><Text className='toc-title'>本集彩蛋</Text><Text className='subtitle'>{issue.bonusOpened?'RARE · 返场':'剧情读完后解锁'}</Text></View><Text>{issue.state==='card_revealed'?'—':'→'}</Text></Button>
      <Button className={['toc-row',issue.feedback?'done':''].join(' ')} onClick={onReview}><Text className='toc-index'>03</Text><View><Text className='toc-title'>晚间回看</Text><Text className='subtitle'>{issue.feedback?'明日关键词 · '+issue.story.tomorrowKeyword:'20:00 后开启 · MVP 可预览'}</Text></View><Text>{issue.feedback?'✓':'→'}</Text></Button>
    </View>
    <Button className='share-strip' onClick={onShare}><Text>SHARE THIS ISSUE</Text><Text>生成分享卡　↗</Text></Button>
  </View>
}
