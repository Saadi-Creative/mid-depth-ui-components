import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform, useMotionTemplate } from "framer-motion";
import { WAITLIST_THEMES } from "../../themes/themeConfig";
import { useGlobalTheme } from "../../themes/ThemeContext";

/* ═══════════════════════════════════════════════════════════  ICONS  */
const IconMail = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

const IconCheck = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const IconSparkles = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m11.314 11.314l.707.707M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8z" />
  </svg>
);

const IconSpinner = () => (
  <motion.span
    animate={{ rotate: 360 }}
    transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
    className="block w-4 h-4 border-2 border-current border-t-transparent rounded-full"
  />
);

/* ═══════════════════════════════════════════════════════════  FLOATING PARTICLES  */
const FloatingParticles = ({ theme, active }) => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl">
    {[...Array(6)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-1 h-1 rounded-full"
        style={{ background: theme.primary, opacity: 0 }}
        animate={active ? {
          opacity: [0, 0.6, 0],
          y: [0, -80 - i * 20],
          x: [0, (i % 2 === 0 ? 1 : -1) * (15 + i * 8)],
          scale: [0, 1.2, 0],
        } : { opacity: 0 }}
        transition={{
          duration: 2 + i * 0.3,
          repeat: Infinity,
          delay: i * 0.35,
          ease: "easeOut",
        }}
        initial={{
          left: `${20 + i * 12}%`,
          bottom: "10%",
        }}
      />
    ))}
  </div>
);

/* ═══════════════════════════════════════════════════════════  RIPPLE EFFECT HOOK  */
const useRipple = () => {
  const [ripples, setRipples] = useState([]);
  const addRipple = useCallback((e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now();
    setRipples(prev => [...prev, { x, y, id }]);
    setTimeout(() => setRipples(prev => prev.filter(r => r.id !== id)), 600);
  }, []);
  return { ripples, addRipple };
};

const RippleLayer = ({ ripples, color }) => (
  <>
    {ripples.map(r => (
      <motion.span
        key={r.id}
        className="absolute rounded-full pointer-events-none"
        initial={{ width: 0, height: 0, opacity: 0.5 }}
        animate={{ width: 250, height: 250, opacity: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        style={{
          left: r.x - 125,
          top: r.y - 125,
          background: color || "rgba(255,255,255,0.3)",
        }}
      />
    ))}
  </>
);

/* ═══════════════════════════════════════════════════════════  QUEUE COUNTER  */
const QueueCounter = ({ value }) => {
  const [count, setCount] = useState(value - 100);
  useState(() => {
    let start = value - 100;
    let end = value;
    let duration = 1200;
    let stepTime = Math.abs(Math.floor(duration / (end - start)));
    let timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start >= end) clearInterval(timer);
    }, stepTime);
    return () => clearInterval(timer);
  });
  return <span>QUEUE POSITION: #{count.toLocaleString()}</span>;
};

