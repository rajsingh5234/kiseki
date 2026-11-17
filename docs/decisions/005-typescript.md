# 005: TypeScript 7 and shared compiler settings

- **Date:** 2026-11-17
- **Status:** Accepted

## Choice

- **TypeScript 7** (7.0.2 at the time), the native Go rewrite of the compiler. TypeScript only checks types; Node and Vite run the code.
- **One shared base config**, `packages/typescript-config/base.json`, that every app and package extends. Presets for Node and React (`node.json`, `react-app.json`…) are added when the first app needs them.
- **`erasableSyntaxOnly` on:** only TypeScript that can be erased to leave plain JavaScript, so Node 26 can run our `.ts` files directly, with no build step for the API.

## The base settings

| Setting | What it does |
| --- | --- |
| `target`, `lib`: `es2025` | Modern JavaScript only. No Node or browser APIs: each preset adds its own environment, so browser code can't use Node-only APIs and vice versa. |
| `strict` | All of TypeScript's strict checks (e.g. no implicit `any`, `null` must be handled). |
| `noUncheckedIndexedAccess` | `list[5]` and `map[key]` may be `undefined`, so missing items are handled before they crash. |
| `noImplicitOverride` | A method that replaces a parent class's method must say `override`, so renaming the parent method can't silently break a child. |
| `verbatimModuleSyntax`, `isolatedModules` | Type-only imports must say `import type`. Each file can then be read on its own, as Node, Vite and Vitest do. |
| `erasableSyntaxOnly` | Blocks `enum`, `namespace` and constructor parameter properties (`constructor(private repo: IRepo)`), which produce code instead of being erasable. We use `as const` objects and write fields out in full. |
| `moduleDetection: force` | Every file is a module with its own scope, never a global script. |
| `allowImportingTsExtensions` | Relative imports end in `.ts` (`./task.service.ts`), as Node requires when it runs TypeScript directly. |
| `noEmit` | TypeScript never writes JavaScript files; it only checks. |
| `skipLibCheck` | Skips type-checking libraries' own type files: much faster, and their errors aren't ours to fix. |

## Alternatives

- **TypeScript 6:** the last JavaScript-based compiler. Every tool works with it, but it's about 10× slower and only gets fixes. It has the same defaults and rules as 7, so we can fall back by changing one version number.
- **Allowing `enum` and parameter properties:** shorter code, but the API would always need a compile step, and some tools treat these features differently.
- **Settings copied into each package:** no extra package, but the copies drift apart.

## Why

- TypeScript 7 checks types about 10× faster, in the editor and in CI, and it's where all new TypeScript work happens.
- Checked on 2026-11-17: oxlint's type-aware engine (`oxlint-tsgolint`) is built on TypeScript 7, and React Router's type generation supports `^7.0.0`. Vite, Vitest, Playwright, Fastify, Zod, Drizzle and TanStack Query don't depend on the TypeScript compiler.
- Erasable-only TypeScript runs directly on Node and reads the same way in every tool.

## Risks and follow-ups

- TypeScript 7.0 has no programmatic API (planned for 7.1). A tool that needs it can use `@typescript/typescript6` alongside, while the project stays on 7.
- VS Code 1.146 doesn't include TypeScript 7 yet: install the "TypeScript 7" extension (TypeScriptTeam) when TypeScript is first installed.
- Config files are plain JSON with no comments (VS Code accepts comments only in files named `tsconfig.json`). Explanations live here.
