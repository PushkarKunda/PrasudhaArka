/**
 * Clean Smooth Navigation Utility
 * Smoothly scrolls to target sections without appending '#' to the browser URL.
 */

export const scrollToSection = (target, e) => {
  if (e && e.preventDefault) {
    e.preventDefault();
  }

  const targetId = typeof target === 'string' ? target.replace(/^#/, '') : '';
  if (!targetId) return;

  if (targetId === 'home') {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return;
  }

  const element = document.getElementById(targetId);
  if (element) {
    const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;
    const headerOffset = isMobile ? 74 : 96;
    const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
    const offsetPosition = Math.max(0, elementPosition - headerOffset);

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }
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
