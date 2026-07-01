import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Plus, Trash2, MessageSquare, 
  Paperclip, ClipboardList, Check
} from "lucide-react";
import { useGlobalTheme } from "../../themes/ThemeContext";

// Initial Tasks
const INITIAL_TASKS = [
  { id: "task-1", title: "Refactor dynamic 2.5D shadow system", desc: "Optimize CSS filter draw times for complex overlapping card elements.", column: "backlog", priority: "high", category: "engineering", comments: 4, attachments: 2, completed: false },
  { id: "task-2", title: "Create watch face configurator", desc: "Design SVG dial layouts for watch customization component.", column: "backlog", priority: "medium", category: "design", comments: 2, attachments: 5, completed: false },
  { id: "task-3", title: "Fix mega-menu touch hover lag", desc: "Resolve delay on mobile device inputs during drawer slide animations.", column: "progress", priority: "high", category: "bug", comments: 8, attachments: 1, completed: false },
  { id: "task-4", title: "Calibrate liquid-ripple spring parameters", desc: "Adjust physics coefficient for click feedback responses.", column: "progress", priority: "low", category: "engineering", comments: 1, attachments: 0, completed: false },
  { id: "task-5", title: "Write component README guidelines", desc: "Draft installation guides and modular drop-in document templates.", column: "review", priority: "medium", category: "docs", comments: 0, attachments: 3, completed: false },
  { id: "task-6", title: "Validate Skeleton loading state speed", desc: "Confirm loading skeleton correctly crossfades to user stats.", column: "done", priority: "low", category: "qa", comments: 3, attachments: 1, completed: true }
];

const COLUMNS = [
  { id: "backlog", name: "Backlog", labelColor: "rgba(255,255,255,0.4)" },
  { id: "progress", name: "In Progress", labelColor: "#ffd600" },
  { id: "review", name: "In Review", labelColor: "#6366f1" },
  { id: "done", name: "Done", labelColor: "#39ff14" }
];

