# Phase 1

Phase 1 includes the foundation: the base every later feature stands on, so future features plug in without changing the app. There is no separate Phase 0.

Status: plan agreed (2026-11-21): goal, core journey, features and non-goals, foundation decisions and build order. Details marked "decide when building" are settled per feature.

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

- **UPSC:** **Prelims** for now (GS Paper 1 and CSAT: a huge amount to remember, so revision and practice questions matter most). The first UPSC user is planned for as **starting fresh**: going through the syllabus from the beginning. The app also supports users on a repeat attempt (marking covered topics quickly, focusing on weak areas). **This will change:** after Prelims comes Mains (written answers, optional subject), then the interview. So a track has **stages**, and a user moves to the next stage without losing progress (much of the syllabus overlaps). Stages are data, like everything else in a track.
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
- **New topics versus revision:** the app fills each study block starting from what is **due for revision** (things about to be forgotten), then new topics, and **shifts toward revision as the target date gets closer** (for a starter, roughly: mostly new early on, about even in the middle months, mostly revision and mocks in the last 2–3 months; the real split depends on pace and syllabus size and is tuned at the check-ins). Revision is woven into each subject's blocks ("Polity: revise ch. 3, then ch. 6"), not left to one block at the end of the day. A slider per track lets the user lean "more new" or "more revision" at any time. This prevents the classic first-attempt failure: syllabus covered, but forgotten by the exam.
- How the app picks (topic order, revision timing, balancing tracks) is designed later.

### Different days (decided 2026-11-20)

Not every day is the same (weekends, work days, busy days), so:

- **A weekly routine:** each day of the week has its own routine (time blocks, study and personal). Each user sets their own study days and days off; the app assumes no fixed day off.
- **One-tap changes for a single day:**
  - **Light day:** the user picks a length (30 min, 1 hour, 2 hours); the app keeps the most important work (revision due first, then high-importance topics) and re-plans the rest. Across tracks, it picks from all of them (shared time).
  - **Day off:** no study; that day's work re-plans across the coming days, with the forecast effect shown.
  - **Copy a routine** from another day ("make Saturday like Sunday").
- **Plan ahead:** future days (a wedding, travel, a college exam) can be marked now, so the plan and forecast adjust in advance.
- **Streak rules:**
  - a **planned day off** doesn't break the streak: the streak counts "studied on every planned study day";
  - a completed **light day** counts: a short day keeps the habit alive;
  - an **unplanned miss** breaks the streak, but can be marked as a **rest day afterwards**, up to **2 a month by default**; each user can change this limit, since the streak is their own motivation tool.

### Today's plan stays stable (decided 2026-11-20)

A plan that changes by itself can't be trusted, so:

- **The app never changes today without asking.** Re-planning (missed blocks, new topics, changed targets) only moves **tomorrow onward**. Today changes only when the user changes it (moves a block, marks a light day).
- **When today gets fixed:** when the user finishes the nightly review (they have seen and accepted it); if they skip the review, at the start of their first study block. The morning plan is never a surprise.
- **Suggestions, not changes:** the app may suggest, and the user decides:
  - finished a block early: "You have 30 min free: revise Rivers of India?";
  - skipped a block: "Move it to later today, or let it re-plan?" (default: re-plan);
  - a personal block runs late: "Polity starts in 10 min; shorten it?" (only if it affects a study block).

  One suggestion per event; once ignored, it doesn't repeat.

- **A study day ends at 4 am by default** (each user can change it), so studying until 1 am still counts as "today": for the streak, study hours and today's plan.
- **The same plan on every device:** phone and laptop always show the same fixed plan.

### Why this item? (decided 2026-11-20)

If the app's choices feel random, people stop trusting them and plan by hand again, so:

- **A short reason tag on every planned item:** "due", "weak", "next", "high-weight". **Tapping it shows the full reason** ("Last revised 12 days ago · you marked it unsure"). A clean screen, with details on demand; over time it also teaches why spaced revision works.
- **"Not this one" asks why, in one tap** (skippable: closing it counts as "not now"), and each answer teaches the app:

  | Answer                    | What the app does                                        |
  | ------------------------- | -------------------------------------------------------- |
  | "I already know it"       | Marks it strong; revision comes back much later          |
  | "Not now"                 | Moves it later; nothing else changes                     |
  | "Too hard right now"      | Marks it weak and suggests an easier related topic first |
  | "Not part of my syllabus" | Offers to hide the topic (can be undone)                 |

