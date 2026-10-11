import { Text, View } from '@tarojs/components'
import Taro, { useShareAppMessage, useShareTimeline } from '@tarojs/taro'
import { useEffect, useMemo, useState } from 'react'
import type { AppData, Feedback, Issue, Profile } from '../../types'
import { loadData, saveData, drawToday, demoArchive, localDate, defaultProfile } from '../../services/storage'
import { track, clearEvents } from '../../services/analytics'
import { Onboarding } from '../../components/Onboarding'
import { Today } from '../../components/Today'
import { Draw } from '../../components/Draw'
import { CardResult } from '../../components/CardResult'
import { Story } from '../../components/Story'
import { Bonus } from '../../components/Bonus'
import { EveningReview } from '../../components/EveningReview'
import { Archive } from '../../components/Archive'
import { Me } from '../../components/Me'
import { ShareSheet } from '../../components/ShareSheet'
import { BottomNav, Loading, Toast } from '../../components/Primitives'
import './index.scss'
import './more.scss'
import './dark.scss'
import './polish.scss'
import './reference.scss'

type Tab='today'|'archive'|'me'
type Overlay='draw'|'result'|'story'|'bonus'|'share'|null

export default function Index() {
 const [data,setData]=useState<AppData|null>(null)
 const [tab,setTab]=useState<Tab>('today')
 const [overlay,setOverlay]=useState<Overlay>(null)
 const [review,setReview]=useState(false)
 const [selectedIssue,setSelectedIssue]=useState<Issue|null>(null)
 const [toast,setToast]=useState('')
 const [shareReturn,setShareReturn]=useState<Overlay>(null)
 const [shareTemplate,setShareTemplate]=useState<'cover'|'quote'|'card'>('cover')
 useEffect(()=>{const d=demoArchive(loadData());setData(d);track('app_open',{is_new_user:!d.profile.onboardingDone})},[])
 const today=useMemo(()=>data?.issues.find(i=>i.localDate===localDate()),[data])
 const issue=selectedIssue||today
 const update=(next:AppData)=>{setData(next);saveData(next)}
 const notify=(text:string)=>{setToast(text);setTimeout(()=>setToast(''),1800)}
 const finishOnboarding=(profile:Profile)=>{if(!data)return;const next={...data,profile};update(next);track('onboarding_complete',{focus_areas:profile.focuses,current_state:profile.currentState});notify('角色档案已建立')}
 const open=(next:Overlay,current?:Issue)=>{setSelectedIssue(current||null);setOverlay(next)}
 const openShare=(current:Issue,returnTo:Overlay=null)=>{setSelectedIssue(current);setShareReturn(returnTo);setOverlay('share')}
 const draw=(method:'manual'|'auto',slot:number)=>{if(!data)return;const next=drawToday(data,method,slot);update(next);const created=next.issues.find(i=>i.localDate===localDate())!;setSelectedIssue(created);setOverlay('result');track(method==='auto'?'auto_draw_clicked':'card_selected',{selected_slot:slot});track('card_revealed',{card_id:created.card.id,draw_method:method})}
 const markStory=()=>{if(!data||!issue)return;const issues=data.issues.map(i=>i.id===issue.id?{...i,state:'story_ready' as const}:i);update({...data,issues});setSelectedIssue({...issue,state:'story_ready'});setOverlay('story');track('story_opened',{issue_id:issue.id,card_id:issue.card.id})}
 const completeStory=()=>{if(!data||!issue)return;const updated={...issue,state:'active_day' as const};update({...data,issues:data.issues.map(i=>i.id===issue.id?updated:i)});setSelectedIssue(updated);setOverlay(null);track('story_completed',{issue_id:issue.id});notify('已收进今天这一期')}
 const openBonus=()=>{if(!data||!today)return;if(today.state==='card_revealed'){notify('先读完今天的剧情');return}const issues=data.issues.map(i=>i.id===today.id?{...i,bonusOpened:true,state:'active_day' as const}:i);update({...data,issues});setSelectedIssue({...today,bonusOpened:true,state:'active_day'});setOverlay('bonus');track('bonus_opened',{rarity:'rare',category:'return'})}
 const collect=()=>{if(!data||!issue)return;const issues=data.issues.map(i=>i.id===issue.id?{...i,bonusCollected:true}:i);const favorites=data.favorites.includes(issue.id)?data.favorites:[...data.favorites,issue.id];update({...data,issues,favorites});setSelectedIssue({...issue,bonusCollected:true});track('bonus_collected',{bonus_id:`bonus_${issue.id}`});notify('已收进今天这一期')}
 const feedback=(value:Feedback)=>{if(!data||!today)return;const issues=data.issues.map(i=>i.id===today.id?{...i,feedback:value,state:'issue_closed' as const}:i);update({...data,issues});track('evening_feedback_submit',{feedback_type:value});track('tomorrow_teaser_view',{keyword:today.story.tomorrowKeyword})}
 const chooseTab=(next:Tab)=>{setTab(next);setOverlay(null);setSelectedIssue(null);track(next==='archive'?'archive_opened':next==='today'?'today_view':'me_opened',next==='archive'?{issue_count:data?.issues.length||0}:{})}
 const reset=()=>{Taro.showModal({title:'重新开始？',content:'将清除本机的体验数据与埋点记录。',success:r=>{if(r.confirm){const fresh:AppData={version:2,profile:{...defaultProfile},issues:[],favorites:[]};update(fresh);clearEvents();setTab('today');setOverlay(null)}}})}
 const shareTitle=issue
  ? shareTemplate==='quote' ? '“'+issue.story.editorsNote+'”｜下一集'
  : shareTemplate==='card' ? '我的今日牌是 '+issue.card.cnName
  : '我今天抽到 '+issue.card.cnName+'｜'+issue.story.title
  : '今天，命运想跟你说什么？'
 useShareAppMessage(()=>({title:shareTitle,path:'/pages/index/index'}))
 useShareTimeline(()=>({title:shareTitle}))
 if(!data)return <Loading label='正在打开今天这一期…'/>
 if(!data.profile.onboardingDone)return <Onboarding initial={data.profile} onDone={finishOnboarding}/>
 return <View className='app-shell'>
  {tab==='today'?<Today profile={data.profile} issue={today} onDraw={()=>{track('draw_page_view',{issue_exists:false});open('draw')}} onResult={()=>today&&open('result',today)} onStory={()=>today&&open('story',today)} onBonus={openBonus} onReview={()=>{if(today){setReview(true);track('evening_review_view',{issue_id:today.id})}}} onShare={()=>today&&openShare(today)}/>:null}
  {tab==='archive'?<Archive issues={data.issues} onIssue={i=>{track('archive_issue_opened',{issue_id:i.id});open('result',i)}} onDraw={()=>{setTab('today');open('draw')}}/>:null}
  {tab==='me'?<Me data={data} onProfile={p=>update({...data,profile:p})} onReset={reset} onNotify={notify} onIssue={i=>open('result',i)} onToday={()=>{setTab('today');today?open('result',today):notify('今天还没有抽牌')}}/>:null}
  <BottomNav tab={tab} onChange={chooseTab}/>
  {overlay==='draw'?<View className='overlay-page'><Draw issue={27+data.issues.length} onClose={()=>setOverlay(null)} onDraw={draw}/></View>:null}
  {overlay==='result'&&issue?<View className='overlay-page'><CardResult issue={issue} onStory={markStory} onHome={()=>setOverlay(null)}/></View>:null}
  {overlay==='story'&&issue?<View className='overlay-page'><Story issue={issue} onBack={()=>setOverlay('result')} onComplete={completeStory} onShare={()=>openShare(issue,'story')}/></View>:null}
  {overlay==='bonus'&&issue?<View className='overlay-page'><Bonus issue={issue} onClose={()=>setOverlay(null)} onCollect={collect}/></View>:null}
  {overlay==='share'&&issue?<View className='overlay-page'><ShareSheet issue={issue} onClose={()=>setOverlay(shareReturn)} onGenerated={template=>{setShareTemplate(template);track('share_card_generated',{template_id:template})}} onShare={()=>track('share_clicked',{template_id:shareTemplate})}/></View>:null}
  {review&&today?<EveningReview issue={today} onClose={()=>setReview(false)} onFeedback={feedback}/>:null}
  {toast?<Toast text={toast}/>:null}
 </View>
}
