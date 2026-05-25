import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, Activity, Settings, User, MessageCircle, Heart, Zap, CheckCircle2 } from "lucide-react";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// 5 Themes: Emerald, Sapphire Blue, Amethyst, Amber, Ruby
const THEMES = [
  { id: "emerald", color: "#10b981", name: "Emerald", ring: "ring-emerald-500/50", bg: "bg-emerald-500", text: "text-emerald-500", border: "border-emerald-500" },
  { id: "sapphire", color: "#3b82f6", name: "Sapphire Blue", ring: "ring-blue-500/50", bg: "bg-blue-500", text: "text-blue-500", border: "border-blue-500" },
  { id: "amethyst", color: "#a855f7", name: "Amethyst", ring: "ring-purple-500/50", bg: "bg-purple-500", text: "text-purple-500", border: "border-purple-500" },
  { id: "amber", color: "#f59e0b", name: "Amber", ring: "ring-amber-500/50", bg: "bg-amber-500", text: "text-amber-500", border: "border-amber-500" },
  { id: "ruby", color: "#f43f5e", name: "Ruby", ring: "ring-rose-500/50", bg: "bg-rose-500", text: "text-rose-500", border: "border-rose-500" },
];

const UnreadItem = ({ item, theme, delayIndex }) => {
  const [shake, setShake] = useState(false);

  useEffect(() => {
    // Elastic shake nudge if left unread for more than 5 seconds
    const timer = setTimeout(() => {
      setShake(true);
      const stopTimer = setTimeout(() => setShake(false), 820);
      return () => clearTimeout(stopTimer);
    }, 5000 + (delayIndex * 200));
    
    return () => clearTimeout(timer);
  }, [delayIndex]);

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0 }
      }}
      animate={shake ? { x: [0, -4, 4, -4, 4, -2, 2, 0], transition: { duration: 0.8, type: "spring", stiffness: 300 } } : {}}
      className={cn(
        "relative flex items-start gap-3 p-3 rounded-xl border border-white/5 bg-white/[0.02]",
        "hover:bg-white/[0.04] transition-colors"
      )}
    >
      <div className={cn("p-2 rounded-lg bg-white/5 text-white")}>
        {item.icon}
      </div>
      <div className="flex-1">
        <div className="flex justify-between items-center mb-1">
          <span className="text-sm font-semibold text-white">{item.title}</span>
          <span className="text-[10px] text-white/40">{item.time}</span>
        </div>
        <p className="text-xs text-white/60">{item.desc}</p>
      </div>
      {/* Unread indicator */}
      <div className={cn("w-2 h-2 rounded-full mt-1 flex-shrink-0", theme.bg, "shadow-[0_0_8px_currentColor]")} style={{ color: theme.color }}></div>
    </motion.div>
  );
};

const JellyToggle = ({ active, onChange, theme }) => {
  return (
    <button
      onClick={onChange}
      className={cn(
        "relative flex items-center w-11 h-6 rounded-full p-1 border cursor-pointer",
        active ? cn("border-transparent", theme.bg) : "border-white/10 bg-white/5"
      )}
      style={{
        boxShadow: active ? `0 0 12px ${theme.color}40` : "none"
      }}
    >
      <motion.div
        layout
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 20,
          mass: 0.8,
        }}
        whileTap={{ scaleX: 1.5, scaleY: 0.8 }}
        className="w-4 h-4 rounded-full bg-white shadow-sm"
        style={{
          originX: active ? 1 : 0
        }}
      />
    </button>
  );
};

