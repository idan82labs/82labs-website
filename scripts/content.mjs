#!/usr/bin/env node
// Generates standalone, citation-optimized content pages (pure static HTML,
// no JS required) into dist/public. These are the GEO "citation magnets":
// answer-first, evidence-rich, schema-tagged guides and case studies in HE+EN.
//
// Every page draws hard facts from FACTS below so brand facts are byte-identical
// across the whole site — a single contradiction triggers the AI source-quality
// penalty (auditor layer 4).
import fs from 'node:fs';
import path from 'node:path';

const DIST = path.resolve('dist/public');

const FACTS = {
  name: '82Labs',
  tagline_en: 'AI-agent & automation studio',
  tagline_he: 'סטודיו סוכני AI ואוטומציה',
  location_en: 'Haifa, Israel',
  location_he: 'חיפה, ישראל',
  email: 'info@82labs.io',
  ops: '$100M+',
  engineers: '1,500+',
  ttl_en: '6 weeks',
  ttl_he: '6 שבועות',
  price_en: 'Projects from $8k · Retainers from $5k/mo · Free scoping call',
  price_he: 'פרויקטים מ-$8k · ריטיינר מ-$5k לחודש · שיחת סקוף ללא עלות',
  clients: ['Kostika', 'TerminalX', 'Sherman', 'Rafael'],
};

const esc = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// ---------------------------------------------------------------------------
// Page shell — brand-styled, self-contained, RTL-aware, schema-rich.
// ---------------------------------------------------------------------------
function shell(p) {
  const rtl = p.lang === 'he';
  const homeHref = rtl ? '/he' : '/';
  const crumbs = [
    { name: rtl ? '82Labs — בית' : '82Labs — Home', url: `https://www.82labs.io${homeHref}` },
    { name: p.h1, url: `https://www.82labs.io${p.path}` },
  ];
  const ld = [
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: p.h1,
      description: p.description,
      inLanguage: rtl ? 'he-IL' : 'en-US',
      author: { '@type': 'Organization', name: FACTS.name, url: 'https://www.82labs.io' },
      publisher: {
        '@type': 'Organization',
        name: FACTS.name,
        logo: { '@type': 'ImageObject', url: 'https://www.82labs.io/favicon.png' },
      },
      mainEntityOfPage: `https://www.82labs.io${p.path}`,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: crumbs.map((c, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: c.name,
        item: c.url,
      })),
    },
  ];
  if (p.faq?.length) {
    ld.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: p.faq.map(([q, a]) => ({
        '@type': 'Question',
        name: q,
        acceptedAnswer: { '@type': 'Answer', text: a },
      })),
    });
  }

  const faqHtml = p.faq?.length
    ? `<section><h2>${rtl ? 'שאלות נפוצות' : 'FAQ'}</h2>${p.faq
        .map(([q, a]) => `<h3>${esc(q)}</h3><p>${esc(a)}</p>`)
        .join('')}</section>`
    : '';

  const related = p.related?.length
    ? `<nav aria-label="${rtl ? 'קריאה נוספת' : 'Related'}"><h2>${
        rtl ? 'להמשך קריאה' : 'Related'
      }</h2><ul>${p.related
        .map((r) => `<li><a href="${r.href}">${esc(r.label)}</a></li>`)
        .join('')}</ul></nav>`
    : '';

  return `<!DOCTYPE html>
<html lang="${rtl ? 'he' : 'en'}"${rtl ? ' dir="rtl"' : ''}>
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>${esc(p.title)}</title>
<meta name="description" content="${esc(p.description)}" />
<link rel="canonical" href="https://www.82labs.io${p.path}" />
${p.hreflang
    .map((h) => `<link rel="alternate" hreflang="${h.lang}" href="https://www.82labs.io${h.path}" />`)
    .join('\n')}
<meta property="og:type" content="article" />
<meta property="og:title" content="${esc(p.title)}" />
<meta property="og:description" content="${esc(p.description)}" />
<meta property="og:url" content="https://www.82labs.io${p.path}" />
<meta property="og:image" content="https://www.82labs.io/og-image.png" />
<meta property="og:site_name" content="82Labs" />
<meta property="og:locale" content="${rtl ? 'he_IL' : 'en_US'}" />
<link rel="icon" type="image/png" href="/favicon.png" />
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@600;700;800&family=Inter:wght@400;500;600&family=Heebo:wght@400;500;700&display=swap" />
<style>
  :root{--bg:#0a1628;--panel:#0f2844;--ink:#eaf2ff;--muted:#9db4d0;--accent:#4c9dff;--line:#1d3555}
  *{box-sizing:border-box}
  body{margin:0;background:var(--bg);color:var(--ink);font-family:${
    rtl ? "'Heebo'," : ''
  }'Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;line-height:1.7}
  a{color:var(--accent)}
  header.site{border-bottom:1px solid var(--line);padding:18px 24px}
  header.site a{color:var(--ink);text-decoration:none;font-weight:800;font-family:'Plus Jakarta Sans',sans-serif}
  main{max-width:820px;margin:0 auto;padding:40px 24px 72px}
  h1{font-family:'Plus Jakarta Sans',sans-serif;font-size:clamp(28px,5vw,42px);line-height:1.15;margin:0 0 8px}
  h2{font-family:'Plus Jakarta Sans',sans-serif;font-size:clamp(20px,3vw,28px);margin:40px 0 10px;border-top:1px solid var(--line);padding-top:28px}
  h3{font-size:18px;margin:22px 0 6px}
  .lead{font-size:20px;color:var(--ink);background:var(--panel);border:1px solid var(--line);border-radius:14px;padding:18px 20px;margin:18px 0}
  .muted{color:var(--muted)}
  table{width:100%;border-collapse:collapse;margin:14px 0}
  th,td{border:1px solid var(--line);padding:10px 12px;text-align:${rtl ? 'right' : 'left'}}
  th{background:var(--panel)}
  blockquote{margin:16px 0;padding:${rtl ? '4px 16px 4px 0' : '4px 0 4px 16px'};border-${
    rtl ? 'right' : 'left'
  }:3px solid var(--accent);color:var(--muted)}
  .cta{display:inline-block;margin-top:8px;background:var(--accent);color:#04101f;padding:12px 20px;border-radius:10px;text-decoration:none;font-weight:700}
  footer{border-top:1px solid var(--line);color:var(--muted);padding:24px;text-align:center;font-size:14px}
  ul{padding-${rtl ? 'right' : 'left'}:22px}
</style>
${ld.map((x) => `<script type="application/ld+json">${JSON.stringify(x)}</script>`).join('\n')}
</head>
<body>
<header class="site"><a href="${homeHref}">82Labs</a></header>
<main>
<p class="muted"><a href="${homeHref}">82Labs</a> ${rtl ? '‹' : '›'} ${esc(p.h1)}</p>
<h1>${esc(p.h1)}</h1>
<p class="lead">${p.lead}</p>
${p.body}
${faqHtml}
${related}
<h2>${rtl ? 'לדבר איתנו' : 'Talk to us'}</h2>
<p class="muted">${rtl ? FACTS.price_he : FACTS.price_en}</p>
<p><a class="cta" href="${homeHref}#contact">${rtl ? 'קבעו שיחת סקוף' : 'Book a scoping call'}</a></p>
</main>
<footer>82Labs · ${rtl ? FACTS.tagline_he : FACTS.tagline_en} · ${
    rtl ? FACTS.location_he : FACTS.location_en
  } · ${FACTS.email}</footer>
</body>
</html>`;
}

