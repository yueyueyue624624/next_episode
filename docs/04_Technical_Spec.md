# Development & Technical Spec

## Stack
WeChat Mini Program；Taro+React+TypeScript 或原生 TS；Node.js+TypeScript；PostgreSQL；Redis；统一 AI Gateway。

## 每日唯一性
UNIQUE(user_id, local_date) + Redis draw lock。Draw 接口幂等，多设备并发只创建一个 Daily Issue。

## AI Fallback
1) Retry once；2) 安全模板 + Card Mapping + Focus；3) 静态安全内容池。牌面永不因 AI 失败改变。

## Date
按用户本地日期；保存 local_date/timezone/UTC。00:00 后进入新一期。

## Performance
TODAY 缓存首屏 <1.5s；Draw <800ms；Story 大多数 <5s；Share image <2s。

## Security
Auth、ownership check、rate limit、secret management、个人数据删除。
