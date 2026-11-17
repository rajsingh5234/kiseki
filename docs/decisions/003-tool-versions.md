# 003: Tool versions: Node 26 and pnpm 12

- **Date:** 2026-11-17
- **Status:** Accepted

## Choice

- **Node.js 26** (Active LTS since October 2026, supported until about April 2029).
- **pnpm 12**, pinned to an exact version in the root `package.json` (`"packageManager": "pnpm@12.21.0"`). pnpm is installed once per machine; it reads this field and runs exactly that version.
- Node is pinned in three places that work together: `engines` in the root `package.json` (the rule), `.nvmrc` (read by nvm and CI), and pnpm's engine-strict setting (refuses to install on the wrong Node).

## Alternatives

- **Node 24:** the most battle-tested, but in Maintenance LTS (security fixes only, ends April 2028), so we would have to upgrade within about a year, likely near launch.
- **Corepack** to install pnpm: no install step, but it is no longer bundled with Node 25 and later.
- **A global pnpm with no pin:** simplest, but each machine drifts to a different version.

## Why

- A new product should start on the Active LTS, with the longest support ahead.
- An exact pnpm version means every laptop and CI run the same tool, so installs and the lockfile behave the same everywhere.

## Risks and follow-ups

- Node 26 became LTS only recently, so a library may lag: check support for each one as it is added.
- Check that Turborepo reads pnpm 12's lockfile at the Turborepo step.
- Upgrade both on purpose (a `chore:` commit), never by accident.
