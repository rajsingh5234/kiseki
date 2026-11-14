# Phase 1

Phase 1 includes the foundation: the base every later feature stands on, so future features plug in without changing the app. There is no separate Phase 0.

Status: notes, not yet a plan. In Phase 1 planning we discuss everything in the right order: goal, core journey, features, what must be built now so future features are easy to add, build order and non-goals.

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
