# 007: API foundation: running TypeScript, config, logging, tests, imports and shared versions

- **Date:** 2026-11-17
- **Status:** Accepted

## Choices

### Running the API

- **Node 26 runs our `.ts` files directly** (`node src/server.ts`, `node --watch` in development). No build step and no extra runner (`tsx`, `nodemon`, `ts-node`): what runs in development is what runs in production. Types are checked by the editor, the pre-commit hook and CI, never at runtime.
- **App and server are split:** `app.ts` exports `buildApp(config, modules)` (changed on 2026-11-18: it first took only `config`), which wires Fastify without opening a port and registers each module under its prefix; `server.ts` loads the config, listens and shuts down gracefully. Tests call `buildApp()` and send fake requests with `app.inject()`.
- **Composition root:** `composition-root.ts` exports `composeModules()`, the list of every module, already built (shared pieces such as the database are created there and handed to modules). Every module returns the same `ApiModule` shape (`{ prefix, routes }`), so adding a feature is one line there and `app.ts` never changes. It is separate from `buildApp` because the worker entry point (decision 001) will reuse it without HTTP.
- **Two health endpoints** (`modules/health/`): `GET /health/live` (the process is running; failing means restart it) and `GET /health/ready` (it can serve users; failing means stop sending traffic, don't restart). Ready runs a list of `IHealthCheck`s handed in by the composition root (none yet; the database adds one), all in parallel; a check that fails or throws gives `503 {"status":"unavailable"}`. Which check failed is logged as a warning, never returned. Both routes log only warnings and above (probes come every few seconds) and send `Cache-Control: no-store`.
- **Request safety in `app.ts`:** an incoming `x-request-id` is reused only if it is 1–128 characters of letters, digits, `_ . : -` (otherwise a new UUID), so nobody can inject fake log lines; requests that take over 30 seconds to arrive are cut off (Fastify's default is no limit, which allows slow-connection attacks).

### Startup and shutdown (`server.ts`, added 2026-11-18)

- **Bad config:** the `ConfigError` list is printed (no stack trace) and the process exits with code 1. **Port busy or bad host:** a `fatal` log, exit code 1. Any other failure keeps its stack trace.
- **Graceful shutdown with `close-with-grace`** (Fastify's maintainer, no dependencies): on SIGTERM or SIGINT, and on an uncaught error or unhandled rejection, it calls `app.close()`. That stops new connections, finishes requests in progress, answers 503 to new requests on open connections (Fastify's `return503OnClosing`) and runs `onClose` hooks (the database later). Exit code 0 after a clean stop, 1 after a crash, or after 10 seconds if closing hangs; a second signal exits at once.
- **Not yet: a drain delay** (mark not ready, wait a few seconds for the load balancer, then close). Whether it is needed depends on the hosting platform, so it is decided at the deploy step; it would be one `IHealthCheck` plus a wait.
- **Development:** `pnpm dev` runs `NODE_ENV=development node --env-file-if-exists=.env --watch src/server.ts | pino-pretty --ignore pid,hostname --translateTime SYS:HH:MM:ss.l`. The app always writes JSON; pino-pretty only formats the terminal. Turborepo's strict env mode hides shell variables, so local settings go in `.env`.
- **Tested as a real process:** `server.test.ts` starts `node src/server.ts` on a free port, waits for its "Server listening" log line (no polling), calls `/health/live`, sends SIGTERM or SIGINT and expects exit code 0; it also checks the bad-config and busy-port exits. Coverage can't see a child process, so `server.ts` is excluded from the coverage count.

### Configuration (`apps/api/src/core/config/`)

- One **Zod schema** lists every environment variable with its type, rules and default; the `AppConfig` type is generated from it.
- **`loadConfig(env)` runs once at startup.** It returns a frozen object, or throws one `ConfigError` listing every problem, so the server refuses to start with a clear message.
- **Empty values count as not set** (`PORT=` uses the default), so a copied `.env.example` with blanks just works.
- **`NODE_ENV` is required** (`development | test | production`, no default): a forgotten value in production fails loudly instead of quietly running in development mode. The dev script, Vitest and the hosting platform set it.
- Only the entry point reads `process.env`; everything else receives `config`. Zod stays inside this folder (decision 001 §7).
- It lives in the API, not `packages/config`: only the API reads server environment variables. A shared package comes with a second user.
- Local values go in `apps/api/.env` (never committed), loaded by Node's built-in `--env-file-if-exists` (no `dotenv`); `.env.example` documents every variable.

### Logging (`apps/api/src/core/logger/`)

- Fastify's built-in Pino logger, configured by `loggerOptions(config)`:
  - level per environment: test → `silent`, development → `debug`, production → `info`; `LOG_LEVEL` overrides it;
  - secrets redacted to `[REDACTED]`: `authorization`, `cookie`, `set-cookie`, and `password`/`token` fields at the top level or one level down. Fastify's default request log has no headers; this is a safety net for anything logged by hand.
- Request IDs (a UUID, or a valid incoming `x-request-id`, echoed in the response) are a Fastify server option, set in `app.ts`; every log line of a request carries it as `reqId`.
- Readable development output with `pino-pretty`, piped in the `dev` script, so production never loads it.
- Our own `ILogger` interface comes when the first service needs to log, not before.

### Tests

- **Vitest 5** with V8 coverage. Shared settings in `packages/vitest-config` (`base.ts`); each package has a small `vitest.config.ts`, so Turborepo caches and runs each package separately.
- `pnpm test` runs once with coverage and fails below **80%** (lines, functions, branches, statements); `pnpm test:watch` re-runs on save.
- Mocks, stubbed env vars and stubbed globals are restored after every test, so tests can't leak into each other.
- Each test file has `happy path` and `sad path` groups; `describe`/`it`/`expect` are imported explicitly.
- oxlint's `vitest` plugin blocks `.only`, `.skip` and tests without assertions.

### Imports

- Same folder: `./file.ts`. Another area of the same app: Node subpath imports, `#core/...` (`"imports": { "#*": "./src/*" }`). Another package: `@kiseki/...`. `../` is banned by lint.
- Not `@/` aliases: they live in tsconfig `paths`, which Node doesn't read, so they would pass the type check and crash at runtime. `#` imports are an official Node feature that TypeScript, Vitest and Vite also understand with no extra config (tested).

### Shared dependency versions: pnpm catalog

- A dependency used by two or more packages has its version once, in `catalog:` in `pnpm-workspace.yaml`; packages reference it as `"catalog:"`. Versions can't drift between packages, and an upgrade is one line.
- Dependencies used by one package stay in its `package.json`; root-only tools stay in the root.
- All versions are exact; upgrades happen on purpose (later via an update bot).

## Alternatives

- **A build step or `tsx`** to run TypeScript: needed only for non-erasable syntax, which decision 005 rules out.
- **`process.env` read anywhere:** no validation or types, and reads scattered across files.
- **`@fastify/env`, `envalid`, `t3-env`:** a second validation tool next to Zod, or config tied to Fastify (config is needed before Fastify starts).
- **One root Vitest config for all packages** ("projects" mode): one command, but no per-package caching.
- **Versions in each `package.json`, or `syncpack`:** drift, or an extra tool for what pnpm already does.
- **Shutdown by hand** (our own signal handlers): no dependency, but easy to miss a second signal, a crash during shutdown, or a close that never ends. **No shutdown handling:** SIGTERM cuts requests off mid-way on every deploy.
- **`@fastify/under-pressure`** for health: also answers 503 when the server is overloaded; worth adding on top at the deploy step, but it doesn't do module-supplied checks.
- **pino-pretty as a Pino transport inside the app:** one command, but production code would know about a dev tool and start an extra thread.
- **Health checks built into the health service** (importing the database directly): simpler, but ties health to every module it checks.

## Why

Fail fast and loudly on bad config; no secrets in logs; quiet, independent, fast tests; imports that survive moving files; one place for every shared version. Each piece is small, tested and swappable.
