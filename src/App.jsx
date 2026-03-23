import React, { useEffect } from 'react';
import Hero from './components/Hero';
import Features from './components/Features';
import ScrollBuild from './components/ScrollBuild';
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
      {/* Scroll Progress Bar */}
      <motion.div
        style={{
          scaleX,
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: '3px',
          background: 'linear-gradient(90deg, var(--accent-blue), var(--accent-violet))',
          transformOrigin: '0%',
          zIndex: 100,
        }}
      />

      {/* Navigation */}
      <nav
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          background: 'rgba(30,41,59,0.8)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderBottom: '1px solid var(--border-subtle)',
        }}
      >
        <div
          className="ic-container"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '1rem 1.5rem',
          }}
        >
          {/* Logo */}
          <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }}>
            <div
              style={{
                width: '2.5rem',
                height: '2.5rem',
                background: 'linear-gradient(135deg, var(--accent-blue), var(--accent-violet))',
                borderRadius: '0.6rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ffffff',
                fontWeight: 800,
                fontSize: '1.2rem',
                boxShadow: '0 4px 12px var(--accent-glow)',
              }}
            >
              IC
            </div>
            <span
              style={{
                fontSize: '1.4rem',
                fontWeight: 800,
                color: '#ffffff',
                letterSpacing: '-0.03em',
                fontFamily: 'var(--font-sans)',
              }}
            >
              infra<span style={{ color: 'var(--accent-blue)' }}>connect</span>
            </span>
          </a>

          {/* Nav CTA */}
          <div className="hidden md:flex" style={{ alignItems: 'center' }}>
            <a
              href="#waitlist"
              className="ic-btn ic-btn-primary"
              style={{ padding: '0.6rem 1.25rem', fontSize: '0.85rem' }}
              onClick={() => logAnalyticsEvent('click_get_early_access')}
            >
              Get Early Access
            </a>
          </div>
        </div>
      </nav>

      <main>
        <Hero />
        <Features />
        <ScrollBuild />
        <Professionals />

        {/* Trust & Verification Section */}
        <section
          className="ic-section"
          style={{
            backgroundColor: 'var(--bg-dark)',
            borderTop: '1px solid var(--border-subtle)',
            borderBottom: '1px solid var(--border-subtle)',
          }}
        >
          <div className="ic-container">
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
        <div className="ic-container">
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
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', opacity: 0.6 }}>
              <div
                style={{
                  width: '1.75rem',
                  height: '1.75rem',
                  background: 'var(--accent-blue)',
                  borderRadius: '0.4rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ffffff',
                  fontWeight: 800,
                  fontSize: '0.7rem',
                }}
              >
                IC
              </div>
              <span
                style={{
                  fontWeight: 800,
                  fontSize: '1rem',
                  color: '#ffffff',
                  fontFamily: 'var(--font-sans)',
                }}
              >
                infra<span style={{ color: 'var(--accent-blue)' }}>connect</span>
              </span>
            </div>

            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: 500 }}>
              &copy; 2025 InfraConnect. All rights reserved.
            </p>

            <div style={{ display: 'flex', gap: '1.5rem' }}>
              {['Privacy', 'Terms', 'Contact'].map((l) => (
                <a
                  key={l}
                  href="#"
                  style={{
                    fontSize: '0.85rem',
                    fontWeight: 500,
                    color: 'var(--text-muted)',
                    textDecoration: 'none',
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.color = '#ffffff')}
                  onMouseOut={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
                >
                  {l}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;