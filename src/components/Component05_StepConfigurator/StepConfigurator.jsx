import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CONFIGURATOR_THEMES, CONFIGURATOR_THEME_LIST } from "../../themes/themeConfig";

/* ═══════════════════════════════════════════════════════════  ICONS  */
const IconServer = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="8" rx="2" ry="2" />
    <rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
    <line x1="6" y1="6" x2="6.01" y2="6" />
    <line x1="6" y1="18" x2="6.01" y2="18" />
  </svg>
);

const IconSettings = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </svg>
);

const IconCreditCard = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
    <line x1="1" y1="10" x2="23" y2="10" />
  </svg>
);

const IconCheckCircle = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

/* ═══════════════════════════════════════════════════════════  FLOATING PARTICLES  */
const FloatingParticles = ({ theme, active }) => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl">
    {[...Array(8)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-1.5 h-1.5 rounded-full"
        style={{ background: theme.primary, opacity: 0 }}
        animate={active ? {
          opacity: [0, 0.7, 0],
          y: [0, -100 - i * 15],
          x: [0, (i % 2 === 0 ? 1 : -1) * (20 + i * 5)],
          scale: [0, 1.3, 0],
        } : { opacity: 0 }}
        transition={{
          duration: 2.2 + i * 0.2,
          repeat: Infinity,
          delay: i * 0.25,
          ease: "easeOut",
        }}
        initial={{
          left: `${15 + i * 10}%`,
          bottom: "10%",
        }}
      />
    ))}
  </div>
);

