# Hybrid deployment and data boundary

Status: proposed for Architect review

## Component ownership

| Component | Location | Responsibility | Must not do |
|---|---|---|---|
| Mini-App | User-controlled app environment | Authentication, user interaction, local content, bindings, deck composition, storage and sharing | Send a complete DeckOutline or private bindings to DVSK cloud |
| Outbound Gateway | Local DVSK library/CLI | Classification check, field allowlist, schema validation, decision record | Infer that unclassified content is safe or redact after transmission |
| DVSK design intelligence | Future cloud boundary | Public visual semantics, candidates and abstract layout planning | Receive customer text, metrics, credentials or local bindings |
| Inbound Gateway | Local DVSK library/CLI | Schema/version/status validation, template registry and digest checks | Execute arbitrary HTML, CSS, JavaScript, URLs or unknown templates |
| Legacy Adapter | Local DVSK library | Approved RenderContract plus local bindings to one Legacy Slide | Produce a whole deck, read customer sources or bypass Mini-App validation |
| Mini-App renderer/QA | Local app environment | DeckOutline validation, deterministic HTML generation request and browser QA | Trust Adapter output without its own schema check |
| Python/HTML engine | Local renderer checkout | Assemble local assets into one HTML file | Call models, read cloud credentials or accept remote executable assets |

The first Gateway is not an HTTP service. A CLI exists for deterministic
inspection and cross-platform evidence; library calls are the runtime contract.

## Allowed boundary flow

1. Mini-App classifies the visual phrase and requested reference provenance.
2. Outbound Gateway accepts only an explicitly approved `PUBLIC_REFERENCE`
   visual intent plus a strict `ABSTRACT_SHAPE` contract.
3. A future cloud service may return VisualSemanticContract and RenderContract
   data only. No executable source or private binding is accepted.
4. Inbound Gateway validates the response against executable schemas and the
   local trusted template registry.
5. User confirmation and local approval precede Adapter execution.
6. Legacy Adapter combines the approved page contract with local bindings.
7. Mini-App revalidates the Legacy Slide, composes the deck, renders locally
   and executes browser QA.

M1 uses deterministic fixtures instead of a live cloud call. The same Gateway
path is exercised without opening a network connection.

## Outbound allowlist

Allowed fields are limited to contract metadata, enum task type, anonymous
slide/slot keys, slot kinds, counts, length ranges, an approved policy ID and
the exact list of disclosed paths. Everything else is denied by default.

The following never leave in v0.1:

- deck title, audience, goal or generated slide prose;
- department, customer, person, project or product names;
- real metrics, chart values, table cells, formulas or research snippets;
- source URLs containing tokens, local paths, file metadata or image EXIF;
- local binding values, share codes, owner hashes, credentials or cookies;
- private images, screenshots, documents, logs or rendered HTML.

Pattern detection is defense in depth only. It may reject an otherwise allowed
request, but cannot change `PRIVATE_CONTENT` or `RESTRICTED` to an allowed class.

## Inbound allowlist

- Schema version must be supported exactly during v0.1.
- Contract state must permit the requested operation.
- Template ID, version and digest must match the local registry.
- Numeric layout values and slot counts must be within schema limits.
- HTML, CSS, JavaScript, remote assets, arbitrary URLs and unknown fields are
  rejected before Adapter execution.
- Cryptographic publisher signatures and key rotation are not implemented in
  M1. The absence of that production trust layer blocks production deployment.

## Logs and audit

Gateway decisions contain `trace_id`, contract identifiers, schema/template
versions, decision code, issue path and rule. They must not contain request
payloads, binding values, prompts, snippets or rendered content.

Local application audit may record binding completion and QA results under its
own access policy. Cloud telemetry may record only anonymous contract/template
metadata, latency and error codes after a separate approved implementation.

## Storage, sharing and failure behavior

- DVSK v0.1 adds no database and persists no runtime payloads.
- Mini-App retains ownership of generated HTML storage and share-code access.
- Cloud unavailable: use only a locally approved, compatible cached contract or
  report design intelligence unavailable; never send more content to recover.
- Schema/version/template failure: reject with a stable code; no permissive
  parsing or generic template fallback.
- Layout unsupported: apply only the explicitly registered `mind-map-v1`
  fallback and return `LAYOUT_FALLBACK_APPLIED`.
- Layout or browser QA failure after local binding: keep the failure local and
  request local correction; never return content to cloud for diagnosis.

## Approval and release

The Architect approves contract and boundary ADRs, trusted registry changes,
visual evidence and merges. The collaborator supplies independent WSL2
reproduction. Merge, tag, deployment and production authorization are separate
events; M1 has no deployment authorization.
