import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  Briefcase, 
  Home, 
  Building2, 
  BatteryCharging, 
  Droplets, 
  Sun, 
  FileCheck2, 
  CheckCircle2, 
  ChevronLeft, 
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { WhatsAppIcon } from '../../common/WhatsAppIcon';
import { SERVICES } from '../../../data/services';
import { DEALERS, getWhatsAppUrl } from '../../../data/dealers';
import './ServicesSection.css';

export const ServicesSection = ({ lang, t }) => {
  const [selectedDealer, setSelectedDealer] = useState('sudhakar');
  const [itemsPerView, setItemsPerView] = useState(3);
  const N = SERVICES.length;
  const isCarouselActive = itemsPerView < N;
  const [currentIndex, setCurrentIndex] = useState(N);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const iconMap = {
    Home,
    Building2,
    BatteryCharging,
    Droplets,
    Sun,
    FileCheck2
  };

  const isAnimatingRef = useRef(false);
  const timerRef = useRef(null);

  // Determine responsive items per view
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setItemsPerView(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerView(2);
      } else {
        setItemsPerView(3);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const realIndex = isCarouselActive ? ((currentIndex % N) + N) % N : 0;

  const handleTransitionEnd = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setIsAnimating(false);
    isAnimatingRef.current = false;
    setCurrentIndex(prev => {
      if (prev >= 2 * N) {
        return prev - N;
      } else if (prev < N) {
        return prev + N;
      }
      return prev;
    });
  };

  const nextSlide = () => {
    if (isAnimatingRef.current) return;
    isAnimatingRef.current = true;
    setIsAnimating(true);
    setCurrentIndex(prev => {
      let base = prev;
      if (base >= 2 * N) {
        base = base - N;
      }
      return base + 1;
    });
  };

  const prevSlide = () => {
    if (isAnimatingRef.current) return;
    isAnimatingRef.current = true;
    setIsAnimating(true);
    setCurrentIndex(prev => {
      let base = prev;
      if (base <= N - 1) {
        base = base + N;
      }
      return base - 1;
    });
  };

  const goToSlide = (dotIdx) => {
    if (isAnimatingRef.current) return;
    isAnimatingRef.current = true;
    setIsAnimating(true);
    setCurrentIndex(N + dotIdx);
  };

  useEffect(() => {
    if (!isAnimating) return;
    timerRef.current = setTimeout(() => {
      handleTransitionEnd();
    }, 380);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [isAnimating, currentIndex]);

  // Automatic gentle carousel slide
  useEffect(() => {
    if (isPaused || !isCarouselActive) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, [isPaused, isCarouselActive, currentIndex]);

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const diff = touchStartX.current - touchEndX.current;
    if (diff > 45) {
      nextSlide();
    } else if (diff < -45) {
      prevSlide();
    }
    touchStartX.current = 0;
    touchEndX.current = 0;
  };

  const handleInquireService = (service) => {
    const title = lang === 'te' ? service.titleTe : service.titleEn;
    const msg = `*Service Inquiry: ${title}*\n` +
      `------------------------------------\n` +
      `Hello ${DEALERS[selectedDealer].name}, I would like more information and a formal quotation regarding ${title}.`;

    window.open(getWhatsAppUrl(selectedDealer, msg), '_blank');
  };

  // Gap between cards in pixels
  const gapPx = 20;

  return (
    <section className="services-section section-padding" id="services">
      <div className="container">
        {/* Section Header with Navigation Controls */}
        <div className="section-title-wrap text-center">
          <div className="section-tag">
            <Briefcase size={15} />
            <span>{t.servicesTag}</span>
          </div>
          <h2 className="section-title">{t.servicesTitle}</h2>
          <p className="section-subtitle">{t.servicesDesc}</p>
        </div>

        {/* Carousel Container */}
        <div 
          className="services-carousel-container"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Top Controls Bar */}
          <div className="carousel-top-bar">
            <div className="carousel-status-badge">
              <Sparkles size={14} className="text-gold" />
              <span>
                {lang === 'te' 
                  ? `${realIndex + 1} / ${SERVICES.length}: ${SERVICES[realIndex].titleTe}`
                  : `${realIndex + 1} of ${SERVICES.length}: ${SERVICES[realIndex].titleEn}`}
              </span>
            </div>

            <div className="carousel-nav-arrows">
              <button 
                onClick={prevSlide}
                className="carousel-arrow-btn"
                aria-label="Previous services"
                title="Previous"
              >
                <ChevronLeft size={20} />
              </button>
              <button 
                onClick={nextSlide}
                className="carousel-arrow-btn"
                aria-label="Next services"
                title="Next"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>

          {/* Carousel Viewport / Track */}
          <div className="services-carousel-viewport">
            <div 
              className={`services-carousel-track ${isAnimating ? 'carousel-track-animated' : 'carousel-track-instant'}`}
              style={{
                transform: `translateX(calc(-${currentIndex} * ((100% + ${gapPx}px) / ${itemsPerView})))`
              }}
              onTransitionEnd={handleTransitionEnd}
            >
              {[...SERVICES, ...SERVICES, ...SERVICES].map((service, sIdx) => {
                const IconComp = iconMap[service.icon] || Sun;
                return (
                  <div
                    key={`${service.id}-${sIdx}`}
                    className="services-carousel-slide"
                    style={{
                      flex: `0 0 calc((100% - ${(itemsPerView - 1) * gapPx}px) / ${itemsPerView})`
                    }}
                  >
                    <div className="service-card glassmorphism-card">
                      <div>
                        <div className="service-header">
                          <div className="service-icon-wrap">
                            <IconComp size={24} className="text-gold" />
                          </div>
                          <span className="service-badge">
                            {lang === 'te' ? service.badgeTe : service.badgeEn}
                          </span>
                        </div>

                        <h3 className="service-card-title">
                          {lang === 'te' ? service.titleTe : service.titleEn}
                        </h3>

                        <p className="service-card-desc">
                          {lang === 'te' ? service.descTe : service.descEn}
                        </p>

                        {/* Features List */}
                        <ul className="service-features-list">
                          {(lang === 'te' ? service.featuresTe : service.featuresEn).map((feat, fIdx) => (
                            <li key={fIdx}>
                              <CheckCircle2 size={14} className="text-emerald-400" />
                              <span>{feat}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Card Action */}
                      <div className="service-action">
                        <button
                          onClick={() => handleInquireService(service)}
                          className="btn btn-outline btn-sm btn-block"
                        >
                          <WhatsAppIcon size={15} />
                          <span>{lang === 'te' ? 'వివరాలు & కొటేషన్' : 'Inquire on WhatsApp'}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Bottom Pagination Dots */}
          <div className="carousel-dots-wrap">
            {SERVICES.map((_, dotIdx) => (
              <button
                key={dotIdx}
                className={`carousel-dot ${realIndex === dotIdx ? 'active' : ''}`}
                onClick={() => goToSlide(dotIdx)}
                aria-label={`Go to slide ${dotIdx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
