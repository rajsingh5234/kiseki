# Phase 1

Phase 1 includes the foundation: the base every later feature stands on, so future features plug in without changing the app. There is no separate Phase 0.

Status: notes, not yet a plan. In Phase 1 planning we discuss everything in the right order: goal, core journey, features, what must be built now so future features are easy to add, build order and non-goals.

## Goal (agreed 2026-11-20)

> **Phase 1 goal:** Kiseki helps a small group (a UPSC aspirant and a DSA interview candidate first) **know what to study each day, stay consistent, remember what they learned, and see their progress toward their target dates**, across **one or more tracks** (ready-made or their own), on their phones and computers. It's built on a general foundation where new tracks, extensions and themes plug in later without rework.
>
> **Done when:** the Phase 1 features are built **and** both users use it daily for 4 weeks, by choice.

Every Phase 1 decision is checked against this: if a feature doesn't serve the goal, it isn't Phase 1. The sections below explain how we got here.

**These answers are what we know today, not fixed forever.** Users, track purposes and problems will change as real use teaches us more: revisit them at every check-in (see "How we'll know it worked") and update this section. The product must not hard-code them either: a track's purpose and content are data the app reads, so changing them never means rebuilding the core.

### Who it's for (decided 2026-11-20)

- **A small private group** of real users. Built to product quality, but features are chosen for these users and their daily feedback. A public launch comes later.
- **Two tracks from the start: UPSC and DSA.** Kiseki is not UPSC-only: it plans study for anything. UPSC and DSA are the first two tracks.
- **A real daily user for each track**, so neither is built on guesses:
  - **UPSC:** the first UPSC user (an aspirant who studies mostly on her phone), plus a few others later.
  - **DSA:** the project's developer, using it daily; later a younger learner, which also tests the DSA track for beginners.

### More than one track per user (decided 2026-11-20)

- A user can follow **several tracks at once** (e.g. DSA and System Design) and add or remove tracks any time.
- **Data rule (from day one):** every item (topic, problem, session) belongs to exactly one track; the person's day (study time, streak, reminders) belongs to the user. Then "separate" and "merged" are only two views of the same data.
- **Screens:** one **merged "Today"** by default, with a **filter to focus on one track** in one tap (`All · DSA · System Design`); the app remembers the choice. The daily plan balances tracks by a rule decided later (e.g. a share per track).
- **Draft split, settled at the features step:** shared by all tracks: daily study time, overall streak, reminders and settings. Per track: target date, syllabus and progress, strong and weak topics.

### Where tracks come from (decided 2026-11-20)

- **Ready-made tracks** we write (syllabus and structure included), **and** "**create your own track**" for anything else (e.g. System Design before we ship a ready-made one, or a language). A user can also **customise** a ready-made track (add or hide topics).
- One engine for both: a track is **data**, whether we wrote it or the user did; the same screens and features work for every track.
- Phase 1 writes two ready-made tracks (UPSC, DSA) and is designed so custom tracks fit without rework. Whether "create your own" is built in Phase 1 is decided at the features step.

### What each track is for

- **UPSC:** **Prelims** for now (GS Paper 1 and CSAT: a huge amount to remember, so revision and practice questions matter most). The first UPSC user is on a **repeat attempt**, not a beginner: she already knows the syllabus and needs to find and fix weak areas. **This will change:** after Prelims comes Mains (written answers, optional subject), then the interview. So a track has **stages**, and a user moves to the next stage without losing progress (much of the syllabus overlaps). Stages are data, like everything else in a track.
- **DSA:** preparing for job interviews, by a target date: must-know topics and problems, patterns, and revisiting problems got wrong.

### Problems to solve

The UPSC and DSA users have **the same four problems** today, which confirms the core must be general, not track-specific:

| Problem                                                               | UPSC example                   | DSA example                                       |
| --------------------------------------------------------------------- | ------------------------------ | ------------------------------------------------- |
| 1. **Knowing what to do next:** no clear daily plan                   | the syllabus is huge           | too many topics and problem lists                 |
| 2. **Staying consistent:** missing days, losing momentum              | days lost, hard to restart     | days lost, hard to restart                        |
| 3. **Forgetting what was learned:** revising too late, or never       | topics studied months ago      | problems solved once, can't redo them weeks later |
| 4. **Seeing progress:** what's strong or weak, on track for the date? | subjects, and the Prelims date | topics, and the interview date                    |

### How we'll know it worked

Phase 1 is done when **both** are true:

