"use client";

import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck } from "lucide-react";
import heroImg from '../../assets/hero.png';

export function ArchitectHero() {
    return (
        <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden pt-24 pb-16 md:pt-32">
            
            {/* Fullscreen Animated Background Image */}
            <div className="absolute inset-0 z-0 overflow-hidden">
                <motion.img 
                    initial={{ scale: 1 }}
                    animate={{ scale: 1.15 }}
                    transition={{ duration: 25, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
                    src={heroImg} 
                    alt="Luxury Home Architecture" 
                    className="w-full h-full object-cover"
                />
            </div>
            
            {/* Multi-layered Dark Overlays for Text Readability */}
            <div className="absolute inset-0 z-0 bg-black/50" />
            <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#030303]/80 via-transparent to-[#030303]" />
            <div className="absolute inset-0 z-0 bg-gradient-to-t from-[#030303] via-transparent to-transparent opacity-90" />

            <div className="relative z-10 container mx-auto px-4 md:px-6 flex flex-col items-center">
                
                {/* Company Name & Tagline */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-col items-center text-center max-w-5xl mb-6"
                >
                    <h1 className="text-4xl sm:text-7xl md:text-[9rem] font-black tracking-tighter leading-[1] drop-shadow-2xl mb-6 whitespace-nowrap">
                        <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-white/80">
                            Design-
                        </span>
                        <span className="text-transparent bg-clip-text bg-gradient-to-b from-gray-300 to-gray-500">
                            Mate
                        </span>
                    </h1>
                </motion.div>

                {/* USP Paragraph */}
                <motion.p
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.3 }}
                    className="text-base sm:text-lg md:text-xl text-white/70 mb-12 leading-relaxed font-light max-w-2xl text-center mx-auto drop-shadow-md"
                >
                    Connect instantly with verified professionals. Post your project for free and get competitive bids today.
                </motion.p>

                {/* Call to Actions */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="flex flex-col sm:flex-row gap-4 justify-center w-full relative z-20"
                >
                    <a
                        href="#waitlist"
                        className="inline-flex items-center justify-center gap-2 px-6 py-3 sm:px-10 sm:py-4 rounded-full bg-white text-black font-bold hover:scale-105 transition-transform shadow-[0_0_40px_rgba(255,255,255,0.3)] text-base sm:text-lg"
                    >
                        Join the Waitlist <ArrowRight className="w-5 h-5 sm:w-[22px] sm:h-[22px]" />
                    </a>
                    <a 
                        href="#how-it-works" 
                        className="inline-flex items-center justify-center px-6 py-3 sm:px-10 sm:py-4 rounded-full bg-white/10 text-white font-semibold border border-white/20 backdrop-blur-md hover:bg-white/20 transition-colors text-base sm:text-lg"
                    >
                        How It Works
                    </a>
                </motion.div>
            </div>
        </div>
    );
}
