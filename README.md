# DVSK Platform

Open-source visual-semantic contract and policy layer for YuLing products.

DVSK converts approved visual intent and abstract content shape into validated,
executable design instructions. Enterprise content remains local; only fields
explicitly allowed by the outbound policy may cross the cloud boundary.

## Repository boundary

- This repository owns the three versioned contracts, outbound/inbound Gateway
  policy, the trusted template registry, CLI validation and legacy adapters.
- [`YuLing-Ai-Tech/mini-app`](https://github.com/YuLing-Ai-Tech/mini-app)
  owns the Next.js product, business API and the internal `DeckOutline` model.
- [`YuLing-Ai-Tech/yuling-ai-ppt`](https://github.com/YuLing-Ai-Tech/yuling-ai-ppt)
  owns deterministic Python/HTML rendering and visual QA.

The initial Gateway is a local TypeScript library and CLI. It does not listen
on a network port and does not call a model or external service.

## Bootstrap status

The repository currently contains only the reviewed engineering and governance
baseline. Executable contracts begin in M1-01 after the M0.5 mapping and
cross-platform baseline gates are approved.

## Development

```bash
corepack enable
corepack prepare pnpm@9.0.0 --activate
pnpm install --frozen-lockfile
pnpm validate
```

Use synthetic fixtures only. Never commit customer material, private content,
credentials, account exports or generated build output.

## License and package status

The code is licensed under Apache-2.0. Brand names and logos are not licensed
for reuse; see `TRADEMARKS.md`. `package.json` intentionally keeps
`"private": true` to prevent accidental npm publication; it does not describe
the GitHub repository visibility.
