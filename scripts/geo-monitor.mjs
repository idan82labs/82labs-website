#!/usr/bin/env node
// GEO regression monitor — run against LIVE production (or a preview URL).
//
//   node scripts/geo-monitor.mjs                 # checks https://www.82labs.io
//   node scripts/geo-monitor.mjs https://preview  # checks a preview deploy
//
// Guards the thing that matters most: that AI crawlers still see real text. If a
// future change reverts the site to a client-only SPA, the #root goes empty and
// this fails loudly. Exits non-zero on any failure (usable in CI / a cron).
const BASE = (process.argv[2] || 'https://www.82labs.io').replace(/\/$/, '');
const UA = 'Mozilla/5.0 (compatible; GPTBot/1.0; +https://openai.com/gptbot)';

const CHECKS = [
  { path: '/', minWords: 300, must: ['We automate', 'Kostika', '$100M'] },
  { path: '/he', minWords: 300, must: ['אוטומצי', 'מפעלי אלומיניום', 'סוכני AI'] },
  { path: '/about', minWords: 120, must: ['82Labs', 'Haifa'] },
  { path: '/he/about', minWords: 120, must: ['82Labs', 'חיפה'] },
  { path: '/he/madrich-hatmaat-ai', minWords: 200, must: ['בינה מלאכותית', 'התאמות בנק'] },
  { path: '/guides/how-to-apply-ai-at-work', minWords: 200, must: ['apply AI', 'reconciliation'] },
  { path: '/work/kostika', minWords: 80, must: ['MES', 'Priority'] },
  { path: '/llms.txt', minWords: 30, must: ['82Labs', 'Kostika'], raw: true },
  { path: '/sitemap.xml', minWords: 5, must: ['<loc>', '/he'], raw: true },
  { path: '/robots.txt', minWords: 5, must: ['GPTBot', 'Sitemap'], raw: true },
];

const visibleText = (html) =>
  html
    .replace(/<script[\s\S]*?<\/script>/g, ' ')
    .replace(/<style[\s\S]*?<\/style>/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

let failed = 0;
for (const c of CHECKS) {
  const url = BASE + c.path;
  try {
    const res = await fetch(url, { headers: { 'User-Agent': UA } });
    const body = await res.text();
    const text = c.raw ? body : visibleText(body);
    const words = text.split(/\s+/).filter(Boolean).length;
    const missing = c.must.filter((m) => !text.includes(m));
    const ok = res.status === 200 && words >= c.minWords && missing.length === 0;
    if (!ok) failed++;
    console.log(
      `${ok ? '✓' : '✗'} ${c.path.padEnd(30)} ${res.status} ${String(words).padStart(4)}w` +
        (missing.length ? `  missing: ${missing.join(', ')}` : '') +
        (words < c.minWords ? `  (< ${c.minWords}w)` : '')
    );
  } catch (e) {
    failed++;
    console.log(`✗ ${c.path.padEnd(30)} ERROR ${e.message}`);
  }
}
console.log(failed === 0 ? '\nAll GEO checks passed.' : `\n${failed} check(s) FAILED.`);
process.exit(failed === 0 ? 0 : 1);
