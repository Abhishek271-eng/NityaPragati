// ──────────────────────────────────────────────────────────────────
// KARNATAKA SDA / FDA EXAM REFERENCE DATA
//
// Grounded in the publicly documented KPSC (Karnataka Public Service
// Commission) SDA / FDA exam pattern. General pattern information is
// public knowledge; specific per-year question papers are referenced
// in previousYearPapers.ts with explicit availability/verification.
// ──────────────────────────────────────────────────────────────────

export interface ExamInfo {
  name: string;
  fullName: string;
  conductingBody: string;
  description: string;
  examMode: string;
  negativeMarking: boolean;
  marksPerQuestion: number;
  sections: Array<{
    name: string;
    weightage: number; // approx % of paper
    description: string;
  }>;
  officialUrl: string;
}

export const examInfo: Record<'SDA' | 'FDA', ExamInfo> = {
  SDA: {
    name: 'SDA',
    fullName: 'Second Division Assistant',
    conductingBody: 'Karnataka Public Service Commission (KPSC)',
    description:
      'The Second Division Assistant (SDA) examination is a KPSC-conducted competitive exam for state government clerical/assistant roles in Karnataka. It tests general knowledge, language skills, and mental ability.',
    examMode: 'Offline (OMR / CBT as per notification)',
    negativeMarking: false,
    marksPerQuestion: 1,
    sections: [
      { name: 'Kannada', weightage: 20, description: 'Grammar, Vocabulary, Comprehension, Literature' },
      { name: 'English', weightage: 20, description: 'Grammar, Vocabulary, Comprehension, Error Detection' },
      { name: 'General Knowledge', weightage: 30, description: 'Karnataka GK, History, Geography, Polity, Economy, Science, Current Affairs' },
      { name: 'Mental Ability / Aptitude', weightage: 15, description: 'Number System, Percentage, Ratio, Time & Work, DI' },
      { name: 'Reasoning', weightage: 15, description: 'Series, Analogy, Coding, Blood Relations, Puzzles' },
    ],
    officialUrl: 'https://kpsc.kar.nic.in',
  },
  FDA: {
    name: 'FDA',
    fullName: 'First Division Assistant',
    conductingBody: 'Karnataka Public Service Commission (KPSC)',
    description:
      'The First Division Assistant (FDA) examination is a higher-level KPSC clerical exam for Karnataka state government departments. It is generally considered more demanding than SDA.',
    examMode: 'Offline (OMR / CBT as per notification)',
    negativeMarking: false,
    marksPerQuestion: 1,
    sections: [
      { name: 'Kannada', weightage: 20, description: 'Grammar, Vocabulary, Comprehension, Literature' },
      { name: 'English', weightage: 20, description: 'Grammar, Vocabulary, Comprehension, Error Detection' },
      { name: 'General Knowledge', weightage: 30, description: 'Karnataka GK, History, Geography, Polity, Economy, Science, Current Affairs' },
      { name: 'Mental Ability / Aptitude', weightage: 15, description: 'Number System, Percentage, Ratio, Time & Work, DI' },
      { name: 'Reasoning', weightage: 15, description: 'Series, Analogy, Coding, Blood Relations, Puzzles' },
    ],
    officialUrl: 'https://kpsc.kar.nic.in',
  },
};

export const getExamInfo = (examType: 'SDA' | 'FDA') => examInfo[examType];

// Recommended study strategy derived from the public pattern
export const studyStrategy = {
  recommendedDailyStudy: 90, // minutes
  revisionFrequency: 'Weekly review of weak topics',
  mockFrequency: '1 full mock per week',
  priorityAreas: ['Karnataka GK', 'Kannada Grammar', 'Quantitative Aptitude', 'Current Affairs'],
};
