import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useSpring } from "framer-motion";
import { 
  Server, Search, ArrowUpDown, RefreshCw, Cpu, 
  Wifi, SlidersHorizontal, Trash2, CheckCircle2, 
  AlertTriangle, XCircle, ChevronDown, Activity, Play, Terminal
} from "lucide-react";

import { useGlobalTheme } from "../../themes/ThemeContext";

// Initial mock data for nodes
const INITIAL_NODES = [
  { id: "SRV-101", name: "us-east.core-ingress", status: "active", cpu: 42, memory: 58, traffic: 340.5, uptime: "99.99%", region: "N. Virginia", disk: "34%" },
  { id: "SRV-102", name: "eu-west.auth-db", status: "active", cpu: 18, memory: 88, traffic: 120.4, uptime: "99.95%", region: "Frankfurt", disk: "72%" },
  { id: "SRV-103", name: "ap-south.api-gateway", status: "warning", cpu: 84, memory: 76, traffic: 620.1, uptime: "99.85%", region: "Mumbai", disk: "48%" },
  { id: "SRV-104", name: "us-west.k8s-worker-01", status: "active", cpu: 65, memory: 44, traffic: 890.3, uptime: "99.98%", region: "Oregon", disk: "29%" },
  { id: "SRV-105", name: "sa-east.cdn-edge", status: "degraded", cpu: 96, memory: 92, traffic: 45.8, uptime: "98.45%", region: "São Paulo", disk: "89%" },
  { id: "SRV-106", name: "us-east.redis-cache", status: "active", cpu: 28, memory: 35, traffic: 1405.2, uptime: "100%", region: "N. Virginia", disk: "12%" },
  { id: "SRV-107", name: "eu-central.logger-daemon", status: "active", cpu: 32, memory: 61, traffic: 95.1, uptime: "99.91%", region: "Frankfurt", disk: "66%" },
  { id: "SRV-108", name: "ap-northeast.ai-inference", status: "warning", cpu: 79, memory: 94, traffic: 110.6, uptime: "99.70%", region: "Tokyo", disk: "81%" }
];

