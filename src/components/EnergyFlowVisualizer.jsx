import React, { useState, useEffect } from 'react';
import { Sun, Zap, Cpu, Home, RefreshCw, Activity } from 'lucide-react';

export const EnergyFlowVisualizer = ({ lang, t }) => {
  const [timeOfDay, setTimeOfDay] = useState('noon'); // 'morning' | 'noon' | 'evening' | 'night'

  // Time preset calculations
  const states = {
    morning: { sunPct: 65, solarKW: 2.2, homeKW: 1.2, gridKW: 1.0 },
    noon: { sunPct: 100, solarKW: 3.8, homeKW: 1.5, gridKW: 2.3 },
    evening: { sunPct: 40, solarKW: 1.4, homeKW: 2.0, gridKW: -0.6 },
    night: { sunPct: 0, solarKW: 0.0, homeKW: 1.8, gridKW: -1.8 }
  };

  const curr = states[timeOfDay];

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
            { id: 'morning', label: lang === 'te' ? 'ఉదయం' : 'Morning 9 AM' },
            { id: 'noon', label: lang === 'te' ? 'మధ్యాహ్నం (పీక్)' : 'Peak Noon 1 PM' },
            { id: 'evening', label: lang === 'te' ? 'సాయంత్రం' : 'Evening 5 PM' },
            { id: 'night', label: lang === 'te' ? 'రాత్రి' : 'Night 9 PM' },
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

      {/* Interactive Flow Diagram */}
      <div className="flow-nodes-container">
        {/* Node 1: Sun */}
        <div className={`flow-node sun-node ${timeOfDay === 'night' ? 'dimmed' : ''}`}>
          <div className="node-icon-wrap sun-glow">
            <Sun size={24} className="text-amber-400" />
          </div>
          <span className="node-label">
            <span className="label-desktop">{t.sunNode}</span>
            <span className="label-mobile">{lang === 'te' ? 'సూర్యుడు' : 'Sun'}</span>
          </span>
          <span className="node-stat">{curr.sunPct}% Rad</span>
        </div>

        {/* Dynamic Ray Pulse Connector */}
        <div className="flow-pulse-connector">
          <svg className="flow-line-svg" viewBox="0 0 100 20" preserveAspectRatio="none">
            <line x1="0" y1="10" x2="100" y2="10" stroke="#f59e0b" strokeWidth="3" strokeDasharray="6 4" />
          </svg>
          {timeOfDay !== 'night' && <div className="photon-particle animate-flow" />}
        </div>

        {/* Node 2: Solar Panels */}
        <div className="flow-node panel-node">
          <div className="node-icon-wrap panel-glow">
            <Zap size={24} className="text-emerald-400" />
          </div>
          <span className="node-label">
            <span className="label-desktop">{t.panelNode}</span>
            <span className="label-mobile">{lang === 'te' ? 'ప్యానెల్స్' : 'Panels'}</span>
          </span>
          <span className="node-stat text-emerald-400">{curr.solarKW} kW</span>
        </div>

        {/* Connector */}
        <div className="flow-pulse-connector">
          <svg className="flow-line-svg" viewBox="0 0 100 20" preserveAspectRatio="none">
            <line x1="0" y1="10" x2="100" y2="10" stroke="#10b981" strokeWidth="3" strokeDasharray="6 4" />
          </svg>
          {curr.solarKW > 0 && <div className="electric-particle animate-flow" />}
        </div>

        {/* Node 3: Inverter */}
        <div className="flow-node inverter-node">
          <div className="node-icon-wrap inverter-glow">
            <Cpu size={24} className="text-cyan-400" />
          </div>
          <span className="node-label">
            <span className="label-desktop">{t.inverterNode}</span>
            <span className="label-mobile">{lang === 'te' ? 'ఇన్వర్టర్' : 'Inverter'}</span>
          </span>
          <span className="node-stat text-cyan-400">98.4%</span>
        </div>

        {/* Connector */}
        <div className="flow-pulse-connector">
          <svg className="flow-line-svg" viewBox="0 0 100 20" preserveAspectRatio="none">
            <line x1="0" y1="10" x2="100" y2="10" stroke="#06b6d4" strokeWidth="3" strokeDasharray="6 4" />
          </svg>
          <div className="electric-particle animate-flow" />
        </div>

        {/* Node 4: Home */}
        <div className="flow-node home-node">
          <div className="node-icon-wrap home-glow">
            <Home size={24} className="text-blue-400" />
          </div>
          <span className="node-label">
            <span className="label-desktop">{t.homeNode}</span>
            <span className="label-mobile">{lang === 'te' ? 'గృహం' : 'Home'}</span>
          </span>
          <span className="node-stat text-blue-400">{curr.homeKW} kW</span>
        </div>

        {/* Connector */}
        <div className="flow-pulse-connector">
          <svg className="flow-line-svg" viewBox="0 0 100 20" preserveAspectRatio="none">
            <line x1="0" y1="10" x2="100" y2="10" stroke="#8b5cf6" strokeWidth="3" strokeDasharray="6 4" />
          </svg>
          <div className="electric-particle animate-flow" />
        </div>

        {/* Node 5: Net Meter Grid */}
        <div className="flow-node grid-node">
          <div className="node-icon-wrap grid-glow">
            <RefreshCw size={22} className="text-purple-400" />
          </div>
          <span className="node-label">
            <span className="label-desktop">{t.gridNode}</span>
            <span className="label-mobile">{lang === 'te' ? 'గ్రిడ్' : 'Grid'}</span>
          </span>
          <span className={`node-stat ${curr.gridKW >= 0 ? 'text-green-400' : 'text-amber-400'}`}>
            {curr.gridKW >= 0 ? `+${curr.gridKW} kW` : `${curr.gridKW} kW`}
          </span>
        </div>
      </div>

      {/* Live Energy Telemetry Bar */}
      <div className="flow-telemetry-bar">
        <div className="telemetry-item">
          <span className="telemetry-label">{lang === 'te' ? 'సోలార్ ఉత్పత్తి' : 'Solar Generation'}</span>
          <span className="telemetry-value text-emerald-400">{curr.solarKW} kW</span>
        </div>
        <div className="telemetry-item">
          <span className="telemetry-label">{lang === 'te' ? 'గృహ వినియోగం' : 'Home Appliances'}</span>
          <span className="telemetry-value text-cyan-400">{curr.homeKW} kW</span>
        </div>
        <div className="telemetry-item">
          <span className="telemetry-label">{lang === 'te' ? 'డిస్కామ్ నెట్ మీటర్' : 'Net Meter Status'}</span>
          <span className={`telemetry-value ${curr.gridKW >= 0 ? 'text-green-400' : 'text-amber-400'}`}>
            {curr.gridKW >= 0 
              ? `+ ${curr.gridKW} kW (${lang === 'te' ? 'క్రెడిట్' : 'Export'})` 
              : `${Math.abs(curr.gridKW)} kW (${lang === 'te' ? 'గ్రిడ్ వాడకం' : 'Import'})`}
          </span>
        </div>
      </div>
    </div>
  );
};
