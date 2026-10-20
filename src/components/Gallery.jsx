import { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Images, Play, X } from 'lucide-react';

const IMAGE_WIDTH = 1200;
const IMAGE_HEIGHT = 800;

const GALLERY_CATEGORIES = ['photos', 'videos'];

// Insert a fetch-time transformation into a Cloudinary delivery URL, e.g.
// .../upload/v123/x.jpg -> .../upload/w_800,q_auto/v123/x.jpg (free, cached).
const withCloudinaryTransform = (url, transformation) => {
  if (typeof url !== 'string') return url;
  const marker = '/upload/';
  const index = url.indexOf(marker);
  if (index === -1) return url;
  return `${url.slice(0, index + marker.length)}${transformation}/${url.slice(index + marker.length)}`;
};

const toGalleryItem = (id, data, lang, t) => {
  const isVideo = data.type === 'video';
  const mediaWord = isVideo ? t.galleryMediaVideo : t.galleryMediaPhoto;
  const customCaption = typeof data.caption === 'string' && data.caption.trim() ? data.caption.trim() : '';
  const category = typeof data.category === 'string' && data.category ? data.category : '';

  let dateLabel = '';
  const createdAt = data.createdAt;
  const date = createdAt && typeof createdAt.toDate === 'function' ? createdAt.toDate() : null;
  if (date && !Number.isNaN(date.getTime())) {
    dateLabel = ` • ${date.toLocaleDateString(lang === 'te' ? 'te-IN' : 'en-GB')}`;
  }

  return {
    id: `media-${id}`,
    mediaType: isVideo ? 'video' : 'image',
    src: withCloudinaryTransform(data.url, isVideo ? 'w_800,q_auto' : 'w_800,q_auto'),
    fullSrc: withCloudinaryTransform(data.url, 'w_1600,q_auto'),
    poster: isVideo ? withCloudinaryTransform(data.url, 'so_0,f_jpg,q_auto,w_800') : null,
    rawSrc: data.url,
    customCaption,
    category,
    title: { en: t.galleryItemTitle, te: t.galleryItemTitle },
    caption: customCaption
      ? { en: customCaption, te: customCaption }
      : { en: `${mediaWord}${dateLabel}`, te: `${mediaWord}${dateLabel}` },
  };
};

