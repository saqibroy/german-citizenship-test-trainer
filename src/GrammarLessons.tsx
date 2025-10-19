import { useState, useEffect } from 'react';
import { BookOpen, GraduationCap, Lightbulb, CheckCircle2, AlertCircle } from 'lucide-react';
import { GERMAN_GRAMMAR_LESSONS } from './germanLessons.js';

export function GrammarLessonsPage({ lang }: { lang: 'de' | 'en' }) {
  const [currentLessonIndex, setCurrentLessonIndex] = useState<number>(0);
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(new Set());
  const [viewMode, setViewMode] = useState<'list' | 'lesson'>('list');

  useEffect(() => {
    const saved = localStorage.getItem('completedGrammarLessons');
    if (saved) {
      setCompletedLessons(new Set(JSON.parse(saved)));
    }
  }, []);

  const markLessonComplete = (lessonId: string) => {
    const newCompleted = new Set(completedLessons);
    newCompleted.add(lessonId);
    setCompletedLessons(newCompleted);
    localStorage.setItem('completedGrammarLessons', JSON.stringify(Array.from(newCompleted)));
  };

  const sortedLessons = [...GERMAN_GRAMMAR_LESSONS].sort((a, b) => {
    const numA = parseInt(a.id.split('-')[1]);
    const numB = parseInt(b.id.split('-')[1]);
    return numA - numB;
  });

  const currentLesson = sortedLessons[currentLessonIndex];
  
  const startLesson = (index: number) => {
    setCurrentLessonIndex(index);
    setViewMode('lesson');
  };

  const completeAndNext = () => {
    if (currentLesson) {
      markLessonComplete(currentLesson.id);
      if (currentLessonIndex < sortedLessons.length - 1) {
        setCurrentLessonIndex(currentLessonIndex + 1);
      } else {
        setViewMode('list');
      }
    }
  };

  const backToList = () => {
    setViewMode('list');
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (viewMode === 'lesson' && currentLesson) {
    return (
      <div className="p-4 space-y-4">
        <button onClick={backToList} className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-semibold">
          ← {lang === 'de' ? 'Zurück zu Lektionen' : 'Back to Lessons'}
        </button>

        <div className="bg-gradient-to-br from-blue-600 to-purple-600 text-white rounded-2xl p-6 shadow-xl">
          <div className="flex items-start gap-3 mb-3">
            <GraduationCap size={32} />
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span className={'inline-block px-3 py-1 rounded-full text-xs font-bold ' + getLevelColor(currentLesson.level) + ' bg-opacity-90'}>
                  {currentLesson.level}
                </span>
                {completedLessons.has(currentLesson.id) && (
                  <span className="inline-flex items-center gap-1 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                    <CheckCircle2 size={14} /> {lang === 'de' ? 'Abgeschlossen' : 'Completed'}
                  </span>
                )}
              </div>
              <h1 className="text-2xl font-bold mb-2">{currentLesson.title}</h1>
              <p className="opacity-90 text-sm">{currentLesson.description}</p>
            </div>
          </div>
          <div className="bg-white bg-opacity-20 rounded-lg p-3 mt-4">
            <div className="text-xs font-semibold opacity-80 mb-1">{lang === 'de' ? 'Kategorie' : 'Category'}</div>
            <div className="font-bold">{currentLesson.category}</div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg space-y-6">
          {currentLesson.content.explanation && (
            <div className="bg-blue-50 rounded-xl p-4 border-l-4 border-blue-500">
              <div className="flex items-start gap-3">
                <Lightbulb className="text-blue-600 flex-shrink-0" size={24} />
                <div>
                  <h3 className="font-bold text-blue-900 mb-2">{lang === 'de' ? 'Erklärung' : 'Explanation'}</h3>
                  <p className="text-blue-800">{currentLesson.content.explanation}</p>
                </div>
              </div>
            </div>
          )}

          {currentLesson.content.pattern && (
            <div className="bg-purple-50 rounded-xl p-4 border-l-4 border-purple-500">
              <h3 className="font-bold text-purple-900 mb-2">{lang === 'de' ? 'Muster' : 'Pattern'}</h3>
              {typeof currentLesson.content.pattern === 'string' ? (
                <p className="font-mono text-purple-800 bg-white p-3 rounded">{currentLesson.content.pattern}</p>
              ) : (
                <div className="space-y-2">
                  {Object.entries(currentLesson.content.pattern).map(([key, value]: [string, any]) => (
                    <div key={key} className="font-mono text-purple-800 bg-white p-3 rounded">
                      <span className="font-bold">{key}:</span> {value}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {currentLesson.content.examples && currentLesson.content.examples.length > 0 && (
            <div className="space-y-3">
              <h3 className="font-bold text-gray-800 text-lg">{lang === 'de' ? '💡 Beispiele' : '💡 Examples'}</h3>
              {currentLesson.content.examples.map((example: any, idx: number) => (
                <div key={idx} className="bg-gray-50 rounded-xl p-4 border-l-4 border-gray-300">
                  <div className="space-y-3">
                    <div>
                      <div className="text-xs font-semibold text-gray-600 mb-1">🇩🇪 {lang === 'de' ? 'Deutsch' : 'German'}</div>
                      <p className="font-semibold text-gray-900">{example.german}</p>
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-gray-600 mb-1">🇬🇧 {lang === 'de' ? 'Englisch' : 'English'}</div>
                      <p className="text-gray-700">{example.english}</p>
                    </div>
                    {example.breakdown && (
                      <div className="bg-white rounded-lg p-3">
                        <div className="text-xs font-semibold text-blue-600 mb-2">📝 {lang === 'de' ? 'Aufschlüsselung' : 'Breakdown'}</div>
                        <div className="space-y-1 text-sm">
                          {Object.entries(example.breakdown).map(([key, value]: [string, any]) => (
                            <div key={key} className="flex gap-2">
                              <span className="font-semibold text-gray-700 capitalize">{key}:</span>
                              <span className="text-gray-600">{value}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    {example.notes && (
                      <div className="bg-yellow-50 rounded-lg p-3 text-sm">
                        <div className="text-xs font-semibold text-yellow-800 mb-1">💡 {lang === 'de' ? 'Hinweise' : 'Notes'}</div>
                        <p className="text-yellow-900">{example.notes}</p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {currentLesson.content.keyRules && currentLesson.content.keyRules.length > 0 && (
            <div className="bg-green-50 rounded-xl p-4 border-l-4 border-green-500">
              <h3 className="font-bold text-green-900 mb-3 flex items-center gap-2">
                <CheckCircle2 className="text-green-600" size={20} />
                {lang === 'de' ? '✅ Wichtige Regeln' : '✅ Key Rules'}
              </h3>
              <ul className="space-y-2">
                {currentLesson.content.keyRules.map((rule: string, idx: number) => (
                  <li key={idx} className="flex gap-2 text-green-800">
                    <span className="flex-shrink-0">•</span>
                    <span>{rule}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {currentLesson.content.commonMistakes && currentLesson.content.commonMistakes.length > 0 && (
            <div className="bg-red-50 rounded-xl p-4 border-l-4 border-red-500">
              <h3 className="font-bold text-red-900 mb-3 flex items-center gap-2">
                <AlertCircle className="text-red-600" size={20} />
                {lang === 'de' ? '⚠️ Häufige Fehler' : '⚠️ Common Mistakes'}
              </h3>
              <div className="space-y-2">
                {currentLesson.content.commonMistakes.map((mistake: string, idx: number) => (
                  <div key={idx} className="text-red-800 font-mono text-sm bg-white p-2 rounded">{mistake}</div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="sticky bottom-4 mt-6">
          <button onClick={completeAndNext} className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl p-4 font-bold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2">
            {completedLessons.has(currentLesson.id) ? (
              <>
                <CheckCircle2 size={24} />
                {currentLessonIndex < sortedLessons.length - 1 
                  ? (lang === 'de' ? 'Nächste Lektion' : 'Next Lesson')
                  : (lang === 'de' ? 'Zu den Lektionen' : 'Back to Lessons')}
              </>
            ) : (
              <>
                <CheckCircle2 size={24} />
                {lang === 'de' ? 'Als abgeschlossen markieren & weiter' : 'Mark Complete & Continue'}
              </>
            )}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-4">
      <div className="bg-gradient-to-br from-purple-600 to-indigo-600 text-white rounded-2xl p-6 shadow-xl">
        <div className="flex items-center gap-3 mb-2">
          <GraduationCap size={28} />
          <h2 className="text-2xl font-bold">{lang === 'de' ? 'Grammatik-Lektionen' : 'Grammar Lessons'}</h2>
        </div>
        <p className="opacity-90 text-sm">
          {lang === 'de' 
            ? 'Lerne deutsche Satzstruktur und Grammatik für den Einbürgerungstest' 
            : 'Learn German sentence structure and grammar for the citizenship test'}
        </p>
        <div className="bg-white bg-opacity-20 rounded-lg p-3 mt-4">
          <p className="text-sm font-semibold text-white">
            {lang === 'de'
              ? '📚 12 umfassende Lektionen • Alle Erklärungen auf Englisch'
              : '📚 12 comprehensive lessons • All explanations in English'}
          </p>
        </div>
      </div>

      <div className="bg-white rounded-xl p-4 shadow-md">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm text-gray-600 mb-1">{lang === 'de' ? 'Fortschritt' : 'Progress'}</div>
            <div className="text-2xl font-bold text-purple-600">{completedLessons.size} / {sortedLessons.length}</div>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-600 mb-1">{lang === 'de' ? 'Abgeschlossen' : 'Completed'}</div>
            <div className="text-2xl font-bold text-green-600">{Math.round((completedLessons.size / sortedLessons.length) * 100)}%</div>
          </div>
        </div>
        <div className="mt-3 bg-gray-200 rounded-full h-2">
          <div className="bg-gradient-to-r from-purple-500 to-green-500 h-2 rounded-full transition-all duration-500" style={{ width: (completedLessons.size / sortedLessons.length) * 100 + '%' }} />
        </div>
      </div>

      <div className="space-y-3">
        {sortedLessons.map((lesson, index) => {
          const isCompleted = completedLessons.has(lesson.id);
          const lessonNumber = index + 1;
          return (
            <div key={lesson.id} className={'bg-white rounded-xl p-4 shadow-md transition-all ' + (isCompleted ? 'border-2 border-green-500' : '')}>
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="bg-purple-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">{lessonNumber}</span>
                    <span className={'px-2 py-1 rounded-full text-xs font-bold ' + getLevelColor(lesson.level)}>{lesson.level}</span>
                    <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">{lesson.category}</span>
                    {isCompleted && (
                      <span className="inline-flex items-center gap-1 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                        <CheckCircle2 size={12} /> {lang === 'de' ? 'Fertig' : 'Done'}
                      </span>
                    )}
                  </div>
                  <h3 className="font-bold text-gray-800 mb-1">{lesson.title}</h3>
                  <p className="text-sm text-gray-600">{lesson.description}</p>
                </div>
              </div>
              <button onClick={() => startLesson(index)} className={'w-full ' + (isCompleted ? 'bg-gradient-to-r from-blue-500 to-cyan-500' : 'bg-gradient-to-r from-purple-500 to-pink-500') + ' text-white rounded-lg p-3 font-bold shadow hover:shadow-lg transition-all flex items-center justify-center gap-2'}>
                <BookOpen size={20} />
                {isCompleted ? (lang === 'de' ? 'Erneut lernen' : 'Review Lesson') : (lang === 'de' ? 'Lektion starten' : 'Start Lesson')}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
