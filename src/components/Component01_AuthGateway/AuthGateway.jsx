import { useState, useRef, useCallback } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
  useSpring,
} from "framer-motion";
import { AUTH_THEMES, AUTH_THEME_LIST } from "../../themes/themeConfig";

/* ═══════════════════════════════════════════════════════════  ICONS  */
const IconLock = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <rect x="3" y="11" width="18" height="11" rx="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);
const IconMail = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
    <polyline points="22,6 12,13 2,6"/>
  </svg>
);
const IconUser = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
    <circle cx="12" cy="7" r="4"/>
  </svg>
);
const IconEye = ({ open }) => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    {open ? (
      <><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></>
    ) : (
      <>
        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
        <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
        <line x1="1" y1="1" x2="23" y2="23"/>
      </>
    )}
  </svg>
);
const IconSpinner = () => (
  <motion.span
    animate={{ rotate: 360 }}
    transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
    className="block w-3.5 h-3.5 border-2 border-black/20 border-t-black rounded-full"
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

/* ═══════════════════════════════════════════════════════════  THEME PICKER  */
const ThemePicker = ({ currentTheme, onThemeChange }) => (
  <div className="flex gap-2 items-center">
    {AUTH_THEME_LIST.map((t) => (
      <motion.button
        key={t.id}
        title={t.label}
        onClick={() => onThemeChange(t)}
        whileHover={{ scale: 1.4, y: -3, rotate: 15 }}
        whileTap={{ scale: 0.85 }}
        className="rounded-full cursor-pointer flex-shrink-0"
        style={{
          width: 16,
          height: 16,
          background: t.swatch,
          boxShadow:
            currentTheme.id === t.id
              ? `0 0 0 2px #0c0f1e, 0 0 0 3.5px ${t.swatch}, 0 0 10px ${t.glow}`
              : `0 0 4px ${t.swatch}55`,
          transition: "box-shadow 0.2s",
        }}
      />
    ))}
  </div>
);

/* ═══════════════════════════════════════════════════════════  INPUT  */
const Field = ({ theme, label, type = "text", value, onChange, placeholder, Icon, compact }) => {
  const [focused, setFocused] = useState(false);
  const [showPwd, setShowPwd] = useState(false);
  const [hovered, setHovered] = useState(false);
  const isPass = type === "password";

  return (
    <motion.div
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      animate={hovered && !focused ? { x: 2 } : { x: 0 }}
      transition={{ duration: 0.2 }}
    >
      <label
        className="block font-semibold uppercase tracking-widest mb-1 transition-colors duration-300"
        style={{
          fontSize: 10,
          color: focused ? theme.primary : hovered ? "rgba(200,215,255,0.65)" : "rgba(200,215,255,0.5)",
        }}
      >
        {label}
      </label>
      <div className="relative">
        {Icon && (
          <motion.span
            className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none transition-colors duration-300"
            style={{ color: focused ? theme.primary : hovered ? "rgba(200,215,255,0.45)" : "rgba(200,215,255,0.28)" }}
            animate={focused ? { scale: 1.15, rotate: -5 } : { scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Icon />
          </motion.span>
        )}
        <input
          type={isPass ? (showPwd ? "text" : "password") : type}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={placeholder}
          className="w-full rounded-xl text-white outline-none transition-all duration-300"
          style={{
            fontSize: 12,
            padding: compact ? "8px 12px" : "10px 12px",
            paddingLeft: Icon ? "2.25rem" : "0.75rem",
            paddingRight: isPass ? "2.5rem" : "0.75rem",
            background: focused
              ? `linear-gradient(135deg, ${theme.primaryMuted}, rgba(255,255,255,0.02))`
              : hovered
                ? "rgba(255,255,255,0.06)"
                : "rgba(255,255,255,0.04)",
            border: `1px solid ${focused ? theme.primary : hovered ? "rgba(255,255,255,0.14)" : "rgba(255,255,255,0.08)"}`,
            boxShadow: focused
              ? `0 0 0 2.5px ${theme.primaryMuted}, 0 0 14px ${theme.glow}28`
              : hovered
                ? `0 0 8px ${theme.primaryMuted}`
                : "none",
          }}
        />
        {isPass && (
          <motion.button
            type="button"
            onClick={() => setShowPwd((v) => !v)}
            whileHover={{ scale: 1.2, rotate: 10 }}
            whileTap={{ scale: 0.9 }}
            className="absolute right-3 top-1/2 -translate-y-1/2 opacity-35 hover:opacity-70 transition-opacity cursor-pointer"
            style={{ color: "white" }}
          >
            <IconEye open={showPwd} />
          </motion.button>
        )}
      </div>
    </motion.div>
  );
};

/* ═══════════════════════════════════════════════════════════  LOGIN FORM  */
const LoginForm = ({ theme, onSwitch }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <form onSubmit={(e) => { e.preventDefault(); setLoading(true); setTimeout(() => setLoading(false), 2000); }}
      className="flex flex-col gap-3">
      <Field theme={theme} label="Email" type="email" value={email}
        onChange={(e) => setEmail(e.target.value)} placeholder="you@nexus.io" Icon={IconMail} compact />
      <Field theme={theme} label="Password" type="password" value={password}
        onChange={(e) => setPassword(e.target.value)} placeholder="••••••••••" compact />

      <div className="flex items-center justify-between">
        <label className="flex items-center gap-1.5 cursor-pointer select-none group">
          <motion.div
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.85 }}
            className="w-3.5 h-3.5 rounded border flex items-center justify-center flex-shrink-0 transition-all duration-200"
            style={{ borderColor: theme.border, background: theme.primaryMuted }}
          >
            <div className="w-1.5 h-1.5 rounded-sm" style={{ background: theme.primary }} />
          </motion.div>
          <span className="group-hover:text-white/60 transition-colors" style={{ fontSize: 11, color: "rgba(200,215,255,0.45)" }}>Remember me</span>
        </label>
        <motion.button
          type="button"
          whileHover={{ scale: 1.05, x: 2 }}
          style={{ fontSize: 11, color: theme.primary }}
          className="font-medium opacity-60 hover:opacity-100 transition-opacity cursor-pointer"
        >
          Forgot password?
        </motion.button>
      </div>

      <motion.button type="submit" whileHover={{ scale: 1.02, y: -2, boxShadow: `0 8px 30px ${theme.glow}` }} whileTap={{ scale: 0.985 }}
        disabled={loading}
        className="relative w-full rounded-xl font-extrabold tracking-widest uppercase overflow-hidden cursor-pointer"
        style={{
          fontSize: 11, padding: "11px 16px",
          background: `linear-gradient(135deg, ${theme.primary}, ${theme.primaryDark})`,
          color: "#000",
          boxShadow: `0 5px 20px ${theme.glow}88`,
        }}>
        <motion.div className="absolute inset-0 opacity-40"
          style={{ background: "linear-gradient(105deg,transparent 35%,rgba(255,255,255,0.55) 50%,transparent 65%)" }}
          animate={{ x: ["-100%", "210%"] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: "linear", repeatDelay: 1.2 }} />
        <span className="relative z-10 flex items-center justify-center gap-2">
          {loading ? <><IconSpinner />Authenticating…</> : "Sign In →"}
        </span>
      </motion.button>

      <div className="flex items-center gap-2">
        <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.06)" }} />
        <span style={{ fontSize: 10, color: "rgba(200,215,255,0.28)" }}>or continue with</span>
        <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.06)" }} />
      </div>
      <div className="grid grid-cols-3 gap-2">
        {[{ label: "Google", icon: "G" }, { label: "Apple", icon: "⌘" }, { label: "GitHub", icon: "◈" }].map(({ label, icon }) => (
          <motion.button key={label} type="button"
            whileHover={{
              y: -3,
              scale: 1.06,
              borderColor: `${theme.primary}55`,
              boxShadow: `0 6px 20px ${theme.primaryMuted}, inset 0 0 15px ${theme.primaryMuted}`,
            }}
            whileTap={{ scale: 0.92, y: 0 }}
            className="rounded-xl font-semibold cursor-pointer relative overflow-hidden group"
            style={{
              fontSize: 13, padding: "9px 4px",
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.07)",
              color: "rgba(200,215,255,0.5)",
            }}>
            {/* Hover glow bg */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ background: `radial-gradient(circle at center, ${theme.primaryMuted}, transparent 70%)` }} />
            <span className="relative z-10 group-hover:text-white transition-colors duration-200">{icon}</span>
          </motion.button>
        ))}
      </div>

      <p className="text-center" style={{ fontSize: 11, color: "rgba(200,215,255,0.35)" }}>
        No account?{" "}
        <motion.button
          type="button"
          onClick={onSwitch}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          className="font-bold transition-colors duration-200 relative cursor-pointer group"
          style={{ color: theme.primary }}
        >
          Create one
          <motion.span
            className="absolute bottom-0 left-0 h-px w-0 group-hover:w-full transition-all duration-300"
            style={{ background: theme.primary }}
          />
        </motion.button>
      </p>
    </form>
  );
};

