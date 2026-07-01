import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ChevronDown, Search, SlidersHorizontal, 
  RefreshCw, Check, Tag, X, ShoppingBag
} from "lucide-react";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

import { useGlobalTheme } from "../../themes/ThemeContext";

const FilterCategory = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="border-b border-current/10 py-4">
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="flex items-center justify-between w-full font-bold text-xs uppercase tracking-wider cursor-pointer"
      >
        {title}
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} className="opacity-40">
          <ChevronDown size={14} />
        </motion.div>
      </button>
      
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="pt-4 pb-2">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Checkbox Component with Path-Drawing Animation & Scale Pop
const FilterCheckbox = ({ checked, onChange, label, count, theme }) => {
  return (
    <div 
      onClick={onChange}
      className="flex items-center justify-between py-1.5 cursor-pointer group"
    >
      <div className="flex items-center gap-3">
        <motion.div
          animate={{ scale: checked ? 1.05 : 1 }}
          transition={{ type: "spring", stiffness: 450, damping: 15 }}
          className={cn(
            "w-5 h-5 rounded-lg border flex items-center justify-center transition-colors",
            checked ? cn("border-transparent", theme.bg) : "border-current/10 bg-current/5 group-hover:border-current/25"
          )}
          style={{
            boxShadow: checked ? `0 0 10px ${theme.color}40` : "none"
          }}
        >
          {checked && (
            <svg className="w-3.5 h-3.5 text-white stroke-current" viewBox="0 0 24 24" fill="none" strokeWidth="4">
              <motion.path
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          )}
        </motion.div>
        <span className={cn("text-xs transition-colors", checked ? "font-bold" : "opacity-60 group-hover:opacity-100")}>
          {label}
        </span>
      </div>
      {count && <span className="text-[10px] opacity-40 font-mono">{count}</span>}
    </div>
  );
};

