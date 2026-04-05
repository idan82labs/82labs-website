import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

const root = document.getElementById("root")!;
createRoot(root).render(<App />);

// Hide boot shell after React mounts its first paint
requestAnimationFrame(() => {
  requestAnimationFrame(() => {
    const boot = document.getElementById("boot-shell");
    if (boot) {
      boot.dataset.hidden = "true";
      setTimeout(() => boot.remove(), 450);
    }
  });
});