export default function KineticDataGrid() {
  const { activeVariant } = useGlobalTheme();
  const activeTheme = React.useMemo(() => {
    const hex = activeVariant.triggerColor || "#00e5ff";
    let rgb = "0, 229, 255";
    const match = hex.match(/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i);
    if (match) {
      rgb = `${parseInt(match[1], 16)}, ${parseInt(match[2], 16)}, ${parseInt(match[3], 16)}`;
    }
    return {
      id: activeVariant.id,
      name: activeVariant.name,
      color: hex,
      rgb: rgb,
      accentBg: `rgba(${rgb}, 0.1)`,
      glowText: `shadow-[0_0_12px_rgba(${rgb},0.4)]`
    };
  }, [activeVariant]);

  const [nodes, setNodes] = useState(INITIAL_NODES);
  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState("id");
  const [sortAsc, setSortAsc] = useState(true);
  const [selectedIds, setSelectedIds] = useState([]);
  const [expandedId, setExpandedId] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Trigger grid refresh animation
  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      // Simulate slight variation in CPU/memory loads
      setNodes(prev => prev.map(node => ({
        ...node,
        cpu: Math.max(10, Math.min(99, Math.round(node.cpu + (Math.random() * 20 - 10)))),
        memory: Math.max(15, Math.min(98, Math.round(node.memory + (Math.random() * 10 - 5)))),
        traffic: parseFloat((node.traffic + (Math.random() * 50 - 25)).toFixed(1))
      })));
      setIsRefreshing(false);
    }, 800);
  };

  // Sorting logic
  const handleSort = (field) => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(true);
    }
  };

  // Selection handlers
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedIds(filteredNodes.map(n => n.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectOne = (id) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  // Batch action executions
  const handleBatchDelete = () => {
    setNodes(prev => prev.filter(n => !selectedIds.includes(n.id)));
    setSelectedIds([]);
  };

  const handleBatchReboot = () => {
    alert(`Rebooting servers: ${selectedIds.join(", ")}`);
    setSelectedIds([]);
  };

  // Filter & sort data
  const filteredNodes = nodes.filter(node => 
    node.name.toLowerCase().includes(search.toLowerCase()) ||
    node.id.toLowerCase().includes(search.toLowerCase()) ||
    node.region.toLowerCase().includes(search.toLowerCase())
  );

  const sortedNodes = [...filteredNodes].sort((a, b) => {
    let aVal = a[sortField];
    let bVal = b[sortField];
    if (typeof aVal === "string") {
      return sortAsc ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
    }
    return sortAsc ? aVal - bVal : bVal - aVal;
  });

  return (
    <div className={`min-h-screen flex flex-col justify-start p-4 md:p-8 select-none transition-colors duration-500 ${activeVariant.canvasClass}`}>
      
      <div className="w-full max-w-6xl mx-auto flex flex-col gap-6">
        
        {/* Header Control Panel */}
        <div className={`p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 ${activeVariant.cardClass}`}>
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-mono tracking-widest opacity-40 uppercase block">
              SYSTEM CONTROL UNIT
            </span>
            <h1 className="text-xl md:text-2xl font-black tracking-tight"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Elevated 2.5D Kinetic Data Grid
            </h1>
            <p className="text-xs opacity-45 max-w-xl">
              A high-tech monitoring table with spring-loaded physical layout transitions, Z-axis hover lifting, and interactive SVG node diagnostics.
            </p>
          </div>

          {/* Refresh button */}
          <div className="flex items-center gap-4 flex-shrink-0 self-end md:self-auto">
            <motion.button
              onClick={handleRefresh}
              whileHover={{ scale: 1.05, y: -1 }}
              whileTap={{ scale: 0.95 }}
              className={`p-2.5 rounded-xl border flex items-center justify-center cursor-pointer ${activeVariant.buttonClass}`}
            >
              <RefreshCw size={14} className={isRefreshing ? "animate-spin" : ""} />
            </motion.button>
          </div>
        </div>

        {/* Search & Actions Bar */}
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full">
          <div className="relative flex-1 w-full">
            <span className="absolute inset-y-0 left-3 flex items-center opacity-30 pointer-events-none">
              <Search size={14} />
            </span>
            <input
              type="text"
              placeholder="Search by Node ID, Hostname, or Location..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className={`w-full pl-9 pr-4 py-2.5 focus:outline-none transition-all font-mono ${activeVariant.inputClass}`}
            />
          </div>
          
          <button className="px-4 py-2.5 rounded-xl bg-current/5 border border-current/5 opacity-60 hover:opacity-100 text-xs font-bold font-mono flex items-center gap-2 cursor-pointer transition-colors w-full sm:w-auto justify-center">
            <SlidersHorizontal size={13} />
            Filter Nodes
          </button>
        </div>

        {/* Custom Data Grid Table */}
        <div className="w-full overflow-visible rounded-2xl relative" style={{ perspective: "1000px" }}>
          
          {/* Header Row */}
          <div className="grid grid-cols-12 gap-2 px-6 py-3 text-[10px] uppercase font-bold tracking-widest opacity-40 border-b border-current/5 mb-2 font-mono">
            <div className="col-span-1 flex items-center">
              <input
                type="checkbox"
                onChange={handleSelectAll}
                checked={filteredNodes.length > 0 && selectedIds.length === filteredNodes.length}
                className="w-3.5 h-3.5 rounded border-current/20 bg-current/5 text-cyan-500 focus:ring-0 focus:ring-offset-0 cursor-pointer"
              />
            </div>
            
            <div className="col-span-2 flex items-center gap-1 cursor-pointer hover:opacity-100 transition-colors" onClick={() => handleSort("id")}>
              NODE ID
              <ArrowUpDown size={10} />
            </div>

            <div className="col-span-3 flex items-center gap-1 cursor-pointer hover:opacity-100 transition-colors" onClick={() => handleSort("name")}>
              HOSTNAME
              <ArrowUpDown size={10} />
            </div>

            <div className="col-span-2 flex items-center gap-1 cursor-pointer hover:opacity-100 transition-colors" onClick={() => handleSort("status")}>
              STATUS
              <ArrowUpDown size={10} />
            </div>

            <div className="col-span-2 flex items-center gap-1 cursor-pointer hover:opacity-100 transition-colors justify-end" onClick={() => handleSort("cpu")}>
              CPU LOAD
              <ArrowUpDown size={10} />
            </div>

            <div className="col-span-2 flex items-center justify-end">
              METRICS & DIAGS
            </div>
          </div>

          {/* Table Body (Framer Motion List) */}
          <div className="flex flex-col gap-2.5 min-h-[200px]">
            <AnimatePresence initial={false}>
              {sortedNodes.map((node, index) => (
                <DataGridRow
                  key={node.id}
                  node={node}
                  index={index}
                  activeTheme={activeTheme}
                  activeVariant={activeVariant}
                  isSelected={selectedIds.includes(node.id)}
                  isExpanded={expandedId === node.id}
                  onSelect={() => handleSelectOne(node.id)}
                  onToggleExpand={() => setExpandedId(expandedId === node.id ? null : node.id)}
                />
              ))}
            </AnimatePresence>

            {sortedNodes.length === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className={`w-full py-16 flex flex-col items-center justify-center ${activeVariant.cardClass}`}
              >
                <Server size={32} className="opacity-20 mb-3" />
                <p className="text-xs opacity-50 font-mono">No active cluster nodes match query</p>
              </motion.div>
            )}
          </div>
        </div>

        {/* Floating Batch Actions Tray */}
        <AnimatePresence>
          {selectedIds.length > 0 && (
            <motion.div
              initial={{ y: 80, opacity: 0, scale: 0.95 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 80, opacity: 0, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 260, damping: 25 }}
              className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 p-4 border rounded-2xl flex items-center justify-between gap-6 min-w-[340px] md:min-w-[460px]"
              style={{
                background: activeVariant.mode === "dark" ? "rgba(10, 13, 26, 0.95)" : "rgba(255, 255, 255, 0.98)",
                borderColor: `rgba(${activeTheme.rgb}, 0.25)`,
                color: activeVariant.mode === "dark" ? "#ffffff" : "#0f172a",
                backdropFilter: "blur(16px)",
                boxShadow: `0 20px 40px rgba(0,0,0,0.6), 0 0 20px rgba(${activeTheme.rgb}, 0.15), inset 0 1px 1px rgba(255,255,255,0.15)`
              }}
            >
              <div className="flex items-center gap-2.5">
                <div className="w-5 h-5 rounded-lg flex items-center justify-center font-mono text-[10px] font-black"
                  style={{ background: activeTheme.accentBg, color: activeTheme.color }}>
                  {selectedIds.length}
                </div>
                <span className="text-[11px] font-bold opacity-80 uppercase font-mono">Selected Nodes</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleBatchReboot}
                  className="px-3 py-1.5 rounded-lg border text-[10px] font-bold font-mono transition-all duration-200 cursor-pointer uppercase flex items-center gap-1.5 hover:bg-current/5"
                  style={{
                    borderColor: "rgba(128,128,128,0.2)",
                    color: "inherit"
                  }}
                >
                  <Play size={10} />
                  Reboot
                </button>
                <button
                  onClick={handleBatchDelete}
                  className="px-3 py-1.5 rounded-lg border text-[10px] font-bold font-mono transition-all duration-200 cursor-pointer uppercase flex items-center gap-1.5 bg-rose-500/10 border-rose-500/20 text-rose-400 hover:bg-rose-500/20"
                >
                  <Trash2 size={10} />
                  Terminate
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}

/* Row Component with 2.5D tilt & elevation */
function DataGridRow({ node, index, activeTheme, activeVariant, isSelected, isExpanded, onSelect, onToggleExpand }) {
  const rowRef = useRef(null);
  const [tiltX, setTiltX] = useState(0);
  const [tiltY, setTiltY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Mouse tilt handlers for 2.5D depth
  const handleMouseMove = (e) => {
    if (!rowRef.current) return;
    const rect = rowRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    // Subtle tilt angle capped at 2 degrees
    setTiltX(-(y / rect.height) * 4);
    setTiltY((x / rect.width) * 2);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTiltX(0);
    setTiltY(0);
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "active":
        return {
          glow: "bg-emerald-500/10 border-emerald-500/20 text-emerald-400",
          dotBg: "bg-emerald-400"
        };
      case "warning":
        return {
          glow: "bg-amber-500/10 border-amber-500/20 text-amber-400",
          dotBg: "bg-amber-400"
        };
      case "degraded":
        return {
          glow: "bg-rose-500/10 border-rose-500/20 text-rose-400",
          dotBg: "bg-rose-400"
        };
      default:
        return {
          glow: "bg-current/5 border-current/10 opacity-50",
          dotBg: "bg-current/30"
        };
    }
  };

  const st = getStatusStyle(node.status);

  return (
    <motion.div
      ref={rowRef}
      layout="position"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 15 }}
      animate={{ 
        opacity: 1, 
        y: 0,
        rotateX: tiltX,
        rotateY: tiltY,
        z: isHovered ? 15 : 0
      }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ 
        type: "spring", 
        stiffness: 220, 
        damping: 24,
        rotateX: { type: "spring", stiffness: 100, damping: 15 },
        rotateY: { type: "spring", stiffness: 100, damping: 15 }
      }}
      className={`rounded-xl border transition-all cursor-pointer select-none overflow-hidden relative ${activeVariant.cardClass} ${
        isSelected 
          ? `brightness-110` 
          : "hover:brightness-105"
      }`}
      style={{
        transformStyle: "preserve-3d",
        boxShadow: isHovered && activeVariant.id !== "brutal"
          ? `0 15px 30px rgba(0, 0, 0, 0.4), 0 0 15px rgba(${activeTheme.rgb}, 0.05), inset 0 1px 0 rgba(255,255,255,0.05)` 
          : activeVariant.id !== "brutal" ? "0 4px 10px rgba(0,0,0,0.3)" : "none"
      }}
    >
      {/* Selection Glow Border Accent */}
      {isSelected && (
        <div className="absolute inset-y-0 left-0 w-[3px] rounded-r-full"
          style={{ backgroundColor: activeTheme.color }} />
      )}

      {/* Primary Row Grid Container */}
      <div 
        onClick={onToggleExpand}
        className="grid grid-cols-12 gap-2 px-6 py-4 items-center"
      >
        {/* Checkbox Selector */}
        <div className="col-span-1 flex items-center" onClick={(e) => e.stopPropagation()}>
          <input
            type="checkbox"
            checked={isSelected}
            onChange={onSelect}
            className="w-3.5 h-3.5 rounded border-current/20 bg-current/5 text-cyan-500 focus:ring-0 focus:ring-offset-0 cursor-pointer"
          />
        </div>

        {/* Node ID */}
        <div className="col-span-2 flex items-center">
          <span className="text-[10px] font-bold font-mono px-2 py-0.5 rounded bg-current/5 opacity-55 border border-current/5 uppercase">
            {node.id}
          </span>
        </div>

        {/* Hostname */}
        <div className="col-span-3 flex flex-col justify-center">
          <span className="text-xs font-black leading-none font-mono">
            {node.name}
          </span>
          <span className="text-[9px] opacity-30 mt-0.5">
            {node.region}
          </span>
        </div>

        {/* Status Pill */}
        <div className="col-span-2 flex items-center">
          <div className={`px-2.5 py-1 rounded-full text-[9px] font-extrabold uppercase border flex items-center gap-1.5 leading-none ${st.glow}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${st.dotBg}`} />
            {node.status}
          </div>
        </div>

        {/* CPU Progress Bar */}
        <div className="col-span-2 flex flex-col items-end justify-center font-mono">
          <div className="flex items-center gap-2 w-2/3">
            <div className="flex-1 h-1 bg-current/5 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${node.cpu}%` }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="h-full rounded-full"
                style={{
                  backgroundColor: node.cpu > 80 
                    ? "#ff1744" 
                    : node.cpu > 60 
                      ? "#ffd600" 
                      : activeTheme.color
                }}
              />
            </div>
            <span className="text-[10px] font-bold opacity-70 w-8 text-right">
              {node.cpu}%
            </span>
          </div>
        </div>

        {/* Expand Trigger Icon */}
        <div className="col-span-2 flex items-center justify-end">
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="opacity-40 hover:opacity-100"
          >
            <ChevronDown size={14} />
          </motion.div>
        </div>
      </div>

      {/* Expanded Metrics Section */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 180, damping: 20 }}
            className="border-t border-current/5 bg-current/[0.02] overflow-hidden"
          >
            <div className="p-6 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              
              {/* Stats overview */}
              <div className="md:col-span-5 grid grid-cols-2 gap-4">
                <div className={`p-3.5 flex flex-col gap-0.5 ${activeVariant.cardClass}`}>
                  <span className="text-[9px] uppercase tracking-wider opacity-40 font-bold flex items-center gap-1 font-mono">
                    <Activity size={10} />
                    Bandwidth
                  </span>
                  <span className="text-sm font-black font-mono mt-1">
                    {node.traffic} Mbps
                  </span>
                  <span className="text-[9px] opacity-40 leading-none">Live data egress</span>
                </div>

                <div className={`p-3.5 flex flex-col gap-0.5 ${activeVariant.cardClass}`}>
                  <span className="text-[9px] uppercase tracking-wider opacity-40 font-bold flex items-center gap-1 font-mono">
                    <Cpu size={10} />
                    Disk Capacity
                  </span>
                  <span className="text-sm font-black font-mono mt-1">
                    {node.disk}
                  </span>
                  <span className="text-[9px] opacity-40 leading-none">Total block store</span>
                </div>

                <div className={`p-3.5 flex flex-col gap-0.5 ${activeVariant.cardClass}`}>
                  <span className="text-[9px] uppercase tracking-wider opacity-40 font-bold flex items-center gap-1 font-mono">
                    <Wifi size={10} />
                    SLA Uptime
                  </span>
                  <span className="text-sm font-black font-mono mt-1">
                    {node.uptime}
                  </span>
                  <span className="text-[9px] opacity-40 leading-none">Last 30 days active</span>
                </div>

                <div className={`p-3.5 flex flex-col gap-0.5 ${activeVariant.cardClass}`}>
                  <span className="text-[9px] uppercase tracking-wider opacity-40 font-bold flex items-center gap-1 font-mono">
                    <Server size={10} />
                    Ram Usage
                  </span>
                  <span className="text-sm font-black font-mono mt-1">
                    {node.memory}%
                  </span>
                  <span className="text-[9px] opacity-40 leading-none">Virtual allocations</span>
                </div>
              </div>

              {/* Mini Diagnostic chart */}
              <div className={`h-[110px] p-4 flex flex-col justify-between ${activeVariant.cardClass}`}>
                <div className="flex justify-between items-center text-[9px] font-mono opacity-40 font-bold">
                  <span>LOAD SPECTRUM (CPU)</span>
                  <span className="text-[10px]" style={{ color: activeTheme.color }}>LIVE</span>
                </div>
                
                <div className="flex-1 w-full relative mt-2">
                  <svg className="w-full h-full overflow-visible" viewBox="0 0 200 60">
                    <defs>
                      <linearGradient id={`row-chart-grad-${node.id}`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={activeTheme.color} stopOpacity="0.2" />
                        <stop offset="100%" stopColor={activeTheme.color} stopOpacity="0.0" />
                      </linearGradient>
                    </defs>
                    <path
                      d={`M 0 50 Q 30 20, 60 45 T 120 15 T 180 35 L 200 40 L 200 60 L 0 60 Z`}
                      fill={`url(#row-chart-grad-${node.id})`}
                    />
                    <path
                      d={`M 0 50 Q 30 20, 60 45 T 120 15 T 180 35 L 200 40`}
                      fill="none"
                      stroke={activeTheme.color}
                      strokeWidth="1.5"
                    />
                    <circle cx="200" cy="40" r="2.5" fill={activeTheme.color} />
                  </svg>
                </div>
              </div>

              {/* Command controls */}
              <div className="md:col-span-3 flex flex-col gap-2">
                <motion.button
                  whileHover={{ scale: 1.02, y: -1 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-2 rounded-xl text-[10px] font-bold font-mono uppercase tracking-wider border cursor-pointer transition-all flex items-center justify-center gap-1.5"
                  style={{
                    background: activeTheme.accentBg,
                    borderColor: `rgba(${activeTheme.rgb}, 0.25)`,
                    color: activeTheme.color
                  }}
                >
                  <Terminal size={11} />
                  Secure Shell
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02, y: -1 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full py-2 rounded-xl text-[10px] font-bold font-mono uppercase tracking-wider border cursor-pointer transition-all flex items-center justify-center gap-1.5 ${activeVariant.buttonClass}`}
                >
                  <Play size={10} />
                  System Reboot
                </motion.button>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </motion.div>
  );
}