- **"Don't ask again"** is on the question itself; it can be switched back on in settings.

### A realistic routine and wellbeing (decided 2026-11-20)

A routine that is too much from the start (e.g. 12–13 study hours every day) makes every day end "behind", so:

- **The app never blocks a routine.** Instead, it coaches from **real data**: when actual study stays **below about 70% of planned for 2 weeks**, the weekly report offers a realistic plan **a little above** the real average (e.g. actual 6.5 h → plan 7.5 h), with the forecast for both ("A plan of 7.5 h a day still finishes the syllabus by April. Switch?"). Framed as a way to get there, never as failure.
- **"Keep my plan"** is always an option; the app then doesn't ask again for 30 days.
- The 70% and 2-week numbers are tuned at the check-ins.
- **Wellbeing hints,** based on the routine (what is planned, not tracking the body):

  | Hint   | When                                                                                     | Example                                                                    |
  | ------ | ---------------------------------------------------------------------------------------- | -------------------------------------------------------------------------- |
  | Sleep  | The routine leaves less than 7 hours between the last block and the next morning's first | "Your routine leaves 6 h for sleep. Most people remember more with 7–8 h." |
  | Breaks | More than 3 hours of study without a break                                               | "3.5 h without a break; a short break helps you focus in the next block."  |
  | Rest   | No day off or light day in 4 weeks                                                       | "4 weeks without a rest day; a light day can keep you going longer."       |

- **Hint rules:** shown when the routine is created or edited (the rest hint at most once a month), never repeatedly; gentle and informational ("most people…", never "you must"); no medical advice; "Don't show again" on each hint, also switchable in settings; they never block anything.

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

### Finishing a study block (decided 2026-11-20, refined the same day)

About two taps, and it is all the app knows about how study is going:

- **Done**, plus **how much** ("12 of 15 pages", "2 of 3 problems") and an optional note.
- **Two different questions, weighed differently.** Right after studying, material feels clearer than it is (the "illusion of knowing"), so the real measure of strength is **recall later**:

  | Moment                                             | Question (one tap)                                                         | Effect                                                                                                                                                                                                                                  |
  | -------------------------------------------------- | -------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
  | After studying something **new**                   | "How clear was it?" clear / partly / confused                              | A light signal. The first revision always comes within 1–2 days (the next day if partly or confused; "confused" is flagged and shown in the reason tag). Until then the topic is "studied, not yet revised", never green                |
  | After **revising**                                 | "How much did you remember?" all / some / little                           | **The main signal for strength and the topic map.** All: strength up, the next gap grows (a few days → a week → a few weeks). Some: strength and gap stay. Little: strength down, back soon, gap starts small again (spaced repetition) |
  | DSA: first attempt, then **re-solving days later** | solved alone / small hint / read the solution / couldn't solve (see below) | The first attempt is light; re-solving later is the main signal                                                                                                                                                                         |

- **Wording avoids "confident"**, which invites the illusion; later, objective signals (e.g. quiz results from an extension) count more than self-ratings.
- **A block can hold several items** (e.g. "revise ch. 3" and "new ch. 6"), about **2–3 per hour**, set by each item's size (starting estimates, then adjusted to the user's real pace):

  | Size | Roughly        | In a 1-hour block                                                                            |
  | ---- | -------------- | -------------------------------------------------------------------------------------------- |
  | S    | ~20 min        | up to 3 small items                                                                          |
  | M    | ~30–40 min     | 1–2 items                                                                                    |
  | L    | 60 min or more | fills the block alone and **continues** in later blocks ("Ch. 6 DPSP, continued") until done |

