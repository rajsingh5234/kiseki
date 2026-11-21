# Phase 1: the daily journey

Design order: the **daily journey first** (used hundreds of times, so it decides whether Phase 1 succeeds), then the first-time journey (only asks what the daily journey needs). The daily journey starts **already signed in**: each device remembers the user and opens straight on Today.

## Evidence: the first UPSC user's own paper planner

Before Kiseki, she designed an A4 daily planner. What it shows:

- **She plans by time blocks**: a fixed timetable for the whole day, each block with a subject or task, a **target** (an amount like "15 pages", a duration like "15 min", or just done / not done), a done tick and notes.
- **Not only study:** routine, meditation or prayer, meals, a walk, family time, sleep; a weekly **habit tracker** (wake early, exercise, prayer, reading, revision, sleep on time) and water intake.
- **Revision** is one same-day block ("revise what you studied"); nothing brings back older topics (problem 3).
- **Consistency:** a month calendar with a tick per day, in effect a streak (problem 2).
- **Progress:** total study hours, pages completed, mock test score out of 100 (problem 4).
- **End of day:** "How was my day?" (great / average / need to improve), tomorrow's top 3 goals, a "plan tomorrow" block, notes, gratitude.
- **Risk it shows:** about 12–13 study hours every day. On paper, one bad day breaks the plan and is hard to restart; an app can re-plan missed blocks instead.

## When the app is used (decided 2026-11-20)

Both users use all four moments:

1. **Start of the day:** see today's plan instantly.
2. **During study:** start a block and mark it done in one or two taps (with notes).
3. **End of the day:** a short summary, how the day went, move unfinished work, plan tomorrow.
4. **Short free moments** (mostly on the phone): quick revision that fits a few minutes.

## Non-study things (decided 2026-11-20)

