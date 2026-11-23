# 019: Database setup: Postgres 18, Drizzle 0.45, tests on real Postgres, row-level security

- **Date:** 2026-11-23
- **Status:** Accepted
- **Builds on:** [decision 001 §3](001-foundation.md) (PostgreSQL + Drizzle); settles the open row-level security question in [decision 013](013-data-model-concept.md) (rule 5)

## Context

Decision 001 chose PostgreSQL and Drizzle. Before setting them up, we checked that choice against what 16 well-known TypeScript products use (Cal.com, Documenso, Dub, Formbricks, Trigger.dev, Umami, Hoppscotch, Twenty, Infisical, Midday, OpenStatus, Payload, LobeHub, Cap, Supermemory, Vercel's AI Chatbot) and decided the details: version, driver, local setup, migrations, test databases and row-level security.

## Choice

- **PostgreSQL 18** (supported until 2030; Neon and AWS support it; `uuidv7()` built in). Postgres 19 came out on 19 November 2026; move after its first minor release, once hosts support it.
- **Drizzle 0.45 stable** (`drizzle-orm` 0.45.x with `drizzle-kit` 0.31.x), as in Midday, Payload, LobeHub, Cap and OpenStatus. Only the SQL-like query builder (`select().from().where()`), not the relational-queries API, so the move to 1.0 stays small; upgrade when 1.0 is stable (it has been a release candidate since April 2026, with six release candidates so far).
- **Driver `pg` (node-postgres)**, the standard for long-running Node servers, with a built-in connection pool.
- **Locally: Docker Compose** with `postgres:18.7-trixie`, pinned by digest (as Cal.com and Formbricks run Postgres 18); data in a Docker volume; port open to this computer only; the password in `apps/api/.env`, never committed. Renovate updates the image.
- **Migrations:** change the TypeScript schema → `drizzle-kit generate` writes a numbered SQL file → the file is committed and reviewed in the pull request → a small migrate script applies pending files in order and records them. `drizzle-kit push` only on a throwaway database. CI runs `drizzle-kit check` and fails if `generate` would create a new file (a forgotten migration). Merged migrations are never edited (a fix is a new migration), and changes stay backward compatible (e.g. rename a column in steps). When migrations run in production is decided at the hosting step.
- **Tests on real Postgres:** the same pinned image, from Docker Compose locally and as a GitHub Actions service container in the test job (a throwaway database, deleted after each run; never production). Once per run, migrations are applied to a template database; each Vitest worker clones its own database from it (`CREATE DATABASE … TEMPLATE`); each test creates its own users, so tests don't need clean-up.
- **Row-level security as a second safety net**, behind `can()`:
  - three roles: `kiseki_owner` (owns tables, runs migrations), `kiseki_app` (the API; can't skip RLS), and later a worker role for jobs that work across users;
  - every user-owned table has a policy "visible only when `user_id` is the current user", written with Drizzle's `pgPolicy`, plus `FORCE ROW LEVEL SECURITY` in the migration;
  - each service transaction starts with `set_config('app.user_id', <id>, true)`, which is cleared when the transaction ends, so a pooled connection can't carry it to another request; without it, queries return nothing (fails closed);
  - shared content (track templates, topics) has no policy; the app role can only read it;
  - tests check that one user can't read or change another user's rows.

## Alternatives

- **MySQL, SQLite/Turso, MongoDB:** no row-level security (all three), one writer at a time (SQLite), or no relations (MongoDB).
- **Prisma 7:** the most used ORM in older products, with the richest tooling, but its own schema language and a generate step; Cal.com and Documenso added Kysely next to it for complex queries.
- **Kysely:** a great query builder, but no schema or migrations of its own.
- **Drizzle 1.0 release candidate:** no production Postgres product among those checked uses it (OpenCode does, with SQLite on the user's computer); still changing.
- **`postgres.js`:** fast, used by Vercel's template; less common for long-running servers.
- **Postgres.app or Homebrew, PGlite, a cloud dev database:** versions drift per machine; not the real server; or needs an account and internet now.
- **Testcontainers (Trigger.dev), rollback per test:** a new dependency and slower starts; rollback doesn't fit services that own their transactions.
- **App checks only (most Prisma and Drizzle products):** simpler, but one forgotten `WHERE user_id` leaks a user's study history.

## Why

Postgres and Drizzle are still the right fit, confirmed by what current products use. Stable versions, one pinned image everywhere, reviewed SQL migrations and real-database tests keep data changes predictable. Row-level security costs least on day one, and Kiseki stores personal study history that India's DPDP Act protects.

## Sources

- PostgreSQL, [19 release notes](https://www.postgresql.org/docs/release/19.0/), [versioning policy](https://www.postgresql.org/support/versioning/); AWS, [RDS supports Postgres 18](https://aws.amazon.com/about-aws/whats-new/2025/11/amazon-rds-postgresql-major-version-18); Neon, [Postgres 18 GA](https://neon.com/docs/changelog/2026-05-01).
- Drizzle, [releases](https://github.com/drizzle-team/drizzle-orm/releases), [upgrading to v1](https://orm.drizzle.team/docs/upgrade-v1), [row-level security](https://orm.drizzle.team/docs/rls).
- Encore, [comparing TypeScript ORMs](https://encore.dev/articles/typescript-orms), [Postgres RLS for multi-tenant apps](https://encore.dev/articles/postgres-row-level-security-multi-tenant); Viktar Patotski, [RLS: the pattern and the footguns](https://patotski.com/blog/postgres-row-level-security-multi-tenant/).
- Trigger.dev, [testing with real containers](https://github.com/triggerdotdev/trigger.dev/blob/main/internal-packages/testcontainers/TESTING.md).
