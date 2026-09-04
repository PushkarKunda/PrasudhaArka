import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Sun, Zap, Cpu, Home, RefreshCw, Activity, Shield, ShieldCheck } from 'lucide-react';
import './EnergyFlowVisualizer.css';

export const EnergyFlowVisualizer = ({ lang, t }) => {
  const [timeOfDay, setTimeOfDay] = useState('noon'); // 'morning' | 'noon' | 'evening' | 'night'
  const containerRef = useRef(null);
  const dcdbIconRef = useRef(null);
  const invIconRef = useRef(null);
  const acdbIconRef = useRef(null);
  const [paths, setPaths] = useState({ dcdbToInv: '', invToAcdb: '' });

  // Recalculate precision conduit curves that loop cleanly outside all text labels
  const updatePaths = useCallback(() => {
    if (!containerRef.current || !dcdbIconRef.current || !invIconRef.current || !acdbIconRef.current) return;

    const cRect = containerRef.current.getBoundingClientRect();
    const dcdbRect = dcdbIconRef.current.getBoundingClientRect();
    const invRect = invIconRef.current.getBoundingClientRect();
    const acdbRect = acdbIconRef.current.getBoundingClientRect();

    if (cRect.width === 0 || cRect.height === 0) return;

    // DCDB icon right edge and vertical center
    const dcdbX = dcdbRect.right - cRect.left;
    const dcdbY = dcdbRect.top - cRect.top + dcdbRect.height / 2;

    // Inverter icon right & left edges and vertical center
    const invRightX = invRect.right - cRect.left;
    const invLeftX = invRect.left - cRect.left;
    const invY = invRect.top - cRect.top + invRect.height / 2;

    // ACDB icon left edge and vertical center
    const acdbX = acdbRect.left - cRect.left;
    const acdbY = acdbRect.top - cRect.top + acdbRect.height / 2;

    // --- Turn 1: DCDB (Row 1 right) ──> Inverter (Row 2 center) ---
    // Pipe travels right into right margin, turns 90° down, travels down, turns 90° left into Inverter
    const pipeRightX = Math.min(cRect.width - 8, Math.max(dcdbX + 16, cRect.width - 16));
    const r1 = Math.min(14, Math.max(6, (pipeRightX - dcdbX) * 0.75));

    const dcdbToInvPath = 
      `M ${dcdbX} ${dcdbY} ` +
      `L ${pipeRightX - r1} ${dcdbY} ` +
      `Q ${pipeRightX} ${dcdbY} ${pipeRightX} ${dcdbY + r1} ` +
      `L ${pipeRightX} ${invY - r1} ` +
      `Q ${pipeRightX} ${invY} ${pipeRightX - r1} ${invY} ` +
      `L ${invRightX + 4} ${invY}`;

    // --- Turn 2: Inverter (Row 2 center) ──> ACDB (Row 3 left) ---
    // Pipe leaves Inverter left, travels across empty row space to left margin, turns 90° down, turns 90° right into ACDB
    const pipeLeftX = Math.max(8, Math.min(acdbX - 16, 16));
    const r2 = Math.min(14, Math.max(6, (acdbX - pipeLeftX) * 0.75));

    const invToAcdbPath = 
      `M ${invLeftX} ${invY} ` +
      `L ${pipeLeftX + r2} ${invY} ` +
      `Q ${pipeLeftX} ${invY} ${pipeLeftX} ${invY + r2} ` +
      `L ${pipeLeftX} ${acdbY - r2} ` +
      `Q ${pipeLeftX} ${acdbY} ${pipeLeftX + r2} ${acdbY} ` +
      `L ${acdbX - 4} ${acdbY}`;

    setPaths({ dcdbToInv: dcdbToInvPath, invToAcdb: invToAcdbPath });
  }, []);

  useEffect(() => {
    updatePaths();
    const animId = requestAnimationFrame(updatePaths);
    const timer = setTimeout(updatePaths, 100);

    let ro;
    if (containerRef.current && window.ResizeObserver) {
      ro = new ResizeObserver(() => updatePaths());
      ro.observe(containerRef.current);
    }
    window.addEventListener('resize', updatePaths);

    if (document.fonts?.ready) {
      document.fonts.ready.then(updatePaths);
    }

    return () => {
      cancelAnimationFrame(animId);
      clearTimeout(timer);
      window.removeEventListener('resize', updatePaths);
      if (ro) ro.disconnect();
    };
  }, [updatePaths, lang, timeOfDay]);

  // Time preset calculations
  const states = {
    morning: { sunPct: 65, solarKW: 2.2, homeKW: 1.2, gridKW: 1.0 },
    noon: { sunPct: 100, solarKW: 3.8, homeKW: 1.5, gridKW: 2.3 },
    evening: { sunPct: 40, solarKW: 1.4, homeKW: 2.0, gridKW: -0.6 },
    night: { sunPct: 0, solarKW: 0.0, homeKW: 1.8, gridKW: -1.8 }
  };

  const curr = states[timeOfDay];
  const unitText = t.unitsLabel || (lang === 'te' ? 'యూనిట్లు' : 'Units');

  return (
    <div className="energy-flow-card glassmorphism-card">
      <div className="energy-flow-header">
        <div className="flow-badge">
          <Activity size={16} className="text-gold" />
          <span>{lang === 'te' ? 'లైవ్ ఎనర్జీ సిమ్యులేటర్' : 'Live Energy Flow Simulator'}</span>
        </div>
        <h3 className="flow-title">{t.energyFlowTitle}</h3>
        <p className="flow-subtitle">{t.energyFlowSub}</p>

        {/* Time of day tabs */}
        <div className="flow-time-tabs">
          {[
            { id: 'morning', label: lang === 'te' ? 'ఉదయం 9 AM' : 'Morning 9 AM' },
            { id: 'noon', label: lang === 'te' ? 'మధ్యాహ్నం 1 PM (పీక్)' : 'Peak Noon 1 PM' },
            { id: 'evening', label: lang === 'te' ? 'సాయంత్రం 5 PM' : 'Evening 5 PM' },
            { id: 'night', label: lang === 'te' ? 'రాత్రి 9 PM' : 'Night 9 PM' },
          ].map(tab => (
            <button
              key={tab.id}
              className={`flow-time-tab ${timeOfDay === tab.id ? 'active' : ''}`}
              onClick={() => setTimeOfDay(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* S-Shape Solar Flow Circuit (Sun -> Panels -> DCDB -> Inverter -> ACDB -> Home -> Grid) */}
      <div ref={containerRef} className="s-circuit-container">
        {/* Precision Conduit SVG Overlay for Outer S-Curves */}
        <svg className="s-circuit-overlay" aria-hidden="true">
          <defs>
            <marker id="arrow-green-inv" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M 1 1.5 L 7 4 L 1 6.5 z" fill="#059669" />
            </marker>
            <marker id="arrow-blue-acdb" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M 1 1.5 L 7 4 L 1 6.5 z" fill="#0284c7" />
            </marker>
          </defs>

          {/* S-Turn 1: DCDB to Inverter (Green) */}
          {paths.dcdbToInv && (
            <g className="flow-curve-group">
              <path 
                d={paths.dcdbToInv} 
                stroke="#e2e8f0" 
                strokeWidth="3" 
                fill="none" 
                strokeLinecap="round"
                className="conduit-track"
              />
              <path 
                d={paths.dcdbToInv} 
                stroke="#059669" 
                strokeWidth="2.5" 
                fill="none"
                strokeDasharray="6 4" 
                strokeLinecap="round"
                className="flow-cable-dcdb"
                markerEnd="url(#arrow-green-inv)"
              />
              {curr.solarKW > 0 && (
                <circle r="3.5" fill="#10b981" className="flow-energy-particle">
                  <animateMotion 
                    dur="1.6s" 
                    repeatCount="indefinite" 
                    path={paths.dcdbToInv} 
                  />
                </circle>
              )}
            </g>
          )}

          {/* S-Turn 2: Inverter to ACDB (Sky Blue) */}
          {paths.invToAcdb && (
            <g className="flow-curve-group">
              <path 
                d={paths.invToAcdb} 
                stroke="#e2e8f0" 
                strokeWidth="3" 
                fill="none" 
                strokeLinecap="round"
                className="conduit-track"
              />
              <path 
                d={paths.invToAcdb} 
                stroke="#0284c7" 
                strokeWidth="2.5" 
                fill="none"
                strokeDasharray="6 4" 
                strokeLinecap="round"
                className="flow-cable-acdb"
                markerEnd="url(#arrow-blue-acdb)"
              />
              {curr.solarKW > 0 && (
                <circle r="3.5" fill="#0284c7" className="flow-energy-particle">
                  <animateMotion 
                    dur="1.6s" 
                    repeatCount="indefinite" 
                    path={paths.invToAcdb} 
                  />
                </circle>
              )}
            </g>
          )}
        </svg>

        {/* Row 1 (Top): Sun ──> Panels ──> DCDB */}
        <div className="s-circuit-row s-row-top">
          {/* Node 1: Sun */}
          <div className={`flow-node sun-node ${timeOfDay === 'night' ? 'dimmed' : ''}`}>
            <div className="node-icon-wrap sun-glow">
              <Sun size={22} className="text-amber-500" />
            </div>
            <span className="node-label">{t.sunNode}</span>
            <span className="node-stat">{curr.sunPct}% Rad</span>
          </div>

          {/* Connector: Sun to Panels */}
          <div className="flow-pulse-connector">
            <svg className="flow-line-svg" viewBox="0 0 100 20" preserveAspectRatio="none">
              <line x1="0" y1="10" x2="100" y2="10" stroke="#f59e0b" strokeWidth="2.5" strokeDasharray="5 3" />
            </svg>
            {timeOfDay !== 'night' && <div className="photon-particle animate-flow" />}
          </div>

          {/* Node 2: Solar Panels */}
          <div className="flow-node panel-node">
            <div className="node-icon-wrap panel-glow">
              <Zap size={22} className="text-emerald-500" />
            </div>
            <span className="node-label">{t.panelNode}</span>
            <span className="node-stat text-emerald-600">{curr.solarKW} {unitText}</span>
          </div>

          {/* Connector: Panels to DCDB */}
          <div className="flow-pulse-connector">
            <svg className="flow-line-svg" viewBox="0 0 100 20" preserveAspectRatio="none">
              <line x1="0" y1="10" x2="100" y2="10" stroke="#10b981" strokeWidth="2.5" strokeDasharray="5 3" />
            </svg>
            {curr.solarKW > 0 && <div className="electric-particle animate-flow dcdb-particle" />}
          </div>

          {/* Node 3: DCDB (Direct Current Distribution Box) */}
          <div 
            className="flow-node dcdb-node"
            title={lang === 'te' ? 'DCDB (డైరెక్ట్ కరెంట్ డిస్ట్రిబ్యూషన్ బాక్స్) - సర్జ్ ప్రొటెక్షన్' : 'DCDB (DC Distribution Box) - Surge & Lightning Protection'}
          >
            <div ref={dcdbIconRef} className="node-icon-wrap dcdb-glow">
              <Shield size={21} className="text-emerald-600" />
            </div>
            <span className="node-label">{t.dcdbNode}</span>
            <span className="node-stat text-emerald-600">{curr.solarKW > 0 ? 'SPD OK' : 'Safe'}</span>
          </div>
        </div>

        {/* Row 2 (Middle): Inverter centered */}
        <div className="s-circuit-row s-row-mid">
          <div className="flow-col-spacer" />
          
          {/* Node 4: Inverter (Center) */}
          <div className="flow-node inverter-node">
            <div ref={invIconRef} className="node-icon-wrap inverter-glow">
              <Cpu size={22} className="text-cyan-500" />
            </div>
            <span className="node-label">{t.inverterNode}</span>
            <span className="node-stat text-cyan-600">98.4%</span>
          </div>

          <div className="flow-col-spacer" />
        </div>

        {/* Row 3 (Bottom): ACDB ──> Home ──> Grid */}
        <div className="s-circuit-row s-row-bottom">
          {/* Node 5: ACDB */}
          <div 
            className="flow-node acdb-node"
            title={lang === 'te' ? 'ACDB (ఆల్టర్నేటింగ్ కరెంట్ డిస్ట్రిబ్యూషన్ బాక్స్) - MCB రక్షణ' : 'ACDB (AC Distribution Box) - MCB & Mains Safety'}
          >
            <div ref={acdbIconRef} className="node-icon-wrap acdb-glow">
              <ShieldCheck size={21} className="text-sky-600" />
            </div>
            <span className="node-label">{t.acdbNode}</span>
            <span className="node-stat text-sky-600">230V AC</span>
          </div>

          {/* Connector: ACDB to Home */}
          <div className="flow-pulse-connector">
            <svg className="flow-line-svg" viewBox="0 0 100 20" preserveAspectRatio="none">
              <line x1="0" y1="10" x2="100" y2="10" stroke="#0284c7" strokeWidth="2.5" strokeDasharray="5 3" />
            </svg>
            <div className="electric-particle animate-flow acdb-particle" />
          </div>

          {/* Node 6: Home */}
          <div className="flow-node home-node">
            <div className="node-icon-wrap home-glow">
              <Home size={22} className="text-blue-500" />
            </div>
            <span className="node-label">{t.homeNode}</span>
            <span className="node-stat text-blue-600">{curr.homeKW} {unitText}</span>
          </div>

          {/* Connector: Home to Grid */}
          <div className="flow-pulse-connector">
            <svg className="flow-line-svg" viewBox="0 0 100 20" preserveAspectRatio="none">
              <line x1="0" y1="10" x2="100" y2="10" stroke="#8b5cf6" strokeWidth="2.5" strokeDasharray="5 3" />
            </svg>
            <div className="electric-particle animate-flow grid-particle" />
          </div>

          {/* Node 7: Net Meter Grid */}
          <div className="flow-node grid-node">
            <div className="node-icon-wrap grid-glow">
              <RefreshCw size={20} className="text-purple-500" />
            </div>
            <span className="node-label">{t.gridNode}</span>
            <span className={`node-stat ${curr.gridKW >= 0 ? 'text-green-600' : 'text-amber-600'}`}>
              {curr.gridKW >= 0 ? `+${curr.gridKW} ${unitText}` : `${curr.gridKW} ${unitText}`}
            </span>
          </div>
        </div>
      </div>

      {/* Live Energy Telemetry Bar */}
      <div className="flow-telemetry-bar">
        <div className="telemetry-item">
          <span className="telemetry-label">{lang === 'te' ? 'సోలార్ ఉత్పత్తి' : 'Solar Generation'}</span>
          <span className="telemetry-value text-emerald-400">{curr.solarKW} {unitText}</span>
        </div>
        <div className="telemetry-item">
          <span className="telemetry-label">{lang === 'te' ? 'గృహ వినియోగం' : 'Home Appliances'}</span>
          <span className="telemetry-value text-cyan-400">{curr.homeKW} {unitText}</span>
        </div>
        <div className="telemetry-item">
          <span className="telemetry-label">{lang === 'te' ? 'డిస్కామ్ నెట్ మీటర్' : 'Net Meter Status'}</span>
          <span className={`telemetry-value ${curr.gridKW >= 0 ? 'text-green-400' : 'text-amber-400'}`}>
            {curr.gridKW >= 0 
              ? `+ ${curr.gridKW} ${unitText} (${lang === 'te' ? 'క్రెడిట్' : 'Export'})` 
              : `${Math.abs(curr.gridKW)} ${unitText} (${lang === 'te' ? 'గ్రిడ్ వాడకం' : 'Import'})`}
          </span>
        </div>
      </div>
    </div>
  );
};

export default EnergyFlowVisualizer;
