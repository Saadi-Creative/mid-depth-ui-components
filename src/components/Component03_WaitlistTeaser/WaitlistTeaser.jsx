import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { WAITLIST_THEMES, WAITLIST_THEME_LIST } from "../../themes/themeConfig";

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

export default function WaitlistTeaser() {
  const [currentTheme, setCurrentTheme] = useState(WAITLIST_THEMES.mint);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle, loading, success
  const [errorMsg, setErrorMsg] = useState("");

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
      <main className="relative z-10 w-full max-w-[480px] my-auto flex flex-col items-center">
        {/* Layer 2: Flat visual background plate (offset slightly downwards for 2.5D separation) */}
        <div
          className="absolute inset-0 rounded-2xl pointer-events-none transition-all duration-700"
          style={{
            transform: "translateY(8px) scale(0.985)",
            background: "rgba(255,255,255,0.02)",
            border: `1px solid ${currentTheme.border}`,
            boxShadow: `0 15px 35px rgba(0,0,0,0.6)`,
            opacity: 0.65,
          }}
        />

        {/* Layer 1: Core Form Card */}
        <div
          className="relative w-full rounded-2xl p-8 sm:p-10 overflow-hidden transition-all duration-500"
          style={{
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

          <AnimatePresence mode="wait">
            {status !== "success" ? (
              <motion.div
                key="waitlist-form"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
              >
                <div className="flex justify-center mb-5">
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

                <h1 className="text-3xl sm:text-4xl font-black text-white text-center leading-tight tracking-tight mb-3">
                  Unlocking a New <span className="text-white/90">Dimension</span>
                </h1>
                <p className="text-xs text-center text-white/50 leading-relaxed mb-8 max-w-[340px] mx-auto">
                  A high-converting 2.5D interface platform designed for modern creators. Enter your email below to request early beta access.
                </p>

                {/* Form */}
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30">
                      <IconMail />
                    </span>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (errorMsg) setErrorMsg("");
                      }}
                      placeholder="Enter your email address..."
                      className="w-full text-xs py-3.5 pl-11 pr-4 rounded-xl text-white outline-none bg-white/4 border transition-all duration-300 font-semibold"
                      style={{
                        borderColor: errorMsg
                          ? "#FF6B6B"
                          : "rgba(255, 255, 255, 0.08)",
                        boxShadow:
                          email && !errorMsg
                            ? `0 0 0 3px ${currentTheme.primaryMuted}, 0 0 16px ${currentTheme.glow}33`
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
                    whileHover={{ scale: 1.015, y: -0.5 }}
                    whileTap={{ scale: 0.95 }}
                    className="relative w-full py-3.5 rounded-xl font-black text-[11px] uppercase tracking-widest cursor-pointer overflow-hidden select-none transition-all duration-500 shadow-lg flex items-center justify-center gap-2"
                    style={{
                      background: currentTheme.primary,
                      color: "#080C14",
                      boxShadow: `0 6px 20px ${currentTheme.glow}44`,
                    }}
                  >
                    {status === "loading" ? (
                      <>
                        <IconSpinner />
                        Securing Spot...
                      </>
                    ) : (
                      "Join Waitlist →"
                    )}
                  </motion.button>
                </form>

                {/* Social Proof */}
                <div className="mt-8 flex flex-col items-center gap-3">
                  <div className="flex -space-x-2">
                    {[
                      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=60&auto=format&fit=crop&q=80",
                      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&auto=format&fit=crop&q=80",
                      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=60&auto=format&fit=crop&q=80",
                      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=60&auto=format&fit=crop&q=80",
                    ].map((src, i) => (
                      <img
                        key={i}
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
                  }}
                >
                  <IconCheck />
                </motion.div>

                <h2 className="text-2xl font-black text-white text-center leading-tight tracking-tight mb-2">
                  You're On The List!
                </h2>
                <p className="text-xs text-center text-white/50 leading-relaxed mb-6 max-w-[280px]">
                  Spot confirmed for <span className="text-white font-bold">{email}</span>. We'll send an invite link to your inbox soon.
                </p>

                <div className="w-full h-px bg-white/5 mb-6" />

                <div className="flex flex-col gap-2 items-center text-[10px] font-bold text-white/30 uppercase tracking-widest font-mono">
                  <span>QUEUE POSITION: #14,205</span>
                  <button
                    onClick={() => {
                      setStatus("idle");
                      setEmail("");
                    }}
                    className="mt-4 px-4 py-2 rounded-lg border border-white/10 hover:border-white/20 text-white/60 hover:text-white transition-all text-[9px] cursor-pointer"
                  >
                    ← Back to Sign Up
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* ── FOOTER THEME SWITCHER ── */}
      <footer className="relative z-10 w-full max-w-md flex flex-col items-center gap-3.5 mt-8">
        <span className="text-[10px] font-black tracking-widest text-white/30 uppercase font-mono">
          Accent Customization
        </span>
        <div className="flex items-center gap-4 bg-black/40 backdrop-blur-md px-5 py-3 rounded-full border border-white/5">
          {WAITLIST_THEME_LIST.map((theme) => {
            const isActive = currentTheme.id === theme.id;
            return (
              <motion.button
                key={theme.id}
                onClick={() => setCurrentTheme(theme)}
                whileHover={{ scale: 1.35, y: -2 }}
                whileTap={{ scale: 0.85 }}
                className="w-5 h-5 rounded-full cursor-pointer relative"
                style={{
                  background: theme.swatch,
                }}
              >
                {isActive && (
                  <motion.span
                    layoutId="active-accent-ring"
                    className="absolute -inset-1.5 rounded-full border-2"
                    style={{
                      borderColor: theme.swatch,
                      boxShadow: `0 0 10px ${theme.glow}`,
                    }}
                    transition={{ type: "spring", stiffness: 350, damping: 25 }}
                  />
                )}
              </motion.button>
            );
          })}
        </div>
      </footer>
    </div>
  );
}
