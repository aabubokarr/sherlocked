"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

export type NavStats = {
  processedFrames?: number;
  detectionsFound?: number;
};

type NavStatsContextValue = {
  stats: NavStats;
  setStats: (stats: NavStats) => void;
};

const NavStatsContext = createContext<NavStatsContextValue | null>(null);

/** Lets the chatbot page push live processing stats into the shared navbar. */
export function NavStatsProvider({ children }: { children: ReactNode }) {
  const [stats, setStats] = useState<NavStats>({});

  return (
    <NavStatsContext.Provider value={{ stats, setStats }}>
      {children}
    </NavStatsContext.Provider>
  );
}

export function useNavStats() {
  const context = useContext(NavStatsContext);
  if (!context) {
    throw new Error("useNavStats must be used within NavStatsProvider");
  }
  return context;
}
