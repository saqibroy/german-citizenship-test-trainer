import React, { useState } from 'react';
import { X, Brain, Target, Calendar, Award, ArrowRight, ArrowLeft, CalendarDays, TrendingUp } from 'lucide-react';
import { safeSetItem } from '../utils/storage';
import { useBodyScrollLock } from '../hooks/useBodyScrollLock';

interface OnboardingModalProps {
  onComplete: () => void;
  lang: 'de' | 'en';
}

const ONBOARDING_STEPS = {
  en: [
    {
      title: "Welcome",
      icon: Brain,
      content: (
        <>
          <p className="text-gray-600 mb-4">Master all <span className="font-semibold text-gray-900">310 official questions</span> for the German citizenship test with our smart learning system.</p>
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-4 border border-indigo-100">
            <p className="font-semibold text-indigo-800 text-center">Smart · Efficient · Exam-Ready</p>
          </div>
        </>
      )
    },
    {
      title: "Smart Review System",
      icon: Calendar,
      content: (
        <>
          <p className="text-gray-600 mb-4">Our algorithm schedules reviews at the right time — just before you'd forget:</p>
          <div className="space-y-2">
            <div className="flex items-center gap-3 p-2.5 rounded-lg border bg-red-50 border-red-100 text-red-800">
              <div className="w-7 h-7 rounded bg-red-500 text-white flex items-center justify-center text-xs font-bold flex-shrink-0">W</div>
              <div className="flex-1 min-w-0">
                <span className="font-medium">Weak</span>
                <span className="text-sm opacity-80 ml-1.5">— Needs more practice</span>
              </div>
            </div>
            <div className="flex items-center gap-3 p-2.5 rounded-lg border bg-yellow-50 border-yellow-100 text-yellow-800">
              <div className="w-7 h-7 rounded bg-yellow-500 text-white flex items-center justify-center text-xs font-bold flex-shrink-0">L</div>
              <div className="flex-1 min-w-0">
                <span className="font-medium">Learning</span>
                <span className="text-sm opacity-80 ml-1.5">— In progress</span>
              </div>
            </div>
            <div className="flex items-center gap-3 p-2.5 rounded-lg border bg-blue-50 border-blue-100 text-blue-800">
              <div className="w-7 h-7 rounded bg-blue-500 text-white flex items-center justify-center text-xs font-bold flex-shrink-0">F</div>
              <div className="flex-1 min-w-0">
                <span className="font-medium">Familiar</span>
                <span className="text-sm opacity-80 ml-1.5">— Review every 1–3 days</span>
              </div>
            </div>
            <div className="flex items-center gap-3 p-2.5 rounded-lg border bg-green-50 border-green-100 text-green-800">
              <div className="w-7 h-7 rounded bg-green-500 text-white flex items-center justify-center text-xs font-bold flex-shrink-0">M</div>
              <div className="flex-1 min-w-0">
                <span className="font-medium">Mastered</span>
                <span className="text-sm opacity-80 ml-1.5">— Review every 5–7 days</span>
              </div>
            </div>
          </div>
          <p className="mt-3 text-xs text-gray-500 text-center">No question waits more than 7 days — optimized for your exam.</p>
        </>
      )
    },
    {
      title: "Study Modes",
      icon: Target,
      content: (
        <>
          <p className="text-gray-600 mb-4">Pick the mode that fits your goal:</p>
          <div className="space-y-2.5">
            <div className="flex items-start gap-3 p-3 rounded-xl border bg-blue-50 border-blue-100">
              <Brain className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-semibold text-blue-900">Training</p>
                <p className="text-sm text-blue-700">Practice with instant feedback</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-xl border bg-purple-50 border-purple-100">
              <Target className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-semibold text-purple-900">Quiz</p>
                <p className="text-sm text-purple-700">Simulate the real 33-question exam</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-xl border bg-green-50 border-green-100">
              <Award className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-semibold text-green-900">Flashcards</p>
                <p className="text-sm text-green-700">Flip through cards at your pace</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-xl border bg-orange-50 border-orange-100">
              <CalendarDays className="w-5 h-5 text-orange-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-semibold text-orange-900">Vocabulary</p>
                <p className="text-sm text-orange-700">Learn key citizenship terms</p>
              </div>
            </div>
          </div>
        </>
      )
    },
    {
      title: "Track Your Progress",
      icon: Award,
      content: (
        <>
          <p className="text-gray-600 mb-4">Stay motivated with built-in tracking:</p>
          <div className="space-y-2.5">
            <div className="flex items-start gap-3 p-2.5 bg-gray-50 rounded-lg">
              <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center flex-shrink-0"><TrendingUp className="w-4 h-4 text-orange-600" /></div>
              <div>
                <p className="font-medium text-gray-900">Daily Streaks</p>
                <p className="text-sm text-gray-600">Build a habit with daily study</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-2.5 bg-gray-50 rounded-lg">
              <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0"><Target className="w-4 h-4 text-blue-600" /></div>
              <div>
                <p className="font-medium text-gray-900">Statistics</p>
                <p className="text-sm text-gray-600">Watch your accuracy improve over time</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-2.5 bg-gray-50 rounded-lg">
              <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center flex-shrink-0"><Award className="w-4 h-4 text-amber-600" /></div>
              <div>
                <p className="font-medium text-gray-900">30+ Badges</p>
                <p className="text-sm text-gray-600">Unlock achievements as you progress</p>
              </div>
            </div>
          </div>
          <div className="mt-4 bg-indigo-50 p-3 rounded-xl border border-indigo-100 text-center">
            <p className="font-semibold text-indigo-800">Goal: Pass with 17+ out of 33 correct</p>
          </div>
        </>
      )
    },
    {
      title: "Set Your Exam Date",
      icon: CalendarDays,
      content: (
        <>
          <p className="text-gray-600 mb-2">When is your citizenship test?</p>
          <p className="text-sm text-gray-500 mb-4">We'll tailor your study plan accordingly.</p>
          <div className="space-y-3">
            <input
              type="date"
              id="examDate"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 focus:outline-none text-base bg-gray-50 transition-colors"
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
                      result.innerHTML = `<div class="bg-green-50 p-3 rounded-xl border border-green-200 text-green-800 text-center">
                        <p class="font-semibold">✓ Exam date set!</p>
                        <p class="text-sm mt-0.5">${daysUntilExam} days to prepare</p>
                      </div>`;
                    }
                    safeSetItem('examDate', input.value);
                    safeSetItem('daysUntilExam', daysUntilExam);
                  }
                }
              }}
              className="w-full bg-indigo-600 text-white px-4 py-2.5 rounded-xl hover:bg-indigo-700 transition-colors font-medium"
            >
              Set Exam Date
            </button>
            <div id="examDateResult"></div>
            <p className="text-xs text-gray-400 text-center">You can skip this and set it later in Settings</p>
          </div>
        </>
      )
    },
    {
      title: "Daily Goal",
      icon: TrendingUp,
      content: (
        <>
          <p className="font-medium text-gray-700 mb-2">How many questions per day?</p>
          <p className="text-sm text-gray-500 mb-4">Start small — consistency beats intensity.</p>
          <div className="grid grid-cols-2 gap-3">
            {[
              { value: 10, label: 'Light', desc: '~5 min/day', color: 'from-blue-500 to-blue-600' },
              { value: 20, label: 'Moderate', desc: '~10 min/day', color: 'from-green-500 to-green-600' },
              { value: 30, label: 'Serious', desc: '~15 min/day', color: 'from-orange-500 to-orange-600' },
              { value: 40, label: 'Intense', desc: '~20 min/day', color: 'from-red-500 to-red-600' }
            ].map(goal => (
              <button
                key={goal.value}
                onClick={() => {
                  safeSetItem('dailyGoal', goal.value);
                  const buttons = document.querySelectorAll('.daily-goal-btn');
                  buttons.forEach(btn => btn.classList.remove('ring-4', 'ring-indigo-200'));
                  const clickedBtn = document.getElementById(`goal-${goal.value}`);
                  if (clickedBtn) clickedBtn.classList.add('ring-4', 'ring-indigo-200');
                  const result = document.getElementById('dailyGoalResult');
                  if (result) {
                    result.innerHTML = `<div class="bg-green-50 p-2.5 rounded-xl border border-green-200 text-green-800 text-center">
                      <p class="font-semibold">✓ Goal: ${goal.value} questions/day</p>
                    </div>`;
                  }
                }}
                id={`goal-${goal.value}`}
                className={`daily-goal-btn bg-gradient-to-br ${goal.color} text-white p-3 rounded-xl hover:opacity-90 transition-all shadow-sm`}
              >
                <div className="text-xl font-bold">{goal.value}</div>
                <div className="text-xs font-medium mt-0.5 opacity-95">{goal.label}</div>
                <div className="text-[10px] opacity-80">{goal.desc}</div>
              </button>
            ))}
          </div>
          <div id="dailyGoalResult" className="mt-3"></div>
          <p className="text-xs text-gray-400 text-center mt-2">Change anytime in Settings</p>
        </>
      )
    }
  ],
  de: [
    {
      title: "Willkommen",
      icon: Brain,
      content: (
        <>
          <p className="text-gray-600 mb-4">Meistere alle <span className="font-semibold text-gray-900">310 offiziellen Fragen</span> für deinen Einbürgerungstest mit unserem intelligenten Lernsystem.</p>
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-4 border border-indigo-100">
            <p className="font-semibold text-indigo-800 text-center">Smart · Effizient · Prüfungsbereit</p>
          </div>
        </>
      )
    },
    {
      title: "Intelligentes Wiederholungssystem",
      icon: Calendar,
      content: (
        <>
          <p className="text-gray-600 mb-4">Unser Algorithmus plant Wiederholungen zum richtigen Zeitpunkt — kurz bevor du etwas vergessen würdest:</p>
          <div className="space-y-2">
            <div className="flex items-center gap-3 p-2.5 rounded-lg border bg-red-50 border-red-100 text-red-800">
              <div className="w-7 h-7 rounded bg-red-500 text-white flex items-center justify-center text-xs font-bold flex-shrink-0">S</div>
              <div className="flex-1 min-w-0">
                <span className="font-medium">Schwach</span>
                <span className="text-sm opacity-80 ml-1.5">— Braucht mehr Übung</span>
              </div>
            </div>
            <div className="flex items-center gap-3 p-2.5 rounded-lg border bg-yellow-50 border-yellow-100 text-yellow-800">
              <div className="w-7 h-7 rounded bg-yellow-500 text-white flex items-center justify-center text-xs font-bold flex-shrink-0">L</div>
              <div className="flex-1 min-w-0">
                <span className="font-medium">Lerne</span>
                <span className="text-sm opacity-80 ml-1.5">— In Bearbeitung</span>
              </div>
            </div>
            <div className="flex items-center gap-3 p-2.5 rounded-lg border bg-blue-50 border-blue-100 text-blue-800">
              <div className="w-7 h-7 rounded bg-blue-500 text-white flex items-center justify-center text-xs font-bold flex-shrink-0">B</div>
              <div className="flex-1 min-w-0">
                <span className="font-medium">Bekannt</span>
                <span className="text-sm opacity-80 ml-1.5">— Wiederholung alle 1–3 Tage</span>
              </div>
            </div>
            <div className="flex items-center gap-3 p-2.5 rounded-lg border bg-green-50 border-green-100 text-green-800">
              <div className="w-7 h-7 rounded bg-green-500 text-white flex items-center justify-center text-xs font-bold flex-shrink-0">G</div>
              <div className="flex-1 min-w-0">
                <span className="font-medium">Gemeistert</span>
                <span className="text-sm opacity-80 ml-1.5">— Wiederholung alle 5–7 Tage</span>
              </div>
            </div>
          </div>
          <p className="mt-3 text-xs text-gray-500 text-center">Keine Frage wartet länger als 7 Tage — optimiert für deine Prüfung.</p>
        </>
      )
    },
    {
      title: "Lernmodi",
      icon: Target,
      content: (
        <>
          <p className="text-gray-600 mb-4">Wähle den Modus, der zu dir passt:</p>
          <div className="space-y-2.5">
            <div className="flex items-start gap-3 p-3 rounded-xl border bg-blue-50 border-blue-100">
              <Brain className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-semibold text-blue-900">Training</p>
                <p className="text-sm text-blue-700">Üben mit sofortigem Feedback</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-xl border bg-purple-50 border-purple-100">
              <Target className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-semibold text-purple-900">Quiz</p>
                <p className="text-sm text-purple-700">Echte 33-Fragen-Prüfungssimulation</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-xl border bg-green-50 border-green-100">
              <Award className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-semibold text-green-900">Lernkarten</p>
                <p className="text-sm text-green-700">Karten in deinem Tempo durchblättern</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-xl border bg-orange-50 border-orange-100">
              <CalendarDays className="w-5 h-5 text-orange-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-semibold text-orange-900">Vokabeln</p>
                <p className="text-sm text-orange-700">Wichtige Begriffe zur Einbürgerung lernen</p>
              </div>
            </div>
          </div>
        </>
      )
    },
    {
      title: "Fortschritt verfolgen",
      icon: Award,
      content: (
        <>
          <p className="text-gray-600 mb-4">Bleib motiviert mit eingebauter Fortschrittsverfolgung:</p>
          <div className="space-y-2.5">
            <div className="flex items-start gap-3 p-2.5 bg-gray-50 rounded-lg">
              <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center flex-shrink-0"><TrendingUp className="w-4 h-4 text-orange-600" /></div>
              <div>
                <p className="font-medium text-gray-900">Tägliche Streaks</p>
                <p className="text-sm text-gray-600">Baue eine Lerngewohnheit auf</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-2.5 bg-gray-50 rounded-lg">
              <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0"><Target className="w-4 h-4 text-blue-600" /></div>
              <div>
                <p className="font-medium text-gray-900">Statistiken</p>
                <p className="text-sm text-gray-600">Beobachte deine Verbesserung</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-2.5 bg-gray-50 rounded-lg">
              <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center flex-shrink-0"><Award className="w-4 h-4 text-amber-600" /></div>
              <div>
                <p className="font-medium text-gray-900">30+ Abzeichen</p>
                <p className="text-sm text-gray-600">Schalte Erfolge frei</p>
              </div>
            </div>
          </div>
          <div className="mt-4 bg-indigo-50 p-3 rounded-xl border border-indigo-100 text-center">
            <p className="font-semibold text-indigo-800">Ziel: Bestehe mit 17+ von 33 richtigen Antworten</p>
          </div>
        </>
      )
    },
    {
      title: "Prüfungsdatum",
      icon: CalendarDays,
      content: (
        <>
          <p className="text-gray-600 mb-2">Wann ist dein Einbürgerungstest?</p>
          <p className="text-sm text-gray-500 mb-4">Wir passen deinen Lernplan entsprechend an.</p>
          <div className="space-y-3">
            <input
              type="date"
              id="examDateDe"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 focus:outline-none text-base bg-gray-50 transition-colors"
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
                      result.innerHTML = `<div class="bg-green-50 p-3 rounded-xl border border-green-200 text-green-800 text-center">
                        <p class="font-semibold">✓ Prüfungsdatum gesetzt!</p>
                        <p class="text-sm mt-0.5">${daysUntilExam} Tage zur Vorbereitung</p>
                      </div>`;
                    }
                    safeSetItem('examDate', input.value);
                    safeSetItem('daysUntilExam', daysUntilExam);
                  }
                }
              }}
              className="w-full bg-indigo-600 text-white px-4 py-2.5 rounded-xl hover:bg-indigo-700 transition-colors font-medium"
            >
              Prüfungsdatum setzen
            </button>
            <div id="examDateResultDe"></div>
            <p className="text-xs text-gray-400 text-center">Überspringen und später in den Einstellungen setzen</p>
          </div>
        </>
      )
    },
    {
      title: "Tägliches Ziel",
      icon: TrendingUp,
      content: (
        <>
          <p className="font-medium text-gray-700 mb-2">Wie viele Fragen pro Tag?</p>
          <p className="text-sm text-gray-500 mb-4">Klein anfangen — Regelmäßigkeit schlägt Intensität.</p>
          <div className="grid grid-cols-2 gap-3">
            {[
              { value: 10, label: 'Leicht', desc: '~5 Min/Tag', color: 'from-blue-500 to-blue-600' },
              { value: 20, label: 'Mäßig', desc: '~10 Min/Tag', color: 'from-green-500 to-green-600' },
              { value: 30, label: 'Ernsthaft', desc: '~15 Min/Tag', color: 'from-orange-500 to-orange-600' },
              { value: 40, label: 'Intensiv', desc: '~20 Min/Tag', color: 'from-red-500 to-red-600' }
            ].map(goal => (
              <button
                key={goal.value}
                onClick={() => {
                  safeSetItem('dailyGoal', goal.value);
                  const buttons = document.querySelectorAll('.daily-goal-btn-de');
                  buttons.forEach(btn => btn.classList.remove('ring-4', 'ring-indigo-200'));
                  const clickedBtn = document.getElementById(`goal-de-${goal.value}`);
                  if (clickedBtn) clickedBtn.classList.add('ring-4', 'ring-indigo-200');
                  const result = document.getElementById('dailyGoalResultDe');
                  if (result) {
                    result.innerHTML = `<div class="bg-green-50 p-2.5 rounded-xl border border-green-200 text-green-800 text-center">
                      <p class="font-semibold">✓ Ziel: ${goal.value} Fragen/Tag</p>
                    </div>`;
                  }
                }}
                id={`goal-de-${goal.value}`}
                className={`daily-goal-btn-de bg-gradient-to-br ${goal.color} text-white p-3 rounded-xl hover:opacity-90 transition-all shadow-sm`}
              >
                <div className="text-xl font-bold">{goal.value}</div>
                <div className="text-xs font-medium mt-0.5 opacity-95">{goal.label}</div>
                <div className="text-[10px] opacity-80">{goal.desc}</div>
              </button>
            ))}
          </div>
          <div id="dailyGoalResultDe" className="mt-3"></div>
          <p className="text-xs text-gray-400 text-center mt-2">Jederzeit in den Einstellungen änderbar</p>
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

  // Lock body scroll when modal is open
  useBodyScrollLock(true);

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
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-3 sm:p-6">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-[min(28rem,calc(100vw-1.5rem))] max-h-[min(40rem,calc(100dvh-1.5rem))] sm:max-h-[min(42rem,calc(100dvh-3rem))] flex flex-col animate-[fadeIn_0.2s_ease-out]">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-5 py-4 rounded-t-2xl flex-shrink-0">
          <div className="flex justify-between items-start gap-3">
            <div className="flex items-center gap-3 min-w-0 flex-1">
              <div className="bg-white/20 p-2 rounded-xl flex-shrink-0">
                <Icon className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <h2 className="text-base sm:text-lg font-bold leading-tight">{currentStepData.title}</h2>
                <p className="text-xs text-indigo-200 mt-0.5">
                  {lang === 'en' ? 'Step' : 'Schritt'} {currentStep + 1} / {steps.length}
                </p>
              </div>
            </div>
            <button
              onClick={handleSkip}
              className="text-white/80 hover:text-white transition-colors p-1.5 -mr-1 -mt-0.5 rounded-lg hover:bg-white/10"
              aria-label={lang === 'en' ? 'Close' : 'Schließen'}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-5 py-4 overscroll-contain text-sm sm:text-[0.9375rem] text-gray-700 leading-relaxed">
          {currentStepData.content}
        </div>

        {/* Footer */}
        <div className="px-5 py-3 rounded-b-2xl border-t border-gray-100 flex-shrink-0 bg-gray-50/80 space-y-3">
          {/* Progress Dots */}
          <div className="flex justify-center gap-1.5">
            {steps.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentStep(index)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  index === currentStep
                    ? 'w-6 bg-indigo-600'
                    : index < currentStep
                    ? 'w-1.5 bg-indigo-300 hover:bg-indigo-400'
                    : 'w-1.5 bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`${lang === 'en' ? 'Go to step' : 'Gehe zu Schritt'} ${index + 1}`}
              />
            ))}
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrev}
              disabled={isFirstStep}
              className={`flex items-center justify-center gap-1 px-3.5 py-2 rounded-xl text-sm transition-colors font-medium min-w-[2.75rem] ${
                isFirstStep
                  ? 'text-gray-300 cursor-not-allowed'
                  : 'text-gray-600 hover:bg-gray-200 bg-white border border-gray-200'
              }`}
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">{lang === 'en' ? 'Back' : 'Zurück'}</span>
            </button>

            <button
              onClick={handleSkip}
              className="flex-shrink-0 px-3.5 py-2 rounded-xl text-gray-500 hover:text-gray-700 hover:bg-gray-200 transition-colors text-sm font-medium"
            >
              {lang === 'en' ? 'Skip' : 'Übersp.'}
            </button>

            <button
              onClick={handleNext}
              className="flex-1 flex items-center justify-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2.5 rounded-xl transition-all text-sm font-semibold shadow-sm"
            >
              {isLastStep ? (
                <>{lang === 'en' ? "Let's Go!" : 'Los geht\'s!'}</>
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
