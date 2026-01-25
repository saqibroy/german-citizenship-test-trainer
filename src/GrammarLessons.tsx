import { useState, useEffect } from 'react';
import { BookOpen, GraduationCap, Lightbulb, CheckCircle2, AlertCircle } from 'lucide-react';
import { GERMAN_GRAMMAR_LESSONS } from './germanLessons.js';
import { LESSON_TRANSLATIONS, GRAMMAR_UI_TRANSLATIONS, CATEGORY_TRANSLATIONS, LEVEL_TRANSLATIONS } from './grammarLessonTranslations';
import { 
  getTranslatedNote, 
  getTranslatedKeyRules, 
  getTranslatedCommonMistakes, 
  getTranslatedQuickTips, 
  getTranslatedExamTips 
} from './grammarLessonContent';

export function GrammarLessonsPage({ lang }: { lang: 'de' | 'en' }) {
  const [currentLessonIndex, setCurrentLessonIndex] = useState<number>(0);
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(new Set());
  const [viewMode, setViewMode] = useState<'list' | 'lesson'>('list');

  // Get UI translations for current language
  const t = GRAMMAR_UI_TRANSLATIONS[lang];

  // Helper function to get translated lesson content
  const getTranslatedLesson = (lesson: any) => {
    const translation = LESSON_TRANSLATIONS[lesson.id]?.[lang];
    if (translation) {
      return {
        ...lesson,
        title: translation.title,
        description: translation.description,
        category: translation.category,
        content: {
          ...lesson.content,
          explanation: translation.explanation || lesson.content.explanation,
          pattern: translation.pattern || lesson.content.pattern,
        }
      };
    }
    return lesson;
  };

  // Helper function to translate category
  const translateCategory = (category: string) => {
    return CATEGORY_TRANSLATIONS[category]?.[lang] || category;
  };

  // Helper function to translate level
  const translateLevel = (level: string) => {
    return LEVEL_TRANSLATIONS[level]?.[lang] || level;
  };

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
  const translatedCurrentLesson = currentLesson ? getTranslatedLesson(currentLesson) : null;
  
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const startLesson = (index: number) => {
    setCurrentLessonIndex(index);
    setViewMode('lesson');
    scrollToTop();
  };

  const completeAndNext = () => {
    if (currentLesson) {
      markLessonComplete(currentLesson.id);
      if (currentLessonIndex < sortedLessons.length - 1) {
        setCurrentLessonIndex(currentLessonIndex + 1);
        scrollToTop();
      } else {
        setViewMode('list');
      }
    }
  };

  const backToList = () => {
    setViewMode('list');
    scrollToTop();
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (viewMode === 'lesson' && translatedCurrentLesson) {
    const lesson = translatedCurrentLesson;
    return (
      <div className="p-4 space-y-4">
        <button onClick={backToList} className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-semibold">
          ← {t.backToLessons}
        </button>

        <div className="bg-gradient-to-br from-blue-600 to-purple-600 text-white rounded-2xl p-6 shadow-xl">
          <div className="flex items-start gap-3 mb-3">
            <GraduationCap size={32} />
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span className={'inline-block px-3 py-1 rounded-full text-xs font-bold ' + getLevelColor(currentLesson.level) + ' bg-opacity-90'}>
                  {translateLevel(currentLesson.level)}
                </span>
                {completedLessons.has(currentLesson.id) && (
                  <span className="inline-flex items-center gap-1 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                    <CheckCircle2 size={14} /> {t.completed}
                  </span>
                )}
              </div>
              <h1 className="text-2xl font-bold mb-2">{lesson.title}</h1>
              <p className="opacity-90 text-sm">{lesson.description}</p>
            </div>
          </div>
          <div className="bg-purple-900 bg-opacity-30 rounded-lg p-3 mt-4">
            <div className="text-xs font-semibold text-purple-100 mb-1">{t.category}</div>
            <div className="font-bold text-white">{lesson.category}</div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg space-y-6">
          {lesson.content.explanation && (
            <div className="bg-blue-50 rounded-xl p-4 border-l-4 border-blue-500">
              <div className="flex items-start gap-3">
                <Lightbulb className="text-blue-600 flex-shrink-0" size={24} />
                <div>
                  <h3 className="font-bold text-blue-900 mb-2">{t.explanation}</h3>
                  <p className="text-blue-800">{lesson.content.explanation}</p>
                </div>
              </div>
            </div>
          )}

          {lesson.content.pattern && (
            <div className="bg-purple-50 rounded-xl p-4 border-l-4 border-purple-500">
              <h3 className="font-bold text-purple-900 mb-2">{t.pattern}</h3>
              {typeof lesson.content.pattern === 'string' ? (
                <p className="font-mono text-purple-800 bg-white p-3 rounded">{lesson.content.pattern}</p>
              ) : (
                <div className="space-y-2">
                  {Object.entries(lesson.content.pattern).map(([key, value]: [string, any]) => (
                    <div key={key} className="font-mono text-purple-800 bg-white p-3 rounded">
                      <span className="font-bold">{key}:</span> {value}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {lesson.content.examples && lesson.content.examples.length > 0 && (
            <div className="space-y-3">
              <h3 className="font-bold text-gray-800 text-lg">{t.examples}</h3>
              {lesson.content.examples.map((example: any, idx: number) => (
                <div key={idx} className="bg-gray-50 rounded-xl p-4 border-l-4 border-gray-300">
                  <div className="space-y-3">
                    <div>
                      <div className="text-xs font-semibold text-gray-600 mb-1">{t.german}</div>
                      <p className="font-semibold text-gray-900">{example.german}</p>
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-gray-600 mb-1">{t.english}</div>
                      <p className="text-gray-700">{example.english}</p>
                    </div>
                    {example.breakdown && (
                      <div className="bg-white rounded-lg p-3">
                        <div className="text-xs font-semibold text-blue-600 mb-2">{t.breakdown}</div>
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
                        <div className="text-xs font-semibold text-yellow-800 mb-1">{t.notes}</div>
                        <p className="text-yellow-900">{getTranslatedNote(currentLesson.id, idx, lang) || example.notes}</p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {lesson.content.keyRules && lesson.content.keyRules.length > 0 && (
            <div className="bg-green-50 rounded-xl p-4 border-l-4 border-green-500">
              <h3 className="font-bold text-green-900 mb-3 flex items-center gap-2">
                <CheckCircle2 className="text-green-600" size={20} />
                {t.keyRules}
              </h3>
              <ul className="space-y-2">
                {(getTranslatedKeyRules(currentLesson.id, lang) || lesson.content.keyRules).map((rule: string, idx: number) => (
                  <li key={idx} className="flex gap-2 text-green-800">
                    <span className="flex-shrink-0">•</span>
                    <span>{rule}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {lesson.content.commonMistakes && lesson.content.commonMistakes.length > 0 && (
            <div className="bg-red-50 rounded-xl p-4 border-l-4 border-red-500">
              <h3 className="font-bold text-red-900 mb-3 flex items-center gap-2">
                <AlertCircle className="text-red-600" size={20} />
                {t.commonMistakes}
              </h3>
              <div className="space-y-2">
                {(getTranslatedCommonMistakes(currentLesson.id, lang) || lesson.content.commonMistakes).map((mistake: string, idx: number) => (
                  <div key={idx} className="text-red-800 font-mono text-sm bg-white p-2 rounded">{mistake}</div>
                ))}
              </div>
            </div>
          )}

          {lesson.content.quickTips && lesson.content.quickTips.length > 0 && (
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4 border-l-4 border-purple-500">
              <h3 className="font-bold text-purple-900 mb-3 flex items-center gap-2">
                <Lightbulb className="text-purple-600" size={20} />
                {t.quickTips}
              </h3>
              <div className="space-y-2">
                {(getTranslatedQuickTips(currentLesson.id, lang) || lesson.content.quickTips).map((tip: string, idx: number) => (
                  <div key={idx} className="flex gap-2 text-purple-800 bg-white p-3 rounded-lg">
                    <span>{tip}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {lesson.content.examTips && lesson.content.examTips.length > 0 && (
            <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-4 border-l-4 border-orange-500">
              <h3 className="font-bold text-orange-900 mb-3 flex items-center gap-2">
                <GraduationCap className="text-orange-600" size={20} />
                {t.examTips}
              </h3>
              <div className="space-y-2">
                {(getTranslatedExamTips(currentLesson.id, lang) || lesson.content.examTips).map((tip: string, idx: number) => (
                  <div key={idx} className="flex gap-2 text-orange-800 bg-white p-3 rounded-lg font-semibold">
                    <span>{tip}</span>
                  </div>
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
                  ? t.nextLesson
                  : t.backToLessonsList}
              </>
            ) : (
              <>
                <CheckCircle2 size={24} />
                {t.markCompleteAndContinue}
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
          <h2 className="text-2xl font-bold">{t.grammarLessons}</h2>
        </div>
        <p className="opacity-90 text-sm">{t.learnGrammar}</p>
      </div>

      <div className="bg-white rounded-xl p-4 shadow-md">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm text-gray-600 mb-1">{t.progress}</div>
            <div className="text-2xl font-bold text-purple-600">{completedLessons.size} / {sortedLessons.length}</div>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-600 mb-1">{t.completedLabel}</div>
            <div className="text-2xl font-bold text-green-600">{Math.round((completedLessons.size / sortedLessons.length) * 100)}%</div>
          </div>
        </div>
        <div className="mt-3 bg-gray-200 rounded-full h-2">
          <div className="bg-gradient-to-r from-purple-500 to-green-500 h-2 rounded-full transition-all duration-500" style={{ width: (completedLessons.size / sortedLessons.length) * 100 + '%' }} />
        </div>
      </div>

      <div className="space-y-3">
        {sortedLessons.map((lesson, index) => {
          const translatedLesson = getTranslatedLesson(lesson);
          const isCompleted = completedLessons.has(lesson.id);
          const lessonNumber = index + 1;
          return (
            <div key={lesson.id} className={'bg-white rounded-xl p-4 shadow-md transition-all ' + (isCompleted ? 'border-2 border-green-500' : '')}>
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="bg-purple-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">{lessonNumber}</span>
                    <span className={'px-2 py-1 rounded-full text-xs font-bold ' + getLevelColor(lesson.level)}>{translateLevel(lesson.level)}</span>
                    <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">{translateCategory(lesson.category)}</span>
                    {isCompleted && (
                      <span className="inline-flex items-center gap-1 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                        <CheckCircle2 size={12} /> {t.done}
                      </span>
                    )}
                  </div>
                  <h3 className="font-bold text-gray-800 mb-1">{translatedLesson.title}</h3>
                  <p className="text-sm text-gray-600">{translatedLesson.description}</p>
                </div>
              </div>
              <button onClick={() => startLesson(index)} className={'w-full ' + (isCompleted ? 'bg-gradient-to-r from-blue-500 to-cyan-500' : 'bg-gradient-to-r from-purple-500 to-pink-500') + ' text-white rounded-lg p-3 font-bold shadow hover:shadow-lg transition-all flex items-center justify-center gap-2'}>
                <BookOpen size={20} />
                {isCompleted ? t.reviewLesson : t.startLesson}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
