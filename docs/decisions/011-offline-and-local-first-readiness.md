# 011: Offline support and local-first readiness

- **Date:** 2026-11-21
- **Status:** Accepted
- **Listed in:** [Phase 1 plan](../product/phase-1/README.md) (Foundation decisions)

## Context

Kiseki is an installable web app (it also needs a service worker for notifications). The daily loop (see today's plan, study, tick and rate) is the one thing that must never break. The first UPSC user is rarely offline, but connections on phones are often flaky for a few seconds. A fully local-first app (all data on the device, synced in the background) is attractive later but a large step for v0.1.

## Choice

- **Installable** (home-screen icon, full-screen), using the same service worker that notifications need.
- **The daily loop works offline:**
  - Today and tomorrow, and the syllabus, are kept on the device;
  - ticks, ratings and "how much" are saved on the device immediately and sent automatically when the connection returns, with a calm "3 changes waiting to sync" indicator, never an error;
  - the same design makes flaky connections safe: a retry can never create a duplicate;
  - editing the routine or syllabus needs internet in v0.1, and those screens say so clearly.
- **Each event records two times:** when it happened on the device (which decides its study day, in the user's time zone with the 4 am rule) and when the server received it.
- **Built ready for a later local-first app:**
  1. **IDs are created on the device** when an item is created (UUIDv7, see [decision 013](013-data-model-concept.md)), not by the server;
  2. **study actions are stored as events** that are only ever added, never edited in place, so they can't conflict between devices and give a complete history;
  3. **the planning and revision engine is plain shared code** (pure functions in a shared package), not locked inside the API server, so it can later also run on the device.
- **Move to local-first** when Phase 1 shows users are often offline or want to edit offline, when speed becomes a competitive edge, or before a public launch with users on patchy internet.

## Alternatives

- **Online only:** simplest, but a dropped signal mid-study hides today's plan and blocks ticking, pushing the user back to paper.
- **Read-only offline:** the plan is visible, but study can't be recorded, so "not recorded" items pile up.
- **Local-first now** (everything offline, with a sync engine such as Replicache/Zero, ElectricSQL or PowerSync): the best experience, but a sync engine, conflict rules for every kind of data, database changes on every device, and syncing only what each user may see are too much for v0.1.

## Why

The offline daily loop protects the part that decides whether Phase 1 succeeds, at a fraction of the cost of local-first. The three readiness rules cost almost nothing now and remove the hardest parts of a later move: device IDs and append-only events are what sync engines need, and a planning engine that runs anywhere means local-first won't require rewriting it.
