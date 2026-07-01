import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Check, Mail, Lock, Briefcase, Users, RefreshCw, Star } from "lucide-react";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

import { useGlobalTheme } from "../../themes/ThemeContext";

// Custom Input with Neon Tracer
const WizardInput = ({ label, type = "text", placeholder, name, value, onChange, theme, activeVariant }) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <motion.div className="flex flex-col gap-1.5 w-full">
      <label className="text-[10px] opacity-40 font-bold uppercase tracking-wider">{label}</label>
      <div className={`relative transition-colors duration-200 ${activeVariant.inputClass}`}>
        
        {/* SVG Neon Boundary Tracer */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible rounded-xl">
          <motion.rect
            x="0" y="0"
            width="100%"
            height="100%"
            rx="11"
            fill="none"
            stroke={theme.color}
            strokeWidth="2"
            initial={{ strokeDasharray: "60 220", strokeDashoffset: 0, opacity: 0 }}
            animate={isFocused ? { strokeDashoffset: -280, opacity: 1 } : { opacity: 0 }}
            transition={isFocused ? { repeat: Infinity, duration: 1.5, ease: "linear" } : {}}
          />
        </svg>

        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="w-full bg-transparent px-4 py-3 text-sm text-current placeholder-current/25 outline-none rounded-xl"
        />
      </div>
    </motion.div>
  );
};

