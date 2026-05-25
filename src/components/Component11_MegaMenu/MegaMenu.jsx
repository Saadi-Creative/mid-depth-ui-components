import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Menu, Search, Settings, HelpCircle, 
  Terminal, Code2, Paintbrush, BookOpen, 
  Play, Users, ShieldCheck, Landmark, Globe, ChevronDown
} from "lucide-react";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// 5 Themes: Cyan, Purple, Orange, Magenta, Lime
const THEMES = [
  { id: "cyan", name: "Cyan", color: "#06b6d4", bg: "bg-cyan-500", text: "text-cyan-400", border: "border-cyan-500/20", hoverBg: "hover:bg-cyan-500/10", rawHoverBg: "rgba(6,182,212,0.06)" },
  { id: "purple", name: "Purple", color: "#a855f7", bg: "bg-purple-500", text: "text-purple-400", border: "border-purple-500/20", hoverBg: "hover:bg-purple-500/10", rawHoverBg: "rgba(168,85,247,0.06)" },
  { id: "orange", name: "Orange", color: "#f97316", bg: "bg-orange-500", text: "text-orange-400", border: "border-orange-500/20", hoverBg: "hover:bg-orange-500/10", rawHoverBg: "rgba(249,115,22,0.06)" },
  { id: "magenta", name: "Magenta", color: "#d946ef", bg: "bg-fuchsia-500", text: "text-fuchsia-400", border: "border-fuchsia-500/20", hoverBg: "hover:bg-fuchsia-500/10", rawHoverBg: "rgba(217,70,239,0.06)" },
  { id: "lime", name: "Lime", color: "#84cc16", bg: "bg-lime-500", text: "text-lime-400", border: "border-lime-500/20", hoverBg: "hover:bg-lime-500/10", rawHoverBg: "rgba(132,204,22,0.06)" },
];

const SubMenuItem = ({ title, desc, icon, theme }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative p-3 rounded-xl cursor-pointer flex items-start gap-3 z-10 transition-colors duration-200"
    >
      {/* Gliding magnetic pill highlight */}
      {hovered && (
        <motion.div
          layoutId="submenu-pill"
          className="absolute inset-0 rounded-xl -z-10"
          style={{ backgroundColor: theme.rawHoverBg }}
          transition={{ type: "spring", stiffness: 380, damping: 28 }}
        />
      )}
      <div className={cn("p-2 rounded-lg bg-white/5 text-white/70 transition-colors", hovered ? theme.text : "")}>
        {icon}
      </div>
      <div>
        <span className={cn("text-xs font-bold block text-white transition-colors", hovered ? theme.text : "")}>{title}</span>
        <span className="text-[10px] text-white/40 block mt-0.5">{desc}</span>
      </div>
    </div>
  );
};

const ProductsDropdown = ({ theme }) => (
  <div className="grid grid-cols-2 gap-4 w-[480px]">
    <SubMenuItem theme={theme} icon={<Terminal size={16} />} title="Developer API" desc="Automate actions via terminal access ports" />
    <SubMenuItem theme={theme} icon={<Code2 size={16} />} title="Component Compiler" desc="JSX & CSS templates for faster prototyping" />
    <SubMenuItem theme={theme} icon={<Paintbrush size={16} />} title="Visual Editor" desc="2.5D interface builder drag & drop UI" />
    <SubMenuItem theme={theme} icon={<HelpCircle size={16} />} title="Resource Hub" desc="Technical guides & standard manuals" />
  </div>
);

const ResourcesDropdown = ({ theme }) => (
  <div className="grid grid-cols-1 gap-2 w-[280px]">
    <SubMenuItem theme={theme} icon={<BookOpen size={16} />} title="API Manuals" desc="Full references logs & configurations" />
    <SubMenuItem theme={theme} icon={<Play size={16} />} title="Video Tutorials" desc="Micro-interactions setups explained" />
    <SubMenuItem theme={theme} icon={<Users size={16} />} title="Community Forum" desc="Share presets and setup codes" />
  </div>
);

const CompanyDropdown = ({ theme }) => (
  <div className="grid grid-cols-2 gap-4 w-[440px]">
    <SubMenuItem theme={theme} icon={<ShieldCheck size={16} />} title="Security SLA" desc="GDPR compliance and enterprise protocols" />
    <SubMenuItem theme={theme} icon={<Landmark size={16} />} title="Corporate Pillars" desc="Mission statements, values, and careers" />
    <SubMenuItem theme={theme} icon={<Globe size={16} />} title="Global Offices" desc="Geographic presence & support hubs" />
  </div>
);

