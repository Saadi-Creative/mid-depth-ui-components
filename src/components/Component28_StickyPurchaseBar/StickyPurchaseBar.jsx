import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, Check, Loader2, Star } from "lucide-react";
import { useGlobalTheme } from "../../themes/ThemeContext";

const VARIANTS = [
  { 
    id: "var-1", 
    name: "Obsidian Black", 
    color: "#18181b", 
    img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=80" 
  },
  { 
    id: "var-2", 
    name: "Nebula Purple", 
    color: "#6366f1", 
    img: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=500&auto=format&fit=crop&q=80" 
  },
  { 
    id: "var-3", 
    name: "Ember Orange", 
    color: "#f97316", 
    img: "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=500&auto=format&fit=crop&q=80" 
  }
];

export default function StickyPurchaseBar() {
  const { activeVariant } = useGlobalTheme();
  const [selectedVariant, setSelectedVariant] = useState(VARIANTS[0]);
  const [scrollY, setScrollY] = useState(0);
  const [status, setStatus] = useState("idle"); // idle, loading, success, hide
  const [flipKey, setFlipKey] = useState(0);

  const mainButtonRef = useRef(null);
  const [showSticky, setShowSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      if (mainButtonRef.current) {
        const rect = mainButtonRef.current.getBoundingClientRect();
        setShowSticky(rect.bottom < 0);
      }
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleVariantChange = (v) => {
    setSelectedVariant(v);
    setFlipKey(prev => prev + 1);
  };

  const handleAddToCart = () => {
    if (status !== "idle") return;
    setStatus("loading");
    
    setTimeout(() => {
      setStatus("success");
      setTimeout(() => {
        setStatus("hide");
        setTimeout(() => {
          setStatus("idle");
        }, 800);
      }, 1500);
    }, 1500);
  };

  return (
    <div 
      className={`min-h-screen relative transition-colors duration-500 py-12 px-6 ${activeVariant.canvasClass} font-secondary`}
    >
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

      {/* Main E-Commerce Page Layout */}
      <div className="max-w-6xl mx-auto px-6 relative z-[var(--z-base)]">
        <div className="flex items-center gap-2 text-xs opacity-50 font-mono-theme mb-8">
          <span>STORE</span>
          <span>/</span>
          <span>AUDIO EQUIPMENT</span>
          <span>/</span>
          <span className="opacity-80">PRO-ACOUSTICS V2</span>
        </div>

        {/* Product Hero Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          {/* Card Frame */}
          <div className="flex flex-col gap-4">
            <div className={`relative aspect-square p-8 flex items-center justify-center overflow-hidden transition-all duration-300 ${activeVariant.cardClass}`}>
              <AnimatePresence mode="wait">
                <motion.img
                  key={selectedVariant.id}
                  initial={{ opacity: 0, scale: 0.9, y: 15 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: -15 }}
                  transition={activeVariant.transition}
                  src={selectedVariant.img}
                  alt={selectedVariant.name}
                  className="max-h-full object-contain"
                />
              </AnimatePresence>

              <div className="absolute top-4 left-4 bg-white/5 border border-white/10 px-3 py-1 rounded-full text-[10px] font-mono-theme tracking-widest opacity-60">
                PREMIUM CLASS
              </div>
            </div>
            
            {/* Gallery Thumbnails */}
            <div className="grid grid-cols-3 gap-4">
              {VARIANTS.map((v) => (
                <button
                  key={v.id}
                  onClick={() => handleVariantChange(v)}
                  className={`relative aspect-video p-2 flex items-center justify-center overflow-hidden transition-all duration-300 border ${
                    selectedVariant.id === v.id 
                      ? "border-current opacity-100" 
                      : "border-current/10 opacity-50 hover:opacity-80"
                  }`}
                  style={{
                    borderRadius: "var(--theme-border-radius-action)"
                  }}
                >
                  <img src={v.img} alt={v.name} className="h-full object-contain" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Specs & Form */}
          <div className="flex flex-col gap-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
                </div>
                <span className="text-xs opacity-50 font-mono-theme">(142 Customer Reviews)</span>
              </div>
              <h1 className="text-3xl font-black tracking-tight leading-none mb-3 font-primary">
                Acoustic Titan Neo-X
              </h1>
              <p className="text-sm opacity-70 leading-relaxed font-secondary">
                Engineered with dual-layer hybrid drivers and carbon-fiber diaphragms, offering pure reference-grade acoustics and high-fidelity adaptive isolation.
              </p>
            </div>

            {/* Price with highlights */}
            <div className={`p-4 flex items-center justify-between transition-all duration-300 ${activeVariant.cardClass}`}>
              <div>
                <span className="text-[9px] opacity-40 uppercase tracking-widest block font-mono-theme">Special Release Price</span>
                <span className="text-2xl font-black font-mono-theme" style={{ color: activeVariant.triggerColor }}>
                  $249.00
                </span>
                <span className="text-xs opacity-35 line-through ml-2 font-mono-theme">$329.00</span>
              </div>
              <div className="bg-emerald-500/10 text-emerald-400 px-2.5 py-1 rounded-lg text-xs font-mono-theme border border-emerald-500/25">
                SAVE 24%
              </div>
            </div>

            {/* Configuration Selectors */}
            <div className="flex flex-col gap-4">
              <div>
                <span className="text-xs opacity-50 uppercase tracking-widest font-mono-theme block mb-2">Select Accent Finish</span>
                <div className="flex gap-3">
                  {VARIANTS.map((v) => (
                    <button
                      key={v.id}
                      onClick={() => handleVariantChange(v)}
                      className={`flex items-center gap-2 px-3 py-2 border text-xs cursor-pointer transition-all ${
                        selectedVariant.id === v.id
                          ? "border-current opacity-100 font-bold"
                          : "border-current/15 opacity-40 hover:opacity-75"
                      }`}
                      style={{
                        borderRadius: "var(--theme-border-radius-action)"
                      }}
                    >
                      <span className="w-3.5 h-3.5 rounded-full border border-black" style={{ backgroundColor: v.color }} />
                      <span>{v.name.split(" ")[0]}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Static Purchase Button container */}
            <div ref={mainButtonRef} className="pt-4 border-t border-current/10 flex flex-col gap-3">
              <button
                onClick={handleAddToCart}
                className={`w-full py-4 font-bold uppercase tracking-wider text-xs flex items-center justify-center gap-2 cursor-pointer transition-all duration-300 ${activeVariant.buttonClass}`}
                style={{
                  borderRadius: "var(--theme-border-radius-action)"
                }}
              >
                <ShoppingCart size={16} />
                Add to Cart — $249.00
              </button>
            </div>
          </div>
        </div>

        {/* Informative instructions for the showcase */}
        <div className={`mt-20 p-6 transition-all duration-300 ${activeVariant.cardClass} max-w-2xl`}>
          <h4 className="text-xs uppercase tracking-widest font-mono-theme font-bold mb-2">Showcase Testing Guidelines</h4>
          <p className="text-xs opacity-50 leading-relaxed mb-4 font-secondary">
            Scroll down the page. When the primary "Add to Cart" button above scrolls past the top of the viewport, the sticky purchase bar will slide into view. 
          </p>
        </div>

        <div className="h-[80vh]" />
      </div>

      {/* Sticky Product Purchase Bar */}
      <AnimatePresence>
        {(showSticky && status !== "hide") && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={activeVariant.transition}
            className={`fixed bottom-6 left-4 right-4 md:left-1/2 md:right-auto md:-translate-x-1/2 md:w-[680px] p-3.5 flex items-center justify-between gap-4 z-[var(--z-sticky)] transition-all duration-300 ${activeVariant.cardClass}`}
          >
            {/* Left side: Thumbnail & Product Info */}
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 overflow-hidden border border-current/10 bg-black flex-shrink-0 relative" style={{ borderRadius: "var(--theme-border-radius-action)" }}>
                <AnimatePresence mode="wait">
                  <motion.img
                    key={flipKey}
                    initial={{ rotateX: 90, opacity: 0 }}
                    animate={{ rotateX: 0, opacity: 1 }}
                    exit={{ rotateX: -90, opacity: 0 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                    src={selectedVariant.img}
                    alt="Thumbnail"
                    className="w-full h-full object-cover"
                  />
                </AnimatePresence>
              </div>

              <div>
                <h4 className="text-xs font-black leading-none font-primary">Acoustic Titan Neo-X</h4>
                <div className="flex items-center gap-1.5 mt-1 font-mono-theme">
                  <span className="text-[10px] font-black" style={{ color: activeVariant.triggerColor }}>$249.00</span>
                  <span className="text-[8px] opacity-40">{selectedVariant.name}</span>
                </div>
              </div>
            </div>

            {/* Middle: Mini variant-picker (Removed settings gear) */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                {VARIANTS.map(v => (
                  <button
                    key={v.id}
                    onClick={() => handleVariantChange(v)}
                    className="w-4 h-4 rounded-full border border-black cursor-pointer relative flex items-center justify-center"
                    style={{ backgroundColor: v.color }}
                  >
                    {selectedVariant.id === v.id && (
                      <motion.div
                        layoutId="active-variant-ring-sticky"
                        className="absolute -inset-1 rounded-full border-2"
                        style={{ borderColor: activeVariant.triggerColor }}
                      />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Right: Morphing Add to Cart Button */}
            <div className="w-36 flex-shrink-0 flex justify-end">
              <motion.button
                layout
                onClick={handleAddToCart}
                disabled={status !== "idle"}
                whileTap={status === "idle" ? { scale: 0.95 } : {}}
                transition={activeVariant.transition}
                className={`h-10 font-bold font-mono-theme text-[10px] uppercase tracking-wider transition-all duration-300 cursor-pointer flex items-center justify-center gap-1.5 px-4 ${
                  status === "success"
                    ? "bg-emerald-500 text-white w-10 p-0"
                    : status === "loading"
                      ? "bg-white/5 text-white/30 border border-white/5 w-10 p-0"
                      : `${activeVariant.buttonClass} w-full`
                }`}
                style={{ 
                  borderRadius: (status === "loading" || status === "success") ? "50%" : "var(--theme-border-radius-action)"
                }}
              >
                {status === "loading" ? (
                  <Loader2 size={14} className="animate-spin text-white" />
                ) : status === "success" ? (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 15 }}
                  >
                    <Check size={16} strokeWidth={3} />
                  </motion.div>
                ) : (
                  <>
                    <ShoppingCart size={12} />
                    <span>Add to Cart</span>
                  </>
                )}
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
