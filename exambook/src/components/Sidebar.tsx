import React from 'react';
import { UserProfile } from '../types';
import { OFFICIAL_COURSES } from '../data/courses';
import { 
  Sparkles, 
  ShieldCheck, 
  User, 
  LogIn, 
  UserPlus, 
  Flame,
  Target
} from 'lucide-react';

export type SidebarTab = 'dashboard' | 'courses' | 'practice' | 'analytics' | 'syllabus';

interface SidebarProps {
  activeTab: SidebarTab;
  currentUser: UserProfile | null;
  onSelectTab: (tab: SidebarTab) => void;
  onStartQuickPractice: () => void;
  onOpenLogin: () => void;
  onOpenRegister: () => void;
  onOpenAccountDetails: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  currentUser,
  onSelectTab,
  onStartQuickPractice,
  onOpenLogin,
  onOpenRegister,
  onOpenAccountDetails,
}) => {
  const menuItems: { id: SidebarTab; label: string; icon: string; badge?: string }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'courses', label: `Exam Syllabi (${OFFICIAL_COURSES.length})`, icon: '📚' },
    { id: 'practice', label: 'Timed Exam & Practice', icon: '✏️', badge: 'Active' },
    { id: 'analytics', label: 'Performance Scale', icon: '📈' },
    { id: 'syllabus', label: 'Official Standards', icon: '📜' },
  ];

  return (
    <aside className="w-64 bg-white/5 backdrop-blur-lg border-r border-white/10 p-6 flex flex-col gap-2 shrink-0 overflow-y-auto hidden md:flex">
      <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-2">
        Menu
      </p>

      {menuItems.map((item) => {
        const isActive = activeTab === item.id;
        return (
          <button
            key={item.id}
            onClick={() => onSelectTab(item.id)}
            className={`flex items-center justify-between w-full p-3 rounded-xl border text-sm font-medium transition-all cursor-pointer ${
              isActive
                ? 'bg-white/10 border-white/10 text-white shadow-sm'
                : 'border-transparent text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <div className="flex items-center gap-3">
              <span className={`w-5 h-5 ${isActive ? 'opacity-90' : 'opacity-60'}`}>
                {item.icon}
              </span>
              <span>{item.label}</span>
            </div>
            {item.badge && (
              <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 font-bold border border-indigo-500/30">
                {item.badge}
              </span>
            )}
          </button>
        );
      })}

      {/* Quick launch practice button */}
      <div className="mt-3 pt-3 border-t border-white/10">
        <button
          onClick={onStartQuickPractice}
          className="w-full py-2.5 px-4 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white font-bold rounded-xl shadow-lg shadow-indigo-500/20 flex items-center justify-center gap-2 text-xs uppercase tracking-wider transition-all cursor-pointer"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Launch Mock Exam</span>
        </button>
      </div>

      {/* Candidate Account Widget at bottom of Sidebar */}
      <div className="mt-auto pt-4 space-y-3">
        {currentUser ? (
          <div
            onClick={onOpenAccountDetails}
            className="p-3.5 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-indigo-500/40 rounded-2xl transition-all cursor-pointer group"
          >
            <div className="flex items-center gap-3">
              <div className={`w-9 h-9 rounded-xl ${currentUser.avatarColor || 'bg-indigo-600'} flex items-center justify-center font-bold text-white text-xs shrink-0 shadow-md`}>
                {currentUser.avatarInitials}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-bold text-white truncate group-hover:text-indigo-300 transition-colors">
                  {currentUser.fullName}
                </p>
                <div className="flex items-center gap-1.5 text-[10px] text-slate-400 mt-0.5">
                  <Target className="w-3 h-3 text-amber-400 shrink-0" />
                  <span className="truncate">{currentUser.dailyQuestionGoal} Qs/day target</span>
                </div>
              </div>
            </div>

            <div className="mt-2.5 pt-2 border-t border-white/10 flex items-center justify-between text-[10px] text-slate-400">
              <span className="text-indigo-300 font-semibold">Account Details</span>
              <span className="text-slate-500">Edit ↗</span>
            </div>
          </div>
        ) : (
          <div className="p-3.5 bg-indigo-500/10 border border-indigo-500/20 rounded-2xl space-y-2.5">
            <div className="flex items-center gap-2 text-xs font-bold text-indigo-300">
              <User className="w-3.5 h-3.5" />
              <span>Candidate Account</span>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Log in to sync your test scores and track target percentiles.
            </p>
            <div className="flex gap-2">
              <button
                onClick={onOpenLogin}
                className="flex-1 py-1.5 bg-white/10 hover:bg-white/20 border border-white/10 rounded-lg text-xs font-semibold text-white transition-all cursor-pointer"
              >
                Log In
              </button>
              <button
                onClick={onOpenRegister}
                className="flex-1 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-bold transition-all cursor-pointer"
              >
                Sign Up
              </button>
            </div>
          </div>
        )}

        {/* Pro Verified Badge */}
        <div className="p-3 bg-indigo-500/5 border border-indigo-500/20 rounded-xl flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-[11px] font-semibold text-slate-300">Curriculum Sync</span>
          </div>
          <span className="text-[9px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-1.5 py-0.5 rounded font-bold uppercase">
            Active
          </span>
        </div>
      </div>
    </aside>
  );
};
