import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ShoppingBag, Trash2, ShieldCheck, CreditCard, 
  MapPin, Check, Plus, Minus, ChevronRight, RefreshCw 
} from "lucide-react";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// 5 Color Swatches
const THEMES = [
  { id: "cobalt", name: "Cobalt", color: "#2563eb", bg: "bg-blue-600", text: "text-blue-500", border: "border-blue-600/30", focusBorder: "border-blue-500", glow: "shadow-blue-500/20" },
  { id: "crimson", name: "Crimson", color: "#e11d48", bg: "bg-rose-600", text: "text-rose-500", border: "border-rose-600/30", focusBorder: "border-rose-500", glow: "shadow-rose-500/20" },
  { id: "mint", name: "Mint", color: "#10b981", bg: "bg-emerald-600", text: "text-emerald-500", border: "border-emerald-600/30", focusBorder: "border-emerald-500", glow: "shadow-emerald-500/20" },
  { id: "gold", name: "Gold", color: "#eab308", bg: "bg-yellow-500", text: "text-yellow-500", border: "border-yellow-500/30", focusBorder: "border-yellow-500", glow: "shadow-yellow-500/20" },
  { id: "violet", name: "Violet", color: "#8b5cf6", bg: "bg-violet-600", text: "text-violet-500", border: "border-violet-600/30", focusBorder: "border-violet-500", glow: "shadow-violet-500/20" },
];

const INITIAL_CART = [
  { id: 1, name: "Apex Pro Mechanical Keyboard", price: 189.99, qty: 1, image: "https://images.unsplash.com/photo-1595225476474-87563907a212?q=80&w=200&auto=format&fit=crop" },
  { id: 2, name: "Aerox 3 Wireless Mouse", price: 99.99, qty: 1, image: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?q=80&w=200&auto=format&fit=crop" },
  { id: 3, name: "Prism RGB Desk Mat XL", price: 34.99, qty: 2, image: "https://images.unsplash.com/photo-1585776245991-cf89dd7fc73a?q=80&w=200&auto=format&fit=crop" }
];

// Input Field with Orbiting Tracer + Vibration Shake
const TracerInput = ({ label, type = "text", placeholder, name, value, onChange, error, theme, onBlur }) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <motion.div 
      className="flex flex-col gap-1 w-full"
      animate={error ? { x: [0, -8, 8, -6, 6, -4, 4, 0] } : {}}
      transition={{ duration: 0.4, ease: "easeInOut" }}
    >
      <label className="text-xs text-white/50 font-medium tracking-wide uppercase">{label}</label>
      <div className="relative rounded-xl bg-white/[0.02] border border-white/10 transition-colors duration-200">
        
        {/* Neon Tracer Line orbiting border */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible rounded-xl">
          <motion.rect
            x="0" y="0"
            width="100%"
            height="100%"
            rx="11"
            fill="none"
            stroke={theme.color}
            strokeWidth="2"
            initial={{ strokeDasharray: "60 220", strokeDashoffset: 0, opacity: 0 }}
            animate={isFocused ? { strokeDashoffset: -280, opacity: 1 } : { opacity: 0 }}
            transition={isFocused ? { repeat: Infinity, duration: 1.5, ease: "linear" } : {}}
          />
        </svg>

        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          onFocus={() => setIsFocused(true)}
          onBlur={() => { setIsFocused(false); if (onBlur) onBlur(); }}
          className={cn(
            "w-full bg-transparent px-4 py-3 text-sm text-white placeholder-white/20 outline-none rounded-xl",
            error ? "border border-red-500/50 shadow-[0_0_8px_rgba(239,68,68,0.2)]" : ""
          )}
        />

        {/* Validation Checkmark */}
        {value && !error && (
          <div className="absolute right-3.5 top-1/2 -translate-y-1/2 flex items-center justify-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className={cn("w-4 h-4 rounded-full flex items-center justify-center bg-white/10", theme.text)}
            >
              <Check size={10} strokeWidth={3} />
            </motion.div>
          </div>
        )}
      </div>
      {error && <span className="text-[10px] text-red-500 font-semibold">{error}</span>}
    </motion.div>
  );
};

