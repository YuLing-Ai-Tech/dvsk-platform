# DVSK 开发任务书（逐 Issue 派工版）

依据：M0 审计由用户提供、v0.3 四份设计文档为候选、v0.5 总纲更新执行顺序。每项任务交付：源码 PR + 自动测试 + 演示/证据 + 风险 + 回滚；未经 Architect Gate 不进入依赖阶段。编号为内部 Key，GitHub 实际 Issue number 另定。

**仓库事实源**：[`YuLing-Ai-Tech/mini-app`](https://github.com/YuLing-Ai-Tech/mini-app)、[`YuLing-Ai-Tech/yuling-ai-ppt`](https://github.com/YuLing-Ai-Tech/yuling-ai-ppt)、[`YuLing-Ai-Tech/dvsk-platform`](https://github.com/YuLing-Ai-Tech/dvsk-platform)。三者均是 Private 空仓，不得把“仓库已创建”写成“代码已迁移”。[`YuLing-Ai-Tech/yuling-knowledge-platform`](https://github.com/YuLing-Ai-Tech/yuling-knowledge-platform) 属于 Company OS，不是本任务书的交付目标。

## M0.5：基线收口（第一批必须完成）

### M05-01 冻结稳定 PPT 引擎（P0，先执行）
**输入**：M0 `main@0b082c3` 与 `yuling-ai-ppt-visual-qa`。**动作**：只读比较、形成工作树/差异清单、备份未提交改动，在审查分支复现并拆分修复提交，锁定稳定 SHA/tag；更新打包脚本不再依赖个人临时工作树。**禁止**：覆盖 main、删 worktree、重录 golden、生产部署。**验收**：可由稳定版本 43/43，12 页几何门禁通过，Python 175 passed/9 deselected 或解释测试差异，像素 5/4 如实记录。**PR**：[`YuLing-Ai-Tech/yuling-ai-ppt`](https://github.com/YuLing-Ai-Tech/yuling-ai-ppt)。

### M05-02 Mini-App 敏感隔离与安全初始 Git 基线（P0，M05-01 可并行盘点，提交后置）
**动作**：文件分类清单，移动/隔离敏感文件到源码目录外、`.gitignore` 和允许提交文件白名单，秘密及依赖扫描、Git 初始化和最小首次提交，锁定 M05-01 引擎版本。**禁止**：`git add .`、敏感载荷上报、开源、推未审查历史。**验收**：扫描及人工抽查无凭证、可从新仓库重建项目，validate/build 通过；附 SHA、审查列表。**PR/首次提交**：[`YuLing-Ai-Tech/mini-app`](https://github.com/YuLing-Ai-Tech/mini-app)，经批准后推送。

### M05-03 跨平台环境与 Linux CI（P0，依赖 M05-01/02）
**动作**：Windows WSL2 配置说明、固定 pnpm/Node/Python/Playwright/Chrome 字体与 locale、测试镜像/Actions、最小权限及缓存；分别跑 TS 构建、43/43、Python、几何；像素独立待裁决。**验收**：新 PR 可见检查结果，Linux 上可复现，差异不伪报。**输出**：`BASELINE_MANIFEST.md` + CI YAML。

### M05-04 合同映射/部署边界与 v0.3 文档整理（P0，依赖版本稳定）
**动作**：给 DeckOutline 逐字段列来源/敏感等级→ Visual、Shape、Render、Legacy 内部字段；列 SaaS/Hybrid 数据流与禁出站字段；把五份设计文档放入 [`YuLing-Ai-Tech/dvsk-platform`](https://github.com/YuLing-Ai-Tech/dvsk-platform) 的 `docs/` 并写版本索引。**验收**：无未处理字段、Architect 对映射/出站设计签批。**无 Renderer 重写**。

## M1：三契约与安全 Adapter（Gate: M0.5 全部批准）

### M1-01 三契约 JSON Schema/TS 类型与跨版本测试
**动作**：定义 VisualSemanticContract/ContentShapeContract/RenderContract 三 Schema、ID、版本、状态机、枚举/范围，拒绝额外字段，产生类型与模拟例子。**验收**：合法/未知字段/损坏 schema/版本升级/超长/恶意脚本全部有单元测试；只用虚构例子。

### M1-02 Outbound/Inbound Gateway 最小拒绝路径
**动作**：Hybrid 模式默认不发任何未批准真实内容；本地生成 Shape，出站明确白名单、分类与审计；云端回包独立验证，拒绝未知 template、脚本/远程资源、越界参数、缺少确认的状态。**验收**：注入、数据泄漏、未知字段、越权策略都 fail-closed。SaaS/Hybrid 分离配置。

### M1-03 Legacy Adapter 与模板映射
**动作**：批准后的 Render Contract + 本地 slot bindings 转 Legacy DeckOutline；对 31 种既有 type:variant 形成映射表，首版只打通 1–3 个已验证布局；未映射显式失败或白名单 fallback。**验收**：引擎原 43/43 不退化；相同输入可复现；文本溢出可控且有回退。

## M2：用户可见的视觉语义 MVP（M1 核心链通过）

### M2-01 术语数据 v0.1
**动作**：从 B v0.1 审核 30–50 个初始概念；字段含规范名、别名、自然语言触发、视觉特征、禁用/适用场景、示例授权、映射参数、来源、版本；区分标准术语与内部描述性标签。**验收**：重复词、冲突词、不可执行术语有状态标记；无版权不明的外部图片被纳入发布包。

### M2-02 语义候选 API
**动作**：非敏感描述 → 2–4 候选、依据、可否渲染、样例 ID；低信心说明不确定、不要直接写用户确认。模型经 Adapter 替换；失败降级到静态检索。**验收**：固定 20+ 模糊描述评价集与反例，包括“花瓣展开”；结构化输出，错误稳定。

### M2-03 候选缩略图和用户确认界面
**动作**：Mini-App 中建立输入区域、三方案真实 SVG/HTML 预览、术语通俗解释、选中/组合/否定操作；存用户确认和版本号。**验收**：非设计用户能从 3 方案中选择，候选未确认不能进入最终执行；键盘/移动端可操作。

## M3：真实生成纵向闭环（M1+M2）

### M3-01 用户选择 → Contract → HTML PPT
**动作**：使用虚构内容将已确认 VSC、Shape、Render 转换至现有 TS Renderer/Python Engine；页面可演示、单文件可预览；错误信息清晰。**验收**：5 个卡片花瓣布局或经批准的等价现有布局通过几何、图表、动效和快进 QA；不伪称所有布局原生支持。

### M3-02 内容长度变体与本地修正
**动作**：短/长/混合图文三组虚构数据，溢出时本地按预先批准的规则调整或切换 Grid，不把真实内容返回云端。**验收**：无静默截断、无 HTML 注入、日志仅安全字段。

## M4：图片与联网动态词典（M3 之后）

### M4-01 授权参考图接收和视觉解构
**动作**：明确 SaaS/Hybrid 上传分类和授权；图像解构元素/空间关系、术语候选、置信/证据标注；安全扫描和文件大小、格式限制。**验收**：未知来源/敏感图不能外传；图片中的提示注入不执行。

### M4-02 联网发现来源与入库候选
**动作**：受控搜索/抓取，记录 URL、抓取日期、许可证、来源和图像许可；生成 candidate，不允许自动写正式词典；去重/相似聚类。**验收**：遵守来源访问/许可限制，证据可追溯，恶意页面不控制执行。

### M4-03 审核发布版本化词典
**动作**：提议→审核→发布→回滚，先对比已有术语、组合概念、真正新增；管理 lexicon_version，设离线缓存。**验收**：禁止未审核新术语污染生产，版本与已发布 RenderContract 可追溯。

## M5：Hybrid 试点（M1–M4 Gate）

### M5-01 企业本地 Slot Binding 与隔离测试
**动作**：企业私有文档/DB 仅本地读取、转换和注入；云端仅接受出站策略批准的抽象内容 Shape，双向 Gateway 执行不可绕过。**验收**：用合成客户资料，检测日志/网络/存储没有内容泄露；不使用生产真实数据验收。

### M5-02 企业发布与部署
**动作**：预览、签核/版本锁定（按 MVP 范围）、HTML 本地留存、风险审计、回滚；公网 COS 仅 SaaS 路径。**验收**：不依赖未授权外网调用、合同版本可回退、留存策略可检查。

## 拒绝通行条件
未冻结引擎、Git/密钥不安全、Schema 未审、Hybrid 私有数据可外传、无单元+集成证据、像素测试被虚报、客户代码混入开源，都直接阻断 Gate。
