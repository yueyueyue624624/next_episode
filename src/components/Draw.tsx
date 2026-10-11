import { Button, Text, View } from '@tarojs/components'
import { useState } from 'react'
import { CloseButton, Masthead, Meta, PrimaryButton, TarotArtwork } from './Primitives'

export function Draw({ issue, onClose, onDraw }: { issue:number; onClose:()=>void; onDraw:(method:'manual'|'auto',slot:number)=>void }) {
  const [selected,setSelected]=useState<number|null>(null)
  const [busy,setBusy]=useState(false)
  const go=(method:'manual'|'auto',slot:number)=>{if(busy)return;setBusy(true);setTimeout(()=>onDraw(method,slot),520)}
  return <View className='screen draw-screen'>
    <Masthead issue={String(issue).padStart(3,'0')} action={<CloseButton onClick={onClose}/>}/>
    <View className='draw-heading'><Meta>TODAY'S PICK</Meta><Text className='display-title'>别想太久，{`\n`}选第一眼注意到的那张。</Text><Text className='subtitle'>直觉不会给答案，但会帮你选一个开始。</Text></View>
    <View className='card-fan'>{[0,1,2].map(i=><Button key={i} className={`pick-card p${i} ${selected===i?'selected':''}`} onClick={()=>setSelected(i)}><TarotArtwork compact back/><Text className='pick-number'>0{i+1}</Text></Button>)}</View>
    <View className='draw-actions'>
      {selected!==null ? <PrimaryButton onClick={()=>go('manual',selected)}>{busy?'正在揭晓…':'翻开这一张 →'}</PrimaryButton> : <View className='draw-hint'><View/><Text>或者</Text><View/></View>}
      <Button className='auto-btn' onClick={()=>go('auto',Math.floor(Math.random()*3))}>替我抽一张</Button>
    </View>
  </View>
}
