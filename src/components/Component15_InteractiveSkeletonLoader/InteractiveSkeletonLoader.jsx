import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Server, Cpu, Activity, Clock, RefreshCw, 
  CheckCircle, AlertTriangle, ArrowUpRight, ArrowDownRight, Globe
} from "lucide-react";

import { useGlobalTheme } from "../../themes/ThemeContext";

// Helper skeleton placeholder components for layout cleanliness
const SkeletonShape = ({ className, skeletonBg }) => (
  <div 
    className={`sync-shimmer rounded ${className}`} 
    style={{ backgroundColor: skeletonBg }}
  />
);

export default function InteractiveSkeletonLoader() {
  const { activeVariant } = useGlobalTheme();
  const activeTheme = React.useMemo(() => {
    const hex = activeVariant.triggerColor || "#10b981";
    let rgb = "16, 185, 129";
    const match = hex.match(/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i);
    if (match) {
      rgb = `${parseInt(match[1], 16)}, ${parseInt(match[2], 16)}, ${parseInt(match[3], 16)}`;
    }
    return {
      id: activeVariant.id,
      name: activeVariant.name,
      color: hex,
      bg: "bg-[var(--theme-primary)]",
      hoverBg: "hover:opacity-90",
      text: "text-[var(--theme-primary)]",
      border: "border-white/10",
      circleBg: hex,
      skeletonBg: `rgba(${rgb}, 0.1)`,
      shimmerMid: `rgba(${rgb}, 0.2)`,
      shimmerLight: `rgba(${rgb}, 0.45)`,
      accentBg: `rgba(${rgb}, 0.1)`,
      glow: "shadow-[var(--theme-primary)]/10"
    };
  }, [activeVariant]);

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
      className={`min-h-screen flex flex-col justify-start p-4 md:p-8 transition-colors duration-500  pt-[120px] pb-8 sm:pt-[120px] sm:pb-8 ${activeVariant.canvasClass}`}
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
        <div className={`p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 ${activeVariant.cardClass}`}>
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-mono tracking-widest opacity-40 uppercase block">
              Core Performance Monitoring
            </span>
            <h1 
              className="text-xl md:text-2xl font-bold tracking-tight"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Interactive Skeleton Loader
            </h1>
            <p className="text-xs opacity-45 max-w-xl">
              Toggle loading states to observe the seamless crossfade. The light shimmer runs on a synced viewport mask grid to maintain continuous, aligned light beams.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 flex-shrink-0">
            {/* Load State Toggle Button */}
            <button
              onClick={() => setIsLoading(prev => !prev)}
              className={`px-4 py-2.5 rounded-xl font-bold uppercase tracking-wider text-[10px] cursor-pointer transition-all border flex items-center gap-1.5 active:scale-95 duration-150 ${
                isLoading 
                  ? "bg-current/5 border-current/10 hover:bg-current/10" 
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
                <div className={`p-5 flex flex-col justify-between h-[120px] ${activeVariant.cardClass}`}>
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
                <div className={`p-5 flex flex-col justify-between h-[120px] ${activeVariant.cardClass}`}>
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
                <div className={`p-5 flex flex-col justify-between h-[120px] ${activeVariant.cardClass}`}>
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
                <div className={`p-6 flex flex-col justify-between min-h-[360px] ${activeVariant.cardClass}`}>
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col gap-2">
                      <SkeletonShape className="h-4.5 w-44" skeletonBg={activeTheme.skeletonBg} />
                      <SkeletonShape className="h-3 w-64" skeletonBg={activeTheme.skeletonBg} />
                    </div>
                    <SkeletonShape className="h-6 w-20" skeletonBg={activeTheme.skeletonBg} />
                  </div>
                  
                  {/* SVG Chart Skeleton Gridlines */}
                  <div className="flex-1 flex flex-col justify-between py-8">
                    <div className="h-px w-full bg-current/5" />
                    <div className="h-px w-full bg-current/5" />
                    <div className="h-px w-full bg-current/5" />
                    <div className="h-px w-full bg-current/5" />
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
                <div className={`p-5 flex flex-col justify-between min-h-[360px] ${activeVariant.cardClass}`}>
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
                className="grid grid-cols-1 md:grid-cols-12 gap-6 w-full absolute inset-0"
              >
                
                {/* Stats Card 1 (Loaded) */}
                <motion.div 
                  whileHover={{ y: -3 }}
                  className={`p-5 flex flex-col justify-between h-[120px] transition-colors ${activeVariant.cardClass}`}
                >
                  <div className="flex justify-between items-center opacity-50 text-xs font-bold tracking-wide uppercase">
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
                  className={`p-5 flex flex-col justify-between h-[120px] transition-colors ${activeVariant.cardClass}`}
                >
                  <div className="flex justify-between items-center opacity-50 text-xs font-bold tracking-wide uppercase">
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
                  className={`p-5 flex flex-col justify-between h-[120px] transition-colors ${activeVariant.cardClass}`}
                >
                  <div className="flex justify-between items-center opacity-50 text-xs font-bold tracking-wide uppercase">
                    <span>Cluster Nodes</span>
                    <Server size={15} className={activeTheme.text} />
                  </div>
                  <div className="flex flex-col mt-2">
                    <span className="text-2xl font-extrabold tracking-tight">24 / 24 Online</span>
                    <span className="text-[10px] opacity-45 font-bold mt-0.5 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> 100% operational SLA
                    </span>
                  </div>
                </motion.div>

                {/* Main Visual Metric Chart (Loaded - 8 Columns) */}
                <motion.div 
                  whileHover={{ y: -3 }}
                  className={`p-6 flex flex-col justify-between min-h-[360px] transition-colors ${activeVariant.cardClass}`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-sm font-bold tracking-wide">Performance Over Time</h3>
                      <span className="text-[10px] opacity-40 block mt-0.5">Vite Compiler bundling and assembly latency index</span>
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

                  <div className="flex justify-between items-center text-[10px] opacity-30 font-mono font-bold mt-2">
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
                  className={`p-5 flex flex-col justify-between min-h-[360px] transition-colors ${activeVariant.cardClass}`}
                >
                  <div>
                    <h3 className="text-sm font-bold tracking-wide">Deployment Pipeline</h3>
                    <span className="text-[10px] opacity-40 block mt-0.5">Recent system web events</span>
                  </div>

                  <div className="flex-1 flex flex-col gap-4 py-6 justify-center">
                    {/* Item row 1 */}
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                        <CheckCircle size={15} />
                      </div>
                      <div className="flex-grow min-w-0">
                        <span className="text-xs font-bold opacity-90 truncate block">Auth Token Refreshed</span>
                        <span className="text-[10px] opacity-40 font-mono block">GET /v1/users/auth · 12ms</span>
                      </div>
                    </div>
                    {/* Item row 2 */}
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                        <CheckCircle size={15} />
                      </div>
                      <div className="flex-grow min-w-0">
                        <span className="text-xs font-bold opacity-90 truncate block">Postgres Write Committed</span>
                        <span className="text-[10px] opacity-40 font-mono block">POST /v1/transactions · 84ms</span>
                      </div>
                    </div>
                    {/* Item row 3 */}
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400">
                        <AlertTriangle size={15} />
                      </div>
                      <div className="flex-grow min-w-0">
                        <span className="text-xs font-bold opacity-90 truncate block">Stripe Webhook Delayed</span>
                        <span className="text-[10px] opacity-40 font-mono block">POST /v1/webhooks/stripe · 420ms</span>
                      </div>
                    </div>
                    {/* Item row 4 */}
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                        <CheckCircle size={15} />
                      </div>
                      <div className="flex-grow min-w-0">
                        <span className="text-xs font-bold opacity-90 truncate block">CDN Flush Complete</span>
                        <span className="text-[10px] opacity-40 font-mono block">DELETE /v1/deployments · 5ms</span>
                      </div>
                    </div>
                  </div>

                  <button className={`w-full py-2.5 rounded-xl font-bold uppercase tracking-wider text-[10px] cursor-pointer relative overflow-hidden transition-all duration-200 active:scale-98 ${activeVariant.buttonClass} ${activeTheme.glow} shadow-md`}>
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
