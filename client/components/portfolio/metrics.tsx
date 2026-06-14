"use client";

import { useState, useEffect } from "react";

export function Metrics() {
  const [stats, setStats] = useState({
    mAp: 0,
    f1Score: 0,
    confidence: 0,
  });

  useEffect(() => {
    // Animate benchmark counters on first paint for a subtle reveal effect.
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

  return (
    <section id="research" className="relative max-w-5xl mx-auto px-4 sm:px-6 py-8 z-10">
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
  );
}
