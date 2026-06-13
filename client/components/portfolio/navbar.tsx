"use client";

import Link from "next/link";

interface NavbarProps {
  onScrollToSection: (id: string) => void;
}

export function Navbar({ onScrollToSection }: NavbarProps) {
  return (
    <nav className="w-full bg-slate-950 border-b border-white/5 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              className="h-5 w-5 text-white"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
            Sherlocked
          </span>
        </div>

        {/* Nav Sections Links */}
        <div className="hidden md:flex items-center gap-6 text-xs font-semibold text-slate-400">
          <button onClick={() => onScrollToSection("about")} className="hover:text-white transition-colors cursor-pointer">About</button>
          <button onClick={() => onScrollToSection("features")} className="hover:text-white transition-colors cursor-pointer">Features</button>
          <button onClick={() => onScrollToSection("demo")} className="hover:text-white transition-colors cursor-pointer">Query Parser</button>
          <button onClick={() => onScrollToSection("research")} className="hover:text-white transition-colors cursor-pointer">Research Paper</button>
          <button onClick={() => onScrollToSection("architecture")} className="hover:text-white transition-colors cursor-pointer">System Pipeline</button>
        </div>

        <div className="flex items-center gap-4">
          <Link
            href="/detective"
            className="text-xs font-bold bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white px-5 py-2.5 rounded-xl shadow-lg shadow-indigo-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              className="h-3.5 w-3.5"
            >
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
            Launch Chatbot
          </Link>
        </div>
      </div>
    </nav>
  );
}
