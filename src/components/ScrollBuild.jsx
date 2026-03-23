import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Shovel, HardHat, PaintBucket, Home } from 'lucide-react';

const steps = [
    { icon: Shovel, title: 'Foundation', desc: 'Laying the solid concrete base and blueprint.', stepNum: '01' },
    { icon: HardHat, title: 'Framing', desc: 'Erecting the structural skeleton of the building.', stepNum: '02' },
    { icon: PaintBucket, title: 'Exterior Walls', desc: 'Adding walls, windows, and insulation.', stepNum: '03' },
    { icon: Home, title: 'Roof & Finish', desc: 'Capping the roof and completing the home.', stepNum: '04' }
];

const ScrollBuild = () => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // SVG Layer Animations (Dropping down on the Y axis)
    // Layer 1: Foundation
    const yFoundation = useTransform(scrollYProgress, [0, 0.2], [-50, 0]);
    const opFoundation = useTransform(scrollYProgress, [0, 0.15], [0, 1]);

    // Layer 2: Framing
    const yFraming = useTransform(scrollYProgress, [0.2, 0.45], [-200, 0]);
    const opFraming = useTransform(scrollYProgress, [0.2, 0.4], [0, 1]);

    // Layer 3: Walls
    const yWalls = useTransform(scrollYProgress, [0.45, 0.7], [-300, 0]);
    const opWalls = useTransform(scrollYProgress, [0.45, 0.65], [0, 1]);

    // Layer 4: Roof
    const yRoof = useTransform(scrollYProgress, [0.7, 0.95], [-400, 0]);
    const opRoof = useTransform(scrollYProgress, [0.7, 0.9], [0, 1]);

    // Active Ranges for text
    const activeRanges = [
        [0, 0.25],
        [0.25, 0.5],
        [0.5, 0.75],
        [0.75, 1.0]
    ];

    return (
        <section
            ref={containerRef}
            style={{
                height: '400vh',
                position: 'relative',
                backgroundColor: 'var(--bg-deep)',
                borderTop: '1px solid var(--border-subtle)'
            }}
        >
            <div className="sticky top-0 h-screen overflow-hidden flex items-center">
                <div className="ic-container w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                    {/* Left: Text Steps */}
                    <div style={{ zIndex: 10 }}>
                        <span
                            className="inline-block font-bold uppercase"
                            style={{ color: 'var(--accent-blue)', letterSpacing: '0.15em', marginBottom: '1rem' }}
                        >
                            The Process
                        </span>
                        <h2 className="mb-10 text-white" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', lineHeight: 1.1 }}>
                            Watch Your Vision <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
                                Take Shape.
                            </span>
                        </h2>

                        <div className="flex flex-col gap-8 relative border-l-2 ml-4 pl-8 py-2" style={{ borderColor: 'var(--border-subtle)' }}>
                            {steps.map((step, i) => {
                                const Icon = step.icon;
                                const opText = useTransform(
                                    scrollYProgress,
                                    [activeRanges[i][0] - 0.1, activeRanges[i][0], activeRanges[i][1], activeRanges[i][1] + 0.1],
                                    [0.2, 1, 1, 0.2]
                                );

                                return (
                                    <motion.div key={i} style={{ opacity: opText }} className="relative">
                                        <div
                                            className="absolute"
                                            style={{
                                                left: '-2rem', top: '0.25rem', width: '1rem', height: '1rem',
                                                borderRadius: '50%', background: 'var(--bg-deep)',
                                                border: '2px solid var(--accent-blue)', transform: 'translateX(-50%)'
                                            }}
                                        />

                                        <div className="flex items-center gap-4 mb-2">
                                            <div
                                                className="flex items-center justify-center"
                                                style={{
                                                    width: '3rem', height: '3rem', borderRadius: '0.75rem',
                                                    background: 'rgba(56, 189, 248, 0.1)', color: 'var(--accent-blue)'
                                                }}
                                            >
                                                <Icon size={20} />
                                            </div>
                                            <h3 style={{ fontSize: '1.25rem', color: '#ffffff', fontFamily: 'var(--font-sans)', fontWeight: 600 }}>
                                                {step.title}
                                            </h3>
                                        </div>
                                        <p style={{ color: 'var(--text-muted)', fontSize: '1rem', lineHeight: 1.6, maxWidth: '24rem' }}>
                                            {step.desc}
                                        </p>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Right: SVG Layered House Animation */}
                    <div className="flex justify-center items-center h-[500px] lg:h-[700px] w-full relative">
                        <svg viewBox="0 0 400 400" className="w-full h-full max-w-[500px]" style={{ filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.5))' }}>

                            {/* Foundation Layer */}
                            <motion.g style={{ y: yFoundation, opacity: opFoundation }}>
                                {/* Top face */}
                                <polygon points="200,280 340,210 200,140 60,210" fill="#cbd5e1" />
                                {/* Right face */}
                                <polygon points="200,280 340,210 340,230 200,300" fill="#94a3b8" />
                                {/* Left face */}
                                <polygon points="200,280 60,210 60,230 200,300" fill="#64748b" />
                                {/* Grid lines on foundation for blueprint feel */}
                                <path d="M 95,192.5 L 235,262.5 M 130,175 L 270,245 M 165,157.5 L 305,227.5" stroke="#f8fafc" strokeWidth="1" opacity="0.4" />
                                <path d="M 235,157.5 L 95,227.5 M 270,175 L 130,245 M 305,192.5 L 165,262.5" stroke="#f8fafc" strokeWidth="1" opacity="0.4" />
                            </motion.g>

                            {/* Framing Layer */}
                            <motion.g style={{ y: yFraming, opacity: opFraming }}>
                                {/* Left wall studs */}
                                {[...Array(6)].map((_, idx) => (
                                    <line key={`l-${idx}`} x1={65 + idx * 26} y1={207 + idx * 13} x2={65 + idx * 26} y2={107 + idx * 13} stroke="#38bdf8" strokeWidth="3" opacity="0.8" strokeLinecap="round" />
                                ))}
                                {/* Right wall studs */}
                                {[...Array(6)].map((_, idx) => (
                                    <line key={`r-${idx}`} x1={335 - idx * 26} y1={207 + idx * 13} x2={335 - idx * 26} y2={107 + idx * 13} stroke="#0ea5e9" strokeWidth="3" opacity="0.8" strokeLinecap="round" />
                                ))}
                                {/* Top framing plates */}
                                <polyline points="200,180 60,110 200,40 340,110 200,180" fill="none" stroke="#22d3ee" strokeWidth="4" strokeLinejoin="round" />
                            </motion.g>

                            {/* Exterior Walls & Windows */}
                            <motion.g style={{ y: yWalls, opacity: opWalls }}>
                                {/* Right Wall */}
                                <polygon points="200,280 340,210 340,110 200,180" fill="#f1f5f9" />
                                <polygon points="200,280 340,210 340,110 200,180" fill="rgba(0,0,0,0.05)" /> {/* Subtle shadow */}
                                {/* Left Wall */}
                                <polygon points="200,280 60,210 60,110 200,180" fill="#e2e8f0" />

                                {/* Left Wall Windows */}
                                <polygon points="90,195 120,180 120,130 90,145" fill="#bae6fd" opacity="0.9" />
                                <polygon points="140,170 170,155 170,105 140,120" fill="#bae6fd" opacity="0.9" />

                                {/* Right Wall Door & Window */}
                                <polygon points="230,165 260,150 260,240 230,255" fill="#334155" /> {/* Door */}
                                <polygon points="280,180 310,165 310,115 280,130" fill="#7dd3fc" opacity="0.9" /> {/* Window */}
                            </motion.g>

                            {/* Roof Layer */}
                            <motion.g style={{ y: yRoof, opacity: opRoof }}>
                                {/* Pyramid Roof Center Peak */}
                                {/* Left Roof Face */}
                                <polygon points="200,180 50,105 200,20" fill="#334155" />
                                {/* Right Roof Face */}
                                <polygon points="200,180 350,105 200,20" fill="#1e293b" />
                                {/* Roof Fascia/Trim Left */}
                                <polygon points="200,180 50,105 50,115 200,190" fill="#0f172a" />
                                {/* Roof Fascia/Trim Right */}
                                <polygon points="200,180 350,105 350,115 200,190" fill="#020617" />

                                {/* Chimney */}
                                <polygon points="120,80 140,70 140,30 120,40" fill="#64748b" />
                                <polygon points="140,70 155,78 155,38 140,30" fill="#475569" />
                            </motion.g>

                            {/* Connecting vertical line across all layers linking the scroll */}
                            <motion.line
                                x1="200" y1="20" x2="200" y2="400"
                                stroke="url(#gradLine)" strokeWidth="2" strokeDasharray="6 6"
                                style={{ opacity: useTransform(scrollYProgress, [0.1, 0.9], [0.8, 0]) }}
                            />
                            <defs>
                                <linearGradient id="gradLine" x1="0%" y1="0%" x2="0%" y2="100%">
                                    <stop offset="0%" stopColor="#38bdf8" stopOpacity="0" />
                                    <stop offset="50%" stopColor="#38bdf8" stopOpacity="1" />
                                    <stop offset="100%" stopColor="#38bdf8" stopOpacity="0" />
                                </linearGradient>
                            </defs>
                        </svg>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ScrollBuild;
