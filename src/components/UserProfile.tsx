import { motion } from 'framer-motion';
import { User as UserIcon, LogOut, Mail, Calendar, Shield } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useBodyScrollLock } from '../hooks/useBodyScrollLock';

interface UserProfileProps {
  onClose: () => void;
}

export function UserProfile({ onClose }: UserProfileProps) {
  const { user, logout } = useAuth();

  // Lock body scroll when modal is open
  useBodyScrollLock(!!user);

  const handleLogout = async () => {
    try {
      await logout();
      onClose();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  if (!user) return null;

  const formatDate = (timestamp: string | null) => {
    if (!timestamp) return 'N/A';
    return new Date(timestamp).toLocaleDateString('de-DE', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden"
      >
        {/* Header with gradient */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-500 p-8 text-white relative overflow-hidden">
          {/* Decorative circles */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12"></div>
          
          {/* Avatar */}
          <div className="relative z-10 flex flex-col items-center">
            <div className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mb-4 border-4 border-white/30">
              {user.photoURL ? (
                <img 
                  src={user.photoURL} 
                  alt={user.displayName || 'User'} 
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                <UserIcon size={40} className="text-white" />
              )}
            </div>
            <h2 className="text-2xl font-bold mb-1">
              {user.displayName || 'Benutzer'}
            </h2>
            {user.isAnonymous && (
              <span className="bg-yellow-400/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold border border-yellow-400/30">
                🎭 Gast-Konto
              </span>
            )}
          </div>
        </div>

        {/* Info cards */}
        <div className="p-6 space-y-3">
          {/* Email */}
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-4 border border-purple-100">
            <div className="flex items-center gap-3">
              <div className="bg-purple-500 p-2 rounded-lg">
                <Mail size={20} className="text-white" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-gray-500 font-medium">E-Mail</p>
                <p className="text-sm font-semibold text-gray-900">
                  {user.email || 'Keine E-Mail'}
                </p>
              </div>
            </div>
          </div>

          {/* Member since */}
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-4 border border-blue-100">
            <div className="flex items-center gap-3">
              <div className="bg-blue-500 p-2 rounded-lg">
                <Calendar size={20} className="text-white" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-gray-500 font-medium">Mitglied seit</p>
                <p className="text-sm font-semibold text-gray-900">
                  {formatDate(user.metadata.creationTime || null)}
                </p>
              </div>
            </div>
          </div>

          {/* Last sign in */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-4 border border-green-100">
            <div className="flex items-center gap-3">
              <div className="bg-green-500 p-2 rounded-lg">
                <Shield size={20} className="text-white" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-gray-500 font-medium">Letzte Anmeldung</p>
                <p className="text-sm font-semibold text-gray-900">
                  {formatDate(user.metadata.lastSignInTime || null)}
                </p>
              </div>
            </div>
          </div>

          {/* Anonymous account upgrade prompt */}
          {user.isAnonymous && (
            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-4 border-2 border-yellow-300">
              <p className="text-sm text-gray-700 mb-3">
                💡 <strong>Tipp:</strong> Erstelle ein Konto, um deine Fortschritte dauerhaft zu speichern und auf anderen Geräten zu synchronisieren.
              </p>
              <button
                className="w-full bg-gradient-to-r from-yellow-400 to-orange-400 text-white py-2 rounded-xl font-semibold text-sm"
                onClick={() => {
                  // TODO: Implement upgrade flow
                  console.log('Upgrade account');
                }}
              >
                Konto upgraden
              </button>
            </div>
          )}

          {/* Logout button */}
          <button
            onClick={handleLogout}
            className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-colors shadow-lg hover:shadow-xl"
          >
            <LogOut size={20} />
            Abmelden
          </button>

          {/* Close button */}
          <button
            onClick={onClose}
            className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 rounded-xl font-semibold transition-colors"
          >
            Schließen
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
