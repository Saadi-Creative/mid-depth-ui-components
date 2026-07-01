import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ShoppingCart, Shield, RotateCcw, Truck, 
  HelpCircle, ChevronRight, Activity, Cpu, Sparkles 
} from "lucide-react";

import { useGlobalTheme } from "../../themes/ThemeContext";

const CASE_FINISHES = [
  { id: "brushed", name: "Brushed Matte", desc: "Satin grain finish, low reflection", priceOffset: 0 },
  { id: "polished", name: "Polished Mirror", desc: "High luster, hand-burnished surface", priceOffset: 250 },
  { id: "damascus", name: "Damascus Steel", desc: "Organic pattern forged metallurgy", priceOffset: 650 },
];

const STRAP_MATERIALS = [
  { id: "oyster", name: "Oyster Link Bracelet", desc: "Solid machined three-piece metal link", priceOffset: 0 },
  { id: "leather", name: "Saffiano Calf Leather", desc: "Hand-stitched Italian crossgrain leather", priceOffset: -150 },
  { id: "mesh", name: "Premium Tech-Mesh Nylon", desc: "High-density weave ballistic nylon", priceOffset: -300 },
];

const BEZEL_ACCENTS = [
  { id: "minimal", name: "Minimalist Slate", desc: "Seamless low-profile dark framing", priceOffset: 0 },
  { id: "fluted", name: "Fluted Gold Ring", desc: "Finely ridged premium highlight ring", priceOffset: 400 },
  { id: "tachymeter", name: "Tachymeter Engraved", desc: "Etched speed indicators for racing", priceOffset: 200 },
];

