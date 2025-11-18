import { ChevronDown, ChevronUp, HelpCircle, Book, Trophy, Clock, Smartphone, Lock, Globe } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
  icon: any;
}

export default function FAQPage({ lang }: { lang: 'de' | 'en' }) {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());

  const toggleItem = (id: string) => {
    const newOpen = new Set(openItems);
    if (newOpen.has(id)) {
      newOpen.delete(id);
    } else {
      newOpen.add(id);
    }
    setOpenItems(newOpen);
  };

  const faqs: FAQItem[] = lang === 'de' ? [
    // About the App
    {
      id: 'what-is-app',
      question: 'Was ist der German Citizenship Test Trainer?',
      answer: 'Eine kostenlose Web-App, die Ihnen hilft, sich auf den deutschen Einbürgerungstest vorzubereiten. Mit 310 offiziellen Fragen, intelligenten Lernalgorithmen und Fortschrittsverfolgung.',
      category: 'Über die App',
      icon: HelpCircle
    },
    {
      id: 'how-much-cost',
      question: 'Ist die App wirklich kostenlos?',
      answer: 'Ja! Die App ist 100% kostenlos und Open Source. Keine versteckten Kosten, keine Werbung, keine Registrierung erforderlich. Alle 310 Fragen sind kostenlos verfügbar.',
      category: 'Über die App',
      icon: HelpCircle
    },
    {
      id: 'offline-work',
      question: 'Funktioniert die App offline?',
      answer: 'Ja! Installieren Sie die App als PWA (Progressive Web App) auf Ihrem Gerät. Nach dem ersten Besuch können Sie offline lernen. Ihr Fortschritt wird lokal gespeichert.',
      category: 'Über die App',
      icon: Smartphone
    },
    {
      id: 'languages',
      question: 'Welche Sprachen werden unterstützt?',
      answer: 'Die App unterstützt Deutsch und Englisch vollständig. Sie können die Sprache jederzeit in den Einstellungen oder über das Flaggensymbol in der Navigation ändern.',
      category: 'Über die App',
      icon: Globe
    },
    
    // Learning & SRS
    {
      id: 'what-is-srs',
      question: 'Was ist SRS (Spaced Repetition System)?',
      answer: 'SRS ist eine wissenschaftlich bewährte Lernmethode. Der Algorithmus zeigt Ihnen neue Fragen häufiger und wiederholt bekannte Fragen in zunehmenden Abständen. So lernen Sie effizienter und behalten Informationen länger.',
      category: 'Lernen',
      icon: Book
    },
    {
      id: 'srs-levels',
      question: 'Was bedeuten die SRS-Level (Neu, Lernen, Jung, usw.)?',
      answer: '🆕 Neu = noch nicht gesehen | 📖 Lernen = 1-2 Mal gesehen | 🌱 Jung = wird vertraut | 💪 Reif = gut bekannt | ⭐ Gemeistert = vollständig gemeistert. Fragen bewegen sich nach oben bei richtigen Antworten und nach unten bei falschen.',
      category: 'Lernen',
      icon: Book
    },
    {
      id: 'how-many-per-day',
      question: 'Wie viele Fragen sollte ich pro Tag lernen?',
      answer: 'Das hängt von Ihrer verfügbaren Zeit ab: 10 Fragen = ~5 Min (Leicht) | 20 Fragen = ~10 Min (Mäßig) | 30 Fragen = ~15 Min (Ernsthaft) | 40 Fragen = ~20 Min (Intensiv). Konsistenz ist wichtiger als Quantität!',
      category: 'Lernen',
      icon: Clock
    },
    {
      id: 'training-vs-quiz',
      question: 'Was ist der Unterschied zwischen Training und Quiz?',
      answer: 'Training = 20 Fragen mit sofortigem Feedback und Erklärungen, vom SRS-Algorithmus ausgewählt. Quiz = 33 zufällige Fragen mit Timer (wie die echte Prüfung), Ergebnisse am Ende.',
      category: 'Lernen',
      icon: Book
    },
    
    // Official Test
    {
      id: 'real-test-format',
      question: 'Wie sieht die echte Prüfung aus?',
      answer: '33 Multiple-Choice-Fragen (30 allgemein + 3 bundeslandspezifisch) | 60 Minuten Zeit | 17+ richtige Antworten zum Bestehen (51,5%) | Nur auf Deutsch | Kostet ca. 25€ | Nach dem Bestehen lebenslang gültig.',
      category: 'Offizielle Prüfung',
      icon: HelpCircle
    },
    {
      id: 'pass-score',
      question: 'Wie viele Fragen muss ich richtig beantworten?',
      answer: 'Sie benötigen mindestens 17 richtige Antworten von 33 (51,5%), um zu bestehen. Mit dieser App üben viele Nutzer, bis sie konstant 25+ erreichen, um sicher zu sein.',
      category: 'Offizielle Prüfung',
      icon: Trophy
    },
    {
      id: 'how-long-prepare',
      question: 'Wie lange sollte ich lernen?',
      answer: '6+ Monate vorher = 10 Fragen/Tag | 3-6 Monate = 20 Fragen/Tag + wöchentliche Quiz | 1-3 Monate = 30 Fragen/Tag + 2-3 Quiz/Woche | Letzter Monat = 40 Fragen/Tag + tägliche Quiz. Konsistenz ist der Schlüssel!',
      category: 'Offizielle Prüfung',
      icon: Clock
    },
    {
      id: 'who-needs-test',
      question: 'Wer muss diese Prüfung ablegen?',
      answer: 'Erforderlich für: Einbürgerungsantrag, einige Integrationskursabschlüsse. Ausnahmen: Kinder unter 16, Menschen mit Behinderungen, deutsche Schulbildung, deutsche Hochschulabschlüsse. Prüfen Sie bei Ihrer Ausländerbehörde.',
      category: 'Offizielle Prüfung',
      icon: HelpCircle
    },
    
    // Progress & Features
    {
      id: 'track-progress',
      question: 'Wie verfolge ich meinen Fortschritt?',
      answer: 'Startseite = Lernsträhne, beantwortete Fragen. Statistik-Seite = Gesamtfortschritt, Kategorieaufschlüsselung, Quiz-Verlauf, Abzeichen, SRS-Verteilungsdiagramm. Alles wird automatisch gespeichert!',
      category: 'Funktionen',
      icon: Trophy
    },
    {
      id: 'study-streak',
      question: 'Wie funktioniert die Lernsträhne?',
      answer: 'Zählt aufeinanderfolgende Tage, an denen Sie Fragen beantwortet haben. Hat eine 4-Stunden-Kulanzfrist (Lernen um 23:30 Uhr zählt bis 4 Uhr morgens für den nächsten Tag). Pause von 1 Tag = Strähne wird zurückgesetzt.',
      category: 'Funktionen',
      icon: Trophy
    },
    {
      id: 'badges-earn',
      question: 'Wie verdiene ich Abzeichen?',
      answer: '30+ Abzeichen verfügbar! Kategorien: Erste Schritte (Fragen beantworten), Richtige Antworten (Genauigkeit), Beherrschung (SRS-Level), Strähnen (täglich lernen), Quiz (bestehen), Geschwindigkeit (schnelle Antworten). Siehe alle auf der Statistik-Seite!',
      category: 'Funktionen',
      icon: Trophy
    },
    {
      id: 'vocabulary-help',
      question: 'Wie hilft der Wortschatz-Bereich?',
      answer: '150+ wichtige deutsche Begriffe im Zusammenhang mit Staatsbürgerschaft. Jeder Begriff hat: deutsche Bedeutung, englische Übersetzung, Beispielsätze. Markieren Sie Favoriten, suchen Sie nach Begriffen, verfolgen Sie den Fortschritt.',
      category: 'Funktionen',
      icon: Book
    },
    {
      id: 'grammar-lessons',
      question: 'Was beinhalten die Grammatiklektionen?',
      answer: '12 umfassende Lektionen: Satzstruktur, Verbkonjugation, Artikel, Fälle, Präpositionen, Adjektivendungen, Vergangenheit, Perfekt, Futur, Modalverben, Passiv, Konjunktionen. Alle Erklärungen auf Englisch!',
      category: 'Funktionen',
      icon: Book
    },
    
    // Data & Privacy
    {
      id: 'data-safe',
      question: 'Sind meine Daten sicher?',
      answer: 'Ja! Alle Daten bleiben auf Ihrem Gerät (localStorage). Keine Serveruploads, kein Tracking, keine Konten erforderlich. DSGVO-konform. Sie können Ihre Daten jederzeit exportieren, importieren oder löschen.',
      category: 'Datenschutz',
      icon: Lock
    },
    {
      id: 'export-data',
      question: 'Kann ich meinen Fortschritt exportieren?',
      answer: 'Ja! Einstellungen → Datenverwaltung → Meine Daten exportieren. Lädt eine JSON-Datei mit allen Fortschritten, Quiz-Verläufen, Abzeichen, Einstellungen herunter. Verwenden Sie dies für Backups oder den Wechsel von Geräten.',
      category: 'Datenschutz',
      icon: Lock
    },
    {
      id: 'import-data',
      question: 'Kann ich Daten auf ein neues Gerät übertragen?',
      answer: 'Ja! Exportieren Sie auf dem alten Gerät → Senden Sie die JSON-Datei an sich selbst → Auf neuem Gerät: Einstellungen → Datenverwaltung → Daten importieren → Wählen Sie die Datei. Alles wird wiederhergestellt!',
      category: 'Datenschutz',
      icon: Lock
    },
    
    // Troubleshooting
    {
      id: 'progress-not-saving',
      question: 'Mein Fortschritt wird nicht gespeichert. Warum?',
      answer: 'Lösungen: 1) Verwenden Sie keinen Inkognito-/Privat-Modus 2) Erlauben Sie localStorage in den Browser-Einstellungen 3) Exportieren Sie regelmäßig Daten als Backup 4) Stellen Sie sicher, dass Sie denselben Browser/Gerät verwenden.',
      category: 'Fehlerbehebung',
      icon: HelpCircle
    },
    {
      id: 'streak-not-updating',
      question: 'Meine Lernsträhne wird nicht aktualisiert.',
      answer: 'Strähne aktualisiert sich beim Beantworten von Fragen (nicht nur beim Öffnen der App). Hat eine 4-Stunden-Kulanzfrist. 1 Tag Pause = Strähne wird zurückgesetzt. Überprüfen Sie, ob Sie gestern gelernt haben.',
      category: 'Fehlerbehebung',
      icon: HelpCircle
    },
    {
      id: 'badges-not-showing',
      question: 'Ich sehe keine Abzeichen. Wo sind sie?',
      answer: 'Abzeichen erscheinen auf: 1) Startseite (neueste 3) 2) Statistik-Seite (alle). Sie müssen die erforderliche Aktion abschließen (z.B. X Fragen beantworten). Aktualisieren Sie die Seite, wenn Sie gerade ein Abzeichen verdient haben.',
      category: 'Fehlerbehebung',
      icon: Trophy
    },
    {
      id: 'app-slow',
      question: 'Die App ist langsam. Was kann ich tun?',
      answer: 'Lösungen: 1) Verwenden Sie einen modernen Browser (Chrome, Firefox, Safari) 2) Löschen Sie Browser-Cache 3) Installieren Sie als PWA für bessere Leistung 4) Schließen Sie andere Tabs 5) Aktualisieren Sie Ihren Browser.',
      category: 'Fehlerbehebung',
      icon: HelpCircle
    },
  ] : [
    // About the App
    {
      id: 'what-is-app',
      question: 'What is the German Citizenship Test Trainer?',
      answer: 'A free web app that helps you prepare for the German naturalization test (Einbürgerungstest). Features 310 official questions, intelligent learning algorithms, and progress tracking.',
      category: 'About the App',
      icon: HelpCircle
    },
    {
      id: 'how-much-cost',
      question: 'Is the app really free?',
      answer: 'Yes! The app is 100% free and open source. No hidden costs, no ads, no registration required. All 310 questions are available for free.',
      category: 'About the App',
      icon: HelpCircle
    },
    {
      id: 'offline-work',
      question: 'Does the app work offline?',
      answer: 'Yes! Install the app as a PWA (Progressive Web App) on your device. After the first visit, you can study offline. Your progress is saved locally.',
      category: 'About the App',
      icon: Smartphone
    },
    {
      id: 'languages',
      question: 'What languages are supported?',
      answer: 'The app fully supports German and English. You can switch languages anytime in Settings or via the flag icon in the navigation.',
      category: 'About the App',
      icon: Globe
    },
    
    // Learning & SRS
    {
      id: 'what-is-srs',
      question: 'What is SRS (Spaced Repetition System)?',
      answer: 'SRS is a scientifically proven learning method. The algorithm shows you new questions more frequently and reviews known questions at increasing intervals. This helps you learn more efficiently and retain information longer.',
      category: 'Learning',
      icon: Book
    },
    {
      id: 'srs-levels',
      question: 'What do the SRS levels mean (New, Learning, Young, etc.)?',
      answer: '🆕 New = haven\'t seen yet | 📖 Learning = seen 1-2 times | 🌱 Young = getting familiar | 💪 Mature = know well | ⭐ Mastered = fully mastered. Questions move up with correct answers and down with incorrect ones.',
      category: 'Learning',
      icon: Book
    },
    {
      id: 'how-many-per-day',
      question: 'How many questions should I study per day?',
      answer: 'Depends on your available time: 10 questions = ~5 min (Light) | 20 questions = ~10 min (Moderate) | 30 questions = ~15 min (Serious) | 40 questions = ~20 min (Intense). Consistency beats quantity!',
      category: 'Learning',
      icon: Clock
    },
    {
      id: 'training-vs-quiz',
      question: 'What\'s the difference between Training and Quiz?',
      answer: 'Training = 20 questions with instant feedback and explanations, selected by SRS algorithm. Quiz = 33 random questions with timer (like the real exam), results at the end.',
      category: 'Learning',
      icon: Book
    },
    
    // Official Test
    {
      id: 'real-test-format',
      question: 'What is the real exam like?',
      answer: '33 multiple-choice questions (30 general + 3 state-specific) | 60 minutes time | 17+ correct to pass (51.5%) | German only | Costs ~€25 | Valid for lifetime once passed.',
      category: 'Official Test',
      icon: HelpCircle
    },
    {
      id: 'pass-score',
      question: 'How many questions do I need to get right?',
      answer: 'You need at least 17 correct answers out of 33 (51.5%) to pass. Using this app, many users practice until they consistently score 25+ to feel confident.',
      category: 'Official Test',
      icon: Trophy
    },
    {
      id: 'how-long-prepare',
      question: 'How long should I study?',
      answer: '6+ months ahead = 10 questions/day | 3-6 months = 20 questions/day + weekly quizzes | 1-3 months = 30 questions/day + 2-3 quizzes/week | Last month = 40 questions/day + daily quizzes. Consistency is key!',
      category: 'Official Test',
      icon: Clock
    },
    {
      id: 'who-needs-test',
      question: 'Who needs to take this test?',
      answer: 'Required for: citizenship application, some integration course completions. Exemptions: children under 16, people with disabilities, German school education, German academic degrees. Check with your local Ausländerbehörde.',
      category: 'Official Test',
      icon: HelpCircle
    },
    
    // Progress & Features
    {
      id: 'track-progress',
      question: 'How do I track my progress?',
      answer: 'Homepage = study streak, questions answered. Stats page = overall progress, category breakdown, quiz history, badges, SRS distribution chart. Everything saves automatically!',
      category: 'Features',
      icon: Trophy
    },
    {
      id: 'study-streak',
      question: 'How does the study streak work?',
      answer: 'Counts consecutive days you\'ve answered questions. Has a 4-hour grace period (studying at 11:30 PM counts until 4 AM for next day). 1 day gap = streak resets.',
      category: 'Features',
      icon: Trophy
    },
    {
      id: 'badges-earn',
      question: 'How do I earn badges?',
      answer: '30+ badges available! Categories: First Steps (answer questions), Correct Answers (accuracy), Mastery (SRS levels), Streaks (daily study), Quizzes (pass), Speed (fast answers). See all on Stats page!',
      category: 'Features',
      icon: Trophy
    },
    {
      id: 'vocabulary-help',
      question: 'How does the Vocabulary section help?',
      answer: '150+ essential German terms related to citizenship. Each term has: German definition, English translation, example sentences. Mark favorites, search terms, track progress.',
      category: 'Features',
      icon: Book
    },
    {
      id: 'grammar-lessons',
      question: 'What do the Grammar Lessons include?',
      answer: '12 comprehensive lessons: Sentence Structure, Verb Conjugation, Articles, Cases, Prepositions, Adjective Endings, Past Tense, Perfect Tense, Future Tense, Modal Verbs, Passive Voice, Conjunctions. All explanations in English!',
      category: 'Features',
      icon: Book
    },
    
    // Data & Privacy
    {
      id: 'data-safe',
      question: 'Is my data safe?',
      answer: 'Yes! All data stays on your device (localStorage). No server uploads, no tracking, no accounts required. GDPR compliant. You can export, import, or delete your data anytime.',
      category: 'Privacy',
      icon: Lock
    },
    {
      id: 'export-data',
      question: 'Can I export my progress?',
      answer: 'Yes! Settings → Data Management → Export My Data. Downloads a JSON file with all progress, quiz history, badges, settings. Use this for backups or switching devices.',
      category: 'Privacy',
      icon: Lock
    },
    {
      id: 'import-data',
      question: 'Can I transfer data to a new device?',
      answer: 'Yes! Export on old device → Send JSON file to yourself → On new device: Settings → Data Management → Import Data → Choose file. Everything restores!',
      category: 'Privacy',
      icon: Lock
    },
    
    // Troubleshooting
    {
      id: 'progress-not-saving',
      question: 'My progress isn\'t saving. Why?',
      answer: 'Solutions: 1) Don\'t use incognito/private mode 2) Allow localStorage in browser settings 3) Export data regularly as backup 4) Make sure you\'re using the same browser/device.',
      category: 'Troubleshooting',
      icon: HelpCircle
    },
    {
      id: 'streak-not-updating',
      question: 'My study streak isn\'t updating.',
      answer: 'Streak updates when you answer questions (not just open app). Has 4-hour grace period. 1 day gap = streak resets. Check if you studied yesterday.',
      category: 'Troubleshooting',
      icon: HelpCircle
    },
    {
      id: 'badges-not-showing',
      question: 'I don\'t see badges. Where are they?',
      answer: 'Badges appear on: 1) Homepage (recent 3) 2) Stats page (all). You must complete the required action (e.g., answer X questions). Refresh page if you just earned a badge.',
      category: 'Troubleshooting',
      icon: Trophy
    },
    {
      id: 'app-slow',
      question: 'The app is slow. What can I do?',
      answer: 'Solutions: 1) Use a modern browser (Chrome, Firefox, Safari) 2) Clear browser cache 3) Install as PWA for better performance 4) Close other tabs 5) Update your browser.',
      category: 'Troubleshooting',
      icon: HelpCircle
    },
  ];

  const categories = Array.from(new Set(faqs.map(f => f.category)));

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 pb-24 pt-4 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 mb-8 text-white shadow-xl">
          <div className="flex items-center gap-3 mb-4">
            <HelpCircle size={40} />
            <h1 className="text-4xl font-bold">
              {lang === 'de' ? 'Häufig gestellte Fragen' : 'Frequently Asked Questions'}
            </h1>
          </div>
          <p className="text-lg opacity-90">
            {lang === 'de' 
              ? 'Finden Sie Antworten auf häufige Fragen zur App, zum Lernen und zur offiziellen Prüfung.'
              : 'Find answers to common questions about the app, learning, and the official test.'}
          </p>
        </div>

        {/* Categories */}
        <div className="mb-8 flex flex-wrap gap-2">
          {categories.map((cat) => (
            <a
              key={cat}
              href={`#${cat.toLowerCase().replace(/\s+/g, '-')}`}
              className="px-4 py-2 bg-white rounded-full shadow-md hover:shadow-lg hover:bg-indigo-50 transition-all text-sm font-medium text-gray-700 hover:text-indigo-600"
            >
              {cat}
            </a>
          ))}
        </div>

        {/* FAQ Items by Category */}
        {categories.map((category) => {
          const Icon = faqs.find(f => f.category === category)?.icon;
          return (
            <div key={category} id={category.toLowerCase().replace(/\s+/g, '-')} className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                {Icon && <Icon size={28} className="text-indigo-600" />}
                {category}
              </h2>
            
            <div className="space-y-3">
              {faqs
                .filter((faq) => faq.category === category)
                .map((faq) => (
                  <div
                    key={faq.id}
                    className="bg-white rounded-xl shadow-md overflow-hidden transition-all hover:shadow-lg"
                  >
                    <button
                      onClick={() => toggleItem(faq.id)}
                      className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                    >
                      <span className="font-semibold text-gray-800 pr-4">
                        {faq.question}
                      </span>
                      {openItems.has(faq.id) ? (
                        <ChevronUp className="text-indigo-600 flex-shrink-0" size={24} />
                      ) : (
                        <ChevronDown className="text-gray-400 flex-shrink-0" size={24} />
                      )}
                    </button>
                    
                    <AnimatePresence>
                      {openItems.has(faq.id) && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: 'easeInOut' }}
                          className="overflow-hidden"
                        >
                          <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
                            <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                              {faq.answer}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
            </div>
            </div>
          );
        })}

        {/* Still Need Help Section */}
        <div className="bg-gradient-to-r from-green-500 to-teal-500 rounded-2xl p-8 text-white shadow-xl mt-12">
          <h2 className="text-2xl font-bold mb-4">
            {lang === 'de' ? 'Immer noch Fragen?' : 'Still Have Questions?'}
          </h2>
          <p className="mb-6 opacity-90">
            {lang === 'de'
              ? 'Wenn Sie Ihre Antwort hier nicht finden können, lesen Sie die vollständige Dokumentation oder kontaktieren Sie uns.'
              : 'If you can\'t find your answer here, check the full documentation or contact us.'}
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="https://github.com/yourusername/repo"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-white text-green-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors shadow-lg"
            >
              {lang === 'de' ? '📖 Dokumentation lesen' : '📖 Read Documentation'}
            </a>
            <a
              href="https://github.com/yourusername/repo/issues"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-white bg-opacity-20 backdrop-blur-sm text-white rounded-lg font-semibold hover:bg-opacity-30 transition-colors"
            >
              {lang === 'de' ? '🐛 Problem melden' : '🐛 Report Issue'}
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <a
            href="/#home"
            className="p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition-all text-center"
          >
            <div className="text-3xl mb-2">🏠</div>
            <div className="font-semibold text-gray-800">
              {lang === 'de' ? 'Zur Startseite' : 'Go to Home'}
            </div>
          </a>
          <a
            href="/#training"
            className="p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition-all text-center"
          >
            <div className="text-3xl mb-2">📚</div>
            <div className="font-semibold text-gray-800">
              {lang === 'de' ? 'Training starten' : 'Start Training'}
            </div>
          </a>
          <a
            href="/#quiz"
            className="p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition-all text-center"
          >
            <div className="text-3xl mb-2">📝</div>
            <div className="font-semibold text-gray-800">
              {lang === 'de' ? 'Quiz machen' : 'Take Quiz'}
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}
