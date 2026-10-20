# DVSK public bootstrap baseline

- Public baseline date: 2026-10-20
- Repository status: public engineering bootstrap; no executable contracts
- Runtime: Node.js 22, pnpm 9, TypeScript strict mode
- Gateway shape: local library and CLI; no HTTP service
- Deployment policy: Hybrid deny-by-default

## Pinned downstream baselines

- Mini-App: `ed8cbb8b316e5b572f45a93faca550a41a3b265e`
- Python/HTML engine: `b1a96ad0c335316c9bb46e07ba77f62483a57e85`
- Shared public tag: `public-baseline-2026-10-20`

## Gate status

- M05-01 independent Windows/WSL2 reproduction: pending
- M05-04 legacy mapping and deployment boundary: pending
- M1 executable contracts and generated JSON Schema: not started

This manifest records repository facts, not production or deployment readiness.

The public baseline starts from one new root commit and excludes the prior
private Git history, Issues, pull requests, Actions logs and deployment traces.
