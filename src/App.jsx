import React, { useState, useEffect, lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { I18N } from './data/i18n';
import { initCleanUrlHandler } from './utils/navigation';
import Gallery from './components/Gallery';
import {
  Navbar,
  Hero,
  BrandShowcase,
  SystemPricing,
  SolarCalculator,
  ServicesSection,
  ProcessTimeline,
  DocumentsSection,
  Testimonials,
  ContactSection,
  FaqSection,
  FloatingActions,
  Footer,
  ClickSpark,
} from './components';

const AdminPanel = lazy(() => import('./components/Admin/AdminPanel').then(m => ({ default: m.AdminPanel })));

// Route-level boundary so a failed lazy admin chunk (e.g. missing Firebase
// env keys on a fresh machine) shows a message instead of a white screen.
class RouteErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error) {
    console.error('Route failed to load:', error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'center', justifyContent: 'center', background: '#0f172a', color: '#f59e0b', fontFamily: 'sans-serif', textAlign: 'center', padding: '20px' }}>
          <span style={{ color: '#e2e8f0' }}>This page failed to load.</span>
          <a href="/" style={{ color: '#f59e0b' }}>Back to home</a>
        </div>
      );
    }
    return this.props.children;
  }
}

function MainPage({ lang, setLang, t }) {
  return (
    <>
      <a className="skip-link" href="#main-content">{t.skipToContent}</a>
      <Navbar lang={lang} setLang={setLang} t={t} />
      <main id="main-content" tabIndex={-1}>
        <Hero lang={lang} t={t} />
        <BrandShowcase lang={lang} t={t} />
        <SystemPricing lang={lang} t={t} />
        <SolarCalculator lang={lang} t={t} />
        <ServicesSection lang={lang} t={t} />
        <ProcessTimeline lang={lang} t={t} />
        <DocumentsSection lang={lang} t={t} />
        <Testimonials lang={lang} t={t} />
        <Gallery lang={lang} t={t} />
        <ContactSection lang={lang} t={t} />
        <FaqSection lang={lang} t={t} />
      </main>
      <FloatingActions lang={lang} />
      <Footer lang={lang} t={t} />
    </>
  );
}

export function App() {
  const [lang, setLang] = useState(() => {
    return localStorage.getItem('prasudharka_lang') || 'te';
  });

  useEffect(() => {
    initCleanUrlHandler();
  }, []);

  useEffect(() => {
    localStorage.setItem('prasudharka_lang', lang);
    document.documentElement.lang = lang;
  }, [lang]);

  const t = I18N[lang] || I18N.te;

  return (
    <ClickSpark sparkColor="#f59e0b" sparkSize={8} sparkCount={8} duration={450}>
      <div className={`app-root lang-${lang}`}>
        <Routes>
          <Route path="/" element={<MainPage lang={lang} setLang={setLang} t={t} />} />
          <Route 
            path="/admin/*" 
            element={
              <RouteErrorBoundary>
                <Suspense fallback={<div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0f172a', color: '#f59e0b', fontSize: '1.25rem', fontFamily: 'sans-serif' }}>Loading Admin Portal...</div>}>
                  <AdminPanel />
                </Suspense>
              </RouteErrorBoundary>
            } 
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </ClickSpark>
  );
}

export default App;
