import { useEffect } from 'react';

// Active lock counter to handle multiple overlays gracefully without race conditions
let lockCount = 0;
let originalBodyOverflow = '';
let originalHtmlOverflow = '';

/**
 * Custom hook to freeze background scroll when a sidebar, drawer, or modal is opened.
 * Complies with SRP by isolating scroll-lock concerns into a single reusable utility hook.
 *
 * @param {boolean} isLocked - Set to true when the sidebar or navigation drawer is open
 */
export const useScrollLock = (isLocked = false) => {
  useEffect(() => {
    if (!isLocked) return;

    if (lockCount === 0) {
      originalBodyOverflow = document.body.style.overflow;
      originalHtmlOverflow = document.documentElement.style.overflow;

      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    }
    lockCount += 1;

    return () => {
      lockCount = Math.max(0, lockCount - 1);
      if (lockCount === 0) {
        document.body.style.overflow = originalBodyOverflow || '';
        document.documentElement.style.overflow = originalHtmlOverflow || '';
      }
    };
  }, [isLocked]);
};

export default useScrollLock;
