# 目标目录与模块职责示例（不是现有代码实况）

## 实际仓库状态（2026-10-17）

| 仓库 | 状态 | 与本模板的关系 |
|---|---|---|
| [`YuLing-Ai-Tech/mini-app`](https://github.com/YuLing-Ai-Tech/mini-app) | Private 空仓 | DVSK 应用层目标仓库 |
| [`YuLing-Ai-Tech/yuling-ai-ppt`](https://github.com/YuLing-Ai-Tech/yuling-ai-ppt) | Private 空仓 | DVSK 引擎/QA 目标仓库 |
| [`YuLing-Ai-Tech/dvsk-platform`](https://github.com/YuLing-Ai-Tech/dvsk-platform) | Private 空仓 | DVSK 新语义层与契约目标仓库 |
| [`YuLing-Ai-Tech/yuling-knowledge-platform`](https://github.com/YuLing-Ai-Tech/yuling-knowledge-platform) | Private 空仓 | Company OS 相邻能力；不属于本 DVSK 目录模板和派工范围 |

下列结构只是模块职责参考。不得因为远端仓库已创建就空建目录；必须由已批准 Issue 触发最小实现。

```
YuLing-Ai-Tech/
  mini-app/                        # 私有独立仓库: Next.js UI/API
    src/app/ppt/                   # 复用已有编辑和生成入口
    src/lib/ppt/                   # 现有 Legacy DeckOutline / renderer bridge
    docs/BASELINE_MANIFEST.md
  yuling-ai-ppt/                   # 私有独立仓库: Python engine/QA
    ...                            # 原目录保留，最小改动迁入
    docs/BASELINE_MANIFEST.md
  dvsk-platform/                   # 私有独立仓库: 新模块
    docs/                         # 设计 / ADR / source references
    packages/contracts/           # 三契约 JSON Schemas + TS type
    packages/sdk/                 # 云地接口客户端与校验器
    services/semantic/            # 云端候选与图像解析
    services/discovery/           # 来源发现/候选更新，M4 再建
    services/gateway/             # 出站/入站策略适配（逻辑本地部署）
    lexicon/                       # 审核词典及版本
    examples/                      # 虚构内容/许可明确示例
    tests/                         # 安全边界及契约回归
  yuling-knowledge-platform/       # Company OS 相邻仓库；非 DVSK 当前开发范围
```

**重要**：不要为看起来架构优美而空建目录、提前微服务化、复制公司代码到多个 repo 或在 Gateway 未测试前上传客户数据。云端服务与本地 Gateway 可独立部署，但代码组织不等于实际信任边界。
