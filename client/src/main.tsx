import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

const root = document.getElementById("root")!;
createRoot(root).render(<App />);

// Keep the boot shell visible until the main stylesheet is applied AND React
// has committed once. Otherwise the React Hero paints unstyled for a frame.
function isMainCssApplied(): boolean {
  const sheets = Array.from(document.styleSheets);
  return sheets.some((s) => {
    try {
      const href = s.href || "";
      return /\/assets\/[^/]+\.css/.test(href);
    } catch {
      return false;
    }
  });
}

function hideBootShell() {
  const boot = document.getElementById("boot-shell");
  if (boot) boot.remove();
}

function waitForCss(cb: () => void) {
  if (isMainCssApplied()) { cb(); return; }
  const started = performance.now();
  const tick = () => {
    if (isMainCssApplied() || performance.now() - started > 1500) {
      cb();
    } else {
      requestAnimationFrame(tick);
    }
  };
  requestAnimationFrame(tick);
}

requestAnimationFrame(() => {
  requestAnimationFrame(() => {
    waitForCss(() => {
      // Remove boot shell then reveal React tree in the same frame.
      hideBootShell();
      document.documentElement.dataset.cssReady = "true";
    });
  });
});