export default function MegaMenu() {
  const [theme, setTheme] = useState(THEMES[0]); // Cyan default
  const [showSwatches, setShowSwatches] = useState(false);
  const [hoveredTab, setHoveredTab] = useState(null);
  const [tabCoords, setTabCoords] = useState({ left: 0, width: 0 });
  const navContainerRef = useRef(null);

  const TABS = [
    { id: "products", label: "Products", content: <ProductsDropdown theme={theme} /> },
    { id: "resources", label: "Resources", content: <ResourcesDropdown theme={theme} /> },
    { id: "company", label: "Company", content: <CompanyDropdown theme={theme} /> },
    { id: "pricing", label: "Pricing", content: null },
  ];

  const handleTabHover = (e, tabId) => {
    if (!navContainerRef.current) return;
    const containerRect = navContainerRef.current.getBoundingClientRect();
    const tabRect = e.currentTarget.getBoundingClientRect();
    
    setHoveredTab(tabId);
    setTabCoords({
      left: tabRect.left - containerRect.left,
      width: tabRect.width
    });
  };

  const handleMouseLeave = () => {
    setHoveredTab(null);
  };

  return (
    <div className="min-h-screen flex flex-col justify-start pt-16 p-4 md:p-8" style={{ background: "#060810" }}>
      
      {/* Mega-Menu Navigation Container */}
      <div 
        ref={navContainerRef}
        onMouseLeave={handleMouseLeave}
        className="w-full max-w-5xl mx-auto bg-[#0a0d1a] border border-white/5 rounded-2xl p-4 flex items-center justify-between relative"
      >
        
        {/* Logo */}
        <div className="flex items-center gap-2 relative z-50">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-white/5 border border-white/10">
            <Menu className="text-white/80" size={16} />
          </div>
          <div>
            <span className="text-xs text-white/40 block leading-none font-bold uppercase tracking-wider">Mega-Menu</span>
            <span className="text-sm font-black text-white">Component 11</span>
          </div>
        </div>

        {/* Center Links */}
        <div className="flex items-center gap-1 relative z-50">
          {TABS.map(tab => {
            const isActive = hoveredTab === tab.id;
            return (
              <button
                key={tab.id}
                onMouseEnter={(e) => handleTabHover(e, tab.id)}
                className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-white/60 hover:text-white cursor-pointer transition-colors relative"
              >
                {tab.label}
                {isActive && (
                  <motion.div 
                    layoutId="active-underline"
                    className={cn("absolute bottom-0 left-4 right-4 h-0.5 rounded-full", theme.bg)}
                    transition={{ type: "spring", stiffness: 380, damping: 28 }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-4 relative z-50">
          
          {/* Swatches Trigger Icon */}
          <div className="relative">
            <button
              onClick={() => setShowSwatches(prev => !prev)}
              className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:border-white/20 cursor-pointer transition-colors"
            >
              <Settings size={15} />
            </button>

            <AnimatePresence>
              {showSwatches && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute right-0 top-10 p-3 rounded-xl bg-[#0e1122] border border-white/10 shadow-2xl flex items-center gap-2 z-50"
                >
                  {THEMES.map(t => (
                    <button
                      key={t.id}
                      onClick={() => { setTheme(t); setShowSwatches(false); }}
                      className={cn(
                        "w-5 h-5 rounded-full cursor-pointer relative transition-transform hover:scale-110",
                      )}
                      style={{ backgroundColor: t.color }}
                    >
                      {theme.id === t.id && (
                        <motion.div
                          layoutId="menu-theme-outline"
                          className="absolute -inset-1 rounded-full border border-current opacity-60"
                          style={{ color: t.color }}
                        />
                      )}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <button 
            className={cn("px-4 py-2 rounded-xl text-xs font-bold text-white transition-all shadow-md cursor-pointer", theme.bg)}
            style={{ boxShadow: `0 4px 12px ${theme.color}30` }}
          >
            Access Console
          </button>
        </div>

        {/* Layout-morph Dropdown Background Panel */}
        <AnimatePresence>
          {hoveredTab && TABS.find(t => t.id === hoveredTab)?.content && (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.98, y: 5 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: 5 }}
              transition={{ type: "spring", stiffness: 350, damping: 28 }}
              className="absolute top-[72px] bg-[#0c0e1e] border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-40 p-5 origin-top"
              style={{ 
                left: tabCoords.left - 40,
                boxShadow: `0 20px 40px rgba(0,0,0,0.5), 0 0 1px ${theme.color}20` 
              }}
            >
              <motion.div layout="position" className="w-full h-full">
                {TABS.find(t => t.id === hoveredTab)?.content}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>

      <div className="w-full max-w-5xl mx-auto mt-16 text-center text-white/30 text-xs px-8 leading-relaxed">
        Hover over the "Products", "Resources", or "Company" header items in the navigation bar to watch the dropdown panel dynamically morph its dimensions using layout transitions. You can toggle colors in the settings cog.
      </div>

    </div>
  );
}
