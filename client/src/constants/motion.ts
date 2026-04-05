/**
 * Shared motion tokens. One ease curve, one canonical section duration.
 * Keeps every section speaking the same motion language.
 */

export const EASE_SMOOTH = [0.25, 0.46, 0.45, 0.94] as const;

/** Canonical section reveal / card entrance duration. */
export const DUR_SECTION = 0.7;

/** Count-up animation duration in ms. One speed across all stats. */
export const COUNT_UP_MS = 1500;
