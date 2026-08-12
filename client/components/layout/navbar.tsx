"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { SherlockedLogo } from "@/components/ui/sherlocked-logo";
import { useSectionScroll } from "@/hooks/use-section-scroll";
import { NAV_SECTIONS, type NavSectionIcon } from "./nav-sections";
import { useNavStats } from "./nav-stats-context";

function NavSectionIconGlyph({ icon }: { icon: NavSectionIcon }) {
  const className = "h-4 w-4";

  switch (icon) {
    case "grid":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          className={className}
          aria-hidden="true"
        >
          <rect x="3" y="3" width="7" height="7" rx="1" />
          <rect x="14" y="3" width="7" height="7" rx="1" />
          <rect x="3" y="14" width="7" height="7" rx="1" />
          <rect x="14" y="14" width="7" height="7" rx="1" />
        </svg>
      );
    case "terminal":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          className={className}
          aria-hidden="true"
        >
          <path d="m7 11 2-2-2-2M13 15h4" />
          <rect x="3" y="4" width="18" height="16" rx="2" />
        </svg>
      );
    case "chart":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          className={className}
          aria-hidden="true"
        >
          <path d="M3 3v18h18" />
          <path d="M7 16V9M12 16V5M17 16v-4" />
        </svg>
      );
    case "layers":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          className={className}
          aria-hidden="true"
        >
          <path d="m12.83 2.18 8 4.05a1 1 0 0 1 0 1.82l-8 4.05a2 2 0 0 1-1.66 0l-8-4.05a1 1 0 0 1 0-1.82l8-4.05a2 2 0 0 1 1.66 0z" />
          <path d="m2.83 12.18 8 4.05a2 2 0 0 0 1.66 0l8-4.05" />
          <path d="m2.83 17.18 8 4.05a2 2 0 0 0 1.66 0l8-4.05" />
        </svg>
      );
    case "mail":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          className={className}
          aria-hidden="true"
        >
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="m3 7 9 6 9 6 9-6 9 6" />
        </svg>
      );
  }
}

const ctaClassName =
  "text-[10px] sm:text-xs font-bold px-3 sm:px-5 py-2 sm:py-2.5 rounded-xl transition-all flex items-center gap-1.5 sm:gap-2 hover:scale-[1.02] active:scale-[0.98]";

