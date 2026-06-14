"use client";

import { Navbar } from "./navbar";
import { NavStatsProvider } from "./nav-stats-context";

/** Root shell: shared sticky navbar + optional chatbot stats context. */
export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <NavStatsProvider>
      <Navbar />
      {children}
    </NavStatsProvider>
  );
}
