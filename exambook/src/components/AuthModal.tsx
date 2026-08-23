import React, { useState } from 'react';
import { CourseId, RegisterPayload, UserProfile } from '../types';
import { OFFICIAL_COURSES } from '../data/courses';
import { loginUser, registerUser, DEMO_USERS } from '../utils/storage';
import { 
  X, 
  LogIn, 
  UserPlus, 
  Mail, 
  Lock, 
  User, 
  Eye, 
  EyeOff, 
  CheckCircle2, 
  AlertCircle, 
  Sparkles, 
  ShieldCheck, 
  Target, 
  Zap,
  ArrowRight
} from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  initialMode?: 'login' | 'register';
  onClose: () => void;
  onAuthSuccess: (user: UserProfile) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  initialMode = 'login',
  onClose,
  onAuthSuccess,
}) => {
  const [mode, setMode] = useState<'login' | 'register'>(initialMode);
  
  // Login Form State
  const [loginEmail, setLoginEmail] = useState<string>('');
  const [loginPassword, setLoginPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [rememberMe, setRememberMe] = useState<boolean>(true);
  
  // Register Form State
  const [regFullName, setRegFullName] = useState<string>('');
  const [regEmail, setRegEmail] = useState<string>('');
  const [regPassword, setRegPassword] = useState<string>('');
  const [regPrimaryExam, setRegPrimaryExam] = useState<CourseId>('jee-mains');
  const [regTargetYear, setRegTargetYear] = useState<string>('2026');
  const [regDailyGoal, setRegDailyGoal] = useState<number>(30);
  const [regRoleTitle, setRegRoleTitle] = useState<string>('');

  // UI status
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Sync mode when prop changes
  React.useEffect(() => {
    setMode(initialMode);
    setErrorMessage('');
    setSuccessMessage('');
  }, [initialMode, isOpen]);

  if (!isOpen) return null;

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!loginEmail || !loginPassword) {
      setErrorMessage('Please enter both your email and password.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const res = loginUser(loginEmail, loginPassword);
      setIsSubmitting(false);
      if (res.success && res.user) {
        setSuccessMessage(`Welcome back, ${res.user.fullName}!`);
        setTimeout(() => {
          onAuthSuccess(res.user!);
          onClose();
        }, 600);
      } else {
        setErrorMessage(res.error || 'Login failed. Please check your credentials.');
      }
    }, 300);
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!regFullName.trim()) {
      setErrorMessage('Please enter your full name.');
      return;
    }
    if (!regEmail.trim() || !regEmail.includes('@')) {
      setErrorMessage('Please provide a valid email address.');
      return;
    }
    if (regPassword.length < 6) {
      setErrorMessage('Password must be at least 6 characters.');
      return;
    }

    const payload: RegisterPayload = {
      fullName: regFullName,
      email: regEmail,
      password: regPassword,
      primaryTargetExam: regPrimaryExam,
      targetYear: regTargetYear,
      dailyQuestionGoal: regDailyGoal,
      roleTitle: regRoleTitle.trim() || undefined
    };

    setIsSubmitting(true);
    setTimeout(() => {
      const res = registerUser(payload);
      setIsSubmitting(false);
      if (res.success && res.user) {
        setSuccessMessage(`Account created successfully! Welcome, ${res.user.fullName}.`);
        setTimeout(() => {
          onAuthSuccess(res.user!);
          onClose();
        }, 700);
      } else {
        setErrorMessage(res.error || 'Registration failed. Please try again.');
      }
    }, 350);
  };

  const handleQuickDemoLogin = (demoAccount: typeof DEMO_USERS[0]) => {
    setLoginEmail(demoAccount.email);
    setLoginPassword(demoAccount.passwordHash || 'password123');
    setErrorMessage('');
    
    setIsSubmitting(true);
    setTimeout(() => {
      const res = loginUser(demoAccount.email, demoAccount.passwordHash || 'password123');
      setIsSubmitting(false);
      if (res.success && res.user) {
        setSuccessMessage(`Logged in as ${res.user.fullName}`);
        setTimeout(() => {
          onAuthSuccess(res.user!);
          onClose();
        }, 500);
      }
    }, 200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-[#0f172a]/80 backdrop-blur-md">
      <div className="w-full max-w-lg bg-[#0f172a] border border-white/20 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Modal Header */}
        <div className="px-6 py-4 bg-white/5 border-b border-white/10 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-300">
              {mode === 'login' ? <LogIn className="w-5 h-5" /> : <UserPlus className="w-5 h-5" />}
            </div>
            <div>
              <h2 className="text-base font-bold text-white leading-tight">
                {mode === 'login' ? 'Candidate Sign In' : 'Create ExamBook Account'}
              </h2>
              <p className="text-[11px] text-slate-400">
                Official Curriculum Progress & Target Scale Sync
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-white/10 rounded-xl transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selector */}
        <div className="p-1.5 mx-6 mt-4 bg-white/5 border border-white/10 rounded-2xl flex items-center shrink-0">
          <button
            onClick={() => {
              setMode('login');
              setErrorMessage('');
              setSuccessMessage('');
            }}
            className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
              mode === 'login'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <LogIn className="w-3.5 h-3.5" />
            <span>Sign In</span>
          </button>
          <button
            onClick={() => {
              setMode('register');
              setErrorMessage('');
              setSuccessMessage('');
            }}
            className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
              mode === 'register'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>Create Account</span>
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6 overflow-y-auto space-y-5 flex-1">
          {/* Notifications */}
          {errorMessage && (
            <div className="p-3 bg-rose-500/10 border border-rose-500/30 rounded-xl flex items-center gap-2.5 text-xs text-rose-300">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {successMessage && (
            <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl flex items-center gap-2.5 text-xs text-emerald-300">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{successMessage}</span>
            </div>
          )}

          {/* =========================================================================
              MODE 1: LOG IN FORM
             ========================================================================= */}
          {mode === 'login' ? (
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none" />
                  <input
                    type="email"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    placeholder="e.g. sarah.jenkins@exambook.edu"
                    className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-400"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                    Password
                  </label>
                  <span className="text-[11px] text-indigo-400 hover:underline cursor-pointer" onClick={() => setLoginPassword('password123')}>
                    Forgot password? (Default: password123)
                  </span>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full pl-10 pr-10 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-400"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(prev => !prev)}
                    className="absolute right-3 top-3 text-slate-400 hover:text-white"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded bg-white/5 border-white/20 text-indigo-600 focus:ring-0"
                  />
                  <span>Remember my session</span>
                </label>
                <span className="text-[11px] text-slate-500 font-mono">256-bit Encrypted</span>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-bold rounded-xl text-sm shadow-lg shadow-indigo-500/20 flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>Signing in...</span>
                ) : (
                  <>
                    <span>Sign In to Dashboard</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              {/* 1-Click Demo Profiles */}
              <div className="pt-4 border-t border-white/10 space-y-2.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5 text-amber-400" />
                    1-Click Instant Demo Candidates:
                  </span>
                  <span className="text-[10px] text-slate-500">Auto-filled</span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  {DEMO_USERS.map((demo) => (
                    <button
                      key={demo.id}
                      type="button"
                      onClick={() => handleQuickDemoLogin(demo)}
                      className="p-2.5 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-indigo-500/50 rounded-xl text-left transition-all cursor-pointer flex items-center gap-2.5 group"
                    >
                      <div className={`w-7 h-7 rounded-lg ${demo.avatarColor} flex items-center justify-center text-white text-[10px] font-bold shrink-0`}>
                        {demo.avatarInitials}
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-bold text-white truncate group-hover:text-indigo-300">
                          {demo.fullName}
                        </p>
                        <p className="text-[10px] text-slate-400 truncate">
                          {demo.roleTitle}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </form>
          ) : (
            /* =========================================================================
                MODE 2: CREATE ACCOUNT (REGISTER) FORM
               ========================================================================= */
            <form onSubmit={handleRegisterSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none" />
                    <input
                      type="text"
                      value={regFullName}
                      onChange={(e) => setRegFullName(e.target.value)}
                      placeholder="e.g. Rohan Patel"
                      className="w-full pl-10 pr-3 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-400"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none" />
                    <input
                      type="email"
                      value={regEmail}
                      onChange={(e) => setRegEmail(e.target.value)}
                      placeholder="e.g. rohan@example.com"
                      className="w-full pl-10 pr-3 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-400"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                  Create Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                    placeholder="Min 6 characters"
                    className="w-full pl-10 pr-10 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-400"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(prev => !prev)}
                    className="absolute right-3 top-3 text-slate-400 hover:text-white"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Target Exam Selection */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                  <Target className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Primary Target Exam</span>
                </label>
                <select
                  value={regPrimaryExam}
                  onChange={(e) => setRegPrimaryExam(e.target.value as CourseId)}
                  className="w-full p-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-indigo-400 cursor-pointer"
                >
                  {OFFICIAL_COURSES.map((c) => (
                    <option key={c.id} value={c.id} className="bg-[#0f172a] text-white">
                      {c.name} ({c.code}) • {c.examScaleRange}
                    </option>
                  ))}
                </select>
              </div>

              {/* Aspirant Title & Target Year */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                    Target Exam Year
                  </label>
                  <select
                    value={regTargetYear}
                    onChange={(e) => setRegTargetYear(e.target.value)}
                    className="w-full p-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-indigo-400 cursor-pointer"
                  >
                    <option value="2025" className="bg-[#0f172a]">2025 (Immediate Batch)</option>
                    <option value="2026" className="bg-[#0f172a]">2026 (Upcoming Standard)</option>
                    <option value="2027" className="bg-[#0f172a]">2027 (Long-term Target)</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                    Daily Questions Goal
                  </label>
                  <select
                    value={regDailyGoal}
                    onChange={(e) => setRegDailyGoal(Number(e.target.value))}
                    className="w-full p-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-indigo-400 cursor-pointer"
                  >
                    <option value="15" className="bg-[#0f172a]">15 Questions / day (Light)</option>
                    <option value="25" className="bg-[#0f172a]">25 Questions / day (Standard)</option>
                    <option value="40" className="bg-[#0f172a]">40 Questions / day (Intensive)</option>
                    <option value="60" className="bg-[#0f172a]">60 Questions / day (Rank Booster)</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                  Candidate Bio / Focus Area (Optional)
                </label>
                <input
                  type="text"
                  value={regRoleTitle}
                  onChange={(e) => setRegRoleTitle(e.target.value)}
                  placeholder="e.g. IIT-JEE Aspirant / AIIMS Aspirant / Bank PO"
                  className="w-full px-3.5 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-400"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold rounded-xl text-sm shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50 mt-2"
              >
                {isSubmitting ? (
                  <span>Creating Account...</span>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Create ExamBook Profile</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>

        {/* Footer info */}
        <div className="px-6 py-3.5 bg-white/5 border-t border-white/10 text-center text-xs text-slate-400 shrink-0">
          {mode === 'login' ? (
            <p>
              New candidate?{' '}
              <button
                onClick={() => setMode('register')}
                className="text-indigo-400 font-bold hover:underline cursor-pointer ml-1"
              >
                Create Account now →
              </button>
            </p>
          ) : (
            <p>
              Already registered?{' '}
              <button
                onClick={() => setMode('login')}
                className="text-indigo-400 font-bold hover:underline cursor-pointer ml-1"
              >
                Sign In here →
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