export default function MultiStepCheckout() {
  const [theme, setTheme] = useState(THEMES[0]); // Cobalt default
  const [cart, setCart] = useState(INITIAL_CART);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [step, setStep] = useState(1); // 1: Shipping, 2: Payment, 3: Success
  const [paymentMethod, setPaymentMethod] = useState("card"); // card or paypal

  // Form Fields State
  const [form, setForm] = useState({
    email: "", name: "", address: "", city: "", zip: "",
    cardNo: "", expiry: "", cvc: ""
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  // Basic Validation Shaker Triggers
  const validateStep = () => {
    const newErrors = {};
    if (step === 1) {
      if (!form.email || !form.email.includes("@")) newErrors.email = "Valid email is required";
      if (!form.name) newErrors.name = "Full name is required";
      if (!form.address) newErrors.address = "Address is required";
      if (!form.city) newErrors.city = "City is required";
      if (!form.zip) newErrors.zip = "ZIP/Postal code is required";
    } else if (step === 2 && paymentMethod === "card") {
      if (!form.cardNo || form.cardNo.length < 12) newErrors.cardNo = "Valid card number required";
      if (!form.expiry) newErrors.expiry = "Expiry date required";
      if (!form.cvc || form.cvc.length < 3) newErrors.cvc = "Valid CVC required";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      // Trigger a light device-like vibration fallback for active debugging
      return false;
    }
    return true;
  };

  const handleNextStep = () => {
    if (validateStep()) {
      setStep(prev => prev + 1);
    }
  };

  const updateQty = (id, delta) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.qty + delta);
        return { ...item, qty: newQty };
      }
      return item;
    }));
  };

  const removeItem = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const cartSubtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  const cartTotal = cartSubtotal > 0 ? cartSubtotal + 15 : 0; // plus $15 flat shipping

  return (
    <div className="min-h-screen relative overflow-x-hidden flex flex-col p-4 md:p-8" style={{ background: "#060810" }}>
      
      {/* Configuration Header */}
      <header className="w-full max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 py-4 px-6 rounded-2xl bg-white/[0.02] border border-white/5 mb-8">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-white/5 border border-white/10">
            <ShoppingBag className="text-white/80" size={16} />
          </div>
          <div>
            <span className="text-xs text-white/40 block leading-none font-bold uppercase tracking-wider">Checkout Suite</span>
            <span className="text-sm font-black text-white">Component 08</span>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <span className="text-xs text-white/40 font-bold uppercase mr-1">Active Swatch:</span>
          {THEMES.map(t => (
            <button
              key={t.id}
              onClick={() => setTheme(t)}
              className={cn(
                "w-6 h-6 rounded-full transition-all duration-300 relative cursor-pointer",
                theme.id === t.id ? "scale-125" : "hover:scale-110 opacity-60 hover:opacity-100"
              )}
              style={{ backgroundColor: t.color, boxShadow: theme.id === t.id ? `0 0 12px ${t.color}` : "none" }}
            >
              {theme.id === t.id && (
                <motion.div 
                  layoutId="swatch-outline" 
                  className="absolute -inset-1 rounded-full border border-current opacity-50"
                  style={{ color: t.color }}
                />
              )}
            </button>
          ))}
        </div>
      </header>

      {/* Main Grid View */}
      <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* Checkout Steps Column */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          
          {/* Progress Tracker Cards */}
          <div className="flex items-center justify-between gap-2 p-4 rounded-2xl bg-white/[0.01] border border-white/5">
            {[
              { num: 1, label: "Shipping" },
              { num: 2, label: "Payment" },
              { num: 3, label: "Success" }
            ].map((pStep, index, arr) => (
              <React.Fragment key={pStep.num}>
                <div className="flex items-center gap-3">
                  <div className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300",
                    step >= pStep.num 
                      ? cn("text-white shadow-md", theme.bg) 
                      : "bg-white/5 border border-white/10 text-white/40"
                  )}
                    style={{ boxShadow: step >= pStep.num ? `0 0 12px ${theme.color}40` : "none" }}
                  >
                    {step > pStep.num ? <Check size={14} strokeWidth={3} /> : pStep.num}
                  </div>
                  <span className={cn(
                    "text-xs font-bold uppercase tracking-wider hidden sm:inline",
                    step >= pStep.num ? "text-white" : "text-white/30"
                  )}>{pStep.label}</span>
                </div>
                {index < arr.length - 1 && (
                  <div className="h-0.5 flex-1 mx-2 rounded bg-white/5 relative overflow-hidden">
                    <motion.div 
                      className={cn("absolute inset-0 origin-left", theme.bg)}
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: step > pStep.num ? 1 : step === pStep.num ? 0.5 : 0 }}
                      transition={{ duration: 0.5, ease: "easeInOut" }}
                    />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="rounded-3xl p-6 md:p-8 bg-[#0a0d1a] border border-white/5 shadow-2xl flex flex-col gap-6"
              >
                <div>
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <MapPin className={theme.text} size={20} />
                    Shipping & Identity
                  </h3>
                  <p className="text-white/40 text-xs mt-1">Please supply your destination and validation email</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <TracerInput 
                    label="Email Address" name="email" value={form.email} 
                    onChange={handleInputChange} error={errors.email} theme={theme}
                  />
                  <TracerInput 
                    label="Full Name" name="name" value={form.name} 
                    onChange={handleInputChange} error={errors.name} theme={theme}
                  />
                  <div className="md:col-span-2">
                    <TracerInput 
                      label="Street Address" name="address" value={form.address} 
                      onChange={handleInputChange} error={errors.address} theme={theme}
                    />
                  </div>
                  <TracerInput 
                    label="City" name="city" value={form.city} 
                    onChange={handleInputChange} error={errors.city} theme={theme}
                  />
                  <TracerInput 
                    label="ZIP / Postal Code" name="zip" value={form.zip} 
                    onChange={handleInputChange} error={errors.zip} theme={theme}
                  />
                </div>

                <button
                  onClick={handleNextStep}
                  className={cn("w-full py-4 rounded-2xl font-bold text-white transition-all cursor-pointer shadow-lg mt-4", theme.bg)}
                  style={{ boxShadow: `0 6px 20px ${theme.color}30` }}
                >
                  Continue to Payment
                </button>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="rounded-3xl p-6 md:p-8 bg-[#0a0d1a] border border-white/5 shadow-2xl flex flex-col gap-6"
              >
                <div>
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <CreditCard className={theme.text} size={20} />
                    Select Payment Gateway
                  </h3>
                  <p className="text-white/40 text-xs mt-1">Select method and enter transaction detail</p>
                </div>

                {/* Method Swapping (2.5D active cards lift) */}
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => setPaymentMethod("card")}
                    className={cn(
                      "p-4 rounded-2xl border text-left cursor-pointer transition-all duration-300 relative",
                      paymentMethod === "card" 
                        ? cn("bg-[#0f1326] -translate-y-1 shadow-lg", theme.border)
                        : "bg-white/[0.02] border-white/5"
                    )}
                    style={{
                      boxShadow: paymentMethod === "card" ? `0 12px 24px rgba(0,0,0,0.15), 0 0 1px ${theme.color}` : "none"
                    }}
                  >
                    <div className={cn("w-2 h-2 rounded-full mb-3", paymentMethod === "card" ? theme.bg : "bg-white/10")} />
                    <span className="text-sm font-bold text-white block">Credit Card</span>
                    <span className="text-[10px] text-white/40 block mt-0.5">Stripe Secure Gateway</span>
                  </button>

                  <button
                    onClick={() => setPaymentMethod("paypal")}
                    className={cn(
                      "p-4 rounded-2xl border text-left cursor-pointer transition-all duration-300 relative",
                      paymentMethod === "paypal" 
                        ? cn("bg-[#0f1326] -translate-y-1 shadow-lg", theme.border)
                        : "bg-white/[0.02] border-white/5"
                    )}
                    style={{
                      boxShadow: paymentMethod === "paypal" ? `0 12px 24px rgba(0,0,0,0.15), 0 0 1px ${theme.color}` : "none"
                    }}
                  >
                    <div className={cn("w-2 h-2 rounded-full mb-3", paymentMethod === "paypal" ? theme.bg : "bg-white/10")} />
                    <span className="text-sm font-bold text-white block">PayPal Express</span>
                    <span className="text-[10px] text-white/40 block mt-0.5">Redirect checkout flow</span>
                  </button>
                </div>

                {paymentMethod === "card" ? (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-2">
                    <div className="md:col-span-3">
                      <TracerInput 
                        label="Card Number" name="cardNo" value={form.cardNo} 
                        onChange={handleInputChange} error={errors.cardNo} theme={theme}
                        placeholder="•••• •••• •••• ••••"
                      />
                    </div>
                    <TracerInput 
                      label="Expiry Date" name="expiry" value={form.expiry} 
                      onChange={handleInputChange} error={errors.expiry} theme={theme}
                      placeholder="MM / YY"
                    />
                    <TracerInput 
                      label="CVC Security Code" name="cvc" value={form.cvc} 
                      onChange={handleInputChange} error={errors.cvc} theme={theme}
                      placeholder="•••"
                    />
                    <div className="md:col-span-1 flex flex-col justify-end">
                      <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 h-[46px] select-none text-[11px] font-bold text-white/40">
                        <ShieldCheck size={16} className={theme.text} />
                        AES 256 BIT
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="p-8 rounded-2xl bg-white/[0.01] border border-white/5 text-center text-white/50 text-sm">
                    After hitting 'Place Order', you will be redirected to PayPal's external gateway to complete verification safely.
                  </div>
                )}

                <div className="flex gap-4 mt-4">
                  <button
                    onClick={() => setStep(1)}
                    className="flex-1 py-4 rounded-2xl font-bold bg-white/5 hover:bg-white/10 border border-white/10 text-white/70 transition-all cursor-pointer"
                  >
                    Back to Shipping
                  </button>
                  <button
                    onClick={handleNextStep}
                    className={cn("flex-1 py-4 rounded-2xl font-bold text-white transition-all cursor-pointer shadow-lg", theme.bg)}
                    style={{ boxShadow: `0 6px 20px ${theme.color}30` }}
                  >
                    Place Order
                  </button>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="rounded-3xl p-8 bg-[#0a0d1a] border border-white/5 shadow-2xl flex flex-col items-center text-center gap-6"
              >
                <div className={cn("w-20 h-20 rounded-full flex items-center justify-center bg-white/5 relative", theme.text)}>
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                    className={cn("absolute inset-0 rounded-full bg-current opacity-10")}
                  />
                  <motion.div
                    initial={{ rotate: -45, scale: 0 }}
                    animate={{ rotate: 0, scale: 1 }}
                    transition={{ type: "spring", stiffness: 260, delay: 0.4 }}
                  >
                    <ShieldCheck size={44} />
                  </motion.div>
                </div>

                <div>
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <span className={cn("text-xs font-bold px-2 py-0.5 rounded uppercase tracking-wider bg-white/5", theme.text)}>
                      Receipt Verified
                    </span>
                  </div>
                  <h3 className="text-2xl font-black text-white">Order Placed Successfully!</h3>
                  <p className="text-white/40 text-xs mt-2 max-w-sm">
                    Thank you for your order, {form.name || "Customer"}. We sent a full checkout breakdown receipt to <span className="text-white">{form.email || "your address"}</span>.
                  </p>
                </div>

                <div className="w-full bg-white/[0.02] border border-white/5 rounded-2xl p-4 flex justify-between text-xs">
                  <div className="text-left text-white/40">
                    <p>Estimated Delivery</p>
                    <p className="text-white font-bold mt-1">May 29 - June 1</p>
                  </div>
                  <div className="text-right text-white/40">
                    <p>Transaction Reference</p>
                    <p className="text-white font-mono mt-1">TXN-4928-ADF9</p>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setStep(1);
                    setForm({ email: "", name: "", address: "", city: "", zip: "", cardNo: "", expiry: "", cvc: "" });
                    setCart(INITIAL_CART);
                  }}
                  className="px-8 py-3.5 rounded-xl font-bold bg-white/5 border border-white/10 text-white/70 hover:text-white hover:bg-white/10 transition-all cursor-pointer flex items-center gap-2"
                >
                  <RefreshCw size={14} />
                  Re-initialize Sandbox
                </button>
              </motion.div>
            )}
          </AnimatePresence>

        </div>

        {/* Floating Cart Panel Column */}
        <div className="flex flex-col gap-6">
          <div className="rounded-3xl p-6 bg-[#0a0d1a] border border-white/5 shadow-2xl flex flex-col gap-6">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <ShoppingBag className={theme.text} size={18} />
                <h3 className="text-white font-bold">Cart Summary</h3>
              </div>
              <button 
                onClick={() => setIsCartOpen(true)}
                className="text-xs text-white/40 hover:text-white transition-colors cursor-pointer border border-white/10 px-3 py-1.5 rounded-lg bg-white/5"
              >
                Expand Drawer
              </button>
            </div>

            {/* Flat static rows preview */}
            <div className="flex flex-col gap-3 max-h-[220px] overflow-y-auto" style={{ scrollbarWidth: "none" }}>
              {cart.length > 0 ? (
                cart.map(item => (
                  <div key={item.id} className="flex gap-3 items-center justify-between p-2 rounded-xl bg-white/[0.01] border border-white/5">
                    <img src={item.image} alt={item.name} className="w-10 h-10 rounded-lg object-cover" />
                    <div className="flex-1 min-w-0">
                      <span className="text-xs font-bold text-white block truncate">{item.name}</span>
                      <span className="text-[10px] text-white/40 block mt-0.5">Qty {item.qty} × ${item.price}</span>
                    </div>
                    <span className="text-xs font-bold text-white">${(item.price * item.qty).toFixed(2)}</span>
                  </div>
                ))
              ) : (
                <div className="text-center py-6 text-white/20 text-xs">Cart is empty.</div>
              )}
            </div>

            {/* Totals Breakdown */}
            <div className="border-t border-white/5 pt-4 flex flex-col gap-2 text-xs">
              <div className="flex justify-between text-white/40">
                <span>Items Subtotal</span>
                <span>${cartSubtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-white/40">
                <span>Shipping Flat</span>
                <span>$15.00</span>
              </div>
              <div className="flex justify-between text-white font-bold text-sm border-t border-white/5 pt-3 mt-1">
                <span>Total Amount</span>
                <span className={theme.text}>${cartTotal.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Cart Drawer Slide-out (heavy liquid-elastic slide-out) */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 bg-black z-50 pointer-events-auto"
            />
            {/* Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{
                type: "spring",
                stiffness: 380,
                damping: 20, // liquid-elastic snapping spring
                mass: 1.2
              }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-[#0a0d1a] border-l border-white/10 z-50 p-6 flex flex-col justify-between shadow-2xl"
            >
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-white text-lg font-black flex items-center gap-2">
                    <ShoppingBag className={theme.text} size={20} />
                    Shopping Drawer
                  </h3>
                  <button 
                    onClick={() => setIsCartOpen(false)}
                    className="text-xs text-white/40 hover:text-white transition-colors cursor-pointer border border-white/10 px-3 py-1.5 rounded-lg bg-white/5"
                  >
                    Close
                  </button>
                </div>

                {/* Items rows with gliding upward layout animations */}
                <div className="flex flex-col gap-3 overflow-y-auto max-h-[60vh] pr-1" style={{ scrollbarWidth: "none" }}>
                  <AnimatePresence mode="popLayout">
                    {cart.map(item => (
                      <motion.div
                        key={item.id}
                        layout
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, scale: 0.9, x: 100 }}
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 25,
                        }}
                        className="flex gap-4 items-center justify-between p-3 rounded-2xl bg-white/[0.02] border border-white/5"
                      >
                        <img src={item.image} alt={item.name} className="w-12 h-12 rounded-xl object-cover" />
                        <div className="flex-1 min-w-0">
                          <span className="text-xs font-bold text-white block truncate">{item.name}</span>
                          <span className="text-[10px] text-white/40 block mt-0.5">${item.price}</span>
                          <div className="flex items-center gap-2 mt-2">
                            <button 
                              onClick={() => updateQty(item.id, -1)}
                              className="w-5 h-5 rounded bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-white/60 cursor-pointer"
                            >
                              <Minus size={10} />
                            </button>
                            <span className="text-xs text-white font-mono">{item.qty}</span>
                            <button 
                              onClick={() => updateQty(item.id, 1)}
                              className="w-5 h-5 rounded bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-white/60 cursor-pointer"
                            >
                              <Plus size={10} />
                            </button>
                          </div>
                        </div>

                        <div className="flex flex-col items-end gap-2">
                          <span className="text-xs font-bold text-white font-mono">${(item.price * item.qty).toFixed(2)}</span>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-white/30 hover:text-red-500 transition-colors p-1.5 rounded-lg hover:bg-red-500/10 cursor-pointer"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>

              {/* Bottom calculations inside drawer */}
              <div className="border-t border-white/10 pt-6 mt-6 flex flex-col gap-4">
                <div className="flex justify-between text-xs text-white/40">
                  <span>Cart Subtotal</span>
                  <span className="font-mono">${cartSubtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-xs text-white/40">
                  <span>Shipping Flat rate</span>
                  <span className="font-mono">$15.00</span>
                </div>
                <div className="flex justify-between text-sm text-white font-bold border-t border-white/5 pt-4">
                  <span>Gross Total</span>
                  <span className={cn("font-mono text-base", theme.text)}>${cartTotal.toFixed(2)}</span>
                </div>

                <button
                  onClick={() => setIsCartOpen(false)}
                  className={cn("w-full py-4 rounded-xl font-bold text-white transition-all cursor-pointer shadow-lg mt-2 flex items-center justify-center gap-2", theme.bg)}
                  style={{ boxShadow: `0 6px 20px ${theme.color}30` }}
                >
                  Apply & Return to Checkout
                  <ChevronRight size={16} />
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

    </div>
  );
}
