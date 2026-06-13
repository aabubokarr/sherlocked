"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL ?? "http://localhost:8000";

interface QueryItem {
  text: string;
  pairs: Array<{ object: string; color: string }>;
  targets: string[];
  colors: string[];
  pipeline: string;
}

const SAMPLE_QUERIES: QueryItem[] = [
  {
    text: "find a person wearing a blue kameez and black hijab",
    pairs: [
      { object: "kameez", color: "blue" },
      { object: "hijab", color: "black" }
    ],
    targets: ["kameez", "hijab"],
    colors: ["blue", "black"],
    pipeline: "gemini-2.5-flash-lite Intent Parser"
  },
  {
    text: "look for a red panjabi",
    pairs: [
      { object: "panjabi", color: "red" }
    ],
    targets: ["panjabi"],
    colors: ["red"],
    pipeline: "Fast Pattern Extractor"
  },
  {
    text: "spot a saree",
    pairs: [],
    targets: ["saree"],
    colors: [],
    pipeline: "Keyword Fallback Engine"
  }
];

const GARMENT_CLASSES = [
  "Belt", "Blazer", "Blouse", "Burqo", "Cap", "Cardigan", "Dhoti", "Gown", "Hijab", 
  "Fatua", "Footwear", "Frock", "Gawn", "Hoodie", "Jacket", "Jeans pant", "Kameez", 
  "Koti", "Lehenga", "Lungi", "Panjabi", "Pagri", "Pajama", "Pant", "Plazo", "Polo shirt", 
  "Sando genji", "Saree", "Sherwani", "Shirt", "Shorts", "T-shirt", "Tie", "Top", "Watch"
];

