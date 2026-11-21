# Extension host

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
