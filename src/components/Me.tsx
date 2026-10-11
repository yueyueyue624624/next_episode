import { Button, Image, Input, Text, View } from '@tarojs/components'
import { useState } from 'react'
import type { AppData, CurrentState, Focus, Issue, Profile } from '../types'
import { BackButton, Masthead, Meta, PrimaryButton, TarotArtwork } from './Primitives'
import avatarImage from '../assets/visuals/avatar-cat.jpg'

type Panel='favorites'|'about'|null
const focusOptions:Focus[]=['工作发展','感情关系','生活状态','创造力','财富与安全感','自我成长']
const stateOptions:CurrentState[]=['想做些改变','有点迷茫','需要确认','正在恢复','一切还不错']

export function Me({ data, onProfile, onReset, onToday, onIssue, onNotify }: {
 data:AppData
 onProfile:(p:Profile)=>void
 onReset:()=>void
 onToday:()=>void
 onIssue:(issue:Issue)=>void
 onNotify:(message:string)=>void
}) {
 const [editing,setEditing]=useState(false)
 const [name,setName]=useState(data.profile.nickname)
 const [focuses,setFocuses]=useState<Focus[]>(data.profile.focuses)
 const [currentState,setCurrentState]=useState<CurrentState>(data.profile.currentState)
 const [panel,setPanel]=useState<Panel>(null)
 const favorites=data.issues.filter(issue=>data.favorites.includes(issue.id))
 const toggleFocus=(focus:Focus)=>setFocuses(values=>values.includes(focus)?values.filter(value=>value!==focus):values.length<3?[...values,focus]:values)

 if(panel==='favorites') return <View className='screen safe-header-screen me-detail-screen'>
  <Masthead action={null} back={<BackButton onClick={()=>setPanel(null)}/>}/>
  <View className='detail-heading'><Meta>COLLECTION</Meta><Text className='display-title'>我的收藏</Text><Text className='subtitle'>你主动留下的牌与剧情，会在这里返场。</Text></View>
  {favorites.length?<View className='favorite-list'>{favorites.map(issue=><Button className='favorite-row' key={issue.id} onClick={()=>onIssue(issue)}><TarotArtwork card={issue.card} compact/><View><Meta>{issue.card.name}</Meta><Text>{issue.story.title}</Text><Text className='archive-date'>{issue.localDate}</Text></View><Text>→</Text></Button>)}</View>:<View className='empty-state'><Text className='empty-mark'>☆</Text><Text className='empty-title'>还没有收藏</Text><Text className='subtitle'>打开本集彩蛋并收进今天这一期后，它会出现在这里。</Text></View>}
 </View>

 if(panel==='about') return <View className='screen safe-header-screen me-detail-screen'>
  <Masthead action={null} back={<BackButton onClick={()=>setPanel(null)}/>}/>
  <View className='detail-heading'><Meta>ABOUT THE EDITION</Meta><Text className='display-title'>关于下一集</Text></View>
  <View className='about-card'><Text className='about-lead'>每天不是答案，{'\n'}而是人生新一集的开场。</Text><Text className='subtitle'>NEXT EPISODE 将经典塔罗藏在编辑部语言中，提供娱乐性的自我观察与轻陪伴。内容不构成心理、医疗、法律或投资建议。</Text></View>
  <View className='profile-row'><Text>当前版本</Text><Text>V1.0 · MVP</Text></View>
  <View className='profile-row'><Text>内容模式</Text><Text>本地 Story Engine</Text></View>
 </View>

 return <View className='screen me-screen'><Masthead action={<Meta>CHARACTER FILE</Meta>}/>
  <View className='profile-head'><Image className='avatar' src={avatarImage} mode='aspectFill'/><View><Meta>MAIN CHARACTER</Meta><Text className='profile-name'>{data.profile.nickname}</Text><Text className='subtitle'>每一天，都是下一集。</Text></View></View>
  <View className='membership-card'><View><Text className='membership-title'>成为 NEXT 会员</Text><Text>解锁更多剧情，记录完整人生故事。</Text></View><Text className='membership-star'>★</Text><Button onClick={()=>onNotify('NEXT+ 还在准备中，首发版本暂不收费')}>了解 NEXT+</Button></View>
  <View className='profile-stats'><View><Text>{data.issues.length}</Text><Meta>已连载</Meta></View><View><Text>{data.favorites.length}</Text><Meta>已收藏</Meta></View><View><Text>{Math.max(data.issues.length,1)}</Text><Meta>连续天数</Meta></View></View>
  <View className='profile-card'><Meta>我的角色档案</Meta><View className='profile-row'><Text>最近关注</Text><Text>{data.profile.focuses.join(' / ')||'尚未选择'}</Text></View><View className='profile-row'><Text>最近状态</Text><Text>{data.profile.currentState}</Text></View></View>
  <View className='settings'>
   <Button onClick={onToday}>我的今日牌<Text>→</Text></Button>
   <Button onClick={()=>setPanel('favorites')}>收藏<Text>{favorites.length}　→</Text></Button>
   <Button onClick={()=>onNotify('NEXT+ 还在准备中')}>NEXT+（即将开放）<Text>→</Text></Button>
   <Button onClick={()=>setPanel('about')}>关于「下一集」<Text>→</Text></Button>
  </View>
  {editing ? <View className='edit-profile'><Meta>角色署名</Meta><Input value={name} maxlength={12} focus onInput={e=>setName(e.detail.value)}/><Meta>最近关注 · 最多 3 项</Meta><View className='profile-choice-grid'>{focusOptions.map(focus=><Button key={focus} className={focuses.includes(focus)?'selected':''} onClick={()=>toggleFocus(focus)}>{focus}</Button>)}</View><Meta>最近状态</Meta><View className='profile-state-list'>{stateOptions.map(state=><Button key={state} className={currentState===state?'selected':''} onClick={()=>setCurrentState(state)}>{currentState===state?'● ':'○ '}{state}</Button>)}</View><View className='edit-actions'><Button className='outline-btn' onClick={()=>{setName(data.profile.nickname);setFocuses(data.profile.focuses);setCurrentState(data.profile.currentState);setEditing(false)}}>取消</Button><PrimaryButton onClick={()=>{onProfile({...data.profile,nickname:name.trim()||data.profile.nickname,focuses,currentState});setEditing(false);onNotify('角色档案已更新，将影响之后的剧情')}}>保存档案</PrimaryButton></View></View> : <Button className='outline-btn' onClick={()=>setEditing(true)}>编辑角色档案</Button>}
  <Button className='reset-btn' onClick={onReset}>重置本地体验数据</Button>
 </View>
}
