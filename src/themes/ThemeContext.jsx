import React, { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

export const THEME_VARIANTS = [
  {
    id: "cyber",
    name: "Terminal Cyber",
    triggerColor: "#00FF66",
    mode: "dark",
    fontFamily: "'JetBrains Mono', monospace",
    primaryFont: "'JetBrains Mono', monospace",
    secondaryFont: "'Fira Code', monospace",
    monoFont: "'Fira Code', monospace",
    fontUrl: "https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700;800&family=Fira+Code:wght@400;700&display=swap",
    canvasClass: "bg-[#050505] text-[#00FF66]",
    cardClass: "bg-[#111111] border border-[#00FF66] rounded-none shadow-[0_0_15px_rgba(0,255,102,0.15)]",
    inputClass: "bg-black border border-[#00FF66] text-[#00FF66] placeholder-[#00FF66]/30 focus:outline-none focus:ring-1 focus:ring-[#00FF66] focus:border-[#00FF66] rounded-none font-mono",
    buttonClass: "bg-black text-[#00FF66] border border-[#00FF66] hover:bg-[#00FF66] hover:text-black font-bold uppercase tracking-widest rounded-none shadow-[0_0_10px_rgba(0,255,102,0.2)]",
    textClass: "text-[#00FF66]",
    accentText: "text-white",
    borderClass: "border-[#00FF66]",
    focusClass: "focus-visible:ring-2 focus-visible:ring-[#00FF66] focus-visible:ring-offset-2 focus-visible:ring-offset-black",
    transition: { type: "spring", stiffness: 380, damping: 14 },
    springConfig: { stiffness: 380, damping: 14 },
    borderRadiusCard: "0px",
    borderRadiusAction: "0px",
    borderCard: "1px solid #00FF66",
    shadowCard: "0 0 15px rgba(0, 255, 102, 0.15)"
  },
  {
    id: "glass",
    name: "Aero Glass",
    triggerColor: "#00E5FF",
    mode: "dark",
    fontFamily: "'Inter', sans-serif",
    primaryFont: "'Inter', sans-serif",
    secondaryFont: "'Geist', sans-serif",
    monoFont: "monospace",
    fontUrl: "https://fonts.googleapis.com/css2?family=Inter:wght@400;600;900&family=Geist:wght@400;600;700&display=swap",
    canvasClass: "bg-gradient-to-br from-[#030712] via-[#091026] to-[#020617] text-slate-200",
    cardClass: "bg-white/[0.04] backdrop-blur-[24px] saturate-[160%] border border-white/20 rounded-[32px] shadow-[0_20px_50px_rgba(0,229,255,0.08)]",
    inputClass: "bg-white/[0.02] border border-white/20 text-white placeholder-slate-500 focus:outline-none focus:ring-4 focus:ring-cyan-500/30 rounded-xl",
    buttonClass: "bg-cyan-500 hover:bg-cyan-600 text-slate-950 font-semibold rounded-2xl shadow-[0_10px_25px_rgba(0,229,255,0.25)] border border-cyan-400/20",
    textClass: "text-cyan-400",
    accentText: "text-white",
    borderClass: "border-white/20",
    focusClass: "focus-visible:ring-4 focus-visible:ring-cyan-500/30",
    transition: { ease: [0.16, 1, 0.3, 1], duration: 0.6 },
    springConfig: { stiffness: 220, damping: 24 },
    borderRadiusCard: "32px",
    borderRadiusAction: "16px",
    borderCard: "1px solid rgba(255, 255, 255, 0.2)",
    shadowCard: "0 20px 50px rgba(0, 229, 255, 0.08)"
  },
  {
    id: "neomorphic",
    name: "Neomorphic Flat",
    triggerColor: "#B066FF",
    mode: "dark",
    fontFamily: "'Space Grotesk', sans-serif",
    primaryFont: "'Space Grotesk', sans-serif",
    secondaryFont: "'Space Grotesk', sans-serif",
    monoFont: "monospace",
    fontUrl: "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;700&display=swap",
    canvasClass: "bg-[#0d0b14] text-[#D8B4FE]",
    cardClass: "bg-[#151221] shadow-[8px_8px_20px_#06050a,-8px_-8px_20px_#241f38] border border-[#B066FF]/20 rounded-[32px]",
    inputClass: "bg-[#0d0b14] shadow-[inset_4px_4px_8px_#06050a,inset_-4px_-4px_8px_#241f38] border border-[#B066FF]/15 text-white placeholder-[#B066FF]/35 focus:outline-none focus:border-[#B066FF]/40 rounded-2xl",
    buttonClass: "bg-[#151221] hover:shadow-[4px_4px_8px_#06050a,-4px_-4px_8px_#241f38] shadow-[6px_6px_12px_#06050a,-6px_-6px_12px_#241f38] active:shadow-[inset_4px_4px_8px_#06050a,inset_-4px_-4px_8px_#241f38] text-[#B066FF] font-bold rounded-full border border-[#B066FF]/20",
    textClass: "text-[#B066FF]",
    accentText: "text-white",
    borderClass: "border-[#B066FF]/20",
    focusClass: "focus-visible:ring-2 focus-visible:ring-[#B066FF]/40",
    transition: { type: "spring", stiffness: 140, damping: 20 },
    springConfig: { stiffness: 140, damping: 20 },
    borderRadiusCard: "32px",
    borderRadiusAction: "9999px",
    borderCard: "1px solid rgba(176, 102, 255, 0.2)",
    shadowCard: "8px 8px 20px #06050a, -8px -8px 20px #241f38"
  },
  {
    id: "brutal",
    name: "Neo-Brutalism",
    triggerColor: "#FF6B00",
    mode: "light",
    fontFamily: "'Public Sans', sans-serif",
    primaryFont: "'Bebas Neue', sans-serif",
    secondaryFont: "'Public Sans', sans-serif",
    monoFont: "monospace",
    fontUrl: "https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Public+Sans:wght@700;900&display=swap",
    canvasClass: "bg-[#F4F4F0] text-black",
    cardClass: "bg-white border-[3px] border-black shadow-[6px_6px_0px_#000] rounded-lg",
    inputClass: "bg-white border-2 border-black text-black placeholder-black/40 focus:outline-none focus:bg-[#FF6B00]/10 rounded-md",
    buttonClass: "bg-[#FF6B00] hover:bg-[#e66000] text-white border-2 border-black shadow-[4px_4px_0px_#000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_#000] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none font-extrabold uppercase tracking-wide rounded-md",
    textClass: "text-[#FF6B00]",
    accentText: "text-black",
    borderClass: "border-black border-2",
    focusClass: "focus-visible:ring-2 focus-visible:ring-black",
    transition: { type: "spring", stiffness: 350, damping: 10 },
    springConfig: { stiffness: 350, damping: 10 },
    borderRadiusCard: "8px",
    borderRadiusAction: "6px",
    borderCard: "3px solid #000000",
    shadowCard: "6px 6px 0px #000000"
  },
  {
    id: "luxury",
    name: "Editorial Luxury",
    triggerColor: "#FF0055",
    mode: "dark",
    fontFamily: "'Playfair Display', serif",
    primaryFont: "'Playfair Display', serif",
    secondaryFont: "'Cinzel', serif",
    monoFont: "monospace",
    fontUrl: "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Cinzel:wght@400;700&display=swap",
    canvasClass: "bg-[#0A0A0A] text-[#FF0055]",
    cardClass: "bg-[#121212] border border-[#FF0055]/25 rounded-none shadow-[0_10px_40px_rgba(0,0,0,0.8)]",
    inputClass: "bg-transparent border-b border-neutral-800 text-white placeholder-neutral-700 focus:outline-none focus:border-white rounded-none",
    buttonClass: "bg-[#FF0055] hover:bg-[#d60048] text-white font-normal rounded-none border border-neutral-800 tracking-widest",
    textClass: "text-[#FF0055]",
    accentText: "text-white",
    borderClass: "border-[#FF0055]/25",
    focusClass: "focus-visible:border-white",
    transition: { ease: "easeInOut", duration: 0.8 },
    springConfig: { stiffness: 80, damping: 25 },
    borderRadiusCard: "0px",
    borderRadiusAction: "0px",
    borderCard: "1px solid rgba(255, 0, 85, 0.25)",
    shadowCard: "0 10px 40px rgba(0,0,0,0.8)"
  }
];

export function ThemeProvider({ children }) {
  const [activeVariant, setActiveVariant] = useState(() => {
    const saved = localStorage.getItem("global-theme-variant");
    return THEME_VARIANTS.find(t => t.id === saved) || THEME_VARIANTS[1]; // default to glass
  });

  useEffect(() => {
    localStorage.setItem("global-theme-variant", activeVariant.id);

    // Dynamic Font Injection
    const linkId = "global-theme-font-link";
    let link = document.getElementById(linkId);
    if (!link) {
      link = document.createElement("link");
      link.id = linkId;
      link.rel = "stylesheet";
      document.head.appendChild(link);
    }
    link.href = activeVariant.fontUrl;

    // Body classes updates
    document.body.style.fontFamily = activeVariant.fontFamily;
    
    if (activeVariant.mode === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    // Dynamic CSS Variable Injection to Root Element
    const root = document.documentElement;
    root.style.setProperty("--theme-primary", activeVariant.triggerColor);
    root.style.setProperty("--theme-mode", activeVariant.mode);
    root.style.setProperty("--font-primary", activeVariant.primaryFont);
    root.style.setProperty("--font-secondary", activeVariant.secondaryFont);
    root.style.setProperty("--font-mono", activeVariant.monoFont);
    root.style.setProperty("--theme-border-radius-card", activeVariant.borderRadiusCard);
    root.style.setProperty("--theme-border-radius-action", activeVariant.borderRadiusAction);
    root.style.setProperty("--theme-border-card", activeVariant.borderCard);
    root.style.setProperty("--theme-shadow-card", activeVariant.shadowCard);

    // Dynamic Z-Index scale injection
    root.style.setProperty("--z-base", "1");
    root.style.setProperty("--z-dropdown", "100");
    root.style.setProperty("--z-sticky", "500");
    root.style.setProperty("--z-overlay", "990");
    root.style.setProperty("--z-modal", "999");
    root.style.setProperty("--z-tooltip", "9999");

  }, [activeVariant]);

  // Formulate custom CSS style bindings to inject to root wrapper div
  const styleVariables = {
    "--theme-primary": activeVariant.triggerColor,
    "--theme-mode": activeVariant.mode,
    "--font-primary": activeVariant.primaryFont,
    "--font-secondary": activeVariant.secondaryFont,
    "--font-mono": activeVariant.monoFont,
    "--theme-border-radius-card": activeVariant.borderRadiusCard,
    "--theme-border-radius-action": activeVariant.borderRadiusAction,
    "--theme-border-card": activeVariant.borderCard,
    "--theme-shadow-card": activeVariant.shadowCard,
    "--z-base": "1",
    "--z-dropdown": "100",
    "--z-sticky": "500",
    "--z-overlay": "990",
    "--z-modal": "999",
    "--z-tooltip": "9999"
  };

  return (
    <ThemeContext.Provider value={{ activeVariant, setActiveVariant, variants: THEME_VARIANTS }}>
      <div 
        className={`min-h-screen transition-colors duration-500 ${activeVariant.canvasClass}`}
        style={styleVariables}
      >
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

export function useGlobalTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useGlobalTheme must be used within a ThemeProvider");
  }
  return context;
}