export default function Portfolio() {
  const [activeTab, setActiveTab] = useState<"garments" | "architecture" | "pipeline" | "tech-stack">("garments");
  const [customQuery, setCustomQuery] = useState("");
  const [parsedResult, setParsedResult] = useState<QueryItem | null>(SAMPLE_QUERIES[0]);
  const [isLoading, setIsLoading] = useState(false);
  const [stats, setStats] = useState({
    mAp: 0,
    f1Score: 0,
    confidence: 0,
  });

  useEffect(() => {
    // Micro-animations for counter stats on load
    const interval = setInterval(() => {
      setStats((prev) => {
        const nextMap = prev.mAp < 81.4 ? Number((prev.mAp + 2.2).toFixed(1)) : 81.4;
        const nextF1 = prev.f1Score < 0.88 ? Number((prev.f1Score + 0.03).toFixed(2)) : 0.88;
        const nextConf = prev.confidence < 0.421 ? Number((prev.confidence + 0.015).toFixed(3)) : 0.421;
        
        if (nextMap >= 81.4 && nextF1 >= 0.88 && nextConf >= 0.421) {
          clearInterval(interval);
          return { mAp: 81.4, f1Score: 0.88, confidence: 0.421 };
        }
        return { mAp: nextMap, f1Score: nextF1, confidence: nextConf };
      });
    }, 30);
    return () => clearInterval(interval);
  }, []);

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
    } catch (err) {
      // Client-side regex pattern matching fallback using 11 HSV colors & 39 clothing classes
      const queryLower = customQuery.toLowerCase();
      const colorKeywords = [
        "red", "blue", "green", "yellow", "orange", "purple", "pink",
        "black", "white", "gray", "grey", "cyan"
      ];
      
      const foundColors: string[] = [];
      const foundTargets: string[] = [];
      const foundPairs: Array<{ object: string; color: string }> = [];

      // Tokenize
      const words = queryLower.split(/\s+/);
      for (let i = 0; i < words.length - 1; i++) {
        if (colorKeywords.includes(words[i]) && words[i+1].length > 2) {
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

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 relative selection:bg-indigo-500/30 font-sans pb-24 overflow-x-hidden">
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-5%] w-[60%] h-[50%] bg-indigo-900/15 rounded-full blur-[140px] animate-pulse-glow" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[50%] h-[50%] bg-pink-900/10 rounded-full blur-[120px]" />
        <div className="absolute top-[40%] right-[20%] w-[30%] h-[30%] bg-indigo-600/5 rounded-full blur-[100px]" />
      </div>

      {/* Static Full-Width Header Navbar */}
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
            <button onClick={() => scrollToSection("about")} className="hover:text-white transition-colors cursor-pointer">About</button>
            <button onClick={() => scrollToSection("features")} className="hover:text-white transition-colors cursor-pointer">Features</button>
            <button onClick={() => scrollToSection("demo")} className="hover:text-white transition-colors cursor-pointer">Query Parser</button>
            <button onClick={() => scrollToSection("research")} className="hover:text-white transition-colors cursor-pointer">Research Paper</button>
            <button onClick={() => scrollToSection("architecture")} className="hover:text-white transition-colors cursor-pointer">System Pipeline</button>
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

      {/* Hero Section */}
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

      {/* Metrics Section */}
      <section id="research" className="relative max-w-5xl mx-auto px-6 py-8 z-10">
        <div className="text-center mb-8">
          <span className="text-[10px] text-indigo-400 font-bold uppercase tracking-wider bg-indigo-500/10 px-2.5 py-1 rounded-md border border-indigo-500/20">
            Research Paper Benchmarks
          </span>
          <h2 className="text-2xl font-bold text-slate-100 mt-2">
            Dataset Performance & Evaluation
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            Evaluated on the Bangladeshi Garments dataset of 10,000 images containing 39 specific clothing classes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-panel p-6 border-white/5 bg-slate-900/40 text-center relative overflow-hidden group">
            <div className="absolute -top-10 -right-10 w-24 h-24 bg-indigo-500/10 rounded-full blur-xl group-hover:bg-indigo-500/20 transition-colors" />
            <div className="text-4xl md:text-5xl font-extrabold text-indigo-400 font-mono tracking-tight">
              {stats.mAp}%
            </div>
            <div className="mt-2 text-sm text-slate-400 font-semibold uppercase tracking-wider">
              Mean Average Precision (mAP@0.5)
            </div>
            <p className="text-xs text-slate-500 mt-2 leading-relaxed">
              Demonstrates robust average recall and precision under IoU 0.5 guidelines.
            </p>
          </div>
          <div className="glass-panel p-6 border-white/5 bg-slate-900/40 text-center relative overflow-hidden group">
            <div className="absolute -top-10 -right-10 w-24 h-24 bg-pink-500/10 rounded-full blur-xl group-hover:bg-pink-500/20 transition-colors" />
            <div className="text-4xl md:text-5xl font-extrabold text-pink-400 font-mono tracking-tight">
              {stats.f1Score}
            </div>
            <div className="mt-2 text-sm text-slate-400 font-semibold uppercase tracking-wider">
              Highest F1 Score Metric
            </div>
            <p className="text-xs text-slate-500 mt-2 leading-relaxed">
              Balancing accuracy and retrieval performance on crowded video frames.
            </p>
          </div>
          <div className="glass-panel p-6 border-white/5 bg-slate-900/40 text-center relative overflow-hidden group">
            <div className="absolute -top-10 -right-10 w-24 h-24 bg-sky-500/10 rounded-full blur-xl group-hover:bg-sky-500/20 transition-colors" />
            <div className="text-4xl md:text-5xl font-extrabold text-sky-400 font-mono tracking-tight">
              {stats.confidence}
            </div>
            <div className="mt-2 text-sm text-slate-400 font-semibold uppercase tracking-wider">
              Optimal YOLOv11 Confidence Threshold
            </div>
            <p className="text-xs text-slate-500 mt-2 leading-relaxed">
              Detections with confidence values lower than 0.421 are filtered.
            </p>
          </div>
        </div>
      </section>

      {/* Interactive Query Simulator */}
      <section id="demo" className="relative max-w-4xl mx-auto px-6 py-12 z-10">
        <div className="glass-panel border-white/10 bg-slate-900/50 p-8 shadow-2xl rounded-3xl relative overflow-hidden">
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

          <form onSubmit={handleCustomQuerySubmit} className="mt-6 flex gap-3">
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
              className="px-5 py-3 text-sm font-semibold rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white flex items-center gap-2 transition-all active:scale-95 disabled:opacity-50"
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
                  <span className="text-slate-300 italic font-mono truncate max-w-[200px]">"{parsedResult.text}"</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Tabs Showcase Section */}
      <section id="features" className="relative max-w-6xl mx-auto px-6 py-12 z-10">
        <div className="flex justify-center border-b border-white/10 mb-10">
          <div className="flex gap-8 overflow-x-auto pb-2 scrollbar-none">
            {(["garments", "architecture", "pipeline", "tech-stack"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-4 text-sm font-semibold capitalize transition-all border-b-2 whitespace-nowrap cursor-pointer ${
                  activeTab === tab
                    ? "border-indigo-500 text-indigo-400 font-bold"
                    : "border-transparent text-slate-400 hover:text-slate-200"
                }`}
              >
                {tab.replace("-", " ")}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Contents */}
        <div className="min-h-[350px]">
          {activeTab === "garments" && (
            <div className="glass-panel border-white/5 p-8 bg-slate-900/30 rounded-3xl animate-slide-up">
              <h3 className="text-xl font-bold text-slate-100 mb-2">Bangladeshi Garments Classes</h3>
              <p className="text-sm text-slate-400 mb-6 leading-relaxed">
                The detector is trained on a custom dataset of <strong>10,000 images</strong> to locate, classify, and identify <strong>39 apparel categories</strong> typical of the regional context.
              </p>
              
              <div className="flex flex-wrap gap-2">
                {GARMENT_CLASSES.map((cls) => (
                  <span
                    key={cls}
                    className="px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-slate-950 border border-white/5 text-slate-300 hover:border-indigo-500/20 hover:text-indigo-400 transition-colors"
                  >
                    {cls}
                  </span>
                ))}
              </div>
            </div>
          )}

          {activeTab === "architecture" && (
            <div className="glass-panel border-white/5 p-8 bg-slate-900/30 rounded-3xl animate-slide-up">
              <h3 className="text-xl font-bold text-slate-100 mb-6">Pipeline & Application Architecture</h3>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-7 space-y-6">
                  <div className="p-4 rounded-xl bg-slate-950 border border-white/5">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/20">Client UI</span>
                      <span className="text-sm font-semibold text-slate-200">Next.js Web Interface</span>
                    </div>
                    <p className="mt-2 text-xs text-slate-400 leading-relaxed">
                      Sends video files for processing, triggers NLP queries, displays matching video frames, and presents detections in a structured chat canvas.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-950 border border-white/5">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold px-2 py-0.5 rounded bg-pink-500/20 text-pink-300 border border-pink-500/20">Backend Gateway</span>
                      <span className="text-sm font-semibold text-slate-200">FastAPI Application</span>
                    </div>
                    <p className="mt-2 text-xs text-slate-400 leading-relaxed">
                      Manages video processing, coordinates OpenCV frame extraction, YOLOv11 model loading, color indexing, and LLM intent parsing routes.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-950 border border-white/5">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold px-2 py-0.5 rounded bg-sky-500/20 text-sky-300 border border-sky-500/20">LLM Broker</span>
                      <span className="text-sm font-semibold text-slate-200">gemini-2.5-flash-lite</span>
                    </div>
                    <p className="mt-2 text-xs text-slate-400 leading-relaxed">
                      Acts as an explicit parser which converts the query into a structured, JSON-encoded set of object-attribute pairs for strict conjunctive filtering.
                    </p>
                  </div>
                </div>

                <div className="lg:col-span-5 flex flex-col gap-4 p-6 rounded-2xl bg-slate-950 border border-white/5 text-xs font-mono text-indigo-300">
                  <div className="text-slate-400 font-bold uppercase tracking-wider mb-2 text-[10px]">Data Flow Details</div>
                  <div className="flex items-center justify-between border-b border-white/5 pb-2">
                    <span>1. Video upload</span>
                    <span className="text-slate-500">→ Client → API Gateway</span>
                  </div>
                  <div className="flex items-center justify-between border-b border-white/5 pb-2">
                    <span>2. Frame sampling</span>
                    <span className="text-slate-500">→ OpenCV Extract</span>
                  </div>
                  <div className="flex items-center justify-between border-b border-white/5 pb-2">
                    <span>3. Object classification</span>
                    <span className="text-slate-500">→ YOLOv11 Model</span>
                  </div>
                  <div className="flex items-center justify-between border-b border-white/5 pb-2">
                    <span>4. Color Extraction</span>
                    <span className="text-slate-500">→ HSV K-Means (k=3)</span>
                  </div>
                  <div className="flex items-center justify-between border-b border-white/5 pb-2">
                    <span>5. Query parsing</span>
                    <span className="text-slate-500">→ gemini-2.5-flash-lite</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>6. Conjunctive matching</span>
                    <span className="text-slate-500">→ Index Retrieval</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "pipeline" && (
            <div id="architecture" className="glass-panel border-white/5 p-8 bg-slate-900/30 rounded-3xl animate-slide-up">
              <h3 className="text-xl font-bold text-slate-100 mb-4">Proposed AI Method & CV Pipeline</h3>
              <p className="text-sm text-slate-400 leading-relaxed mb-6">
                Our approach divides video retrieval into four distinct stages: frame sampling, object classification, color extraction, and query evaluation.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-slate-950 p-5 rounded-xl border border-white/5">
                  <div className="text-indigo-400 font-bold text-lg">Stage 1</div>
                  <h4 className="font-semibold text-slate-200 mt-2">Frame Sampling</h4>
                  <p className="mt-2 text-xs text-slate-400 leading-relaxed">
                    Video frames are sampled at a rate defined as:
                    <span className="block mt-2 font-mono text-[10px] bg-slate-900 p-2 rounded text-indigo-200">
                      f_sample = max(1, ⌊T * fps⌋)
                    </span>
                    This reduces inference overhead while maintaining capture integrity.
                  </p>
                </div>
                <div className="bg-slate-950 p-5 rounded-xl border border-white/5">
                  <div className="text-pink-400 font-bold text-lg">Stage 2</div>
                  <h4 className="font-semibold text-slate-200 mt-2">YOLOv11 Detector</h4>
                  <p className="mt-2 text-xs text-slate-400 leading-relaxed">
                    Extracts bounding-box annotations, confidence scores, and class labels. Coordinates below confidence threshold of 0.421 are pruned.
                  </p>
                </div>
                <div className="bg-slate-950 p-5 rounded-xl border border-white/5">
                  <div className="text-sky-400 font-bold text-lg">Stage 3</div>
                  <h4 className="font-semibold text-slate-200 mt-2">K-Means Color</h4>
                  <p className="mt-2 text-xs text-slate-400 leading-relaxed">
                    Uses HSV-based K-Means clustering (k=3) within the cropped object region to identify dominant color characteristics.
                  </p>
                </div>
                <div className="bg-slate-950 p-5 rounded-xl border border-white/5">
                  <div className="text-emerald-400 font-bold text-lg">Stage 4</div>
                  <h4 className="font-semibold text-slate-200 mt-2">Query Parser</h4>
                  <p className="mt-2 text-xs text-slate-400 leading-relaxed">
                    Converts user sentences into structured JSON attributes, evaluating matches via strict conjunctive logic before returning frames.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === "tech-stack" && (
            <div className="glass-panel border-white/5 p-8 bg-slate-900/30 rounded-3xl animate-slide-up">
              <h3 className="text-xl font-bold text-slate-100 mb-6">Technical Stack & Core Dependencies</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="p-5 rounded-xl bg-slate-950 border border-white/5">
                  <div className="text-xs font-bold text-indigo-400 uppercase tracking-widest">Frontend Web</div>
                  <h4 className="font-bold text-slate-200 mt-2">Next.js 16 App Router</h4>
                  <p className="mt-2 text-xs text-slate-400">React 19 rendering components styled with Tailwind CSS v4 variables for glassmorphism panels.</p>
                </div>

                <div className="p-5 rounded-xl bg-slate-950 border border-white/5">
                  <div className="text-xs font-bold text-pink-400 uppercase tracking-widest">Backend Server</div>
                  <h4 className="font-bold text-slate-200 mt-2">FastAPI & Pydantic</h4>
                  <p className="mt-2 text-xs text-slate-400">Python server logic utilizing async request routing, CORS configuration policies, and concurrent threading hooks.</p>
                </div>

                <div className="p-5 rounded-xl bg-slate-950 border border-white/5">
                  <div className="text-xs font-bold text-sky-400 uppercase tracking-widest">Inference & ML</div>
                  <h4 className="font-bold text-slate-200 mt-2">YOLOv11 & gemini</h4>
                  <p className="mt-2 text-xs text-slate-400">Deep-learning computer vision models loaded into memory via PyTorch tensors, paired with Gemini intent parsers.</p>
                </div>

                <div className="p-5 rounded-xl bg-slate-950 border border-white/5">
                  <div className="text-xs font-bold text-emerald-400 uppercase tracking-widest">Video Operations</div>
                  <h4 className="font-bold text-slate-200 mt-2">OpenCV & NumPy</h4>
                  <p className="mt-2 text-xs text-slate-400">Matrix computations, pixel array reshaping, K-Means clustering, and frame-by-frame video extraction.</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Code Snippets Highlight */}
      <section className="relative max-w-5xl mx-auto px-6 py-12 z-10">
        <h2 className="text-3xl font-extrabold text-slate-100 text-center mb-8">
          Inside the Detective Pipeline
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <div className="flex items-center justify-between bg-slate-900 px-4 py-3 rounded-t-xl border border-white/10 border-b-0">
              <span className="text-xs font-bold text-slate-300">server/app/services/detector.py</span>
              <span className="text-[10px] text-pink-400 uppercase tracking-wider font-semibold">Python</span>
            </div>
            <pre className="p-5 text-xs text-indigo-300 bg-slate-950 rounded-b-xl border border-white/10 overflow-x-auto font-mono max-h-80 custom-scrollbar leading-relaxed">
{`# Run YOLOv11 object classification & localization
result = self.model(frame, verbose=False)
frame_result = result[0]
names = frame_result.names

for idx, cls_tensor in enumerate(frame_result.boxes.cls):
    confidence = float(frame_result.boxes.conf[idx].item())
    
    # Paper-aligned optimal threshold filter
    if confidence < min_confidence: # default 0.421
        continue

    cls_id = int(cls_tensor.item())
    class_name = names.get(cls_id, str(cls_id))
    bbox = frame_result.boxes.xyxy[idx].tolist()
    
    # Extract dominant HSV color characteristics
    # Inside bounding box via HSV-based K-Means (k=3)
    color_name, color_rgb = extract_dominant_color(frame, bbox)
    
    objects.append(
        Detection(
            class_name=class_name,
            confidence=confidence,
            bbox=bbox,
            color=color_name,
            color_rgb=color_rgb
        )
    )`}
            </pre>
          </div>

          <div>
            <div className="flex items-center justify-between bg-slate-900 px-4 py-3 rounded-t-xl border border-white/10 border-b-0">
              <span className="text-xs font-bold text-slate-300">server/app/main.py</span>
              <span className="text-[10px] text-sky-400 uppercase tracking-wider font-semibold">Python</span>
            </div>
            <pre className="p-5 text-xs text-sky-300 bg-slate-950 rounded-b-xl border border-white/10 overflow-x-auto font-mono max-h-80 custom-scrollbar leading-relaxed">
{`# Gemini-2.5-flash-lite query intent parser prompts
prompt = (
    "You extract computer-vision detection intents from natural language.\\n"
    "Respond ONLY with a JSON object shaped like "
    '{"pairs": [{"object": "shirt", "color": "blue"}]} '
    "for queries with specific object-attribute combinations.\\n"
    'Use lowercase singular nouns (e.g. "kameez", "hijab", "panjabi").\\n'
    "Colors: basic color names (red, blue, green, yellow, black, white, etc.).\\n"
    "Example: \\"find a person wearing a blue kameez and black hijab\\" -> "
    '{"pairs": [{"object": "kameez", "color": "blue"}, {"object": "hijab", "color": "black"}]}\\n'
    f'User request: "{query}"\\n'
    "JSON response:"
)

# API requests to Gemini model endpoint
async with httpx.AsyncClient(timeout=10) as client:
    response = await client.post(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent",
        params={"key": settings.gemini_api_key},
        json={...}
    )`}
            </pre>
          </div>
        </div>
      </section>

      {/* Footer Section */}
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
            Copyright &copy; 2026 Sherlocked. All rights reserved.
          </div>
          <div>
            Footage Analysis with Natural Language Queries Using LLM based Object-Attribute Binding
          </div>
        </div>
      </footer>
    </div>
  );
}
