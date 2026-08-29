import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { FAQS } from '../data/services';

export const FaqSection = ({ lang, t }) => {
  const [openIdx, setOpenIdx] = useState(0);

  const toggleFaq = (idx) => {
    setOpenIdx(openIdx === idx ? -1 : idx);
  };

  return (
    <section className="faq-section section-padding" id="faqs">
      <div className="container">
        {/* Section Header */}
        <div className="section-title-wrap text-center">
          <div className="section-tag">
            <HelpCircle size={15} />
            <span>{lang === 'te' ? 'తరచూ అడిగే ప్రశ్నలు' : 'Frequently Asked Questions'}</span>
          </div>
          <h2 className="section-title">
            {lang === 'te' ? 'సందేహాలు & సమాధానాలు' : 'Got Questions? We Have Answers'}
          </h2>
        </div>

        {/* Accordion list */}
        <div className="faq-accordion-list">
          {FAQS.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div 
                key={idx} 
                className={`faq-item glassmorphism-card ${isOpen ? 'active-faq' : ''}`}
              >
                <button 
                  className="faq-question-btn" 
                  onClick={() => toggleFaq(idx)}
                  aria-expanded={isOpen}
                >
                  <span className="question-text">
                    {lang === 'te' ? faq.qTe : faq.qEn}
                  </span>
                  <div className="faq-icon-pill">
                    {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      className="faq-answer-wrap"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <p className="faq-answer-text">
                        {lang === 'te' ? faq.aTe : faq.aEn}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
