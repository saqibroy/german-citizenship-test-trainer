import React from 'react';

/**
 * Skeleton loader component for better loading UX
 * Replaces generic spinner with content-shaped placeholders
 */

interface SkeletonLoaderProps {
  type?: 'question' | 'stats' | 'quiz' | 'card' | 'badge' | 'list';
  count?: number;
}

export const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({ type = 'question', count = 1 }) => {
  const skeletons = Array.from({ length: count }, (_, i) => i);

  // Animated shimmer effect
  const shimmerClass = "animate-pulse bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%]";

  if (type === 'question') {
    return (
      <div className="space-y-6">
        {skeletons.map((index) => (
          <div key={index} className="bg-white rounded-2xl p-6 shadow-lg">
            {/* Question number */}
            <div className={`h-4 w-24 rounded mb-4 ${shimmerClass}`}></div>
            
            {/* Question text */}
            <div className="space-y-2 mb-6">
              <div className={`h-6 w-full rounded ${shimmerClass}`}></div>
              <div className={`h-6 w-4/5 rounded ${shimmerClass}`}></div>
            </div>

            {/* Answer options */}
            <div className="space-y-3">
              {[1, 2, 3, 4].map((option) => (
                <div key={option} className={`h-14 w-full rounded-xl ${shimmerClass}`}></div>
              ))}
            </div>

            {/* Action buttons */}
            <div className="flex gap-3 mt-6">
              <div className={`h-12 w-32 rounded-lg ${shimmerClass}`}></div>
              <div className={`h-12 w-32 rounded-lg ${shimmerClass}`}></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (type === 'stats') {
    return (
      <div className="space-y-6">
        {/* Header stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((stat) => (
            <div key={stat} className="bg-white rounded-xl p-4 shadow-md">
              <div className={`h-8 w-16 rounded mb-2 ${shimmerClass}`}></div>
              <div className={`h-4 w-24 rounded ${shimmerClass}`}></div>
            </div>
          ))}
        </div>

        {/* Chart placeholder */}
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <div className={`h-6 w-48 rounded mb-4 ${shimmerClass}`}></div>
          <div className={`h-64 w-full rounded ${shimmerClass}`}></div>
        </div>

        {/* Category breakdown */}
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <div className={`h-6 w-40 rounded mb-4 ${shimmerClass}`}></div>
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map((cat) => (
              <div key={cat} className="flex items-center gap-3">
                <div className={`h-10 w-10 rounded ${shimmerClass}`}></div>
                <div className="flex-1">
                  <div className={`h-4 w-32 rounded mb-2 ${shimmerClass}`}></div>
                  <div className={`h-2 w-full rounded ${shimmerClass}`}></div>
                </div>
                <div className={`h-8 w-16 rounded ${shimmerClass}`}></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (type === 'quiz') {
    return (
      <div className="space-y-4">
        {/* Timer */}
        <div className="flex justify-between items-center">
          <div className={`h-6 w-32 rounded ${shimmerClass}`}></div>
          <div className={`h-8 w-20 rounded-full ${shimmerClass}`}></div>
        </div>

        {/* Question */}
        <div className="bg-white rounded-2xl p-6 shadow-xl">
          <div className={`h-5 w-28 rounded mb-4 ${shimmerClass}`}></div>
          <div className="space-y-2 mb-6">
            <div className={`h-6 w-full rounded ${shimmerClass}`}></div>
            <div className={`h-6 w-5/6 rounded ${shimmerClass}`}></div>
          </div>
          <div className="space-y-3">
            {[1, 2, 3, 4].map((option) => (
              <div key={option} className={`h-16 w-full rounded-xl ${shimmerClass}`}></div>
            ))}
          </div>
        </div>

        {/* Progress dots */}
        <div className="flex justify-center gap-2 mt-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className={`h-2 w-2 rounded-full ${shimmerClass}`}></div>
          ))}
        </div>
      </div>
    );
  }

  if (type === 'card') {
    return (
      <div className="bg-white rounded-2xl p-8 shadow-2xl min-h-[400px] flex flex-col justify-center">
        <div className="space-y-6">
          <div className={`h-8 w-32 rounded mx-auto ${shimmerClass}`}></div>
          <div className="space-y-3">
            <div className={`h-6 w-full rounded ${shimmerClass}`}></div>
            <div className={`h-6 w-4/5 rounded mx-auto ${shimmerClass}`}></div>
            <div className={`h-6 w-5/6 rounded mx-auto ${shimmerClass}`}></div>
          </div>
          <div className={`h-12 w-48 rounded-xl mx-auto mt-8 ${shimmerClass}`}></div>
        </div>
      </div>
    );
  }

  if (type === 'badge') {
    return (
      <div className="flex flex-wrap gap-2">
        {skeletons.map((index) => (
          <div key={index} className={`h-8 w-28 rounded-full ${shimmerClass}`}></div>
        ))}
      </div>
    );
  }

  if (type === 'list') {
    return (
      <div className="space-y-3">
        {skeletons.map((index) => (
          <div key={index} className="flex items-center gap-3 bg-white p-4 rounded-lg shadow">
            <div className={`h-12 w-12 rounded-full ${shimmerClass}`}></div>
            <div className="flex-1 space-y-2">
              <div className={`h-4 w-3/4 rounded ${shimmerClass}`}></div>
              <div className={`h-3 w-1/2 rounded ${shimmerClass}`}></div>
            </div>
            <div className={`h-8 w-16 rounded ${shimmerClass}`}></div>
          </div>
        ))}
      </div>
    );
  }

  return null;
};

/**
 * Empty state component for when there's no data
 */
interface EmptyStateProps {
  type: 'progress' | 'quiz' | 'badges' | 'vocab' | 'streak';
  lang: 'de' | 'en';
  onAction?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ type, lang, onAction }) => {
  const content = {
    progress: {
      en: {
        emoji: '📚',
        title: 'No Progress Yet',
        description: 'Start your first training session to begin tracking your progress!',
        action: 'Start Training'
      },
      de: {
        emoji: '📚',
        title: 'Noch kein Fortschritt',
        description: 'Starte deine erste Trainingssitzung, um deinen Fortschritt zu verfolgen!',
        action: 'Training starten'
      }
    },
    quiz: {
      en: {
        emoji: '📝',
        title: 'No Quiz History',
        description: 'Take your first practice quiz to see your results here!',
        action: 'Take Quiz'
      },
      de: {
        emoji: '📝',
        title: 'Keine Quiz-Historie',
        description: 'Mache dein erstes Übungsquiz, um deine Ergebnisse hier zu sehen!',
        action: 'Quiz machen'
      }
    },
    badges: {
      en: {
        emoji: '🏆',
        title: 'No Badges Yet',
        description: 'Earn badges by studying consistently and achieving milestones!',
        action: 'Start Learning'
      },
      de: {
        emoji: '🏆',
        title: 'Noch keine Abzeichen',
        description: 'Verdiene Abzeichen durch regelmäßiges Lernen und das Erreichen von Meilensteinen!',
        action: 'Lernen beginnen'
      }
    },
    vocab: {
      en: {
        emoji: '📖',
        title: 'No Vocabulary Progress',
        description: 'Start learning citizenship vocabulary to build your German skills!',
        action: 'Learn Vocabulary'
      },
      de: {
        emoji: '📖',
        title: 'Kein Vokabel-Fortschritt',
        description: 'Beginne mit dem Erlernen von Einbürgerungsvokabeln, um deine Deutschkenntnisse aufzubauen!',
        action: 'Vokabeln lernen'
      }
    },
    streak: {
      en: {
        emoji: '🔥',
        title: 'No Study Streak Yet',
        description: 'Study for consecutive days to build a streak and stay motivated!',
        action: 'Start Studying'
      },
      de: {
        emoji: '🔥',
        title: 'Noch keine Lernserie',
        description: 'Lerne an aufeinanderfolgenden Tagen, um eine Serie aufzubauen und motiviert zu bleiben!',
        action: 'Lernen beginnen'
      }
    }
  };

  const data = content[type][lang];

  return (
    <div className="flex flex-col items-center justify-center p-12 text-center">
      <div className="text-8xl mb-6 animate-bounce">{data.emoji}</div>
      <h3 className="text-2xl font-bold text-gray-800 mb-3">{data.title}</h3>
      <p className="text-gray-600 mb-6 max-w-md">{data.description}</p>
      {onAction && (
        <button
          onClick={onAction}
          className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transform hover:scale-105 transition-all shadow-lg"
        >
          {data.action}
        </button>
      )}
    </div>
  );
};
