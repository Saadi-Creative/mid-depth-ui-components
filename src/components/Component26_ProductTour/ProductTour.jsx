import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight, X, Play, Info, Sparkles, HelpCircle } from "lucide-react";

// Themes definition
const THEMES = [
  {
    id: "emerald",
    name: "Emerald",
    color: "#10b981",
    rgb: "16, 185, 129",
    border: "border-emerald-500/20",
    bg: "bg-emerald-500",
    hoverBg: "hover:bg-emerald-600",
    text: "text-emerald-400",
    accentBg: "bg-emerald-500/10",
    glow: "shadow-[0_0_15px_rgba(16,185,129,0.3)]",
    outlineGlow: "rgba(16,185,129,0.4)"
  },
  {
    id: "sapphire",
    name: "Sapphire Blue",
    color: "#2979ff",
    rgb: "41, 121, 255",
    border: "border-blue-500/20",
    bg: "bg-blue-500",
    hoverBg: "hover:bg-blue-600",
    text: "text-blue-400",
    accentBg: "bg-blue-500/10",
    glow: "shadow-[0_0_15px_rgba(41,121,255,0.35)]",
    outlineGlow: "rgba(41,121,255,0.4)"
  },
  {
    id: "amethyst",
    name: "Amethyst",
    color: "#aa00ff",
    rgb: "170, 0, 255",
    border: "border-purple-500/20",
    bg: "bg-purple-500",
    hoverBg: "hover:bg-purple-600",
    text: "text-purple-400",
    accentBg: "bg-purple-500/10",
    glow: "shadow-[0_0_15px_rgba(170,0,255,0.35)]",
    outlineGlow: "rgba(170,0,255,0.4)"
  },
  {
    id: "ruby",
    name: "Ruby",
    color: "#ff1744",
    rgb: "255, 23, 68",
    border: "border-rose-500/20",
    bg: "bg-rose-500",
    hoverBg: "hover:bg-rose-600",
    text: "text-rose-400",
    accentBg: "bg-rose-500/10",
    glow: "shadow-[0_0_15px_rgba(255,23,68,0.35)]",
    outlineGlow: "rgba(255,23,68,0.4)"
  },
  {
    id: "amber",
    name: "Amber",
    color: "#ffd600",
    rgb: "255, 214, 0",
    border: "border-amber-500/20",
    bg: "bg-amber-500",
    hoverBg: "hover:bg-amber-600",
    text: "text-amber-400",
    accentBg: "bg-amber-500/10",
    glow: "shadow-[0_0_15px_rgba(255,214,0,0.35)]",
    outlineGlow: "rgba(255,214,0,0.4)"
  }
];

// Tour Steps
const TOUR_STEPS = [
  {
    targetId: "tour-brand",
    title: "Vessel Control Terminal",
    desc: "This is your main command header, indexing active system cores and diagnostic sub-nodes.",
    position: "bottom"
  },
  {
    targetId: "tour-metrics",
    title: "Analytical Load Stream",
    desc: "Monitor raw egress traffic speed, disk allocations, and CPU spring coefficient charts in real-time.",
    position: "bottom"
  },
  {
    targetId: "tour-actions",
    title: "Diagnostic Action Unit",
    desc: "Perform secure shell execution, terminal scripts, or reboot warning processes directly.",
    position: "left"
  },
  {
    targetId: "tour-settings",
    title: "Appearance Sync Configuration",
    desc: "Change theme accents, custom profiles, and calibrate layout guides dynamically.",
    position: "top"
  }
];

