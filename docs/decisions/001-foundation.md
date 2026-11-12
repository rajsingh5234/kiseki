# 001. Foundation: architecture and tech stack

- **Date:** 2026-11-11
- **Status:** Accepted

## Context

The planner is a product for many users (UPSC first, more tracks later), used mostly on phones. It must:

- open fast and work offline (people study in places with weak signal);
- let users install features (extensions), loading each one only for those who installed it;
- run background work: reminders, scheduled jobs, event delivery;
- keep data safe and correct, with payments coming later;
- be ready for a native app wrapper later.

Almost every screen is behind a login. Only a few public pages (home, features, pricing) need SEO.

## Summary

| Area | Choice |
| --- | --- |
| App shape | Monorepo: static web app + always-on API |
| Monorepo tools | pnpm + Turborepo |
| Database | PostgreSQL + Drizzle |
| API framework | Fastify |
| Backend structure | Layers: route → controller → service → repository |
| Code style | Classes, manual dependency injection, patterns only where they help |
| Validation | Zod, kept to contracts and validation files |
| Web | React + React Router; public pages prerendered for SEO |
| API data in the web app | TanStack Query |
| UI building blocks | Base UI, wrapped in our own components |
| Animation | Motion + plain CSS |
| Features | Extensions, each in its own folder |
| Code quality | oxlint + oxfmt (Prettier as the fallback) |
| Backend shape | One modular API (a modular monolith), not microservices |
| Background jobs | A worker process inside `apps/api`, for now |
| Extension future | Built so outside developers can add extensions later, like VS Code |
| How web and API talk | REST + shared Zod contracts |
| Testing | Vitest (unit + API flows) + Playwright (browser journeys), coverage rules in CI |
| Shared settings | Config packages (`typescript-config`, shared Vitest config); internal packages export TypeScript source |
| Checks | A CI "quality gates" workflow from the first app |
| Commits | Conventional commit messages (`feat:`, `fix:`, `docs:`…) |
| Folders | Feature-based outside on both web and API; tests next to the code; kebab-case file names |
| Styling | Tailwind CSS v4 + CSS variables as design tokens; themes and effects via a registry |

## 1. App shape: monorepo with a static web app and an always-on API

**Choice:** one repo holding `apps/web` (a React app built to static files on a CDN), `apps/api` (an always-on Fastify server plus a worker for background jobs), `packages/*` (shared code) and `extensions/*` (features).

**Alternatives:** one Next.js app (simple, free hosting, serverless functions); Next.js as the web app with a separate API; a server-rendered web app.

**Why:**

- A static app cached by a service worker opens instantly and works offline.
- Extensions load as separate pieces, only for users who installed them.
- Reminders, jobs and live updates need a server that keeps running; serverless functions stop after each request.
- Web and API import the same contracts, so a mismatch is caught in the editor, not by a user.
- SEO is covered by prerendering public pages to HTML at build time.
- React, Vite and Node change slowly compared with Next.js.

## 2. Monorepo tools: pnpm + Turborepo

**Choice:** pnpm installs packages and links our own packages together (workspaces); Turborepo runs tasks (`dev`, `build`, `lint`, `test`) across all of them.

**Alternatives:** npm workspaces (slower, allows hidden dependencies); Nx (powerful but heavier).

**Why:** pnpm is fast, saves disk space and is strict (a package can only import what it declares). Turborepo runs tasks in the right order, in parallel where possible, and skips work that hasn't changed.

## 3. Database: PostgreSQL + Drizzle

**Choice:** PostgreSQL, with Drizzle to define tables in TypeScript, generate migrations and write queries. Drizzle is used only inside repositories.

**Alternatives:** MongoDB (flexible documents, links checked by our code); Kysely (closer to raw SQL, hand-written migrations and types); Prisma (its own schema language, heavier).

**Why:**

