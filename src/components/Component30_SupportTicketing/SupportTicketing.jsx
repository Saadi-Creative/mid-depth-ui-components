import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Check, Cpu, DollarSign, MessageSquare } from "lucide-react";
import { useGlobalTheme } from "../../themes/ThemeContext";

const DEPARTMENTS = [
  { id: "tech", label: "Tech Support", icon: Cpu, desc: "Bugs, nodes & APIs" },
  { id: "billing", label: "Billing & Sales", icon: DollarSign, desc: "Invoices & upgrades" },
  { id: "feedback", label: "General Feedback", icon: MessageSquare, desc: "Ideas & critiques" }
];

export default function SupportTicketing() {
  const { activeVariant, setActiveVariant, variants } = useGlobalTheme();
  const [selectedDept, setSelectedDept] = useState("tech");
  
  // Form states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  
  // Conditional field states
  const [os, setOs] = useState("");
  const [invoiceId, setInvoiceId] = useState("");
  const [rating, setRating] = useState("");
  
  // Submit animation states: idle, submitting, progress, success
  const [status, setStatus] = useState("idle");
  const [progress, setProgress] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (status !== "idle") return;

    setStatus("submitting");
    
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += 10;
      setProgress(currentProgress);
      if (currentProgress >= 100) {
        clearInterval(interval);
        setStatus("success");
      }
    }, 150);
  };

  const handleReset = () => {
    setName("");
    setEmail("");
    setSubject("");
    setMessage("");
    setOs("");
    setInvoiceId("");
    setRating("");
    setStatus("idle");
    setProgress(0);
  };

  return (
    <div 
      className={`min-h-screen relative py-12 px-6 overflow-hidden transition-colors duration-500 ${activeVariant.canvasClass} font-secondary`}
    >
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

      {/* Main card */}
      <div className={`max-w-xl mx-auto p-6 md:p-8 relative overflow-hidden transition-all duration-300 ${activeVariant.cardClass}`}>
        
        {/* Floating Theme Switcher Inside Header */}
        <div className="flex justify-between items-center pb-6 border-b border-current/10 mb-6">
          <div>
            <h1 className="text-base font-black tracking-wider uppercase font-primary">
              Support Dispatch
            </h1>
            <p className="text-[9px] opacity-40 mt-1 uppercase tracking-widest font-mono-theme">Create an active ticketing stream</p>
          </div>

          {/* Mini swatches */}
          <div className="flex items-center gap-1.5 bg-black/40 px-2.5 py-1.5 rounded-xl border border-white/5">
            {variants.map((variant) => (
              <button
                key={variant.id}
                onClick={() => setActiveVariant(variant)}
                className="w-2.5 h-2.5 rounded-full cursor-pointer relative"
                style={{ backgroundColor: variant.triggerColor }}
                title={variant.name}
              />
            ))}
          </div>
        </div>

        {/* Success Ripple Container */}
        <AnimatePresence>
          {status === "success" && (
            <motion.div
              initial={{ clipPath: "circle(0% at 50% 90%)", opacity: 0 }}
              animate={{ clipPath: "circle(150% at 50% 90%)", opacity: 1 }}
              exit={{ clipPath: "circle(0% at 50% 90%)", opacity: 0 }}
              transition={activeVariant.transition}
              className="absolute inset-0 z-30 flex flex-col items-center justify-center p-8 text-center bg-black/95 text-white"
            >
              <div className="w-16 h-16 rounded-full flex items-center justify-center border border-emerald-500/20 bg-emerald-500/10 mb-4">
                <Check size={32} className="text-emerald-400" />
              </div>
              <h2 className="text-lg font-black uppercase font-primary tracking-widest text-emerald-400">Ticket Queued</h2>
              <p className="text-xs text-white/50 leading-relaxed mt-2.5 max-w-sm font-mono-theme">
                Department dispatch completed. Our support agents have mapped this stream. Response window is under 4 hours.
              </p>
              
              <button
                onClick={handleReset}
                className={`mt-8 px-6 py-3 font-bold font-mono-theme uppercase tracking-wider text-xs cursor-pointer ${activeVariant.buttonClass}`}
                style={{
                  borderRadius: "var(--theme-border-radius-action)"
                }}
              >
                File Another Ticket
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-5 font-secondary">
          
          {/* Department Selection Cards */}
          <div>
            <span className="text-[9px] opacity-40 uppercase tracking-widest font-mono-theme block mb-2.5">Select Department</span>
            <div className="grid grid-cols-3 gap-2.5">
              {DEPARTMENTS.map((dept) => {
                const Icon = dept.icon;
                const isSelected = selectedDept === dept.id;
                return (
                  <button
                    key={dept.id}
                    type="button"
                    onClick={() => setSelectedDept(dept.id)}
                    className={`p-3.5 border flex flex-col items-center text-center cursor-pointer transition-all duration-300 ${
                      isSelected 
                        ? `bg-current/5 border-current` 
                        : "border-current/10 opacity-50 hover:opacity-85"
                    }`}
                    style={{
                      borderRadius: "var(--theme-border-radius-action)"
                    }}
                  >
                    <Icon 
                      size={16} 
                      className="mb-1.5 transition-colors duration-300" 
                      style={{ color: isSelected ? activeVariant.triggerColor : undefined }}
                    />
                    <span className="text-[10px] font-black leading-none">{dept.label.split(" ")[0]}</span>
                    <span className="text-[7px] opacity-40 mt-1 leading-none font-mono-theme">{dept.desc.split(" ")[0]}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Standard Fields */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-[9px] opacity-40 uppercase tracking-widest font-mono-theme block mb-1.5">Your Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Agent Name"
                className={`w-full h-10 px-3 text-xs transition-all ${activeVariant.inputClass}`}
              />
            </div>
            <div>
              <label className="text-[9px] opacity-40 uppercase tracking-widest font-mono-theme block mb-1.5">Email Node</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="vessel@domain.com"
                className={`w-full h-10 px-3 text-xs transition-all ${activeVariant.inputClass}`}
              />
            </div>
          </div>

          {/* Conditional follow-up fields with fluid Layout Transitions */}
          <motion.div layout className="border-t border-current/10 pt-4">
            <AnimatePresence mode="wait">
              {selectedDept === "tech" && (
                <motion.div
                  key="tech-fields"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={activeVariant.transition}
                  className="flex flex-col gap-3 overflow-hidden"
                >
                  <div>
                    <label className="text-[9px] opacity-40 uppercase tracking-widest font-mono-theme block mb-1.5">Operating System</label>
                    <select
                      value={os}
                      onChange={(e) => setOs(e.target.value)}
                      required
                      className={`w-full h-10 px-3 text-xs transition-all ${activeVariant.inputClass}`}
                    >
                      <option value="" disabled className="bg-[#111]">Select Environment</option>
                      <option value="macos" className="bg-[#111]">macOS Studio</option>
                      <option value="windows" className="bg-[#111]">Windows Node</option>
                      <option value="linux" className="bg-[#111]">Linux Kernel</option>
                    </select>
                  </div>
                </motion.div>
              )}

              {selectedDept === "billing" && (
                <motion.div
                  key="billing-fields"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={activeVariant.transition}
                  className="flex flex-col gap-3 overflow-hidden"
                >
                  <div>
                    <label className="text-[9px] opacity-40 uppercase tracking-widest font-mono-theme block mb-1.5">Invoice ID</label>
                    <input
                      type="text"
                      required
                      value={invoiceId}
                      onChange={(e) => setInvoiceId(e.target.value)}
                      placeholder="INV-9281-X"
                      className={`w-full h-10 px-3 text-xs transition-all ${activeVariant.inputClass}`}
                    />
                  </div>
                </motion.div>
              )}

              {selectedDept === "feedback" && (
                <motion.div
                  key="feedback-fields"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={activeVariant.transition}
                  className="flex flex-col gap-3 overflow-hidden"
                >
                  <div>
                    <label className="text-[9px] opacity-40 uppercase tracking-widest font-mono-theme block mb-1.5">Experience Rating</label>
                    <div className="flex gap-2">
                      {["Disappointed", "Average", "Stunning"].map((rate) => (
                        <button
                          key={rate}
                          type="button"
                          onClick={() => setRating(rate)}
                          className={`flex-1 py-2 text-[10px] font-bold border transition-all ${
                            rating === rate
                              ? "bg-current/10 border-current font-bold"
                              : "border-current/10 opacity-55 hover:opacity-85"
                          }`}
                          style={{
                            borderRadius: "var(--theme-border-radius-action)"
                          }}
                        >
                          {rate}
                        </button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Subject & Message details */}
          <div>
            <label className="text-[9px] opacity-40 uppercase tracking-widest font-mono-theme block mb-1.5">Topic</label>
            <input
              type="text"
              required
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Brief description of the request"
              className={`w-full h-10 px-3 text-xs transition-all ${activeVariant.inputClass}`}
            />
          </div>

          <div>
            <label className="text-[9px] opacity-40 uppercase tracking-widest font-mono-theme block mb-1.5">Detailed Logs</label>
            <textarea
              rows={4}
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Please provide details of your issue..."
              className={`w-full p-3 text-xs transition-all resize-none ${activeVariant.inputClass}`}
            />
          </div>

          {/* CTA Morphing Button */}
          <div className="pt-2">
            <AnimatePresence mode="wait">
              {status === "submitting" ? (
                /* Dynamic Progress Bar */
                <motion.div
                  key="progress"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="w-full h-11 bg-white/5 border border-white/5 rounded-xl overflow-hidden relative flex items-center px-4"
                  style={{
                    borderRadius: "var(--theme-border-radius-action)"
                  }}
                >
                  <motion.div
                    className="absolute left-0 top-0 bottom-0 opacity-20"
                    style={{ backgroundColor: activeVariant.triggerColor, width: `${progress}%` }}
                    transition={{ ease: "easeInOut" }}
                  />
                  <div className="w-full flex items-center justify-between text-[9px] font-mono-theme uppercase tracking-widest opacity-60 z-10">
                    <span>Dispatching Payload...</span>
                    <span>{progress}%</span>
                  </div>
                </motion.div>
              ) : (
                /* Primary Message Button */
                <motion.button
                  key="cta"
                  type="submit"
                  whileTap={{ scale: 0.98 }}
                  className={`w-full h-11 transition-colors duration-300 cursor-pointer flex items-center justify-center gap-1.5 ${activeVariant.buttonClass}`}
                  style={{
                    borderRadius: "var(--theme-border-radius-action)"
                  }}
                >
                  <Send size={12} />
                  <span>Send Ticket</span>
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        </form>
      </div>
    </div>
  );
}
