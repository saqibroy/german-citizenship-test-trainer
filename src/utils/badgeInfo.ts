/**
 * Badge display information utility
 * Maps badge IDs to human-readable names, descriptions, and icons
 */

export interface BadgeInfo {
  name: string;
  nameDE: string;
  description: string;
  descriptionDE: string;
  icon: string;
}

const badgeData: Record<string, BadgeInfo> = {
  first_question: { name: 'First Steps', nameDE: 'Erste Schritte', description: 'Answered your first question', descriptionDE: 'Erste Frage beantwortet', icon: '🎯' },
  explorer: { name: 'Explorer', nameDE: 'Entdecker', description: 'Answered 10 questions', descriptionDE: '10 Fragen beantwortet', icon: '🗺️' },
  dedicated: { name: 'Dedicated', nameDE: 'Engagiert', description: 'Answered 50 questions', descriptionDE: '50 Fragen beantwortet', icon: '💪' },
  committed: { name: 'Committed', nameDE: 'Entschlossen', description: 'Answered 100 questions', descriptionDE: '100 Fragen beantwortet', icon: '🔥' },
  completionist: { name: 'Completionist', nameDE: 'Vollständig', description: 'Attempted all 310 questions', descriptionDE: 'Alle 310 Fragen versucht', icon: '🏆' },
  rookie: { name: 'Rookie', nameDE: 'Anfänger', description: '10 correct answers', descriptionDE: '10 richtige Antworten', icon: '⭐' },
  learner: { name: 'Learner', nameDE: 'Lerner', description: '50 correct answers', descriptionDE: '50 richtige Antworten', icon: '📚' },
  scholar: { name: 'Scholar', nameDE: 'Gelehrter', description: '100 correct answers', descriptionDE: '100 richtige Antworten', icon: '🎓' },
  expert: { name: 'Expert', nameDE: 'Experte', description: '500 correct answers', descriptionDE: '500 richtige Antworten', icon: '👨‍🎓' },
  master_10: { name: 'Master I', nameDE: 'Meister I', description: 'Mastered 10 questions', descriptionDE: '10 Fragen gemeistert', icon: '🥉' },
  master_50: { name: 'Master II', nameDE: 'Meister II', description: 'Mastered 50 questions', descriptionDE: '50 Fragen gemeistert', icon: '🥈' },
  master_100: { name: 'Master III', nameDE: 'Meister III', description: 'Mastered 100 questions', descriptionDE: '100 Fragen gemeistert', icon: '🥇' },
  grandmaster: { name: 'Grandmaster', nameDE: 'Großmeister', description: 'Mastered all 310 questions', descriptionDE: 'Alle 310 Fragen gemeistert', icon: '👑' },
  streak_3: { name: '3-Day Streak', nameDE: '3-Tage-Streak', description: 'Studied 3 days in a row', descriptionDE: '3 Tage in Folge gelernt', icon: '🔥' },
  week_warrior: { name: 'Week Warrior', nameDE: 'Wochen-Krieger', description: '7-day streak', descriptionDE: '7-Tage-Streak', icon: '⚔️' },
  fortnight_fighter: { name: 'Fortnight Fighter', nameDE: '14-Tage-Kämpfer', description: '14-day streak', descriptionDE: '14-Tage-Streak', icon: '🛡️' },
  month_master: { name: 'Month Master', nameDE: 'Monats-Meister', description: '30-day streak', descriptionDE: '30-Tage-Streak', icon: '👑' },
  centurion: { name: 'Centurion', nameDE: 'Zenturio', description: '100-day streak', descriptionDE: '100-Tage-Streak', icon: '🏛️' },
  consistent_10: { name: 'Consistent', nameDE: 'Beständig', description: 'Studied on 10 different days', descriptionDE: 'An 10 verschiedenen Tagen gelernt', icon: '📅' },
  consistent_30: { name: 'Regular', nameDE: 'Regelmäßig', description: 'Studied on 30 different days', descriptionDE: 'An 30 verschiedenen Tagen gelernt', icon: '📆' },
  consistent_60: { name: 'Dedicated Student', nameDE: 'Engagierter Schüler', description: 'Studied on 60 different days', descriptionDE: 'An 60 verschiedenen Tagen gelernt', icon: '📊' },
  first_quiz: { name: 'Quiz Taker', nameDE: 'Quiz-Teilnehmer', description: 'Completed your first quiz', descriptionDE: 'Erstes Quiz absolviert', icon: '📝' },
  quiz_passer: { name: 'Quiz Passer', nameDE: 'Quiz bestanden', description: 'Passed a quiz (17/33)', descriptionDE: 'Quiz bestanden (17/33)', icon: '✅' },
  quiz_master: { name: 'Quiz Master', nameDE: 'Quiz-Meister', description: 'Passed 5 quizzes', descriptionDE: '5 Quizze bestanden', icon: '🎯' },
  quiz_champion: { name: 'Quiz Champion', nameDE: 'Quiz-Champion', description: 'Passed 10 quizzes', descriptionDE: '10 Quizze bestanden', icon: '🏅' },
  perfectionist: { name: 'Perfectionist', nameDE: 'Perfektionist', description: 'Got a perfect quiz score (33/33)', descriptionDE: 'Perfekte Quiz-Punktzahl (33/33)', icon: '💯' },
  speed_demon: { name: 'Speed Demon', nameDE: 'Blitzschnell', description: 'Average answer time under 5 seconds', descriptionDE: 'Durchschnittliche Antwortzeit unter 5 Sekunden', icon: '⚡' }
};

/**
 * Get badge display information by badge ID
 */
export function getBadgeInfo(badgeId: string, lang: 'de' | 'en' = 'en'): { name: string; description: string; icon: string } {
  const badge = badgeData[badgeId];
  if (!badge) {
    return { name: badgeId, description: '', icon: '🏆' };
  }
  return {
    name: lang === 'de' ? badge.nameDE : badge.name,
    description: lang === 'de' ? badge.descriptionDE : badge.description,
    icon: badge.icon
  };
}
