#!/usr/bin/env node
// Post-build prerender (SSG) for AI answer engines + no-JS crawlers.
//
// WHY: Production is a static Vercel deploy of a client-rendered React SPA.
// GPTBot / ClaudeBot / PerplexityBot / OAI-SearchBot do NOT execute JavaScript
// (as of 2026) — they read raw HTML and leave. The shipped index.html has an
// empty <div id="root">, so those crawlers see zero content in any language.
//
// WHAT: We render the full page text (from the i18n JSON — the same source the
// React app uses, so facts never drift) into #root for BOTH `/` (English) and
// `/he` (Hebrew, dir=rtl). React's createRoot().render() replaces this content
// on hydration for real users; the preloader overlay hides any flash. Crawlers
// keep the server-rendered text. We also inject rich JSON-LD (Organization,
// ProfessionalService, FAQPage, BreadcrumbList).
import fs from 'node:fs';
import path from 'node:path';

const DIST = path.resolve('dist/public');
const htmlPath = path.join(DIST, 'index.html');
const en = JSON.parse(fs.readFileSync(path.resolve('client/src/i18n/en.json'), 'utf8'));
const he = JSON.parse(fs.readFileSync(path.resolve('client/src/i18n/he.json'), 'utf8'));

if (!fs.existsSync(htmlPath)) {
  console.error('[prerender] dist/public/index.html not found — run vite build first');
  process.exit(1);
}
const template = fs.readFileSync(htmlPath, 'utf8');

const esc = (s) =>
  String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

const li = (arr) => arr.map((x) => `<li>${esc(x)}</li>`).join('');

// ---- Render the full page body from a translation bundle ---------------------
function renderBody(t, lang) {
  const isHe = lang === 'he';
  const caseItems = t.caseStudies.items
    .map(
      (c) => `
      <article>
        <h3>${esc(c.client)} — ${esc(c.industry)}</h3>
        <p><strong>${esc(c.tagline)}</strong></p>
        <p>${esc(c.description)}</p>
        <p>${esc(t.caseStudies.outcomeLabel)}: <strong>${esc(c.metric)}</strong> ${esc(c.metricLabel)}</p>
        <p>${esc(t.caseStudies.stackLabel)}: ${esc(c.stack.join(', '))}</p>
      </article>`
    )
    .join('');

  const services = ['fullstack', 'automation', 'lectures']
    .map(
      (k) => `
      <article>
        <h3>${esc(t.services[k].title)}</h3>
        <p>${esc(t.services[k].description)}</p>
        <ul>${li(t.services[k].features)}</ul>
      </article>`
    )
    .join('');

  const steps = ['discover', 'build', 'launch']
    .map(
      (k) => `
      <li><strong>${esc(t.process.steps[k].number)} · ${esc(t.process.steps[k].title)}</strong> — ${esc(
        t.process.steps[k].description
      )}</li>`
    )
    .join('');

  const testimonials = t.testimonials.items
    .map(
      (q) => `
      <blockquote>
        <p>“${esc(q.quote)}”</p>
        <footer>— ${esc(q.author)}, ${esc(q.role)}, ${esc(q.company)}</footer>
      </blockquote>`
    )
    .join('');

  const industries = ['fintech', 'manufacturing', 'saas', 'digitalHealth']
    .map((k) => `<li><strong>${esc(t.industries[k].title)}</strong> — ${esc(t.industries[k].description)}</li>`)
    .join('');

  const metrics = Object.values(t.whyUs.metrics)
    .map((m) => `<li><strong>${esc(m.number)}</strong> — ${esc(m.label)}</li>`)
    .join('');

  return `<!--ssg-body-->
    <div id="ssg-content">
      <header>
        <p>${esc(t.hero.badge)}</p>
        <h1>82Labs — ${esc(t.hero.title1)} ${esc(t.hero.title2)}</h1>
        <p>${esc(t.hero.subtitle)}</p>
        <p>${esc(t.hero.proof)}</p>
      </header>

      <section aria-label="${esc(t.services.sectionTitle)}">
        <h2>${esc(t.services.sectionTitle)}</h2>
        <p>${esc(t.services.sectionSubtitle)}</p>
        ${services}
      </section>

      <section aria-label="${esc(t.caseStudies.sectionTitle)}">
        <h2>${esc(t.caseStudies.sectionTitle)}</h2>
        <p>${esc(t.caseStudies.sectionSubtitle)}</p>
        ${caseItems}
      </section>

      <section aria-label="${esc(t.scale.title)}">
        <h2>${esc(t.scale.title)}</h2>
        <p><strong>${esc(t.scale.metric)}</strong> — ${esc(t.scale.metricLabel)}</p>
        <p>${esc(t.scale.body)}</p>
        <ul>${metrics}</ul>
      </section>

      <section aria-label="${esc(t.process.sectionTitle)}">
        <h2>${esc(t.process.sectionTitle)}</h2>
        <p>${esc(t.process.sectionSubtitle)}</p>
        <ol>${steps}</ol>
      </section>

      <section aria-label="${esc(t.industries.sectionTitle)}">
        <h2>${esc(t.industries.sectionTitle)}</h2>
        <p>${esc(t.industries.sectionSubtitle)}</p>
        <ul>${industries}</ul>
      </section>

      <section aria-label="${esc(t.testimonials.sectionLabel)}">
        <h2>${esc(t.testimonials.sectionLabel)}</h2>
        ${testimonials}
      </section>

      <section aria-label="${esc(t.closingCta.title)}">
        <h2>${esc(t.closingCta.title)}</h2>
        <p>${esc(t.closingCta.subtitle)}</p>
        <p>${esc(t.closingCta.pricingHint)}</p>
        <p><a href="${isHe ? '/he' : '/'}#contact">${esc(t.closingCta.cta)}</a></p>
      </section>

      <footer>
        <p>${esc(t.footer.builtWith)} · <a href="mailto:info@82labs.io">info@82labs.io</a> · ${isHe ? 'חיפה, ישראל' : 'Haifa, Israel'} · <a href="https://www.linkedin.com/company/82labs">LinkedIn</a> · <a href="https://github.com/idan82labs">GitHub</a></p>
        <p><a href="${isHe ? '/he/about' : '/about'}">${isHe ? 'אודות' : 'About'}</a> · <a href="${isHe ? '/he/contact' : '/contact'}">${isHe ? 'יצירת קשר' : 'Contact'}</a></p>
      </footer>
    </div>
    <!--/ssg-body-->`;
}

