import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Award, Sun, IndianRupee, ArrowDownCircle, ShieldCheck, Zap, TrendingUp } from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';
import { QuickQuoteCard } from './QuickQuoteCard';
import { EnergyFlowVisualizer } from './EnergyFlowVisualizer';
import { getWhatsAppUrl } from '../data/dealers';
import { scrollToSection } from '../utils/navigation';

export const Hero = ({ lang, t }) => {
  const [activeHeroTab, setActiveHeroTab] = useState('quote'); // 'quote' | 'simulator'

  return (
    <section className="hero-section" id="home">
      {/* Background Image & Radiant Ambient Glow */}
      <div className="hero-background-wrapper">
        <img 
          src="/assets/hero_solar.jpg" 
          alt="Modern Rooftop Solar Installation" 
          className="hero-background-img"
          loading="eager"
          decoding="async"
        />
        <div className="hero-overlay"></div>
        <div className="hero-ambient-glow"></div>
        <div className="hero-sun-sphere"></div>
      </div>

      <div className="container hero-content-wrapper">
        {/* Left Column: Hero Copy & Value Props */}
        <div className="hero-text-content">
          {/* Brand Intro & ISO Badge */}
          <div className="hero-badges-wrapper">
            <div className="hero-badge-card hero-brand-intro">
              <div className="hero-badge-icon-wrap hero-brand-logo-wrap">
                <img 
                  src="/assets/aquapzone_logo.jpg" 
                  alt="AquaPzone Enterprises Logo" 
                  className="hero-aquapzone-logo" 
                  onError={(e) => { e.target.style.display = 'none'; }}
                />
              </div>
              <div className="hero-badge-text hero-brand-text">
                <span className="hero-firm-title">{t.firmTitle}</span>
                <span className="hero-firm-subtitle">{t.firmSubtitle}</span>
              </div>
            </div>

            <div className="hero-badge-card hero-badge-pill">
              <div className="hero-badge-icon-wrap hero-award-icon-wrap">
                <Award size={18} className="text-gold" />
              </div>
              <span className="hero-badge-single-line">{t.heroBadge}</span>
            </div>
          </div>

          {/* Main Headline */}
          <h1 
            className="hero-title"
            dangerouslySetInnerHTML={{ __html: t.heroTitle }}
          />

          {/* Lead Text */}
          <p className="hero-lead-text">
            {t.heroLead}
          </p>

          {/* PM Surya Ghar Subsidy Callout Box */}
          <div className="hero-subsidy-highlight-card">
            <div className="subsidy-coin-icon pm-modi-avatar-wrap">
              <img 
                src="/assets/pm_modi.jpg" 
                alt="PM Narendra Modi" 
                className="pm-modi-avatar-img"
              />
            </div>
            <div className="subsidy-card-text">
              <h4>{t.subsidyCardTitle}</h4>
              <p>{t.subsidyCardDesc}</p>
            </div>
          </div>

          {/* Hero Action Buttons */}
          <div className="hero-cta-buttons">
            <a 
              href="#calculator" 
              onClick={(e) => scrollToSection('calculator', e)} 
              className="btn btn-primary btn-lg btn-glow"
            >
              <TrendingUp size={20} />
              <span>{t.btnCalcSubsidy}</span>
            </a>
            <a 
              href={getWhatsAppUrl('sudhakar', 'Hello Prasudharka Solar team, I want to inquire about rooftop solar subsidy and installation.')} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn btn-whatsapp btn-lg"
            >
              <WhatsAppIcon size={20} />
              <span>{t.btnWhatsAppNow}</span>
            </a>
          </div>

          {/* Trust Metrics */}
          <div className="hero-trust-metrics">
            <div className="metric-item">
              <div className="metric-icon-wrap">
                <ShieldCheck size={20} className="text-emerald-400" />
              </div>
              <div>
                <h3>{t.statMetric1}</h3>
                <p>{t.statLabel1}</p>
              </div>
            </div>
            <div className="metric-item">
              <div className="metric-icon-wrap">
                <IndianRupee size={20} className="text-amber-400" />
              </div>
              <div>
                <h3>{t.statMetric2}</h3>
                <p>{t.statLabel2}</p>
              </div>
            </div>
            <div className="metric-item">
              <div className="metric-icon-wrap">
                <Zap size={20} className="text-cyan-400" />
              </div>
              <div>
                <h3>{t.statMetric3}</h3>
                <p>{t.statLabel3}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Widget (Quote / Energy Flow) */}
        <div className="hero-interactive-column">
          <div className="hero-widget-switcher">
            <button 
              className={`widget-tab-btn ${activeHeroTab === 'quote' ? 'active' : ''}`}
              onClick={() => setActiveHeroTab('quote')}
            >
              <span>{t.quickCardTitle}</span>
            </button>
            <button 
              className={`widget-tab-btn ${activeHeroTab === 'simulator' ? 'active' : ''}`}
              onClick={() => setActiveHeroTab('simulator')}
            >
              <Zap size={15} />
              <span>{lang === 'te' ? 'లైవ్ ఎనర్జీ సిమ్యులేటర్' : 'Energy Simulator'}</span>
            </button>
          </div>

          {activeHeroTab === 'quote' ? (
            <QuickQuoteCard lang={lang} t={t} />
          ) : (
            <EnergyFlowVisualizer lang={lang} t={t} />
          )}
        </div>
      </div>
    </section>
  );
};
