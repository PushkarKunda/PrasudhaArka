import { useState } from 'react';
import { Award, IndianRupee, ShieldCheck, Zap, TrendingUp } from 'lucide-react';
import { WhatsAppIcon } from '../../common/WhatsAppIcon';
import { QuickQuoteCard } from '../../common/QuickQuoteCard';
import { EnergyFlowVisualizer } from '../../common/EnergyFlowVisualizer';
import { SpotlightCard, ShinyText, CountUp, Magnet, Squares } from '../../reactbits';
import { getWhatsAppUrl } from '../../../data/dealers';
import { scrollToSection } from '../../../utils/navigation';
import './Hero.css';

export const Hero = ({ lang, t }) => {
  const [activeHeroTab, setActiveHeroTab] = useState('quote'); // 'quote' | 'simulator'

  return (
    <section className="hero-section" id="home">
      {/* Background Image & Radiant Ambient Glow & React Bits Squares Grid */}
      <div className="hero-background-wrapper">
        <Squares 
          direction="diagonal" 
          speed={0.3} 
          squareSize={48} 
          borderColor="rgba(245, 158, 11, 0.07)" 
          hoverFillColor="rgba(245, 158, 11, 0.16)" 
        />
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
            <div className="hero-brand-intro">
              <div className="hero-brand-logo-wrap">
                <img 
                  src="/assets/aquapzone_logo.jpg" 
                  alt="AquaPzone Enterprises Logo" 
                  className="hero-aquapzone-logo" 
                  onError={(e) => { e.target.style.display = 'none'; }}
                />
              </div>
              <div className="hero-brand-text">
                <span className="hero-firm-title">{t.firmTitle}</span>
                <span className="hero-firm-subtitle">{t.firmSubtitle}</span>
              </div>
            </div>

            <div className="hero-iso-plain-text">
              <Award size={16} className="iso-icon" />
              <ShinyText text={t.heroBadge} speed={3.5} variant="gold" />
            </div>
          </div>

          {/* Welcome Tag */}
          {t.heroWelcomeTag && (
            <p className="hero-welcome-tag">{t.heroWelcomeTag}</p>
          )}

          <h1 className="hero-title">
            <span className="hero-title-prefix">
              {lang === 'te' ? '' : 'By '}
              <span style={{ whiteSpace: 'nowrap' }}>
                <img 
                  src={lang === 'te' ? '/assets/pra_te_v5.png' : '/assets/pra_en_v5.png'} 
                  alt="PraSudhaArka" 
                  className={`hero-inline-logo ${lang === 'te' ? 'logo-te' : 'logo-en'}`}
                />
                {lang === 'te' ? ' ద్వారా, ' : ', '}
              </span>
            </span>
            <span dangerouslySetInnerHTML={{ __html: t.heroTitle }} />
          </h1>

          {/* Lead Text */}
          <p
            className="hero-lead-text"
            dangerouslySetInnerHTML={{ __html: t.heroLead }}
          />

          {/* Hero Value Pills */}
          {t.heroPill1 && (
            <div className="hero-pills">
              <span className="hero-pill">{t.heroPill1}</span>
              <span className="hero-pill">{t.heroPill2}</span>
              <span className="hero-pill">{t.heroPill3}</span>
            </div>
          )}

          {/* PM Surya Ghar Subsidy Callout Box with SpotlightCard */}
          <SpotlightCard 
            className="hero-subsidy-highlight-card"
            spotlightColor="rgba(245, 158, 11, 0.2)"
            size={280}
          >
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
          </SpotlightCard>

          {/* Hero Action Buttons with Magnet Micro-interaction */}
          <div className="hero-cta-buttons">
            <Magnet magnetStrength={0.25} padding={15}>
              <a 
                href="#calculator" 
                onClick={(e) => scrollToSection('calculator', e)} 
                className="btn btn-primary btn-lg btn-glow"
              >
                <TrendingUp size={20} />
                <span>{t.btnCalcSubsidy}</span>
              </a>
            </Magnet>
            <Magnet magnetStrength={0.25} padding={15}>
              <a 
                href={getWhatsAppUrl('sudhakar', 'Hello Prasudharka Solar team, I want to inquire about rooftop solar subsidy and installation.')} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn btn-whatsapp btn-lg"
              >
                <WhatsAppIcon size={20} />
                <span>{t.btnWhatsAppNow}</span>
              </a>
            </Magnet>
          </div>

          {/* Trust Metrics with CountUp */}
          <div className="hero-trust-metrics">
            <div className="metric-item">
              <div className="metric-icon-wrap">
                <ShieldCheck size={20} className="text-emerald-400" />
              </div>
              <div>
                <h3><CountUp value={t.statMetric1} /></h3>
                <p>{t.statLabel1}</p>
              </div>
            </div>
            <div className="metric-item">
              <div className="metric-icon-wrap">
                <IndianRupee size={20} className="text-amber-400" />
              </div>
              <div>
                <h3><CountUp value={t.statMetric2} /></h3>
                <p>{t.statLabel2}</p>
              </div>
            </div>
            <div className="metric-item">
              <div className="metric-icon-wrap">
                <Zap size={20} className="text-cyan-400" />
              </div>
              <div>
                <h3><CountUp value={t.statMetric3} /></h3>
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

export default Hero;
