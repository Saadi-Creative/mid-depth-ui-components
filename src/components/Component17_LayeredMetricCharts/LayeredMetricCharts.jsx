import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useSpring, useMotionValue, useTransform } from "framer-motion";
import { 
  TrendingUp, TrendingDown, DollarSign, Users, 
  Percent, Activity, MousePointer, Calendar, ArrowUpRight
} from "lucide-react";

// Theme configurations
const THEMES = [
  {
    id: "cyan",
    name: "Neon Teal",
    color: "#00e5ff",
    rgb: "0, 229, 255",
    border: "border-cyan-500/15",
    glow: "shadow-cyan-500/10",
    bg: "bg-cyan-500",
    text: "text-cyan-400",
    accentBg: "bg-cyan-500/10"
  },
  {
    id: "rose",
    name: "Cyber Rose",
    color: "#ff007f",
    rgb: "255, 0, 127",
    border: "border-rose-500/15",
    glow: "shadow-rose-500/10",
    bg: "bg-rose-500",
    text: "text-rose-400",
    accentBg: "bg-rose-500/10"
  },
  {
    id: "toxic",
    name: "Toxic Lime",
    color: "#39ff14",
    rgb: "57, 255, 20",
    border: "border-lime-500/15",
    glow: "shadow-lime-500/10",
    bg: "bg-lime-500",
    text: "text-lime-400",
    accentBg: "bg-lime-500/10"
  },
  {
    id: "amber",
    name: "Amber Glow",
    color: "#ffb800",
    rgb: "255, 184, 0",
    border: "border-amber-500/15",
    glow: "shadow-amber-500/10",
    bg: "bg-amber-500",
    text: "text-amber-400",
    accentBg: "bg-amber-500/10"
  },
  {
    id: "indigo",
    name: "Orbit Indigo",
    color: "#6366f1",
    rgb: "99, 102, 241",
    border: "border-indigo-500/15",
    glow: "shadow-indigo-500/10",
    bg: "bg-indigo-500",
    text: "text-indigo-400",
    accentBg: "bg-indigo-500/10"
  }
];

// Interactive data streams
const DATASETS = {
  revenue: {
    label: "Gross Revenue",
    icon: DollarSign,
    prefix: "$",
    suffix: "",
    metrics: { value: "$142,504", change: "+14.8%", upward: true, period: "vs last week" },
    timeline: {
      "7D": [
        { label: "Mon", val: 12000, sub: "124 sales" },
        { label: "Tue", val: 19500, sub: "190 sales" },
        { label: "Wed", val: 15400, sub: "148 sales" },
        { label: "Thu", val: 26000, sub: "254 sales" },
        { label: "Fri", val: 22000, sub: "210 sales" },
        { label: "Sat", val: 28500, sub: "270 sales" },
        { label: "Sun", val: 32400, sub: "310 sales" }
      ],
      "30D": [
        { label: "W1", val: 94000, sub: "920 sales" },
        { label: "W2", val: 112000, sub: "1,110 sales" },
        { label: "W3", val: 135000, sub: "1,290 sales" },
        { label: "W4", val: 142504, sub: "1,420 sales" }
      ],
      "90D": [
        { label: "Mar", val: 380000, sub: "3,890 sales" },
        { label: "Apr", val: 410000, sub: "4,020 sales" },
        { label: "May", val: 495000, sub: "4,950 sales" }
      ]
    }
  },
  users: {
    label: "Active Users",
    icon: Users,
    prefix: "",
    suffix: "",
    metrics: { value: "32,842", change: "+8.3%", upward: true, period: "vs last week" },
    timeline: {
      "7D": [
        { label: "Mon", val: 24500, sub: "89% retention" },
        { label: "Tue", val: 26100, sub: "90% retention" },
        { label: "Wed", val: 25400, sub: "87% retention" },
        { label: "Thu", val: 29800, sub: "92% retention" },
        { label: "Fri", val: 31200, sub: "93% retention" },
        { label: "Sat", val: 30400, sub: "91% retention" },
        { label: "Sun", val: 32842, sub: "94% retention" }
      ],
      "30D": [
        { label: "W1", val: 28400, sub: "88% avg" },
        { label: "W2", val: 30200, sub: "89% avg" },
        { label: "W3", val: 31500, sub: "91% avg" },
        { label: "W4", val: 32842, sub: "93% avg" }
      ],
      "90D": [
        { label: "Mar", val: 24000, sub: "85% avg" },
        { label: "Apr", val: 29000, sub: "89% avg" },
        { label: "May", val: 32842, sub: "92% avg" }
      ]
    }
  },
  conversion: {
    label: "Conversion Rate",
    icon: Percent,
    prefix: "",
    suffix: "%",
    metrics: { value: "3.48%", change: "-1.2%", upward: false, period: "vs last week" },
    timeline: {
      "7D": [
        { label: "Mon", val: 3.1, sub: "1.2% checkout" },
        { label: "Tue", val: 3.4, sub: "1.4% checkout" },
        { label: "Wed", val: 3.2, sub: "1.3% checkout" },
        { label: "Thu", val: 3.9, sub: "1.8% checkout" },
        { label: "Fri", val: 3.6, sub: "1.5% checkout" },
        { label: "Sat", val: 3.3, sub: "1.4% checkout" },
        { label: "Sun", val: 3.48, sub: "1.6% checkout" }
      ],
      "30D": [
        { label: "W1", val: 3.2, sub: "1.3% avg" },
        { label: "W2", val: 3.5, sub: "1.6% avg" },
        { label: "W3", val: 3.7, sub: "1.7% avg" },
        { label: "W4", val: 3.48, sub: "1.5% avg" }
      ],
      "90D": [
        { label: "Mar", val: 3.1, sub: "1.2% avg" },
        { label: "Apr", val: 3.3, sub: "1.4% avg" },
        { label: "May", val: 3.48, sub: "1.6% avg" }
      ]
    }
  }
};

