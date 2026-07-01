import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Check, ArrowRight, Globe, Info } from "lucide-react";
import { useGlobalTheme } from "../../themes/ThemeContext";

// Inline Brand SVGs to prevent dependency/bundler export mismatches
const GithubIcon = ({ size }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor">
    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.138 20.164 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
  </svg>
);

const TwitterIcon = ({ size }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

const LinkedinIcon = ({ size }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor">
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
  </svg>
);

const SlackIcon = ({ size }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor">
    <path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523 2.528 2.528 0 0 1-2.522-2.523 2.528 2.528 0 0 1 2.522-2.52h2.52v2.52zm1.261 0a2.528 2.528 0 0 1 2.52-2.52h5.043a2.528 2.528 0 0 1 2.522 2.52v5.042a2.528 2.528 0 0 1-2.522 2.52H8.823a2.528 2.528 0 0 1-2.52-2.52v-5.042zM8.823 5.043a2.528 2.528 0 0 1-2.52-2.52A2.528 2.528 0 0 1 8.823 0a2.528 2.528 0 0 1 2.52 2.523v2.52h-2.52zm0 1.261a2.528 2.528 0 0 1 2.52 2.52v5.043a2.528 2.528 0 0 1-2.52 2.522H3.78a2.528 2.528 0 0 1-2.52-2.522V8.824a2.528 2.528 0 0 1 2.52-2.52h5.043zm10.135 3.761a2.528 2.528 0 0 1 2.52-2.52 2.528 2.528 0 0 1 2.522 2.52 2.528 2.528 0 0 1-2.522 2.52h-2.52v-2.52zm-1.262 0a2.528 2.528 0 0 1-2.52 2.52h-5.043a2.528 2.528 0 0 1-2.522-2.52V3.78a2.528 2.528 0 0 1 2.522-2.52h5.043a2.528 2.528 0 0 1 2.52 2.52v5.043zm-3.761 10.135a2.528 2.528 0 0 1 2.52 2.52 2.528 2.528 0 0 1-2.52 2.522 2.528 2.528 0 0 1-2.52-2.522v-2.52h2.52zm0-1.262a2.528 2.528 0 0 1-2.52-2.52v-5.043a2.528 2.528 0 0 1 2.52-2.522h5.043a2.528 2.528 0 0 1 2.52 2.522v5.043a2.528 2.528 0 0 1-2.52 2.52h-5.043z"/>
  </svg>
);

export default function MegaFooter() {
  const { activeVariant } = useGlobalTheme();
  const [email, setEmail] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email.trim() || isLoading) return;
    
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setSubscribed(true);
    }, 1200);
  };

  return (
    <div 
      className={`min-h-screen relative flex flex-col justify-between transition-colors duration-500 py-12 ${activeVariant.canvasClass} font-secondary`}
    >
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff01_1px,transparent_1px),linear-gradient(to_bottom,#ffffff01_1px,transparent_1px)] bg-[size:30px_30px] pointer-events-none" />
      
      {/* Content Spacer representing main landing page body */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center max-w-xl mx-auto gap-4">
        <div className="p-3 bg-white/5 border border-white/10 rounded-2xl shadow-xl">
          <Info size={24} className="opacity-60 mx-auto" />
        </div>
        <h2 className="text-sm font-mono-theme font-bold uppercase tracking-widest opacity-80">Main Landing Page Body</h2>
        <p className="text-xs opacity-50 leading-relaxed font-secondary">
          Scroll down to inspect the Dynamic Mega Footer. It features individual card-styled sitemap columns, a theme-toggle controller, and an input orbiting tracer line on focus.
        </p>
      </div>

      {/* Dynamic Mega Footer */}
      <footer className={`w-full border-t border-current/10 pt-16 pb-8 px-6 md:px-12 relative overflow-hidden z-10 shadow-[0_-20px_50px_rgba(0,0,0,0.5)]`}>
        {/* Ambient background glow under the active theme */}
        <div 
          className="absolute -bottom-48 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full blur-[150px] pointer-events-none transition-all duration-700 opacity-20"
          style={{ backgroundColor: activeVariant.triggerColor }}
        />

        <div className="max-w-6xl mx-auto flex flex-col gap-12 relative z-10">
          
          {/* Top Panel: Swatches & Brand Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-8 border-b border-current/10">
            {/* Brand Header Only */}
            <div className="flex items-center gap-2">
              <Globe size={18} style={{ color: activeVariant.triggerColor }} className="transition-colors duration-500" />
              <span className="text-sm font-black tracking-wider font-primary text-current">VESSEL.STUDIO</span>
            </div>
          </div>

          {/* Grid Layout: Sitemap Links & Newsletter */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Sitemap Columns */}
            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-5">
              <FooterColumn title="Platform" links={["Core System", "Spring Physics", "Themes Swatch", "Preview Library"]} activeVariant={activeVariant} />
              <FooterColumn title="Docs" links={["Getting Started", "Configurators", "Data Grids", "Changelogs"]} activeVariant={activeVariant} />
              <FooterColumn title="Resources" links={["Community Forum", "GitHub Source", "Vessel Terminal", "Status Nodes"]} activeVariant={activeVariant} />
            </div>

            {/* Newsletter Subscription Box card */}
            <div className={`lg:col-span-4 p-6 relative overflow-hidden transition-all duration-300 min-h-[220px] flex flex-col justify-between ${activeVariant.cardClass}`}>
              
              <AnimatePresence mode="wait">
                {subscribed ? (
                  /* Liquid-ripple Success Container expanding smoothly */
                  <motion.div
                    initial={{ clipPath: "circle(0% at 85% 85%)", opacity: 0 }}
                    animate={{ clipPath: "circle(150% at 85% 85%)", opacity: 1 }}
                    exit={{ clipPath: "circle(0% at 85% 85%)", opacity: 0 }}
                    transition={activeVariant.transition}
                    className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center p-6 bg-emerald-500/10"
                  >
                    <div className="w-12 h-12 rounded-full flex items-center justify-center mb-3 border border-emerald-500/20 bg-emerald-500/10">
                      <Check size={22} className="text-emerald-400" />
                    </div>
                    <h4 className="text-xs font-black uppercase font-mono-theme tracking-widest">Subscribed</h4>
                    <span className="text-[10px] opacity-60 mt-1 leading-relaxed px-4 font-mono-theme">
                      Nodes deployed successfully. Welcome to VESSEL network updates.
                    </span>
                    <button
                      onClick={() => { setSubscribed(false); setEmail(""); }}
                      className="text-[9px] uppercase font-bold opacity-40 hover:opacity-85 mt-4 underline cursor-pointer transition-colors"
                    >
                      Reset Channel
                    </button>
                  </motion.div>
                ) : (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="h-full flex flex-col justify-between gap-4"
                  >
                    <div>
                      <h4 className="text-xs font-black uppercase font-mono-theme tracking-wider flex items-center gap-1.5 font-primary">
                        <Mail size={12} style={{ color: activeVariant.triggerColor }} className="transition-colors duration-500" />
                        Broadcasting Node
                      </h4>
                      <p className="text-[10px] opacity-60 leading-relaxed mt-2.5 font-secondary">
                        Subscribe to get latest design logs, kinetic parameters, and source code downloads.
                      </p>
                    </div>

                    {/* Subscription Form */}
                    <form onSubmit={handleSubscribe} className="flex gap-2 items-center relative">
                      <div className="flex-1 relative flex items-center overflow-hidden" style={{ borderRadius: "var(--theme-border-radius-action)" }}>
                        <input
                          type="email"
                          required
                          placeholder="vessel@domain.com"
                          value={email}
                          onFocus={() => setIsFocused(true)}
                          onBlur={() => setIsFocused(false)}
                          onChange={(e) => setEmail(e.target.value)}
                          className={`w-full h-10 px-3.5 text-[11px] focus:outline-none transition-all ${activeVariant.inputClass}`}
                        />

                        {/* Orbiting Tracer SVG Overlay on Focus */}
                        {isFocused && activeVariant.id !== "brutal" && activeVariant.id !== "mono" && (
                          <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible" style={{ borderRadius: "var(--theme-border-radius-action)" }}>
                            <rect
                              x="0"
                              y="0"
                              width="100%"
                              height="100%"
                              rx="11"
                              fill="none"
                              stroke={activeVariant.triggerColor}
                              strokeWidth="2"
                              strokeDasharray="40 180"
                              style={{
                                strokeDashoffset: 0,
                                animation: "orbit-tracer-global 2.5s linear infinite"
                              }}
                            />
                          </svg>
                        )}
                      </div>

                      <button
                        type="submit"
                        disabled={isLoading}
                        className={`h-10 px-3.5 flex items-center justify-center font-bold font-mono-theme text-[9px] uppercase tracking-wider cursor-pointer transition-colors duration-300 ${activeVariant.buttonClass}`}
                        style={{
                          borderRadius: "var(--theme-border-radius-action)"
                        }}
                      >
                        <ArrowRight size={13} />
                      </button>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>

          {/* Bottom Panel: Copyright & Socials */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-8 border-t border-current/10 mt-4 text-[10px] font-mono-theme opacity-40">
            <span>© 2026 VESSEL. INC. ALL RIGHTS RESERVED.</span>
            
            {/* Social media icons */}
            <div className="flex items-center gap-3">
              <SocialIcon Icon={GithubIcon} activeVariant={activeVariant} />
              <SocialIcon Icon={TwitterIcon} activeVariant={activeVariant} />
              <SocialIcon Icon={LinkedinIcon} activeVariant={activeVariant} />
              <SocialIcon Icon={SlackIcon} activeVariant={activeVariant} />
            </div>
          </div>

        </div>
      </footer>

      <style>{`
        @keyframes orbit-tracer-global {
          0% {
            stroke-dashoffset: 0;
          }
          100% {
            stroke-dashoffset: -220;
          }
        }
      `}</style>
    </div>
  );
}

/* Sitemap Column Card Component */
function FooterColumn({ title, links, activeVariant }) {
  return (
    <div className={`p-5 flex flex-col gap-4 transition-all duration-300 ${activeVariant.cardClass}`}>
      <h4 className="text-[10px] font-black uppercase font-mono-theme tracking-widest opacity-40 border-b border-current/5 pb-2 font-primary">{title}</h4>
      <ul className="flex flex-col gap-2.5">
        {links.map((link, idx) => (
          <li key={idx}>
            <LinkItem label={link} activeVariant={activeVariant} />
          </li>
        ))}
      </ul>
    </div>
  );
}

/* Link Item with underlines on hover */
function LinkItem({ label, activeVariant }) {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href="#"
      onClick={(e) => e.preventDefault()}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="text-xs opacity-60 hover:opacity-100 transition-colors relative pb-1 block w-fit cursor-pointer font-secondary"
    >
      <span>{label}</span>
      <span className="absolute bottom-0 left-0 right-0 h-[1px] opacity-10 bg-current" />
      <motion.span
        className="absolute bottom-0 left-0 right-0 h-[2px]"
        style={{ 
          backgroundColor: activeVariant.triggerColor,
          originX: 0
        }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: hovered ? 1 : 0 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
      />
    </a>
  );
}

/* Social Icon Bounce Trigger with Theme Colors */
function SocialIcon({ Icon, activeVariant }) {
  const [hovered, setHovered] = useState(false);
  
  return (
    <motion.a
      href="#"
      onClick={(e) => e.preventDefault()}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileHover={{ scale: 1.1, y: -2 }}
      transition={activeVariant.transition}
      className={`p-2.5 border cursor-pointer transition-all duration-300 ${
        hovered ? "" : "border-current/10"
      }`}
      style={{ 
        borderColor: hovered ? activeVariant.triggerColor : undefined,
        color: hovered ? activeVariant.triggerColor : undefined,
        borderRadius: "var(--theme-border-radius-action)"
      }}
    >
      <Icon size={13} />
    </motion.a>
  );
}
