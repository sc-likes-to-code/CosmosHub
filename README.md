# 🚀 CosmosHub

> **A verified space news intelligence dashboard powered by AI, personalization, and live mission tracking.**

CosmosHub is a modern space-news intelligence platform built using **React, Vite, and Express**.  
It aggregates live RSS feeds from trusted global space organizations and media outlets, ranks and filters articles intelligently, generates AI-assisted summaries and contextual insights, and delivers a personalized experience tailored to each user’s interests.

Designed with a **mission-control inspired UI**, CosmosHub combines real-time information, trust indicators, AI-powered context generation, and community engagement into one immersive experience.

---

# ✨ Features

## 🌌 Live Space News Aggregation

Fetches and updates live RSS feeds from trusted sources including:

- NASA
- NASA JPL
- ESA
- Space.com
- Universe Today
- SpaceNews
- Phys.org Space
- ScienceDaily Space
- Astronomy Magazine
- NOIRLab
- ArXiv Astronomy
- SpacePolicyOnline

---

## 🧠 AI-Powered Intelligence Layer

### AI Summaries

Each article supports:

- ⚡ Quick Summary
- 📖 Detailed Summary
- 🧒 ELI12 (Explain Like I’m 12)

### AI Context Panel

Provides:

- Background information
- Scientific significance
- Related missions/topics
- Simplified explanations

### Trust & Fact-Check Indicators

Articles include:

- Source credibility indicators
- Fact-check labels
- Verification badges

---

# 🎯 Personalized Experience

## 🛸 Onboarding-Based Personalization

Users select interests during onboarding such as:

- Astronomy
- Rockets
- Mars
- Black Holes
- ISRO
- SpaceX
- AI in Space
- Planetary Science

This powers the personalized **For You** feed.

---

## 📰 Feed Modes

### For You

Personalized feed based on user interests.

### All Feed

Neutral chronological/global feed.

### Source Filters

Filter content by individual news sources.

---

# 🚀 Mission Tracker

Dedicated mission-tracking cards for:

- Artemis
- Chandrayaan
- Starship
- JWST
- Gaganyaan
- Aditya-L1
- Europa Clipper
- Roman Telescope

Each mission dynamically links related news articles.

---

# 👥 Community Features

- 👍 Upvotes
- 💬 Comments
- 🧠 Local engagement persistence
- 📦 Browser-based storage using `localStorage`

---

# 🎨 UI & Experience

- Mission-control inspired design
- Animated transitions using GSAP
- Live news ticker
- Auto-refresh every 5 minutes
- Responsive layout
- Smooth onboarding flow
- Modern dark-space aesthetic

---

# 🛠️ Tech Stack

## Frontend

- React 18
- React Router
- Vite
- GSAP

## Backend

- Express.js
- node-fetch
- CORS

## Storage

- Browser `localStorage`

## Deployment

- Vercel
- Netlify

---

# 📁 Project Structure

```bash
CosmosHub/
│
├── src/
│   │
│   ├── App.jsx                 # Main application shell
│   ├── main.jsx                # React entry point
│   │
│   ├── components/             # Reusable UI components
│   │   ├── Header/
│   │   ├── NewsCard/
│   │   ├── Ticker/
│   │   ├── Tabs/
│   │   ├── Modals/
│   │   ├── Alerts/
│   │   └── Onboarding/
│   │
│   ├── views/                  # Main application pages/views
│   │   ├── FeedViews/
│   │   └── MissionViews/
│   │
│   ├── data/                   # Static and curated datasets
│   │   └── missions.js
│   │
│   ├── utils/                  # Utility/helper functions
│   │   ├── rss.js
│   │   ├── ai.js
│   │   ├── trust.js
│   │   ├── personalization.js
│   │   ├── alerts.js
│   │   └── community.js
│   │
│   └── styles/                 # Global styling
│       └── global.css
│
├── api/                        # Serverless API routes
│   └── rss-proxy.js
│
├── netlify/
│   └── functions/              # Netlify serverless functions
│
├── server.js                   # Express backend server
├── vercel.json                 # Vercel deployment config
├── netlify.toml                # Netlify deployment config
│
├── package.json
├── package-lock.json
├── vite.config.js
├── .env.example
├── .gitignore
│
└── README.md
```

---

# ⚙️ Environment Variables

Create a `.env` file from `.env.example`.

```env
PORT=3001

ANTHROPIC_API_KEY=

VITE_ANTHROPIC_API_KEY=

VITE_RSS_MAX_PER_SOURCE=20

VITE_AI_SUMMARY_LIMIT=40
```

---

# 📦 Installation

```bash
npm install
```

---

# 💻 Development Setup

Run the full local development environment:

```bash
npm run dev
```

This starts:

| Service | URL |
|---|---|
| Vite Frontend | http://localhost:5173 |
| Express Backend | http://localhost:3001 |

---

# 🧪 Production-Like Local Run

Build and serve the production bundle locally:

```bash
npm run build
npm run server
```

This simulates real deployment behavior.

---

# 📜 Available Scripts

| Script | Description |
|---|---|
| `npm run dev` | Starts frontend + Express proxy |
| `npm run build` | Builds production frontend |
| `npm run preview` | Previews Vite build |
| `npm run server` | Runs Express production server |
| `npm run start` | Build + start production server |

---

# 🌍 Deployment

## ▲ Deploy on Vercel

CosmosHub is fully configured for Vercel deployment.

### Steps

1. Push project to GitHub
2. Import repository into Vercel
3. Configure:
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
4. Deploy

### Included Support

- `api/rss-proxy.js`
- `vercel.json`

---

## 🌐 Deploy on Netlify

### Steps

1. Push project to GitHub
2. Import repository into Netlify
3. Configure:
   - **Build Command:** `npm run build`
   - **Publish Directory:** `dist`
4. Deploy

### Included Support

- `netlify/functions/rss-proxy.js`
- `netlify.toml`

---

# ⚡ How CosmosHub Works

1. RSS feeds are fetched through a proxy layer
2. Articles are ranked and deduplicated
3. AI generates summaries and contextual insights
4. Personalization highlights relevant articles
5. Mission Tracker links news to space missions
6. Community interactions are stored locally

---

# 🧩 Troubleshooting

## No Articles Appearing

- Ensure backend/API proxy is running
- Check `/api/rss-proxy` requests in Network tab
- Some feeds may temporarily block requests

---

## RSS Source Returning `403` or `429`

- `403` → Provider blocked request
- `429` → Rate limit exceeded

CosmosHub automatically skips failed feeds and continues loading available ones.

---

## AI Summaries Not Working

Ensure:

```env
VITE_ANTHROPIC_API_KEY=your_key_here
```

Then restart the development server.

---

## Onboarding Keeps Reappearing

Clear:

- Browser localStorage
- Site data/cache

---

# 📌 Notes

- CosmosHub currently uses no database
- All personalization and community interactions are browser-based
- Feed counts may vary depending on source availability/rate limits
- Best deployment testing method:

```bash
npm run build
npm run server
```

---

# 🔮 Future Improvements

- User authentication
- Cloud database integration
- Bookmark system
- Real-time notifications
- AI-powered recommendation engine
- Space launch countdowns
- Interactive astronomy visualizations
- Mobile application support

---

# 🤝 Contributing

Contributions, improvements, and feature ideas are welcome.

```bash
Fork → Clone → Create Branch → Commit → Push → Pull Request
```

---

# 📄 License

This project is licensed under the MIT License.

---

# 🌠 CosmosHub

> *Exploring the universe through intelligent news discovery.*
