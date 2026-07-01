import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Shield, Bell, Key, Check, Eye, EyeOff } from "lucide-react";
import { useGlobalTheme } from "../../themes/ThemeContext";

const TABS = [
  { id: "profile", label: "Profile Details", icon: User },
  { id: "security", label: "Security & Keys", icon: Shield },
  { id: "notifications", label: "Notifications", icon: Bell }
];

export default function AccountSettingsHub() {
  const { activeVariant } = useGlobalTheme();
  const [activeTab, setActiveTab] = useState("profile");
  
  // Settings Form States
  const [name, setName] = useState("Alex Mercer");
  const [email, setEmail] = useState("alex.m@vessel.io");
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("••••••••••••••••");
  
  // Security settings
  const [twoFactor, setTwoFactor] = useState(false);
  const [tfaCode, setTfaCode] = useState("");

  // Notifications settings
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [securityAlerts, setSecurityAlerts] = useState(true);

  const handleTfaToggle = () => {
    if (twoFactor) {
      setTwoFactor(false);
      setTfaCode("");
    } else {
      setTwoFactor(true);
    }
  };

  return (
    <div 
      className={`min-h-screen relative py-12 px-4 md:px-8 overflow-hidden transition-colors duration-500  pt-[120px] pb-8 sm:pt-[120px] sm:pb-8 ${activeVariant.canvasClass} font-secondary`}
    >
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

      {/* Settings Container */}
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-6 relative z-[var(--z-base)]">
        
        {/* Sidebar Panel */}
        <aside className={`w-full md:w-64 p-4 flex flex-col gap-6 transition-all duration-300 ${activeVariant.cardClass}`}>
          <div className="flex justify-between items-center px-2 pb-4 border-b border-current/10">
            <div>
              <h1 className="text-xs font-black tracking-widest font-primary uppercase">Account Hub</h1>
              <span className="text-[9px] opacity-40 uppercase tracking-widest font-mono-theme">Control Center</span>
            </div>
          </div>

          {/* Navigation */}
          <nav className="relative flex flex-col gap-1.5 font-primary" aria-label="Account Settings sections">
            {TABS.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full py-3 px-4 flex items-center gap-3 text-xs font-black tracking-wider uppercase cursor-pointer transition-all duration-300 relative text-left ${
                    isActive ? "text-white" : "opacity-50 hover:opacity-85 text-current"
                  }`}
                  style={{
                    borderRadius: "var(--theme-border-radius-action)"
                  }}
                  aria-current={isActive ? "page" : undefined}
                >
                  {isActive && (
                    <motion.div
                      layoutId="sidebar-active-pill-global"
                      className="absolute inset-0 z-0 bg-current opacity-10"
                      style={{
                        borderRadius: "var(--theme-border-radius-action)"
                      }}
                      transition={{ type: "spring", stiffness: 350, damping: 26 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-3">
                    <Icon size={14} style={{ color: isActive ? activeVariant.triggerColor : undefined }} />
                    {tab.label}
                  </span>
                </button>
              );
            })}
          </nav>
        </aside>

        {/* Main Content Area Panel */}
        <main className={`flex-1 p-6 md:p-8 min-h-[460px] flex flex-col justify-between transition-all duration-300 ${activeVariant.cardClass}`}>
          
          <div className="flex-1">
            <AnimatePresence mode="wait">
              {activeTab === "profile" && (
                <motion.div
                  key="profile"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="flex flex-col gap-5"
                >
                  <div>
                    <h2 className="text-sm font-black font-primary uppercase tracking-wider">Profile Details</h2>
                    <p className="text-[9px] opacity-40 leading-relaxed mt-1 uppercase tracking-widest font-mono-theme">Modify directory identity vectors</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-secondary">
                    <div>
                      <label className="text-[9px] opacity-40 uppercase tracking-widest font-mono-theme block mb-1.5">Full Name</label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className={`w-full h-10 px-3 text-xs focus:outline-none transition-all ${activeVariant.inputClass}`}
                      />
                    </div>
                    <div>
                      <label className="text-[9px] opacity-40 uppercase tracking-widest font-mono-theme block mb-1.5">Email Node</label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={`w-full h-10 px-3 text-xs focus:outline-none transition-all ${activeVariant.inputClass}`}
                      />
                    </div>
                  </div>

                  <div className="font-secondary">
                    <label className="text-[9px] opacity-40 uppercase tracking-widest font-mono-theme block mb-1.5">Password</label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className={`w-full h-10 pl-3 pr-10 text-xs focus:outline-none transition-all ${activeVariant.inputClass}`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 opacity-40 hover:opacity-80 cursor-pointer text-current"
                        aria-label={showPassword ? "Hide password" : "Show password"}
                      >
                        {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === "security" && (
                <motion.div
                  key="security"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="flex flex-col gap-6"
                >
                  <div>
                    <h2 className="text-sm font-black font-primary uppercase tracking-wider">Security & Keys</h2>
                    <p className="text-[9px] opacity-40 leading-relaxed mt-1 uppercase tracking-widest font-mono-theme">Ensure active cryptographic defense parameters</p>
                  </div>

                  {/* 2FA Toggle Switch Container */}
                  <div className="p-4 rounded-xl flex flex-col gap-4 border border-current/10 bg-current/[0.02]" style={{ borderRadius: "var(--theme-border-radius-action)" }}>
                    <div className="flex items-center justify-between">
                      <div className="flex gap-3">
                        <Key size={16} className="mt-0.5" style={{ color: activeVariant.triggerColor }} />
                        <div>
                          <h3 className="text-xs font-black font-primary uppercase">Two-Factor Authentication (2FA)</h3>
                          <p className="text-[9px] opacity-40 leading-normal mt-0.5 font-secondary">Secure your channel configuration updates.</p>
                        </div>
                      </div>
                      
                      {/* Accessible Switch */}
                      <button
                        type="button"
                        onClick={handleTfaToggle}
                        className="w-11 h-6 rounded-full p-1 cursor-pointer transition-colors relative"
                        style={{
                          backgroundColor: twoFactor ? activeVariant.triggerColor : "rgba(255,255,255,0.12)"
                        }}
                        role="switch"
                        aria-checked={twoFactor}
                        aria-label="Two-factor authentication"
                      >
                        <motion.div
                          layout
                          className="w-4 h-4 bg-white rounded-full shadow-md"
                          transition={{ type: "spring", stiffness: 500, damping: 30 }}
                          style={{ marginLeft: twoFactor ? "auto" : "0" }}
                        />
                      </button>
                    </div>

                    <AnimatePresence>
                      {twoFactor && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={activeVariant.transition}
                          className="overflow-hidden border-t border-current/10 pt-4 mt-2"
                        >
                          <div className="flex flex-col sm:flex-row gap-4 items-center font-secondary">
                            {/* QR Code Placeholder */}
                            <div className="w-20 h-20 bg-white p-2 flex-shrink-0 border border-white/10" style={{ borderRadius: "var(--theme-border-radius-action)" }}>
                              <div className="w-full h-full bg-[linear-gradient(45deg,#000_25%,transparent_25%),linear-gradient(-45deg,#000_25%,transparent_25%),linear-gradient(45deg,transparent_75%,#000_75%),linear-gradient(-45deg,transparent_75%,#000_75%)] bg-[size:10px_10px] opacity-80" />
                            </div>

                            <div className="flex-1 flex flex-col gap-2.5 w-full">
                              <span className="text-[8px] opacity-45 uppercase tracking-widest font-mono-theme block block">Setup Guide Step 1/2</span>
                              <p className="text-[10px] opacity-50 leading-relaxed font-secondary">
                                Scan the QR code with your authenticator node and input the sequencing key below.
                              </p>
                              
                              <div className="flex gap-2">
                                <input
                                  type="text"
                                  placeholder="000 000"
                                  value={tfaCode}
                                  onChange={(e) => setTfaCode(e.target.value)}
                                  className={`w-32 h-10 px-3 text-xs focus:outline-none transition-all ${activeVariant.inputClass}`}
                                />
                                <button
                                  type="button"
                                  className={`px-4 font-bold font-mono-theme text-[9px] uppercase tracking-wider text-white cursor-pointer ${activeVariant.buttonClass}`}
                                  style={{
                                    borderRadius: "var(--theme-border-radius-action)"
                                  }}
                                >
                                  Sync
                                </button>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              )}

              {activeTab === "notifications" && (
                <motion.div
                  key="notifications"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="flex flex-col gap-5"
                >
                  <div>
                    <h2 className="text-sm font-black font-primary uppercase tracking-wider">Notifications</h2>
                    <p className="text-[9px] opacity-40 leading-relaxed mt-1 uppercase tracking-widest font-mono-theme">Toggle broadcasting alert channels</p>
                  </div>

                  <div className="flex flex-col gap-4 font-secondary">
                    <div className="flex items-center justify-between p-3.5 border border-current/10 bg-current/[0.02] rounded-xl" style={{ borderRadius: "var(--theme-border-radius-action)" }}>
                      <div>
                        <h3 className="text-xs font-black font-primary uppercase">Email Broadcasts</h3>
                        <p className="text-[9px] opacity-40 font-secondary">Get node parameter reports weekly.</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setEmailAlerts(!emailAlerts)}
                        className="w-11 h-6 rounded-full p-1 cursor-pointer transition-colors relative"
                        style={{
                          backgroundColor: emailAlerts ? activeVariant.triggerColor : "rgba(255,255,255,0.12)"
                        }}
                        role="switch"
                        aria-checked={emailAlerts}
                        aria-label="Email alerts"
                      >
                        <motion.div
                          layout
                          className="w-4 h-4 bg-white rounded-full shadow-md"
                          transition={{ type: "spring", stiffness: 500, damping: 30 }}
                          style={{ marginLeft: emailAlerts ? "auto" : "0" }}
                        />
                      </button>
                    </div>

                    <div className="flex items-center justify-between p-3.5 border border-current/10 bg-current/[0.02] rounded-xl" style={{ borderRadius: "var(--theme-border-radius-action)" }}>
                      <div>
                        <h3 className="text-xs font-black font-primary uppercase">Critical Security Notifications</h3>
                        <p className="text-[9px] opacity-40 font-secondary">Immediate warning pins on unrecognized access.</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setSecurityAlerts(!securityAlerts)}
                        className="w-11 h-6 rounded-full p-1 cursor-pointer transition-colors relative"
                        style={{
                          backgroundColor: securityAlerts ? activeVariant.triggerColor : "rgba(255,255,255,0.12)"
                        }}
                        role="switch"
                        aria-checked={securityAlerts}
                        aria-label="Security alerts"
                      >
                        <motion.div
                          layout
                          className="w-4 h-4 bg-white rounded-full shadow-md"
                          transition={{ type: "spring", stiffness: 500, damping: 30 }}
                          style={{ marginLeft: securityAlerts ? "auto" : "0" }}
                        />
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Footer Card Action Button */}
          <div className="pt-6 border-t border-current/10 flex justify-end gap-3 mt-8 font-primary">
            <button
              type="button"
              className="px-5 py-3 border border-current/20 opacity-60 hover:opacity-100 text-[9px] font-bold uppercase tracking-wider text-current cursor-pointer bg-transparent transition-all"
              style={{
                borderRadius: "var(--theme-border-radius-action)"
              }}
            >
              Reset Settings
            </button>
            
            <button
              type="button"
              className={`px-6 py-3 font-bold text-[9px] uppercase tracking-wider cursor-pointer transition-colors duration-300 ${activeVariant.buttonClass}`}
              style={{
                borderRadius: "var(--theme-border-radius-action)"
              }}
            >
              Save Changes
            </button>
          </div>

        </main>
      </div>
    </div>
  );
}
