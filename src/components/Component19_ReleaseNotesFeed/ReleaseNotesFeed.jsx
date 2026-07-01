import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Terminal } from "lucide-react";
import { useGlobalTheme } from "../../themes/ThemeContext";

// Mock release feed items
const RELEASES = [
  {
    version: "v2.5.0",
    date: "May 26, 2026",
    title: "Quantum Physics Animation Update",
    summary: "Introducing modular vector systems and enhanced Spring physics layouts for grid transitions.",
    tags: [
      { label: "Feature", type: "feat" },
      { label: "Performance", type: "perf" }
    ],
    details: [
      { title: "Modular Vector Processing", desc: "Allows cards and containers to draw sub-pixel vectors dynamically relative to the pointer trajectory, reducing render lags by 40%." },
      { title: "Spring Physics Engine V2", desc: "Upgraded spring formulas with precise coefficients for stiffness and mass damping. Interactions now feel heavier and more tactile." },
      { title: "Frictionless Core Collisions", desc: "Avoids overlaps during row shuffling. Elements glide around boundaries with simulated electrostatic repulsion." }
    ],
    code: `// Quantum spring config
const config = {
  stiffness: 280,
  damping: 24,
  mass: 0.8,
  velocity: pointer.speed
};`
  },
  {
    version: "v2.4.2",
    date: "May 12, 2026",
    title: "Liquid Ripple Refinement",
    summary: "Fixed border overflow during fast element drags and optimized radial glows.",
    tags: [
      { label: "Bug Fix", type: "fix" },
      { label: "Refactor", type: "ref" }
    ],
    details: [
      { title: "Border Path Clipping", desc: "Resolved a bug where CSS radial gradient rings bled outside parent card borders on Safari viewports." },
      { title: "Glow Layer Compaction", desc: "Consolidated five overlapping box-shadow layers into a single composite filter, saving 3ms of frame calculation." }
    ],
    code: `/* Clip path overflow safeguard */
.card-layer {
  contain: paint;
  mask-image: radial-gradient(white, black);
}`
  },
  {
    version: "v2.4.0",
    date: "April 28, 2026",
    title: "Dynamic Bento Grid Orchestrator",
    summary: "Integrated automatic row-span adjustments and modular notification overlays inside the layout board.",
    tags: [
      { label: "Feature", type: "feat" },
      { label: "Interactive", type: "ux" }
    ],
    details: [
      { title: "Asymmetric Layout Reflows", desc: "Grid panels automatically morph their dimensions when nested items update states, preserving visual consistency." },
      { title: "Staggered Entrance Cascades", desc: "Grid blocks animate sequentially from top-left to bottom-right using a spring-loaded delay hierarchy." }
    ]
  },
  {
    version: "v2.3.1",
    date: "April 05, 2026",
    title: "Haptic Validation Shake Engine",
    summary: "Added tactile shake animations on error verification outputs for multi-step drawers.",
    tags: [
      { label: "Interactive", type: "ux" },
      { label: "Bug Fix", type: "fix" }
    ],
    details: [
      { title: "Physical Haptic Vibration", desc: "Simulates coordinate shake displacement using a spring sine-wave, enhancing sensory feedback during validation failures." }
    ]
  }
];

