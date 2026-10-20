# Repository instructions

- This public repository owns DVSK contracts, Gateway policy, the controlled
  template registry and compatibility adapters. It does not own the Mini-App UI
  or the Python/HTML renderer.
- Treat `VisualSemanticContract`, `ContentShapeContract` and `RenderContract`
  as public versioned interfaces. Contract changes require an approved ADR,
  fixtures and compatibility tests.
- Hybrid mode is deny-by-default. Never place customer text, real metrics,
  credentials, local bindings or private images in outbound contracts, logs,
  fixtures or CI artifacts.
- Use Node.js 22, pnpm 9 and TypeScript strict mode. Keep handwritten program
  files at or below 800 physical lines.
- The first Gateway is a library and CLI only. Do not add an HTTP listener,
  database, model call, crawler or production signing system without a separate
  approved Issue and plan.
- Work from an approved Issue on `issue/<number>-<slug>` and merge only through
  an owner-approved pull request. Never push directly to `main` after bootstrap.
