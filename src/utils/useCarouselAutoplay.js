import { useEffect, useRef, useState } from 'react';

/**
 * useCarouselAutoplay
 * Gates a carousel's auto-slide on (a) the carousel being on-screen and
 * (b) the user not preferring reduced motion. Returns `ref` to attach to the
 * carousel container and `ready` = true when autoplay should run.
 */
export function useCarouselAutoplay() {
  const ref = useRef(null);
  const [inView, setInView] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);

  // Respect prefers-reduced-motion (and react to live changes)
  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = (mq) => setReducedMotion(mq.matches);
    sync(media);
    media.addEventListener('change', sync);
    return () => media.removeEventListener('change', sync);
  }, []);

  // Only auto-slide while the carousel is actually visible
  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    if (typeof IntersectionObserver === 'undefined') {
      setInView(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin: '0px 0px 15% 0px' } // a bit of tolerance at the bottom edge
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return { ref, ready: inView && !reducedMotion };
}