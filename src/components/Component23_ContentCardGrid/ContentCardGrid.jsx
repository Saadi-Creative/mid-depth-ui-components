import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Grid, Calendar, Clock, BookOpen, Layers } from "lucide-react";

// Themes definition
const THEMES = [
  {
    id: "oceanBlue",
    name: "Ocean Blue",
    color: "#3b82f6",
    rgb: "59, 130, 246",
    border: "border-blue-500/15",
    text: "text-blue-400",
    bg: "bg-blue-500",
    accentBg: "bg-blue-500/10",
    hoverBg: "hover:bg-blue-500/15",
    glow: "shadow-[0_0_12px_rgba(59,130,246,0.25)]"
  },
  {
    id: "sunsetGold",
    name: "Sunset Gold",
    color: "#ffb800",
    rgb: "255, 184, 0",
    border: "border-amber-500/15",
    text: "text-amber-400",
    bg: "bg-amber-500",
    accentBg: "bg-amber-500/10",
    hoverBg: "hover:bg-amber-500/15",
    glow: "shadow-[0_0_12px_rgba(255,184,0,0.25)]"
  },
  {
    id: "forestGreen",
    name: "Forest Green",
    color: "#10b981",
    rgb: "16, 185, 129",
    border: "border-emerald-500/15",
    text: "text-emerald-400",
    bg: "bg-emerald-500",
    accentBg: "bg-emerald-500/10",
    hoverBg: "hover:bg-emerald-500/15",
    glow: "shadow-[0_0_12px_rgba(16,185,129,0.25)]"
  },
  {
    id: "deepPlum",
    name: "Deep Plum",
    color: "#8b5cf6",
    rgb: "139, 92, 246",
    border: "border-purple-500/15",
    text: "text-purple-400",
    bg: "bg-purple-500",
    accentBg: "bg-purple-500/10",
    hoverBg: "hover:bg-purple-500/15",
    glow: "shadow-[0_0_12px_rgba(139,92,246,0.25)]"
  },
  {
    id: "copper",
    name: "Copper",
    color: "#f97316",
    rgb: "249, 115, 22",
    border: "border-orange-500/15",
    text: "text-orange-400",
    bg: "bg-orange-500",
    accentBg: "bg-orange-500/10",
    hoverBg: "hover:bg-orange-500/15",
    glow: "shadow-[0_0_12px_rgba(249,115,22,0.25)]"
  }
];

// Mock card items
const CARDS = [
  {
    id: 1,
    title: "Building 2.5D spring physics layouts",
    category: "engineering",
    date: "May 26, 2026",
    readTime: "8 min read",
    img: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?q=80&w=600&auto=format&fit=crop",
    desc: "A deep dive into friction ratios, mass coefficients, and coordinate calculations for overlay containers."
  },
  {
    id: 2,
    title: "Secrets of liquid interface designs",
    category: "design",
    date: "May 18, 2026",
    readTime: "5 min read",
    img: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600&auto=format&fit=crop",
    desc: "How simulated surface tension and radial color bleed transitions create fluid, organic UI models."
  },
  {
    id: 3,
    title: "Calibrating SVG path animations",
    category: "tutorials",
    date: "May 09, 2026",
    readTime: "12 min read",
    img: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=600&auto=format&fit=crop",
    desc: "Configuring layout offsets and control handles to animate vector path graphs smoothly on scroll events."
  },
  {
    id: 4,
    title: "Debugging mobile viewport input lags",
    category: "engineering",
    date: "April 24, 2026",
    readTime: "6 min read",
    img: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=600&auto=format&fit=crop",
    desc: "Resolving cursor focus delays and button active state delays on Safari WebKit screens."
  },
  {
    id: 5,
    title: "The future of semantic UI structures",
    category: "insights",
    date: "April 10, 2026",
    readTime: "4 min read",
    img: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=600&auto=format&fit=crop",
    desc: "Leveraging structured components, keyboard tag navigation, and screen readers to maximize grid accessibility."
  },
  {
    id: 6,
    title: "Optimizing GPU canvas renders",
    category: "insights",
    date: "March 28, 2026",
    readTime: "9 min read",
    img: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=600&auto=format&fit=crop",
    desc: "Reducing composited paint ticks during fast element drags by utilizing will-change attributes."
  }
];

