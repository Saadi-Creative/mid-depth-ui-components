import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, RefreshCw, AlertCircle, CheckCircle, ArrowRight, HelpCircle } from "lucide-react";
import { useGlobalTheme } from "../../themes/ThemeContext";

export default function OTPVerification() {
  const { activeVariant } = useGlobalTheme();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(59);
  const [status, setStatus] = useState("idle"); // idle, verifying, success, error
  const [errorCount, setErrorCount] = useState(0);

  const inputsRef = useRef([]);

  // Mock code for validation
  const CORRECT_CODE = "123456";

  // Countdown timer logic
  useEffect(() => {
    if (timer <= 0) return;
    const interval = setInterval(() => {
      setTimer(prev => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timer]);

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
    border: `border-current/25`,
    focusBorder: "focus:border-current",
    bg: "",
    hoverBg: "",
    text: activeVariant.textClass,
    accentBg: `rgba(${rgbStr}, 0.1)`,
    shadow: `shadow-[0_0_15px_rgba(${rgbStr},0.3)]`,
    glowRing: "focus:ring-2 focus:ring-current/20"
  };

  // Sync state and forward focus
  const handleChange = (e, index) => {
    const value = e.target.value;
    if (isNaN(Number(value))) return; // restrict to digits only

    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1); // target last typed character
    setOtp(newOtp);

    // If typing a value, bounce scale and focus next
    if (value && index < 5) {
      inputsRef.current[index + 1].focus();
    }

    // Auto submit if final digit filled
    if (newOtp.every(val => val !== "") && value) {
      handleVerify(newOtp.join(""));
    }
  };

  // Backspace key delete backwards
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      if (!otp[index] && index > 0) {
        // Empty box backspace triggers previous box focus
        const newOtp = [...otp];
        newOtp[index - 1] = "";
        setOtp(newOtp);
        inputsRef.current[index - 1].focus();
      } else {
        const newOtp = [...otp];
        newOtp[index] = "";
        setOtp(newOtp);
      }
    }
  };

  // Paste handler to distribute digits
  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text/plain").trim();
    if (/^\d{6}$/.test(pasteData)) {
      const pasteDigits = pasteData.split("");
      setOtp(pasteDigits);
      inputsRef.current[5].focus();
      handleVerify(pasteData);
    }
  };

  // Verify function
  const handleVerify = (codeToVerify = otp.join("")) => {
    if (codeToVerify.length < 6) return;
    
    setStatus("verifying");
    setTimeout(() => {
      if (codeToVerify === CORRECT_CODE) {
        setStatus("success");
      } else {
        setStatus("error");
        setErrorCount(prev => prev + 1);
        setTimeout(() => setStatus("idle"), 1200); // return to idle after haptic shake
      }
    }, 1000);
  };

  // Resend code trigger
  const handleResend = () => {
    if (timer > 0) return;
    setOtp(["", "", "", "", "", ""]);
    setStatus("idle");
    setTimer(59);
    inputsRef.current[0].focus();
  };

  const isVerifying = status === "verifying";
  const isSuccess = status === "success";
  const isError = status === "error";

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 select-none transition-colors duration-500 ${activeVariant.canvasClass}`}
      style={{ fontFamily: "'Inter', sans-serif" }}>
      
      <div className="w-full max-w-md flex flex-col gap-6 relative">
        
        {/* Layered Flat OTP Card */}
        <div 
          className={`p-8 relative overflow-hidden transition-all duration-300 ${activeVariant.cardClass} ${
            isSuccess 
              ? "border-emerald-500/30" 
              : isError 
                ? "border-rose-500/30" 
                : ""
          }`}
          style={{
            boxShadow: isSuccess
              ? "0 20px 40px rgba(0,0,0,0.5), 0 0 30px rgba(16,185,129,0.08), inset 0 1px 0 rgba(255,255,255,0.04)"
              : isError
                ? "0 20px 40px rgba(0,0,0,0.5), 0 0 30px rgba(239,68,68,0.08), inset 0 1px 0 rgba(255,255,255,0.04)"
                : activeVariant.id === "brutal" ? "none" : "0 20px 40px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.02)"
          }}
        >
          {/* Card Accent Color Header */}
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-2">
              <div 
                className="w-8 h-8 rounded-xl flex items-center justify-center border transition-all duration-300"
                style={{ 
                  backgroundColor: activeTheme.accentBg, 
                  borderColor: `rgba(${activeTheme.rgb}, 0.25)`,
                  color: activeTheme.color 
                }}
              >
                <ShieldCheck size={16} />
              </div>
              <span className="text-[10px] font-mono font-black opacity-45 uppercase tracking-widest">
                VERIFICATION HUB
              </span>
            </div>
          </div>

          {/* Heading */}
          <div className="flex flex-col gap-1 mb-8">
            <h2 className="text-lg font-black leading-tight font-mono uppercase tracking-wide">
              Two-Factor Authentication
            </h2>
            <p className="text-xs opacity-45 leading-relaxed">
              We have sent a verification code to your device. Please insert the 6-digit security token below.
            </p>
            <div className="flex items-center gap-1.5 text-[9px] font-mono opacity-40 font-bold bg-current/5 border border-current/5 px-2 py-1 rounded-lg w-fit mt-1">
              <HelpCircle size={10} />
              Hint code: <code className="opacity-80">123456</code>
            </div>
          </div>

          {/* Haptic Shake Box Container */}
          <motion.div
            animate={isError ? {
              x: [0, -12, 12, -10, 10, -6, 6, 0]
            } : { x: 0 }}
            transition={{ duration: 0.55, ease: "easeInOut" }}
            className="flex justify-between gap-2.5 mb-8"
          >
            {otp.map((digit, index) => {
              const hasVal = digit !== "";

              return (
                <motion.div
                  key={index}
                  animate={
                    isSuccess
                      ? {
                          scale: [1, 1.12, 1],
                          borderColor: [activeVariant.mode === "dark" ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)", activeTheme.color, "rgba(16,185,129,0.4)"],
                          backgroundColor: [activeVariant.mode === "dark" ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.02)", activeTheme.accentBg, "rgba(16,185,129,0.03)"]
                        }
                      : hasVal && !isError
                        ? { scale: 1.05 }
                        : { scale: 1 }
                  }
                  transition={{
                    scale: { type: "spring", stiffness: 300, damping: 12 },
                    default: { duration: 0.4, delay: isSuccess ? index * 0.08 : 0 }
                  }}
                  className="flex-1 aspect-square rounded-2xl relative overflow-visible"
                >
                  <input
                    ref={el => inputsRef.current[index] = el}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleChange(e, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    onPaste={handlePaste}
                    disabled={isVerifying || isSuccess}
                    className={`w-full h-full text-center text-xl font-bold transition-all duration-300 font-mono focus:outline-none ${activeVariant.inputClass} ${
                      isSuccess
                        ? "border-emerald-500/25 text-emerald-400 focus:ring-0"
                        : isError
                          ? "border-rose-500/35 text-rose-400 focus:ring-2 focus:ring-rose-500/10"
                          : hasVal
                            ? `${activeTheme.border}`
                            : "opacity-80"
                    }`}
                    style={{
                      boxShadow: isSuccess 
                        ? `0 0 15px rgba(16,185,129, 0.15)` 
                        : isError 
                          ? `0 0 15px rgba(239,68,68, 0.15)` 
                          : hasVal && isHoveredIndex === index
                            ? `0 0 10px rgba(${activeTheme.rgb}, 0.08)`
                            : "none"
                    }}
                  />
                </motion.div>
              );
            })}
          </motion.div>

          {/* Validation Messages Block */}
          <div className="h-6 mb-6 flex items-center justify-center font-mono text-[10px] font-bold">
            <AnimatePresence mode="wait">
              {isVerifying && (
                <motion.span
                  key="verifying"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="opacity-40 flex items-center gap-1.5"
                >
                  <RefreshCw size={11} className="animate-spin" />
                  AUTHENTICATING TOKEN...
                </motion.span>
              )}
              {isSuccess && (
                <motion.span
                  key="success"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="text-emerald-400 flex items-center gap-1.5"
                >
                  <CheckCircle size={11} />
                  VALIDATION SECURED SUCCESS
                </motion.span>
              )}
              {isError && (
                <motion.span
                  key="error"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="text-rose-400 flex items-center gap-1.5"
                >
                  <AlertCircle size={11} />
                  TOKEN INVALID. SHAKE FAILURE.
                </motion.span>
              )}
              {!isVerifying && !isSuccess && !isError && (
                <motion.span
                  key="idle"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="opacity-30"
                >
                  ENTER SECURITY KEY TO UNLOCK
                </motion.span>
              )}
            </AnimatePresence>
          </div>

          {/* Submit Action Button */}
          <motion.button
            onClick={() => handleVerify()}
            disabled={otp.some(v => v === "") || isVerifying || isSuccess}
            whileHover={{ scale: 1.02, y: -1 }}
            whileTap={{ scale: 0.98 }}
            className={`w-full py-3.5 rounded-2xl font-bold font-mono text-xs uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-1.5 cursor-pointer ${
              otp.some(v => v === "") || isVerifying || isSuccess
                ? "bg-current/5 border border-current/5 opacity-30 cursor-not-allowed"
                : `${activeVariant.buttonClass} ${activeTheme.shadow}`
            }`}
          >
            <span>Verify Token</span>
            <ArrowRight size={13} />
          </motion.button>

          {/* Resend details */}
          <div className="mt-8 text-center flex flex-col gap-1 border-t border-current/5 pt-6">
            <span className="text-[10px] opacity-35">
              Didn't receive the authentication token?
            </span>
            
            <button
              onClick={handleResend}
              disabled={timer > 0}
              className={`text-[10px] font-bold font-mono uppercase tracking-wider mt-1 transition-colors w-fit mx-auto cursor-pointer ${
                timer > 0 
                  ? "opacity-20 cursor-default" 
                  : `${activeTheme.text} hover:underline`
              }`}
            >
              {timer > 0 ? (
                <span>
                  Resend token in <span className={activeTheme.text}>{timer}s</span>
                </span>
              ) : (
                <span className="flex items-center gap-1.5">
                  <RefreshCw size={9} />
                  Resend Code Now
                </span>
              )}
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}

// Simple dummy hover ref checking helper
const isHoveredIndex = null;
