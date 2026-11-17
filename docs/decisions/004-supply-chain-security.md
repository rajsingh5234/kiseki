# 004: Supply-chain security for dependencies

- **Date:** 2026-11-17
- **Status:** Accepted

## Context

In 2025 attackers stole npm maintainers' tokens and published poisoned versions of very popular packages (`chalk`, `debug` and others). Any project installing at the wrong moment got malicious code. Our dependencies are part of our attack surface.

## Choice

Keep pnpm 12's safe defaults and add one more check, all in `pnpm-workspace.yaml`:

| Protection | Setting | Status |
| --- | --- | --- |
| Don't install a version published less than 1 day ago | `minimumReleaseAge` (1440 minutes) | pnpm default, kept |
| Dependencies can't run install scripts unless we approve each one | `allowBuilds`, `strictDepBuilds` | pnpm default, kept |
| A dependency of a dependency can't pull code from git or raw URLs | `blockExoticSubdeps` | pnpm default, kept |
| Stop the install if a package's new version has weaker publishing proof than earlier ones (a sign of a stolen token) | `trustPolicy: no-downgrade` | **Turned on by us** |

## Alternatives

- **pnpm defaults only:** good, but misses the stolen-token pattern that `trustPolicy` catches.
- **A paid scanning service** (e.g. Socket): deeper checks; reconsider when the project has a team and a budget.

## Why

Free, automatic protection against the most common real-world attacks, with no change to how we work.

## Risks and follow-ups

- A rare false alarm from `trustPolicy` when a maintainer legitimately changes how they publish: check it, then add the package to `trustPolicyExclude`.
- Approving install scripts (`allowBuilds`): approve only packages that really need them (e.g. `esbuild`), one by one, and say why in the commit.
- A dependency-update bot and vulnerability alerts come when CI is set up.
