/**
 * Analytics service for tracking user visits and interactions.
 * 
 * Supports:
 * - Vercel Analytics (Web Vitals + page views) — auto-injected via component
 * - Google Analytics 4 (GA4) — manual gtag.js integration
 * 
 * GA4 Setup:
 * 1. Go to https://analytics.google.com
 * 2. Create a property for einbuergercoach.de
 * 3. Get your Measurement ID (G-XXXXXXXXXX)
 * 4. Set VITE_FIREBASE_MEASUREMENT_ID=G-XXXXXXXXXX in your .env file (or Vercel env vars)
 */

// ─── Google Analytics 4 ────────────────────────────────────────────────────────

// Check both env var names for flexibility
const GA_MEASUREMENT_ID = (import.meta.env.VITE_GA_MEASUREMENT_ID || import.meta.env.VITE_FIREBASE_MEASUREMENT_ID) as string | undefined;

let gaInitialized = false;

/**
 * Initialize Google Analytics 4 by injecting the gtag.js script.
 * Called once at app startup.
 */
export function initGA4(): void {
  if (gaInitialized) return;
  if (!GA_MEASUREMENT_ID) {
    if (import.meta.env.DEV) {
      console.warn('[Analytics] VITE_GA_MEASUREMENT_ID not set — GA4 disabled');
    }
    return;
  }

  // Inject the gtag.js script
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script);

  // Initialize the dataLayer and gtag function
  window.dataLayer = window.dataLayer || [];
  function gtag(...args: any[]) {
    window.dataLayer.push(args);
  }
  window.gtag = gtag;

  gtag('js', new Date());
  gtag('config', GA_MEASUREMENT_ID, {
    send_page_view: true,
    // Respect user privacy — anonymize IP
    anonymize_ip: true,
    // Cookie settings for GDPR
    cookie_flags: 'SameSite=None;Secure',
  });

  gaInitialized = true;

  if (import.meta.env.DEV) {
    console.log(`[Analytics] ✅ GA4 initialized with ${GA_MEASUREMENT_ID}`);
  }
}

/**
 * Track a virtual page view (for SPA navigation).
 * Call this whenever the user navigates to a new "page" in the app.
 */
export function trackPageView(pageName: string): void {
  // GA4
  if (gaInitialized && window.gtag) {
    window.gtag('event', 'page_view', {
      page_title: pageName,
      page_path: `/${pageName}`,
      page_location: `${window.location.origin}/${pageName}`,
    });
  }
}

/**
 * Track a custom event.
 */
export function trackEvent(eventName: string, params?: Record<string, any>): void {
  // GA4
  if (gaInitialized && window.gtag) {
    window.gtag('event', eventName, params);
  }
}

// ─── Type augmentation for window globals ──────────────────────────────────────

declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}
