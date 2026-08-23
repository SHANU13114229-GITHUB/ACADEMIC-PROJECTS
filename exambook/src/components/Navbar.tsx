import React from 'react';
import { CourseId, UserProfile } from '../types';
import { OFFICIAL_COURSES } from '../data/courses';
import { Database, LogIn, UserPlus, User, ChevronDown, Sparkles } from 'lucide-react';

interface NavbarProps {
  selectedCourseId: CourseId | 'all';
  currentUser: UserProfile | null;
  onSelectCourse: (id: CourseId | 'all') => void;
  onOpenUpdatesModal: () => void;
  onOpenLoginModal: () => void;
  onOpenRegisterModal: () => void;
  onOpenAccountDetailsModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  selectedCourseId,
  currentUser,
  onSelectCourse,
  onOpenUpdatesModal,
  onOpenLoginModal,
  onOpenRegisterModal,
  onOpenAccountDetailsModal,
}) => {
  return (
    <nav className="h-20 w-full flex items-center justify-between px-4 sm:px-8 bg-white/5 backdrop-blur-xl border-b border-white/10 z-10 shrink-0">
      {/* Brand Header */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-indigo-500 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20 shrink-0">
          <span className="text-white font-bold text-xl">EB</span>
        </div>
        <div className="hidden sm:block">
          <h1 className="text-2xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
            ExamBook
          </h1>
          <p className="text-[10px] text-slate-400 -mt-1 tracking-wider uppercase font-semibold">
            Official Curriculum Exam Prep & Analytics
          </p>
        </div>
      </div>

      {/* Course Filter Dropdown & Database Status */}
      <div className="flex items-center gap-2 sm:gap-4">
        {/* Course filter pill */}
        <div className="flex items-center bg-white/5 border border-white/10 rounded-full px-3 py-1.5 gap-2">
          <span className="text-xs text-slate-400 font-medium hidden md:inline">Subject:</span>
          <select
            value={selectedCourseId}
            onChange={(e) => onSelectCourse(e.target.value as CourseId | 'all')}
            className="bg-transparent text-xs sm:text-sm font-semibold text-white focus:outline-none cursor-pointer pr-2 max-w-[150px] sm:max-w-[220px] truncate"
          >
            <option value="all" className="bg-[#0f172a] text-white">
              All Official Courses ({OFFICIAL_COURSES.length})
            </option>
            {OFFICIAL_COURSES.map((course) => (
              <option key={course.id} value={course.id} className="bg-[#0f172a] text-white">
                {course.name} ({course.code})
              </option>
            ))}
          </select>
        </div>

        {/* Database Connected badge */}
        <button
          onClick={onOpenUpdatesModal}
          className="hidden lg:flex px-3.5 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-xs font-medium items-center gap-2 transition-all cursor-pointer group"
          title="Click to inspect official syllabus standards and live database updates"
        >
          <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
          <span className="text-slate-200">Official Curriculum DB</span>
          <Database className="w-3.5 h-3.5 text-indigo-400 group-hover:rotate-12 transition-transform ml-0.5" />
        </button>
      </div>

      {/* User Info / Auth Controls */}
      <div className="flex items-center gap-3">
        {currentUser ? (
          <button
            onClick={onOpenAccountDetailsModal}
            className="flex items-center gap-3 p-1.5 sm:px-3 sm:py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-indigo-500/40 rounded-2xl transition-all cursor-pointer group"
            title="Click to view full candidate account details and study targets"
          >
            <div className="text-right hidden sm:block">
              <p className="text-xs sm:text-sm font-semibold text-white group-hover:text-indigo-300 transition-colors">
                {currentUser.fullName}
              </p>
              <p className="text-[10px] text-slate-400 truncate max-w-[160px]">
                {currentUser.roleTitle}
              </p>
            </div>
            
            <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl ${currentUser.avatarColor || 'bg-indigo-600'} flex items-center justify-center font-bold text-white text-xs sm:text-sm shadow-md`}>
              {currentUser.avatarInitials}
            </div>

            <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-white hidden sm:block" />
          </button>
        ) : (
          <div className="flex items-center gap-2">
            <button
              onClick={onOpenLoginModal}
              className="px-3.5 py-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <LogIn className="w-3.5 h-3.5 text-indigo-400" />
              <span>Log In</span>
            </button>

            <button
              onClick={onOpenRegisterModal}
              className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 shadow-lg shadow-indigo-500/20 transition-all cursor-pointer"
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>Create Account</span>
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};
