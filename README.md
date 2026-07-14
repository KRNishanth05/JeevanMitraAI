# 🌿 JeevanMitra AI — Multilingual Smart Farming Assistant

🔗 **[Live Demo]( https://krnishanth05.github.io/JeevanMitraAI/)** 

JeevanMitra AI is a web app that helps Indian farmers with:

- 🌱 **Crop Recommendation** — suggests the best crops based on soil (N/P/K), temperature, humidity, pH, and rainfall
- 📊 **Yield Prediction** — estimates expected yield per crop and area
- 🔍 **Plant Disease Detection** — upload a leaf photo and get an AI diagnosis + treatment plan (via Groq vision models)
- 💰 **Market Prices** — current mandi prices with trend chart
- 🤖 **AI Chat Assistant** — ask farming questions in your language, with voice input/output
- 🌐 **Multilingual UI** — English, Malayalam, Hindi, Kannada, Tamil, Telugu

The app was originally a single `index.html` file. This repo splits it into a
clean **frontend / backend** structure so the Groq API key is never exposed
in client-side code, and so the project is easy to deploy and maintain on
GitHub.

## Project structure

```
jeevanmitra/
├── frontend/           # Static site (HTML/CSS/JS) — the UI
│   ├── index.html
│   ├── style.css
│   └── script.js
├── backend/            # Node/Express API that proxies requests to Groq
│   ├── server.js
│   ├── package.json
│   └── .env.example
├── .gitignore
└── README.md
```

## How it works

The frontend never talks to Groq directly. Instead:

1. The UI sends chat/vision requests to your own backend at `POST /groq`
2. The backend attaches your Groq API key (kept server-side) and forwards
   the request to `https://api.groq.com`
3. The backend returns Groq's response back to the UI

The "🔑 Enter your free Groq API key" modal in the app posts the key to
`POST /groq-setkey`, so you can also set the key at runtime instead of (or
in addition to) putting it in the backend's `.env` file.

> This key storage is intentionally simple (single in-memory key on the
> server) to match the original app's design, which is fine for local/personal
> use. If you deploy this for multiple simultaneous users, use a per-session
> or per-user key store instead of a single global key.

## Getting started

### Prerequisites

- [Node.js](https://nodejs.org) 18 or later (needed for built-in `fetch`)
- A free Groq API key from [console.groq.com](https://console.groq.com)

### 1. Backend setup

```bash
cd backend
npm install
cp .env.example .env
# edit .env and paste your GROQ_API_KEY (or leave it blank and set the
# key from the app's UI later)
npm start
```

The backend runs on `http://localhost:3000` by default.

### 2. Frontend setup

The frontend is plain static HTML/CSS/JS — no build step required.

**Option A — serve it from the backend (simplest for local use)**

Set `SERVE_FRONTEND=true` in `backend/.env`, restart the backend, then open:

```
http://localhost:3000
```

**Option B — serve it separately**

Use any static file server, e.g.:

```bash
cd frontend
npx serve .
```

Then open the printed URL (e.g. `http://localhost:3000` or `:5000`
depending on the tool). If your backend runs on a different origin, open
`frontend/script.js` and set:

```js
const API_BASE_URL = 'https://your-backend-url.com';
```

### 3. Set your Groq API key

If you didn't put `GROQ_API_KEY` in `backend/.env`, open the app in your
browser — a setup modal will prompt you for a free Groq key on first load.

## Deployment

- **Backend**: any Node host works (Render, Railway, Fly.io, a VPS, etc).
  Set the `GROQ_API_KEY` environment variable there instead of committing
  a `.env` file.
- **Frontend**: any static host works (GitHub Pages, Netlify, Vercel).
  Just remember to set `API_BASE_URL` in `frontend/script.js` to your
  deployed backend's URL before publishing.

## Tech stack

- **Frontend**: vanilla HTML/CSS/JavaScript (no framework, no build step),
  Web Speech API for voice input/output, `<canvas>` for the price chart
- **Backend**: Node.js + Express, proxying to the [Groq API](https://console.groq.com/docs/models)
  for chat and vision (leaf-disease) inference

## Notes

- Groq model IDs change periodically — if you get a "model decommissioned"
  error, check [console.groq.com/docs/models](https://console.groq.com/docs/models)
  and update `GROQ_TEXT_MODEL` / `GROQ_VISION_MODEL` in `backend/.env`.
- If no Groq key is set, the chat assistant still works using a lightweight
  built-in fallback responder; crop recommendation, yield prediction, and
  market prices work entirely client-side and don't need the API.

## License

MIT — feel free to use and adapt this project.