- **Revision first, then new:** recall warms up the subject and makes the new material easier to connect.
- **Each item is ticked on its own** (✓, then its one question), while it's fresh. If only part of an item's amount was done, the user enters how much; the rest follows "Unfinished work".
- **Catch-up:** when a block ends (or "End block" is tapped), unticked items appear in one quick list; if that's missed, they show up in the nightly review. Nothing is lost.
- **"I studied something else":** each block lets the user record a different topic (found by search) and rate it as usual; the planned items that weren't done follow "Unfinished work". Without this, people stop recording real study, and every plan built on the data quietly goes wrong.
- **Items never marked** (no tick, no catch-up, no review) are **"not recorded"**: neither done nor missed. The next review, or the next time the app is opened, asks **once**: "Did you study these?", with yes or no per item (pre-selected "yes" if study mode was on during that block). After **2 days** with no answer they count as not done and re-plan; the user can still correct that day later from their history.
- **Not recording doesn't break the streak by itself:** a day with only unrecorded items isn't counted as missed until the 2 days pass; answering "yes, studied" in time counts the day. After that, the rest-day option still applies.
- **DSA answers (four, not three):** solved alone / **small hint** / **read the solution** / couldn't solve. "Read the solution" is separated because writing code after reading a solution feels like solving but isn't (the illusion of knowing); it's the key interview-prep signal.

  | Answer            | Next re-solve                                                                            |
  | ----------------- | ---------------------------------------------------------------------------------------- |
  | Solved alone      | in about a week                                                                          |
  | Small hint        | in 3–4 days                                                                              |
  | Read the solution | in 2–3 days, as a real re-solve without looking                                          |
  | Couldn't solve    | the next day, with an easier related problem suggested first; the pattern is marked weak |

- **Stricter "strong" for DSA:** a problem becomes strong only when **solved alone on a later re-solve**, not on the first attempt, because that's what an interview tests. Once strong, gaps keep growing while re-solves stay "solved alone". A pattern (e.g. Sliding window) is strong when most of its core problems are.
- Neutral wording: reading a solution is a normal part of learning; the app just plans around it.
- **Optional timer** for those who like it; without it, the planned time counts.
- These are built-in study fields (the planning and revision engine needs them), separate from custom trackers.

### Study mode and phone distractions (decided 2026-11-20)

The UPSC user asked for the app to block phone notifications while studying. A web app can't: phones don't let web apps change Do Not Disturb or block other apps. So, for her Android phone:

- **Study mode:** started from Today or from a block, it opens a **focus screen** (the current block and topic, an optional timer, a "done" button) and asks her to **turn on Do Not Disturb** ("swipe down → tap Do Not Disturb", with a picture for her phone; buttons "Done" and "Not today").
- **Turning DND off matters as much:** ending study mode reminds her to turn DND off. If she forgets to end it, one notification **15 minutes after the session's last block**: "Study mode is still on. End it and turn off DND?"
- **A nudge at the planned start:** at the start of a study session (consecutive study blocks between personal blocks), one notification: "Polity at 5:30. Start study mode?", with **"Start now"** and **"In 10 min"**. No nudge if study mode is already on. The user picks how often: every session (default), first session of the morning and afternoon, or off.
- **A missed nudge is never a failure:** no "missed session" message; the plan re-plans as usual.
- **Notification permission is asked in context**, the first time nudges or reminders are turned on, with one line saying why, never on the first screen.
- **Few, useful notifications:** one settings screen lists every notification (study-mode nudge, DND-off reminder, nightly review), each with its own on/off.
- **Later, in a native Android app:** study mode turns DND on and off by itself, with her permission. **Not in Phase 1:** a guided automatic DND schedule (she wouldn't set it up). Kept as an idea.

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
- **Strength, not just coverage:** progress comes from "how well" taps and revision results, not from "covered". What matters is what the user still remembers, not what they once read: a "100% covered" bar can hide a forgotten syllabus.
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

- **How it's written:** now, a **Google Sheet** set up for it (dropdowns for size, importance and stage so typos are impossible; colours; one tab per subject), converted by a script into the track's **data file in the repo**. That file is the **master copy** of the template (versioned, reviewed, schema-checked, the same for every environment). The **app reads from the database**: on each deploy, an **idempotent sync** copies the file into the database's template tables; template rows are never edited in the database directly. User data (progress, edits, plans) always lives only in the database. No separate authoring app (an admin app is a Phase 1 non-goal); a git-based CMS (e.g. Keystatic) is an option if the sheet becomes limiting.
- **The master copy moves into the database** when any of these happens: non-developers edit templates regularly; edits become frequent (weekly or more); outside authors publish track packs; authors need drafts, review and publishing; there are many tracks with their own authors. (Not the number of users: users already read from the database.) The move is easy: stop the sync, let the editor write the same tables, keep exporting a file as backup; users' progress points to permanent topic IDs, so their data doesn't change.
- **A shared template + each user's own layer:** picking a track links to the shared template; the user's target date, stage, progress and edits are their own layer. Fixes to the template reach everyone. The layer stores only the user's changes (an overlay, like VS Code's settings over its defaults), never a copy of the syllabus: with copies, a fix or a yearly change in exam patterns would never reach existing users without merging into every copy. A ready-made track is a data-only **track pack** in the extension host, like a theme, so others could publish track packs later.

