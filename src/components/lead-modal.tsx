"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, User, Phone, Briefcase, Loader2, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface LeadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const businessTypes = [
  "Wholesale",
  "Retail",
  "Manufacturing",
  "Services",
  "Other"
];

export const LeadModal = ({ isOpen, onClose }: LeadModalProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    businessType: "",
    otherBusinessType: ""
  });

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      const finalBusinessType = formData.businessType === "Other" 
        ? formData.otherBusinessType 
        : formData.businessType;

      if (!formData.name || !formData.mobile || !finalBusinessType) {
        toast.error("Please fill in all fields");
        return;
      }

      setIsLoading(true);
      
      try {
        const response = await fetch("/api/leads", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: formData.name,
            mobile: formData.mobile,
            businessType: finalBusinessType,
            source: "modal",
          }),
        });

        if (!response.ok) throw new Error("Failed to submit");

        setIsSubmitted(true);
        toast.success("Request received! Our team will call you soon.");
        
        // Reset and close after a delay
        setTimeout(() => {
          onClose();
          // Reset state for next time
          setTimeout(() => {
            setIsSubmitted(false);
            setFormData({ name: "", mobile: "", businessType: "", otherBusinessType: "" });
          }, 500);
        }, 3000);
      } catch (error) {
        toast.error("Something went wrong. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };


  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-md z-50"
          >
            <div className="relative bg-white dark:bg-zinc-900 rounded-3xl shadow-2xl overflow-hidden p-8 md:p-10">
              <button
                onClick={onClose}
                className="absolute top-6 right-6 p-2 rounded-full bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
              >
                <X className="w-5 h-5 text-zinc-500" />
              </button>

              {!isSubmitted ? (
                <>
                  <div className="mb-8">
                    <h2 
                      className="text-3xl md:text-4xl font-light tracking-tight text-zinc-900 dark:text-zinc-50 mb-2"
                      style={{ fontFamily: "'Cormorant Garamond', serif" }}
                    >
                      Early Access
                    </h2>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">
                      Enter your details and our team will reach out to you.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <label className="block text-[10px] uppercase tracking-[0.2em] font-bold text-zinc-400 mb-2">
                        Full Name
                      </label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full pl-12 pr-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all"
                          placeholder="Krisha Group"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] uppercase tracking-[0.2em] font-bold text-zinc-400 mb-2">
                        Mobile Number
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                        <input
                          type="tel"
                          required
                          value={formData.mobile}
                          onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                          className="w-full pl-12 pr-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all"
                          placeholder="+91 00000 00000"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] uppercase tracking-[0.2em] font-bold text-zinc-400 mb-2">
                        Business Type
                      </label>
                      <div className="relative">
                        <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                        <select
                          required
                          value={formData.businessType}
                          onChange={(e) => setFormData({ ...formData, businessType: e.target.value })}
                          className="w-full pl-12 pr-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all appearance-none"
                        >
                          <option value="" disabled>Select Business Type</option>
                          {businessTypes.map(type => (
                            <option key={type} value={type}>{type}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {formData.businessType === "Other" && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="overflow-hidden"
                      >
                        <input
                          type="text"
                          required
                          value={formData.otherBusinessType}
                          onChange={(e) => setFormData({ ...formData, otherBusinessType: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all"
                          placeholder="Please specify..."
                        />
                      </motion.div>
                    )}

                    <motion.button
                      type="submit"
                      disabled={isLoading}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full py-4 rounded-xl bg-emerald-500 text-white font-bold tracking-[0.2em] uppercase hover:bg-emerald-400 transition-all disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20"
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        "Request Call Back"
                      )}
                    </motion.button>
                  </form>
                </>
              ) : (
                <div className="py-12 flex flex-col items-center text-center space-y-6">
                  <div className="w-20 h-20 rounded-full bg-emerald-500/10 flex items-center justify-center">
                    <CheckCircle2 className="w-10 h-10 text-emerald-500" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-2xl font-light text-zinc-900 dark:text-zinc-50">Thank You!</h3>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-[250px]">
                      Hmari team aapko jaldi hi call karegi.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
