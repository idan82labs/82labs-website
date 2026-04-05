/**
 * Shared motion tokens. One ease curve, a small set of durations.
 * Keeps every section speaking the same motion language.
 */

export const EASE_SMOOTH = [0.25, 0.46, 0.45, 0.94] as const;
export const EASE_SMOOTH_CSS = "cubic-bezier(0.25, 0.46, 0.45, 0.94)";

/** Short micro-interactions (0.5s): button hovers, small reveals. */
export const DUR_MICRO = 0.5;

/** Section reveals and card entrances (0.7s). */
export const DUR_SECTION = 0.7;

/** Count-up animation duration in ms. One speed across all stats. */
export const COUNT_UP_MS = 1500;
