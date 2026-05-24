import { useState } from "react";
import { motion } from "framer-motion";
import { BENTO_THEMES, BENTO_THEME_LIST } from "../../themes/themeConfig";

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
const BentoTile = ({ children, className = "", delay = 0, theme }) => (
  <motion.div
    variants={{
      hidden: { opacity: 0, y: 15 },
      visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 18 } },
    }}
    whileHover={{
      y: -2,
      borderColor: `${theme.primary}33`,
      boxShadow: `0 12px 30px rgba(0,0,0,0.45)`,
    }}
    className={`rounded-2xl p-5 border border-white/5 transition-colors duration-300 relative flex flex-col justify-between overflow-hidden cursor-default group ${className}`}
    style={{
      background: "linear-gradient(135deg, rgba(16, 20, 44, 0.6) 0%, rgba(8, 10, 22, 0.8) 100%)",
      boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
      backdropFilter: "blur(20px)",
    }}
  >
    {/* Subtle corner light accent */}
    <div
      className="absolute top-0 right-0 w-24 h-24 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
      style={{
        background: `radial-gradient(circle at top right, ${theme.primaryMuted}, transparent 70%)`,
      }}
    />
    {children}
  </motion.div>
);

/* ═══════════════════════════════════════════════════════════  TOGGLE SWITCH  */
const Toggle = ({ active, onChange, theme }) => (
  <button
    onClick={onChange}
    className="w-10 h-5.5 rounded-full p-0.5 cursor-pointer outline-none relative transition-colors duration-300 flex items-center"
    style={{
      background: active ? theme.primary : "rgba(255,255,255,0.06)",
      border: `1px solid ${active ? theme.primary : "rgba(255,255,255,0.08)"}`,
      boxShadow: active ? `0 0 10px ${theme.glow}33` : "none",
    }}
  >
    <motion.div
      layout
      transition={{ type: "spring", stiffness: 500, damping: 30 }}
      className="w-4 h-4 rounded-full shadow-md"
      style={{
        background: active ? "#000" : "#fff",
        x: active ? "18px" : "0px",
      }}
    />
  </button>
);

