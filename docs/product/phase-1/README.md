# Phase 1

Phase 1 includes the foundation: the base every later feature stands on, so future features plug in without changing the app. There is no separate Phase 0.

Status: plan agreed (2026-11-21): goal, core journey, features and non-goals, foundation decisions and build order. Details marked "decide when building" are settled per feature.

> **Phase 1 goal:** Kiseki helps a small group (a UPSC aspirant and a DSA interview candidate first) **know what to study each day, stay consistent, remember what they learned, and see their progress toward their target dates**, across **one or more tracks** (ready-made or their own), on their phones and computers. It's built on a general foundation where new tracks, extensions and themes plug in later without rework.
>
> **Done when:** the Phase 1 features are built **and** both users use it daily for 4 weeks, by choice.

## Reading order

| #   | File                                                   | What it covers                                                                                                                              |
| --- | ------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | [Goal](01-goal.md)                                     | Who it's for, tracks, the four problems, how we'll know it worked                                                                           |
| 2   | [The daily journey](02-daily-journey.md)               | The daily loop: how the plan is made, different days, stability, finishing a block, study mode, unfinished work, review, revision, progress |
| 3   | [Syllabus and tracking](03-syllabus-and-tracking.md)   | The ready-made syllabus, the user's own syllabus, trackers and the dashboard                                                                |
| 4   | [Features and non-goals](04-features-and-non-goals.md) | Who uses v0.1 first, UPSC content, the v0.1 features, non-goals                                                                             |
| 5   | [Build order](05-build-order.md)                       | Vertical slices, the walking skeleton, the order, the feature slices                                                                        |
| —   | [Open questions](open-questions.md)                    | Details parked until the feature is built                                                                                                   |

## Foundation decisions

Each lives in one place, its decision record (with alternatives and sources):

- **Sign-in and sessions:** Google sign-in, invite-only, server-side sessions (not JWTs) → [decision 010](../../decisions/010-sign-in-and-sessions.md)
- **Offline:** the daily loop works offline, built ready for a later local-first app → [decision 011](../../decisions/011-offline-and-local-first-readiness.md)
- **Notifications machinery:** Web Push, a per-minute sweep, one record per occurrence, an outbox → [decision 012](../../decisions/012-notifications-machinery.md)
- **Data model concept:** events as the truth, overlays, UUIDv7, one owner per thing, deletion designed in → [decision 013](../../decisions/013-data-model-concept.md)
- **Theme system and motion engine** → [decision 014](../../decisions/014-theme-system-and-motion-engine.md)

## Elsewhere

- **Design** (references, themes, effects, motion): [docs/design/](../../design/)
- **Product-wide:** [principles](../principles.md); vision: [extension host](../vision/extension-host.md), [change and releases](../vision/change-and-releases.md)
