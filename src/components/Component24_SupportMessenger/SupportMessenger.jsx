import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, User, Monitor } from "lucide-react";
import { useGlobalTheme } from "../../themes/ThemeContext";

const INITIAL_MESSAGES = [
  { id: 1, sender: "agent", text: "Hey there! 👋 I am Cyber Assistant. How can I help you deploy your components today?" },
];

export default function SupportMessenger() {
  const { activeVariant } = useGlobalTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [inputValue, setInputValue] = useState("");
  const [isAgentTyping, setIsAgentTyping] = useState(false);

  const messagesEndRef = useRef(null);

  // Auto scroll messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isAgentTyping]);

  // Helper to convert hex to rgb string for inline rgba values
  const hexToRgb = (hex) => {
    if (!hex) return "0, 229, 255";
    const cleanHex = hex.replace("#", "");
    const r = parseInt(cleanHex.substring(0, 2), 16);
    const g = parseInt(cleanHex.substring(2, 4), 16);
    const b = parseInt(cleanHex.substring(4, 6), 16);
    return isNaN(r) || isNaN(g) || isNaN(b) ? "0, 229, 255" : `${r}, ${g}, ${b}`;
  };

  const rgbStr = hexToRgb(activeVariant.triggerColor);
  const activeTheme = {
    color: activeVariant.triggerColor,
    rgb: rgbStr,
    text: activeVariant.textClass,
    bg: "",
    hoverBg: "",
    accentBg: `rgba(${rgbStr}, 0.1)`,
    border: `rgba(${rgbStr}, 0.2)`,
    glow: `shadow-[0_0_15px_rgba(${rgbStr},0.3)]`
  };

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
    <div className={`min-h-screen relative overflow-hidden transition-colors duration-500 ${activeVariant.canvasClass}`}>
      
      {/* Centered Instructions in background canvas */}
      <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center select-none pointer-events-none opacity-40">
        <Monitor size={36} className="opacity-20 mb-3" />
        <h2 className="text-sm font-bold font-mono uppercase tracking-widest opacity-50">Floating Messenger</h2>
        <p className="text-xs opacity-35 max-w-xs mt-1 leading-relaxed">
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
              className={`w-[340px] h-[450px] flex flex-col overflow-hidden ${activeVariant.cardClass}`}
              style={{
                boxShadow: activeVariant.id === "brutal" ? "none" : "0 20px 50px rgba(0,0,0,0.6)"
              }}
            >
              {/* Header */}
              <div 
                className="px-4 py-3 flex items-center justify-between border-b border-current/5 relative z-10 transition-colors duration-300"
                style={{ background: `linear-gradient(180deg, rgba(${activeTheme.rgb},0.08) 0%, transparent 100%)` }}
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-current/5 border border-current/10 flex items-center justify-center relative">
                    <User size={14} className="opacity-60" />
                    <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-emerald-400 border border-current" />
                  </div>
                  <div>
                    <h4 className="text-xs font-black leading-none">Support Portal</h4>
                    <span className="text-[9px] opacity-35 font-mono">Agent status: Active</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {/* Close trigger */}
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-1.5 rounded-lg bg-current/5 hover:bg-current/10 border border-current/5 opacity-60 hover:opacity-100 cursor-pointer transition-colors"
                  >
                    <X size={12} />
                  </button>
                </div>
              </div>

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
                            ? "bg-current/5 border-current/5 opacity-85 rounded-tl-sm"
                            : `rounded-tr-sm border-transparent ${activeVariant.buttonClass} ${activeTheme.glow}`
                        }`}
                      >
                        {msg.text}
                      </div>
                      <span className="text-[8px] opacity-20 mt-1 font-mono uppercase">
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
                      <div className="bg-current/5 border border-current/5 px-4 py-3 rounded-2xl rounded-tl-sm flex items-center gap-1">
                        <motion.span 
                          animate={{ y: [0, -4, 0] }}
                          transition={{ repeat: Infinity, duration: 0.6, delay: 0 }}
                          className="w-1.5 h-1.5 rounded-full bg-current/40" 
                        />
                        <motion.span 
                          animate={{ y: [0, -4, 0] }}
                          transition={{ repeat: Infinity, duration: 0.6, delay: 0.15 }}
                          className="w-1.5 h-1.5 rounded-full bg-current/40" 
                        />
                        <motion.span 
                          animate={{ y: [0, -4, 0] }}
                          transition={{ repeat: Infinity, duration: 0.6, delay: 0.3 }}
                          className="w-1.5 h-1.5 rounded-full bg-current/40" 
                        />
                      </div>
                      <span className="text-[8px] opacity-20 mt-1 font-mono uppercase">typing</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div ref={messagesEndRef} />
              </div>

              {/* Chat Input Footer Form */}
              <form 
                onSubmit={handleSend}
                className="p-3 border-t border-current/5 flex gap-2 items-center bg-black/10"
              >
                <input
                  type="text"
                  placeholder="Ask a question..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  className={`flex-1 px-3 py-2 focus:outline-none transition-colors ${activeVariant.inputClass}`}
                />

                <motion.button
                  type="submit"
                  disabled={!inputValue.trim()}
                  whileHover={inputValue.trim() ? { scale: 1.05 } : {}}
                  whileTap={inputValue.trim() ? { scale: 0.95 } : {}}
                  className={`w-8 h-8 rounded-full flex items-center justify-center cursor-pointer transition-colors duration-300 ${
                    inputValue.trim() 
                      ? `${activeVariant.buttonClass} ${activeTheme.glow}` 
                      : "bg-current/5 opacity-20 border border-current/5 cursor-not-allowed"
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
              ? (activeVariant.mode === "dark" ? "bg-[#0a0d1a] border-white/10 text-white" : "bg-white border-slate-200 text-slate-900")
              : `border-transparent ${activeVariant.buttonClass} ${activeTheme.glow}`
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
