import React, { useState, useEffect, useRef } from 'react';
import { ShieldCheck, Award, Zap, Layers, FileText, MapPin, BadgePercent, CheckCircle2, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';

export const BrandShowcase = ({ lang, t }) => {
  const isTe = lang === 'te';
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(5);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const brandItems = [
    {
      num: '01',
      brandBadge: 'PANASONIC',
      title: isTe ? 'సోలార్ ప్యానెల్స్: Panasonic' : 'Solar Panels: Panasonic',
      desc: isTe ? '35mm మందం, 30-ఏళ్ల జీవితకాలం. 25 ఏళ్ల వారంటీ.' : '35mm thick, 30-year lifespan. 25 Years Warranty.',
      warranty: isTe ? '25 ఏళ్ల వారంటీ' : '25 Years Warranty',
      variant: 'green'
    },
    {
      num: '02',
      brandBadge: 'PANASONIC',
      title: isTe ? 'ఇన్వర్టర్: Panasonic' : 'Inverter: Panasonic',
      desc: isTe ? 'అత్యాధునిక RF టెక్నాలజీ. 10 ఏళ్ల వారంటీ.' : 'Advanced RF technology. 10 Years Warranty.',
      warranty: isTe ? '10 ఏళ్ల వారంటీ' : '10 Years Warranty',
      variant: 'green'
    },
    {
      num: '03',
      brandBadge: 'HAVELLS',
      title: isTe ? 'ACDB & DCDB: Havells' : 'ACDB & DCDB: Havells',
      desc: isTe ? 'నమ్మకమైన MCBలు మరియు సర్జ్ ప్రొటెక్షన్.' : 'Equipped with reliable MCBs.',
      warranty: isTe ? 'Reliable MCB Protection' : 'Reliable MCB Protection',
      variant: 'blue'
    },
    {
      num: '04',
      brandBadge: 'POLYCAB',
      title: isTe ? 'కేబుల్స్: Polycab' : 'Cables: Polycab',
      desc: isTe ? '4 sq mm హెవీ-డ్యూటీ కాపర్ కేబుల్స్.' : '4 sq mm high-quality cables.',
      warranty: isTe ? '4 sq mm Heavy-Duty' : '4 sq mm Heavy-Duty',
      variant: 'blue'
    },
    {
      num: '05',
      brandBadge: 'JSW',
      title: isTe ? 'మౌంటింగ్ స్ట్రక్చర్: JSW' : 'Structure: JSW',
      desc: isTe ? 'GI హాట్ డిప్డ్, 160 km/h గాలి వేగాన్ని తట్టుకుంటుంది. 35 ఏళ్ల జీవితకాలం.' : 'GI Hot Dipped, 160 km/h wind resistance. 35-year lifespan.',
      warranty: isTe ? '35-Year Lifespan' : '35-Year Lifespan',
      variant: 'green'
    }
  ];

  // Determine responsive items per view
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setItemsPerView(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerView(2);
      } else {
        setItemsPerView(5);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxIndex = Math.max(0, brandItems.length - itemsPerView);

  // Keep index within bounds on resize
  useEffect(() => {
    if (currentIndex > maxIndex) {
      setCurrentIndex(maxIndex);
    }
  }, [maxIndex, currentIndex]);

  // Gentle auto-slide when on mobile/tablet (maxIndex > 0)
  useEffect(() => {
    if (isPaused || maxIndex === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev >= maxIndex ? 0 : prev + 1));
    }, 5500);
    return () => clearInterval(interval);
  }, [isPaused, maxIndex]);

  const nextSlide = () => {
    setCurrentIndex(prev => (prev >= maxIndex ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex(prev => (prev <= 0 ? maxIndex : prev - 1));
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const diff = touchStartX.current - touchEndX.current;
    if (diff > 45) {
      nextSlide();
    } else if (diff < -45) {
      prevSlide();
    }
    touchStartX.current = 0;
    touchEndX.current = 0;
  };

  const gapPx = 16;

  return (
    <section className="about-brand-section section-padding" id="about">
      <div className="container">
        {/* Top Feature Card: About aquaPzone enterprises */}
        <div className="about-company-card">
          <div className="about-card-header">
            <div className="company-logo-container">
              <img 
                src="/assets/aquapzone_logo.jpg" 
                alt="Aqua Pzone Logo" 
                className="about-aquapzone-logo"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'inline-flex';
                }}
              />
              <span className="fallback-logo-text" style={{ display: 'none' }}>AQUA PZONE</span>
            </div>
            <span className="approved-vendor-badge">
              {isTe ? 'APPROVED PM SURYA GHAR VENDOR' : 'APPROVED PM SURYA GHAR VENDOR'}
            </span>
          </div>

          <h2 className="about-company-title">
            {isTe ? 'About aquaPzone enterprises (ఆక్వా పిజోన్ ఎంటర్‌ప్రైజెస్)' : 'About aquaPzone enterprises'}
          </h2>

          <p className="about-company-desc">
            {isTe 
              ? 'PM సూర్య ఘర్ పోర్టల్‌లో అధికారిక ఆమోదం పొందిన వెండర్‌గా, ఆంధ్రప్రదేశ్, తెలంగాణ, బెంగళూరు మరియు చెన్నై అంతటా మాకు 21+ సంవత్సరాల ఇంజనీరింగ్ అనుభవం ఉంది. మేము నాణ్యమైన పరికరాలు, జీరో లోపాలు మరియు ప్రొఫెషనల్ ఇన్‌స్టాలేషన్‌ను అందిస్తాము. రిజిస్ట్రేషన్ మరియు డాక్యుమెంటేషన్ నుండి నెట్ మీటరింగ్ మరియు PPA ఒప్పందాల వరకు మా సర్వీస్ బృందం పూర్తి బాధ్యత తీసుకుంటుంది.'
              : 'Listed as an approved vendor in the PM Surya Ghar Portal, we have over 21 years of experience across AP, Telangana, Bangalore, & Chennai. We ensure high-quality materials, zero defects, and professional installation. Our service team handles everything from registration and documentation to net metering and PPA agreements.'}
          </p>

          {/* 4 Feature Badges in 1 Row */}
          <div className="about-pillars-grid">
            <div className="pillar-badge-item">
              <span className="pillar-icon">🛡️</span>
              <span>{isTe ? 'సున్నా అడ్వాన్స్ పేమెంట్' : 'Zero Advance Payment'}</span>
            </div>
            <div className="pillar-badge-item">
              <span className="pillar-icon">💰</span>
              <span>{isTe ? 'అత్యుత్తమ ధరలు' : 'Best Pricing'}</span>
            </div>
            <div className="pillar-badge-item">
              <span className="pillar-icon">📍</span>
              <span>{isTe ? 'విస్తృత డీలర్లు' : 'Widespread Dealers'}</span>
            </div>
            <div className="pillar-badge-item">
              <span className="pillar-icon">📑</span>
              <span>{isTe ? 'పూర్తి డాక్యుమెంటేషన్' : 'Complete Documentation'}</span>
            </div>
          </div>
        </div>

        {/* Bottom Section: Premium Brands & Warranty */}
        <div className="premium-brands-header text-center">
          <h2 className="premium-brands-title">
            {isTe ? 'ప్రీమియం బ్రాండ్లు & వారంటీ' : 'Premium Brands & Warranty'}
          </h2>
          <p className="premium-brands-sub">
            {isTe 
              ? 'దశాబ్దాల పాటు నిలిచే అత్యున్నత శ్రేణి (Tier-1) సోలార్ ఇంజనీరింగ్ పరికరాలు.'
              : 'Built with industry-leading Tier-1 solar engineering components guaranteed to last for decades.'}
          </p>
        </div>

        {/* Responsive Carousel for Premium Brands */}
        <div
          className="brands-carousel-container"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={(e) => { setIsPaused(true); handleTouchStart(e); }}
          onTouchMove={handleTouchMove}
          onTouchEnd={() => { setIsPaused(false); handleTouchEnd(); }}
        >
          {/* Top Bar for Mobile/Tablet */}
          {maxIndex > 0 && (
            <div className="carousel-top-bar brands-carousel-top-bar">
              <div className="carousel-status-badge">
                <Sparkles size={14} className="text-gold" />
                <span>
                  {itemsPerView === 1
                    ? `${brandItems[currentIndex].num} / 05: ${brandItems[currentIndex].brandBadge}`
                    : (isTe
                        ? `${currentIndex + 1} - ${Math.min(currentIndex + itemsPerView, brandItems.length)} / 5 బ్రాండ్లు`
                        : `Showing ${currentIndex + 1} - ${Math.min(currentIndex + itemsPerView, brandItems.length)} of 5 Brands`)}
                </span>
              </div>

              <div className="carousel-nav-arrows">
                <button 
                  onClick={prevSlide}
                  className="carousel-arrow-btn"
                  aria-label="Previous brand"
                  title="Previous"
                >
                  <ChevronLeft size={20} />
                </button>
                <button 
                  onClick={nextSlide}
                  className="carousel-arrow-btn"
                  aria-label="Next brand"
                  title="Next"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
          )}

          {/* Carousel Viewport / Track */}
          <div className="brands-carousel-viewport">
            <div 
              className="brands-carousel-track"
              style={{
                transform: `translateX(calc(-${currentIndex} * ((100% + ${gapPx}px) / ${itemsPerView})))`
              }}
            >
              {brandItems.map((item, idx) => (
                <div
                  key={idx}
                  className="brands-carousel-slide"
                  style={{
                    flex: `0 0 calc((100% - ${(itemsPerView - 1) * gapPx}px) / ${itemsPerView})`
                  }}
                >
                  <div className="brand-spec-card">
                    <div className="brand-card-top-row">
                      <span className="brand-card-num">{item.num}</span>
                      <span className="brand-chip-dark">{item.brandBadge}</span>
                    </div>

                    <h4 className="brand-card-title">{item.title}</h4>
                    <p className="brand-card-desc">{item.desc}</p>

                    <div className={`brand-card-warranty-pill ${item.variant === 'blue' ? 'blue-pill' : 'green-pill'}`}>
                      {item.warranty}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Pagination Dots */}
          {maxIndex > 0 && (
            <div className="carousel-dots-wrap">
              {Array.from({ length: maxIndex + 1 }).map((_, dotIdx) => (
                <button
                  key={dotIdx}
                  className={`carousel-dot ${currentIndex === dotIdx ? 'active' : ''}`}
                  onClick={() => setCurrentIndex(dotIdx)}
                  aria-label={`Go to brand ${dotIdx + 1}`}
                  title={`Brand ${dotIdx + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
