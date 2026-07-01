import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, HelpCircle, MessageSquare, ChevronDown, 
  ThumbsUp, ThumbsDown
} from "lucide-react";
import { useGlobalTheme } from "../../themes/ThemeContext";

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
  const { activeVariant } = useGlobalTheme();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [expandedId, setExpandedId] = useState(1);
  const [feedbackState, setFeedbackState] = useState({}); // Stores thumbs rating: { [faqId]: 'up' | 'down' }
  const [particles, setParticles] = useState([]); // Array of click particles: { id, x, y, dx, dy, color, symbol }

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
    border: `border-current/15`,
    text: activeVariant.textClass,
    bg: "",
    accentBg: `rgba(${rgbStr}, 0.1)`,
    glow: `shadow-[0_0_15px_rgba(${rgbStr},0.15)]`
  };

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
      className={`min-h-screen flex flex-col justify-start p-4 md:p-8 select-none overflow-x-hidden transition-colors duration-500 ${activeVariant.canvasClass}`}
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      <div className="w-full max-w-3xl mx-auto flex flex-col gap-6">
        
        {/* Header Controls Bento Block */}
        <div className={`p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 ${activeVariant.cardClass}`}>
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-mono tracking-widest opacity-40 uppercase block">
              Support Center UX
            </span>
            <h1 
              className="text-xl md:text-2xl font-bold tracking-tight"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Tactile FAQ Accordion Stack
            </h1>
            <p className="text-xs opacity-45 max-w-xl">
              Cards utilize dynamic overlapping layouts. Opening cards pushes downstream cards using fluid spring motion. Give thumbs-up/down to trigger physics particle feedback.
            </p>
          </div>
        </div>

        {/* Search & Category Filter Controls Card */}
        <div className={`p-4 md:p-5 flex flex-col gap-4 ${activeVariant.cardClass}`}>
          <div className="relative w-full">
            <Search className="absolute left-4.5 top-1/2 -translate-y-1/2 opacity-30 w-4.5 h-4.5" />
            <input 
              type="text"
              placeholder="Search help topics, features, customization options..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full text-xs md:text-sm pl-11 pr-4 py-3 outline-none transition-all ${activeVariant.inputClass}`}
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
                    ? `text-white ${activeVariant.buttonClass} font-black` 
                    : "bg-current/5 opacity-50 border border-current/5 hover:opacity-100"
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
                    className={`relative overflow-hidden transition-all duration-200 cursor-pointer ${activeVariant.cardClass}`}
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
                            isExpanded ? activeTheme.accentBg : "bg-current/5"
                          }`}
                          style={{ color: isExpanded ? activeTheme.color : (activeVariant.mode === "dark" ? "rgba(255,255,255,0.25)" : "rgba(0,0,0,0.4)") }}
                        >
                          <HelpCircle size={14} />
                        </div>
                        <span className={`text-xs md:text-sm font-extrabold tracking-wide transition-colors ${
                          isExpanded ? "opacity-100" : "opacity-80 hover:opacity-100"
                        }`}>
                          {faq.question}
                        </span>
                      </div>
                      
                      <motion.div
                        animate={{ rotate: isExpanded ? 180 : 0 }}
                        transition={{ type: "spring", stiffness: 260, damping: 20 }}
                        className="opacity-30 flex-shrink-0"
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
                          className="overflow-hidden border-t border-current/5 bg-current/[0.02]"
                        >
                          <div className="p-5 flex flex-col gap-4 text-xs md:text-sm leading-relaxed opacity-80 relative">
                            {faq.answer}

                            {/* Micro-interaction Feedback Panel */}
                            <div className="flex items-center justify-between border-t border-current/5 pt-4 mt-2">
                              <span className="text-[10px] uppercase font-mono tracking-widest opacity-40">
                                Topic: {faq.category}
                              </span>

                              <div className="flex items-center gap-2 relative">
                                <span className="text-[10px] opacity-60 font-bold mr-1 select-none">
                                  Was this helpful?
                                </span>

                                {/* Thumbs Up Button */}
                                <button
                                  onClick={(e) => spawnParticles(e, faq.id, "up")}
                                  className={`w-8 h-8 rounded-lg cursor-pointer border flex items-center justify-center transition-all duration-150 relative active:scale-90 ${
                                    feedback === "up" 
                                      ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400" 
                                      : "bg-current/5 border-current/5 opacity-55 hover:opacity-100"
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
                                      : "bg-current/5 border-current/5 opacity-55 hover:opacity-100"
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
                className={`border border-dashed border-current/25 p-10 text-center flex flex-col items-center gap-3 ${activeVariant.cardClass}`}
              >
                <div className="w-10 h-10 rounded-full bg-current/5 flex items-center justify-center opacity-40">
                  <MessageSquare size={16} />
                </div>
                <span className="text-xs font-bold opacity-50">
                  No FAQ topics match your filter or search query
                </span>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setActiveCategory("All");
                  }}
                  className={`text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-lg border border-current/10 cursor-pointer hover:bg-current/5 ${activeTheme.text}`}
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
