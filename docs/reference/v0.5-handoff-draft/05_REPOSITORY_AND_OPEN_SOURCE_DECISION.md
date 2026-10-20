# 仓库策略与开源决策 ADR-000

## 决定

**现在不公开、不合并现有两个工程。** 2026-10-17 已在 `YuLing-Ai-Tech` 组织创建下列 Private 空仓库；核验时均为大小 0、无分支、无提交。这是仓库容器已建立的事实，不是代码已迁移或可交付的证明。

| 仓库 | 业务边界 | DVSK 当前范围 |
|---|---|---|
| [`YuLing-Ai-Tech/mini-app`](https://github.com/YuLing-Ai-Tech/mini-app) | Next.js 工作台、业务 API 与用户交互 | 是；M05-02 安全基线之后才可推送 |
| [`YuLing-Ai-Tech/yuling-ai-ppt`](https://github.com/YuLing-Ai-Tech/yuling-ai-ppt) | Python/HTML PPT 引擎、可复用组件与视觉 QA | 是；M05-01 冻结可复现基线后才可推送 |
| [`YuLing-Ai-Tech/dvsk-platform`](https://github.com/YuLing-Ai-Tech/dvsk-platform) | 视觉语义层、三契约、文档、SDK、Gateway 与动态词典 | 是；M05-04 之后按 Issue 创建最小结构 |
| [`YuLing-Ai-Tech/yuling-knowledge-platform`](https://github.com/YuLing-Ai-Tech/yuling-knowledge-platform) | Company OS 私有知识平台，先以电梯销售 RAG 验证 | **否**；不得由本交付包授权开发、迁移或合并 |

清理并冻结后的现有工程将分别迁入 `mini-app` 与 `yuling-ai-ppt`；DVSK 新能力进入 `dvsk-platform`。不要通过直接复制本地源目录的方式迁移，也不要将任何仓库改为 Public。

现有应用与引擎独立发布、独立依赖、独立回滚。Mini-App 通过锁定 Commit SHA/tag 的方式依赖引擎，CI 必须验证一致；短期继续维持现有整合接口，避免盲目切换 submodule 或 monorepo。

## 为什么不直接开源

M0 报告发现：Mini-App 非 Git 仓库，源码与私钥/账号 CSV 同目录；引擎可用版本位于 detached 且有未提交修改；无 LICENSE/NOTICE、第三方图片/字体/代码许可审计。即使后续删除 Git 历史中的密钥也不能使已泄露凭证恢复安全。若意外公开，立即停止分发、撤销或轮换泄露凭证并审查缓存与镜像。

## 未来开源候选

- 优先：VisualSemantic/ContentShape/Render Contract Schema、类型定义、示例、独立验证器和非敏感演示布局。
- 评估后：通用无客户代码的 Python HTML 引擎（先澄清权利归属、第三方许可与依赖、历史净化、品牌标识和发布维护承诺）。
- 暂不开放：Mini-App 的商业流程、账户与 COS 集成、客户内容、本地连接器、私有知识资产、网络发现排序/词典维护后台、凭证及部署拓扑。
- 任何开源需单独 Open Source Release Gate：IP 所有权、客户/雇佣合同、SBOM、SCA、密钥和历史扫描、字体/图标/图像授权、LICENSE、NOTICE、安全策略、发布清单全部完成后由 Architect 签字。

## 将来何时考虑合并仓库？

只有跨仓库改动频率很高、版本锁引发持续集成成本、并有可重复迁移与回滚计划时才立 ADR 决策。现在优先保持可独立开源和商业隔离的能力。
