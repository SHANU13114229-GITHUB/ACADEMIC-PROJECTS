export type CourseId = 
  | 'ap-calc' 
  | 'ap-cs' 
  | 'sat-math' 
  | 'gcse-bio' 
  | 'gre-quant' 
  | 'aws-csa'
  | 'banking-exams'
  | 'jee-mains'
  | 'neet-ug'
  | 'govt-exams';

export type Difficulty = 'Easy' | 'Medium' | 'Hard' | 'Official Exam Level';

export type QuestionSource = 'official-curriculum-ai' | 'built-in-official-db' | 'user-saved';

export type ExamDurationPreset = '10min-20q' | '30min-50q' | '60min-75q' | 'practice-5q';

export interface ExamPresetConfig {
  id: ExamDurationPreset;
  label: string;
  durationMinutes: number;
  questionCount: number;
  description: string;
  badge: string;
}

export interface Question {
  id: string;
  courseId: CourseId;
  subjectName: string;
  sectionName?: string; // e.g. "Physics", "Chemistry", "Mathematics", "Quantitative Aptitude", "General Awareness"
  topic: string;
  syllabusStandard: string; // e.g. "NTA JEE Mains 2026 - Unit 3"
  questionText: string;
  options: string[]; // 4 options
  correctAnswerIndex: number;
  rationale: string; // detailed step-by-step explanation
  difficulty: Difficulty;
  source: QuestionSource;
  lastUpdated: string; // ISO date string or year
  tags?: string[];
}

export interface SyllabusStandard {
  code: string;
  title: string;
  description: string;
  weightPercentage?: number;
}

export interface Course {
  id: CourseId;
  code: string;
  name: string;
  category: string;
  iconName: string; // Lucide icon identifier
  examScaleType: 'AP_5_POINT' | 'SAT_800_POINT' | 'GCSE_9_POINT' | 'GRE_170_POINT' | 'AWS_1000_POINT' | 'BANKING_100_POINT' | 'JEE_300_POINT' | 'NEET_720_POINT' | 'GOVT_200_POINT';
  examScaleRange: string;
  description: string;
  officialDatabaseName: string;
  syllabusYear: string;
  standardsList: SyllabusStandard[];
  sections?: string[]; // Defined exam sections (e.g. ['Physics', 'Chemistry', 'Mathematics'])
}

export type PerformanceTier = 'Novice' | 'Developing' | 'Proficient' | 'Advanced' | 'Mastery';

export interface PerformanceScaleMetric {
  courseId: CourseId | 'all';
  overallScore: number; // 0 - 100%
  competencyTier: PerformanceTier;
  predictedExamScore: string;
  percentileRank: number;
  totalQuestionsAnswered: number;
  totalCorrect: number;
  accuracyByDifficulty: Record<Difficulty, { total: number; correct: number }>;
  strengthTopics: string[];
  needsReviewTopics: string[];
  studyStreakDays: number;
}

export interface StudySessionResult {
  id: string;
  date: string; // ISO date string
  courseId: CourseId;
  courseName: string;
  totalQuestions: number;
  correctCount: number;
  timeSpentSeconds: number;
  accuracyPercentage: number;
  mode: 'practice' | 'exam';
  difficultyFilter: Difficulty | 'All';
  topicBreakdown: Record<string, { total: number; correct: number }>;
}

export interface BookmarkItem {
  questionId: string;
  courseId: CourseId;
  addedAt: string;
  userNote: string;
}

export interface PracticeFilterOptions {
  courseId: CourseId | 'all';
  difficulty: Difficulty | 'All';
  topic: string | 'All';
  questionCount: number; // e.g. 5, 10, 15, 20
  mode: 'practice' | 'exam'; // practice = immediate feedback, exam = end review
}

export interface LiveQuestionFetchRequest {
  courseId: CourseId;
  topic?: string;
  difficulty?: Difficulty;
  syllabusYear?: string;
}

export interface LiveQuestionFetchResponse {
  success: boolean;
  question?: Question;
  sourceAuthority?: string;
  error?: string;
}

export interface UserProfile {
  id: string;
  fullName: string;
  email: string;
  roleTitle: string;
  targetExams: CourseId[];
  targetYear: string;
  avatarInitials: string;
  avatarColor: string;
  registeredAt: string;
  dailyQuestionGoal: number;
  weeklyStudyHoursGoal: number;
}

export interface UserAccount extends UserProfile {
  passwordHash?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterPayload {
  fullName: string;
  email: string;
  password: string;
  roleTitle?: string;
  primaryTargetExam: CourseId;
  targetYear?: string;
  dailyQuestionGoal?: number;
}

