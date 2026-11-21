# Layout and navigation (decided 2026-11-21)

## Main sections

**Today · Syllabus · Progress · You**, chosen by how often each place is used:

- **Today:** the home screen (the day's plan, studying); **study mode** is a full-screen mode opened from Today, not a section.
- **Syllabus:** the topic map and editing.
- **Progress:** the headline number, streak and weekly report.
- **You:** routine, tracks, themes and appearance, settings, account (each used rarely, so grouped).

## Navigation by screen size (defaults)

| Screen                                   | Navigation                          |
| ---------------------------------------- | ----------------------------------- |
| Phones (360 to 430 px wide)              | Bottom bar                          |
| Tablets (768 px, portrait and landscape) | Side rail (a narrow strip of icons) |
| Laptop and desktop (1280 px and wider)   | Full sidebar                        |

## Built to be swappable

- **Navigation is data:** a list of places (Kiseki's own, plus those extensions contribute through the navigation slot), each with an icon, label and order.
- **Renderers** draw that list as a bottom bar, side rail or sidebar, chosen by screen size and the user's preferences. A new placement is one new renderer; the playground checks every renderer at every screen size.

## Customisation (later), per screen size

| Customisation                                                 | Phones                   | Tablets   | Laptop and desktop |
| ------------------------------------------------------------- | ------------------------ | --------- | ------------------ |
| Choose and reorder items, pin extensions                      | ✅                       | ✅        | ✅                 |
| Rail or sidebar on the left or right (e.g. left-handed users) | —                        | ✅        | ✅                 |
| Bottom bar instead of the side rail                           | (already the bottom bar) | ✅        | —                  |
| Side navigation                                               | ❌ not offered           | (default) | (default)          |

**No side navigation on phones:** the bottom of the screen is where a thumb rests in one-handed use, and the left edge is the hardest to reach; a sidebar takes about a fifth of a 360 px screen, and hiding it behind a ☰ menu makes people use the hidden sections less.

**Extensions on phones:** with only room for a few items in the bottom bar, extension places appear inside **You** (pinnable later); on tablets and desktop, the rail and sidebar list them.

**v0.1:** the defaults only, built on navigation-as-data and renderers, so customisation is a later feature, not a rebuild.