export default function ContentCardGrid() {
  const [activeTheme, setActiveTheme] = useState(THEMES[0]);
  const [filter, setFilter] = useState("all");

  const filteredCards = filter === "all" 
    ? CARDS 
    : CARDS.filter(c => c.category === filter);

  // Stagger entry configurations
  const gridVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: { type: "spring", stiffness: 180, damping: 20 }
    }
  };

  return (
    <div className="min-h-screen p-4 md:p-8 select-none bg-[#060810]"
      style={{ fontFamily: "'Inter', sans-serif" }}>
      
      <div className="w-full max-w-6xl mx-auto flex flex-col gap-6">
        
        {/* Header Board */}
        <div className="bg-[#0a0d1a] border border-white/5 rounded-2xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-[inset_0_2px_4px_rgba(0,0,0,0.6)]">
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-mono tracking-widest text-white/40 uppercase block">
              COMPONENT ARCHIVE
            </span>
            <h1 className="text-xl md:text-2xl font-black text-white tracking-tight"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Dynamic Content Card Grid
            </h1>
            <p className="text-xs text-white/45 max-w-lg">
              A responsive catalog using a flat-layered aesthetic. Hovering triggers micro-shadow extensions, image expansions, and magnetic arrow glides.
            </p>
          </div>

          {/* Theme Selector Accent */}
          <div className="flex flex-col gap-1.5 self-end md:self-auto">
            <span className="text-[9px] uppercase tracking-widest text-white/30 font-bold font-mono">
              Card Theme Swatch
            </span>
            <div className="flex items-center gap-2 bg-black/35 px-3 py-2 rounded-xl border border-white/5">
              {THEMES.map(theme => (
                <button
                  key={theme.id}
                  onClick={() => setActiveTheme(theme)}
                  className="w-4 h-4 rounded-full cursor-pointer relative flex items-center justify-center transition-transform active:scale-90"
                  style={{ backgroundColor: theme.color }}
                  aria-label={`Theme ${theme.name}`}
                >
                  {activeTheme.id === theme.id && (
                    <motion.div
                      layoutId="active-grid-card-theme-ring"
                      className="absolute -inset-1 rounded-full border border-current opacity-80"
                      style={{ color: theme.color }}
                      transition={{ type: "spring", stiffness: 350, damping: 25 }}
                    />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Category Filters Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 bg-[#0a0d1a] border border-white/5 px-4 py-3 rounded-2xl shadow-[inset_0_1px_1px_rgba(0,0,0,0.4)]">
          <div className="flex flex-wrap items-center gap-1.5">
            {["all", "engineering", "design", "tutorials", "insights"].map(cat => {
              const isActive = filter === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`px-3.5 py-1.5 rounded-xl text-[10px] uppercase font-bold font-mono tracking-wider transition-all duration-200 cursor-pointer relative ${
                    isActive 
                      ? "text-black" 
                      : "text-white/40 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="active-grid-filter"
                      className="absolute inset-0 rounded-xl"
                      style={{ backgroundColor: activeTheme.color }}
                      transition={{ type: "spring", stiffness: 320, damping: 28 }}
                    />
                  )}
                  <span className="relative z-10">{cat}</span>
                </button>
              );
            })}
          </div>

          <div className="hidden sm:flex items-center gap-1.5 text-white/30 text-[10px] font-mono">
            <Grid size={11} />
            <span>Grid Display ({filteredCards.length} matches)</span>
          </div>
        </div>

        {/* Cards Grid */}
        <motion.div
          variants={gridVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-2"
        >
          <AnimatePresence mode="popLayout">
            {filteredCards.map((card) => (
              <motion.div
                key={card.id}
                layout
                variants={cardVariants}
                initial="hidden"
                animate="show"
                exit={{ opacity: 0, scale: 0.9, y: 15 }}
                transition={{ type: "spring", stiffness: 200, damping: 22 }}
              >
                <GridCard card={card} activeTheme={activeTheme} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

      </div>
    </div>
  );
}

/* Card Component with interactive hovers */
function GridCard({ card, activeTheme }) {
  const [isHovered, setIsHovered] = useState(false);

  const getCatStyle = (cat) => {
    switch (cat) {
      case "engineering": return "text-cyan-400";
      case "design": return "text-rose-400";
      case "tutorials": return "text-amber-400";
      default: return "text-indigo-400";
    }
  };

  return (
    <motion.div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
      }}
      whileHover={{ y: -3 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      className="bg-[#0a0d1a] border border-white/5 rounded-2xl overflow-hidden relative flex flex-col h-[380px] transition-all duration-300"
      style={{
        boxShadow: isHovered 
          ? `0 15px 30px rgba(0,0,0,0.45), 0 0 10px rgba(${activeTheme.rgb},0.03), inset 0 1px 0 rgba(255,255,255,0.03)`
          : "0 4px 10px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.01)"
      }}
    >
      {/* Card Image Container */}
      <div className="h-44 relative overflow-hidden flex-shrink-0">
        
        {/* Dynamic Image hover tint overlay */}
        <motion.div
          animate={{ opacity: isHovered ? 0.25 : 0 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 z-10 pointer-events-none"
          style={{ backgroundColor: activeTheme.color }}
        />

        {/* Overlay Dark Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0d1a] to-transparent z-10" />

        {/* Featured Image Zooming */}
        <motion.img
          src={card.img}
          alt={card.title}
          animate={{ scale: isHovered ? 1.03 : 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full h-full object-cover"
        />

        {/* Floating Category Tag */}
        <span 
          className={`absolute top-4 left-4 z-20 px-2.5 py-0.5 rounded-lg text-[9px] font-black uppercase font-mono tracking-wider border transition-all duration-300 ${activeTheme.border} ${activeTheme.text} ${activeTheme.accentBg}`}
          style={{
            boxShadow: isHovered ? `0 0 8px rgba(${activeTheme.rgb},0.2)` : "none"
          }}
        >
          {card.category}
        </span>
      </div>

      {/* Card Body */}
      <div className="flex-1 p-5 flex flex-col justify-between">
        <div className="flex flex-col gap-2">
          {/* Metadata row */}
          <div className="flex items-center gap-3 text-[9px] font-semibold text-white/30 font-mono">
            <span className="flex items-center gap-1">
              <Calendar size={10} />
              {card.date}
            </span>
            <span className="flex items-center gap-1">
              <Clock size={10} />
              {card.readTime}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-xs md:text-sm font-black text-white leading-snug group-hover:text-white transition-colors duration-200 mt-1 line-clamp-2">
            {card.title}
          </h3>

          {/* Description */}
          <p className="text-[10px] text-white/40 leading-relaxed line-clamp-2">
            {card.desc}
          </p>
        </div>

        {/* Footer Actions: Read More Indicator */}
        <div className="flex items-center justify-between pt-3 border-t border-white/5 mt-4">
          <div className="flex items-center gap-1 text-[9px] font-mono text-white/30">
            <BookOpen size={10} />
            <span>ARTICLE</span>
          </div>

          <div 
            className="flex items-center gap-1.5 text-[9px] font-mono font-black uppercase tracking-wider cursor-pointer"
            style={{ color: activeTheme.color }}
          >
            <span>Read More</span>
            <motion.div
              animate={{ x: isHovered ? 5 : 0 }}
              transition={{ type: "spring", stiffness: 180, damping: 14 }}
              className="flex items-center"
            >
              <ArrowRight size={11} strokeWidth={3} />
            </motion.div>
          </div>
        </div>

      </div>

    </motion.div>
  );
}
