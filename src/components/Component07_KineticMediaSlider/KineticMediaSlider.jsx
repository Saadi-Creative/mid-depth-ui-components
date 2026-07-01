import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

import { useGlobalTheme } from "../../themes/ThemeContext";

const SLIDES = [
  {
    id: 1,
    title: "Quantum Interface",
    subtitle: "The future of interactive web",
    img: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop"
  },
  {
    id: 2,
    title: "Neural Pathways",
    subtitle: "Deep learning visualization",
    img: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=2574&auto=format&fit=crop"
  },
  {
    id: 3,
    title: "Digital Genesis",
    subtitle: "Creation of new dimensions",
    img: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2670&auto=format&fit=crop"
  }
];

// Kinetic Letter Scramble Text Reveal
const ScrambleText = ({ text, active, duration = 300 }) => {
  const [displayText, setDisplayText] = useState(text);
  const chars = "!<>-_\\\\/[]{}—=+*^?#________";
  
  useEffect(() => {
    if (!active) return;
    let iteration = 0;
    const maxIterations = 10;
    const interval = duration / maxIterations;

    const timer = setInterval(() => {
      setDisplayText(text.split("").map((char, index) => {
        if (char === " ") return char;
        if (index < iteration * (text.length / maxIterations)) {
          return text[index];
        }
        return chars[Math.floor(Math.random() * chars.length)];
      }).join(""));

      if (iteration >= maxIterations) {
        clearInterval(timer);
        setDisplayText(text);
      }
      iteration++;
    }, interval);

    return () => clearInterval(timer);
  }, [text, active, duration]);

  return <span>{displayText}</span>;
};

// Magnetic Particle Ring Button
const MagneticButton = ({ children, onClick, theme, direction }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const ref = useRef(null);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left - rect.width / 2,
      y: e.clientY - rect.top - rect.height / 2
    });
  };

  return (
    <motion.button
      ref={ref}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => { setIsHovered(false); setMousePos({ x: 0, y: 0 }); }}
      onMouseMove={handleMouseMove}
      onClick={onClick}
      animate={{
        x: isHovered ? mousePos.x * 0.2 : 0,
        y: isHovered ? mousePos.y * 0.2 : 0,
      }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className={cn(
        "relative w-12 h-12 rounded-full flex items-center justify-center border bg-black/40 backdrop-blur-md cursor-pointer",
        "transition-colors duration-300 z-20",
        isHovered ? theme.border : "border-white/10"
      )}
      style={{
        boxShadow: isHovered ? `0 0 15px ${theme.color}40` : "0 4px 12px rgba(0,0,0,0.5)"
      }}
    >
      {/* Magnetic Particles */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ 
              opacity: 1, 
              scale: 1,
              rotate: direction === 'right' ? 360 : -360 
            }}
            exit={{ opacity: 0, scale: 1.2 }}
            className="absolute -inset-4 rounded-full pointer-events-none"
            style={{ border: `1px dashed ${theme.color}60` }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          />
        )}
      </AnimatePresence>
      
      <span className={isHovered ? theme.text : "text-white"}>
        {children}
      </span>
    </motion.button>
  );
};