// ---------------------------------------------------------------------------
// PAGES
// ---------------------------------------------------------------------------
const pages = [];

// ---- HE primary guide: "how to apply AI in your work" ----------------------
pages.push({
  lang: 'he',
  path: '/he/madrich-hatmaat-ai',
  h1: 'איך ליישם בינה מלאכותית בעבודה שלך — מדריך מעשי לתעשייה ולפיננסים',
  title: 'איך ליישם AI בעבודה — מדריך מעשי לתעשייה ופיננסים | 82Labs',
  description:
    'מדריך מעשי ליישום בינה מלאכותית ואוטומציה בעבודה בתעשייה ובפיננסים: מאיפה מתחילים, איך בוחרים תהליך ראשון, וכמה זה עולה. מאת 82Labs, חיפה.',
  hreflang: [
    { lang: 'he', path: '/he/madrich-hatmaat-ai' },
    { lang: 'en', path: '/guides/how-to-apply-ai-at-work' },
  ],
  lead:
    'הדרך הכי בטוחה ליישם בינה מלאכותית בעבודה היא לבחור תהליך ידני אחד עם הרבה חיכוך, לבנות עליו סוכן AI או אוטומציה ממוקדת כרילוס ראשון תוך 2–3 שבועות, למדוד תוצאה, ואז להרחיב. לא פרויקט ענק — צעד ראשון קטן שמחזיר ערך מיד.',
  body: `
<h2>שלב 1 — לזהות את התהליך הנכון להתחיל ממנו</h2>
<p>לא כל תהליך מתאים ל-AI. התהליכים שמחזירים הכי הרבה ערך הם אלה שחוזרים על עצמם, אוכלים שעות אדם, ומבוססים על טקסט או נתונים מובנים למחצה. דוגמאות מהשטח:</p>
<ul>
<li><strong>תעשייה וייצור:</strong> מעקב הזמנות, תכנון ייצור, בקרת איכות, סנכרון בין מפעלים ומערכות ERP.</li>
<li><strong>פיננסים והנהלת חשבונות:</strong> התאמות בנק, קריאת חשבוניות, סיווג הוצאות, הכנת דוחות תקופתיים.</li>
<li><strong>תפעול ושירות:</strong> ניתוב פניות, סיכומי פגישות, מענה על שאלות חוזרות מתוך מסמכים פנימיים.</li>
</ul>
<p>כלל אצבע: אם עובד מבזבז יותר משעה ביום על משהו שאפשר לתאר בשלבים ברורים — זה מועמד מצוין.</p>

<h2>שלב 2 — לבחור בין כלי מדף לבין מערכת בנויה בקוד</h2>
<table>
<tr><th>גישה</th><th>מתי מתאים</th><th>מגבלה</th></tr>
<tr><td>כלי מדף (Copilot, ChatGPT, n8n)</td><td>משימות כלליות, פיילוט מהיר, צוות קטן</td><td>נעצר כשצריך אינטגרציה עמוקה או דיוק בסקייל</td></tr>
<tr><td>מערכת בנויה בקוד (סוכן ייעודי)</td><td>תהליך ליבה, עומסים אמיתיים, אינטגרציה ל-ERP/מערכות פנים</td><td>דורש שותף פיתוח</td></tr>
</table>
<p>ברוב המקרים מתחילים מכלי מדף כדי לאמת ערך, ועוברים לקוד כשהתהליך הופך קריטי — כשאסור שיתנדנד בעומס.</p>

<h2>שלב 3 — לבנות רילוס ראשון קטן (2–3 שבועות)</h2>
<p>מודל העבודה שאנחנו ב-82Labs מיישמים: <strong>מיפוי</strong> (ממפים תהליכים ומזהים צוואר בקבוק), <strong>בנייה</strong> (דמו שבועי, תוכנה שעובדת מהיום הראשון), <strong>השקה</strong> (קוד נקי, תיעוד וחפיפה לצוות שלכם). זמן ההשקה הממוצע אצלנו הוא ${FACTS.ttl_he}.</p>

<h2>דוגמאות אמיתיות מהשטח</h2>
<blockquote>Kostika: MES אחד שהחליף אקסלים והיום מריץ 10+ מפעלי אלומיניום — מעקב הזמנות, תכנון ייצור, ואינטגרציה ל-Priority ERP.</blockquote>
<blockquote>Sherman: בקרת איכות לייצור פח מדויק עם ארכיטקטורת רב-מודל (Claude / Gemini / GPT), כדי שתקלה במודל אחד לא תעצור את קו הייצור.</blockquote>
<blockquote>TerminalX: אוטומציית תפעול שמחזיקה תחת עומסי Black Friday, מוטמעת ישירות בתשתית הפרודקשן.</blockquote>
<p>בסך הכול, מעל ${FACTS.ops} בתפעול רצים על מערכות ש-82Labs בנתה, ומעל ${FACTS.engineers} מהנדסים הודרכו על ידי הצוות.</p>
`,
  faq: [
    [
      'מאיפה הכי כדאי להתחיל עם AI בעבודה?',
      'מתהליך ידני אחד, חוזר ומתסכל, שאפשר לתאר בשלבים ברורים — למשל התאמות בנק בפיננסים או מעקב הזמנות בייצור. בונים עליו רילוס ראשון קטן תוך 2–3 שבועות ומודדים תוצאה לפני שמרחיבים.',
    ],
    [
      'כמה עולה להטמיע אוטומציה או סוכן AI?',
      `אצל 82Labs פרויקטים מתחילים מ-$8k, ריטיינר שוטף מ-$5k לחודש, ושיחת הסקוף הראשונית ללא עלות. זמן ההשקה הממוצע הוא ${FACTS.ttl_he}.`,
    ],
    [
      'צריך צוות דאטה או מהנדסי ML כדי להתחיל?',
      'לא. רוב הערך הראשוני מגיע מאוטומציה וסוכנים מעל מודלים קיימים (Claude, OpenAI) שמשתלבים בכלים שכבר יש לכם — בלי לאמן מודל מאפס.',
    ],
  ],
  related: [
    { href: '/he/automation-taasiya-finance', label: 'אוטומציה וסוכני AI לתעשייה ולפיננסים' },
    { href: '/he/work/kostika', label: 'מקרה לקוח: Kostika — MES ל-10+ מפעלים' },
  ],
});