### The user's syllabus: viewing and editing (decided 2026-11-20)

- **Every user sees their whole syllabus** (also where the strong/weak topic map lives). It works as installed, with no editing needed.
- **Edit any time, a bit at a time:** add, hide, rename, reorder or move topics, change a topic's labels. Every edit updates plans and the forecast, showing the effect first. On a phone: collapsible subjects, search, bulk actions ("I've covered all of Polity").
- **Template updates never override the user's edits;** new topics we add appear marked "new", to keep or hide.
- **"Completed" is worked out from topics, never stored for a section.** Adding a topic to a finished section: the new topic is "not started", the section's percentage recalculates, existing progress is untouched. By default it's scheduled **by importance**; the user can instead pick this week, next week or a date (with the capacity check and forecast effect shown).
- **Edge cases:** a new subtopic makes its topic partly done (only the new part is scheduled); a topic studied elsewhere can be marked done right away with a "how well" rating; moving a topic moves its progress; hiding a finished topic keeps its history and can be undone; a topic we remove from the template keeps the user's history: it stays in their syllabus as "retired from the track", with its progress, and can be hidden.
- How much **editing** is built in Phase 1 is decided at the features step; **viewing** is Phase 1. **Personal editing** (the user's own layer, seen only by them) is different from **author mode** (changing the shared template for every user of a track: needs permission, drafts, publishing and versions). Phase 1 builds personal editing only; template fixes are reported to us and made in the sheet. Author mode comes later, with the same editor.

### Personal tracking and the dashboard (decided 2026-11-20)

Every user tracks different things (her paper planner tracks mood, water, gratitude, top 3 goals, mock scores), so:

- **Custom trackers:** a user creates a tracker with a name, a type and, optionally, a goal and how often. Types: **number** (water: goal 8 a day; mock score out of 100), **rating** (how was my day), **text** (gratitude), **yes/no** (wake early, prayer). Habits are just daily yes/no trackers: one general idea, not many special features.
- **A dashboard made of cards** (widgets): Today's plan, the streak calendar, study hours, each tracker, top 3 goals, notes. Users add, remove and reorder cards, starting from **ready-made layouts** (her planner can become a "Daily planner" layout others can pick). The dashboard is a **slot** in the extension host, so extensions can add cards later.
- **Never an empty screen:** every track comes with good defaults (a layout and the trackers it needs); customising is optional.
- **Not full design freedom** (free-form pages like Notion): expensive, and free layouts break on phones and hurt accessibility. The look is covered by themes.
- Trackers are data and the dashboard is a slot of cards from the start; which parts are built in Phase 1 is decided at the features step.

### Decide when building (parked 2026-11-21)

Details to settle when the feature is built (with the real screen and real use), not up front:

- **Unfinished work:** missed revision versus a missed new topic (revision comes back sooner; cap an overdue pile after a bad week); what "skip" means; an item postponed again and again; what "most important first" ranks by.
- **End-of-day review, quick revision, personal blocks, trackers and the dashboard:** revisit and challenge, as done for the daily plan and finishing a block.

## Features and non-goals (topic 3, in progress)

The aim: a **first version (v0.1)** both users use daily within weeks; everything else already designed comes in later versions.

### Who uses v0.1 first (decided 2026-11-21)

- **The DSA user (the developer) first**, using it for real study ("eating your own dog food"): problems are found and fixed the same day.
- **The UPSC user joins when v0.1 is stable**, which means all of:
  - 7 days in a row of real use by the DSA user;
  - no lost or wrong data in those 7 days;
  - the daily loop (today's plan → study → tick and rate → re-plan) works on an **Android phone** (her device), not just a laptop;
  - the UPSC content for v0.1 is ready.

### UPSC content for v0.1 (decided 2026-11-21)

- **The complete Prelims syllabus at subject → topic level**, every subject, every topic labelled (size, importance, stage), so she edits rather than creates. She adds deeper levels herself where she wants them.
- **Polity first, as a sample:** Polity is written and shown to her before anything else, to agree the style (the split, names, labels and depth). Once she agrees, we ask her for **all her subjects** (including her optional subject) and write them in that style. Later deepening is additive (permanent topic IDs and her own layer keep her progress); only a wrong top-level structure would need a rewrite, which the sample catches.
- **Written in parallel with building v0.1**, finished before she joins, so it doesn't delay her start.
- **Current Affairs** is a recurring study block (daily reading), not syllabus topics.
- **v0.1 needs basic syllabus edits:** hide, rename, add a topic, add a deeper level. The full editor can come later.

### v0.1 features (decided 2026-11-21)

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

**Designed, but built later:** nightly review, light day / day off, forecast + weekly report (v0.2 candidates); then weekly and monthly targets, custom trackers + card dashboard, quick revision, custom tracks, the "why not" answers, wellbeing hints and routine coaching, Advanced settings, the extension host (v0.1 loads track syllabi straight from data files) and installable themes, smart quizzes. Themes are decided in the UI discussion.

### Non-goals for Phase 1 (decided 2026-11-21)

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

## Foundation decisions (topic 4, in progress)

Only decisions that are hard to change later.

### Sign-in (decided 2026-11-21)

Full record, with alternatives and sources: [decision 010](../decisions/010-sign-in-and-sessions.md).

- **Sign in with Google**, for everyone in Phase 1 (all agreed). Only basic sign-in information (name, email): Google calls this non-sensitive, so no app review is needed. Phase 1 runs in Google's **testing mode**; public launch needs Google's lighter **brand verification** (a homepage and privacy policy on our own domain), which launch needs anyway.
- **Passkeys** (fingerprint or face) at public launch, for faster sign-in without Google.
- **Invite-only:** only invited emails can sign in. The invite list lives in the **database** (never in the public repo), managed with a small command (no admin app). Anyone else sees "Kiseki is invite-only for now", and no account is created.
- **Identity is Google's permanent account ID**, not the email (emails can change); the email is kept for contact and invites.
- **One user, several sign-in methods:** a person and their sign-in methods are stored separately, so passkeys are added later without a rebuild.
- **Server-side sessions for user login, not JWTs:** the session lives in our database; the browser holds only a random ID in a **secure, HTTP-only cookie**. Signing out deletes the session, so **"sign out of this device"** and **"sign out everywhere"** take effect immediately. (JWTs can't be revoked before they expire, which is why security guidance such as OWASP recommends server-side sessions for browser login.) Sessions last about **90 days per device**, renewed with use. Only a **hash** of the session token is stored, so a leaked database can't be used to log in. **CSRF protection:** SameSite cookies plus checking that changing requests come from our own site.
- **Where JWTs fit (later):** verifying claims **between servers** (e.g. services split out in future phases), as **short-lived** tokens (minutes), never as the user's login session.
- **Only name and email** are stored from Google (picture optional), nothing more.
- **Which library or service** builds this is agreed at the sign-in build step.

### Installable app and offline (decided 2026-11-21)

Full record, with alternatives: [decision 011](../decisions/011-offline-and-local-first-readiness.md).

- **Installable** (home-screen icon, opens full-screen), using the same browser technology (a service worker) that notifications need.
- **The daily loop works offline:** Today and tomorrow (and the syllabus) are kept on the device; ticks, ratings and "how much" are saved on the device at once and sent automatically when the connection returns, with a calm "3 changes waiting to sync" indicator, never an error. The same design makes flaky connections safe: a retry can never create a duplicate. Editing the routine or syllabus needs internet in v0.1, and those screens say so clearly.
- **Each event records two times:** when it happened on the device (which decides its study day, in the user's time zone with the 4 am rule) and when the server received it.
- **Built "D-ready" for a later local-first app** (everything offline, instant everywhere):
  1. **IDs are created on the device** when an item is created, not by the server;
  2. **study actions are stored as events** that are only ever added, never edited in place, so they can't conflict and give a complete history (strength, streaks and progress are calculated from them);
  3. **the planning and revision engine is plain shared code** (pure functions in a shared package), not locked inside the API server, so it can later also run on the device.
- **Move to local-first later** when Phase 1 shows users are often offline or want to edit offline, when speed becomes a competitive edge, or before a public launch with users on patchy internet. The first UPSC user is rarely offline, so Phase 1 doesn't need it.

### Notifications machinery (decided 2026-11-21)

Full record, with alternatives and sources: [decision 012](../decisions/012-notifications-machinery.md).

Researched approach: a durable schedule in the database, a regular sweep, and an outbox, so a notification is never lost and never sent twice.

- **Delivery:** the browser **Web Push** standard (works for the installed app on Android and desktop), behind our own interface so a service like Firebase could replace it without touching anything else. Each notification opens the exact screen it's about.
- **The routine is the intent:** nothing is pre-scheduled; routine edits apply automatically.
- **A sweep every minute** (a cron job in a Postgres-based queue, which runs once even with several servers) finds study sessions starting now in **each user's own time zone**. Users' time zones are stored by full name (e.g. `Asia/Kolkata`), never as a bare hour, with defined behaviour when clocks change.
- **One record per occurrence**, with a uniqueness rule (user + session + date): an overlapping or repeated sweep can't create a second one.
- **Outbox:** the record and its delivery job are written in **one transaction**, so nothing is lost between deciding and queueing.
- **The delivery worker** sends, retries on failure, marks "sent" only after success, and removes a device's subscription when the browser reports it gone.
- **Catch-up window:** if sending was delayed (e.g. the worker was down), a nudge is still sent up to **10 minutes late**, otherwise skipped: a late "start studying" nudge is noise.
- **Likely tool:** pg-boss (Postgres only, no Redis; cron and adding jobs in the same transaction), confirmed at the build step. Redis-based queues (BullMQ) aren't needed at our volume.
- **Platforms:** Android works fully; iPhones need iOS 16.4+ with the app on the home screen (Chrome on iPhone has no push), which doesn't affect Phase 1 users.

### Data model: the concept (decided 2026-11-21)

Full record, with alternatives and sources: [decision 013](../decisions/013-data-model-concept.md).

The main things stored and the rules between them. Tables and columns are designed feature by feature during development.

| Group                                                   | Things                                                                                                                                                                                                                                                                                              |
| ------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **People and access**                                   | **User** (time zone, day-end hour, week start, settings) · **Sign-in method** (Google now, passkey later; several per user) · **Session** (one signed-in device; only a token hash) · **Invite**                                                                                                    |
| **Shared content** (from data files, same for everyone) | **Track template** (version, stages) · **Template topic** (subject → topic or DSA problem; permanent ID, labels, resources)                                                                                                                                                                         |
| **Each user's layer**                                   | **Enrolment** (the user follows a track: target date, stage, revision slider) · **Topic change** (the user's change to a template topic, or a topic they added)                                                                                                                                     |
| **Planning**                                            | **Routine** (weekly blocks: study or personal) · **Day change** (light day, day off, copied routine, marked in advance) · **Day plan** (the fixed plan for one study day; stored once fixed, so it stays stable)                                                                                    |
| **Study history**                                       | **Study event** (everything done: ticks, how much, ratings, "studied something else", "not recorded" answers, study mode; only ever added; device-created ID and two times) · **Topic state** (strength, next revision date; calculated from events and rebuildable: a saved result, not the truth) |
| **Notifications**                                       | **Push subscription** (a device that can receive) · **Notification occurrence** (one per user + session + date, with status)                                                                                                                                                                        |
| **Security record**                                     | **Sign-in and session events** (for "your devices" and security), nothing more for now                                                                                                                                                                                                              |

**Designed, not in v0.1:** weekly and monthly targets, custom trackers and entries, dashboard layouts, flashcards, custom tracks (a template owned by a user), installed extensions and themes, **roles**.

**Rules:**

1. **Events are the truth** for study history; strength, streaks and progress are calculated from them. The day plan is stored on purpose (stability).
2. **IDs are UUIDv7**, created on the device when an item is created (offline-safe, time-ordered so indexes stay fast; built into Postgres 18). An ID is never a security check.
3. **All times are stored in UTC with the time zone**; changeable things record when they were created and last updated.
4. **Every user-owned thing has exactly one owner**, and all access goes through **one authorization layer**: in v0.1 the only rule is "is this yours?". Checks name **actions** (`can(user, "publish-track")`), never roles, so roles (admin, author, support) and relationships (a coach seeing a student) plug in later. Tests try to read other users' data. Row-level security in Postgres as a second safety net is decided at the database setup step. Extension permissions stay a separate system.
5. **Deletion is designed in:** everything a user owns links back to them, so **deleting an account removes all of it**, events included (the one exception to "events are never changed"). Soft delete with a 30-day undo only where undo matters (e.g. a deleted custom topic), then real erasure; a "deleted" flag alone isn't erasure. **No personal data in logs** beyond IDs.
6. **Privacy law:** India's DPDP Act (main duties from about May 2027, 72-hour breach reporting) applies at public launch; rule 5 is what it needs. Users under 18 need verifiable parental consent: not an issue for Phase 1 (all users are adults), but a public launch item.
7. **Not in v0.1:** organisations or multi-tenancy, a full audit log of every change (study events already give history), data export.

## Build order (topic 5, in progress)

### How we build (decided 2026-11-21)

- **Feature by feature ("vertical slices")**, not layer by layer: each feature is built through every layer (database → API → screen) before the next starts, so something works from the first slice and problems show up early.
- **First, a walking skeleton:** the thinnest slice of real functionality that is **built, deployed and tested end-to-end automatically**. It's production code, not a prototype. Ours: open the URL on an Android phone → "Sign in with Google" (invite-only) → a plain "Hello" screen → install it to the home screen.
- **Hosting moves near the start** (not a late "deploy step"): hosting problems are cheapest to find in the first week.
- **Design runs one step ahead of building ("dual-track"):** the design session (the UI discussion) happens **right after planning**, before and alongside the setup steps, and must be done before the first feature slice; then while slice N is built, slice N+1 is designed. Same people, not a separate phase. Starting design first also lets the web skeleton's neutral tokens follow the agreed design direction.

### Order (decided 2026-11-21)

0. **Design session (the UI discussion), right after planning:** design direction, the UPSC user's 3 themes, key screens (Today, finishing an item, syllabus, routine), every screen size, motion. It can run alongside steps 1–6 and must be done before the feature slices.
1. **CI:** minimal first (install, lint, typecheck, test, audit on every push), proven reliable before automatic deployment.
2. **Postgres + Drizzle**, including the row-level security decision.
3. **`packages/contracts`:** shared request and response types.
4. **The web app skeleton:** React + React Router, installable basics, **neutral design tokens** (colour roles, spacing, type scale; brand colours and themes come later).
5. **Hosting + automatic deployment:** every merge to `main` goes live.
6. **Sign-in**, plus **one automated end-to-end test** in a real browser.
   → **Walking skeleton done:** sign in on an Android phone, deployed and tested automatically.
7. **Feature slices** for v0.1, with design one slice ahead (below).

### Feature slices (decided 2026-11-21)

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

Then the "stable" checklist (see "Who uses v0.1 first"), and the UPSC user joins. Offline is part of slice 4, not a separate slice: the event design is offline-ready from the start (decision 011).

**Sources:** Freeman & Pryce, _Growing Object-Oriented Software, Guided by Tests_ ([ch. 10, the walking skeleton](https://www.oreilly.com/library/view/growing-object-oriented-software/9780321574442/ch10.html)); J. Patton, [dual-track development](https://jpattonassociates.com/dual-track-development/); thoughtbot, [a lean approach to design systems](https://thoughtbot.com/blog/a-lean-approach-to-design-systems); DEV, [add CI when the project can boot](https://dev.to/oranguengineer/add-ci-when-the-project-can-boot-not-when-it-feels-finished-20m9).

## Product principles (decided 2026-11-20)

### Settings: great defaults, two levels

1. **Great defaults everywhere.** Most people never open settings; the app must work well without them.
2. **Two levels:**
   - **Settings:** what many people change: notifications, routine, study mode, theme, tracks.
   - **Advanced:** tuning for people who care: the day-end time, the streak rest-day limit, the week start, the revision slider's default, suggestion behaviour.
3. **A setting is added only when real users genuinely differ.** "We couldn't decide" is a reason to decide, not to add a setting: every setting multiplies the cases to build and test, and too many make the important ones impossible to find.
4. **Switch off where it appears:** prompts carry "Don't ask again"; everything switched off can be switched back on in settings.
5. **Search in settings**, so nothing is lost, even in Advanced.

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
