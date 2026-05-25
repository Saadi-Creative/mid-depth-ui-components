import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Flame, Zap, Layers, Sparkles } from "lucide-react";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// 5 Minimalist Layout Controller Themes
const THEMES = [
  { id: "green", name: "Cyber Green", color: "#22c55e", bg: "bg-emerald-500", text: "text-emerald-400", border: "border-emerald-500/30", glow: "shadow-emerald-500/20", ambientGlow: "rgba(16,185,129,0.15)" },
  { id: "cyan", name: "Neon Cyan", color: "#06b6d4", bg: "bg-cyan-500", text: "text-cyan-400", border: "border-cyan-500/30", glow: "shadow-cyan-500/20", ambientGlow: "rgba(6,182,212,0.15)" },
  { id: "purple", name: "Plasma Purple", color: "#a855f7", bg: "bg-purple-500", text: "text-purple-400", border: "border-purple-500/30", glow: "shadow-purple-500/20", ambientGlow: "rgba(168,85,247,0.15)" },
  { id: "orange", name: "Solar Flare", color: "#f97316", bg: "bg-orange-500", text: "text-orange-400", border: "border-orange-500/30", glow: "shadow-orange-500/20", ambientGlow: "rgba(249,115,22,0.15)" },
  { id: "red", name: "Crimson Red", color: "#e11d48", bg: "bg-rose-600", text: "text-rose-400", border: "border-rose-600/30", glow: "shadow-rose-600/20", ambientGlow: "rgba(225,29,72,0.15)" },
];

const PLAN_DATA = [
  {
    name: "Basic Sandbox",
    description: "Ideal for hackers and hobbyists prototyping modern interactions.",
    monthlyPrice: 19,
    yearlyPrice: 14,
    icon: <Layers className="text-white/60" size={20} />,
    features: [
      "Access to 10 standard elements",
      "CSS style exporting capability",
      "Community support access",
      "Framer motion sandbox templates",
      "Lifetime updates access"
    ]
  },
  {
    name: "Developer Pro",
    description: "Designed for engineering professionals shipping commercial setups.",
    monthlyPrice: 49,
    yearlyPrice: 39,
    icon: <Zap className="text-white/80" size={20} />,
    popular: true,
    features: [
      "Access to all 50+ elements",
      "React JSX/Tailwind compilation",
      "Priority VIP developer support",
      "Commercial usage license",
      "Custom brand preset compiler",
      "Figma styling integration file"
    ]
  },
  {
    name: "Team Enterprise",
    description: "Perfect for production agencies scaling digital applications.",
    monthlyPrice: 99,
    yearlyPrice: 79,
    icon: <Sparkles className="text-white/60" size={20} />,
    features: [
      "Unlimited seat licensing setup",
      "Dedicated account engineer SLA",
      "Custom components engineering",
      "White-labeled client delivery",
      "Security audit compliance ready",
      "SAML / SSO system integration"
    ]
  }
];

