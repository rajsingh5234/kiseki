# Change and releases

## Seamless change: no downtime, users never notice

**Goal:** adding a feature or even changing part of the tech stack happens without downtime and without users noticing, as large product companies do (e.g. ChatGPT moved its web app from Next.js to Remix in 2024 and users didn't notice).

- **Zero-downtime deploys:** the new version starts beside the old one; traffic moves only after its health check passes; the old one finishes its in-flight requests (graceful shutdown) and stops. Needs: a health check, a readiness check and graceful shutdown in the API.
- **Feature flags:** new code ships switched off, then turns on for us, then a small share of users, then everyone; switched off in seconds if it misbehaves. Tool chosen when needed.
- **Safe database changes (expand, then contract):** never rename or drop in one step. Add the new → write to both → copy old data → read from the new → remove the old later. Old and new app versions both work during the switch.
- **Old clients keep working:** API changes are additive (new fields, never breaking existing ones); a real break gets a new API version. Old web files stay online for a while, and the app shows "New version available" instead of breaking.
- **Change tech piece by piece (strangler pattern):** replace one part at a time behind the same URLs and interfaces. Our interfaces, DI and modules make this possible.
- **Gradual rollout and quick rollback:** release to a small slice first, watch errors and speed, then widen; roll back in one step.

## Versions: Semantic Versioning (SemVer)

**Goal:** every release has a clear version, like a proper app. `MAJOR.MINOR.PATCH`: a fix bumps PATCH, a new feature bumps MINOR, a breaking change bumps MAJOR.

- **The app:** each release gets a version and a user-facing "What's new" note.
- **The extension API (`extension-sdk`):** follows SemVer strictly; each manifest states the range it needs (e.g. `"engine": "^1.2"`), and a MAJOR bump means extensions may need changes.
- **The public REST API:** a new `/vN` only for a real break, which should be rare (see "Old clients keep working").
- **Automatic from commits:** conventional commits drive the bump (`fix:` → patch, `feat:` → minor, `feat!:` or `BREAKING CHANGE` → major) and the changelog. Tool (release-please or Changesets) chosen when we set up releases.
