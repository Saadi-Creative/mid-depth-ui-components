import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Plus, X, Search, Hash, 
  HelpCircle, AlertTriangle, Check, Keyboard 
} from "lucide-react";

import { useGlobalTheme } from "../../themes/ThemeContext";

const AVAILABLE_TAGS = [
  "React", "TypeScript", "Next.js", "Tailwind CSS", "Framer Motion", 
  "GraphQL", "Node.js", "Vite", "Web Accessibility", "SEO Optimization", 
  "Rust", "WebAssembly", "Docker", "Kubernetes", "Serverless", 
  "PostgreSQL", "Redis", "Esbuild", "Design System", "Bento Grid", 
  "Neo-Brutalism", "E-commerce"
];

export default function MultiSelectTagInput() {
  const { activeVariant } = useGlobalTheme();
  const activeTheme = React.useMemo(() => {
    const hex = activeVariant.triggerColor || "#10b981";
    let rgb = "16, 185, 129";
    const match = hex.match(/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i);
    if (match) {
      rgb = `${parseInt(match[1], 16)}, ${parseInt(match[2], 16)}, ${parseInt(match[3], 16)}`;
    }
    return {
      id: activeVariant.id,
      name: activeVariant.name,
      color: hex,
      bg: "bg-[var(--theme-primary)]/10",
      border: "border-[var(--theme-primary)]/20",
      text: "text-[var(--theme-primary)]",
      ring: "focus-within:border-[var(--theme-primary)]/50 focus-within:ring-[var(--theme-primary)]/20",
      hoverBg: "hover:bg-[var(--theme-primary)]/10 hover:text-[var(--theme-primary)]",
      rawHoverBg: `rgba(${rgb}, 0.08)`,
      circleBg: hex,
      glow: "shadow-[var(--theme-primary)]/10"
    };
  }, [activeVariant]);

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
      className={`min-h-screen flex flex-col justify-start p-4 md:p-8 transition-colors duration-500  pt-[120px] pb-8 sm:pt-[120px] sm:pb-8 ${activeVariant.canvasClass}`}
    >
      <div className="w-full max-w-2xl mx-auto flex flex-col gap-6">
        
        {/* Bento Grid Header Block */}
        <div className={`p-6 flex flex-col gap-3 relative ${activeVariant.cardClass}`}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-[10px] font-mono tracking-widest opacity-40 uppercase block mb-1">
                Developer Admin Suite
              </span>
              <h1 
                className="text-xl md:text-2xl font-bold tracking-tight"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                Multi-Select Tag Input
              </h1>
            </div>
          </div>
          <p className="text-xs opacity-50 leading-relaxed">
            Configure project parameters by typing tags. Employs hardware-accelerated entry scales, keyboard directional auto-indexing, and a protective Backspace-shake deletion safeguard.
          </p>
        </div>

        {/* Input Control Box */}
        <div ref={containerRef} className="relative w-full flex flex-col">
          
          {/* Main Input Box container */}
          <div 
            onClick={() => inputRef.current?.focus()}
            className={`w-full p-3 flex flex-wrap gap-2 items-center cursor-text transition-all duration-200 ${activeVariant.inputClass} ${isFocused ? `ring-2 ring-offset-current ${activeTheme.ring}` : ""}`}
            style={{
              boxShadow: isFocused ? `0 0 16px ${activeTheme.color}15` : undefined
            }}
          >
            {/* Search/Tag Icon Indicator */}
            <div className="w-7 h-7 rounded-lg bg-current/5 flex items-center justify-center opacity-60 flex-shrink-0">
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
                          ? "bg-red-500/25 border-red-500/50 text-red-500"
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
                className="bg-transparent border-none text-xs text-current placeholder-current/30 focus:outline-none flex-1 min-w-[120px] py-1.5"
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
                className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-lg border border-transparent hover:border-current/10 active:scale-95 transition-all flex-shrink-0 cursor-pointer opacity-60 hover:opacity-100`}
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
                className={`absolute top-full left-0 right-0 z-40 mt-1 overflow-hidden p-2 flex flex-col gap-1 max-h-[220px] overflow-y-auto ${activeVariant.cardClass}`}
                style={{
                  boxShadow: `0 20px 40px rgba(0,0,0,0.15), 0 0 1px ${activeTheme.color}20`
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
                            : "opacity-60 hover:opacity-100"
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
                    className="w-full text-left px-3 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-between cursor-pointer opacity-60 hover:opacity-100"
                    style={{ backgroundColor: activeTheme.rawHoverBg }}
                  >
                    <span className="flex items-center gap-1.5">
                      <Plus size={13} style={{ color: activeTheme.color }} />
                      Create Custom Tag "{inputValue.trim()}"
                    </span>
                    <span className="text-[10px] opacity-40 font-mono">Enter</span>
                  </button>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Bento Guide / Interaction Instructions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          <div className={`p-4 flex gap-3 ${activeVariant.cardClass}`}>
            <div className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center text-red-400 flex-shrink-0 animate-pulse">
              <AlertTriangle size={14} />
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-xs font-bold leading-tight">Deletion Safeguard</span>
              <p className="text-[11px] opacity-50 leading-relaxed">
                Pressing <kbd className="px-1 py-0.5 rounded bg-current/5 font-mono text-[9px] opacity-75">Backspace</kbd> once when the field is empty vibrates the final tag (warning). Pressing it again safely deletes it.
              </p>
            </div>
          </div>

          <div className={`p-4 flex gap-3 ${activeVariant.cardClass}`}>
            <div className="w-8 h-8 rounded-lg bg-current/5 flex items-center justify-center opacity-60 flex-shrink-0">
              <Keyboard size={14} />
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-xs font-bold leading-tight">Keyboard Navigable</span>
              <p className="text-[11px] opacity-50 leading-relaxed">
                Use <kbd className="px-1 py-0.5 rounded bg-current/5 font-mono text-[9px] opacity-75">↓</kbd> / <kbd className="px-1 py-0.5 rounded bg-current/5 font-mono text-[9px] opacity-75">↑</kbd> to index available dropdown tag nodes and <kbd className="px-1 py-0.5 rounded bg-current/5 font-mono text-[9px] opacity-75">Enter</kbd> to commit selections.
              </p>
            </div>
          </div>

        </div>

        {/* Preset Suggestions Quick-Pills list (Aesthetic enhancement) */}
        <div className={`p-5 flex flex-col gap-3.5 ${activeVariant.cardClass}`}>
          <span className="text-xs font-bold uppercase tracking-wider opacity-40">
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
                      ? "bg-current/5 border-transparent opacity-20 cursor-not-allowed"
                      : `${activeVariant.buttonClass} text-current hover:text-current`
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
