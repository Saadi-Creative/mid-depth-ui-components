import { useState, useRef, useCallback, useMemo } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform, useMotionTemplate } from "framer-motion";
import { useGlobalTheme } from "../../themes/ThemeContext";

/* ═══════════════════════════════════════════════════════════
   ICONS
═══════════════════════════════════════════════════════════ */
const IconCheck = ({ color }) => (
  <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="4"
    strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);
const IconX = () => (
  <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="3.5"
    strokeLinecap="round">
    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);
const IconBolt = ({ size = 12 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
  </svg>
);
const IconSpinner = () => (
  <motion.span animate={{ rotate: 360 }}
    transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
    className="block w-4 h-4 border-2 border-black/20 border-t-black rounded-full" />
);


/* ═══════════════════════════════════════════════════════════
   FLOATING PARTICLES
═══════════════════════════════════════════════════════════ */
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

/* ═══════════════════════════════════════════════════════════
   FEATURE ROW — with hover micro-interaction
═══════════════════════════════════════════════════════════ */
const Feature = ({ text, included, theme, index }) => {
  const { activeVariant } = useGlobalTheme();
  const isLight = activeVariant.mode === "light";
  const txtPrimary = isLight ? "text-slate-900" : "text-white";
  const txtMuted = isLight ? "text-slate-600 font-semibold" : "text-white/80";
  const txtSuperDim = isLight ? "text-slate-400" : "text-white/20";

  const iconVariants = {
    initial: { scale: 1, rotate: 0, x: 0 },
    hover: {
      scale: 1.25,
      rotate: included ? 360 : 0,
      x: included ? 0 : [0, -2.5, 2.5, -2.5, 2.5, 0],
      transition: {
        rotate: { duration: 0.5, ease: "easeInOut" },
        x: { duration: 0.35, ease: "linear" },
        scale: { type: "spring", stiffness: 250 }
      }
    }
  };

  return (
    <motion.li
      className="flex items-center gap-2.5 group cursor-default"
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.3 + index * 0.06, duration: 0.4 }}
      whileHover="hover"
    >
      <motion.div
        variants={iconVariants}
        className="flex-shrink-0 w-[18px] h-[18px] rounded-full flex items-center justify-center transition-colors duration-500"
        style={{
          background: included ? theme.primaryMuted : (isLight ? "rgba(0,0,0,0.03)" : "rgba(255,255,255,0.03)"),
          border: `1px solid ${included ? theme.border : (isLight ? "rgba(0,0,0,0.1)" : "rgba(255,255,255,0.07)")}`,
        }}
      >
        {included ? <IconCheck color={theme.primary} /> : <IconX />}
      </motion.div>
      <motion.span
        variants={{
          initial: { x: 0, color: included ? (isLight ? "#0f172a" : "rgba(225,235,255,0.82)") : (isLight ? "#94a3b8" : "rgba(200,215,255,0.22)") },
          hover: { x: 4, color: included ? (isLight ? "#000" : "#fff") : (isLight ? "#64748b" : "rgba(200,215,255,0.35)") }
        }}
        transition={{ duration: 0.2 }}
        className="text-xs sm:text-sm leading-snug"
      >
        {text}
      </motion.span>
    </motion.li>
  );
};

/* ═══════════════════════════════════════════════════════════
   RIPPLE EFFECT HOOK
═══════════════════════════════════════════════════════════ */
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
        animate={{ width: 200, height: 200, opacity: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        style={{
          left: r.x - 100,
          top: r.y - 100,
          background: color || "rgba(255,255,255,0.3)",
        }}
      />
    ))}
  </>
);

