import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Settings, User, Monitor, Sparkles, AlertCircle } from "lucide-react";

// Themes definition
const THEMES = [
  {
    id: "oceanBlue",
    name: "Ocean Blue",
    color: "#3b82f6",
    rgb: "59, 130, 246",
    text: "text-blue-400",
    bg: "bg-blue-500",
    hoverBg: "hover:bg-blue-600",
    accentBg: "bg-blue-500/10",
    border: "border-blue-500/20",
    glow: "shadow-[0_0_15px_rgba(59,130,246,0.3)]"
  },
  {
    id: "sunsetGold",
    name: "Sunset Gold",
    color: "#ffb800",
    rgb: "255, 184, 0",
    text: "text-amber-400",
    bg: "bg-amber-500",
    hoverBg: "hover:bg-amber-600",
    accentBg: "bg-amber-500/10",
    border: "border-amber-500/20",
    glow: "shadow-[0_0_15px_rgba(255,184,0,0.3)]"
  },
  {
    id: "forestGreen",
    name: "Forest Green",
    color: "#10b981",
    rgb: "16, 185, 129",
    text: "text-emerald-400",
    bg: "bg-emerald-500",
    hoverBg: "hover:bg-emerald-600",
    accentBg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
    glow: "shadow-[0_0_15px_rgba(16,185,129,0.3)]"
  },
  {
    id: "deepPlum",
    name: "Deep Plum",
    color: "#8b5cf6",
    rgb: "139, 92, 246",
    text: "text-purple-400",
    bg: "bg-purple-500",
    hoverBg: "hover:bg-purple-600",
    accentBg: "bg-purple-500/10",
    border: "border-purple-500/20",
    glow: "shadow-[0_0_15px_rgba(139,92,246,0.3)]"
  },
  {
    id: "copper",
    name: "Copper",
    color: "#f97316",
    rgb: "249, 115, 22",
    text: "text-orange-400",
    bg: "bg-orange-500",
    hoverBg: "hover:bg-orange-600",
    accentBg: "bg-orange-500/10",
    border: "border-orange-500/20",
    glow: "shadow-[0_0_15px_rgba(249,115,22,0.3)]"
  }
];

const INITIAL_MESSAGES = [
  { id: 1, sender: "agent", text: "Hey there! 👋 I am Cyber Assistant. How can I help you deploy your components today?" },
];

