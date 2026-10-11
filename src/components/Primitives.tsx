import { Button, Image, Text, View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import type { PropsWithChildren, ReactNode } from 'react'
import type { TarotCard } from '../types'
import { roman } from '../data/cards'
import moonImage from '../assets/visuals/onboarding-moon.jpg'
import starImage from '../assets/visuals/tarot-star.jpg'

function getCustomNavMetrics() {
  if (Taro.getEnv() !== Taro.ENV_TYPE.WEAPP) return { top: 24, height: 36 }

  try {
    const menu = Taro.getMenuButtonBoundingClientRect()
    if (menu.top > 0 && menu.height > 0) return { top: menu.top, height: Math.max(menu.height, 36) }
  } catch {
    // Older runtimes can miss the menu button API; the status bar is a safe fallback.
  }

  try {
    const windowInfo = Taro.getWindowInfo()
    return { top: (windowInfo.statusBarHeight || 20) + 6, height: 36 }
  } catch {
    return { top: 26, height: 36 }
  }
}

export function Masthead({ issue = '001', action, back }: { issue?: string; action?: ReactNode; back?: ReactNode }) {
  const metrics = back ? getCustomNavMetrics() : null
  const safeStyle = metrics ? { paddingTop: `${metrics.top}px`, height: `${metrics.top + metrics.height + 8}px` } : undefined

  return <View className={back ? 'masthead masthead-with-back' : 'masthead'} style={safeStyle}>
    {back ? <View className='masthead-leading'>{back}</View> : null}
    <Text className='brand'>NEXT EPISODE <Text className='brand-cn'>｜下一集</Text></Text>
    <View className='masthead-action'>{action !== undefined ? action : <Text className='issue'>ISSUE {issue}</Text>}</View>
  </View>
}

export function Meta({ children }: PropsWithChildren) {
  return <Text className='meta'>{children}</Text>
}

export function PrimaryButton({ children, disabled, onClick }: PropsWithChildren<{ disabled?: boolean; onClick?: ()=>void }>) {
  const props = disabled ? { disabled:true } : {}
  return <Button className='primary-btn' {...props} onClick={onClick}>{children}</Button>
}

export function Rule() {
  return <View className='rule'/>
}

export function TarotArtwork({ card, compact = false, back = false }: { card?: TarotCard; compact?: boolean; back?: boolean }) {
  const classes=['tarot-art', back || !card ? 'back' : 'face', compact ? 'compact' : ''].join(' ')
  if(back || !card) return <View className={classes}><Image className='tarot-photo' src={moonImage} mode='aspectFill'/><View className='tarot-photo-shade'/><View className='frame'/></View>
  if (card.number === 17) {
    return <View className={classes} style={{'--accent':card.accent} as any}><Image className='tarot-photo' src={starImage} mode='aspectFill'/><View className='tarot-photo-shade'/><View className='frame'><Text className='card-number'>{roman(card.number)}</Text><Text className='card-name'>{card.name}</Text></View></View>
  }
  return <View className={classes} style={{'--accent':card.accent} as any}><View className='frame'><Text className='card-number'>{roman(card.number)}</Text><View className='symbol-orbit'><View className='orbit orbit-a'/><View className='orbit orbit-b'/><Text className='card-symbol'>{card.symbol}</Text></View><Text className='card-name'>{card.name}</Text></View></View>
}

export function BottomNav({ tab, onChange }: { tab:'today'|'archive'|'me'; onChange:(tab:'today'|'archive'|'me')=>void }) {
  const items:[typeof tab,string,string][]=[['today','◆','今日'],['archive','▤','回看'],['me','○','我的']]
  return <View className='bottom-nav'>{items.map(([key,icon,label])=><Button key={key} className={['nav-item',tab===key?'active':''].join(' ')} onClick={()=>onChange(key)}><Text className='nav-icon'>{icon}</Text><Text>{label}</Text></Button>)}</View>
}

export function CloseButton({ onClick }: { onClick:()=>void }) {
  return <Button className='close-btn' onClick={onClick}>×</Button>
}

export function BackButton({ onClick, label='返回' }: { onClick:()=>void; label?:string }) {
  return <Button className='back-btn' aria-label={label} onClick={onClick}><Text>‹</Text><Text>{label}</Text></Button>
}

export function Loading({ label='正在打开今天这一集…' }: { label?:string }) {
  return <View className='loading'><Text className='loading-mark'>N</Text><Text className='meta'>{label}</Text></View>
}

export function Toast({ text }: { text:string }) {
  return <View className='toast'>{text}</View>
}
