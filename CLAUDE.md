# Kiseki

**Kiseki** (Japanese 軌跡, "trajectory"; see [decision 002](docs/decisions/002-product-name.md)) is a study planner **product** for many users (UPSC first, more tracks later), built collaboratively. Everything should be world class: fast, accessible, modular and well tested. It is also a learning journey: new tools are introduced one at a time, when first needed, with a plain explanation.

## How we work (applies to every feature, however small)

1. **Discuss before coding.** For each feature, list the possible approaches with their pros and cons. Recommend the best one, with its time and space complexity.
2. **Discuss tech choices.** Agree on libraries, packages and stack changes before adding them. Give the trade-offs.
3. **Step by step.** Never implement a whole feature at once.
4. **One file at a time.** Write one file, explain what it does and why (teaching any new idea in it), and wait for review. Move to the next step only when the user has completely understood the current one.
5. **Quality bar:** best practices, LLD, SOLID principles, suitable design patterns and a clean folder structure.
6. **Plug-and-unplug modularity.** Depend on abstractions (interfaces), inject dependencies and keep modules loosely coupled. A module should be swappable or removable without changes elsewhere. Add an abstraction only when it solves a real coupling, testing, reuse or ownership problem, never just for symmetry.
7. **Proactive suggestions.** Raise improvements, better alternatives, and best tools and practices the user may not know yet, **without waiting to be asked**. Bring each one up **when it becomes relevant** (at the step that needs it), one topic at a time, never as a big list up front, with a recommended best approach. Then discuss the approaches in detail and decide together before adding it.
   **Skills too:** at the start of each step, check whether a skill would help me do it better: one from a strong, well-known source for that area (copied into `.claude/skills/` with its source and licence, like the motion skills), or our own once a pattern repeats (e.g. "a new API module the Kiseki way"). Suggest it with a recommendation and decide together; skip general skills that only repeat CLAUDE.md or common knowledge.
8. **Model and effort reminders.** At the start of each task, and whenever the kind of work changes, start the reply with one line recommending the model and effort, e.g. `Suggested: Opus 5.5 · high`, plus a few words on why. If the current setting already fits, say so in that line. Guide:
   - **Opus 5.5 · high**: architecture, planning, vision and roadmap discussions, design reviews, migrations and refactors across many files.
   - **Opus 5.5 · extra high**: decisions that are hard to undo (data model, core architecture), or a bug that resisted a first attempt.
   - **Opus 5.5 · max**: rarely, for the hardest problems after extra high has stalled.
   - **Sonnet 5.5 · high**: implementing an agreed design that still needs care (a new module, tricky UI or animation).
   - **Sonnet 5.5 · medium**: routine work: one file to a settled design, tests, small UI or wording tweaks.
9. **Simple replies.** In discussions, answer in simple words and only what was asked; add extra detail only when it's important.
10. **Record decisions.** Every architecture or tech decision gets a file in `docs/decisions/` (numbered `001-`, `002-`…; a number is never reused). A changed decision is marked "Replaced by" the new one, never deleted.

## Status

- Foundation decided: [docs/decisions/001-foundation.md](docs/decisions/001-foundation.md) (stack, architecture and the reasons).
- Done: tooling, the API base (config, logging, request IDs, health module, composition root, graceful shutdown, error handling; decisions [007](docs/decisions/007-api-foundation.md) and [009](docs/decisions/009-error-handling.md)), the design session ([docs/design/](docs/design/): look, themes, motion, and every key screen at all six sizes), and CI ([decision 017](docs/decisions/017-ci.md): lint, tests and audit on every push and pull request, proven to fail on bad code).
- Phase 1 plan agreed: [docs/product/phase-1/](docs/product/phase-1/README.md) (goal, core journey, v0.1 features and non-goals, foundation decisions [010](docs/decisions/010-sign-in-and-sessions.md)–[013](docs/decisions/013-data-model-concept.md), build order).
- Next: the rest of CI (zizmor and actionlint, a dependency-update bot, branch protection), then the setup steps (Postgres + Drizzle → contracts → web skeleton → hosting and automatic deploy → sign-in) that make the walking skeleton (with the real Lavender theme), then the design system (clay, glass, effects, motion engine, playground), then the v0.1 feature slices, as listed in the plan's "Build order".

## Folder structure (target)

Create folders only when there is a real file to put in them.

