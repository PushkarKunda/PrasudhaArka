import React, { useState, useEffect, useRef } from 'react';
import { 
  GitCommit, 
  MapPin, 
  Landmark, 
  FileText, 
  Wrench, 
  Zap, 
  CheckCircle,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { PROCESS_STEPS } from '../data/services';

export const ProcessTimeline = ({ lang, t }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(3);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const iconMap = {
    MapPin,
    Landmark,
    FileText,
    Wrench,
    Zap,
    CheckCircle
  };

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

  const maxIndex = Math.max(0, PROCESS_STEPS.length - itemsPerView);

  // Keep index within bounds
  useEffect(() => {
    if (currentIndex > maxIndex) {
      setCurrentIndex(maxIndex);
    }
  }, [maxIndex, currentIndex]);

  // Automatic gentle carousel slide
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev >= maxIndex ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, [isPaused, maxIndex]);

  const nextSlide = () => {
    setCurrentIndex(prev => (prev >= maxIndex ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex(prev => (prev <= 0 ? maxIndex : prev - 1));
  };

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

  // Gap between cards in pixels
  const gapPx = 20;

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

        {/* Carousel Container */}
        <div 
          className="process-carousel-container"
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
                  ? `దశ ${currentIndex + 1} - ${Math.min(currentIndex + itemsPerView, PROCESS_STEPS.length)} / మొత్తం ${PROCESS_STEPS.length} దశలు`
                  : `Steps ${currentIndex + 1} - ${Math.min(currentIndex + itemsPerView, PROCESS_STEPS.length)} of ${PROCESS_STEPS.length}`}
              </span>
            </div>

            <div className="carousel-nav-arrows">
              <button 
                onClick={prevSlide}
                className="carousel-arrow-btn"
                aria-label="Previous step"
                title="Previous"
              >
                <ChevronLeft size={20} />
              </button>
              <button 
                onClick={nextSlide}
                className="carousel-arrow-btn"
                aria-label="Next step"
                title="Next"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>

          {/* Carousel Viewport / Track */}
          <div className="process-carousel-viewport">
            <div 
              className="process-carousel-track"
              style={{
                transform: `translateX(calc(-${currentIndex} * ((100% + ${gapPx}px) / ${itemsPerView})))`
              }}
            >
              {PROCESS_STEPS.map((step, idx) => {
                const IconComp = iconMap[step.icon] || Zap;
                const isSelected = activeStep === idx;

                return (
                  <div
                    key={idx}
                    className="process-carousel-slide"
                    style={{
                      flex: `0 0 calc((100% - ${(itemsPerView - 1) * gapPx}px) / ${itemsPerView})`
                    }}
                  >
                    <div
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
                  </div>
                );
              })}
            </div>
          </div>

          {/* Bottom Pagination Dots */}
          <div className="carousel-dots-wrap">
            {Array.from({ length: maxIndex + 1 }).map((_, dotIdx) => (
              <button
                key={dotIdx}
                className={`carousel-dot ${currentIndex === dotIdx ? 'active' : ''}`}
                onClick={() => setCurrentIndex(dotIdx)}
                aria-label={`Go to step slide ${dotIdx + 1}`}
              />
            ))}
          </div>
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
