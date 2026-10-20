# ADR-0002: Page-level RenderContract and local composition

- Status: Proposed
- Date: 2026-10-20

## Context

The draft RenderContract contains one template, layout and slot collection,
while the existing DeckOutline contains six to twelve content-bearing slides,
research, motion and product metadata. Treating both as the same boundary would
expose private content and couple DVSK to the current application model.

## Options

1. Make RenderContract deck-level. This matches the old task wording but mixes
   narrative composition, private content and page layout again.
2. Make RenderContract page-level and adapt it to one Legacy Slide. A local
   composer remains responsible for DeckOutline and all private content.
3. Support both shapes in v0.1. This doubles validation and creates an unclear
   canonical representation before either path is proven.

## Decision

RenderContract v0.1 describes one page template, its bounded layout parameters,
slot specification, runtime policy, fallback order and approval metadata.

The Legacy Adapter accepts one approved RenderContract plus separate local
bindings and returns one deterministic Legacy Slide. It never emits research,
motion, storage or share metadata. Mini-App validates the slide and composes the
DeckOutline locally.

The first executable registry contains only `mind-map-v1`, mapped to
`tree:mind-map`. A request for a radial petal layout produces a structured
`LAYOUT_FALLBACK_APPLIED` diagnostic; it is not represented as native support.

## Consequences

- DVSK contracts remain independent of the current six-to-twelve-page deck
  requirement.
- Bindings and enterprise content never enter RenderContract.
- Full-deck semantic planning requires a future, separately reviewed contract;
  it is not smuggled into RenderContract through optional fields.
- The first end-to-end test uses a deterministic local six-page composer around
  the adapted page.
