import { useState, useRef, useCallback, useMemo } from "react";
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate, AnimatePresence } from "framer-motion";
import { useGlobalTheme } from "../../themes/ThemeContext";

/* ═══════════════════════════════════════════════════════════  ICONS  */
const IconShield = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

const IconBell = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
  </svg>
);

const IconGlobe = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);

const IconCpu = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="4" width="16" height="16" rx="2" />
    <rect x="9" y="9" width="6" height="6" />
    <line x1="9" y1="1" x2="9" y2="4" />
    <line x1="15" y1="1" x2="15" y2="4" />
    <line x1="9" y1="20" x2="9" y2="23" />
    <line x1="15" y1="20" x2="15" y2="23" />
    <line x1="20" y1="9" x2="23" y2="9" />
    <line x1="20" y1="15" x2="23" y2="15" />
    <line x1="1" y1="9" x2="4" y2="9" />
    <line x1="1" y1="15" x2="4" y2="15" />
  </svg>
);

const IconCheckCircle = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

/* ═══════════════════════════════════════════════════════════  BENTO TILE CONTAINER  */
const BentoTile = ({ children, className = "", theme }) => {
  const { activeVariant } = useGlobalTheme();
  const [hovered, setHovered] = useState(false);
  const tileRef = useRef(null);

  /* Magnetic tilt */
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const springCfg = activeVariant.springConfig || { stiffness: 120, damping: 18 };
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [3, -3]), springCfg);
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-3, 3]), springCfg);

  /* Glow follows cursor percentage */
  const glowX = useMotionValue(50);
  const glowY = useMotionValue(50);
  const glowBg = useMotionTemplate`radial-gradient(180px circle at ${glowX}% ${glowY}%, ${theme.primary}, transparent 65%)`;

  const handleMouseMove = useCallback((e) => {
    if (!tileRef.current) return;
    const rect = tileRef.current.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
    glowX.set(((e.clientX - rect.left) / rect.width) * 100);
    glowY.set(((e.clientY - rect.top) / rect.height) * 100);
  }, [mx, my, glowX, glowY]);

  const handleMouseLeave = useCallback(() => {
    mx.set(0);
    my.set(0);
  }, [mx, my]);

  const isBrutal = activeVariant.id === 'brutal';
  const isLuxury = activeVariant.id === 'luxury';

  return (
    <motion.div
      ref={tileRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover="hover"
      variants={{
        hidden: { opacity: 0, y: 15 },
        visible: { opacity: 1, y: 0, transition: activeVariant.transition || { type: "spring", stiffness: 100, damping: 18 } },
      }}
      style={{
        rotateX: hovered ? rotateX : 0,
        rotateY: hovered ? rotateY : 0,
        transformStyle: "preserve-3d",
      }}
      className={`p-5 transition-all duration-300 relative flex flex-col justify-between overflow-hidden cursor-default group ${activeVariant.cardClass} ${className}`}
    >
      {/* Magnetic cursor-follow glow, disabled for brutal/luxury where glows look weird */}
      {!isBrutal && !isLuxury && (
        <motion.div
          className="absolute inset-0 pointer-events-none opacity-0 transition-opacity duration-500 rounded-[inherit]"
          style={{
            opacity: hovered ? 0.08 : 0,
            background: glowBg,
          }}
        />
      )}
      {children}
    </motion.div>
  );
};

/* ═══════════════════════════════════════════════════════════  TOGGLE SWITCH  */
const Toggle = ({ active, onChange, theme }) => (
  <motion.button
    onClick={onChange}
    whileHover={{ scale: 1.06 }}
    whileTap={{ scale: 0.92 }}
    className="w-10 h-5.5 rounded-full p-0.5 cursor-pointer outline-none relative transition-colors duration-300 flex items-center"
    style={{
      background: active ? theme.primary : "rgba(255,255,255,0.06)",
      border: `1px solid ${active ? theme.primary : "rgba(255,255,255,0.08)"}`,
      boxShadow: active ? `0 0 10px ${theme.glow}33` : "none",
    }}
  >
    <motion.div
      layout
      transition={{ type: "spring", stiffness: 450, damping: 22 }}
      className="w-4 h-4 rounded-full shadow-md"
      style={{
        background: active ? "#000" : "#fff",
        x: active ? "18px" : "0px",
      }}
    />
  </motion.button>
);

