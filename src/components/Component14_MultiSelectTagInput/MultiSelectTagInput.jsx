import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Plus, X, Search, Hash, 
  HelpCircle, AlertTriangle, Check, Keyboard 
} from "lucide-react";

// Theme swatches
const THEMES = [
  { id: "emerald", name: "Emerald", color: "#10b981", bg: "bg-emerald-500/10", border: "border-emerald-500/20", text: "text-emerald-400", ring: "focus-within:border-emerald-500/50 focus-within:ring-emerald-500/20", hoverBg: "hover:bg-emerald-500/10 hover:text-emerald-400", rawHoverBg: "rgba(16,185,129,0.08)", circleBg: "#10b981", glow: "shadow-emerald-500/10" },
  { id: "sapphire", name: "Sapphire", color: "#3b82f6", bg: "bg-blue-500/10", border: "border-blue-500/20", text: "text-blue-400", ring: "focus-within:border-blue-500/50 focus-within:ring-blue-500/20", hoverBg: "hover:bg-blue-500/10 hover:text-blue-400", rawHoverBg: "rgba(59,130,246,0.08)", circleBg: "#3b82f6", glow: "shadow-blue-500/10" },
  { id: "amethyst", name: "Amethyst", color: "#8b5cf6", bg: "bg-violet-500/10", border: "border-violet-500/20", text: "text-violet-400", ring: "focus-within:border-violet-500/50 focus-within:ring-violet-500/20", hoverBg: "hover:bg-violet-500/10 hover:text-violet-400", rawHoverBg: "rgba(139,92,246,0.08)", circleBg: "#8b5cf6", glow: "shadow-violet-500/10" },
  { id: "amber", name: "Amber", color: "#f59e0b", bg: "bg-amber-500/10", border: "border-amber-500/20", text: "text-amber-400", ring: "focus-within:border-amber-500/50 focus-within:ring-amber-500/20", hoverBg: "hover:bg-amber-500/10 hover:text-amber-400", rawHoverBg: "rgba(245,158,11,0.08)", circleBg: "#f59e0b", glow: "shadow-amber-500/10" },
  { id: "ruby", name: "Ruby", color: "#ef4444", bg: "bg-red-500/10", border: "border-red-500/20", text: "text-red-400", ring: "focus-within:border-red-500/50 focus-within:ring-red-500/20", hoverBg: "hover:bg-red-500/10 hover:text-red-400", rawHoverBg: "rgba(239,68,68,0.08)", circleBg: "#ef4444", glow: "shadow-red-500/10" },
];

const AVAILABLE_TAGS = [
  "React", "TypeScript", "Next.js", "Tailwind CSS", "Framer Motion", 
  "GraphQL", "Node.js", "Vite", "Web Accessibility", "SEO Optimization", 
  "Rust", "WebAssembly", "Docker", "Kubernetes", "Serverless", 
  "PostgreSQL", "Redis", "Esbuild", "Design System", "Bento Grid", 
  "Neo-Brutalism", "E-commerce"
];