// ---- HE industry/finance page ----------------------------------------------
pages.push({
  lang: 'he',
  path: '/he/automation-taasiya-finance',
  h1: 'אוטומציה וסוכני AI לתעשייה ולפיננסים',
  title: 'אוטומציה וסוכני AI לתעשייה ולפיננסים | 82Labs',
  description:
    'איך אוטומציה וסוכני AI משנים תהליכי ייצור ופיננסים: MES, בקרת איכות, אוטומציה פיננסית ואינטגרציה ל-ERP. דוגמאות אמיתיות מ-82Labs, חיפה.',
  hreflang: [
    { lang: 'he', path: '/he/automation-taasiya-finance' },
    { lang: 'en', path: '/guides/ai-automation-industry-finance' },
  ],
  lead:
    'בתעשייה ובפיננסים, סוכני AI ואוטומציה מחליפים עבודה ידנית חוזרת — מעקב הזמנות ובקרת איכות בייצור, ועד התאמות, סיווג וקריאת מסמכים בפיננסים — ומשתלבים ישירות במערכות הליבה כמו Priority ERP. 82Labs בונה מערכות כאלה שמעל $100M בתפעול רצים עליהן.',
  body: `
<h2>תעשייה וייצור</h2>
<ul>
<li><strong>ניהול ייצור (MES):</strong> מעקב הזמנות, תכנון קו, מדידות ואינטגרציה ל-ERP — פלטפורמה אחת במקום אקסלים נפרדים לכל מפעל.</li>
<li><strong>בקרת איכות:</strong> ניתוח CAD מול סריקה, בדיקות תלת-ממד ודוחות אוטומטיים בסקייל שבדיקה אנושית לא מכסה.</li>
<li><strong>אמינות:</strong> ארכיטקטורת רב-מודל (Claude / Gemini / GPT) כדי שתקלה בספק אחד לא תעצור את הקו.</li>
</ul>
<h2>פיננסים</h2>
<ul>
<li><strong>אוטומציה פיננסית:</strong> התאמות בנק, קריאת חשבוניות וסיווג הוצאות מתוך מסמכים.</li>
<li><strong>דוחות ובקרה:</strong> הפקת דוחות תקופתיים והתראות חריגה אוטומטיות.</li>
<li><strong>אינטגרציה:</strong> חיבור לכלים הקיימים במקום להחליף אותם.</li>
</ul>
<h2>למה בקוד ולא רק בכלי מדף</h2>
<p>כלי מדף מצוינים לפיילוט. אבל כשהתהליך הופך קריטי — עומסי שיא, דיוק רגולטורי, אינטגרציה עמוקה — צריך מערכת בנויה בקוד שלא מתנדנדת. זה בדיוק המקום שבו 82Labs נכנסת: בונים את המערכות שצוותים סומכים עליהן כשאסור ליפול.</p>
`,
  faq: [
    [
      'איך AI עוזר בתהליכי ייצור?',
      'דרך מערכות ניהול ייצור (MES) ובקרת איכות אוטומטית: מעקב הזמנות, תכנון קו, ניתוח CAD מול סריקה ודוחות — בסקייל ובדיוק שעבודה ידנית לא מכסה. 82Labs בנתה MES שמריץ 10+ מפעלי אלומיניום.',
    ],
    [
      'מה זה אוטומציה פיננסית מבוססת AI?',
      'שימוש בסוכני AI כדי לבצע משימות פיננסיות חוזרות — התאמות בנק, קריאת חשבוניות, סיווג הוצאות והפקת דוחות — מתוך המסמכים והמערכות הקיימות, עם בקרה אנושית על החריגים.',
    ],
  ],
  related: [
    { href: '/he/madrich-hatmaat-ai', label: 'מדריך: איך ליישם AI בעבודה שלך' },
    { href: '/he/work/sherman', label: 'מקרה לקוח: Sherman — בקרת איכות רב-מודל' },
  ],
});

