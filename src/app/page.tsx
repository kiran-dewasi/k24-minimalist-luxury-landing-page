"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Download, Info, CheckCircle, XCircle, Loader2, MessageSquare, Camera, ShieldCheck, Zap, ArrowRight, Smartphone, Mail } from "lucide-react";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { AboutModal } from "@/components/about-modal";
import { AuthModal } from "@/components/auth-modal";
import { LeadModal } from "@/components/lead-modal";
import { useSession } from "@/lib/auth-client";
import { toast } from "sonner";

function HomeContent() {
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isLeadOpen, setIsLeadOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [name, setName] = useState("");
  const { data: session, isPending } = useSession();

  const handleOpenLead = () => {
    setIsLeadOpen(true);
  };

  const handleJoinWaitlist = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!whatsappNumber || whatsappNumber.length < 10) {
      toast.error("Please enter a valid WhatsApp number");
      return;
    }
    
    setIsLoading(true);
    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name,
          mobile: whatsappNumber,
          source: "waitlist",
        }),
      });

      if (!response.ok) throw new Error("Failed to join");

      toast.success("Welcome to the elite circle! We'll reach out soon.");
      setWhatsappNumber("");
      setName("");
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-[#F8FAFC] dark:bg-zinc-950 flex flex-col items-center px-6 overflow-hidden">
      {/* Subtle texture overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
           style={{
             backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")"
           }}
      />

      {/* Atmospheric Glow Elements - Using calm blues and greens */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-400/5 dark:bg-blue-900/10 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-emerald-400/5 dark:bg-emerald-900/10 blur-[140px] rounded-full pointer-events-none" />

      {/* k24 Logo - Top Left */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          duration: 1.5, 
          ease: [0.22, 1, 0.36, 1],
          delay: 0.2
        }}
        className="fixed top-8 left-8 md:top-12 md:left-12 z-50"
      >
        <h1 
          className="text-3xl md:text-4xl font-extralight tracking-[0.3em] text-zinc-900 dark:text-zinc-50 uppercase leading-none"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          k24
        </h1>
      </motion.div>

      {/* About button - Top Right */}
      <motion.button
        onClick={() => setIsAboutOpen(true)}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          duration: 1.5, 
          ease: [0.22, 1, 0.36, 1],
          delay: 0.2
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed top-8 right-8 md:top-12 md:right-12 z-50 group flex items-center gap-2 px-6 py-2.5 rounded-full glass-button transition-all duration-700 border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-600 shadow-sm"
      >
        <span className="text-[9px] font-light text-zinc-700 dark:text-zinc-300 tracking-[0.25em] uppercase">
          About
        </span>
      </motion.button>
      
      {/* Main content container */}
      <div className="flex flex-col items-center justify-start pt-32 md:pt-40 flex-1 w-full max-w-6xl z-10 text-center">
        {/* Headline & Sub-headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12 md:mb-16 max-w-4xl"
        >
          <h2 className="text-4xl md:text-7xl font-extralight tracking-tight text-zinc-900 dark:text-zinc-50 mb-6 px-4 leading-[1.1]">
            Bills Handle, <br className="hidden md:block" /> <span className="font-normal italic text-blue-600 dark:text-blue-400">Tension Khatam</span>.
          </h2>
          <p className="text-base md:text-xl font-light tracking-[0.05em] text-zinc-500 dark:text-zinc-400 px-6 max-w-2xl mx-auto leading-relaxed">
            WhatsApp pe photo bhejo, hum automatically Tally me entry kar denge. 
          </p>
        </motion.div>

        {/* CTA: Join Waitlist with WhatsApp Number */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 0.6 }}
          className="w-full max-w-2xl px-6 mb-24"
        >
          <form onSubmit={handleJoinWaitlist} className="relative flex flex-col md:flex-row gap-3 p-2 bg-white dark:bg-zinc-900 rounded-[2rem] border border-zinc-200 dark:border-zinc-800 shadow-xl focus-within:border-blue-500/50 transition-all duration-500">
            <input 
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="px-6 py-4 bg-transparent text-sm font-light tracking-widest outline-none text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 border-b md:border-b-0 md:border-r border-zinc-100 dark:border-zinc-800"
            />
            <input 
              type="tel"
              placeholder="WhatsApp Number"
              value={whatsappNumber}
              onChange={(e) => setWhatsappNumber(e.target.value)}
              className="flex-1 px-6 py-4 bg-transparent text-sm font-light tracking-widest outline-none text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400"
            />
            <button 
              type="submit"
              disabled={isLoading}
              className="px-8 py-4 bg-zinc-900 dark:bg-white text-white dark:text-black rounded-full text-[10px] font-bold tracking-[0.2em] uppercase transition-all hover:bg-emerald-600 dark:hover:bg-emerald-500 hover:text-white disabled:opacity-50 flex items-center justify-center gap-2 min-w-[180px]"
            >
              {isLoading ? <Loader2 className="w-3 h-3 animate-spin" /> : "Join WhatsApp Waitlist"}
            </button>
          </form>
          <p className="mt-4 text-[9px] text-zinc-400 tracking-[0.2em] uppercase font-light">
            No payment now. Early access invite only.
          </p>
        </motion.div>

        {/* Hero Visual: Split Screen Concept */}
        <div className="relative w-full mb-32 px-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 2, delay: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-0 items-center rounded-[2.5rem] overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-2xl"
          >
            {/* Left: Messy Papers (B&W) */}
            <div className="relative h-[350px] md:h-[550px] bg-zinc-50 dark:bg-zinc-900 flex flex-col items-center justify-center p-12 overflow-hidden border-b md:border-b-0 md:border-r border-zinc-200 dark:border-zinc-800">
              <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
              <div className="relative flex flex-col items-center gap-8 grayscale opacity-70">
                <div className="relative">
                  <div className="flex flex-wrap justify-center gap-3 max-w-[280px]">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                      <div key={i} className="w-12 h-16 bg-white border border-zinc-200 rounded shadow-sm rotate-[-15deg] -m-2 flex items-center justify-center text-[8px] text-zinc-300">BILL</div>
                    ))}
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="flex flex-col items-center text-zinc-400">
                      <span className="text-6xl mb-4">😫</span>
                      <div className="px-4 py-2 bg-zinc-200 dark:bg-zinc-800 rounded-full text-[8px] uppercase tracking-widest font-bold">Manual Stress</div>
                    </div>
                  </div>
                </div>
                <div className="text-center space-y-2">
                  <span className="text-[10px] tracking-[0.4em] uppercase text-zinc-400 font-bold">Purana Tareeka</span>
                  <p className="text-xs text-zinc-400 italic">Bill dhundhna, entry karna, accountant ko call karna...</p>
                </div>
              </div>
            </div>

            {/* Right: Glowing Smartphone (Color) */}
            <div className="relative h-[350px] md:h-[550px] bg-white dark:bg-zinc-950 flex flex-col items-center justify-center p-12 overflow-hidden">
              <div className="absolute inset-0 bg-emerald-500/5 blur-[100px] rounded-full animate-pulse" />
              <div className="relative flex flex-col items-center gap-8">
                <div className="relative">
                  <div className="absolute -inset-8 bg-emerald-500/20 blur-2xl rounded-full animate-pulse" />
                  <div className="relative flex flex-col items-center">
                    <span className="text-6xl mb-6">😌</span>
                    {/* Smartphone Mockup with WhatsApp Visual */}
                    <div className="w-28 h-56 md:w-36 md:h-72 bg-zinc-900 dark:bg-black rounded-[3rem] border-[4px] border-zinc-800 flex flex-col items-center p-4 shadow-[0_0_80px_rgba(16,185,129,0.15)] overflow-hidden relative">
                      <div className="absolute inset-0 bg-gradient-to-t from-emerald-500/20 to-transparent" />
                      <div className="w-full flex justify-end mb-2">
                        <div className="bg-emerald-500 text-white p-1 rounded-lg text-[6px]">Photo Sent</div>
                      </div>
                      <div className="w-full bg-white/10 backdrop-blur-md rounded-xl p-2 border border-white/20 mb-2">
                         <div className="w-full h-1 bg-white/20 rounded-full mb-1" />
                         <div className="w-1/2 h-1 bg-white/20 rounded-full" />
                      </div>
                      <div className="mt-auto w-full flex justify-start mb-4">
                        <div className="bg-white/10 text-white p-2 rounded-lg text-[6px] backdrop-blur-sm border border-white/10">
                          Tally Entry Done ✅
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-center space-y-2">
                  <span className="text-[10px] tracking-[0.4em] uppercase text-emerald-500 font-bold">k24 Tareeka</span>
                  <p className="text-xs text-zinc-400 italic">Relaxing, Automatic, Tally Me Entry.</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Explainer Video Block */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-4xl mb-32 px-4"
        >
          <div className="mb-8">
            <span className="text-[10px] tracking-[0.4em] uppercase text-zinc-400 font-bold block mb-2">2 minute demo</span>
            <p className="text-sm font-light tracking-[0.1em] text-zinc-500 dark:text-zinc-400">Dekho kaise kaam karta hai.</p>
          </div>
          <div className="relative aspect-video w-full rounded-[2rem] overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-black shadow-2xl">
            <iframe
              className="absolute inset-0 w-full h-full"
              src="https://www.youtube.com/embed/o5Dl-HUi34Y"
              title="k24 Explainer Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
          <p className="mt-8 text-xs font-light tracking-[0.15em] text-zinc-400 uppercase">
            Photo bhejo, entry Tally tak pahunch jayegi – bina extra mehnat ke.
          </p>
        </motion.div>

        {/* Key Features Section */}
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-8 mb-32 px-4">
          {[
            { icon: <Zap className="w-8 h-8 text-amber-500" />, label: "Tally Sync", sub: "Photo bhejo, entry done." },
            { icon: <MessageSquare className="w-8 h-8 text-emerald-500" />, label: "WhatsApp Reports", sub: "Ask anything, get reports." },
            { icon: <ShieldCheck className="w-8 h-8 text-blue-500" />, label: "100% Secure", sub: "Private & Rupee-shielded." }
          ].map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col items-center p-10 rounded-[2.5rem] bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 shadow-sm hover:shadow-xl transition-all duration-500 group"
            >
              <div className="mb-6 p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800 group-hover:scale-110 transition-transform duration-500">{feature.icon}</div>
              <h4 className="text-sm font-bold tracking-[0.2em] uppercase text-zinc-900 dark:text-zinc-100 mb-2">{feature.label}</h4>
              <p className="text-[10px] text-zinc-400 tracking-widest uppercase text-center leading-relaxed">{feature.sub}</p>
            </motion.div>
          ))}
        </div>

        {/* Feature 1: WhatsApp Assistant */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-center mb-32 text-left px-4">
          <div className="space-y-8">
            <div className="space-y-4">
              <span className="text-emerald-500 text-[10px] tracking-[0.4em] uppercase font-bold">Munim Ji in your pocket</span>
              <h3 className="text-4xl md:text-5xl font-extralight tracking-tight text-zinc-900 dark:text-zinc-100 leading-tight">
                Just Ask. <br /> Get Answers.
              </h3>
            </div>
            <div className="space-y-6">
              <p className="text-zinc-500 dark:text-zinc-400 font-light text-lg max-w-sm leading-relaxed">
                Just ask. Get answers.
              </p>
              <div className="flex items-center gap-3 py-3 px-4 rounded-2xl bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-100 dark:border-zinc-800 w-fit">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <p className="text-[10px] text-zinc-400 tracking-[0.1em] uppercase font-medium">
                  Direct sync with Tally ERP / Prime
                </p>
              </div>
            </div>
          </div>
          <div className="relative group">
            <motion.div 
              initial={{ x: 30, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className="relative z-10 bg-white dark:bg-zinc-900 p-8 rounded-[2.5rem] shadow-2xl border border-zinc-100 dark:border-zinc-800 max-w-sm ml-auto space-y-6"
            >
              <div className="flex items-center gap-3 border-b border-zinc-100 dark:border-zinc-800 pb-4 mb-2">
                <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center text-white font-bold">k</div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-zinc-900 dark:text-zinc-100">k24 Assistant</p>
                  <p className="text-[10px] text-emerald-500">Online</p>
                </div>
              </div>
              <div className="flex justify-start">
                <div className="bg-zinc-100 dark:bg-zinc-800/80 px-4 py-3 rounded-2xl rounded-tl-none text-sm text-zinc-800 dark:text-zinc-200 shadow-sm">
                  Aaj ka total sale?
                </div>
              </div>
              <div className="flex justify-end">
                <motion.div 
                  initial={{ scale: 0.9, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="bg-emerald-500 px-5 py-3 rounded-2xl rounded-tr-none text-sm text-white font-medium shadow-lg shadow-emerald-500/20"
                >
                  ₹ 54,000 ✅
                </motion.div>
              </div>
            </motion.div>
            <div className="absolute -top-12 -right-12 w-48 h-48 bg-emerald-500/5 blur-[100px] rounded-full group-hover:bg-emerald-500/10 transition-colors" />
          </div>
        </div>

        {/* Dashboard Screenshot Integration */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
          className="w-full mb-40 px-4"
        >
          <div className="relative rounded-[2.5rem] overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-2xl">
            {/* Header bar pseudo-UI */}
            <div className="h-10 border-b border-zinc-100 dark:border-zinc-800 flex items-center px-6 gap-2 bg-zinc-50 dark:bg-zinc-900/50">
              <div className="w-2.5 h-2.5 rounded-full bg-red-400/20" />
              <div className="w-2.5 h-2.5 rounded-full bg-amber-400/20" />
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-400/20" />
              <div className="ml-4 px-3 py-1 bg-zinc-100 dark:bg-zinc-800 rounded-lg text-[8px] text-zinc-400 tracking-widest uppercase">k24-dashboard.v1</div>
            </div>
            <img 
              src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/image-1766394082800.png?width=8000&height=8000&resize=contain" 
              alt="k24 Dashboard" 
              className="w-full h-auto object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white dark:from-zinc-950 to-transparent pointer-events-none" />
          </div>
          <div className="mt-8 flex justify-center">
            <div className="px-6 py-2 rounded-full border border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50 backdrop-blur-sm">
              <p className="text-[10px] tracking-[0.3em] uppercase text-zinc-400 font-bold">Real-time Tally Feed & Activity Log</p>
            </div>
          </div>
        </motion.div>

        {/* Feature 2: Magic Camera (The Core Highlight) */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-center mb-40 text-left px-4">
          <div className="relative order-2 md:order-1 group">
            <motion.div 
              initial={{ x: -30, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className="relative z-10 w-64 h-[450px] mx-auto md:ml-0 bg-zinc-950 rounded-[3rem] border-[6px] border-zinc-800 overflow-hidden shadow-2xl"
            >
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 bg-zinc-900">
                <div className="w-full aspect-[3/4] border-2 border-dashed border-white/20 rounded-2xl flex items-center justify-center relative overflow-hidden">
                  <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=400')] bg-cover opacity-40 grayscale group-hover:grayscale-0 transition-all duration-1000" />
                  <motion.div 
                    animate={{ y: [0, 300, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent shadow-[0_0_15px_rgba(52,211,153,0.8)] z-20"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Camera className="w-12 h-12 text-white/20 animate-pulse" />
                  </div>
                </div>
                <div className="mt-8 flex flex-col items-center gap-2">
                   <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                     <CheckCircle className="w-6 h-6 text-emerald-400" />
                   </div>
                   <span className="text-[10px] text-zinc-400 uppercase tracking-widest font-bold">Automatic Tally Entry</span>
                </div>
              </div>
            </motion.div>
            <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-emerald-500/5 blur-[120px] rounded-full" />
          </div>
          <div className="space-y-8 order-1 md:order-2">
            <div className="space-y-4">
              <span className="text-emerald-500 text-[10px] tracking-[0.4em] uppercase font-bold">Magic Camera</span>
              <h3 className="text-4xl md:text-5xl font-extralight tracking-tight text-zinc-900 dark:text-zinc-100 leading-tight">
                Click Photo. <br /> <span className="text-emerald-500 font-normal italic">Tally Done.</span>
              </h3>
            </div>
            <p className="text-zinc-500 dark:text-zinc-400 font-light text-lg max-w-sm leading-relaxed">
              Click photo. Data saved.
            </p>
            <div className="p-8 rounded-[2.5rem] bg-emerald-500/5 border border-emerald-500/10 max-w-md relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4">
                <Zap className="w-5 h-5 text-emerald-500/20" />
              </div>
              <p className="text-base text-emerald-700 dark:text-emerald-400 font-medium leading-relaxed mb-4">
                "Jo bill aap photo se bhejoge, woh aapke accountant ke Tally me seedha save ho jayega."
              </p>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <span className="text-[10px] text-zinc-400 tracking-wider uppercase font-light">100% Accuracy, 0% Manual Entry.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Day Book Screenshot Integration */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
          className="w-full mb-40 px-4"
        >
          <div className="relative rounded-[2.5rem] overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-2xl">
            {/* Header bar pseudo-UI */}
            <div className="h-10 border-b border-zinc-100 dark:border-zinc-800 flex items-center px-6 gap-2 bg-zinc-50 dark:bg-zinc-900/50">
              <div className="w-2.5 h-2.5 rounded-full bg-red-400/20" />
              <div className="w-2.5 h-2.5 rounded-full bg-amber-400/20" />
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-400/20" />
              <div className="ml-4 px-3 py-1 bg-zinc-100 dark:bg-zinc-800 rounded-lg text-[8px] text-zinc-400 tracking-widest uppercase">k24-daybook.v1</div>
            </div>
            <img 
              src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/image-1766394214265.png?width=8000&height=8000&resize=contain" 
              alt="k24 Day Book" 
              className="w-full h-auto object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/5 to-transparent pointer-events-none" />
          </div>
          <div className="mt-8 flex justify-center">
            <div className="px-6 py-2 rounded-full border border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50 backdrop-blur-sm">
              <p className="text-[10px] tracking-[0.3em] uppercase text-emerald-500 font-bold">Automated Entry Verification & Transaction History</p>
            </div>
          </div>
        </motion.div>

        {/* Social Proof Strip */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="w-full py-12 border-y border-zinc-100 dark:border-zinc-800 mb-32"
        >
          <div className="flex flex-col items-center gap-8">
            <p className="text-[10px] tracking-[0.4em] uppercase text-zinc-400 font-bold">Trusted by early users in Jaipur, Pune, Mumbai, Ahmedabad and Delhi</p>
            <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-40 grayscale contrast-125">
               <span className="text-xl font-bold tracking-tighter italic">JAIPUR</span>
               <span className="text-xl font-bold tracking-tighter italic">PUNE</span>
               <span className="text-xl font-bold tracking-tighter italic">MUMBAI</span>
               <span className="text-xl font-bold tracking-tighter italic">AHMEDABAD</span>
               <span className="text-xl font-bold tracking-tighter italic">DELHI</span>
            </div>
            <p className="text-[10px] tracking-[0.1em] text-zinc-400 italic">Built with chartered accountants and Indian business owners.</p>
          </div>
        </motion.div>

        {/* Financial Reports Screenshot Integration */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
          className="w-full mb-48 px-4"
        >
          <div className="text-center mb-12">
            <span className="text-[10px] tracking-[0.4em] uppercase text-blue-600 font-bold block mb-4">Command Center</span>
            <h3 className="text-4xl md:text-5xl font-extralight tracking-tight text-zinc-900 dark:text-zinc-100">
              Your Whole Business <br /> <span className="italic font-normal">In One View.</span>
            </h3>
          </div>
          <div className="relative rounded-[3rem] overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)]">
            {/* Header bar pseudo-UI */}
            <div className="h-10 border-b border-zinc-100 dark:border-zinc-800 flex items-center px-6 gap-2 bg-zinc-50 dark:bg-zinc-900/50">
              <div className="w-2.5 h-2.5 rounded-full bg-red-400/20" />
              <div className="w-2.5 h-2.5 rounded-full bg-amber-400/20" />
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-400/20" />
              <div className="ml-4 px-3 py-1 bg-zinc-100 dark:bg-zinc-800 rounded-lg text-[8px] text-zinc-400 tracking-widest uppercase">k24-reports.v1</div>
            </div>
            <img 
              src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/image-1766394233555.png?width=8000&height=8000&resize=contain" 
              alt="k24 Financial Reports" 
              className="w-full h-auto object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/10 dark:to-black/10 pointer-events-none" />
          </div>
          <div className="mt-8 flex justify-center gap-12">
            {[
              { label: "Sales & Purchases", icon: <CheckCircle className="w-3 h-3 text-blue-500" /> },
              { label: "GST Summaries", icon: <CheckCircle className="w-3 h-3 text-emerald-500" /> },
              { label: "Balance Sheet", icon: <CheckCircle className="w-3 h-3 text-amber-500" /> }
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2">
                {item.icon}
                <span className="text-[10px] tracking-[0.2em] uppercase text-zinc-400 font-bold">{item.label}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Early Access & Payment Section */}
        <div className="w-full flex justify-center mb-48 px-4">
          <div className="w-full max-w-2xl p-12 md:p-20 rounded-[3rem] bg-zinc-900 dark:bg-white text-white dark:text-black flex flex-col items-center justify-center text-center space-y-8 shadow-2xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <div className="relative z-10 px-6 py-2 rounded-full border border-white/20 dark:border-black/20 text-[10px] uppercase tracking-[0.4em] font-bold">Priority Access</div>
            <h4 className="relative z-10 text-4xl md:text-6xl font-extralight tracking-tight leading-tight">Join the <br /><span className="italic font-normal text-emerald-500">Early Access</span></h4>
            <p className="relative z-10 text-sm md:text-lg font-light opacity-60 max-w-md leading-relaxed">Secure your spot in our exclusive early access program and automate your Tally entry today.</p>
            <button 
              onClick={handleOpenLead}
              className="relative z-10 px-12 py-5 bg-emerald-500 text-white rounded-full text-xs font-bold tracking-[0.2em] uppercase hover:bg-emerald-400 transition-all duration-300 shadow-xl shadow-emerald-500/20 flex items-center gap-3 group/btn"
            >
              Get Early Access
              <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* Final CTA & Reassurance */}
        <div className="w-full max-w-4xl mb-48 px-4 flex flex-col items-center text-center space-y-12">
          <div className="space-y-6">
            <h3 className="text-4xl md:text-6xl font-extralight tracking-tight text-zinc-900 dark:text-zinc-100">
              Ready to <span className="italic text-blue-600 dark:text-blue-400">Simplify?</span>
            </h3>
            <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
              {[
                "No app learning – simple WhatsApp & camera.",
                "Tally me entry ho jayegi, automatically.",
                "Leave anytime – no lock-in."
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-[10px] tracking-widest uppercase text-zinc-400 font-medium">
                  <CheckCircle className="w-3 h-3 text-emerald-500" />
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="w-full max-w-2xl">
            <form onSubmit={handleJoinWaitlist} className="relative flex flex-col md:flex-row gap-3 p-2 bg-white dark:bg-zinc-900 rounded-[2rem] border border-zinc-200 dark:border-zinc-800 shadow-xl focus-within:border-emerald-500/50 transition-all duration-500">
              <input 
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="px-6 py-4 bg-transparent text-sm font-light tracking-widest outline-none text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 border-b md:border-b-0 md:border-r border-zinc-100 dark:border-zinc-800"
              />
              <input 
                type="tel"
                placeholder="WhatsApp Number"
                value={whatsappNumber}
                onChange={(e) => setWhatsappNumber(e.target.value)}
                className="flex-1 px-6 py-4 bg-transparent text-sm font-light tracking-widest outline-none text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400"
              />
              <button 
                type="submit"
                disabled={isLoading}
                className="px-8 py-4 bg-emerald-500 text-white rounded-full text-[10px] font-bold tracking-[0.2em] uppercase hover:bg-emerald-400 transition-colors disabled:opacity-50 flex items-center justify-center gap-2 min-w-[140px]"
              >
                {isLoading ? <Loader2 className="w-3 h-3 animate-spin" /> : "Get Started"}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Cinematic Footer */}
      <motion.footer
        className="w-full max-w-6xl mx-auto px-8 pb-16 flex flex-col md:flex-row items-center justify-between gap-12 relative z-10"
      >
        <div className="flex flex-col items-center md:items-start gap-4">
          <div className="flex items-center gap-6">
            <h4 
              className="text-4xl font-light tracking-[0.2em] text-zinc-900 dark:text-zinc-50 uppercase"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              KRISHA
            </h4>
            <div className="h-4 w-[1px] bg-zinc-200 dark:bg-zinc-800" />
            <span className="text-[10px] tracking-[0.4em] uppercase font-light text-zinc-400">
              Made for India 🇮🇳
            </span>
          </div>
          <p className="text-[9px] tracking-[0.2em] uppercase font-light text-zinc-400 text-center md:text-left">
            Building the future of business intelligence.
          </p>
        </div>

        <div className="flex flex-col items-center md:items-end gap-6 w-full md:w-auto">
          <div className="flex flex-col items-center md:items-end gap-2">
            <span className="text-[8px] text-zinc-400 tracking-[0.4em] uppercase font-bold">Support & Inquiries</span>
            <div className="group relative flex flex-col items-center md:items-end p-8 rounded-[2.5rem] bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 shadow-sm hover:shadow-2xl transition-all duration-700 overflow-hidden min-w-[320px]">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="absolute -right-4 -top-4 w-24 h-24 bg-blue-500/10 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="flex items-center gap-4 mb-4">
                <div className="relative p-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-100 dark:border-zinc-700 text-blue-500 group-hover:scale-110 transition-transform duration-500">
                  <Mail className="w-4 h-4" />
                </div>
                <span className="text-[10px] text-zinc-400 tracking-[0.3em] uppercase font-bold">Direct Support</span>
              </div>
              <a 
                href="mailto:krisha240124@gmail.com"
                className="text-sm md:text-xl font-extralight tracking-wider text-zinc-900 dark:text-zinc-100 hover:text-blue-600 dark:group-hover:text-blue-400 transition-all duration-300 relative z-10"
              >
                krisha240124@gmail.com
              </a>
              <div className="mt-6 flex items-center gap-3">
                <div className="relative">
                  <div className="w-2 h-2 rounded-full bg-emerald-500" />
                  <div className="absolute inset-0 w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                </div>
                <span className="text-[9px] text-zinc-400 tracking-[0.2em] uppercase font-light">Fast response guaranteed</span>
              </div>
            </div>
          </div>
          <span className="text-[8px] text-zinc-300 dark:text-zinc-600 tracking-[0.3em] uppercase">
            © 2024 KRISHA GROUP
          </span>
        </div>
      </motion.footer>

      {/* Modals */}
      <AboutModal isOpen={isAboutOpen} onClose={() => setIsAboutOpen(false)} />
      <AuthModal 
        isOpen={isAuthOpen} 
        onClose={() => setIsAuthOpen(false)}
        onSuccess={() => {
          toast.success("Authentication successful!");
        }}
      />
      <LeadModal isOpen={isLeadOpen} onClose={() => setIsLeadOpen(false)} />
    </div>
  );
}

export default function Home() {
  return (
    <>
      <HomeContent />
    </>
  );
}
