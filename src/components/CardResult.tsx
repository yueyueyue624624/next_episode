import { Text, View } from '@tarojs/components'
import type { Issue } from '../types'
import { BackButton, Masthead, Meta, PrimaryButton, TarotArtwork } from './Primitives'
import { roman } from '../data/cards'

export function CardResult({ issue, onStory, onHome }: { issue:Issue; onStory:()=>void; onHome:()=>void }) {
  const { card, story }=issue
  return <View className='screen safe-header-screen result-screen' style={{'--accent':card.accent} as any}>
    <Masthead issue={String(issue.issueNumber).padStart(3,'0')} back={<BackButton onClick={onHome}/>}/>
    <View className='result-meta'><Meta>TODAY'S CARD</Meta><Text className='vertical-note'>A KINDER{`\n`}TOMORROW</Text></View>
    <TarotArtwork card={card}/>
    <Text className='result-card-name'>{card.name}</Text>
    <Text className='result-roman'>{roman(card.number)}　·　{card.cnName}</Text>
    <View className='result-copy'><Meta>STORY TITLE</Meta><Text className='result-title'>{card.alias}</Text><Text className='subtitle'>{story.hook}</Text></View>
    <PrimaryButton onClick={onStory}>进入今日剧情　→</PrimaryButton>
    <Text className='footnote'>NOT ALL ANSWERS NEED TO BE SEEN TODAY.</Text>
  </View>
}
