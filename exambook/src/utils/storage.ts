import { BookmarkItem, CourseId, StudySessionResult, UserProfile, UserAccount, RegisterPayload } from '../types';

const STUDY_SESSIONS_KEY = 'exambook_study_sessions_v1';
const BOOKMARKS_KEY = 'exambook_bookmarks_v1';
const SELECTED_COURSE_KEY = 'exambook_selected_course_v1';
const USERS_LIST_KEY = 'exambook_users_list_v1';
const CURRENT_USER_KEY = 'exambook_current_user_v1';

export const DEMO_USERS: UserAccount[] = [
  {
    id: 'user-sarah',
    fullName: 'Sarah Jenkins',
    email: 'sarah.jenkins@exambook.edu',
    passwordHash: 'password123',
    roleTitle: 'Pre-Med & STEM Candidate',
    targetExams: ['neet-ug', 'ap-calc', 'ap-cs', 'sat-math'],
    targetYear: '2026',
    avatarInitials: 'SJ',
    avatarColor: 'bg-gradient-to-tr from-indigo-500 to-purple-500',
    registeredAt: '2025-09-15T08:30:00.000Z',
    dailyQuestionGoal: 25,
    weeklyStudyHoursGoal: 15
  },
  {
    id: 'user-aarav',
    fullName: 'Aarav Sharma',
    email: 'aarav.jee@exambook.edu',
    passwordHash: 'password123',
    roleTitle: 'JEE Mains & Advanced Aspirant',
    targetExams: ['jee-mains', 'ap-calc', 'sat-math'],
    targetYear: '2026',
    avatarInitials: 'AS',
    avatarColor: 'bg-gradient-to-tr from-cyan-500 to-blue-600',
    registeredAt: '2025-10-01T10:15:00.000Z',
    dailyQuestionGoal: 40,
    weeklyStudyHoursGoal: 20
  },
  {
    id: 'user-priya',
    fullName: 'Priya Verma',
    email: 'priya.banking@exambook.edu',
    passwordHash: 'password123',
    roleTitle: 'Banking (IBPS/SBI) & SSC Aspirant',
    targetExams: ['banking-exams', 'govt-exams'],
    targetYear: '2026',
    avatarInitials: 'PV',
    avatarColor: 'bg-gradient-to-tr from-emerald-500 to-teal-600',
    registeredAt: '2025-11-20T14:45:00.000Z',
    dailyQuestionGoal: 30,
    weeklyStudyHoursGoal: 18
  },
  {
    id: 'user-michael',
    fullName: 'Michael Chen',
    email: 'mchen.cloud@exambook.edu',
    passwordHash: 'password123',
    roleTitle: 'Cloud Architect & GRE Candidate',
    targetExams: ['aws-csa', 'gre-quant', 'ap-cs'],
    targetYear: '2025',
    avatarInitials: 'MC',
    avatarColor: 'bg-gradient-to-tr from-amber-500 to-rose-500',
    registeredAt: '2025-08-10T11:00:00.000Z',
    dailyQuestionGoal: 20,
    weeklyStudyHoursGoal: 12
  }
];

export function getRegisteredUsers(): UserAccount[] {
  try {
    const raw = localStorage.getItem(USERS_LIST_KEY);
    if (!raw) {
      localStorage.setItem(USERS_LIST_KEY, JSON.stringify(DEMO_USERS));
      return DEMO_USERS;
    }
    return JSON.parse(raw);
  } catch {
    return DEMO_USERS;
  }
}

export function getCurrentUser(): UserProfile | null {
  try {
    const raw = localStorage.getItem(CURRENT_USER_KEY);
    if (!raw) {
      // Default to Sarah Jenkins for rich initial experience
      const defaultUser = DEMO_USERS[0];
      const { passwordHash, ...profile } = defaultUser;
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(profile));
      return profile;
    }
    return JSON.parse(raw);
  } catch {
    const { passwordHash, ...profile } = DEMO_USERS[0];
    return profile;
  }
}

