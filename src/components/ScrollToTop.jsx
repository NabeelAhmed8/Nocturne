import { useEffect, useState, useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ArrowUp } from 'lucide-react';

export const ScrollToTop = () => {
  const { pathname } = useLocation();
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Disable browser automatic scroll restoration and guarantee page starts at top on refresh
  useLayoutEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    const resetToTop = () => {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    };

    // Instant reset on initial mount
    resetToTop();

    // Reset before unload so browser doesn't snapshot a scrolled position
    window.addEventListener('beforeunload', resetToTop);
    window.addEventListener('load', resetToTop);

    // Guard against browsers that asynchronously restore scroll position after layout paint
    const t1 = setTimeout(resetToTop, 0);
    const t2 = setTimeout(resetToTop, 50);

    return () => {
      window.removeEventListener('beforeunload', resetToTop);
      window.removeEventListener('load', resetToTop);
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  // Automatically reset scrollbar to the very top whenever a page/route changes
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [pathname]);

  // Show floating back-to-top button when scrolled down
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 350) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <>
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          aria-label="Scroll to top"
          title="Back to top"
          className="fixed bottom-5 right-5 sm:bottom-8 sm:right-8 z-50 p-2.5 sm:p-3 bg-neutral-900/90 hover:bg-neutral-800 text-white border border-neutral-700/80 rounded-full shadow-2xl backdrop-blur-md transition-all duration-300 hover:scale-110 cursor-pointer"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      )}
    </>
  );
};

