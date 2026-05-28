# CosmosHub Backend Setup

## Prerequisites
- Node.js 18+
- npm or yarn

## Setup Steps

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure API Keys
Create a `.env` file in the project root (copy from `.env.example`):
```bash
cp .env.example .env
```

Edit `.env` and add your API keys:
```
VITE_ANTHROPIC_API_KEY=sk-ant-xxxxxxxxxxxxxxxxxx
PORT=3001
```

**Get API Keys:**
- **Anthropic API Key**: Visit https://console.anthropic.com/ and create an API key

### 3. Start Development Server
```bash
npm run dev
```

This starts both:
- **Vite frontend** on `http://localhost:5173`
- **Express backend** on `http://localhost:3001`

The frontend automatically proxies RSS requests to the backend.

### 4. Build & Deploy
```bash
npm run build
npm start
```

Builds frontend and serves everything from port 3001.

---

## Features Enabled
✅ **Live RSS Feeds** - NASA, ESA, Space.com, Universe Today, ISRO, ISS  
✅ **AI Summaries** - Multi-level summaries using Claude  
✅ **Auto-Refresh** - Feed updates every 5 minutes  
✅ **CORS Proxy** - Backend handles all feed requests  

## Troubleshooting

### "API key not configured"
- Make sure `.env` file exists in project root
- Check that `VITE_ANTHROPIC_API_KEY` is set correctly
- Restart the server after updating `.env`

### "No articles in feed"
- Ensure backend server is running (`npm run dev` in separate terminal)
- Check `/health` endpoint: `http://localhost:3001/health`
- RSS sources may be down—sample data will be used as fallback

### Build fails
- Delete `node_modules` and `package-lock.json`
- Run `npm install` again
- Clear Vite cache: `npm run build`
