import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PRICING_THEMES, PRICING_THEME_LIST } from "../../themes/themeConfig";

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
   THEME SWATCH PICKER
═══════════════════════════════════════════════════════════ */
const ThemePicker = ({ currentTheme, onThemeChange }) => (
  <div className="flex gap-2.5 items-center justify-center">
    {PRICING_THEME_LIST.map((t) => (
      <motion.button key={t.id} title={t.label}
        onClick={() => onThemeChange(t)}
        whileHover={{ scale: 1.35, y: -2 }} whileTap={{ scale: 0.85 }}
        className="rounded-full cursor-pointer flex-shrink-0"
        style={{
          width: 22, height: 22,
          background: t.swatch,
          boxShadow: currentTheme.id === t.id
            ? `0 0 0 2px #08091a, 0 0 0 4px ${t.swatch}, 0 0 18px ${t.swatch}88`
            : `0 0 8px ${t.swatch}44`,
          transition: "box-shadow 0.22s",
        }}
      />
    ))}
  </div>
);

/* ═══════════════════════════════════════════════════════════
   FEATURE ROW
═══════════════════════════════════════════════════════════ */
const Feature = ({ text, included, theme }) => (
  <li className="flex items-center gap-2.5">
    <div className="flex-shrink-0 w-[18px] h-[18px] rounded-full flex items-center justify-center transition-all duration-500"
      style={{
        background: included ? theme.primaryMuted : "rgba(255,255,255,0.03)",
        border: `1px solid ${included ? theme.border : "rgba(255,255,255,0.07)"}`,
      }}>
      {included ? <IconCheck color={theme.primary} /> : <IconX />}
    </div>
    <span className="text-xs sm:text-sm leading-snug transition-colors duration-300"
      style={{ color: included ? "rgba(225,235,255,0.82)" : "rgba(200,215,255,0.22)" }}>
      {text}
    </span>
  </li>
);