export default function ReleaseNotesFeed() {
  const { activeVariant } = useGlobalTheme();
  const [expandedIndex, setExpandedIndex] = useState(0); // v2.5.0 expanded by default

  // Helper to convert hex to rgb string for inline rgba values
  const hexToRgb = (hex) => {
    if (!hex) return "0, 229, 255";
    const cleanHex = hex.replace("#", "");
    const r = parseInt(cleanHex.substring(0, 2), 16);
    const g = parseInt(cleanHex.substring(2, 4), 16);
    const b = parseInt(cleanHex.substring(4, 6), 16);
    return isNaN(r) || isNaN(g) || isNaN(b) ? "0, 229, 255" : `${r}, ${g}, ${b}`;
  };

  const rgbStr = hexToRgb(activeVariant.triggerColor);
  const activeTheme = {
    color: activeVariant.triggerColor,
    rgb: rgbStr,
    border: `border-current/20`,
    text: activeVariant.textClass,
    bg: "",
    accentBg: `rgba(${rgbStr}, 0.1)`,
    glow: `shadow-[0_0_15px_rgba(${rgbStr},0.35)]`
  };

  return (
    <div className={`min-h-screen p-4 md:p-8 select-none transition-colors duration-500 ${activeVariant.canvasClass}`}>
      
      <div className="w-full max-w-4xl mx-auto flex flex-col gap-8">
        
        {/* Sticky Header Panel */}
        <div className={`p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 ${activeVariant.cardClass}`}>
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-mono tracking-widest opacity-40 uppercase block">
              DEPLOYMENT CHRONOLOGY
            </span>
            <h1 className="text-xl md:text-2xl font-black tracking-tight"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Kinetic Release Notes
            </h1>
            <p className="text-xs opacity-45 max-w-lg">
              Explore version changelogs configured with staggered slide-in cards, magnetic categories, and a continuous glowing timeline tracking core updates.
            </p>
          </div>
        </div>

        {/* Release Timeline Feed */}
        <div className="relative pl-6 md:pl-28 mt-4 flex flex-col gap-8">
          
          {/* Continuous Vertical Timeline Line */}
          <div className="absolute left-[30px] md:left-[118px] top-4 bottom-4 w-px bg-current/10 shadow-inner" />

          {RELEASES.map((item, index) => {
            const isExpanded = expandedIndex === index;
            return (
              <ReleaseCard
                key={item.version}
                item={item}
                index={index}
                isExpanded={isExpanded}
                activeTheme={activeTheme}
                activeVariant={activeVariant}
                onToggle={() => setExpandedIndex(isExpanded ? null : index)}
              />
            );
          })}
        </div>

      </div>
    </div>
  );
}

