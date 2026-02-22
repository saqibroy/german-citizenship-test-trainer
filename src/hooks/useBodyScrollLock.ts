import { useEffect } from 'react';

/**
 * Custom hook to lock body scroll when a modal or overlay is open.
 * Prevents background scrolling on mobile when modals/sidebars are visible.
 * 
 * @param isLocked - Whether the body scroll should be locked
 */
export function useBodyScrollLock(isLocked: boolean) {
  useEffect(() => {
    if (!isLocked) return;

    const scrollY = window.scrollY;
    const body = document.body;
    const html = document.documentElement;

    // Save current overflow and position values
    const originalOverflow = body.style.overflow;
    const originalPosition = body.style.position;
    const originalTop = body.style.top;
    const originalWidth = body.style.width;
    const originalHtmlOverflow = html.style.overflow;

    // Lock the body scroll
    body.style.overflow = 'hidden';
    body.style.position = 'fixed';
    body.style.top = `-${scrollY}px`;
    body.style.width = '100%';
    html.style.overflow = 'hidden';

    return () => {
      // Restore original values
      body.style.overflow = originalOverflow;
      body.style.position = originalPosition;
      body.style.top = originalTop;
      body.style.width = originalWidth;
      html.style.overflow = originalHtmlOverflow;

      // Restore scroll position
      window.scrollTo(0, scrollY);
    };
  }, [isLocked]);
}
