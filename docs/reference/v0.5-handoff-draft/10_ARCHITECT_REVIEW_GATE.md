# Architect 验收与审批表

## 每个 PR 都要回答
- 这个 PR 对应哪个 Issue？范围是否超过批准的方案？
- 哪些模块被修改？是否影响既有 PPT 渲染、三契约、SaaS/Hybrid 边界？
- 真实运行过哪些测试？测试环境与固定基线是否一致？失败项是什么？
- 是否新增数据出站、日志、存储、外部脚本、第三方依赖？
- 是否泄露密钥/客户资料？是否完整列出新依赖许可证？
- 回滚到哪个 Commit/tag？是否有数据库/契约版本兼容问题？
- 是否有可以实际点击/查看的演示？用户价值如何验证？

## 审批模板
`Decision: APPROVED | CHANGES_REQUESTED | BLOCKED`
`PR: <URL>`
`Scope reviewed: ...`
`Evidence: ...`
`Risks / unresolved: ...`
`Release authorization: NO (unless separately granted)`

## ADR 规则
涉及 Schema/数据边界/仓库拆合/新模型/权限/渲染主流程更改时，先在 `docs/adr/NNNN-topic.md` 记录 Context/Options/Decision/Consequences；Architect 在 Issue 批准后才开始实现。
