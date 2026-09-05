import { Achievement } from '../types';

export const achievements: Achievement[] = [
  { id: 'first_step', title: 'First Step', titleKn: 'ಮೊದಲ ಹೆಜ್ಜೆ', description: 'Solve your first question', icon: '🐾', category: 'milestone', requirement: 1 },
  { id: 'streak_3', title: '3-Day Streak', titleKn: '3 ದಿನ ಸರಣಿ', description: 'Practice for 3 consecutive days', icon: '🔥', category: 'streak', requirement: 3 },
  { id: 'streak_7', title: 'Weekly Warrior', titleKn: 'ಸಪ್ತಾಹ ಯೋಧ', description: 'Practice for 7 consecutive days', icon: '⚡', category: 'streak', requirement: 7 },
  { id: 'streak_30', title: 'Monthly Master', titleKn: 'ಮಾಸಿಕ ಪ್ರಭು', description: 'Practice for 30 consecutive days', icon: '👑', category: 'streak', requirement: 30 },
  { id: 'questions_50', title: '50 Questions', titleKn: '50 ಪ್ರಶ್ನೆಗಳು', description: 'Solve 50 questions', icon: '📚', category: 'volume', requirement: 50 },
  { id: 'questions_200', title: '200 Questions', titleKn: '200 ಪ್ರಶ್ನೆಗಳು', description: 'Solve 200 questions', icon: '🎯', category: 'volume', requirement: 200 },
  { id: 'questions_500', title: 'Question Crusher', titleKn: 'ಪ್ರಶ್ನೆ ವಿಜೇತ', description: 'Solve 500 questions', icon: '🏆', category: 'volume', requirement: 500 },
  { id: 'accuracy_70', title: 'Sharp Shooter', titleKn: 'ನಿಖರ ಗುರಿ', description: 'Achieve 70% accuracy in a mock', icon: '🎯', category: 'accuracy', requirement: 70 },
  { id: 'accuracy_90', title: 'Accuracy Elite', titleKn: 'ನಿಖರತಾ ಎಲೈಟ್', description: 'Achieve 90% accuracy in a mock', icon: '💎', category: 'accuracy', requirement: 90 },
  { id: 'mock_first', title: 'First Mock', titleKn: 'ಮೊದಲ ಮಾದರಿ', description: 'Complete your first mock test', icon: '📝', category: 'milestone', requirement: 1 },
  { id: 'mock_10', title: 'Mock Marathoner', titleKn: 'ಮಾದರಿ ಧಾವಂತ', description: 'Complete 10 mock tests', icon: '🏃', category: 'milestone', requirement: 10 },
  { id: 'speed_demon', title: 'Speed Demon', titleKn: 'ವೇಗ ರಾಕ್ಷಸ', description: 'Average under 60 seconds per question', icon: '⚡', category: 'speed', requirement: 60 },
  { id: 'kannada_master', title: 'Kannada Master', titleKn: 'ಕನ್ನಡ ಪ್ರಭು', description: 'Solve 50 Kannada questions', icon: '📖', category: 'subject', requirement: 50 },
  { id: 'aptitude_master', title: 'Aptitude Ace', titleKn: 'ಸಂಖ್ಯಾ ಪ್ರವೀಣ', description: 'Solve 50 aptitude questions', icon: '📊', category: 'subject', requirement: 50 },
  { id: 'gk_master', title: 'GK Genius', titleKn: 'ಜ್ಞಾನ ಪ್ರತಿಭೆ', description: 'Solve 100 GK questions', icon: '🧠', category: 'subject', requirement: 100 },
];

export const getAchievementById = (id: string) => achievements.find((a) => a.id === id);

export const checkAchievements = (progress: {
  streak: number;
  totalQuestions: number;
  bestAccuracy: number;
  mockCount: number;
  avgTimePerQuestion: number;
  subjectCounts: Record<string, number>;
}): string[] => {
  const unlocked: string[] = [];

  if (progress.totalQuestions >= 1) unlocked.push('first_step');
  if (progress.streak >= 3) unlocked.push('streak_3');
  if (progress.streak >= 7) unlocked.push('streak_7');
  if (progress.streak >= 30) unlocked.push('streak_30');
  if (progress.totalQuestions >= 50) unlocked.push('questions_50');
  if (progress.totalQuestions >= 200) unlocked.push('questions_200');
  if (progress.totalQuestions >= 500) unlocked.push('questions_500');
  if (progress.bestAccuracy >= 70) unlocked.push('accuracy_70');
  if (progress.bestAccuracy >= 90) unlocked.push('accuracy_90');
  if (progress.mockCount >= 1) unlocked.push('mock_first');
  if (progress.mockCount >= 10) unlocked.push('mock_10');
  if (progress.avgTimePerQuestion > 0 && progress.avgTimePerQuestion <= 60) unlocked.push('speed_demon');
  if ((progress.subjectCounts['grammar'] ?? 0) >= 50) unlocked.push('kannada_master');
  if ((progress.subjectCounts['aptitude'] ?? 0) >= 50) unlocked.push('aptitude_master');
  if ((progress.subjectCounts['gk'] ?? 0) >= 100) unlocked.push('gk_master');

  return unlocked;
};