export default function WaitlistTeaser() {
  const { activeVariant } = useGlobalTheme();
  const themeMap = {
    cyber: WAITLIST_THEMES.mint,
    glass: WAITLIST_THEMES.indigo,
    neomorphic: WAITLIST_THEMES.slateBlue,
    brutal: WAITLIST_THEMES.coral,
    luxury: WAITLIST_THEMES.roseGold
  };
  const currentTheme = themeMap[activeVariant.id] || WAITLIST_THEMES.mint;
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle, loading, success
  const [errorMsg, setErrorMsg] = useState("");

  const [inputFocused, setInputFocused] = useState(false);
  const [inputHovered, setInputHovered] = useState(false);
  const [cardHovered, setCardHovered] = useState(false);
  const cardRef = useRef(null);
  const { ripples, addRipple } = useRipple();

  /* Magnetic tilt on hover */
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const springCfg = { stiffness: 90, damping: 22 };
  const rotX = useSpring(useTransform(my, [-300, 300], [5, -5]), springCfg);
  const rotY = useSpring(useTransform(mx, [-300, 300], [-5, 5]), springCfg);

  /* Magnetic cursor glow */
  const glowX = useMotionValue(50);
  const glowY = useMotionValue(50);
  const glowBg = useMotionTemplate`radial-gradient(320px circle at ${glowX}% ${glowY}%, ${currentTheme.primary}, transparent 65%)`;

  const onMouseMove = useCallback((e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mx.set(e.clientX - (rect.left + rect.width / 2));
    my.set(e.clientY - (rect.top + rect.height / 2));
    glowX.set(((e.clientX - rect.left) / rect.width) * 100);
    glowY.set(((e.clientY - rect.top) / rect.height) * 100);
  }, [mx, my, glowX, glowY]);

  const onMouseLeave = useCallback(() => {
    mx.set(0);
    my.set(0);
  }, [mx, my]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setErrorMsg("Please enter a valid email address.");
      return;
    }
    setErrorMsg("");
    setStatus("loading");
    setTimeout(() => {
      setStatus("success");
    }, 1800);
  };

  return (
    <div
      id="component-03-waitlist-teaser"
      className="relative w-full min-h-screen overflow-hidden flex flex-col justify-between items-center px-4 py-8 select-none transition-colors duration-1000"
      style={{
        background: "radial-gradient(circle at 50% 50%, #0d0f1d 0%, #06070e 100%)",
      }}
    >
      {/* ── DRIFTING 2D COLOR ORBS (CSS BLUR) ── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <motion.div
          animate={{
            x: [0, 80, -40, 0],
            y: [0, -60, 80, 0],
            scale: [1, 1.1, 0.9, 1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute w-[350px] h-[350px] rounded-full opacity-[0.16] transition-colors duration-1000"
          style={{
            background: currentTheme.primary,
            filter: "blur(100px)",
            top: "10%",
            left: "15%",
          }}
        />
        <motion.div
          animate={{
            x: [0, -100, 60, 0],
            y: [0, 80, -90, 0],
            scale: [1.1, 0.95, 1.05, 1.1],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute w-[400px] h-[400px] rounded-full opacity-[0.14] transition-colors duration-1000"
          style={{
            background: currentTheme.id === "mint" ? "#6366F1" : "#00F5D4",
            filter: "blur(110px)",
            bottom: "15%",
            right: "10%",
          }}
        />
        <motion.div
          animate={{
            x: [0, 50, -50, 0],
            y: [0, 90, -40, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute w-[280px] h-[280px] rounded-full opacity-[0.12] transition-colors duration-1000"
          style={{
            background: currentTheme.primary,
            filter: "blur(80px)",
            top: "50%",
            left: "45%",
          }}
        />
      </div>

      {/* ── AMBIENT MAIN GLOW ── */}
      <div
        className="absolute pointer-events-none transition-all duration-1000 z-0"
        style={{
          width: "70vw",
          height: "70vw",
          maxWidth: 700,
          maxHeight: 700,
          borderRadius: "50%",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          filter: "blur(120px)",
          background: `radial-gradient(circle, ${currentTheme.primaryMuted} 0%, transparent 60%)`,
        }}
      />

      {/* Grid Pattern overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-0 opacity-15"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* ── HEADER ── */}
      <header className="relative z-10 w-full max-w-5xl flex items-center justify-between py-2">
        <div className="flex items-center gap-2">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center font-black transition-all duration-500"
            style={{
              background: currentTheme.primaryMuted,
              border: `1px solid ${currentTheme.border}`,
              color: currentTheme.primary,
              boxShadow: `0 0 12px ${currentTheme.glow}33`,
            }}
          >
            N
          </div>
          <span className="text-xs font-black tracking-widest text-white uppercase font-mono">
            NEXUS Labs
          </span>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full border border-white/5 bg-white/5 backdrop-blur text-[10px] text-white/60 font-semibold uppercase tracking-wider font-mono">
          <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: currentTheme.primary }} />
          Status: Stealth Mode
        </div>
      </header>

      {/* ── MAIN CARD WITH LAYERED FLAT AESTHETIC ── */}
      <main
        ref={cardRef}
        onMouseMove={onMouseMove}
        onMouseEnter={() => setCardHovered(true)}
        onMouseLeave={() => {
          onMouseLeave();
          setCardHovered(false);
        }}
        className="relative z-10 w-full max-w-[480px] my-auto flex flex-col items-center"
        style={{ perspective: 1000, transformStyle: "preserve-3d" }}
      >
        {/* Layer 2: Flat visual background plate (offset slightly downwards and back in Z space) */}
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none transition-all duration-700"
          style={{
            rotateX: rotX,
            rotateY: rotY,
            transformStyle: "preserve-3d",
            z: -20,
            y: 12,
            scale: 0.98,
            background: "rgba(255,255,255,0.02)",
            border: `1px solid ${currentTheme.border}`,
            boxShadow: `0 15px 35px rgba(0,0,0,0.6)`,
            opacity: 0.65,
          }}
        />

        {/* Layer 1: Core Form Card */}
        <motion.div
          className="relative w-full rounded-2xl p-8 sm:p-10 overflow-hidden transition-all duration-500"
          style={{
            rotateX: rotX,
            rotateY: rotY,
            transformStyle: "preserve-3d",
            background: "linear-gradient(160deg, rgba(20, 24, 48, 0.95) 0%, rgba(9, 11, 23, 0.98) 100%)",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255,255,255,0.07)",
          }}
        >
          {/* Top Line accent */}
          <div
            className="absolute top-0 inset-x-0 h-[1.5px] transition-all duration-700"
            style={{
              background: `linear-gradient(90deg, transparent, ${currentTheme.primary}, transparent)`,
            }}
          />

          {/* Magnetic cursor-follow glow */}
          <motion.div
            className="absolute inset-0 pointer-events-none opacity-0 transition-opacity duration-500 rounded-2xl"
            style={{
              opacity: cardHovered ? 0.12 : 0,
              background: glowBg,
            }}
          />

          {/* Floating particles on hover */}
          <FloatingParticles theme={currentTheme} active={cardHovered} />

          <AnimatePresence mode="wait">
            {status !== "success" ? (
              <motion.div
                key="waitlist-form"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                style={{ transformStyle: "preserve-3d" }}
              >
                <div className="flex justify-center mb-5" style={{ transform: "translateZ(30px)" }}>
                  <div
                    className="flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black tracking-widest uppercase transition-colors duration-500"
                    style={{
                      background: currentTheme.primaryMuted,
                      color: currentTheme.primary,
                      border: `1px solid ${currentTheme.border}`,
                    }}
                  >
                    <IconSparkles />
                    Next-Gen Release
                  </div>
                </div>

                <h1 className="text-3xl sm:text-4xl font-black text-white text-center leading-tight tracking-tight mb-3" style={{ transform: "translateZ(40px)" }}>
                  Unlocking a New <span className="text-white/90">Dimension</span>
                </h1>
                <p className="text-xs text-center text-white/50 leading-relaxed mb-8 max-w-[340px] mx-auto" style={{ transform: "translateZ(25px)" }}>
                  A high-converting 2.5D interface platform designed for modern creators. Enter your email below to request early beta access.
                </p>

                {/* Form */}
                <form onSubmit={handleSubmit} className="flex flex-col gap-4" style={{ transform: "translateZ(35px)", transformStyle: "preserve-3d" }}>
                  <div className="relative">
                    <motion.span
                      animate={inputFocused ? { scale: 1.15, rotate: -8 } : inputHovered ? { scale: 1.05 } : { scale: 1, rotate: 0 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30 transition-colors"
                      style={{ color: inputFocused ? currentTheme.primary : "rgba(255,255,255,0.3)" }}
                    >
                      <IconMail />
                    </motion.span>
                    <input
                      type="email"
                      value={email}
                      onFocus={() => setInputFocused(true)}
                      onBlur={() => setInputFocused(false)}
                      onMouseEnter={() => setInputHovered(true)}
                      onMouseLeave={() => setInputHovered(false)}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (errorMsg) setErrorMsg("");
                      }}
                      placeholder="Enter your email address..."
                      className="w-full text-xs py-3.5 pl-11 pr-4 rounded-xl text-white outline-none bg-white/4 border transition-all duration-300 font-semibold"
                      style={{
                        background: inputFocused ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.03)",
                        borderColor: errorMsg
                          ? "#FF6B6B"
                          : inputFocused
                            ? currentTheme.primary
                            : inputHovered
                              ? "rgba(255,255,255,0.18)"
                              : "rgba(255, 255, 255, 0.08)",
                        boxShadow: errorMsg
                          ? "0 0 0 3px rgba(255,107,107,0.15)"
                          : inputFocused
                            ? `0 0 0 3.5px ${currentTheme.primaryMuted}, 0 0 16px ${currentTheme.glow}33`
                            : inputHovered
                              ? `0 0 0 1px rgba(255,255,255,0.05)`
                              : "none",
                      }}
                    />
                  </div>

                  {errorMsg && (
                    <span className="text-[10px] font-bold text-rose-400 text-center -mt-2.5">
                      {errorMsg}
                    </span>
                  )}

                  <motion.button
                    type="submit"
                    disabled={status === "loading"}
                    onClick={addRipple}
                    whileHover={{ scale: 1.015, y: -0.5, boxShadow: `0 8px 24px ${currentTheme.glow}55` }}
                    whileTap={{ scale: 0.96 }}
                    className="relative w-full py-3.5 rounded-xl font-black text-[11px] uppercase tracking-widest cursor-pointer overflow-hidden select-none transition-all duration-500 shadow-lg flex items-center justify-center gap-2"
                    style={{
                      background: currentTheme.primary,
                      color: "#080C14",
                      boxShadow: `0 6px 20px ${currentTheme.glow}44`,
                    }}
                  >
                    <RippleLayer ripples={ripples} color="rgba(0,0,0,0.15)" />
                    {status === "loading" ? (
                      <>
                        <IconSpinner />
                        Securing Spot...
                        <motion.div
                          initial={{ left: "-100%" }}
                          animate={{ left: "0%" }}
                          transition={{ duration: 1.8, ease: "easeInOut" }}
                          className="absolute bottom-0 left-0 h-1 bg-white/40"
                          style={{ width: "100%" }}
                        />
                      </>
                    ) : (
                      "Join Waitlist →"
                    )}
                  </motion.button>
                </form>

                {/* Social Proof */}
                <div className="mt-8 flex flex-col items-center gap-3" style={{ transform: "translateZ(20px)" }}>
                  <div className="flex -space-x-2">
                    {[
                      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=60&auto=format&fit=crop&q=80",
                      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&auto=format&fit=crop&q=80",
                      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=60&auto=format&fit=crop&q=80",
                      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=60&auto=format&fit=crop&q=80",
                    ].map((src, i) => (
                      <motion.img
                        key={i}
                        initial={{ opacity: 0, scale: 0.5, x: -10 }}
                        animate={{ opacity: 1, scale: 1, x: 0 }}
                        transition={{ delay: 0.35 + i * 0.08, type: "spring", stiffness: 200 }}
                        src={src}
                        alt="User Avatar"
                        className="w-6.5 h-6.5 rounded-full border-2 border-[#12162E] object-cover"
                      />
                    ))}
                  </div>
                  <span className="text-[10px] text-white/40 font-bold uppercase tracking-wider font-mono">
                    Joined by <span className="text-white/80">14,204</span> designers
                  </span>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="waitlist-success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, type: "spring", stiffness: 120 }}
                className="flex flex-col items-center py-6"
                style={{ transformStyle: "preserve-3d" }}
              >
                {/* Draw checkmark circle */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 180, damping: 15 }}
                  className="w-14 h-14 rounded-full flex items-center justify-center mb-6 shadow-inner"
                  style={{
                    background: currentTheme.primaryMuted,
                    border: `2px solid ${currentTheme.primary}`,
                    color: currentTheme.primary,
                    transform: "translateZ(40px)",
                  }}
                >
                  <IconCheck />
                </motion.div>

                <h2 className="text-2xl font-black text-white text-center leading-tight tracking-tight mb-2" style={{ transform: "translateZ(30px)" }}>
                  You're On The List!
                </h2>
                <p className="text-xs text-center text-white/50 leading-relaxed mb-6 max-w-[280px]" style={{ transform: "translateZ(25px)" }}>
                  Spot confirmed for <span className="text-white font-bold">{email}</span>. We'll send an invite link to your inbox soon.
                </p>

                <div className="w-full h-px bg-white/5 mb-6" style={{ transform: "translateZ(20px)" }} />

                <div className="flex flex-col gap-2 items-center text-[10px] font-bold text-white/30 uppercase tracking-widest font-mono" style={{ transform: "translateZ(35px)", transformStyle: "preserve-3d" }}>
                  <QueueCounter value={14205} />
                  <motion.button
                    onClick={() => {
                      setStatus("idle");
                      setEmail("");
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="mt-4 px-4 py-2 rounded-lg border border-white/10 hover:border-white/20 text-white/60 hover:text-white transition-all text-[9px] cursor-pointer"
                  >
                    ← Back to Sign Up
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </main>

    </div>
  );
}
