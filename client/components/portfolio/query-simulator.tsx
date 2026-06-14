"use client";

import { useState } from "react";
import {
  BACKEND_URL,
  COLOR_KEYWORDS,
  GARMENT_CLASSES,
  SAMPLE_QUERIES,
} from "./constants";
import type { QueryItem } from "./types";

export function QuerySimulator() {
  const [customQuery, setCustomQuery] = useState("");
  const [parsedResult, setParsedResult] = useState<QueryItem | null>(SAMPLE_QUERIES[0]);
  const [isLoading, setIsLoading] = useState(false);

  const handleQuerySelect = (query: QueryItem) => {
    setCustomQuery(query.text);
    setParsedResult(query);
  };

  const handleCustomQuerySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customQuery.trim()) return;

    setIsLoading(true);
    try {
      const response = await fetch(`${BACKEND_URL}/api/intent`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: customQuery }),
      });

      if (response.ok) {
        const data = await response.json();
        setParsedResult({
          text: customQuery,
          pairs: data.pairs || [],
          targets: data.targets || [],
          colors: data.colors || [],
          pipeline: "gemini-2.5-flash-lite Intent Parser"
        });
      } else {
        throw new Error("API failed");
      }
    } catch {
      // Offline fallback: tokenize color + garment pairs when the intent API is unavailable.
      const queryLower = customQuery.toLowerCase();
      const foundColors: string[] = [];
      const foundTargets: string[] = [];
      const foundPairs: Array<{ object: string; color: string }> = [];

      const words = queryLower.split(/\s+/);
      for (let i = 0; i < words.length - 1; i++) {
        if (COLOR_KEYWORDS.includes(words[i]) && words[i + 1].length > 2) {
          foundPairs.push({ object: words[i+1], color: words[i] });
          foundColors.push(words[i]);
          foundTargets.push(words[i+1]);
        }
      }

      // Add unmatched garments
      words.forEach((word) => {
        const matchingGarment = GARMENT_CLASSES.find(
          (g) => g.toLowerCase() === word
        );
        if (matchingGarment) {
          const lowerGarment = matchingGarment.toLowerCase();
          if (!foundTargets.includes(lowerGarment)) {
            foundTargets.push(lowerGarment);
          }
        }
      });

      setParsedResult({
        text: customQuery,
        pairs: foundPairs,
        targets: foundTargets.map(t => t.toLowerCase()),
        colors: foundColors,
        pipeline: "Local Regex Fallback Engine"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="demo" className="relative max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-12 z-10">
      <div className="glass-panel border-white/10 bg-slate-900/50 p-4 sm:p-8 shadow-2xl rounded-2xl sm:rounded-3xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4">
          <span className="text-[10px] text-indigo-400 font-bold uppercase tracking-wider bg-indigo-500/10 px-2.5 py-1 rounded-md border border-indigo-500/20">
            Interactive Live Demo
          </span>
        </div>

        <h2 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-5 w-5 text-indigo-400">
            <path d="m21 16-4 4-4-4" />
            <path d="M17 20V4" />
            <path d="m3 8 4-4 4 4" />
            <path d="M7 4v16" />
          </svg>
          Query Intent Parser Simulator
        </h2>
        <p className="mt-2 text-sm text-slate-400">
          See how the `gemini-2.5-flash-lite` LLM model resolves queries into structured JSON constraints matching colors and garments.
        </p>

        <div className="mt-6 flex flex-wrap gap-2.5">
          {SAMPLE_QUERIES.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleQuerySelect(q)}
              className={`px-4 py-2 text-xs font-medium rounded-xl border transition-all ${
                parsedResult?.text === q.text
                  ? "bg-indigo-500/20 border-indigo-500/50 text-indigo-200"
                  : "bg-slate-950/40 border-white/5 text-slate-400 hover:text-slate-200 hover:border-white/10"
              }`}
            >
              Query {idx + 1}
            </button>
          ))}
        </div>

        <form onSubmit={handleCustomQuerySubmit} className="mt-6 flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            value={customQuery}
            onChange={(e) => setCustomQuery(e.target.value)}
            placeholder="Or type your own (e.g. 'find a red panjabi and white pajama')"
            className="flex-1 px-4 py-3 text-sm rounded-xl bg-slate-950 border border-white/5 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/20 transition-all"
          />
          <button
            type="submit"
            disabled={isLoading}
            className="px-5 py-3 text-sm font-semibold rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white flex items-center gap-2 transition-all active:scale-95 disabled:opacity-50 cursor-pointer"
          >
            {isLoading ? (
              <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              "Parse"
            )}
          </button>
        </form>

        {parsedResult && (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-950/50 p-6 rounded-2xl border border-white/5 animate-fade-in">
            <div>
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                Parsed Output
              </div>
              <div className="space-y-4">
                <div>
                  <div className="text-xs text-slate-500 font-medium">Garments Detected:</div>
                  <div className="mt-1.5 flex flex-wrap gap-1.5">
                    {parsedResult.targets.length > 0 ? (
                      parsedResult.targets.map((t) => (
                        <span key={t} className="px-2.5 py-1 text-xs font-semibold uppercase tracking-wider bg-sky-500/10 text-sky-400 border border-sky-500/20 rounded-md">
                          {t}
                        </span>
                      ))
                    ) : (
                      <span className="text-xs text-slate-600 italic">None</span>
                    )}
                  </div>
                </div>

                <div>
                  <div className="text-xs text-slate-500 font-medium">HSV Colors Extracted:</div>
                  <div className="mt-1.5 flex flex-wrap gap-1.5">
                    {parsedResult.colors.length > 0 ? (
                      parsedResult.colors.map((c) => (
                        <span key={c} className="px-2.5 py-1 text-xs font-semibold uppercase tracking-wider bg-pink-500/10 text-pink-400 border border-pink-500/20 rounded-md">
                          {c}
                        </span>
                      ))
                    ) : (
                      <span className="text-xs text-slate-600 italic">None</span>
                    )}
                  </div>
                </div>

                <div>
                  <div className="text-xs text-slate-500 font-medium">Object-Attribute Pairs:</div>
                  <div className="mt-1.5 space-y-1">
                    {parsedResult.pairs.length > 0 ? (
                      parsedResult.pairs.map((p, index) => (
                        <div key={index} className="inline-flex items-center gap-1.5 text-xs bg-indigo-500/10 text-indigo-300 border border-indigo-500/25 px-2.5 py-1 rounded-md font-semibold uppercase tracking-wider">
                          <span className="text-pink-400 font-bold">{p.color}</span>
                          <span className="text-slate-400 font-normal">→</span>
                          <span className="text-sky-400 font-bold">{p.object}</span>
                        </div>
                      ))
                    ) : (
                      <div className="text-xs text-slate-600 italic">None</div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t md:border-t-0 md:border-l border-white/5 pt-6 md:pt-0 md:pl-6 flex flex-col justify-between">
              <div>
                <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                  Inference Stack
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-2.5 text-xs">
                    <div className="h-5 w-5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center font-bold text-[10px]">✓</div>
                    <span className="text-slate-300">Conjunctive Match Logic Ready</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs">
                    <div className="h-5 w-5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center font-bold text-[10px]">✓</div>
                    <span className="text-slate-300">Targeting YOLOv11 Detections</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs">
                    <div className="h-5 w-5 rounded-full bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-center font-bold text-[10px]">⚙</div>
                    <span className="text-indigo-300 font-medium">Resolved via {parsedResult.pipeline}</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-3 rounded-lg bg-slate-900 border border-white/5 flex items-center justify-between text-xs">
                <span className="text-slate-500 font-medium">Input Query:</span>
                <span className="text-slate-300 italic font-mono truncate max-w-[120px] sm:max-w-[200px]">"{parsedResult.text}"</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