// ---- EN guide (mirror) ------------------------------------------------------
pages.push({
  lang: 'en',
  path: '/guides/how-to-apply-ai-at-work',
  h1: 'How to Apply AI in Your Work — A Practical Guide for Industry & Finance',
  title: 'How to Apply AI at Work — Practical Guide for Industry & Finance | 82Labs',
  description:
    'A practical guide to applying AI and automation at work in industry and finance: where to start, how to pick a first process, and what it costs. By 82Labs, Haifa.',
  hreflang: [
    { lang: 'he', path: '/he/madrich-hatmaat-ai' },
    { lang: 'en', path: '/guides/how-to-apply-ai-at-work' },
  ],
  lead:
    'The safest way to apply AI at work is to pick one high-friction manual process, ship a focused AI agent or automation as a first release in 2–3 weeks, measure the outcome, then expand. Not a giant project — a small first step that returns value immediately.',
  body: `
<h2>Step 1 — Pick the right process to start with</h2>
<p>The highest-ROI processes are repetitive, eat human hours, and run on text or semi-structured data:</p>
<ul>
<li><strong>Industry & manufacturing:</strong> order tracking, production planning, quality control, cross-factory and ERP sync.</li>
<li><strong>Finance & accounting:</strong> bank reconciliation, invoice reading, expense classification, periodic reporting.</li>
<li><strong>Ops & service:</strong> ticket routing, meeting summaries, answering recurring questions from internal docs.</li>
</ul>
<h2>Step 2 — Off-the-shelf tool vs. a system built in code</h2>
<table>
<tr><th>Approach</th><th>Best when</th><th>Limit</th></tr>
<tr><td>Off-the-shelf (Copilot, ChatGPT, n8n)</td><td>General tasks, fast pilot, small team</td><td>Stalls on deep integration or precision at scale</td></tr>
<tr><td>Built in code (dedicated agent)</td><td>Core process, real load, ERP/internal integration</td><td>Needs an engineering partner</td></tr>
</table>
<h2>Step 3 — Ship a small first release (2–3 weeks)</h2>
<p>82Labs' model: <strong>Discover</strong> (map workflows, find the bottleneck), <strong>Build</strong> (weekly demos, working software from day one), <strong>Launch</strong> (clean code, runbooks, handoff). Median time to launch is ${FACTS.ttl_en}.</p>
<h2>Real examples</h2>
<blockquote>Kostika: one MES that replaced spreadsheets and now runs 10+ aluminum factories, integrated with Priority ERP.</blockquote>
<blockquote>Sherman: precision sheet-metal QC on a multi-model architecture (Claude / Gemini / GPT) so no single model outage stops the line.</blockquote>
<p>In total, ${FACTS.ops} in operations runs on systems 82Labs has built, and ${FACTS.engineers} engineers have been trained by the team.</p>
`,
  faq: [
    [
      'Where should I start applying AI at work?',
      'With one repetitive, frustrating manual process you can describe in clear steps — e.g. bank reconciliation in finance or order tracking in manufacturing. Build a small first release in 2–3 weeks and measure before expanding.',
    ],
    [
      'How much does an AI automation project cost?',
      `At 82Labs, projects start at $8k, retainers at $5k/month, and the first scoping call is free. Median time to launch is ${FACTS.ttl_en}.`,
    ],
  ],
  related: [
    { href: '/guides/ai-automation-industry-finance', label: 'AI automation for industry & finance' },
    { href: '/work/kostika', label: 'Case study: Kostika — MES for 10+ factories' },
  ],
});

