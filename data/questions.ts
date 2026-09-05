import { Question, SubjectId, TestAttempt } from '../types';
import { historyQuestions } from './questions/history';
import { grammarQuestions } from './questions/grammar';
import { constitutionQuestions } from './questions/constitution';
import { geographyQuestions } from './questions/geography';
import { aptitudeQuestions } from './questions/aptitude';
import { gkQuestions } from './questions/gk';

// ═══════════════════════════════════════════════════════════════
// NityaPragati — aggregate question registry & selection helpers.
// Banks live in src/data/questions/<subject>.ts; add new questions
// there — nothing below needs to change.
// ═══════════════════════════════════════════════════════════════

export const questionBanks = {
  history: historyQuestions,
  grammar: grammarQuestions,
  constitution: constitutionQuestions,
  geography: geographyQuestions,
  aptitude: aptitudeQuestions,
  gk: gkQuestions,
} as const;

export const allQuestions: Question[] = [
  ...historyQuestions,
  ...grammarQuestions,
  ...constitutionQuestions,
  ...geographyQuestions,
  ...aptitudeQuestions,
  ...gkQuestions,
];

const qIndex = new Map(allQuestions.map((q) => [q.id, q]));

export function getQuestionById(id: string): Question | undefined {
  return qIndex.get(id);
}

export function getQuestionsBySubject(subjectId: SubjectId): Question[] {
  return allQuestions.filter((q) => q.subjectId === subjectId);
}

export function getQuestionsByTopic(topicId: string): Question[] {
  return allQuestions.filter((q) => q.topicId === topicId);
}

export function getQuestionsByTopics(topicIds: string[]): Question[] {
  return allQuestions.filter((q) => topicIds.includes(q.topicId));
}

// Total available per subject (drives SubjectCard "N ಪ್ರಶ್ನೆಗಳು")
export function questionCountForSubject(subjectId: SubjectId): number {
  return getQuestionsBySubject(subjectId).length;
}

export function topicQuestionCount(topicId: string): number {
  return getQuestionsByTopic(topicId).length;
}

export interface QuestionFilter {
  subjectId?: SubjectId;
  topicId?: string;
  category?: Question['category'];
  difficulty?: Question['difficulty'];
  count?: number;
  startOffset?: number; // rotate through pool deterministically
}

// Deterministic selection (no randomness → stable across renders).
export function pickQuestions(filter: QuestionFilter): Question[] {
  let pool = allQuestions;
  if (filter.subjectId) pool = pool.filter((q) => q.subjectId === filter.subjectId);
  if (filter.topicId) pool = pool.filter((q) => q.topicId === filter.topicId);
  if (filter.category) pool = pool.filter((q) => q.category === filter.category);
  if (filter.difficulty) pool = pool.filter((q) => q.difficulty === filter.difficulty);
  if (!pool.length) return [];

  const count = filter.count ?? pool.length;
  if (count >= pool.length) return pool;
  const offset = (filter.startOffset ?? 0) % pool.length;
  const rotated = [...pool.slice(offset), ...pool.slice(0, offset)];
  return rotated.slice(0, count);
}

// Practice set for a subject — all non-previousYear questions, capped.
export function getPracticeSet(subjectId: SubjectId, count = 15): Question[] {
  return pickQuestions({ subjectId, count });
}

// Daily challenge — a rotating balanced 5-question mix across the
// four core modules, stable per day (offset = day-of-year).
export function getDailyChallenge(): Question[] {
  const day = Math.floor(Date.now() / 86400000);
  const cores: SubjectId[] = ['history', 'grammar', 'constitution', 'geography'];
  const parts = cores.map((sid, i) =>
    pickQuestions({ subjectId: sid, count: 1, startOffset: (day + i * 7) % 100 }),
  );
  const pick5 = parts.flat();
  const fill = pickQuestions({ count: 5 - pick5.length || 0 });
  return [...pick5, ...fill].slice(0, 5);
}

// Bookmarked questions by id list
export function getQuestionsByIds(ids: string[]): Question[] {
  return ids.map((id) => qIndex.get(id)).filter((q): q is Question => Boolean(q));
}

export function countBySubject(): Record<SubjectId, number> {
  const out = {} as Record<SubjectId, number>;
  for (const sid of Object.keys(questionBanks) as SubjectId[]) {
    out[sid] = questionCountForSubject(sid);
  }
  return out;
}

// Allow tests to reference attempt types without circular imports
export type AttemptTestType = TestAttempt['testType'];