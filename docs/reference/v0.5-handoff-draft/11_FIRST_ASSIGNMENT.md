# 可直接给程序员的第一张正式任务单

**标题**：`[M0.5][P0] M05-01 冻结可复现的 YuLing-AI-PPT 引擎基线`

**目标仓库**：[`YuLing-Ai-Tech/yuling-ai-ppt`](https://github.com/YuLing-Ai-Tech/yuling-ai-ppt)（Private 空仓；完成审查与获得推送批准前不上传代码）。

**工作目的**：将 M0 确认 43/43 通过的 detached visual-qa 工作树，整理为可审查、可追溯、可回滚的提交/标签，在不改写正式 main 的情况下建立可重复验证的基线。

**输入**：`YuLing-AI-PPT/main@0b082c3`、`yuling-ai-ppt-visual-qa`、M0 审计结果、v0.5 包、现有测试脚本。

**步骤**：
1. 只读列出所有 Git worktree、branch、HEAD、status、差异及未提交改动清单；敏感信息仅报告文件类别，不输出值。
2. 标注 39/43 与 43/43 差异的真实代码依赖，提出拆分/转正计划与回滚方案，先交 Architect 审批。
3. 获批后在独立分支完成受控提交，更新依赖锁和打包路径，指向稳定 SHA/tag，不删除原 detached 工作树。
4. 运行 43/43 PPT 测试、Python、黄金几何及像素测试，保留环境清单；像素差异需如实报告。
5. 获得推送批准后，向 `YuLing-Ai-Tech/yuling-ai-ppt` 提交 Draft PR，说明变化路径、风险、人工复测、回滚标签/提交。由 Architect Review 决定是否放行。

**不得**：覆盖 main、强推、删除 worktree、重新录制 golden、修改产品功能、部署生产、上传敏感文件或未获批开源。

**完成定义**：有可审查版本化代码和完整 QA 证据；关键测试复现，像素失败清晰记录；不包含任何敏感资产；PR 获 Architect 批准。未达成则 Issue 保持 Blocked，不进入 M1。

**下一张 Issue**：`M05-02 Mini-App 敏感隔离、安全 Git 初始化与迁移`，目标仓库为 [`YuLing-Ai-Tech/mini-app`](https://github.com/YuLing-Ai-Tech/mini-app)。
