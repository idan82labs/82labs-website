import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

createRoot(document.getElementById("root")!).render(<App />);

// Dismiss preloader only when the site is truly ready:
// 1. React has rendered (we're past this line)
// 2. Fonts are loaded (no FOUT flash)
// 3. Minimum 800ms has elapsed (no jarring flash)
const started = performance.now();
const MIN_SHOW = 800; // ms

Promise.all([
  document.fonts.ready,
  new Promise<void>((r) => {
    // Wait for at least one full paint cycle after render
    requestAnimationFrame(() => requestAnimationFrame(() => r()));
  }),
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
