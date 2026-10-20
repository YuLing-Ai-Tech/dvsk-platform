# 双人 GitHub 协作 SOP

## 角色
Architect (Owner/Admin)：建 Issue、批准架构 ADR、Review PR、决定合并/发布。
Developer (Write)：Issue 领取、实现测试、PR；不能直接推 main 或自行部署。确保仅 1 个活跃主要开发 Issue。

## 配置步骤
1. 组织确认 + 2FA；三个 DVSK **Private** repo 已创建：[`mini-app`](https://github.com/YuLing-Ai-Tech/mini-app)、[`yuling-ai-ppt`](https://github.com/YuLing-Ai-Tech/yuling-ai-ppt)、[`dvsk-platform`](https://github.com/YuLing-Ai-Tech/dvsk-platform)。它们当前是空仓，只能在完成安全盘点、对应 Issue 与 Architect 批准后上传；不要把本地目录直接公开。
2. 组织邀请开发者，具体仓库授予 Write，不授予 Admin；核查组织计划对私有仓库规则集/审查约束的强制性支持。
3. main 只接受 PR；若支持则 Require 1 approval、Dismiss stale approvals、Block force push/deletion、Require passing status checks、限制绕过；如计划不支持，清楚标注“流程纪律而非技术强制”。
4. Issue 模板字段：背景、依赖、范围、禁做、设计/API、文件边界、测试、证据、验收、回滚、Reviewer。
5. PR 模板字段：关联 Issue、变更摘要、风险/数据出站、截图、测试命令/环境与日志摘要、兼容性、回滚、检查清单。不要在 PR 中写真实私有数据。
6. 使用轻量 Board：Backlog → Ready → In Progress → In Review → Done；Blocked 用标签。

## 仓库派工边界

| 仓库 | 当前派工 |
|---|---|
| `YuLing-Ai-Tech/yuling-ai-ppt` | M05-01 引擎基线冻结与后续引擎/QA 任务 |
| `YuLing-Ai-Tech/mini-app` | M05-02 安全 Git 基线与后续工作台交互任务 |
| `YuLing-Ai-Tech/dvsk-platform` | M05-04 文档整理及后续三契约、语义层、Gateway 与词典任务 |

`YuLing-Ai-Tech/yuling-knowledge-platform` 属于 Company OS，不在本 SOP 的 Developer Write 授权、Issue、PR 或 Board 范围内。

## 一个 Issue 的完整循环
Architect 创建 Issue/验收标准 → Developer 先附计划 → Architect 批准 → `feature/<issue>-slug` / `chore/<issue>-slug` → 测试先行 → Draft PR → Linux CI → Ready for Review → Architect Approve 或 Request changes → Squash merge → 标记 Issue Done。生产部署与代码合并分开批准。

## 推荐命名
`chore/m05-01-freeze-engine`，`feat/m2-03-visual-candidates`；提交 `feat(dvsk): ...` / `fix(ppt): ...` / `test(qa): ...`。

## Mac / Windows 注意
WSL 内采用 Linux 区分大小写路径；统一 LF，`.gitattributes` 明确文本行尾（Windows 批处理等例外）；所有开发脚本避免依赖 macOS-only `sed -i` 等命令；CI 检查文件大小写及路径敏感性。

## 安全条款
任何外部模型调用、样例上传、COS/日志输出和网络检索必须在 Issue 标记数据分类；Hybrid 模式要求 deny-by-default Gateway；Issue 不得把“去标识”自动认定为无敏感信息。
