import Taro from '@tarojs/taro'

export interface AnalyticsEvent { event:string; at:number; properties:Record<string,unknown> }
const KEY='next_episode_events_v1'
export function track(event:string, properties:Record<string,unknown>={}) {
  try {
    const events:AnalyticsEvent[]=Taro.getStorageSync(KEY)||[]
    Taro.setStorageSync(KEY,[...events.slice(-199),{event,at:Date.now(),properties}])
  } catch { /* analytics never blocks the product flow */ }
}
export function clearEvents(){try{Taro.removeStorageSync(KEY)}catch{/* noop */}}
