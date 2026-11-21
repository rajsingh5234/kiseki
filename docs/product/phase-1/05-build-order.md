# Phase 1: build order

## How we build (decided 2026-11-21)

- **Feature by feature ("vertical slices")**, not layer by layer: each feature is built through every layer (database → API → screen) before the next starts, so something works from the first slice and problems show up early.
- **First, a walking skeleton:** the thinnest slice of real functionality that is **built, deployed and tested end-to-end automatically**. It's production code, not a prototype. Ours: open the URL on an Android phone → "Sign in with Google" (invite-only) → a plain "Hello" screen → install it to the home screen.
- **Hosting moves near the start** (not a late "deploy step"): hosting problems are cheapest to find in the first week.
- **Design runs one step ahead of building ("dual-track"):** the design session (the UI discussion) happens **right after planning**, before and alongside the setup steps, and must be done before the first feature slice; then while slice N is built, slice N+1 is designed. Same people, not a separate phase. Finishing the design discussion first lets the walking skeleton use the real theme (step 4).

## Order (decided 2026-11-21)

0. **Design session (the UI discussion), right after planning:** design direction, the UPSC user's 3 themes, key screens (Today, finishing an item, syllabus, routine), every screen size, motion. All discussions are finished before building starts.
1. **CI:** minimal first (install, lint, typecheck, test, audit on every push), proven reliable before automatic deployment.
2. **Postgres + Drizzle**, including the row-level security decision.
3. **`packages/contracts`:** shared request and response types.
4. **The web app skeleton:** React + React Router, installable basics, and the **minimum real theme**: the token contract, **Lavender light and dark**, **follow the system**, and the **flat** surface style. Enough to catch problems that only appear live, such as a white "theme flash" before dark mode loads on a phone; clay, glass, effects and the motion engine come in step 7.
5. **Hosting + automatic deployment:** every merge to `main` goes live.
6. **Sign-in**, plus **one automated end-to-end test** in a real browser.
   → **Walking skeleton done:** sign in on an Android phone, deployed and tested automatically.
7. **Design system**, before the feature slices (every slice needs these components): **clay**, **glass** behind the developer switch, the **v0.1 effects**, the **motion engine** on Motion (with the 144 Hz smoothness test), the **playground** with automatic screenshot and contrast checks, and the **appearance settings** (v0.1 feature 12). See [themes, effects and motion](../../design/themes-effects-motion.md).
8. **Feature slices** for v0.1, with design one slice ahead (below).

## Feature slices (decided 2026-11-21)

Ordered by dependencies, by daily usefulness as early as possible (dogfooding starts at slice 4), and with the riskiest part (the engine) built while the app is in daily use, so it's tested on real data at once.

| #   | Slice                                                                                                                 | After it, the DSA user can…                            |
| --- | --------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------ |
| 1   | Tracks: pick a track (DSA first), set the target date, view the syllabus                                              | see their syllabus                                     |
| 2   | Weekly routine: study and personal blocks per day                                                                     | set when they study                                    |
| 3   | Today, first version: blocks filled with the next topics; the day plan stays stable                                   | see what to do today                                   |
| 4   | Finishing items: tick + one question + how much, catch-up, "studied something else", saved as events, working offline | **use Kiseki daily (dogfooding starts)**               |
| 5   | The revision engine: spaced repetition, revision first in each block, reason tags                                     | get revision scheduled automatically                   |
| 6   | Re-planning: unfinished work moves to future days                                                                     | miss a day without breaking the plan                   |
| 7   | Simple progress: topic map (strength) + streak                                                                        | see where they stand                                   |
| 8   | Notifications: session nudges, basic study mode, DND-off reminder                                                     | get nudged to start                                    |
| 9   | Basic syllabus edits: hide, rename, add a topic, add a deeper level                                                   | shape the syllabus (needed before the UPSC user joins) |

Then the "stable" checklist (see ["Who uses v0.1 first"](04-features-and-non-goals.md#who-uses-v01-first-decided-2026-11-21)), and the UPSC user joins. Offline is part of slice 4, not a separate slice: the event design is offline-ready from the start ([decision 011](../../decisions/011-offline-and-local-first-readiness.md)).

**Sources:** Freeman & Pryce, _Growing Object-Oriented Software, Guided by Tests_ ([ch. 10, the walking skeleton](https://www.oreilly.com/library/view/growing-object-oriented-software/9780321574442/ch10.html)); J. Patton, [dual-track development](https://jpattonassociates.com/dual-track-development/); thoughtbot, [a lean approach to design systems](https://thoughtbot.com/blog/a-lean-approach-to-design-systems); DEV, [add CI when the project can boot](https://dev.to/oranguengineer/add-ci-when-the-project-can-boot-not-when-it-feels-finished-20m9).