/* ═══════════════════════════════════════════════════════════
   PRICING CARD
═══════════════════════════════════════════════════════════ */
const PricingCard = ({ tier, theme, index, isPro }) => {
  const [hovered, setHovered] = useState(false);
  const [loading, setLoading] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 70 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.12, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="relative flex flex-col"
      /* On mobile: full width. On md+: flex-1 in a row */
      style={{ zIndex: isPro ? 10 : 1 }}
    >
      {/* 2.5D depth shadow slab */}
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        animate={{
          opacity: hovered ? 0.9 : isPro ? 0.7 : 0.2,
          y: hovered ? 16 : isPro ? 12 : 5,
          scale: hovered ? 0.96 : isPro ? 0.97 : 0.985,
        }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        style={{
          background: isPro ? theme.primaryMuted : "rgba(255,255,255,0.02)",
          filter: `blur(${isPro ? 30 : 12}px)`,
          boxShadow: isPro ? theme.shadow : "none",
        }}
      />

      {/* Card */}
      <motion.div
        animate={{
          y: hovered ? -12 : isPro ? -6 : 0,
          scale: isPro ? (hovered ? 1.03 : 1.02) : hovered ? 1.01 : 1,
        }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="relative rounded-2xl overflow-hidden flex flex-col flex-1"
        style={{
          background: "linear-gradient(155deg,rgba(18,22,46,0.97) 0%,rgba(8,10,24,0.99) 100%)",
          border: `1px solid ${isPro ? theme.border : hovered ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.06)"}`,
          backdropFilter: "blur(28px)",
          boxShadow: isPro
            ? `${theme.shadow}, inset 0 1px 0 rgba(255,255,255,0.09)`
            : hovered
              ? "0 20px 55px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.05)"
              : "0 5px 25px rgba(0,0,0,0.28)",
          transition: "border-color 0.4s, box-shadow 0.35s",
        }}
      >
        {/* Top edge glow */}
        <div className="absolute top-0 inset-x-0 h-px transition-all duration-500"
          style={{
            background: isPro
              ? `linear-gradient(90deg,transparent,${theme.primary},transparent)`
              : hovered ? `linear-gradient(90deg,transparent,rgba(255,255,255,0.16),transparent)` : "transparent",
          }}
        />

        {/* PRO badge */}
        {isPro && (
          <motion.div className="absolute -top-[16px] left-1/2 -translate-x-1/2 z-20"
            initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.45 }}>
            <div className="px-4 py-1 rounded-full text-[10px] font-black tracking-widest uppercase
              flex items-center gap-1 transition-all duration-500"
              style={{
                background: `linear-gradient(135deg,${theme.primary},${theme.primaryDark})`,
                color: "#000",
                boxShadow: `0 3px 18px ${theme.glow}`,
              }}>
              <IconBolt size={10} /> Most Popular
            </div>
          </motion.div>
        )}

        <div className="p-5 sm:p-6 lg:p-7 flex flex-col flex-1 pt-8">

          {/* Tier header */}
          <div className="mb-4">
            <div className="text-[9px] sm:text-[10px] font-black tracking-widest uppercase mb-1.5 transition-colors duration-500"
              style={{ color: isPro ? theme.primary : "rgba(200,215,255,0.32)" }}>
              {tier.badge}
            </div>
            <h3 className="font-black text-white mb-1" style={{ fontSize: "clamp(18px,2.5vw,22px)" }}>
              {tier.name}
            </h3>
            <p className="text-[11px] sm:text-xs leading-relaxed" style={{ color: "rgba(200,215,255,0.38)" }}>
              {tier.description}
            </p>
          </div>

          {/* Price */}
          <div className="flex items-end gap-1 mb-5">
            <span className="text-sm font-bold mb-0.5" style={{ color: "rgba(200,215,255,0.45)" }}>$</span>
            <AnimatePresence mode="wait">
              <motion.span key={`${tier.price}-${theme.id}`}
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}
                className="font-black text-white leading-none"
                style={{ fontSize: "clamp(36px,5vw,48px)" }}>
                {tier.price}
              </motion.span>
            </AnimatePresence>
            <span className="text-xs mb-1.5" style={{ color: "rgba(200,215,255,0.38)" }}>/mo</span>
          </div>

          {/* Features */}
          <ul className="flex flex-col gap-3 flex-1 mb-6">
            {tier.features.map((f, i) => (
              <Feature key={i} text={f.text} included={f.included} theme={theme} />
            ))}
          </ul>

          {/* CTA */}
          <motion.button
            onClick={() => setLoading(true)}
            whileHover={{ scale: 1.025, y: -2 }}
            whileTap={{ scale: 0.975 }}
            className="relative w-full py-3.5 rounded-xl font-extrabold text-[11px] tracking-widest uppercase overflow-hidden cursor-pointer transition-all duration-500"
            style={isPro ? {
              background: `linear-gradient(135deg,${theme.primary},${theme.primaryDark})`,
              color: "#000",
              boxShadow: `0 6px 28px ${theme.glow}`,
            } : {
              background: "rgba(255,255,255,0.04)",
              border: `1px solid ${hovered ? theme.border : "rgba(255,255,255,0.08)"}`,
              color: hovered ? theme.primary : "rgba(200,215,255,0.5)",
              boxShadow: hovered ? `0 0 20px ${theme.primaryMuted}` : "none",
            }}
          >
            {isPro && (
              <motion.div className="absolute inset-0 opacity-30"
                style={{ background: "linear-gradient(105deg,transparent 35%,rgba(255,255,255,0.5) 50%,transparent 65%)" }}
                animate={{ x: ["-100%", "220%"] }}
                transition={{ duration: 3.2, repeat: Infinity, ease: "linear", repeatDelay: 0.8 }}
              />
            )}
            <span className="relative z-10 flex items-center justify-center gap-2">
              {loading ? <><IconSpinner />Processing…</> : tier.cta}
            </span>
          </motion.button>
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
  const [currentTheme, setCurrentTheme] = useState(PRICING_THEMES.sapphire);

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
      price: "49",
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
      price: "199",
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

  return (
    <div
      id="component-02-pricing-matrix"
      className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden py-16 sm:py-20 px-4 sm:px-6"
      style={{ background: "linear-gradient(160deg,#060810 0%,#090c1e 50%,#07091a 100%)" }}
    >
      {/* ── Ambient glow ── */}
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

      {/* ── Grid ── */}
      <div className="absolute inset-0 pointer-events-none"
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
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[10px] sm:text-[11px]
          font-black tracking-widest uppercase mb-4 transition-all duration-500"
          style={{
            background: currentTheme.primaryMuted,
            border: `1px solid ${currentTheme.border}`,
            color: currentTheme.primary,
            boxShadow: `0 0 24px ${currentTheme.primaryMuted}`,
          }}>
          <IconBolt /> Transparent Pricing
        </div>

        <h1 className="font-black text-white mb-3 leading-tight tracking-tight"
          style={{ fontSize: "clamp(26px, 5vw, 46px)" }}>
          Choose Your{" "}
          <span className="transition-colors duration-500" style={{ color: currentTheme.primary }}>
            Power Level
          </span>
        </h1>
        <p className="text-sm sm:text-base" style={{ color: "rgba(200,215,255,0.4)" }}>
          Scale effortlessly. No hidden fees, cancel anytime.
        </p>

        {/* Theme picker */}
        <div className="mt-6 sm:mt-8">
          <p className="text-[9px] sm:text-[10px] uppercase tracking-widest mb-2.5" style={{ color: "rgba(200,215,255,0.26)" }}>
            Select Theme
          </p>
          <ThemePicker currentTheme={currentTheme} onThemeChange={setCurrentTheme} />
        </div>
      </motion.div>

      {/* ── Cards grid ──
           Mobile:  1 col (stacked)
           md 768+: 3 cols side by side
      ── */}
      <div className="relative z-10 w-full max-w-5xl pt-5
        grid grid-cols-1 gap-5
        md:grid-cols-3 md:gap-5 md:items-stretch">
        {tiers.map((tier, i) => (
          <PricingCard key={tier.name} tier={tier} theme={currentTheme} index={i} isPro={i === 1} />
        ))}
      </div>

      {/* Footer note */}
      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="relative z-10 mt-10 sm:mt-14 text-[11px] sm:text-xs tracking-wide text-center px-4"
        style={{ color: "rgba(200,215,255,0.26)" }}>
        All plans include a 14-day free trial · No credit card required · Cancel anytime
      </motion.p>
    </div>
  );
}
