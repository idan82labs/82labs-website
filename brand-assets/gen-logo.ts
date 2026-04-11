import satori from "satori";
import { Resvg } from "@resvg/resvg-js";
import { readFile, writeFile, mkdir } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import React from "react";
import { brand } from "./brand.config.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const font = await readFile(join(__dirname, "fonts/PlusJakartaSans-ExtraBold.woff"));
const logo = brand.logo;

const size = 400;

// Navy square with white "82" cutout — transparent background (for LinkedIn profile)
const element = React.createElement("div", {
  style: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
  },
},
  React.createElement("svg", {
    viewBox: "0 0 780 780",
    width: 380, height: 380,
    fill: "none",
  },
    React.createElement("rect", { x: logo.square.x, y: logo.square.y, width: logo.square.w, height: logo.square.h, rx: logo.square.rx, fill: "#0f2844" }),
    React.createElement("g", { transform: logo.transform, fill: "#ffffff" },
      React.createElement("path", { d: logo.path82 })
    )
  )
);

const svg = await satori(element, {
  width: size, height: size,
  fonts: [{ name: "Plus Jakarta Sans", data: font, weight: 800 as const, style: "normal" as const }],
});

const resvg = new Resvg(svg, { fitTo: { mode: "width" as const, value: size * 2 } });
const png = resvg.render().asPng();
await mkdir(join(__dirname, "output/linkedin"), { recursive: true });
await writeFile(join(__dirname, "output/linkedin/linkedin-profile-photo.png"), png);
console.log("Generated: linkedin-profile-photo.png (400x400 @2x)");