// ---- EN industry/finance page (mirror) -------------------------------------
pages.push({
  lang: 'en',
  path: '/guides/ai-automation-industry-finance',
  h1: 'AI Automation & Agents for Industry and Finance',
  title: 'AI Automation & Agents for Industry and Finance | 82Labs',
  description:
    'How AI agents and automation transform manufacturing and finance: MES, quality control, financial automation, and ERP integration. Real examples from 82Labs, Haifa.',
  hreflang: [
    { lang: 'he', path: '/he/automation-taasiya-finance' },
    { lang: 'en', path: '/guides/ai-automation-industry-finance' },
  ],
  lead:
    'In industry and finance, AI agents and automation replace repetitive manual work — order tracking and quality control in manufacturing, reconciliation, classification, and document reading in finance — and plug directly into core systems like Priority ERP. 82Labs builds systems like these that run ' +
    FACTS.ops +
    ' in operations.',
  body: `
<h2>Industry & manufacturing</h2>
<ul>
<li><strong>Manufacturing execution (MES):</strong> order tracking, line planning, measurement, ERP integration — one platform instead of separate spreadsheets per factory.</li>
<li><strong>Quality control:</strong> CAD-vs-scan analysis, 3D inspection, and automated reporting at a scale human inspection can't cover.</li>
<li><strong>Reliability:</strong> multi-model architecture (Claude / Gemini / GPT) so a single provider outage doesn't stop the line.</li>
</ul>
<h2>Finance</h2>
<ul>
<li><strong>Financial automation:</strong> bank reconciliation, invoice reading, and expense classification from documents.</li>
<li><strong>Reporting & control:</strong> periodic reports and automated anomaly alerts.</li>
<li><strong>Integration:</strong> connect to existing tools instead of replacing them.</li>
</ul>
<h2>Why in code, not just off-the-shelf</h2>
<p>Off-the-shelf tools are great for a pilot. But when a process becomes critical — peak load, regulatory precision, deep integration — you need a system built in code that doesn't wobble. That's exactly where 82Labs comes in: we build the systems teams depend on when the stakes are real.</p>
`,
  faq: [
    [
      'How does AI help manufacturing processes?',
      'Through manufacturing execution systems (MES) and automated quality control: order tracking, line planning, CAD-vs-scan analysis, and reporting at a scale and precision manual work can\'t cover. 82Labs built an MES running 10+ aluminum factories.',
    ],
    [
      'What is AI-based financial automation?',
      'Using AI agents to perform repetitive financial tasks — bank reconciliation, invoice reading, expense classification, and report generation — from existing documents and systems, with human review of exceptions.',
    ],
  ],
  related: [
    { href: '/guides/how-to-apply-ai-at-work', label: 'How to apply AI at work' },
    { href: '/work/sherman', label: 'Case study: Sherman — multi-model QC' },
  ],
});

