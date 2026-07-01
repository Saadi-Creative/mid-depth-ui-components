import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Check, Loader2, Sparkles, Send, Bell } from "lucide-react";
import { useGlobalTheme } from "../../themes/ThemeContext";

export default function NewsletterCTA() {
  const { activeVariant } = useGlobalTheme();
  const [email, setEmail] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [status, setStatus] = useState("idle"); // idle, loading, success, error
  const [particles, setParticles] = useState([]);

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
    border: `border-current/25`,
    focusBorder: "focus-within:border-current",
    bg: "",
    hoverBg: "",
    text: activeVariant.textClass,
    accentBg: `rgba(${rgbStr}, 0.1)`,
    shadow: `shadow-[0_0_15px_rgba(${rgbStr},0.3)]`,
    ring: "focus-within:ring-2 focus-within:ring-current/20"
  };

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
    <div className={`min-h-screen flex items-center justify-center p-4 select-none transition-colors duration-500 ${activeVariant.canvasClass}`}>
      
      <div className="w-full max-w-2xl flex flex-col gap-6 relative">
        
        {/* Layered Flat CTA Card */}
        <div 
          className={`p-6 md:p-8 relative overflow-hidden transition-all duration-300 ${activeVariant.cardClass} ${
            isSuccess 
              ? "border-emerald-500/20" 
              : isError 
                ? "border-rose-500/20" 
                : ""
          }`}
          style={{
            boxShadow: isSuccess && activeVariant.id !== "brutal"
              ? "0 20px 45px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.03)"
              : activeVariant.id !== "brutal" ? "0 15px 30px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.02)" : "none"
          }}
        >
          {/* Accent Color Header */}
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: activeTheme.color }} />
              <span className="text-[9px] font-mono font-black opacity-35 uppercase tracking-widest">
                WEEKLY BROADCAST
              </span>
            </div>
          </div>

          {/* Heading Block */}
          <div className="flex flex-col gap-1.5 mb-8">
            <h2 className="text-xl md:text-2xl font-black tracking-tight"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Join the Tech Syndicate
            </h2>
            <p className="text-xs opacity-45 max-w-md leading-relaxed">
              Zero noise. Just code-focused breakdowns, interactive updates, and components sent straight to your terminal weekly.
            </p>
          </div>

          {/* Subscription Inline Form */}
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 w-full items-stretch">
            
            {/* Interactive Input Container with Floating Label */}
            <div 
              className={`flex-1 flex items-center px-4 py-3 md:py-3.5 relative transition-all duration-300 ${activeTheme.focusBorder} ${activeTheme.ring} ${activeVariant.inputClass} ${
                isError ? "border-rose-500/35" : ""
              }`}
            >
              <Mail size={15} className="opacity-30 mr-3 flex-shrink-0" />
              
              {/* Floating Input Label */}
              <div className="relative flex-1 h-5 flex items-center">
                <input
                  type="email"
                  value={email}
                  disabled={isLoading || isSuccess}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-transparent border-none text-xs text-current focus:outline-none focus:ring-0 p-0 absolute bottom-0 left-0 leading-none"
                />
                
                <motion.label
                  animate={{
                    y: (isFocused || email) ? -13 : 0,
                    scale: (isFocused || email) ? 0.8 : 1,
                    color: (isFocused || email) ? activeTheme.color : (activeVariant.mode === "dark" ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.4)")
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
                      ? "bg-current/5 border border-current/5 opacity-35"
                      : `${activeVariant.buttonClass} ${activeTheme.shadow}`
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
                className="mt-6 flex flex-col md:flex-row items-center justify-between gap-4 bg-emerald-500/5 border border-emerald-500/10 p-4 font-mono text-[10px] font-bold text-emerald-400"
                style={{ borderRadius: "var(--theme-border-radius-action)" }}
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
          <div className="mt-8 flex justify-between items-center text-[10px] opacity-30 font-mono pt-6 border-t border-current/5">
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
