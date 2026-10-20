# DVSK Hybrid v0.3 — 三契约与 API 规约（待评审）

状态：设计候选；**实例仅为占位演示，不包含企业数据**。

## 1. 契约间关系
`VisualSemanticContract` 描述**视觉意图与候选**；`ContentShapeContract` 描述**允许出站的抽象数据形状**；`RenderContract` 描述**已确认模板、槽位映射与本地渲染规则**。三类契约需要稳定 id、版本、来源和状态；模型建议不可直接变成发布模板。

## 2. VisualSemanticContract（云端）
```json
{
  "schema_version": "0.3.0",
  "contract_id": "vsc-demo-001",
  "status": "proposed",
  "input_kind": "text",
  "intent_summary": "模块围绕中心扇形展开，具有轻微悬浮层次",
  "candidates": [
    {"term_id":"layout.fan_radial","label_zh":"扇形放射排列","confidence":0.81,"evidence":["从中心向外展开"],"renderable":true,"example_id":"fan-demo-1"},
    {"term_id":"depth.floating_cards","label_zh":"分层悬浮卡片","confidence":0.74,"evidence":["有一点悬浮感"],"renderable":true,"example_id":"float-demo-1"}
  ],
  "user_confirmation":{"state":"pending","selected_term_ids":[]},
  "lexicon_version":"0.1.0"
}
```
置信分数是模型参考值，不等于独立校准概率。发布前必须将 `user_confirmation.state` 置为 `confirmed` 并有有效确认动作。

## 3. ContentShapeContract（本地生成、出站前强制校验）
```json
{
  "schema_version":"0.3.0",
  "shape_id":"shape-demo-001",
  "classification":"ABSTRACT_SHAPE",
  "task_type":"management_report",
  "slides":[{"slide_key":"slide-1","slots":[
    {"slot_key":"core","kind":"short_title","max_chars":24},
    {"slot_key":"petal","kind":"text_card","count":5,"title_chars_range":[4,16],"body_chars_range":[0,100]}
  ]}],
  "disclosure":{"policy_id":"company-egress-v1","approved_fields":["task_type","slides.slot_key","slides.kind","slides.count","slides.max_chars","slides.title_chars_range","slides.body_chars_range"]}
}
```
`slot_key` 是抽象值，不能携带真实部门名；生产环境应优先用枚举标识。即使仅发送结构，也应有出站审计和重识别风险策略：少量唯一指标或特殊组织结构本身可能敏感。

## 4. RenderContract（云端草案、本地验证后使用）
```json
{
  "schema_version":"0.3.0",
  "contract_id":"render-demo-001",
  "design_ref":{"template_id":"radial-card-v1","template_version":"1.0.0","lexicon_version":"0.1.0"},
  "layout":{"family":"fan_radial","item_count":5,"arc_degrees":140,"radius_ratio":0.34,"overlap_policy":"forbid","elevation":"subtle"},
  "slots":[{"id":"core","type":"short_title","required":true},{"id":"petal","type":"text_card","repeat":5,"required":true}],
  "fallback":["reduce_spacing","use_two_row_cards","switch_to_grid_v1"],
  "runtime_policy":{"external_scripts":false,"external_assets":false,"allow_html_in_slots":false},
  "approval":{"state":"pending","template_digest":"sha256:TO_BE_CALCULATED_BY_PUBLISH_PIPELINE"}
}
```
`template_digest` 示例为占位，实际必须由发布流水线计算并由可信公钥/签名关联签署；不得相信模型填写哈希/签名。企业真实内容的 `slot_id -> data_binding` 映射应留在本地独立存储，**绝不可出现在云端 RenderContract 内**。

## 5. 字段与验证规则
- 严格拒绝未知核心字段、无效枚举、超界数字、超过限额的数组、任意 CSS/JS 表达式；不允许模型提供 HTML 字符串作为布局程序。
- `arc_degrees` 允许建议区间 60–240，`radius_ratio` 0.1–0.6（首版约束，须经实际渲染测试标定）；`item_count` 1–8，高于上限改用其他布局；阴影仅允许枚举。
- `RenderContract` 的 template_id 必须在本地受信任的已签署组件注册表；版本不兼容返回显式错误。
- 渲染器需分离结构校验和布局测量；对实际内容导致的过长文本、碰撞、图表不可达使用本地确定性 fallback。
- 强制版本化：同 major 版本可由发布端作向后兼容保障；破坏性字段变化提升 major；记录回滚所需 template/lexicon 版本。

## 6. API 草案
| 方法 | 端点 | 请求 | 响应 | 位置 |
|---|---|---|---|---|
| POST | `/v1/semantic/interpret` | `text/approved_image_ref` + abstract context | `VisualSemanticContract` | 云 |
| GET | `/v1/semantic/examples?term_id=` | term_id | 许可的缩略样例及来源 | 云 |
| POST | `/v1/semantic/confirm` | contract_id + selected_ids | 确认版本 | 云 |
| POST | `/v1/design/plan` | confirmed VSC + approved CSC | draft RenderContract | 云 |
| POST | `/v1/lexicon/discover` | 有权限的 query/url | 候选条目任务id | 云 |
| POST | `/v1/lexicon/review` | candidate_id + approve/reject | 审查记录 | 云管理端 |
| POST | `/local/render` | 本地 RContract + 私有 bindings | HTML/QA | 本地 |

所有云端变更请求要求身份认证、租户隔离、速率限制和 idempotency key；图片上传须独立文件大小/MIME/恶意内容检查以及企业策略判定。

## 7. 推荐错误码
`EGRESS_DENIED`（拒绝出站）、`IMAGE_NOT_AUTHORIZED`、`SCHEMA_INVALID`、`TEMPLATE_UNTRUSTED`、`VERSION_UNSUPPORTED`、`LAYOUT_OVERFLOW`、`RENDER_FALLBACK_APPLIED`、`CLOUD_UNAVAILABLE`。

## 8. 联调例子：花瓣状悬浮布局
输入五组抽象短标题与描述字数区间。云端推荐 fan_radial + floating_cards；用户确认；云端返回 `radial-card-v1`。本地以三组完全虚构的长短内容进行绑定。若覆盖，先缩小空隙，再转换双行卡片；若仍失败退化为网格布局，向用户展示降级原因，并将结构化失败报告留在本地。

## 9. 必需测试
- JSON Schema 契约与恶意载荷测试；签名、组件白名单、越界和版本降级测试。
- 出站测试：私有字符串、部门名、指标名、图片 EXIF、URL token、嵌入文本、日志字段全部拦截。
- 布局测试：不同字数、不同字体、字体缺失、分辨率、图表元素重叠；截屏差分人工抽查。
- 断云测试：云不可用时只能使用已有授权且兼容的本地缓存设计。
