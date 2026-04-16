# KRONN

Minimal uptime monitor using GitHub Actions + GitHub Pages. No server, no database.

## How it works

- GitHub Actions pings every URL in `data/sites.json` every 12 minutes
- Results are written to `logs/status.json` and committed back to the repo
- GitHub Pages serves `index.html` which reads `logs/status.json` and renders the dashboard

## Deploy

1. Push this repo to GitHub
2. Go to **Settings → Pages** → set source to `main` branch, `/ (root)`
3. Enable **Actions** if not already on

That's it. The cron starts automatically.

## Add a site

Edit `data/sites.json`:

```json
["https://your-app.onrender.com/ping", "https://another.onrender.com"]
```

Commit and push. Next ping run picks it up.