export default function LayeredMetricCharts() {
  const [activeTheme, setActiveTheme] = useState(THEMES[0]);
  const [activeTab, setActiveTab] = useState("revenue"); // revenue, users, conversion
  const [activeTimeline, setActiveTimeline] = useState("7D"); // 7D, 30D, 90D
  
  const chartCardRef = useRef(null);
  const svgRef = useRef(null);

  // Parallax 3D tilt state
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Tooltip tracking state
  const [hoverIndex, setHoverIndex] = useState(null);
  const [trackerCoords, setTrackerCoords] = useState({ x: 0, y: 0, dataVal: 0, subText: "", label: "" });

  const activeData = DATASETS[activeTab];
  const timelineData = activeData.timeline[activeTimeline];

  // SVG parameters
  const svgWidth = 500;
  const svgHeight = 200;
  const paddingX = 40;
  const paddingY = 30;

  // Find min/max values to map coordinates
  const vals = timelineData.map(d => d.val);
  const maxVal = Math.max(...vals) * 1.1 || 1;
  const minVal = Math.min(...vals) * 0.9 >= 0 ? Math.min(...vals) * 0.9 : 0;

  // Calculate coordinates for points
  const points = timelineData.map((d, index) => {
    const x = paddingX + (index / (timelineData.length - 1)) * (svgWidth - paddingX * 2);
    const y = svgHeight - paddingY - ((d.val - minVal) / (maxVal - minVal)) * (svgHeight - paddingY * 2);
    return { x, y, data: d };
  });

  // SVG path generation
  const pathD = points.reduce((path, p, i) => {
    if (i === 0) return `M ${p.x} ${p.y}`;
    // Curve interpolation
    const prev = points[i - 1];
    const cpX1 = prev.x + (p.x - prev.x) / 3;
    const cpY1 = prev.y;
    const cpX2 = prev.x + 2 * (p.x - prev.x) / 3;
    const cpY2 = p.y;
    return `${path} C ${cpX1} ${cpY1}, ${cpX2} ${cpY2}, ${p.x} ${p.y}`;
  }, "");

  // Gradient area path generation
  const areaPathD = pathD ? `${pathD} L ${points[points.length - 1].x} ${svgHeight - paddingY} L ${points[0].x} ${svgHeight - paddingY} Z` : "";

  // Dynamic spring values for fluid cursor track
  const springX = useSpring(0, { stiffness: 220, damping: 24 });
  const springY = useSpring(0, { stiffness: 220, damping: 24 });

  // Handle chart mouse move for the neon track and dynamic tooltip
  const handleMouseMove = (e) => {
    if (!svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const relativeX = (mouseX / rect.width) * svgWidth;

    // Find the closest point in the dataset based on X coordinate
    let closestPt = points[0];
    let closestIndex = 0;
    let minDist = Math.abs(points[0].x - relativeX);

    points.forEach((p, idx) => {
      const dist = Math.abs(p.x - relativeX);
      if (dist < minDist) {
        minDist = dist;
        closestPt = p;
        closestIndex = idx;
      }
    });

    setHoverIndex(closestIndex);
    
    // Animate tracking values with spring transitions
    springX.set(closestPt.x);
    springY.set(closestPt.y);

    setTrackerCoords({
      x: closestPt.x,
      y: closestPt.y,
      dataVal: closestPt.data.val,
      subText: closestPt.data.sub,
      label: closestPt.data.label
    });
  };

  // Card 3D tilt physics handler
  const handleCardTilt = (e) => {
    if (!chartCardRef.current) return;
    const cardRect = chartCardRef.current.getBoundingClientRect();
    const cardWidth = cardRect.width;
    const cardHeight = cardRect.height;
    
    // Relative coordinate from card center
    const x = e.clientX - cardRect.left - cardWidth / 2;
    const y = e.clientY - cardRect.top - cardHeight / 2;
    
    // Cap tilt angles at 6 degrees
    setRotateX(-(y / cardHeight) * 12);
    setRotateY((x / cardWidth) * 12);
  };

  const resetCardTilt = () => {
    setRotateX(0);
    setRotateY(0);
    setHoverIndex(null);
  };

  // Format metric value helper
  const formatVal = (value) => {
    if (activeTab === "revenue") {
      return `$${value.toLocaleString()}`;
    } else if (activeTab === "users") {
      return value.toLocaleString();
    } else {
      return `${value}%`;
    }
  };

  return (
    <div 
      className="min-h-screen flex flex-col justify-start p-4 md:p-8 select-none" 
      style={{ background: "#060810", fontFamily: "'Inter', sans-serif" }}
    >
      <div className="w-full max-w-5xl mx-auto flex flex-col gap-6">
        
        {/* Header Controls Bento Block */}
        <div className="bg-[#0a0d1a] border border-white/5 rounded-2xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-[inset_0_2px_4px_rgba(0,0,0,0.6)]">
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-mono tracking-widest text-white/40 uppercase block">
              SaaS Analytics Visualizer
            </span>
            <h1 
              className="text-xl md:text-2xl font-bold text-white tracking-tight"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              3D Layered Metric Widgets
            </h1>
            <p className="text-xs text-white/45 max-w-xl">
              Hover and drag over the trend charts to see the fluid 2.5D spring tracking line and glassmorphic tooltip. Click tabs to toggle between metrics.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 flex-shrink-0">
            {/* Theme switcher */}
            <div className="flex flex-col gap-1.5">
              <span className="text-[9px] uppercase tracking-widest text-white/30 font-bold">
                Neon Highlight Theme
              </span>
              <div className="flex items-center gap-2">
                {THEMES.map(theme => (
                  <button
                    key={theme.id}
                    onClick={() => setActiveTheme(theme)}
                    className="w-5 h-5 rounded-full cursor-pointer relative flex items-center justify-center transition-transform active:scale-90"
                    style={{ backgroundColor: theme.color }}
                    aria-label={`Switch Theme to ${theme.name}`}
                  >
                    {activeTheme.id === theme.id && (
                      <motion.div
                        layoutId="active-chart-border"
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
        </div>

        {/* Dynamic Metric Widgets Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Object.entries(DATASETS).map(([key, data]) => {
            const TabIcon = data.icon;
            const isActive = activeTab === key;
            return (
              <motion.div
                key={key}
                onClick={() => {
                  setActiveTab(key);
                  setHoverIndex(null);
                }}
                whileHover={{ y: -3, scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                className={`bg-[#0a0d1a] border rounded-2xl p-5 cursor-pointer flex flex-col justify-between h-[130px] transition-all relative overflow-hidden ${
                  isActive 
                    ? `border-white/10 shadow-[0_4px_30px_rgba(var(--theme-rgb),0.05)]` 
                    : "border-white/5 hover:border-white/10"
                }`}
                style={{
                  "--theme-rgb": activeTheme.rgb,
                }}
              >
                {/* Active indicator layer */}
                {isActive && (
                  <motion.div 
                    layoutId="tab-active-glow" 
                    className="absolute inset-0 opacity-10 pointer-events-none"
                    style={{
                      background: `radial-gradient(100% 100% at 50% 0%, ${activeTheme.color} 0%, transparent 100%)`
                    }}
                  />
                )}

                <div className="flex justify-between items-center text-white/50 text-xs font-bold tracking-wide uppercase">
                  <span>{data.label}</span>
                  <div 
                    className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all ${
                      isActive ? activeTheme.accentBg : "bg-white/5 text-white/40"
                    }`}
                    style={{ color: isActive ? activeTheme.color : undefined }}
                  >
                    <TabIcon size={14} />
                  </div>
                </div>

                <div className="flex flex-col mt-2">
                  <span className="text-2xl font-extrabold tracking-tight text-white">
                    {data.metrics.value}
                  </span>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span 
                      className={`text-[10px] font-bold flex items-center gap-0.5 ${
                        data.metrics.upward ? "text-emerald-400" : "text-rose-400"
                      }`}
                    >
                      <ArrowUpRight size={11} className={data.metrics.upward ? "" : "rotate-90"} />
                      {data.metrics.change}
                    </span>
                    <span className="text-[10px] text-white/35 font-medium">
                      {data.metrics.period}
                    </span>
                  </div>
                </div>

                {/* Bottom line accent */}
                {isActive && (
                  <motion.div 
                    layoutId="active-accent-bar"
                    className="absolute bottom-0 left-4 right-4 h-[2px] rounded-t-full"
                    style={{ backgroundColor: activeTheme.color }}
                  />
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Main 3D Layered Chart Container */}
        <div 
          className="perspective-1000 w-full"
          style={{ perspective: "1200px" }}
        >
          <motion.div
            ref={chartCardRef}
            onMouseMove={handleCardTilt}
            onMouseLeave={resetCardTilt}
            onMouseEnter={() => setIsHovered(true)}
            animate={{
              rotateX: rotateX,
              rotateY: rotateY,
              transformStyle: "preserve-3d"
            }}
            transition={{ type: "spring", stiffness: 150, damping: 20 }}
            className="w-full bg-[#0a0d1a] border border-white/5 rounded-2xl p-6 flex flex-col justify-between min-h-[380px] shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative overflow-hidden"
          >
            {/* Background 2.5D glowing light mask */}
            <div 
              className="absolute inset-0 pointer-events-none transition-opacity duration-300"
              style={{
                background: `radial-gradient(400px at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(${activeTheme.rgb}, 0.03) 0%, transparent 100%)`,
                opacity: isHovered ? 1 : 0
              }}
            />

            {/* Header / Config Bar */}
            <div className="flex items-center justify-between z-10" style={{ transform: "translateZ(30px)" }}>
              <div className="flex flex-col">
                <span className="text-[10px] font-mono tracking-widest text-white/40 uppercase">
                  Plotting Index
                </span>
                <h3 className="text-base font-bold text-white tracking-wide mt-0.5">
                  {activeData.label} Trend
                </h3>
              </div>

              {/* Timeline selector */}
              <div className="flex items-center bg-white/[0.03] p-1 rounded-xl border border-white/5">
                {["7D", "30D", "90D"].map((timeline) => (
                  <button
                    key={timeline}
                    onClick={() => {
                      setActiveTimeline(timeline);
                      setHoverIndex(null);
                    }}
                    className={`px-3 py-1 rounded-lg text-[10px] font-bold cursor-pointer transition-all duration-150 relative ${
                      activeTimeline === timeline 
                        ? "text-black" 
                        : "text-white/50 hover:text-white"
                    }`}
                  >
                    {activeTimeline === timeline && (
                      <motion.div
                        layoutId="timeline-active-bg"
                        className="absolute inset-0 bg-white rounded-lg shadow-sm"
                        transition={{ type: "spring", stiffness: 350, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">{timeline}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Interactive SVG Chart Layer */}
            <div 
              className="flex-1 w-full min-h-[220px] relative mt-6 flex items-center justify-center cursor-crosshair z-10"
              style={{ transform: "translateZ(10px)" }}
            >
              <svg
                ref={svgRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={() => setHoverIndex(null)}
                className="w-full h-full overflow-visible select-none"
                viewBox={`0 0 ${svgWidth} ${svgHeight}`}
              >
                {/* SVG definitions */}
                <defs>
                  {/* Neon Glow filters */}
                  <filter id={`neon-glow-${activeTheme.id}`} x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="6" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                  <filter id={`dot-glow-${activeTheme.id}`} x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>

                  {/* Gradient definition */}
                  <linearGradient id={`area-gradient-${activeTheme.id}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={activeTheme.color} stopOpacity="0.15" />
                    <stop offset="100%" stopColor={activeTheme.color} stopOpacity="0.00" />
                  </linearGradient>
                </defs>

                {/* Base SVG horizontal gridlines */}
                <line x1={paddingX} y1={paddingY} x2={svgWidth - paddingX} y2={paddingY} stroke="rgba(255,255,255,0.02)" strokeWidth="1" />
                <line x1={paddingX} y1={svgHeight / 2} x2={svgWidth - paddingX} y2={svgHeight / 2} stroke="rgba(255,255,255,0.02)" strokeWidth="1" />
                <line x1={paddingX} y1={svgHeight - paddingY} x2={svgWidth - paddingX} y2={svgHeight - paddingY} stroke="rgba(255,255,255,0.02)" strokeWidth="1" />

                {/* Accent Fill Path */}
                <AnimatePresence mode="wait">
                  {areaPathD && (
                    <motion.path
                      key={`area-${activeTab}-${activeTimeline}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      d={areaPathD}
                      fill={`url(#area-gradient-${activeTheme.id})`}
                    />
                  )}
                </AnimatePresence>

                {/* Floating Stroke Path */}
                <AnimatePresence mode="wait">
                  {pathD && (
                    <motion.path
                      key={`path-${activeTab}-${activeTimeline}`}
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                      d={pathD}
                      fill="none"
                      stroke={activeTheme.color}
                      strokeWidth="2.5"
                      filter={`url(#neon-glow-${activeTheme.id})`}
                    />
                  )}
                </AnimatePresence>

                {/* Base data point coordinates circles */}
                {points.map((p, idx) => (
                  <circle
                    key={idx}
                    cx={p.x}
                    cy={p.y}
                    r={hoverIndex === idx ? 4.5 : 3.5}
                    className="transition-all duration-150"
                    fill={hoverIndex === idx ? "#ffffff" : "#0a0d1a"}
                    stroke={hoverIndex === idx ? activeTheme.color : "rgba(255,255,255,0.15)"}
                    strokeWidth={hoverIndex === idx ? 2.5 : 1.5}
                  />
                ))}

                {/* Neon interactive tracking cursor track */}
                {hoverIndex !== null && (
                  <g>
                    {/* Dashed vertical track */}
                    <motion.line
                      style={{ x: springX }}
                      x1={0}
                      y1={paddingY}
                      x2={0}
                      y2={svgHeight - paddingY}
                      stroke={`rgba(${activeTheme.rgb}, 0.25)`}
                      strokeWidth="1.5"
                      strokeDasharray="4 3"
                    />

                    {/* Laser point projection circle */}
                    <motion.circle
                      style={{ cx: springX, cy: springY }}
                      r="6"
                      fill={activeTheme.color}
                      filter={`url(#dot-glow-${activeTheme.id})`}
                      opacity="0.8"
                    />
                  </g>
                )}
              </svg>

              {/* Glassmorphic 2.5D Tooltip Layer floating along coordinates */}
              <AnimatePresence>
                {hoverIndex !== null && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 10 }}
                    animate={{ 
                      opacity: 1, 
                      scale: 1, 
                      y: 0,
                      left: `${(trackerCoords.x / svgWidth) * 100}%`,
                      top: `${(trackerCoords.y / svgHeight) * 100 - 68}%`
                    }}
                    exit={{ opacity: 0, scale: 0.9, y: 10 }}
                    transition={{ type: "spring", stiffness: 280, damping: 24 }}
                    className="absolute pointer-events-none z-[999] border p-3 rounded-xl flex flex-col gap-0.5 shadow-xl -translate-x-1/2 min-w-[120px]"
                    style={{
                      background: "rgba(10, 13, 26, 0.9)",
                      borderColor: `rgba(${activeTheme.rgb}, 0.2)`,
                      backdropFilter: "blur(12px)",
                      boxShadow: `0 10px 30px rgba(${activeTheme.rgb}, 0.1), inset 0 1px 1px rgba(255,255,255,0.15)`
                    }}
                  >
                    <span className="text-[9px] uppercase tracking-wider font-extrabold text-white/40">
                      {trackerCoords.label}
                    </span>
                    <span className="text-xs font-black text-white font-mono mt-0.5">
                      {formatVal(trackerCoords.dataVal)}
                    </span>
                    <span className="text-[9px] text-white/50 leading-tight">
                      {trackerCoords.subText}
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Bottom labels with timeline details */}
            <div 
              className="flex justify-between items-center text-[10px] text-white/30 font-mono font-bold pt-4 border-t border-white/5"
              style={{ transform: "translateZ(20px)" }}
            >
              {timelineData.map((d, index) => (
                <div 
                  key={index}
                  className={`w-12 text-center transition-colors duration-150 ${
                    hoverIndex === index ? activeTheme.text : "text-white/30"
                  }`}
                >
                  {d.label}
                </div>
              ))}
            </div>

          </motion.div>
        </div>

      </div>
    </div>
  );
}
