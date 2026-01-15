"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles, TrendingUp, Users, Target } from "lucide-react";
import Image from "next/image";

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AboutModal = ({ isOpen, onClose }: AboutModalProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ 
              duration: 0.4, 
              ease: [0.22, 1, 0.36, 1]
            }}
            className="fixed inset-4 md:inset-8 lg:inset-16 z-50 overflow-hidden"
          >
            <div className="relative h-full w-full bg-white dark:bg-zinc-900 rounded-3xl shadow-2xl overflow-y-auto">
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-6 right-6 md:top-8 md:right-8 z-10 p-2 rounded-full bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors duration-300 group"
              >
                <X className="w-5 h-5 text-zinc-600 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-zinc-100 transition-colors" />
              </button>

              {/* Content */}
              <div className="px-6 py-12 md:px-12 md:py-16 lg:px-20 lg:py-20">
                {/* Header */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  className="mb-12 md:mb-16"
                >
                  <h2 
                    className="text-5xl md:text-6xl lg:text-7xl font-light tracking-tight text-zinc-900 dark:text-zinc-50 mb-4"
                    style={{ fontFamily: "'Cormorant Garamond', serif" }}
                  >
                    About k24
                  </h2>
                  <div className="w-24 h-1 bg-gradient-to-r from-zinc-900 to-zinc-400 dark:from-zinc-100 dark:to-zinc-600" />
                </motion.div>

                {/* Animated Pencil Drawing */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                  className="relative w-full h-64 md:h-80 lg:h-96 mb-16 rounded-2xl overflow-hidden bg-gradient-to-br from-zinc-50 to-zinc-100 dark:from-zinc-800 dark:to-zinc-900"
                >
                  <Image
                    src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/27e7f6c8-ed4e-4794-b172-7356d6b4d751/generated_images/minimalist-pencil-sketch-animation-frame-420cda99-20251106094509.jpg"
                    alt="Creative Process"
                    fill
                    className="object-cover opacity-80"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-white/80 to-transparent dark:from-zinc-900/80" />
                </motion.div>

                {/* Mission Statement */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  className="mb-16"
                >
                  <p className="text-xl md:text-2xl lg:text-3xl font-light text-zinc-700 dark:text-zinc-300 leading-relaxed">
                    We are <span className="font-medium text-zinc-900 dark:text-zinc-100">k24</span>—a team of passionate dreamers and doers building the next generation of AI-powered business tools. Our mission is simple:
                  </p>
                  <p className="text-2xl md:text-3xl lg:text-4xl font-medium text-zinc-900 dark:text-zinc-50 mt-8 leading-snug">
                    Empower entrepreneurs, traders, and makers to reach new heights by turning complexity into clarity.
                  </p>
                </motion.div>

                {/* Story Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                  className="glass-button p-8 md:p-10 lg:p-12 rounded-3xl mb-12 border-2"
                >
                  <p className="text-lg md:text-xl text-zinc-700 dark:text-zinc-300 leading-relaxed">
                    Founded by an Indian entrepreneur and trader, k24 is shaped by relentless risk-taking, market insights, and cutting-edge software development. From daily market analysis to groundbreaking inventory management AI, we combine ambition with execution.
                  </p>
                </motion.div>

                {/* What We Do - Cards */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                  className="mb-16"
                >
                  <h3 className="text-3xl md:text-4xl font-light text-zinc-900 dark:text-zinc-50 mb-8" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                    What we do:
                  </h3>
                  
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="group p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-750 transition-all duration-500 hover:scale-105">
                      <Sparkles className="w-8 h-8 text-zinc-700 dark:text-zinc-300 mb-4 group-hover:scale-110 transition-transform" />
                      <p className="text-base text-zinc-700 dark:text-zinc-300 leading-relaxed">
                        Build an AI-powered inventory and business management system for ambitious creators and businesses
                      </p>
                    </div>
                    
                    <div className="group p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-750 transition-all duration-500 hover:scale-105">
                      <TrendingUp className="w-8 h-8 text-zinc-700 dark:text-zinc-300 mb-4 group-hover:scale-110 transition-transform" />
                      <p className="text-base text-zinc-700 dark:text-zinc-300 leading-relaxed">
                        Integrate world-class automation for trading, analytics, accounting, and manufacturing workflows
                      </p>
                    </div>
                    
                    <div className="group p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-750 transition-all duration-500 hover:scale-105">
                      <Target className="w-8 h-8 text-zinc-700 dark:text-zinc-300 mb-4 group-hover:scale-110 transition-transform" />
                      <p className="text-base text-zinc-700 dark:text-zinc-300 leading-relaxed">
                        Enable fast, user-friendly experiences for tracking, reporting, and decisive action—no matter your scale
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* Vision */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7, duration: 0.6 }}
                  className="mb-16 p-8 md:p-10 lg:p-12 rounded-3xl bg-gradient-to-br from-zinc-900 to-zinc-700 dark:from-zinc-100 dark:to-zinc-300"
                >
                  <h3 className="text-3xl md:text-4xl font-light text-zinc-50 dark:text-zinc-900 mb-6" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                    Our Vision:
                  </h3>
                  <p className="text-lg md:text-xl text-zinc-100 dark:text-zinc-800 leading-relaxed">
                    To be the tech force behind India's new wave of entrepreneurs and disruptors. We blend deep trading expertise with modern product development and AI, delivering tools that feel powerful, personal, and transformative.
                  </p>
                </motion.div>

                  {/* Team */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.6 }}
                    className="glass-button p-8 md:p-10 rounded-3xl border-2 overflow-hidden relative group"
                  >
                    {/* Cinematic background effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-zinc-900/5 to-transparent dark:from-zinc-100/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                    
                    <div className="flex items-start gap-4 mb-8 relative z-10">
                      <Users className="w-10 h-10 text-zinc-700 dark:text-zinc-300 flex-shrink-0" />
                      <h3 className="text-3xl md:text-4xl font-light text-zinc-900 dark:text-zinc-50" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                        Who's Behind k24?
                      </h3>
                    </div>
                    
                    <div className="space-y-8 relative z-10">
                      <div className="flex flex-col gap-2">
                        <span className="text-[10px] tracking-[0.5em] uppercase text-zinc-400 dark:text-zinc-500 font-medium">Organization</span>
                        <div className="flex items-center gap-4">
                          <h4 
                            className="text-5xl md:text-6xl font-light tracking-[0.2em] text-zinc-900 dark:text-zinc-50 uppercase"
                            style={{ fontFamily: "'Cormorant Garamond', serif" }}
                          >
                            KRISHA
                          </h4>
                          <div className="h-[1px] flex-1 bg-gradient-to-r from-zinc-200 to-transparent dark:from-zinc-800" />
                        </div>
                        <p className="text-base text-zinc-600 dark:text-zinc-400 italic mt-2">
                          A collective of engineers, makers, and dreamers building the future of B2B SaaS in India.
                        </p>
                      </div>
                    </div>
                  </motion.div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