export default function StepConfigurator() {
  const [currentTheme, setCurrentTheme] = useState(CONFIGURATOR_THEMES.cobalt);
  const [step, setStep] = useState(0); // 0, 1, 2, 3
  const [direction, setDirection] = useState(1); // 1 = forward, -1 = backward
  const [shakeTrigger, setShakeTrigger] = useState(false);
  const [cpuHovered, setCpuHovered] = useState(false);
  const [ramHovered, setRamHovered] = useState(false);

  // Form states
  const [formData, setFormData] = useState({
    workspaceName: "nexus-prod-01",
    nodeType: "Vapor Compute Node",
    cpu: 8,
    ram: 32,
    cardNumber: "",
    cardExpiry: "",
    cardCvc: "",
  });

  const updateForm = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleNext = () => {
    // Input validation triggers card shake feedback
    if (step === 0 && !formData.workspaceName.trim()) {
      setShakeTrigger(true);
      setTimeout(() => setShakeTrigger(false), 500);
      return;
    }
    if (step === 2 && (!formData.cardNumber.trim() || !formData.cardExpiry.trim() || !formData.cardCvc.trim())) {
      setShakeTrigger(true);
      setTimeout(() => setShakeTrigger(false), 500);
      return;
    }

    if (step < 3) {
      setDirection(1);
      setStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (step > 0) {
      setDirection(-1);
      setStep((prev) => prev - 1);
    }
  };

  // Pricing calculator
  const calculatePrice = () => {
    let base = 10;
    if (formData.nodeType === "Neural Hub Node") base = 35;
    if (formData.nodeType === "Bare Metal Node") base = 60;
    const cpuCost = (formData.cpu - 2) * 2.5;
    const ramCost = (formData.ram - 4) * 0.75;
    return Math.round(base + cpuCost + ramCost);
  };

  // 2D Sliding / Scaling Animation variants
  const stepVariants = {
    enter: (dir) => ({
      x: dir > 0 ? "100%" : "-100%",
      opacity: 0,
      scale: 1,
    }),
    center: {
      x: "0%",
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: "spring", stiffness: 260, damping: 28 },
        opacity: { duration: 0.2 },
      }
    },
    exit: {
      scale: 0.98,
      opacity: 0,
      transition: { duration: 0.18, ease: "easeOut" }
    }
  };

  const stepList = [
    { title: "Workspace", icon: IconServer },
    { title: "Resources", icon: IconSettings },
    { title: "Billing", icon: IconCreditCard },
    { title: "Deploy", icon: IconCheckCircle },
  ];

  // Sliders percentage values
  const cpuPercent = ((formData.cpu - 2) / 62) * 100;
  const ramPercent = ((formData.ram - 4) / 508) * 100;

  return (
    <div
      id="component-05-step-configurator"
      className="relative w-full min-h-screen flex flex-col justify-start items-center p-6 md:p-8 overflow-hidden select-none"
      style={{
        background: "radial-gradient(circle at 50% 50%, #0c0d1b 0%, #05060b 100%)",
      }}
    >
      {/* Background soft glowing blur orbs */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden opacity-20">
        <div
          className="absolute w-[400px] h-[400px] rounded-full transition-colors duration-1000"
          style={{
            background: currentTheme.primary,
            filter: "blur(130px)",
            top: "20%",
            left: "30%",
          }}
        />
      </div>

      {/* Grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)`,
          backgroundSize: "50px 50px",
        }}
      />

      <div className="relative z-10 w-full max-w-[450px] flex flex-col gap-5 my-auto">
        {/* ── TOP NAV BAR WITH PINNED THEME SWITCHER ── */}
        <div className="flex items-center justify-between bg-white/3 backdrop-blur-md px-4 py-3 rounded-2xl border border-white/5 shadow-md">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full" style={{ background: currentTheme.primary }} />
            <span className="text-[11px] font-black uppercase tracking-wider text-white font-mono">
              Vapor Node Builder
            </span>
          </div>

          {/* Theme switcher */}
          <div className="flex items-center gap-2 bg-black/40 px-3 py-1.5 rounded-full border border-white/5">
            {CONFIGURATOR_THEME_LIST.map((theme) => {
              const isActive = currentTheme.id === theme.id;
              return (
                <button
                  key={theme.id}
                  onClick={() => setCurrentTheme(theme)}
                  className="w-3.5 h-3.5 rounded-full cursor-pointer relative transition-all duration-300"
                  style={{
                    background: theme.swatch,
                    opacity: isActive ? 1 : 0.6,
                    transform: isActive ? "scale(1.2)" : "scale(1)",
                    boxShadow: isActive ? `0 0 8px ${theme.glow}` : "none",
                  }}
                  title={theme.label}
                />
              );
            })}
          </div>
        </div>

        {/* ── STEP PROGRESS TRACKER ── */}
        <div className="flex justify-between items-center px-4 relative">
          {/* Base Connection line */}
          <div className="absolute left-8 right-8 top-1/2 -translate-y-1/2 h-0.5 bg-white/5 -z-10" />
          
          {/* Active Connection Line */}
          <motion.div
            className="absolute left-8 top-1/2 -translate-y-1/2 h-0.5 -z-10"
            animate={{
              width: `${(step / 3) * 83}%`,
            }}
            transition={{ type: "spring", stiffness: 80, damping: 20 }}
            style={{
              background: `linear-gradient(90deg, ${currentTheme.primary}, ${currentTheme.primaryDark})`,
              boxShadow: `0 0 10px ${currentTheme.glow}`,
            }}
          />

          {stepList.map((s, idx) => {
            const isCompleted = idx < step;
            const isActive = idx === step;
            const Icon = s.icon;

            return (
              <div key={idx} className="flex flex-col items-center gap-1.5">
                <motion.div
                  className="w-9 h-9 rounded-full flex items-center justify-center border bg-[#090b17]"
                  animate={isActive ? { scale: 1.15 } : { scale: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                  style={{
                    borderColor: isCompleted || isActive ? currentTheme.primary : "rgba(255,255,255,0.08)",
                    color: isCompleted || isActive ? currentTheme.primary : "rgba(255,255,255,0.3)",
                    boxShadow: isActive ? `0 0 12px ${currentTheme.glow}33` : "none",
                  }}
                >
                  {isCompleted ? "✓" : <Icon />}
                </motion.div>
                <span
                  className="text-[9px] font-bold uppercase tracking-wider transition-colors duration-500"
                  style={{
                    color: isActive ? currentTheme.primary : isCompleted ? "white" : "rgba(255,255,255,0.3)",
                  }}
                >
                  {s.title}
                </span>
              </div>
            );
          })}
        </div>

        {/* ── OVERLAPPING FLAT CARDS (2D/2.5D SHADOW STACK) ── */}
        <div className="relative w-full min-h-[340px] flex flex-col">
          {/* Overlapping back cards to simulate flat depth hierarchy using 2D transforms and shadows */}
          {step < 3 && (
            <>
              {/* Back Card 2 (Furthest back) */}
              <div
                className="absolute inset-0 rounded-2xl border border-white/5 transition-all duration-500 shadow-2xl -z-20 bg-[#121528] opacity-30"
                style={{
                  transform: "translateY(12px) scale(0.95)",
                }}
              />
              {/* Back Card 1 (Middle) */}
              <div
                className="absolute inset-0 rounded-2xl border border-white/5 transition-all duration-500 shadow-xl -z-10 bg-[#161a32] opacity-60"
                style={{
                  transform: "translateY(6px) scale(0.975)",
                }}
              />
            </>
          )}

          {/* Active Card Frame */}
          <motion.div
            className="w-full flex-1 min-h-[340px] rounded-2xl relative flex flex-col bg-gradient-to-br from-[#141830] to-[#080a16] border border-white/10 shadow-2xl overflow-hidden"
            animate={shakeTrigger ? {
              x: [0, -6, 6, -6, 6, 0],
              transition: { duration: 0.4, ease: "easeInOut" }
            } : {}}
          >
            {/* Top Border Glow Accent */}
            <div
              className="absolute top-0 inset-x-0 h-px transition-colors duration-1000 z-20"
              style={{
                background: `linear-gradient(90deg, transparent, ${currentTheme.primary}, transparent)`,
              }}
            />

            {/* Inner Content Wrapper (keeps sliding steps bounded inside the card) */}
            <div className="w-full flex-1 p-5 sm:p-6 relative flex flex-col justify-between overflow-hidden">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={step}
                  custom={direction}
                  variants={stepVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="w-full flex-1 flex flex-col justify-between"
                >
                  {/* STEP 0: WORKSPACE */}
                  {step === 0 && (
                    <div className="flex flex-col gap-3">
                      <div>
                        <h2 className="text-sm font-black text-white">Create Virtual Workspace</h2>
                        <p className="text-[10px] text-white/40">Select node configuration parameter specs.</p>
                      </div>

                      <div className="flex flex-col gap-1.5 mt-1.5">
                        <label className="text-[10px] font-bold text-white/50 uppercase tracking-wider font-mono">
                          Workspace Handle
                        </label>
                        <input
                          type="text"
                          value={formData.workspaceName}
                          onChange={(e) => updateForm("workspaceName", e.target.value)}
                          placeholder="my-cool-workspace"
                          className="w-full text-xs py-2 px-3 rounded-xl text-white outline-none bg-white/5 border transition-all duration-300 font-semibold focus:bg-white/10"
                          style={{
                            borderColor: "rgba(255, 255, 255, 0.08)",
                          }}
                          onFocus={(e) => {
                            e.target.style.borderColor = currentTheme.primary;
                            e.target.style.boxShadow = `0 0 10px ${currentTheme.glow}33`;
                          }}
                          onBlur={(e) => {
                            e.target.style.borderColor = "rgba(255, 255, 255, 0.08)";
                            e.target.style.boxShadow = "none";
                          }}
                        />
                      </div>

                      <div className="flex flex-col gap-2">
                        <label className="text-[10px] font-bold text-white/50 uppercase tracking-wider font-mono">
                          Node Deploy Template
                        </label>
                        <div className="flex flex-col gap-1.5">
                          {["Vapor Compute Node", "Neural Hub Node", "Bare Metal Node"].map((t) => {
                            const isSel = formData.nodeType === t;
                            return (
                              <motion.button
                                key={t}
                                type="button"
                                onClick={() => updateForm("nodeType", t)}
                                whileHover={{ scale: 1.015, background: "rgba(255,255,255,0.04)" }}
                                whileTap={{ scale: 0.985 }}
                                className="w-full text-left p-2.5 rounded-xl border transition-all duration-300 flex items-center justify-between cursor-pointer group"
                                style={{
                                  background: isSel ? currentTheme.primaryMuted : "rgba(255,255,255,0.02)",
                                  borderColor: isSel ? currentTheme.primary : "rgba(255,255,255,0.06)",
                                }}
                              >
                                <div>
                                  <div className="text-xs font-extrabold text-white">{t}</div>
                                  <div className="text-[9px] text-white/40 mt-0.5 font-mono">
                                    {t === "Vapor Compute Node" && "Standard virtual memory cloud node."}
                                    {t === "Neural Hub Node" && "Optimized for neural workflows & GPU processing."}
                                    {t === "Bare Metal Node" && "High performance dedicated hardware machine."}
                                  </div>
                                </div>
                                <span
                                  className="w-4 h-4 rounded-full border flex items-center justify-center transition-all duration-300"
                                  style={{
                                    borderColor: isSel ? currentTheme.primary : "rgba(255,255,255,0.2)",
                                  }}
                                >
                                  {isSel && (
                                    <motion.span
                                      initial={{ scale: 0 }}
                                      animate={{ scale: 1 }}
                                      transition={{ type: "spring", stiffness: 350, damping: 15 }}
                                      className="w-2 h-2 rounded-full"
                                      style={{ background: currentTheme.primary }}
                                    />
                                  )}
                                </span>
                              </motion.button>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* STEP 1: RESOURCES */}
                  {step === 1 && (
                    <div className="flex flex-col gap-3">
                      <div>
                        <h2 className="text-sm font-black text-white">Allocate Resources</h2>
                        <p className="text-[10px] text-white/40">Calibrate core hardware performance nodes.</p>
                      </div>

                      <div className="flex flex-col gap-4 mt-3">
                        {/* CPU slider */}
                        <div className="flex flex-col gap-2">
                          <div className="flex justify-between text-xs font-mono">
                            <span className="text-[10px] font-bold text-white/50 uppercase tracking-wider">CPU Cores</span>
                            <span className="font-bold" style={{ color: currentTheme.primary }}>
                              {formData.cpu} Cores
                            </span>
                          </div>
                          <div className="relative flex items-center py-2"
                            onMouseEnter={() => setCpuHovered(true)}
                            onMouseLeave={() => setCpuHovered(false)}
                          >
                            <input
                              type="range"
                              min="2"
                              max="64"
                              step="2"
                              value={formData.cpu}
                              onChange={(e) => updateForm("cpu", parseInt(e.target.value))}
                              className="w-full h-1 bg-white/5 rounded-full appearance-none outline-none cursor-pointer"
                              style={{
                                backgroundImage: `linear-gradient(90deg, ${currentTheme.primary} 0%, ${currentTheme.primary} ${cpuPercent}%, rgba(255,255,255,0.05) ${cpuPercent}%, rgba(255,255,255,0.05) 100%)`,
                              }}
                            />
                            {/* Floating indicator */}
                            <motion.div
                              className="absolute -top-3 px-1.5 py-0.5 rounded text-[8px] font-mono font-black text-black pointer-events-none -translate-x-1/2"
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: cpuHovered ? 1 : 0, scale: cpuHovered ? 1 : 0.8 }}
                              transition={{ duration: 0.2 }}
                              style={{
                                left: `${cpuPercent}%`,
                                background: currentTheme.primary,
                                boxShadow: `0 2px 6px ${currentTheme.glow}`,
                              }}
                            >
                              {formData.cpu}C
                            </motion.div>
                          </div>
                          <div className="flex justify-between text-[9px] text-white/30 font-mono">
                            <span>2 Cores</span>
                            <span>64 Cores</span>
                          </div>
                        </div>

                        {/* Memory slider */}
                        <div className="flex flex-col gap-2">
                          <div className="flex justify-between text-xs font-mono">
                            <span className="text-[10px] font-bold text-white/50 uppercase tracking-wider">Memory RAM</span>
                            <span className="font-bold" style={{ color: currentTheme.primary }}>
                              {formData.ram} GB
                            </span>
                          </div>
                          <div className="relative flex items-center py-2"
                            onMouseEnter={() => setRamHovered(true)}
                            onMouseLeave={() => setRamHovered(false)}
                          >
                            <input
                              type="range"
                              min="4"
                              max="512"
                              step="4"
                              value={formData.ram}
                              onChange={(e) => updateForm("ram", parseInt(e.target.value))}
                              className="w-full h-1 bg-white/5 rounded-full appearance-none outline-none cursor-pointer"
                              style={{
                                backgroundImage: `linear-gradient(90deg, ${currentTheme.primary} 0%, ${currentTheme.primary} ${ramPercent}%, rgba(255,255,255,0.05) ${ramPercent}%, rgba(255,255,255,0.05) 100%)`,
                              }}
                            />
                            {/* Floating indicator */}
                            <motion.div
                              className="absolute -top-3 px-1.5 py-0.5 rounded text-[8px] font-mono font-black text-black pointer-events-none -translate-x-1/2"
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: ramHovered ? 1 : 0, scale: ramHovered ? 1 : 0.8 }}
                              transition={{ duration: 0.2 }}
                              style={{
                                left: `${ramPercent}%`,
                                background: currentTheme.primary,
                                boxShadow: `0 2px 6px ${currentTheme.glow}`,
                              }}
                            >
                              {formData.ram}G
                            </motion.div>
                          </div>
                          <div className="flex justify-between text-[9px] text-white/30 font-mono">
                            <span>4 GB</span>
                            <span>512 GB</span>
                          </div>
                        </div>
                      </div>

                      {/* Calculated Live Cost */}
                      <div className="mt-3 p-3 rounded-xl border border-white/5 bg-black/30 flex items-center justify-between">
                        <div>
                          <div className="text-[10px] font-bold text-white/40 uppercase tracking-wider font-mono">
                            Estimated Cost
                          </div>
                          <div className="text-[9px] text-white/30 mt-0.5 font-mono">
                            Billed hourly. Cancel anytime.
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="text-xl font-mono font-black text-white">${calculatePrice()}</span>
                          <span className="text-[9px] font-bold text-white/40 uppercase font-mono">/mo</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* STEP 2: BILLING */}
                  {step === 2 && (
                    <div className="flex flex-col gap-3">
                      <div>
                        <h2 className="text-sm font-black text-white">Billing Authorization</h2>
                        <p className="text-[10px] text-white/40">Verify payment credentials for node deployment.</p>
                      </div>

                      <div className="flex flex-col gap-3">
                        {/* Cost summary card */}
                        <div className="p-2.5 rounded-xl border border-white/5 bg-black/25 flex justify-between items-center text-xs font-mono">
                          <div>
                            <div className="font-black text-white">{formData.nodeType}</div>
                            <div className="text-[10px] text-white/40 mt-0.5">
                              {formData.cpu} Cores / {formData.ram}GB RAM
                            </div>
                          </div>
                          <span className="font-extrabold text-white">${calculatePrice()}/mo</span>
                        </div>

                        {/* Card Input fields */}
                        <div className="flex flex-col gap-3 mt-1">
                          <div className="flex flex-col gap-1">
                            <label className="text-[9px] font-bold text-white/50 uppercase tracking-wider font-mono">
                              Card Number
                            </label>
                            <input
                              type="text"
                              maxLength="19"
                              value={formData.cardNumber}
                              onChange={(e) => updateForm("cardNumber", e.target.value)}
                              placeholder="•••• •••• •••• ••••"
                              className="w-full text-xs py-2 px-3 rounded-xl text-white outline-none bg-white/5 border transition-all duration-300 font-semibold focus:bg-white/10"
                              style={{
                                borderColor: "rgba(255, 255, 255, 0.08)",
                              }}
                              onFocus={(e) => {
                                e.target.style.borderColor = currentTheme.primary;
                                e.target.style.boxShadow = `0 0 10px ${currentTheme.glow}33`;
                              }}
                              onBlur={(e) => {
                                e.target.style.borderColor = "rgba(255, 255, 255, 0.08)";
                                e.target.style.boxShadow = "none";
                              }}
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-3">
                            <div className="flex flex-col gap-1">
                              <label className="text-[9px] font-bold text-white/50 uppercase tracking-wider font-mono">
                                Expiry Date
                              </label>
                              <input
                                type="text"
                                maxLength="5"
                                value={formData.cardExpiry}
                                onChange={(e) => updateForm("cardExpiry", e.target.value)}
                                placeholder="MM/YY"
                                className="w-full text-xs py-2 px-3 rounded-xl text-white outline-none bg-white/5 border transition-all duration-300 font-semibold focus:bg-white/10"
                                style={{
                                  borderColor: "rgba(255, 255, 255, 0.08)",
                                }}
                                onFocus={(e) => {
                                  e.target.style.borderColor = currentTheme.primary;
                                  e.target.style.boxShadow = `0 0 10px ${currentTheme.glow}33`;
                                }}
                                onBlur={(e) => {
                                  e.target.style.borderColor = "rgba(255, 255, 255, 0.08)";
                                  e.target.style.boxShadow = "none";
                                }}
                              />
                            </div>
                            <div className="flex flex-col gap-1">
                              <label className="text-[9px] font-bold text-white/50 uppercase tracking-wider font-mono">
                                Security CVC
                              </label>
                              <input
                                type="text"
                                maxLength="3"
                                value={formData.cardCvc}
                                onChange={(e) => updateForm("cardCvc", e.target.value)}
                                placeholder="•••"
                                className="w-full text-xs py-2 px-3 rounded-xl text-white outline-none bg-white/5 border transition-all duration-300 font-semibold focus:bg-white/10"
                                style={{
                                  borderColor: "rgba(255, 255, 255, 0.08)",
                                }}
                                onFocus={(e) => {
                                  e.target.style.borderColor = currentTheme.primary;
                                  e.target.style.boxShadow = `0 0 10px ${currentTheme.glow}33`;
                                }}
                                onBlur={(e) => {
                                  e.target.style.borderColor = "rgba(255, 255, 255, 0.08)";
                                  e.target.style.boxShadow = "none";
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* STEP 3: SUCCESS */}
                  {step === 3 && (
                    <div className="flex flex-col items-center justify-center text-center py-3 gap-4 relative">
                      <FloatingParticles theme={currentTheme} active={step === 3} />

                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 180, damping: 15 }}
                        className="w-14 h-14 rounded-full flex items-center justify-center"
                        style={{
                          background: currentTheme.primaryMuted,
                          border: `2px solid ${currentTheme.primary}`,
                          color: currentTheme.primary,
                        }}
                      >
                        <IconCheckCircle />
                      </motion.div>

                      <div>
                        <h2 className="text-lg font-black text-white leading-tight">Node Successfully Provisioned</h2>
                        <p className="text-xs text-white/50 max-w-[340px] mt-1.5 leading-relaxed">
                          Workspace <span className="text-white font-bold font-mono">"{formData.workspaceName}"</span> is deploying on standard servers.
                        </p>
                      </div>

                      {/* Metadata Box */}
                      <div className="w-full p-3 rounded-xl border border-white/5 bg-black/30 flex flex-col gap-2 text-left font-mono text-[10px]">
                        <div className="flex justify-between">
                          <span className="text-white/40">NODE CLUSTER IP:</span>
                          <span className="text-white font-bold">198.51.100.42</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-white/40">TEMPLATED NODE:</span>
                          <span className="text-white font-bold uppercase">{formData.nodeType}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-white/40">HARDWARE MATRIX:</span>
                          <span className="text-white font-bold">
                            {formData.cpu} Cores / {formData.ram}GB RAM
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={() => {
                          setStep(0);
                          setDirection(-1);
                        }}
                        className="px-4 py-2 border border-white/10 hover:border-white/20 hover:text-white text-white/60 text-[9px] rounded-lg transition-all tracking-wider font-bold uppercase cursor-pointer"
                      >
                        ← Reconfigure Node
                      </button>
                    </div>
                  )}

                  {/* ── BUTTON FOOTER NAVIGATION ── */}
                  {step < 3 && (
                    <div className="flex justify-between items-center pt-4 border-t border-white/5 mt-4 z-30">
                      <motion.button
                        type="button"
                        onClick={handleBack}
                        whileHover={step > 0 ? { scale: 1.03, x: -2 } : {}}
                        whileTap={step > 0 ? { scale: 0.97 } : {}}
                        className="px-4 py-2 rounded-xl border border-white/10 hover:border-white/25 hover:text-white text-white/50 text-[10px] font-bold uppercase tracking-wider transition-all duration-200 disabled:opacity-25 disabled:cursor-not-allowed cursor-pointer"
                        disabled={step === 0}
                      >
                        Back
                      </motion.button>
                      <motion.button
                        type="button"
                        onClick={handleNext}
                        whileHover={{ scale: 1.03, boxShadow: `0 6px 18px ${currentTheme.glow}44` }}
                        whileTap={{ scale: 0.97 }}
                        className="px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-wider cursor-pointer shadow-md flex items-center gap-1.5 select-none transition-all duration-200 hover:brightness-110"
                        style={{
                          background: currentTheme.primary,
                          color: "#000",
                          boxShadow: `0 4px 14px ${currentTheme.glow}33`,
                        }}
                      >
                        <span>{step === 2 ? "Deploy Node" : "Continue"}</span>
                        <motion.span
                          animate={step < 2 ? { x: [0, 3, 0] } : {}}
                          transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
                        >
                          →
                        </motion.span>
                      </motion.button>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
