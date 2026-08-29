import React, { useState, useMemo } from 'react';
import { 
  Calculator, 
  Zap, 
  IndianRupee, 
  TrendingUp, 
  Maximize2, 
  ShieldCheck, 
  Clock, 
  Share2, 
  Home, 
  Building, 
  Tractor,
  Sparkles,
  Sun,
  Layers
} from 'lucide-react';
import { computeDiscomTariff, calculateSolarPlan, billToUnits } from '../data/tariffs';
import { DEALERS, getWhatsAppUrl } from '../data/dealers';

export const SolarCalculator = ({ lang, t }) => {
  const [state, setState] = useState('AP'); // 'AP' | 'TS'
  const [propType, setPropType] = useState('residential'); // 'residential' | 'commercial' | 'farm'
  const [panelType, setPanelType] = useState('dcr'); // 'dcr' | 'nondcr'
  const [calcMode, setCalcMode] = useState('units'); // 'units' | 'meter' | 'bill'
  
  const [units, setUnits] = useState(300);
  const [billAmount, setBillAmount] = useState(3000);
  const [currentReading, setCurrentReading] = useState(4520);
  const [prevReading, setPrevReading] = useState(4220);
  const [selectedDealer, setSelectedDealer] = useState('sudhakar');

  // Compute effective units from active input mode
  const effectiveUnits = useMemo(() => {
    if (calcMode === 'meter') {
      return Math.max(10, Math.max(0, currentReading - prevReading));
    }
    if (calcMode === 'bill') {
      return billToUnits(billAmount, state, propType);
    }
    return Math.max(10, units);
  }, [calcMode, units, billAmount, currentReading, prevReading, state, propType]);

  // Compute DISCOM Tariff Breakdown
  const tariffResult = useMemo(() => {
    return computeDiscomTariff(effectiveUnits, state, propType);
  }, [effectiveUnits, state, propType]);

  // Compute Solar Sizing, Subsidies, Net Metering, and ROI
  const solarPlan = useMemo(() => {
    return calculateSolarPlan(effectiveUnits, state, propType, panelType);
  }, [effectiveUnits, state, propType, panelType]);

  // Sync state changes between category and panel type
  const handlePropTypeChange = (newType) => {
    setPropType(newType);
    if (newType !== 'residential') {
      setPanelType('nondcr');
    } else {
      setPanelType('dcr');
    }
  };

  const handleSendWhatsAppPlan = () => {
    const dealerInfo = DEALERS[selectedDealer] || DEALERS.sudhakar;
    const isTe = lang === 'te';

    let msg = '';
    if (isTe) {
      msg = `*నమస్కారం! ప్రసుధార్క సోలార్ కాలిక్యులేటర్ కొటేషన్ విచారణ*\n` +
            `------------------------------------\n` +
            `• *రాష్ట్రం:* ${state === 'AP' ? 'ఆంధ్రప్రదేశ్ (APCPDCL/APSPDCL)' : 'తెలంగాణ (TSSPDCL)'}\n` +
            `• *కనెక్షన్ రకం:* ${propType === 'residential' ? 'నివాస గృహం (Cat-1)' : propType === 'commercial' ? 'వాణిజ్యం (Cat-2)' : 'వ్యవసాయం/పరిశ్రమ'}\n` +
            `• *ప్యానెల్ రకం:* ${panelType === 'dcr' ? 'DCR (సబ్సిడీ వర్తిస్తుంది)' : 'NON-DCR'}\n` +
            `• *నెలవారీ కరెంట్ వాడకం:* ${effectiveUnits} యూనిట్లు (బిల్లు: ~₹${tariffResult.totalBill.toLocaleString('en-IN')})\n` +
            `------------------------------------\n` +
            `• *సిఫార్సు సోలార్ పరిమాణం:* ${solarPlan.recKw} kW\n` +
            `• *ప్రభుత్వ సబ్సిడీ (PM Surya Ghar):* ₹${solarPlan.subsidy.toLocaleString('en-IN')}\n` +
            `• *సిస్టమ్ ఖర్చు (Gross Cost):* ₹${solarPlan.unitCost.toLocaleString('en-IN')}\n` +
            `• *మీ నికర పెట్టుబడి (Net Cost):* ₹${solarPlan.netInvestment.toLocaleString('en-IN')}\n` +
            `• *బ్యాంక్ లోన్ సదుపాయం:* ₹${solarPlan.maxLoan.toLocaleString('en-IN')} (EMI: ₹${solarPlan.estEmi.toLocaleString('en-IN')}/mo)\n` +
            `• *నెలవారీ కరెంట్ బిల్లు ఆదా:* ₹${solarPlan.monthlySavings.toLocaleString('en-IN')}/mo\n` +
            `• *25 ఏళ్ల జీవితకాల ఆదా:* ₹${solarPlan.lifetimeSavings.toLocaleString('en-IN')}\n` +
            `• *అవసరమైన స్థలం (Roof Space):* ${solarPlan.spaceDisplay} (${solarPlan.sqft} Sq.Ft)\n` +
            `------------------------------------\n` +
            `నమస్తే ${dealerInfo.name} గారు, దయచేసి మా ఇంటి వద్ద సైట్ సర్వే నిర్వహించి తుది కొటేషన్ పంపగలరు.`;
    } else {
      msg = `*Hello! Prasudharka Solar Rooftop Inquiry*\n` +
            `------------------------------------\n` +
            `• *State:* ${state === 'AP' ? 'Andhra Pradesh (APCPDCL/APSPDCL)' : 'Telangana (TSSPDCL)'}\n` +
            `• *Category:* ${propType.toUpperCase()} | *Panel:* ${panelType.toUpperCase()}\n` +
            `• *Monthly Consumption:* ${effectiveUnits} Units (Bill: ~₹${tariffResult.totalBill.toLocaleString('en-IN')})\n` +
            `------------------------------------\n` +
            `• *Recommended Solar Size:* ${solarPlan.recKw} kW\n` +
            `• *PM Surya Ghar Subsidy:* ₹${solarPlan.subsidy.toLocaleString('en-IN')}\n` +
            `• *System Cost (Unit Cost):* ₹${solarPlan.unitCost.toLocaleString('en-IN')}\n` +
            `• *Net Investment:* ₹${solarPlan.netInvestment.toLocaleString('en-IN')}\n` +
            `• *Max Bank Loan:* ₹${solarPlan.maxLoan.toLocaleString('en-IN')} (EMI: ₹${solarPlan.estEmi.toLocaleString('en-IN')}/mo)\n` +
            `• *Monthly Bill Savings:* ₹${solarPlan.monthlySavings.toLocaleString('en-IN')}/mo\n` +
            `• *25-Year Lifetime Savings:* ₹${solarPlan.lifetimeSavings.toLocaleString('en-IN')}\n` +
            `• *Roof Space Required:* ${solarPlan.spaceDisplay} (${solarPlan.sqft} Sq.Ft)\n` +
            `------------------------------------\n` +
            `Hello ${dealerInfo.name}, please verify my solar calculation and schedule a rooftop feasibility survey.`;
    }

    window.open(getWhatsAppUrl(selectedDealer, msg), '_blank');
  };

  return (
    <section className="calculator-section section-padding" id="calculator">
      <div className="container">
        {/* Section Header */}
        <div className="section-title-wrap text-center">
          <div className="section-tag">
            <Calculator size={15} />
            <span>{t.calcTag}</span>
          </div>
          <h2 className="section-title">{t.calcTitle}</h2>
          <p className="section-subtitle">{t.calcDesc}</p>
        </div>

        <div className="calculator-grid">
          {/* Left Column: Interactive Inputs */}
          <div className="calculator-controls-card glassmorphism-card">
            <h3 className="calc-card-title">
              <Zap size={20} className="text-gold" />
              <span>{lang === 'te' ? 'మీ విద్యుత్ వివరాలు నమోదు చేయండి' : 'Enter Electricity Parameters'}</span>
            </h3>

            {/* 1. State Selector */}
            <div className="form-group">
              <label className="form-label">
                {lang === 'te' ? 'రాష్ట్రం ఎంచుకోండి (Select State):' : 'Select State (Official DISCOM):'}
              </label>
              <div className="state-pills-group">
                <button
                  type="button"
                  className={`state-pill ${state === 'AP' ? 'active' : ''}`}
                  onClick={() => setState('AP')}
                >
                  <span className="state-code">AP</span>
                  <span>{lang === 'te' ? 'ఆంధ్రప్రదేశ్ (APCPDCL / APSPDCL)' : 'Andhra Pradesh (APCPDCL / APSPDCL)'}</span>
                </button>
                <button
                  type="button"
                  className={`state-pill ${state === 'TS' ? 'active' : ''}`}
                  onClick={() => setState('TS')}
                >
                  <span className="state-code">TG</span>
                  <span>{lang === 'te' ? 'తెలంగాణ (TSSPDCL / TSNPDCL)' : 'Telangana (TSSPDCL / TSNPDCL)'}</span>
                </button>
              </div>
            </div>

            {/* 2. Connection Category */}
            <div className="form-group">
              <label className="form-label">
                {lang === 'te' ? 'కనెక్షన్ కేటగిరీ (Connection Category):' : 'Connection Category:'}
              </label>
              <div className="category-btn-group">
                <button
                  type="button"
                  className={`cat-btn ${propType === 'residential' ? 'active' : ''}`}
                  onClick={() => handlePropTypeChange('residential')}
                >
                  <span className="cat-badge-tag">{lang === 'te' ? 'Cat-1 (సబ్సిడీ వర్తిస్తుంది)' : 'Cat-1 (Subsidy Eligible)'}</span>
                  <div className="cat-title-row">
                    <Home size={16} />
                    <span>{lang === 'te' ? 'నివాసం / ఇల్లు (Residential)' : 'Residential (Home)'}</span>
                  </div>
                </button>

                <button
                  type="button"
                  className={`cat-btn ${propType === 'commercial' ? 'active' : ''}`}
                  onClick={() => handlePropTypeChange('commercial')}
                >
                  <span className="cat-badge-tag muted">{lang === 'te' ? 'Cat-2 (సబ్సిడీ లేదు)' : 'Cat-2 (No Subsidy)'}</span>
                  <div className="cat-title-row">
                    <Building size={16} />
                    <span>{lang === 'te' ? 'వాణిజ్యం (Commercial)' : 'Commercial (Shop/Office)'}</span>
                  </div>
                </button>

                <button
                  type="button"
                  className={`cat-btn ${propType === 'farm' ? 'active' : ''}`}
                  onClick={() => handlePropTypeChange('farm')}
                >
                  <span className="cat-badge-tag muted">{lang === 'te' ? 'Cat-3 (సబ్సిడీ లేదు)' : 'Cat-3 (No Subsidy)'}</span>
                  <div className="cat-title-row">
                    <Tractor size={16} />
                    <span>{lang === 'te' ? 'పరిశ్రమ / వ్యవసాయం' : 'Industry / Agriculture'}</span>
                  </div>
                </button>
              </div>
            </div>

            {/* 3. Solar Panel Type (DCR vs NON-DCR) */}
            <div className="form-group">
              <div className="field-label-with-badge">
                <label className="form-label">
                  {lang === 'te' ? 'సోలార్ ప్యానెల్ రకం (Panel Type):' : 'Solar Panel Type (DCR / NON-DCR):'}
                </label>
                <span className={`panel-subsidy-status ${propType === 'residential' && panelType === 'dcr' ? '' : 'no-subsidy'}`}>
                  {propType === 'residential' && panelType === 'dcr'
                    ? (lang === 'te' ? '✓ DCR: కేంద్ర ప్రభుత్వ సబ్సిడీ వర్తిస్తుంది' : '✓ DCR: PM Surya Ghar Subsidy Available')
                    : (lang === 'te' ? 'NON-DCR: సబ్సిడీ వర్తించదు' : 'NON-DCR: No Subsidy')}
                </span>
              </div>
              <div className="panel-type-selector">
                <button
                  type="button"
                  className={`panel-type-pill ${panelType === 'dcr' ? 'active' : ''}`}
                  onClick={() => setPanelType('dcr')}
                >
                  <ShieldCheck size={18} className="text-emerald-400" />
                  <div>
                    <strong>{lang === 'te' ? 'DCR ప్యానెల్స్' : 'DCR Solar Panels'}</strong>
                    <small>{lang === 'te' ? 'PM Surya Ghar సబ్సిడీ లభిస్తుంది' : 'PM Surya Ghar Subsidy Eligible'}</small>
                  </div>
                </button>

                <button
                  type="button"
                  className={`panel-type-pill ${panelType === 'nondcr' ? 'active' : ''}`}
                  onClick={() => setPanelType('nondcr')}
                >
                  <Layers size={18} className="text-cyan-400" />
                  <div>
                    <strong>{lang === 'te' ? 'NON-DCR ప్యానెల్స్' : 'NON-DCR Panels'}</strong>
                    <small>{lang === 'te' ? 'వాణిజ్య/చవకైన ప్రాజెక్టులకు' : 'Commercial & Cost-Effective'}</small>
                  </div>
                </button>
              </div>
            </div>

            {/* 4. Calculation Input Mode Tabs */}
            <div className="form-group">
              <label className="form-label">
                {lang === 'te' ? 'లెక్కించే పద్ధతి (Input Mode):' : 'Calculation Input Mode:'}
              </label>
              <div className="calc-mode-tabs">
                <button
                  type="button"
                  className={`mode-tab ${calcMode === 'units' ? 'active' : ''}`}
                  onClick={() => setCalcMode('units')}
                >
                  {lang === 'te' ? 'యూనిట్లు (Units)' : 'Units (kWh)'}
                </button>
                <button
                  type="button"
                  className={`mode-tab ${calcMode === 'meter' ? 'active' : ''}`}
                  onClick={() => setCalcMode('meter')}
                >
                  {lang === 'te' ? 'మీటర్ రీడింగ్' : 'Meter Reading'}
                </button>
                <button
                  type="button"
                  className={`mode-tab ${calcMode === 'bill' ? 'active' : ''}`}
                  onClick={() => setCalcMode('bill')}
                >
                  {lang === 'te' ? 'బిల్లు మొత్తం (₹)' : 'Bill (₹)'}
                </button>
              </div>

              {/* Mode 1: Units Input */}
              {calcMode === 'units' && (
                <div className="slider-group-box">
                  <div className="slider-header-row">
                    <span className="slider-title-text">{lang === 'te' ? 'నెలవారీ యూనిట్లు (Monthly Units)' : 'Monthly Consumption (kWh)'}</span>
                    <div className="slider-input-badge">
                      <input 
                        type="number" 
                        min="10" 
                        max="3000" 
                        step="10" 
                        value={units} 
                        onChange={(e) => setUnits(Math.max(10, Number(e.target.value)))}
                        className="calc-num-input"
                      />
                      <span className="unit-tag">kWh</span>
                    </div>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="1500"
                    step="10"
                    value={units}
                    onChange={(e) => setUnits(Number(e.target.value))}
                    className="custom-range"
                  />
                  <div className="slider-ticks-row">
                    <span>50 u</span>
                    <span>300 u</span>
                    <span>750 u</span>
                    <span>1500+ u</span>
                  </div>
                </div>
              )}

              {/* Mode 2: Meter Reading */}
              {calcMode === 'meter' && (
                <div className="meter-mode-box">
                  <div className="meter-reading-grid">
                    <div className="meter-input-cell">
                      <label>{lang === 'te' ? 'ప్రస్తుత రీడింగ్ (Current Reading):' : 'Current Reading:'}</label>
                      <input
                        type="number"
                        value={currentReading}
                        onChange={(e) => setCurrentReading(Number(e.target.value))}
                        className="custom-input"
                      />
                    </div>
                    <div className="meter-input-cell">
                      <label>{lang === 'te' ? 'మునుపటి రీడింగ్ (Previous Reading):' : 'Previous Reading:'}</label>
                      <input
                        type="number"
                        value={prevReading}
                        onChange={(e) => setPrevReading(Number(e.target.value))}
                        className="custom-input"
                      />
                    </div>
                  </div>
                  <div className="meter-diff-badge">
                    <span>{lang === 'te' ? 'మొత్తం వినియోగించిన యూనిట్లు:' : 'Calculated Monthly Units:'}</span>
                    <strong className="text-gold">{effectiveUnits} Units (kWh)</strong>
                  </div>
                </div>
              )}

              {/* Mode 3: Bill Amount */}
              {calcMode === 'bill' && (
                <div className="slider-group-box">
                  <div className="slider-header-row">
                    <span className="slider-title-text">{lang === 'te' ? 'నెలవారీ బిల్లు మొత్తం (Monthly Bill)' : 'Monthly Power Bill (₹)'}</span>
                    <div className="slider-input-badge">
                      <span className="rupee-sign">₹</span>
                      <input 
                        type="number" 
                        min="500" 
                        max="50000" 
                        step="100" 
                        value={billAmount} 
                        onChange={(e) => setBillAmount(Math.max(500, Number(e.target.value)))}
                        className="calc-num-input bill-width"
                      />
                    </div>
                  </div>
                  <input
                    type="range"
                    min="500"
                    max="25000"
                    step="100"
                    value={billAmount}
                    onChange={(e) => setBillAmount(Number(e.target.value))}
                    className="custom-range"
                  />
                  <div className="slider-ticks-row">
                    <span>₹500</span>
                    <span>₹5,000</span>
                    <span>₹15,000</span>
                    <span>₹25,000+</span>
                  </div>
                </div>
              )}
            </div>

            {/* Current DISCOM Bill & Tariff Breakdown Summary */}
            <div className="calc-discom-summary">
              <div className="discom-summary-header">
                <span className="discom-badge">
                  {tariffResult.tierName 
                    ? `${state === 'AP' ? 'AP Tariff (APCPDCL / APSPDCL)' : 'Telangana Tariff (TSSPDCL)'} • ${tariffResult.tierName}`
                    : (state === 'AP' ? 'AP Tariff (APCPDCL / APSPDCL)' : 'Telangana Tariff (TSSPDCL)')}
                </span>
                <span className="effective-rate-pill">
                  Avg: ₹{tariffResult.effectiveRate} / unit
                </span>
              </div>

              <div className="discom-breakdown-row">
                <span>{lang === 'te' ? 'Energy Charges (స్లాబుల ప్రకారం):' : 'Energy Charges (Telescopic Slabs):'}</span>
                <strong>₹{tariffResult.energyCharges.toLocaleString('en-IN')}</strong>
              </div>

              <div className="discom-breakdown-row">
                <span>{lang === 'te' ? 'Fixed + Meter + Duty + FAC:' : 'Fixed + Meter + Duty + FAC:'}</span>
                <strong>₹{tariffResult.otherCharges.toLocaleString('en-IN')}</strong>
              </div>

              <div className="discom-total-row">
                <span>{lang === 'te' ? 'ప్రస్తుత నెలవారీ బిల్లు (Current Bill):' : 'Current Monthly Electricity Bill:'}</span>
                <span className="discom-total-val">₹{tariffResult.totalBill.toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Calculated Solar ROI & Output Card */}
          <div className="calculator-results-card glassmorphism-card-glow">
            <div className="results-header-flex">
              <div className="result-header-badge">
                <Sparkles size={16} className="text-gold" />
                <span>{lang === 'te' ? 'మీ సోలార్ ప్లాన్ అంచనా' : 'Your Solar Plan & ROI Estimate'}</span>
              </div>
              <span className="plan-state-badge">
                {state} • {tariffResult.load} kW Load • {panelType.toUpperCase()}
              </span>
            </div>

            {/* 4 Key Metric Cards Grid */}
            <div className="calc-metrics-grid">
              <div className="calc-metric-card">
                <div className="metric-label">{lang === 'te' ? 'సిఫార్సు సోలార్ సామర్థ్యం' : 'Recommended Solar Size'}</div>
                <div className="metric-value">{solarPlan.recKw} kW</div>
              </div>

              <div className="calc-metric-card subsidy">
                <div className="metric-label">{lang === 'te' ? 'కేంద్ర ప్రభుత్వ సబ్సిడీ' : 'Central Govt Subsidy'}</div>
                <div className="metric-value">
                  {solarPlan.subsidy > 0 ? `₹${solarPlan.subsidy.toLocaleString('en-IN')}` : (lang === 'te' ? 'సబ్సిడీ లేదు' : 'No Subsidy')}
                </div>
              </div>

              <div className="calc-metric-card">
                <div className="metric-label">{lang === 'te' ? 'అవసరమైన స్థలం (Space)' : 'Required Roof Space'}</div>
                <div className="metric-value">{solarPlan.spaceDisplay}</div>
              </div>

              <div className="calc-metric-card highlight">
                <div className="metric-label">{lang === 'te' ? 'నెలవారీ కరెంట్ ఆదా' : 'Monthly Power Savings'}</div>
                <div className="metric-value">₹{solarPlan.monthlySavings.toLocaleString('en-IN')}/mo</div>
              </div>
            </div>

            {/* Financial & Loan Specifications (From System Configurations) */}
            <div className="calc-finance-box">
              <div className="finance-row">
                <span className="fin-label">{lang === 'te' ? 'సిస్టమ్ ఖర్చు (Unit Cost):' : 'Unit Cost (DCR):'}</span>
                <strong className="fin-val">₹ {solarPlan.unitCost.toLocaleString('en-IN')}</strong>
              </div>
              <div className="finance-row">
                <span className="fin-label">{lang === 'te' ? 'బ్యాంక్ లోన్ సదుపాయం (Max Loan):' : 'Max Bank Loan:'}</span>
                <strong className="fin-val">₹ {solarPlan.maxLoan.toLocaleString('en-IN')}</strong>
              </div>
              <div className="finance-row highlight">
                <span className="fin-label">{lang === 'te' ? 'అంచనా నెలవారీ EMI:' : 'Est. Bank EMI:'}</span>
                <strong className="fin-val emi">₹ {solarPlan.estEmi.toLocaleString('en-IN')} / mo</strong>
              </div>
              <div className="finance-row">
                <span className="fin-label">{lang === 'te' ? 'రోజువారీ ఉత్పత్తి (Daily Gen):' : 'Daily Power Gen:'}</span>
                <strong className="fin-val">{solarPlan.powerGenDay} units/day</strong>
              </div>
            </div>

            {/* Solar Generation & Net Metering Offset Progress Bar */}
            <div className="solar-offset-bar-card">
              <div className="offset-bar-labels">
                <span>Solar Generation: <strong>{solarPlan.solarMonthlyGen} units/mo</strong></span>
                <span>Offset: <strong>{solarPlan.offsetPct}%</strong></span>
              </div>
              <div className="offset-progress-bg">
                <div className="offset-progress-fill" style={{ width: `${solarPlan.offsetPct}%` }}></div>
              </div>
            </div>

            {/* 25-Year Cumulative Savings Banner */}
            <div className="lifetime-savings-banner">
              <div className="lifetime-text-wrap">
                <h4>{lang === 'te' ? '25 సంవత్సరాల జీవితకాల విద్యుత్ ఆదా:' : '25-Year Lifetime Electricity Savings:'}</h4>
                <p>{lang === 'te' ? 'ROI కాలపరిమితి: 3-4 సంవత్సరాలు • ఆ తర్వాత ఉచిత విద్యుత్' : 'ROI Timeline: 3 to 4 Years • Zero Electricity Bill Thereafter'}</p>
              </div>
              <div className="lifetime-amount-box">
                <span>₹{solarPlan.lifetimeSavings.toLocaleString('en-IN')}</span>
              </div>
            </div>

            {/* Dealer Picker & WhatsApp Dispatch */}
            <div className="calc-action-section">
              <div className="dealer-pick-row">
                <span className="dealer-pick-label">{lang === 'te' ? 'కొటేషన్ పంపాల్సిన డీలర్:' : 'Send Plan To:'}</span>
                <div className="dealer-radios">
                  <label className={`dealer-mini-pill ${selectedDealer === 'sudhakar' ? 'active' : ''}`}>
                    <input 
                      type="radio" 
                      name="calcDealer"
                      checked={selectedDealer === 'sudhakar'} 
                      onChange={() => setSelectedDealer('sudhakar')} 
                    />
                    <span>K. Sudhakar (HYD)</span>
                  </label>
                  <label className={`dealer-mini-pill ${selectedDealer === 'bhaskar' ? 'active' : ''}`}>
                    <input 
                      type="radio" 
                      name="calcDealer"
                      checked={selectedDealer === 'bhaskar'} 
                      onChange={() => setSelectedDealer('bhaskar')} 
                    />
                    <span>K. Bhaskar (JMD/AP)</span>
                  </label>
                </div>
              </div>

              <button
                onClick={handleSendWhatsAppPlan}
                className="btn btn-whatsapp btn-block btn-lg"
              >
                <Share2 size={18} />
                <span>{lang === 'te' ? 'ఈ ప్లాన్‌ను వాట్సాప్‌కి పంపి కొటేషన్ పొందండి' : 'Send This Plan to WhatsApp for Quotation'}</span>
              </button>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};
