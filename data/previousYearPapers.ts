import { PreviousYearPaper } from '../types';

// ──────────────────────────────────────────────────────────────────
// KARNATAKA SDA / FDA PREVIOUS YEAR PAPERS
//
// DATA INTEGRITY:
//  - `isAvailable: true`  → a pattern-based practice set exists in
//    paperQuestions.ts for this paperId (routing fallback). It is a
//    NityaPragati PRACTICE SET — never claimed to be verbatim official.
//  - `isVerified: true`    → structure/pattern is grounded in the
//    public KPSC notification + widely referenced exam pattern.
//  - The UI surfaces "ರಚನಾ ಮಾದರಿ" (pattern) badges accordingly.
// ──────────────────────────────────────────────────────────────────
export const previousYearPapers: PreviousYearPaper[] = [
  {
    id: 'sda-2024',
    examType: 'SDA',
    title: 'SDA 2024 — Second Division Assistant',
    titleKn: 'SDA 2024 — ಸೆಕೆಂಡ್ ಡಿವಿಷನ್ ಅಸಿಸ್ಟೆಂಟ್',
    year: 2024,
    subject: 'Full Paper',
    questionCount: 100,
    duration: 120,
    difficulty: 'Moderate',
    source: 'KPSC SDA 2024 notification + public pattern reference',
    isVerified: true,
    isAvailable: true,
  },
  {
    id: 'sda-2023',
    examType: 'SDA',
    title: 'SDA 2023 — Second Division Assistant',
    titleKn: 'SDA 2023 — ಸೆಕೆಂಡ್ ಡಿವಿಷನ್ ಅಸಿಸ್ಟೆಂಟ್',
    year: 2023,
    subject: 'Full Paper',
    questionCount: 100,
    duration: 120,
    difficulty: 'Moderate',
    source: 'KPSC SDA 2023 notification + public pattern reference',
    isVerified: true,
    isAvailable: true,
  },
  {
    id: 'sda-2022',
    examType: 'SDA',
    title: 'SDA 2022 — Second Division Assistant',
    titleKn: 'SDA 2022 — ಸೆಕೆಂಡ್ ಡಿವಿಷನ್ ಅಸಿಸ್ಟೆಂಟ್',
    year: 2022,
    subject: 'Full Paper',
    questionCount: 100,
    duration: 120,
    difficulty: 'Moderate',
    source: 'KPSC SDA 2022 notification + public pattern reference',
    isVerified: false,
    isAvailable: true,
  },
  {
    id: 'sda-2021',
    examType: 'SDA',
    title: 'SDA 2021 — Second Division Assistant',
    titleKn: 'SDA 2021 — ಸೆಕೆಂಡ್ ಡಿವಿಷನ್ ಅಸಿಸ್ಟೆಂಟ್',
    year: 2021,
    subject: 'Full Paper',
    questionCount: 100,
    duration: 120,
    difficulty: 'Moderate',
    source: 'KPSC SDA 2021 notification',
    isVerified: false,
    isAvailable: false,
  },
  {
    id: 'fda-2024',
    examType: 'FDA',
    title: 'FDA 2024 — First Division Assistant',
    titleKn: 'FDA 2024 — ಫಸ್ಟ್ ಡಿವಿಷನ್ ಅಸಿಸ್ಟೆಂಟ್',
    year: 2024,
    subject: 'Full Paper',
    questionCount: 100,
    duration: 120,
    difficulty: 'Hard',
    source: 'KPSC FDA 2024 notification + public pattern reference',
    isVerified: true,
    isAvailable: true,
  },
  {
    id: 'fda-2023',
    examType: 'FDA',
    title: 'FDA 2023 — First Division Assistant',
    titleKn: 'FDA 2023 — ಫಸ್ಟ್ ಡಿವಿಷನ್ ಅಸಿಸ್ಟೆಂಟ್',
    year: 2023,
    subject: 'Full Paper',
    questionCount: 100,
    duration: 120,
    difficulty: 'Hard',
    source: 'KPSC FDA 2023 notification + public pattern reference',
    isVerified: true,
    isAvailable: true,
  },
  {
    id: 'fda-2022',
    examType: 'FDA',
    title: 'FDA 2022 — First Division Assistant',
    titleKn: 'FDA 2022 — ಫಸ್ಟ್ ಡಿವಿಷನ್ ಅಸಿಸ್ಟೆಂಟ್',
    year: 2022,
    subject: 'Full Paper',
    questionCount: 100,
    duration: 120,
    difficulty: 'Hard',
    source: 'KPSC FDA 2022 notification',
    isVerified: false,
    isAvailable: false,
  },
  {
    id: 'fda-2021',
    examType: 'FDA',
    title: 'FDA 2021 — First Division Assistant',
    titleKn: 'FDA 2021 — ಫಸ್ಟ್ ಡಿವಿಷನ್ ಅಸಿಸ್ಟೆಂಟ್',
    year: 2021,
    subject: 'Full Paper',
    questionCount: 100,
    duration: 120,
    difficulty: 'Hard',
    source: 'KPSC FDA 2021 notification',
    isVerified: false,
    isAvailable: false,
  },
];

export const getPapersByExam = (examType: 'SDA' | 'FDA') =>
  previousYearPapers.filter((p) => p.examType === examType);

export const getPaperById = (id: string) =>
  previousYearPapers.find((p) => p.id === id);

export const getAvailablePapers = () => previousYearPapers.filter((p) => p.isAvailable);