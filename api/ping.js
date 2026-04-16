import sites from '../data/sites.json' assert { type: 'json' };

const fmt = (ms) => `${ms}ms`;
const pad = (str, len) => str.padEnd(len);

export default async function handler(req, res) {
  const timestamp = new Date().toISOString();

  console.log(`\n┌─────────────────────────────────────────┐`);
  console.log(`│  KRONN Ping Run — ${timestamp}  │`);
  console.log(`└─────────────────────────────────────────┘`);

  const results = await Promise.all(sites.map(async (url) => {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10_000);
    const start = Date.now();

    try {
      const response = await fetch(url, { signal: controller.signal });
      const ms = Date.now() - start;
      console.log(`  ✅  ${pad('UP', 6)} │ ${pad(String(response.status), 5)} │ ${pad(fmt(ms), 8)} │ ${url}`);
      return { url, status: 'UP', httpStatus: response.status, ms };
    } catch (err) {
      const ms = Date.now() - start;
      const reason = err.name === 'AbortError' ? 'TIMEOUT' : err.message;
      console.log(`  ❌  ${pad('DOWN', 6)} │ ${pad(reason, 5)} │ ${pad(fmt(ms), 8)} │ ${url}`);
      return { url, status: 'DOWN', reason, ms };
    } finally {
      clearTimeout(timeout);
    }
  }));

  const up = results.filter(r => r.status === 'UP').length;
  console.log(`\n  Summary: ${up}/${results.length} sites up\n`);

  res.status(200).json({ pingedAt: timestamp, results });
}
