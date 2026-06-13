"use client";

import { useState } from "react";

const GARMENT_CLASSES = [
  "Belt", "Blazer", "Blouse", "Burqo", "Cap", "Cardigan", "Dhoti", "Gown", "Hijab", 
  "Fatua", "Footwear", "Frock", "Gawn", "Hoodie", "Jacket", "Jeans pant", "Kameez", 
  "Koti", "Lehenga", "Lungi", "Panjabi", "Pagri", "Pajama", "Pant", "Plazo", "Polo shirt", 
  "Sando genji", "Saree", "Sherwani", "Shirt", "Shorts", "T-shirt", "Tie", "Top", "Watch"
];

export function ShowcaseTabs() {
  const [activeTab, setActiveTab] = useState<"garments" | "architecture" | "pipeline" | "tech-stack" >("garments");

  return (
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
  );
}
