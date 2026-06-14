import { Detection } from "@/types";
import { GlassPanel } from "@/components/ui/glass-panel";
import { SherlockedLogo } from "@/components/ui/sherlocked-logo";

type FrameMatch = {
  frameIndex: number;
  timestamp: number;
  timestampFormatted: string;
  image?: string;
  objects: Detection[];
};

interface ChatMessageProps {
  id: number;
  role: "assistant" | "user";
  content?: string;
  frames?: FrameMatch[];
  timestamp: Date;
  onFrameClick?: (frame: FrameMatch) => void;
}

// Helper functions for color badge styling
function getColorBadgeBackground(color?: string): string {
  if (!color) return "rgba(100, 116, 139, 0.3)";
  
  const colorMap: Record<string, string> = {
    red: "rgba(239, 68, 68, 0.3)",
    blue: "rgba(59, 130, 246, 0.3)",
    green: "rgba(34, 197, 94, 0.3)",
    yellow: "rgba(234, 179, 8, 0.3)",
    orange: "rgba(249, 115, 22, 0.3)",
    purple: "rgba(168, 85, 247, 0.3)",
    pink: "rgba(236, 72, 153, 0.3)",
    cyan: "rgba(6, 182, 212, 0.3)",
    white: "rgba(241, 245, 249, 0.3)",
    black: "rgba(15, 23, 42, 0.5)",
    gray: "rgba(100, 116, 139, 0.3)",
    grey: "rgba(100, 116, 139, 0.3)",
    brown: "rgba(120, 53, 15, 0.3)",
  };
  
  return colorMap[color.toLowerCase()] || "rgba(100, 116, 139, 0.3)";
}

function getColorBadgeBorder(color?: string): string {
  if (!color) return "rgba(148, 163, 184, 0.5)";
  
  const colorMap: Record<string, string> = {
    red: "rgba(239, 68, 68, 0.6)",
    blue: "rgba(59, 130, 246, 0.6)",
    green: "rgba(34, 197, 94, 0.6)",
    yellow: "rgba(234, 179, 8, 0.6)",
    orange: "rgba(249, 115, 22, 0.6)",
    purple: "rgba(168, 85, 247, 0.6)",
    pink: "rgba(236, 72, 153, 0.6)",
    cyan: "rgba(6, 182, 212, 0.6)",
    white: "rgba(241, 245, 249, 0.6)",
    black: "rgba(71, 85, 105, 0.6)",
    gray: "rgba(148, 163, 184, 0.6)",
    grey: "rgba(148, 163, 184, 0.6)",
    brown: "rgba(146, 64, 14, 0.6)",
  };
  
  return colorMap[color.toLowerCase()] || "rgba(148, 163, 184, 0.5)";
}

function getColorBadgeText(color?: string): string {
  if (!color) return "#e2e8f0";
  
  const colorMap: Record<string, string> = {
    red: "#fecaca",
    blue: "#bfdbfe",
    green: "#bbf7d0",
    yellow: "#fef08a",
    orange: "#fed7aa",
    purple: "#e9d5ff",
    pink: "#fbcfe8",
    cyan: "#a5f3fc",
    white: "#f1f5f9",
    black: "#cbd5e1",
    gray: "#e2e8f0",
    grey: "#e2e8f0",
    brown: "#fcd34d",
  };
  
  return colorMap[color.toLowerCase()] || "#e2e8f0";
}

export function ChatMessage({
  role,
  content,
  frames,
  timestamp,
  onFrameClick,
}: ChatMessageProps) {
  const isUser = role === "user";

  return (
    <div
      className={`flex items-start gap-2 sm:gap-4 animate-slide-up ${
        isUser ? "flex-row-reverse" : ""
      }`}
    >
      {/* Avatar */}
      <div
        className={`shrink-0 flex items-center justify-center ${
          isUser
            ? "w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg border border-white/10"
            : "w-8 h-8 sm:w-10 sm:h-10"
        }`}
      >
        {isUser ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            className="h-4 w-4 sm:h-5 sm:w-5 text-white"
          >
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
        ) : (
          <div className="overflow-hidden rounded-full">
            <SherlockedLogo size={30} className="sm:hidden" />
            <SherlockedLogo size={36} className="hidden sm:block" />
          </div>
        )}
      </div>

      {/* Message Content */}
      <div className={`flex flex-col max-w-[88%] sm:max-w-[85%] min-w-0 ${isUser ? "items-end" : "items-start"}`}>
        <GlassPanel
          intensity={isUser ? "high" : "medium"}
          className={`px-3 py-3 sm:px-5 sm:py-4 ${
            isUser
              ? "bg-indigo-600/20 border-indigo-500/30 rounded-tr-none"
              : "rounded-tl-none bg-slate-800/40"
          }`}
        >
          {content && (
            <p className="text-[13px] sm:text-sm leading-relaxed whitespace-pre-wrap break-words text-slate-100 font-medium">
              {content}
            </p>
          )}

          {/* Frame Gallery */}
          {frames && frames.length > 0 && (
            <div className="mt-3 sm:mt-4 grid grid-cols-2 sm:grid-cols-3 gap-1.5 sm:gap-2">
              {frames.map((frame) => (
                <div
                  key={`${frame.frameIndex}-${frame.timestamp}`}
                  className="group relative overflow-hidden rounded-lg border border-white/10 bg-black/40 cursor-pointer"
                  onClick={() => onFrameClick?.(frame)}
                >
                  {frame.image ? (
                    <img
                      src={`data:image/jpeg;base64,${frame.image}`}
                      alt={`Frame ${frame.frameIndex}`}
                      className="h-20 sm:h-28 w-full object-cover transition-opacity group-hover:opacity-80"
                    />
                  ) : (
                    <div className="flex h-20 sm:h-28 w-full items-center justify-center text-[10px] sm:text-xs text-slate-500">
                      No preview
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-60" />
                  
                  {/* Timestamp */}
                  <div className="absolute left-2 bottom-2 text-xs font-bold text-indigo-300">
                    {frame.timestampFormatted}
                  </div>
                  
                  {/* Color badges */}
                  {frame.objects.some(obj => obj.color) && (
                    <div className="absolute top-2 right-2 flex flex-wrap gap-1 justify-end max-w-[80%]">
                      {Array.from(new Set(frame.objects.map(obj => obj.color).filter(Boolean))).map((color) => (
                        <span
                          key={color}
                          className="px-2 py-0.5 text-[10px] font-semibold rounded-full border backdrop-blur-sm"
                          style={{
                            backgroundColor: getColorBadgeBackground(color),
                            borderColor: getColorBadgeBorder(color),
                            color: getColorBadgeText(color),
                          }}
                        >
                          {color}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </GlassPanel>

        <span className="text-xs text-slate-500 mt-2 px-1">
          {timestamp.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
      </div>
    </div>
  );
}