```
kiseki/
├── apps/
│   ├── web/            React app → static files on a CDN (public pages prerendered)
│   └── api/            Fastify server + worker entry point
├── packages/
│   ├── contracts/      Zod schemas + types shared by web and api
│   ├── config/         shared constants, once a second app needs them (API env config lives in apps/api)
│   ├── ui/             design system: tokens, themes, wrapped Base UI components, motion, effects
│   ├── extension-sdk/  extension manifest types, contribution points, host API
│   └── typescript-config/, vitest-config/   shared settings every app and package extends
├── extensions/         one folder per feature (manifest, web/, api/, migrations/)
└── docs/               decisions/ (frozen records), product/ (what and why: principles, vision/, phase-N/), design/ (how it looks and moves), later architecture and operations notes
```

Feature-based on both sides: everything about one feature lives in one folder with a public `index.ts` (details in [decision 001 §22](docs/decisions/001-foundation.md)).

- `apps/api/src/core/`: shared building blocks, e.g. `config/` (env validation: the only code that knows the env shape) and `logger/`.
- `apps/api/src/modules/<name>/`: layered inside: `<name>.module|routes|controller|service|repository|types.ts`. `<name>.module.ts` wires the module (manual DI); `composition-root.ts` calls each module's factory. Files stay flat in the module folder (no folder per layer: the suffix already names the layer). A module past about 10 files splits into sub-feature folders (`planner/timetable/`, `planner/targets/`), each flat inside.
- `apps/web/src/`: `app/` (shell, router, providers), `features/<name>/` (`components/`, `hooks/`, `api/`), `shared/`.
- Our own packages export TypeScript source directly (no build step) and use the `@kiseki/` scope, e.g. `@kiseki/ui`.

**Dependency rules**

- Apps use packages; apps never import each other.
- Extensions import only `extension-sdk`, `contracts` and `ui`; never apps or other extensions. The host knows extensions only through their manifests.
- API layers: route → controller → service → repository → database. Controllers never touch repositories; services own business rules and transactions; repositories only read and write their own module's tables.
- Errors ([decision 009](docs/decisions/009-error-handling.md)): throw `AppError` for expected problems, with a kind (never an HTTP status), a stable UPPER_SNAKE `code` and a message safe to show; wrap a lower-level error as its `cause`. Never catch errors in controllers just to answer them: the global handler sends Problem Details, and anything that isn't an `AppError` becomes a generic 500 with the details only in the logs.
- Modules talk to each other only through their public `index.ts` (or events); never through another module's repository or tables. Lint blocks `#modules/<name>/<anything>` except `#modules/<name>/index.ts` (`no-restricted-imports`).
- Web and API share request/response types only through `packages/contracts`.
- Only the entry point reads `process.env`; it passes it to `loadConfig()` once, and everything else receives the validated, frozen `config` ([decision 007](docs/decisions/007-api-foundation.md)). Lint: `node/no-process-env`.
- Zod appears only in `packages/contracts`, `*.validation.ts` files and `core/config/` ([decision 001 §7](docs/decisions/001-foundation.md)). Lint: `no-restricted-imports`.
- Lint rules live in `oxlint.config.ts`: each import limit is a named constant, combined per file group (an override replaces a rule's options, it doesn't merge them).

**Imports**

