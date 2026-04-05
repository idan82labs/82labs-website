#!/usr/bin/env node
// Post-build: convert blocking main stylesheet to async-preload pattern.
// This is critical — blocks First Paint by ~1000ms on slow mobile otherwise.
import fs from 'node:fs';
import path from 'node:path';

const htmlPath = path.resolve('dist/public/index.html');
if (!fs.existsSync(htmlPath)) {
  console.error('[async-css] dist/public/index.html not found');
  process.exit(1);
}

let html = fs.readFileSync(htmlPath, 'utf8');

// Idempotent: if preload link already exists, skip.
if (html.includes('rel="preload" as="style" crossorigin href="/assets/')) {
  console.log('[async-css] Already converted — skipping');
  process.exit(0);
}

// Match top-level stylesheet link only (after splitting off the noscript region)
const re = /<link rel="stylesheet" crossorigin href="(\/assets\/[^"]+\.css)">/;
const match = html.match(re);

if (!match) {
  console.warn('[async-css] No matching stylesheet link found');
  process.exit(0);
}

const href = match[1];
const replacement =
  `<link rel="preload" as="style" crossorigin href="${href}" onload="this.onload=null;this.rel='stylesheet'">` +
  `<noscript><link rel="stylesheet" crossorigin href="${href}"></noscript>`;

html = html.replace(re, replacement);
fs.writeFileSync(htmlPath, html, 'utf8');
console.log(`[async-css] Converted ${href} to async preload`);
