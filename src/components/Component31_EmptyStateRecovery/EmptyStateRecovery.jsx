import React, { useState, useRef, useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { Home, Search, RefreshCw, AlertTriangle, ArrowRight } from "lucide-react";
import { useGlobalTheme } from "../../themes/ThemeContext";

export default function EmptyStateRecovery() {
  const { activeVariant, setActiveVariant, variants } = useGlobalTheme();
  const [searchQuery, setSearchQuery] = useState("");

  // Magnetic Button setup reacting to dynamic spring configs
  const buttonRef = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const springX = useSpring(x, activeVariant.springConfig || activeVariant.transition);
  const springY = useSpring(y, activeVariant.springConfig || activeVariant.transition);

  const handleMouseMove = (e) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left - rect.width / 2;
    const mouseY = e.clientY - rect.top - rect.height / 2;
    x.set(mouseX * 0.35);
    y.set(mouseY * 0.35);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const floatDuration = activeVariant.id === "cyber" 
    ? 2 
    : activeVariant.id === "brutal" 
      ? 1.5 
      : activeVariant.id === "luxury" 
        ? 8 
        : activeVariant.id === "neomorphic" 
          ? 4 
          : 5;

  return (
    <div 
      className={`min-h-screen flex items-center justify-center p-6 relative overflow-hidden transition-all duration-500 ${activeVariant.canvasClass} font-secondary`}
    >
      {/* Background grids */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

      {/* Main card */}
      <div className={`max-w-md w-full p-8 relative overflow-hidden flex flex-col items-center text-center transition-all duration-500 ${activeVariant.cardClass}`}>
        
        {/* Swatch controller overlay */}
        <div className="w-full flex justify-between items-center pb-5 border-b border-current/10 mb-8 font-mono-theme text-[9px] uppercase tracking-widest opacity-80">
          <div className="flex items-center gap-1.5 font-bold">
            <AlertTriangle size={12} />
            <span>AESTHETIC: {activeVariant.name}</span>
          </div>

          <div className="flex items-center gap-1.5 bg-black/40 px-2 py-1 rounded-lg border border-white/5">
            {variants.map((theme) => (
              <button
                key={theme.id}
                onClick={() => setActiveVariant(theme)}
                className="w-2.5 h-2.5 rounded-full cursor-pointer relative"
                style={{ backgroundColor: theme.triggerColor }}
                title={theme.name}
              />
            ))}
          </div>
        </div>

        {/* 404 Illustration with Continuous Floating Sine-Wave */}
        <motion.div
          animate={{ y: [0, -14, 0] }}
          transition={{ repeat: Infinity, duration: floatDuration, ease: "easeInOut" }}
          className="relative mb-6"
        >
          {/* Neon back glow */}
          {activeVariant.id !== "brutal" && activeVariant.id !== "mono" && (
            <div 
              className="absolute inset-0 rounded-full opacity-20 blur-2xl transition-all duration-500" 
              style={{ backgroundColor: activeVariant.triggerColor }}
            />
          )}
          
          <h1 className="text-8xl font-black tracking-tighter select-none relative z-10 flex gap-1 items-center justify-center font-primary">
            <span>4</span>
            <motion.span 
              animate={activeVariant.id === "brutal" ? {} : { rotate: 360 }}
              transition={{ repeat: Infinity, duration: 12, ease: "linear" }}
              className="inline-block text-[72px]"
              style={{ color: activeVariant.triggerColor }}
            >
              0
            </motion.span>
            <span>4</span>
          </h1>
        </motion.div>

        {/* Info */}
        <h2 className="text-sm font-black uppercase tracking-wider mb-2 font-primary">
          Channel Out of Bounds
        </h2>
        <p className="text-[11px] opacity-60 leading-relaxed px-4 mb-6 font-secondary">
          The requested coordinate cluster or node configuration is no longer broadcasting. Use active recovery hooks to restore alignment.
        </p>

        {/* Search Input Box */}
        <div className="w-full mb-8 relative">
          <div className="relative flex items-center">
            <Search size={14} className="absolute left-3.5 opacity-30 flex-shrink-0" />
            <input
              type="text"
              placeholder="Search index database..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full h-11 pl-10 pr-4 text-[11px] focus:outline-none transition-all ${activeVariant.inputClass}`}
            />
          </div>
        </div>

        {/* Magnetic Return Button wrapper */}
        <div className="w-full">
          <motion.div style={{ x: springX, y: springY }} className="w-full">
            <button
              ref={buttonRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className={`w-full py-4 text-[10px] tracking-widest font-black uppercase flex items-center justify-center gap-2 cursor-pointer transition-all duration-300 ${activeVariant.buttonClass}`}
              style={{
                borderRadius: "var(--theme-border-radius-action)"
              }}
            >
              <Home size={12} />
              <span>Return Home</span>
              <ArrowRight size={11} className="ml-0.5" />
            </button>
          </motion.div>
        </div>

        {/* Footer actions */}
        <div className="mt-8 pt-6 border-t border-current/10 w-full flex items-center justify-center gap-4 text-[8px] font-mono-theme opacity-50">
          <button className="hover:opacity-100 flex items-center gap-1.5 cursor-pointer">
            <RefreshCw size={9} /> REBOOT CONFIGURATION
          </button>
        </div>

      </div>
    </div>
  );
}
