import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

createRoot(document.getElementById("root")!).render(<App />);

// Fade out preloader after first paint
requestAnimationFrame(() => {
  requestAnimationFrame(() => {
    const el = document.getElementById("preloader");
    if (el) {
      el.style.opacity = "0";
      el.addEventListener("transitionend", () => el.remove(), { once: true });
    }
  });
});
