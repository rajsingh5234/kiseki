# Phase 1: syllabus and tracking

## Ready-made syllabus (decided 2026-11-20)

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

## The user's syllabus: viewing and editing (decided 2026-11-20)

- **Every user sees their whole syllabus** (also where the strong/weak topic map lives). It works as installed, with no editing needed.
- **Edit any time, a bit at a time:** add, hide, rename, reorder or move topics, change a topic's labels. Every edit updates plans and the forecast, showing the effect first. On a phone: collapsible subjects, search, bulk actions ("I've covered all of Polity").
- **Template updates never override the user's edits;** new topics we add appear marked "new", to keep or hide.
- **"Completed" is worked out from topics, never stored for a section.** Adding a topic to a finished section: the new topic is "not started", the section's percentage recalculates, existing progress is untouched. By default it's scheduled **by importance**; the user can instead pick this week, next week or a date (with the capacity check and forecast effect shown).
- **Edge cases:** a new subtopic makes its topic partly done (only the new part is scheduled); a topic studied elsewhere can be marked done right away with a "how well" rating; moving a topic moves its progress; hiding a finished topic keeps its history and can be undone; a topic we remove from the template keeps the user's history: it stays in their syllabus as "retired from the track", with its progress, and can be hidden.
- How much **editing** is built in Phase 1 is decided at the features step; **viewing** is Phase 1. **Personal editing** (the user's own layer, seen only by them) is different from **author mode** (changing the shared template for every user of a track: needs permission, drafts, publishing and versions). Phase 1 builds personal editing only; template fixes are reported to us and made in the sheet. Author mode comes later, with the same editor.

## Personal tracking and the dashboard (decided 2026-11-20)

Every user tracks different things (her paper planner tracks mood, water, gratitude, top 3 goals, mock scores), so:

- **Custom trackers:** a user creates a tracker with a name, a type and, optionally, a goal and how often. Types: **number** (water: goal 8 a day; mock score out of 100), **rating** (how was my day), **text** (gratitude), **yes/no** (wake early, prayer). Habits are just daily yes/no trackers: one general idea, not many special features.
- **A dashboard made of cards** (widgets): Today's plan, the streak calendar, study hours, each tracker, top 3 goals, notes. Users add, remove and reorder cards, starting from **ready-made layouts** (her planner can become a "Daily planner" layout others can pick). The dashboard is a **slot** in the extension host, so extensions can add cards later.
- **Never an empty screen:** every track comes with good defaults (a layout and the trackers it needs); customising is optional.
- **Not full design freedom** (free-form pages like Notion): expensive, and free layouts break on phones and hurt accessibility. The look is covered by themes.
- Trackers are data and the dashboard is a slot of cards from the start; which parts are built in Phase 1 is decided at the features step.