export default function BentoProfile() {
  const { activeVariant } = useGlobalTheme();
  const isLight = activeVariant.mode === "light";
  const txtPrimary = isLight ? "text-slate-900 font-bold" : "text-white";
  const txtMuted = isLight ? "text-slate-600 font-semibold" : "text-white/50";
  const txtDim = isLight ? "text-slate-500" : "text-white/40";
  const txtSuperDim = isLight ? "text-slate-400" : "text-white/30";

  const theme = useMemo(() => {
    const hex = activeVariant.triggerColor || "#3B82F6";
    let r = 59, g = 130, b = 246;
    const match = hex.match(/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i);
    if (match) {
      r = parseInt(match[1], 16);
      g = parseInt(match[2], 16);
      b = parseInt(match[3], 16);
    } else {
      const shortMatch = hex.match(/^#?([a-f\d])([a-f\d])([a-f\d])$/i);
      if (shortMatch) {
        r = parseInt(shortMatch[1] + shortMatch[1], 16);
        g = parseInt(shortMatch[2] + shortMatch[2], 16);
        b = parseInt(shortMatch[3] + shortMatch[3], 16);
      }
    }
    return {
      id: activeVariant.id || "global",
      primary: hex,
      primaryMuted: `rgba(${r}, ${g}, ${b}, 0.12)`,
      glow: `rgba(${r}, ${g}, ${b}, 0.5)`,
      border: `rgba(${r}, ${g}, ${b}, 0.3)`,
    };
  }, [activeVariant]);

  // States for preferences
  const [prefs, setPrefs] = useState({
    notifications: true,
    twoFactor: false,
    developerMode: true,
    publicProfile: true,
  });

  const togglePref = (key) => {
    setPrefs((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // Mock analytics progress values
  const completionProgress = 85;
  const storageProgress = 62;
  const apiProgress = 40;

  return (
    <div
      id="component-04-bento-profile"
      className={`relative w-full min-h-screen flex flex-col justify-start items-center p-6 md:p-8 font-secondary ${activeVariant.canvasClass}`}
    >
      {/* Background orbs */}
      {activeVariant.id !== 'brutal' && (
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden opacity-30">
          <div
            className="absolute w-[400px] h-[400px] rounded-full transition-colors duration-1000"
            style={{
              background: theme.primary,
              filter: "blur(130px)",
              top: "-10%",
              left: "10%",
            }}
          />
          <div
            className="absolute w-[400px] h-[400px] rounded-full transition-colors duration-1000"
            style={{
              background: theme.id === "toxicGreen" ? "#8B5CF6" : "#39FF14",
              filter: "blur(130px)",
              bottom: "-10%",
              right: "10%",
            }}
          />
        </div>
      )}

      {/* Grid Pattern overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-0 opacity-[0.08]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative z-10 w-full max-w-5xl flex flex-col gap-6">
        {/* Header section */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-black/10 dark:border-white/5 pb-5">
          <div>
            <h1 className={`text-2xl font-black tracking-tight flex items-center gap-2 ${txtPrimary}`}>
              System Settings
              <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 ${txtDim}`}>
                v2.5
              </span>
            </h1>
            <p className={`text-xs mt-1 ${txtDim}`}>
              Asymmetric bento dashboard customization matrix. Manage and personalize credentials.
            </p>
          </div>
          <div className={`text-xs font-mono flex items-center gap-2 ${txtMuted}`}>
            Status: <span className="font-bold uppercase" style={{ color: theme.primary }}>Online</span>
            <span className="w-2 h-2 rounded-full animate-ping" style={{ background: theme.primary }} />
          </div>
        </div>

        {/* ── BENTO GRID ── */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.05 } },
          }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          {/* TILE 1: Profile Summary (Spans 2 rows, Col 1) */}
          <BentoTile className="md:col-span-1 md:row-span-2 flex flex-col justify-between min-h-[380px]" theme={theme}>
            <div className="w-full" style={{ transform: "translateZ(25px)", transformStyle: "preserve-3d" }}>
              {/* Profile Avatar Stack */}
              <div className="relative w-20 h-20 mx-auto mb-4 group/avatar">
                <div
                  className="absolute inset-0 rounded-full transition-colors duration-500 animate-pulse"
                  style={{
                    border: `2.5px solid ${theme.primary}`,
                    boxShadow: `0 0 14px ${theme.glow}`,
                  }}
                />
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
                  alt="Aria Thorne"
                  className="w-full h-full rounded-full object-cover p-1 relative z-10"
                />
                <motion.div
                  variants={{
                    hover: { scale: 1.25, rotate: 360, transition: { type: "spring", stiffness: 200 } }
                  }}
                  className="absolute bottom-0 right-0 w-6 h-6 rounded-full flex items-center justify-center border-2 border-[#090b17] z-20 text-[10px] font-black"
                  style={{ background: theme.primary, color: "#000" }}
                >
                  ✓
                </motion.div>
              </div>

              {/* Name Details */}
              <div className="text-center">
                <h2 className={`text-lg font-black leading-tight flex items-center justify-center gap-1 ${txtPrimary}`}>
                  Aria Thorne
                </h2>
                <p className={`text-[11px] font-semibold tracking-wide uppercase mt-0.5 ${txtDim}`}>
                  Principal Designer
                </p>
                <div className="flex items-center justify-center gap-1.5 mt-2.5">
                  <span className={`text-[9px] font-mono px-2 py-0.5 rounded bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 ${txtMuted}`}>
                    UID: 8092-X
                  </span>
                  <span className={`text-[9px] font-mono px-2 py-0.5 rounded bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 ${txtMuted}`}>
                    Pro Member
                  </span>
                </div>
              </div>

              <p className={`text-[11px] leading-relaxed text-center mt-5 px-2 ${txtMuted}`}>
                Blending aesthetics and physics to craft fluid web environments. Over 7 years of interactive code development.
              </p>
            </div>

            {/* Micro Stats */}
            <div className="grid grid-cols-3 gap-2 pt-5 border-t border-black/10 dark:border-white/5 mt-5" style={{ transform: "translateZ(15px)" }}>
              {[
                { label: "Projects", val: "48" },
                { label: "Followers", val: "12K" },
                { label: "Stars", val: "1.9K" },
              ].map((s, idx) => (
                <div key={idx} className="text-center">
                  <div className={`text-xs font-mono font-black ${txtPrimary}`}>{s.val}</div>
                  <div className={`text-[9px] font-bold uppercase tracking-wider mt-0.5 ${txtSuperDim}`}>{s.label}</div>
                </div>
              ))}
            </div>
          </BentoTile>

          {/* TILE 2: System Settings / Analytics Progress (Col 2, Row 1) */}
          <BentoTile className="md:col-span-1" theme={theme}>
            <div style={{ transform: "translateZ(20px)", transformStyle: "preserve-3d" }}>
              <div className="flex items-center justify-between mb-4">
                <span className={`text-[10px] font-bold uppercase tracking-widest font-mono ${txtDim}`}>
                  Analytics & Status
                </span>
                <motion.span
                  variants={{
                    hover: { rotate: 180, scale: 1.15, transition: { duration: 0.4 } }
                  }}
                  className={txtSuperDim}
                >
                  <IconCpu />
                </motion.span>
              </div>
              <h3 className={`text-sm font-black mb-4 ${txtPrimary}`}>System Performance</h3>

              {/* Progress Bars */}
              <div className="flex flex-col gap-3.5">
                {[
                  { label: "Profile Completion", pct: completionProgress },
                  { label: "Cloud Storage Used", pct: storageProgress },
                  { label: "API Quota Rate", pct: apiProgress },
                ].map((bar, i) => (
                  <div key={i}>
                    <div className={`flex justify-between text-[10px] font-semibold mb-1.5 font-mono ${txtMuted}`}>
                      <span>{bar.label}</span>
                      <span style={{ color: theme.primary }}>{bar.pct}%</span>
                    </div>
                    {/* Bar Track */}
                    <div className="h-2 w-full rounded-full bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 overflow-hidden relative">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${bar.pct}%` }}
                        transition={{ duration: 1.2, ease: "easeOut" }}
                        className="h-full rounded-full relative overflow-hidden"
                        style={{
                          background: theme.primary,
                          boxShadow: activeVariant.id === 'brutal' ? 'none' : `0 0 8px ${theme.glow}`,
                        }}
                      >
                        {/* Shimmer sweep overlay */}
                        {activeVariant.id !== 'brutal' && (
                          <motion.div
                            className="absolute inset-0"
                            style={{
                              background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.45), transparent)",
                            }}
                            animate={{ x: ["-100%", "200%"] }}
                            transition={{ duration: 2.2, repeat: Infinity, ease: "linear" }}
                          />
                        )}
                      </motion.div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </BentoTile>

          {/* TILE 3: Appearance Tile Theme Customizer (Col 3, Row 1) */}
          <BentoTile className="md:col-span-1" theme={theme}>
            <div className="flex flex-col justify-between h-full" style={{ transform: "translateZ(20px)", transformStyle: "preserve-3d" }}>
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className={`text-[10px] font-bold uppercase tracking-widest font-mono ${txtDim}`}>
                    Appearance
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-wider font-mono px-2 py-0.5 rounded bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5" style={{ color: theme.primary }}>
                    Active
                  </span>
                </div>
                <h3 className={`text-sm font-black mb-2 ${txtPrimary}`}>Accent Calibration</h3>
                <p className={`text-[11px] leading-relaxed mb-5 ${txtDim}`}>
                  System accents are dynamically synced with the global workspace theme configuration. Control is unified.
                </p>
              </div>

              {/* Dynamic Theme Status visualizer */}
              <div className="flex items-center justify-between bg-black/10 dark:bg-black/30 p-3.5 rounded-xl border border-black/5 dark:border-white/5">
                <div className="flex items-center gap-3">
                  <div 
                    className="w-4.5 h-4.5 rounded-full"
                    style={{ 
                      background: theme.primary,
                      boxShadow: activeVariant.id === 'brutal' ? 'none' : `0 0 10px ${theme.glow}`
                    }}
                  />
                  <div className="flex flex-col">
                    <span className={`text-[10px] font-bold leading-none uppercase tracking-wider ${txtPrimary}`}>
                      {activeVariant.name || "Global Sync"}
                    </span>
                    <span className={`text-[9px] font-mono mt-1 ${txtDim}`}>
                      {theme.primary.toUpperCase()}
                    </span>
                  </div>
                </div>
                <span className={`text-[9px] font-mono font-bold uppercase ${txtSuperDim}`}>
                  Locked
                </span>
              </div>
            </div>
          </BentoTile>

          {/* TILE 4: Preferences Toggles (Col 2-3, Row 2) */}
          <BentoTile className="md:col-span-2 flex flex-col justify-between" theme={theme}>
            <div className="w-full" style={{ transform: "translateZ(20px)", transformStyle: "preserve-3d" }}>
              <div className="flex items-center justify-between mb-4">
                <span className={`text-[10px] font-bold uppercase tracking-widest font-mono ${txtDim}`}>
                  Preferences
                </span>
                <motion.span
                  variants={{
                    hover: { rotate: [0, -12, 12, -12, 0], scale: 1.15, transition: { duration: 0.5 } }
                  }}
                  className={txtSuperDim}
                >
                  <IconShield />
                </motion.span>
              </div>
              <h3 className={`text-sm font-black mb-4 ${txtPrimary}`}>Privacy & System Control</h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  {
                    key: "notifications",
                    label: "Push Notifications",
                    desc: "Notify on system deployments & billing.",
                  },
                  {
                    key: "twoFactor",
                    label: "Two-Factor Credentials",
                    desc: "Require extra verification codes on login.",
                  },
                  {
                    key: "developerMode",
                    label: "Developer Mode Core",
                    desc: "Access web terminal tools and logs.",
                  },
                  {
                    key: "publicProfile",
                    label: "Public Index Listing",
                    desc: "Allow profiles to be searched publicly.",
                  },
                ].map((pref) => (
                  <div
                    key={pref.key}
                    className="p-3.5 rounded-xl border border-black/5 dark:border-white/5 bg-black/5 dark:bg-black/20 flex items-center justify-between gap-3"
                  >
                    <div>
                      <div className={`text-xs font-extrabold ${txtPrimary}`}>{pref.label}</div>
                      <div className={`text-[9px] mt-0.5 leading-snug ${txtDim}`}>{pref.desc}</div>
                    </div>
                    <Toggle
                      active={prefs[pref.key]}
                      onChange={() => togglePref(pref.key)}
                      theme={theme}
                    />
                  </div>
                ))}
              </div>
            </div>
          </BentoTile>

          {/* TILE 5: Notification Center (Col 1-2, Row 3) */}
          <BentoTile className="md:col-span-2" theme={theme}>
            <div style={{ transform: "translateZ(20px)", transformStyle: "preserve-3d" }}>
              <div className="flex items-center justify-between mb-4">
                <span className={`text-[10px] font-bold uppercase tracking-widest font-mono ${txtDim}`}>
                  Log Console
                </span>
                <motion.span
                  variants={{
                    hover: { rotate: [0, -15, 15, -15, 15, 0], scale: 1.15, transition: { duration: 0.5 } }
                  }}
                  className={txtSuperDim}
                >
                  <IconBell />
                </motion.span>
              </div>
              <h3 className={`text-sm font-black mb-3.5 ${txtPrimary}`}>Recent Security Events</h3>

              {/* Feed items */}
              <div className="flex flex-col gap-2.5">
                {[
                  {
                    title: "Authorization Success",
                    desc: "Credentials authorized from Chrome (SF, USA).",
                    time: "10m ago",
                    unread: true,
                  },
                  {
                    title: "API Sync Initiated",
                    desc: "Updated 14 configuration node states successfully.",
                    time: "1h ago",
                    unread: false,
                  },
                  {
                    title: "Cloud Sync Enabled",
                    desc: "Database node synced with local cache.",
                    time: "4h ago",
                    unread: false,
                  },
                ].map((evt, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.15 + idx * 0.08, duration: 0.4 }}
                    whileHover={{ x: 3, background: isLight ? "rgba(0,0,0,0.03)" : "rgba(255,255,255,0.03)" }}
                    className="flex items-center justify-between gap-4 p-2.5 rounded-xl border border-black/5 dark:border-white/5 transition-colors duration-200 cursor-default"
                  >
                    <div className="flex items-center gap-3">
                      {/* Notification Badge Reacts to theme */}
                      <span
                        className="w-2 h-2 rounded-full flex-shrink-0 transition-colors duration-1000"
                        style={{
                          background: evt.unread ? theme.primary : (isLight ? "rgba(0,0,0,0.15)" : "rgba(255,255,255,0.12)"),
                          boxShadow: (evt.unread && activeVariant.id !== 'brutal') ? `0 0 6px ${theme.glow}` : "none",
                        }}
                      />
                      <div>
                        <div className={`text-xs font-bold ${txtPrimary}`}>{evt.title}</div>
                        <div className={`text-[9px] mt-0.5 leading-snug ${txtDim}`}>{evt.desc}</div>
                      </div>
                    </div>
                    <span className={`text-[9px] font-mono flex-shrink-0 ${txtSuperDim}`}>{evt.time}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </BentoTile>

          {/* TILE 6: Premium Card / Quick Highlights (Col 3, Row 3) */}
          <BentoTile className="md:col-span-1 flex flex-col justify-between" theme={theme}>
            <div className="w-full" style={{ transform: "translateZ(20px)", transformStyle: "preserve-3d" }}>
              <div className="flex items-center justify-between mb-4">
                <span className={`text-[10px] font-bold uppercase tracking-widest font-mono ${txtDim}`}>
                  Account Plan
                </span>
                <motion.span
                  variants={{
                    hover: { rotate: 360, scale: 1.15, transition: { duration: 0.8, ease: "linear" } }
                  }}
                  className={txtSuperDim}
                >
                  <IconGlobe />
                </motion.span>
              </div>
              <h3 className={`text-sm font-black mb-2 ${txtPrimary}`}>Upgrade Calibration</h3>
              <p className={`text-[11px] leading-relaxed mb-4 ${txtMuted}`}>
                Access advanced 2.5D visual parameters, customized styling APIs, and unlimited clouds.
              </p>
            </div>

            {/* Active text highlight CTA button */}
            <div className="pt-2" style={{ transform: "translateZ(25px)" }}>
              <motion.button
                onClick={(e) => e.preventDefault()}
                whileHover={activeVariant.id === 'brutal' ? { translate: "-2px -2px" } : { scale: 1.03, y: -1 }}
                whileTap={{ scale: 0.97 }}
                className={`w-full text-center py-2.5 text-[10px] uppercase font-black tracking-widest block transition-all duration-300 ${activeVariant.buttonClass}`}
              >
                {/* Sweep shimmer */}
                {activeVariant.id !== 'brutal' && (
                  <motion.div
                    className="absolute inset-0"
                    style={{
                      background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent)",
                    }}
                    animate={{ x: ["-100%", "200%"] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
                  />
                )}
                Upgrade to Premium
              </motion.button>
              <span className={`text-[9px] text-center block mt-2 font-mono uppercase font-semibold ${txtSuperDim}`}>
                No credit card required. Cancel anytime.
              </span>
            </div>
          </BentoTile>
        </motion.div>
      </div>
    </div>
  );
}