/* ═══════════════════════════════════════════════════════════
   PRICING CARD — with magnetic tilt + micro-interactions
═══════════════════════════════════════════════════════════ */
const PricingCard = ({ tier, theme, index, isPro, isYearly }) => {
  const [hovered, setHovered] = useState(false);
  const [loading, setLoading] = useState(false);
  const cardRef = useRef(null);
  const { ripples, addRipple } = useRipple();

  /* Magnetic tilt on hover */
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const springCfg = { stiffness: 150, damping: 20 };
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [4, -4]), springCfg);
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-4, 4]), springCfg);

  /* Magnetic cursor glow */
  const glowX = useMotionValue(50);
  const glowY = useMotionValue(50);
  const glowBg = useMotionTemplate`radial-gradient(280px circle at ${glowX}% ${glowY}%, ${theme.primary}, transparent 65%)`;

  const handleMouseMove = useCallback((e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
    /* Glow follows cursor percentage */
    glowX.set(((e.clientX - rect.left) / rect.width) * 100);
    glowY.set(((e.clientY - rect.top) / rect.height) * 100);
  }, [mx, my, glowX, glowY]);

  const { activeVariant } = useGlobalTheme();
  const isLight = activeVariant.mode === "light";
  const txtPrimary = isLight ? "text-slate-900 font-bold" : "text-white";
  const txtMuted = isLight ? "text-slate-600 font-semibold" : "text-white/50";
  const txtDim = isLight ? "text-slate-500" : "text-white/40";
  const txtSuperDim = isLight ? "text-slate-400" : "text-white/30";

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 70 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.12, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative flex flex-col"
      style={{
        zIndex: isPro ? 10 : 1,
        perspective: 800,
      }}
    >
      {/* 2.5D depth shadow slab */}
      {activeVariant.id !== 'brutal' && (
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          animate={{
            opacity: hovered ? 0.9 : isPro ? 0.7 : 0.2,
            y: hovered ? 18 : isPro ? 12 : 5,
            scale: hovered ? 0.95 : isPro ? 0.97 : 0.985,
          }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          style={{
            background: isPro ? theme.primaryMuted : "rgba(255,255,255,0.02)",
            filter: `blur(${isPro ? 30 : 12}px)`,
            boxShadow: isPro ? theme.shadow : "none",
          }}
        />
      )}

      {/* Card with magnetic tilt */}
      <motion.div
        animate={{
          y: hovered ? -12 : isPro ? -6 : 0,
          scale: isPro ? (hovered ? 1.03 : 1.02) : hovered ? 1.01 : 1,
        }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className={`relative overflow-hidden flex flex-col flex-1 ${activeVariant.cardClass}`}
        style={{
          rotateX: hovered ? rotateX : 0,
          rotateY: hovered ? rotateY : 0,
          transformStyle: "preserve-3d",
        }}
      >
        {/* Top edge glow — pulses on hover */}
        {activeVariant.id !== 'brutal' && (
          <motion.div className="absolute top-0 inset-x-0 h-px transition-all duration-500"
            animate={hovered ? { opacity: [0.7, 1, 0.7] } : { opacity: 1 }}
            transition={hovered ? { duration: 1.5, repeat: Infinity } : {}}
            style={{
              background: isPro
                ? `linear-gradient(90deg,transparent,${theme.primary},transparent)`
                : hovered ? `linear-gradient(90deg,transparent,rgba(255,255,255,0.16),transparent)` : "transparent",
            }}
          />
        )}

        {/* Magnetic cursor-follow glow */}
        {/* Magnetic cursor-follow glow */}
        {activeVariant.id !== 'brutal' && activeVariant.id !== 'luxury' && (
          <motion.div
            className="absolute inset-0 pointer-events-none opacity-0 transition-opacity duration-500 rounded-2xl"
            style={{
              opacity: hovered ? 0.12 : 0,
              background: glowBg,
            }}
          />
        )}

        {/* Floating particles on hover */}
        {activeVariant.id !== 'brutal' && <FloatingParticles theme={theme} active={hovered} />}

        {/* PRO badge — floating bounce */}
        {isPro && (
          <div style={{ transform: "translateZ(45px)", transformStyle: "preserve-3d" }} className="absolute -top-[16px] left-1/2 -translate-x-1/2 z-20">
            <motion.div
              animate={{ y: [0, -3, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="px-4 py-1 rounded-full text-[10px] font-black tracking-widest uppercase
              flex items-center gap-1 transition-all duration-500"
              style={{
                background: theme.primary,
                color: "#000",
                boxShadow: activeVariant.id === 'brutal' ? 'none' : `0 3px 18px ${theme.glow}`,
              }}>
              <motion.span animate={{ rotate: [0, 15, -15, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}>
                <IconBolt size={10} />
              </motion.span>
              Most Popular
            </motion.div>
          </div>
        )}

        <div className="p-5 sm:p-6 lg:p-7 flex flex-col flex-1 pt-8" style={{ transformStyle: "preserve-3d" }}>

          {/* Tier header */}
          <div className="mb-4" style={{ transform: "translateZ(30px)", transformStyle: "preserve-3d" }}>
            <motion.div
              animate={hovered ? { x: [0, 2, 0] } : { x: 0 }}
              transition={{ duration: 0.4 }}
              className="text-[9px] sm:text-[10px] font-black tracking-widest uppercase mb-1.5 transition-colors duration-500"
              style={{ color: isPro ? theme.primary : (isLight ? "rgba(0,0,0,0.4)" : "rgba(200,215,255,0.32)") }}>
              {tier.badge}
            </motion.div>
            <h3 className={`font-black mb-1 ${txtPrimary}`} style={{ fontSize: "clamp(18px,2.5vw,22px)" }}>
              {tier.name}
            </h3>
            <p className={`text-[11px] sm:text-xs leading-relaxed ${txtMuted}`}>
              {tier.description}
            </p>
          </div>

          {/* Price — spring counter */}
          <div className="flex flex-col mb-5" style={{ transform: "translateZ(45px)", transformStyle: "preserve-3d" }}>
            <div className="flex items-end gap-1">
              <span className={`text-sm font-bold mb-0.5 ${txtMuted}`}>$</span>
              <AnimatePresence mode="wait">
                <motion.span key={`${tier.price}-${theme.id}`}
                  initial={{ opacity: 0, y: 16, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -16, scale: 0.9 }}
                  transition={{ type: "spring", stiffness: 200, damping: 20 }}
                  className={`font-black leading-none ${txtPrimary}`}
                  style={{ fontSize: "clamp(36px,5vw,48px)" }}>
                  {tier.price}
                </motion.span>
              </AnimatePresence>
              <span className={`text-xs mb-1.5 ${txtMuted}`}>/mo</span>
            </div>
            <span className={`text-[9px] font-mono mt-1 text-left uppercase font-bold ${txtSuperDim}`}>
              {isYearly && tier.price !== "0" ? `Billed annually ($${parseInt(tier.price) * 12}/yr)` : "Billed monthly"}
            </span>
          </div>

          {/* Features — staggered hover */}
          <ul className="flex flex-col gap-3 flex-1 mb-6" style={{ transform: "translateZ(25px)", transformStyle: "preserve-3d" }}>
            {tier.features.map((f, i) => (
              <Feature key={i} text={f.text} included={f.included} theme={theme} index={i} />
            ))}
          </ul>

          {/* CTA — ripple effect */}
          <div style={{ transform: "translateZ(40px)" }}>
            <motion.button
              onClick={(e) => { addRipple(e); setLoading(true); setTimeout(() => setLoading(false), 2000); }}
              whileHover={activeVariant.id === 'brutal' ? { translate: "-2px -2px" } : { scale: 1.03, y: -3 }}
              whileTap={{ scale: 0.97, y: 0 }}
              className={`relative w-full py-3.5 font-extrabold text-[11px] tracking-widest uppercase overflow-hidden cursor-pointer transition-all duration-500 ${activeVariant.buttonClass}`}
            >
              {isPro && activeVariant.id !== 'brutal' && (
                <motion.div className="absolute inset-0 opacity-30"
                  style={{ background: "linear-gradient(105deg,transparent 35%,rgba(255,255,255,0.5) 50%,transparent 65%)" }}
                  animate={{ x: ["-100%", "220%"] }}
                  transition={{ duration: 3.2, repeat: Infinity, ease: "linear", repeatDelay: 0.8 }}
                />
              )}
              <RippleLayer ripples={ripples} color={isPro ? "rgba(0,0,0,0.15)" : `${theme.primary}33`} />
              <span className="relative z-10 flex items-center justify-center gap-2">
                {loading ? <><IconSpinner />Processing…</> : tier.cta}
              </span>
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

/* ═══════════════════════════════════════════════════════════
   COMPONENT 02 — KINETIC PRICING MATRIX
   Responsive: mobile (1-col stack) → tablet (pro card featured)
               → laptop (3-col side by side)
 ═══════════════════════════════════════════════════════════ */
export default function KineticPricingMatrix() {
  const { activeVariant } = useGlobalTheme();
  const currentTheme = useMemo(() => {
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
    const rDark = Math.max(0, Math.floor(r * 0.75));
    const gDark = Math.max(0, Math.floor(g * 0.75));
    const bDark = Math.max(0, Math.floor(b * 0.75));
    return {
      id: activeVariant.id || "global",
      primary: hex,
      primaryDark: `rgb(${rDark}, ${gDark}, ${bDark})`,
      primaryMuted: `rgba(${r}, ${g}, ${b}, 0.12)`,
      glow: `rgba(${r}, ${g}, ${b}, 0.5)`,
      shadow: `0 30px 80px rgba(${r}, ${g}, ${b}, 0.2)`,
      border: `rgba(${r}, ${g}, ${b}, 0.3)`,
    };
  }, [activeVariant]);
  const [isYearly, setIsYearly] = useState(false);

  const tiers = [
    {
      name: "Starter",
      badge: "Free Tier",
      description: "Perfect for solo developers & hobby projects.",
      price: "0",
      cta: "Get Started Free",
      features: [
        { text: "5 Active Projects", included: true },
        { text: "10 GB Cloud Storage", included: true },
        { text: "Community Support", included: true },
        { text: "Basic Analytics", included: true },
        { text: "Custom Domains", included: false },
        { text: "Team Collaboration", included: false },
        { text: "Priority Queue", included: false },
      ],
    },
    {
      name: "Pro",
      badge: "Most Popular",
      description: "For teams that need power, scale & flexibility.",
      price: isYearly ? "39" : "49",
      cta: "Subscribe Now →",
      features: [
        { text: "Unlimited Projects", included: true },
        { text: "100 GB Cloud Storage", included: true },
        { text: "Priority Support", included: true },
        { text: "Advanced Analytics", included: true },
        { text: "Custom Domains", included: true },
        { text: "Team Collaboration", included: true },
        { text: "Priority Queue", included: false },
      ],
    },
    {
      name: "Enterprise",
      badge: "Full Power",
      description: "Unlimited scale for serious organizations.",
      price: isYearly ? "159" : "199",
      cta: "Contact Sales",
      features: [
        { text: "Unlimited Everything", included: true },
        { text: "1 TB Cloud Storage", included: true },
        { text: "Dedicated Support", included: true },
        { text: "Custom Analytics", included: true },
        { text: "Custom Domains", included: true },
        { text: "Team Collaboration", included: true },
        { text: "Priority Queue", included: true },
      ],
    },
  ];

  const isLight = activeVariant.mode === "light";
  const txtPrimary = isLight ? "text-slate-900 font-bold" : "text-white";
  const txtMuted = isLight ? "text-slate-600 font-semibold" : "text-white/50";
  const txtDim = isLight ? "text-slate-500" : "text-white/40";
  const txtSuperDim = isLight ? "text-slate-400" : "text-white/30";

  return (
    <div
      id="component-02-pricing-matrix"
      className={`relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden py-16 sm:py-20 px-4 sm:px-6  pt-[120px] pb-8 sm:pt-[120px] sm:pb-8 ${activeVariant.canvasClass}`}
    >
      {/* ── Ambient glow ── */}
      {activeVariant.id !== 'brutal' && (
        <motion.div className="absolute pointer-events-none"
          animate={{ opacity: [0.3, 0.6, 0.3], scale: [0.95, 1.05, 0.95] }}
          transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
          style={{
            width: "min(900px, 180vw)", height: "min(600px, 120vw)",
            borderRadius: "50%", top: "50%", left: "50%",
            transform: "translate(-50%,-50%)",
            filter: "blur(90px)",
            background: `radial-gradient(ellipse, ${currentTheme.primaryMuted} 0%, transparent 70%)`,
          }}
        />
      )}

      {/* ── Grid ── */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.08]"
        style={{
          backgroundImage:
            `linear-gradient(rgba(255,255,255,0.016) 1px,transparent 1px),
             linear-gradient(90deg,rgba(255,255,255,0.016) 1px,transparent 1px)`,
          backgroundSize: "68px 68px",
        }}
      />

      {/* ── Header ── */}
      <motion.div
        initial={{ opacity: 0, y: -24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 text-center mb-12 sm:mb-16 w-full max-w-lg px-2"
      >
        {/* Label chip */}
        <motion.div
          whileHover={{ scale: 1.05, y: -2 }}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[10px] sm:text-[11px]
          font-black tracking-widest uppercase mb-4 transition-all duration-500 cursor-default"
          style={{
            background: currentTheme.primaryMuted,
            border: `1px solid ${currentTheme.border}`,
            color: currentTheme.primary,
            boxShadow: activeVariant.id === 'brutal' ? 'none' : `0 0 24px ${currentTheme.primaryMuted}`,
          }}>
          <motion.span
            animate={{ rotate: [0, 15, -15, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}>
            <IconBolt />
          </motion.span>
          Transparent Pricing
        </motion.div>

        <h1 className={`font-black mb-3 leading-tight tracking-tight ${txtPrimary}`}
          style={{ fontSize: "clamp(26px, 5vw, 46px)" }}>
          Choose Your{" "}
          <motion.span
            className="transition-colors duration-500 inline-block"
            style={{ color: currentTheme.primary }}
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            Power Level
          </motion.span>
        </h1>
        <p className={`text-sm sm:text-base ${txtMuted}`}>
          Scale effortlessly. No hidden fees, cancel anytime.
        </p>


        {/* Billing Switcher */}
        <div className="mt-6 flex items-center justify-center gap-3">
          <div className="relative flex items-center bg-black/5 dark:bg-white/5 p-1 rounded-xl border border-black/5 dark:border-white/10 backdrop-blur">
            <button
              onClick={() => setIsYearly(false)}
              className="px-4 py-1.5 rounded-lg text-xs font-extrabold relative transition-colors duration-200 cursor-pointer"
              style={{ color: !isYearly ? (isLight ? "#fff" : "#000") : (isLight ? "rgba(0,0,0,0.5)" : "rgba(200,215,255,0.5)") }}
            >
              {!isYearly && (
                <motion.div
                  layoutId="billing-pill"
                  className="absolute inset-0 rounded-lg"
                  style={{ background: currentTheme.primary }}
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <span className="relative z-10">Monthly</span>
            </button>
            <button
              onClick={() => setIsYearly(true)}
              className="px-4 py-1.5 rounded-lg text-xs font-extrabold relative transition-colors duration-200 cursor-pointer"
              style={{ color: isYearly ? (isLight ? "#fff" : "#000") : (isLight ? "rgba(0,0,0,0.5)" : "rgba(200,215,255,0.5)") }}
            >
              {isYearly && (
                <motion.div
                  layoutId="billing-pill"
                  className="absolute inset-0 rounded-lg"
                  style={{ background: currentTheme.primary }}
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <span className="relative z-10">Yearly</span>
            </button>
          </div>
          
          <motion.div
            animate={{ scale: [1, 1.06, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-wider"
            style={{
              background: currentTheme.primaryMuted,
              color: currentTheme.primary,
              border: `1px solid ${currentTheme.border}`,
              boxShadow: activeVariant.id === 'brutal' ? 'none' : `0 0 10px ${currentTheme.glow}22`,
            }}
          >
            Save 20%
          </motion.div>
        </div>
      </motion.div>

      {/* ── Cards grid ── */}
      <div className="relative z-10 w-full max-w-5xl pt-5
        grid grid-cols-1 gap-5
        md:grid-cols-3 md:gap-5 md:items-stretch">
        {tiers.map((tier, i) => (
          <PricingCard key={tier.name} tier={tier} theme={currentTheme} index={i} isPro={i === 1} isYearly={isYearly} />
        ))}
      </div>

      {/* Footer note */}
      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className={`relative z-10 mt-10 sm:mt-14 text-[11px] sm:text-xs tracking-wide text-center px-4 ${txtSuperDim}`}>
        All plans include a 14-day free trial · No credit card required · Cancel anytime
      </motion.p>
    </div>
  );
}
