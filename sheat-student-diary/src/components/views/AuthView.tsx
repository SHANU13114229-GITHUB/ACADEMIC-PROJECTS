import React, { useState } from 'react';
import { AuthSession } from '../../types';
import {
  authenticateUser,
  registerNewUser,
  getStoredUsers,
  RegisterPayload
} from '../../utils/auth';
import {
  Lock,
  User,
  Mail,
  GraduationCap,
  Eye,
  EyeOff,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  ShieldCheck,
  KeyRound,
  IdCard,
  UserPlus,
  LogIn,
  School,
  Phone
} from 'lucide-react';

interface AuthViewProps {
  onLoginSuccess: (session: AuthSession) => void;
}

export const AuthView: React.FC<AuthViewProps> = ({ onLoginSuccess }) => {
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  
  // Login form state
  const [loginIdentifier, setLoginIdentifier] = useState('shanu');
  const [loginPassword, setLoginPassword] = useState('shanu123');
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [loginRememberMe, setLoginRememberMe] = useState(true);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [loginLoading, setLoginLoading] = useState(false);

  // Register form state
  const [regFullName, setRegFullName] = useState('');
  const [regUsername, setRegUsername] = useState('');
  const [regRollNo, setRegRollNo] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regBranch, setRegBranch] = useState('Computer Science & Engineering (Data Science)');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');
  const [showRegPassword, setShowRegPassword] = useState(false);
  const [regError, setRegError] = useState<string | null>(null);
  const [regLoading, setRegLoading] = useState(false);

  // Quick Demo Account Selector
  const handleQuickDemoFill = (username: string, pass: string) => {
    setLoginIdentifier(username);
    setLoginPassword(pass);
    setLoginError(null);
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);

    if (!loginIdentifier.trim()) {
      setLoginError('Please enter your username, email, or roll number.');
      return;
    }
    if (!loginPassword) {
      setLoginError('Please enter your password.');
      return;
    }

    setLoginLoading(true);

    setTimeout(() => {
      const res = authenticateUser(loginIdentifier, loginPassword);
      setLoginLoading(false);
      if (res.success && res.session) {
        onLoginSuccess(res.session);
      } else {
        setLoginError(res.error || 'Authentication failed. Please check credentials.');
      }
    }, 400);
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setRegError(null);

    if (!regFullName.trim()) {
      setRegError('Please provide your full student name.');
      return;
    }
    if (!regUsername.trim() || regUsername.trim().length < 3) {
      setRegError('Username must be at least 3 characters long.');
      return;
    }
    if (!regRollNo.trim()) {
      setRegError('Please enter your University Roll Number.');
      return;
    }
    if (!regEmail.trim() || !regEmail.includes('@')) {
      setRegError('Please enter a valid email address.');
      return;
    }
    if (!regPassword || regPassword.length < 4) {
      setRegError('Password must be at least 4 characters long.');
      return;
    }
    if (regPassword !== regConfirmPassword) {
      setRegError('Passwords do not match. Please re-enter.');
      return;
    }

    setRegLoading(true);

    setTimeout(() => {
      const payload: RegisterPayload = {
        fullName: regFullName,
        username: regUsername,
        rollNo: regRollNo,
        email: regEmail,
        phone: regPhone || '+91 98765 43210',
        branch: regBranch,
        course: 'B.Tech',
        semester: 'VI Semester',
        password: regPassword
      };

      const res = registerNewUser(payload);
      setRegLoading(false);

      if (res.success && res.session) {
        onLoginSuccess(res.session);
      } else {
        setRegError(res.error || 'Registration failed. Please check the information provided.');
      }
    }, 500);
  };

  return (
    <div className="min-h-screen bg-[#FCFAF7] flex flex-col justify-between p-4 sm:p-6 text-[#2D2926]">
      {/* Top SHEAT College Emblem & Branding Banner */}
      <div className="w-full max-w-md mx-auto pt-3">
        <div className="bg-[#435585] text-white p-4 sm:p-5 rounded-3xl border border-[#E8E4E1] shadow-md relative overflow-hidden text-center">
          {/* Subtle Background Seal Watermark */}
          <div className="absolute -right-6 -bottom-6 text-white/5 font-serif font-black text-9xl pointer-events-none select-none">
            S
          </div>

          <div className="relative z-10 flex flex-col items-center space-y-2">
            <div className="w-14 h-14 rounded-2xl bg-[#FCFAF7] text-[#435585] p-2 flex items-center justify-center shadow-md border border-white/20">
              <GraduationCap className="w-8 h-8 text-[#435585]" />
            </div>

            <div>
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#FCFAF7]/80 block">
                Official Student Portal
              </span>
              <h1 className="text-base sm:text-lg font-serif font-bold uppercase tracking-tight text-white mt-0.5">
                SHEAT GROUP OF INSTITUTIONS
              </h1>
              <p className="text-[11px] text-[#FCFAF7]/90 font-medium">
                Varanasi, Uttar Pradesh • Student Cloud Diary
              </p>
            </div>

            <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1 rounded-full border border-white/15 text-[10px] text-white font-semibold">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" />
              <span>AKTU Affiliated ERP Authentication</span>
            </div>
          </div>
        </div>

        {/* Tab Switch: Login vs Register */}
        <div className="mt-4 bg-[#F2F0ED] p-1.5 rounded-2xl border border-[#E8E4E1] flex gap-1">
          <button
            type="button"
            onClick={() => {
              setAuthMode('login');
              setLoginError(null);
              setRegError(null);
            }}
            className={`flex-1 py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all ${
              authMode === 'login'
                ? 'bg-white text-[#2D2926] shadow-2xs border border-[#E8E4E1]'
                : 'text-[#8C8885] hover:text-[#2D2926]'
            }`}
          >
            <LogIn className="w-4 h-4 text-[#435585]" />
            <span>Student Sign In</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setAuthMode('register');
              setLoginError(null);
              setRegError(null);
            }}
            className={`flex-1 py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all ${
              authMode === 'register'
                ? 'bg-white text-[#2D2926] shadow-2xs border border-[#E8E4E1]'
                : 'text-[#8C8885] hover:text-[#2D2926]'
            }`}
          >
            <UserPlus className="w-4 h-4 text-[#435585]" />
            <span>Create Account</span>
          </button>
        </div>

        {/* ========================================================================= */}
        {/* TAB 1: LOGIN FORM */}
        {/* ========================================================================= */}
        {authMode === 'login' && (
          <div className="mt-4 bg-white p-5 rounded-3xl border border-[#E8E4E1] shadow-2xs space-y-4">
            <div className="border-b border-[#E8E4E1] pb-2">
              <h2 className="text-base font-serif font-bold text-[#2D2926]">Student Account Login</h2>
              <p className="text-xs text-[#8C8885]">
                Enter your username, roll number or email to access your diary.
              </p>
            </div>

            {/* Error Callout */}
            {loginError && (
              <div className="bg-rose-50 border border-rose-200 text-rose-800 text-xs p-3 rounded-2xl flex items-start space-x-2 animate-fade-in">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                <span>{loginError}</span>
              </div>
            )}

            <form onSubmit={handleLoginSubmit} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-bold text-[#2D2926] mb-1 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-[#435585]" />
                  <span>Username, Roll No, or Email *</span>
                </label>
                <input
                  type="text"
                  required
                  value={loginIdentifier}
                  onChange={(e) => setLoginIdentifier(e.target.value)}
                  placeholder="e.g. shanu or 2026041001"
                  className="w-full p-3 bg-[#FCFAF7] text-[#2D2926] font-semibold rounded-xl border border-[#E8E4E1] focus:outline-none focus:ring-2 focus:ring-[#435585]"
                />
              </div>

              <div>
                <label className="block font-bold text-[#2D2926] mb-1 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Lock className="w-3.5 h-3.5 text-[#435585]" />
                    <span>Password *</span>
                  </span>
                  <button
                    type="button"
                    onClick={() => setShowLoginPassword(!showLoginPassword)}
                    className="text-[#435585] hover:underline flex items-center gap-1 text-[11px] font-medium"
                  >
                    {showLoginPassword ? (
                      <>
                        <EyeOff className="w-3 h-3" /> Hide
                      </>
                    ) : (
                      <>
                        <Eye className="w-3 h-3" /> Show
                      </>
                    )}
                  </button>
                </label>
                <div className="relative">
                  <input
                    type={showLoginPassword ? 'text' : 'password'}
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full p-3 bg-[#FCFAF7] text-[#2D2926] font-semibold rounded-xl border border-[#E8E4E1] focus:outline-none focus:ring-2 focus:ring-[#435585]"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center space-x-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={loginRememberMe}
                    onChange={(e) => setLoginRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded text-[#435585] focus:ring-[#435585] border-[#E8E4E1]"
                  />
                  <span className="text-[#8C8885] font-medium text-xs">Remember my session</span>
                </label>

                <button
                  type="button"
                  onClick={() => alert('For password recovery, contact the SHEAT College Registrar or IT Cell (+91 7753811344).')}
                  className="text-xs font-semibold text-[#435585] hover:underline"
                >
                  Forgot Password?
                </button>
              </div>

              <button
                type="submit"
                disabled={loginLoading}
                className="w-full py-3.5 bg-[#435585] hover:bg-[#354368] disabled:opacity-75 text-white font-bold text-xs rounded-2xl shadow-sm transition-all flex items-center justify-center gap-2 mt-2"
              >
                {loginLoading ? (
                  <span>Authenticating...</span>
                ) : (
                  <>
                    <LogIn className="w-4 h-4" />
                    <span>Sign In to Student Diary</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            {/* Quick Autofill Demo Credentials */}
            <div className="pt-3 border-t border-[#E8E4E1]">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold text-[#8C8885] uppercase tracking-wider flex items-center gap-1">
                  <KeyRound className="w-3 h-3 text-[#435585]" />
                  <span>Quick Demo Logins</span>
                </span>
                <span className="text-[10px] text-[#435585] font-medium">Tap to Autofill</span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => handleQuickDemoFill('shanu', 'shanu123')}
                  className="p-2.5 bg-[#FCFAF7] hover:bg-[#EDF1F7] border border-[#E8E4E1] rounded-2xl text-left transition-all group"
                >
                  <p className="text-xs font-bold text-[#2D2926] group-hover:text-[#435585]">
                    Shanu Vishwakarma
                  </p>
                  <p className="text-[10px] text-[#8C8885]">User: <span className="font-mono text-[#435585]">shanu</span></p>
                  <p className="text-[10px] text-[#8C8885]">Pass: <span className="font-mono">shanu123</span></p>
                </button>

                <button
                  type="button"
                  onClick={() => handleQuickDemoFill('rohit2026', 'student123')}
                  className="p-2.5 bg-[#FCFAF7] hover:bg-[#EDF1F7] border border-[#E8E4E1] rounded-2xl text-left transition-all group"
                >
                  <p className="text-xs font-bold text-[#2D2926] group-hover:text-[#435585]">
                    Rohit Singh
                  </p>
                  <p className="text-[10px] text-[#8C8885]">User: <span className="font-mono text-[#435585]">rohit2026</span></p>
                  <p className="text-[10px] text-[#8C8885]">Pass: <span className="font-mono">student123</span></p>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 2: CREATE ACCOUNT / REGISTER FORM */}
        {/* ========================================================================= */}
        {authMode === 'register' && (
          <div className="mt-4 bg-white p-5 rounded-3xl border border-[#E8E4E1] shadow-2xs space-y-4">
            <div className="border-b border-[#E8E4E1] pb-2">
              <h2 className="text-base font-serif font-bold text-[#2D2926]">New Student Registration</h2>
              <p className="text-xs text-[#8C8885]">
                Create your student account to sync diary, attendance & notes.
              </p>
            </div>

            {/* Error Callout */}
            {regError && (
              <div className="bg-rose-50 border border-rose-200 text-rose-800 text-xs p-3 rounded-2xl flex items-start space-x-2 animate-fade-in">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                <span>{regError}</span>
              </div>
            )}

            <form onSubmit={handleRegisterSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-[#2D2926] mb-1">
                  Full Student Name *
                </label>
                <input
                  type="text"
                  required
                  value={regFullName}
                  onChange={(e) => setRegFullName(e.target.value)}
                  placeholder="e.g. PRIYA SHARMA"
                  className="w-full p-2.5 bg-[#FCFAF7] text-[#2D2926] font-semibold rounded-xl border border-[#E8E4E1] focus:outline-none focus:ring-2 focus:ring-[#435585]"
                />
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="block font-bold text-[#2D2926] mb-1">
                    Choose Username *
                  </label>
                  <input
                    type="text"
                    required
                    value={regUsername}
                    onChange={(e) => setRegUsername(e.target.value)}
                    placeholder="e.g. priya2026"
                    className="w-full p-2.5 bg-[#FCFAF7] text-[#2D2926] font-semibold rounded-xl border border-[#E8E4E1] focus:outline-none focus:ring-2 focus:ring-[#435585]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-[#2D2926] mb-1">
                    University Roll No *
                  </label>
                  <input
                    type="text"
                    required
                    value={regRollNo}
                    onChange={(e) => setRegRollNo(e.target.value)}
                    placeholder="e.g. 2304850100099"
                    className="w-full p-2.5 bg-[#FCFAF7] text-[#2D2926] font-semibold rounded-xl border border-[#E8E4E1] focus:outline-none focus:ring-2 focus:ring-[#435585]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="block font-bold text-[#2D2926] mb-1">
                    Student Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    placeholder="student@example.com"
                    className="w-full p-2.5 bg-[#FCFAF7] text-[#2D2926] font-semibold rounded-xl border border-[#E8E4E1] focus:outline-none focus:ring-2 focus:ring-[#435585]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-[#2D2926] mb-1">
                    Mobile Phone
                  </label>
                  <input
                    type="tel"
                    value={regPhone}
                    onChange={(e) => setRegPhone(e.target.value)}
                    placeholder="+91 98765 00000"
                    className="w-full p-2.5 bg-[#FCFAF7] text-[#2D2926] font-semibold rounded-xl border border-[#E8E4E1] focus:outline-none focus:ring-2 focus:ring-[#435585]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-[#2D2926] mb-1">
                  Branch / Department
                </label>
                <select
                  value={regBranch}
                  onChange={(e) => setRegBranch(e.target.value)}
                  className="w-full p-2.5 bg-[#FCFAF7] text-[#2D2926] font-semibold rounded-xl border border-[#E8E4E1] focus:outline-none focus:ring-2 focus:ring-[#435585]"
                >
                  <option value="Computer Science & Engineering (Data Science)">
                    B.Tech CSE (Data Science)
                  </option>
                  <option value="Computer Science & Engineering (AI & ML)">
                    B.Tech CSE (AI & ML)
                  </option>
                  <option value="Computer Science & Engineering (Core)">
                    B.Tech Computer Science & Engineering
                  </option>
                  <option value="Information Technology">
                    B.Tech Information Technology
                  </option>
                  <option value="Electronics & Communication">
                    B.Tech Electronics & Comm.
                  </option>
                  <option value="Mechanical Engineering">
                    B.Tech Mechanical Engineering
                  </option>
                  <option value="Diploma Engineering">
                    Polytechnic Diploma Engineering
                  </option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="block font-bold text-[#2D2926] mb-1">
                    Password *
                  </label>
                  <input
                    type={showRegPassword ? 'text' : 'password'}
                    required
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                    placeholder="Min 4 chars"
                    className="w-full p-2.5 bg-[#FCFAF7] text-[#2D2926] font-semibold rounded-xl border border-[#E8E4E1] focus:outline-none focus:ring-2 focus:ring-[#435585]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-[#2D2926] mb-1">
                    Confirm Password *
                  </label>
                  <input
                    type={showRegPassword ? 'text' : 'password'}
                    required
                    value={regConfirmPassword}
                    onChange={(e) => setRegConfirmPassword(e.target.value)}
                    placeholder="Re-enter password"
                    className="w-full p-2.5 bg-[#FCFAF7] text-[#2D2926] font-semibold rounded-xl border border-[#E8E4E1] focus:outline-none focus:ring-2 focus:ring-[#435585]"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between pt-1">
                <button
                  type="button"
                  onClick={() => setShowRegPassword(!showRegPassword)}
                  className="text-[#435585] hover:underline flex items-center gap-1 text-[11px] font-medium"
                >
                  {showRegPassword ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                  <span>{showRegPassword ? 'Hide Passwords' : 'Show Passwords'}</span>
                </button>
              </div>

              <button
                type="submit"
                disabled={regLoading}
                className="w-full py-3.5 bg-[#435585] hover:bg-[#354368] disabled:opacity-75 text-white font-bold text-xs rounded-2xl shadow-sm transition-all flex items-center justify-center gap-2 mt-3"
              >
                {regLoading ? (
                  <span>Registering Student...</span>
                ) : (
                  <>
                    <UserPlus className="w-4 h-4" />
                    <span>Create Student Account & Enter</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>
        )}

        {/* College Help & Footer */}
        <div className="mt-4 p-3 bg-[#F2F0ED] rounded-2xl border border-[#E8E4E1] text-center text-[10px] text-[#8C8885] space-y-0.5">
          <p className="font-bold text-[#2D2926]">SHEAT GROUP OF INSTITUTIONS VARANASI</p>
          <p>Campus Helpdesk: +91 7753811344 | erp.support@sheatcollege.com</p>
          <p className="text-[#435585] font-semibold">256-Bit SSL Encrypted Student Authentication</p>
        </div>
      </div>
    </div>
  );
};
