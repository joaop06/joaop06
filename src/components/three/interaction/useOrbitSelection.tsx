import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type OrbitNodeId = "api" | "db" | "queue" | "commerce" | "erp";

export const ORBIT_NODE_IDS: OrbitNodeId[] = [
  "api",
  "db",
  "queue",
  "commerce",
  "erp",
];

type OrbitSelectionValue = {
  selectedId: OrbitNodeId | null;
  hoveredId: OrbitNodeId | null;
  setSelectedId: (id: OrbitNodeId | null) => void;
  setHoveredId: (id: OrbitNodeId | null) => void;
  clear: () => void;
};

const OrbitSelectionContext = createContext<OrbitSelectionValue | null>(null);

export function OrbitSelectionProvider({ children }: { children: ReactNode }) {
  const [selectedId, setSelectedId] = useState<OrbitNodeId | null>(null);
  const [hoveredId, setHoveredId] = useState<OrbitNodeId | null>(null);

  const clear = useCallback(() => {
    setSelectedId(null);
    setHoveredId(null);
  }, []);

  const value = useMemo(
    () => ({
      selectedId,
      hoveredId,
      setSelectedId,
      setHoveredId,
      clear,
    }),
    [selectedId, hoveredId, clear],
  );

  return (
    <OrbitSelectionContext.Provider value={value}>
      {children}
    </OrbitSelectionContext.Provider>
  );
}

export function useOrbitSelection(): OrbitSelectionValue {
  const ctx = useContext(OrbitSelectionContext);
  if (!ctx) {
    throw new Error("useOrbitSelection must be used within OrbitSelectionProvider");
  }
  return ctx;
}

/** Active highlight: hover wins over sticky selection for emissive. */
export function useActiveOrbitId(): OrbitNodeId | null {
  const { hoveredId, selectedId } = useOrbitSelection();
  return hoveredId ?? selectedId;
}