export default function OnboardingWizard() {
  const { activeVariant } = useGlobalTheme();
  const theme = React.useMemo(() => {
    const hex = activeVariant.triggerColor || "#3b82f6";
    let rgb = "59, 130, 246";
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
      focusRing: "focus:border-[var(--theme-primary)]",
      glow: `rgba(${rgb}, 0.2)`
    };
  }, [activeVariant]);

  const [step, setStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState([]);

  // Form states
  const [form, setForm] = useState({
    username: "", email: "", password: "",
    fullName: "", role: "developer",
    teamName: "", invites: ["", ""]
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleInviteChange = (index, val) => {
    setForm(prev => {
      const invites = [...prev.invites];
      invites[index] = val;
      return { ...prev, invites };
    });
  };

  const addInviteField = () => {
    setForm(prev => ({ ...prev, invites: [...prev.invites, ""] }));
  };

  const nextStep = () => {
    if (!completedSteps.includes(step)) {
      setCompletedSteps(prev => [...prev, step]);
    }
    setStep(prev => prev + 1);
  };

  const prevStep = () => {
    setStep(prev => prev - 1);
  };

  // Stagger variants for step fields cascading in
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      }
    },
    exit: {
      opacity: 0,
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 350, damping: 25 }
    },
    exit: { opacity: 0, y: -10 }
  };

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center p-4 sm:p-8 transition-colors duration-500 ${activeVariant.canvasClass}`}>
      
      {/* Header Controller */}
      <header className={`w-full max-w-2xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 py-4 px-6 mb-8 ${activeVariant.cardClass}`}>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-current/5 border border-current/10">
            <User className="opacity-80" size={16} />
          </div>
          <div>
            <span className="text-[10px] opacity-40 block leading-none font-bold uppercase tracking-wider">Onboarding Suite</span>
            <span className="text-sm font-black">Component 10</span>
          </div>
        </div>
      </header>

      {/* Wizard Main Card */}
      <div className={`w-full max-w-2xl shadow-2xl relative overflow-hidden flex flex-col min-h-[480px] ${activeVariant.cardClass}`}>
        
        {/* Step Manager Header */}
        <div className="flex justify-between items-center px-8 py-6 border-b border-current/10 bg-current/[0.01]">
          {[
            { num: 1, label: "Account" },
            { num: 2, label: "Profile" },
            { num: 3, label: "Team" }
          ].map((s, idx) => {
            const isCompleted = completedSteps.includes(s.num) || step > s.num;
            const isActive = step === s.num;

            return (
              <div key={s.num} className="flex items-center gap-2.5 relative">
                {/* Elastic Pop Morph Dot */}
                <div 
                  className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 relative",
                    isCompleted || isActive ? cn("text-white", theme.bg) : "bg-current/5 border border-current/10 opacity-40"
                  )}
                  style={{
                    boxShadow: (isActive || isCompleted) && activeVariant.id !== "brutal" ? `0 0 12px ${theme.color}40` : "none"
                  }}
                >
                  <AnimatePresence mode="wait">
                    {isCompleted ? (
                      <motion.div
                        key="check"
                        initial={{ scale: 0, rotate: -45 }}
                        animate={{ scale: 1, rotate: 0 }}
                        exit={{ scale: 0 }}
                        transition={{ type: "spring", stiffness: 300, damping: 15 }}
                      >
                        <Check size={14} strokeWidth={3.5} />
                      </motion.div>
                    ) : (
                      <motion.span
                        key="num"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                      >
                        {s.num}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </div>

                <span className={cn(
                  "text-xs font-extrabold uppercase tracking-wider transition-colors duration-300",
                  isActive ? "opacity-100" : isCompleted ? theme.text : "opacity-20"
                )}>
                  {s.label}
                </span>

                {idx < 2 && (
                  <div className="w-12 h-[2px] bg-current/5 absolute -right-16 top-1/2 -translate-y-1/2 hidden sm:block">
                    <motion.div 
                      className={cn("h-full origin-left", theme.bg)}
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: isCompleted ? 1 : 0 }}
                      transition={{ duration: 0.4 }}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Form Body - Snappy spring staggered slide */}
        <div className="p-8 flex-1 flex flex-col justify-between">
          <AnimatePresence mode="wait" initial={false}>
            {step === 1 && (
              <motion.div
                key="step1"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="flex flex-col gap-6"
              >
                <motion.div variants={itemVariants}>
                  <h3 className="text-lg font-bold flex items-center gap-2">
                    <Mail size={18} className={theme.text} />
                    Account Authentication
                  </h3>
                  <p className="opacity-40 text-xs mt-1">Configure security credentials and primary profile handle.</p>
                </motion.div>

                <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <WizardInput 
                    label="Username" name="username" value={form.username} 
                    onChange={handleInputChange} theme={theme} activeVariant={activeVariant} placeholder="johndoe"
                  />
                  <WizardInput 
                    label="Email Address" name="email" value={form.email} 
                    onChange={handleInputChange} theme={theme} activeVariant={activeVariant} placeholder="john@example.com"
                  />
                  <div className="sm:col-span-2">
                    <WizardInput 
                      label="Security Password" type="password" name="password" value={form.password} 
                      onChange={handleInputChange} theme={theme} activeVariant={activeVariant} placeholder="••••••••••••"
                    />
                  </div>
                </motion.div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="flex flex-col gap-6"
              >
                <motion.div variants={itemVariants}>
                  <h3 className="text-lg font-bold flex items-center gap-2">
                    <Briefcase size={18} className={theme.text} />
                    Personalized Workspace Profile
                  </h3>
                  <p className="opacity-40 text-xs mt-1">Help team leads calibrate invitations matching your active department.</p>
                </motion.div>

                <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="sm:col-span-2">
                    <WizardInput 
                      label="Full Legal Name" name="fullName" value={form.fullName} 
                      onChange={handleInputChange} theme={theme} activeVariant={activeVariant} placeholder="John Alexander Doe"
                    />
                  </div>
                  
                  {/* Select Options */}
                  <div className="flex flex-col gap-1.5 w-full">
                    <label className="text-[10px] opacity-40 font-bold uppercase tracking-wider">Role Specialty</label>
                    <select
                      name="role"
                      value={form.role}
                      onChange={handleInputChange}
                      className={cn(
                        "w-full px-4 py-3 text-sm rounded-xl outline-none transition-colors border border-current/10 bg-transparent text-current",
                        theme.focusRing
                      )}
                    >
                      <option className="bg-slate-900 text-white" value="developer">Frontend Engineer</option>
                      <option className="bg-slate-900 text-white" value="designer">UI/UX Designer</option>
                      <option className="bg-slate-900 text-white" value="manager">Product Manager</option>
                    </select>
                  </div>

                  <div className="flex flex-col gap-1.5 w-full">
                    <label className="text-[10px] opacity-40 font-bold uppercase tracking-wider">Avatar Identity</label>
                    <div className="grid grid-cols-4 gap-2">
                      {[1, 2, 3, 4].map(idx => (
                        <button
                          key={idx}
                          type="button"
                          className={`w-10 h-10 rounded-xl flex items-center justify-center cursor-pointer transition-colors ${activeVariant.buttonClass} text-current hover:text-current`}
                        >
                          {idx === 1 ? <Star size={14} className={theme.text} /> : idx}
                        </button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="flex flex-col gap-6"
              >
                <motion.div variants={itemVariants}>
                  <h3 className="text-lg font-bold flex items-center gap-2">
                    <Users size={18} className={theme.text} />
                    Assemble Shared Workspace
                  </h3>
                  <p className="opacity-40 text-xs mt-1">Initiate invitations to colleagues allowing real-time collaborative syncs.</p>
                </motion.div>

                <motion.div variants={itemVariants} className="grid grid-cols-1 gap-4">
                  <WizardInput 
                    label="Workspace Team Name" name="teamName" value={form.teamName} 
                    onChange={handleInputChange} theme={theme} activeVariant={activeVariant} placeholder="Acme Engineering Lab"
                  />
                  
                  <div className="flex flex-col gap-3">
                    <label className="text-[10px] opacity-40 font-bold uppercase tracking-wider">Team Member invites (Emails)</label>
                    {form.invites.map((invite, index) => (
                      <WizardInput 
                        key={index}
                        label={`Colleague #${index + 1}`} name={`invite-${index}`} value={invite} 
                        onChange={(e) => handleInviteChange(index, e.target.value)} theme={theme} activeVariant={activeVariant} placeholder="colleague@domain.com"
                      />
                    ))}
                    <button 
                      type="button"
                      onClick={addInviteField}
                      className="text-left text-xs font-bold opacity-40 hover:opacity-100 transition-colors cursor-pointer mt-1 self-start"
                    >
                      + Add another team member invite
                    </button>
                  </div>
                </motion.div>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="flex flex-col items-center text-center justify-center py-8 gap-6"
              >
                <div className={cn("w-16 h-16 rounded-full flex items-center justify-center bg-current/5 relative", theme.text)}>
                  <Check size={32} strokeWidth={3.5} />
                  <div className="absolute inset-0 rounded-full border border-current opacity-20 animate-ping" />
                </div>

                <div>
                  <h3 className="text-2xl font-black">Setup Fully Initialized!</h3>
                  <p className="opacity-40 text-xs mt-2 max-w-sm mx-auto">
                    Account configured and invitations sent for <span className="font-bold opacity-80">{form.teamName || "your workspace"}</span>.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setStep(1);
                    setCompletedSteps([]);
                    setForm({ username: "", email: "", password: "", fullName: "", role: "developer", teamName: "", invites: ["", ""] });
                  }}
                  className={`px-6 py-3 rounded-xl flex items-center gap-2 cursor-pointer transition-colors ${activeVariant.buttonClass} text-current hover:text-current`}
                >
                  <RefreshCw size={14} />
                  Restart Wizard
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation Controls */}
          {step <= 3 && (
            <div className="flex gap-4 border-t border-current/10 pt-6 mt-8">
              {step > 1 && (
                <button
                  type="button"
                  onClick={prevStep}
                  className={`flex-1 py-3.5 rounded-xl font-bold cursor-pointer transition-all ${activeVariant.buttonClass} text-current hover:text-current`}
                >
                  Back
                </button>
              )}
              <button
                type="button"
                onClick={nextStep}
                className={cn("flex-1 py-3.5 rounded-xl font-bold text-white transition-all cursor-pointer shadow-lg", theme.bg)}
                style={{ boxShadow: activeVariant.id === "brutal" ? "none" : `0 6px 15px ${theme.color}30` }}
              >
                {step === 3 ? "Complete Registration" : "Next Step"}
              </button>
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
