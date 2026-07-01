import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ShoppingCart, Activity, Heart } from "lucide-react";
import { useGlobalTheme } from "../../themes/ThemeContext";

// Product Datasets
const PRODUCTS = [
  {
    id: 1,
    tag: "PREMIUM WEAR",
    title: "Zenith Chrono Watch",
    price: "$249.00",
    img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1000&auto=format&fit=crop",
    desc: "A minimal timekeeper engineered with matte black composite borders and micro-metric mechanical tracking weights."
  },
  {
    id: 2,
    tag: "ACOUSTIC LABS",
    title: "Aether Sound Pods",
    price: "$189.00",
    img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000&auto=format&fit=crop",
    desc: "Premium noise isolation buds configured with double-membrane dome chambers and custom fluid bass filters."
  },
  {
    id: 3,
    tag: "MODULAR GEAR",
    title: "Nova Core Pack",
    price: "$129.00",
    img: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=1000&auto=format&fit=crop",
    desc: "An EDC backpack structured with modular compression rows, cardholders, and weatherproof synthetic covers."
  },
  {
    id: 4,
    tag: "ERGONOMICS",
    title: "Vortex Keypad",
    price: "$219.00",
    img: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?q=80&w=1000&auto=format&fit=crop",
    desc: "Mechanical keyboard fitted with low-profile switches, custom keycaps, and customizable glowing accent boards."
  }
];

