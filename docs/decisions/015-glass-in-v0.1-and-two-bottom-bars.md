# 015: Glass in v0.1 and two phone bottom bars

- **Date:** 2026-11-22
- **Status:** Accepted
- **Replaces:** the v0.1 line of [decision 014](014-theme-system-and-motion-engine.md) (glass behind a developer switch)
- **Summary in:** [themes, effects and motion](../design/themes-effects-motion.md), [layout and navigation](../design/layout-and-navigation.md)

## Context

The UPSC user tried the clickable prototype with flat, clay and glass. She wants every surface style available and expects to pick a different one most days. She preferred the flat bottom bar to the cradle bar, but the Study button proved its worth.

## Choice

- **Glass is a normal choice in v0.1,** next to flat and clay: the iOS frosted look, following the glass recipe (blur only on floating layers, solid content cards, theme colours unchanged). It's tested on her phone at the build step and falls back to flat on a slow phone, with battery saver or with reduce transparency. Brutalism stays in v0.2; liquid glass later.
- **A one-tap style switcher** with live previews in You, because a daily choice must be quick. "A new style each day" is a later option.
- **Two bottom bars on phones,** both renderers of the same navigation data: **flat** (the default) and **cradle**. Both have a centre **Study button** (inside the flat bar, raised in the cradle) that does what the "Now" card's arrow does; between blocks it offers the next block, and after the day's blocks it opens a topic search.

## Alternatives

- **Glass behind a developer switch until v0.2** (decision 014): safer, but it hides a style she liked, and the flat fallback already protects slow phones.
- **Style choice only in Settings:** fine for a set-and-forget choice, too slow for a daily one.
- **One bottom bar:** less to build and test, but she prefers flat while the Study button earns its place.
- **Study only on the "Now" card:** no fixed place, and out of reach from other tabs.

## Why

Variety is part of the enjoyment for her, and the theme system was built so a new style is a recipe, not a rebuild. The fallback rules already protect smoothness, and the second bar is one renderer, on phones only.
