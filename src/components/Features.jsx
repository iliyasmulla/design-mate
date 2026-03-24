import React from 'react';
import { motion } from 'framer-motion';
import postIcon from '../assets/post-project.png';
import receiveIcon from '../assets/receive-bids.png';
import hireIcon from '../assets/hire-expert.png';

const steps = [
    {
        title: 'Post Your Project',
        description:
            "Describe your dream project, set your budget and location. It's free and takes under 2 minutes.",
        image: postIcon,
        step: '01',
    },
    {
        title: 'Receive Qualified Bids',
        description:
            'Get custom proposals from verified professionals ready to bring your vision to life.',
        image: receiveIcon,
        step: '02',
    },
    {
        title: 'Hire the Best Expert',
        description:
            'Compare portfolios, ratings, and budgets to hire the professional that perfectly matches your needs.',
        image: hireIcon,
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
            className="dm-section"
            style={{ backgroundColor: 'var(--bg-deep)' }}
        >
            <div className="dm-container">
                {/* Header */}
                <div className="text-center" style={{ marginBottom: '4rem' }}>
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-block font-bold uppercase"
                        style={{
                            color: 'var(--accent-blue)',
                            fontSize: '0.85rem',
                            letterSpacing: '0.15em',
                            marginBottom: '1rem',
                        }}
                    >
                        How it works
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: '#ffffff', letterSpacing: '-0.02em' }}
                    >
                        From Vision to Reality in 3 Steps
                    </motion.h2>
                </div>

                {/* Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {steps.map((step, index) => (
                        <motion.div
                            key={index}
                            custom={index}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: '-50px' }}
                            variants={cardVariants}
                            whileHover={{ y: -8 }}
                            className="dm-glass-card"
                            style={{
                                position: 'relative',
                                overflow: 'hidden',
                                cursor: 'default',
                                transition: 'border-color 0.3s ease',
                            }}
                            onMouseOver={(e) => (e.currentTarget.style.borderColor = 'var(--border-glow)')}
                            onMouseOut={(e) => (e.currentTarget.style.borderColor = 'var(--border-subtle)')}
                        >
                            {/* Step Number Accent */}
                            <div
                                style={{
                                    position: 'absolute',
                                    top: '1rem',
                                    right: '1.25rem',
                                    fontSize: '5rem',
                                    fontWeight: 900,
                                    lineHeight: 1,
                                    color: 'var(--accent-blue)',
                                    opacity: 0.05,
                                    zIndex: 0,
                                    fontFamily: 'var(--font-sans)',
                                }}
                            >
                                {step.step}
                            </div>

                            {/* Image */}
                            <div style={{ aspectRatio: '16/10', overflow: 'hidden' }}>
                                <img
                                    src={step.image}
                                    alt={step.title}
                                    className="w-full h-full object-cover"
                                    style={{ transition: 'transform 0.5s ease' }}
                                    onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.08)')}
                                    onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                                />
                            </div>

                            {/* Text */}
                            <div style={{ padding: '1.75rem 1.75rem 2rem', position: 'relative', zIndex: 1 }}>
                                <div
                                    style={{
                                        display: 'inline-block',
                                        padding: '0.35rem 0.85rem',
                                        borderRadius: '2rem',
                                        fontSize: '0.75rem',
                                        fontWeight: 700,
                                        letterSpacing: '0.05em',
                                        textTransform: 'uppercase',
                                        color: 'var(--accent-cyan)',
                                        backgroundColor: 'rgba(6, 182, 212, 0.1)',
                                        marginBottom: '0.85rem',
                                        border: '1px solid rgba(6, 182, 212, 0.2)',
                                    }}
                                >
                                    Step {step.step}
                                </div>
                                <h3 style={{ fontSize: '1.35rem', marginBottom: '0.6rem', color: '#ffffff', letterSpacing: '-0.01em' }}>
                                    {step.title}
                                </h3>
                                <p style={{ color: 'var(--text-muted)', lineHeight: 1.6, fontSize: '0.95rem' }}>
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
