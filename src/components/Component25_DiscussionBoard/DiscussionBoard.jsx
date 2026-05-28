import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronUp, ChevronDown, Reply, Send, Settings, User, AlertCircle, MessageSquare } from "lucide-react";

// Themes definition
const THEMES = [
  {
    id: "cyberGreen",
    name: "Cyber Green",
    color: "#00FF88",
    rgb: "0, 255, 136",
    text: "text-emerald-400",
    bg: "bg-emerald-500",
    accentBg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
    focusBorder: "focus-within:border-emerald-500",
    glow: "shadow-[0_0_12px_rgba(0,255,136,0.25)]",
    ring: "focus-within:ring-2 focus-within:ring-emerald-500/20"
  },
  {
    id: "neonCyan",
    name: "Neon Cyan",
    color: "#00E5FF",
    rgb: "0, 229, 255",
    text: "text-cyan-400",
    bg: "bg-cyan-500",
    accentBg: "bg-cyan-500/10",
    border: "border-cyan-500/20",
    focusBorder: "focus-within:border-cyan-500",
    glow: "shadow-[0_0_12px_rgba(0,229,255,0.25)]",
    ring: "focus-within:ring-2 focus-within:ring-cyan-500/20"
  },
  {
    id: "plasmaPurple",
    name: "Plasma Purple",
    color: "#BF5FFF",
    rgb: "191, 95, 255",
    text: "text-purple-400",
    bg: "bg-purple-500",
    accentBg: "bg-purple-500/10",
    border: "border-purple-500/20",
    focusBorder: "focus-within:border-purple-500",
    glow: "shadow-[0_0_12px_rgba(191,95,255,0.25)]",
    ring: "focus-within:ring-2 focus-within:ring-purple-500/20"
  },
  {
    id: "solarFlare",
    name: "Solar Flare",
    color: "#FF6B00",
    rgb: "255, 107, 0",
    text: "text-orange-400",
    bg: "bg-orange-500",
    accentBg: "bg-orange-500/10",
    border: "border-orange-500/20",
    focusBorder: "focus-within:border-orange-500",
    glow: "shadow-[0_0_12px_rgba(255,107,0,0.25)]",
    ring: "focus-within:ring-2 focus-within:ring-orange-500/20"
  },
  {
    id: "crimsonRed",
    name: "Crimson Red",
    color: "#FF1744",
    rgb: "255, 23, 68",
    text: "text-rose-400",
    bg: "bg-rose-500",
    accentBg: "bg-rose-500/10",
    border: "border-rose-500/20",
    focusBorder: "focus-within:border-rose-500",
    glow: "shadow-[0_0_12px_rgba(255,23,68,0.25)]",
    ring: "focus-within:ring-2 focus-within:ring-rose-500/20"
  }
];

// Initial nested comments database (flat array with parentId structure)
const INITIAL_COMMENTS = [
  {
    id: 1,
    parentId: null,
    author: "saadi_creative",
    content: "I've been looking into the rendering bottlenecks on mobile viewports. It seems that clipping masks inside grid containers generate major repaints during card lifts.",
    timestamp: "2 hours ago",
    votes: 24,
    userVote: null,
    isNew: false
  },
  {
    id: 2,
    parentId: 1,
    author: "quant_coder",
    content: "Interesting! Are you utilizing will-change properties on the scaling images? That usually offsets paint calculations onto the GPU composite layers.",
    timestamp: "1 hour ago",
    votes: 8,
    userVote: null,
    isNew: false
  },
  {
    id: 3,
    parentId: 2,
    author: "saadi_creative",
    content: "Yes, added will-change: transform. It reduced mobile paint times from 14ms to less than 4ms. Highly recommend!",
    timestamp: "45 mins ago",
    votes: 5,
    userVote: null,
    isNew: false
  },
  {
    id: 4,
    parentId: 1,
    author: "ux_pilot",
    content: "We should also confirm we aren't layering overlapping drop shadows on nested items. Flat outline borders clip cleaner.",
    timestamp: "30 mins ago",
    votes: 11,
    userVote: "up",
    isNew: false
  },
  {
    id: 5,
    parentId: null,
    author: "motion_hacker",
    content: "This threaded UI guide feels incredibly solid. The indentation timeline lines guide the eyes perfectly.",
    timestamp: "10 mins ago",
    votes: 3,
    userVote: null,
    isNew: false
  }
];

