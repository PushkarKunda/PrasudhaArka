import React, { useState } from 'react';
import { PRODUCTS } from '../data/products';
import { DEALERS, getWhatsAppUrl } from '../data/dealers';

export const SystemPricing = ({ lang, t }) => {
  const [selectedDealer, setSelectedDealer] = useState('sudhakar');

  const handleQuoteClick = (product) => {
    const dealerInfo = DEALERS[selectedDealer] || DEALERS.sudhakar;
    const isTe = lang === 'te';

    let msg = '';
    if (isTe) {
      msg = `*నమస్కారం! ప్రసుధార్క సోలార్ - ${product.capacity} కొటేషన్ విచారణ*\n` +
        `------------------------------------\n` +
        `• *సామర్థ్యం:* ${product.capacity}\n` +
        `• *ప్రభుత్వ సబ్సిడీ:* ${product.subsidy}\n` +
        (product.unitCost ? `• *సిస్టమ్ ఖర్చు (DCR):* ${product.unitCost}\n` : '') +
        (product.maxLoan ? `• *బ్యాంక్ లోన్:* ${product.maxLoan}\n` : '') +
        (product.estEmi ? `• *అంచనా EMI:* ${product.estEmi}\n` : '') +
        `• *రోజువారీ విద్యుత్:* ${product.dailyGen}\n` +
        `• *అవసరమైన స్థలం:* ${product.spaceReq}\n` +
        `------------------------------------\n` +
        `నమస్తే ${dealerInfo.name} గారు, దయచేసి ${product.capacity} కొటేషన్ మరియు సైట్ సర్వే వివరాలు పంపగలరు.`;
    } else {
      msg = `*Hello! Prasudharka Solar Rooftop Inquiry: ${product.capacity}*\n` +
        `------------------------------------\n` +
        `• *Capacity:* ${product.capacity}\n` +
        `• *Govt Subsidy:* ${product.subsidy}\n` +
        (product.unitCost ? `• *Unit Cost (DCR):* ${product.unitCost}\n` : '') +
        (product.maxLoan ? `• *Max Loan:* ${product.maxLoan}\n` : '') +
        (product.estEmi ? `• *Est. EMI:* ${product.estEmi}\n` : '') +
        `• *Power Gen.:* ${product.dailyGen}\n` +
        `• *Space Req.:* ${product.spaceReq}\n` +
        `------------------------------------\n` +
        `Hello ${dealerInfo.name}, please share formal quotation and schedule a rooftop survey for the ${product.capacity}.`;
    }

    window.open(getWhatsAppUrl(selectedDealer, msg), '_blank');
  };

  return (
    <section className="pricing-section section-padding" id="pricing">
      <div className="container">
        {/* Section Header */}
        <div className="section-title-wrap text-center">
          <div className="config-tag-pill">
            <span>{lang === 'te' ? 'సిస్టమ్ కాన్ఫిగరేషన్లు' : 'SYSTEM CONFIGURATIONS'}</span>
          </div>
          <h2 className="section-title">{lang === 'te' ? 'సిస్టమ్ కాన్ఫిగరేషన్లు & ధరలు' : 'System Configurations'}</h2>
          <p className="section-subtitle">
            {lang === 'te' 
              ? 'ప్రభుత్వ సబ్సిడీ, సిస్టమ్ ఖర్చు, లోన్ మరియు విద్యుత్ ఉత్పత్తి వివరాలు.' 
              : 'Comprehensive pricing, subsidies, and power generation details by capacity.'}
          </p>

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

        {/* 4 Cards Grid */}
        <div className="pricing-grid-4">
          {PRODUCTS.map((prod) => (
            <div
              key={prod.id}
              className={`system-config-card ${prod.isPopular ? 'popular-config-card' : ''}`}
            >
              {prod.isPopular && (
                <div className="popular-top-badge">
                  <span>{prod.popularBadge || '⭐ MOST POPULAR (MAX SUBSIDY)'}</span>
                </div>
              )}

              <div className="config-card-content">
                {/* Title */}
                <h3 className="config-card-title">{prod.capacity}</h3>

                {/* Govt Subsidy Box */}
                <div className={`subsidy-highlight-box ${prod.badgeVariant === 'gold' ? 'gold-box' : 'green-box'}`}>
                  <span className="subsidy-box-label">GOVT SUBSIDY</span>
                  <span className="subsidy-box-amount">{prod.subsidy}</span>
                </div>

                {/* Specs Rows */}
                <div className="config-specs-rows">
                  {prod.unitCost && (
                    <div className="spec-row highlight-blue-box">
                      <span className="spec-label">Unit Cost (DCR)</span>
                      <span className="spec-value">{prod.unitCost}</span>
                    </div>
                  )}

                  {prod.maxLoan && (
                    <div className="spec-row">
                      <span className="spec-label">Max Loan</span>
                      <span className="spec-value">{prod.maxLoan}</span>
                    </div>
                  )}

                  {prod.estEmi && (
                    <div className="spec-row highlight-green-box">
                      <span className="spec-label">Est. EMI</span>
                      <span className="spec-value emi-val">{prod.estEmi}</span>
                    </div>
                  )}

                  <div className="spec-row">
                    <span className="spec-label">Power Gen.</span>
                    <span className="spec-value">{prod.dailyGen}</span>
                  </div>

                  <div className="spec-row">
                    <span className="spec-label">Space Req.</span>
                    <span className="spec-value">{prod.spaceReq}</span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={() => handleQuoteClick(prod)}
                className="config-quote-btn"
              >
                Get {prod.capacityShort} Quote
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