export default function BentoNotificationCenter() {
  const [activeTheme, setActiveTheme] = useState(THEMES[1]); // Sapphire default
  
  const [toggles, setToggles] = useState({
    push: true,
    email: false,
    sms: true,
  });

  const bentoVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: { 
        type: "spring", 
        stiffness: 300, 
        damping: 30 
      }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6" style={{ background: "#060810" }}>
      <motion.div 
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-4 md:grid-rows-3 gap-4 auto-rows-[auto]"
      >
        
        {/* Top Left: Header / Theme Switcher (span 2 cols) */}
        <motion.div variants={bentoVariants} className="md:col-span-2 md:row-span-1 min-h-[140px] rounded-3xl p-6 relative overflow-hidden flex flex-col justify-between"
          style={{ background: "linear-gradient(145deg, rgba(16,20,44,0.6) 0%, rgba(8,10,22,0.8) 100%)", border: "1px solid rgba(255,255,255,0.06)", boxShadow: "0 10px 30px rgba(0,0,0,0.4)" }}
        >
          <div>
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <Bell className={activeTheme.text} size={24} />
              Notification Center
            </h2>
            <p className="text-white/50 text-sm mt-1">Manage your alerts and themes</p>
          </div>
          
          <div className="flex items-center gap-3 mt-4">
            {THEMES.map(theme => (
              <button 
                key={theme.id}
                onClick={() => setActiveTheme(theme)}
                className={cn(
                  "w-6 h-6 rounded-full cursor-pointer transition-all duration-300 relative",
                  activeTheme.id === theme.id ? "scale-125" : "hover:scale-110 opacity-60 hover:opacity-100"
                )}
                style={{ backgroundColor: theme.color, boxShadow: activeTheme.id === theme.id ? `0 0 15px ${theme.color}80` : 'none' }}
              >
                {activeTheme.id === theme.id && (
                  <motion.div 
                    layoutId="theme-ring"
                    className="absolute -inset-1.5 rounded-full border border-current opacity-40"
                    style={{ color: theme.color }}
                  />
                )}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Top Right: Status Panel */}
        <motion.div variants={bentoVariants} className="md:col-span-2 md:row-span-1 min-h-[140px] rounded-3xl p-6 relative overflow-hidden flex items-center gap-6"
          style={{ background: "linear-gradient(145deg, rgba(16,20,44,0.6) 0%, rgba(8,10,22,0.8) 100%)", border: "1px solid rgba(255,255,255,0.06)", boxShadow: "0 10px 30px rgba(0,0,0,0.4)" }}
        >
          {/* Scanning light-beam overlay on this container */}
          <motion.div 
            className="absolute inset-0 z-0 pointer-events-none opacity-20"
            animate={{ 
              x: ['-100%', '200%'],
            }}
            transition={{
              repeat: Infinity,
              duration: 4,
              ease: "linear",
              repeatDelay: 1
            }}
            style={{
              background: `linear-gradient(90deg, transparent, ${activeTheme.color}, transparent)`,
              width: '50%'
            }}
          />

          <div className="relative z-10 w-16 h-16 rounded-2xl flex items-center justify-center bg-white/5 border border-white/10 shrink-0">
            <Activity className={activeTheme.text} size={32} />
          </div>
          <div className="relative z-10">
            <div className="text-white/50 text-xs font-semibold uppercase tracking-wider mb-1">System Status</div>
            <div className="text-white text-lg sm:text-xl font-bold flex items-center gap-2">
              Systems Operational
              <CheckCircle2 className={activeTheme.text} size={20} />
            </div>
            <div className="text-white/40 text-sm mt-1 flex items-center gap-2">
              <div className={cn("w-2 h-2 rounded-full animate-pulse", activeTheme.bg)} />
              Last checked 2 mins ago
            </div>
          </div>
        </motion.div>

        {/* Middle/Bottom Left: Recent Notifications (span 2 cols, 2 rows) */}
        <motion.div variants={bentoVariants} className="md:col-span-2 md:row-span-2 min-h-[300px] rounded-3xl p-6 relative overflow-hidden flex flex-col"
          style={{ background: "linear-gradient(145deg, rgba(16,20,44,0.6) 0%, rgba(8,10,22,0.8) 100%)", border: "1px solid rgba(255,255,255,0.06)", boxShadow: "0 10px 30px rgba(0,0,0,0.4)" }}
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-white font-semibold">Recent Alerts</h3>
            <span className={cn("text-xs px-2 py-1 rounded-full bg-white/5", activeTheme.text)}>3 Unread</span>
          </div>
          
          <div className="flex flex-col gap-3 flex-1 overflow-y-auto pr-2" style={{ scrollbarWidth: 'none' }}>
            <UnreadItem 
              theme={activeTheme} delayIndex={0}
              item={{ icon: <MessageCircle size={18} />, title: "New Message", desc: "Sarah left a comment on your post.", time: "2m ago" }} 
            />
            <UnreadItem 
              theme={activeTheme} delayIndex={1}
              item={{ icon: <Heart size={18} />, title: "New Follower", desc: "Alex started following you.", time: "1h ago" }} 
            />
            <UnreadItem 
              theme={activeTheme} delayIndex={2}
              item={{ icon: <Zap size={18} />, title: "System Update", desc: "Version 2.4.1 has been installed.", time: "3h ago" }} 
            />
          </div>
        </motion.div>

        {/* Settings / Toggles */}
        <motion.div variants={bentoVariants} className="md:col-span-1 md:row-span-2 min-h-[300px] rounded-3xl p-6 relative overflow-hidden flex flex-col gap-6"
          style={{ background: "linear-gradient(145deg, rgba(16,20,44,0.6) 0%, rgba(8,10,22,0.8) 100%)", border: "1px solid rgba(255,255,255,0.06)", boxShadow: "0 10px 30px rgba(0,0,0,0.4)" }}
        >
           <h3 className="text-white font-semibold flex items-center gap-2">
            <Settings size={18} className={activeTheme.text} />
            Preferences
          </h3>

          <div className="flex flex-col gap-6 flex-1 justify-center">
            <div className="flex justify-between items-center">
              <div>
                <div className="text-sm text-white">Push Alerts</div>
                <div className="text-xs text-white/40">Browser alerts</div>
              </div>
              <JellyToggle theme={activeTheme} active={toggles.push} onChange={() => setToggles(p => ({...p, push: !p.push}))} />
            </div>
            
            <div className="flex justify-between items-center">
              <div>
                <div className="text-sm text-white">Email</div>
                <div className="text-xs text-white/40">Daily digest</div>
              </div>
              <JellyToggle theme={activeTheme} active={toggles.email} onChange={() => setToggles(p => ({...p, email: !p.email}))} />
            </div>

            <div className="flex justify-between items-center">
              <div>
                <div className="text-sm text-white">SMS Alerts</div>
                <div className="text-xs text-white/40">Critical only</div>
              </div>
              <JellyToggle theme={activeTheme} active={toggles.sms} onChange={() => setToggles(p => ({...p, sms: !p.sms}))} />
            </div>
          </div>
        </motion.div>

        {/* Profile Stats */}
        <motion.div variants={bentoVariants} className="md:col-span-1 md:row-span-2 min-h-[300px] rounded-3xl p-6 relative overflow-hidden flex flex-col justify-between"
          style={{ background: "linear-gradient(145deg, rgba(16,20,44,0.6) 0%, rgba(8,10,22,0.8) 100%)", border: "1px solid rgba(255,255,255,0.06)", boxShadow: "0 10px 30px rgba(0,0,0,0.4)" }}
        >
          <div className="flex justify-between items-start">
            <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
              <User size={24} className="text-white/70" />
            </div>
            <div className={cn("px-2 py-1 rounded text-xs font-bold bg-white/5", activeTheme.text)}>PRO</div>
          </div>
          
          <div className="mt-8">
            <div className="text-white/50 text-xs mb-1">Total Notifications</div>
            <div className="text-4xl font-black text-white tracking-tighter">
              1,284
            </div>
            <div className="mt-4 h-1 w-full bg-white/5 rounded-full overflow-hidden">
              <motion.div 
                className={cn("h-full", activeTheme.bg)}
                initial={{ width: 0 }}
                animate={{ width: "65%" }}
                transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
              />
            </div>
            <div className="text-[10px] text-white/40 mt-2 text-right">65% Capacity Used</div>
          </div>
        </motion.div>

      </motion.div>
    </div>
  );
}