export const Gallery = ({ lang, t }) => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [items, setItems] = useState([]);
  const [loadState, setLoadState] = useState('idle'); // idle | loading | ready | error | unconfigured
  const [selectedItemId, setSelectedItemId] = useState(null);
  const sectionRef = useRef(null);
  const filterRefs = useRef([]);
  const dialogRef = useRef(null);
  const closeButtonRef = useRef(null);
  const previouslyFocusedRef = useRef(null);
  const touchStartXRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();

  // ≤600px the grid renders as a horizontal snap carousel (CSS in index.css);
  // mirror that breakpoint here so the track is keyboard-focusable only while
  // it actually scrolls sideways (WCAG 2.1.1 — a focused scroll container pans
  // with arrow keys; on desktop it's a plain grid with nothing to scroll).
  const [isCarousel, setIsCarousel] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(max-width: 600px)').matches
  );

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 600px)');
    const onChange = (event) => setIsCarousel(event.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  const categoryLabels = {
    All: t.galleryFilterAll,
    photos: t.galleryFilterPhotos,
    videos: t.galleryFilterVideos,
    residential: t.galleryCatResidential,
    commercial: t.galleryCatCommercial,
    agriculture: t.galleryCatAgriculture,
    water: t.galleryCatWater,
    storage: t.galleryCatStorage,
  };

  // Subscribe to admin-uploaded media (Firestore `gallery_media`), loading the
  // Firebase SDK only when the gallery approaches the viewport so it stays out
  // of the initial page bundle.
  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return undefined;

    let cancelled = false;
    let unsubscribe = null;

    const loadMedia = async () => {
      if (!cancelled) setLoadState('loading');
      try {
        const [{ subscribeToGalleryMedia }] = await Promise.all([
          import('../utils/galleryMedia'),
        ]);
        if (cancelled) return;
        if (!subscribeToGalleryMedia) {
          setLoadState('unconfigured');
          return;
        }
        unsubscribe = subscribeToGalleryMedia(
          (media) => {
            if (cancelled) return;
            setItems(media.map((data) => toGalleryItem(data.id, data, lang, t)));
            setLoadState('ready');
          },
          (err) => {
            console.error('Gallery media load failed:', err);
            if (!cancelled) setLoadState('error');
          },
        );
        if (!unsubscribe && !cancelled) setLoadState('unconfigured');
      } catch (err) {
        console.error('Gallery media load failed:', err);
        if (!cancelled) setLoadState('error');
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          observer.disconnect();
          loadMedia();
        }
      },
      { rootMargin: '200px' },
    );
    observer.observe(node);

    return () => {
      cancelled = true;
      observer.disconnect();
      if (unsubscribe) unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Rebuild bilingual captions when the language changes while items exist.
  useEffect(() => {
    setItems((current) => current.map((item) => {
      const mediaWord = item.mediaType === 'video' ? t.galleryMediaVideo : t.galleryMediaPhoto;
      const datePart = item.caption.en.split(' • ')[1];
      return {
        ...item,
        title: { en: t.galleryItemTitle, te: t.galleryItemTitle },
        caption: item.customCaption
          ? { en: item.customCaption, te: item.customCaption }
          : {
              en: datePart ? `${mediaWord} • ${datePart}` : mediaWord,
              te: datePart ? `${mediaWord} • ${datePart}` : mediaWord,
            },
      };
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang]);

  // Dynamic filter tabs: All, Photos, Videos + any admin-assigned categories.
  const availableCategories = useMemo(
    () => [...new Set(items.map((item) => item.category).filter(Boolean))],
    [items],
  );

  const filterCategories = useMemo(
    () => ['All', ...GALLERY_CATEGORIES, ...availableCategories],
    [availableCategories],
  );

  // If the active category's items were all removed, fall back to All.
  useEffect(() => {
    if (activeCategory !== 'All' && !filterCategories.includes(activeCategory)) {
      setActiveCategory('All');
    }
  }, [activeCategory, filterCategories]);

  const filteredItems = useMemo(() => {
    if (activeCategory === 'All') return items;
    if (activeCategory === 'photos' || activeCategory === 'videos') {
      return items.filter((item) => (activeCategory === 'videos' ? item.mediaType === 'video' : item.mediaType === 'image'));
    }
    return items.filter((item) => item.category === activeCategory);
  }, [activeCategory, items]);

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
      nextIndex = (index + 1) % filterCategories.length;
    } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
      nextIndex = (index - 1 + filterCategories.length) % filterCategories.length;
    } else if (event.key === 'Home') {
      nextIndex = 0;
    } else if (event.key === 'End') {
      nextIndex = filterCategories.length - 1;
    }

    if (nextIndex !== null) {
      event.preventDefault();
      const nextButton = filterRefs.current[nextIndex];
      nextButton?.focus();
      changeCategory(filterCategories[nextIndex]);
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

  // If a Cloudinary transformation fails, fall back to the original upload.
  const handleMediaError = (event) => {
    const element = event.currentTarget;
    const fallback = element.dataset.fallbackSrc;
    if (fallback && element.src !== fallback) {
      element.dataset.fallbackSrc = '';
      element.src = fallback;
    }
  };

  const getCounterLabel = () => t.galleryImageCounter
    .replace('{current}', String(selectedIndex + 1))
    .replace('{total}', String(filteredItems.length));

  const showEmptyState = (loadState === 'ready' || loadState === 'unconfigured') && items.length === 0;

  return (
    <section className="gallery-section section-padding" id="gallery" aria-labelledby="gallery-title" ref={sectionRef}>
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
            {filterCategories.map((category, index) => {
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
                  {categoryLabels[category] || category}
                </button>
              );
            })}
          </div>
        </div>

        {(loadState === 'idle' || loadState === 'loading') && (
          <p className="gallery-status-message" role="status">{t.galleryLoading}</p>
        )}

        {loadState === 'error' && (
          <p className="gallery-status-message" role="alert">{t.galleryErrorTitle}</p>
        )}

        {showEmptyState && (
          <div className="gallery-empty-state">
            <h3>{t.galleryEmptyTitle}</h3>
            <p>{t.galleryEmptyDesc}</p>
          </div>
        )}

        <motion.div
          className="gallery-grid"
          id="gallery-grid"
          role="tabpanel"
          aria-live="polite"
          aria-labelledby={`gallery-tab-${filterCategories.indexOf(activeCategory)}`}
          tabIndex={isCarousel ? 0 : undefined}
          layout
        >
          <AnimatePresence initial={false} mode="popLayout">
            {filteredItems.map((item) => {
              const title = item.title[lang] || item.title.en;
              const caption = item.caption[lang] || item.caption.en;
              const isVideo = item.mediaType === 'video';

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
                      src={isVideo ? item.poster : item.src}
                      data-fallback-src={item.rawSrc}
                      onError={handleMediaError}
                      alt={caption}
                      loading="lazy"
                      width={IMAGE_WIDTH}
                      height={IMAGE_HEIGHT}
                    />
                    {isVideo && (
                      <span className="gallery-card-video-badge" aria-hidden="true">
                        <Play size={14} fill="currentColor" />
                        {t.galleryBadgeVideo}
                      </span>
                    )}
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
                {selectedItem.mediaType === 'video' ? (
                  <video
                    className="gallery-lightbox-image"
                    src={selectedItem.fullSrc}
                    data-fallback-src={selectedItem.rawSrc}
                    onError={handleMediaError}
                    poster={selectedItem.poster}
                    controls
                    autoPlay
                    playsInline
                    preload="metadata"
                    width={IMAGE_WIDTH}
                    height={IMAGE_HEIGHT}
                  />
                ) : (
                  <img
                    className="gallery-lightbox-image"
                    src={selectedItem.fullSrc}
                    data-fallback-src={selectedItem.rawSrc}
                    onError={handleMediaError}
                    alt={selectedItem.caption[lang] || selectedItem.caption.en}
                    loading="lazy"
                    width={IMAGE_WIDTH}
                    height={IMAGE_HEIGHT}
                  />
                )}
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
                  {selectedItem.category
                    ? (categoryLabels[selectedItem.category] || selectedItem.category)
                    : (selectedItem.mediaType === 'video' ? t.galleryFilterVideos : t.galleryFilterPhotos)}
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
