# Project notes — World Cup Planner

Working notes behind the build: what's verified, where it came from, decisions made, and what's left.

## Context

- **Who:** Kyle, in Montclair, NJ; flies out of **Newark (EWR)**. Checks this on his phone while traveling.
- **Tickets:** USA's **first two knockout games only** — Round of 32, then Round of 16 **if USA advance** (tickets follow the team, so the R16 seat is void if USA lose the R32). No QF / SF / Final tickets.
- **Core idea:** USA's Group D finish (1st / 2nd / 3rd) fixes the cities. Each scenario shows the R32 plan, then branches on the R32 result: **win → R16 city then home; lose → straight home.**

## Verified data anchors — last checked Jun 13, 2026

Group D = USA, Paraguay, Australia, Türkiye. USA beat Paraguay **4–1** (Fri Jun 12, SoFi/LA) and lead the group after MD1. Group **not yet decided**; all three scenarios live.

Remaining USA group games: **Jun 19** vs Australia (Seattle/Lumen), **Jun 25** vs Türkiye (LA/SoFi).

| Finish | R32 (Game 1) | R16 (Game 2, if they win) |
|---|---|---|
| **Win** | Wed Jul 1, 8pm ET — Levi's Stadium, Santa Clara (SF Bay) | Mon Jul 6 — Lumen Field, Seattle |
| **Runner-up** | Fri Jul 3, 2pm ET — AT&T Stadium, Arlington (Dallas) | Mon Jul 6, 12pm ET — Mercedes-Benz, Atlanta |
| **Third** | ~Jun 30, venue **TBD** — Foxborough / MetLife / Arrowhead | **TBD** — branches from R32 |

Final (no ticket): Sun Jul 19, MetLife, East Rutherford, NJ.

Deeper bracket (not ticketed, kept for reference): Win path continues QF SoFi/LA Jul 10 → SF AT&T/Dallas Jul 14; Runner-up continues QF Arrowhead/KC Jul 11 → SF Mercedes-Benz/Atlanta Jul 15.

**Sources:** FIFA bracket article, ESPN 2026 fixtures/results, Olympics.com & World Soccer Talk Group D standings, kickoffadventures R16 grid (match numbers 89–96), Wikipedia 2026 FIFA World Cup. Re-verify live before booking.

## Travel logic (per leg: gap between games + geography)

- Short hops / tight turnarounds → **fly**. Long gaps between far-apart cities → **fly home** if no cluster reason to stay.
- The one time-rich leg, **Bay Area → Seattle (5 days, win path)**, is the exception → recommend a **one-way rental up the Pacific Coast** (redwoods → Oregon coast → Seattle), with a 2h flight as the alt. Explicitly *don't* route home between the SF and Seattle games.
- Costs are **budget / mid / splurge** sensibilities, not quotes. July 4 week is peak → "book early" flags.

## Decisions

- **Hosting:** Firebase Hosting on `kyle-sandbox24`, dedicated site `world-cup-planner` → https://world-cup-planner.web.app. Repo `kylecurtin/world-cup-planner` (public, `main`).
- **Old site `road-to-metlife.web.app`** still exists with the pre-rename build — delete or redirect when convenient.
- **Stack:** one self-contained static HTML, network-first service worker (cache-first served stale pages early on — switched to network-first so deploys show up on reload), installable PWA.
- **Style:** started Team-USA themed (stars/stripes/gold), then **de-cheesed** to an objective editorial look at Kyle's request. Keep it lean and intentional.
- **Tickets field** is local-only (`localStorage`); plans assume he attends both ticketed games.

## To-do / re-verify

- [ ] **After Jun 19 & Jun 25 group games:** re-verify the bracket, update "last verified" date, and mark any scenario "no longer possible" once USA's finish is set.
- [ ] **Resolve the Third-place page** once USA's group finish + third-place qualification are known (R32 venue, then R16).
- [ ] Optional: delete/redirect the old `road-to-metlife.web.app`.
- [ ] Confirm exact kickoff times once FIFA finalizes them.

## Review (Woz + Jobs, applied)

- **Jobs:** fixed clipped H1 on narrow phones; headline carries the two-games idea; cut repeated copy; removed topbar verified stamp + status pulse; purged leftover gold/star styling.
- **Woz:** verified all dates/airport codes/times are internally consistent; added tablist arrow-key nav + roving tabindex; guarded the service-worker page-cache write on `res.ok` + added a fetch timeout fallback; `replaceState` only on hash change; bumped footer legal-text contrast to AA.
