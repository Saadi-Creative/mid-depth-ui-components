import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, HelpCircle, MessageSquare, ChevronDown, 
  ThumbsUp, ThumbsDown, Send, Sparkles, RefreshCw
} from "lucide-react";

// Theme swatches
const THEMES = [
  {
    id: "indigo",
    name: "Orbit Indigo",
    color: "#6366f1",
    rgb: "99, 102, 241",
    bg: "bg-indigo-500",
    hoverBg: "hover:bg-indigo-600",
    text: "text-indigo-400",
    accentBg: "bg-indigo-500/10",
    border: "border-indigo-500/15",
    glow: "shadow-indigo-500/15"
  },
  {
    id: "cyan",
    name: "Neon Teal",
    color: "#00e5ff",
    rgb: "0, 229, 255",
    bg: "bg-cyan-500",
    hoverBg: "hover:bg-cyan-600",
    text: "text-cyan-400",
    accentBg: "bg-cyan-500/10",
    border: "border-cyan-500/15",
    glow: "shadow-cyan-500/15"
  },
  {
    id: "rose",
    name: "Cyber Rose",
    color: "#ff007f",
    rgb: "255, 0, 127",
    bg: "bg-rose-500",
    hoverBg: "hover:bg-rose-600",
    text: "text-rose-400",
    accentBg: "bg-rose-500/10",
    border: "border-rose-500/15",
    glow: "shadow-rose-500/15"
  },
  {
    id: "toxic",
    name: "Toxic Lime",
    color: "#39ff14",
    rgb: "57, 255, 20",
    bg: "bg-lime-500",
    hoverBg: "hover:bg-lime-600",
    text: "text-lime-400",
    accentBg: "bg-lime-500/10",
    border: "border-lime-500/15",
    glow: "shadow-lime-500/15"
  },
  {
    id: "amber",
    name: "Amber Glow",
    color: "#ffb800",
    rgb: "255, 184, 0",
    bg: "bg-amber-500",
    hoverBg: "hover:bg-amber-600",
    text: "text-amber-400",
    accentBg: "bg-amber-500/10",
    border: "border-amber-500/15",
    glow: "shadow-amber-500/15"
  }
];

// Seed FAQ Items
const FAQ_ITEMS = [
  {
    id: 1,
    question: "How do I customize the 2.5D active theme globally?",
    answer: "You can sync the active theme context to your main layout. Each modular component exports a THEMES configuration matrix. By importing and mapping these variables to a unified layout provider, the border-glows, text-tints, and SVG gradients adjust collectively.",
    category: "Customization"
  },
  {
    id: 2,
    question: "Do these spring components support touch screen dragging?",
    answer: "Yes, absolutely! The drag tracking systems use Framer Motion's physical gesture bounds. PointerEvents are mapped to track touch coordinates in real time, delivering identical 3D tilt and slide interactions on mobile viewports.",
    category: "Technical"
  },
  {
    id: 3,
    question: "Is there a significant latency cost for layout scaling?",
    answer: "We use CSS transform scales and GPU-accelerated transition properties. By using Framer Motion's 'layout' prop, components calculate offset projections, bypassing traditional browser layout reflow costs and ensuring stable 60 FPS transitions.",
    category: "Performance"
  },
  {
    id: 4,
    question: "How can I integrate these components with Tailwind v4?",
    answer: "These components are built using native standard utility selectors. Simply register the components directory in your compiler configurations. Color properties utilize HSL boundaries to maintain clean, theme-adjustable values.",
    category: "Integration"
  },
  {
    id: 5,
    question: "Can I use custom icons inside the header tags?",
    answer: "Yes. All component headings utilize React props that accept functional Lucide components. You can import any vector asset and drop it directly into the component registry configuration inside App.jsx.",
    category: "Customization"
  }
];