// ---- About page (bilingual) — wins branded "82Labs" queries ----------------
pages.push({
  lang: 'en',
  path: '/about',
  h1: 'About 82Labs',
  title: 'About 82Labs — AI Agent & Automation Studio in Israel',
  description:
    '82Labs is an AI-agent and automation studio based in Haifa, Israel. $100M+ in operations runs on systems it has built; 1,500+ engineers trained. Clients: Kostika, TerminalX, Sherman, Rafael.',
  hreflang: [
    { lang: 'he', path: '/he/about' },
    { lang: 'en', path: '/about' },
  ],
  lead:
    '82Labs is an AI-agent and automation studio based in Haifa, Israel, that builds fullstack systems and intelligent automation for industry, finance, and enterprise. ' +
    FACTS.ops +
    ' in operations runs on systems 82Labs has built, and ' +
    FACTS.engineers +
    ' engineers have been trained by its team.',
  body: `
<h2>What 82Labs does</h2>
<p>82Labs works in three areas: <strong>AI-agent & workflow automation</strong> (Claude and OpenAI agents, LangChain/LangGraph orchestration, production Python), <strong>fullstack development</strong> (React, Node.js, Python, modern cloud), and <strong>training & workshops</strong> on AI agents and production automation.</p>
<h2>Who 82Labs works with</h2>
<p>Clients include ${FACTS.clients.join(', ')} — spanning aluminum manufacturing (Kostika, an MES across 10+ factories), enterprise e-commerce (TerminalX, automation at Black Friday scale), precision sheet-metal QC (Sherman, a multi-model inspection platform), and defense (Rafael).</p>
<h2>Facts</h2>
<table>
<tr><th>Field</th><th>Detail</th></tr>
<tr><td>Type</td><td>${FACTS.tagline_en}</td></tr>
<tr><td>Location</td><td>${FACTS.location_en}</td></tr>
<tr><td>Track record</td><td>${FACTS.ops} in operations on systems built; ${FACTS.engineers} engineers trained</td></tr>
<tr><td>Median time to launch</td><td>${FACTS.ttl_en}</td></tr>
<tr><td>Engagement</td><td>${FACTS.price_en}</td></tr>
<tr><td>Contact</td><td>${FACTS.email}</td></tr>
</table>
<h2>How 82Labs works</h2>
<p>A three-step model: <strong>Discover</strong> (map workflows, find the bottleneck, scope a small first release in 2–3 weeks), <strong>Build</strong> (weekly demos, working software from day one), <strong>Launch</strong> (clean code, runbooks, and handoff so your team owns what was built).</p>
`,
  faq: [
    ['What is 82Labs?', `82Labs is an AI-agent and automation studio in ${FACTS.location_en} that builds fullstack systems and intelligent automation for industry, finance, and enterprise.`],
    ['Where is 82Labs located?', `82Labs is based in ${FACTS.location_en}, and serves clients in Israel and worldwide.`],
    ['Who are 82Labs\' clients?', `Clients include ${FACTS.clients.join(', ')}, across manufacturing, e-commerce, and defense.`],
  ],
  related: [
    { href: '/guides/how-to-apply-ai-at-work', label: 'How to apply AI at work' },
    { href: '/work/kostika', label: 'Case study: Kostika' },
  ],
});
pages.push({
  lang: 'he',
  path: '/he/about',
  h1: 'אודות 82Labs',
  title: 'אודות 82Labs — סטודיו סוכני AI ואוטומציה בישראל',
  description:
    '82Labs הוא סטודיו סוכני AI ואוטומציה מחיפה, ישראל. מעל $100M בתפעול רצים על מערכות שבנינו; מעל 1,500 מהנדסים הודרכו. לקוחות: Kostika, TerminalX, Sherman, רפאל.',
  hreflang: [
    { lang: 'he', path: '/he/about' },
    { lang: 'en', path: '/about' },
  ],
  lead:
    '82Labs הוא סטודיו סוכני AI ואוטומציה מחיפה, ישראל, שבונה מערכות פולסטאק ואוטומציה חכמה לתעשייה, פיננסים וארגונים. מעל ' +
    FACTS.ops +
    ' בתפעול רצים על מערכות ש-82Labs בנתה, ומעל ' +
    FACTS.engineers +
    ' מהנדסים הודרכו על ידי הצוות.',
  body: `
<h2>מה 82Labs עושה</h2>
<p>שלושה תחומים: <strong>סוכני AI ואוטומציית תהליכים</strong> (סוכני Claude ו-OpenAI, תזמור LangChain/LangGraph, Python בפרודקשן), <strong>פיתוח פולסטאק</strong> (React, Node.js, Python וענן מודרני), ו<strong>הדרכות וסדנאות</strong> על סוכני AI ואוטומציה.</p>
<h2>עם מי אנחנו עובדים</h2>
<p>בין הלקוחות: ${FACTS.clients.join(', ')} — ייצור אלומיניום (Kostika, MES ל-10+ מפעלים), מסחר אלקטרוני ארגוני (TerminalX, אוטומציה בעומסי Black Friday), בקרת איכות לפח מדויק (Sherman, פלטפורמת בדיקה רב-מודל), וביטחוני (רפאל).</p>
<h2>עובדות</h2>
<table>
<tr><th>שדה</th><th>פרט</th></tr>
<tr><td>סוג</td><td>${FACTS.tagline_he}</td></tr>
<tr><td>מיקום</td><td>${FACTS.location_he}</td></tr>
<tr><td>ניסיון</td><td>מעל ${FACTS.ops} בתפעול על מערכות שבנינו; מעל ${FACTS.engineers} מהנדסים הודרכו</td></tr>
<tr><td>זמן ממוצע להשקה</td><td>${FACTS.ttl_he}</td></tr>
<tr><td>מודל התקשרות</td><td>${FACTS.price_he}</td></tr>
<tr><td>יצירת קשר</td><td>${FACTS.email}</td></tr>
</table>
<h2>איך אנחנו עובדים</h2>
<p>מודל בן שלושה שלבים: <strong>מיפוי</strong> (ממפים תהליכים, מזהים צוואר בקבוק, מגדירים רילוס ראשון קטן תוך 2–3 שבועות), <strong>בנייה</strong> (דמו שבועי, תוכנה שעובדת מהיום הראשון), <strong>השקה</strong> (קוד נקי, תיעוד וחפיפה — הצוות שלכם שולט במה שבנינו).</p>
`,
  faq: [
    ['מה זה 82Labs?', `82Labs הוא סטודיו סוכני AI ואוטומציה מ${FACTS.location_he} שבונה מערכות פולסטאק ואוטומציה חכמה לתעשייה, פיננסים וארגונים.`],
    ['איפה 82Labs ממוקמת?', `82Labs ממוקמת ב${FACTS.location_he} ומשרתת לקוחות בישראל ובעולם.`],
    ['מי הלקוחות של 82Labs?', `בין הלקוחות: ${FACTS.clients.join(', ')} — בתעשייה, מסחר אלקטרוני וביטחון.`],
  ],
  related: [
    { href: '/he/madrich-hatmaat-ai', label: 'מדריך: איך ליישם AI בעבודה' },
    { href: '/he/work/kostika', label: 'מקרה לקוח: Kostika' },
  ],
});

