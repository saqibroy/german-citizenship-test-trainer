import { useState } from 'react';
import { User, Mail, Lock, Save, Trash2, ArrowLeft, Edit2, Check, X } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { updatePassword, updateProfile, EmailAuthProvider, reauthenticateWithCredential } from 'firebase/auth';

interface ProfilePageProps {
  lang: 'de' | 'en';
  onNavigate: (page: string) => void;
  userName: string;
  userEmail: string;
}

export default function ProfilePage({ lang, onNavigate, userName, userEmail }: ProfilePageProps) {
  const { currentUser } = useAuth();
  const [isEditingName, setIsEditingName] = useState(false);
  const [newDisplayName, setNewDisplayName] = useState(userName);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleUpdateName = async () => {
    if (!currentUser || !newDisplayName.trim()) return;
    
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      await updateProfile(currentUser, { displayName: newDisplayName });
      setSuccess(lang === 'de' ? 'Name erfolgreich aktualisiert!' : 'Name updated successfully!');
      setIsEditingName(false);
      setTimeout(() => setSuccess(''), 3000);
    } catch (err: any) {
      setError(err.message || 'Failed to update name');
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = async () => {
    if (!currentUser || !currentUser.email) return;

    if (newPassword !== confirmPassword) {
      setError(lang === 'de' ? 'Passwörter stimmen nicht überein' : 'Passwords do not match');
      return;
    }

    if (newPassword.length < 6) {
      setError(lang === 'de' ? 'Passwort muss mindestens 6 Zeichen lang sein' : 'Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      // Re-authenticate user before changing password
      const credential = EmailAuthProvider.credential(currentUser.email, currentPassword);
      await reauthenticateWithCredential(currentUser, credential);
      
      // Update password
      await updatePassword(currentUser, newPassword);
      
      setSuccess(lang === 'de' ? 'Passwort erfolgreich geändert!' : 'Password changed successfully!');
      setIsChangingPassword(false);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err: any) {
      if (err.code === 'auth/wrong-password') {
        setError(lang === 'de' ? 'Aktuelles Passwort ist falsch' : 'Current password is incorrect');
      } else {
        setError(err.message || 'Failed to change password');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 pb-20 md:pb-6">
      <div className="max-w-2xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => onNavigate('home')}
            className="p-2 hover:bg-white rounded-lg transition-colors"
          >
            <ArrowLeft size={24} className="text-gray-600" />
          </button>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            {lang === 'de' ? 'Profil' : 'Profile'}
          </h1>
        </div>

        {/* Success/Error Messages */}
        {success && (
          <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg text-green-800">
            {success}
          </div>
        )}
        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-800">
            {error}
          </div>
        )}

        {/* Profile Avatar */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white text-3xl font-bold">
              {userName ? userName.charAt(0).toUpperCase() : 'U'}
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900">{userName || 'User'}</h2>
              <p className="text-gray-600">{userEmail}</p>
            </div>
          </div>
        </div>

        {/* Display Name Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <User className="text-indigo-600" size={24} />
              <h3 className="text-lg font-bold text-gray-900">
                {lang === 'de' ? 'Anzeigename' : 'Display Name'}
              </h3>
            </div>
            {!isEditingName && (
              <button
                onClick={() => setIsEditingName(true)}
                className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
              >
                <Edit2 size={18} />
              </button>
            )}
          </div>

          {isEditingName ? (
            <div className="space-y-3">
              <input
                type="text"
                value={newDisplayName}
                onChange={(e) => setNewDisplayName(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder={lang === 'de' ? 'Neuer Name' : 'New name'}
              />
              <div className="flex gap-2">
                <button
                  onClick={handleUpdateName}
                  disabled={loading || !newDisplayName.trim()}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 transition-colors"
                >
                  <Check size={18} />
                  {lang === 'de' ? 'Speichern' : 'Save'}
                </button>
                <button
                  onClick={() => {
                    setIsEditingName(false);
                    setNewDisplayName(userName);
                    setError('');
                  }}
                  className="px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  <X size={18} />
                </button>
              </div>
            </div>
          ) : (
            <p className="text-gray-700 text-lg">{userName}</p>
          )}
        </div>

        {/* Email Section (Read-only) */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex items-center gap-3 mb-3">
            <Mail className="text-indigo-600" size={24} />
            <h3 className="text-lg font-bold text-gray-900">Email</h3>
          </div>
          <p className="text-gray-700 text-lg">{userEmail}</p>
          <p className="text-sm text-gray-500 mt-2">
            {lang === 'de' ? 'E-Mail kann nicht geändert werden' : 'Email cannot be changed'}
          </p>
        </div>

        {/* Change Password Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Lock className="text-indigo-600" size={24} />
              <h3 className="text-lg font-bold text-gray-900">
                {lang === 'de' ? 'Passwort' : 'Password'}
              </h3>
            </div>
            {!isChangingPassword && (
              <button
                onClick={() => setIsChangingPassword(true)}
                className="px-4 py-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors font-semibold"
              >
                {lang === 'de' ? 'Ändern' : 'Change'}
              </button>
            )}
          </div>

          {isChangingPassword ? (
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {lang === 'de' ? 'Aktuelles Passwort' : 'Current Password'}
                </label>
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {lang === 'de' ? 'Neues Passwort' : 'New Password'}
                </label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {lang === 'de' ? 'Passwort bestätigen' : 'Confirm Password'}
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handleChangePassword}
                  disabled={loading || !currentPassword || !newPassword || !confirmPassword}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 transition-colors"
                >
                  <Save size={18} />
                  {lang === 'de' ? 'Passwort ändern' : 'Change Password'}
                </button>
                <button
                  onClick={() => {
                    setIsChangingPassword(false);
                    setCurrentPassword('');
                    setNewPassword('');
                    setConfirmPassword('');
                    setError('');
                  }}
                  className="px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  {lang === 'de' ? 'Abbrechen' : 'Cancel'}
                </button>
              </div>
            </div>
          ) : (
            <p className="text-gray-600">••••••••</p>
          )}
        </div>

        {/* Danger Zone */}
                {/* Danger Zone */}
        <div className="bg-red-50 border border-red-200 rounded-2xl shadow-lg p-6">
          <div className="flex items-center gap-3 mb-4">
            <Trash2 className="text-red-600" size={24} />
            <h3 className="text-lg font-bold text-red-900">
              {lang === 'de' ? 'Gefahrenzone' : 'Danger Zone'}
            </h3>
          </div>
          <p className="text-red-800 mb-4">
            {lang === 'de' 
              ? 'Lösche dein Konto permanent. Diese Aktion kann nicht rückgängig gemacht werden.' 
              : 'Permanently delete your account. This action cannot be undone.'}
          </p>
          <button
            onClick={() => alert(lang === 'de' ? 'Funktion in Entwicklung' : 'Feature in development')}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-semibold"
          >
            {lang === 'de' ? 'Konto löschen' : 'Delete Account'}
          </button>
        </div>

        {/* Developer Tools - Firestore Diagnostic */}
        <div className="bg-blue-50 border border-blue-200 rounded-2xl shadow-lg p-6 mt-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="text-2xl">🔧</div>
            <h3 className="text-lg font-bold text-blue-900">
              {lang === 'de' ? 'Entwickler-Tools' : 'Developer Tools'}
            </h3>
          </div>
          <p className="text-blue-800 mb-4 text-sm">
            {lang === 'de' 
              ? 'Teste Firestore-Operationen und diagnostiziere Sync-Probleme'
              : 'Test Firestore operations and diagnose sync issues'}
          </p>
          <button
            onClick={() => onNavigate('diagnostic')}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
          >
            🔍 {lang === 'de' ? 'Firestore-Diagnose öffnen' : 'Open Firestore Diagnostic'}
          </button>
        </div>
      </div>
    </div>
  );
}