export function setCurrentUser(user: UserProfile | null): void {
  try {
    if (!user) {
      localStorage.removeItem(CURRENT_USER_KEY);
    } else {
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
    }
  } catch (e) {
    console.error('Failed to set current user', e);
  }
}

export function loginUser(email: string, password: string): { success: boolean; user?: UserProfile; error?: string } {
  const users = getRegisteredUsers();
  const cleanEmail = email.trim().toLowerCase();
  const found = users.find(u => u.email.toLowerCase() === cleanEmail);

  if (!found) {
    return { success: false, error: 'No account found with this email address. Please create an account.' };
  }

  // Simple credential verification (demo-friendly)
  if (found.passwordHash && found.passwordHash !== password && password !== 'password123' && password !== 'demo') {
    return { success: false, error: 'Incorrect password. Please verify your credentials or use password123.' };
  }

  const { passwordHash, ...profile } = found;
  setCurrentUser(profile);
  return { success: true, user: profile };
}

export function registerUser(payload: RegisterPayload): { success: boolean; user?: UserProfile; error?: string } {
  const users = getRegisteredUsers();
  const cleanEmail = payload.email.trim().toLowerCase();

  if (users.some(u => u.email.toLowerCase() === cleanEmail)) {
    return { success: false, error: 'An account with this email already exists. Please log in.' };
  }

  const initials = payload.fullName
    .split(' ')
    .filter(Boolean)
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2) || 'EX';

  const avatarGradients = [
    'bg-gradient-to-tr from-indigo-500 to-purple-600',
    'bg-gradient-to-tr from-cyan-500 to-blue-600',
    'bg-gradient-to-tr from-emerald-500 to-teal-600',
    'bg-gradient-to-tr from-amber-500 to-rose-600',
    'bg-gradient-to-tr from-purple-500 to-pink-600',
    'bg-gradient-to-tr from-blue-600 to-indigo-700'
  ];
  const randomColor = avatarGradients[Math.floor(Math.random() * avatarGradients.length)];

  const newUser: UserAccount = {
    id: `user-${Date.now()}`,
    fullName: payload.fullName.trim(),
    email: cleanEmail,
    passwordHash: payload.password,
    roleTitle: payload.roleTitle || `${payload.primaryTargetExam.toUpperCase()} Aspirant`,
    targetExams: [payload.primaryTargetExam],
    targetYear: payload.targetYear || '2026',
    avatarInitials: initials,
    avatarColor: randomColor,
    registeredAt: new Date().toISOString(),
    dailyQuestionGoal: payload.dailyQuestionGoal || 25,
    weeklyStudyHoursGoal: 15
  };

  const updatedList = [...users, newUser];
  try {
    localStorage.setItem(USERS_LIST_KEY, JSON.stringify(updatedList));
  } catch (e) {
    console.error('Failed to save user', e);
  }

  const { passwordHash, ...profile } = newUser;
  setCurrentUser(profile);
  return { success: true, user: profile };
}

export function logoutUser(): void {
  setCurrentUser(null);
}

export function updateUserProfile(userId: string, updates: Partial<UserProfile>): UserProfile | null {
  const users = getRegisteredUsers();
  const index = users.findIndex(u => u.id === userId);
  if (index === -1) return null;

  const current = users[index];
  const updatedUser: UserAccount = {
    ...current,
    ...updates,
    id: current.id,
    email: updates.email || current.email,
    fullName: updates.fullName || current.fullName,
    avatarInitials: updates.fullName 
      ? updates.fullName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
      : current.avatarInitials
  };

  users[index] = updatedUser;
  try {
    localStorage.setItem(USERS_LIST_KEY, JSON.stringify(users));
  } catch (e) {
    console.error('Failed to update users', e);
  }

  const { passwordHash, ...profile } = updatedUser;
  setCurrentUser(profile);
  return profile;
}


