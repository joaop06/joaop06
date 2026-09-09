import { useEffect, useId } from "react";
import type { Dictionary } from "@/i18n";
import {
  ORBIT_NODE_IDS,
  useOrbitSelection,
  type OrbitNodeId,
} from "./useOrbitSelection";

type NodeCopy = Dictionary["hero"]["orbitNodes"][OrbitNodeId];

type NodeDetailPanelProps = {
  nodes: Dictionary["hero"]["orbitNodes"];
  dismissLabel: string;
  listLabel: string;
};

/** Painel DOM acessível — espelho teclado/hover dos nós 3D. */
export function NodeDetailPanel({
  nodes,
  dismissLabel,
  listLabel,
}: NodeDetailPanelProps) {
  const { selectedId, hoveredId, setSelectedId, setHoveredId, clear } =
    useOrbitSelection();
  const activeId = hoveredId ?? selectedId;
  const panelId = useId();
  const active: NodeCopy | null = activeId ? nodes[activeId] : null;

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") clear();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [clear]);

  return (
    <div
      className="pointer-events-auto absolute inset-x-0 bottom-0 z-10 flex flex-col items-start gap-2 p-2 sm:p-3 lg:inset-x-auto lg:start-[18%] lg:end-2 lg:max-w-sm"
      onPointerLeave={() => setHoveredId(null)}
    >
      <div
        role="listbox"
        aria-label={listLabel}
        className="flex flex-wrap gap-1.5"
      >
        {ORBIT_NODE_IDS.map((id) => {
          const selected = selectedId === id;
          const preview = activeId === id;
          return (
            <button
              key={id}
              type="button"
              role="option"
              aria-selected={selected || preview}
              className={[
                "rounded-md border px-2 py-1 font-mono text-xs transition-colors",
                "backdrop-blur-sm",
                "hover:border-accent hover:bg-accent/15 hover:text-fg",
                "focus-visible:border-accent focus-visible:bg-accent/15 focus-visible:text-fg",
                preview || selected
                  ? "border-accent bg-accent/15 text-fg"
                  : "border-border-glass/60 bg-bg/60 text-fg-muted",
              ].join(" ")}
              onPointerEnter={() => setHoveredId(id)}
              onFocus={() => setHoveredId(id)}
              onClick={() => setSelectedId(selectedId === id ? null : id)}
            >
              {nodes[id].title}
            </button>
          );
        })}
      </div>

      {/* Altura reservada — sem layout shift ao hover */}
      <div
        id={panelId}
        aria-live="polite"
        aria-hidden={!active}
        className={[
          "glass min-h-[4.5rem] w-full rounded-lg px-3 py-2 text-left",
          active ? "visible" : "invisible",
        ].join(" ")}
      >
        {active ? (
          <>
            <p className="m-0 font-mono text-xs font-medium text-accent">
              {active.title}
            </p>
            <p className="mt-1 mb-0 text-sm leading-snug text-fg">{active.blurb}</p>
            {selectedId && (
              <button
                type="button"
                className="mt-2 text-xs text-fg-muted underline-offset-2 hover:underline"
                onClick={clear}
              >
                {dismissLabel}
              </button>
            )}
          </>
        ) : (
          <p className="m-0 text-sm text-fg-muted">&nbsp;</p>
        )}
      </div>
    </div>
  );
}
