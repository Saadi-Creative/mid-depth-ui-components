import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Check, Loader2, Sparkles, Send, Bell } from "lucide-react";

// Themes definition
const THEMES = [
  {
    id: "emerald",
    name: "Emerald",
    color: "#10b981",
    rgb: "16, 185, 129",
    border: "border-emerald-500/25",
    focusBorder: "focus-within:border-emerald-500",
    bg: "bg-emerald-500",
    hoverBg: "hover:bg-emerald-600",
    text: "text-emerald-400",
    accentBg: "bg-emerald-500/10",
    shadow: "shadow-[0_0_15px_rgba(16,185,129,0.3)]",
    ring: "focus-within:ring-2 focus-within:ring-emerald-500/20"
  },
  {
    id: "sapphire",
    name: "Sapphire Blue",
    color: "#2979ff",
    rgb: "41, 121, 255",
    border: "border-blue-500/25",
    focusBorder: "focus-within:border-blue-500",
    bg: "bg-blue-500",
    hoverBg: "hover:bg-blue-600",
    text: "text-blue-400",
    accentBg: "bg-blue-500/10",
    shadow: "shadow-[0_0_15px_rgba(41,121,255,0.3)]",
    ring: "focus-within:ring-2 focus-within:ring-blue-500/20"
  },
  {
    id: "amethyst",
    name: "Amethyst",
    color: "#aa00ff",
    rgb: "170, 0, 255",
    border: "border-purple-500/25",
    focusBorder: "focus-within:border-purple-500",
    bg: "bg-purple-500",
    hoverBg: "hover:bg-purple-600",
    text: "text-purple-400",
    accentBg: "bg-purple-500/10",
    shadow: "shadow-[0_0_15px_rgba(170,0,255,0.3)]",
    ring: "focus-within:ring-2 focus-within:ring-purple-500/20"
  },
  {
    id: "amber",
    name: "Amber",
    color: "#ffd600",
    rgb: "255, 214, 0",
    border: "border-amber-500/25",
    focusBorder: "focus-within:border-amber-500",
    bg: "bg-amber-500",
    hoverBg: "hover:bg-amber-600",
    text: "text-amber-400",
    accentBg: "bg-amber-500/10",
    shadow: "shadow-[0_0_15px_rgba(255,214,0,0.3)]",
    ring: "focus-within:ring-2 focus-within:ring-amber-500/20"
  },
  {
    id: "ruby",
    name: "Ruby",
    color: "#ff1744",
    rgb: "255, 23, 68",
    border: "border-rose-500/25",
    focusBorder: "focus-within:border-rose-500",
    bg: "bg-rose-500",
    hoverBg: "hover:bg-rose-600",
    text: "text-rose-400",
    accentBg: "bg-rose-500/10",
    shadow: "shadow-[0_0_15px_rgba(255,23,68,0.3)]",
    ring: "focus-within:ring-2 focus-within:ring-rose-500/20"
  }
];