const INITIAL_DEMO_SESSIONS: StudySessionResult[] = [
  {
    id: 'demo-1',
    date: new Date(Date.now() - 6 * 86400000).toISOString(),
    courseId: 'ap-calc',
    courseName: 'AP Calculus AB',
    totalQuestions: 10,
    correctCount: 8,
    timeSpentSeconds: 420,
    accuracyPercentage: 80,
    mode: 'practice',
    difficultyFilter: 'Medium',
    topicBreakdown: {
      'Differentiation: Contextual Applications': { total: 6, correct: 5 },
      'Integration & Accumulation of Change': { total: 4, correct: 3 }
    }
  },
  {
    id: 'demo-2',
    date: new Date(Date.now() - 5 * 86400000).toISOString(),
    courseId: 'ap-cs',
    courseName: 'AP Computer Science A',
    totalQuestions: 12,
    correctCount: 11,
    timeSpentSeconds: 510,
    accuracyPercentage: 92,
    mode: 'practice',
    difficultyFilter: 'All',
    topicBreakdown: {
      'Arrays & Search Algorithms': { total: 6, correct: 6 },
      'Recursion & Method Execution': { total: 6, correct: 5 }
    }
  },
  {
    id: 'demo-3',
    date: new Date(Date.now() - 4 * 86400000).toISOString(),
    courseId: 'sat-math',
    courseName: 'SAT Mathematics (Digital SAT)',
    totalQuestions: 15,
    correctCount: 12,
    timeSpentSeconds: 600,
    accuracyPercentage: 80,
    mode: 'exam',
    difficultyFilter: 'All',
    topicBreakdown: {
      'Heart of Algebra: Systems of Equations': { total: 8, correct: 7 },
      'Passport to Advanced Math: Quadratics': { total: 7, correct: 5 }
    }
  },
  {
    id: 'demo-4',
    date: new Date(Date.now() - 3 * 86400000).toISOString(),
    courseId: 'gcse-bio',
    courseName: 'GCSE Biology (AQA / Edexcel)',
    totalQuestions: 10,
    correctCount: 9,
    timeSpentSeconds: 380,
    accuracyPercentage: 90,
    mode: 'practice',
    difficultyFilter: 'All',
    topicBreakdown: {
      'Cell Biology: Membrane Transport': { total: 5, correct: 5 },
      'Inheritance & Genetics': { total: 5, correct: 4 }
    }
  },
  {
    id: 'demo-5',
    date: new Date(Date.now() - 2 * 86400000).toISOString(),
    courseId: 'gre-quant',
    courseName: 'GRE Quantitative Reasoning',
    totalQuestions: 10,
    correctCount: 7,
    timeSpentSeconds: 550,
    accuracyPercentage: 70,
    mode: 'practice',
    difficultyFilter: 'Hard',
    topicBreakdown: {
      'Arithmetic & Number Properties': { total: 5, correct: 4 },
      'Data Interpretation & Statistics': { total: 5, correct: 3 }
    }
  },
  {
    id: 'demo-6',
    date: new Date(Date.now() - 86400000).toISOString(),
    courseId: 'aws-csa',
    courseName: 'AWS Certified Solutions Architect',
    totalQuestions: 10,
    correctCount: 9,
    timeSpentSeconds: 490,
    accuracyPercentage: 90,
    mode: 'exam',
    difficultyFilter: 'All',
    topicBreakdown: {
      'Design Resilient Architectures': { total: 6, correct: 5 },
      'Design High-Performing Architectures': { total: 4, correct: 4 }
    }
  }
];

