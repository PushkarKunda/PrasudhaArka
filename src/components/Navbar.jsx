import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, Calculator, Menu, X, Sparkles, ChevronRight } from 'lucide-react';

export const Navbar = ({ lang, setLang, t }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    let ticking = false;
    let lastScrolled = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrolled = window.scrollY > 30;
          if (scrolled !== lastScrolled) {
            lastScrolled = scrolled;
            setIsScrolled(scrolled);
          }
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleLanguage = () => {
    setLang(prev => (prev === 'te' ? 'en' : 'te'));
  };

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

  const handleNavScroll = (e, href) => {
    if (e && e.preventDefault) {
      e.preventDefault();
    }
    setMobileMenuOpen(false);

    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      // Execute scroll after mobile drawer starts closing
      setTimeout(() => {
        const headerOffset = 80;
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = element.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - headerOffset;

        window.scrollTo({
          top: Math.max(0, offsetPosition),
          behavior: 'smooth'
        });
      }, 50);

      if (window.history.pushState) {
        window.history.pushState(null, null, href);
      }
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
                  className="nav-link"
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
            <span className="lang-btn-text">{t.langBtnText}</span>
          </motion.button>

          <a 
            href="#calculator" 
            onClick={(e) => handleNavScroll(e, '#calculator')}
            className="btn btn-primary btn-sm btn-glow nav-calc-btn"
          >
            <Calculator size={16} />
            <span className="nav-calc-btn-text">{t.btnCalcSubsidy}</span>
          </a>

          <button 
            className="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            className="mobile-menu-overlay"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <div className="container mobile-menu-content">
              <ul className="mobile-nav-links">
                {navItems.map((item, idx) => (
                  <motion.li 
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                  >
                    <a 
                      href={item.href} 
                      onClick={(e) => handleNavScroll(e, item.href)} 
                      className="mobile-nav-link"
                    >
                      <span>{item.label}</span>
                      <ChevronRight size={18} />
                    </a>
                  </motion.li>
                ))}
              </ul>

              <div className="mobile-menu-actions">
                <button onClick={toggleLanguage} className="btn btn-outline btn-block">
                  <Globe size={18} />
                  <span>{t.langBtnText} ({lang === 'te' ? 'English' : 'తెలుగు'})</span>
                </button>
                <a 
                  href="#calculator" 
                  onClick={(e) => handleNavScroll(e, '#calculator')} 
                  className="btn btn-primary btn-block"
                >
                  <Calculator size={18} />
                  <span>{t.btnCalcSubsidy}</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
