# Syllabus (decided 2026-11-22)

Where the user sees and edits a track's whole syllabus, with the topic map. Designs: [design canvas](https://claude.ai/artifact/NCpckrVSrxtNhVVmB2vWE1).

- **Overview:** a track switch (UPSC / DSA), a search box, the **topic map** (one bar: strong / okay / weak / not yet, with counts and "N of M studied"), then one card per subject in its subject colour, with "N of M studied" and a mini strength bar.
- **One subject:** its bar and legend, filter chips (All / Due / Weak / Not started, with counts) and the topic list; each topic shows a labelled strength badge (Strong / Okay / Weak / Not yet) and a tag when relevant ("Due today", "New today"). "Add a topic" is at the top.
- **One topic:** strength, last revised (with how well it was remembered), next revision, how many times studied, its labels (size, importance, stage), the user's notes, deeper levels ("Add a deeper level"), and the v0.1 actions: "I revised this" (pinned at the bottom; opens the revision question), Rename and Hide. A topic not started yet shows "Mark as studied" instead.
- **Every size:** stacked screens on phones (bottom bar) and tablet portrait (side rail); subjects and topics side by side on tablet landscape and laptop, with the topic as a side panel; on desktop the topic is a third column.
- **Strength is never colour alone:** every bar has a legend with words and counts, and every topic badge has its word; strength comes from revision answers and fades over time, as decided in [progress](../product/phase-1/02-daily-journey.md).
- **Rule for components:** a pinned main action stays visible while long content scrolls above it.