export default function NewsletterCTA() {
  const [activeTheme, setActiveTheme] = useState(THEMES[0]);
  const [email, setEmail] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [status, setStatus] = useState("idle"); // idle, loading, success, error
  const [particles, setParticles] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim() || !validateEmail(email)) {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 1200);
      return;
    }

    setStatus("loading");
    setTimeout(() => {
      setStatus("success");
      spawnParticles();
    }, 1500);
  };

  const validateEmail = (emailStr) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailStr);
  };

  // Confetti particles generator
  const spawnParticles = () => {
    const arr = [];
    const colors = [
      activeTheme.color,
      `rgba(${activeTheme.rgb}, 0.6)`,
      "#ffffff",
      "#ffd600",
      "#00e5ff"
    ];

    for (let i = 0; i < 35; i++) {
      const angle = Math.random() * Math.PI * 2;
      const distance = 40 + Math.random() * 90;
      arr.push({
        id: i,
        x: Math.cos(angle) * distance,
        y: Math.sin(angle) * distance - 20, // offset slightly upward
        color: colors[Math.floor(Math.random() * colors.length)],
        size: 3 + Math.random() * 6,
        rotate: Math.random() * 360
      });
    }
    setParticles(arr);
  };

  // Reset form
  const handleReset = () => {
    setEmail("");
    setStatus("idle");
    setParticles([]);
  };

  const isLoading = status === "loading";
  const isSuccess = status === "success";
  const isError = status === "error";

  return (
    <div className="min-h-screen flex items-center justify-center p-4 select-none bg-[#060810]"
      style={{ fontFamily: "'Inter', sans-serif" }}>
      
      <div className="w-full max-w-2xl flex flex-col gap-6 relative">
        
        {/* Layered Flat CTA Card */}
        <div 
          className={`bg-[#0a0d1a] border rounded-3xl p-6 md:p-8 relative overflow-hidden transition-all duration-300 ${
            isSuccess 
              ? "border-emerald-500/20" 
              : isError 
                ? "border-rose-500/20" 
                : "border-white/5"
          }`}
          style={{
            boxShadow: isSuccess
              ? "0 20px 45px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.03)"
              : "0 15px 30px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.02)"
          }}
        >
          {/* Accent Color Header */}
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: activeTheme.color }} />
              <span className="text-[9px] font-mono font-black text-white/35 uppercase tracking-widest">
                WEEKLY BROADCAST
              </span>
            </div>

            {/* Dynamic Swatches */}
            <div className="flex items-center gap-1.5 bg-black/45 px-2.5 py-1.5 rounded-lg border border-white/5">
              {THEMES.map(theme => (
                <button
                  key={theme.id}
                  onClick={() => {
                    setActiveTheme(theme);
                    setStatus("idle");
                  }}
                  className="w-3 h-3 rounded-full cursor-pointer relative flex items-center justify-center transition-transform active:scale-75"
                  style={{ backgroundColor: theme.color }}
                  aria-label={`Swatch ${theme.name}`}
                >
                  {activeTheme.id === theme.id && (
                    <motion.div
                      layoutId="active-newsletter-theme-ring"
                      className="absolute -inset-1 rounded-full border border-current opacity-80"
                      style={{ color: theme.color }}
                      transition={{ type: "spring", stiffness: 350, damping: 25 }}
                    />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Heading Block */}
          <div className="flex flex-col gap-1.5 mb-8">
            <h2 className="text-xl md:text-2xl font-black text-white tracking-tight"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Join the Tech Syndicate
            </h2>
            <p className="text-xs text-white/45 max-w-md leading-relaxed">
              Zero noise. Just code-focused breakdowns, interactive updates, and components sent straight to your terminal weekly.
            </p>
          </div>

          {/* Subscription Inline Form */}
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 w-full items-stretch">
            
            {/* Interactive Input Container with Floating Label */}
            <div 
              className={`flex-1 bg-white/[0.01] border rounded-2xl flex items-center px-4 py-3 md:py-3.5 relative transition-all duration-300 ${activeTheme.focusBorder} ${activeTheme.ring} ${
                isError ? "border-rose-500/35" : "border-white/5"
              }`}
            >
              <Mail size={15} className="text-white/30 mr-3 flex-shrink-0" />
              
              {/* Floating Input Label */}
              <div className="relative flex-1 h-5 flex items-center">
                <input
                  type="email"
                  value={email}
                  disabled={isLoading || isSuccess}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-transparent border-none text-xs text-white focus:outline-none focus:ring-0 p-0 absolute bottom-0 left-0 leading-none"
                />
                
                <motion.label
                  animate={{
                    y: (isFocused || email) ? -13 : 0,
                    scale: (isFocused || email) ? 0.8 : 1,
                    color: (isFocused || email) ? activeTheme.color : "rgba(255,255,255,0.3)"
                  }}
                  transition={{ type: "spring", stiffness: 220, damping: 18 }}
                  className="absolute left-0 text-xs font-mono font-bold select-none pointer-events-none origin-left"
                >
                  Enter email address
                </motion.label>
              </div>

              {/* Status Indicators */}
              <AnimatePresence>
                {isError && (
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    className="text-rose-400 text-[10px] font-bold font-mono ml-2 uppercase flex-shrink-0"
                  >
                    Invalid
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Morphing Subscribe Button */}
            <div className="relative self-stretch sm:w-36 flex items-center justify-center flex-shrink-0">
              <motion.button
                type="submit"
                disabled={isLoading || isSuccess}
                whileHover={!isLoading && !isSuccess ? { scale: 1.02, y: -1 } : {}}
                whileTap={!isLoading && !isSuccess ? { scale: 0.98 } : {}}
                className={`w-full h-full py-3.5 sm:py-0 rounded-2xl font-bold font-mono text-xs uppercase tracking-wider transition-all duration-300 cursor-pointer flex items-center justify-center gap-1.5 ${
                  isSuccess 
                    ? "bg-emerald-500/10 border border-emerald-500/20 text-emerald-400" 
                    : isLoading 
                      ? "bg-white/5 border border-white/5 text-white/20"
                      : `text-black ${activeTheme.bg} ${activeTheme.hoverBg} ${activeTheme.shadow}`
                }`}
              >
                <AnimatePresence mode="wait">
                  {isLoading ? (
                    <motion.span
                      key="loading"
                      initial={{ rotate: 0 }}
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
                    >
                      <Loader2 size={13} />
                    </motion.span>
                  ) : isSuccess ? (
                    <motion.span
                      key="success"
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="flex items-center gap-1"
                    >
                      <Check size={13} strokeWidth={3} />
                      Done
                    </motion.span>
                  ) : (
                    <motion.span
                      key="idle"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex items-center gap-1"
                    >
                      <Send size={11} />
                      Subscribe
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>

              {/* Physical Confetti Particles */}
              {isSuccess && particles.map(p => (
                <motion.div
                  key={p.id}
                  initial={{ x: 0, y: 0, scale: 1, rotate: 0 }}
                  animate={{
                    x: p.x,
                    y: p.y,
                    scale: 0,
                    rotate: p.rotate
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 140 - Math.random() * 40,
                    damping: 14,
                    mass: 0.5,
                    delay: 0.05
                  }}
                  className="absolute pointer-events-none rounded-sm z-50"
                  style={{
                    backgroundColor: p.color,
                    width: p.size,
                    height: p.size
                  }}
                />
              ))}
            </div>

          </form>

          {/* Success layout prompt */}
          <AnimatePresence>
            {isSuccess && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-6 flex flex-col md:flex-row items-center justify-between gap-4 bg-emerald-500/5 border border-emerald-500/10 rounded-2xl p-4 font-mono text-[10px] font-bold text-emerald-400"
              >
                <div className="flex items-center gap-2">
                  <Sparkles size={11} />
                  <span>TRANSMISSION SECURED: ACCESS GRANTED</span>
                </div>
                <button
                  onClick={handleReset}
                  className="px-3 py-1 rounded bg-emerald-500/10 border border-emerald-500/25 hover:bg-emerald-500/20 text-emerald-400 cursor-pointer uppercase transition-colors"
                >
                  Sub Another
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Footer stats */}
          <div className="mt-8 flex justify-between items-center text-[10px] text-white/30 font-mono pt-6 border-t border-white/5">
            <span className="flex items-center gap-1">
              <Bell size={10} />
              No spam. Unsubscribe anytime.
            </span>
            <span>Join 14.2k active subscribers</span>
          </div>

        </div>

      </div>
    </div>
  );
}
