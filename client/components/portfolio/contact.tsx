"use client";

import Link from "next/link";
import { GITHUB_ISSUES, GITHUB_REPO } from "./constants";

const CONTACT_METHODS = [
  {
    title: "GitHub Repository",
    description: "Browse the source code, documentation, and release history.",
    href: GITHUB_REPO,
    external: true,
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden="true">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.11.82-.26.82-.577v-2.234c-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22v3.293c0 .319.22.694.825.576C20.565 21.795 24 17.3 24 12c0-6.63-5.37-12-12-12z" />
      </svg>
    ),
    cta: "View on GitHub",
  },
  {
    title: "Report an Issue",
    description: "Found a bug or have a feature idea? Open a GitHub issue and we'll take a look.",
    href: GITHUB_ISSUES,
    external: true,
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-5 w-5" aria-hidden="true">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 8v4M12 16h.01" />
      </svg>
    ),
    cta: "Open Issue",
  },
  {
    title: "Try the Chatbot",
    description: "Upload footage and run natural-language queries through the live detective interface.",
    href: "/detective",
    external: false,
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-5 w-5" aria-hidden="true">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
    cta: "Launch Chatbot",
  },
] as const;

export function Contact() {
  return (
    <section id="contact" className="relative max-w-5xl mx-auto px-4 sm:px-6 py-10 sm:py-12 z-10">
      <div className="text-center mb-8 sm:mb-10">
        <span className="text-[10px] text-indigo-400 font-bold uppercase tracking-wider bg-indigo-500/10 px-2.5 py-1 rounded-md border border-indigo-500/20">
          Get In Touch
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-100 mt-3">
          Contact & Collaboration
        </h2>
        <p className="text-sm text-slate-400 mt-2 max-w-2xl mx-auto leading-relaxed">
          Questions about the research, contributions, or integrating Sherlocked into your workflow?
          Reach out through any of the channels below.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {CONTACT_METHODS.map((method) => {
          const cardContent = (
            <>
              <div className="h-10 w-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center">
                {method.icon}
              </div>
              <h3 className="mt-4 text-base font-bold text-slate-100">{method.title}</h3>
              <p className="mt-2 text-xs text-slate-400 leading-relaxed flex-1">
                {method.description}
              </p>
              <span className="mt-5 inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-400 group-hover:text-indigo-300 transition-colors">
                {method.cta}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="h-3 w-3">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </span>
            </>
          );

          const className =
            "glass-panel group flex flex-col p-6 border-white/5 bg-slate-900/40 rounded-2xl hover:border-indigo-500/20 transition-all hover:scale-[1.01]";

          return method.external ? (
            <a
              key={method.title}
              href={method.href}
              target="_blank"
              rel="noopener noreferrer"
              className={className}
            >
              {cardContent}
            </a>
          ) : (
            <Link key={method.title} href={method.href} className={className}>
              {cardContent}
            </Link>
          );
        })}
      </div>
    </section>
  );
}
