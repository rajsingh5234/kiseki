# 008: Stateless helpers are plain functions

- **Date:** 2026-11-18
- **Status:** Accepted
- **Replaces:** one line of decision 001 §6: "Stateless helpers are static-only classes (`HttpResponse.ok(data)`)". The rest of §6 stays.

## Choice

Code style is a mix, each style where it fits:

| Kind of code                                                                                         | Style                                                              | Examples                                               |
| ---------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------ | ------------------------------------------------------ |
| Has dependencies or state (controllers, services, repositories, providers, database, logger, errors) | **Class**, dependencies passed into the constructor as interfaces  | `TaskService`, `ConfigError`                           |
| Stateless helper (nothing to inject, nothing to remember)                                            | **Plain exported function**; the file (module) groups related ones | `requestIdFrom(header)`, `loadConfig(env)`, `ok(data)` |
| Builds and wires things                                                                              | **Factory function**                                               | `buildApp(config)`, `createTaskModule({ db, logger })` |
| Pure data                                                                                            | `type` / `const`                                                   | `AppConfig`, `DEFAULT_LEVEL`                           |
| Frontend                                                                                             | Function components and hooks                                      | (React)                                                |

Static-only classes are not used. oxlint already reports them (`typescript/no-extraneous-class`, part of the `suspicious` group we turn on), so no extra setting is needed.

## Alternatives

- **Classes for everything** (NestJS style): one uniform style, familiar from Java and C#. But a stateless helper becomes `RequestId.from(header)` or `new RequestIdGenerator().from(header)`: more code, nothing gained (no state, nothing to inject). Every major TypeScript linter (typescript-eslint, Biome, oxlint) flags static-only classes, and bundlers may keep the whole class when one method is used. React is function-only, so "classes everywhere" can't hold across the repo anyway.
- **Functions for everything** (the TypeScript compiler, practica.js): dependencies passed as parameters or through closures. It works, but interfaces, SOLID and design patterns are less visible, which decision 001 §6 chose classes for.

## Why

Large TypeScript codebases use this same mix: VS Code (service classes with constructor injection; helpers such as string and array utilities are plain functions), Cal.com (service and repository classes; handlers and helpers are functions), and modern Angular (moving small pieces to functions). Classes earn their place where there is something to inject or remember; for everything else, an ES module already gives the grouping a static class would. Neither style is faster: the choice is about design, not speed.
