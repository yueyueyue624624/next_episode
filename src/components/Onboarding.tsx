import { Button, Image, Input, Text, View } from '@tarojs/components'
import { useState } from 'react'
import type { CurrentState, Focus, Profile } from '../types'
import { Masthead, Meta, PrimaryButton } from './Primitives'
import portalImage from '../assets/visuals/splash-portal.jpg'
import moonImage from '../assets/visuals/onboarding-moon.jpg'

const focuses: Focus[] = ['工作发展','感情关系','生活状态','创造力','财富与安全感','自我成长']
const states: CurrentState[] = ['想做些改变','有点迷茫','需要确认','正在恢复','一切还不错']

export function Onboarding({ initial, onDone }: { initial:Profile; onDone:(p:Profile)=>void }) {
  const [step,setStep]=useState(-2)
  const [selected,setSelected]=useState<Focus[]>(initial.focuses)
  const [state,setState]=useState<CurrentState>(initial.currentState)
  const [nickname,setNickname]=useState(initial.nickname==='未命名主角'?'':initial.nickname)
  const toggle=(focus:Focus)=>setSelected(prev=>prev.includes(focus)?prev.filter(x=>x!==focus):prev.length<2?[...prev,focus]:prev)

  if(step===-2) return <View className='screen splash-screen'>
    <Image className='splash-image' src={portalImage} mode='aspectFill'/>
    <View className='splash-shade'/>
    <View className='splash-brand'><Text>NEXT EPISODE</Text><Text>下一集</Text></View>
    <View className='splash-copy'><Text className='splash-tagline'>每一天，都是下一集。</Text><Text>Every Day is a New Episode.</Text></View>
    <View className='splash-actions'><PrimaryButton onClick={()=>setStep(-1)}>微信一键登录</PrimaryButton><Text className='agreement'>✓ 我已阅读并同意《用户协议》《隐私政策》</Text></View>
  </View>

  if(step===-1) return <View className='screen welcome-screen'>
    <View className='welcome-orbit'/>
    <Text className='welcome-kicker'>NEXT EPISODE</Text>
    <View className='welcome-copy'><Text>欢迎来到</Text><Text>下一集</Text><Text>用塔罗和 AI，发现你生活的下一集。</Text></View>
    <View className='welcome-deck'><View className='welcome-card side left'/><View className='welcome-card main'><Image src={moonImage} mode='aspectFill'/></View><View className='welcome-card side right'/></View>
    <View className='welcome-dots'><Text>●</Text><Text>●</Text><Text>●</Text><Text>●</Text></View>
    <PrimaryButton onClick={()=>setStep(0)}>开始探索</PrimaryButton>
    <Button className='skip-btn' onClick={()=>setStep(0)}>跳过</Button>
  </View>

  return <View className='screen onboarding profile-onboarding'>
    <Masthead issue={'00'+String(step+1)} />
    <View className='onboarding-progress'><View style={{width:String((step+1)*33.33)+'%'}}/></View>
    {step===0 ? <>
      <View className='editorial-heading'><Meta>CASTING NOTE · 01</Meta><Text className='display-title'>选择你此刻{'\n'}想关注的主题</Text><Text className='subtitle'>让编辑部更懂今天的你，最多选择两个。</Text></View>
      <View className='focus-grid'>{focuses.map((focus,i)=><Button key={focus} className={['focus-tile',selected.includes(focus)?'selected':''].join(' ')} onClick={()=>toggle(focus)}><Text className='focus-index'>0{i+1}</Text><Text className='focus-name'>{focus}</Text><Text className='focus-check'>{selected.includes(focus)?'●':'○'}</Text></Button>)}</View>
      <PrimaryButton disabled={!selected.length} onClick={()=>setStep(1)}>继续　→</PrimaryButton>
    </> : step===1 ? <>
      <View className='editorial-heading'><Meta>CHARACTER NOTE · 02</Meta><Text className='display-title'>你最近，{'\n'}比较像哪一种状态？</Text><Text className='subtitle'>不用想得太精确，选一个最接近的版本。</Text></View>
      <View className='state-list'>{states.map((s,i)=><Button key={s} className={['state-row',state===s?'selected':''].join(' ')} onClick={()=>setState(s)}><Text>0{i+1}</Text><Text className='state-name'>{s}</Text><Text>{state===s?'●':'○'}</Text></Button>)}</View>
      <PrimaryButton onClick={()=>setStep(2)}>最后一步　→</PrimaryButton>
    </> : <>
      <View className='editorial-heading final-step'><Meta>BYLINE · 03</Meta><Text className='display-title'>这一集，{'\n'}怎么称呼你？</Text><Text className='subtitle'>它会成为你的专属剧情署名，之后仍可修改。</Text></View>
      <Input className='name-input' maxlength={12} value={nickname} placeholder='输入昵称' onInput={e=>setNickname(e.detail.value)} />
      <View className='onboarding-quote'><Text>“你的故事还没有定稿。{'\n'}今天仍然可以重写一句。”</Text><Meta>— NEXT EPISODE</Meta></View>
      <PrimaryButton disabled={!nickname.trim()} onClick={()=>onDone({nickname:nickname.trim(),focuses:selected,currentState:state,onboardingDone:true})}>开启下一集　→</PrimaryButton>
    </>}
  </View>
}
