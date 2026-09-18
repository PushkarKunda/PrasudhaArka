import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, Calculator, Menu, X, Sparkles, ChevronRight } from 'lucide-react';
import { scrollToSection } from '../../../utils/navigation';
import { Magnet } from '../../reactbits';
import './Navbar.css';

export const Navbar = ({ lang, setLang, t }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  // Refs: drawer + toggle for outside-click detection, and a deferred scroll
  // target so navigation waits until the drawer finishes closing.
  const menuRef = useRef(null);
  const toggleRef = useRef(null);
  const pendingScrollRef = useRef(null);

  const navItems = [
    { label: t.navHome, href: '#home' },
    { label: t.navAbout, href: '#about' },
    { label: t.navSubsidy, href: '#pricing' },
    { label: t.navCalc, href: '#calculator' },
    { label: t.navServices, href: '#services' },
    { label: t.navProcess, href: '#process' },
    { label: t.navDocuments, href: '#documents' },
    { label: t.navContact, href: '#contact' },
  ];

  // Scroll behavior: header elevation + section scroll-spy
  useEffect(() => {
    let ticking = false;
    let lastScrolled = false;
    let lastActive = '';

    const updateActiveSection = () => {
      const probe = window.scrollY + 120;
      let active = 'home';
      for (const item of navItems) {
        const el = document.querySelector(item.href);
        if (!el) continue;
        if (el.getBoundingClientRect().top + window.scrollY <= probe) {
          active = item.href.slice(1);
        }
      }
      // At (or near) the bottom of the page, keep the last section active
      if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 40) {
        active = navItems[navItems.length - 1].href.slice(1);
      }
      if (active !== lastActive) {
        lastActive = active;
        setActiveSection(active);
      }
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrolled = window.scrollY > 30;
          if (scrolled !== lastScrolled) {
            lastScrolled = scrolled;
            setIsScrolled(scrolled);
          }
          updateActiveSection();
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    updateActiveSection();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Mobile popup modal: lock html/body scroll & handle Escape key
  useEffect(() => {
    if (!mobileMenuOpen) return;
    const prevHtmlOverflow = document.documentElement.style.overflow;
    const prevBodyOverflow = document.body.style.overflow;
    const prevTouchAction = document.body.style.touchAction;

    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
    document.body.style.touchAction = 'none';

    const onKey = (e) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };

    window.addEventListener('keydown', onKey);
    return () => {
      document.documentElement.style.overflow = prevHtmlOverflow;
      document.body.style.overflow = prevBodyOverflow;
      document.body.style.touchAction = prevTouchAction;
      window.removeEventListener('keydown', onKey);
    };
  }, [mobileMenuOpen]);

  const toggleLanguage = () => {
    setLang(prev => (prev === 'te' ? 'en' : 'te'));
  };

  const handleNavScroll = (e, href) => {
    if (e && e.preventDefault) {
      e.preventDefault();
    }

    if (mobileMenuOpen) {
      // Defer the scroll until the drawer finishes closing (handled in the
      // AnimatePresence onExitComplete) instead of scrolling underneath it.
      pendingScrollRef.current = href;
      setMobileMenuOpen(false);
    } else {
      scrollToSection(href);
    }
  };

  return (
    <header className={`site-header ${isScrolled ? 'header-scrolled' : ''}`}>
      <div className="container navbar">
        <a 
          href="#home" 
          onClick={(e) => handleNavScroll(e, '#home')}
          className="brand-identity" 
          title="Prasudharka Solar"
        >
          <div className="brand-logo-container">
            <img 
              src={lang === 'te' ? '/assets/logo_te.jpg' : '/assets/logo_en.jpg'} 
              alt="Prasudharka Solar Logo" 
              className="brand-logo-img"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                const fallback = e.currentTarget.nextElementSibling;
                if (fallback) fallback.style.display = 'flex';
              }}
            />
            <div className="brand-text-fallback" style={{ display: 'none' }}>
              <span className="brand-main">PRASUDHARKA</span>
              <span className="brand-sub">SOLAR & GREEN ENERGY</span>
            </div>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="desktop-nav">
          <ul className="nav-links">
            {navItems.map((item, idx) => (
              <li key={idx}>
                <a
                  href={item.href}
                  onClick={(e) => handleNavScroll(e, item.href)}
                  className={`nav-link ${activeSection === item.href.slice(1) ? 'active' : ''}`}
                  aria-current={activeSection === item.href.slice(1) ? 'page' : undefined}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Actions (Language Toggle & CTA) */}
        <div className="nav-actions">
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleLanguage} 
            className="lang-toggle-btn"
            title="Switch Language / భాషను మార్చుకోండి"
          >
            <Globe size={16} className="lang-icon" />
            <span className={`lang-btn-text ${lang === 'te' ? 'font-en' : 'font-te'}`}>
              {t.langBtnText}
            </span>
          </motion.button>

          <Magnet magnetStrength={0.25} padding={15} className="nav-calc-magnet">
            <a 
              href="#calculator" 
              onClick={(e) => handleNavScroll(e, '#calculator')}
              className="btn btn-primary btn-sm btn-glow nav-calc-btn"
            >
              <Calculator size={16} />
              <span className="nav-calc-btn-text">{t.btnCalcSubsidy}</span>
            </a>
          </Magnet>

          <button
            ref={toggleRef}
            className="mobile-menu-toggle"
            onClick={() => {
              pendingScrollRef.current = null; // drop any stale deferred scroll
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
          >
            {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile Popup Modal (Rendered via Portal so it never scrolls with header or page) */}
      {typeof document !== 'undefined' && createPortal(
        <AnimatePresence
          onExitComplete={() => {
            const target = pendingScrollRef.current;
            pendingScrollRef.current = null;
            if (target) scrollToSection(target);
          }}
        >
          {mobileMenuOpen && (
            <div 
              className="mobile-popup-wrapper" 
              role="dialog" 
              aria-modal="true" 
              aria-label="Navigation Menu"
            >
              {/* Dimmed Backdrop */}
              <motion.div
                className="mobile-popup-backdrop"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={() => setMobileMenuOpen(false)}
              />

              {/* Popup Modal Card */}
              <motion.div
                ref={menuRef}
                className="mobile-popup-card"
                initial={{ opacity: 0, y: -20, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -16, scale: 0.96 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Popup Header */}
                <div className="mobile-popup-header">
                  <div className="mobile-popup-brand">
                    <img 
                      src={lang === 'te' ? '/assets/logo_te.jpg' : '/assets/logo_en.jpg'} 
                      alt="Prasudharka Solar" 
                      className="mobile-popup-logo"
                    />
                  </div>
                  <div className="mobile-popup-header-actions">
                    <button 
                      onClick={toggleLanguage} 
                      className="mobile-popup-lang-btn"
                      title="Switch Language / భాషను మార్చుకోండి"
                    >
                      <Globe size={15} />
                      <span className={lang === 'te' ? 'font-en' : 'font-te'}>
                        {t.langBtnText}
                      </span>
                    </button>
                    <button 
                      onClick={() => setMobileMenuOpen(false)} 
                      className="mobile-popup-close-btn"
                      aria-label="Close navigation menu"
                    >
                      <X size={20} />
                    </button>
                  </div>
                </div>

                {/* Popup Navigation Links */}
                <div className="mobile-popup-body">
                  <ul className="mobile-popup-nav-links">
                    {navItems.map((item, idx) => (
                      <li key={idx}>
                        <a 
                          href={item.href} 
                          onClick={(e) => handleNavScroll(e, item.href)} 
                          className={`mobile-popup-link ${activeSection === item.href.slice(1) ? 'active' : ''}`}
                        >
                          <span>{item.label}</span>
                          <ChevronRight size={18} className="link-arrow" />
                        </a>
                      </li>
                    ))}
                  </ul>

                  <div className="mobile-popup-actions">
                    <a 
                      href="#calculator" 
                      onClick={(e) => handleNavScroll(e, '#calculator')} 
                      className="btn btn-primary btn-block mobile-popup-cta-btn"
                    >
                      <Calculator size={18} />
                      <span>{t.btnCalcSubsidy}</span>
                    </a>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </header>
  );
};

export default Navbar;
