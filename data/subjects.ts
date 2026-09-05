import { Subject, SubjectId, Topic, TopicId } from '../types';

// ═══════════════════════════════════════════════════════════════
// NityaPragati subjects & topics — canonical registry.
// All question banks, tests and analytics key off these ids, so
// extend topics here (never rename, or stored progress breaks).
// ═══════════════════════════════════════════════════════════════

export const subjects: Subject[] = [
  {
    id: 'history',
    name: 'History',
    nameKn: 'ಇತಿಹಾಸ',
    icon: '🏛️',
    tagline: 'ಪ್ರಾಚೀನದಿಂದ ಆಧುನಿಕ ಭಾರತದವರೆಗೆ',
    description:
      'ಭಾರತದ ಮತ್ತು ಕರ್ನಾಟಕದ ಇತಿಹಾಸ — ಪ್ರಾಚೀನ, ಮಧ್ಯಕಾಲೀನ, ಆಧುನಿಕ ಕಾಲಘಟ್ಟಗಳು, ಸ್ವಾತಂತ್ರ್ಯ ಹೋರಾಟ ಮತ್ತು ಪ್ರಮುಖ ಘಟನೆಗಳ ಆಳವಾದ ಅಧ್ಯಯನ.',
    accent: '#6f5bd8',
    tint: '#efedfe',
    topics: [
      { id: 'history_ancient', subjectId: 'history', name: 'Ancient India', nameKn: 'ಪ್ರಾಚೀನ ಭಾರತ', icon: '🏛️', accent: '#6f5bd8' },
      { id: 'history_medieval', subjectId: 'history', name: 'Medieval India', nameKn: 'ಮಧ್ಯಕಾಲೀನ ಭಾರತ', icon: '🕌', accent: '#6f5bd8' },
      { id: 'history_modern', subjectId: 'history', name: 'Modern India', nameKn: 'ಆಧುನಿಕ ಭಾರತ', icon: '📜', accent: '#6f5bd8' },
      { id: 'history_karnataka', subjectId: 'history', name: 'Karnataka History', nameKn: 'ಕರ್ನಾಟಕದ ಇತಿಹಾಸ', icon: '⛩️', accent: '#6f5bd8' },
      { id: 'history_freedom', subjectId: 'history', name: 'Freedom Struggle', nameKn: 'ಸ್ವಾತಂತ್ರ್ಯ ಹೋರಾಟ', icon: '✊', accent: '#6f5bd8' },
      { id: 'history_events', subjectId: 'history', name: 'Landmark Events', nameKn: 'ಪ್ರಮುಖ ಘಟನೆಗಳು', icon: '🗓️', accent: '#6f5bd8' },
    ],
  },
  {
    id: 'grammar',
    name: 'Kannada Grammar',
    nameKn: 'ವ್ಯಾಕರಣ',
    icon: '📖',
    tagline: 'ಕನ್ನಡ ವ್ಯಾಕರಣದ ಸಂಪೂರ್ಣ ಅಭ್ಯಾಸ',
    description:
      'ಸಂಧಿ, ಸಮಾಸ, ವಿಭಕ್ತಿ, ಲಿಂಗ-ವಚನ, ಕಾಲ, ಪದಪ್ರಯೋಗ ಮತ್ತು ವಾಕ್ಯರಚನೆ — KPSC ಕನ್ನಡ ಪತ್ರಿಕೆಗೆ ಅಗತ್ಯವಾದ ಎಲ್ಲಾ ವ್ಯಾಕರಣ ಅಂಶಗಳು.',
    accent: '#0f86d6',
    tint: '#e7f3fd',
    topics: [
      { id: 'grammar_sandhi', subjectId: 'grammar', name: 'Sandhi', nameKn: 'ಸಂಧಿ', icon: '🔗', accent: '#0f86d6' },
      { id: 'grammar_samasa', subjectId: 'grammar', name: 'Samasa', nameKn: 'ಸಮಾಸ', icon: '🧩', accent: '#0f86d6' },
      { id: 'grammar_vibhakti', subjectId: 'grammar', name: 'Vibhakti', nameKn: 'ವಿಭಕ್ತಿ', icon: '🏷️', accent: '#0f86d6' },
      { id: 'grammar_linga', subjectId: 'grammar', name: 'Linga & Vachana', nameKn: 'ಲಿಂಗ ಮತ್ತು ವಚನ', icon: '👥', accent: '#0f86d6' },
      { id: 'grammar_kala', subjectId: 'grammar', name: 'Kala (Tenses)', nameKn: 'ಕಾಲ', icon: '⏳', accent: '#0f86d6' },
      { id: 'grammar_prayoga', subjectId: 'grammar', name: 'Word Usage', nameKn: 'ಪದಪ್ರಯೋಗ', icon: '✍️', accent: '#0f86d6' },
      { id: 'grammar_vakya', subjectId: 'grammar', name: 'Sentence Structure', nameKn: 'ವಾಕ್ಯರಚನೆ', icon: '📝', accent: '#0f86d6' },
    ],
  },
  {
    id: 'constitution',
    name: 'Constitution',
    nameKn: 'ಸಂವಿಧಾನ',
    icon: '⚖️',
    tagline: 'ಭಾರತ ಸಂವಿಧಾನ — ಸಂಪೂರ್ಣ ಮಾರ್ಗದರ್ಶಿ',
    description:
      'ಭಾರತೀಯ ಸಂವಿಧಾನದ ಮೂಲ ಅಂಶಗಳು, ಮೂಲಭೂತ ಹಕ್ಕುಗಳು, ಕರ್ತವ್ಯಗಳು, ನೀತಿ ನಿರ್ದೇಶಕ ತತ್ವಗಳು, ಸಂಸತ್ತು, ಕಾರ್ಯಾಂಗ ಮತ್ತು ನ್ಯಾಯಾಂಗ.',
    accent: '#1a5cff',
    tint: '#e8efff',
    topics: [
      { id: 'constitution_fundamentals', subjectId: 'constitution', name: 'Fundamentals', nameKn: 'ಸಂವಿಧಾನದ ಮೂಲ ಅಂಶಗಳು', icon: '📜', accent: '#1a5cff' },
      { id: 'constitution_rights', subjectId: 'constitution', name: 'Fundamental Rights', nameKn: 'ಮೂಲಭೂತ ಹಕ್ಕುಗಳು', icon: '🕊️', accent: '#1a5cff' },
      { id: 'constitution_duties', subjectId: 'constitution', name: 'Fundamental Duties', nameKn: 'ಮೂಲ ಕರ್ತವ್ಯಗಳು', icon: '🤝', accent: '#1a5cff' },
      { id: 'constitution_dpsp', subjectId: 'constitution', name: 'Directive Principles', nameKn: 'ನೀತಿ ನಿರ್ದೇಶಕ ತತ್ವಗಳು', icon: '🧭', accent: '#1a5cff' },
      { id: 'constitution_parliament', subjectId: 'constitution', name: 'Parliament', nameKn: 'ಸಂಸತ್ತು', icon: '🏛️', accent: '#1a5cff' },
      { id: 'constitution_executive', subjectId: 'constitution', name: 'President & PM', nameKn: 'ರಾಷ್ಟ್ರಪತಿ ಮತ್ತು ಪ್ರಧಾನಮಂತ್ರಿ', icon: '👤', accent: '#1a5cff' },
      { id: 'constitution_judiciary', subjectId: 'constitution', name: 'Judiciary', nameKn: 'ನ್ಯಾಯಾಂಗ', icon: '⚖️', accent: '#1a5cff' },
      { id: 'constitution_state', subjectId: 'constitution', name: 'State Government', nameKn: 'ರಾಜ್ಯ ಸರ್ಕಾರ', icon: '🏢', accent: '#1a5cff' },
      { id: 'constitution_local', subjectId: 'constitution', name: 'Local Governance', nameKn: 'ಸ್ಥಳೀಯ ಆಡಳಿತ', icon: '🗳️', accent: '#1a5cff' },
    ],
  },
  {
    id: 'geography',
    name: 'Geography',
    nameKn: 'ಭೂಗೋಳ',
    icon: '🌍',
    tagline: 'ಭಾರತ ಮತ್ತು ಕರ್ನಾಟಕದ ಭೂಗೋಳ',
    description:
      'ಭಾರತ ಹಾಗೂ ಕರ್ನಾಟಕದ ಭೂಗೋಳ — ನದಿಗಳು, ಪರ್ವತಗಳು, ಹವಾಮಾನ, ಮಣ್ಣು, ಕೃಷಿ ಮತ್ತು ಖನಿಜ ಸಂಪತ್ತಿನ ಸಮಗ್ರ ಅಭ್ಯಾಸ.',
    accent: '#0ca678',
    tint: '#e4f7f0',
    topics: [
      { id: 'geo_india', subjectId: 'geography', name: 'India Geography', nameKn: 'ಭಾರತದ ಭೂಗೋಳ', icon: '🌏', accent: '#0ca678' },
      { id: 'geo_karnataka', subjectId: 'geography', name: 'Karnataka Geography', nameKn: 'ಕರ್ನಾಟಕದ ಭೂಗೋಳ', icon: '🗺️', accent: '#0ca678' },
      { id: 'geo_rivers', subjectId: 'geography', name: 'Rivers', nameKn: 'ನದಿಗಳು', icon: '🌊', accent: '#0ca678' },
      { id: 'geo_mountains', subjectId: 'geography', name: 'Mountains', nameKn: 'ಪರ್ವತಗಳು', icon: '⛰️', accent: '#0ca678' },
      { id: 'geo_climate', subjectId: 'geography', name: 'Climate', nameKn: 'ಹವಾಮಾನ', icon: '🌦️', accent: '#0ca678' },
      { id: 'geo_soil', subjectId: 'geography', name: 'Soils', nameKn: 'ಮಣ್ಣು', icon: '🪨', accent: '#0ca678' },
      { id: 'geo_resources', subjectId: 'geography', name: 'Agriculture & Minerals', nameKn: 'ಕೃಷಿ ಮತ್ತು ಖನಿಜ', icon: '🌾', accent: '#0ca678' },
    ],
  },
  {
    id: 'aptitude',
    name: 'Aptitude',
    nameKn: 'ಸಂಖ್ಯಾಶಕ್ತಿ',
    icon: '📊',
    tagline: 'ಸಂಖ್ಯಾಶಕ್ತಿ ಮತ್ತು ತಾರ್ಕಿಕ ಸಾಮರ್ಥ್ಯ',
    description:
      'ಸ್ಪರ್ಧಾತ್ಮಕ ಪರೀಕ್ಷಾ ದರ್ಜೆಯ ಗಣಿತ ಮತ್ತು ತಾರ್ಕಿಕ ಸಾಮರ್ಥ್ಯ — ಶೇಕಡಾವಾರು, ಅನುಪಾತ, ಬಡ್ಡಿ, ಸಮಯ-ಕೆಲಸ, ವೇಗ-ದೂರ, ಸರಣಿ ಮತ್ತು ದತ್ತಾಂಶ ವ್ಯಾಖ್ಯಾನ.',
    accent: '#e28a12',
    tint: '#fdf3e2',
    topics: [
      { id: 'apt_number', subjectId: 'aptitude', name: 'Number System', nameKn: 'ಸಂಖ್ಯಾ ಪದ್ಧತಿ', icon: '🔢', accent: '#e28a12' },
      { id: 'apt_percentage', subjectId: 'aptitude', name: 'Percentage', nameKn: 'ಶೇಕಡಾವಾರು', icon: '💯', accent: '#e28a12' },
      { id: 'apt_ratio', subjectId: 'aptitude', name: 'Ratio & Proportion', nameKn: 'ಅನುಪಾತ ಮತ್ತು ಪ್ರಮಾಣ', icon: '⚖️', accent: '#e28a12' },
      { id: 'apt_average', subjectId: 'aptitude', name: 'Average', nameKn: 'ಸರಾಸರಿ', icon: '🧮', accent: '#e28a12' },
      { id: 'apt_profit', subjectId: 'aptitude', name: 'Profit & Loss', nameKn: 'ಲಾಭ ಮತ್ತು ನಷ್ಟ', icon: '💹', accent: '#e28a12' },
      { id: 'apt_interest', subjectId: 'aptitude', name: 'Interest', nameKn: 'ಬಡ್ಡಿ', icon: '🏦', accent: '#e28a12' },
      { id: 'apt_timework', subjectId: 'aptitude', name: 'Time & Work', nameKn: 'ಸಮಯ ಮತ್ತು ಕೆಲಸ', icon: '⏱️', accent: '#e28a12' },
      { id: 'apt_speed', subjectId: 'aptitude', name: 'Time, Speed & Distance', nameKn: 'ಸಮಯ-ವೇಗ-ದೂರ', icon: '🚄', accent: '#e28a12' },
      { id: 'apt_hcf', subjectId: 'aptitude', name: 'HCF & LCM', nameKn: 'HCF ಮತ್ತು LCM', icon: '➗', accent: '#e28a12' },
      { id: 'apt_ages', subjectId: 'aptitude', name: 'Ages', nameKn: 'ವಯಸ್ಸಿನ ಸಮಸ್ಯೆಗಳು', icon: '🎂', accent: '#e28a12' },
      { id: 'apt_series', subjectId: 'aptitude', name: 'Series', nameKn: 'ಸರಣಿ', icon: '🔗', accent: '#e28a12' },
      { id: 'apt_probability', subjectId: 'aptitude', name: 'Probability', nameKn: 'ಸಂಭವನೀಯತೆ', icon: '🎲', accent: '#e28a12' },
      { id: 'apt_di', subjectId: 'aptitude', name: 'Data Interpretation', nameKn: 'ದತ್ತಾಂಶ ವ್ಯಾಖ್ಯಾನ', icon: '📉', accent: '#e28a12' },
      { id: 'apt_logical', subjectId: 'aptitude', name: 'Logical Reasoning', nameKn: 'ತಾರ್ಕಿಕ ಸಾಮರ್ಥ್ಯ', icon: '🧠', accent: '#e28a12' },
    ],
  },
  {
    id: 'gk',
    name: 'General Knowledge',
    nameKn: 'ಸಾಮಾನ್ಯ ಜ್ಞಾನ',
    icon: '🧠',
    tagline: 'ಕರ್ನಾಟಕ ಕೇಂದ್ರಿತ ಸಾಮಾನ್ಯ ಜ್ಞಾನ',
    description:
      'ಕರ್ನಾಟಕದ ವಿಶೇಷ ಸಾಮಾನ್ಯ ಜ್ಞಾನ, ರಾಜಕೀಯ-ಆಡಳಿತ, ಆರ್ಥಿಕತೆ, ವಿಜ್ಞಾನ, ಕ್ರೀಡೆ-ಪ್ರಶಸ್ತಿಗಳು ಮತ್ತು ಪ್ರಮುಖ ಸಂಸ್ಥೆಗಳ ಬಗ್ಗೆ ವ್ಯಾಪಕ ಅಭ್ಯಾಸ.',
    accent: '#3a4c74',
    tint: '#eef2fa',
    topics: [
      { id: 'gk_karnataka', subjectId: 'gk', name: 'Karnataka GK', nameKn: 'ಕರ್ನಾಟಕ ಸಾಮಾನ್ಯ ಜ್ಞಾನ', icon: '🏞️', accent: '#3a4c74' },
      { id: 'gk_polity', subjectId: 'gk', name: 'Polity & Administration', nameKn: 'ರಾಜಕೀಯ ಮತ್ತು ಆಡಳಿತ', icon: '🏛️', accent: '#3a4c74' },
      { id: 'gk_economy', subjectId: 'gk', name: 'Economy', nameKn: 'ಆರ್ಥಿಕತೆ', icon: '💰', accent: '#3a4c74' },
      { id: 'gk_science', subjectId: 'gk', name: 'Science', nameKn: 'ವಿಜ್ಞಾನ', icon: '🔬', accent: '#3a4c74' },
      { id: 'gk_awards', subjectId: 'gk', name: 'Sports & Awards', nameKn: 'ಕ್ರೀಡೆ ಮತ್ತು ಪ್ರಶಸ್ತಿಗಳು', icon: '🏆', accent: '#3a4c74' },
      { id: 'gk_organizations', subjectId: 'gk', name: 'Organizations', nameKn: 'ಪ್ರಮುಖ ಸಂಸ್ಥೆಗಳು', icon: '🏛️', accent: '#3a4c74' },
      { id: 'gk_misc', subjectId: 'gk', name: 'Miscellaneous', nameKn: 'ವಿವಿಧ', icon: '✨', accent: '#3a4c74' },
    ],
  },
];

export const coreSubjects: SubjectId[] = ['history', 'grammar', 'constitution', 'geography'];

export const getSubjectById = (id: string): Subject | undefined =>
  subjects.find((s) => s.id === id);

export const getTopicById = (subjectId: string, topicId: string): Topic | undefined => {
  const subject = getSubjectById(subjectId);
  return subject?.topics.find((t) => t.id === topicId);
};

export const getCoreTopicById = (topicId: string): Topic | undefined => {
  for (const subject of subjects) {
    const match = subject.topics.find((t) => t.id === topicId);
    if (match) return match;
  }
  return undefined;
};

export const getTopicsForSubject = (subjectId: SubjectId): Topic[] =>
  getSubjectById(subjectId)?.topics ?? [];