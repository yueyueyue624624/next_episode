# AI Story Engine & Tarot Content System

## AI 角色
命运编辑部的内容编辑器；不是预言者、咨询师或大师。

## 公式
Tarot Base Meaning + User Focus + Current State + Recent Story Tags + Feedback + Recent Cards + Current Chapter + Controlled Randomness = Daily Issue。

## V1
22 张大阿卡纳，upright。

## Daily Issue 字段
story_title, hook, opening, turning_point, ending, editors_note, foreshadow, signals, tomorrow_keyword, story_tags, story_lens, safety_flags。

## 去重复
- 同一 Story Lens 不连续两天重复。
- Foreshadow Type 3 天内不重复。
- 近 7 天语义相似度 >0.82 重生成。

## 质量评分
Specificity 20 + Relevance 20 + Novelty 20 + Shareability 15 + Tarot Alignment 15 + Safety 10。低于 78 重生成。

## 安全硬禁
死亡、疾病、怀孕、事故、出轨、失业、投资涨跌等确定性预测；恐惧付费。