// ---- JSON-LD ----------------------------------------------------------------
function schema(t, lang) {
  const url = lang === 'he' ? 'https://www.82labs.io/he' : 'https://www.82labs.io/';
  const org = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: '82Labs',
    url,
    logo: 'https://www.82labs.io/favicon.png',
    image: 'https://www.82labs.io/og-image.png',
    email: 'info@82labs.io',
    description:
      lang === 'he'
        ? 'סטודיו סוכני AI ואוטומציה: בונים מערכות פולסטאק ואוטומציה חכמה לתעשייה, פיננסים וארגונים. Claude, OpenAI, LangChain, Python. חיפה, ישראל.'
        : 'AI-agent and automation studio building fullstack systems and intelligent automation for industry, finance, and enterprise. Claude, OpenAI, LangChain, Python. Haifa, Israel.',
    areaServed: ['IL', 'Worldwide'],
    knowsAbout: [
      'AI agents',
      'Workflow automation',
      'Manufacturing execution systems (MES)',
      'Financial automation',
      'LangChain',
      'Claude API',
      'OpenAI',
      'Fullstack development',
    ],
    address: { '@type': 'PostalAddress', addressLocality: 'Haifa', addressCountry: 'IL' },
    sameAs: ['https://linkedin.com/company/82labs', 'https://github.com/idan82labs'],
    makesOffer: ['fullstack', 'automation', 'lectures'].map((k) => ({
      '@type': 'Offer',
      itemOffered: { '@type': 'Service', name: t.services[k].title, description: t.services[k].description },
    })),
  };

  const faqSrc =
    lang === 'he'
      ? [
          [
            'איך מיישמים בינה מלאכותית בעבודה בתעשייה או בפיננסים?',
            'מתחילים ממיפוי התהליך הידני עם הכי הרבה חיכוך, בונים אוטומציה או סוכן AI ממוקד לרילוס ראשון תוך 2–3 שבועות, ומרחיבים משם. 82Labs בנתה כך מערכות שמריצות מעל $100M בתפעול — למשל MES שמריץ 10+ מפעלי אלומיניום עבור Kostika.',
          ],
          [
            'כמה עולה פרויקט אוטומציה או סוכן AI?',
            'פרויקטים מתחילים מ-$8k, ריטיינר שוטף מ-$5k לחודש, ושיחת סקוף ראשונית ללא עלות. זמן ההשקה הממוצע הוא כ-6 שבועות.',
          ],
          [
            'מי זה 82Labs?',
            '82Labs הוא סטודיו סוכני AI ואוטומציה מחיפה, ישראל, שבונה מערכות פולסטאק ואוטומציה חכמה לתעשייה, פיננסים וארגונים. מעל $100M רצים על מערכות שהחברה בנתה ומעל 1,500 מהנדסים הודרכו על ידה.',
          ],
        ]
      : [
          [
            'How do I apply AI in industrial or finance work?',
            'Start by mapping the manual process with the most friction, ship a focused AI agent or automation as a first release in 2–3 weeks, then expand. 82Labs has built systems this way that run $100M+ in operations — for example an MES running 10+ aluminum factories for Kostika.',
          ],
          [
            'How much does an AI automation project cost?',
            'Projects start at $8k, retainers at $5k/month, and the initial scoping call is free. Median time to launch is about 6 weeks.',
          ],
          [
            'What is 82Labs?',
            '82Labs is an AI-agent and automation studio based in Haifa, Israel, building fullstack systems and intelligent automation for industry, finance, and enterprise. $100M+ runs on systems it has built and 1,500+ engineers have been trained by the team.',
          ],
        ];

  const faq = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqSrc.map(([q, a]) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  };

  return (
    `<!--ssg-ld-->` +
    `<script type="application/ld+json">${JSON.stringify(org)}</script>` +
    `<script type="application/ld+json">${JSON.stringify(faq)}</script>` +
    `<!--/ssg-ld-->`
  );
}

