/**
 * F3.1–F3.6 / F3.10 — Lenis + GSAP ScrollTrigger + timeline + deep link.
 * Ownership: este módulo controla scroll e `[data-chapter]` (GSAP).
 * Não aplicar Motion em nós com `data-chapter`. Ver docs/motion-ownership.md.
 */
import { useEffect } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Locale } from "@/i18n";
import { getSections, type SectionId } from "@/lib/sections";
import { prefersReducedMotion, SECRET_HASHES } from "@/lib/reduced-motion";
import { dispatchSectionChange } from "@/lib/scroll-events";

type ScrollRuntimeProps = {
  locale: Locale;
};

const HEADER_OFFSET = -80;

function readHash(): string {
  return window.location.hash.replace(/^#/, "");
}

function findSectionTriggers(locale: Locale) {
  return getSections(locale)
    .map((section) => {
      const el = document.getElementById(section.hash);
      return el ? { ...section, el } : null;
    })
    .filter((s): s is NonNullable<typeof s> => s !== null);
}

export default function ScrollRuntime({ locale }: ScrollRuntimeProps) {
  useEffect(() => {
    const reduced = prefersReducedMotion();
    document.documentElement.dataset.reducedMotion = reduced ? "true" : "false";

    const sections = findSectionTriggers(locale);
    const markers = Array.from(
      document.querySelectorAll<HTMLElement>("[data-timeline-marker]"),
    );
    const progressEl = document.querySelector<HTMLElement>(
      "[data-timeline-progress]",
    );
    const barEl = document.querySelector<HTMLElement>("[data-scroll-progress]");

    const setActive = (id: SectionId, hash: string, progress: number) => {
      for (const marker of markers) {
        const active = marker.dataset.timelineMarker === hash;
        marker.classList.toggle("is-active", active);
        marker.setAttribute("aria-current", active ? "true" : "false");
      }
      if (progressEl) {
        progressEl.style.transform = `scaleY(${Math.min(1, Math.max(0, progress))})`;
      }
      if (barEl) {
        barEl.style.transform = `scaleX(${Math.min(1, Math.max(0, progress))})`;
      }
      dispatchSectionChange({ id, hash, progress });
    };

    /** Active section via IntersectionObserver (também em reduced-motion). */
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible?.target.id) return;
        const match = sections.find((s) => s.hash === visible.target.id);
        if (!match) return;
        const doc = document.documentElement;
        const maxScroll = doc.scrollHeight - window.innerHeight;
        const progress = maxScroll > 0 ? window.scrollY / maxScroll : 0;
        setActive(match.id, match.hash, progress);
      },
      { rootMargin: "-35% 0px -45% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] },
    );

    for (const section of sections) {
      section.el.setAttribute("data-chapter", section.id);
      io.observe(section.el);
    }

    if (sections[0]) {
      setActive(sections[0].id, sections[0].hash, 0);
    }

    if (reduced) {
      // F3.10: sem Lenis smooth / timelines GSAP; seções estáticas
      const hash = readHash();
      if (hash && !SECRET_HASHES.has(hash)) {
        const target = document.getElementById(hash);
        target?.scrollIntoView({ behavior: "auto", block: "start" });
      }
      return () => io.disconnect();
    }

    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      lerp: 0.09,
      autoRaf: false,
      anchors: false,
      syncTouch: false,
    });

    lenis.on("scroll", ScrollTrigger.update);

    const tick = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    const chapterTweens: gsap.core.Tween[] = [];
    for (const section of sections) {
      // Hero (primeiro) entra estático; demais capítulos animam
      if (section.id === "home") continue;
      const tween = gsap.from(section.el, {
        autoAlpha: 0,
        y: 36,
        duration: 0.7,
        ease: "power3.out",
        immediateRender: false,
        scrollTrigger: {
          trigger: section.el,
          start: "top 82%",
          toggleActions: "play none none none",
        },
      });
      chapterTweens.push(tween);
    }

    const onLenisScroll = () => {
      const doc = document.documentElement;
      const maxScroll = doc.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? lenis.scroll / maxScroll : 0;
      if (progressEl) {
        progressEl.style.transform = `scaleY(${Math.min(1, Math.max(0, progress))})`;
      }
      if (barEl) {
        barEl.style.transform = `scaleX(${Math.min(1, Math.max(0, progress))})`;
      }
    };
    lenis.on("scroll", onLenisScroll);

    const scrollToHash = (hash: string, immediate = false) => {
      if (!hash || SECRET_HASHES.has(hash)) return;
      const el = document.getElementById(hash);
      if (!el) return;
      lenis.scrollTo(el, {
        offset: HEADER_OFFSET,
        immediate,
        lock: true,
      });
    };

    // F3.6 — deep link após load (sem pulo feio)
    const initialHash = readHash();
    let deepLinkFrame = 0;
    if (initialHash && !SECRET_HASHES.has(initialHash)) {
      deepLinkFrame = requestAnimationFrame(() => {
        scrollToHash(initialHash, false);
      });
    }

    const onClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const anchor = target.closest("a[href*='#']");
      if (!(anchor instanceof HTMLAnchorElement)) return;
      const url = new URL(anchor.href, window.location.href);
      if (url.pathname !== window.location.pathname) return;
      const hash = url.hash.replace(/^#/, "");
      if (!hash || SECRET_HASHES.has(hash)) return;
      if (!document.getElementById(hash)) return;
      event.preventDefault();
      history.pushState(null, "", `#${hash}`);
      scrollToHash(hash);
    };

    const onHashChange = () => {
      scrollToHash(readHash());
    };

    document.addEventListener("click", onClick);
    window.addEventListener("hashchange", onHashChange);

    const refresh = () => ScrollTrigger.refresh();
    void document.fonts.ready.then(refresh);
    window.addEventListener("load", refresh);
    const refreshTimer = window.setTimeout(refresh, 400);

    return () => {
      cancelAnimationFrame(deepLinkFrame);
      window.clearTimeout(refreshTimer);
      document.removeEventListener("click", onClick);
      window.removeEventListener("hashchange", onHashChange);
      window.removeEventListener("load", refresh);
      io.disconnect();
      for (const tween of chapterTweens) tween.kill();
      ScrollTrigger.getAll().forEach((st) => st.kill());
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, [locale]);

  return null;
}