1. **Built:** every Phase 1 feature on the agreed list is finished (the list comes at the features step).
2. **Valued:** the UPSC user and the DSA user each use Kiseki **daily for 4 weeks, by choice**, instead of their current way of planning (notebook, spreadsheet, other apps). Drifting back to the old way is the most useful feedback there is: it means a problem above isn't solved yet.

Weekly check-ins during those 4 weeks: what was used, what was skipped, what was annoying. They update the answers in this section.

## Core journey (being decided step by step)

Design order: the **daily journey first** (used hundreds of times, so it decides whether Phase 1 succeeds), then the first-time journey (only asks what the daily journey needs). The daily journey starts **already signed in**: each device remembers the user and opens straight on Today.

### Evidence: the first UPSC user's own paper planner

Before Kiseki, she designed an A4 daily planner. What it shows:

- **She plans by time blocks**: a fixed timetable for the whole day, each block with a subject or task, a **target** (an amount like "15 pages", a duration like "15 min", or just done / not done), a done tick and notes.
- **Not only study:** routine, meditation or prayer, meals, a walk, family time, sleep; a weekly **habit tracker** (wake early, exercise, prayer, reading, revision, sleep on time) and water intake.
- **Revision** is one same-day block ("revise what you studied"); nothing brings back older topics (problem 3).
- **Consistency:** a month calendar with a tick per day, in effect a streak (problem 2).
- **Progress:** total study hours, pages completed, mock test score out of 100 (problem 4).
- **End of day:** "How was my day?" (great / average / need to improve), tomorrow's top 3 goals, a "plan tomorrow" block, notes, gratitude.
- **Risk it shows:** about 12–13 study hours every day. On paper, one bad day breaks the plan and is hard to restart; an app can re-plan missed blocks instead.

### When the app is used (decided 2026-11-20)

Both users use all four moments:

1. **Start of the day:** see today's plan instantly.
2. **During study:** start a block and mark it done in one or two taps (with notes).
3. **End of the day:** a short summary, how the day went, move unfinished work, plan tomorrow.
4. **Short free moments** (mostly on the phone): quick revision that fits a few minutes.

### Non-study things (decided 2026-11-20)

- A day's plan holds **study blocks** (linked to a track's topic or problem) and **personal blocks** (just a name and a time: lunch, walk, prayer), so the plan matches a real day.
- **Personal blocks never count as study:** study hours, progress and "on track for the date?" use study blocks only.
- **Habits** (daily ticks like water intake or waking early) are simply **trackers** (see "Personal tracking and the dashboard" below); whether they are in Phase 1 is decided at the features step.
- Not a "Health" track: a track has a syllabus, a target date and progress, which personal blocks don't.

### How today's plan is made (decided 2026-11-20)

- **The user sets the routine:** time blocks per subject or track (e.g. "5:30–6:30 Geography", "7–8 pm DSA"), plus personal blocks. The user decides **when**.
- **The app fills each study block** with exactly **what** to do: the next topic in the syllabus, revision that is due, problems to solve. Missed blocks are re-planned instead of left as failures.
- **The user can change anything**, any block, any day.
- How the app picks (topic order, revision timing, balancing tracks) is designed later.

### Weekly and monthly targets (decided 2026-11-20)

Plans have levels: **target date → monthly milestones → weekly targets → daily plan**.

