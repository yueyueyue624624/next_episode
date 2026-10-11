import { Button, Text, View } from '@tarojs/components'
import { useState } from 'react'
import type { Issue } from '../types'
import { CloseButton, Meta, PrimaryButton, TarotArtwork } from './Primitives'

type Template='cover'|'quote'|'card'
export function ShareSheet({ issue, onClose, onGenerated, onShare }: { issue:Issue; onClose:()=>void; onGenerated:(template:Template)=>void; onShare:()=>void }) {
 const [template,setTemplate]=useState<Template>('cover'); const [done,setDone]=useState(false)
 const generate=()=>{setDone(true);onGenerated(template)}
 return <View className='full-modal screen share-screen' style={{'--accent':issue.card.accent} as any}><View className='share-top'><View><Meta>SHARE YOUR STORY</Meta><Text className='share-title'>选择分享版式</Text></View><CloseButton onClick={onClose}/></View>
  <View className='template-tabs'>{(['cover','quote','card'] as Template[]).map(t=><Button key={t} className={template===t?'active':''} onClick={()=>{setTemplate(t);setDone(false)}}>{t.toUpperCase()}</Button>)}</View>
  <View className={`share-canvas ${template}`}>
   {template==='cover'?<><Text className='poster-brand'>NEXT EPISODE</Text><Text className='poster-issue'>ISSUE {String(issue.issueNumber).padStart(3,'0')}</Text><Text className='poster-card'>{issue.card.name}</Text><View className='poster-symbol'>{issue.card.symbol}</View><Text className='poster-title'>《{issue.story.title}》</Text><Text className='poster-date'>TODAY'S ISSUE · {issue.localDate.slice(5).replace('-',' / ')}</Text></>:null}
   {template==='quote'?<><Meta>TODAY'S LINE</Meta><Text className='poster-quote'>“{issue.story.editorsNote}”</Text><View className='quote-rule'/><Text className='poster-small'>NEXT EPISODE｜下一集{`\n`}ISSUE {issue.issueNumber}</Text></>:null}
   {template==='card'?<><Text className='poster-brand'>TODAY'S CARD</Text><TarotArtwork card={issue.card}/><Text className='poster-card-name'>{issue.card.name} · {issue.card.cnName}</Text><Text className='poster-small'>今天你会抽到哪一张？</Text></>:null}
  </View>
  {!done?<PrimaryButton onClick={generate}>生成分享卡</PrimaryButton>:<Button className='primary-btn share-wechat-btn' openType='share' onClick={onShare}>分享给微信好友　↗</Button>}
  <Text className='share-help'>{done?'点击上方按钮，将通过微信原生分享面板发送。':'选择版式后，一步生成。'}</Text>
 </View>
}
