"use client";

import Link from "next/link";

export function Hero() {
  return (
    <header id="about" className="relative max-w-7xl mx-auto px-6 pt-20 pb-12 flex flex-col items-center text-center z-10 animate-fade-in">
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-semibold uppercase tracking-wider mb-6">
        <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-ping" />
        Footage Analysis with LLM Object-Attribute Binding
      </div>
      <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight bg-gradient-to-b from-white via-slate-100 to-slate-400 bg-clip-text text-transparent max-w-4xl leading-tight">
        Uncovering Video Details via Natural Language Queries
      </h1>
      <p className="mt-6 text-lg md:text-xl text-slate-400 max-w-3xl leading-relaxed">
        An advanced video analysis engine implementing object-attribute binding. Powered by a high-efficiency <strong>YOLOv11</strong> computer vision model, <strong>HSV-based K-Means clustering</strong>, and a <strong>gemini-2.5-flash-lite</strong> intent parser.
      </p>

      <div className="mt-10 flex flex-wrap gap-4 justify-center">
        <Link
          href="/detective"
          className="px-8 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition-all shadow-xl shadow-indigo-600/10 hover:scale-[1.03]"
        >
          Launch Chatbot Interface
        </Link>
        <a
          href="https://github.com/aabubokarr/sherlocked"
          target="_blank"
          rel="noopener noreferrer"
          className="px-8 py-3.5 bg-slate-900 hover:bg-slate-800 text-slate-200 hover:text-white border border-white/10 hover:border-white/20 font-semibold rounded-xl transition-all hover:scale-[1.03] flex items-center gap-2"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.11.82-.26.82-.577v-2.234c-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22v3.293c0 .319.22.694.825.576C20.565 21.795 24 17.3 24 12c0-6.63-5.37-12-12-12z" />
          </svg>
          Star on GitHub
        </a>
      </div>
    </header>
  );
}
