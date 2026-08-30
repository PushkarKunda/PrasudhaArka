import React, { useState, useEffect } from 'react';
import { I18N } from './data/i18n';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { SolarCalculator } from './components/SolarCalculator';
import { SystemPricing } from './components/SystemPricing';
import { BrandShowcase } from './components/BrandShowcase';
import { ServicesSection } from './components/ServicesSection';
import { ProcessTimeline } from './components/ProcessTimeline';
import { DocumentsSection } from './components/DocumentsSection';
import { Testimonials } from './components/Testimonials';
import { FaqSection } from './components/FaqSection';
import { ContactSection } from './components/ContactSection';
import { FloatingActions } from './components/FloatingActions';
import { Footer } from './components/Footer';

export function App() {
  // Default to Telugu for local AP/TS base, switchable to English
  const [lang, setLang] = useState(() => {
    return localStorage.getItem('prasudharka_lang') || 'te';
  });

  useEffect(() => {
    localStorage.setItem('prasudharka_lang', lang);
    document.documentElement.lang = lang;
  }, [lang]);

  const t = I18N[lang] || I18N.te;

  return (
    <div className={`app-root lang-${lang}`}>
      {/* Main Sticky Header */}
      <Navbar lang={lang} setLang={setLang} t={t} />

      {/* Main Content Sections in Natural Logical Order */}
      <main>
        <Hero lang={lang} t={t} />
        <BrandShowcase lang={lang} t={t} />
        <SystemPricing lang={lang} t={t} />
        <SolarCalculator lang={lang} t={t} />
        <ServicesSection lang={lang} t={t} />
        <ProcessTimeline lang={lang} t={t} />
        <DocumentsSection lang={lang} t={t} />
        <Testimonials lang={lang} t={t} />
        <FaqSection lang={lang} t={t} />
        <ContactSection lang={lang} t={t} />
      </main>

      {/* Global Floating Actions (WhatsApp Dealer modal & Scroll top) */}
      <FloatingActions lang={lang} />

      {/* Footer */}
      <Footer lang={lang} t={t} />
    </div>
  );
}

export default App;
