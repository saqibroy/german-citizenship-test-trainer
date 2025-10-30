import React, { useState } from 'react';
import { X, Brain, Target, Calendar, Award, ArrowRight, ArrowLeft, CalendarDays, TrendingUp } from 'lucide-react';
import { safeSetItem } from '../utils/storage';

interface OnboardingModalProps {
  onComplete: () => void;
  lang: 'de' | 'en';
}

const ONBOARDING_STEPS = {
  en: [
    {
      title: "Welcome to German Citizenship Test Trainer! 🇩🇪",
      icon: Brain,
      content: (
        <>
          <p className="mb-3">Master all 310 questions for your German citizenship test using our intelligent learning system.</p>
          <p className="font-medium text-indigo-700">Smart, Efficient, Exam-Ready!</p>
        </>
      )
    },
    {
      title: "Spaced Repetition System (SRS)",
      icon: Calendar,
      content: (
        <>
          <p className="mb-3">Our AI-powered algorithm shows you questions exactly when you need to review them:</p>
          <ul className="list-disc list-inside space-y-2 text-sm">
            <li><span className="font-medium">New:</span> Questions you haven't seen yet</li>
            <li><span className="font-medium">Learning:</span> Review in 10 minutes → 1 day</li>
            <li><span className="font-medium">Young:</span> Review every 1-3 days</li>
            <li><span className="font-medium">Mature:</span> Review every 3-5 days</li>
            <li><span className="font-medium">Mastered:</span> Review every 5-7 days</li>
          </ul>
          <p className="mt-3 text-sm text-gray-600">Optimized for your exam - no question waits more than 7 days!</p>
        </>
      )
    },
    {
      title: "Your Learning Modes",
      icon: Target,
      content: (
        <>
          <p className="mb-3">Choose how you want to study:</p>
          <div className="space-y-3 text-sm">
            <div className="bg-blue-50 p-3 rounded-lg">
              <p className="font-medium text-blue-900">📚 Training Mode</p>
              <p className="text-blue-700">Practice 20-40 questions with instant feedback</p>
            </div>
            <div className="bg-purple-50 p-3 rounded-lg">
              <p className="font-medium text-purple-900">📝 Quiz Mode</p>
              <p className="text-purple-700">Take the official 33-question exam (17 needed to pass)</p>
            </div>
            <div className="bg-green-50 p-3 rounded-lg">
              <p className="font-medium text-green-900">🎴 Cards Mode</p>
              <p className="text-green-700">Flip through flashcards at your own pace</p>
            </div>
            <div className="bg-orange-50 p-3 rounded-lg">
              <p className="font-medium text-orange-900">📖 Vocabulary</p>
              <p className="text-orange-700">Learn essential German citizenship terms</p>
            </div>
          </div>
        </>
      )
    },
    {
      title: "Track Your Progress & Earn Badges",
      icon: Award,
      content: (
        <>
          <p className="mb-3">Stay motivated as you learn:</p>
          <ul className="list-disc list-inside space-y-2 text-sm">
            <li><span className="font-medium">Daily Streaks:</span> Build consistency with daily study</li>
            <li><span className="font-medium">Performance Stats:</span> See your improvement over time</li>
            <li><span className="font-medium">30+ Badges:</span> Unlock achievements as you progress</li>
            <li><span className="font-medium">Category Mastery:</span> Track progress by topic area</li>
          </ul>
          <div className="mt-4 bg-gradient-to-r from-yellow-50 to-amber-50 p-3 rounded-lg border border-yellow-200">
            <p className="text-sm font-medium text-amber-900">🎯 Your Goal: Pass with 17+ correct answers!</p>
          </div>
        </>
      )
    },
    {
      title: "Set Your Exam Date",
      icon: CalendarDays,
      content: (
        <>
          <p className="mb-4">When is your citizenship test scheduled?</p>
          <p className="text-sm text-gray-600 mb-4">We'll help you prepare with a personalized study plan.</p>
          <div className="space-y-3">
            <input
              type="date"
              id="examDate"
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none text-lg"
              min={new Date().toISOString().split('T')[0]}
            />
            <button
              onClick={() => {
                const input = document.getElementById('examDate') as HTMLInputElement;
                if (input && input.value) {
                  const today = new Date();
                  const examDate = new Date(input.value);
                  const daysUntilExam = Math.ceil((examDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
                  
                  if (daysUntilExam > 0) {
                    const result = document.getElementById('examDateResult');
                    if (result) {
                      result.innerHTML = `<div class="bg-green-50 p-3 rounded-lg border border-green-200 text-green-800">
                        <p class="font-medium">✓ Exam date set!</p>
                        <p class="text-sm">${daysUntilExam} days to prepare</p>
                      </div>`;
                    }
                    safeSetItem('examDate', input.value);
                    safeSetItem('daysUntilExam', daysUntilExam);
                  }
                }
              }}
              className="w-full bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Set Exam Date
            </button>
            <div id="examDateResult"></div>
            <p className="text-xs text-gray-500 text-center">You can skip this and set it later in Settings</p>
          </div>
        </>
      )
    },
    {
      title: "Choose Your Daily Goal",
      icon: TrendingUp,
      content: (
        <>
          <p className="mb-4">How many questions do you want to practice each day?</p>
          <p className="text-sm text-gray-600 mb-4">Consistency is key! Start with a manageable goal.</p>
          <div className="grid grid-cols-2 gap-3">
            {[
              { value: 10, label: 'Light', desc: '~5 minutes/day', color: 'from-blue-500 to-blue-600' },
              { value: 20, label: 'Moderate', desc: '~10 minutes/day', color: 'from-green-500 to-green-600' },
              { value: 30, label: 'Serious', desc: '~15 minutes/day', color: 'from-orange-500 to-orange-600' },
              { value: 40, label: 'Intense', desc: '~20 minutes/day', color: 'from-red-500 to-red-600' }
            ].map(goal => (
              <button
                key={goal.value}
                onClick={() => {
                  safeSetItem('dailyGoal', goal.value);
                  const buttons = document.querySelectorAll('.daily-goal-btn');
                  buttons.forEach(btn => btn.classList.remove('ring-4', 'ring-indigo-300'));
                  const clickedBtn = document.getElementById(`goal-${goal.value}`);
                  if (clickedBtn) {
                    clickedBtn.classList.add('ring-4', 'ring-indigo-300');
                  }
                  const result = document.getElementById('dailyGoalResult');
                  if (result) {
                    result.innerHTML = `<div class="bg-green-50 p-3 rounded-lg border border-green-200 text-green-800 text-center">
                      <p class="font-medium">✓ Goal set: ${goal.value} questions/day</p>
                    </div>`;
                  }
                }}
                id={`goal-${goal.value}`}
                className={`daily-goal-btn bg-gradient-to-r ${goal.color} text-white p-4 rounded-lg hover:opacity-90 transition-all transform hover:scale-105`}
              >
                <div className="text-3xl font-bold">{goal.value}</div>
                <div className="text-sm font-medium mt-1">{goal.label}</div>
                <div className="text-xs opacity-90 mt-1">{goal.desc}</div>
              </button>
            ))}
          </div>
          <div id="dailyGoalResult" className="mt-3"></div>
          <p className="text-xs text-gray-500 text-center mt-3">You can change this anytime in Settings</p>
        </>
      )
    }
  ],
  de: [
    {
      title: "Willkommen beim Einbürgerungstest-Trainer! 🇩🇪",
      icon: Brain,
      content: (
        <>
          <p className="mb-3">Meistere alle 310 Fragen für deinen Einbürgerungstest mit unserem intelligenten Lernsystem.</p>
          <p className="font-medium text-indigo-700">Smart, Effizient, Prüfungsbereit!</p>
        </>
      )
    },
    {
      title: "Spaced Repetition System (SRS)",
      icon: Calendar,
      content: (
        <>
          <p className="mb-3">Unser KI-gesteuerter Algorithmus zeigt dir Fragen genau dann, wenn du sie wiederholen musst:</p>
          <ul className="list-disc list-inside space-y-2 text-sm">
            <li><span className="font-medium">Neu:</span> Fragen, die du noch nicht gesehen hast</li>
            <li><span className="font-medium">Lernen:</span> Wiederholung in 10 Minuten → 1 Tag</li>
            <li><span className="font-medium">Jung:</span> Wiederholung alle 1-3 Tage</li>
            <li><span className="font-medium">Ausgereift:</span> Wiederholung alle 3-5 Tage</li>
            <li><span className="font-medium">Gemeistert:</span> Wiederholung alle 5-7 Tage</li>
          </ul>
          <p className="mt-3 text-sm text-gray-600">Optimiert für deine Prüfung - keine Frage wartet länger als 7 Tage!</p>
        </>
      )
    },
    {
      title: "Deine Lernmodi",
      icon: Target,
      content: (
        <>
          <p className="mb-3">Wähle, wie du lernen möchtest:</p>
          <div className="space-y-3 text-sm">
            <div className="bg-blue-50 p-3 rounded-lg">
              <p className="font-medium text-blue-900">📚 Training-Modus</p>
              <p className="text-blue-700">Übe 20-40 Fragen mit sofortigem Feedback</p>
            </div>
            <div className="bg-purple-50 p-3 rounded-lg">
              <p className="font-medium text-purple-900">📝 Quiz-Modus</p>
              <p className="text-purple-700">Mache den offiziellen 33-Fragen-Test (17 benötigt zum Bestehen)</p>
            </div>
            <div className="bg-green-50 p-3 rounded-lg">
              <p className="font-medium text-green-900">🎴 Karten-Modus</p>
              <p className="text-green-700">Blättere durch Lernkarten in deinem Tempo</p>
            </div>
            <div className="bg-orange-50 p-3 rounded-lg">
              <p className="font-medium text-orange-900">📖 Vokabular</p>
              <p className="text-orange-700">Lerne wichtige Begriffe zur Einbürgerung</p>
            </div>
          </div>
        </>
      )
    },
    {
      title: "Verfolge deinen Fortschritt & Sammle Abzeichen",
      icon: Award,
      content: (
        <>
          <p className="mb-3">Bleib motiviert beim Lernen:</p>
          <ul className="list-disc list-inside space-y-2 text-sm">
            <li><span className="font-medium">Tägliche Streaks:</span> Baue Konsistenz mit täglichem Lernen auf</li>
            <li><span className="font-medium">Leistungsstatistiken:</span> Sieh deine Verbesserung im Laufe der Zeit</li>
            <li><span className="font-medium">30+ Abzeichen:</span> Schalte Erfolge frei, während du Fortschritte machst</li>
            <li><span className="font-medium">Kategorien-Meisterschaft:</span> Verfolge Fortschritt nach Themenbereich</li>
          </ul>
          <div className="mt-4 bg-gradient-to-r from-yellow-50 to-amber-50 p-3 rounded-lg border border-yellow-200">
            <p className="text-sm font-medium text-amber-900">🎯 Dein Ziel: Bestehe mit 17+ richtigen Antworten!</p>
          </div>
        </>
      )
    },
    {
      title: "Setze dein Prüfungsdatum",
      icon: CalendarDays,
      content: (
        <>
          <p className="mb-4">Wann ist dein Einbürgerungstest geplant?</p>
          <p className="text-sm text-gray-600 mb-4">Wir helfen dir mit einem personalisierten Lernplan.</p>
          <div className="space-y-3">
            <input
              type="date"
              id="examDateDe"
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none text-lg"
              min={new Date().toISOString().split('T')[0]}
            />
            <button
              onClick={() => {
                const input = document.getElementById('examDateDe') as HTMLInputElement;
                if (input && input.value) {
                  const today = new Date();
                  const examDate = new Date(input.value);
                  const daysUntilExam = Math.ceil((examDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
                  
                  if (daysUntilExam > 0) {
                    const result = document.getElementById('examDateResultDe');
                    if (result) {
                      result.innerHTML = `<div class="bg-green-50 p-3 rounded-lg border border-green-200 text-green-800">
                        <p class="font-medium">✓ Prüfungsdatum gesetzt!</p>
                        <p class="text-sm">${daysUntilExam} Tage zur Vorbereitung</p>
                      </div>`;
                    }
                    safeSetItem('examDate', input.value);
                    safeSetItem('daysUntilExam', daysUntilExam);
                  }
                }
              }}
              className="w-full bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Prüfungsdatum setzen
            </button>
            <div id="examDateResultDe"></div>
            <p className="text-xs text-gray-500 text-center">Du kannst dies überspringen und später in den Einstellungen setzen</p>
          </div>
        </>
      )
    },
    {
      title: "Wähle dein tägliches Ziel",
      icon: TrendingUp,
      content: (
        <>
          <p className="mb-4">Wie viele Fragen möchtest du täglich üben?</p>
          <p className="text-sm text-gray-600 mb-4">Konsistenz ist der Schlüssel! Beginne mit einem erreichbaren Ziel.</p>
          <div className="grid grid-cols-2 gap-3">
            {[
              { value: 10, label: 'Leicht', desc: '~5 Minuten/Tag', color: 'from-blue-500 to-blue-600' },
              { value: 20, label: 'Mäßig', desc: '~10 Minuten/Tag', color: 'from-green-500 to-green-600' },
              { value: 30, label: 'Ernsthaft', desc: '~15 Minuten/Tag', color: 'from-orange-500 to-orange-600' },
              { value: 40, label: 'Intensiv', desc: '~20 Minuten/Tag', color: 'from-red-500 to-red-600' }
            ].map(goal => (
              <button
                key={goal.value}
                onClick={() => {
                  safeSetItem('dailyGoal', goal.value);
                  const buttons = document.querySelectorAll('.daily-goal-btn-de');
                  buttons.forEach(btn => btn.classList.remove('ring-4', 'ring-indigo-300'));
                  const clickedBtn = document.getElementById(`goal-de-${goal.value}`);
                  if (clickedBtn) {
                    clickedBtn.classList.add('ring-4', 'ring-indigo-300');
                  }
                  const result = document.getElementById('dailyGoalResultDe');
                  if (result) {
                    result.innerHTML = `<div class="bg-green-50 p-3 rounded-lg border border-green-200 text-green-800 text-center">
                      <p class="font-medium">✓ Ziel gesetzt: ${goal.value} Fragen/Tag</p>
                    </div>`;
                  }
                }}
                id={`goal-de-${goal.value}`}
                className={`daily-goal-btn-de bg-gradient-to-r ${goal.color} text-white p-4 rounded-lg hover:opacity-90 transition-all transform hover:scale-105`}
              >
                <div className="text-3xl font-bold">{goal.value}</div>
                <div className="text-sm font-medium mt-1">{goal.label}</div>
                <div className="text-xs opacity-90 mt-1">{goal.desc}</div>
              </button>
            ))}
          </div>
          <div id="dailyGoalResultDe" className="mt-3"></div>
          <p className="text-xs text-gray-500 text-center mt-3">Du kannst dies jederzeit in den Einstellungen ändern</p>
        </>
      )
    }
  ]
};

export const OnboardingModal: React.FC<OnboardingModalProps> = ({ onComplete, lang }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const steps = ONBOARDING_STEPS[lang];
  const isLastStep = currentStep === steps.length - 1;
  const isFirstStep = currentStep === 0;

  const handleNext = () => {
    if (isLastStep) {
      onComplete();
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (!isFirstStep) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSkip = () => {
    onComplete();
  };

  const currentStepData = steps[currentStep];
  const Icon = currentStepData.icon;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6 rounded-t-2xl">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-3">
              <div className="bg-white bg-opacity-20 p-2 rounded-lg">
                <Icon className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold">{currentStepData.title}</h2>
                <p className="text-sm text-indigo-100 mt-1">
                  {lang === 'en' ? 'Step' : 'Schritt'} {currentStep + 1} {lang === 'en' ? 'of' : 'von'} {steps.length}
                </p>
              </div>
            </div>
            <button
              onClick={handleSkip}
              className="text-white hover:text-gray-200 transition-colors"
              aria-label={lang === 'en' ? 'Close' : 'Schließen'}
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="text-gray-700 leading-relaxed">
            {currentStepData.content}
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-gray-50 p-6 rounded-b-2xl border-t">
          {/* Progress Dots */}
          <div className="flex justify-center gap-2 mb-4">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`h-2 rounded-full transition-all ${
                  index === currentStep
                    ? 'w-8 bg-indigo-600'
                    : index < currentStep
                    ? 'w-2 bg-indigo-300'
                    : 'w-2 bg-gray-300'
                }`}
              />
            ))}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center">
            <button
              onClick={handlePrev}
              disabled={isFirstStep}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                isFirstStep
                  ? 'text-gray-400 cursor-not-allowed'
                  : 'text-gray-700 hover:bg-gray-200'
              }`}
            >
              <ArrowLeft className="w-4 h-4" />
              {lang === 'en' ? 'Back' : 'Zurück'}
            </button>

            <button
              onClick={handleSkip}
              className="text-gray-500 hover:text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors"
            >
              {lang === 'en' ? 'Skip Tutorial' : 'Tutorial überspringen'}
            </button>

            <button
              onClick={handleNext}
              className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-2 rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all shadow-md hover:shadow-lg"
            >
              {isLastStep ? (
                <>
                  {lang === 'en' ? "Let's Start!" : 'Los geht\'s!'}
                  <Award className="w-4 h-4" />
                </>
              ) : (
                <>
                  {lang === 'en' ? 'Next' : 'Weiter'}
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
