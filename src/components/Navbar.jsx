import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import logoIcon from '../assets/logo-icon.png';
import { logAnalyticsEvent } from '../utils/analytics';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                scrolled ? 'dm-navbar-scrolled' : 'dm-navbar-transparent'
            }`}
        >
            <div className="dm-container h-20 flex items-center justify-between">
                <a href="#" className="flex items-center gap-3" onClick={() => logAnalyticsEvent('click_nav_logo')}>
                    <motion.img 
                        whileHover={{ scale: 1.05, rotate: -5 }} 
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                        src={logoIcon} 
                        alt="DesignMate Logo" 
                        className="h-8 md:h-9 w-auto" 
                    />
                    <span className="font-bold text-xl md:text-2xl text-white tracking-tight" style={{ fontFamily: 'var(--font-sans)' }}>
                        Design<span style={{ color: 'var(--accent-cyan)' }}>Mate</span>
                    </span>
                </a>

                <div className="flex items-center gap-4">
                    <motion.a
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        href="#waitlist"
                        className="dm-btn dm-btn-primary dm-btn-sm"
                        onClick={() => logAnalyticsEvent('click_nav_waitlist')}
                    >
                        Join Waitlist
                    </motion.a>
                </div>
            </div>
        </motion.nav>
    );
};

export default Navbar;
