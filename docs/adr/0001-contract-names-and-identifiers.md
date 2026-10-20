# ADR-0001: Contract names and identifiers

- Status: Proposed
- Date: 2026-10-20

## Context

Historical drafts use both `LayoutContract` and `RenderContract`, and the
Content Shape example uses `shape_id` while other contracts use `contract_id`.
These differences create branching validation and ambiguous public interfaces.

## Options

1. Keep draft-specific names and IDs. Lowest editing cost, but every consumer
   needs special cases and the ambiguity becomes a compatibility obligation.
2. Use three fixed names and one identifier field. Small migration cost in
   fixtures; simplest validation and observability.
3. Introduce a generic `Contract` union only. Compact, but obscures domain
   ownership and encourages optional-field schemas.

## Decision

Adopt exactly these public contract names for executable v0.1:

- `VisualSemanticContract`
- `ContentShapeContract`
- `RenderContract`

Each uses `schema_version`, `contract_id`, `contract_type`, `status` and
`trace_id`. Contract IDs use type prefixes `vsc-`, `csc-` and `rc-`. The field
`shape_id` and the name `LayoutContract` are not accepted aliases. Unknown
fields are rejected rather than stripped.

The first executable schema version is `0.1.0`. Document package version 0.3
does not imply an executable schema version.

## Consequences

- Historical documents remain unchanged under `docs/reference/`.
- Fixtures and APIs use one identifier vocabulary.
- Supporting a future alias requires a separate versioned migration; silent
  compatibility is forbidden.
