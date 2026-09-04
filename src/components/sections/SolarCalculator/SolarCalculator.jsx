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
  Layers,
  Globe
} from 'lucide-react';
import { WhatsAppIcon } from '../../common/WhatsAppIcon';
import { computeDiscomTariff, calculateSolarPlan, billToUnits } from '../../../data/tariffs';
import { DEALERS, getWhatsAppUrl } from '../../../data/dealers';
import './SolarCalculator.css';

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
      const cur = Number(currentReading) || 0;
      const prev = Number(prevReading) || 0;
      return Math.max(10, Math.max(0, cur - prev));
    }
    if (calcMode === 'bill') {
      return billToUnits(Number(billAmount) || 3000, state, propType);
    }
    return Math.max(10, Number(units) || 300);
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
            `Hello ${dealerInfo.name}, please share detailed solar proposal & schedule rooftop site survey.`;
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
          <div className="calculator-controls-card">
            {/* 1. State Selector */}
            <div className="form-group-block">
              <label className="calc-field-label">Select State:</label>
              <div className="state-pills-row">
                <button
                  type="button"
                  className={`state-select-btn ${state === 'AP' ? 'active' : ''}`}
                  onClick={() => setState('AP')}
                >
                  <span className="lightning-icon">⚡</span>
                  <span>ఆంధ్రప్రదేశ్ (AP)</span>
                </button>
                <button
                  type="button"
                  className={`state-select-btn ${state === 'TS' ? 'active' : ''}`}
                  onClick={() => setState('TS')}
                >
                  <span className="lightning-icon">⚡</span>
                  <span>తెలంగాణ (TG)</span>
                </button>
              </div>
            </div>

            {/* 2. Connection Category */}
            <div className="form-group-block">
              <label className="calc-field-label">Connection Category (Tariff Category):</label>
              <div className="cat-selector-grid-3">
                <button
                  type="button"
                  className={`cat-card-btn ${propType === 'residential' ? 'active' : ''}`}
                  onClick={() => handlePropTypeChange('residential')}
                >
                  <span className="cat-pill-tag green-tag">CAT-1 (SUBSIDY ELIGIBLE)</span>
                  <span className="cat-card-text">Residential (Home)</span>
                </button>

                <button
                  type="button"
                  className={`cat-card-btn ${propType === 'commercial' ? 'active' : ''}`}
                  onClick={() => handlePropTypeChange('commercial')}
                >
                  <span className="cat-pill-tag grey-tag">CAT-2 (NO SUBSIDY)</span>
                  <span className="cat-card-text">Commercial (Shop/Office)</span>
                </button>

                <button
                  type="button"
                  className={`cat-card-btn ${propType === 'farm' ? 'active' : ''}`}
                  onClick={() => handlePropTypeChange('farm')}
                >
                  <span className="cat-pill-tag grey-tag">CAT-3 (NO SUBSIDY)</span>
                  <span className="cat-card-text">Industry / Agriculture</span>
                </button>
              </div>
            </div>

            {/* 3. Solar Panel Type (DCR vs NON-DCR) */}
            <div className="form-group-block">
              <div className="field-header-row">
                <label className="calc-field-label">Solar Panel Type (DCR / NON-DCR):</label>
                <span className={`panel-status-pill ${propType === 'residential' && panelType === 'dcr' ? 'active' : 'inactive'}`}>
                  {propType === 'residential' && panelType === 'dcr'
                    ? '✓ Cat-1: DCR Only (Govt Subsidy Eligible)'
                    : 'NON-DCR: No Subsidy'}
                </span>
              </div>

              <div className="panel-toggle-grid-2">
                <button
                  type="button"
                  className={`panel-choice-card ${panelType === 'dcr' ? 'active' : ''}`}
                  onClick={() => setPanelType('dcr')}
                >
                  <span className="flag-icon-wrap">🇮🇳</span>
                  <div className="panel-choice-info">
                    <strong className="panel-title">DCR Panels</strong>
                    <span className="panel-desc">PM Surya Ghar Subsidy Available</span>
                  </div>
                </button>

                <button
                  type="button"
                  className={`panel-choice-card ${panelType === 'nondcr' ? 'active' : 'disabled'}`}
                  onClick={() => setPanelType('nondcr')}
                >
                  <span className="flag-icon-wrap globe-icon">🌐</span>
                  <div className="panel-choice-info">
                    <strong className="panel-title">NON-DCR Panels</strong>
                    <span className="panel-desc">Commercial / Cost-Effective (No Subsidy)</span>
                  </div>
                </button>
              </div>
            </div>

            {/* 4. Calculation Input Mode Tabs */}
            <div className="form-group-block">
              <div className="input-mode-track">
                <button
                  type="button"
                  className={`mode-track-tab ${calcMode === 'units' ? 'active' : ''}`}
                  onClick={() => setCalcMode('units')}
                >
                  Units
                </button>
                <button
                  type="button"
                  className={`mode-track-tab ${calcMode === 'meter' ? 'active' : ''}`}
                  onClick={() => setCalcMode('meter')}
                >
                  Meter Reading
                </button>
                <button
                  type="button"
                  className={`mode-track-tab ${calcMode === 'bill' ? 'active' : ''}`}
                  onClick={() => setCalcMode('bill')}
                >
                  Bill Amount (₹)
                </button>
              </div>

              {/* Mode 1: Units Input */}
              {calcMode === 'units' && (
                <div className="calc-slider-box">
                  <div className="slider-label-row">
                    <span className="slider-left-label">Monthly Consumption (Units)</span>
                    <div className="slider-val-badge">
                      <input 
                        type="number" 
                        min="10" 
                        max="10000" 
                        step="10" 
                        value={units === '' ? '' : units} 
                        onChange={(e) => {
                          const val = e.target.value;
                          setUnits(val === '' ? '' : parseInt(val, 10) || 0);
                        }}
                        onBlur={() => {
                          if (units === '' || Number(units) < 10) setUnits(300);
                        }}
                        className="calc-inline-input"
                        aria-label="Monthly Units"
                      />
                      <span className="unit-label-tag">units</span>
                    </div>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="1500"
                    step="10"
                    value={Math.min(1500, Math.max(10, Number(units) || 10))}
                    onChange={(e) => setUnits(Number(e.target.value))}
                    className="calc-blue-range"
                    aria-label="Monthly Units Slider"
                  />
                  <div className="slider-tick-labels">
                    <span>50 u</span>
                    <span>300 u</span>
                    <span>750 u</span>
                    <span>1500+ u</span>
                  </div>
                </div>
              )}

              {/* Mode 2: Meter Reading */}
              {calcMode === 'meter' && (
                <div className="calc-slider-box">
                  <div className="meter-reading-grid">
                    <div className="meter-input-cell">
                      <label>Current Reading:</label>
                      <input
                        type="number"
                        value={currentReading === '' ? '' : currentReading}
                        onChange={(e) => {
                          const val = e.target.value;
                          setCurrentReading(val === '' ? '' : parseInt(val, 10) || 0);
                        }}
                        onBlur={() => {
                          if (currentReading === '') setCurrentReading(4520);
                        }}
                        className="custom-input"
                      />
                    </div>
                    <div className="meter-input-cell">
                      <label>Previous Reading:</label>
                      <input
                        type="number"
                        value={prevReading === '' ? '' : prevReading}
                        onChange={(e) => {
                          const val = e.target.value;
                          setPrevReading(val === '' ? '' : parseInt(val, 10) || 0);
                        }}
                        onBlur={() => {
                          if (prevReading === '') setPrevReading(4220);
                        }}
                        className="custom-input"
                      />
                    </div>
                  </div>
                  <div className="meter-diff-badge">
                    <span>Calculated Monthly Units:</span>
                    <strong className="text-gold">{effectiveUnits} units</strong>
                  </div>
                </div>
              )}

              {/* Mode 3: Bill Amount */}
              {calcMode === 'bill' && (
                <div className="calc-slider-box">
                  <div className="slider-label-row">
                    <span className="slider-left-label">Monthly Power Bill (₹)</span>
                    <div className="slider-val-badge">
                      <span className="rupee-sym-blue">₹</span>
                      <input 
                        type="number" 
                        min="500" 
                        max="500000" 
                        step="100" 
                        value={billAmount === '' ? '' : billAmount} 
                        onChange={(e) => {
                          const val = e.target.value;
                          setBillAmount(val === '' ? '' : parseInt(val, 10) || 0);
                        }}
                        onBlur={() => {
                          if (billAmount === '' || Number(billAmount) < 100) setBillAmount(3000);
                        }}
                        className="calc-inline-input"
                        aria-label="Monthly Power Bill in Rupees"
                      />
                    </div>
                  </div>
                  <input
                    type="range"
                    min="500"
                    max="25000"
                    step="100"
                    value={Math.min(25000, Math.max(500, Number(billAmount) || 500))}
                    onChange={(e) => setBillAmount(Number(e.target.value))}
                    className="calc-blue-range"
                    aria-label="Monthly Power Bill Slider"
                  />
                  <div className="slider-tick-labels">
                    <span>₹500</span>
                    <span>₹5,000</span>
                    <span>₹15,000</span>
                    <span>₹25,000+</span>
                  </div>
                </div>
              )}
            </div>

            {/* Current DISCOM Bill & Tariff Breakdown Summary */}
            <div className="discom-tariff-box">
              <div className="tariff-box-header">
                <span className="tariff-header-title">
                  {state === 'AP' ? 'AP TARIFF (APCPDCL / APSPDCL)' : 'TELANGANA TARIFF (TSSPDCL)'}
                </span>
                <span className="tariff-rate-badge">
                  Avg: ₹{tariffResult.effectiveRate} / unit
                </span>
              </div>

              <div className="tariff-data-row">
                <span>Energy Charges (Telescopic Slabs):</span>
                <strong>₹{tariffResult.energyCharges.toLocaleString('en-IN')}</strong>
              </div>

              <div className="tariff-data-row">
                <span>Fixed + Meter + Duty + FAC:</span>
                <strong>₹{tariffResult.otherCharges.toLocaleString('en-IN')}</strong>
              </div>

              <div className="tariff-total-highlight-row">
                <span className="total-label">Current Monthly Electricity Bill:</span>
                <span className="total-amount-blue">₹{tariffResult.totalBill.toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Dark Navy Card */}
          <div className="calculator-dark-results-card">
            <div className="dark-card-header">
              <h3 className="dark-card-title">Your Solar Estimate & Returns</h3>
              <span className="dark-card-pill-tag">
                {state} • {tariffResult.load} KW LOAD • {panelType.toUpperCase()}
              </span>
            </div>

            {/* 4 Metric Cards Grid (2x2) */}
            <div className="dark-metrics-grid">
              <div className="dark-metric-box">
                <div className="dark-metric-label">RECOMMENDED SOLAR SIZE</div>
                <div className="dark-metric-val">{solarPlan.recKw} kW</div>
              </div>

              <div className="dark-metric-box gold-border">
                <div className="dark-metric-label">CENTRAL GOVT SUBSIDY</div>
                <div className="dark-metric-val text-gold">
                  {solarPlan.subsidy > 0 ? `₹${solarPlan.subsidy.toLocaleString('en-IN')}` : '₹0'}
                </div>
              </div>

              <div className="dark-metric-box">
                <div className="dark-metric-label">REQUIRED ROOF SPACE</div>
                <div className="dark-metric-val">{solarPlan.spaceDisplay}</div>
              </div>

              <div className="dark-metric-box green-border">
                <div className="dark-metric-label">MONTHLY POWER SAVINGS</div>
                <div className="dark-metric-val text-green">₹{solarPlan.monthlySavings.toLocaleString('en-IN')}/mo</div>
              </div>
            </div>

            {/* Financial 2x2 Box */}
            <div className="dark-finance-specs-box">
              <div className="finance-spec-cell">
                <span className="fin-lbl">Unit Cost (DCR)</span>
                <span className="fin-amt">₹{solarPlan.unitCost.toLocaleString('en-IN')}</span>
              </div>
              <div className="finance-spec-cell">
                <span className="fin-lbl">Max Loan</span>
                <span className="fin-amt">₹{solarPlan.maxLoan.toLocaleString('en-IN')}</span>
              </div>
              <div className="finance-spec-cell">
                <span className="fin-lbl">Est. EMI</span>
                <span className="fin-emi-tag">₹{solarPlan.estEmi.toLocaleString('en-IN')} / mo</span>
              </div>
              <div className="finance-spec-cell">
                <span className="fin-lbl">Power Gen.</span>
                <span className="fin-amt">{solarPlan.powerGenDay} units/day</span>
              </div>
            </div>

            {/* Solar Generation & Offset Bar */}
            <div className="dark-offset-bar-section">
              <div className="offset-text-flex">
                <span>Solar Generation: <strong>{solarPlan.solarMonthlyGen} units/mo</strong></span>
                <span>Offset: <strong>{solarPlan.offsetPct}%</strong></span>
              </div>
              <div className="offset-bar-bg-track">
                <div className="offset-bar-cyan-fill" style={{ width: `${solarPlan.offsetPct}%` }}></div>
              </div>
            </div>

            {/* 25-Year Lifetime Savings Banner */}
            <div className="dark-lifetime-banner">
              <div className="lifetime-info-col">
                <h4 className="lifetime-heading">Estimated 25-Year Lifetime Electricity Savings:</h4>
                <p className="lifetime-subtext">ROI Timeline: 3 to 4 Years • Zero Electricity Bill Thereafter</p>
              </div>
              <div className="lifetime-val-blue">
                ₹{solarPlan.lifetimeSavings.toLocaleString('en-IN')}
              </div>
            </div>

            {/* WhatsApp Quote Button */}
            <button
              onClick={handleSendWhatsAppPlan}
              className="dark-calc-whatsapp-btn"
            >
              <WhatsAppIcon size={20} />
              <span>Send This Plan to WhatsApp for Quotation</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SolarCalculator;