export default function BentoProfile() {
  const [currentTheme, setCurrentTheme] = useState(BENTO_THEMES.midnightBlue);

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
      className="relative w-full min-h-screen flex flex-col justify-start items-center p-6 md:p-8"
      style={{
        background: "radial-gradient(circle at 50% 50%, #0d0f22 0%, #05060e 100%)",
      }}
    >
      {/* Background orbs */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden opacity-30">
        <div
          className="absolute w-[400px] h-[400px] rounded-full transition-colors duration-1000"
          style={{
            background: currentTheme.primary,
            filter: "blur(130px)",
            top: "-10%",
            left: "10%",
          }}
        />
        <div
          className="absolute w-[400px] h-[400px] rounded-full transition-colors duration-1000"
          style={{
            background: currentTheme.id === "toxicGreen" ? "#8B5CF6" : "#39FF14",
            filter: "blur(130px)",
            bottom: "-10%",
            right: "10%",
          }}
        />
      </div>

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
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-white/5 pb-5">
          <div>
            <h1 className="text-2xl font-black tracking-tight text-white flex items-center gap-2">
              System Settings
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border border-white/10 bg-white/5">
                v2.5
              </span>
            </h1>
            <p className="text-xs text-white/40 mt-1">
              Asymmetric bento dashboard customization matrix. Manage and personalize credentials.
            </p>
          </div>
          <div className="text-xs font-mono text-white/50 flex items-center gap-2">
            Status: <span className="font-bold uppercase" style={{ color: currentTheme.primary }}>Online</span>
            <span className="w-2 h-2 rounded-full animate-ping" style={{ background: currentTheme.primary }} />
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
          <BentoTile className="md:col-span-1 md:row-span-2 flex flex-col justify-between min-h-[380px]" theme={currentTheme}>
            <div className="w-full">
              {/* Profile Avatar Stack */}
              <div className="relative w-20 h-20 mx-auto mb-4 group/avatar">
                <div
                  className="absolute inset-0 rounded-full transition-colors duration-500 animate-pulse"
                  style={{
                    border: `2.5px solid ${currentTheme.primary}`,
                    boxShadow: `0 0 14px ${currentTheme.glow}`,
                  }}
                />
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
                  alt="Aria Thorne"
                  className="w-full h-full rounded-full object-cover p-1 relative z-10"
                />
                <div
                  className="absolute bottom-0 right-0 w-6 h-6 rounded-full flex items-center justify-center border-2 border-[#090b17] z-20 text-[10px] font-black"
                  style={{ background: currentTheme.primary, color: "#000" }}
                >
                  ✓
                </div>
              </div>

              {/* Name Details */}
              <div className="text-center">
                <h2 className="text-lg font-black text-white leading-tight flex items-center justify-center gap-1">
                  Aria Thorne
                </h2>
                <p className="text-[11px] font-semibold text-white/40 tracking-wide uppercase mt-0.5">
                  Principal Designer
                </p>
                <div className="flex items-center justify-center gap-1.5 mt-2.5">
                  <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-white/5 border border-white/5 text-white/50">
                    UID: 8092-X
                  </span>
                  <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-white/5 border border-white/5 text-white/50">
                    Pro Member
                  </span>
                </div>
              </div>

              <p className="text-[11px] text-white/50 leading-relaxed text-center mt-5 px-2">
                Blending aesthetics and physics to craft fluid web environments. Over 7 years of interactive code development.
              </p>
            </div>

            {/* Micro Stats */}
            <div className="grid grid-cols-3 gap-2 pt-5 border-t border-white/5 mt-5">
              {[
                { label: "Projects", val: "48" },
                { label: "Followers", val: "12K" },
                { label: "Stars", val: "1.9K" },
              ].map((s, idx) => (
                <div key={idx} className="text-center">
                  <div className="text-xs font-mono font-black text-white">{s.val}</div>
                  <div className="text-[9px] text-white/30 font-bold uppercase tracking-wider mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>
          </BentoTile>

          {/* TILE 2: System Settings / Analytics Progress (Col 2, Row 1) */}
          <BentoTile className="md:col-span-1" theme={currentTheme}>
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest font-mono">
                  Analytics & Status
                </span>
                <span className="text-white/30">
                  <IconCpu />
                </span>
              </div>
              <h3 className="text-sm font-black text-white mb-4">System Performance</h3>

              {/* Progress Bars */}
              <div className="flex flex-col gap-3.5">
                {[
                  { label: "Profile Completion", pct: completionProgress },
                  { label: "Cloud Storage Used", pct: storageProgress },
                  { label: "API Quota Rate", pct: apiProgress },
                ].map((bar, i) => (
                  <div key={i}>
                    <div className="flex justify-between text-[10px] font-semibold text-white/60 mb-1.5 font-mono">
                      <span>{bar.label}</span>
                      <span style={{ color: currentTheme.primary }}>{bar.pct}%</span>
                    </div>
                    {/* Bar Track */}
                    <div className="h-2 w-full rounded-full bg-white/5 border border-white/5 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${bar.pct}%` }}
                        transition={{ duration: 1.2, ease: "easeOut" }}
                        className="h-full rounded-full transition-all duration-1000"
                        style={{
                          background: currentTheme.primary,
                          boxShadow: `0 0 8px ${currentTheme.glow}`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </BentoTile>

          {/* TILE 3: Appearance Tile Theme Customizer (Col 3, Row 1) */}
          <BentoTile className="md:col-span-1" theme={currentTheme}>
            <div className="flex flex-col justify-between h-full">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest font-mono">
                    Appearance
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-wider font-mono px-2 py-0.5 rounded bg-white/5 border border-white/5" style={{ color: currentTheme.primary }}>
                    Active
                  </span>
                </div>
                <h3 className="text-sm font-black text-white mb-2">Accent Calibration</h3>
                <p className="text-[11px] text-white/40 leading-relaxed mb-5">
                  Select a theme dot to globally re-calibrate dashboard elements, highlights, indicators, and toggles.
                </p>
              </div>

              {/* Theme Picker row */}
              <div className="flex items-center justify-around bg-black/30 p-2.5 rounded-xl border border-white/5">
                {BENTO_THEME_LIST.map((theme) => {
                  const isActive = currentTheme.id === theme.id;
                  return (
                    <motion.button
                      key={theme.id}
                      onClick={() => setCurrentTheme(theme)}
                      whileHover={{ scale: 1.3, y: -1 }}
                      whileTap={{ scale: 0.85 }}
                      title={theme.label}
                      className="w-4.5 h-4.5 rounded-full cursor-pointer relative flex-shrink-0"
                      style={{
                        background: theme.swatch,
                      }}
                    >
                      {isActive && (
                        <motion.span
                          layoutId="bento-active-ring"
                          className="absolute -inset-1 rounded-full border"
                          style={{
                            borderColor: theme.swatch,
                            boxShadow: `0 0 6px ${theme.glow}`,
                          }}
                          transition={{ type: "spring", stiffness: 350, damping: 25 }}
                        />
                      )}
                    </motion.button>
                  );
                })}
              </div>
            </div>
          </BentoTile>

          {/* TILE 4: Preferences Toggles (Col 2-3, Row 2) */}
          <BentoTile className="md:col-span-2 flex flex-col justify-between" theme={currentTheme}>
            <div className="w-full">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest font-mono">
                  Preferences
                </span>
                <span className="text-white/30">
                  <IconShield />
                </span>
              </div>
              <h3 className="text-sm font-black text-white mb-4">Privacy & System Control</h3>

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
                    className="p-3.5 rounded-xl border border-white/5 bg-black/20 flex items-center justify-between gap-3"
                  >
                    <div>
                      <div className="text-xs font-extrabold text-white">{pref.label}</div>
                      <div className="text-[9px] text-white/40 mt-0.5 leading-snug">{pref.desc}</div>
                    </div>
                    <Toggle
                      active={prefs[pref.key]}
                      onChange={() => togglePref(pref.key)}
                      theme={currentTheme}
                    />
                  </div>
                ))}
              </div>
            </div>
          </BentoTile>

          {/* TILE 5: Notification Center (Col 1-2, Row 3) */}
          <BentoTile className="md:col-span-2" theme={currentTheme}>
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest font-mono">
                  Log Console
                </span>
                <span className="text-white/30">
                  <IconBell />
                </span>
              </div>
              <h3 className="text-sm font-black text-white mb-3.5">Recent Security Events</h3>

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
                  <div
                    key={idx}
                    className="flex items-center justify-between gap-4 p-2.5 rounded-xl border border-white/5 hover:bg-white/2 transition-colors duration-200"
                  >
                    <div className="flex items-center gap-3">
                      {/* Notification Badge Reacts to theme */}
                      <span
                        className="w-2 h-2 rounded-full flex-shrink-0 transition-colors duration-1000"
                        style={{
                          background: evt.unread ? currentTheme.primary : "rgba(255,255,255,0.12)",
                          boxShadow: evt.unread ? `0 0 6px ${currentTheme.glow}` : "none",
                        }}
                      />
                      <div>
                        <div className="text-xs font-bold text-white">{evt.title}</div>
                        <div className="text-[9px] text-white/40 mt-0.5 leading-snug">{evt.desc}</div>
                      </div>
                    </div>
                    <span className="text-[9px] font-mono text-white/30 flex-shrink-0">{evt.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </BentoTile>

          {/* TILE 6: Premium Card / Quick Highlights (Col 3, Row 3) */}
          <BentoTile className="md:col-span-1 flex flex-col justify-between" theme={currentTheme}>
            <div className="w-full">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest font-mono">
                  Account Plan
                </span>
                <span className="text-white/30">
                  <IconGlobe />
                </span>
              </div>
              <h3 className="text-sm font-black text-white mb-2">Upgrade Calibration</h3>
              <p className="text-[11px] text-white/50 leading-relaxed mb-4">
                Access advanced 2.5D visual parameters, customized styling APIs, and unlimited clouds.
              </p>
            </div>

            {/* Active text highlight CTA button */}
            <div className="pt-2">
              <a
                href="#upgrade"
                className="w-full text-center py-2.5 rounded-xl text-[10px] uppercase font-black tracking-widest block transition-all duration-300 border font-mono select-none"
                style={{
                  background: currentTheme.primaryMuted,
                  borderColor: currentTheme.border,
                  color: currentTheme.primary,
                  boxShadow: `inset 0 1px 0 rgba(255,255,255,0.05)`,
                }}
                onClick={(e) => e.preventDefault()}
              >
                Upgrade to Premium
              </a>
              <span className="text-[9px] text-white/30 text-center block mt-2 font-mono uppercase font-semibold">
                No credit card required. Cancel anytime.
              </span>
            </div>
          </BentoTile>
        </motion.div>
      </div>
    </div>
  );
}
