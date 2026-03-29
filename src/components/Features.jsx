import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Inbox, Handshake, Sparkles, MoveRight } from 'lucide-react';

const steps = [
    {
        title: 'Post Your Project',
        description: "Describe your dream project, set your budget and location. It's free and takes under 2 minutes.",
        icon: FileText,
        step: '01',
    },
    {
        title: 'Receive Qualified Bids',
        description: 'Get custom proposals from verified professionals ready to bring your vision to life.',
        icon: Inbox,
        step: '02',
    },
    {
        title: 'Hire the Best Expert',
        description: 'Compare portfolios, ratings, and budgets to hire the professional that perfectly matches your needs.',
        icon: Handshake,
        step: '03',
    },
];

const cardVariants = {
    hidden: { opacity: 0, y: 60 },
    visible: (i) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.2, duration: 0.7, ease: [0.16, 1, 0.3, 1] },
    }),
};

const Features = () => {
    return (
        <section
            id="how-it-works"
            className="dm-section relative overflow-hidden"
            style={{ backgroundColor: '#030303' }}
        >
            {/* Soft background ambient glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-white/[0.03] to-transparent blur-3xl pointer-events-none" />

            <div className="dm-container relative z-10">
                {/* Header */}
                <div className="text-center" style={{ marginBottom: '5rem' }}>
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.08] mb-6 shadow-xl"
                    >
                        <Sparkles className="h-4 w-4 text-gray-400" />
                        <span className="text-xs font-semibold uppercase tracking-[0.15em] text-white/70">
                            How it works
                        </span>
                    </motion.div>
                    
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tighter"
                    >
                        From Vision to <br className="md:hidden" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-400 to-gray-600">Reality in 3 Steps</span>
                    </motion.h2>
                </div>

                {/* Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                    {steps.map((step, index) => (
                        <motion.div
                            key={index}
                            custom={index}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: '-50px' }}
                            variants={cardVariants}
                            whileHover={{ y: -10 }}
                            className="group relative flex flex-col p-1 rounded-3xl bg-white/[0.02] border border-white/[0.05] hover:border-white/[0.15] transition-all duration-500"
                        >
                            {/* Graphic Container */}
                            <div className="relative w-full overflow-hidden rounded-[1.25rem] bg-[#0a0a0a]" style={{ aspectRatio: '16/11' }}>
                                {/* Hover Gradient Fill */}
                                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.08] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                                
                                {/* Geometric Background Grid */}
                                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:2rem_2rem] opacity-[0.03] [mask-image:radial-gradient(ellipse_at_center,black_10%,transparent_70%)]" />

                                {/* Floating Geometry Rings */}
                                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                    <motion.div 
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                                        className="absolute w-40 h-40 rounded-full border border-white/10 border-t-white/30 border-l-white/10 opacity-30 group-hover:opacity-100 transition-opacity duration-500"
                                    />
                                    <motion.div 
                                        animate={{ rotate: -360 }}
                                        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                                        className="absolute w-28 h-28 rounded-full border border-white/5 border-b-white/40 border-r-white/5 opacity-30 group-hover:opacity-100 transition-opacity duration-500"
                                    />
                                </div>

                                {/* Center Icon */}
                                <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                                    <step.icon strokeWidth={1.5} className="w-14 h-14 text-white/50 drop-shadow-[0_0_15px_rgba(255,255,255,0.2)] transition-all duration-700 group-hover:scale-125 group-hover:text-white" />
                                </div>
                                
                                {/* Step Indicator Badge in Graphic */}
                                <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-xs font-bold tracking-widest text-white/40 group-hover:text-white/80 transition-colors z-20">
                                    {step.step}
                                </div>
                            </div>

                            {/* Text Content */}
                            <div className="p-8 pt-10 relative">
                                {/* Connecting timeline arrow (visible on md+) */}
                                {index < steps.length - 1 && (
                                    <div className="hidden md:flex absolute top-10 -right-8 z-20 text-white/20">
                                        <MoveRight size={32} strokeWidth={1} />
                                    </div>
                                )}
                                
                                <h3 className="text-2xl font-bold text-white mb-3 tracking-tight group-hover:text-white/90 transition-colors">
                                    {step.title}
                                </h3>
                                <p className="text-white/50 leading-relaxed font-light">
                                    {step.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;