// Inline dynamic SVGWatch renderer (avoids large image bundle sizes and operates on GPU-friendly vector paths)
const WatchSvg = ({ theme, caseFinish, strapMaterial, bezelAccent }) => {
  let faceColor = "#0f172a";
  const hex = theme.color || "#38bdf8";
  const match = hex.match(/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i);
  if (match) {
    const r = Math.round(parseInt(match[1], 16) * 0.15);
    const g = Math.round(parseInt(match[2], 16) * 0.15);
    const b = Math.round(parseInt(match[3], 16) * 0.15);
    faceColor = `rgb(${r}, ${g}, ${b})`;
  }

  let caseColor = "#94a3b8";
  if (caseFinish.id === "brushed") caseColor = "#64748b";
  if (caseFinish.id === "polished") caseColor = "#cbd5e1";
  if (caseFinish.id === "damascus") caseColor = "#475569";

  let strapColor = "#475569";
  if (strapMaterial.id === "oyster") strapColor = caseColor;
  if (strapMaterial.id === "leather") strapColor = "#7c2d12";
  if (strapMaterial.id === "mesh") strapColor = "#1e293b";

  return (
    <svg width="220" height="320" viewBox="0 0 220 320" className="w-full h-full max-w-[240px] drop-shadow-2xl">
      {/* Dynamic Strap Top */}
      {strapMaterial.id === "oyster" && (
        <g fill={strapColor}>
          <rect x="70" y="20" width="80" height="70" rx="4" />
          <line x1="90" y1="20" x2="90" y2="90" stroke="#0f172a" strokeWidth="2" />
          <line x1="110" y1="20" x2="110" y2="90" stroke="#0f172a" strokeWidth="2" />
          <line x1="130" y1="20" x2="130" y2="90" stroke="#0f172a" strokeWidth="2" />
          <line x1="70" y1="40" x2="150" y2="40" stroke="#0f172a" strokeWidth="2" />
          <line x1="70" y1="65" x2="150" y2="65" stroke="#0f172a" strokeWidth="2" />
        </g>
      )}
      {strapMaterial.id === "leather" && (
        <g fill={strapColor}>
          <rect x="75" y="15" width="70" height="75" rx="6" />
          <line x1="80" y1="15" x2="80" y2="90" stroke="#451a03" strokeDasharray="3,3" strokeWidth="1.5" />
          <line x1="140" y1="15" x2="140" y2="90" stroke="#451a03" strokeDasharray="3,3" strokeWidth="1.5" />
        </g>
      )}
      {strapMaterial.id === "mesh" && (
        <g fill={strapColor}>
          <rect x="75" y="15" width="70" height="75" rx="4" />
          <pattern id="mesh-top" width="6" height="6" patternUnits="userSpaceOnUse">
            <path d="M 0 0 L 6 6 M 6 0 L 0 6" stroke={theme.color} strokeWidth="0.75" opacity="0.3" />
          </pattern>
          <rect x="75" y="15" width="70" height="75" fill="url(#mesh-top)" />
        </g>
      )}

      {/* Dynamic Strap Bottom */}
      {strapMaterial.id === "oyster" && (
        <g fill={strapColor}>
          <rect x="70" y="230" width="80" height="70" rx="4" />
          <line x1="90" y1="230" x2="90" y2="300" stroke="#0f172a" strokeWidth="2" />
          <line x1="110" y1="230" x2="110" y2="300" stroke="#0f172a" strokeWidth="2" />
          <line x1="130" y1="230" x2="130" y2="300" stroke="#0f172a" strokeWidth="2" />
          <line x1="70" y1="255" x2="150" y2="255" stroke="#0f172a" strokeWidth="2" />
          <line x1="70" y1="280" x2="150" y2="280" stroke="#0f172a" strokeWidth="2" />
        </g>
      )}
      {strapMaterial.id === "leather" && (
        <g fill={strapColor}>
          <rect x="75" y="230" width="70" height="75" rx="6" />
          <line x1="80" y1="230" x2="80" y2="305" stroke="#451a03" strokeDasharray="3,3" strokeWidth="1.5" />
          <line x1="140" y1="230" x2="140" y2="305" stroke="#451a03" strokeDasharray="3,3" strokeWidth="1.5" />
        </g>
      )}
      {strapMaterial.id === "mesh" && (
        <g fill={strapColor}>
          <rect x="75" y="230" width="70" height="75" rx="4" />
          <pattern id="mesh-bottom" width="6" height="6" patternUnits="userSpaceOnUse">
            <path d="M 0 0 L 6 6 M 6 0 L 0 6" stroke={theme.color} strokeWidth="0.75" opacity="0.3" />
          </pattern>
          <rect x="75" y="230" width="70" height="75" fill="url(#mesh-bottom)" />
        </g>
      )}

      {/* Watch Lugs */}
      <path d="M 68 85 L 74 110 M 152 85 L 146 110" stroke={caseColor} strokeWidth="6" strokeLinecap="round" />
      <path d="M 68 235 L 74 210 M 152 235 L 146 210" stroke={caseColor} strokeWidth="6" strokeLinecap="round" />

      {/* Case Outer */}
      <circle cx="110" cy="160" r="70" fill={caseColor} stroke="#0f172a" strokeWidth="1.5" />

      {/* Damascus Steel wave overlays */}
      {caseFinish.id === "damascus" && (
        <g opacity="0.12" stroke="#000000" strokeWidth="1.5" fill="none">
          <path d="M 45 130 C 65 110 85 140 110 120 C 135 100 155 130 175 125" />
          <path d="M 40 155 C 65 145 80 170 110 160 C 135 150 155 170 180 155" />
          <path d="M 45 180 C 65 175 80 195 110 185 C 135 175 155 200 175 185" />
        </g>
      )}

      {/* Bezel Ring */}
      <circle cx="110" cy="160" r="62" fill="#0b0d19" stroke={caseColor} strokeWidth="2.5" />
      
      {/* Bezel Accents */}
      {bezelAccent.id === "fluted" && (
        <g stroke={theme.color} strokeWidth="1.5" opacity="0.6">
          {Array.from({ length: 36 }).map((_, i) => {
            const angle = (i * 10 * Math.PI) / 180;
            const x1 = 110 + 57 * Math.cos(angle);
            const y1 = 160 + 57 * Math.sin(angle);
            const x2 = 110 + 62 * Math.cos(angle);
            const y2 = 160 + 62 * Math.sin(angle);
            return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} />;
          })}
        </g>
      )}
      {bezelAccent.id === "tachymeter" && (
        <g stroke="#ffffff" strokeWidth="1.25" opacity="0.3">
          {Array.from({ length: 12 }).map((_, i) => {
            const angle = (i * 30 * Math.PI) / 180;
            const x1 = 110 + 55 * Math.cos(angle);
            const y1 = 160 + 55 * Math.sin(angle);
            const x2 = 110 + 62 * Math.cos(angle);
            const y2 = 160 + 62 * Math.sin(angle);
            return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} />;
          })}
        </g>
      )}

      {/* Watch Dial Face */}
      <circle cx="110" cy="160" r="53" fill={faceColor} />

      {/* Dial Subdials (Chronographs) */}
      <circle cx="110" cy="142" r="13" fill="none" stroke={theme.color} strokeWidth="0.75" opacity="0.2" />
      <circle cx="94" cy="172" r="10" fill="none" stroke={theme.color} strokeWidth="0.75" opacity="0.2" />
      <circle cx="126" cy="172" r="10" fill="none" stroke={theme.color} strokeWidth="0.75" opacity="0.2" />

      {/* Hands Dial Core */}
      <circle cx="110" cy="160" r="4.5" fill={theme.color} stroke="#090d16" strokeWidth="1" />

      {/* Hands */}
      <line x1="110" y1="160" x2="110" y2="122" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" /> {/* Minute */}
      <line x1="110" y1="160" x2="132" y2="160" stroke="#cbd5e1" strokeWidth="3.25" strokeLinecap="round" /> {/* Hour */}
      <line x1="110" y1="160" x2="92" y2="182" stroke={theme.color} strokeWidth="1" strokeLinecap="round" /> {/* Second */}

      {/* Dial Hour Markings */}
      <g stroke="#ffffff" strokeWidth="1.5" opacity="0.6">
        <line x1="110" y1="112" x2="110" y2="116" />
        <line x1="158" y1="160" x2="154" y2="160" />
        <line x1="110" y1="208" x2="110" y2="204" />
        <line x1="62" y1="160" x2="66" y2="160" />
      </g>
    </svg>
  );
};

