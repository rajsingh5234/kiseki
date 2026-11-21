# 013: Data model concept

- **Date:** 2026-11-21
- **Status:** Accepted
- **Listed in:** [Phase 1 plan](../product/phase-1/README.md) (Foundation decisions)

## Context

The data model is the decision hardest to change once users exist. Many data decisions were made across Phase 1 planning (permanent topic IDs, users' own layers over shared templates, append-only study events, device-created IDs, a stable day plan). This file gathers them into one concept and adds the rules that are cheap on day one and costly later. Tables and columns are designed feature by feature during development.

## Choice

### The main things stored

| Group                                                   | Things                                                                                                                                                               |
| ------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **People and access**                                   | User (time zone, day-end hour, week start, settings) · Sign-in method (several per user) · Session (only a token hash) · Invite                                      |
| **Shared content** (from data files, same for everyone) | Track template (version, stages) · Template topic (subject → topic or DSA problem; permanent ID, labels, resources)                                                  |
| **Each user's layer**                                   | Enrolment (the user follows a track: target date, stage, revision slider) · Topic change (a change to a template topic, or a topic the user added)                   |
| **Planning**                                            | Routine (weekly blocks) · Day change (light day, day off, copied routine, marked in advance) · Day plan (the fixed plan for one study day)                           |
| **Study history**                                       | Study event (everything done; only ever added; device-created ID and two times) · Topic state (strength, next revision date; calculated from events and rebuildable) |
| **Notifications**                                       | Push subscription · Notification occurrence (one per user + session + date)                                                                                          |
| **Security record**                                     | Sign-in and session events                                                                                                                                           |

Designed but not in v0.1: weekly and monthly targets, custom trackers, dashboard layouts, flashcards, custom tracks (a template owned by a user), installed extensions and themes, roles.

### Rules

1. **Events are the truth** for study history; strength, streaks and progress are calculated from them. The day plan is stored on purpose, so today stays stable.
2. **Users' layers are overlays:** they store only a user's changes to a shared template, never a copy, so template fixes reach everyone and every user's progress points to the same permanent topic IDs.
3. **IDs are UUIDv7**, created on the device when an item is created: offline-safe, collision-free when synced later, and time-ordered so indexes stay fast (Postgres 18 has `uuidv7()` built in). An ID is never a security check, and it reveals its creation time (harmless here).
4. **All times are stored in UTC with the time zone**; changeable things record when they were created and last updated.
5. **One owner per user-owned thing, one authorization layer:** every access goes through one check, `can(user, action, thing)`. In v0.1 its only rule is ownership. Checks name actions, never roles, so roles (admin, author, support) and relationships (a coach seeing a student) plug in later. Tests try to read other users' data (the "insecure direct object reference" bug). Row-level security in Postgres as a second safety net is decided at the database setup step. Extension permissions stay a separate system.
6. **Deletion is designed in:** everything a user owns links back to them, so deleting an account removes all of it, events included (the one exception to "events are never changed"). Soft delete with a 30-day undo only where undo matters, then real erasure: a "deleted" flag alone isn't erasure. No personal data in logs beyond IDs.
7. **Privacy law:** India's DPDP Act and Rules 2025 (most duties from about May 2027; breach reporting within 72 hours) apply at public launch, which rule 6 prepares for. Users under 18 need verifiable parental consent: a public launch item, since all Phase 1 users are adults.

## Alternatives

- **Copying a template into each user's account:** simpler, but fixes and yearly changes in exam patterns would never reach existing users without merging into every copy, and comparing users per topic becomes hard.
- **Storing current state only** (overwriting a topic's status instead of recording events): simpler tables, but no history, unsafe offline sync, and strength can't be recalculated when the formula improves.
- **Numeric IDs created by the database:** compact, but offline devices can't create them, so items made offline need temporary IDs and remapping.
- **Random UUIDs (v4):** device-safe, but random order makes indexes slower than time-ordered UUIDv7.
- **Roles from day one:** no Phase 1 user needs them (admin jobs are done by command); the action-based check keeps the door open.
- **Organisations or multi-tenancy from day one:** Phase 1 has individual users; coaches and groups come later as relationships.

## Why

One concept makes the scattered decisions consistent before code depends on them, and decides what must exist first. Events, overlays, device-created time-ordered IDs and a single authorization layer are cheap now and very expensive to retrofit; designing deletion now avoids a scramble before the privacy law applies.

## Sources

- Neon, [UUIDv7 in Postgres 18](https://neon.com/postgresql/18/uuidv7-support); Nile, [UUIDv7 comes to Postgres 18](https://www.thenile.dev/blog/uuidv7); Hashrocket, [Postgres 18's UUIDv7](https://hashrocket.com/blog/posts/postgresql-18-s-uuidv7-faster-and-secure-time-ordered-ids).
- Akoode, [multi-tenant decisions that cost later](https://www.akoode.com/blog/multi-tenant-saas-architecture); erflow, [database design patterns for SaaS](https://erflow.io/en/blog/database-design-patterns-saas): enforce ownership in one place, ideally also in the database.
- thoughtbot, [The hard truth about soft deletion](https://thoughtbot.com/blog/the-hard-truth-about-soft-deletion); Safeguard, [soft vs hard delete of personal data](https://safeguard.sh/resources/blog/soft-delete-vs-hard-delete-personal-data): a deleted flag isn't erasure; purge after a grace period.
- Wikipedia, [Digital Personal Data Protection Rules, 2025](https://en.wikipedia.org/wiki/Digital_Personal_Data_Protection_Rules,_2025); Legismith, [DPDP Rules timeline](https://legismith.com/dpdp-rules-2025-timeline/).
