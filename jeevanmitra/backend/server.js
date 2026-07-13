// ==============================================
// JeevanMitra AI — Backend
// Proxies chat/vision requests to the Groq API so
// that no API key needs to be exposed permanently
// on the client, and so the browser never talks to
// Groq directly (avoids CORS + key leakage).
// ==============================================

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Groq model IDs — check https://console.groq.com/docs/models for the
// current list, since Groq periodically retires/renames models.
const TEXT_MODEL = process.env.GROQ_TEXT_MODEL || 'llama-3.3-70b-versatile';
const VISION_MODEL = process.env.GROQ_VISION_MODEL || 'meta-llama/llama-4-scout-17b-16e-instruct';
const GROQ_URL = 'https://api.groq.com/openai/v1/chat/completions';

// In-memory key store. In this simple single-user/demo app the key can
// either come from the .env file (GROQ_API_KEY) or be pushed at runtime
// via POST /groq-setkey from the "Free Groq AI Setup" modal in the UI.
// NOTE: this is process-wide, not per-session — fine for local/personal
// use, but if you deploy this for multiple users you should move to a
// per-session or per-user key store instead.
let runtimeGroqKey = process.env.GROQ_API_KEY || null;

app.use(cors());
app.use(express.json({ limit: '10mb' })); // 10mb to allow base64 leaf images

// ---- Optionally serve the built frontend from this same server ----
// Set SERVE_FRONTEND=true to have this backend also serve ../frontend
// (handy for local development or a single-service deployment).
if (process.env.SERVE_FRONTEND === 'true') {
    const frontendPath = path.join(__dirname, '..', 'frontend');
    app.use(express.static(frontendPath));
}

// ---- Save/replace the Groq API key at runtime ----
app.post('/groq-setkey', (req, res) => {
    const { key } = req.body || {};
    if (!key || typeof key !== 'string' || !key.startsWith('gsk_') || key.length < 20) {
        return res.status(400).json({ error: 'Invalid Groq API key format.' });
    }
    runtimeGroqKey = key;
    res.json({ ok: true });
});

// ---- Proxy chat / vision requests to Groq ----
app.post('/groq', async (req, res) => {
    try {
        if (!runtimeGroqKey) {
            return res.status(400).json({
                error: 'No Groq API key configured. Set GROQ_API_KEY in backend/.env or submit one from the app.'
            });
        }

        const { prompt, image, vision } = req.body || {};
        if (!prompt || typeof prompt !== 'string') {
            return res.status(400).json({ error: 'Missing "prompt" in request body.' });
        }

        const useVision = Boolean(vision && image);
        const model = useVision ? VISION_MODEL : TEXT_MODEL;

        const userContent = useVision
            ? [
                  { type: 'text', text: prompt },
                  { type: 'image_url', image_url: { url: `data:image/jpeg;base64,${image}` } }
              ]
            : prompt;

        const groqResp = await fetch(GROQ_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${runtimeGroqKey}`
            },
            body: JSON.stringify({
                model,
                messages: [{ role: 'user', content: userContent }],
                temperature: 0.4,
                max_tokens: 1024
            })
        });

        const data = await groqResp.json();

        if (!groqResp.ok) {
            const message = data?.error?.message || `Groq API error (HTTP ${groqResp.status})`;
            return res.status(groqResp.status).json({ error: message });
        }

        const text = data?.choices?.[0]?.message?.content || '';
        res.json({ text, _model_used: model });
    } catch (err) {
        console.error('POST /groq failed:', err);
        res.status(500).json({ error: err.message || 'Unexpected server error.' });
    }
});

// ---- Health check ----
app.get('/health', (req, res) => res.json({ status: 'ok' }));

app.listen(PORT, () => {
    console.log(`🌿 JeevanMitra AI backend running on http://localhost:${PORT}`);
    console.log(runtimeGroqKey ? '✅ Groq API key loaded from .env' : '⚠️  No Groq API key set yet — waiting for /groq-setkey or GROQ_API_KEY in .env');
});
