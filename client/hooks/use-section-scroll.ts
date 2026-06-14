"use client";

import { useCallback } from "react";
import { usePathname } from "next/navigation";

/** Scroll to a portfolio section on `/`, or navigate home with a hash from other routes. */
export function useSectionScroll() {
  const pathname = usePathname();

  return useCallback(
    (id: string) => {
      if (pathname === "/") {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
        return;
      }
      window.location.href = `/#${id}`;
    },
    [pathname]
  );
}
