# Road to MetLife — USMNT World Cup '26 travel plan

A personal, mobile-first travel planner for following **Team USA** through the 2026 World Cup knockout rounds, out of **Newark (EWR)** from **Montclair, NJ**.

USA's knockout path is mostly fixed by where they finish **Group D**. Pick **1st / 2nd / 3rd** and the site shows one smart, round-by-round travel plan for that route — drive-vs-fly per leg, where to base, one-way rentals, lodging areas, and rough cost feel — always ending home for the **Final at MetLife (Jul 19)**.

## The three scenarios

- **Win Group D** — SF Bay (Jul 1) → Seattle (Jul 6) → LA (Jul 10) → Dallas (Jul 14) → MetLife. A West Coast swing; don't fly home in the middle.
- **Runner-up** — Dallas (Jul 3) → Atlanta (Jul 6) → Kansas City (Jul 11) → Atlanta (Jul 15) → MetLife.
- **Third place** — only if USA is a top-8 third-place team; R32 lands at Foxborough, MetLife, or Kansas City. Placeholder until the live bracket resolves it.

> **Last verified: Jun 13, 2026.** USA beat Paraguay 4–1 and lead Group D, but the group isn't decided yet — all three scenarios are still live. Re-verify the bracket before booking, especially the Third-place page.

## Tech

Single self-contained `public/index.html` (inline CSS/JS, no build step, no backend). Installable PWA with an offline service worker so the plan is readable on spotty connections while traveling. Mobile-first, high-contrast for sunlight, native `<details>` collapsibles.

## Run / deploy

```bash
# local preview
cd public && python3 -m http.server 8080   # then open http://localhost:8080

# deploy (Firebase Hosting, project kyle-sandbox24)
firebase deploy --only hosting
```

Editable "My tickets" notes are saved in `localStorage` on the device only.
