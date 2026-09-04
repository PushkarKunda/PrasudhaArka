import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, MapPin, IndianRupee, Home, Building2, CheckCircle2 } from 'lucide-react';
import { WhatsAppIcon } from '../WhatsAppIcon';
import { DEALERS, getWhatsAppUrl } from '../../../data/dealers';
import { calculateSolarSpecs } from '../../../data/tariffs';
import './QuickQuoteCard.css';

export const QuickQuoteCard = ({ lang, t }) => {
  const [bill, setBill] = useState(3000);
  const [location, setLocation] = useState('');
  const [propType, setPropType] = useState('residential');
  const [dealer, setDealer] = useState('sudhakar');

  const specs = calculateSolarSpecs({
    billAmount: bill,
    calcMode: 'bill',
    propType,
    panelType: 'dcr'
  });

  const handleRedirectToInquiry = (e) => {
    e.preventDefault();

    // Map recommended kW to category select options in contact form
    const recKw = specs.recommendedKW || 3;
    const mappedCap = recKw >= 5 ? '5kW' : recKw >= 3 ? '3kW' : recKw >= 2 ? '2kW' : '1kW';

    // Dispatch event to pre-populate contact inquiry form
    window.dispatchEvent(new CustomEvent('prefillInquiryForm', {
      detail: {
        town: location || '',
        capacity: mappedCap,
        dealer: dealer || 'sudhakar'
      }
    }));

    // Smoothly scroll down to the last inquiry form
    const targetElement = document.getElementById('inquiry-form') || document.getElementById('contact');
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      setTimeout(() => {
        const nameInput = targetElement.querySelector('input[type="text"]');
        if (nameInput) {
          nameInput.focus();
        }
      }, 500);
    }
  };

  return (
    <div className="quick-quote-card glassmorphism-card-glow">
      <div className="card-header-badge">
        <Sparkles size={16} className="text-gold" />
        <span>{t.quickCardTitle}</span>
      </div>
      <p className="card-sub-desc">{t.quickCardSub}</p>

      <form onSubmit={handleRedirectToInquiry} className="quick-form">
        {/* Bill input */}
        <div className="form-group">
          <label className="form-label" htmlFor="quick-bill-input">
            <IndianRupee size={15} />
            <span>{t.lblMonthlyBill}</span>
          </label>
          <div className="range-with-input">
            <input 
              type="range" 
              min="800" 
              max="25000" 
              step="100" 
              value={Math.min(25000, Math.max(800, Number(bill) || 800))}
              onChange={(e) => setBill(Number(e.target.value))}
              className="custom-range"
              aria-label="Monthly Power Bill Slider"
            />
            <div className="bill-input-badge">
              <span className="bill-currency-symbol">₹</span>
              <input
                id="quick-bill-input"
                type="number"
                min="500"
                max="500000"
                step="100"
                value={bill === '' ? '' : bill}
                onChange={(e) => {
                  const val = e.target.value;
                  if (val === '') {
                    setBill('');
                  } else {
                    const num = parseInt(val, 10);
                    setBill(isNaN(num) ? '' : num);
                  }
                }}
                onBlur={() => {
                  if (bill === '' || Number(bill) < 100) {
                    setBill(3000);
                  }
                }}
                className="bill-number-input"
                placeholder="3000"
                aria-label="Enter Monthly Power Bill in Rupees"
              />
            </div>
          </div>
        </div>

        {/* Location input */}
        <div className="form-group">
          <label className="form-label">
            <MapPin size={15} />
            <span>{t.lblLocation}</span>
          </label>
          <input 
            type="text" 
            placeholder={lang === 'te' ? 'ఉదా: జమ్మలమడుగు, కడప, హైదరాబాద్, తుక్కుగూడ...' : 'e.g. Jammalamadugu, Kadapa, Hyderabad...'}
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="custom-input"
            required
          />
        </div>

        {/* Property Type Toggle */}
        <div className="form-group">
          <label className="form-label">
            <span>{t.lblPropType}</span>
          </label>
          <div className="prop-toggle-group">
            <button
              type="button"
              className={`prop-btn ${propType === 'residential' ? 'active' : ''}`}
              onClick={() => setPropType('residential')}
            >
              <Home size={15} />
              <span>{t.optRes}</span>
            </button>
            <button
              type="button"
              className={`prop-btn ${propType === 'commercial' ? 'active' : ''}`}
              onClick={() => setPropType('commercial')}
            >
              <Building2 size={15} />
              <span>{t.optComm}</span>
            </button>
          </div>
        </div>

        {/* Dealer Selection */}
        <div className="form-group">
          <label className="form-label">
            <span>{lang === 'te' ? 'డీలర్ ఎంపిక (Dealer):' : 'Select Nearest Dealer:'}</span>
          </label>
          <div className="dealer-radio-group">
            <label className={`dealer-chip ${dealer === 'sudhakar' ? 'active' : ''}`}>
              <input 
                type="radio" 
                name="quickDealer" 
                checked={dealer === 'sudhakar'} 
                onChange={() => setDealer('sudhakar')}
              />
              <span><strong>K. Sudhakar</strong> (HYD)</span>
            </label>
            <label className={`dealer-chip ${dealer === 'bhaskar' ? 'active' : ''}`}>
              <input 
                type="radio" 
                name="quickDealer" 
                checked={dealer === 'bhaskar'} 
                onChange={() => setDealer('bhaskar')}
              />
              <span><strong>K. Bhaskar</strong> (JMD / AP)</span>
            </label>
          </div>
        </div>

        {/* Quick Result Preview Box */}
        <div className="quick-result-box">
          <div className="result-stat-row">
            <span className="stat-name">{lang === 'te' ? 'సిఫార్సు సామర్థ్యం' : 'Recommended Capacity'}</span>
            <span className="stat-val text-gold">{specs.recommendedKW} kW</span>
          </div>
          <div className="result-stat-row">
            <span className="stat-name">{lang === 'te' ? 'కేంద్ర ప్రభుత్వ సబ్సిడీ' : 'Govt Subsidy'}</span>
            <span className="stat-val text-emerald-400">₹{specs.subsidy.toLocaleString('en-IN')}</span>
          </div>
          <div className="result-stat-row">
            <span className="stat-name">{lang === 'te' ? 'నెలవారీ ఆదా' : 'Monthly Bill Savings'}</span>
            <span className="stat-val text-cyan-400">₹{specs.monthlySavings.toLocaleString('en-IN')}/mo</span>
          </div>
        </div>

        {/* Submit */}
        <button type="submit" className="btn btn-whatsapp btn-block btn-lg">
          <WhatsAppIcon size={18} />
          <span>{t.btnGetQuickQuote}</span>
        </button>
      </form>
    </div>
  );
};

export default QuickQuoteCard;
