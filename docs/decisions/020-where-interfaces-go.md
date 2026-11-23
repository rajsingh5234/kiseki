# 020: Where interfaces go

- **Date:** 2026-11-23
- **Status:** Accepted

## Context

Before writing the first repositories, we asked whether every layer (controller, service, repository) should have an interface, and whether the ORM and the database should be swappable. We compared expert guidance and real code.

## Choice

- **An interface only where it earns its place:** two or more real implementations; an edge to an outside system (email, push, payments, the clock); or another module depending on this one, with a small interface shaped by that module's needs and exported from its `index.ts`.
- **Never an interface just to fake something in a test;** we test through the real thing (real HTTP requests, the real Postgres) and keep business logic in pure functions.
- **Controllers, and services used only inside their module, are plain classes.**
- **Repositories are plain classes** and the only place Drizzle appears; their public methods use only our own types, so replacing the ORM means rewriting repositories alone. If a second implementation ever appears, an interface is extracted then.
- **The database is not abstracted:** Postgres features are used fully ([decision 019](019-database-setup.md)).

## Alternatives

- **An interface for every class** (controller, service and repository): symmetrical, but each one-implementation interface copies its class and must be kept in sync, and mostly serves mocks we don't use.
- **Repository interfaces with ORM-named classes** (Cal.com's newer code): sensible when services are unit-tested with fakes; our services are tested against the real database, and the swap is protected by keeping Drizzle types inside repositories.
- **A database-agnostic layer:** in practice the lowest common denominator; it would give up row-level security, `uuidv7()` and template databases.

## Why

Fowler, Go's code-review guide, Seemann and Khorikov agree that interfaces belong where there is more than one implementation or a boundary you don't control, and that one-implementation interfaces made for mocking cost more than they give. Teams that replaced Prisma with Drizzle did it repository by repository with the same integration tests; what made that possible was keeping ORM types inside the repositories.

## Sources

- Martin Fowler, [InterfaceImplementationPair](https://martinfowler.com/bliki/InterfaceImplementationPair.html); Go, [Code Review Comments: Interfaces](https://go.dev/wiki/CodeReviewComments); Mark Seemann, [Interfaces are not abstractions](https://blog.ploeh.dk/2010/12/02/Interfacesarenotabstractions); Vladimir Khorikov, [Interfaces for repositories: do or don't?](https://enterprisecraftsmanship.com/posts/interfaces-for-repositories/).
- Drizzle discussions, [Prisma to Drizzle migration complete](https://github.com/drizzle-team/drizzle-orm/discussions/3146); Cal.com's repositories (`IAttendeeRepository`, `PrismaBookingAttendeeRepository`).
