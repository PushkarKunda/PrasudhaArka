import React from 'react';
import { ShieldCheck, Award, Zap, Layers, FileText, MapPin, BadgePercent, CheckCircle2 } from 'lucide-react';

export const BrandShowcase = ({ lang, t }) => {
  const isTe = lang === 'te';

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

        {/* 5 Hardware Brand Cards Grid */}
        <div className="premium-brands-grid-5">
          {brandItems.map((item, idx) => (
            <div key={idx} className="brand-spec-card">
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
          ))}
        </div>
      </div>
    </section>
  );
};
