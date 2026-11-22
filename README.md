# Kiseki

A study planner for long exam preparation: it plans each day, tracks what you've studied and brings topics back for revision before you forget them. UPSC first, then DSA (data structures and algorithms) interview prep.

The name is Japanese 軌跡, "trajectory": the path you have travelled ([why this name](docs/decisions/002-product-name.md)).

## Status

Early development. Not deployed yet; the first version will be invite-only.

## Stack

TypeScript everywhere: React web app, Fastify API, Postgres, in a pnpm + Turborepo monorepo. The reasons are in [decision 001](docs/decisions/001-foundation.md).

## Quick start

You need Node 26 and pnpm 12 ([why these versions](docs/decisions/003-tool-versions.md)).

```sh
pnpm install                                # install everything and set up the git hooks
cp apps/api/.env.example apps/api/.env      # local settings; blank values use the defaults
pnpm dev                                    # API on http://127.0.0.1:3000
pnpm test                                   # tests, with an 80% coverage minimum
```

All commands and the working rules are in [CLAUDE.md](CLAUDE.md).

## Folders

```
apps/api/      the API server
packages/      shared TypeScript and test settings
docs/          decisions, product plans and designs
```

More apps and packages are added as they are built; the target layout is in [CLAUDE.md](CLAUDE.md#folder-structure-target).

## Docs

- [Decisions](docs/decisions/): every architecture and tech choice, with its reasons and alternatives.
- [Product](docs/product/): principles, vision and the current phase plan.
- [Design](docs/design/): how it looks and moves.

## Licence

© Kiseki authors. All rights reserved ([why](docs/decisions/016-licence.md)).
