# 018: Every change reaches `main` through a pull request

- **Date:** 2026-11-23
- **Status:** Accepted

## Context

Until now, changes were committed straight to `main`, and CI ran only afterwards, so `main` could be broken. We compared our flow with GitHub flow, DORA's research on trunk-based development, and the rules that Vite, Vitest, Nuxt, tRPC, Fastify, Oxc, Turborepo and TanStack enforce on `main`. All of them put a pull request and required checks between a change and `main`. From build-order step 5, every merge to `main` goes live, which raises the stakes.

## Choice

- **GitHub flow, kept short (trunk-based):** every change, docs included, goes on a short-lived branch (hours to a day or two) and into `main` through a pull request; a merged branch is deleted.
- **A ruleset "Protect main"** on the default branch:
  - `main` can't be deleted or force-pushed, and its history stays linear;
  - a pull request is required, with **0 approvals**: GitHub doesn't allow approving your own pull request, and there is one human maintainer (as in Nuxt, Oxc and TanStack). The review happens before the pull request is opened; once the maintainer has approved the change and every check is green, the coding assistant (Claude Code) merges it (added 2026-11-23);
  - **squash merge only**: one pull request becomes one commit on `main`, titled in conventional format with its number, e.g. `feat: add timetable (#12)`;
  - required checks: `Lint, format and types`, `Tests`, `Dependency audit`, and no zizmor code-scanning alerts (as in Vitest);
  - a branch doesn't have to be updated each time `main` moves (as in Vite, Oxc and Turborepo);
  - **no bypass**, the owner included; in an emergency the ruleset is switched off briefly in Settings.
- **A new advisory with no fix blocks merges** until it is handled as [decision 004](004-supply-chain-security.md) says (a recorded exception); a fix that exists arrives through Renovate's pull request.

## Alternatives

- **Pushing straight to `main`** (until now): fastest, but `main` can break, and nothing enforces the checks.
- **Required approvals (1 or 2, as in Vite or Fastify):** right for teams; impossible with one human, since GitHub doesn't allow approving your own pull request.
- **A merge queue (Nuxt, tRPC):** tests pull requests together before merging; worth it only with many pull requests a day.
- **Signed commits (shadcn/ui, Turborepo):** prove who made each commit; reconsider when more people join.
- **Long-lived branches (Git flow):** DORA links them to slower, riskier delivery.

## Later

- A check that pull request titles follow the conventional format (as in Vite, Oxc and tRPC).
- At least one required approval once a second human maintainer joins.
