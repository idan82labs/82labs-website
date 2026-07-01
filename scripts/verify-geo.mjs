import fs from 'node:fs';
const strip = (h) => h.replace(/<script[\s\S]*?<\/script>/g, ' ').replace(/<style[\s\S]*?<\/style>/g, ' ').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
const D = 'dist/public';

function check(name, file, needles) {
  const h = fs.readFileSync(`${D}/${file}`, 'utf8');
  const text = strip(h);
  console.log(`\n=== ${name} (${file}) — ${text.length} chars of crawler-visible text ===`);
  console.log(text.slice(0, 240) + '…');
  for (const n of needles) console.log(`  ${text.includes(n) ? '✓' : '✗ MISSING'}  "${n}"`);
  const ld = (h.match(/application\/ld\+json/g) || []).length;
  console.log(`  JSON-LD blocks: ${ld}`);
}

check('English home', 'index.html', ['We automate', 'Kostika', '10+', 'aluminum factories', '$100M+', 'Rafael']);
check('Hebrew home', 'he/index.html', ['אוטומצי', 'Kostika', 'מפעלי אלומיניום', '$100M', 'סוכני AI']);
check('HE guide', 'he/madrich-hatmaat-ai/index.html', ['בינה מלאכותית', 'התאמות בנק', '2–3 שבועות', '$8k']);
check('EN guide', 'guides/how-to-apply-ai-at-work/index.html', ['apply AI', 'bank reconciliation', 'Kostika']);
check('HE industry/finance', 'he/automation-taasiya-finance/index.html', ['אוטומציה פיננסית', 'MES', 'בקרת איכות']);
check('Kostika case (HE)', 'he/work/kostika/index.html', ['MES', 'רועי מלכא', 'Priority ERP']);

// Broken-link scan across generated pages
console.log('\n=== internal link integrity ===');
const files = [];
(function walk(d){for(const e of fs.readdirSync(d,{withFileTypes:true})){const p=`${d}/${e.name}`;if(e.isDirectory())walk(p);else if(e.name==='index.html')files.push(p);}})(D);
let broken = 0;
for (const f of files) {
  const html = fs.readFileSync(f, 'utf8');
  for (const m of html.matchAll(/href="(\/[^"#]*)"/g)) {
    const href = m[1];
    if (href.startsWith('/assets') || href === '/' || href === '/he' || href.endsWith('.png') || href.endsWith('.xml') || href.endsWith('.txt')) continue;
    const target = `${D}${href}/index.html`;
    if (!fs.existsSync(target)) { console.log(`  ✗ ${f.replace(D,'')} → ${href}`); broken++; }
  }
}
console.log(broken === 0 ? '  ✓ no broken internal content links' : `  ${broken} broken links`);
console.log('\nsitemap urls:', (fs.readFileSync(`${D}/sitemap.xml`,'utf8').match(/<loc>/g)||[]).length);