export default function SupportMessenger() {
  const [activeTheme, setActiveTheme] = useState(THEMES[0]);
  const [isOpen, setIsOpen] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [inputValue, setInputValue] = useState("");
  const [isAgentTyping, setIsAgentTyping] = useState(false);

  const messagesEndRef = useRef(null);

  // Auto scroll messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isAgentTyping]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMsg = {
      id: Date.now(),
      sender: "user",
      text: inputValue
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue("");

    // Simulate Agent response
    setIsAgentTyping(true);
    setTimeout(() => {
      setIsAgentTyping(false);
      const agentMsg = {
        id: Date.now() + 1,
        sender: "agent",
        text: getAgentResponse(userMsg.text)
      };
      setMessages(prev => [...prev, agentMsg]);
    }, 2000);
  };

  const getAgentResponse = (msg) => {
    const text = msg.toLowerCase();
    if (text.includes("pricing") || text.includes("cost")) {
      return "Our components series starts at $0 for the open-source tiers. Custom enterprise builds start at $49/mo.";
    }
    if (text.includes("install") || text.includes("setup")) {
      return "Simply run `npm install` and run the development preview tool using `npm run dev`!";
    }
    return "Understood. Our engineering cluster has received your token request. Is there anything else I can clarify?";
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-[#060810]"
      style={{ fontFamily: "'Inter', sans-serif" }}>
      
      {/* Centered Instructions in background canvas */}
      <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center select-none pointer-events-none opacity-40">
        <Monitor size={36} className="text-white/20 mb-3" />
        <h2 className="text-sm font-bold font-mono uppercase tracking-widest text-white/50">Floating Messenger</h2>
        <p className="text-xs text-white/30 max-w-xs mt-1 leading-relaxed">
          Click the chat bubble in the bottom right corner to test the morphing layout and agent typing simulator.
        </p>
      </div>

      {/* Floating Messenger Widget System */}
      <div className="absolute bottom-6 right-6 z-50 flex flex-col items-end gap-3 select-none">
        
        {/* Chat Window Panel */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, y: 50 }}
              transition={{ type: "spring", stiffness: 280, damping: 24 }}
              className="w-[340px] h-[450px] bg-[#0a0d1a] border border-white/5 rounded-3xl flex flex-col overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.6)]"
            >
              {/* Header */}
              <div 
                className="px-4 py-3 flex items-center justify-between border-b border-white/5 relative z-10 transition-colors duration-300"
                style={{ background: `linear-gradient(180deg, rgba(${activeTheme.rgb},0.08) 0%, transparent 100%)` }}
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center relative">
                    <User size={14} className="text-white/60" />
                    <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-emerald-400 border border-[#0a0d1a]" />
                  </div>
                  <div>
                    <h4 className="text-xs font-black text-white leading-none">Support Portal</h4>
                    <span className="text-[9px] text-white/35 font-mono">Agent status: Active</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {/* Admin Gear toggle */}
                  <button
                    onClick={() => setShowAdmin(!showAdmin)}
                    className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 text-white/50 hover:text-white cursor-pointer transition-colors"
                  >
                    <Settings size={12} className={showAdmin ? "rotate-45" : ""} />
                  </button>
                  
                  {/* Close trigger */}
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 text-white/50 hover:text-white cursor-pointer transition-colors"
                  >
                    <X size={12} />
                  </button>
                </div>
              </div>

              {/* Admin Panel Swatch Options */}
              <AnimatePresence>
                {showAdmin && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="bg-[#0e1124] border-b border-white/5 px-4 py-2.5 flex items-center justify-between gap-4 font-mono text-[9px] font-bold"
                  >
                    <span className="text-white/40 uppercase">Theme Swatch:</span>
                    <div className="flex items-center gap-2">
                      {THEMES.map(theme => (
                        <button
                          key={theme.id}
                          onClick={() => setActiveTheme(theme)}
                          className="w-3.5 h-3.5 rounded-full cursor-pointer relative flex items-center justify-center active:scale-75 transition-transform"
                          style={{ backgroundColor: theme.color }}
                        >
                          {activeTheme.id === theme.id && (
                            <motion.div
                              layoutId="active-chat-swatch-ring"
                              className="absolute -inset-1 rounded-full border border-current opacity-80"
                              style={{ color: theme.color }}
                              transition={{ type: "spring", stiffness: 350, damping: 25 }}
                            />
                          )}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Message Feed Area */}
              <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3 scrollbar-none">
                {messages.map((msg, index) => {
                  const isAgent = msg.sender === "agent";
                  return (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, y: 15, scale: isAgent ? 1 : 1.05 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ type: "spring", stiffness: 260, damping: 22 }}
                      className={`flex flex-col max-w-[80%] ${
                        isAgent ? "self-start items-start" : "self-end items-end"
                      }`}
                    >
                      <div 
                        className={`px-3 py-2 rounded-2xl text-[11px] leading-relaxed border transition-all duration-300 ${
                          isAgent 
                            ? "bg-white/5 border-white/5 text-white/80 rounded-tl-sm"
                            : `text-black rounded-tr-sm border-transparent ${activeTheme.bg} ${activeTheme.glow}`
                        }`}
                      >
                        {msg.text}
                      </div>
                      <span className="text-[8px] text-white/20 mt-1 font-mono uppercase">
                        {isAgent ? "Agent" : "You"}
                      </span>
                    </motion.div>
                  );
                })}

                {/* Agent Typing Indicator */}
                <AnimatePresence>
                  {isAgentTyping && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="self-start flex flex-col items-start max-w-[80%]"
                    >
                      <div className="bg-white/5 border border-white/5 px-4 py-3 rounded-2xl rounded-tl-sm flex items-center gap-1">
                        <motion.span 
                          animate={{ y: [0, -4, 0] }}
                          transition={{ repeat: Infinity, duration: 0.6, delay: 0 }}
                          className="w-1.5 h-1.5 rounded-full bg-white/40" 
                        />
                        <motion.span 
                          animate={{ y: [0, -4, 0] }}
                          transition={{ repeat: Infinity, duration: 0.6, delay: 0.15 }}
                          className="w-1.5 h-1.5 rounded-full bg-white/40" 
                        />
                        <motion.span 
                          animate={{ y: [0, -4, 0] }}
                          transition={{ repeat: Infinity, duration: 0.6, delay: 0.3 }}
                          className="w-1.5 h-1.5 rounded-full bg-white/40" 
                        />
                      </div>
                      <span className="text-[8px] text-white/20 mt-1 font-mono uppercase">typing</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div ref={messagesEndRef} />
              </div>

              {/* Chat Input Footer Form */}
              <form 
                onSubmit={handleSend}
                className="p-3 border-t border-white/5 flex gap-2 items-center bg-black/10"
              >
                <input
                  type="text"
                  placeholder="Ask a question..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  className="flex-1 px-3 py-2 bg-white/[0.02] border border-white/5 rounded-2xl text-[11px] text-white placeholder-white/20 focus:outline-none focus:border-white/10 transition-colors"
                />

                <motion.button
                  type="submit"
                  disabled={!inputValue.trim()}
                  whileHover={inputValue.trim() ? { scale: 1.05 } : {}}
                  whileTap={inputValue.trim() ? { scale: 0.95 } : {}}
                  className={`w-8 h-8 rounded-full flex items-center justify-center cursor-pointer transition-colors duration-300 ${
                    inputValue.trim() 
                      ? `text-black ${activeTheme.bg} ${activeTheme.shadow}` 
                      : "bg-white/5 text-white/20 border border-white/5 cursor-not-allowed"
                  }`}
                >
                  <Send size={11} strokeWidth={2.5} />
                </motion.button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating Bubble Button */}
        <motion.button
          layoutId="chat-support-bubble"
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          className={`w-14 h-14 rounded-full flex items-center justify-center cursor-pointer shadow-[0_10px_25px_rgba(0,0,0,0.5)] transition-all duration-500 relative border ${
            isOpen 
              ? "bg-[#0a0d1a] border-white/10 text-white" 
              : `text-black border-transparent ${activeTheme.bg} ${activeTheme.glow} ${activeTheme.shadow}`
          }`}
        >
          {isOpen ? <X size={20} /> : <MessageSquare size={20} />}

          {/* New message notification orb */}
          {!isOpen && (
            <span className="absolute top-0.5 right-0.5 w-3 h-3 rounded-full bg-emerald-400 border-2 border-current animate-bounce" style={{ color: activeTheme.color }} />
          )}
        </motion.button>

      </div>
    </div>
  );
}