- A day's plan holds **study blocks** (linked to a track's topic or problem) and **personal blocks** (just a name and a time: lunch, walk, prayer), so the plan matches a real day.
- **Personal blocks never count as study:** study hours, progress and "on track for the date?" use study blocks only.
- **Habits** (daily ticks like water intake or waking early) are simply **trackers** (see ["Personal tracking and the dashboard"](03-syllabus-and-tracking.md#personal-tracking-and-the-dashboard-decided-2026-11-20) below); whether they are in Phase 1 is decided at the features step.
- Not a "Health" track: a track has a syllabus, a target date and progress, which personal blocks don't.

## How today's plan is made (decided 2026-11-20)

- **The user sets the routine:** time blocks per subject or track (e.g. "5:30–6:30 Geography", "7–8 pm DSA"), plus personal blocks. The user decides **when**.
- **The app fills each study block** with exactly **what** to do: the next topic in the syllabus, revision that is due, problems to solve. Missed blocks are re-planned instead of left as failures.
- **The user can change anything**, any block, any day.
- **New topics versus revision:** the app fills each study block starting from what is **due for revision** (things about to be forgotten), then new topics, and **shifts toward revision as the target date gets closer** (for a starter, roughly: mostly new early on, about even in the middle months, mostly revision and mocks in the last 2–3 months; the real split depends on pace and syllabus size and is tuned at the check-ins). Revision is woven into each subject's blocks ("Polity: revise ch. 3, then ch. 6"), not left to one block at the end of the day. A slider per track lets the user lean "more new" or "more revision" at any time. This prevents the classic first-attempt failure: syllabus covered, but forgotten by the exam.
- How the app picks (topic order, revision timing, balancing tracks) is designed later.

## Different days (decided 2026-11-20)

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

## Today's plan stays stable (decided 2026-11-20)

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

## Why this item? (decided 2026-11-20)

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

## A realistic routine and wellbeing (decided 2026-11-20)

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

## Weekly and monthly targets (decided 2026-11-20)

Plans have levels: **target date → monthly milestones → weekly targets → daily plan**.

- **The app proposes, the user adjusts:** working backward from the target date and the user's routine, the app proposes monthly milestones (e.g. "August: Polity + Economy revision") and weekly targets (e.g. "Polity ch. 5–9, 2 mocks"); the daily plan follows them. The user reviews and edits any level. (The UPSC user plans her own weeks and months; the DSA user plans weekly and lets the app propose months.)
- **Pinned targets:** a target the user edits is pinned; the app never moves it silently. If it becomes unrealistic, the app warns and offers choices (move part of it, add time, keep it). Targets the user hasn't touched re-plan themselves, as for unfinished work.
- **Measured in syllabus units and activities** (chapters, topics, problems, mock tests), not hours.
- **Calendar months**; the week starts on a day the user chooses (default Monday).
- **Per track, with a shared capacity check:** targets belong to a track, but all tracks' targets together must fit the user's time; the app warns before an impossible week is set.
- **Reviews:** next week's targets in the weekly report (the user's chosen day); a short monthly check-in in the nightly review at the start of each month. No extra notifications.
- **No target date** (e.g. learning a language): no backward planning; the user sets a pace ("3 lessons a week") and the app plans forward.
- **Importing a schedule** (e.g. a coaching institute's monthly plan) is important for the product, but neither Phase 1 user needs it now: planned for later. The design is ready: an imported schedule simply becomes pinned monthly and weekly targets.

## Finishing a study block (decided 2026-11-20, refined the same day)

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

## Ticking an item: the finish sheet (decided 2026-11-21)

- **A bottom sheet:** tapping an item's tick fills it and slides up a short sheet with the item's one question and three big answer buttons; "Only part done?" and "Add a note" sit below as small links. The same sheet is used on Today, in study mode and in the end-of-block catch-up. Amount and note stay one tap away, never shown by default (this happens 10+ times a day).
- **Answering saves and closes:** an answer saves the answer, amount and note together; there is no Save button.
- **Closing without answering keeps the item done:** the answer is stored as "not answered" (never a made-up value), and planning uses a safe middle until then (new: "partly", so it comes back the next day; revision: "some", the gap stays). It's asked once more later, optionally: in v0.1 as a small dismissible card at the top of Today the next time the app is opened ("1 quick question from yesterday"); with the nightly review (v0.2), there.
- **Undo:** a quiet message ("Done. Fundamental Rights is in your revision plan.") with **Undo** stays about 6 seconds, pauses while touched or focused by a screen reader, and sits above the bottom bar. Undo reverses the tick, answer, amount and note, and restores the revision plan.
- **Changing it later:** tapping a ticked item reopens the sheet in edit mode with what was saved: change the answer, amount or note, or "Mark as not done". A plain re-tap never unticks silently.
- **Only part done:** a stepper (`− 12 +` "of 15 pages", tap the number to type) starting at the full amount; time in 10-minute steps; not shown for done / not-done items. The question is still asked about the part done; the rest becomes a new unfinished piece ("Directive Principles, pages 13–15"). On the card, the item shows a partly filled circle and "12 of 15".
- **Notes:** plain text (voice typing comes from the phone's keyboard), saved with the answer, and shown again when the topic comes up for revision ("Your note: …") and on the topic in Syllabus. Photo notes are a v0.2 candidate.
- **Motion (quiet, since this happens 10+ times a day):** the tick draws in (about 120 ms); the sheet rises from the bottom with a soft spring (about 250 ms) and closes faster (about 150 ms); after an answer, the card's progress ring sweeps forward and the message fades in. No pop or bounce: that's kept for earned milestones (the whole day done). With reduce motion on, everything is a simple fade. All of it runs through the motion engine ([themes, effects and motion](../../design/themes-effects-motion.md)).

## Study mode and phone distractions (decided 2026-11-20)

The UPSC user asked for the app to block phone notifications while studying. A web app can't: phones don't let web apps change Do Not Disturb or block other apps. So, for her Android phone:

- **Study mode:** started from Today or from a block, it opens a **focus screen** (the current block and topic, an optional timer, a "done" button) and asks her to **turn on Do Not Disturb** ("swipe down → tap Do Not Disturb", with a picture for her phone; buttons "Done" and "Not today").
- **Turning DND off matters as much:** ending study mode reminds her to turn DND off. If she forgets to end it, one notification **15 minutes after the session's last block**: "Study mode is still on. End it and turn off DND?"
- **A nudge at the planned start:** at the start of a study session (consecutive study blocks between personal blocks), one notification: "Polity at 5:30. Start study mode?", with **"Start now"** and **"In 10 min"**. No nudge if study mode is already on. The user picks how often: every session (default), first session of the morning and afternoon, or off.
- **A missed nudge is never a failure:** no "missed session" message; the plan re-plans as usual.
- **Notification permission is asked in context**, the first time nudges or reminders are turned on, with one line saying why, never on the first screen.
- **Few, useful notifications:** one settings screen lists every notification (study-mode nudge, DND-off reminder, nightly review), each with its own on/off.
- **Later, in a native Android app:** study mode turns DND on and off by itself, with her permission. **Not in Phase 1:** a guided automatic DND schedule (she wouldn't set it up). Kept as an idea.

## Unfinished work (decided 2026-11-20)

- **By default the app re-plans:** unfinished items go back into the queue and are spread over the coming days within the user's normal daily time, most important first. No snowball onto tomorrow, no "failed" page.
- **The user can choose instead**, per item or for all of them: tomorrow, later this week, next week, next month, a specific date, or skip. The app shows the effect on the target date before confirming (e.g. "this moves your finish date 2 days later").
- **Kind but honest:** the summary says "3 items moved to later this week", never "you failed 3 tasks"; when missed work adds up, the target-date view says "behind" and offers to adjust (more time per day, or a later date).

## End-of-day review (decided 2026-11-20)

- A **short nightly review** (about 30 seconds): what was finished, what moved and where (the user can change it: tomorrow, next week, next month, a date, or skip, as in "Unfinished work"), the user's evening trackers (mood, gratitude…), and **tomorrow's plan** to glance at, tweak, and pick the top 3 goals.
- **An optional reminder** at a time the user picks (e.g. 9:30 pm), or none; the review screen is also always available.
- **Skippable:** skipping breaks nothing; the app re-plans anyway.
- Its contents come from the user's own trackers and cards, so each person's review matches their planner.

## Quick revision in short free moments (decided 2026-11-20)

- **Now:** **recall prompts** (the app shows something studied; the user recalls it, checks against their own notes, and taps how well they remembered) and the user's **own flashcards** (question → answer). Both work for every track with no content from us.
- **Later, as extensions:** ready-made question banks (e.g. Prelims MCQs) and AI-generated questions.
- Every format feeds the same revision engine through the "how well did you remember" tap.

## Smart quizzes on weak areas (planned future extension)

Automatic questions on the **completed** syllabus, focused on what is **weak** for this user, with **explained answers**. Two separate jobs:

1. **Choosing what to ask about** (completed + weak + not revised recently): our own revision engine, from data collected from day one (completed topics, "how well" taps, last revision). No AI needed; it also drives recall prompts, so it is part of Phase 1.
2. **Writing questions with explained answers:** a question bank (correct but large to build or license) or AI (unlimited, but can be confidently wrong, costs per question, and sends notes to a provider). Safeguards for a world-class version:
   - **grounded:** the AI writes only from trusted text (the user's notes or sources we may use), never from memory;
   - a **"report a wrong question"** button; reported questions are removed;
   - **reuse** good questions across users (lower cost, quality builds up);
   - for DSA, AI for concept questions; real problems come from tested problem lists.

**Foundation in Phase 1:** the extension host API exposes a user's **progress and weak areas** to extensions, behind a permission ("this extension wants to read your progress"), so a smart-quiz extension plugs in later without app changes. Whether the extension itself is built in Phase 1 is decided at the features step.

## Seeing progress (decided 2026-11-20)

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
