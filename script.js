const CRON_MINUTES = 12;

async function load() {
  const grid = document.getElementById('grid');
  const empty = document.getElementById('empty');
  const lastChecked = document.getElementById('last-checked');
  const countdown = document.getElementById('countdown');

  try {
    const res = await fetch('logs/status.json');
    const data = await res.json();

    if (!Array.isArray(data) || data.length === 0) {
      empty.hidden = false;
      lastChecked.textContent = 'No data yet.';
      return;
    }

    const lastTime = new Date(data[0].checkedAt);
    const nextRun = new Date(lastTime.getTime() + CRON_MINUTES * 60 * 1000);

    lastChecked.textContent = `Last checked: ${lastTime.toLocaleString()}`;

    // countdown ticker
    function tick() {
      const diff = Math.max(0, nextRun - Date.now());
      const m = Math.floor(diff / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      countdown.textContent = diff > 0
        ? `Next ping in ${m}m ${String(s).padStart(2, '0')}s`
        : 'Pinging soon…';
    }
    tick();
    setInterval(tick, 1000);

    grid.innerHTML = data.map(({ url, status, ms }) => `
      <div class="card">
        <span class="url">${url}</span>
        <div class="meta">
          <span class="ms">${ms}ms</span>
          <span class="badge ${status.toLowerCase()}">${status}</span>
        </div>
      </div>
    `).join('');
  } catch {
    empty.hidden = false;
    lastChecked.textContent = 'Could not load status data.';
  }
}

load();