export function Navbar() {
  const pathname = usePathname();
  const scrollToSection = useSectionScroll();
  const { stats } = useNavStats();
  const [mobileOpen, setMobileOpen] = useState(false);
  const isDetective = pathname === "/detective";

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Prevent background scroll while the mobile drawer is open.
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const handleSectionClick = (id: string) => {
    scrollToSection(id);
    setMobileOpen(false);
  };

  return (
    <>
      <nav className="sticky top-0 w-full bg-slate-950/90 backdrop-blur-md border-b border-white/5 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between gap-3">
            <Link
              href="/"
              className="flex items-center gap-2 sm:gap-3 min-w-0 group"
            >
              <SherlockedLogo size={34} className="shrink-0" />
              <span className="text-lg sm:text-xl font-bold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent truncate">
                Sherlocked
              </span>
            </Link>

            {/* Desktop section links */}
            <div className="hidden lg:flex items-center gap-4 xl:gap-6 text-xs font-semibold text-slate-400">
              {NAV_SECTIONS.map(({ id, label }) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => handleSectionClick(id)}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {label}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              {isDetective &&
                (stats.processedFrames !== undefined ||
                  stats.detectionsFound !== undefined) && (
                  <div className="hidden sm:flex items-center gap-2 text-[10px] sm:text-xs font-medium">
                    {stats.processedFrames !== undefined && (
                      <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-white/5 border border-white/5">
                        <span className="text-indigo-400 font-bold">
                          {stats.processedFrames}
                        </span>
                        <span className="text-slate-400 hidden md:inline">
                          frames
                        </span>
                      </div>
                    )}
                    {stats.detectionsFound !== undefined && (
                      <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-white/5 border border-white/5">
                        <span className="text-pink-400 font-bold">
                          {stats.detectionsFound}
                        </span>
                        <span className="text-slate-400 hidden md:inline">
                          detections
                        </span>
                      </div>
                    )}
                  </div>
                )}

              {isDetective ? (
                <Link
                  href="/"
                  className={`${ctaClassName} bg-slate-900 hover:bg-slate-800 text-slate-200 hover:text-white border border-white/10 hover:border-indigo-500/30 shadow-sm`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    className="h-3.5 w-3.5"
                    aria-hidden="true"
                  >
                    <path d="m15 18-6-6 6-6" />
                  </svg>
                  <span className="hidden sm:inline">Go Back</span>
                  <span className="sm:hidden">Back</span>
                </Link>
              ) : (
                <Link
                  href="/detective"
                  className={`${ctaClassName} bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white shadow-lg shadow-indigo-500/20`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    className="h-3.5 w-3.5"
                    aria-hidden="true"
                  >
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  </svg>
                  <span className="hidden sm:inline">Launch Chatbot</span>
                  <span className="sm:hidden">Chat</span>
                </Link>
              )}

              <button
                type="button"
                onClick={() => setMobileOpen((open) => !open)}
                className={`lg:hidden relative h-10 w-10 flex items-center justify-center rounded-xl border transition-all ${
                  mobileOpen
                    ? "border-indigo-500/40 bg-indigo-500/10 text-indigo-300"
                    : "border-white/10 text-slate-300 hover:text-white hover:bg-white/5"
                }`}
                aria-expanded={mobileOpen}
                aria-label="Toggle navigation menu"
              >
                <span className="sr-only">Menu</span>
                <span
                  className={`absolute h-0.5 w-5 bg-current transition-all ${
                    mobileOpen ? "rotate-45" : "-translate-y-1.5"
                  }`}
                />
                <span
                  className={`absolute h-0.5 w-5 bg-current transition-all ${
                    mobileOpen ? "opacity-0 scale-0" : ""
                  }`}
                />
                <span
                  className={`absolute h-0.5 w-5 bg-current transition-all ${
                    mobileOpen ? "-rotate-45" : "translate-y-1.5"
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile drawer */}
      {mobileOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-slate-950/70 backdrop-blur-sm lg:hidden animate-fade-in"
            onClick={() => setMobileOpen(false)}
            aria-hidden="true"
          />
          <div className="fixed inset-x-0 top-[60px] sm:top-[68px] z-40 lg:hidden px-3 sm:px-4 animate-slide-up">
            <div className="max-w-lg mx-auto rounded-2xl border border-white/10 bg-slate-950/95 backdrop-blur-xl shadow-2xl shadow-indigo-950/40 overflow-hidden">
              <div className="px-4 py-3 border-b border-white/5 bg-gradient-to-r from-indigo-500/10 to-purple-500/10">
                <p className="text-[10px] font-bold uppercase tracking-widest text-indigo-400">
                  Explore Sherlocked
                </p>
                <p className="text-xs text-slate-400 mt-0.5">
                  {isDetective
                    ? "Jump to a portfolio section"
                    : "Navigate the landing page"}
                </p>
              </div>

              <div className="p-3 grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-[min(60dvh,420px)] overflow-y-auto custom-scrollbar">
                {NAV_SECTIONS.map(({ id, label, description, icon }) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => handleSectionClick(id)}
                    className="group flex items-start gap-3 rounded-xl border border-white/5 bg-slate-900/60 p-3 text-left hover:border-indigo-500/30 hover:bg-indigo-500/5 transition-all active:scale-[0.98]"
                  >
                    <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 group-hover:bg-indigo-500/20 group-hover:text-indigo-300 transition-colors">
                      <NavSectionIconGlyph icon={icon} />
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-bold text-slate-100">
                        {label}
                      </div>
                      <div className="text-[10px] text-slate-500 mt-0.5 leading-snug">
                        {description}
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              {isDetective &&
                (stats.processedFrames !== undefined ||
                  stats.detectionsFound !== undefined) && (
                  <div className="px-3 pb-3 flex flex-wrap gap-2">
                    {stats.processedFrames !== undefined && (
                      <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/5 text-xs">
                        <span className="text-indigo-400 font-bold">
                          {stats.processedFrames}
                        </span>
                        <span className="text-slate-400">frames processed</span>
                      </div>
                    )}
                    {stats.detectionsFound !== undefined && (
                      <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/5 text-xs">
                        <span className="text-pink-400 font-bold">
                          {stats.detectionsFound}
                        </span>
                        <span className="text-slate-400">detections found</span>
                      </div>
                    )}
                  </div>
                )}

              <div className="p-3 pt-0 border-t border-white/5">
                {isDetective ? (
                  <Link
                    href="/"
                    onClick={() => setMobileOpen(false)}
                    className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-xs font-bold text-slate-200 hover:border-indigo-500/30 hover:text-white transition-all"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      className="h-4 w-4"
                      aria-hidden="true"
                    >
                      <path d="m15 18-6-6 6-6" />
                    </svg>
                    Back to Portfolio
                  </Link>
                ) : (
                  <Link
                    href="/detective"
                    onClick={() => setMobileOpen(false)}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 px-4 py-3 text-xs font-bold text-white shadow-lg shadow-indigo-500/20 hover:from-indigo-600 hover:to-purple-700 transition-all"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      className="h-4 w-4"
                      aria-hidden="true"
                    >
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                    </svg>
                    Launch Chatbot Interface
                  </Link>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
