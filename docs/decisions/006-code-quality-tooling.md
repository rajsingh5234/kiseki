# 006: Formatter, linter and pre-commit hook setup

- **Date:** 2026-11-17
- **Status:** Accepted
- **Extends:** decision 001 §13 (oxlint + oxfmt) and §20 (pre-commit hook; this decision adds lint to the hook)

## Choice

### Formatter: oxfmt (`.oxfmtrc.json`)

- 3-space indentation; Markdown keeps 2, because 3 misaligns numbered lists (`10.   **Text**`).
- Imports sorted automatically. Tailwind class sorting is switched on when Tailwind arrives.
- `pnpm-lock.yaml` is never formatted: pnpm owns it.
- Scripts: `pnpm format` (fix), `pnpm format:check` (CI).

### Linter: oxlint with type-aware rules (`.oxlintrc.json`)

- Plugins: `eslint`, `typescript`, `unicorn`, `oxc`, `import`, `promise`. React, accessibility, Vitest and Node plugins are added with the web app, tests and API. Module-boundary rules come with the first modules.
- Categories: `correctness` and `suspicious` are errors, `perf` is a warning, `pedantic` and `style` are off (taste and noise; the formatter owns style).
- Type-aware rules on (`oxlint-tsgolint`, built on TypeScript 7): catches forgotten `await`s and unhandled promises.
- Script: `pnpm lint`. It fails with "No files found" until the repo has code; this is kept on purpose, because hiding it would also hide an ignore rule that skips all our code.

### Pre-commit hook: Lefthook (`lefthook.yml`)

On every commit, for staged files only, in order (stops at the first failure):

1. **format:** oxfmt fixes the files and adds the fixed version to the commit.
2. **lint:** oxlint with `--deny-warnings` (warnings block too, the same rule as CI). Lint never auto-fixes: its fixes change behaviour, so the developer reviews them.

Lefthook's own install script is denied (`allowBuilds: lefthook: false`); the root `prepare` script (`lefthook install`) installs the hook after every fresh `pnpm install` instead.

## Alternatives

- **Husky + lint-staged:** the most popular pair, but two tools to set up and connect, and Husky hasn't had a release since 2024.
- **simple-git-hooks + nano-staged:** tiny, but also two tools, with a smaller community.
- **Format-only hook** (the first plan): commits never get blocked, but lint errors reach CI after the push.
- **Lint on pre-push:** instant commits, but errors pile up across commits.

## Why

- Lefthook does the whole job in one small file: staged files, re-adding fixed files, keeping partially staged changes safe, running jobs in order.
- Linting in the hook catches bugs seconds after writing them, not minutes later in CI, and keeps "fix lint" commits out of history.
- CI stays the real gate: a hook can be skipped with `--no-verify`.

## Verified

Tested on a fresh clone (2026-11-17): `pnpm install` installs the hook; a badly formatted file is fixed and committed; a forgotten `await` blocks the commit (`no-floating-promises`); a clean file passes. A commit takes about 0.2 s, or about 1.5 s the first time.

## Notes

- **Lefthook 2.2.1, not 2.2.2:** our `trustPolicy: no-downgrade` (decision 004) blocked 2.2.2, which the maintainer published by hand without provenance after a CI failure (lefthook issue #1600). We stayed on 2.2.1, which has provenance, rather than add a security exception. Upgrade when a release with provenance comes through.
- Tools are pinned to exact versions (`--save-exact`); upgrades happen on purpose, later via an update bot.
