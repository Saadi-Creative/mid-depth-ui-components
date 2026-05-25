import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Server, Cpu, Activity, Clock, RefreshCw, 
  CheckCircle, AlertTriangle, ArrowUpRight, ArrowDownRight, Globe
} from "lucide-react";

// Theme swatches
const THEMES = [
  { 
    id: "emerald", 
    name: "Emerald", 
    color: "#10b981", 
    bg: "bg-emerald-500", 
    hoverBg: "hover:bg-emerald-600",
    text: "text-emerald-400",
    border: "border-emerald-500/15",
    circleBg: "#10b981", 
    skeletonBg: "rgba(16, 185, 129, 0.1)",
    shimmerMid: "rgba(16, 185, 129, 0.2)",
    shimmerLight: "rgba(16, 185, 129, 0.45)",
    accentBg: "bg-emerald-500/10",
    glow: "shadow-emerald-500/10"
  },
  { 
    id: "sapphire", 
    name: "Sapphire", 
    color: "#3b82f6", 
    bg: "bg-blue-500", 
    hoverBg: "hover:bg-blue-600",
    text: "text-blue-400",
    border: "border-blue-500/15",
    circleBg: "#3b82f6", 
    skeletonBg: "rgba(59, 130, 246, 0.1)",
    shimmerMid: "rgba(59, 130, 246, 0.2)",
    shimmerLight: "rgba(59, 130, 246, 0.45)",
    accentBg: "bg-blue-500/10",
    glow: "shadow-blue-500/10"
  },
  { 
    id: "amethyst", 
    name: "Amethyst", 
    color: "#8b5cf6", 
    bg: "bg-violet-500", 
    hoverBg: "hover:bg-violet-600",
    text: "text-violet-400",
    border: "border-violet-500/15",
    circleBg: "#8b5cf6", 
    skeletonBg: "rgba(139, 92, 246, 0.1)",
    shimmerMid: "rgba(139, 92, 246, 0.2)",
    shimmerLight: "rgba(139, 92, 246, 0.45)",
    accentBg: "bg-violet-500/10",
    glow: "shadow-violet-500/10"
  },
  { 
    id: "amber", 
    name: "Amber", 
    color: "#f59e0b", 
    bg: "bg-amber-500", 
    hoverBg: "hover:bg-amber-600",
    text: "text-amber-400",
    border: "border-amber-500/15",
    circleBg: "#f59e0b", 
    skeletonBg: "rgba(245, 158, 11, 0.1)",
    shimmerMid: "rgba(245, 158, 11, 0.2)",
    shimmerLight: "rgba(245, 158, 11, 0.45)",
    accentBg: "bg-amber-500/10",
    glow: "shadow-amber-500/10"
  },
  { 
    id: "ruby", 
    name: "Ruby", 
    color: "#ef4444", 
    bg: "bg-red-500", 
    hoverBg: "hover:bg-red-600",
    text: "text-red-400",
    border: "border-red-500/15",
    circleBg: "#ef4444", 
    skeletonBg: "rgba(239, 68, 68, 0.1)",
    shimmerMid: "rgba(239, 68, 68, 0.2)",
    shimmerLight: "rgba(239, 68, 68, 0.45)",
    accentBg: "bg-red-500/10",
    glow: "shadow-red-500/10"
  },
];

// Helper skeleton placeholder components for layout cleanliness
const SkeletonShape = ({ className, skeletonBg }) => (
  <div 
    className={`sync-shimmer rounded ${className}`} 
    style={{ backgroundColor: skeletonBg }}
  />
);

