"use client";

import Link from "next/link";

interface FooterProps {
  onScrollToSection: (id: string) => void;
}

export function Footer({ onScrollToSection }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-white/5 bg-slate-950/60 mt-20 pt-16 pb-12 z-10 relative">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Logo & Description Column */}
        <div className="md:col-span-2 space-y-4">
          <div className="flex items-center gap-3">
            <div className="h-7 w-7 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-md shadow-indigo-500/20">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                className="h-4.5 w-4.5 text-white"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
            </div>
            <span className="text-lg font-bold text-slate-100">
              Sherlocked
            </span>
          </div>
          <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
            Footage analysis platform utilizing YOLOv11 and gemini-2.5-flash-lite. Built to run high-performance object-attribute searches inside garment-industry video feeds.
          </p>
        </div>

        {/* Quick Links Column */}
        <div>
          <h4 className="text-xs font-bold text-slate-300 uppercase tracking-widest mb-4">Navigations</h4>
          <ul className="space-y-2 text-xs text-slate-400 font-medium">
            <li>
              <button onClick={() => onScrollToSection("about")} className="hover:text-white transition-colors cursor-pointer text-left">About Project</button>
            </li>
            <li>
              <button onClick={() => onScrollToSection("features")} className="hover:text-white transition-colors cursor-pointer text-left">Features</button>
            </li>
            <li>
              <button onClick={() => onScrollToSection("demo")} className="hover:text-white transition-colors cursor-pointer text-left">Intent Parser</button>
            </li>
            <li>
              <button onClick={() => onScrollToSection("research")} className="hover:text-white transition-colors cursor-pointer text-left">Research Metrics</button>
            </li>
            <li>
              <Link href="/detective" className="text-indigo-400 hover:text-indigo-300 transition-colors flex items-center gap-1">
                Launch Chatbot
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="h-3 w-3">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </li>
          </ul>
        </div>

        {/* Project References Column */}
        <div>
          <h4 className="text-xs font-bold text-slate-300 uppercase tracking-widest mb-4">References</h4>
          <ul className="space-y-2 text-xs text-slate-400 font-medium">
            <li>
              <a href="https://github.com/aabubokarr/sherlocked" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">GitHub Repository</a>
            </li>
            <li>
              <a href="https://github.com/aabubokarr/sherlocked/blob/main/LICENSE" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">MIT License</a>
            </li>
            <li>
              <span className="text-slate-500">Dataset: Bangladeshi Garments</span>
            </li>
            <li>
              <span className="text-slate-500">Model: YOLOv11 + Gemini</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Credits */}
      <div className="max-w-7xl mx-auto px-6 border-t border-white/5 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500 font-medium">
        <div>
          &copy; Copyright {currentYear} Sherlocked. All rights reserved.
        </div>
        <div>
          Footage Analysis with Natural Language Queries Using LLM based Object-Attribute Binding
        </div>
      </div>
    </footer>
  );
}
