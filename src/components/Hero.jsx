import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Award, Sun, ArrowDownCircle, ShieldCheck, Zap, TrendingUp } from 'lucide-react';
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

      <div className="container hero-container">
        {/* Left Column: Core Value Proposition */}
        <div className="hero-content">
          {/* Top Trust Badge */}
          <div className="hero-badge">
            <Award size={16} className="text-gold" />
            <span>{t.badgeIso}</span>
          </div>

          {/* Main Headline */}
          <h1 className="hero-title">
            {lang === 'te' ? (
              <>
                సూర్యుని శక్తితో <span className="text-gradient">ఉచిత కరెంట్</span> పొందండి!
              </>
            ) : (
              <>
                Power Your Home With <span className="text-gradient">Free Solar Energy</span>
              </>
            )}
          </h1>

          {/* Subtitle */}
          <p className="hero-subtitle">{t.heroSub}</p>

          {/* PM Surya Ghar Subsidy Callout Box */}
          <div className="hero-subsidy-highlight-card">
            <div className="subsidy-coin-icon">
              <Sun size={28} className="text-amber-400" />
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
                <Sun size={20} className="text-amber-400" />
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
