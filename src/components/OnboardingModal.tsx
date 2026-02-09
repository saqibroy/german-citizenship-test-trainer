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
          <p className="mb-3 text-xs sm:text-sm lg:text-base">Master all 310 questions for your German citizenship test using our intelligent learning system.</p>
          <p className="font-medium text-indigo-700 text-xs sm:text-sm lg:text-base">Smart, Efficient, Exam-Ready!</p>
        </>
      )
    },
    {
      title: "Spaced Repetition System (SRS)",
      icon: Calendar,
      content: (
        <>
          <p className="mb-3 text-xs sm:text-sm lg:text-base">Our AI-powered algorithm shows you questions exactly when you need to review them:</p>
          <ul className="list-disc list-inside space-y-2 text-xs sm:text-sm lg:text-base">
            <li><span className="font-medium">New:</span> Questions you haven't seen yet</li>
            <li><span className="font-medium">Learning:</span> Review in 10 minutes → 1 day</li>
            <li><span className="font-medium">Young:</span> Review every 1-3 days</li>
            <li><span className="font-medium">Mature:</span> Review every 3-5 days</li>
            <li><span className="font-medium">Mastered:</span> Review every 5-7 days</li>
          </ul>
          <p className="mt-3 text-xs sm:text-sm lg:text-base text-gray-600">Optimized for your exam - no question waits more than 7 days!</p>
        </>
      )
    },
    {
      title: "Your Learning Modes",
      icon: Target,
      content: (
        <>
          <p className="mb-3 text-xs sm:text-sm lg:text-base">Choose how you want to study:</p>
          <div className="space-y-3 text-xs sm:text-sm lg:text-base">
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
          <p className="mb-3 text-xs sm:text-sm lg:text-base">Stay motivated as you learn:</p>
          <ul className="list-disc list-inside space-y-2 text-xs sm:text-sm lg:text-base">
            <li><span className="font-medium">Daily Streaks:</span> Build consistency with daily study</li>
            <li><span className="font-medium">Performance Stats:</span> See your improvement over time</li>
            <li><span className="font-medium">30+ Badges:</span> Unlock achievements as you progress</li>
            <li><span className="font-medium">Category Mastery:</span> Track progress by topic area</li>
          </ul>
          <div className="mt-4 bg-gradient-to-r from-yellow-50 to-amber-50 p-3 rounded-lg border border-yellow-200">
            <p className="text-xs sm:text-sm lg:text-base font-medium text-amber-900">🎯 Your Goal: Pass with 17+ correct answers!</p>
          </div>
        </>
      )
    },
    {
      title: "Set Your Exam Date",
      icon: CalendarDays,
      content: (
        <>
          <p className="mb-4 text-xs sm:text-sm lg:text-base">When is your citizenship test scheduled?</p>
          <p className="text-xs sm:text-sm lg:text-base text-gray-600 mb-4">We'll help you prepare with a personalized study plan.</p>
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
          <p className="mb-4 text-xs sm:text-sm lg:text-base font-medium">How many questions do you want to practice each day?</p>
          <p className="text-xs sm:text-sm lg:text-base text-gray-600 mb-4">Consistency is key! Start with a manageable goal.</p>
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
                className={`daily-goal-btn bg-gradient-to-r ${goal.color} text-white p-1.5 rounded-lg hover:opacity-90 transition-all`}
              >
                <div className="text-sm sm:text-base lg:text-lg font-bold">{goal.value}</div>
                <div className="text-[9px] sm:text-[10px] lg:text-xs font-medium mt-0.5">{goal.label}</div>
                <div className="text-[8px] sm:text-[9px] lg:text-[10px] opacity-90">{goal.desc}</div>
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
          <p className="mb-3 text-xs sm:text-sm lg:text-base">Meistere alle 310 Fragen für deinen Einbürgerungstest mit unserem intelligenten Lernsystem.</p>
          <p className="font-medium text-indigo-700 text-xs sm:text-sm lg:text-base">Smart, Effizient, Prüfungsbereit!</p>
        </>
      )
    },
    {
      title: "Spaced Repetition System (SRS)",
      icon: Calendar,
      content: (
        <>
          <p className="mb-3 text-xs sm:text-sm lg:text-base">Unser KI-gesteuerter Algorithmus zeigt dir Fragen genau dann, wenn du sie wiederholen musst:</p>
          <ul className="list-disc list-inside space-y-2 text-xs sm:text-sm lg:text-base">
            <li><span className="font-medium">Neu:</span> Fragen, die du noch nicht gesehen hast</li>
            <li><span className="font-medium">Lernen:</span> Wiederholung in 10 Minuten → 1 Tag</li>
            <li><span className="font-medium">Jung:</span> Wiederholung alle 1-3 Tage</li>
            <li><span className="font-medium">Ausgereift:</span> Wiederholung alle 3-5 Tage</li>
            <li><span className="font-medium">Gemeistert:</span> Wiederholung alle 5-7 Tage</li>
          </ul>
          <p className="mt-3 text-xs sm:text-sm lg:text-base text-gray-600">Optimiert für deine Prüfung - keine Frage wartet länger als 7 Tage!</p>
        </>
      )
    },
    {
      title: "Deine Lernmodi",
      icon: Target,
      content: (
        <>
          <p className="mb-3 text-xs sm:text-sm lg:text-base">Wähle, wie du lernen möchtest:</p>
          <div className="space-y-3 text-xs sm:text-sm lg:text-base">
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
          <p className="mb-3 text-xs sm:text-sm lg:text-base">Bleib motiviert beim Lernen:</p>
          <ul className="list-disc list-inside space-y-2 text-xs sm:text-sm lg:text-base">
            <li><span className="font-medium">Tägliche Streaks:</span> Baue Konsistenz mit täglichem Lernen auf</li>
            <li><span className="font-medium">Leistungsstatistiken:</span> Sieh deine Verbesserung im Laufe der Zeit</li>
            <li><span className="font-medium">30+ Abzeichen:</span> Schalte Erfolge frei, während du Fortschritte machst</li>
            <li><span className="font-medium">Kategorien-Meisterschaft:</span> Verfolge Fortschritt nach Themenbereich</li>
          </ul>
          <div className="mt-4 bg-gradient-to-r from-yellow-50 to-amber-50 p-3 rounded-lg border border-yellow-200">
            <p className="text-xs sm:text-sm lg:text-base font-medium text-amber-900">🎯 Dein Ziel: Bestehe mit 17+ richtigen Antworten!</p>
          </div>
        </>
      )
    },
    {
      title: "Setze dein Prüfungsdatum",
      icon: CalendarDays,
      content: (
        <>
          <p className="mb-4 text-xs sm:text-sm lg:text-base">Wann ist dein Einbürgerungstest geplant?</p>
          <p className="text-xs sm:text-sm lg:text-base text-gray-600 mb-4">Wir helfen dir mit einem personalisierten Lernplan.</p>
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
          <p className="mb-4 text-xs sm:text-sm lg:text-base font-medium">Wie viele Fragen möchtest du täglich üben?</p>
          <p className="text-xs sm:text-sm lg:text-base text-gray-600 mb-4">Konsistenz ist der Schlüssel! Beginne mit einem erreichbaren Ziel.</p>
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
                className={`daily-goal-btn-de bg-gradient-to-r ${goal.color} text-white p-1.5 rounded-lg hover:opacity-90 transition-all`}
              >
                <div className="text-sm sm:text-base lg:text-lg font-bold">{goal.value}</div>
                <div className="text-[9px] sm:text-[10px] lg:text-xs font-medium mt-0.5">{goal.label}</div>
                <div className="text-[8px] sm:text-[9px] lg:text-[10px] opacity-90">{goal.desc}</div>
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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 sm:p-4">
      <div className="bg-white rounded-xl sm:rounded-2xl shadow-2xl w-full max-w-xs sm:max-w-md lg:max-w-2xl h-[85vh] sm:h-[90vh] lg:max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-3 py-2 sm:px-4 sm:py-3 lg:px-6 lg:py-4 rounded-t-xl sm:rounded-t-2xl flex-shrink-0 h-20 sm:h-24 lg:h-28 flex items-center overflow-hidden">
          <div className="flex justify-between items-center gap-2 sm:gap-3 w-full">
            <div className="flex items-center gap-1.5 sm:gap-2 lg:gap-3 min-w-0 flex-1">
              <div className="bg-white bg-opacity-20 p-0.5 sm:p-1 lg:p-2 rounded-lg flex-shrink-0">
                <Icon className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
              </div>
              <div className="min-w-0">
                <h2 className="text-xs sm:text-base lg:text-xl font-bold leading-tight break-words">{currentStepData.title}</h2>
                <p className="text-[9px] sm:text-xs lg:text-sm text-indigo-100 mt-0.5 sm:mt-1">
                  {lang === 'en' ? 'Step' : 'Schritt'} {currentStep + 1}/{steps.length}
                </p>
              </div>
            </div>
            <button
              onClick={handleSkip}
              className="text-white hover:text-gray-200 transition-colors flex-shrink-0 p-1 lg:p-2"
              aria-label={lang === 'en' ? 'Close' : 'Schließen'}
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-3 py-3 sm:px-4 sm:py-4 lg:px-6 lg:py-6">
          <div className="text-xs sm:text-sm lg:text-base text-gray-700 leading-relaxed">
            {currentStepData.content}
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-3 py-2 sm:px-4 sm:py-3 lg:px-6 lg:py-4 rounded-b-xl sm:rounded-b-2xl border-t flex-shrink-0 space-y-2 sm:space-y-3">
          {/* Progress Dots */}
          <div className="flex justify-center gap-1 sm:gap-1.5 lg:gap-2 mb-2 sm:mb-3">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`h-1 sm:h-1.5 lg:h-2 rounded-full transition-all ${
                  index === currentStep
                    ? 'w-5 sm:w-6 lg:w-8 bg-indigo-600'
                    : index < currentStep
                    ? 'w-1 sm:w-1.5 lg:w-2 bg-indigo-300'
                    : 'w-1 sm:w-1.5 lg:w-2 bg-gray-300'
                }`}
              />
            ))}
          </div>

          {/* Navigation Buttons - Responsive layout */}
          <div className="grid grid-cols-3 gap-1 sm:gap-2 lg:gap-3 lg:flex lg:justify-between">
            <button
              onClick={handlePrev}
              disabled={isFirstStep}
              className={`col-span-1 flex items-center justify-center gap-0.5 sm:gap-1 px-1.5 sm:px-3 lg:px-4 py-1 sm:py-1.5 lg:py-2 rounded-lg text-[9px] sm:text-xs lg:text-sm transition-colors font-medium ${
                isFirstStep
                  ? 'text-gray-400 cursor-not-allowed bg-gray-100'
                  : 'text-gray-700 hover:bg-gray-200 bg-white border border-gray-200'
              }`}
            >
              <ArrowLeft className="w-3 h-3 sm:w-3.5 sm:h-3.5 lg:w-4 lg:h-4" />
              <span className="hidden sm:inline">{lang === 'en' ? 'Back' : 'Zurück'}</span>
            </button>

            <button
              onClick={handleSkip}
              className="col-span-1 flex items-center justify-center gap-0.5 sm:gap-1 px-1.5 sm:px-3 lg:px-4 py-1 sm:py-1.5 lg:py-2 rounded-lg text-gray-700 hover:text-gray-900 hover:bg-gray-200 transition-colors text-[9px] sm:text-xs lg:text-sm bg-white border border-gray-200 font-medium"
            >
              <span className="hidden sm:inline">{lang === 'en' ? 'Skip' : 'Übersp.'}</span>
              <span className="sm:hidden text-base">⊗</span>
            </button>

            <button
              onClick={handleNext}
              className="col-span-1 flex items-center justify-center gap-0.5 sm:gap-1 lg:gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-1.5 sm:px-3 lg:px-6 py-1 sm:py-1.5 lg:py-2 rounded-lg transition-all text-[9px] sm:text-xs lg:text-sm shadow-sm font-medium"
            >
              {isLastStep ? (
                <>
                  <span className="hidden sm:inline">{lang === 'en' ? 'Start' : 'Los'}</span>
                  <span className="sm:hidden text-base">▶</span>
                </>
              ) : (
                <>
                  <span className="hidden sm:inline">{lang === 'en' ? 'Next' : 'Weiter'}</span>
                  <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 lg:w-4 lg:h-4" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