/* Single Release Card Component */
function ReleaseCard({ item, index, isExpanded, activeTheme, activeVariant, onToggle }) {
  const cardRef = useRef(null);
  const timelineNodeBg = activeVariant.mode === "dark" ? "#060810" : "#f4f4f0";

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ 
        type: "spring", 
        stiffness: 120, 
        damping: 18, 
        delay: index * 0.1 
      }}
      className="relative w-full"
    >
      {/* Date Marker floating on the left side of the timeline line */}
      <div className="absolute -left-[37px] md:-left-[125px] top-6 flex items-center justify-end w-24">
        {/* Date on desktop */}
        <span className="hidden md:inline text-[10px] font-bold opacity-35 font-mono uppercase tracking-wider mr-4">
          {item.date}
        </span>
        
        {/* Glow Node Marker */}
        <motion.div 
          animate={{
            borderColor: isExpanded ? activeTheme.color : (activeVariant.mode === "dark" ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.15)"),
            boxShadow: isExpanded ? `0 0 12px ${activeTheme.color}` : "none",
            backgroundColor: isExpanded ? timelineNodeBg : (activeVariant.mode === "dark" ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)")
          }}
          transition={{ duration: 0.3 }}
          className="w-3.5 h-3.5 rounded-full border z-10 flex-shrink-0 flex items-center justify-center"
          style={{ backgroundColor: timelineNodeBg }}
        >
          {isExpanded && (
            <motion.div
              layoutId="timeline-active-bullet"
              className="w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: activeTheme.color }}
            />
          )}
        </motion.div>
      </div>

      {/* Release card content */}
      <div 
        className={`p-5 md:p-6 transition-all duration-300 relative ${activeVariant.cardClass}`}
        style={{
          boxShadow: isExpanded && activeVariant.id !== "brutal"
            ? `0 15px 30px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.04), 0 0 1px rgba(${activeTheme.rgb},0.08)`
            : activeVariant.id !== "brutal" ? "0 4px 10px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.02)" : "none"
        }}
      >
        {/* Top Info row */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-3">
            {/* Version Tag */}
            <span 
              className={`px-3 py-1 rounded-xl text-[10px] font-black font-mono border tracking-wider transition-colors duration-300 ${activeTheme.text} ${activeTheme.border} ${activeTheme.accentBg}`}
            >
              {item.version}
            </span>
            
            {/* Mobile Date */}
            <span className="inline md:hidden text-[9px] font-bold opacity-30 font-mono uppercase">
              {item.date}
            </span>
          </div>

          {/* Interactive Tags */}
          <div className="flex items-center gap-1.5">
            {item.tags.map(tag => (
              <MagneticTag key={tag.label} activeTheme={activeTheme} tag={tag} activeVariant={activeVariant} />
            ))}
          </div>
        </div>

        {/* Release Title */}
        <h3 className="text-sm md:text-base font-black mb-2 leading-tight tracking-wide">
          {item.title}
        </h3>

        {/* Summary text */}
        <p className="text-xs opacity-45 leading-relaxed mb-4">
          {item.summary}
        </p>

        {/* Action Button */}
        <button 
          onClick={onToggle}
          className="flex items-center gap-1 text-[10px] font-bold font-mono tracking-wider opacity-50 hover:opacity-100 uppercase transition-colors cursor-pointer"
        >
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
          >
            <ChevronDown size={12} style={{ color: isExpanded ? activeTheme.color : undefined }} />
          </motion.div>
          <span>{isExpanded ? "Hide Details" : "Read Full Update"}</span>
        </button>

        {/* Expanded Waterfall details */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ type: "spring", stiffness: 180, damping: 20 }}
              className="overflow-hidden mt-5 pt-4 border-t border-current/5 flex flex-col gap-4"
            >
              {/* Staggered Item List */}
              <div className="flex flex-col gap-3.5">
                {item.details.map((detail, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.08, type: "spring", stiffness: 140, damping: 15 }}
                    className="flex gap-3 items-start"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-current/20 mt-1.5 flex-shrink-0" />
                    <div className="flex flex-col gap-0.5">
                      <h4 className="text-[11px] font-extrabold leading-tight font-mono">
                        {detail.title}
                      </h4>
                      <p className="text-[11px] opacity-40 leading-relaxed">
                        {detail.desc}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Code Blocks (Optional) */}
              {item.code && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: item.details.length * 0.08 + 0.05 }}
                  className="bg-black/25 border border-current/5 rounded-xl p-4 font-mono text-[10px] leading-relaxed opacity-80 relative overflow-hidden"
                >
                  <pre className="overflow-x-auto select-text">
                    <code>{item.code}</code>
                  </pre>
                  <div className="absolute top-2 right-2 flex items-center gap-1.5 px-2 py-0.5 rounded bg-current/5 border border-current/5 text-[8px] font-bold opacity-40 uppercase tracking-wider font-mono">
                    <Terminal size={8} />
                    Snippet
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

/* Microscopic Magnetic tag component */
function MagneticTag({ tag, activeTheme, activeVariant }) {
  const ref = useRef(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    setCoords({ x: x * 0.35, y: y * 0.35 });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setCoords({ x: 0, y: 0 });
  };

  const getTagStyle = (type) => {
    switch (type) {
      case "feat": return "border-blue-500/10 bg-blue-500/5 text-blue-400";
      case "fix": return "border-rose-500/10 bg-rose-500/5 text-rose-400";
      case "perf": return "border-emerald-500/10 bg-emerald-500/5 text-emerald-400";
      case "ref": return "border-purple-500/10 bg-purple-500/5 text-purple-400";
      default: return `border-current/5 bg-current/5 opacity-50`;
    }
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      animate={{
        x: coords.x,
        y: coords.y,
        borderColor: isHovered ? activeTheme.color : (activeVariant.mode === "dark" ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)")
      }}
      transition={{ 
        type: "spring", 
        stiffness: 160, 
        damping: 14, 
        mass: 0.1 
      }}
      className={`px-2 py-0.5 rounded-lg border text-[8px] font-black uppercase font-mono tracking-wider cursor-pointer select-none ${getTagStyle(tag.type)}`}
      style={{
        boxShadow: isHovered ? `0 0 10px rgba(${activeTheme.rgb}, 0.15)` : "none"
      }}
    >
      {tag.label}
    </motion.div>
  );
}
