async function load() {
  const grid = document.getElementById('grid');
  const empty = document.getElementById('empty');
  const lastChecked = document.getElementById('last-checked');

  try {
    const res = await fetch('logs/status.json');
    const data = await res.json();

    if (!Array.isArray(data) || data.length === 0) {
      empty.hidden = false;
      lastChecked.textContent = 'No data yet.';
      return;
    }

    lastChecked.textContent = `Last checked: ${new Date(data[0].checkedAt).toLocaleString()}`;

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
