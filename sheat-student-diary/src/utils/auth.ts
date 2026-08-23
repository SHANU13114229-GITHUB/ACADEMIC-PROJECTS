import { UserAccount, AuthSession, StudentProfile } from '../types';
import { initialStudentProfile } from '../mockData';

const USERS_STORAGE_KEY = 'sheat_users_db';
const SESSION_STORAGE_KEY = 'sheat_current_session';

export const DEFAULT_USERS: UserAccount[] = [
  {
    id: 'user_shanu_1',
    username: 'shanu',
    passwordHash: 'shanu123',
    createdAt: '2026-01-10',
    profile: initialStudentProfile
  },
  {
    id: 'user_rohit_2',
    username: 'rohit2026',
    passwordHash: 'student123',
    createdAt: '2026-02-15',
    profile: {
      ...initialStudentProfile,
      name: 'ROHIT SINGH',
      rollNo: '2026041045',
      enrollmentNo: 'EN202688445',
      email: 'rohit.singh@sheatcollege.com',
      phone: '+91 94152 77889',
      fatherName: 'Rajendra Singh',
      motherName: 'Meera Singh',
      avatarUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=400'
    }
  }
];

export function getStoredUsers(): UserAccount[] {
  try {
    const raw = localStorage.getItem(USERS_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(DEFAULT_USERS));
      return DEFAULT_USERS;
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(DEFAULT_USERS));
    return DEFAULT_USERS;
  } catch (err) {
    console.error('Failed to load stored users:', err);
    return DEFAULT_USERS;
  }
}

export function saveUsers(users: UserAccount[]): void {
  try {
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
  } catch (err) {
    console.error('Failed to save users:', err);
  }
}

export function getStoredSession(): AuthSession | null {
  try {
    const raw = localStorage.getItem(SESSION_STORAGE_KEY);
    if (!raw) return null;
    const session: AuthSession = JSON.parse(raw);
    if (session && session.user && session.user.username) {
      return session;
    }
    return null;
  } catch {
    return null;
  }
}

export function saveSession(session: AuthSession): void {
  try {
    localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(session));
  } catch (err) {
    console.error('Failed to save session:', err);
  }
}

export function clearSession(): void {
  try {
    localStorage.removeItem(SESSION_STORAGE_KEY);
  } catch (err) {
    console.error('Failed to clear session:', err);
  }
}

export interface RegisterPayload {
  username: string;
  password: string;
  fullName: string;
  rollNo: string;
  email: string;
  phone?: string;
  course?: string;
  branch?: string;
  semester?: string;
  avatarUrl?: string;
}

export function registerNewUser(payload: RegisterPayload): { success: boolean; error?: string; session?: AuthSession } {
  const users = getStoredUsers();
  const cleanUsername = payload.username.trim().toLowerCase();
  const cleanEmail = payload.email.trim().toLowerCase();
  const cleanRollNo = payload.rollNo.trim();

  // Validate existence
  const existing = users.find(
    (u) =>
      u.username.toLowerCase() === cleanUsername ||
      u.profile.email.toLowerCase() === cleanEmail ||
      u.profile.rollNo.toLowerCase() === cleanRollNo.toLowerCase()
  );

  if (existing) {
    if (existing.username.toLowerCase() === cleanUsername) {
      return { success: false, error: 'Username is already registered. Please choose another username or log in.' };
    }
    if (existing.profile.email.toLowerCase() === cleanEmail) {
      return { success: false, error: 'Email address is already in use by another student.' };
    }
    return { success: false, error: 'University Roll Number already exists in student registry.' };
  }

  const newProfile: StudentProfile = {
    ...initialStudentProfile,
    name: payload.fullName.trim().toUpperCase(),
    rollNo: cleanRollNo,
    enrollmentNo: `EN2026${Math.floor(10000 + Math.random() * 90000)}`,
    email: payload.email.trim(),
    phone: payload.phone?.trim() || '+91 98765 43210',
    course: payload.course?.trim() || 'B.Tech',
    branch: payload.branch?.trim() || 'Computer Science & Engineering',
    semester: payload.semester?.trim() || 'VI Semester',
    avatarUrl: payload.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400'
  };

  const newUser: UserAccount = {
    id: `user_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
    username: cleanUsername,
    passwordHash: payload.password,
    createdAt: new Date().toISOString().split('T')[0],
    profile: newProfile
  };

  const updatedUsers = [...users, newUser];
  saveUsers(updatedUsers);

  const session: AuthSession = {
    user: newUser,
    token: `token_${Date.now()}_${Math.random().toString(36).substring(2)}`,
    loginTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  };

  saveSession(session);
  return { success: true, session };
}

export function authenticateUser(identifier: string, password: string): { success: boolean; error?: string; session?: AuthSession } {
  const users = getStoredUsers();
  const cleanId = identifier.trim().toLowerCase();

  const user = users.find(
    (u) =>
      u.username.toLowerCase() === cleanId ||
      u.profile.email.toLowerCase() === cleanId ||
      u.profile.rollNo.toLowerCase() === cleanId
  );

  if (!user) {
    return {
      success: false,
      error: 'Account not found. Please check your username, email, or roll number, or create a new account.'
    };
  }

  if (user.passwordHash !== password) {
    return {
      success: false,
      error: 'Incorrect password. Please verify your password and try again.'
    };
  }

  const session: AuthSession = {
    user,
    token: `token_${Date.now()}_${Math.random().toString(36).substring(2)}`,
    loginTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  };

  saveSession(session);
  return { success: true, session };
}

export function updateUserAccountProfile(userId: string, updatedProfile: StudentProfile): void {
  const users = getStoredUsers();
  const updatedUsers = users.map((u) => (u.id === userId ? { ...u, profile: updatedProfile } : u));
  saveUsers(updatedUsers);

  const currentSession = getStoredSession();
  if (currentSession && currentSession.user.id === userId) {
    currentSession.user.profile = updatedProfile;
    saveSession(currentSession);
  }
}
