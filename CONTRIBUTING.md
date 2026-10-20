# Collaboration workflow

The initial bootstrap commit is the only direct push to `main`.

1. Claim one approved GitHub Issue.
2. Create `issue/<number>-<short-slug>` from the latest `main`.
3. Add tests and evidence before implementation when behavior changes.
4. Run `pnpm validate`, Gitleaks and `git diff --check`.
5. Open a pull request linked to the Issue and record OS/runtime evidence.
6. Wait for the repository owner's approval before merging.

The Windows development environment is WSL2 Ubuntu with Node.js 22 and pnpm 9.
Native Windows is used only for path-handling checks. GitHub Actions on pinned
Ubuntu is the shared CI environment.

The `main` ruleset enforces the pull-request, review and CI gates. Contributions
submitted for inclusion are licensed under Apache-2.0 unless explicitly marked
otherwise before submission.
