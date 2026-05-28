# CosmosHub

CosmosHub is a verified space news intelligence dashboard built with React, Vite, and Express. It aggregates live RSS feeds from major space organizations and media outlets, ranks and deduplicates articles, generates AI-assisted summaries and context, and lets users personalize the feed through onboarding preferences.

## Overview

The app is designed to feel like a focused mission control panel for space news. It combines:

- a live RSS feed with auto-refresh
- a personalized For You section driven by onboarding interests
- a neutral All feed and source-specific filters
- a Mission Tracker view that ties curated missions to related news
- AI summaries, context panels, fact-check badges, and trust indicators
- local community interactions such as upvotes and comments
- lightweight persistence through `localStorage`

CosmosHub is intentionally frontend-first, with a small RSS proxy layer that allows the app to fetch external feeds safely in development and in deployment.

## Key Features

- Live aggregation from NASA, NASA JPL, ESA, Space.com, Universe Today, ISS Blog, ScienceDaily Space, Phys.org Space, ArXiv Astronomy, SpaceNews, Astronomy Magazine, SpacePolicyOnline, and NOIRLab News.
- Onboarding flow that captures user interests and powers the personalized For You section.
- For You, All, and source-based feed filters.
- AI summaries at three levels: Quick, Detailed, and ELI12.
- AI-generated context drawer with background, importance, and related missions/topics.
- Trust badges and automated fact-check labels on each article card.
- Upvotes and comments stored locally in the browser.
- Mission Tracker cards for Artemis, Chandrayaan, Starship, JWST, Gaganyaan, Europa Clipper, Aditya-L1, and Roman Telescope.
- Live ticker and animated UI transitions.
- Auto-refresh every 5 minutes.
- Deployment-ready proxy support for Vercel and Netlify.

## Tech Stack

- React 18
- React Router
- Vite
- GSAP
- Express
- node-fetch
- CORS middleware
- Browser `localStorage` for client-side persistence

## Project Structure

```text
src/
	App.jsx                 Main app shell, routing, onboarding, alerts
	main.jsx                React entry point
	components/             Header, ticker, tabs, cards, modal, onboarding, alerts
	data/missions.js        Curated mission tracker data
	styles/global.css       Global styling and layout system
	utils/                  RSS, AI, trust, personalization, alerts, community helpers
	views/                  Feed and mission views
server.js                 Express server and RSS proxy for local + production-like runs
api/rss-proxy.js          Vercel-compatible RSS proxy route
netlify/functions/        Netlify function for RSS proxy
vercel.json               Vercel SPA routing config
netlify.toml              Netlify build/function/redirect config
```

## Requirements

- Node.js 18 or newer
- npm

## Environment Variables

Create a `.env` file from `.env.example` and fill the values you need.

| Variable | Required | Purpose |
| --- | --- | --- |
| `PORT` | No | Port for the Express server. Defaults to `3001`. |
| `ANTHROPIC_API_KEY` | Optional | Server health-check indicator and general environment template variable. |
| `VITE_ANTHROPIC_API_KEY` | Optional | Used by the frontend AI summary/context features. |
| `VITE_RSS_MAX_PER_SOURCE` | Optional | Maximum RSS items fetched per feed source. Defaults to `20`. |
| `VITE_AI_SUMMARY_LIMIT` | Optional | Number of articles that request AI summaries before fallback summaries are used. Defaults to `40`. |

> Note: If the AI key is not set, the app falls back to local summaries and the AI context panel remains unavailable.

## Installation

```bash
npm install
```

## Development

Run the full local stack:

```bash
npm run dev
```

This starts:

- Vite frontend on `http://localhost:5173`
- Express backend on `http://localhost:3001`

The frontend requests RSS data through the proxy path, so this is the best mode for day-to-day development.

## Production-like Local Run

Build the app and serve the generated output with the Express server:

```bash
npm run build
npm run server
```

This is the best local check for how the app will behave when deployed, because it serves the compiled frontend and the RSS proxy together.

## Scripts

| Script | Description |
| --- | --- |
| `npm run dev` | Starts Vite and the Express RSS proxy together. |
| `npm run server` | Starts the Express server only. Serves `dist/` and the proxy route. |
| `npm run build` | Builds the production frontend into `dist/`. |
| `npm run preview` | Previews the static Vite build only. Useful for asset checks, but not a full proxy-backed runtime test. |
| `npm run start` | Builds the app and then starts the Express server. |

## Deployment

### Vercel

CosmosHub is ready to deploy on Vercel with the included API route and SPA rewrite config.

1. Connect the repository to Vercel.
2. Use `npm run build` as the build command.
3. Set the output directory to `dist`.
4. Deploy the app.

The RSS proxy is exposed through `api/rss-proxy.js`, and the SPA rewrite is handled through `vercel.json`.

### Netlify

CosmosHub is also ready for Netlify with a Netlify Function for the RSS proxy.

1. Connect the repository to Netlify.
2. Use `npm run build` as the build command.
3. Set the publish directory to `dist`.
4. Deploy the app.

The RSS proxy is provided by `netlify/functions/rss-proxy.js`, and routing is configured in `netlify.toml`.

## How the App Works

- RSS feeds are fetched through a proxy layer so the browser does not call remote feeds directly.
- Articles are deduplicated and ranked before display.
- The For You section uses the onboarding preferences to highlight matching articles.
- The All section stays neutral and shows the full feed pool.
- Mission Tracker cards pull related news from the currently loaded article set.
- Votes and comments are stored in browser `localStorage`.
- Onboarding preferences are also stored in `localStorage`, with the current dev session isolated from refreshes.

## Troubleshooting

### No articles appear

- Confirm the backend or hosted API proxy is available.
- Check the browser Network tab for `/api/rss-proxy` requests.
- Some RSS providers may rate limit or block automated requests.

### RSS source returns `403` or `429`

- `403` usually means the feed provider is blocking the request.
- `429` means the feed provider is rate limiting the source.
- The app skips failed feeds and continues rendering the working ones.

### AI summaries do not appear

- Set `VITE_ANTHROPIC_API_KEY` in `.env`.
- Restart the dev server after changing environment variables.

### Onboarding keeps showing

- The app stores onboarding state in browser storage.
- Clear site data or localStorage if you want to restart the onboarding flow manually.

## Notes

- CosmosHub does not use a database; all community and personalization state lives in the browser.
- The live feed count can vary because remote RSS sources may rate limit, block, or temporarily fail.
- For the most reliable deployment test, use `npm run build` followed by `npm run server` or your hosted deployment.