export default function KineticMediaSlider() {
  const { activeVariant } = useGlobalTheme();
  const activeTheme = React.useMemo(() => {
    const hex = activeVariant.triggerColor || "#06b6d4";
    return {
      id: activeVariant.id,
      name: activeVariant.name,
      color: hex,
      bg: "bg-[var(--theme-primary)]",
      text: "text-[var(--theme-primary)]",
      border: "border-[var(--theme-primary)]",
    };
  }, [activeVariant]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1); // 1 = right, -1 = left

  const paginate = (newDirection) => {
    setDirection(newDirection);
    setCurrentIndex((prev) => (prev + newDirection + SLIDES.length) % SLIDES.length);
  };

  const slideVariants = {
    enter: (direction) => ({
      clipPath: "inset(0 50% 0 50%)", // Shutter split horizontal
      opacity: 0.5,
      scale: 0.95,
      zIndex: 10,
    }),
    center: {
      clipPath: "inset(0 0% 0 0%)",
      opacity: 1,
      scale: 1,
      zIndex: 10,
      transition: {
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1]
      }
    },
    exit: (direction) => ({
      clipPath: "inset(0 0% 0 0%)",
      opacity: 0,
      scale: 1.05,
      zIndex: 0,
      transition: {
        duration: 0.5
      }
    })
  };

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 sm:p-8 transition-colors duration-500 ${activeVariant.canvasClass}`}>
      <div className="w-full max-w-6xl relative h-[600px] flex items-center justify-center">
        
        {/* Background inactive slides (2.5D effect) */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40 blur-[2px] scale-[0.85] -translate-y-8">
          <div className="w-3/4 h-[400px] rounded-3xl bg-current/5 border border-current/10" />
        </div>
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-60 blur-[1px] scale-[0.92] -translate-y-4">
          <div className="w-5/6 h-[450px] rounded-3xl bg-current/5 border border-current/10" />
        </div>

        {/* Main Active Slide Container */}
        <div className={cn("relative w-full h-full max-h-[500px] rounded-3xl overflow-hidden border bg-black shadow-2xl transition-colors duration-500", activeTheme.border)}
          style={{ boxShadow: activeVariant.id === "brutal" ? "none" : `0 20px 50px rgba(0,0,0,0.5), 0 0 20px ${activeTheme.color}20` }}
        >
          
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="absolute inset-0"
            >
              {/* Image */}
              <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${SLIDES[currentIndex].img})` }} />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
            </motion.div>
          </AnimatePresence>

          {/* Foreground Content */}
          <div className="absolute inset-0 z-20 flex flex-col justify-between p-8 sm:p-12">
            
            {/* Bottom Bar: Content & Controls */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-8 mt-auto">
              <div className="max-w-xl">
                <motion.div 
                  key={`badge-${currentIndex}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={cn("inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold mb-4 bg-white/10 backdrop-blur-md border border-white/20 text-white")}
                >
                  <span className={cn("w-2 h-2 rounded-full", activeTheme.bg)} style={{ boxShadow: `0 0 8px ${activeTheme.color}` }} />
                  Featured Exhibition
                </motion.div>

                <h2 className="text-4xl sm:text-6xl font-black text-white mb-2 leading-tight">
                  <ScrambleText text={SLIDES[currentIndex].title} active={true} />
                </h2>
                <p className={cn("text-lg sm:text-xl font-medium transition-colors duration-300", activeTheme.text)}>
                  <ScrambleText text={SLIDES[currentIndex].subtitle} active={true} />
                </p>
              </div>

              {/* Navigation */}
              <div className="flex flex-col items-end gap-6">
                <div className="flex gap-4">
                  <MagneticButton theme={activeTheme} direction="left" onClick={() => paginate(-1)}>
                    <ChevronLeft size={24} />
                  </MagneticButton>
                  <MagneticButton theme={activeTheme} direction="right" onClick={() => paginate(1)}>
                    <ChevronRight size={24} />
                  </MagneticButton>
                </div>

                {/* Liquid Merge Pagination */}
                <div className="flex gap-3 bg-black/40 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
                  {SLIDES.map((_, idx) => (
                    <button 
                      key={idx} 
                      onClick={() => {
                        setDirection(idx > currentIndex ? 1 : -1);
                        setCurrentIndex(idx);
                      }}
                      className="relative w-2 h-2 rounded-full bg-white/20 cursor-pointer"
                    >
                      {currentIndex === idx && (
                        <motion.div
                          layoutId="activeDot"
                          className={cn("absolute inset-0 rounded-full", activeTheme.bg)}
                          transition={{ type: "spring", stiffness: 300, damping: 25 }}
                          style={{ boxShadow: `0 0 10px ${activeTheme.color}` }}
                        />
                      )}
                    </button>
                  ))}
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
