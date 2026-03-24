import React, { useEffect } from 'react';
import logoIcon from './assets/logo-icon.png';
import Hero from './components/Hero';
import Features from './components/Features';

import Professionals from './components/Professionals';
import WaitlistForm from './components/WaitlistForm';
import { motion, useScroll, useSpring } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
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
    <div style={{ minHeight: '100vh', background: 'var(--bg-deep)' }}>
      <main>
        <Hero />
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
                          background: 'rgba(59,130,246,0.1)',
                          border: '1px solid rgba(59,130,246,0.2)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                          color: 'var(--accent-blue)',
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

      {/* Footer */}
      <footer
        style={{
          backgroundColor: 'var(--bg-deep)',
          padding: '3rem 0',
        }}
      >
        <div className="dm-container">
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: '1.5rem',
            }}
          >
            {/* Logo small */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <img src={logoIcon} alt="Logo" style={{ height: '1.75rem', width: 'auto' }} />
              <span
                style={{
                  fontWeight: 800,
                  fontSize: '1.1rem',
                  color: '#ffffff',
                  fontFamily: 'var(--font-sans)',
                }}
              >
                Design<span style={{ color: 'var(--accent-blue)' }}>Mate</span>
              </span>
            </div>

            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: 500 }}>
              &copy; 2026 DesignMate. All rights reserved.
            </p>

            <div />
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;