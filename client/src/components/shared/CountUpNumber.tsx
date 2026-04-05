import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

interface CountUpNumberProps {
  /** Target string, e.g. "180+", "$100M+", "24/7". The first numeric run is animated. */
  target: string;
  /** Animation duration in ms */
  duration?: number;
  /** Fraction of target at animation start (0 = from zero, 0.3 = from 30%) */
  startFraction?: number;
}

/**
 * Counts up to a numeric target when scrolled into view. Skips count-up
 * for targets that contain separators with digits on both sides (e.g. "24/7").
 *
 * Returns a plain text-level span with no transforms, so it stays compatible
 * with parents using background-clip: text (gradient text fills).
 */
export default function CountUpNumber({
  target,
  duration = 1500,
  startFraction = 0,
}: CountUpNumberProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [display, setDisplay] = useState(target);

  useEffect(() => {
    if (!isInView) return;

    // Targets like "24/7" have digits on both sides of a separator — skip count-up
    if (/\d[^0-9]\d/.test(target)) {
      setDisplay(target);
      return;
    }

    const numericMatch = target.match(/\d+/);
    if (!numericMatch) {
      setDisplay(target);
      return;
    }
    const numericPart = parseInt(numericMatch[0], 10);
    if (isNaN(numericPart)) {
      setDisplay(target);
      return;
    }

    const prefix = target.slice(0, numericMatch.index);
    const suffix = target.slice((numericMatch.index ?? 0) + numericMatch[0].length);

    const startValue = Math.floor(numericPart * startFraction);
    const steps = 50;
    const stepMs = duration / steps;
    let step = 0;

    // Start counter at the start value immediately
    setDisplay(`${prefix}${startValue}${suffix}`);

    const interval = setInterval(() => {
      step++;
      const progress = step / steps;
      // easeOutCubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(startValue + (numericPart - startValue) * eased);
      setDisplay(`${prefix}${current}${suffix}`);
      if (step >= steps) {
        setDisplay(target);
        clearInterval(interval);
      }
    }, stepMs);

    return () => clearInterval(interval);
  }, [isInView, target, duration, startFraction]);

  return <span ref={ref}>{display}</span>;
}
