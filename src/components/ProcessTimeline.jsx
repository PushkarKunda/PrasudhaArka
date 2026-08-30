import React, { useState } from 'react';
import { 
  GitCommit, 
  MapPin, 
  Landmark, 
  FileText, 
  Wrench, 
  Zap, 
  CheckCircle,
  ShieldCheck
} from 'lucide-react';
import { PROCESS_STEPS } from '../data/services';

export const ProcessTimeline = ({ lang, t }) => {
  const [activeStep, setActiveStep] = useState(0);

  const iconMap = {
    MapPin,
    Landmark,
    FileText,
    Wrench,
    Zap,
    CheckCircle
  };

  return (
    <section className="process-section section-padding" id="process">
      <div className="container">
        {/* Section Header */}
        <div className="section-title-wrap text-center">
          <div className="section-tag">
            <GitCommit size={15} />
            <span>{t.processTag}</span>
          </div>
          <h2 className="section-title">{t.processTitle}</h2>
          <p className="section-subtitle">{t.processDesc}</p>
        </div>

        {/* 6-Step Turnkey Timeline Grid */}
        <div className="process-timeline-grid-6">
          {PROCESS_STEPS.map((step, idx) => {
            const IconComp = iconMap[step.icon] || Zap;
            const isSelected = activeStep === idx;

            return (
              <div
                key={idx}
                className={`process-step-compact-card ${isSelected ? 'active-step' : ''}`}
                onClick={() => setActiveStep(idx)}
              >
                {/* Header row: Number on left, Golden Icon on right */}
                <div className="step-card-top-row">
                  <span className="step-num-text">{step.step}</span>
                  <div className="step-icon-circle">
                    <IconComp size={20} className="step-icon-gold" />
                  </div>
                </div>

                <h3 className="step-compact-title">
                  {lang === 'te' ? step.titleTe : step.titleEn}
                </h3>

                <p className="step-compact-desc">
                  {lang === 'te' ? step.descTe : step.descEn}
                </p>
              </div>
            );
          })}
        </div>

        {/* Process Guarantee Callout */}
        <div className="process-guarantee-card">
          <ShieldCheck size={28} className="text-emerald-500 flex-shrink-0" />
          <div className="guarantee-text">
            <h4>
              {lang === 'te' 
                ? 'పూర్తి టర్న్‌కీ బాధ్యత - సున్నా తలనొప్పులు!' 
                : 'Turnkey Peace of Mind Guarantee!'}
            </h4>
            <p>
              {lang === 'te'
                ? 'దరఖాస్తు నుండి సబ్సిడీ ఖాతాలో పడే వరకు అన్ని ప్రభుత్వ అనుమతులు, డిస్కామ్ టెస్టింగ్, నెట్ మీటర్ బిగింపు మా ఇంజనీరింగ్ టీమ్ ప్రత్యక్ష పర్యవేక్షణలో జరుగుతాయి.'
                : 'From digital portal registration to direct subsidy bank transfer, our seasoned engineers oversee DISCOM inspection, meter synchronization, and government compliance end-to-end.'}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