- Our data is relational: topics, targets, timetables, study sessions.
- The database itself refuses broken data (foreign keys, unique and check constraints).
- Reports like plan vs actual and streaks are simple SQL.
- Strong transactions, needed for payments later.
- Drizzle defines each table once, giving both the types and the migrations.

## 4. API framework: Fastify

**Choice:** Fastify.

**Alternatives:** Express (most familiar; slower, weaker types, validation and docs by hand); Hono (tiny, runs anywhere; younger ecosystem for a long-running server).

**Why:** fast, TypeScript-first, validates requests and generates API docs from our Zod contracts, and its plugin system keeps modules (and extensions) separate. Close to Express in style.

## 5. Backend structure: layers in one direction

**Choice:**

```
Route → Controller → Service → Repository → Database
                        └──→ Provider (email, payments, other outside services)
```

- **Route:** URL, method, schemas and guards; calls a controller.
- **Controller:** turns HTTP into plain input for a service, and back. Never touches a repository.
- **Service:** business rules, transactions, calls to repositories and providers. Knows nothing about HTTP.
- **Repository:** reads and writes its own module's tables. Decides no policy.
- **Provider:** wraps an outside service behind our own interface.

Each layer depends on the interfaces of the layer below it (Dependency Inversion). Modules talk to each other only through their public `index.ts` or events. Folders are feature-based outside and layered inside (`task.routes.ts`, `task.controller.ts`, `task.service.ts`, `task.repository.ts`, `index.ts`).

**Alternatives:** everything in the route (tangles as features grow); full Clean Architecture or CQRS (more ceremony than we need).

**Why:** each piece has one job, so it is easy to test and change; services work the same from HTTP, a background job or a test.

## 6. Code style: classes, manual DI, patterns only where they help

**Choice:**

- **Classes** for anything with behaviour or dependencies (controllers, services, repositories, providers, factories, the database connection, the validator, the logger, errors). Plain `const` / `type` for pure data. Composition over inheritance. Stateless helpers are static-only classes (`HttpResponse.ok(data)`). Controller handlers are arrow-function properties, so passing `controller.list` to Fastify keeps `this`.
- **Manual dependency injection:** every class gets its dependencies through its constructor; everything is wired in one composition root.
- **Patterns only where they help:** add a pattern or abstraction only when it solves a real coupling, testing, reuse or ownership problem; never for symmetry.

**Alternatives:** factory functions instead of classes; a DI library (tsyringe, inversify).

**Why:** classes keep LLD, SOLID and design patterns visible in the code. Manual DI is explicit, needs no decorators, and makes fakes easy in tests. Fewer, purposeful abstractions keep the code readable.

## 7. Validation: Zod, kept at the edges

**Choice:** Zod appears only in shared contracts, `*.validation.ts` files and config. Services and repositories see plain TypeScript types. The `SchemaValidator` class accepts any Standard Schema (`@standard-schema/spec`), so controllers don't depend on Zod itself.

