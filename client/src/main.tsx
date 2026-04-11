import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Eagerly preload the below-fold chunk so it's ready before the user scrolls
const belowFoldReady = import("@/components/shared/BelowFold").then(() => {});

createRoot(document.getElementById("root")!).render(<App />);

// Dismiss preloader when the site is truly ready:
// 1. React has rendered (done)
// 2. Fonts loaded (no FOUT)
// 3. Below-fold chunk downloaded (no blank scroll)
// 4. Minimum 800ms elapsed (no jarring flash)
const started = performance.now();
const MIN_SHOW = 800;

Promise.all([
  document.fonts.ready,
  belowFoldReady,
  new Promise<void>((r) => requestAnimationFrame(() => requestAnimationFrame(() => r()))),
]).then(() => {
  const elapsed = performance.now() - started;
  const remaining = Math.max(0, MIN_SHOW - elapsed);

  setTimeout(() => {
    const el = document.getElementById("preloader");
    if (el) {
      el.style.opacity = "0";
      el.addEventListener("transitionend", () => {
        el.remove();
        document.documentElement.classList.remove("loading");
      }, { once: true });
    } else {
      document.documentElement.classList.remove("loading");
    }
  }, remaining);
});