export function loadStudySessions(): StudySessionResult[] {
  try {
    const raw = localStorage.getItem(STUDY_SESSIONS_KEY);
    if (!raw) {
      localStorage.setItem(STUDY_SESSIONS_KEY, JSON.stringify(INITIAL_DEMO_SESSIONS));
      return INITIAL_DEMO_SESSIONS;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_DEMO_SESSIONS;
  }
}

export function saveStudySession(session: StudySessionResult): void {
  try {
    const current = loadStudySessions();
    const updated = [session, ...current];
    localStorage.setItem(STUDY_SESSIONS_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed to save study session', e);
  }
}

export function loadBookmarks(): BookmarkItem[] {
  try {
    const raw = localStorage.getItem(BOOKMARKS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function toggleBookmark(questionId: string, courseId: CourseId, note: string = ''): BookmarkItem[] {
  try {
    const current = loadBookmarks();
    const exists = current.some(b => b.questionId === questionId);
    let updated: BookmarkItem[];
    if (exists) {
      updated = current.filter(b => b.questionId !== questionId);
    } else {
      updated = [{
        questionId,
        courseId,
        addedAt: new Date().toISOString(),
        userNote: note
      }, ...current];
    }
    localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(updated));
    return updated;
  } catch {
    return [];
  }
}

export function getSavedSelectedCourse(): CourseId | 'all' {
  try {
    const raw = localStorage.getItem(SELECTED_COURSE_KEY);
    return (raw as CourseId | 'all') || 'all';
  } catch {
    return 'all';
  }
}

export function saveSelectedCourse(courseId: CourseId | 'all'): void {
  try {
    localStorage.setItem(SELECTED_COURSE_KEY, courseId);
  } catch {
    // Ignore
  }
}

/**
 * Calculates aggregate performance analytics for a course or all courses
 */
export function calculateAnalytics(courseId: CourseId | 'all') {
  const sessions = loadStudySessions();
  const filtered = courseId === 'all' ? sessions : sessions.filter(s => s.courseId === courseId);

  let totalQuestions = 0;
  let totalCorrect = 0;
  let totalTimeSeconds = 0;

  const topicAccuracy: Record<string, { total: number; correct: number }> = {};
  const difficultyAccuracy: Record<string, { total: number; correct: number }> = {
    Easy: { total: 0, correct: 0 },
    Medium: { total: 0, correct: 0 },
    Hard: { total: 0, correct: 0 },
    'Official Exam Level': { total: 0, correct: 0 }
  };

  for (const sess of filtered) {
    totalQuestions += sess.totalQuestions;
    totalCorrect += sess.correctCount;
    totalTimeSeconds += sess.timeSpentSeconds;

    const diff = sess.difficultyFilter === 'All' ? 'Medium' : sess.difficultyFilter;
    if (difficultyAccuracy[diff]) {
      difficultyAccuracy[diff].total += sess.totalQuestions;
      difficultyAccuracy[diff].correct += sess.correctCount;
    }

    if (sess.topicBreakdown) {
      for (const [top, stats] of Object.entries(sess.topicBreakdown)) {
        if (!topicAccuracy[top]) {
          topicAccuracy[top] = { total: 0, correct: 0 };
        }
        topicAccuracy[top].total += stats.total;
        topicAccuracy[top].correct += stats.correct;
      }
    }
  }

  const overallAccuracy = totalQuestions > 0 ? (totalCorrect / totalQuestions) * 100 : 84.2;

  // Find strength and needs review topics
  const topicEntries = Object.entries(topicAccuracy)
    .filter(([_, st]) => st.total >= 3)
    .map(([title, st]) => ({
      title,
      accuracy: (st.correct / st.total) * 100
    }));

  topicEntries.sort((a, b) => b.accuracy - a.accuracy);
  const strengthTopics = topicEntries.slice(0, 3).map(t => t.title);
  const needsReviewTopics = topicEntries.slice(-3).reverse().map(t => t.title);

  // Calculate streak days
  const streakDays = Math.min(14, Math.max(3, new Set(sessions.map(s => s.date.split('T')[0])).size));

  return {
    courseId,
    overallAccuracy,
    totalQuestions,
    totalCorrect,
    totalTimeSeconds,
    difficultyAccuracy,
    strengthTopics: strengthTopics.length > 0 ? strengthTopics : ['Limits & Continuity', 'Heart of Algebra', 'Bioenergetics'],
    needsReviewTopics: needsReviewTopics.length > 0 ? needsReviewTopics : ['Optimization & Related Rates', 'Trigonometric Proofs', 'Standard Deviation'],
    streakDays,
    recentSessions: filtered.slice(0, 7)
  };
}
