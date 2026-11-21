# Phase 1: goal (agreed 2026-11-20)

> **Phase 1 goal:** Kiseki helps a small group (a UPSC aspirant and a DSA interview candidate first) **know what to study each day, stay consistent, remember what they learned, and see their progress toward their target dates**, across **one or more tracks** (ready-made or their own), on their phones and computers. It's built on a general foundation where new tracks, extensions and themes plug in later without rework.
>
> **Done when:** the Phase 1 features are built **and** both users use it daily for 4 weeks, by choice.

Every Phase 1 decision is checked against this: if a feature doesn't serve the goal, it isn't Phase 1. The sections below explain how we got here.

**These answers are what we know today, not fixed forever.** Users, track purposes and problems will change as real use teaches us more: revisit them at every check-in (see "How we'll know it worked") and update this section. The product must not hard-code them either: a track's purpose and content are data the app reads, so changing them never means rebuilding the core.

## Who it's for (decided 2026-11-20)

- **A small private group** of real users. Built to product quality, but features are chosen for these users and their daily feedback. A public launch comes later.
- **Two tracks from the start: UPSC and DSA.** Kiseki is not UPSC-only: it plans study for anything. UPSC and DSA are the first two tracks.
- **A real daily user for each track**, so neither is built on guesses:
  - **UPSC:** the first UPSC user (an aspirant who studies mostly on her phone), plus a few others later.
  - **DSA:** the project's developer, using it daily; later a younger learner, which also tests the DSA track for beginners.

## More than one track per user (decided 2026-11-20)

- A user can follow **several tracks at once** (e.g. DSA and System Design) and add or remove tracks any time.
- **Data rule (from day one):** every item (topic, problem, session) belongs to exactly one track; the person's day (study time, streak, reminders) belongs to the user. Then "separate" and "merged" are only two views of the same data.
- **Screens:** one **merged "Today"** by default, with a **filter to focus on one track** in one tap (`All · DSA · System Design`); the app remembers the choice. The daily plan balances tracks by a rule decided later (e.g. a share per track).
- **Draft split, settled at the features step:** shared by all tracks: daily study time, overall streak, reminders and settings. Per track: target date, syllabus and progress, strong and weak topics.

## Where tracks come from (decided 2026-11-20)

- **Ready-made tracks** we write (syllabus and structure included), **and** "**create your own track**" for anything else (e.g. System Design before we ship a ready-made one, or a language). A user can also **customise** a ready-made track (add or hide topics).
- One engine for both: a track is **data**, whether we wrote it or the user did; the same screens and features work for every track.
- Phase 1 writes two ready-made tracks (UPSC, DSA) and is designed so custom tracks fit without rework. Whether "create your own" is built in Phase 1 is decided at the features step.

## What each track is for

- **UPSC:** **Prelims** for now (GS Paper 1 and CSAT: a huge amount to remember, so revision and practice questions matter most). The first UPSC user is planned for as **starting fresh**: going through the syllabus from the beginning. The app also supports users on a repeat attempt (marking covered topics quickly, focusing on weak areas). **This will change:** after Prelims comes Mains (written answers, optional subject), then the interview. So a track has **stages**, and a user moves to the next stage without losing progress (much of the syllabus overlaps). Stages are data, like everything else in a track.
- **DSA:** preparing for job interviews, by a target date: must-know topics and problems, patterns, and revisiting problems got wrong.

## Problems to solve

The UPSC and DSA users have **the same four problems** today, which confirms the core must be general, not track-specific:

| Problem                                                               | UPSC example                   | DSA example                                       |
| --------------------------------------------------------------------- | ------------------------------ | ------------------------------------------------- |
| 1. **Knowing what to do next:** no clear daily plan                   | the syllabus is huge           | too many topics and problem lists                 |
| 2. **Staying consistent:** missing days, losing momentum              | days lost, hard to restart     | days lost, hard to restart                        |
| 3. **Forgetting what was learned:** revising too late, or never       | topics studied months ago      | problems solved once, can't redo them weeks later |
| 4. **Seeing progress:** what's strong or weak, on track for the date? | subjects, and the Prelims date | topics, and the interview date                    |

## How we'll know it worked

Phase 1 is done when **both** are true:

1. **Built:** every Phase 1 feature on the agreed list is finished (the list comes at the features step).
2. **Valued:** the UPSC user and the DSA user each use Kiseki **daily for 4 weeks, by choice**, instead of their current way of planning (notebook, spreadsheet, other apps). Drifting back to the old way is the most useful feedback there is: it means a problem above isn't solved yet.

Weekly check-ins during those 4 weeks: what was used, what was skipped, what was annoying. They update the answers in this section.
