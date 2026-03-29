import React, { useEffect } from 'react';
import logoIcon from './assets/logo-icon.png';
import { ArchitectHero } from './components/ui/architect-hero.jsx';
import Features from './components/Features';

import Professionals from './components/Professionals';
import WaitlistForm from './components/WaitlistForm';
import { motion, useScroll, useSpring } from 'framer-motion';
import { CheckCircle, Instagram, Facebook, Twitter, MessageSquare } from 'lucide-react';
import { logAnalyticsEvent } from './utils/analytics';

function App() {
  useEffect(() => {
    logAnalyticsEvent('page_visit');
  }, []);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div style={{ minHeight: '100vh', background: '#030303' }}>
      <main>
        <ArchitectHero />
        <Features />

        <Professionals />

        {/* Trust & Verification Section */}
        <section
          className="dm-section"
          style={{
            backgroundColor: 'var(--bg-dark)',
            borderTop: '1px solid var(--border-subtle)',
            borderBottom: '1px solid var(--border-subtle)',
          }}
        >
          <div className="dm-container">
            <div style={{ maxWidth: '42rem', margin: '0 auto' }}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="text-center" style={{ marginBottom: '3rem' }}>
                  <span
                    className="inline-block font-bold uppercase"
                    style={{
                      color: 'var(--accent-blue)',
                      fontSize: '0.85rem',
                      letterSpacing: '0.15em',
                      marginBottom: '1rem',
                    }}
                  >
                    Trust & Safety
                  </span>
                  <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: '#ffffff' }}>
                    Quality is the Foundation of{' '}
                    <span style={{ color: 'var(--accent-blue)' }}>Every Build</span>
                  </h2>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                  {[
                    {
                      title: 'Rigorous Portfolio Review',
                      desc: 'Every professional undergoes a manual portfolio audit by our expert team.',
                    },
                    {
                      title: 'Identity Verification',
                      desc: 'OTP-based phone and email verification ensures genuine connections.',
                    },
                    {
                      title: 'Social Credibility',
                      desc: 'LinkedIn and Instagram profiles linked for complete professional transparency.',
                    },
                  ].map((item, i) => (
                    <div key={i} style={{ display: 'flex', gap: '1.25rem', alignItems: 'flex-start' }}>
                      <div
                        style={{
                          width: '3rem',
                          height: '3rem',
                          borderRadius: '0.75rem',
                          background: 'rgba(255, 255, 255, 0.05)',
                          border: '1px solid rgba(255, 255, 255, 0.1)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                          color: '#ffffff',
                        }}
                      >
                        <CheckCircle size={20} />
                      </div>
                      <div>
                        <h4
                          style={{
                            fontSize: '1.15rem',
                            fontWeight: 600,
                            fontFamily: 'var(--font-sans)',
                            marginBottom: '0.3rem',
                            color: '#ffffff',
                          }}
                        >
                          {item.title}
                        </h4>
                        <p style={{ color: 'var(--text-muted)', lineHeight: 1.6, fontSize: '0.95rem' }}>
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <WaitlistForm />
      </main>

          {/* Premium Footer */}
          <footer className="border-t border-white/5 bg-[#030303] pt-16 pb-8 mt-12">
            <div className="dm-container">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                
                {/* Brand Column */}
                <div className="md:col-span-2">
                  <div className="flex items-center gap-4 mb-6">
                    {/* Simple Geometric Logo Mark */}
                    <div className="flex items-center justify-center h-14 w-14 rounded-xl bg-white text-[#030303] shadow-[0_0_20px_rgba(255,255,255,0.15)] flex-shrink-0">
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                        <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                        <line x1="12" y1="22.08" x2="12" y2="12" />
                      </svg>
                    </div>
                    <div>
                        <span className="text-2xl font-black tracking-tighter text-white block leading-none">
                          Design<span className="text-white/60">-Mate</span>
                        </span>
                        <span className="text-xs uppercase tracking-[0.2em] font-semibold text-white/40 mt-2 block">Luxury Marketplace</span>
                    </div>
                  </div>
                  <p className="text-white/50 text-sm leading-relaxed max-w-sm mb-8">
                    India's first verified home building marketplace connecting homeowners with elite architects, contractors, and 3D visualizers. 
                  </p>
                  
                  {/* Socials from USP Markdown */}
                  <div className="flex items-center gap-4">
                    <a href="https://www.instagram.com/desgin_mate.in/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:bg-white/10 hover:text-white transition-all"><Instagram size={18} /></a>
                    <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:bg-white/10 hover:text-white transition-all"><Facebook size={18} /></a>
                    <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:bg-white/10 hover:text-white transition-all"><Twitter size={18} /></a>
                    <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:bg-white/10 hover:text-white transition-all"><MessageSquare size={18} /></a>
                  </div>
                </div>

                {/* Quick Links */}
                <div>
                  <h4 className="text-white font-bold mb-6 tracking-wide">Platform</h4>
                  <ul className="flex flex-col gap-3">
                    <li><a href="#how-it-works" className="text-white/50 hover:text-white text-sm transition-colors">How it works</a></li>
                    <li><a href="#professionals" className="text-white/50 hover:text-white text-sm transition-colors">Browse Professionals</a></li>
                    <li><a href="#waitlist" className="text-white/50 hover:text-white text-sm transition-colors">Post a Project</a></li>
                    <li><a href="#" className="text-white/50 hover:text-white text-sm transition-colors">Pricing & Plans</a></li>
                  </ul>
                </div>

                {/* Company */}
                <div>
                  <h4 className="text-white font-bold mb-6 tracking-wide">Company</h4>
                  <ul className="flex flex-col gap-3">
                    <li><a href="#" className="text-white/50 hover:text-white text-sm transition-colors">About Us</a></li>
                    <li><a href="#" className="text-white/50 hover:text-white text-sm transition-colors">Architect Reviews</a></li>
                    <li><a href="#" className="text-white/50 hover:text-white text-sm transition-colors">Terms of Service</a></li>
                    <li><a href="#" className="text-white/50 hover:text-white text-sm transition-colors">Privacy Policy</a></li>
                  </ul>
                </div>
              </div>

              {/* Copyright */}
              <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
                <p className="text-white/30 text-xs">
                  &copy; 2026 Design-Mate. All rights reserved.
                </p>
                <div className="flex gap-6">
                    <span className="text-white/30 text-xs tracking-widest uppercase">Secure Payments via Razorpay</span>
                </div>
              </div>
            </div>
          </footer>
    </div>
  );
}

export default App;