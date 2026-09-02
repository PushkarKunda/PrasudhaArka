import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp, Phone, X, User } from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';
import { DEALERS, getWhatsAppUrl } from '../data/dealers';

export const FloatingActions = ({ lang }) => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showDealerPopup, setShowDealerPopup] = useState(false);

  useEffect(() => {
    let ticking = false;
    let lastState = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const shouldShow = window.scrollY > 350;
          if (shouldShow !== lastState) {
            lastState = shouldShow;
            setShowScrollTop(shouldShow);
          }
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="floating-actions-container">
      {/* WhatsApp Dealer Floating Modal/Popup */}
      <AnimatePresence>
        {showDealerPopup && (
          <motion.div
            className="floating-dealer-modal"
            initial={{ opacity: 0, scale: 0.85, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 20 }}
            transition={{ duration: 0.2 }}
          >
            <div className="modal-header">
              <div className="modal-header-title">
                <WhatsAppIcon size={18} color="#25d366" />
                <h4>{lang === 'te' ? 'డీలర్‌తో వాట్సాప్‌లో మాట్లాడండి' : 'Chat on WhatsApp with Dealer'}</h4>
              </div>
              <button 
                className="close-popup-btn" 
                onClick={() => setShowDealerPopup(false)}
                aria-label="Close"
              >
                <X size={16} />
              </button>
            </div>

            <div className="dealer-popup-options">
              <div className="popup-dealer-item">
                <div className="p-avatar">KS</div>
                <div className="p-info">
                  <strong>K. Sudhakar</strong>
                  <span>Tukkuguda, Hyderabad</span>
                </div>
                <div className="popup-action-btns">
                  <a
                    href={`tel:${DEALERS.sudhakar.phone}`}
                    className="popup-icon-btn phone-btn"
                    title="Call K. Sudhakar"
                    aria-label="Call K. Sudhakar"
                  >
                    <Phone size={15} />
                  </a>
                  <a
                    href={getWhatsAppUrl('sudhakar', 'Hello Sudhakar garu, I need rooftop solar installation assistance.')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="popup-icon-btn whatsapp-btn"
                    title="WhatsApp K. Sudhakar"
                    aria-label="WhatsApp K. Sudhakar"
                  >
                    <WhatsAppIcon size={16} />
                  </a>
                </div>
              </div>

              <div className="popup-dealer-item">
                <div className="p-avatar">KB</div>
                <div className="p-info">
                  <strong>K. Bhaskar</strong>
                  <span>Nagulakatta, JMD (AP)</span>
                </div>
                <div className="popup-action-btns">
                  <a
                    href={`tel:${DEALERS.bhaskar.phone}`}
                    className="popup-icon-btn phone-btn"
                    title="Call K. Bhaskar"
                    aria-label="Call K. Bhaskar"
                  >
                    <Phone size={15} />
                  </a>
                  <a
                    href={getWhatsAppUrl('bhaskar', 'Hello Bhaskar garu, I need rooftop solar installation assistance.')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="popup-icon-btn whatsapp-btn"
                    title="WhatsApp K. Bhaskar"
                    aria-label="WhatsApp K. Bhaskar"
                  >
                    <WhatsAppIcon size={16} />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Main WhatsApp Trigger */}
      <motion.button
        className="floating-whatsapp-btn"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setShowDealerPopup(!showDealerPopup)}
        aria-label="WhatsApp Dealers"
      >
        <WhatsAppIcon size={26} />
        <span className="btn-badge-pulse"></span>
      </motion.button>

      {/* Back to top button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            className="floating-scroll-top-btn"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={scrollToTop}
            aria-label="Scroll to top"
          >
            <ArrowUp size={22} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};
