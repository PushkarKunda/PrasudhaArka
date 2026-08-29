import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileCheck, CheckSquare, Sparkles, Download, MessageCircle, HelpCircle } from 'lucide-react';
import { DOCUMENTS_DATA } from '../data/services';
import { DEALERS, getWhatsAppUrl } from '../data/dealers';

export const DocumentsSection = ({ lang, t }) => {
  const [activeCategory, setActiveCategory] = useState(0);

  const handleHelpWithDocs = () => {
    const msg = `*Document Assistance Inquiry*\n` +
      `------------------------------------\n` +
      `Hello Prasudharka Solar Team, I need help preparing documents for PM Surya Ghar Solar Subsidy and Bank Loan. Please guide me.`;
    window.open(getWhatsAppUrl('sudhakar', msg), '_blank');
  };

  return (
    <section className="documents-section section-padding" id="documents">
      <div className="container">
        {/* Section Header */}
        <div className="section-title-wrap text-center">
          <div className="section-tag">
            <FileCheck size={15} />
            <span>{t.docsTag}</span>
          </div>
          <h2 className="section-title">{t.docsTitle}</h2>
          <p className="section-subtitle">{t.docsDesc}</p>
        </div>

        {/* Category Tabs */}
        <div className="doc-tabs-wrapper">
          {DOCUMENTS_DATA.map((cat, idx) => (
            <button
              key={idx}
              className={`doc-tab-btn ${activeCategory === idx ? 'active' : ''}`}
              onClick={() => setActiveCategory(idx)}
            >
              <span>{lang === 'te' ? cat.categoryTe : cat.categoryEn}</span>
            </button>
          ))}
        </div>

        {/* Active Documents List Card */}
        <div 
          key={activeCategory}
          className="documents-checklist-card glassmorphism-card-glow"
        >
          <div className="doc-card-header">
            <h3>
              {lang === 'te' 
                ? DOCUMENTS_DATA[activeCategory].categoryTe 
                : DOCUMENTS_DATA[activeCategory].categoryEn}
            </h3>
            <span className="doc-count-badge">
              {DOCUMENTS_DATA[activeCategory].itemsEn.length} {lang === 'te' ? 'పత్రాలు' : 'Items'}
            </span>
          </div>

          <div className="doc-checklist-grid">
            {(lang === 'te' ? DOCUMENTS_DATA[activeCategory].itemsTe : DOCUMENTS_DATA[activeCategory].itemsEn).map((item, idx) => (
              <div key={idx} className="doc-checklist-item">
                <div className="check-icon-wrap">
                  <CheckSquare size={18} className="text-emerald-400" />
                </div>
                <span className="doc-item-text">{item}</span>
              </div>
            ))}
          </div>

          {/* Quick Help Action */}
          <div className="doc-action-bar">
            <div className="doc-support-text">
              <HelpCircle size={18} className="text-gold" />
              <span>
                {lang === 'te' 
                  ? 'మీకు ఏవైనా పత్రాల విషయంలో సందేహం ఉంటే మా టీమ్‌ను సంప్రదించండి.' 
                  : 'Need assistance preparing your documents or bank paperwork?'}
              </span>
            </div>
            <button onClick={handleHelpWithDocs} className="btn btn-outline btn-sm">
              <MessageCircle size={15} />
              <span>{lang === 'te' ? 'డాక్యుమెంట్ హెల్ప్ పొందండి' : 'Get Document Help'}</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