// Liquid-Ripple Action Button
const RippleButton = ({ children, className, onClick, theme, isPrimary }) => {
  const [ripples, setRipples] = useState([]);

  const handlePointerDown = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    const newRipple = {
      id: Date.now(),
      x,
      y,
      size,
    };

    setRipples(prev => [...prev, newRipple]);
    if (onClick) onClick();
  };

  return (
    <button
      onPointerDown={handlePointerDown}
      className={cn(
        "relative overflow-hidden w-full py-3.5 rounded-xl font-bold transition-all duration-300 shadow-md select-none cursor-pointer flex items-center justify-center gap-2",
        isPrimary 
          ? cn("text-white", theme.bg) 
          : "bg-white/5 border border-white/10 hover:bg-white/10 text-white/80",
        className
      )}
      style={{
        boxShadow: isPrimary ? `0 4px 15px ${theme.color}30` : "none"
      }}
    >
      <span className="relative z-10">{children}</span>
      <AnimatePresence>
        {ripples.map(ripple => (
          <motion.span
            key={ripple.id}
            initial={{ scale: 0, opacity: 0.6 }}
            animate={{ scale: 2.5, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="absolute rounded-full bg-white/40 pointer-events-none"
            style={{
              top: ripple.y,
              left: ripple.x,
              width: ripple.size,
              height: ripple.size,
            }}
            onAnimationComplete={() => {
              setRipples(prev => prev.filter(r => r.id !== ripple.id));
            }}
          />
        ))}
      </AnimatePresence>
    </button>
  );
};

// Counter Roll-up Price Animator
const PriceRoll = ({ price, isYearly }) => {
  return (
    <div className="flex items-baseline justify-center gap-1 my-2">
      <span className="text-xl text-white/40 font-bold">$</span>
      <div className="overflow-hidden h-14 flex items-center">
        <AnimatePresence mode="wait">
          <motion.span
            key={price}
            initial={{ y: 35, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -35, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl font-black text-white tracking-tighter"
          >
            {price}
          </motion.span>
        </AnimatePresence>
      </div>
      <span className="text-xs text-white/40 font-bold ml-1">/ {isYearly ? "yr" : "mo"}</span>
    </div>
  );
};

export default function PricingTable() {
  const [theme, setTheme] = useState(THEMES[1]); // Neon Cyan default
  const [isYearly, setIsYearly] = useState(false);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 md:p-8" style={{ background: "#060810" }}>
      
      {/* Configuration Header */}
      <header className="w-full max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 py-4 px-6 rounded-2xl bg-white/[0.02] border border-white/5 mb-12">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-white/5 border border-white/10">
            <Flame className="text-white/80" size={16} />
          </div>
          <div>
            <span className="text-xs text-white/40 block leading-none font-bold uppercase tracking-wider">Pricing Suite</span>
            <span className="text-sm font-black text-white">Component 09</span>
          </div>
        </div>

        {/* Minimalist Layout Controller */}
        <div className="flex items-center gap-2.5">
          <span className="text-xs text-white/40 font-bold uppercase mr-1">Theme Accent:</span>
          {THEMES.map(t => (
            <button
              key={t.id}
              onClick={() => setTheme(t)}
              className={cn(
                "w-6 h-6 rounded-full transition-all duration-300 relative cursor-pointer",
                theme.id === t.id ? "scale-125" : "hover:scale-110 opacity-60 hover:opacity-100"
              )}
              style={{ backgroundColor: t.color, boxShadow: theme.id === t.id ? `0 0 12px ${t.color}` : "none" }}
            >
              {theme.id === t.id && (
                <motion.div 
                  layoutId="pricing-swatch-outline" 
                  className="absolute -inset-1 rounded-full border border-current opacity-50"
                  style={{ color: t.color }}
                />
              )}
            </button>
          ))}
        </div>
      </header>

      {/* Toggle Button */}
      <div className="flex justify-center mb-12">
        <div className="bg-white/5 border border-white/10 p-1.5 rounded-2xl flex items-center relative">
          <button 
            onClick={() => setIsYearly(false)}
            className={cn("px-4 py-2 text-xs font-bold rounded-xl relative z-10 transition-colors cursor-pointer", !isYearly ? "text-white" : "text-white/40")}
          >
            Monthly Billing
          </button>
          <button 
            onClick={() => setIsYearly(true)}
            className={cn("px-4 py-2 text-xs font-bold rounded-xl relative z-10 transition-colors cursor-pointer", isYearly ? "text-white" : "text-white/40")}
          >
            Yearly Billing
          </button>
          <motion.div 
            className="absolute top-1.5 bottom-1.5 rounded-xl bg-white/5 border border-white/10"
            animate={{
              left: isYearly ? "calc(50% + 2px)" : "6px",
              right: isYearly ? "6px" : "calc(50% + 2px)",
            }}
            transition={{ type: "spring", stiffness: 350, damping: 28 }}
          />
        </div>
      </div>

      {/* Pricing Cards Grid */}
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
        {PLAN_DATA.map((plan) => {
          const currentPrice = isYearly ? plan.yearlyPrice : plan.monthlyPrice;
          
          return (
            <motion.div
              key={plan.name}
              whileHover={{ 
                y: -4,
                boxShadow: plan.popular 
                  ? `0 20px 40px -10px rgba(0,0,0,0.6), 0 0 24px ${theme.ambientGlow}`
                  : "0 20px 30px -10px rgba(0,0,0,0.5)"
              }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              className={cn(
                "rounded-3xl p-8 bg-[#0a0d1a] border flex flex-col justify-between transition-colors duration-300 relative overflow-hidden",
                plan.popular 
                  ? cn("border-2 z-10", theme.border) 
                  : "border-white/5"
              )}
              style={{
                boxShadow: plan.popular 
                  ? `0 15px 35px -10px rgba(0,0,0,0.6), 0 0 15px ${theme.ambientGlow}`
                  : "0 10px 20px -10px rgba(0,0,0,0.5)"
              }}
            >
              {plan.popular && (
                <div className="absolute top-4 right-4">
                  <span className={cn("text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider bg-white/5", theme.text)}>
                    Popular choice
                  </span>
                </div>
              )}

              <div>
                {/* Plan Header */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                    {plan.icon}
                  </div>
                  <div>
                    <h3 className="font-extrabold text-white text-lg">{plan.name}</h3>
                    <p className="text-[10px] text-white/40 leading-none">Standard Sandbox Mode</p>
                  </div>
                </div>

                {/* Price Display */}
                <PriceRoll price={currentPrice} isYearly={isYearly} />

                {/* Description */}
                <p className="text-xs text-white/50 leading-relaxed mb-6 mt-4">
                  {plan.description}
                </p>

                {/* Features Divider */}
                <div className="h-px bg-white/5 my-6" />

                {/* Features List */}
                <ul className="flex flex-col gap-3.5 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <div className={cn("w-4 h-4 rounded-full flex items-center justify-center mt-0.5 shrink-0 bg-white/5", theme.text)}>
                        <Check size={11} strokeWidth={3} />
                      </div>
                      <span className="text-xs text-white/70 leading-snug">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Trigger */}
              <RippleButton 
                isPrimary={plan.popular} 
                theme={theme}
              >
                Choose Plan
              </RippleButton>
            </motion.div>
          );
        })}
      </div>

    </div>
  );
}