export default function ProductTour() {
  const [activeTheme, setActiveTheme] = useState(THEMES[0]);
  const [tourActive, setTourActive] = useState(true);
  const [step, setStep] = useState(0);
  const [highlightBox, setHighlightBox] = useState({ top: 0, left: 0, width: 0, height: 0 });

  const containerRef = useRef(null);

  // Calculate target element coordinates relative to dashboard container
  useEffect(() => {
    if (!tourActive) return;

    const updateBox = () => {
      const activeStep = TOUR_STEPS[step];
      const targetEl = document.getElementById(activeStep.targetId);
      const containerEl = containerRef.current;

      if (targetEl && containerEl) {
        const targetRect = targetEl.getBoundingClientRect();
        const containerRect = containerEl.getBoundingClientRect();

        setHighlightBox({
          top: targetRect.top - containerRect.top,
          left: targetRect.left - containerRect.left,
          width: targetRect.width,
          height: targetRect.height
        });
      }
    };

    updateBox();
    window.addEventListener("resize", updateBox);
    return () => window.removeEventListener("resize", updateBox);
  }, [step, tourActive]);

  const handleNext = () => {
    if (step < TOUR_STEPS.length - 1) {
      setStep(step + 1);
    } else {
      setTourActive(false);
    }
  };

  const handlePrev = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  const handleSkip = () => {
    setTourActive(false);
  };

  const handleRestart = () => {
    setStep(0);
    setTourActive(true);
  };

  const currentStep = TOUR_STEPS[step];

  // Tooltip positioning offset builder
  const getTooltipPosition = () => {
    if (!highlightBox.width) return {};
    const gap = 16;
    
    switch (currentStep.position) {
      case "bottom":
        return {
          top: highlightBox.top + highlightBox.height + gap,
          left: highlightBox.left + highlightBox.width / 2,
          transform: "translateX(-50%)"
        };
      case "left":
        return {
          top: highlightBox.top + highlightBox.height / 2,
          left: highlightBox.left - 300 - gap, // 300px width tooltip
          transform: "translateY(-50%)"
        };
      case "top":
        return {
          top: highlightBox.top - 200 - gap, // roughly tooltip height
          left: highlightBox.left + highlightBox.width / 2,
          transform: "translateX(-50%)"
        };
      default:
        return {
          top: highlightBox.top + highlightBox.height + gap,
          left: highlightBox.left + highlightBox.width / 2,
          transform: "translateX(-50%)"
        };
    }
  };

  return (
    <div className="min-h-screen p-4 md:p-8 select-none bg-[#060810] flex items-center justify-center"
      style={{ fontFamily: "'Inter', sans-serif" }}>
      
      <div 
        ref={containerRef}
        className="w-full max-w-5xl bg-[#080a14] border border-white/5 rounded-3xl p-6 md:p-8 relative min-h-[620px] overflow-hidden shadow-inner flex flex-col gap-6"
      >
        {/* ========================================================
            MOCK DASHBOARD LAYOUT (BACKGROUND CANVAS TARGETS)
            ======================================================== */}

        {/* Dashboard Header */}
        <div 
          id="tour-brand"
          className="bg-[#0a0d1a] border border-white/5 rounded-2xl p-4 flex items-center justify-between shadow-md transition-colors"
        >
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center"
              style={{ background: activeTheme.accentBg, border: `1px solid rgba(${activeTheme.rgb}, 0.2)` }}>
              <span className="text-[10px] font-black" style={{ color: activeTheme.color }}>50</span>
            </div>
            <span className="text-xs font-black text-white font-mono tracking-wide">VESSEL_TERMINAL</span>
          </div>

          <div className="flex items-center gap-2 text-[9px] font-mono text-white/30">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>CORE CONNECTED</span>
          </div>
        </div>

        {/* Dashboard Main Grid Area */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 flex-1">
          
          {/* Main metrics module */}
          <div 
            id="tour-metrics"
            className="md:col-span-8 bg-[#0a0d1a] border border-white/5 rounded-2xl p-5 flex flex-col justify-between min-h-[220px]"
          >
            <div className="flex justify-between items-center text-[10px] font-mono font-bold text-white/40 uppercase">
              <span>Diagnostic load metrics</span>
              <span style={{ color: activeTheme.color }}>Telemetry live</span>
            </div>

            {/* Dummy SVG graphs */}
            <div className="flex-1 relative flex items-center mt-3">
              <svg className="w-full h-24 overflow-visible" viewBox="0 0 400 100">
                <path
                  d="M0,80 Q50,20 100,70 T200,30 T300,90 T400,40"
                  fill="none"
                  stroke={`rgba(${activeTheme.rgb}, 0.15)`}
                  strokeWidth="2.5"
                />
                <path
                  d="M0,80 Q50,20 100,70 T200,30 T300,90 T400,40"
                  fill="none"
                  stroke={activeTheme.color}
                  strokeWidth="1.5"
                  strokeDasharray="4 4"
                />
              </svg>
            </div>

            <div className="flex justify-between items-center text-[9px] font-mono text-white/20 font-semibold mt-2">
              <span>CORE_EGRESS_SPEED: 482.4 Mbps</span>
              <span>INDEX_SHUFFLE: COMPLETED</span>
            </div>
          </div>

          {/* Quick Actions sidebar panel */}
          <div 
            id="tour-actions"
            className="md:col-span-4 bg-[#0a0d1a] border border-white/5 rounded-2xl p-5 flex flex-col justify-between min-h-[220px]"
          >
            <div className="text-[10px] font-mono font-bold text-white/40 uppercase">
              Core Actions
            </div>

            <div className="flex flex-col gap-2 mt-4 flex-1 justify-center">
              <div className="px-3 py-2 rounded-xl bg-white/[0.02] border border-white/5 text-[10px] text-white/50 font-mono flex items-center gap-2">
                <Info size={11} />
                <span>diag_run --vessel=core</span>
              </div>
              <div className="px-3 py-2 rounded-xl bg-white/[0.02] border border-white/5 text-[10px] text-white/50 font-mono flex items-center gap-2">
                <Info size={11} />
                <span>system_reboot --force</span>
              </div>
            </div>

            <div className="h-px bg-white/5 my-3" />
            <button className="w-full py-2 bg-white/5 hover:bg-white/10 text-white/60 hover:text-white text-[10px] font-bold uppercase font-mono tracking-wider border border-white/5 rounded-xl transition-all cursor-not-allowed">
              Diag Run
            </button>
          </div>
        </div>

        {/* Dashboard bottom layout */}
        <div 
          id="tour-settings"
          className="bg-[#0a0d1a] border border-white/5 rounded-2xl p-4 flex items-center justify-between text-xs text-white/30 font-mono"
        >
          <span>VESSEL SHELL TERMINAL V2.5.0</span>
          
          <button 
            onClick={handleRestart}
            className="px-3 py-1.5 rounded-lg border border-white/5 bg-white/5 hover:bg-white/10 text-white/60 hover:text-white text-[9px] uppercase font-bold tracking-wider cursor-pointer flex items-center gap-1 transition-colors"
          >
            <Play size={8} />
            Start Guide Tour
          </button>
        </div>


        {/* ========================================================
            ONBOARDING PRODUCT TOUR GUIDE OVERLAYS
            ======================================================== */}

        {tourActive && (
          <>
            {/* Dark Mask Overlay (layered behind tooltip) */}
            <div className="absolute inset-0 bg-[#060810]/75 backdrop-blur-[1px] z-30 pointer-events-none" />

            {/* Elastic Targeting Outline Highlight Box */}
            <motion.div
              animate={{
                top: highlightBox.top - 4,
                left: highlightBox.left - 4,
                width: highlightBox.width + 8,
                height: highlightBox.height + 8,
                borderColor: activeTheme.color
              }}
              transition={{
                type: "spring",
                stiffness: 280,
                damping: 24
              }}
              className="absolute border-2 rounded-2xl z-40 pointer-events-none"
              style={{
                boxShadow: `0 0 15px rgba(${activeTheme.rgb}, 0.25), inset 0 0 8px rgba(${activeTheme.rgb}, 0.15)`
              }}
            />

            {/* Snap Spring Tooltip Window */}
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 15 }}
                transition={{ type: "spring", stiffness: 220, damping: 18 }}
                className="absolute w-[300px] bg-[#0a0d1a] border border-white/10 rounded-2xl p-5 shadow-[0_20px_40px_rgba(0,0,0,0.6)] z-40 flex flex-col gap-4 font-sans select-none"
                style={getTooltipPosition()}
              >
                {/* Tooltip Header */}
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-2">
                    <Sparkles size={13} style={{ color: activeTheme.color }} />
                    <h4 className="text-xs font-black text-white font-mono uppercase tracking-wide">
                      {currentStep.title}
                    </h4>
                  </div>
                  
                  {/* Close Cross */}
                  <button 
                    onClick={handleSkip}
                    className="text-white/30 hover:text-white transition-colors cursor-pointer"
                  >
                    <X size={12} />
                  </button>
                </div>

                {/* Desc */}
                <p className="text-[11px] text-white/50 leading-relaxed font-sans select-text">
                  {currentStep.desc}
                </p>

                {/* Footer Controls, Indicators and Swatches */}
                <div className="flex flex-col gap-3 pt-3 border-t border-white/5">
                  
                  {/* Swatches & Indicator Dots row */}
                  <div className="flex justify-between items-center">
                    
                    {/* Active Progress Dots */}
                    <div className="flex gap-1.5">
                      {TOUR_STEPS.map((_, idx) => (
                        <div
                          key={idx}
                          className="w-1.5 h-1.5 rounded-full transition-colors duration-300"
                          style={{
                            backgroundColor: step === idx ? activeTheme.color : "rgba(255,255,255,0.15)"
                          }}
                        />
                      ))}
                    </div>

                    {/* Onboarding step indicator theme swatches */}
                    <div className="flex items-center gap-1 bg-black/40 px-2 py-1 rounded-lg border border-white/5">
                      {THEMES.map(theme => (
                        <button
                          key={theme.id}
                          onClick={() => setActiveTheme(theme)}
                          className="w-2.5 h-2.5 rounded-full cursor-pointer relative flex items-center justify-center transition-transform active:scale-75"
                          style={{ backgroundColor: theme.color }}
                        >
                          {activeTheme.id === theme.id && (
                            <motion.div
                              layoutId="active-tour-theme-ring"
                              className="absolute -inset-0.5 rounded-full border border-current opacity-70"
                              style={{ color: theme.color }}
                            />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Navigation Action Row */}
                  <div className="flex justify-between items-center mt-1">
                    {/* Skip button with sliding hover arrow */}
                    <SkipButton handleSkip={handleSkip} />

                    {/* Back & Next Actions */}
                    <div className="flex gap-1.5">
                      {step > 0 && (
                        <button
                          onClick={handlePrev}
                          className="p-1.5 rounded-lg bg-white/5 border border-white/5 hover:bg-white/10 text-white/60 hover:text-white cursor-pointer"
                        >
                          <ChevronLeft size={12} />
                        </button>
                      )}
                      
                      <button
                        onClick={handleNext}
                        className={`px-3 py-1.5 rounded-lg font-bold font-mono text-[9px] uppercase tracking-wider transition-colors cursor-pointer flex items-center gap-1 ${
                          step === TOUR_STEPS.length - 1 
                            ? "bg-emerald-500/10 border border-emerald-500/20 text-emerald-400"
                            : `text-black ${activeTheme.bg} ${activeTheme.hoverBg} ${activeTheme.glow}`
                        }`}
                      >
                        <span>
                          {step === TOUR_STEPS.length - 1 ? "Finish" : "Next"}
                        </span>
                        <ChevronRight size={10} />
                      </button>
                    </div>

                  </div>

                </div>

              </motion.div>
            </AnimatePresence>
          </>
        )}

      </div>
    </div>
  );
}

/* Skip Button Component with sliding arrow */
function SkipButton({ handleSkip }) {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      onClick={handleSkip}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="flex items-center gap-1 text-[9px] font-bold font-mono uppercase tracking-wider text-white/35 hover:text-white/80 cursor-pointer select-none transition-colors"
    >
      <span>Skip Tour</span>
      <motion.div
        animate={{ x: hovered ? 4 : 0 }}
        transition={{ type: "spring", stiffness: 180, damping: 14 }}
      >
        <ArrowRight size={10} />
      </motion.div>
    </button>
  );
}