export default function InteractiveSkeletonLoader() {
  const [activeTheme, setActiveTheme] = useState(THEMES[0]);
  const [isLoading, setIsLoading] = useState(true);

  // Auto-load trigger toggle for mock visual demonstration
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div 
      className="min-h-screen flex flex-col justify-start p-4 md:p-8" 
      style={{ background: "#060810", fontFamily: "'Inter', sans-serif" }}
    >
      {/* Synchronized viewport-fixed background shimmer style block */}
      <style>{`
        @keyframes global-shimmer-${activeTheme.id} {
          0% { background-position: 180% 0; }
          100% { background-position: -80% 0; }
        }
        .sync-shimmer {
          background: linear-gradient(
            110deg,
            ${activeTheme.skeletonBg} 35%,
            ${activeTheme.shimmerMid} 48%,
            ${activeTheme.shimmerLight} 50%,
            ${activeTheme.shimmerMid} 52%,
            ${activeTheme.skeletonBg} 65%
          );
          background-size: 200% 100%;
          background-attachment: fixed;
          animation: global-shimmer-${activeTheme.id} 2.2s linear infinite;
        }
      `}</style>

      <div className="w-full max-w-5xl mx-auto flex flex-col gap-6">
        
        {/* Header Controls Bento Block */}
        <div className="bg-[#0a0d1a] border border-white/5 rounded-2xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-[inset_0_2px_4px_rgba(0,0,0,0.6)]">
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-mono tracking-widest text-white/40 uppercase block">
              Core Performance Monitoring
            </span>
            <h1 
              className="text-xl md:text-2xl font-bold text-white tracking-tight"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Interactive Skeleton Loader
            </h1>
            <p className="text-xs text-white/45 max-w-xl">
              Toggle loading states to observe the seamless crossfade. The light shimmer runs on a synced viewport mask grid to maintain continuous, aligned light beams.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 flex-shrink-0">
            {/* Swatches selector */}
            <div className="flex flex-col gap-1.5">
              <span className="text-[9px] uppercase tracking-widest text-white/30 font-bold">
                Shimmer Theme Tint
              </span>
              <div className="flex items-center gap-2">
                {THEMES.map(theme => (
                  <button
                    key={theme.id}
                    onClick={() => setActiveTheme(theme)}
                    className="w-5 h-5 rounded-full cursor-pointer relative flex items-center justify-center transition-transform active:scale-90"
                    style={{ backgroundColor: theme.circleBg }}
                    aria-label={`Switch Shimmer to ${theme.name}`}
                  >
                    {activeTheme.id === theme.id && (
                      <motion.div
                        layoutId="active-shimmer-border"
                        className="absolute -inset-1 rounded-full border border-current opacity-80"
                        style={{ color: theme.color }}
                        transition={{ type: "spring", stiffness: 350, damping: 28 }}
                      />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Load State Toggle Button */}
            <button
              onClick={() => setIsLoading(prev => !prev)}
              className={`px-4 py-2.5 rounded-xl font-bold uppercase tracking-wider text-[10px] text-white cursor-pointer transition-all border flex items-center gap-1.5 active:scale-95 duration-150 ${
                isLoading 
                  ? "bg-white/5 border-white/10 hover:bg-white/10" 
                  : `${activeTheme.bg} ${activeTheme.hoverBg} border-transparent ${activeTheme.glow} shadow-md`
              }`}
            >
              <RefreshCw size={12} className={isLoading ? "animate-spin" : ""} />
              {isLoading ? "Simulating Load..." : "Reset to Loading"}
            </button>
          </div>
        </div>

        {/* Outer Dashboard Bento Grid Layout */}
        <div className="relative w-full min-h-[520px]">
          <AnimatePresence mode="wait">
            
            {/* SKELETON PLACEHOLDER LAYOUT */}
            {isLoading ? (
              <motion.div
                key="skeleton-layout"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.22 }}
                className="grid grid-cols-1 md:grid-cols-12 gap-6 w-full absolute inset-0"
              >
                
                {/* Stats Card 1 (Skeleton) */}
                <div className="md:col-span-4 bg-[#0a0d1a] border border-white/5 rounded-2xl p-5 flex flex-col justify-between h-[120px] shadow-[inset_0_2px_4px_rgba(0,0,0,0.6)]">
                  <div className="flex justify-between items-start">
                    <SkeletonShape className="h-4 w-28" skeletonBg={activeTheme.skeletonBg} />
                    <SkeletonShape className="h-5 w-5 rounded-lg" skeletonBg={activeTheme.skeletonBg} />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <SkeletonShape className="h-7 w-36" skeletonBg={activeTheme.skeletonBg} />
                    <SkeletonShape className="h-3 w-16" skeletonBg={activeTheme.skeletonBg} />
                  </div>
                </div>

                {/* Stats Card 2 (Skeleton) */}
                <div className="md:col-span-4 bg-[#0a0d1a] border border-white/5 rounded-2xl p-5 flex flex-col justify-between h-[120px] shadow-[inset_0_2px_4px_rgba(0,0,0,0.6)]">
                  <div className="flex justify-between items-start">
                    <SkeletonShape className="h-4 w-32" skeletonBg={activeTheme.skeletonBg} />
                    <SkeletonShape className="h-5 w-5 rounded-lg" skeletonBg={activeTheme.skeletonBg} />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <SkeletonShape className="h-7 w-20" skeletonBg={activeTheme.skeletonBg} />
                    <SkeletonShape className="h-3 w-24" skeletonBg={activeTheme.skeletonBg} />
                  </div>
                </div>

                {/* Stats Card 3 (Skeleton) */}
                <div className="md:col-span-4 bg-[#0a0d1a] border border-white/5 rounded-2xl p-5 flex flex-col justify-between h-[120px] shadow-[inset_0_2px_4px_rgba(0,0,0,0.6)]">
                  <div className="flex justify-between items-start">
                    <SkeletonShape className="h-4 w-24" skeletonBg={activeTheme.skeletonBg} />
                    <SkeletonShape className="h-5 w-5 rounded-lg" skeletonBg={activeTheme.skeletonBg} />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <SkeletonShape className="h-7 w-24" skeletonBg={activeTheme.skeletonBg} />
                    <SkeletonShape className="h-3 w-32" skeletonBg={activeTheme.skeletonBg} />
                  </div>
                </div>

                {/* Main Visual Metric Chart (Skeleton - 8 Columns) */}
                <div className="md:col-span-8 bg-[#0a0d1a] border border-white/5 rounded-2xl p-6 flex flex-col justify-between min-h-[360px] shadow-[inset_0_2px_4px_rgba(0,0,0,0.6)]">
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col gap-2">
                      <SkeletonShape className="h-4.5 w-44" skeletonBg={activeTheme.skeletonBg} />
                      <SkeletonShape className="h-3 w-64" skeletonBg={activeTheme.skeletonBg} />
                    </div>
                    <SkeletonShape className="h-6 w-20" skeletonBg={activeTheme.skeletonBg} />
                  </div>
                  
                  {/* SVG Chart Skeleton Gridlines */}
                  <div className="flex-1 flex flex-col justify-between py-8">
                    <div className="h-px w-full bg-white/[0.02]" />
                    <div className="h-px w-full bg-white/[0.02]" />
                    <div className="h-px w-full bg-white/[0.02]" />
                    <div className="h-px w-full bg-white/[0.02]" />
                  </div>

                  <div className="flex justify-between items-center pt-2">
                    <SkeletonShape className="h-3 w-12" skeletonBg={activeTheme.skeletonBg} />
                    <SkeletonShape className="h-3 w-12" skeletonBg={activeTheme.skeletonBg} />
                    <SkeletonShape className="h-3 w-12" skeletonBg={activeTheme.skeletonBg} />
                    <SkeletonShape className="h-3 w-12" skeletonBg={activeTheme.skeletonBg} />
                    <SkeletonShape className="h-3 w-12" skeletonBg={activeTheme.skeletonBg} />
                  </div>
                </div>

                {/* Recent Logs List (Skeleton - 4 Columns) */}
                <div className="md:col-span-4 bg-[#0a0d1a] border border-white/5 rounded-2xl p-5 flex flex-col justify-between min-h-[360px] shadow-[inset_0_2px_4px_rgba(0,0,0,0.6)]">
                  <div className="flex flex-col gap-2">
                    <SkeletonShape className="h-4.5 w-28" skeletonBg={activeTheme.skeletonBg} />
                    <SkeletonShape className="h-3 w-40" skeletonBg={activeTheme.skeletonBg} />
                  </div>

                  <div className="flex-1 flex flex-col gap-5.5 py-6">
                    {/* Item row 1 */}
                    <div className="flex items-center gap-3">
                      <SkeletonShape className="h-8 w-8 rounded-lg flex-shrink-0" skeletonBg={activeTheme.skeletonBg} />
                      <div className="flex-1 flex flex-col gap-1.5">
                        <SkeletonShape className="h-3.5 w-32" skeletonBg={activeTheme.skeletonBg} />
                        <SkeletonShape className="h-2.5 w-16" skeletonBg={activeTheme.skeletonBg} />
                      </div>
                    </div>
                    {/* Item row 2 */}
                    <div className="flex items-center gap-3">
                      <SkeletonShape className="h-8 w-8 rounded-lg flex-shrink-0" skeletonBg={activeTheme.skeletonBg} />
                      <div className="flex-1 flex flex-col gap-1.5">
                        <SkeletonShape className="h-3.5 w-24" skeletonBg={activeTheme.skeletonBg} />
                        <SkeletonShape className="h-2.5 w-20" skeletonBg={activeTheme.skeletonBg} />
                      </div>
                    </div>
                    {/* Item row 3 */}
                    <div className="flex items-center gap-3">
                      <SkeletonShape className="h-8 w-8 rounded-lg flex-shrink-0" skeletonBg={activeTheme.skeletonBg} />
                      <div className="flex-1 flex flex-col gap-1.5">
                        <SkeletonShape className="h-3.5 w-40" skeletonBg={activeTheme.skeletonBg} />
                        <SkeletonShape className="h-2.5 w-12" skeletonBg={activeTheme.skeletonBg} />
                      </div>
                    </div>
                    {/* Item row 4 */}
                    <div className="flex items-center gap-3">
                      <SkeletonShape className="h-8 w-8 rounded-lg flex-shrink-0" skeletonBg={activeTheme.skeletonBg} />
                      <div className="flex-1 flex flex-col gap-1.5">
                        <SkeletonShape className="h-3.5 w-20" skeletonBg={activeTheme.skeletonBg} />
                        <SkeletonShape className="h-2.5 w-16" skeletonBg={activeTheme.skeletonBg} />
                      </div>
                    </div>
                  </div>

                  <SkeletonShape className="h-7 w-full rounded-xl" skeletonBg={activeTheme.skeletonBg} />
                </div>

              </motion.div>
            ) : (
              <motion.div
                key="data-layout"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.22 }}
                className="grid grid-cols-1 md:grid-cols-12 gap-6 w-full absolute inset-0 text-white"
              >
                
                {/* Stats Card 1 (Loaded) */}
                <motion.div 
                  whileHover={{ y: -3 }}
                  className="md:col-span-4 bg-[#0a0d1a] border border-white/5 rounded-2xl p-5 flex flex-col justify-between h-[120px] transition-colors hover:border-white/10"
                >
                  <div className="flex justify-between items-center text-white/50 text-xs font-bold tracking-wide uppercase">
                    <span>Network Bandwidth</span>
                    <Globe size={15} className={activeTheme.text} />
                  </div>
                  <div className="flex flex-col mt-2">
                    <span className="text-2xl font-extrabold tracking-tight">642.5 MB/s</span>
                    <span className="text-[10px] text-emerald-400 font-bold flex items-center gap-0.5 mt-0.5">
                      <ArrowUpRight size={12} /> +12.4% vs last hr
                    </span>
                  </div>
                </motion.div>

                {/* Stats Card 2 (Loaded) */}
                <motion.div 
                  whileHover={{ y: -3 }}
                  className="md:col-span-4 bg-[#0a0d1a] border border-white/5 rounded-2xl p-5 flex flex-col justify-between h-[120px] transition-colors hover:border-white/10"
                >
                  <div className="flex justify-between items-center text-white/50 text-xs font-bold tracking-wide uppercase">
                    <span>System CPU Load</span>
                    <Cpu size={15} className={activeTheme.text} />
                  </div>
                  <div className="flex flex-col mt-2">
                    <span className="text-2xl font-extrabold tracking-tight">18.4%</span>
                    <span className="text-[10px] text-emerald-400 font-bold flex items-center gap-0.5 mt-0.5">
                      <ArrowDownRight size={12} className="rotate-180" /> -3.1% cooldown
                    </span>
                  </div>
                </motion.div>

                {/* Stats Card 3 (Loaded) */}
                <motion.div 
                  whileHover={{ y: -3 }}
                  className="md:col-span-4 bg-[#0a0d1a] border border-white/5 rounded-2xl p-5 flex flex-col justify-between h-[120px] transition-colors hover:border-white/10"
                >
                  <div className="flex justify-between items-center text-white/50 text-xs font-bold tracking-wide uppercase">
                    <span>Cluster Nodes</span>
                    <Server size={15} className={activeTheme.text} />
                  </div>
                  <div className="flex flex-col mt-2">
                    <span className="text-2xl font-extrabold tracking-tight">24 / 24 Online</span>
                    <span className="text-[10px] text-white/45 font-bold mt-0.5 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> 100% operational SLA
                    </span>
                  </div>
                </motion.div>

                {/* Main Visual Metric Chart (Loaded - 8 Columns) */}
                <motion.div 
                  whileHover={{ y: -3 }}
                  className="md:col-span-8 bg-[#0a0d1a] border border-white/5 rounded-2xl p-6 flex flex-col justify-between min-h-[360px] transition-colors hover:border-white/10"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-sm font-bold text-white/95 tracking-wide">Performance Over Time</h3>
                      <span className="text-[10px] text-white/40 block mt-0.5">Vite Compiler bundling and assembly latency index</span>
                    </div>
                    <span className={`text-[10px] font-mono px-2 py-1 rounded-lg border uppercase tracking-wider font-bold ${activeTheme.text} ${activeTheme.border} ${activeTheme.accentBg}`}>
                      Live Node
                    </span>
                  </div>

                  {/* SVG Chart Content */}
                  <div className="flex-1 min-h-[180px] relative mt-4">
                    <svg className="w-full h-full overflow-visible" viewBox="0 0 500 150">
                      {/* Gridlines */}
                      <line x1="0" y1="30" x2="500" y2="30" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
                      <line x1="0" y1="75" x2="500" y2="75" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
                      <line x1="0" y1="120" x2="500" y2="120" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />

                      {/* Accent Area Fill */}
                      <path
                        d="M0 150 L0 110 Q100 60 200 130 T400 50 L500 20 L500 150 Z"
                        fill={`url(#area-gradient-${activeTheme.id})`}
                        opacity="0.12"
                      />

                      {/* Accent Line */}
                      <motion.path
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        d="M0 110 Q100 60 200 130 T400 50 L500 20"
                        fill="none"
                        stroke={activeTheme.color}
                        strokeWidth="2.5"
                      />

                      {/* Gradient definition */}
                      <defs>
                        <linearGradient id={`area-gradient-${activeTheme.id}`} x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor={activeTheme.color} />
                          <stop offset="100%" stopColor="transparent" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>

                  <div className="flex justify-between items-center text-[10px] text-white/30 font-mono font-bold mt-2">
                    <span>12:00</span>
                    <span>13:00</span>
                    <span>14:00</span>
                    <span>15:00</span>
                    <span>16:00</span>
                  </div>
                </motion.div>

                {/* Recent Logs List (Loaded - 4 Columns) */}
                <motion.div 
                  whileHover={{ y: -3 }}
                  className="md:col-span-4 bg-[#0a0d1a] border border-white/5 rounded-2xl p-5 flex flex-col justify-between min-h-[360px] transition-colors hover:border-white/10"
                >
                  <div>
                    <h3 className="text-sm font-bold text-white/95 tracking-wide">Deployment Pipeline</h3>
                    <span className="text-[10px] text-white/40 block mt-0.5">Recent system web events</span>
                  </div>

                  <div className="flex-1 flex flex-col gap-4 py-6 justify-center">
                    {/* Item row 1 */}
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                        <CheckCircle size={15} />
                      </div>
                      <div className="flex-grow min-w-0">
                        <span className="text-xs font-bold text-white/90 truncate block">Auth Token Refreshed</span>
                        <span className="text-[10px] text-white/40 font-mono block">GET /v1/users/auth · 12ms</span>
                      </div>
                    </div>
                    {/* Item row 2 */}
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                        <CheckCircle size={15} />
                      </div>
                      <div className="flex-grow min-w-0">
                        <span className="text-xs font-bold text-white/90 truncate block">Postgres Write Committed</span>
                        <span className="text-[10px] text-white/40 font-mono block">POST /v1/transactions · 84ms</span>
                      </div>
                    </div>
                    {/* Item row 3 */}
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400">
                        <AlertTriangle size={15} />
                      </div>
                      <div className="flex-grow min-w-0">
                        <span className="text-xs font-bold text-white/90 truncate block">Stripe Webhook Delayed</span>
                        <span className="text-[10px] text-white/40 font-mono block">POST /v1/webhooks/stripe · 420ms</span>
                      </div>
                    </div>
                    {/* Item row 4 */}
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                        <CheckCircle size={15} />
                      </div>
                      <div className="flex-grow min-w-0">
                        <span className="text-xs font-bold text-white/90 truncate block">CDN Flush Complete</span>
                        <span className="text-[10px] text-white/40 font-mono block">DELETE /v1/deployments · 5ms</span>
                      </div>
                    </div>
                  </div>

                  <button className={`w-full py-2.5 rounded-xl font-bold uppercase tracking-wider text-[10px] text-black cursor-pointer relative overflow-hidden transition-all duration-200 active:scale-98 ${activeTheme.bg} ${activeTheme.hoverBg} ${activeTheme.glow} shadow-md`}>
                    View Cluster Console
                  </button>
                </motion.div>

              </motion.div>
            )}

          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}
