# NEXT EPISODE｜下一集

微信小程序 MVP，基于 Taro + React + TypeScript 实现。产品与内容逻辑以 `docs/` 交付包为基线，当前视觉采用已确认的深海军蓝、雾紫与暖金编辑部风格。同时提供可部署到 GitHub Pages 的 H5 演示版。

## 当前可体验内容

- 三步 Onboarding：关注领域、当前状态、昵称
- TODAY 首页四种状态：未抽牌、已翻牌、剧情可读、当日归档
- 三张牌自选与“替我抽”
- 同一本地日期只锁定一张主牌，重复进入不会重抽
- 今日牌结果、Today’s Signal、今日剧情、伏笔与明日关键词
- 本集彩蛋、收藏、晚间回看
- ARCHIVE 历史档案与单期回看
- ME 角色档案、昵称编辑、数据重置
- 3 套分享卡版式预览与微信分享标题
- 22 张大阿卡纳完整配置：正向含义、阴影面、内容安全边界及原创剧情名
- 本地 fallback Story Engine：结合日期、关注领域、当前状态、历史反馈和近 7 期内容做可重复验证的个性化生成
- 基础埋点，以及加载、空、错误反馈状态

## 环境要求

- Node.js 18 或更高版本
- pnpm 9 或更高版本
- 微信开发者工具（预览微信小程序时需要）

## 安装和运行

```powershell
cd E:\Condex\next-episode
pnpm install
pnpm dev:weapp
```

然后在微信开发者工具中导入 `E:\Condex\next-episode`。项目配置会读取 `dist` 目录；开发命令保持运行时，修改源码会自动重新构建。

浏览器预览：

```powershell
pnpm dev:h5
```

正式构建：

```powershell
pnpm typecheck
pnpm build:weapp
```

微信构建输出到 `dist/`，H5 构建输出到 `preview-h5/`，两者互不覆盖。

## 在线演示部署

仓库已经包含 `.github/workflows/deploy-pages.yml`。推送到 GitHub 的 `main` 分支后：

1. 打开 GitHub 仓库的 `Settings → Pages`。
2. 将 `Build and deployment → Source` 选择为 `GitHub Actions`。
3. 等待仓库顶部 `Actions` 中的部署任务完成。
4. 页面地址通常为 `https://<GitHub 用户名>.github.io/<仓库名>/`。

这个地址是浏览器 H5 演示版，适合放在简历中。真正的微信小程序仍需在微信公众平台注册小程序、绑定 AppID，并通过微信开发者工具上传、提交审核和发布。

## 数据说明

MVP 数据保存在设备本地，不要求后端即可完整走通。首次完成 Onboarding 后会加入两期演示档案，便于检查 ARCHIVE；今天的真实抽牌只会生成一次。可在 ME 页面点击“重置本地体验数据”重新体验。

本地 Story Engine 位于 `src/services/storyEngine.ts`，卡牌配置位于 `src/data/cards.ts`。每天的三张候选牌从完整牌组中确定性生成，并避开最近 7 天使用过的牌；剧情会避开近期重复 Story Lens 和三日内重复伏笔类型。后续接入服务端 AI 时可以保持现有页面数据结构不变。

## MVP 边界 / 后续接入

以下属于正式上线阶段，当前源码保留了可替换边界，但未接真实服务：

- 微信登录、用户云端同步、服务端每日唯一约束
- 在线 AI 内容生成、审核与运营后台
- 分享卡 Canvas 图片导出、保存相册和真实分享回流统计
- 推送订阅、支付与会员能力

正式上线前还需要在 `project.config.json` 填入真实微信小程序 AppID，并按 `docs/06_QA_UAT.md` 与 `docs/07_Launch_Operations.md` 完成真机、内容安全和审核测试。

## 目录

- `src/components/`：完整页面与交互组件
- `src/data/cards.ts`：22 张大阿卡纳配置
- `src/services/`：本地存储、Story Engine、埋点
- `src/pages/index/`：主状态机与视觉样式
- `docs/`：产品唯一基线与 QA、上线文档
