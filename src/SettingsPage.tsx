import { useState, useEffect, useRef } from 'react';
import { 
  Settings, Calendar, Target, Download, Upload, Trash2, 
  Save, Info, User, Cloud, CloudOff, LogIn
} from 'lucide-react';
import { useAuth } from './contexts/AuthContext';
import { UserProfile } from './components/UserProfile';
import { AuthModal } from './components/AuthModal';

interface SettingsPageProps {
  lang: 'de' | 'en';
  setPage?: (page: string) => void;
}

interface SettingsData {
  examDate: string;
  dailyGoal: number;
  notifications: boolean;
}

export function SettingsPage({ lang, setPage }: SettingsPageProps) {
  const { user } = useAuth();
  const [settings, setSettings] = useState<SettingsData>({
    examDate: '2025-12-02',
    dailyGoal: 20,
    notifications: false
  });
  const [saved, setSaved] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Load settings from localStorage
    const savedSettings = localStorage.getItem('appSettings');
    if (savedSettings) {
      try {
        setSettings(JSON.parse(savedSettings));
      } catch (e) {
        console.error('Error loading settings:', e);
      }
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem('appSettings', JSON.stringify(settings));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleExportData = () => {
    // Gather all data
    const exportData: {
      progress: Record<string, any>;
      quizHistory: any[];
      badges: any[];
      studyStreak: any;
      vocabProgress: any;
      favoriteVocab: any[];
      settings: SettingsData;
      exportDate: string;
    } = {
      progress: {},
      quizHistory: [],
      badges: [],
      studyStreak: {},
      vocabProgress: {},
      favoriteVocab: [],
      settings: settings,
      exportDate: new Date().toISOString()
    };

    // Get data from localStorage
    Object.keys(localStorage).forEach(key => {
      if (key.startsWith('q_')) {
        const qId = key.replace('q_', '');
        try {
          exportData.progress[qId] = JSON.parse(localStorage.getItem(key) || '{}');
        } catch (e) {
          console.error(`Error parsing ${key}:`, e);
        }
      }
    });

    const quizHistory = localStorage.getItem('quizHistory');
    if (quizHistory) exportData.quizHistory = JSON.parse(quizHistory);

    const badges = localStorage.getItem('badges');
    if (badges) exportData.badges = JSON.parse(badges);

    const studyStreak = localStorage.getItem('studyStreak');
    if (studyStreak) exportData.studyStreak = JSON.parse(studyStreak);

    const vocabProgress = localStorage.getItem('vocabProgress');
    if (vocabProgress) exportData.vocabProgress = JSON.parse(vocabProgress);

    const favoriteVocab = localStorage.getItem('favoriteVocab');
    if (favoriteVocab) exportData.favoriteVocab = JSON.parse(favoriteVocab);

    // Create download
    const dataStr = JSON.stringify(exportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `german-citizenship-test-backup-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleImportData = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const importedData = JSON.parse(e.target?.result as string);
        
        // Validate imported data structure
        if (!importedData.exportDate) {
          throw new Error('Invalid backup file format');
        }

        // Confirm import
        if (!window.confirm(
          lang === 'de' 
            ? `Möchten Sie Daten vom ${new Date(importedData.exportDate).toLocaleDateString()} importieren? Dies überschreibt Ihre aktuellen Daten!`
            : `Do you want to import data from ${new Date(importedData.exportDate).toLocaleDateString()}? This will overwrite your current data!`
        )) {
          return;
        }

        // Import progress data
        if (importedData.progress) {
          Object.keys(importedData.progress).forEach(qId => {
            localStorage.setItem(`q_${qId}`, JSON.stringify(importedData.progress[qId]));
          });
        }

        // Import other data
        if (importedData.quizHistory) {
          localStorage.setItem('quizHistory', JSON.stringify(importedData.quizHistory));
        }
        if (importedData.badges) {
          localStorage.setItem('badges', JSON.stringify(importedData.badges));
        }
        if (importedData.studyStreak) {
          localStorage.setItem('studyStreak', JSON.stringify(importedData.studyStreak));
        }
        if (importedData.vocabProgress) {
          localStorage.setItem('vocabProgress', JSON.stringify(importedData.vocabProgress));
        }
        if (importedData.favoriteVocab) {
          localStorage.setItem('favoriteVocab', JSON.stringify(importedData.favoriteVocab));
        }
        if (importedData.settings) {
          localStorage.setItem('appSettings', JSON.stringify(importedData.settings));
          setSettings(importedData.settings);
        }

        alert(
          lang === 'de' 
            ? 'Daten erfolgreich importiert! Die Seite wird neu geladen...'
            : 'Data imported successfully! The page will reload...'
        );
        
        // Reload to refresh all components with new data
        setTimeout(() => window.location.reload(), 1000);
      } catch (error) {
        console.error('Import error:', error);
        alert(
          lang === 'de'
            ? 'Fehler beim Importieren der Daten. Bitte überprüfen Sie die Datei.'
            : 'Error importing data. Please check the file.'
        );
      }
    };
    reader.readAsText(file);
    
    // Reset file input
    if (event.target) {
      event.target.value = '';
    }
  };

  const handleClearData = () => {
    if (window.confirm(lang === 'de' 
      ? 'Möchten Sie wirklich alle Daten löschen? Dies kann nicht rückgängig gemacht werden!' 
      : 'Are you sure you want to delete all data? This cannot be undone!')) {
      
      // Clear all app data
      Object.keys(localStorage).forEach(key => {
        if (key.startsWith('q_') || ['quizHistory', 'badges', 'studyStreak', 'vocabProgress', 'favoriteVocab'].includes(key)) {
          localStorage.removeItem(key);
        }
      });
      
      alert(lang === 'de' 
        ? 'Alle Daten wurden gelöscht. Bitte laden Sie die Seite neu.' 
        : 'All data has been deleted. Please reload the page.');
    }
  };

  const daysUntilExam = settings.examDate 
    ? Math.ceil((new Date(settings.examDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
    : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-4">
      <div className="max-w-2xl lg:max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-gradient-to-br from-indigo-600 to-purple-600 text-white rounded-2xl p-6 shadow-xl">
          <div className="flex items-center gap-3 mb-2">
            <Settings size={28} />
            <h2 className="text-2xl font-bold">{lang === 'de' ? 'Einstellungen' : 'Settings'}</h2>
          </div>
          <p className="opacity-90 text-sm">
            {lang === 'de' ? 'Personalisiere deine Lern-Erfahrung' : 'Personalize your learning experience'}
          </p>
        </div>

        {/* Account Management Section */}
        {user && (
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center gap-3 mb-4">
              <User className="text-indigo-600" size={24} />
              <h3 className="text-lg font-bold text-gray-800">
                {lang === 'de' ? 'Konto' : 'Account'}
              </h3>
            </div>
            <button
              onClick={() => setShowProfile(true)}
              className="w-full bg-indigo-500 hover:bg-indigo-600 text-white py-3 rounded-xl font-bold shadow-md transition-all min-h-[44px]"
            >
              {lang === 'de' ? 'Konto verwalten' : 'Manage Account'}
            </button>
            
            {/* Sync Status */}
            <div className="mt-4 bg-green-50 border border-green-200 rounded-xl p-4">
              <div className="flex items-center gap-2">
                <Cloud className="text-green-600" size={20} />
                <p className="text-sm text-green-800 font-semibold">
                  {lang === 'de' 
                    ? 'Daten werden automatisch synchronisiert' 
                    : 'Data automatically synced'}
                </p>
              </div>
              <p className="text-xs text-green-700 mt-2">
                {lang === 'de' 
                  ? 'Dein Fortschritt wird automatisch in der Cloud gespeichert. Du kannst von jedem Gerät darauf zugreifen.' 
                  : 'Your progress is automatically saved to the cloud. You can access it from any device.'}
              </p>
            </div>
          </div>
        )}

        {/* Offline Mode Info */}
        {!user && (
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-indigo-200">
            <div className="flex items-center gap-3 mb-4">
              <CloudOff className="text-gray-500" size={24} />
              <h3 className="text-lg font-bold text-gray-700">
                {lang === 'de' ? 'Offline-Modus' : 'Offline Mode'}
              </h3>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              {lang === 'de' 
                ? 'Sie verwenden die App derzeit ohne Konto. Ihre Daten werden nur lokal auf diesem Gerät gespeichert.' 
                : 'You are currently using the app without an account. Your data is only stored locally on this device.'}
            </p>
            <button
              onClick={() => setShowAuthModal(true)}
              className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white py-3 rounded-xl font-bold shadow-md transition-all min-h-[44px] flex items-center justify-center gap-2"
            >
              <LogIn size={20} />
              {lang === 'de' ? 'Jetzt anmelden' : 'Login Now'}
            </button>
            <p className="text-xs text-gray-500 mt-3 text-center">
              {lang === 'de' 
                ? 'Erstellen Sie ein Konto, um Ihre Daten geräteübergreifend zu synchronisieren.' 
                : 'Create an account to sync your data across devices.'}
            </p>
          </div>
        )}

        {/* Exam Date & Daily Goal - Side by side on desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Exam Date Setting */}
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center gap-3 mb-4">
              <Calendar className="text-indigo-600" size={24} />
              <h3 className="text-lg font-bold text-gray-800">
                {lang === 'de' ? 'Prüfungsdatum' : 'Exam Date'}
              </h3>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              {lang === 'de' 
                ? 'Legen Sie Ihr Prüfungsdatum fest, um personalisierte Lernpläne zu erhalten.' 
                : 'Set your exam date to get personalized study plans.'}
            </p>
            <div className="space-y-3">
              <input 
                type="date" 
                value={settings.examDate}
                onChange={(e) => setSettings({ ...settings, examDate: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-indigo-500 focus:outline-none text-lg font-semibold"
              />
              {daysUntilExam !== null && (
                <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-4">
                  <p className="text-center">
                    <span className="text-3xl font-bold text-indigo-600">{daysUntilExam}</span>
                    <span className="text-gray-700 ml-2">
                      {lang === 'de' ? 'Tage bis zur Prüfung' : 'days until exam'}
                    </span>
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Daily Goal Setting */}
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center gap-3 mb-4">
              <Target className="text-purple-600" size={24} />
              <h3 className="text-lg font-bold text-gray-800">
                {lang === 'de' ? 'Tägliches Ziel' : 'Daily Goal'}
              </h3>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              {lang === 'de' 
                ? 'Wie viele neue Fragen möchten Sie pro Tag lernen?' 
                : 'How many new questions do you want to learn per day?'}
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-4">
                <input 
                  type="range" 
                  min="5" 
                  max="50" 
                  step="5"
                  value={settings.dailyGoal}
                  onChange={(e) => setSettings({ ...settings, dailyGoal: parseInt(e.target.value) })}
                  className="flex-1"
                />
                <div className="bg-purple-100 border border-purple-300 rounded-xl px-6 py-2 min-w-[80px] text-center">
                  <span className="text-2xl font-bold text-purple-600">{settings.dailyGoal}</span>
                </div>
              </div>
              <p className="text-sm text-gray-600">
                {lang === 'de' 
                  ? `Mit ${settings.dailyGoal} Fragen pro Tag können Sie in ${Math.ceil(300 / settings.dailyGoal)} Tagen fertig sein.` 
                  : `With ${settings.dailyGoal} questions per day, you can finish in ${Math.ceil(300 / settings.dailyGoal)} days.`}
              </p>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <button 
          onClick={handleSave}
          className={`w-full py-4 rounded-xl font-bold shadow-lg flex items-center justify-center gap-2 transition-all ${
            saved 
              ? 'bg-green-500 text-white' 
              : 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:shadow-xl'
          }`}
        >
          {saved ? (
            <>
              <Info size={20} />
              {lang === 'de' ? 'Gespeichert!' : 'Saved!'}
            </>
          ) : (
            <>
              <Save size={20} />
              {lang === 'de' ? 'Einstellungen speichern' : 'Save Settings'}
            </>
          )}
        </button>

        {/* Data Management */}
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <h3 className="text-lg font-bold text-gray-800 mb-4">
            {lang === 'de' ? 'Datenverwaltung' : 'Data Management'}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
            {/* Export Data */}
            <button 
              onClick={handleExportData}
              className="bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-xl font-bold shadow-md flex items-center justify-center gap-2 transition-all min-h-[44px]"
            >
              <Download size={20} />
              {lang === 'de' ? 'Exportieren' : 'Export Data'}
            </button>
            
            {/* Import Data */}
            <div>
              <input
                ref={fileInputRef}
                type="file"
                accept=".json"
                onChange={handleImportData}
                className="hidden"
                id="import-data-input"
              />
              <label htmlFor="import-data-input">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-xl font-bold shadow-md flex items-center justify-center gap-2 transition-all min-h-[44px]"
                >
                  <Upload size={20} />
                  {lang === 'de' ? 'Importieren' : 'Import Data'}
                </button>
              </label>
            </div>

            {/* Delete Data */}
            <button 
              onClick={handleClearData}
              className="bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl font-bold shadow-md flex items-center justify-center gap-2 transition-all min-h-[44px]"
            >
              <Trash2 size={20} />
              {lang === 'de' ? 'Daten löschen' : 'Delete All'}
            </button>
          </div>

          <p className="text-xs text-gray-500">
            {lang === 'de' 
              ? 'DSGVO-konform: Exportieren, importieren oder löschen Sie Ihre Daten jederzeit. Ihre Daten bleiben auf Ihrem Gerät.' 
              : 'GDPR Compliant: Export, import, or delete your data at any time. Your data stays on your device.'}
          </p>
        </div>

        {/* Quick Links - Combined Help & Learning Areas */}
        {setPage && (
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <h3 className="text-lg font-bold text-gray-800 mb-4">
              {lang === 'de' ? 'Weitere Bereiche' : 'Quick Links'}
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <button
                onClick={() => setPage('vocab')}
                className="bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-800 py-3 rounded-xl font-semibold transition-all min-h-[44px] text-sm"
              >
                {lang === 'de' ? 'Vokabeln' : 'Vocabulary'}
              </button>
              <button
                onClick={() => setPage('cards')}
                className="bg-orange-50 hover:bg-orange-100 border border-orange-200 text-orange-800 py-3 rounded-xl font-semibold transition-all min-h-[44px] text-sm"
              >
                {lang === 'de' ? 'Lernkarten' : 'Flashcards'}
              </button>
              <button
                onClick={() => setPage('faq')}
                className="bg-blue-50 hover:bg-blue-100 border border-blue-200 text-blue-800 py-3 rounded-xl font-semibold transition-all min-h-[44px] text-sm"
              >
                {lang === 'de' ? 'FAQ' : 'FAQ'}
              </button>
              <button
                onClick={() => setPage('landing')}
                className="bg-purple-50 hover:bg-purple-100 border border-purple-200 text-purple-800 py-3 rounded-xl font-semibold transition-all min-h-[44px] text-sm"
              >
                {lang === 'de' ? 'Über die App' : 'About'}
              </button>
            </div>
          </div>
        )}

        {/* App Info */}
        <div className="bg-gray-50 rounded-2xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center gap-3 mb-3">
            <Info className="text-gray-500" size={20} />
            <h3 className="text-base font-bold text-gray-700">
              {lang === 'de' ? 'App-Info' : 'App Info'}
            </h3>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm text-gray-600">
            <div>
              <p className="text-xs text-gray-400">{lang === 'de' ? 'Version' : 'Version'}</p>
              <p className="font-semibold">1.0.0</p>
            </div>
            <div>
              <p className="text-xs text-gray-400">{lang === 'de' ? 'Fragen' : 'Questions'}</p>
              <p className="font-semibold">310</p>
            </div>
            <div>
              <p className="text-xs text-gray-400">{lang === 'de' ? 'Vokabeln' : 'Vocabulary'}</p>
              <p className="font-semibold">150+</p>
            </div>
            <div>
              <p className="text-xs text-gray-400">{lang === 'de' ? 'Lektionen' : 'Lessons'}</p>
              <p className="font-semibold">12</p>
            </div>
          </div>
        </div>
      </div>

      {/* User Profile Modal */}
      {showProfile && (
        <UserProfile 
          onClose={() => setShowProfile(false)}
        />
      )}

      {/* Auth Modal */}
      {showAuthModal && (
        <AuthModal onClose={() => setShowAuthModal(false)} />
      )}
    </div>
  );
}
