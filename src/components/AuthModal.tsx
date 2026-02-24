import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, User, Eye, EyeOff, LogIn, UserPlus, AlertCircle, Chrome } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useBodyScrollLock } from '../hooks/useBodyScrollLock';

interface AuthModalProps {
  onClose: () => void;
  initialMode?: 'login' | 'signup';
}

export function AuthModal({ onClose, initialMode = 'login' }: AuthModalProps) {
  const [mode, setMode] = useState<'login' | 'signup' | 'forgot'>(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [resetSent, setResetSent] = useState(false);

  const { signup, login, loginWithGoogle, resetPassword } = useAuth();

  // Lock body scroll when modal is open
  useBodyScrollLock(true);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (mode === 'signup') {
        if (!name.trim()) {
          throw new Error('Please enter your name');
        }
        await signup(email, password, name);
        onClose();
      } else if (mode === 'login') {
        await login(email, password);
        onClose();
      } else if (mode === 'forgot') {
        await resetPassword(email);
        setResetSent(true);
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError('');
    setLoading(true);
    try {
      await loginWithGoogle();
      onClose();
    } catch (err: any) {
      setError(err.message || 'Google sign-in failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end md:items-center md:justify-center p-0 md:p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: '100%', opacity: 1 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: '100%', opacity: 0 }}
        transition={{ type: "spring", damping: 30, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
        drag="y"
        dragConstraints={{ top: 0, bottom: 0 }}
        dragElastic={{ top: 0, bottom: 0.6 }}
        onDragEnd={(_, info) => {
          if (info.offset.y > 100 || info.velocity.y > 400) {
            onClose();
          }
        }}
        className="bg-white rounded-t-3xl md:rounded-3xl shadow-2xl max-w-md w-full overflow-hidden max-h-[90vh] md:max-h-[85vh] overflow-y-auto"
      >
        {/* Mobile handle bar */}
        <div className="sticky top-0 bg-white pt-2 pb-1 flex justify-center md:hidden">
          <div className="w-12 h-1.5 bg-gray-300 rounded-full" />
        </div>
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-500 p-4 md:p-6 text-white">
          <h2 className="text-xl md:text-2xl font-bold mb-2">
            {mode === 'login' && 'Willkommen zurück!'}
            {mode === 'signup' && 'Konto erstellen'}
            {mode === 'forgot' && 'Passwort zurücksetzen'}
          </h2>
          <p className="text-purple-100 text-sm">
            {mode === 'login' && 'Melde dich an, um fortzufahren'}
            {mode === 'signup' && 'Erstelle ein Konto, um deine Fortschritte zu synchronisieren'}
            {mode === 'forgot' && 'Wir senden dir einen Link zum Zurücksetzen'}
          </p>
        </div>

        {/* Content */}
        <div className="p-4 md:p-6">
          <AnimatePresence mode="wait">
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mb-4 p-4 bg-red-50 border border-red-200 rounded-2xl flex items-start gap-3"
              >
                <AlertCircle className="text-red-500 flex-shrink-0 mt-0.5" size={20} />
                <p className="text-sm text-red-700">{error}</p>
              </motion.div>
            )}

            {resetSent && mode === 'forgot' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-4 p-4 bg-green-50 border border-green-200 rounded-2xl"
              >
                <p className="text-sm text-green-700">
                  ✅ E-Mail zum Zurücksetzen wurde gesendet! Überprüfe dein Postfach.
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name field (signup only) */}
            {mode === 'signup' && (
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Name
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors"
                    placeholder="Dein Name"
                    required
                  />
                </div>
              </div>
            )}

            {/* Email field */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                E-Mail
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors"
                  placeholder="deine@email.com"
                  required
                />
              </div>
            </div>

            {/* Password field (not for forgot) */}
            {mode !== 'forgot' && (
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Passwort
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-12 pr-12 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors"
                    placeholder="••••••••"
                    minLength={6}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                {mode === 'signup' && (
                  <p className="text-xs text-gray-500 mt-1">Mindestens 6 Zeichen</p>
                )}
              </div>
            )}

            {/* Forgot password link */}
            {mode === 'login' && (
              <div className="text-right">
                <button
                  type="button"
                  onClick={() => setMode('forgot')}
                  className="text-sm text-purple-600 hover:text-purple-700 font-medium"
                >
                  Passwort vergessen?
                </button>
              </div>
            )}

            {/* Submit button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-500 text-white py-3 md:py-3 rounded-xl font-bold text-base md:text-lg shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 touch-target-lg"
            >
              {loading ? (
                <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  {mode === 'login' && <><LogIn size={20} /> Anmelden</>}
                  {mode === 'signup' && <><UserPlus size={20} /> Registrieren</>}
                  {mode === 'forgot' && <>Link senden</>}
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          {mode !== 'forgot' && (
            <>
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-500">oder</span>
                </div>
              </div>

              {/* Google Sign In */}
              <button
                onClick={handleGoogleSignIn}
                disabled={loading}
                className="w-full bg-white border-2 border-gray-200 text-gray-700 py-3 rounded-xl font-semibold flex items-center justify-center gap-3 hover:bg-gray-50 transition-colors disabled:opacity-50 touch-target-lg"
              >
                <Chrome size={20} className="text-blue-500" />
                Mit Google fortfahren
              </button>
            </>
          )}

          {/* Switch mode */}
          <div className="mt-6 text-center">
            {mode === 'login' && (
              <p className="text-sm text-gray-600">
                Noch kein Konto?{' '}
                <button
                  onClick={() => setMode('signup')}
                  className="text-purple-600 hover:text-purple-700 font-semibold"
                >
                  Registrieren
                </button>
              </p>
            )}
            {mode === 'signup' && (
              <p className="text-sm text-gray-600">
                Bereits ein Konto?{' '}
                <button
                  onClick={() => setMode('login')}
                  className="text-purple-600 hover:text-purple-700 font-semibold"
                >
                  Anmelden
                </button>
              </p>
            )}
            {mode === 'forgot' && (
              <p className="text-sm text-gray-600">
                Zurück zur{' '}
                <button
                  onClick={() => {
                    setMode('login');
                    setResetSent(false);
                  }}
                  className="text-purple-600 hover:text-purple-700 font-semibold"
                >
                  Anmeldung
                </button>
              </p>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
