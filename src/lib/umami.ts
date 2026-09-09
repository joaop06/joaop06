/**
 * Umami Cloud helpers (F7.1 / F7.2).
 * Sem IDs → no-op (P4: credenciais no go-live).
 */

export type UmamiEventName =
  | "cta-click"
  | "cv-download"
  | "form-submit"
  | "schedule-whatsapp";

type UmamiTracker = {
  track: (event: string, data?: Record<string, string | number | boolean>) => void;
};

declare global {
  interface Window {
    umami?: UmamiTracker;
  }
}

export function trackUmami(
  event: UmamiEventName,
  data?: Record<string, string | number | boolean>,
): void {
  if (typeof window === "undefined") return;
  try {
    window.umami?.track(event, data);
  } catch {
    /* tracker ausente ou bloqueado — silencioso */
  }
}
