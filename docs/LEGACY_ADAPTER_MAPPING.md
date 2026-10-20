# Legacy Adapter mapping

Status: proposed for Architect review

Public baselines: Mini-App `ed8cbb8b316e5b572f45a93faca550a41a3b265e`;
engine `b1a96ad0c335316c9bb46e07ba77f62483a57e85`

Both are tagged `public-baseline-2026-10-20`. They are immutable compatibility
inputs; moving `main` references are not used for this mapping.

## Purpose

`DeckOutline` is the Mini-App's internal content-and-rendering model. It is not
a DVSK public contract and must never cross the Hybrid boundary as a whole.
DVSK v0.1 projects only abstract shape out of the local environment and adapts
an approved page-level `RenderContract` back to one Legacy Slide using separate
local bindings.

## Classification vocabulary

| Classification | Meaning | Boundary rule |
|---|---|---|
| `PUBLIC_REFERENCE` | Public or explicitly authorized reference material | May leave the local environment only after policy approval and provenance capture |
| `ABSTRACT_SHAPE` | Counts, bounded lengths, enum kinds and anonymous slot identifiers | May leave only through the outbound allowlist |
| `PRIVATE_CONTENT` | Customer wording, labels, values, sources and business context | Local only |
| `RESTRICTED` | Credentials, personal data, secrets or regulated information | Local only and never logged by DVSK |

Classification is explicit policy input. Pattern matching may add a rejection,
but cannot promote private data to an allowed classification.

## Deck-level fields

| DeckOutline field | Source and typical classification | DVSK ownership | v0.1 behavior |
|---|---|---|---|
| `title` | User/model text; `PRIVATE_CONTENT` by default | Local composer | Never copied to an outbound contract; synthetic fixture only in tests |
| `audience` | User context; `PRIVATE_CONTENT` | Local composer | Reduced only to an approved task enum when shape is derived |
| `goal` | User context; `PRIVATE_CONTENT` | Local composer | Never sent verbatim |
| `skill.id/version` | Controlled enum; `ABSTRACT_SHAPE` | Mini-App | Not part of the first public contracts; fixed by the local test composer |
| `skill.selectedBy` | Local interaction fact | Mini-App | Local audit only |
| `design.narrative` | Controlled enum | RenderContract candidate | Accepted only from a bounded enum and revalidated locally |
| `design.mood` | Controlled enum | RenderContract candidate | Accepted only from a bounded enum and revalidated locally |
| `design.palette` | Controlled enum | RenderContract candidate | Accepted only from a bounded enum and revalidated locally |
| `design.density` | Controlled enum | RenderContract candidate | Accepted only from a bounded enum and revalidated locally |
| `research` | URLs, snippets and evidence; `PUBLIC_REFERENCE` or `PRIVATE_CONTENT` | Mini-App research pipeline | Not accepted by DVSK v0.1 contracts or Adapter |
| `motionPlan` | Deterministic local output | Mini-App motion resolver | Not supplied by cloud; generated and fingerprinted locally |
| `slides` | Mixed content, data and shape | Mini-App | Only a shape projection may leave; Adapter returns one validated slide at a time |

## Common slide fields

| Legacy field | Classification | Contract or binding source | Rule |
|---|---|---|---|
| `id` | Local identifier | Local composer | Generated locally; not reused as a cloud contract identifier |
| `type`, `variant` | `ABSTRACT_SHAPE` | Trusted template registry | Adapter maps a registered template to an exact allowed pair |
| `title`, `subtitle`, `eyebrow`, `emphasis`, `takeaway` | `PRIVATE_CONTENT` | Local bindings | Length checked locally; never present in RenderContract |
| `theme` | Controlled enum | Approved RenderContract | Revalidated against the Mini-App enum |
| `sourceIds` | Local evidence reference | Local bindings/research | Never placed in the cloud RenderContract |
| `dataStatus`, `source`, `unit`, `note` | Mixed provenance/content | Local bindings | Local only; source text and units are not Shape fields |
| `story.question/claim/implication/focusKeys` | Business narrative | Local bindings | Local only; no outbound projection in v0.1 |

## Slide type and variant coverage

All baseline variants are accounted for. Mapped does not mean enabled in DVSK
v0.1; only `mind-map-v1` is executable in the first registry.

| Legacy type | Baseline variants | Shape projection | v0.1 Adapter status |
|---|---|---|---|
| `cover` | `cinematic`, `split-hero` | title/tagline length classes | Local composer only |
| `bullets` | `feature-list`, `three-cards`, `spotlight` | item count and text ranges | Unmapped; fail closed |
| `comparison` | `versus`, `two-column` | two groups and item counts | Unmapped; fail closed |
| `process` | `flow`, `ladder`, `roadmap` | step count and length ranges | Unmapped; fail closed |
| `tree` | `mind-map`, `layer-stack` | root plus branch/item counts | `mind-map-v1` maps to `tree:mind-map`; `layer-stack` rejected |
| `venn` | `circles` | two sets and overlap counts | Unmapped; fail closed |
| `closing` | `quote`, `action-card` | summary/action counts | Local composer only |
| `kpi` | `dashboard` | metric count and numeric-presence flags | Unmapped; values always local |
| `chart` | `bar`, `line`, `donut`, `scatter`, `radar`, `stacked-bar` | series/axis/point counts and bounds | Unmapped; labels and values always local |
| `funnel` | `conversion` | stage count | Unmapped; labels and values always local |
| `matrix` | `quadrant` | quadrant and point counts | Unmapped; labels and coordinates local |
| `ranking` | `horizontal-bars`, `grouped` | entry/group counts | Unmapped; labels and values local |
| `heatmap` | `matrix` | row/column counts and scale enum | Unmapped; labels and values local |
| `methodology` | `score-model` | component count | Unmapped; formula, labels and weights local |
| `table` | `data-table`, `financial-return`, `highlight-table` | row/column counts and variant | Unmapped; headers, values and finance data local |

## First executable mapping

The trusted registry entry `mind-map-v1` accepts one root slot and two to five
branch slots. Local bindings contain the actual strings:

```json
{
  "root": "合成核心主题",
  "branches": [
    {"title": "模块一", "items": ["虚构说明"]},
    {"title": "模块二", "items": ["虚构说明"]}
  ]
}
```

The Adapter maps these bindings to `tree:mind-map`, escapes through the existing
Mini-App renderer and returns no `motionPlan`. The local composer provides deck
metadata, cover, supporting synthetic pages and closing; the existing motion
resolver adds a compatible local plan.

For the phrase “5 个模块像花瓣一样展开，略有悬浮感”, semantic candidates may
include `layout.fan_radial` and `depth.floating_cards`. Because no native radial
petal template exists at the pinned baseline, v0.1 applies `mind-map-v1` and
must emit `LAYOUT_FALLBACK_APPLIED` with requested and applied identifiers. It
must not label the rendered result as a native petal layout.

## Adapter rejection rules

- Unknown or disabled template IDs, versions or digests are rejected.
- Unapproved RenderContracts are rejected before bindings are read.
- Missing, extra, oversized or HTML-bearing bindings are rejected locally.
- Unmapped legacy types and variants have no generic fallback.
- Validation issues report paths and rule identifiers, never raw binding values.
- The same contract, registry and bindings must produce byte-equivalent Legacy
  Slide JSON.
