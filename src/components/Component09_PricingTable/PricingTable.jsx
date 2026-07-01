import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Flame, Zap, Layers, Sparkles } from "lucide-react";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

import { useGlobalTheme } from "../../themes/ThemeContext";

const PLAN_DATA = [
  {
    name: "Basic Sandbox",
    description: "Ideal for hackers and hobbyists prototyping modern interactions.",
    monthlyPrice: 19,
    yearlyPrice: 14,
    icon: <Layers className="opacity-60" size={20} />,
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
    icon: <Zap className="opacity-80" size={20} />,
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
    icon: <Sparkles className="opacity-60" size={20} />,
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
const RippleButton = ({ children, className, onClick, theme, isPrimary, activeVariant }) => {
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
          : `${activeVariant.buttonClass} text-current hover:text-current`,
        className
      )}
      style={{
        boxShadow: isPrimary && activeVariant.id !== "brutal" ? `0 4px 15px ${theme.color}30` : "none"
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
      <span className="text-xl opacity-40 font-bold">$</span>
      <div className="overflow-hidden h-14 flex items-center">
        <AnimatePresence mode="wait">
          <motion.span
            key={price}
            initial={{ y: 35, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -35, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl font-black tracking-tighter text-current"
          >
            {price}
          </motion.span>
        </AnimatePresence>
      </div>
      <span className="text-xs opacity-40 font-bold ml-1">/ {isYearly ? "yr" : "mo"}</span>
    </div>
  );
};

export default function PricingTable() {
  const { activeVariant } = useGlobalTheme();
  const theme = React.useMemo(() => {
    const hex = activeVariant.triggerColor || "#06b6d4";
    let rgb = "6, 182, 212";
    const match = hex.match(/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i);
    if (match) {
      rgb = `${parseInt(match[1], 16)}, ${parseInt(match[2], 16)}, ${parseInt(match[3], 16)}`;
    }
    return {
      id: activeVariant.id,
      name: activeVariant.name,
      color: hex,
      bg: "bg-[var(--theme-primary)]",
      text: "text-[var(--theme-primary)]",
      border: "border-[var(--theme-primary)]/30",
      glow: "shadow-[var(--theme-primary)]/20",
      ambientGlow: `rgba(${rgb}, 0.15)`
    };
  }, [activeVariant]);

  const [isYearly, setIsYearly] = useState(false);

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center p-4 md:p-8 transition-colors duration-500  pt-[120px] pb-8 sm:pt-[120px] sm:pb-8 ${activeVariant.canvasClass}`}>
      
      {/* Configuration Header */}
      <header className={`w-full max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 py-4 px-6 mb-12 ${activeVariant.cardClass}`}>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-current/5 border border-current/10">
            <Flame className="opacity-80" size={16} />
          </div>
          <div>
            <span className="text-[10px] opacity-40 block leading-none font-bold uppercase tracking-wider">Pricing Suite</span>
            <span className="text-sm font-black">Component 09</span>
          </div>
        </div>
      </header>

      {/* Toggle Button */}
      <div className="flex justify-center mb-12">
        <div className="p-1.5 rounded-2xl flex items-center relative bg-current/5 border border-current/10">
          <button 
            onClick={() => setIsYearly(false)}
            className={cn("px-4 py-2 text-xs font-bold rounded-xl relative z-10 transition-colors cursor-pointer", !isYearly ? "text-current" : "opacity-40")}
          >
            Monthly Billing
          </button>
          <button 
            onClick={() => setIsYearly(true)}
            className={cn("px-4 py-2 text-xs font-bold rounded-xl relative z-10 transition-colors cursor-pointer", isYearly ? "text-current" : "opacity-40")}
          >
            Yearly Billing
          </button>
          <motion.div 
            className="absolute top-1.5 bottom-1.5 rounded-xl bg-current/10 border border-current/10"
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
                boxShadow: plan.popular && activeVariant.id !== "brutal"
                  ? `0 20px 40px -10px rgba(0,0,0,0.15), 0 0 24px ${theme.ambientGlow}`
                  : undefined
              }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              className={cn(
                "rounded-3xl p-8 flex flex-col justify-between transition-colors duration-300 relative overflow-hidden",
                activeVariant.cardClass,
                plan.popular 
                  ? cn("border-2 z-10", theme.border) 
                  : ""
              )}
              style={{
                boxShadow: plan.popular && activeVariant.id !== "brutal"
                  ? `0 15px 35px -10px rgba(0,0,0,0.15), 0 0 15px ${theme.ambientGlow}`
                  : undefined
              }}
            >
              {plan.popular && (
                <div className="absolute top-4 right-4">
                  <span className={cn("text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider bg-current/5", theme.text)}>
                    Popular choice
                  </span>
                </div>
              )}

              <div>
                {/* Plan Header */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-current/5 border border-current/10 flex items-center justify-center text-current">
                    {plan.icon}
                  </div>
                  <div>
                    <h3 className="font-extrabold text-lg text-current">{plan.name}</h3>
                    <p className="text-[10px] opacity-40 leading-none">Standard Sandbox Mode</p>
                  </div>
                </div>

                {/* Price Display */}
                <PriceRoll price={currentPrice} isYearly={isYearly} />

                {/* Description */}
                <p className="text-xs opacity-50 leading-relaxed mb-6 mt-4">
                  {plan.description}
                </p>

                {/* Features Divider */}
                <div className="h-px bg-current/10 my-6" />

                {/* Features List */}
                <ul className="flex flex-col gap-3.5 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <div className={cn("w-4 h-4 rounded-full flex items-center justify-center mt-0.5 shrink-0 bg-current/5", theme.text)}>
                        <Check size={11} strokeWidth={3} />
                      </div>
                      <span className="text-xs opacity-75 leading-snug">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Trigger */}
              <RippleButton 
                isPrimary={plan.popular} 
                theme={theme}
                activeVariant={activeVariant}
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