// ---- Case studies (bilingual) ----------------------------------------------
const cases = [
  {
    slug: 'kostika',
    he: {
      h1: 'Kostika — פלטפורמת ניהול ייצור (MES) ל-10+ מפעלי אלומיניום',
      lead:
        'Kostika היא יצרנית אלומיניום שהחליפה עשרה מפעלים שרצו על אקסלים נפרדים בפלטפורמת MES אחת שבנתה 82Labs — מעקב הזמנות, תכנון ייצור, תהליכי מדידה ואינטגרציה ל-Priority ERP.',
      body: `<h2>האתגר</h2><p>כל מפעל נוהל כאי נפרד עם אקסלים משלו. סנכרון ידני, שגיאות, ואפס תמונת-על.</p>
<h2>הפתרון</h2><p>MES אחד רב-לקוחי: מעקב הזמנות, תכנון ייצור, תהליכי מדידה ואינטגרציה ל-Priority. הוטמע ב-10+ מפעלים בפרודקשן.</p>
<h2>הסטאק</h2><p>React · Supabase · Priority ERP · ארכיטקטורה רב-לקוחית.</p>
<blockquote>"82Labs בנו לנו את כל הפלטפורמה התפעולית — היום היא רצה בכל המפעלים שלנו." — רועי מלכא, מנכ"ל Kostika</blockquote>`,
      faq: [['כמה מפעלים רצים על המערכת?', 'מעל 10 מפעלי אלומיניום בפרודקשן, מנוהלים מפלטפורמת MES אחת שבנתה 82Labs.']],
    },
    en: {
      h1: 'Kostika — MES Platform Running 10+ Aluminum Factories',
      lead:
        'Kostika is an aluminum manufacturer that replaced ten factories running on separate spreadsheets with one MES platform built by 82Labs — order tracking, production planning, measurement workflows, and Priority ERP integration.',
      body: `<h2>Challenge</h2><p>Each factory ran as an island on its own spreadsheets — manual sync, errors, no overview.</p>
<h2>Solution</h2><p>One multi-tenant MES: order tracking, production planning, measurement workflows, Priority integration. Rolled across 10+ factories in production.</p>
<h2>Stack</h2><p>React · Supabase · Priority ERP · multi-tenant architecture.</p>
<blockquote>"82Labs built our entire operating platform — it now runs across all our factories." — Roee Malka, CEO, Kostika</blockquote>`,
      faq: [['How many factories run on the platform?', 'Over 10 aluminum factories in production, managed from one MES platform built by 82Labs.']],
    },
  },
  {
    slug: 'sherman',
    he: {
      h1: 'Sherman — בקרת איכות רב-מודל לייצור פח מדויק',
      lead:
        'Sherman מריצה בקרת איכות לייצור פח מדויק בסקייל שבדיקה אנושית לא מכסה, על פלטפורמה שבנתה 82Labs עם ארכיטקטורת רב-מודל (Claude / Gemini / GPT) כדי שתקלה בספק אחד לא תעצור את הקו.',
      body: `<h2>האתגר</h2><p>בדיקת איכות ידנית לא מספיקה לתפוס את כל הסטיות בייצור פח מדויק.</p>
<h2>הפתרון</h2><p>פלטפורמה מלאה: ניתוח CAD מול סריקה, בדיקת כיפוף תלת-ממדי, סשני סריקה חיים ודוחות אוטומטיים — עם גיבוי בין שלושה ספקי LLM.</p>
<h2>הסטאק</h2><p>Python · FastAPI · React · Open3D · Claude API.</p>`,
      faq: [['למה צריך שלושה מודלים?', 'ארכיטקטורת רב-מודל (Claude / Gemini / GPT) מבטיחה שתקלה או השבתה של ספק אחד לא תעצור את קו הייצור.']],
    },
    en: {
      h1: 'Sherman — Multi-Model Quality Control for Precision Sheet Metal',
      lead:
        'Sherman runs quality control for precision sheet metal at a scale human inspection cannot cover, on a platform built by 82Labs with a multi-model architecture (Claude / Gemini / GPT) so no single provider outage stops the line.',
      body: `<h2>Challenge</h2><p>Manual QC can't catch every deviation in precision sheet-metal production.</p>
<h2>Solution</h2><p>Full platform: CAD-vs-scan analysis, 3D bend inspection, live scanning sessions, automated reporting — with fallback across three LLM providers.</p>
<h2>Stack</h2><p>Python · FastAPI · React · Open3D · Claude API.</p>`,
      faq: [['Why three models?', 'A multi-model architecture (Claude / Gemini / GPT) ensures a single provider outage never stops the production line.']],
    },
  },
  {
    slug: 'terminalx',
    he: {
      h1: 'TerminalX — אוטומציית תפעול שעומדת בעומסי Black Friday',
      lead:
        'TerminalX, קמעונאות מקוונת ארגונית, הטמיעה עם 82Labs אוטומציה ישירות בתשתית הפרודקשן — כזו שמחזיקה תחת עומסי Black Friday בלי להתנדנד.',
      body: `<h2>האתגר</h2><p>תהליכי הזמנות, מלאי ותקשורת שלא דיברו זה עם זה, תחת עומסי שיא.</p>
<h2>הפתרון</h2><p>אוטומציה מוטמעת בתשתית הייצור, בנויה לעמוד בעומסי Black Friday.</p>
<h2>הסטאק</h2><p>n8n · Node.js · PostgreSQL · תשתית ארגונית.</p>
<blockquote>"הם התחברו לסטאק הארגוני שלנו בלי חיכוכים והשיקו אוטומציה שמחזיקה תחת עומסים אמיתיים." — אבי אלקבץ, CTO, TerminalX</blockquote>`,
      faq: [['על איזה סקייל מדובר?', 'האוטומציה בנויה ונבדקה תחת עומסי Black Friday בתשתית פרודקשן ארגונית.']],
    },
    en: {
      h1: 'TerminalX — Ops Automation That Holds Under Black Friday Load',
      lead:
        'TerminalX, an enterprise online retailer, worked with 82Labs to slot automation directly into production infrastructure — the kind that holds under Black Friday load without wobbling.',
      body: `<h2>Challenge</h2><p>Order, inventory, and comms workflows that didn't talk to each other, under peak load.</p>
<h2>Solution</h2><p>Automation embedded in production infra, built to hold through Black Friday.</p>
<h2>Stack</h2><p>n8n · Node.js · PostgreSQL · enterprise infra.</p>
<blockquote>"They plugged into our enterprise stack without friction and shipped automation that holds up under real load." — Avi Elkabetz, CTO, TerminalX</blockquote>`,
      faq: [['What scale is this?', 'The automation is built and battle-tested under Black Friday peak load on enterprise production infrastructure.']],
    },
  },
];

