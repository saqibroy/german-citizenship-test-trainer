import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// Analytics
import { inject as injectVercelAnalytics } from '@vercel/analytics';
import { injectSpeedInsights } from '@vercel/speed-insights';
import { initGA4 } from './lib/analytics';

// Initialize Vercel Analytics (page views, web vitals)
injectVercelAnalytics();

// Initialize Vercel Speed Insights (Core Web Vitals)
injectSpeedInsights();

// Initialize Google Analytics 4 (if VITE_GA_MEASUREMENT_ID is set)
initGA4();

// Register service worker for PWA and caching
if ('serviceWorker' in navigator && import.meta.env.MODE === 'production') {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .catch((error) => {
        console.error('SW registration failed:', error);
      });
  });
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