export default function DiscussionBoard() {
  const [activeTheme, setActiveTheme] = useState(THEMES[0]);
  const [comments, setComments] = useState(INITIAL_COMMENTS);
  const [replyingToId, setReplyingToId] = useState(null);
  const [replyValue, setReplyValue] = useState("");
  const [rootValue, setRootValue] = useState("");
  const [showSettings, setShowSettings] = useState(false);

  // Voting mechanics with micro-jump triggers
  const handleVote = (id, direction) => {
    setComments(prev => 
      prev.map(c => {
        if (c.id !== id) return c;

        let diff = 0;
        let newVote = null;

        if (direction === "up") {
          if (c.userVote === "up") {
            diff = -1;
            newVote = null;
          } else if (c.userVote === "down") {
            diff = 2;
            newVote = "up";
          } else {
            diff = 1;
            newVote = "up";
          }
        } else {
          if (c.userVote === "down") {
            diff = 1;
            newVote = null;
          } else if (c.userVote === "up") {
            diff = -2;
            newVote = "down";
          } else {
            diff = -1;
            newVote = "down";
          }
        }

        return { ...c, votes: c.votes + diff, userVote: newVote };
      })
    );
  };

  // Reply submit
  const handlePostReply = (parentId) => {
    if (!replyValue.trim()) return;

    const newReply = {
      id: Date.now(),
      parentId: parentId,
      author: "current_user",
      content: replyValue,
      timestamp: "Just now",
      votes: 1,
      userVote: "up",
      isNew: true
    };

    setComments(prev => [...prev, newReply]);
    setReplyValue("");
    setReplyingToId(null);
  };

  // Root comment submit
  const handlePostRoot = (e) => {
    e.preventDefault();
    if (!rootValue.trim()) return;

    const newRoot = {
      id: Date.now(),
      parentId: null,
      author: "current_user",
      content: rootValue,
      timestamp: "Just now",
      votes: 1,
      userVote: "up",
      isNew: true
    };

    setComments(prev => [...prev, newRoot]);
    setRootValue("");
  };

  // Recursive comment renderer helper
  const renderReplies = (parentId, depth = 0) => {
    const childComments = comments.filter(c => c.parentId === parentId);
    if (childComments.length === 0) return null;

    return (
      <div className="flex flex-col gap-4 mt-4 relative">
        {/* Indent vertical guide line */}
        <div 
          className="absolute left-[15px] top-2 bottom-2 w-px bg-white/5 shadow-inner transition-colors duration-300"
          style={{ backgroundImage: `linear-gradient(180deg, rgba(${activeTheme.rgb}, 0.15), transparent)` }}
        />

        {childComments.map((comment) => (
          <div key={comment.id} className="pl-7">
            <CommentCard
              comment={comment}
              depth={depth + 1}
              activeTheme={activeTheme}
              replyingToId={replyingToId}
              replyValue={replyValue}
              onVote={handleVote}
              onSetReply={setReplyingToId}
              onReplyChange={setReplyValue}
              onPostReply={handlePostReply}
            />
            {renderReplies(comment.id, depth + 1)}
          </div>
        ))}
      </div>
    );
  };

  const rootComments = comments.filter(c => c.parentId === null);

  return (
    <div className="min-h-screen p-4 md:p-8 select-none bg-[#060810]"
      style={{ fontFamily: "'Inter', sans-serif" }}>
      
      <div className="w-full max-w-3xl mx-auto flex flex-col gap-6">
        
        {/* Header Board Panel */}
        <div className="bg-[#0a0d1a] border border-white/5 rounded-2xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-[inset_0_2px_4px_rgba(0,0,0,0.6)]">
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-mono tracking-widest text-white/40 uppercase block">
              CLUSTER DISCUSSIONS
            </span>
            <h1 className="text-xl md:text-2xl font-black text-white tracking-tight"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Threaded Discussion Board
            </h1>
            <p className="text-xs text-white/45 max-w-lg">
              Indented discussion cards with vertical guidelines, elastic reply-box reflows, micro-jump upvotes, and eye-drawing highlight sweeps.
            </p>
          </div>

          <div className="flex items-center gap-3 self-end md:self-auto flex-shrink-0">
            {/* Minimal Settings Trigger */}
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 text-white/60 hover:text-white cursor-pointer transition-colors"
            >
              <Settings size={14} className={showSettings ? "rotate-45" : ""} />
            </button>
            
            {/* Color Swatches */}
            <AnimatePresence>
              {showSettings && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="flex items-center gap-1.5 bg-black/35 px-2.5 py-1.5 rounded-xl border border-white/5"
                >
                  {THEMES.map(theme => (
                    <button
                      key={theme.id}
                      onClick={() => setActiveTheme(theme)}
                      className="w-3.5 h-3.5 rounded-full cursor-pointer relative flex items-center justify-center transition-transform active:scale-75"
                      style={{ backgroundColor: theme.color }}
                      aria-label={`Swatch ${theme.name}`}
                    >
                      {activeTheme.id === theme.id && (
                        <motion.div
                          layoutId="active-comments-theme-ring"
                          className="absolute -inset-1 rounded-full border border-current opacity-80"
                          style={{ color: theme.color }}
                          transition={{ type: "spring", stiffness: 350, damping: 25 }}
                        />
                      )}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* New Root Comment Box */}
        <form 
          onSubmit={handlePostRoot}
          className={`bg-[#0a0d1a] border rounded-2xl p-4 flex flex-col gap-3 transition-all duration-300 ${activeTheme.focusBorder} ${activeTheme.ring} border-white/5`}
        >
          <div className="flex items-center gap-2 text-[10px] font-mono font-bold text-white/40">
            <MessageSquare size={11} />
            <span>POST ROOT UPDATE</span>
          </div>
          
          <textarea
            placeholder="Share your feedback or suggestions..."
            value={rootValue}
            onChange={(e) => setRootValue(e.target.value)}
            className="w-full bg-white/[0.02] border border-white/5 focus:outline-none rounded-xl p-3 text-xs text-white placeholder-white/20 min-h-[70px] resize-none"
          />

          <div className="flex justify-end">
            <motion.button
              type="submit"
              disabled={!rootValue.trim()}
              whileHover={rootValue.trim() ? { scale: 1.02 } : {}}
              whileTap={rootValue.trim() ? { scale: 0.98 } : {}}
              className={`px-4 py-2 rounded-xl font-bold font-mono text-[10px] uppercase tracking-wider transition-all duration-300 flex items-center gap-1.5 cursor-pointer ${
                rootValue.trim()
                  ? `text-black ${activeTheme.bg} ${activeTheme.glow}`
                  : "bg-white/5 text-white/20 border border-white/5 cursor-not-allowed"
              }`}
            >
              <Send size={10} />
              Post Thread
            </motion.button>
          </div>
        </form>

        {/* Comment Thread Cards List */}
        <div className="flex flex-col gap-4 mt-2">
          {rootComments.map((comment) => (
            <div key={comment.id} className="relative">
              <CommentCard
                comment={comment}
                depth={0}
                activeTheme={activeTheme}
                replyingToId={replyingToId}
                replyValue={replyValue}
                onVote={handleVote}
                onSetReply={setReplyingToId}
                onReplyChange={setReplyValue}
                onPostReply={handlePostReply}
              />
              {renderReplies(comment.id, 0)}
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

/* Individual Comment Card Component */
function CommentCard({
  comment,
  depth,
  activeTheme,
  replyingToId,
  replyValue,
  onVote,
  onSetReply,
  onReplyChange,
  onPostReply
}) {
  const isReplying = replyingToId === comment.id;

  const isUp = comment.userVote === "up";
  const isDown = comment.userVote === "down";

  return (
    <motion.div
      layout="position"
      initial={{ opacity: 0, y: 15 }}
      animate={{ 
        opacity: 1, 
        y: 0,
        backgroundColor: comment.isNew 
          ? [`rgba(${activeTheme.rgb}, 0.1)`, "rgba(10,13,26,0.95)"] 
          : "rgba(10,13,26,0.95)"
      }}
      transition={{ 
        type: "spring", 
        stiffness: 220, 
        damping: 24,
        backgroundColor: { duration: 2, ease: "easeOut" }
      }}
      className={`border rounded-2xl p-4 md:p-5 relative overflow-hidden flex gap-4 ${
        comment.isNew ? `border-white/10` : "border-white/5"
      }`}
      style={{
        boxShadow: "0 4px 10px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.02)"
      }}
    >
      {/* Highlight Sweep Line Accent for new comments */}
      {comment.isNew && (
        <motion.div 
          initial={{ left: "-100%" }}
          animate={{ left: "100%" }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="absolute inset-y-0 w-24 bg-gradient-to-r from-transparent via-white/[0.04] to-transparent pointer-events-none skew-x-12"
        />
      )}

      {/* Side Vote Module */}
      <div className="flex flex-col items-center gap-1 flex-shrink-0">
        
        {/* Upvote */}
        <motion.button
          onClick={() => onVote(comment.id, "up")}
          animate={isUp ? { y: [0, -5, 0], scale: 1.15 } : { y: 0, scale: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 10 }}
          className={`p-1.5 rounded-lg bg-white/5 border hover:bg-white/10 transition-colors cursor-pointer ${
            isUp ? `border-current ${activeTheme.text}` : "border-white/5 text-white/30"
          }`}
        >
          <ChevronUp size={12} strokeWidth={isUp ? 4 : 2.5} />
        </motion.button>

        {/* Votes Count */}
        <span className="text-[10px] font-bold font-mono text-white/50 w-6 text-center my-0.5">
          {comment.votes}
        </span>

        {/* Downvote */}
        <motion.button
          onClick={() => onVote(comment.id, "down")}
          animate={isDown ? { y: [0, 5, 0], scale: 1.15 } : { y: 0, scale: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 10 }}
          className={`p-1.5 rounded-lg bg-white/5 border hover:bg-white/10 transition-colors cursor-pointer ${
            isDown ? `border-current ${activeTheme.text}` : "border-white/5 text-white/30"
          }`}
        >
          <ChevronDown size={12} strokeWidth={isDown ? 4 : 2.5} />
        </motion.button>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col gap-2 relative">
        
        {/* Header row */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-5 h-5 rounded-lg bg-white/5 flex items-center justify-center relative">
              <User size={10} className="text-white/45" />
            </span>
            <span 
              className={`text-[10px] font-black font-mono transition-colors duration-300 ${
                comment.author === "current_user" ? activeTheme.text : "text-white/80"
              }`}
            >
              {comment.author}
            </span>
          </div>

          <span className="text-[9px] text-white/20 font-semibold font-mono">
            {comment.timestamp}
          </span>
        </div>

        {/* Comment text */}
        <p className="text-xs text-white/50 leading-relaxed pr-2 select-text selection:bg-cyan-500/25">
          {comment.content}
        </p>

        {/* Footer actions row */}
        <div className="flex items-center justify-between pt-2 border-t border-white/5 mt-2">
          <button
            onClick={() => {
              if (isReplying) {
                onSetReply(null);
              } else {
                onSetReply(comment.id);
                onReplyChange("");
              }
            }}
            className={`flex items-center gap-1 text-[9px] font-black uppercase font-mono tracking-wider transition-colors cursor-pointer ${
              isReplying ? activeTheme.text : "text-white/35 hover:text-white"
            }`}
          >
            <Reply size={9} />
            Reply
          </button>
        </div>

        {/* Morphing Reply Input Box */}
        <AnimatePresence>
          {isReplying && (
            <motion.div
              initial={{ height: 0, opacity: 0, marginTop: 0 }}
              animate={{ height: "auto", opacity: 1, marginTop: 16 }}
              exit={{ height: 0, opacity: 0, marginTop: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="overflow-hidden w-full flex flex-col gap-2 pt-2 border-t border-white/5"
            >
              <textarea
                placeholder={`Reply to ${comment.author}...`}
                value={replyValue}
                onChange={(e) => onReplyChange(e.target.value)}
                className="w-full bg-white/[0.02] border border-white/5 focus:outline-none rounded-xl p-2.5 text-xs text-white placeholder-white/20 min-h-[60px] resize-none"
              />

              <div className="flex justify-end gap-2">
                <button
                  onClick={() => onSetReply(null)}
                  className="px-2.5 py-1 bg-white/5 rounded-md text-[8px] uppercase font-bold font-mono text-white/40 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={() => onPostReply(comment.id)}
                  disabled={!replyValue.trim()}
                  className={`px-3 py-1 rounded-md text-[8px] uppercase font-bold font-mono text-black flex items-center gap-1 cursor-pointer transition-colors duration-300 ${
                    replyValue.trim()
                      ? `${activeTheme.bg} ${activeTheme.glow}`
                      : "bg-white/5 text-white/20 border border-white/5 cursor-not-allowed"
                  }`}
                >
                  <Send size={8} />
                  Post Reply
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </motion.div>
  );
}
