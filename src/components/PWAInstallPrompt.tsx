import { useState, useEffect, useCallback } from 'react';
import { Download, X, Share, Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
  prompt(): Promise<void>;
}

declare global {
  interface WindowEventMap {
    beforeinstallprompt: BeforeInstallPromptEvent;
  }
}

interface PWAInstallPromptProps {
  lang: 'de' | 'en';
}

const DISMISS_KEY = 'pwa-install-dismissed';
const DISMISS_DURATION_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

function isStandalone(): boolean {
  return (
    window.matchMedia('(display-mode: standalone)').matches ||
    (window.navigator as any).standalone === true ||
    document.referrer.includes('android-app://')
  );
}

function isIOS(): boolean {
  return /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
}

function wasDismissedRecently(): boolean {
  try {
    const dismissed = localStorage.getItem(DISMISS_KEY);
    if (!dismissed) return false;
    const dismissedAt = parseInt(dismissed, 10);
    return Date.now() - dismissedAt < DISMISS_DURATION_MS;
  } catch {
    return false;
  }
}

const translations = {
  de: {
    title: 'App installieren',
    description: 'Installiere Einbürger Coach auf deinem Gerät für schnelleren Zugriff und Offline-Nutzung.',
    installButton: 'Installieren',
    dismissButton: 'Nicht jetzt',
    iosTitle: 'App installieren',
    iosDescription: 'Tippe auf',
    iosStep1: 'das Teilen-Symbol',
    iosStep2: 'und dann auf',
    iosStep3: '"Zum Home-Bildschirm"',
    installed: 'Erfolgreich installiert!',
  },
  en: {
    title: 'Install App',
    description: 'Install Einbürger Coach on your device for faster access and offline use.',
    installButton: 'Install',
    dismissButton: 'Not now',
    iosTitle: 'Install App',
    iosDescription: 'Tap',
    iosStep1: 'the Share button',
    iosStep2: 'then tap',
    iosStep3: '"Add to Home Screen"',
    installed: 'Successfully installed!',
  },
};

export function PWAInstallPrompt({ lang }: PWAInstallPromptProps) {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showBanner, setShowBanner] = useState(false);
  const [showIOSGuide, setShowIOSGuide] = useState(false);
  const [isInstalling, setIsInstalling] = useState(false);

  const t = translations[lang];

  useEffect(() => {
    // Don't show if already installed or recently dismissed
    if (isStandalone() || wasDismissedRecently()) return;

    // Handle iOS separately
    if (isIOS()) {
      // Delay showing iOS guide to not overwhelm on first visit
      const timer = setTimeout(() => {
        setShowIOSGuide(true);
      }, 5000);
      return () => clearTimeout(timer);
    }

    // Listen for beforeinstallprompt (Chrome, Edge, etc.)
    const handler = (e: BeforeInstallPromptEvent) => {
      e.preventDefault();
      setDeferredPrompt(e);
      // Small delay before showing banner
      setTimeout(() => setShowBanner(true), 3000);
    };

    window.addEventListener('beforeinstallprompt', handler);

    // Listen for successful install
    const appInstalledHandler = () => {
      setShowBanner(false);
      setDeferredPrompt(null);
    };

    window.addEventListener('appinstalled', appInstalledHandler);

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
      window.removeEventListener('appinstalled', appInstalledHandler);
    };
  }, []);

  const handleInstall = useCallback(async () => {
    if (!deferredPrompt) return;

    setIsInstalling(true);

    try {
      await deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;

      if (outcome === 'accepted') {
        setShowBanner(false);
        setDeferredPrompt(null);
      }
    } catch (err) {
      console.error('Install prompt error:', err);
    } finally {
      setIsInstalling(false);
    }
  }, [deferredPrompt]);

  const handleDismiss = useCallback(() => {
    setShowBanner(false);
    setShowIOSGuide(false);
    try {
      localStorage.setItem(DISMISS_KEY, Date.now().toString());
    } catch {
      // Ignore storage errors
    }
  }, []);

  // Chrome/Edge install banner
  if (showBanner && deferredPrompt) {
    return (
      <AnimatePresence>
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="fixed bottom-20 md:bottom-6 left-4 right-4 z-[200] max-w-lg mx-auto"
        >
          <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
            {/* Accent bar */}
            <div className="h-1 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500" />
            
            <div className="p-4">
              <div className="flex items-start gap-3">
                {/* App icon */}
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-700 flex items-center justify-center shadow-lg">
                  <img src="/icon.svg" alt="" className="w-8 h-8" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-bold text-gray-900 text-sm">{t.title}</h3>
                      <p className="text-gray-500 text-xs mt-0.5 leading-relaxed">{t.description}</p>
                    </div>
                    <button
                      onClick={handleDismiss}
                      className="flex-shrink-0 p-1 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
                      aria-label="Close"
                    >
                      <X size={16} />
                    </button>
                  </div>

                  <div className="flex items-center gap-2 mt-3">
                    <button
                      onClick={handleInstall}
                      disabled={isInstalling}
                      className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl py-2.5 px-4 text-sm font-semibold hover:from-indigo-700 hover:to-purple-700 active:scale-[0.98] transition-all shadow-md disabled:opacity-70"
                    >
                      {isInstalling ? (
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                      ) : (
                        <Download size={16} />
                      )}
                      {t.installButton}
                    </button>
                    <button
                      onClick={handleDismiss}
                      className="px-4 py-2.5 text-sm font-medium text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-xl transition-colors"
                    >
                      {t.dismissButton}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    );
  }

  // iOS install guide
  if (showIOSGuide) {
    return (
      <AnimatePresence>
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="fixed bottom-20 md:bottom-6 left-4 right-4 z-[200] max-w-lg mx-auto"
        >
          <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
            <div className="h-1 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500" />
            
            <div className="p-4">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-700 flex items-center justify-center shadow-lg">
                  <img src="/icon.svg" alt="" className="w-8 h-8" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-bold text-gray-900 text-sm">{t.iosTitle}</h3>
                    <button
                      onClick={handleDismiss}
                      className="flex-shrink-0 p-1 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
                      aria-label="Close"
                    >
                      <X size={16} />
                    </button>
                  </div>

                  <div className="mt-2 flex items-center gap-1.5 text-xs text-gray-600 flex-wrap">
                    <span>{t.iosDescription}</span>
                    <span className="inline-flex items-center gap-0.5 bg-gray-100 rounded px-1.5 py-0.5 font-medium text-gray-700">
                      <Share size={12} />
                      {t.iosStep1}
                    </span>
                    <span>{t.iosStep2}</span>
                    <span className="inline-flex items-center gap-0.5 bg-gray-100 rounded px-1.5 py-0.5 font-medium text-gray-700">
                      <Plus size={12} />
                      {t.iosStep3}
                    </span>
                  </div>

                  <button
                    onClick={handleDismiss}
                    className="mt-3 w-full text-center text-xs font-medium text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {t.dismissButton}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    );
  }

  return null;
}
