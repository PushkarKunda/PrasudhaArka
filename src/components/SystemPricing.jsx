import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, CheckCircle, Zap, Shield, MessageCircle } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { DEALERS, getWhatsAppUrl } from '../data/dealers';

export const SystemPricing = ({ lang, t }) => {
  const [selectedDealer, setSelectedDealer] = useState('sudhakar');

  const handleQuoteClick = (product) => {
    const msg = `*PM Surya Ghar Solar Quotation Inquiry: ${product.capacity} Package*\n` +
      `------------------------------------\n` +
      `• *Capacity:* ${product.capacity}\n` +
      `• *Estimated Gross Cost:* ${product.grossCost}\n` +
      `• *Govt Subsidy:* ${product.subsidy}\n` +
      `• *Net Cost:* ${product.netCost}\n` +
      `• *Estimated EMI:* ${product.estEmi}\n` +
      `• *Daily Generation:* ${product.dailyGen}\n` +
      `• *Space Requirement:* ${product.spaceReq}\n` +
      `------------------------------------\n` +
      `Hello ${DEALERS[selectedDealer].name}, please share the detailed quotation and installation schedule for the ${product.capacity} system.`;

    window.open(getWhatsAppUrl(selectedDealer, msg), '_blank');
  };

  return (
    <section className="pricing-section section-padding" id="pricing">
      <div className="container">
        {/* Section Header */}
        <div className="section-title-wrap text-center">
          <div className="section-tag">
            <Sparkles size={15} />
            <span>{t.pricingTag}</span>
          </div>
          <h2 className="section-title">{t.pricingTitle}</h2>
          <p className="section-subtitle">{t.pricingDesc}</p>

          {/* Quick Dealer Picker */}
          <div className="pricing-dealer-select">
            <span className="dealer-label">{lang === 'te' ? 'కొటేషన్ పంపాల్సిన డీలర్:' : 'Direct Quotes To:'}</span>
            <div className="pill-toggle-wrap">
              <button 
                className={`pill-toggle-btn ${selectedDealer === 'sudhakar' ? 'active' : ''}`}
                onClick={() => setSelectedDealer('sudhakar')}
              >
                K. Sudhakar (HYD)
              </button>
              <button 
                className={`pill-toggle-btn ${selectedDealer === 'bhaskar' ? 'active' : ''}`}
                onClick={() => setSelectedDealer('bhaskar')}
              >
                K. Bhaskar (JMD/AP)
              </button>
            </div>
          </div>
        </div>

        {/* 4 Cards in 1 Row Grid */}
        <div className="pricing-grid-4">
          {PRODUCTS.map((prod, idx) => (
            <div
              key={prod.id}
              className={`pricing-card glassmorphism-card ${prod.isPopular ? 'popular-card' : ''}`}
            >
              {prod.isPopular && (
                <div className="popular-badge">
                  <Sparkles size={13} />
                  <span>{t.badgeMostPopular}</span>
                </div>
              )}

              {prod.maxSubsidyBadge && !prod.isPopular && (
                <div className="subsidy-badge-pill">
                  <span>{t.badgeMaxSubsidy}</span>
                </div>
              )}

              <div className="card-top">
                <div className="capacity-tag">
                  <Zap size={20} className="text-gold" />
                  <h3>{prod.capacity}</h3>
                </div>
                <p className="ideal-for">
                  {lang === 'te' ? prod.idealForTe : prod.idealForEn}
                </p>
              </div>

              {/* Price Breakdown */}
              <div className="pricing-breakdown">
                <div className="price-row">
                  <span className="p-label">{t.lblGrossCost}</span>
                  <span className="p-val font-semibold">{prod.grossCost}</span>
                </div>
                <div className="price-row subsidy-row">
                  <span className="p-label text-emerald-400 font-medium">{t.lblGovSubsidy}</span>
                  <span className="p-val text-emerald-400 font-bold">{prod.subsidy}</span>
                </div>
                <div className="price-row net-row">
                  <span className="p-label font-bold text-main">{t.lblNetCost}</span>
                  <span className="p-val text-gold font-extrabold text-lg">{prod.netCost}</span>
                </div>
                <div className="price-row emi-row">
                  <span className="p-label">{t.lblEstEmi}</span>
                  <span className="p-val text-cyan-400 font-bold">{prod.estEmi}</span>
                </div>
              </div>

              {/* Technical Specifications */}
              <ul className="tier-specs-list">
                <li>
                  <CheckCircle size={15} className="text-emerald-400 flex-shrink-0" />
                  <span><strong>{t.lblDailyGen}</strong> {prod.dailyGen}</span>
                </li>
                <li>
                  <CheckCircle size={15} className="text-emerald-400 flex-shrink-0" />
                  <span><strong>{t.lblSpaceReq}</strong> {prod.spaceReq}</span>
                </li>
                <li>
                  <CheckCircle size={15} className="text-emerald-400 flex-shrink-0" />
                  <span><strong>Panels:</strong> {prod.panelType}</span>
                </li>
                <li>
                  <CheckCircle size={15} className="text-emerald-400 flex-shrink-0" />
                  <span><strong>Inverter:</strong> {prod.inverter}</span>
                </li>
              </ul>

              {/* CTA Button */}
              <button
                onClick={() => handleQuoteClick(prod)}
                className={`btn btn-block ${prod.isPopular ? 'btn-primary btn-glow' : 'btn-outline'}`}
              >
                <MessageCircle size={16} />
                <span>{t.btnGetQuoteTier}</span>
              </button>
            </div>
          ))}
        </div>

        {/* Bank Loan Note */}
        <div className="bank-loan-infobox glassmorphism-card">
          <Shield size={26} className="text-gold flex-shrink-0" />
          <div className="infobox-text">
            <h4>{lang === 'te' ? 'బ్యాంక్ లోన్ & ROI సమాచారం' : 'Bank Loan & Return on Investment (ROI) Details'}</h4>
            <p>
              {lang === 'te' 
                ? 'గమనిక: అన్ని జాతీయ ప్రభుత్వ బ్యాంకుల్లో 10 సంవత్సరాల కాలపరిమితితో లోన్ సదుపాయం కలదు. 3kW లోపు వడ్డీ రేటు సుమారు 6.7% మాత్రమే. సిస్టమ్ ROI 3 నుండి 4 సంవత్సరాలలోనే పూర్తవుతుంది. ఆ తర్వాత 20+ సంవత్సరాల పాటు ఉచిత విద్యుత్!' 
                : 'Note: Collateral-free solar loan facility is available across leading nationalized banks with 10-year tenure at approx 6.7% interest. Full system payback is achieved in 3 to 4 years, followed by 20+ years of free power!'}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