for (const c of cases) {
  pages.push({
    lang: 'he',
    path: `/he/work/${c.slug}`,
    h1: c.he.h1,
    title: `${c.he.h1} | 82Labs`,
    description: c.he.lead.slice(0, 155),
    hreflang: [
      { lang: 'he', path: `/he/work/${c.slug}` },
      { lang: 'en', path: `/work/${c.slug}` },
    ],
    lead: c.he.lead,
    body: c.he.body,
    faq: c.he.faq,
    related: [{ href: '/he/madrich-hatmaat-ai', label: 'מדריך: איך ליישם AI בעבודה שלך' }],
  });
  pages.push({
    lang: 'en',
    path: `/work/${c.slug}`,
    h1: c.en.h1,
    title: `${c.en.h1} | 82Labs`,
    description: c.en.lead.slice(0, 155),
    hreflang: [
      { lang: 'he', path: `/he/work/${c.slug}` },
      { lang: 'en', path: `/work/${c.slug}` },
    ],
    lead: c.en.lead,
    body: c.en.body,
    faq: c.en.faq,
    related: [{ href: '/guides/how-to-apply-ai-at-work', label: 'How to apply AI at work' }],
  });
}

// ---- Write all pages + collect sitemap URLs --------------------------------
const urls = [];
for (const p of pages) {
  const dir = path.join(DIST, p.path.replace(/^\//, ''));
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), shell(p), 'utf8');
  urls.push(p.path);
  console.log(`[content] wrote ${p.path}`);
}

fs.writeFileSync(path.join(DIST, 'content-urls.json'), JSON.stringify(urls, null, 2));
console.log(`[content] ${pages.length} pages written`);

// ---- Regenerate sitemap.xml (home + /he + every content page) --------------
const allUrls = ['/', '/he', ...urls];
const sitemap =
  `<?xml version="1.0" encoding="UTF-8"?>\n` +
  `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  allUrls
    .map(
      (u) =>
        `  <url><loc>https://www.82labs.io${u === '/' ? '/' : u}</loc>` +
        `<changefreq>monthly</changefreq>` +
        `<priority>${u === '/' ? '1.0' : u === '/he' ? '0.9' : '0.8'}</priority></url>`
    )
    .join('\n') +
  `\n</urlset>\n`;
fs.writeFileSync(path.join(DIST, 'sitemap.xml'), sitemap, 'utf8');
console.log('[content] wrote sitemap.xml');

// ---- llms.txt (emerging convention: a plain-text map for LLMs) -------------
const llms = `# 82Labs
> ${FACTS.tagline_en} in ${FACTS.location_en}. We build AI agents, intelligent automation, and fullstack systems for industry, finance, and enterprise. ${FACTS.ops} in operations runs on systems we've built; ${FACTS.engineers} engineers trained. Stack: Claude, OpenAI, LangChain, Python, React. Clients: ${FACTS.clients.join(', ')}. Contact: ${FACTS.email}. ${FACTS.price_en}.

## About
- [About 82Labs](https://www.82labs.io/about)
- [אודות 82Labs (עברית)](https://www.82labs.io/he/about)

## Guides
- [How to apply AI at work (industry & finance)](https://www.82labs.io/guides/how-to-apply-ai-at-work)
- [AI automation for industry & finance](https://www.82labs.io/guides/ai-automation-industry-finance)
- [מדריך: איך ליישם AI בעבודה (עברית)](https://www.82labs.io/he/madrich-hatmaat-ai)
- [אוטומציה וסוכני AI לתעשייה ולפיננסים (עברית)](https://www.82labs.io/he/automation-taasiya-finance)

## Case studies
- [Kostika — MES for 10+ aluminum factories](https://www.82labs.io/work/kostika)
- [Sherman — multi-model QC for precision sheet metal](https://www.82labs.io/work/sherman)
- [TerminalX — ops automation at Black Friday scale](https://www.82labs.io/work/terminalx)
`;
fs.writeFileSync(path.join(DIST, 'llms.txt'), llms, 'utf8');
console.log('[content] wrote llms.txt');
