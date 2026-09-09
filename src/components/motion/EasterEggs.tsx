/**
 * F3.11–F3.16 — easter eggs (curadoria via EASTER_EGGS.ts / F3.17).
 * Overlays em nós próprios — sem GSAP no mesmo elemento.
 */
import { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  Dialog,
  DialogClose,
  DialogDescription,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
} from "@/components/ui/Dialog";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import {
  EASTER_EGG_FLAGS,
  NAME_CLICK_THRESHOLD,
  NEST_HOVER_MS,
} from "@/components/motion/EASTER_EGGS";
import { prefersReducedMotion, SECRET_HASHES } from "@/lib/reduced-motion";

export type EasterEggsCopy = {
  konamiToast: string;
  terminalTitle: string;
  terminalBody: string;
  terminalClose: string;
  shortcutsTitle: string;
  shortcutsDescription: string;
  shortcutsClose: string;
  shortcuts: { keys: string; action: string }[];
  nestFavorite: string;
  coffeeToast: string;
};

type EasterEggsProps = {
  copy: EasterEggsCopy;
};

const KONAMI = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
] as const;

export default function EasterEggs({ copy }: EasterEggsProps) {
  const reduce = useReducedMotion() ?? false;
  const [toast, setToast] = useState<string | null>(null);
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [shortcutsOpen, setShortcutsOpen] = useState(false);
  const [matrixOn, setMatrixOn] = useState(false);
  const [nestTip, setNestTip] = useState(false);
  const nestTimer = useRef<number | null>(null);
  const nameClicks = useRef(0);
  const konamiIndex = useRef(0);
  const titleId = useId();

  useEffect(() => {
    if (EASTER_EGG_FLAGS.consoleHello) {
      // F3.15
      console.log(
        "%cJoão Pedro Borges%c · NestJS / Node.js — recruters & devs welcome.",
        "font-weight:700;font-size:14px;color:#0f4c5c",
        "font-weight:400;font-size:12px;color:#5c5c5c",
      );
    }

    const showToast = (message: string, ms = 3200) => {
      setToast(message);
      window.setTimeout(() => setToast(null), ms);
    };

    const applyKonami = () => {
      if (!EASTER_EGG_FLAGS.konami) return;
      document.documentElement.dataset.eggKonami = "true";
      showToast(copy.konamiToast);
      window.setTimeout(() => {
        delete document.documentElement.dataset.eggKonami;
      }, 8000);
    };

    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target;
      if (
        target instanceof HTMLElement &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable)
      ) {
        return;
      }

      // F3.13 — atalho `?`
      if (
        EASTER_EGG_FLAGS.shortcuts &&
        event.key === "?" &&
        !event.ctrlKey &&
        !event.metaKey &&
        !event.altKey
      ) {
        event.preventDefault();
        setShortcutsOpen(true);
        return;
      }

      if (!EASTER_EGG_FLAGS.konami) return;
      const expected = KONAMI[konamiIndex.current];
      const key = event.key.length === 1 ? event.key.toLowerCase() : event.key;
      if (key === expected || key === expected.toLowerCase()) {
        konamiIndex.current += 1;
        if (konamiIndex.current === KONAMI.length) {
          konamiIndex.current = 0;
          applyKonami();
        }
      } else {
        konamiIndex.current = key === KONAMI[0] ? 1 : 0;
      }
    };

    // F3.12 — cliques no nome
    const onNameClick = (event: MouseEvent) => {
      if (!EASTER_EGG_FLAGS.nameClicks) return;
      const el = event.target;
      if (!(el instanceof Element)) return;
      if (!el.closest("[data-egg-name]")) return;
      nameClicks.current += 1;
      if (nameClicks.current >= NAME_CLICK_THRESHOLD) {
        nameClicks.current = 0;
        setTerminalOpen(true);
      }
    };

    // F3.14 — hover longo Nest
    const nestNodes = Array.from(
      document.querySelectorAll<HTMLElement>("[data-egg-nest]"),
    );
    const clearNestTimer = () => {
      if (nestTimer.current) window.clearTimeout(nestTimer.current);
      nestTimer.current = null;
    };
    const onNestEnter = () => {
      if (!EASTER_EGG_FLAGS.nestFavorite || reduce) return;
      clearNestTimer();
      nestTimer.current = window.setTimeout(() => setNestTip(true), NEST_HOVER_MS);
    };
    const onNestLeave = () => {
      clearNestTimer();
      setNestTip(false);
    };
    for (const node of nestNodes) {
      node.addEventListener("pointerenter", onNestEnter);
      node.addEventListener("pointerleave", onNestLeave);
    }

    // F3.16 — hashes secretos
    const applySecretHash = () => {
      const hash = window.location.hash.replace(/^#/, "");
      if (!SECRET_HASHES.has(hash)) {
        setMatrixOn(false);
        return;
      }
      if (hash === "matrix" && EASTER_EGG_FLAGS.hashMatrix) {
        if (!prefersReducedMotion()) setMatrixOn(true);
      }
      if (hash === "coffee" && EASTER_EGG_FLAGS.hashCoffee) {
        showToast(copy.coffeeToast, 4000);
      }
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("click", onNameClick);
    window.addEventListener("hashchange", applySecretHash);
    applySecretHash();

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("click", onNameClick);
      window.removeEventListener("hashchange", applySecretHash);
      for (const node of nestNodes) {
        node.removeEventListener("pointerenter", onNestEnter);
        node.removeEventListener("pointerleave", onNestLeave);
      }
      clearNestTimer();
    };
  }, [copy, reduce]);

  return (
    <>
      <AnimatePresence>
        {toast ? (
          <motion.div
            key="toast"
            role="status"
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: 8 }}
            className="glass pointer-events-none fixed bottom-6 start-1/2 z-[60] max-w-sm -translate-x-1/2 px-4 py-3 text-sm text-fg shadow-[0_8px_32px_var(--glow)]"
          >
            {toast}
          </motion.div>
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {nestTip ? (
          <motion.div
            key="nest"
            role="status"
            initial={reduce ? false : { opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={reduce ? undefined : { opacity: 0 }}
            className="glass pointer-events-none fixed bottom-24 start-1/2 z-[60] -translate-x-1/2 px-4 py-2 font-mono text-xs text-accent"
          >
            {copy.nestFavorite}
          </motion.div>
        ) : null}
      </AnimatePresence>

      {matrixOn && !reduce ? (
        <div
          className="egg-matrix pointer-events-none fixed inset-0 z-[45] overflow-hidden opacity-40"
          aria-hidden="true"
        >
          {Array.from({ length: 12 }, (_, i) => (
            <span
              key={i}
              className="egg-matrix__col font-mono text-xs text-accent"
              style={{ left: `${8 + i * 8}%`, animationDelay: `${i * 0.35}s` }}
            >
              01∫λ→npm
            </span>
          ))}
        </div>
      ) : null}

      {/* F3.12 terminal */}
      <Dialog open={terminalOpen} onOpenChange={setTerminalOpen}>
        <DialogPortal>
          <DialogOverlay />
          <DialogPrimitive.Content
            className="glass fixed start-1/2 top-1/2 z-50 w-[min(100%-2rem,28rem)] -translate-x-1/2 -translate-y-1/2 p-5 font-mono text-sm outline-none"
            aria-describedby={undefined}
          >
            <DialogTitle className="m-0 text-accent">{copy.terminalTitle}</DialogTitle>
            <pre className="mt-4 m-0 whitespace-pre-wrap text-fg-muted">
              {copy.terminalBody}
            </pre>
            <DialogClose asChild>
              <button
                type="button"
                className="mt-4 rounded-xl bg-accent px-3 py-2 text-xs font-medium text-white"
              >
                {copy.terminalClose}
              </button>
            </DialogClose>
          </DialogPrimitive.Content>
        </DialogPortal>
      </Dialog>

      {/* F3.13 shortcuts */}
      <Dialog open={shortcutsOpen} onOpenChange={setShortcutsOpen}>
        <DialogPortal>
          <DialogOverlay />
          <DialogPrimitive.Content
            className="glass fixed start-1/2 top-1/2 z-50 w-[min(100%-2rem,26rem)] -translate-x-1/2 -translate-y-1/2 p-6 outline-none"
            aria-labelledby={titleId}
          >
            <DialogTitle id={titleId} className="font-display m-0 text-xl font-semibold">
              {copy.shortcutsTitle}
            </DialogTitle>
            <DialogDescription className="mt-2 m-0 text-sm text-fg-muted">
              {copy.shortcutsDescription}
            </DialogDescription>
            <ul className="mt-5 m-0 flex list-none flex-col gap-2 p-0">
              {copy.shortcuts.map((row) => (
                <li
                  key={row.keys}
                  className="flex items-baseline justify-between gap-4 text-sm"
                >
                  <kbd className="font-mono rounded-md border border-border-glass bg-accent-soft px-2 py-0.5 text-xs text-accent">
                    {row.keys}
                  </kbd>
                  <span className="text-end text-fg-muted">{row.action}</span>
                </li>
              ))}
            </ul>
            <DialogClose asChild>
              <button
                type="button"
                className="mt-6 rounded-xl border border-border-glass px-3 py-2 text-sm text-fg hover:bg-accent-soft"
              >
                {copy.shortcutsClose}
              </button>
            </DialogClose>
          </DialogPrimitive.Content>
        </DialogPortal>
      </Dialog>
    </>
  );
}