export default function ElasticKanbanBoard() {
  const { activeVariant } = useGlobalTheme();
  const [tasks, setTasks] = useState(INITIAL_TASKS);
  const [draggedId, setDraggedId] = useState(null);
  const [activeOverColumn, setActiveOverColumn] = useState(null);
  const [showAddForm, setShowAddForm] = useState(null); // column id
  const [newTitle, setNewTitle] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [newPriority, setNewPriority] = useState("medium");
  const [newCategory, setNewCategory] = useState("engineering");

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
    border: `border-current/20`,
    glow: `shadow-[0_0_15px_rgba(${rgbStr},0.1)]`,
    bg: "",
    text: activeVariant.textClass,
    accentBg: `rgba(${rgbStr}, 0.1)`
  };

  // Drag & drop handlers
  const handleDragStart = (e, id) => {
    setDraggedId(id);
    e.dataTransfer.setData("text/plain", id);
  };

  const handleDragEnd = () => {
    setDraggedId(null);
    setActiveOverColumn(null);
  };

  const handleDragOver = (e, columnId) => {
    e.preventDefault();
    if (activeOverColumn !== columnId) {
      setActiveOverColumn(columnId);
    }
  };

  const handleDrop = (e, targetColumn) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData("text/plain") || draggedId;
    if (taskId) {
      setTasks(prev => 
        prev.map(task => 
          task.id === taskId 
            ? { ...task, column: targetColumn, completed: targetColumn === "done" } 
            : task
        )
      );
    }
    setDraggedId(null);
    setActiveOverColumn(null);
  };

  // Toggle complete checkbox
  const handleToggleComplete = (taskId) => {
    setTasks(prev => 
      prev.map(task => 
        task.id === taskId 
          ? { 
              ...task, 
              completed: !task.completed,
              column: !task.completed ? "done" : "backlog" 
            } 
          : task
      )
    );
  };

  // Delete task
  const handleDeleteTask = (taskId) => {
    setTasks(prev => prev.filter(t => t.id !== taskId));
  };

  // Create new task
  const handleAddTask = (columnId) => {
    if (!newTitle.trim()) return;
    const newTask = {
      id: `task-${Date.now()}`,
      title: newTitle,
      desc: newDesc || "No description provided.",
      column: columnId,
      priority: newPriority,
      category: newCategory,
      comments: 0,
      attachments: 0,
      completed: columnId === "done"
    };
    setTasks(prev => [...prev, newTask]);
    setNewTitle("");
    setNewDesc("");
    setShowAddForm(null);
  };

  return (
    <div className={`min-h-screen flex flex-col justify-start p-4 md:p-8 select-none transition-colors duration-500 ${activeVariant.canvasClass}`}>
      
      <div className="w-full max-w-6xl mx-auto flex flex-col gap-6">
        
        {/* Header Board Panel */}
        <div className={`p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 ${activeVariant.cardClass}`}>
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-mono tracking-widest opacity-40 uppercase block">
              COOPERATIVE WORKSPACE
            </span>
            <h1 className="text-xl md:text-2xl font-black tracking-tight"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Elastic 2.5D Kanban Board
            </h1>
            <p className="text-xs opacity-45 max-w-xl">
              A fluid task management board. Cards feature Z-axis lifting on hover, dynamic cursor-tilt rotations, and smooth layout swaps.
            </p>
          </div>
        </div>

        {/* Board Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-2">
          {COLUMNS.map(column => {
            const columnTasks = tasks.filter(t => t.column === column.id);
            const isOver = activeOverColumn === column.id;

            return (
              <div
                key={column.id}
                onDragOver={(e) => handleDragOver(e, column.id)}
                onDragLeave={() => setActiveOverColumn(null)}
                onDrop={(e) => handleDrop(e, column.id)}
                className={`p-4 min-h-[500px] flex flex-col transition-all relative overflow-visible ${activeVariant.cardClass}`}
                style={{
                  "--theme-rgb": activeTheme.rgb,
                }}
              >
                {/* Drag Over Glow Layer */}
                {isOver && (
                  <motion.div
                    layoutId="column-over-glow"
                    className="absolute inset-0 rounded-2xl pointer-events-none opacity-[0.03]"
                    style={{ backgroundColor: activeTheme.color }}
                  />
                )}

                {/* Column Header */}
                <div className="flex justify-between items-center mb-4 pb-2 border-b border-current/5">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: column.id === "done" ? "#39ff14" : activeTheme.color }} />
                    <h3 className="text-xs font-extrabold uppercase tracking-wider font-mono">
                      {column.name}
                    </h3>
                  </div>
                  
                  <span className="text-[10px] font-mono font-bold bg-current/5 border border-current/5 opacity-40 px-2 py-0.5 rounded-md">
                    {columnTasks.length}
                  </span>
                </div>

                {/* Task Cards Container */}
                <div className="flex-1 flex flex-col gap-2.5 overflow-y-auto pr-1">
                  <AnimatePresence initial={false}>
                    {columnTasks.map((task) => (
                      <KanbanCard
                        key={task.id}
                        task={task}
                        activeTheme={activeTheme}
                        activeVariant={activeVariant}
                        isDraggingNow={draggedId === task.id}
                        onDragStart={(e) => handleDragStart(e, task.id)}
                        onDragEnd={handleDragEnd}
                        onToggleComplete={() => handleToggleComplete(task.id)}
                        onDelete={() => handleDeleteTask(task.id)}
                      />
                    ))}
                  </AnimatePresence>

                  {/* Empty state visual */}
                  {columnTasks.length === 0 && !showAddForm && (
                    <div className="flex-1 border border-dashed border-current/5 rounded-xl flex flex-col items-center justify-center p-6 text-center opacity-30">
                      <ClipboardList size={22} className="mb-2" />
                      <span className="text-[9px] uppercase tracking-wider font-mono">Column Empty</span>
                    </div>
                  )}
                </div>

                {/* Add task widget */}
                <div className="mt-4 pt-2 border-t border-current/5">
                  {showAddForm === column.id ? (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`p-3 flex flex-col gap-2.5 ${activeVariant.cardClass}`}
                    >
                      <input
                        type="text"
                        placeholder="Task Title..."
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                        className={`px-2.5 py-1.5 focus:outline-none text-xs placeholder-current/20 ${activeVariant.inputClass}`}
                      />
                      <textarea
                        placeholder="Task Description..."
                        value={newDesc}
                        onChange={(e) => setNewDesc(e.target.value)}
                        className={`focus:outline-none px-2.5 py-1.5 text-[10px] placeholder-current/20 min-h-[50px] resize-none ${activeVariant.inputClass}`}
                      />

                      <div className="flex justify-between items-center mt-1">
                        <select 
                          value={newCategory} 
                          onChange={(e) => setNewCategory(e.target.value)}
                          className={`text-[9px] uppercase font-bold opacity-50 p-1 focus:outline-none ${activeVariant.inputClass}`}
                        >
                          <option value="engineering" className="bg-black text-white">Engineering</option>
                          <option value="design" className="bg-black text-white">Design</option>
                          <option value="bug" className="bg-black text-white">Bug</option>
                          <option value="docs" className="bg-black text-white">Docs</option>
                        </select>

                        <div className="flex gap-1.5">
                          <button
                            onClick={() => setShowAddForm(null)}
                            className="px-2 py-1 bg-current/5 rounded-md text-[9px] uppercase font-bold opacity-40 cursor-pointer"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={() => handleAddTask(column.id)}
                            className="px-2.5 py-1 rounded-md text-[9px] uppercase font-bold text-black cursor-pointer"
                            style={{ backgroundColor: activeTheme.color }}
                          >
                            Save
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ) : (
                    <button
                      onClick={() => {
                        setShowAddForm(column.id);
                        setNewTitle("");
                        setNewDesc("");
                      }}
                      className="w-full py-2 bg-current/5 hover:bg-current/10 rounded-xl border border-current/5 text-[10px] uppercase font-bold font-mono tracking-wider opacity-40 hover:opacity-100 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Plus size={11} />
                      Add Task Card
                    </button>
                  )}
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}