**Alternatives:** wrapping Zod behind our own interface (a leaky abstraction, since schemas are Zod's own language).

**Why:** abstract what is volatile or does I/O (databases, outside APIs); contain stable tools behind a boundary.

## 8. Web: React + React Router, public pages prerendered

**Choice:** React with React Router. Screens load only when opened. Public pages are prerendered to HTML at build time for SEO. The app is installable (PWA).

**Alternatives:** TanStack Router (stronger type safety; its prerendering, TanStack Start, is younger).

**Why:** mature, widely used, with prerendering built in.

## 9. API data in the web app: TanStack Query

**Choice:** TanStack Query, on top of our own small `fetch` client typed by the shared contracts.

**Alternatives:** hand-written `useEffect` fetching on every screen.

**Why:** caching, background refresh, no duplicate requests, instant updates after changes, and a cache that can be kept for offline reading.

## 10. UI building blocks: Base UI, wrapped

**Choice:** Base UI for accessible, unstyled components (dialogs, menus, tabs, sliders), always wrapped in our own components with our design on top.

**Alternatives:** Radix UI (popular; updates have slowed); React Aria (best accessibility and touch handling; heavier, more code).

**Why:** made by the Radix team, actively developed, accessibility built in. Wrapping means it can be swapped without touching screens.

## 11. Animation: Motion + plain CSS

**Choice:** Motion for springs, bounce, drag and swipe; plain CSS for simple effects (hover, fades, the touch glow with a pointer listener). Users can turn animations off.

**Alternatives:** GSAP (great for scripted timelines, less natural for app gestures); CSS only (no real springs or interruptible gestures).

**Why:** real spring physics, animations that can be interrupted and follow a finger, smooth layout changes, and it loads in small pieces.

## 12. Features as extensions

**Choice:** each feature lives in its own folder under `extensions/` with its manifest, web part, API part and migrations. Extensions import only `extension-sdk`, `contracts` and `ui`, never apps or other extensions. The host knows them only through their manifests.

**Why:** features can be added or removed without touching the rest; users load only what they install.

## 13. Code quality: oxlint + oxfmt

**Choice:** oxlint (type-aware) for linting; oxfmt (3-space indentation) for formatting, with its built-in Tailwind class sorting and import sorting. It formats everything in the repo: TypeScript, JSON, YAML, CSS and Markdown. (Changed on 2026-11-12: the first choice was Prettier.)

**Alternatives:** ESLint (standard, slower, many dependencies); Prettier (stable for years, the standard, Tailwind sorting through a plugin); Biome (fast, but no Tailwind class sorting like Prettier's plugin).

**Why:** oxlint is much faster with React and accessibility rules built in, and its type-aware mode catches misused promises. oxfmt comes from the same team, is about 30× faster than Prettier and passes all of Prettier's JavaScript/TypeScript tests, so its output matches Prettier's (it differs only where Prettier has bugs).

**Risk and fallback:** oxfmt is still beta (since February 2026). If it causes problems, we switch to Prettier with `prettier-plugin-tailwindcss`: one config change and one reformat commit, since the output is nearly identical.

## 14. Backend shape: a modular monolith, not microservices

**Choice:** one API made of separate modules. Each module owns its own tables; only it reads or writes them. Modules talk to each other only through their public `index.ts` (like asking at a shop counter) or through events (like posting on a notice board, so the sender doesn't know who listens). Lint rules enforce this.

**Alternatives:** microservices (many small servers, each deployed separately, often with its own database).

**Why:** microservices pay off with many teams and huge scale. For us they would mean more deploys and servers, network calls that can fail midway, data spread across databases (no single transaction) and harder debugging. A modular monolith gives the same clean separation by rules instead of by network. Any module (for example, video processing later) can be moved out into its own service, because nothing else reaches into it: callers keep using the same functions, which then go over the network.

## 15. Background jobs: a worker inside `apps/api`, for now

**Choice:** the API has two entry points from the same code: `server.ts` (answers the app) and `worker.ts` (reminders, event delivery, clean-ups, later heavy processing). Both use the same modules.

**Alternatives:** a separate `apps/worker` from the start (its own package and deploy; the shared modules would first have to move into a package, because apps never import each other).

**Why:** simplest now, with no extra packages. A slow job never slows the API, and a worker crash doesn't stop the app. We move to `apps/worker` when there's a real reason: the worker needs its own libraries (such as video processing) or its own server and scaling.

## 16. Extensions: built so outside developers can add them later

**Choice:** outside developers will be able to build extensions in the future, as with VS Code. So from the start:

- our own extensions use only the official extension API (no shortcuts into app internals), the same API outside developers will get;
- the extension API has a version number, and each manifest says which version it needs;
- each extension declares its permissions in its manifest (for example "reads study sessions", "adds a home-screen widget"), and users approve them;
- an extension sees only its own data, plus what its permissions allow.

When outside extensions arrive, we add the safety layer: their code runs in a sandbox, loaded at runtime (microfrontend-style), with a review process and a place to browse and install them.

**Alternatives:** first-party extensions only (simpler, but closes the door); microfrontends now (separately built and deployed frontend apps: heavier, duplicate libraries, harder to keep one look; they solve a many-teams problem we don't have).

**Why:** building our own extensions on the public API from day one means outside ones fit in later without a rewrite.

## 17. How web and API talk: REST + shared Zod contracts

**Choice:** a REST API (`GET /v1/tasks`) sending JSON, with request and response shapes defined once in `packages/contracts` and used by both sides.

**Alternatives:** tRPC (call server functions like local ones; TypeScript clients only); gRPC (fast binary server-to-server calls; browsers can't use it directly).

**Why:** works for every client: browsers, a future native app, and outside extension developers. The shared contracts give most of tRPC's type safety.

**Planned later:** tRPC only inside a future internal admin app, and gRPC only between the API and a future split-out service. Before each, we first learn it in depth in a separate side project, then record it as its own decision.

## 18. Testing and coverage

**Choice:** three kinds of tests.

| Type | What it checks | Tool |
| --- | --- | --- |
| Unit tests | Small pure logic, fast (a monthly target splitting into weeks, streaks in the user's time zone) | Vitest |
| API flow tests | Real requests through the real API and a real test PostgreSQL database; nothing inside the API is faked, only outside services (email, payments) | Vitest |
| Browser journeys | What a person does in the real app (tick a task, reload, it's still ticked) | Playwright |

**Coverage rules** (coverage = the share of code that runs during tests; a guide, not the goal):

- pure logic (targets, streaks, syllabus changes): 90% or more;
- API and packages overall: about 80%, checked on every pull request;
- coverage never drops in a pull request;
- every bug fix comes with a test that would have caught it;
- no tests for looks (colours, layout): they break on every design change and catch no bugs;
- browser tests find elements by role, label or visible text, never by CSS class (this also checks accessibility);
- never bend a test to make it pass: find out whether the app or the test is wrong first.

**Alternatives:** Jest (older, slower with TypeScript and modern modules); Node's built-in test runner (no extra tool, but fewer features and no shared setup with the web app).

**Why:** Vitest is fast, built for TypeScript, and one tool for both the web app and the API. Playwright is the standard for real-browser tests. Testing user journeys against a real database catches the bugs users would actually hit.

## 19. Shared settings: config packages, and source-only internal packages

**Choice:**

- Settings are written once, in small packages that every app and package extends: `packages/typescript-config` (`base.json`, plus presets for the React app, React libraries and Node) and a shared Vitest config. Each app declares them as dependencies.
- Our own packages (`contracts`, `ui`…) export their TypeScript source directly (`"exports": "./src/index.ts"`), with no build step; the app that uses them compiles them.

**Alternatives:** a single root `tsconfig.base.json` (fine at first, less explicit about who uses what); building each package before use (slower, more setup, only needed for packages published outside the repo).

**Why:** one place to change a setting, no copies drifting apart, and a change in a package shows up in every app instantly.

## 20. CI quality gates from the first app

**Choice:** one reusable GitHub Actions workflow runs the checks (format check, type check, lint, tests with coverage, build). Pull requests run it, and an outdated run is cancelled when new commits arrive. Releases run it again, build once and deploy that same build. Turborepo runs only the packages affected by a change.

Locally, a **pre-commit hook** formats only the files being committed, so unformatted code never reaches CI (the hook tool is chosen during setup). CI stays the real gate, because hooks can be skipped.

**Alternatives:** checks only in local git hooks (can be skipped); adding CI later (more to fix at once).

**Why:** bad code can't slip in even when someone forgets to run the checks. Set up early, it's small and protects everything from day one.

## 21. Conventional commit messages

**Choice:** each commit message starts with its type: `feat:`, `fix:`, `docs:`, `refactor:`, `test:`, `chore:` (for example `feat: add timetable`). Automatic version numbers and a changelog from these messages (semantic-release or similar) come when we start releasing.

**Why:** a history that is easy to scan, and automatic versioning later, which the versioned extension API will also need.

## 22. Folder structure: feature-based on both web and API

**Choice:** everything about one feature lives in one folder with a public `index.ts`; other folders import only that.

Web app (most features live in `extensions/`, shared UI in `packages/ui`, so the app stays thin):

```
apps/web/src/
├── main.tsx      entry point
├── app/          app shell: router, providers (TanStack Query, theme), layout
├── features/     core features that aren't extensions (auth, onboarding, settings…)
│   └── auth/     components/, hooks/, api/ (API calls + TanStack Query hooks), index.ts
└── shared/       small helpers used across the web app only
```

API (feature-based outside, layered inside):

```
apps/api/src/
├── server.ts, worker.ts
├── core/         errors, http, database, validator
└── modules/
    └── auth/     auth.routes.ts, auth.controller.ts, auth.service.ts, auth.repository.ts, index.ts
```

Rules for both:

- tests sit next to the code they test (`auth.service.test.ts` beside `auth.service.ts`);
- file names are kebab-case (`login-form.tsx`), never PascalCase: macOS ignores letter case but Linux servers don't, so a renamed file can work locally and break on the server.

**Alternatives:** folders by file type (`components/`, `services/`, `repositories/` at the top level), which scatters one feature across the whole app; tests in a separate `test/` folder, where they get forgotten.

**Why:** a feature can be found, changed, moved into an extension or removed in one place.

## 23. Styling: Tailwind CSS + CSS variables, with themes and an effects registry

**Choice:**

- **Tailwind CSS v4** for component styling, used inside `packages/ui` components (with a small helper for typed variants such as `size="sm"`), so screens and extensions use components rather than long class lists. oxfmt sorts the classes (built in).
- **CSS variables as design tokens** (colours, spacing, radius, motion). A theme is one set of values:

  ```css
  [data-theme="ocean"] { --color-accent: #3154c8; --color-surface: #fbfdff; }
  ```

  Switching theme changes one attribute on the page; adding a theme adds one block. A test checks that every theme defines every token. Only the active theme's CSS is loaded at start.
- **An effects registry** (Strategy + Registry). Each effect is one module that declares its id, name, kind (visual or motion), settings (on/off, intensity) and a fallback for reduced motion or weak phones:
  - visual effects (glass, glow, depth) bring a small CSS file, switched on with `data-effects="…"`;
  - motion effects (spring, bounce) return a Motion preset.

  Adding an effect means one new file and one line in the list. Settings shows it automatically, and components ask for "the active effect", never for a specific one.
- **Plain CSS** only for what Tailwind can't express well (complex keyframes, the pointer glow), kept next to the component that needs it.

**Alternatives:** CSS Modules (plain scoped CSS; more files, consistency left to discipline); CSS-in-JS such as styled-components (runs while the page loads, so slower); zero-runtime CSS-in-TS such as vanilla-extract or Panda (type-checked theme tokens, but more setup and a smaller community).

**Why:** no styling code runs in the browser and only the CSS we use is shipped; themes and effects are easy to add; the app and every extension share one look; CSS variables work with any tool an outside extension developer uses; and the team already knows Tailwind. All styling lives in `packages/ui`, so a later change of approach stays contained there.

## Consequences

- Two deploys (web to a CDN, API to a server) and a paid server once we launch; free while developing locally.
- Web and API deploy separately, so contract changes stay backward compatible for a while (new fields start optional).
- Login cookies and CORS need care across hosts (solved at the deploy step).
- Most tools are new to the team (monorepo, pnpm, Turborepo, Fastify, PostgreSQL, Drizzle, React Router, prerendering, extensions). Each is introduced when first needed, with a plain explanation.
- Most choices sit behind our own wrappers (UI components, repositories, providers), so they can be swapped. The database and the repo shape are the costly ones to change later.