- **The app proposes, the user adjusts:** working backward from the target date and the user's routine, the app proposes monthly milestones (e.g. "August: Polity + Economy revision") and weekly targets (e.g. "Polity ch. 5–9, 2 mocks"); the daily plan follows them. The user reviews and edits any level. (The UPSC user plans her own weeks and months; the DSA user plans weekly and lets the app propose months.)
- **Pinned targets:** a target the user edits is pinned; the app never moves it silently. If it becomes unrealistic, the app warns and offers choices (move part of it, add time, keep it). Targets the user hasn't touched re-plan themselves, as for unfinished work.
- **Measured in syllabus units and activities** (chapters, topics, problems, mock tests), not hours.
- **Calendar months**; the week starts on a day the user chooses (default Monday).
- **Per track, with a shared capacity check:** targets belong to a track, but all tracks' targets together must fit the user's time; the app warns before an impossible week is set.
- **Reviews:** next week's targets in the weekly report (the user's chosen day); a short monthly check-in in the nightly review at the start of each month. No extra notifications.
- **No target date** (e.g. learning a language): no backward planning; the user sets a pace ("3 lessons a week") and the app plans forward.
- **Importing a schedule** (e.g. a coaching institute's monthly plan) is important for the product, but neither Phase 1 user needs it now: planned for later. The design is ready: an imported schedule simply becomes pinned monthly and weekly targets.

### Finishing a study block (decided 2026-11-20)

About two taps, and it is all the app knows about how study is going:

- **Done**, plus **how much** ("12 of 15 pages", "2 of 3 problems") and an optional note.
- **How well**, one tap: UPSC "confident / unsure / weak"; DSA "solved alone / with hints / couldn't solve". Weak or failed items come back for revision sooner, strong ones later; this is how weak areas are found.
- **Optional timer** for those who like it; without it, the planned time counts.
- These are built-in study fields (the planning and revision engine needs them), separate from custom trackers.

### Unfinished work (decided 2026-11-20)

- **By default the app re-plans:** unfinished items go back into the queue and are spread over the coming days within the user's normal daily time, most important first. No snowball onto tomorrow, no "failed" page.
- **The user can choose instead**, per item or for all of them: tomorrow, later this week, next week, next month, a specific date, or skip. The app shows the effect on the target date before confirming (e.g. "this moves your finish date 2 days later").
- **Kind but honest:** the summary says "3 items moved to later this week", never "you failed 3 tasks"; when missed work adds up, the target-date view says "behind" and offers to adjust (more time per day, or a later date).

### End-of-day review (decided 2026-11-20)

- A **short nightly review** (about 30 seconds): what was finished, what moved and where (the user can change it: tomorrow, next week, next month, a date, or skip, as in "Unfinished work"), the user's evening trackers (mood, gratitude…), and **tomorrow's plan** to glance at, tweak, and pick the top 3 goals.
- **An optional reminder** at a time the user picks (e.g. 9:30 pm), or none; the review screen is also always available.
- **Skippable:** skipping breaks nothing; the app re-plans anyway.
- Its contents come from the user's own trackers and cards, so each person's review matches their planner.

### Quick revision in short free moments (decided 2026-11-20)

- **Now:** **recall prompts** (the app shows something studied; the user recalls it, checks against their own notes, and taps how well they remembered) and the user's **own flashcards** (question → answer). Both work for every track with no content from us.
- **Later, as extensions:** ready-made question banks (e.g. Prelims MCQs) and AI-generated questions.
- Every format feeds the same revision engine through the "how well did you remember" tap.

### Smart quizzes on weak areas (planned future extension)

Automatic questions on the **completed** syllabus, focused on what is **weak** for this user, with **explained answers**. Two separate jobs:

1. **Choosing what to ask about** (completed + weak + not revised recently): our own revision engine, from data collected from day one (completed topics, "how well" taps, last revision). No AI needed; it also drives recall prompts, so it is part of Phase 1.
2. **Writing questions with explained answers:** a question bank (correct but large to build or license) or AI (unlimited, but can be confidently wrong, costs per question, and sends notes to a provider). Safeguards for a world-class version:
   - **grounded:** the AI writes only from trusted text (the user's notes or sources we may use), never from memory;
   - a **"report a wrong question"** button; reported questions are removed;
   - **reuse** good questions across users (lower cost, quality builds up);
   - for DSA, AI for concept questions; real problems come from tested problem lists.

**Foundation in Phase 1:** the extension host API exposes a user's **progress and weak areas** to extensions, behind a permission ("this extension wants to read your progress"), so a smart-quiz extension plugs in later without app changes. Whether the extension itself is built in Phase 1 is decided at the features step.

### Seeing progress (decided 2026-11-20)

Problem 4: what's strong or weak, and am I on track for my date?

- **What the user sees:** a **headline number** with its trend, a **topic map** (strong / okay / weak / not enough data yet) and a **target-date forecast**, plus a **weekly report** with 1–2 concrete suggestions (e.g. "Polity has been weak for 2 weeks; add one revision block?").
- **Strength, not just coverage:** progress comes from "how well" taps and revision results, not from "covered". For a repeat attempt, what matters is what she still remembers, not what she once read.
- **Strength fades** slowly when a topic isn't revised (as memory does); fading topics are what the revision engine brings back.
- **Honest with little data:** "not enough data yet" instead of a false "weak"; the forecast appears only once there's enough history, and says how confident it is.
- **Show improvement** ("Geography: weak → okay this week"), not only the current state.
- **The headline number:** each track has a default (UPSC Prelims: mock score trend; DSA: problems solved without hints), and the user can change it to any of their trackers, so custom tracks work too. With no data yet, it says how to start ("take your first mock to see this").
- **Study hours** are shown, but not as the headline: in the weekly report and as an optional card, so they're never the thing to chase.
- **The weekly report** appears inside the nightly review on a day the user picks (default Sunday), not as a separate notification. One report covers all the user's tracks, with the same track filter as Today.
- **A plain forecast, always with options:** "at this pace you finish 2 weeks after Prelims", followed by what to do about it (e.g. "add 30 minutes a day" or "focus on high-weight topics first"). Never bad news without a way forward.

### Ready-made syllabus (decided 2026-11-20)

- **Detail level: subject → topic**, one level deeper where it really matters (a DSA topic holds its problem list). Users can add their own sub-items to any topic.
- **Written by the UPSC and DSA users together**, for UPSC, starting with one subject (e.g. Polity) fully written, so the engine is tested with real data early; the rest in parallel with building the app.
- **Each topic has:** a permanent ID (progress survives renames and moves), a name and order, three labels (below), and optional resources (book chapters; for DSA, links to problems, never copied statements).
- **The three labels** (simple on purpose; without them the app can only show a checklist, not plan):

  | Label          | What it means                            | Values                           | Why the app needs it                                                                                                                                 |
  | -------------- | ---------------------------------------- | -------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
  | **Size**       | Roughly how much work the topic is       | S (small), M (medium), L (large) | To plan backward from the target date; not hours, because nobody can estimate hours well; the app learns the user's real pace and corrects its plans |
  | **Importance** | How much it matters for the exam or goal | high, normal                     | To suggest what to do first when time is short ("high-weight topics first")                                                                          |
  | **Stage**      | Which stage of the track needs it        | e.g. Prelims, Mains, both        | To move to the next stage without losing progress                                                                                                    |

- **How it's written (for now):** a shared spreadsheet (one row per topic), converted into the track's data file by a script that checks it (missing labels, duplicate IDs); the file is versioned in the repo.
- **A shared template + each user's own layer:** picking a track links to the shared template; the user's target date, stage, progress and edits are their own layer. Fixes to the template reach everyone. A ready-made track is a data-only **track pack** in the extension host, like a theme, so others could publish track packs later.

### The user's syllabus: viewing and editing (decided 2026-11-20)

- **Every user sees their whole syllabus** (also where the strong/weak topic map lives). It works as installed, with no editing needed.
- **Edit any time, a bit at a time:** add, hide, rename, reorder or move topics, change a topic's labels. Every edit updates plans and the forecast, showing the effect first. On a phone: collapsible subjects, search, bulk actions ("I've covered all of Polity").
- **Template updates never override the user's edits;** new topics we add appear marked "new", to keep or hide.
- **"Completed" is worked out from topics, never stored for a section.** Adding a topic to a finished section: the new topic is "not started", the section's percentage recalculates, existing progress is untouched. By default it's scheduled **by importance**; the user can instead pick this week, next week or a date (with the capacity check and forecast effect shown).
- **Edge cases:** a new subtopic makes its topic partly done (only the new part is scheduled); a topic studied elsewhere can be marked done right away with a "how well" rating; moving a topic moves its progress; hiding a finished topic keeps its history and can be undone.
- How much **editing** is built in Phase 1 is decided at the features step; **viewing** is Phase 1. Later, the same editor could replace the spreadsheet for writing track packs.

### Personal tracking and the dashboard (decided 2026-11-20)

Every user tracks different things (her paper planner tracks mood, water, gratitude, top 3 goals, mock scores), so:

- **Custom trackers:** a user creates a tracker with a name, a type and, optionally, a goal and how often. Types: **number** (water: goal 8 a day; mock score out of 100), **rating** (how was my day), **text** (gratitude), **yes/no** (wake early, prayer). Habits are just daily yes/no trackers: one general idea, not many special features.
- **A dashboard made of cards** (widgets): Today's plan, the streak calendar, study hours, each tracker, top 3 goals, notes. Users add, remove and reorder cards, starting from **ready-made layouts** (her planner can become a "Daily planner" layout others can pick). The dashboard is a **slot** in the extension host, so extensions can add cards later.
- **Never an empty screen:** every track comes with good defaults (a layout and the trackers it needs); customising is optional.
- **Not full design freedom** (free-form pages like Notion): expensive, and free layouts break on phones and hurt accessibility. The look is covered by themes.
- Trackers are data and the dashboard is a slot of cards from the start; which parts are built in Phase 1 is decided at the features step.

## Notes so far

### Extension host

**Goal:** a new extension (with web and API parts) can be added, installed and shown to users without changing a single line in `apps/web` or `apps/api`.

**Test case (future):** a "Code Runner" extension for DSA users: pick a language, create a project, run it and see the output. The extension host is done when an extension like this would need no app changes.

#### Manifest

Each extension has a `manifest.json` that says:

- `id`, name, version, and the extension API version it needs;
- `tracks`: which tracks it's for (e.g. `["dsa"]`), so only those users see it in the store;
- `contributes`: what it adds to the app (a sidebar icon, a page, settings…);
- `permissions`: what it's allowed to use (e.g. `run-code`, its own data), approved by the user on install.

#### Web side

- **Slots (contribution points):** fixed places in the app where any extension can add things: sidebar, pages (routes), settings. Built once; the app draws whatever installed extensions contribute.
- **Installed list:** on start, the app asks the API which extensions this user installed and shows only those.
- **Lazy loading:** an extension's code downloads only when the user first opens it.
- **Registry:** extensions in our repo are found automatically from their manifests at build time, never listed by hand.
- **Error boundary:** a crashing extension shows an error in its own area; the rest of the app keeps working.

#### API side

- **Loader:** the API loads each extension's API part through the host API at start-up, never by hand-written wiring.
- **Routes:** each extension's routes live under `/ext/<id>/...`.
- **Install guard:** every extension request checks that the user installed it; otherwise it's refused.
- **Install and uninstall:** a table records which user installed which extension (and version); uninstall removes the icon and blocks its routes.
- **Own data only:** each extension has its own tables (its own migrations) and can't read app or other extensions' tables.

#### Host services

Extensions get shared abilities only through the host API, each behind a permission. Phase 1 builds the mechanism and the basics (current user, its own storage, settings, logger, events). Special services are added when a real extension needs them. For example, `run-code` sends code to a separate sandbox with time and memory limits, never to our API server; the sandbox is chosen when we build Code Runner.

#### Store

- A simple list of available extensions, filtered by the user's track, with Install and Uninstall.
- Shows the permissions an extension asks for before installing.

#### Adding a new kind of slot

If a future extension needs a place that doesn't exist yet (e.g. a button inside the timetable), we add that slot once to the host and `extension-sdk`. Every later extension can then use it.

### Installable themes

**Goal:** in the future, users can install themes (ours, later outside ones) and use them, like VS Code themes. So from the start:

- **A theme is a kind of extension:** its manifest contributes to a `themes` slot. Our built-in themes use the same path, with no special case.
- **A theme is data, not code:** a token set (colours, radius, shadows, motion…) in a file, checked against a schema before use. A theme that only holds data can't break the app or read user data, so outside themes are safe.
- **Missing tokens fall back** to the default theme, so an older theme keeps working when we add new tokens.
- **Contrast check:** a theme must pass text-contrast rules to be accepted.
- **Installed themes** appear in the user's theme settings; uninstalling one switches the user back to the default.

### Seamless change: no downtime, users never notice

**Goal:** adding a feature or even changing part of the tech stack happens without downtime and without users noticing, as large product companies do (e.g. ChatGPT moved its web app from Next.js to Remix in 2024 and users didn't notice).

- **Zero-downtime deploys:** the new version starts beside the old one; traffic moves only after its health check passes; the old one finishes its in-flight requests (graceful shutdown) and stops. Needs: a health check, a readiness check and graceful shutdown in the API.
- **Feature flags:** new code ships switched off, then turns on for us, then a small share of users, then everyone; switched off in seconds if it misbehaves. Tool chosen when needed.
- **Safe database changes (expand, then contract):** never rename or drop in one step. Add the new → write to both → copy old data → read from the new → remove the old later. Old and new app versions both work during the switch.
- **Old clients keep working:** API changes are additive (new fields, never breaking existing ones); a real break gets a new API version. Old web files stay online for a while, and the app shows "New version available" instead of breaking.
- **Change tech piece by piece (strangler pattern):** replace one part at a time behind the same URLs and interfaces. Our interfaces, DI and modules make this possible.
- **Gradual rollout and quick rollback:** release to a small slice first, watch errors and speed, then widen; roll back in one step.

### Versions: Semantic Versioning (SemVer)

**Goal:** every release has a clear version, like a proper app. `MAJOR.MINOR.PATCH`: a fix bumps PATCH, a new feature bumps MINOR, a breaking change bumps MAJOR.

- **The app:** each release gets a version and a user-facing "What's new" note.
- **The extension API (`extension-sdk`):** follows SemVer strictly; each manifest states the range it needs (e.g. `"engine": "^1.2"`), and a MAJOR bump means extensions may need changes.
- **The public REST API:** a new `/vN` only for a real break, which should be rare (see "Old clients keep working").
- **Automatic from commits:** conventional commits drive the bump (`fix:` → patch, `feat:` → minor, `feat!:` or `BREAKING CHANGE` → major) and the changelog. Tool (release-please or Changesets) chosen when we set up releases.