/* ═══════════════════════════════════════════════════════════  SIGNUP FORM  */
const SignupForm = ({ theme, onSwitch }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <form onSubmit={(e) => { e.preventDefault(); setLoading(true); setTimeout(() => setLoading(false), 2000); }}
      className="flex flex-col gap-3">
      <Field theme={theme} label="Full Name" value={name}
        onChange={(e) => setName(e.target.value)} placeholder="John Doe" Icon={IconUser} compact />
      <Field theme={theme} label="Email" type="email" value={email}
        onChange={(e) => setEmail(e.target.value)} placeholder="you@nexus.io" Icon={IconMail} compact />
      <div className="grid grid-cols-2 gap-2.5">
        <Field theme={theme} label="Password" type="password" value={pass}
          onChange={(e) => setPass(e.target.value)} placeholder="••••••••" compact />
        <Field theme={theme} label="Confirm" type="password" value={confirm}
          onChange={(e) => setConfirm(e.target.value)} placeholder="••••••••" compact />
      </div>

      <motion.button type="submit" whileHover={{ scale: 1.02, y: -2, boxShadow: `0 8px 30px ${theme.glow}` }} whileTap={{ scale: 0.985 }}
        disabled={loading}
        className="relative w-full rounded-xl font-extrabold tracking-widest uppercase overflow-hidden cursor-pointer"
        style={{
          fontSize: 11, padding: "11px 16px",
          background: `linear-gradient(135deg, ${theme.primary}, ${theme.primaryDark})`,
          color: "#000",
          boxShadow: `0 5px 20px ${theme.glow}88`,
        }}>
        <motion.div className="absolute inset-0 opacity-40"
          style={{ background: "linear-gradient(105deg,transparent 35%,rgba(255,255,255,0.55) 50%,transparent 65%)" }}
          animate={{ x: ["-100%", "210%"] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: "linear", repeatDelay: 1.2 }} />
        <span className="relative z-10 flex items-center justify-center gap-2">
          {loading ? <><IconSpinner />Creating Account…</> : "Create Account →"}
        </span>
      </motion.button>

      <p className="text-center" style={{ fontSize: 11, color: "rgba(200,215,255,0.35)" }}>
        Already have an account?{" "}
        <motion.button
          type="button"
          onClick={onSwitch}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          className="font-bold relative cursor-pointer group"
          style={{ color: theme.primary }}
        >
          Sign In
          <motion.span
            className="absolute bottom-0 left-0 h-px w-0 group-hover:w-full transition-all duration-300"
            style={{ background: theme.primary }}
          />
        </motion.button>
      </p>
    </form>
  );
};

