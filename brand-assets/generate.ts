/**
 * 82Labs Brand Asset Generator
 *
 * Usage:
 *   tsx generate.ts                          # Generate ALL assets
 *   tsx generate.ts --platform linkedin      # Only LinkedIn
 *   tsx generate.ts --template banner        # Only banners
 *   tsx generate.ts --text "Ship Faster"     # Custom headline
 *   tsx generate.ts --name my-post           # Generate a single asset by name
 */
import satori from "satori";
import { Resvg } from "@resvg/resvg-js";
import { readFile, writeFile, mkdir } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import React from "react";

import { sizes, type AssetSize } from "./sizes.js";
import { Banner } from "./templates/banner.js";
import { Post } from "./templates/post.js";
import { Story } from "./templates/story.js";
import { Og } from "./templates/og.js";
import { Email } from "./templates/email.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

// Parse CLI args
const args = process.argv.slice(2);
function getArg(name: string): string | undefined {
  const idx = args.indexOf(`--${name}`);
  return idx >= 0 && idx + 1 < args.length ? args[idx + 1] : undefined;
}

const filterPlatform = getArg("platform");
const filterTemplate = getArg("template");
const filterName = getArg("name");
const customText = getArg("text");

// Load fonts
async function loadFonts() {
  const fontDir = join(__dirname, "fonts");
  const [jakartaBold, jakartaExtra, interMedium] = await Promise.all([
    readFile(join(fontDir, "PlusJakartaSans-Bold.woff")),
    readFile(join(fontDir, "PlusJakartaSans-ExtraBold.woff")),
    readFile(join(fontDir, "Inter-Medium.woff")),
  ]);

  return [
    { name: "Plus Jakarta Sans", data: jakartaExtra, weight: 800 as const, style: "normal" as const },
    { name: "Plus Jakarta Sans", data: jakartaBold, weight: 700 as const, style: "normal" as const },
    { name: "Inter", data: interMedium, weight: 500 as const, style: "normal" as const },
  ];
}

// Select template component
function renderTemplate(size: AssetSize, text?: string): React.ReactNode {
  const props = { width: size.width, height: size.height, text };
  switch (size.template) {
    case "banner": return React.createElement(Banner, props);
    case "post":   return React.createElement(Post, props);
    case "story":  return React.createElement(Story, props);
    case "og":     return React.createElement(Og, props);
    case "email":  return React.createElement(Email, props);
  }
}

// Main
async function main() {
  console.log("Loading fonts...");
  const fonts = await loadFonts();

  // Filter sizes
  let toGenerate = sizes;
  if (filterPlatform) toGenerate = toGenerate.filter((s) => s.platform === filterPlatform);
  if (filterTemplate) toGenerate = toGenerate.filter((s) => s.template === filterTemplate);
  if (filterName) toGenerate = toGenerate.filter((s) => s.name === filterName);

  console.log(`Generating ${toGenerate.length} assets...`);
  const start = performance.now();

  for (const size of toGenerate) {
    const element = renderTemplate(size, customText);

    // Render JSX → SVG
    const svg = await satori(element as React.ReactElement, {
      width: size.width,
      height: size.height,
      fonts,
    });

    // SVG → PNG at 2x for retina-sharp output
    const resvg = new Resvg(svg, {
      fitTo: { mode: "width" as const, value: size.width * 2 },
    });
    const png = resvg.render().asPng();

    // Write to output/{platform}/{name}.png
    const outDir = join(__dirname, "output", size.platform);
    await mkdir(outDir, { recursive: true });
    const outPath = join(outDir, `${size.name}.png`);
    await writeFile(outPath, png);

    console.log(`  ${size.name} (${size.width}x${size.height}) → ${outPath}`);
  }

  const elapsed = Math.round(performance.now() - start);
  console.log(`\nDone! ${toGenerate.length} assets generated in ${elapsed}ms`);
}

main().catch((err) => {
  console.error("Error:", err);
  process.exit(1);
});