export default function ProductVariantConfigurator() {
  const { activeVariant } = useGlobalTheme();
  const activeTheme = React.useMemo(() => {
    const hex = activeVariant.triggerColor || "#38bdf8";
    let rgb = "56, 189, 248";
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
      border: "border-[var(--theme-primary)]/20",
      lightBg: `rgba(${rgb}, 0.1)`,
      circleBg: hex,
      glow: "shadow-[var(--theme-primary)]/20"
    };
  }, [activeVariant]);

  const [selectedCase, setSelectedCase] = useState(CASE_FINISHES[0]);
  const [selectedStrap, setSelectedStrap] = useState(STRAP_MATERIALS[0]);
  const [selectedBezel, setSelectedBezel] = useState(BEZEL_ACCENTS[0]);
  const [activeTab, setActiveTab] = useState("specs"); // specs | story | shipping

  const basePrice = 8450;
  const totalPrice = basePrice + selectedCase.priceOffset + selectedStrap.priceOffset + selectedBezel.priceOffset;

  return (
    <div 
      className={`min-h-screen flex flex-col justify-start p-4 md:p-8 transition-colors duration-500  pt-[120px] pb-8 sm:pt-[120px] sm:pb-8 ${activeVariant.canvasClass}`}
    >
      <div className="w-full max-w-6xl mx-auto flex flex-col gap-6">
        
        {/* Main Bento Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* LEFT PANEL: Media Showcase & Specs (5 Columns) */}
          <div className="lg:col-span-5 flex flex-col gap-6 h-full">
            
            {/* Visualizer Card */}
            <div 
              className={`p-6 flex flex-col items-center justify-between min-h-[460px] relative overflow-hidden group ${activeVariant.cardClass}`}
            >
              {/* Product Badge */}
              <div className="w-full flex items-center justify-between z-10">
                <span className="text-[10px] font-mono tracking-widest opacity-40 uppercase">
                  Aurelia Lab Suite
                </span>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-current/5 border border-current/10 opacity-80">
                  Model No: 2.5D-CH
                </span>
              </div>

              {/* Dynamic Image Canvas (With Crossfade and Micro-Scale Animations) */}
              <div className="w-full flex-1 flex items-center justify-center py-6">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`${activeTheme.id}-${selectedCase.id}-${selectedStrap.id}-${selectedBezel.id}`}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1.02 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.22, ease: "easeOut" }}
                    className="w-full h-full flex items-center justify-center"
                  >
                    <WatchSvg 
                      theme={activeTheme} 
                      caseFinish={selectedCase} 
                      strapMaterial={selectedStrap} 
                      bezelAccent={selectedBezel} 
                    />
                  </motion.div>
                </AnimatePresence>
              </div>

            </div>

            {/* Spec Quick-View */}
            <div className={`p-5 flex flex-col gap-4 ${activeVariant.cardClass}`}>
              <span className="text-xs uppercase tracking-widest opacity-35 font-bold">
                Instrument Specifications
              </span>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-current/5 border border-current/10 rounded-xl p-3 flex flex-col">
                  <span className="text-[10px] opacity-40">Caliber movement</span>
                  <span className="text-xs font-semibold opacity-80 mt-0.5">Cal. 8925 Automatique</span>
                </div>
                <div className="bg-current/5 border border-current/10 rounded-xl p-3 flex flex-col">
                  <span className="text-[10px] opacity-40">Water resistance</span>
                  <span className="text-xs font-semibold mt-0.5" style={{ color: activeTheme.color }}>
                    100m (10 ATM)
                  </span>
                </div>
                <div className="bg-current/5 border border-current/10 rounded-xl p-3 flex flex-col">
                  <span className="text-[10px] opacity-40">Power reserve</span>
                  <span className="text-xs font-semibold opacity-80 mt-0.5">72 Hours (Bi-Directional)</span>
                </div>
                <div className="bg-current/5 border border-current/10 rounded-xl p-3 flex flex-col">
                  <span className="text-[10px] opacity-40">Jewels count</span>
                  <span className="text-xs font-semibold mt-0.5" style={{ color: activeTheme.color }}>
                    39 Synthetic Rubies
                  </span>
                </div>
              </div>
            </div>

          </div>

          {/* RIGHT PANEL: Customizer Interface & Checkout (7 Columns) */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            
            {/* Header info */}
            <div className={`p-6 flex flex-col gap-3 ${activeVariant.cardClass}`}>
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h1 
                  className="text-2xl md:text-3xl font-black leading-none tracking-tight"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  Aurelia Chronograph
                </h1>
                <div className="text-xl md:text-2xl font-bold tracking-wide" style={{ color: activeTheme.color }}>
                  ${totalPrice.toLocaleString()}
                </div>
              </div>
              <p className="text-xs opacity-50 leading-relaxed max-w-2xl">
                An architectural masterclass in 2.5D micro-dimensional horology. Forged with state-of-the-art customizable modular alloys, boasting precision internal synthetic gears, layout-morph mechanics, and a physical bezel configuration interface.
              </p>
            </div>

            {/* Config options panels */}
            <div className={`p-6 flex flex-col gap-6 ${activeVariant.cardClass}`}>
              
              {/* Option 1: Case Finish */}
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider opacity-60">
                    1. Case Material & Finish
                  </span>
                  <span className="text-[10px] opacity-40 font-semibold">{selectedCase.name}</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {CASE_FINISHES.map(item => {
                    const isSelected = selectedCase.id === item.id;
                    const priceDiff = item.priceOffset;
                    return (
                      <button
                        key={item.id}
                        onClick={() => setSelectedCase(item)}
                        className={`p-3.5 text-left relative cursor-pointer group active:scale-95 transition-all duration-150 ${activeVariant.buttonClass} text-current hover:text-current`}
                      >
                        {isSelected && (
                          <motion.div
                            layoutId="active-case-ring"
                            className="absolute -inset-[1px] border rounded-xl pointer-events-none z-10"
                            style={{ borderColor: activeTheme.color }}
                            transition={{ type: "spring", stiffness: 350, damping: 28 }}
                          />
                        )}
                        <span className="text-xs font-bold block">{item.name}</span>
                        <span className="text-[10px] opacity-40 block mt-0.5 leading-snug">{item.desc}</span>
                        <span className="text-[10px] font-bold block mt-2" style={{ color: isSelected ? activeTheme.color : "currentColor" }}>
                          {priceDiff === 0 ? "Standard" : priceDiff > 0 ? `+$${priceDiff}` : `-$${Math.abs(priceDiff)}`}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Option 2: Strap Material */}
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider opacity-60">
                    2. Oyster Strap Band
                  </span>
                  <span className="text-[10px] opacity-40 font-semibold">{selectedStrap.name}</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {STRAP_MATERIALS.map(item => {
                    const isSelected = selectedStrap.id === item.id;
                    const priceDiff = item.priceOffset;
                    return (
                      <button
                        key={item.id}
                        onClick={() => setSelectedStrap(item)}
                        className={`p-3.5 text-left relative cursor-pointer active:scale-95 transition-all duration-150 ${activeVariant.buttonClass} text-current hover:text-current`}
                      >
                        {isSelected && (
                          <motion.div
                            layoutId="active-strap-ring"
                            className="absolute -inset-[1px] border rounded-xl pointer-events-none z-10"
                            style={{ borderColor: activeTheme.color }}
                            transition={{ type: "spring", stiffness: 350, damping: 28 }}
                          />
                        )}
                        <span className="text-xs font-bold block">{item.name}</span>
                        <span className="text-[10px] opacity-40 block mt-0.5 leading-snug">{item.desc}</span>
                        <span className="text-[10px] font-bold block mt-2" style={{ color: isSelected ? activeTheme.color : "currentColor" }}>
                          {priceDiff === 0 ? "Standard" : priceDiff > 0 ? `+$${priceDiff}` : `-$${Math.abs(priceDiff)}`}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Option 3: Bezel Accent */}
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider opacity-60">
                    3. Bezel Profile Accent
                  </span>
                  <span className="text-[10px] opacity-40 font-semibold">{selectedBezel.name}</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {BEZEL_ACCENTS.map(item => {
                    const isSelected = selectedBezel.id === item.id;
                    const priceDiff = item.priceOffset;
                    return (
                      <button
                        key={item.id}
                        onClick={() => setSelectedBezel(item)}
                        className={`p-3.5 text-left relative cursor-pointer active:scale-95 transition-all duration-150 ${activeVariant.buttonClass} text-current hover:text-current`}
                      >
                        {isSelected && (
                          <motion.div
                            layoutId="active-bezel-ring"
                            className="absolute -inset-[1px] border rounded-xl pointer-events-none z-10"
                            style={{ borderColor: activeTheme.color }}
                            transition={{ type: "spring", stiffness: 350, damping: 28 }}
                          />
                        )}
                        <span className="text-xs font-bold block">{item.name}</span>
                        <span className="text-[10px] opacity-40 block mt-0.5 leading-snug">{item.desc}</span>
                        <span className="text-[10px] font-bold block mt-2" style={{ color: isSelected ? activeTheme.color : "currentColor" }}>
                          {priceDiff === 0 ? "Standard" : priceDiff > 0 ? `+$${priceDiff}` : `-$${Math.abs(priceDiff)}`}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

            </div>

            {/* TAB SECTION: Detailed Story/Specs/Shipping Accordion */}
            <div className={`p-5 ${activeVariant.cardClass}`}>
              <div className="flex items-center gap-1 border-b border-current/10 pb-2">
                {[
                  { id: "specs", label: "Specs Sheet" },
                  { id: "story", label: "Horology Story" },
                  { id: "shipping", label: "Shipping Policy" }
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className="px-3.5 py-1.5 rounded-lg text-xs font-bold tracking-wide uppercase cursor-pointer transition-colors relative"
                    style={{ color: activeTab === tab.id ? "currentColor" : undefined }}
                  >
                    <span className={activeTab === tab.id ? "opacity-100" : "opacity-40"}>{tab.label}</span>
                    {activeTab === tab.id && (
                      <motion.div
                        layoutId="active-tab-indicator"
                        className="absolute bottom-[-9px] left-2 right-2 h-0.5"
                        style={{ backgroundColor: activeTheme.color }}
                      />
                    )}
                  </button>
                ))}
              </div>

              <div className="pt-4 text-xs leading-relaxed opacity-60 min-h-[80px]">
                {activeTab === "specs" && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2">
                    <div className="flex justify-between py-1 border-b border-current/5">
                      <span className="opacity-60">Reference Model</span>
                      <span className="font-mono">AUR-2.5D-CH89</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-current/5">
                      <span className="opacity-60">Case Dimensions</span>
                      <span className="font-mono">41.5mm x 12.8mm</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-current/5">
                      <span className="opacity-60">Lug Width</span>
                      <span className="font-mono">20mm standard</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-current/5">
                      <span className="opacity-60">Gasket seals</span>
                      <span className="font-mono">Viton Dual-Core</span>
                    </div>
                  </div>
                )}
                {activeTab === "story" && (
                  <p>
                    Every Aurelia watch is manually hand-balanced in Geneva using microscopic synthetic sapphire pinions. Designed as a tribute to vintage mechanical chronographs but stripped of heavy decorative assets to embrace pure layout shapes, geometric accents, and hardware-accelerated precision interfaces.
                  </p>
                )}
                {activeTab === "shipping" && (
                  <p>
                    Complimentary overnight shipping included for all domestic configure orders. Arrives inside a flat monolithic padded lock-box with certified chronometer cards, micro-tool adjustment bars, and user instructions. Fully insured, requiring adult signature.
                  </p>
                )}
              </div>
            </div>

            {/* Bottom Actions Panel */}
            <div className={`p-5 flex flex-col md:flex-row gap-4 items-center justify-between ${activeVariant.cardClass}`}>
              <div className="flex items-center gap-3 w-full md:w-auto">
                <div className="w-10 h-10 rounded-xl bg-current/5 border border-current/10 flex items-center justify-center opacity-80">
                  <Shield size={18} />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold">5-Year Global SLA Warranty</span>
                  <span className="text-[10px] opacity-40">Lifetime movement repair package</span>
                </div>
              </div>
              
              {/* Add to Cart CTA with Sweeping Gloss Reflection & Tactile scale feedback */}
              <motion.button
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.97 }}
                className={`w-full md:w-auto px-8 py-3.5 rounded-xl font-bold uppercase tracking-widest text-xs cursor-pointer relative overflow-hidden transition-all duration-200 ${activeVariant.buttonClass} text-current hover:text-current`}
                style={{
                  boxShadow: activeVariant.id === "brutal" ? "none" : `0 8px 16px ${activeTheme.color}25`
                }}
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <ShoppingCart size={15} /> Add Instrument to Cart
                </span>
                
                {/* Hardware-Accelerated Gloss Sweep Effect */}
                <motion.div
                  initial={{ x: "-150%" }}
                  whileHover={{ x: "150%" }}
                  transition={{ duration: 0.85, ease: "easeInOut" }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/45 to-transparent pointer-events-none skew-x-12"
                />
              </motion.button>
            </div>

          </div>

        </div>

        {/* Global info text */}
        <div className="text-center text-[10px] opacity-30 tracking-wide uppercase py-4">
          Aurelia premium e-commerce variant interface · optimized for zero-GPU layout rendering
        </div>

      </div>
    </div>
  );
}
