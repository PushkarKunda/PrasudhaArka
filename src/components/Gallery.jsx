import React, { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Images, X } from 'lucide-react';
import { GALLERY_CATEGORIES, GALLERY_ITEMS } from '../data/gallery';

const IMAGE_WIDTH = 1200;
const IMAGE_HEIGHT = 800;

export const Gallery = ({ lang, t }) => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedItemId, setSelectedItemId] = useState(null);
  const filterRefs = useRef([]);
  const dialogRef = useRef(null);
  const closeButtonRef = useRef(null);
  const previouslyFocusedRef = useRef(null);
  const touchStartXRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();

  const categoryLabels = {
    All: t.galleryFilterAll,
    'Residential Rooftop': t.galleryFilterResidential,
    'Commercial & Industrial': t.galleryFilterCommercial,
    'Battery Storage': t.galleryFilterBattery,
    'Agricultural Solar Pumps': t.galleryFilterAgricultural,
    'RO Water Plants': t.galleryFilterWater,
  };

  const filteredItems = useMemo(() => {
    if (activeCategory === 'All') return GALLERY_ITEMS;
    return GALLERY_ITEMS.filter((item) => item.category === activeCategory);
  }, [activeCategory]);

  const selectedIndex = filteredItems.findIndex((item) => item.id === selectedItemId);
  const selectedItem = selectedIndex >= 0 ? filteredItems[selectedIndex] : null;

  const animationTransition = prefersReducedMotion
    ? { duration: 0 }
    : { duration: 0.28, ease: 'easeOut' };

  const changeCategory = (category) => {
    setActiveCategory(category);
    setSelectedItemId(null);
  };

  const openLightbox = (id) => {
    previouslyFocusedRef.current = document.activeElement;
    setSelectedItemId(id);
  };

  const closeLightbox = () => setSelectedItemId(null);

  const moveLightbox = (direction) => {
    if (!filteredItems.length) return;

    setSelectedItemId((currentId) => {
      const currentIndex = filteredItems.findIndex((item) => item.id === currentId);
      const nextIndex = (currentIndex + direction + filteredItems.length) % filteredItems.length;
      return filteredItems[nextIndex].id;
    });
  };

  const handleFilterKeyDown = (event, index) => {
    let nextIndex = null;

    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
      nextIndex = (index + 1) % (GALLERY_CATEGORIES.length + 1);
    } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
      nextIndex = (index - 1 + GALLERY_CATEGORIES.length + 1) % (GALLERY_CATEGORIES.length + 1);
    } else if (event.key === 'Home') {
      nextIndex = 0;
    } else if (event.key === 'End') {
      nextIndex = GALLERY_CATEGORIES.length;
    }

    if (nextIndex !== null) {
      event.preventDefault();
      const nextButton = filterRefs.current[nextIndex];
      nextButton?.focus();
      changeCategory(nextIndex === 0 ? 'All' : GALLERY_CATEGORIES[nextIndex - 1]);
    }
  };

  useEffect(() => {
    if (!selectedItemId) return undefined;

    const previousBodyOverflow = document.body.style.overflow;
    const previousHtmlOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousHtmlOverflow;
      previouslyFocusedRef.current?.focus?.();
      previouslyFocusedRef.current = null;
    };
  }, [Boolean(selectedItemId)]);

  useEffect(() => {
    if (!selectedItem) return undefined;

    const focusCloseButton = window.requestAnimationFrame(() => {
      closeButtonRef.current?.focus();
    });

    const handleDialogKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        closeLightbox();
        return;
      }

      if (event.key === 'ArrowRight') {
        event.preventDefault();
        moveLightbox(1);
        return;
      }

      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        moveLightbox(-1);
        return;
      }

      if (event.key === 'Tab') {
        const focusableElements = dialogRef.current?.querySelectorAll(
          'button:not([disabled]), [href], [tabindex]:not([tabindex="-1"])',
        );
        if (!focusableElements?.length) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (event.shiftKey && document.activeElement === firstElement) {
          event.preventDefault();
          lastElement.focus();
        } else if (!event.shiftKey && document.activeElement === lastElement) {
          event.preventDefault();
          firstElement.focus();
        }
      }
    };

    document.addEventListener('keydown', handleDialogKeyDown);
    return () => {
      window.cancelAnimationFrame(focusCloseButton);
      document.removeEventListener('keydown', handleDialogKeyDown);
    };
  }, [selectedItemId, selectedItem]);

  const handleTouchStart = (event) => {
    touchStartXRef.current = event.changedTouches[0].clientX;
  };

  const handleTouchEnd = (event) => {
    if (touchStartXRef.current === null) return;

    const distance = event.changedTouches[0].clientX - touchStartXRef.current;
    if (Math.abs(distance) > 50) moveLightbox(distance < 0 ? 1 : -1);
    touchStartXRef.current = null;
  };

  const getCounterLabel = () => t.galleryImageCounter
    .replace('{current}', String(selectedIndex + 1))
    .replace('{total}', String(filteredItems.length));

  return (
    <section className="gallery-section section-padding" id="gallery" aria-labelledby="gallery-title">
      <div className="container">
        <div className="section-title-wrap text-center">
          <div className="section-tag">
            <Images size={15} aria-hidden="true" />
            <span>{t.galleryTag}</span>
          </div>
          <h2 className="section-title" id="gallery-title">{t.galleryTitle}</h2>
          <p className="section-subtitle">{t.galleryDescription}</p>
        </div>

        <div className="gallery-filter" role="tablist" aria-label={t.galleryFilterLabel}>
          <div className="gallery-filter-list">
            {['All', ...GALLERY_CATEGORIES].map((category, index) => {
              const isActive = activeCategory === category;
              return (
                <button
                  key={category}
                  ref={(element) => { filterRefs.current[index] = element; }}
                  type="button"
                  className={`gallery-filter-button ${isActive ? 'is-active' : ''}`}
                  role="tab"
                  id={`gallery-tab-${index}`}
                  aria-selected={isActive}
                  aria-controls="gallery-grid"
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => changeCategory(category)}
                  onKeyDown={(event) => handleFilterKeyDown(event, index)}
                >
                  {categoryLabels[category]}
                </button>
              );
            })}
          </div>
        </div>

        <motion.div
          className="gallery-grid"
          id="gallery-grid"
          role="tabpanel"
          aria-live="polite"
          aria-labelledby={`gallery-tab-${['All', ...GALLERY_CATEGORIES].indexOf(activeCategory)}`}
          layout
        >
          <AnimatePresence initial={false} mode="popLayout">
            {filteredItems.map((item) => {
              const title = item.title[lang] || item.title.en;
              const caption = item.caption[lang] || item.caption.en;

              return (
                <motion.article
                  key={item.id}
                  className="gallery-card glassmorphism-card"
                  layout
                  initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96 }}
                  transition={animationTransition}
                >
                  <button
                    type="button"
                    className="gallery-card-button"
                    onClick={() => openLightbox(item.id)}
                    aria-label={`${t.galleryOpen}: ${caption}`}
                  >
                    <img
                      className="gallery-card-image"
                      src={item.src}
                      alt={caption}
                      loading="lazy"
                      width={IMAGE_WIDTH}
                      height={IMAGE_HEIGHT}
                    />
                    <span className="gallery-card-overlay">
                      <strong className="gallery-card-title">{title}</strong>
                      <span className="gallery-card-caption">{caption}</span>
                    </span>
                  </button>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedItem && (
          <motion.div
            className="gallery-lightbox-backdrop"
            role="presentation"
            initial={prefersReducedMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={animationTransition}
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) closeLightbox();
            }}
          >
            <motion.div
              ref={dialogRef}
              className="gallery-lightbox-dialog"
              role="dialog"
              aria-modal="true"
              aria-label={t.galleryDialogLabel}
              initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: 12 }}
              transition={animationTransition}
            >
              <button
                ref={closeButtonRef}
                type="button"
                className="gallery-lightbox-close"
                onClick={closeLightbox}
                aria-label={t.galleryClose}
              >
                <X size={22} aria-hidden="true" />
              </button>

              <div
                className="gallery-lightbox-media"
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
              >
                <img
                  className="gallery-lightbox-image"
                  src={selectedItem.src}
                  alt={selectedItem.caption[lang] || selectedItem.caption.en}
                  loading="lazy"
                  width={IMAGE_WIDTH}
                  height={IMAGE_HEIGHT}
                />
                <button
                  type="button"
                  className="gallery-lightbox-control gallery-lightbox-previous"
                  onClick={() => moveLightbox(-1)}
                  aria-label={t.galleryPrevious}
                >
                  <ChevronLeft size={24} aria-hidden="true" />
                </button>
                <button
                  type="button"
                  className="gallery-lightbox-control gallery-lightbox-next"
                  onClick={() => moveLightbox(1)}
                  aria-label={t.galleryNext}
                >
                  <ChevronRight size={24} aria-hidden="true" />
                </button>
              </div>

              <div className="gallery-lightbox-details">
                <span className="gallery-lightbox-counter">{getCounterLabel()}</span>
                <h2 className="gallery-lightbox-title" id="gallery-lightbox-title">
                  {selectedItem.title[lang] || selectedItem.title.en}
                </h2>
                <p className="gallery-lightbox-caption">
                  {selectedItem.caption[lang] || selectedItem.caption.en}
                </p>
                <span className="gallery-lightbox-category">
                  {categoryLabels[selectedItem.category]}
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Gallery;
