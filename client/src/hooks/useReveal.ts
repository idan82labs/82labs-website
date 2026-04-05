import { useEffect, useRef } from "react";

/**
 * Reveal-on-scroll hook using IntersectionObserver.
 * Attaches `data-visible="true"` once the element enters the viewport,
 * triggering the `.reveal-up` CSS transition. No framer-motion dependency.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>(
  threshold: number = 0.1
) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      el.dataset.visible = "true";
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.dataset.visible = "true";
            io.unobserve(el);
          }
        });
      },
      { threshold, rootMargin: "0px 0px -8% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);

  return ref;
}
