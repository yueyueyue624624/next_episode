# API / Data / Event Dictionary

完整结构化数据见 `api_dictionary.csv` 与 `analytics_events.csv`。

## 核心表
users, user_profiles, daily_issues, daily_signals, bonus_cards, issue_feedback, collections, chapters, prompt_logs。

## 核心枚举
TodayState: not_drawn / card_revealed / story_ready / active_day / evening_review_available / issue_closed。
IssueStatus: generating / ready / fallback / failed。
FeedbackType: accurate / partial / miss。
BonusRarity: common / rare / special / hidden。