/* Kanban Card with 2.5D depth, hover tilt, and custom drag */
function KanbanCard({ task, activeTheme, activeVariant, isDraggingNow, onDragStart, onDragEnd, onToggleComplete, onDelete }) {
  const cardRef = useRef(null);
  const [tiltX, setTiltX] = useState(0);
  const [tiltY, setTiltY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Mouse tilt handlers for 2.5D depth
  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    setTiltX(-(y / rect.height) * 8);
    setTiltY((x / rect.width) * 8);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTiltX(0);
    setTiltY(0);
  };

  const getPriorityStyle = (priority) => {
    switch (priority) {
      case "high":
        return "bg-rose-500/10 border-rose-500/20 text-rose-400";
      case "medium":
        return "bg-amber-500/10 border-amber-500/20 text-amber-400";
      default:
        return "bg-indigo-500/10 border-indigo-500/20 text-indigo-400";
    }
  };

  return (
    <motion.div
      ref={cardRef}
      layoutId={task.id}
      draggable
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ 
        opacity: isDraggingNow ? 0.3 : 1, 
        scale: isDraggingNow ? 0.95 : 1,
        rotateX: tiltX,
        rotateY: tiltY,
        z: isHovered ? 20 : 0
      }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ 
        type: "spring", 
        stiffness: 280, 
        damping: 24,
        rotateX: { type: "spring", stiffness: 120, damping: 15 },
        rotateY: { type: "spring", stiffness: 120, damping: 15 }
      }}
      className={`p-3.5 cursor-grab active:cursor-grabbing select-none relative transition-colors ${activeVariant.cardClass} ${
        task.completed 
          ? "border-emerald-500/20 bg-emerald-500/5" 
          : ""
      }`}
      style={{
        transformStyle: "preserve-3d",
        boxShadow: isHovered 
          ? `0 12px 24px rgba(0, 0, 0, 0.4), 0 0 10px rgba(${activeTheme.rgb}, 0.04), inset 0 1px 0 rgba(255,255,255,0.05)` 
          : "0 3px 6px rgba(0,0,0,0.2)"
      }}
    >
      {/* Glow highlight on active card hover */}
      {isHovered && !task.completed && (
        <div 
          className="absolute inset-0 pointer-events-none rounded-xl opacity-[0.01]"
          style={{
            background: `radial-gradient(80px at var(--mouse-x, 50%) var(--mouse-y, 50%), ${activeTheme.color} 0%, transparent 100%)`
          }}
        />
      )}

      {/* Card Header: Category & Priority */}
      <div className="flex justify-between items-center mb-2.5" style={{ transform: "translateZ(10px)" }}>
        <span className={`text-[9px] font-black uppercase font-mono tracking-wider ${activeTheme.text}`}>
          {task.category}
        </span>
        
        <div className={`px-2 py-0.5 rounded-full text-[8px] font-extrabold uppercase border ${getPriorityStyle(task.priority)}`}>
          {task.priority}
        </div>
      </div>

      {/* Card Title & Desc */}
      <div className="flex flex-col gap-1 mb-3" style={{ transform: "translateZ(15px)" }}>
        <h4 className={`text-xs font-black leading-snug transition-all ${
          task.completed ? "opacity-30 line-through" : ""
        }`}>
          {task.title}
        </h4>
        <p className={`text-[10px] leading-snug ${
          task.completed ? "opacity-20" : "opacity-40"
        }`}>
          {task.desc}
        </p>
      </div>

      {/* Card Footer: Checkbox, Metadata & Trash */}
      <div className="flex justify-between items-center pt-2.5 border-t border-current/5" style={{ transform: "translateZ(10px)" }}>
        
        {/* Toggle complete */}
        <div className="flex items-center gap-2">
          <button
            onClick={onToggleComplete}
            className={`w-4 h-4 rounded-full border flex items-center justify-center transition-all cursor-pointer ${
              task.completed 
                ? "bg-emerald-500 border-emerald-400 text-black shadow-[0_0_8px_rgba(16,185,129,0.4)]" 
                : "border-current/20 bg-current/5 text-transparent hover:border-current/40"
            }`}
          >
            {task.completed ? <Check size={10} strokeWidth={4} /> : null}
          </button>
          
          <div className="flex items-center gap-2 text-[9px] opacity-30 font-semibold font-mono">
            {task.comments > 0 && (
              <span className="flex items-center gap-0.5">
                <MessageSquare size={10} />
                {task.comments}
              </span>
            )}
            {task.attachments > 0 && (
              <span className="flex items-center gap-0.5">
                <Paperclip size={10} />
                {task.attachments}
              </span>
            )}
          </div>
        </div>

        {/* Delete */}
        <button
          onClick={onDelete}
          className="opacity-20 hover:opacity-100 hover:text-rose-400 p-1 rounded transition-colors cursor-pointer"
        >
          <Trash2 size={11} />
        </button>

      </div>

    </motion.div>
  );
}
