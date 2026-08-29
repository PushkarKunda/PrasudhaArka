import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Sparkles, MapPin, IndianRupee, Home, Building2, CheckCircle2 } from 'lucide-react';
import { DEALERS, getWhatsAppUrl } from '../data/dealers';
import { calculateSolarSpecs } from '../data/tariffs';

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

  const handleWhatsAppSend = (e) => {
    e.preventDefault();
    const dealerInfo = DEALERS[dealer];
    const locText = location ? location : 'AP/Telangana';
    const msg = `*PM Surya Ghar Solar Quotation Request*\n` +
      `------------------------------------\n` +
      `• *Location:* ${locText}\n` +
      `• *Monthly Power Bill:* ₹${bill.toLocaleString('en-IN')}\n` +
      `• *Property Type:* ${propType === 'residential' ? 'Residential (Cat-1)' : 'Commercial (Cat-2)'}\n` +
      `• *Recommended Solar Size:* ${specs.recommendedKW} kW\n` +
      `• *Govt Subsidy:* ₹${specs.subsidy.toLocaleString('en-IN')}\n` +
      `• *Est. Net Cost:* ₹${specs.netInvestment.toLocaleString('en-IN')}\n` +
      `• *Est. Monthly Savings:* ₹${specs.monthlySavings.toLocaleString('en-IN')}\n` +
      `------------------------------------\n` +
      `Hello ${dealerInfo.name}, please contact me with formal quotation and site survey details.`;

    window.open(getWhatsAppUrl(dealer, msg), '_blank');
  };

  return (
    <div className="quick-quote-card glassmorphism-card-glow">
      <div className="card-header-badge">
        <Sparkles size={16} className="text-gold" />
        <span>{t.quickCardTitle}</span>
      </div>
      <p className="card-sub-desc">{t.quickCardSub}</p>

      <form onSubmit={handleWhatsAppSend} className="quick-form">
        {/* Bill input */}
        <div className="form-group">
          <label className="form-label">
            <IndianRupee size={15} />
            <span>{t.lblMonthlyBill}</span>
          </label>
          <div className="range-with-input">
            <input 
              type="range" 
              min="800" 
              max="25000" 
              step="200" 
              value={bill}
              onChange={(e) => setBill(Number(e.target.value))}
              className="custom-range"
            />
            <div className="bill-badge">₹{bill.toLocaleString('en-IN')}</div>
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
          <Send size={18} />
          <span>{t.btnGetQuickQuote}</span>
        </button>
      </form>
    </div>
  );
};
