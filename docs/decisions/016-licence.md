# 016: Licence: all rights reserved for now

- **Date:** 2026-11-22
- **Status:** Accepted

## Context

The repo is public on GitHub but has no licence. Without one, the law treats the code as "all rights reserved": anyone can read it, but nobody may copy, reuse or sell it. Whether Kiseki will be paid, free or open source isn't decided yet.

## Choice

- **No open-source licence for now.** The README says "© Kiseki authors. All rights reserved."
- **Decide again before the public launch,** once the business model is clear.
- **Copied third-party code keeps its own licence,** in a `LICENSE` file beside it (e.g. the MIT-licensed skills in `.claude/skills/`).

## Alternatives

- **MIT or Apache 2.0:** anyone may use the code for anything, including a paid copy of Kiseki. Apache adds a patent promise. Best for libraries.
- **AGPL-3.0:** open, but anyone running a changed version as a website must publish their code (used by Cal.com and Plausible).
- **FSL (Functional Source License):** usable except to build a competing product; each version becomes MIT or Apache after 2 years (used by Sentry).
- **Make the repo private:** hides the code, but the public repo costs nothing and free CI minutes come with it.

## Why

Moving from strict to open is easy at any time; moving from open back to strict isn't, because code already released under an open licence stays open forever. Waiting keeps every option available until the business model is known.