/* ═══════════════════════════════════════════════════════════
   COMPONENT 01 — FLOATING AUTHENTICATION GATEWAY
   Fits perfectly in Lenovo T470S (1920×1080) at 100% zoom.
   No vertical scroll on laptop. Mobile: scrollable gracefully.
═══════════════════════════════════════════════════════════ */
export default function AuthGateway() {
  const [currentTheme, setCurrentTheme] = useState(AUTH_THEMES.cyberGreen);
  const [isLogin, setIsLogin] = useState(true);
  const [flipping, setFlipping] = useState(false);
  const [cardHovered, setCardHovered] = useState(false);
  const cardRef = useRef(null);

  /* Very subtle tilt: ±3.5° max */
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const springCfg = { stiffness: 70, damping: 20 };
  const rotX = useSpring(useTransform(my, [-500, 500], [3.5, -3.5]), springCfg);
  const rotY = useSpring(useTransform(mx, [-500, 500], [-3.5, 3.5]), springCfg);

  /* Magnetic cursor glow */
  const glowX = useMotionValue(50);
  const glowY = useMotionValue(50);

  const onMouseMove = useCallback((e) => {
    if (!cardRef.current) return;
    const r = cardRef.current.getBoundingClientRect();
    mx.set(e.clientX - (r.left + r.width / 2));
    my.set(e.clientY - (r.top + r.height / 2));
    /* Glow follows cursor */
    glowX.set(((e.clientX - r.left) / r.width) * 100);
    glowY.set(((e.clientY - r.top) / r.height) * 100);
  }, [mx, my, glowX, glowY]);
  const onMouseLeave = useCallback(() => { mx.set(0); my.set(0); }, [mx, my]);

  const flipSwitch = () => {
    if (flipping) return;
    setFlipping(true);
    setTimeout(() => { setIsLogin((v) => !v); setFlipping(false); }, 400);
  };

  return (
    <div
      id="component-01-auth-gateway"
      className="relative w-full overflow-hidden flex items-center justify-center"
      style={{
        height: "100vh",
        background: "linear-gradient(135deg,#060810 0%,#0b0e1d 55%,#060a15 100%)",
      }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      {/* Ambient glow */}
      <motion.div
        className="absolute pointer-events-none transition-all duration-1000"
        animate={{
          scale: cardHovered ? 1.15 : 1,
          opacity: cardHovered ? 1 : 0.7,
        }}
        transition={{ duration: 0.8 }}
        style={{
          width: "60vw", height: "60vw", maxWidth: 600, maxHeight: 600,
          borderRadius: "50%", top: "50%", left: "50%",
          transform: "translate(-50%,-50%)", filter: "blur(80px)",
          background: `radial-gradient(circle, ${currentTheme.primaryMuted} 0%, transparent 70%)`,
        }}
      />

      {/* Grid */}
      <div className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.016) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.016) 1px, transparent 1px)`,
          backgroundSize: "55px 55px",
        }}
      />

      {/* Tilt wrapper */}
      <motion.div
        ref={cardRef}
        style={{ rotateX: rotX, rotateY: rotY, transformStyle: "preserve-3d", perspective: 1000 }}
        className="relative w-full"
        onHoverStart={() => setCardHovered(true)}
        onHoverEnd={() => setCardHovered(false)}
      >
        <div style={{ maxWidth: 420, margin: "0 auto", padding: "0 16px" }}>

          {/* Depth shadow slab */}
          <motion.div
            className="absolute inset-0 rounded-2xl pointer-events-none transition-all duration-700"
            animate={{
              opacity: cardHovered ? 0.85 : 0.6,
              y: cardHovered ? 20 : 16,
              scale: cardHovered ? 0.94 : 0.95,
            }}
            transition={{ duration: 0.4 }}
            style={{
              transform: "translateZ(-28px)",
              background: currentTheme.primaryMuted,
              filter: "blur(24px)",
            }}
          />

          {/* Card shell with 3D flip */}
          <motion.div
            animate={{
              rotateY: flipping ? 90 : 0,
              scale: flipping ? 0.94 : 1,
            }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            className="relative rounded-2xl overflow-hidden"
            style={{
              background: "linear-gradient(150deg,rgba(18,22,46,0.97) 0%,rgba(8,10,24,0.99) 100%)",
              border: `1px solid ${currentTheme.border}`,
              backdropFilter: "blur(40px)",
              boxShadow: `${currentTheme.shadow}, inset 0 1px 0 rgba(255,255,255,0.07)`,
            }}
          >
            {/* Magnetic cursor-follow glow */}
            <motion.div
              className="absolute inset-0 pointer-events-none opacity-0 transition-opacity duration-500 rounded-2xl"
              style={{
                opacity: cardHovered ? 0.12 : 0,
                background: `radial-gradient(300px circle at ${glowX.get()}% ${glowY.get()}%, ${currentTheme.primary}, transparent 60%)`,
              }}
            />

            {/* Top accent with pulse */}
            <motion.div
              className="absolute top-0 inset-x-0 h-px transition-all duration-500"
              animate={cardHovered ? { opacity: [0.7, 1, 0.7] } : { opacity: 1 }}
              transition={cardHovered ? { duration: 2, repeat: Infinity } : {}}
              style={{ background: `linear-gradient(90deg,transparent,${currentTheme.primary},transparent)` }}
            />
            {/* Corner glow */}
            <motion.div
              className="absolute top-0 right-0 w-28 h-28 pointer-events-none"
              animate={cardHovered ? { opacity: 0.9, scale: 1.2 } : { opacity: 0.6, scale: 1 }}
              transition={{ duration: 0.5 }}
              style={{ background: `radial-gradient(circle at top right,${currentTheme.primaryMuted},transparent 70%)` }}
            />

            {/* Floating particles on hover */}
            <FloatingParticles theme={currentTheme} active={cardHovered} />

            {/* Card body — compact padding for laptop viewport */}
            <div className="relative z-10" style={{ padding: "22px 24px" }}>

              {/* Header row */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2.5">
                  <motion.div
                    whileHover={{ rotate: [0, -10, 10, -5, 0], scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                    className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-500"
                    style={{
                      background: currentTheme.primaryMuted,
                      border: `1px solid ${currentTheme.border}`,
                      color: currentTheme.primary,
                      boxShadow: `0 3px 14px ${currentTheme.glow}55`,
                    }}>
                    <IconLock />
                  </motion.div>
                  <div>
                    <div style={{ fontSize: 10, color: currentTheme.primary }}
                      className="font-black tracking-widest uppercase transition-colors duration-500">
                      NEXUS
                    </div>
                    <div style={{ fontSize: 9, color: "rgba(200,215,255,0.28)" }}>
                      Secure Gateway v2.5
                    </div>
                  </div>
                </div>
                <ThemePicker currentTheme={currentTheme} onThemeChange={setCurrentTheme} />
              </div>

              {/* Title */}
              <div className="mb-3.5">
                <AnimatePresence mode="wait">
                  <motion.div key={isLogin ? "l" : "s"}
                    initial={{ opacity: 0, y: 7 }} animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -7 }} transition={{ duration: 0.22 }}>
                    <h1 className="font-black text-white tracking-tight leading-tight" style={{ fontSize: 22 }}>
                      {isLogin ? "Welcome back" : "Join the grid"}
                    </h1>
                    <p style={{ fontSize: 11, color: "rgba(200,215,255,0.38)" }} className="mt-1">
                      {isLogin
                        ? "Enter your credentials to access the system."
                        : "Create your account and enter the system."}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Tab strip */}
              <div className="flex mb-3.5 rounded-xl p-1"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}>
                {["Login", "Sign Up"].map((label, i) => {
                  const active = (i === 0 && isLogin) || (i === 1 && !isLogin);
                  return (
                    <motion.button key={label}
                      onClick={i === 0 ? (isLogin ? undefined : flipSwitch) : (isLogin ? flipSwitch : undefined)}
                      whileHover={!active ? { backgroundColor: "rgba(255,255,255,0.06)" } : {}}
                      whileTap={{ scale: 0.97 }}
                      className="flex-1 rounded-lg font-bold tracking-wide relative transition-colors duration-200 cursor-pointer"
                      style={{ fontSize: 11, padding: "8px 4px", color: active ? "#000" : "rgba(200,215,255,0.4)" }}>
                      {active && (
                        <motion.div layoutId="auth-tab" className="absolute inset-0 rounded-lg"
                          style={{ background: currentTheme.primary }}
                          transition={{ type: "spring", stiffness: 380, damping: 32 }} />
                      )}
                      <span className="relative z-10">{label}</span>
                    </motion.button>
                  );
                })}
              </div>

              {/* Form */}
              <AnimatePresence mode="wait">
                <motion.div key={isLogin ? "login" : "signup"}
                  initial={{ opacity: 0, x: isLogin ? -18 : 18 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: isLogin ? 18 : -18 }}
                  transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}>
                  {isLogin
                    ? <LoginForm theme={currentTheme} onSwitch={flipSwitch} />
                    : <SignupForm theme={currentTheme} onSwitch={flipSwitch} />
                  }
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Bottom accent */}
            <motion.div
              className="absolute bottom-0 inset-x-0 h-px transition-all duration-500"
              animate={cardHovered ? { opacity: [0.5, 1, 0.5] } : { opacity: 0.7 }}
              transition={cardHovered ? { duration: 2, repeat: Infinity } : {}}
              style={{ background: `linear-gradient(90deg,transparent,${currentTheme.border},transparent)` }}
            />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
