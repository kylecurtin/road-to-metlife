# World Cup Planner — USMNT '26 travel

A personal, mobile-first travel planner for **Team USA's first two 2026 World Cup knockout games**, out of **Newark (EWR)** from **Montclair, NJ**.

The tickets cover the **Round of 32**, then the **Round of 16 — but only if USA advance** (they follow the team). So USA's Group D finish sets where the games are, and within each finish the plan branches on the Round-of-32 result:

- **Win the R32** → travel to the Round-of-16 city, then fly home.
- **Lose the R32** → fly straight home from the R32 city.

Pick **1st / 2nd / 3rd** and you get the R32 plan plus both outcomes, each as a card: drive-vs-fly, where to base, one-way rentals, lodging areas, rough cost feel, and book-early flags.

## The three scenarios

- **Win Group D** — R32 at **Levi's / SF Bay** (Jul 1); win it and R16 is **Lumen Field / Seattle** (Jul 6), reached via a one-way Pacific Coast drive or a short flight.
- **Runner-up** — R32 at **AT&T / Dallas** (Jul 3); win it and R16 is **Mercedes-Benz / Atlanta** (Jul 6) — two short hops.
- **Third place** — only if USA is a top-8 third-place team; R32 lands at Foxborough, MetLife, or Kansas City, with R16 branching from there. Placeholder until the live bracket resolves it.

> **Last verified: Jun 13, 2026.** USA beat Paraguay 4–1 and lead Group D, but the group isn't decided yet — all three scenarios are still live. Re-verify the bracket before booking, especially the Third-place page.

## Tech

Single self-contained `public/index.html` (inline CSS/JS, no build step, no backend). Installable PWA with a network-first service worker so it updates when online and stays readable offline. Mobile-first, high-contrast for sunlight, native `<details>` collapsibles, Team USA / World Cup styling.

## Run / deploy

```bash
# local preview
cd public && python3 -m http.server 8080   # then open http://localhost:8080

# deploy (Firebase Hosting, project kyle-sandbox24, site road-to-metlife)
firebase deploy --only hosting
```

Live at **https://road-to-metlife.web.app**. Editable "My tickets" notes are saved in `localStorage` on the device only.
