# DVSK v0.5 — 程序员交付包：从这里开始

版本：0.5 / 2026-10-17 / 状态：架构师评审草案（不得声称代码已部署）

## 唯一执行顺序

**先私有、先隔离敏感信息、先保全历史；再基线冻结；再跨平台 CI；再契约；再视觉候选应用；再图片/联网发现；最后企业 Hybrid 试点。**

1. 首读 `05_REPOSITORY_AND_OPEN_SOURCE_DECISION.md`，不要把工作目录直接公开，也不要擅自合并两个现有工程。
2. 按 `06_MIGRATION_SECURITY_RUNBOOK.md` 执行仓库迁移前的只读检查，批准后分步骤提交。
3. 按 `07_TEAM_GITHUB_WORKFLOW.md` 完成组织权限、分支、Issue、PR、CI 工作流。
4. 按 `08_DEVELOPER_TASKBOOK.md` **每次仅领取一张 Issue**。先完成 M0.5-01～M0.5-04；未通过不得进入 M1。
5. 按 `09_QA_ACCEPTANCE_MATRIX.md` 提交证据；架构师按 `10_ARCHITECT_REVIEW_GATE.md` 验收。
6. `01` 产品、`02` 架构、`03` Contract、`04` 旧实现计划是**设计背景与详细技术依据**，若与 v0.5 新任务顺序冲突，以本文件和已批准 ADR 为准。

## 已创建的组织仓库（2026-10-17 核验）

| 仓库 | 职责 | 当前边界 |
|---|---|---|
| [`YuLing-Ai-Tech/mini-app`](https://github.com/YuLing-Ai-Tech/mini-app) | Next.js 工作台、业务 API 与用户交互 | Private 空仓；安全盘点与批准前不上传本地代码 |
| [`YuLing-Ai-Tech/yuling-ai-ppt`](https://github.com/YuLing-Ai-Tech/yuling-ai-ppt) | Python/HTML PPT 引擎、可复用组件与视觉 QA | Private 空仓；先完成 M05-01 基线冻结 |
| [`YuLing-Ai-Tech/dvsk-platform`](https://github.com/YuLing-Ai-Tech/dvsk-platform) | 视觉语义层、三契约、Gateway 与动态词典 | Private 空仓；M05-04 通过后再纳入设计文档和新模块 |
| [`YuLing-Ai-Tech/yuling-knowledge-platform`](https://github.com/YuLing-Ai-Tech/yuling-knowledge-platform) | Company OS 私有知识平台，首个场景为电梯销售 RAG | Private 空仓；**不属于当前 DVSK 交付包的开发与派工范围** |

仓库已建立不代表代码已迁移、基线已冻结、CI 已可用或产品已部署。完整仓库决策以 `05_REPOSITORY_AND_OPEN_SOURCE_DECISION.md` 为事实源。

## 审查事实（仅来自用户提供的 Codex M0 报告；未独立审计源码）

现有 Mini-App Next.js 工作台与 YuLing-AI-PPT Python HTML 引擎可复用；visual-qa 候选版本在特定条件下 43/43 通过、Python 175 passed/9 deselected、几何门禁通过；像素测试 5 pass/4 fail；候选引擎尚未冻结、Mini-App 尚未 Git 化、目录邻近私钥/账号 CSV，不能直接进入 M1，也不得宣称端到端生产通过。

## 团队协议

Architect：需求、接口/架构冻结、安全边界审批、PR review、发布授权；Developer：实现、测试、PR 与修复；任何人不能自行关闭未通过的 Gate。macOS 与 Windows+WSL2 开发，Linux CI 为正式验收环境。

## MVP 演示目标

输入“5 个模块像花瓣一样从中心展开，有一点悬浮感” → 2–4 个候选术语、三个可预览方案 → 用户确认 → Visual/Shape/Render 契约 → 安全 Legacy Adapter → 现有 HTML 引擎 → QA。第一版只用虚构数据和授权样例。
