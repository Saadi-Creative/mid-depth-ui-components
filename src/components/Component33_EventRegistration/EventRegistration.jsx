import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Clock, MapPin, Check, ArrowRight, Sparkles } from "lucide-react";
import { useGlobalTheme } from "../../themes/ThemeContext";

const SPEAKERS = [
  {
    name: "Dr. Sarah Chen",
    role: "Acoustics Lead",
    bio: " Sarah leads research on neural-interface spatial audio at Vessel Laboratories.",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80"
  },
  {
    name: "Marcus Vance",
    role: "Core UX Architect",
    bio: "Marcus designs physics-based interactive layout systems for Next-Gen applications.",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
  }
];

export default function EventRegistration() {
  const { activeVariant } = useGlobalTheme();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [status, setStatus] = useState("idle"); // idle, submitting, success
  const [hoveredSpeaker, setHoveredSpeaker] = useState(null);

  // Countdown timer states
  const [days, setDays] = useState(2);
  const [hours, setHours] = useState(14);
  const [minutes, setMinutes] = useState(45);

  useEffect(() => {
    const interval = setInterval(() => {
      setMinutes((prev) => {
        if (prev === 0) {
          setHours((h) => {
            if (h === 0) {
              setDays((d) => (d > 0 ? d - 1 : 0));
              return 23;
            }
            return h - 1;
          });
          return 59;
        }
        return prev - 1;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleRSVP = (e) => {
    e.preventDefault();
    if (status !== "idle") return;

    setStatus("submitting");
    setTimeout(() => {
      setStatus("success");
    }, 1200);
  };

  return (
    <div
      className={`min-h-screen py-12 px-6 flex items-center justify-center relative overflow-hidden transition-colors duration-500  pt-[120px] pb-8 sm:pt-[120px] sm:pb-8 ${activeVariant.canvasClass} font-secondary`}
    >
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

      {/* Main card panel */}
      <div className={`max-w-xl w-full p-6 md:p-8 flex flex-col gap-6 relative overflow-hidden transition-all duration-300 ${activeVariant.cardClass}`}>

        {/* Header & Swatch Controller */}
        <div className="flex justify-between items-center pb-5 border-b border-current/10">
          <div className="flex items-center gap-2 text-xs font-mono-theme font-bold font-primary">
            <Sparkles size={14} style={{ color: activeVariant.triggerColor }} />
            <span>BROADCAST_RESERVE</span>
          </div>
        </div>

        {/* Live Split-Flap Countdown Timer */}
        <div className="flex items-center justify-center gap-4 py-4">
          <SplitFlapSegment label="DAYS" value={days} activeVariant={activeVariant} />
          <span className="text-xl font-black font-mono-theme opacity-20">:</span>
          <SplitFlapSegment label="HOURS" value={hours} activeVariant={activeVariant} />
          <span className="text-xl font-black font-mono-theme opacity-20">:</span>
          <SplitFlapSegment label="MINS" value={minutes} activeVariant={activeVariant} />
        </div>

        {/* Event Header Info */}
        <div className="text-center">
          <h2 className="text-xl font-black tracking-tight leading-tight uppercase font-primary">
            Spatial Acoustics & Interactive Nodes
          </h2>
          <div className="flex flex-wrap justify-center gap-4 mt-3 text-[10px] opacity-50 font-mono-theme">
            <span className="flex items-center gap-1.5"><Calendar size={12} /> May 28, 2026</span>
            <span className="flex items-center gap-1.5"><Clock size={12} /> 10:00 AM EST</span>
            <span className="flex items-center gap-1.5"><MapPin size={12} /> Live stream</span>
          </div>
        </div>

        {/* Speaker Profile Cards Layer */}
        <div className="flex flex-col gap-3.5">
          <span className="text-[9px] opacity-40 uppercase tracking-widest font-mono-theme block">Event Speakers</span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {SPEAKERS.map((speaker, idx) => (
              <div
                key={idx}
                onMouseEnter={() => setHoveredSpeaker(idx)}
                onMouseLeave={() => setHoveredSpeaker(null)}
                className="relative flex items-center gap-3 p-3 border border-current/10 bg-current/[0.02] h-16 transition-all duration-300"
                style={{
                  borderRadius: "var(--theme-border-radius-action)"
                }}
              >
                <img
                  src={speaker.avatar}
                  alt={speaker.name}
                  className="w-10 h-10 rounded-full object-cover border border-current/10"
                />
                <div className="flex-1 min-w-0 font-secondary">
                  <h4 className="text-xs font-bold leading-none font-primary">{speaker.name}</h4>
                  <span className="text-[8px] opacity-55 mt-1 block leading-none font-mono-theme">{speaker.role}</span>
                </div>

                {/* Flat sliding Bio Card to the right side */}
                <AnimatePresence>
                  {hoveredSpeaker === idx && (
                    <motion.div
                      initial={{ opacity: 0, x: -10, scale: 0.95 }}
                      animate={{ opacity: 1, x: 0, scale: 1 }}
                      exit={{ opacity: 0, x: -10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute left-full top-0 ml-2 w-48 bg-[#0c0f20] border border-white/10 p-3 rounded-xl shadow-2xl z-[var(--z-overlay)] pointer-events-none text-white font-secondary"
                      style={{
                        borderRadius: "var(--theme-border-radius-action)"
                      }}
                    >
                      <h5 className="text-[9px] font-black font-primary uppercase tracking-widest text-white/30 mb-1">Speaker Bio</h5>
                      <p className="text-[9px] text-white/50 leading-normal">{speaker.bio}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>

        {/* Form Container */}
        <div className="border-t border-current/10 pt-5 font-secondary">
          <AnimatePresence mode="wait">
            {status === "success" ? (
              /* Success confirmation */
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={activeVariant.transition}
                className="flex flex-col items-center text-center p-4 border border-current/10 bg-current/[0.01]"
                style={{
                  borderRadius: "var(--theme-border-radius-action)"
                }}
              >
                <div className="w-10 h-10 rounded-full flex items-center justify-center bg-emerald-500/10 border border-emerald-500/25 mb-3">
                  <Check size={20} className="text-emerald-400" />
                </div>
                <h3 className="text-xs font-black uppercase font-primary tracking-widest text-emerald-400">Seat Confirmed</h3>
                <p className="text-[10px] opacity-60 leading-normal mt-1 px-4 font-mono-theme">
                  Calendar invites and verification keys have been sent to your inbox.
                </p>
              </motion.div>
            ) : (
              /* Registration Input Form */
              <motion.form
                key="form"
                onSubmit={handleRSVP}
                className="flex flex-col gap-4"
              >
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[9px] opacity-40 uppercase tracking-widest font-mono-theme block mb-1.5">First Name</label>
                    <input
                      type="text"
                      required
                      placeholder="Alex"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className={`w-full h-10 px-3 text-xs focus:outline-none transition-all ${activeVariant.inputClass}`}
                    />
                  </div>

                  <div>
                    <label className="text-[9px] opacity-40 uppercase tracking-widest font-mono-theme block mb-1.5">Email Node</label>
                    <input
                      type="email"
                      required
                      placeholder="alex@vessel.io"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={`w-full h-10 px-3 text-xs focus:outline-none transition-all ${activeVariant.inputClass}`}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className={`w-full h-11 transition-colors duration-300 flex items-center justify-center gap-1.5 cursor-pointer ${activeVariant.buttonClass}`}
                  style={{
                    borderRadius: "var(--theme-border-radius-action)"
                  }}
                >
                  <span className="font-primary">Save My Seat</span>
                  <ArrowRight size={12} />
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}

/* Split-Flap Segment helper for count representation */
function SplitFlapSegment({ label, value, activeVariant }) {
  const formattedVal = String(value).padStart(2, "0");

  return (
    <div className="flex flex-col items-center">
      <div className="flex gap-0.5 relative">
        {formattedVal.split("").map((digit, idx) => (
          <div
            key={idx}
            className="w-10 h-14 bg-black/60 border border-current/10 flex items-center justify-center relative overflow-hidden shadow-inner"
            style={{
              borderRadius: "var(--theme-border-radius-action)"
            }}
          >
            <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-black/80 z-20" />

            <AnimatePresence mode="wait">
              <motion.span
                key={digit}
                initial={{ rotateX: 90, opacity: 0 }}
                animate={{ rotateX: 0, opacity: 1 }}
                exit={{ rotateX: -90, opacity: 0 }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className="text-2xl font-black font-mono-theme text-current relative z-10 leading-none"
              >
                {digit}
              </motion.span>
            </AnimatePresence>
          </div>
        ))}
      </div>
      <span className="text-[7px] font-mono-theme tracking-widest opacity-40 mt-2 font-bold">{label}</span>
    </div>
  );
}