// Idempotency: strip any previously-injected SSG content so re-runs (without a
// fresh `vite build`) don't read their own output and duplicate/corrupt it.
function reset(html) {
  // Remove any previously-injected SSG spans (anchored on our own markers, so
  // this is robust regardless of surrounding markup). After the body markers
  // are stripped, `<div id="root">` and `</div>` become adjacent again.
  return html
    .replace(/<!--ssg-body-->[\s\S]*?<!--\/ssg-body-->/g, '')
    .replace(/<!--ssg-ld-->[\s\S]*?<!--\/ssg-ld-->/g, '');
}
const pristine = reset(template);

// ---- Emit English (/) --------------------------------------------------------
let enHtml = pristine.replace(
  '<div id="root"></div>',
  `<div id="root">${renderBody(en, 'en')}</div>`
);
enHtml = enHtml.replace('</head>', `${schema(en, 'en')}</head>`);
fs.writeFileSync(htmlPath, enHtml, 'utf8');
console.log('[prerender] wrote English content into /index.html');

// ---- Emit Hebrew (/he) -------------------------------------------------------
let heHtml = pristine
  .replace('<html lang="en">', '<html lang="he" dir="rtl">')
  .replace(
    /<title>[^<]*<\/title>/,
    '<title>82Labs — סטודיו סוכני AI ואוטומציה | הופכים תהליכים מסובכים לפשוטים</title>'
  )
  .replace(
    /<meta name="description"[^>]*>/,
    '<meta name="description" content="82Labs בונה סוכני AI ואוטומציה חכמה לתעשייה, פיננסים וארגונים — Claude, OpenAI, LangChain, Python. מעל $100M רצים על מערכות שבנינו. חיפה, ישראל." />'
  )
  .replace(
    /<link rel="canonical"[^>]*>/,
    '<link rel="canonical" href="https://www.82labs.io/he" />'
  )
  .replace('<meta property="og:url" content="https://www.82labs.io/" />', '<meta property="og:url" content="https://www.82labs.io/he" />')
  .replace('<meta property="og:locale" content="en_US" />', '<meta property="og:locale" content="he_IL" />')
  .replace('<div id="root"></div>', `<div id="root">${renderBody(he, 'he')}</div>`);
heHtml = heHtml.replace('</head>', `${schema(he, 'he')}</head>`);

fs.mkdirSync(path.join(DIST, 'he'), { recursive: true });
fs.writeFileSync(path.join(DIST, 'he', 'index.html'), heHtml, 'utf8');
console.log('[prerender] wrote Hebrew content into /he/index.html');
