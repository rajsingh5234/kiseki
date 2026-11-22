# First launch (decided 2026-11-22)

Designs: [design canvas](https://claude.ai/artifact/NCpckrVSrxtNhVVmB2vWE1) (the welcome and invite-only rows, every size).

## Welcome and sign-in

- **One screen with sign-in on it** (no intro slides): an illustration, the headline "Your exam, day by day", one line ("Kiseki plans each study day, brings topics back before you forget them, and adjusts when life gets busy."), the "Continue with Google" button, and "By continuing, you agree to the Terms and Privacy Policy" (Google's verification needs the visible privacy link).
- **The Google button follows Google's branding rules:** the dark theme (`#131314` fill, 1px `#8E918F` border, `#E3E3E3` text), the standard multicolour G unchanged, the wording "Continue with Google", a pill 52px tall.
- **Every size:** stacked (illustration above, white panel below) on phones and tablet portrait, with the button visible without scrolling on a 360×640 phone; split (illustration left, sign-in right, text left-aligned, the heading beside the button) on tablet landscape and wider.
- **The wordmark** is "Kiseki" in the heading font; the meaning of 軌跡 goes on an About page later.
- **After Google:** an invited first-timer goes to the theme picker, a returning user to Today, anyone else to the invite-only page.

## Invite-only page

- The same layout with an envelope illustration: "Kiseki is invite-only for now", the Google account used, "Ask the person who shared Kiseki with you to add this account", then "Use a different account" (our own button: Google's G only appears next to Google's own wording) and "Back to the start".

## Choose your look (step 1 of setting up)

- **One screen, right after the first sign-in:** "Choose your look", a live preview of the real Today screen that changes as choices are tapped, three style cards (Flat, Clay, Glass, each with a small swatch in its style) and a "Light or dark" switch (Auto, Light, Dark; "Auto follows your phone's setting"). Flat and Auto are pre-selected, so one tap on Continue is enough; everything can be changed later in You. The bottom bar style stays in Settings, to keep this screen to two choices.
- **Every size:** stacked on phones and tablet portrait (preview of the top of Today), with Continue visible without scrolling on a 360×640 phone; split on tablet landscape and wider (a whole phone-sized preview on the left, choices on the right).
- **A thin progress bar** shows where she is in setting up.
- **When more themes arrive,** a theme row joins this screen above the styles.

## Setting up (decided 2026-11-22)

Six short steps after the first sign-in, each asking only what the first day's plan needs; a thin progress bar fills as she goes, and every step but the first has Back. Everything can be changed later in You.

1. **Choose your look** (above).
2. **Pick your tracks:** UPSC, DSA or both (multi-select cards).
3. **About your prep,** one short screen per picked track (3–4 questions), including the target date and stage. Each question shows "How this shapes your plan".
   - **UPSC:** target (next Prelims date pre-filled; Prelims / Mains / both), attempts (first / attempted before, how many), optional subject (from the list, or "not decided yet").
   - **DSA:** when the interviews are (about 1 month, 2–3 months, 4–6 months or no fixed date; an exact date is optional), problems solved so far (0, under 50, 50–150, 150+, matching the common 75- and 150-problem lists), goal (internship / first job / experienced role) and language (Python, Java, C++, JavaScript, other; most common first). No age or years-of-experience question: they don't change the plan, and DPDP says to collect only what's needed.
   - **Controls:** the UPSC exam is picked as an exam year (cards with the real date from the track pack's calendar data, or "date not announced yet", using an estimate until UPSC publishes it), not a date picker; DSA's timeframe is chips, with "Pick an exact date" opening the phone's own date field (typing allowed). Other answers are tap chips (selection shown by fill and outline). UPSC's optional subject opens a searchable list ("Not decided yet" first, then Subjects and Literature), full screen on phones and a dialog on wider screens, since the keyboard hides half of a small popup. On small phones the questions scroll under a fixed Continue.
   - **The questions are data owned by each track pack** (like its syllabus), so a new track brings its own questions without changing the app.
   - **No "rate yourself" level question:** self-ratings are unreliable (people who know less tend to overestimate), so we ask about facts and experience, and the revision engine learns the real level from her first weeks of answers. A placement quiz comes later, with smart quizzes.
4. **Already covered?** Quickly mark subjects already studied, per track; "Skip for now" allowed.
5. **Your week:** pick a starting pattern (mornings, evenings, split day), then adjust the blocks.
6. **Reminders:** our own short explanation first ("We'll nudge you when a study block starts"); only "Turn on" shows the browser's permission box, because a blocked permission can't be asked again. "Not now" is always fine; it can be turned on later in You.
7. **Your first day is ready:** a short summary, then into Today.

- **No "Your name" step:** the first name comes from Google and can be changed in You.
- **"Add to home screen"** is offered later on Today, after a first real day, not during setup.