export default function HeroCarousel() {
  const { activeVariant } = useGlobalTheme();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [progress, setProgress] = useState(0);
  const [direction, setDirection] = useState(1); // 1 = right, -1 = left

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
    text: activeVariant.textClass,
    bg: "",
    hoverBg: "",
    accentBg: `rgba(${rgbStr}, 0.1)`,
    border: `rgba(${rgbStr}, 0.2)`,
    gradient: `from-[rgba(${rgbStr},0.05)] via-transparent to-transparent`,
    glow: `shadow-[0_0_15px_rgba(${rgbStr},0.3)]`
  };

  // Auto-advance logic with pause on hover
  useEffect(() => {
    if (isHovered) return;

    const timer = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          setDirection(1);
          setCurrentIndex(prev => (prev + 1) % PRODUCTS.length);
          return 0;
        }
        return p + 1;
      });
    }, 50); // Increment 1% every 50ms => 100% in 5000ms (5s)

    return () => clearInterval(timer);
  }, [isHovered, currentIndex]);

  const handleSelectSlide = (idx) => {
    setDirection(idx > currentIndex ? 1 : -1);
    setCurrentIndex(idx);
    setProgress(0);
  };

  const currentProduct = PRODUCTS[currentIndex];

  // Image transitions variants
  const imageVariants = {
    enter: (dir) => ({
      x: dir > 0 ? "100%" : "-100%",
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: {
        x: { type: "spring", stiffness: 220, damping: 24 },
        opacity: { duration: 0.4 }
      }
    },
    exit: (dir) => ({
      x: dir > 0 ? "-100%" : "100%",
      opacity: 0,
      transition: {
        x: { type: "spring", stiffness: 220, damping: 24 },
        opacity: { duration: 0.4 }
      }
    })
  };

  return (
    <div className={`min-h-screen p-4 md:p-8 select-none transition-colors duration-500  pt-[120px] pb-8 sm:pt-[120px] sm:pb-8 ${activeVariant.canvasClass}`}>
      
      <div className="w-full max-w-5xl mx-auto flex flex-col gap-6">
        
        {/* Navigation bar without Swatches */}
        <div className={`px-6 py-4 flex items-center justify-between transition-all duration-300 ${activeVariant.cardClass}`}>
          <div className="flex items-center gap-2">
            <Activity size={14} style={{ color: activeTheme.color }} />
            <span className="text-[10px] font-mono font-black text-white/50 tracking-wider">HERO_CORE_ENGINE</span>
          </div>
        </div>

        {/* Carousel Primary Card */}
        <div
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className={`min-h-[480px] relative overflow-hidden flex flex-col md:flex-row transition-all duration-300 ${activeVariant.cardClass}`}
        >
          {/* Accent Ambient Gradient Background */}
          <div 
            className="absolute inset-0 pointer-events-none opacity-[0.06] transition-all duration-700 bg-gradient-to-tr"
            style={{
              backgroundImage: `radial-gradient(500px at 70% 50%, ${activeTheme.color} 0%, transparent 100%)`
            }}
          />

          {/* Left Block: Product Details (Cylinder Slot Machine Text) */}
          <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-between relative z-10">
            
            {/* Upper label */}
            <div className="flex flex-col gap-1">
              <AnimatePresence mode="wait">
                <motion.span
                  key={`tag-${currentIndex}`}
                  initial={{ y: 15, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -15, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 220, damping: 18 }}
                  className={`text-[10px] font-black font-mono tracking-widest uppercase block ${activeTheme.text}`}
                >
                  {currentProduct.tag}
                </motion.span>
              </AnimatePresence>
              
              {/* Product Title Slot Machine cylinder rotate effect */}
              <div 
                className="h-16 overflow-hidden relative mt-2 flex items-center"
                style={{ perspective: "1000px" }}
              >
                <AnimatePresence mode="wait">
                  <motion.h2
                    key={`title-${currentIndex}`}
                    initial={{ y: "100%", rotateX: 75, filter: "blur(4px)", opacity: 0 }}
                    animate={{ y: 0, rotateX: 0, filter: "blur(0px)", opacity: 1 }}
                    exit={{ y: "-100%", rotateX: -75, filter: "blur(4px)", opacity: 0 }}
                    transition={{ duration: 0.45, ease: "easeInOut" }}
                    className="text-2xl md:text-3xl font-black text-white leading-none tracking-tight origin-center"
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    {currentProduct.title}
                  </motion.h2>
                </AnimatePresence>
              </div>

              {/* Price slot machine roll */}
              <div className="h-8 overflow-hidden relative mt-1 flex items-center">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={`price-${currentIndex}`}
                    initial={{ y: "100%", rotateX: 75, filter: "blur(2px)", opacity: 0 }}
                    animate={{ y: 0, rotateX: 0, filter: "blur(0px)", opacity: 1 }}
                    exit={{ y: "-100%", rotateX: -75, filter: "blur(2px)", opacity: 0 }}
                    transition={{ duration: 0.45, ease: "easeInOut" }}
                    className="text-lg font-black text-white/50 font-mono tracking-tight"
                  >
                    {currentProduct.price}
                  </motion.span>
                </AnimatePresence>
              </div>
            </div>

            {/* Description */}
            <div className="my-6">
              <AnimatePresence mode="wait">
                <motion.p
                  key={`desc-${currentIndex}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-xs text-white/45 leading-relaxed max-w-sm"
                >
                  {currentProduct.desc}
                </motion.p>
              </AnimatePresence>
            </div>

            {/* Shop now button with gloss reflection sweep */}
            <div className="flex items-center gap-4">
              <ShopNowButton activeVariant={activeVariant} />
              
              <button 
                className="p-3.5 bg-white/5 hover:bg-white/10 border border-white/5 text-white/60 hover:text-white cursor-pointer transition-colors"
                style={{ borderRadius: "var(--theme-border-radius-action)" }}
              >
                <Heart size={14} />
              </button>
            </div>

          </div>

          {/* Right Block: Image Slider Gallery */}
          <div className="md:w-1/2 relative min-h-[300px] flex items-center justify-center p-8 md:p-12 overflow-hidden border-t md:border-t-0 md:border-l border-white/5">
            <div className="w-full h-full relative flex items-center justify-center">
              <AnimatePresence initial={false} custom={direction}>
                <motion.div
                  key={currentIndex}
                  custom={direction}
                  variants={imageVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="absolute w-[220px] md:w-[280px] aspect-square overflow-hidden border border-white/10 shadow-2xl bg-black/40"
                  style={{
                    borderRadius: "var(--theme-border-radius-action)",
                    boxShadow: `0 15px 30px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.05), 0 0 1px rgba(${activeTheme.rgb},0.1)`
                  }}
                >
                  <img
                    src={currentProduct.img}
                    alt={currentProduct.title}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Bottom Progress Pagination indicators */}
          <div className="absolute bottom-6 left-8 md:left-12 flex items-center gap-3 z-25 bg-black/40 backdrop-blur-md px-4 py-2.5 rounded-full border border-white/5">
            {PRODUCTS.map((prod, idx) => {
              const isActive = currentIndex === idx;
              return (
                <button
                  key={prod.id}
                  onClick={() => handleSelectSlide(idx)}
                  className="relative h-1.5 rounded-full bg-white/10 transition-all duration-300 overflow-hidden cursor-pointer"
                  style={{ width: isActive ? "32px" : "8px" }}
                >
                  {isActive && (
                    <div 
                      className="h-full bg-current rounded-full"
                      style={{ 
                        color: activeTheme.color,
                        width: `${progress}%`,
                        transition: "width 50ms linear"
                      }}
                    />
                  )}
                </button>
              );
            })}
          </div>

        </div>

      </div>
    </div>
  );
}

/* Shop Now Button with dynamic gloss sweep */
function ShopNowButton({ activeVariant }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.button
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileTap={{ scale: 0.98 }}
      className={`px-5 py-3.5 rounded-2xl font-bold font-mono text-xs uppercase tracking-wider transition-all duration-300 cursor-pointer flex items-center gap-2 relative overflow-hidden ${activeVariant.buttonClass}`}
      style={{
        borderRadius: "var(--theme-border-radius-action)"
      }}
    >
      {/* Absolute Diagonal Gloss Reflection Sweep */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ left: "-100%" }}
            animate={{ left: "200%" }}
            exit={{ left: "200%" }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="absolute top-0 bottom-0 w-8 bg-gradient-to-r from-transparent via-white/50 to-transparent skew-x-25 pointer-events-none"
          />
        )}
      </AnimatePresence>

      <span className="relative z-10">Shop Now</span>
      <ArrowRight size={13} className="relative z-10" />
    </motion.button>
  );
}