export default function TactileFAQAccordion() {
  const [activeTheme, setActiveTheme] = useState(THEMES[0]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [expandedId, setExpandedId] = useState(1);
  const [feedbackState, setFeedbackState] = useState({}); // Stores thumbs rating: { [faqId]: 'up' | 'down' }
  const [particles, setParticles] = useState([]); // Array of click particles: { id, x, y, dx, dy, color, symbol }

  // Extract categories
  const categories = ["All", ...new Set(FAQ_ITEMS.map(item => item.category))];

  // Filter FAQs
  const filteredFAQs = FAQ_ITEMS.filter(item => {
    const matchesSearch = item.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === "All" || item.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  // Spawn visual particle feedback splash
  const spawnParticles = (e, faqId, type) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;
    
    // Choose particle content based on rating type
    const emojiSymbol = type === "up" ? "👍" : "👎";
    const particleColors = type === "up" ? ["#10b981", "#34d399", "#a7f3d0"] : ["#ef4444", "#f87171", "#fca5a5"];
    
    const newParticles = Array.from({ length: 12 }).map((_, idx) => {
      const angle = (Math.PI * 2 * idx) / 12 + (Math.random() - 0.5) * 0.5;
      const velocity = 35 + Math.random() * 50;
      return {
        id: `${faqId}-${Date.now()}-${idx}`,
        startX: clickX,
        startY: clickY,
        targetX: clickX + Math.cos(angle) * velocity,
        targetY: clickY + Math.sin(angle) * velocity - 25, // Drifts upward
        color: particleColors[Math.floor(Math.random() * particleColors.length)],
        size: 3 + Math.random() * 5,
        symbol: Math.random() > 0.6 ? emojiSymbol : "✨"
      };
    });

    setParticles(prev => [...prev, ...newParticles]);
    setFeedbackState(prev => ({ ...prev, [faqId]: type }));

    // Cleanup particles after animation
    setTimeout(() => {
      setParticles(prev => prev.filter(p => !newParticles.some(np => np.id === p.id)));
    }, 1000);
  };

  return (
    <div 
      className="min-h-screen flex flex-col justify-start p-4 md:p-8 select-none overflow-x-hidden" 
      style={{ background: "#060810", fontFamily: "'Inter', sans-serif" }}
    >
      <div className="w-full max-w-3xl mx-auto flex flex-col gap-6">
        
        {/* Header Controls Bento Block */}
        <div className="bg-[#0a0d1a] border border-white/5 rounded-2xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-[inset_0_2px_4px_rgba(0,0,0,0.6)]">
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-mono tracking-widest text-white/40 uppercase block">
              Support Center UX
            </span>
            <h1 
              className="text-xl md:text-2xl font-bold text-white tracking-tight"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Tactile FAQ Accordion Stack
            </h1>
            <p className="text-xs text-white/45 max-w-xl">
              Cards utilize dynamic overlapping layouts. Opening cards pushes downstream cards using fluid spring motion. Give thumbs-up/down to trigger physics particle feedback.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 flex-shrink-0">
            {/* Theme switcher */}
            <div className="flex flex-col gap-1.5">
              <span className="text-[9px] uppercase tracking-widest text-white/30 font-bold">
                Accordion Accent
              </span>
              <div className="flex items-center gap-2">
                {THEMES.map(theme => (
                  <button
                    key={theme.id}
                    onClick={() => setActiveTheme(theme)}
                    className="w-5 h-5 rounded-full cursor-pointer relative flex items-center justify-center transition-transform active:scale-90"
                    style={{ backgroundColor: theme.color }}
                    aria-label={`Switch Accent to ${theme.name}`}
                  >
                    {activeTheme.id === theme.id && (
                      <motion.div
                        layoutId="active-faq-border"
                        className="absolute -inset-1 rounded-full border border-current opacity-80"
                        style={{ color: theme.color }}
                        transition={{ type: "spring", stiffness: 350, damping: 28 }}
                      />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Search & Category Filter Controls Card */}
        <div className="bg-[#0a0d1a] border border-white/5 rounded-2xl p-4 md:p-5 flex flex-col gap-4 shadow-[inset_0_2px_4px_rgba(0,0,0,0.6)]">
          <div className="relative w-full">
            <Search className="absolute left-4.5 top-1/2 -translate-y-1/2 text-white/20 w-4.5 h-4.5" />
            <input 
              type="text"
              placeholder="Search help topics, features, customization options..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/[0.02] border border-white/5 hover:border-white/10 text-white placeholder-white/20 text-xs md:text-sm pl-11 pr-4 py-3 rounded-xl outline-none transition-all focus:border-current"
              style={{ color: searchQuery ? activeTheme.color : undefined }}
            />
          </div>

          {/* Tag filters */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-[10px] font-extrabold tracking-wide uppercase transition-all whitespace-nowrap cursor-pointer ${
                  activeCategory === cat 
                    ? `${activeTheme.bg} text-black font-black` 
                    : "bg-white/[0.03] text-white/50 border border-white/5 hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* 2.5D Tactile Accordion Card Stack */}
        <div className="flex flex-col gap-3 relative">
          <AnimatePresence initial={false}>
            {filteredFAQs.length > 0 ? (
              filteredFAQs.map((faq, index) => {
                const isExpanded = expandedId === faq.id;
                const feedback = feedbackState[faq.id];
                
                return (
                  <motion.div
                    key={faq.id}
                    layout="position"
                    transition={{
                      type: "spring",
                      stiffness: 180,
                      damping: 18,
                      mass: 0.8
                    }}
                    className={`bg-[#0a0d1a] border rounded-2xl relative overflow-hidden transition-all duration-200 cursor-pointer ${
                      isExpanded 
                        ? `border-white/10 ${activeTheme.glow} shadow-lg` 
                        : "border-white/5 hover:border-white/10"
                    }`}
                  >
                    {/* Glowing highlight indicator */}
                    {isExpanded && (
                      <motion.div 
                        layoutId="active-accordion-glow"
                        className="absolute inset-0 opacity-[0.04] pointer-events-none"
                        style={{
                          background: `radial-gradient(400px at 50% 0%, ${activeTheme.color} 0%, transparent 100%)`
                        }}
                      />
                    )}

                    {/* Question Header Card */}
                    <div 
                      onClick={() => setExpandedId(isExpanded ? null : faq.id)}
                      className="p-5 flex items-center justify-between gap-4 select-none relative z-10"
                    >
                      <div className="flex items-center gap-3.5">
                        <div 
                          className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all ${
                            isExpanded ? activeTheme.accentBg : "bg-white/[0.03]"
                          }`}
                          style={{ color: isExpanded ? activeTheme.color : "rgba(255,255,255,0.25)" }}
                        >
                          <HelpCircle size={14} />
                        </div>
                        <span className={`text-xs md:text-sm font-extrabold tracking-wide text-white/90 transition-colors ${
                          isExpanded ? "text-white" : "hover:text-white"
                        }`}>
                          {faq.question}
                        </span>
                      </div>
                      
                      <motion.div
                        animate={{ rotate: isExpanded ? 180 : 0 }}
                        transition={{ type: "spring", stiffness: 260, damping: 20 }}
                        className="text-white/30 flex-shrink-0"
                      >
                        <ChevronDown size={16} />
                      </motion.div>
                    </div>

                    {/* Answer content (AnimatePresence dynamic scaling) */}
                    <AnimatePresence initial={false}>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{
                            height: { type: "spring", stiffness: 180, damping: 18 },
                            opacity: { duration: 0.15 }
                          }}
                          className="overflow-hidden border-t border-white/[0.04] bg-[#080b15]/60"
                        >
                          <div className="p-5 flex flex-col gap-4 text-xs md:text-sm leading-relaxed text-white/55 relative">
                            {faq.answer}

                            {/* Micro-interaction Feedback Panel */}
                            <div className="flex items-center justify-between border-t border-white/[0.02] pt-4 mt-2">
                              <span className="text-[10px] uppercase font-mono tracking-widest text-white/25">
                                Topic: {faq.category}
                              </span>

                              <div className="flex items-center gap-2 relative">
                                <span className="text-[10px] text-white/30 font-bold mr-1 select-none">
                                  Was this helpful?
                                </span>

                                {/* Thumbs Up Button */}
                                <button
                                  onClick={(e) => spawnParticles(e, faq.id, "up")}
                                  className={`w-8 h-8 rounded-lg cursor-pointer border flex items-center justify-center transition-all duration-150 relative active:scale-90 ${
                                    feedback === "up" 
                                      ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400" 
                                      : "bg-white/[0.02] border-white/5 hover:bg-white/5 text-white/40 hover:text-white"
                                  }`}
                                  aria-label="Mark as helpful"
                                >
                                  <ThumbsUp size={12} />
                                </button>

                                {/* Thumbs Down Button */}
                                <button
                                  onClick={(e) => spawnParticles(e, faq.id, "down")}
                                  className={`w-8 h-8 rounded-lg cursor-pointer border flex items-center justify-center transition-all duration-150 relative active:scale-90 ${
                                    feedback === "down" 
                                      ? "bg-red-500/10 border-red-500/30 text-red-400" 
                                      : "bg-white/[0.02] border-white/5 hover:bg-white/5 text-white/40 hover:text-white"
                                  }`}
                                  aria-label="Mark as unhelpful"
                                >
                                  <ThumbsDown size={12} />
                                </button>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Bottom accent glow lines */}
                    {isExpanded && (
                      <motion.div 
                        layoutId="active-bar-accordion"
                        className="absolute bottom-0 left-0 right-0 h-[2px]"
                        style={{ backgroundColor: activeTheme.color }}
                      />
                    )}
                  </motion.div>
                );
              })
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-[#0a0d1a] border border-dashed border-white/10 rounded-2xl p-10 text-center flex flex-col items-center gap-3"
              >
                <div className="w-10 h-10 rounded-full bg-white/[0.02] flex items-center justify-center text-white/30">
                  <MessageSquare size={16} />
                </div>
                <span className="text-xs font-bold text-white/50">
                  No FAQ topics match your filter or search query
                </span>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setActiveCategory("All");
                  }}
                  className={`text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-lg border border-white/5 cursor-pointer hover:bg-white/5 ${activeTheme.text}`}
                >
                  Clear Filters
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Overlapping physics floating particles layers */}
          <div className="absolute inset-0 pointer-events-none z-[999] overflow-visible">
            {particles.map(p => (
              <motion.div
                key={p.id}
                initial={{ 
                  x: p.startX, 
                  y: p.startY, 
                  scale: 0.5, 
                  opacity: 1,
                  rotate: 0
                }}
                animate={{ 
                  x: p.targetX, 
                  y: p.targetY, 
                  scale: 0, 
                  opacity: 0,
                  rotate: 360
                }}
                transition={{ 
                  duration: 0.7, 
                  ease: [0.1, 0.8, 0.3, 1] 
                }}
                className="absolute text-xs flex items-center justify-center font-bold"
                style={{ 
                  color: p.color,
                  textShadow: `0 0 4px ${p.color}`
                }}
              >
                {p.symbol}
              </motion.div>
            ))}
          </div>

        </div>

      </div>
    </div>
  );
}
