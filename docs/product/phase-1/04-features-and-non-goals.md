# Phase 1: features and non-goals

The aim: a **first version (v0.1)** both users use daily within weeks; everything else already designed comes in later versions.

## Who uses v0.1 first (decided 2026-11-21)

- **The DSA user (the developer) first**, using it for real study ("eating your own dog food"): problems are found and fixed the same day.
- **The UPSC user joins when v0.1 is stable**, which means all of:
  - 7 days in a row of real use by the DSA user;
  - no lost or wrong data in those 7 days;
  - the daily loop (today's plan → study → tick and rate → re-plan) works on an **Android phone** (her device), not just a laptop;
  - the UPSC content for v0.1 is ready.

## UPSC content for v0.1 (decided 2026-11-21)

- **The complete Prelims syllabus at subject → topic level**, every subject, every topic labelled (size, importance, stage), so she edits rather than creates. She adds deeper levels herself where she wants them.
- **Polity first, as a sample:** Polity is written and shown to her before anything else, to agree the style (the split, names, labels and depth). Once she agrees, we ask her for **all her subjects** (including her optional subject) and write them in that style. Later deepening is additive (permanent topic IDs and her own layer keep her progress); only a wrong top-level structure would need a rewrite, which the sample catches.
- **Written in parallel with building v0.1**, finished before she joins, so it doesn't delay her start.
- **Current Affairs** is a recurring study block (daily reading), not syllabus topics.
- **v0.1 needs basic syllabus edits:** hide, rename, add a topic, add a deeper level. The full editor can come later.

## v0.1 features (decided 2026-11-21)

The test for each feature: without it, would either user go back to their old way?

1. **Sign in** (how: topic 4).
2. **Pick tracks** (DSA, UPSC) and set a **target date** (and stage).
3. **Syllabus view + basic edits** (hide, rename, add a topic, add a deeper level).
4. **Weekly routine:** time blocks per day, study and personal.
5. **Today, filled by the app:** revision first, then new; reason tags; stable during the day.
6. **Finishing items:** tick + one question + how much; catch-up; "I studied something else".
7. **Re-planning** (simple): unfinished work moves to future days.
8. **The revision engine** (spaced repetition).
9. **Simple progress:** topic map (strength) + streak.
10. **Works well on an Android phone and a laptop** (installable).
11. **Notifications:** the study-session nudge (start now / in 10 min), basic study mode (focus screen + "turn on DND" prompt), the DND-off reminder, and notification settings (each on/off, nudge frequency). Needs web push and a per-user scheduler, chosen in topic 4.
12. **Appearance settings:** appearance (follow system, always light, always dark), surface style (flat or clay), individual effects on or off, and text size (90%–150%), each with a live preview. See [design](../../design/).

**Designed, but built later:** nightly review, light day / day off, forecast + weekly report, photo notes (photos of handwritten notes or book pages, which need upload, storage and deletion) (v0.2 candidates); then weekly and monthly targets, custom trackers + card dashboard, quick revision, custom tracks, the "why not" answers, wellbeing hints and routine coaching, Advanced settings, the extension host (v0.1 loads track syllabi straight from data files) and installable themes, smart quizzes. Themes are decided in the UI discussion.

## Non-goals for Phase 1 (decided 2026-11-21)

Things Phase 1 deliberately won't do, written down so they don't creep in and delay the 4-week goal. **They are non-goals for Phase 1 only, not for Kiseki:** every one of them is planned for the future, along with much more, because Kiseki is meant to become a world-class product. Phase 1 stays small so real use can guide that bigger product.

| Not in Phase 1                                                           | Why                                                                                                    |
| ------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------ |
| Public sign-up and launch (strangers, marketing, app-store listing)      | Phase 1 is a small private group; public needs support, policies and abuse protection                  |
| Payments and subscriptions                                               | No one pays during a private test                                                                      |
| Social features (friends, leaderboards, study groups)                    | Neither user asked for them; they add privacy and moderation work                                      |
| Native store apps (Play Store, App Store)                                | The installable web app covers both users; native comes later (it would enable automatic DND)          |
| Content beyond UPSC Prelims and DSA (Mains content, JEE, other tracks)   | Custom tracks cover other needs; we write only what our users need                                     |
| AI features (AI-written questions, AI coaching)                          | Accuracy, cost and privacy need careful work; designed as extensions for later                         |
| Importing schedules (e.g. coaching PDFs)                                 | Neither user needs it now                                                                              |
| Languages other than English                                             | Both users are comfortable in English; translation covers every screen, message and the whole syllabus |
| An admin app, video notes, gRPC between services, third-party extensions | Already marked as future phases                                                                        |
