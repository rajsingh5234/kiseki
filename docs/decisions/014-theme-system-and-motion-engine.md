# 014: Theme system and motion engine

- **Date:** 2026-11-21
- **Status:** Accepted
- **Extends:** decision 001 (styling with design tokens, themes under `[data-theme]`, an effects registry)
- **Summary in:** [docs/design/themes-effects-motion.md](../design/themes-effects-motion.md)

## Context

Users will pick themes, and later install outside ones; new looks (surface styles such as glass or clay) and effects (glow, springs…) will keep being added. Each addition must work with every theme without creating new themes, without changing components, and without breaking readability or smoothness on budget phones. The first UPSC user's favourite design is soft, flat and pastel; she studies late, on a 144 Hz Android phone.

## Choice

### A theme is a combination of swappable parts

```
Theme = colours (token set) + surface style + aesthetic + effects
Layout (e.g. a bento grid for the dashboard) is separate and works with every theme.
```

- **Themes hold colours only**, as data (a token set per light and dark version), checked against a schema. Data can't run code, so outside themes are safe; built-in themes are shaped exactly like a future theme extension.
- **Surface styles and effects are recipes, as code:** a surface style works out its look (shadows, depth, rounding, blur, backdrop) from **any** theme's colours; an effect uses theme colours (e.g. a glow uses the accent). Code can do anything, so these come only from us or reviewed extensions.
- **Components only use the token contract** ("my surface", "primary"), never a specific theme, style or effect.
- Therefore a new surface style or effect is one new recipe that works with every theme, and a new theme is one new colour set that works with every surface style. Recipes work things out by default; a theme may override a value where hand-tuning is needed.
- **Light and dark pairs:** each theme family has both; appearance follows the system by default (or always light / always dark).
- **One surface style per theme at a time** (mixing styles on one screen looks like two apps), with **flat as the automatic fallback** when the phone is slow, battery saver is on or "reduce transparency" is set. **Several effects** at once, with intensity from the theme and individual effects switchable by the user.
- **Who wins:** phone settings (reduce motion, reduce transparency, battery saver) → the user's own choices → the theme's defaults.
- **Automatic, but automatically checked:** a playground shows every component in every combination (surface style × light/dark × effects × reduced motion); screenshot comparisons and contrast checks run across all combinations on every change, and a failing combination is hidden from Settings until fixed.

### Folders in `packages/ui/src/`

| Folder              | Holds                                                                                                         |
| ------------------- | ------------------------------------------------------------------------------------------------------------- |
| `tokens/`           | The contract: shared names (colour roles, spacing, radius, type, motion); the only thing the others depend on |
| `themes/<family>/`  | Colours only, as data (`light.json`, `dark.json`)                                                             |
| `surfaces/<style>/` | One surface-style recipe each (flat, clay, glass…)                                                            |
| `effects/<effect>/` | One effect each (glow, spring, haptics…)                                                                      |
| `engine/`           | Combines the active theme, surface style, effects, user choices and phone settings                            |
| `motion/`           | The motion engine (below)                                                                                     |
| `components/`       | Components that use only the tokens                                                                           |

Themes, surface styles and effects are **found automatically from their folders** (never listed by hand): adding or removing one is adding or deleting its folder. Each has its own tests.

### Picks

- **Surface styles:** flat (default and fallback), clay, glass, brutalism (the high-contrast option); liquid glass later. Not neumorphism (low contrast, unclear buttons, weak in dark mode) or skeuomorphism (dated, heavy), except perhaps a "paper planner" theme later.
- **Aesthetic:** minimalism as the base; brutalism. Not maximalism (fights focus).
- ~~**v0.1:** the Lavender family (light and dark), with flat and clay selectable; glass built behind a developer switch to prove the system with its hardest style; brutalism in v0.2.~~ (Replaced by [decision 015](015-glass-in-v0.1-and-two-bottom-bars.md): glass is a normal choice in v0.1, with a one-tap style switcher.)
- **Effects in v0.1:** glow on touch, springs (never on native scrolling), haptics, screen transitions, progress animation, rare celebration.

### Motion engine

A web app can't replace the browser's drawing (as phone systems like ColorOS and OxygenOS do with their rendering engines), but it can **orchestrate** animations so the browser's compositor and GPU do the work off the main thread.

- **Kiseki's motion engine** (`packages/ui/src/motion/`): compositor-only properties (position, scale, transparency); parallel and interruptible animations that keep their speed when redirected; one shared clock in step with the screen (up to 144 Hz); no layout thrashing; device tiers (power, refresh rate, battery saver, reduce motion) that scale effects; self-correction when frames drop; heavy work (re-planning) in a background worker.
- **Built on Motion** (formerly Framer Motion) **behind our own interface:** its hybrid engine runs animations hardware-accelerated through the browser's animation engine wherever possible, with springs, drag, interruption and reduce-motion support built in; small and MIT-licensed. A smoothness test on a 144 Hz Android phone confirms it at the build step.

## Alternatives

- **One theme = one fixed look** (colours, surfaces and effects baked together): every new style would need a new theme per colour family, and components would know about styles.
- **Free mix-and-match of any theme with any style without checks:** some combinations fail contrast or have nothing to blur (glass on plain off-white); hidden breakage.
- **Themes as code:** more power, but outside themes could run anything.
- **Spring physics on native scrolling ("scroll-jacking"):** feels wrong on Android, drops frames, breaks accessibility tools.
- **GSAP:** strong timelines, but no real springs, works outside React, and its license forbids tools that let people build visual animations without code (terms Webflow can change), a risk for future theme and effect tools.
- **React Spring:** good physics, but runs every frame in JavaScript on the main thread.
- **Writing a motion engine from scratch:** years of edge cases (physics, gestures, interruption) that mature libraries already handle.

## Why

Separating colours (data) from looks and effects (recipes), with components that know only the token contract, makes every addition work everywhere at once while keeping outside themes safe. Automatic cross-combination checks keep "works everywhere" honest. The motion engine keeps animation on the GPU and adapts to each phone, and building it on Motion behind an interface gives proven physics without locking us in.

## Sources

- Motion, [feature comparison](https://motion.dev/docs/feature-comparison) and [Web Animations API improvements](https://motion.dev/guides/waapi-improvements): the hybrid engine and hardware acceleration.
- GSAP, [standard license](https://gsap.com/community/standard-license/); Webflow, [GSAP becomes free](https://webflow.com/blog/gsap-becomes-free): prohibited uses.
- LogRocket, [best React animation libraries 2026](https://blog.logrocket.com/best-react-animation-libraries/); Syncfusion, [performance trade-offs](https://www.syncfusion.com/blogs/post/react-animation-libraries-comparison).
- OPPO, [ColorOS 17: Flow Everywhere](https://www.oppo.com/en/newsroom/stories/oppo-color-os-17-smooth/): the unified rendering architecture that inspired the orchestration idea.
- thoughtbot, [a lean approach to design systems](https://thoughtbot.com/blog/a-lean-approach-to-design-systems); Martin Fowler, [design-token-based UI architecture](https://martinfowler.com/articles/design-token-based-ui-architecture.html).
