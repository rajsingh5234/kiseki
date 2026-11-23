# 004: Supply-chain security for dependencies

- **Date:** 2026-11-17
- **Status:** Accepted

## Context

In 2025 attackers stole npm maintainers' tokens and published poisoned versions of very popular packages (`chalk`, `debug` and others). Any project installing at the wrong moment got malicious code. Our dependencies are part of our attack surface.

## Choice

Keep pnpm 12's safe defaults and add one more check, all in `pnpm-workspace.yaml`:

| Protection                                                                                                           | Setting                            | Status              |
| -------------------------------------------------------------------------------------------------------------------- | ---------------------------------- | ------------------- |
| Don't install a version published less than 1 day ago                                                                | `minimumReleaseAge` (1440 minutes) | pnpm default, kept  |
| Dependencies can't run install scripts unless we approve each one                                                    | `allowBuilds`, `strictDepBuilds`   | pnpm default, kept  |
| A dependency of a dependency can't pull code from git or raw URLs                                                    | `blockExoticSubdeps`               | pnpm default, kept  |
| Stop the install if a package's new version has weaker publishing proof than earlier ones (a sign of a stolen token) | `trustPolicy: no-downgrade`        | **Turned on by us** |

## Audit exceptions

`pnpm audit` must stay clean, so a new problem stands out. When an advisory can't be fixed yet and doesn't reach us, we skip **that one advisory only** in `pnpm-workspace.yaml` (`auditConfig.ignoreGhsas`) and record it here. Each exception is removed as soon as a fixed version ships.

| Advisory                                                                               | Package and path                                    | Why it doesn't reach us                                                                                                                                                                          | Remove when                                                                        | Added      |
| -------------------------------------------------------------------------------------- | --------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------- | ---------- |
| [GHSA-fc5q-39xc-vjpf](https://github.com/advisories/GHSA-fc5q-39xc-vjpf) (high, ReDoS) | `picomatch` ≤ 4.0.7, via Vite and Vitest (dev only) | The attack needs a crafted glob pattern; picomatch only reads patterns we wrote in config files, never user input. Not in production: `pnpm audit --prod` is clean. No fixed version exists yet. | picomatch releases a fix: update, then delete the `ignoreGhsas` entry and this row | 2026-11-18 |

## Alternatives

- **pnpm defaults only:** good, but misses the stolen-token pattern that `trustPolicy` catches.
- **A paid scanning service** (e.g. Socket): deeper checks; reconsider when the project has a team and a budget.

## Why

Free, automatic protection against the most common real-world attacks, with no change to how we work.

## Risks and follow-ups

- A rare false alarm from `trustPolicy` when a maintainer legitimately changes how they publish: check it, then add the package to `trustPolicyExclude`.
- Approving install scripts (`allowBuilds`): approve only packages that really need them (e.g. `esbuild`), one by one, and say why in the commit.
- A dependency-update bot and vulnerability alerts come when CI is set up. CI runs `pnpm audit`, and the bot opens a pull request when a fix for an exception above ships. (Done 2026-11-23: Renovate and Dependabot alerts, see [decision 017](017-ci.md).)
