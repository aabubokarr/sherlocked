"use client";

import Link from "next/link";
import { useSectionScroll } from "@/hooks/use-section-scroll";
import { SherlockedLogo } from "@/components/ui/sherlocked-logo";

export function Footer() {
  const scrollToSection = useSectionScroll();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-white/5 bg-slate-950/60 mt-10 sm:mt-14 pt-8 sm:pt-10 pb-4 sm:pb-5 z-10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {/* Logo & Description Column */}
        <div className="md:col-span-2 space-y-4">
          <div className="flex items-center gap-3">
            <SherlockedLogo size={28} className="shrink-0" />
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
              <button onClick={() => scrollToSection("about")} className="hover:text-white transition-colors cursor-pointer text-left">About Project</button>
            </li>
            <li>
              <button onClick={() => scrollToSection("features")} className="hover:text-white transition-colors cursor-pointer text-left">Features</button>
            </li>
            <li>
              <button onClick={() => scrollToSection("demo")} className="hover:text-white transition-colors cursor-pointer text-left">Intent Parser</button>
            </li>
            <li>
              <button onClick={() => scrollToSection("research")} className="hover:text-white transition-colors cursor-pointer text-left">Research Metrics</button>
            </li>
            <li>
              <button onClick={() => scrollToSection("contact")} className="hover:text-white transition-colors cursor-pointer text-left">Contact</button>
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 border-t border-white/5 mt-6 sm:mt-8 pt-4 sm:pt-5 flex flex-col md:flex-row justify-between items-center gap-2 sm:gap-3 text-[10px] sm:text-xs text-slate-500 font-medium text-center md:text-left">
        <div>
          Copyright &copy; {currentYear} Sherlocked. All rights reserved.
        </div>
        <div className="max-w-md md:max-w-none">
          Footage Analysis with Natural Language Queries Using LLM based Object-Attribute Binding
        </div>
      </div>
    </footer>
  );
}
