import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle2, Sparkles } from 'lucide-react';
import { logAnalyticsEvent } from '../utils/analytics';

const inputStyle = {
    width: '100%',
    padding: '0.9rem 1.15rem',
    borderRadius: '0.75rem',
    border: '1px solid var(--border-subtle)',
    outline: 'none',
    fontSize: '0.95rem',
    fontFamily: 'var(--font-sans)',
    transition: 'border-color 0.3s ease, background 0.3s ease',
    background: 'rgba(30, 41, 59, 0.5)',
    color: '#ffffff',
    backdropFilter: 'blur(8px)',
};

const WaitlistForm = () => {
    const [form, setForm] = useState({ email: '', phone: '', city: '', profession: '' });
    const [otherProfession, setOtherProfession] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleFocus = (e) => (e.target.style.borderColor = 'var(--accent-blue)');
    const handleBlur = (e) => (e.target.style.borderColor = 'var(--border-subtle)');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.email) return;
        setLoading(true);

        const professionValue = form.profession === 'other' ? otherProfession : form.profession;

        // Log internally via Apps Script
        logAnalyticsEvent('join_waitlist', {
            email: form.email,
            phone: form.phone,
            city: form.city,
            profession: professionValue
        });

        // Post to Google Forms
        try {
            const gFormData = new FormData();
            // Using verified entry IDs from the Google Form HTML
            gFormData.append('entry.1792496510', form.email);
            gFormData.append('entry.1549383839', form.phone);
            gFormData.append('entry.739275443', form.city);
            gFormData.append('entry.344800395', professionValue);

            await fetch('https://docs.google.com/forms/d/e/1FAIpQLSfaM-nx-P93VU8_bumtPB4_uqwhnF3thPjvOxxWmwbeHUtHpg/formResponse', {
                method: 'POST',
                mode: 'no-cors',
                body: gFormData
            });
        } catch (err) {
            console.error('Submission error:', err);
        }

        setLoading(false);
        setSubmitted(true);
    };

    return (
        <section
            id="waitlist"
            className="ic-section relative overflow-hidden"
            style={{
                background: 'linear-gradient(135deg, var(--bg-deep) 0%, var(--bg-dark) 50%, var(--bg-deep) 100%)',
            }}
        >
            {/* Decorative glow blobs */}
            <div
                className="absolute"
                style={{
                    top: '-12rem',
                    right: '-8rem',
                    width: '30rem',
                    height: '30rem',
                    borderRadius: '50%',
                    background: 'rgba(59, 130, 246, 0.1)',
                    filter: 'blur(80px)',
                }}
            />
            <div
                className="absolute"
                style={{
                    bottom: '-10rem',
                    left: '-6rem',
                    width: '25rem',
                    height: '25rem',
                    borderRadius: '50%',
                    background: 'rgba(139, 92, 246, 0.1)',
                    filter: 'blur(100px)',
                }}
            />

            <div className="ic-container relative z-10">
                <div
                    className="ic-glass-card mx-auto"
                    style={{
                        maxWidth: '38rem',
                        padding: 'clamp(2.5rem, 5vw, 4rem)',
                        boxShadow: '0 25px 60px rgba(0,0,0,0.5)',
                    }}
                >
                    <AnimatePresence mode="wait">
                        {!submitted ? (
                            <motion.div
                                key="form"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.4 }}
                            >
                                <div className="text-center" style={{ marginBottom: '2.5rem' }}>
                                    <div
                                        className="inline-flex items-center gap-2"
                                        style={{
                                            background: 'rgba(59, 130, 246, 0.1)',
                                            border: '1px solid rgba(59, 130, 246, 0.2)',
                                            padding: '0.4rem 1rem',
                                            borderRadius: '2rem',
                                            fontSize: '0.8rem',
                                            fontWeight: 600,
                                            color: 'var(--accent-blue)',
                                            marginBottom: '1.25rem',
                                        }}
                                    >
                                        <Sparkles size={14} /> Early Access
                                    </div>

                                    <h2
                                        style={{
                                            fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
                                            lineHeight: 1.15,
                                            marginBottom: '0.75rem',
                                            color: '#ffffff',
                                            letterSpacing: '-0.02em',
                                        }}
                                    >
                                        Join the{' '}
                                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-violet-400">
                                            Waitlist
                                        </span>
                                    </h2>

                                    <p style={{ color: 'var(--text-muted)', fontSize: '1rem', lineHeight: 1.6 }}>
                                        Be the first to connect with verified professionals when we launch in your city.
                                    </p>
                                </div>

                                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="Email address *"
                                        value={form.email}
                                        onChange={handleChange}
                                        onFocus={handleFocus}
                                        onBlur={handleBlur}
                                        required
                                        style={inputStyle}
                                    />

                                    <input
                                        type="tel"
                                        name="phone"
                                        placeholder="Phone number"
                                        value={form.phone}
                                        onChange={handleChange}
                                        onFocus={handleFocus}
                                        onBlur={handleBlur}
                                        style={inputStyle}
                                    />

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <input
                                            type="text"
                                            name="city"
                                            placeholder="City"
                                            value={form.city}
                                            onChange={handleChange}
                                            onFocus={handleFocus}
                                            onBlur={handleBlur}
                                            style={inputStyle}
                                        />

                                        <select
                                            name="profession"
                                            value={form.profession}
                                            onChange={handleChange}
                                            onFocus={handleFocus}
                                            onBlur={handleBlur}
                                            style={{
                                                ...inputStyle,
                                                color: form.profession ? '#ffffff' : 'var(--text-muted)',
                                                appearance: 'none',
                                                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`,
                                                backgroundRepeat: 'no-repeat',
                                                backgroundPosition: 'right 1rem center',
                                            }}
                                        >
                                            <option value="" disabled>Profession</option>
                                            <option value="Homeowner">Homeowner</option>
                                            <option value="Architect">Architect</option>
                                            <option value="Contractor">Contractor</option>
                                            <option value="Interior Designer">Interior Designer</option>
                                            <option value="Structural Engineer">Structural Engineer</option>
                                            <option value="Landscape Designer">Landscape Designer</option>
                                            <option value="MEP Consultant">MEP Consultant</option>
                                            <option value="other">Other</option>
                                        </select>
                                    </div>

                                    {/* Conditional "Other" Profession Input */}
                                    {form.profession === 'other' && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0, marginTop: '-0.5rem' }}
                                            animate={{ opacity: 1, height: 'auto', marginTop: 0 }}
                                            transition={{ duration: 0.3 }}
                                            style={{ overflow: 'hidden' }}
                                        >
                                            <input
                                                type="text"
                                                name="otherProfession"
                                                placeholder="Please specify your profession"
                                                value={otherProfession}
                                                onChange={(e) => setOtherProfession(e.target.value)}
                                                onFocus={handleFocus}
                                                onBlur={handleBlur}
                                                required
                                                style={{ ...inputStyle, background: 'rgba(30, 41, 59, 0.7)' }}
                                            />
                                        </motion.div>
                                    )}

                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="ic-btn ic-btn-primary"
                                        style={{
                                            width: '100%',
                                            padding: '1rem',
                                            marginTop: '0.75rem',
                                            fontSize: '1.05rem',
                                            opacity: loading ? 0.7 : 1,
                                        }}
                                    >
                                        {loading ? 'Joining...' : 'Join the Waitlist'}
                                        {!loading && <Send size={18} />}
                                    </button>
                                </form>

                                <p
                                    style={{
                                        marginTop: '1.5rem',
                                        fontSize: '0.85rem',
                                        color: 'rgba(255,255,255,0.4)',
                                        textAlign: 'center',
                                    }}
                                >
                                    We'll never share your info. Only used to notify you at launch.
                                </p>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="success"
                                initial={{ opacity: 0, scale: 0.85 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                                className="text-center"
                                style={{ padding: '2rem 0' }}
                            >
                                <div
                                    className="inline-flex items-center justify-center"
                                    style={{
                                        width: '5rem',
                                        height: '5rem',
                                        borderRadius: '50%',
                                        background: 'rgba(34, 197, 94, 0.1)',
                                        border: '1px solid rgba(34, 197, 94, 0.2)',
                                        color: '#22c55e',
                                        marginBottom: '1.5rem',
                                    }}
                                >
                                    <CheckCircle2 size={48} />
                                </div>
                                <h2
                                    style={{
                                        fontSize: 'clamp(2rem, 4vw, 2.75rem)',
                                        marginBottom: '0.75rem',
                                        color: '#ffffff',
                                        letterSpacing: '-0.02em',
                                    }}
                                >
                                    You're on the list!
                                </h2>
                                <p
                                    style={{
                                        color: 'var(--text-muted)',
                                        fontSize: '1.05rem',
                                        maxWidth: '24rem',
                                        margin: '0 auto',
                                        lineHeight: 1.7,
                                    }}
                                >
                                    Thank you for your interest. We'll notify you as soon as we launch in your area.
                                </p>
                                <button
                                    onClick={() => {
                                        setSubmitted(false);
                                        setForm({ email: '', phone: '', city: '', profession: '' });
                                        setOtherProfession('');
                                    }}
                                    style={{
                                        marginTop: '2.5rem',
                                        background: 'none',
                                        border: 'none',
                                        color: 'var(--accent-blue)',
                                        fontWeight: 600,
                                        cursor: 'pointer',
                                        fontSize: '1rem',
                                        fontFamily: 'var(--font-sans)',
                                    }}
                                >
                                    ← Register another person
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
};

export default WaitlistForm;