export default function MultiSelectTagInput() {
  const [activeTheme, setActiveTheme] = useState(THEMES[0]);
  const [selectedTags, setSelectedTags] = useState(["React", "TypeScript", "Vite"]);
  const [inputValue, setInputValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [deleteWarningIndex, setDeleteWarningIndex] = useState(null);
  const [dropdownIndex, setDropdownIndex] = useState(-1);
  
  const containerRef = useRef(null);
  const inputRef = useRef(null);
  const dropdownRef = useRef(null);

  // Filter available suggestions (omit already selected tags)
  const suggestions = AVAILABLE_TAGS.filter(tag => 
    !selectedTags.includes(tag) && 
    tag.toLowerCase().includes(inputValue.toLowerCase())
  );

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsFocused(false);
        setDropdownIndex(-1);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Add Tag
  const handleAddTag = (tag) => {
    if (!selectedTags.includes(tag)) {
      setSelectedTags([...selectedTags, tag]);
    }
    setInputValue("");
    setDeleteWarningIndex(null);
    setDropdownIndex(-1);
    inputRef.current?.focus();
  };

  // Remove Tag
  const handleRemoveTag = (tagToRemove) => {
    setSelectedTags(selectedTags.filter(tag => tag !== tagToRemove));
    setDeleteWarningIndex(null);
  };

  // Handle Input KeyDown events (including custom Backspace warning vibration)
  const handleKeyDown = (e) => {
    // If backspace is pressed on empty input
    if (e.key === "Backspace" && inputValue === "") {
      if (selectedTags.length === 0) return;

      const lastIndex = selectedTags.length - 1;
      
      if (deleteWarningIndex === null) {
        // First backspace press: Warn state
        e.preventDefault();
        setDeleteWarningIndex(lastIndex);
      } else {
        // Second backspace press: Remove/Dissolve state
        handleRemoveTag(selectedTags[lastIndex]);
      }
    } else {
      // Clear warnings for other keys
      setDeleteWarningIndex(null);
    }

    // Keyboard navigation in suggestions list
    if (suggestions.length > 0) {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setDropdownIndex(prev => (prev + 1) % suggestions.length);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setDropdownIndex(prev => (prev - 1 + suggestions.length) % suggestions.length);
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (dropdownIndex >= 0 && dropdownIndex < suggestions.length) {
          handleAddTag(suggestions[dropdownIndex]);
        } else if (inputValue.trim()) {
          // Add custom tag if it doesn't exist
          handleAddTag(inputValue.trim());
        }
      } else if (e.key === "Escape") {
        setIsFocused(false);
        setDropdownIndex(-1);
        inputRef.current?.blur();
      }
    } else if (e.key === "Enter" && inputValue.trim()) {
      e.preventDefault();
      handleAddTag(inputValue.trim());
    }
  };

  return (
    <div 
      className="min-h-screen flex flex-col justify-start p-4 md:p-8" 
      style={{ background: "#060810", fontFamily: "'Inter', sans-serif" }}
    >
      <div className="w-full max-w-2xl mx-auto flex flex-col gap-6">
        
        {/* Bento Grid Header Block */}
        <div className="bg-[#0a0d1a] border border-white/5 rounded-2xl p-6 flex flex-col gap-3 relative shadow-[inset_0_2px_4px_rgba(0,0,0,0.6)]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-[10px] font-mono tracking-widest text-white/40 uppercase block mb-1">
                Developer Admin Suite
              </span>
              <h1 
                className="text-xl md:text-2xl font-bold text-white tracking-tight"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                Multi-Select Tag Input
              </h1>
            </div>
            
            {/* Color Swatch Trigger */}
            <div className="flex flex-col items-start sm:items-end gap-1.5">
              <span className="text-[9px] uppercase tracking-widest text-white/30 font-bold">
                Tag Sync Accent
              </span>
              <div className="flex items-center gap-2">
                {THEMES.map(theme => (
                  <button
                    key={theme.id}
                    onClick={() => {
                      setActiveTheme(theme);
                      setDeleteWarningIndex(null);
                    }}
                    className="w-5 h-5 rounded-full cursor-pointer relative flex items-center justify-center transition-transform active:scale-90"
                    style={{ backgroundColor: theme.circleBg }}
                    aria-label={`Switch to ${theme.name} palette`}
                  >
                    {activeTheme.id === theme.id && (
                      <motion.div
                        layoutId="active-tag-theme-border"
                        className="absolute -inset-1 rounded-full border border-current opacity-80"
                        style={{ color: theme.color }}
                        transition={{ type: "spring", stiffness: 350, damping: 28 }}
                      />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <p className="text-xs text-white/50 leading-relaxed">
            Configure project parameters by typing tags. Employs hardware-accelerated entry scales, keyboard directional auto-indexing, and a protective Backspace-shake deletion safeguard.
          </p>
        </div>

        {/* Input Control Box */}
        <div ref={containerRef} className="relative w-full flex flex-col">
          
          {/* Main Input Box container */}
          <div 
            onClick={() => inputRef.current?.focus()}
            className={`w-full bg-[#0a0d1a] border border-white/5 rounded-2xl p-3 flex flex-wrap gap-2 items-center cursor-text transition-all duration-200 ring-offset-current ${activeTheme.ring} ${isFocused ? `ring-2` : ""}`}
            style={{
              boxShadow: isFocused ? `0 0 16px ${activeTheme.color}15, inset 0 2px 4px rgba(0,0,0,0.6)` : "inset 0 2px 4px rgba(0,0,0,0.6)"
            }}
          >
            {/* Search/Tag Icon Indicator */}
            <div className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center text-white/40 flex-shrink-0">
              <Hash size={14} className={isFocused ? activeTheme.text : ""} />
            </div>

            {/* Selected Tags list with layout animations and Backspace shake */}
            <div className="flex flex-wrap gap-1.5 flex-1 min-w-[200px]">
              <AnimatePresence>
                {selectedTags.map((tag, index) => {
                  const isWarning = deleteWarningIndex === index;
                  return (
                    <motion.div
                      key={tag}
                      layout
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ 
                        scale: 1, 
                        opacity: 1,
                        x: isWarning ? [-4, 4, -4, 4, -2, 2, 0] : 0,
                      }}
                      exit={{ scale: 0.8, opacity: 0 }}
                      transition={{ 
                        x: isWarning 
                          ? { duration: 0.25, ease: "easeInOut" } 
                          : { type: "spring", stiffness: 450, damping: 25 }
                      }}
                      className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold border transition-colors ${
                        isWarning 
                          ? "bg-red-500/25 border-red-500/50 text-red-300"
                          : `${activeTheme.bg} ${activeTheme.border} ${activeTheme.text}`
                      }`}
                    >
                      <span>{tag}</span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemoveTag(tag);
                        }}
                        className="text-current opacity-60 hover:opacity-100 p-0.5 rounded cursor-pointer"
                        aria-label={`Remove tag ${tag}`}
                      >
                        <X size={10} />
                      </button>
                    </motion.div>
                  );
                })}
              </AnimatePresence>

              {/* Text Input area */}
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => {
                  setInputValue(e.target.value);
                  setDeleteWarningIndex(null);
                  setDropdownIndex(0); // Select first suggestion by default
                }}
                onKeyDown={handleKeyDown}
                onFocus={() => setIsFocused(true)}
                placeholder={selectedTags.length === 0 ? "Type feature tags..." : ""}
                className="bg-transparent border-none text-xs text-white placeholder-white/30 focus:outline-none flex-1 min-w-[120px] py-1.5"
                aria-label="Tags text entry"
              />
            </div>

            {/* Clear all tags button */}
            {selectedTags.length > 0 && (
              <button
                type="button"
                onClick={() => {
                  setSelectedTags([]);
                  setDeleteWarningIndex(null);
                }}
                className="text-white/30 hover:text-white/60 text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-lg border border-transparent hover:border-white/5 active:scale-95 transition-all flex-shrink-0 cursor-pointer"
              >
                Clear
              </button>
            )}
          </div>

          {/* Autocomplete Dropdown List Drawer */}
          <AnimatePresence>
            {isFocused && (inputValue.trim() !== "" || suggestions.length > 0) && (
              <motion.div
                ref={dropdownRef}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 4 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.15, ease: "easeOut" }}
                className="absolute top-full left-0 right-0 z-40 mt-1 bg-[#0c0e1e] border border-white/10 rounded-2xl shadow-2xl overflow-hidden p-2 flex flex-col gap-1 max-h-[220px] overflow-y-auto"
                style={{
                  boxShadow: `0 20px 40px rgba(0,0,0,0.5), 0 0 1px ${activeTheme.color}20`
                }}
              >
                {suggestions.length > 0 ? (
                  suggestions.map((tag, idx) => {
                    const isHovered = dropdownIndex === idx;
                    return (
                      <button
                        key={tag}
                        type="button"
                        onMouseEnter={() => setDropdownIndex(idx)}
                        onClick={() => handleAddTag(tag)}
                        className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium flex items-center justify-between cursor-pointer transition-all duration-100 ${
                          isHovered 
                            ? `${activeTheme.bg} ${activeTheme.text}` 
                            : "text-white/60 hover:text-white"
                        }`}
                        style={{
                          backgroundColor: isHovered ? activeTheme.rawHoverBg : "transparent"
                        }}
                      >
                        <span className="flex items-center gap-2">
                          <Hash size={12} className="opacity-40" />
                          {tag}
                        </span>
                        {isHovered && <Check size={12} />}
                      </button>
                    );
                  })
                ) : (
                  <button
                    type="button"
                    onClick={() => handleAddTag(inputValue.trim())}
                    className="w-full text-left px-3 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-between cursor-pointer text-white/50 hover:text-white"
                    style={{ backgroundColor: activeTheme.rawHoverBg }}
                  >
                    <span className="flex items-center gap-1.5">
                      <Plus size={13} style={{ color: activeTheme.color }} />
                      Create Custom Tag "{inputValue.trim()}"
                    </span>
                    <span className="text-[10px] text-white/30 font-mono">Enter</span>
                  </button>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Bento Guide / Interaction Instructions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          <div className="bg-[#0a0d1a] border border-white/5 rounded-2xl p-4 flex gap-3 shadow-[inset_0_2px_4px_rgba(0,0,0,0.6)]">
            <div className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center text-red-400 flex-shrink-0">
              <AlertTriangle size={14} />
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-xs font-bold text-white leading-tight">Deletion Safeguard</span>
              <p className="text-[11px] text-white/50 leading-relaxed">
                Pressing <kbd className="px-1 py-0.5 rounded bg-white/5 font-mono text-[9px] text-white/70">Backspace</kbd> once when the field is empty vibrates the final tag (warning). Pressing it again safely deletes it.
              </p>
            </div>
          </div>

          <div className="bg-[#0a0d1a] border border-white/5 rounded-2xl p-4 flex gap-3 shadow-[inset_0_2px_4px_rgba(0,0,0,0.6)]">
            <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-white/40 flex-shrink-0">
              <Keyboard size={14} />
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-xs font-bold text-white leading-tight">Keyboard Navigable</span>
              <p className="text-[11px] text-white/50 leading-relaxed">
                Use <kbd className="px-1 py-0.5 rounded bg-white/5 font-mono text-[9px] text-white/70">↓</kbd> / <kbd className="px-1 py-0.5 rounded bg-white/5 font-mono text-[9px] text-white/70">↑</kbd> to index available dropdown tag nodes and <kbd className="px-1 py-0.5 rounded bg-white/5 font-mono text-[9px] text-white/70">Enter</kbd> to commit selections.
              </p>
            </div>
          </div>

        </div>

        {/* Preset Suggestions Quick-Pills list (Aesthetic enhancement) */}
        <div className="bg-[#0a0d1a] border border-white/5 rounded-2xl p-5 flex flex-col gap-3.5 shadow-[inset_0_2px_4px_rgba(0,0,0,0.6)]">
          <span className="text-xs font-bold uppercase tracking-wider text-white/40">
            Suggested Tech Categories
          </span>
          <div className="flex flex-wrap gap-2">
            {AVAILABLE_TAGS.slice(0, 8).map(tag => {
              const isSelected = selectedTags.includes(tag);
              return (
                <button
                  key={tag}
                  disabled={isSelected}
                  onClick={() => handleAddTag(tag)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-all active:scale-95 flex items-center gap-1.5 cursor-pointer ${
                    isSelected
                      ? "bg-white/5 border-white/5 text-white/20 cursor-not-allowed"
                      : "bg-[#0e1122] border-white/5 text-white/60 hover:text-white hover:border-white/10"
                  }`}
                >
                  <Plus size={10} className={isSelected ? "opacity-20" : ""} />
                  {tag}
                </button>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
