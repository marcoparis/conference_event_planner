# Conference Expense Planner

A single-page React app to estimate the budget of a conference: pick venue rooms, audio-visual add-ons and catering, and get an itemised cost breakdown that updates in real time.

**Live demo:** https://marcoparis.github.io/conference_event_planner/

## Features

- **Venue selection** – book one or more rooms, with per-room limits (e.g. at most 3 auditorium halls).
- **Add-ons** – speakers, microphones, projectors, whiteboards, signage, each with its own quantity.
- **Meals** – choose breakfast / high tea / lunch / dinner; the cost is multiplied by the number of attendees.
- **Live subtotals** per section and an itemised **summary table** with the grand total.
- Responsive layout (desktop and mobile), keyboard-accessible controls.

## Tech stack

| Area | Tools |
| --- | --- |
| UI | React 18, CSS (custom properties, grid, flexbox) |
| State management | Redux Toolkit (`createSlice`), React-Redux hooks |
| Build tooling | Vite |
| Testing | Vitest |
| Linting | ESLint |
| Deployment | GitHub Pages (`gh-pages`) |

## Architecture

```
src/
├── store.js            # configureStore with the three slices below
├── venueSlice.js       # rooms: quantity with per-item max
├── avSlice.js          # audio-visual add-ons
├── mealsSlice.js       # meals (selected flag) + number of attendees (sanitised input)
├── selectors.js        # derived totals, currency formatting
├── ConferenceEvent.jsx # planner page (sections + reusable QuantityCard)
├── TotalCost.jsx       # summary table and grand total
└── planner.test.js     # unit tests for reducers and selectors
```

Totals are never stored in the state: they are **derived** with selectors from the selected items, so there is a single source of truth and nothing can go out of sync.

## Getting started

```bash
npm install
npm run dev      # start the dev server
npm test         # run the unit tests
npm run lint     # lint the code
npm run build    # production build in dist/
npm run deploy   # build and publish to GitHub Pages
```
