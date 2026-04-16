# KRONN

Minimal serverless uptime pinger. Hits your URLs every 12 minutes via Vercel cron to keep free-tier apps (Render, etc.) alive.

## Deploy

```bash
vercel deploy
```

Vercel auto-picks the cron config from `vercel.json`. No setup needed.

## Add a site

Edit `data/sites.json`:

```json
[
  "https://your-app.onrender.com/ping",
  "https://another-app.onrender.com"
]
```

Redeploy after changes.

## How it works

- `vercel.json` schedules `GET /api/ping` every 12 minutes
- `ping.js` fetches each URL with a 10s timeout
- Results are logged to Vercel function logs → `vercel.com/<project>/functions`
