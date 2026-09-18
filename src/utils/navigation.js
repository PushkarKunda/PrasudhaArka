/**
 * Clean Smooth Navigation Utility
 * Smoothly scrolls to target sections without appending '#' to the browser URL.
 */

/**
 * Computes the absolute scroll position (pageYOffset target) for a section id,
 * accounting for the sticky header height. Returns null when the target is
 * missing, so callers can safely fall back to nothing rather than a wild scroll.
 */
export const getSectionTop = (target) => {
  const targetId = (typeof target === 'string' ? target : '').replace(/^#/, '');
  if (!targetId) return null;

  if (targetId === 'home') return 0;

  const element = document.getElementById(targetId);
  if (!element) return null;

  // Measure the real sticky-header height instead of hardcoding breakpoints,
  // so the offset never drifts from the CSS (64px phone / 72px tablet / 92-96px desktop).
  // The header's height comes from the .navbar inside it, so offsetHeight reflects the
  // actually laid-out height at the caller's current viewport width.
  const header = document.querySelector('.site-header');
  const headerOffset = (header ? header.offsetHeight : 96) + 8;

  const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
  return Math.max(0, elementPosition - headerOffset);
};

export const scrollToSection = (target, e) => {
  if (e && e.preventDefault) {
    e.preventDefault();
  }

  const offsetPosition = getSectionTop(target);
  if (offsetPosition === null) return;

  window.scrollTo({
    top: offsetPosition,
    behavior: 'smooth'
  });
};

/**
 * Strips any incoming hash from URL on page load (e.g., #contact -> clean URL)
 * while scrolling to the requested section smoothly.
 */
export const initCleanUrlHandler = () => {
  if (typeof window === 'undefined') return;

  const rawHash = window.location.hash;
  if (rawHash) {
    const sectionId = rawHash.replace(/^#/, '');

    // Replace the URL in history without the hash immediately
    if (window.history.replaceState) {
      window.history.replaceState(null, '', window.location.pathname + window.location.search);
    }

    // Scroll to the targeted section if it exists
    setTimeout(() => {
      scrollToSection(sectionId);
    }, 150);
  }
};
