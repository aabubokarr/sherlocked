import Link from "next/link";
import { GlassPanel } from "@/components/ui/glass-panel";

interface HeaderProps {
  processedFrames?: number;
  detectionsFound?: number;
}

export function Header({ processedFrames, detectionsFound }: HeaderProps) {
  return (
    <GlassPanel intensity="medium" className="mx-6 mt-4 px-6 py-4 flex items-center justify-between z-10 rounded-2xl border-white/10 bg-black/20">
      <div className="flex items-center gap-3">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-all">
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
          <h1 className="text-xl font-bold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent group-hover:to-white transition-all">
            Sherlocked
          </h1>
        </Link>
      </div>

      <div className="flex items-center gap-4">
        {/* Navigation Link back to Portfolio Homepage */}
        <Link 
          href="/" 
          className="text-xs font-semibold text-slate-300 hover:text-white px-3.5 py-2 rounded-xl border border-white/5 hover:border-indigo-500/30 bg-white/5 hover:bg-indigo-950/20 transition-all duration-300 flex items-center gap-2 shadow-sm"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            className="h-3.5 w-3.5 text-indigo-400"
          >
            <path d="m15 18-6-6 6-6" />
          </svg>
          Back to Portfolio
        </Link>

        {(processedFrames !== undefined || detectionsFound !== undefined) && (
          <div className="flex items-center gap-3 text-xs font-medium border-l border-white/10 pl-3">
            {processedFrames !== undefined && (
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/5">
                <span className="text-indigo-400 font-bold">{processedFrames}</span>
                <span className="text-slate-400">frames</span>
              </div>
            )}
            {detectionsFound !== undefined && (
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/5">
                <span className="text-pink-400 font-bold">{detectionsFound}</span>
                <span className="text-slate-400">detections</span>
              </div>
            )}
          </div>
        )}
      </div>
    </GlassPanel>
  );
}