- Same folder: `./sibling.ts`, e.g. a test importing the code it tests.
- Another area of the same app: subpath imports with `#`, e.g. `#core/config/app-config.ts` (`"imports": { "#*": "./src/*" }` in the app's `package.json`). Never `@/` aliases: Node runs our `.ts` directly and doesn't read tsconfig `paths`.
- Another package: `@kiseki/<name>`, e.g. `@kiseki/vitest-config/base`.
- `../` is banned (lint: `import/no-relative-parent-imports`).
- Relative imports include the `.ts` extension, as Node requires.

**Naming**

- Files: kebab-case with a role suffix, e.g. `task.service.ts`, `task.repository.ts`.
- Contracts that classes implement: `interface` with an `I` prefix, e.g. `ITaskRepository`.
- Pure data shapes (DTOs, entities, `FieldError`): `type` with no prefix.
- Classes and types: PascalCase.
- Indentation: 3 spaces (the formatter, oxfmt, enforces it).
- Tests sit next to the code they test: `task.service.test.ts` beside `task.service.ts`.
- Test-only helpers that build valid test data live in `*.fixture.ts` beside the code (e.g. `testConfig()` in `app-config.fixture.ts`): one builder with defaults, each test overrides only what it's about. Only `*.test.ts` files may import them (lint: `no-restricted-imports`).
- Each test file groups its tests into `describe("happy path")` (valid input, success) and `describe("sad path")` (bad input, errors). Import `describe`/`it`/`expect` from `vitest` explicitly (no globals).
- Code style is a mix ([decision 008](docs/decisions/008-functions-for-stateless-helpers.md)): classes for anything with dependencies or state (services, repositories, controllers, errors); plain exported functions for stateless helpers (never static-only classes); factory functions for wiring (`buildApp`, `createTaskModule`).
- Comments: `/** … */` (TSDoc, shown on hover) on what other files use: exported types, interfaces and their fields, classes, and functions whose name doesn't tell the whole contract. Say what it promises: units, limits, what happens on failure, what never changes. `//` only for a non-obvious "why": a reason, a workaround with its link, or a trap for the next person; never restate the code. No commented-out code (git keeps history) and no bare TODOs (open work goes in the docs or the plan). Plain words, the same voice as the docs.
- Class fields hidden from outside use `private readonly` (TypeScript's `private`, not JavaScript's `#`), declared as fields and assigned in the constructor.
- TypeScript is erasable-only: no `enum` (use `as const` objects), no constructor parameter properties (declare fields and assign them) ([decision 005](docs/decisions/005-typescript.md)).
- Commit messages are conventional: `feat:`, `fix:`, `docs:`, `refactor:`, `test:`, `chore:` (e.g. `feat: add timetable`).

## Frontend conventions

- Function components and custom hooks, with pure functions for logic (`lib/`). Hooks hold behaviour; components only render.
- No `Math.random()`/`Date.now()` during render. Use a seeded random for decoration and an injectable clock for time.
- Every screen size, designed phone-first: small phone (360×640), phone (390×844 to 430×932), tablet (768, portrait and landscape), laptop (1280) and desktop (1440 and wider). Layouts adapt, e.g. bottom nav on phones → side rail on tablets → full sidebar on desktop. Designs and tests cover each size. Tappable things are at least 48px with 8px spacing.
- Animation targets use `data-*` attributes, never styling classes. Respect reduced motion.
- Styling: Tailwind CSS inside `packages/ui` components; colours, spacing, radius and motion come from CSS variables (design tokens), never hard-coded values. Themes are token sets under `[data-theme]`. Effects (glass, glow, spring…) are modules in the effects registry; components ask for the active effect, never a specific one. Plain CSS only where Tailwind can't express it, next to its component.

## Deploying

Not deployed yet. Hosting for the web app, the API and the database is decided at the deploy step. **Never link this folder to the `birthday` Vercel project** (a separate personal project): deploying from here would replace it.

## Commands

Use Node 26 and pnpm 12 ([decision 003](docs/decisions/003-tool-versions.md)). Commands are added here as the monorepo is set up.

- `pnpm install`: install everything and set up the git hook (Lefthook formats and lints staged files on every commit).
- `pnpm build` / `pnpm dev` / `pnpm typecheck` / `pnpm test`: run that task in every package through Turborepo. `pnpm test` enforces 80% coverage; `pnpm test:watch` re-runs tests on save.
- `pnpm lint`: oxlint with type-aware rules ([decision 006](docs/decisions/006-code-quality-tooling.md)).
- `pnpm format` / `pnpm format:check`: format with oxfmt, or only check (CI).
- `pnpm audit`: must stay clean. An advisory that can't be fixed yet and doesn't reach us is skipped one by one (`auditConfig.ignoreGhsas`) and recorded in [decision 004](docs/decisions/004-supply-chain-security.md), then removed when the fix ships.
- Adding a dependency (always exact versions; check the result against [decision 004](docs/decisions/004-supply-chain-security.md)):
  - root-only tool: `pnpm add -D -w --save-exact <name>`;
  - used by one package: `pnpm --filter <package> add --save-exact <name>`;
  - used by two or more packages: put its version in the `catalog:` of `pnpm-workspace.yaml` (`--save-catalog --save-exact`) and reference it as `"catalog:"`.
- Local env: copy `apps/api/.env.example` to `apps/api/.env` (never committed); blank values mean "use the default". Shell variables don't reach `pnpm dev` (Turborepo's strict env mode hides them), so local settings go here. `pnpm dev` serves the API on `http://127.0.0.1:3000` with readable logs; Ctrl+C stops it gracefully.