export default function AdvancedFilterSidebar() {
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
      glow: `rgba(${rgb}, 0.25)`
    };
  }, [activeVariant]);

  const [search, setSearch] = useState("");
  const [price, setPrice] = useState(250); // Single input for standard slider representing Max price bound
  const [brands, setBrands] = useState({ logitech: true, razer: false, steelseries: true, corsair: false });
  const [categories, setCategories] = useState({ audio: true, keyboard: false, mice: true });
  const [activeTags, setActiveTags] = useState(["Mechanical", "RGB Lighting"]);

  const toggleBrand = (b) => setBrands(prev => ({ ...prev, [b]: !prev[b] }));
  const toggleCategory = (c) => setCategories(prev => ({ ...prev, [c]: !prev[c] }));

  const removeTag = (t) => {
    setActiveTags(prev => prev.filter(tag => tag !== t));
  };

  const handleReset = () => {
    setBrands({ logitech: false, razer: false, steelseries: false, corsair: false });
    setCategories({ audio: false, keyboard: false, mice: false });
    setPrice(500);
    setSearch("");
    setActiveTags([]);
  };

  return (
    <div className={`min-h-screen flex justify-start items-stretch relative overflow-x-hidden transition-colors duration-500 ${activeVariant.canvasClass}`}>
      
      {/* Search & Filter Sidebar Container */}
      <aside 
        className={`w-full max-w-[320px] flex flex-col justify-between relative border-r border-current/10 ${activeVariant.cardClass}`}
        style={{ boxShadow: activeVariant.id === "brutal" ? "none" : "inset -10px 0 30px rgba(0,0,0,0.05)" }}
      >
        
        {/* Sticky Header with Swatch Switcher */}
        <div className="sticky top-0 bg-transparent backdrop-blur-md border-b border-current/10 p-5 z-20 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <SlidersHorizontal className={theme.text} size={16} />
              <h3 className="font-bold text-sm">Advanced Filters</h3>
            </div>
            
            <button 
              onClick={handleReset}
              className="text-[10px] opacity-40 hover:opacity-100 flex items-center gap-1.5 cursor-pointer uppercase font-bold tracking-wider"
            >
              <RefreshCw size={10} />
              Reset
            </button>
          </div>
        </div>

        {/* Filters Scroll Area */}
        <div className="flex-1 overflow-y-auto px-5 py-2" style={{ scrollbarWidth: "none" }}>
          
          {/* Active Tags */}
          {activeTags.length > 0 && (
            <div className="py-4 border-b border-current/10">
              <span className="text-[10px] opacity-40 font-bold uppercase tracking-wider block mb-2">Active Badges</span>
              <div className="flex flex-wrap gap-1.5">
                {activeTags.map(tag => (
                  <div 
                    key={tag} 
                    className={cn("flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-bold border", theme.border)}
                    style={{ backgroundColor: `${theme.color}08` }}
                  >
                    <span>{tag}</span>
                    <button onClick={() => removeTag(tag)} className="opacity-40 hover:opacity-100 cursor-pointer">
                      <X size={10} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Search Field */}
          <div className="py-4 border-b border-current/10">
            <div className={`relative p-2 flex items-center gap-2 ${activeVariant.inputClass}`}>
              <Search className="opacity-40 shrink-0" size={14} />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search products..."
                className="bg-transparent border-none text-xs text-current placeholder-current/30 outline-none w-full"
              />
            </div>
          </div>

          {/* Expandable Category: Hardware */}
          <FilterCategory title="Categories">
            <FilterCheckbox theme={theme} checked={categories.audio} onChange={() => toggleCategory("audio")} label="Audio & Sound" count="12" />
            <FilterCheckbox theme={theme} checked={categories.keyboard} onChange={() => toggleCategory("keyboard")} label="Keyboards" count="8" />
            <FilterCheckbox theme={theme} checked={categories.mice} onChange={() => toggleCategory("mice")} label="Gaming Mice" count="24" />
          </FilterCategory>

          {/* Expandable Category: Brand */}
          <FilterCategory title="Brand">
            <FilterCheckbox theme={theme} checked={brands.logitech} onChange={() => toggleBrand("logitech")} label="Logitech G" count="18" />
            <FilterCheckbox theme={theme} checked={brands.razer} onChange={() => toggleBrand("razer")} label="Razer" count="14" />
            <FilterCheckbox theme={theme} checked={brands.steelseries} onChange={() => toggleBrand("steelseries")} label="SteelSeries" count="9" />
            <FilterCheckbox theme={theme} checked={brands.corsair} onChange={() => toggleBrand("corsair")} label="Corsair" count="11" />
          </FilterCategory>

          {/* Expandable Category: Price Slider */}
          <FilterCategory title="Price Range">
            <div className="py-2 flex flex-col gap-4">
              <div className="flex justify-between text-xs opacity-50 font-bold">
                <span>Min: $0</span>
                <span>Max: ${price}</span>
              </div>
              <div className="relative pt-1">
                {/* Neon glow track segment behind progress slider */}
                <div className="h-1.5 w-full bg-current/5 rounded-full relative">
                  <div 
                    className={cn("absolute h-full rounded-full transition-all duration-150", theme.bg)}
                    style={{ 
                      left: "0%", 
                      width: `${(price / 500) * 100}%`,
                      boxShadow: activeVariant.id === "brutal" ? "none" : `0 0 10px ${theme.color}` 
                    }}
                  />
                </div>
                <input
                  type="range"
                  min="0"
                  max="500"
                  value={price}
                  onChange={(e) => setPrice(parseInt(e.target.value))}
                  className="absolute top-1 inset-x-0 w-full h-1.5 opacity-0 cursor-pointer"
                />
              </div>
            </div>
          </FilterCategory>

        </div>

        {/* Footer Actions */}
        <div className="p-5 border-t border-current/10 bg-transparent">
          <button 
            className={cn("w-full py-3.5 rounded-xl font-bold transition-all shadow-md cursor-pointer text-white", theme.bg)}
            style={{ boxShadow: activeVariant.id === "brutal" ? "none" : `0 4px 15px ${theme.color}35` }}
          >
            Apply Active Filters
          </button>
        </div>

      </aside>

      {/* Mock Container for demo visibility */}
      <main className="flex-1 flex flex-col items-center justify-center p-8 text-center">
        <div className={`max-w-md p-6 ${activeVariant.cardClass}`}>
          <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-current/5 border border-current/10 mx-auto mb-4">
            <ShoppingBag className={theme.text} size={20} />
          </div>
          <h4 className="font-bold text-sm mb-2">Search Catalog Mock</h4>
          <p className="opacity-50 text-xs leading-relaxed">
            The sidebar includes accordion dropdown controls that expand/collapse smoothly. Adjusting the slider or clicking checked badges reflects updates instantly in the synchronized theme.
          </p>
        </div>
      </main>

    </div>
  );
}
