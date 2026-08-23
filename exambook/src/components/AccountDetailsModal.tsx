import React, { useState } from 'react';
import { CourseId, UserProfile } from '../types';
import { OFFICIAL_COURSES, getCourseById } from '../data/courses';
import { updateUserProfile, loadStudySessions, loadBookmarks } from '../utils/storage';
import { 
  X, 
  User, 
  Mail, 
  Target, 
  Calendar, 
  Award, 
  LogOut, 
  Save, 
  CheckCircle2, 
  Clock, 
  Flame, 
  BookOpen, 
  Bookmark, 
  Sparkles,
  ShieldCheck,
  RotateCcw,
  Edit3
} from 'lucide-react';

interface AccountDetailsModalProps {
  user: UserProfile;
  isOpen: boolean;
  onClose: () => void;
  onUpdateUser: (updated: UserProfile) => void;
  onLogout: () => void;
  onSwitchAccount: () => void;
}

export const AccountDetailsModal: React.FC<AccountDetailsModalProps> = ({
  user,
  isOpen,
  onClose,
  onUpdateUser,
  onLogout,
  onSwitchAccount,
}) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [fullName, setFullName] = useState<string>(user.fullName);
  const [roleTitle, setRoleTitle] = useState<string>(user.roleTitle);
  const [targetYear, setTargetYear] = useState<string>(user.targetYear);
  const [dailyGoal, setDailyGoal] = useState<number>(user.dailyQuestionGoal);
  const [weeklyGoal, setWeeklyGoal] = useState<number>(user.weeklyStudyHoursGoal);
  const [selectedExams, setSelectedExams] = useState<CourseId[]>(user.targetExams || []);
  const [savedSuccess, setSavedSuccess] = useState<boolean>(false);

  // Sync state when user prop changes
  React.useEffect(() => {
    setFullName(user.fullName);
    setRoleTitle(user.roleTitle);
    setTargetYear(user.targetYear);
    setDailyGoal(user.dailyQuestionGoal);
    setWeeklyGoal(user.weeklyStudyHoursGoal);
    setSelectedExams(user.targetExams || []);
    setIsEditing(false);
    setSavedSuccess(false);
  }, [user, isOpen]);

  if (!isOpen) return null;

  const sessions = loadStudySessions();
  const bookmarks = loadBookmarks();
  const totalTests = sessions.length;
  const totalQuestions = sessions.reduce((acc, s) => acc + s.totalQuestions, 0);
  const totalCorrect = sessions.reduce((acc, s) => acc + s.correctCount, 0);
  const aggregateAccuracy = totalQuestions > 0 ? Math.round((totalCorrect / totalQuestions) * 100) : 0;

  const handleToggleExam = (courseId: CourseId) => {
    if (selectedExams.includes(courseId)) {
      if (selectedExams.length > 1) {
        setSelectedExams(selectedExams.filter(id => id !== courseId));
      }
    } else {
      setSelectedExams([...selectedExams, courseId]);
    }
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    const updated = updateUserProfile(user.id, {
      fullName: fullName.trim(),
      roleTitle: roleTitle.trim(),
      targetYear,
      dailyQuestionGoal: dailyGoal,
      weeklyStudyHoursGoal: weeklyGoal,
      targetExams: selectedExams
    });

    if (updated) {
      onUpdateUser(updated);
      setIsEditing(false);
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 2500);
    }
  };

  const formattedJoinDate = new Date(user.registeredAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-[#0f172a]/85 backdrop-blur-md">
      <div className="w-full max-w-2xl bg-[#0f172a] border border-white/20 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="px-6 py-4 bg-white/5 border-b border-white/10 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-2xl ${user.avatarColor || 'bg-indigo-600'} flex items-center justify-center font-bold text-white text-base shadow-lg shadow-indigo-500/20`}>
              {user.avatarInitials}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-white leading-tight">
                  {user.fullName}
                </h2>
                <span className="px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-[10px] font-bold uppercase">
                  Verified Candidate
                </span>
              </div>
              <p className="text-xs text-slate-400">{user.email}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="px-3 py-1.5 bg-white/10 hover:bg-white/20 border border-white/10 rounded-xl text-xs font-semibold text-white flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Edit Profile</span>
              </button>
            ) : (
              <button
                onClick={() => setIsEditing(false)}
                className="px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-xs font-semibold text-slate-300 cursor-pointer"
              >
                Cancel
              </button>
            )}

            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white hover:bg-white/10 rounded-xl transition-all cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {savedSuccess && (
            <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl flex items-center gap-2.5 text-xs text-emerald-300">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>Profile details and study goals updated successfully!</span>
            </div>
          )}

          {!isEditing ? (
            /* =========================================================================
                VIEW ACCOUNT DETAILS MODE
               ========================================================================= */
            <div className="space-y-6">
              
              {/* Account Quick Metrics Card */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-4 bg-white/5 border border-white/10 rounded-2xl">
                  <span className="text-[10px] uppercase font-bold text-slate-400 flex items-center gap-1">
                    <BookOpen className="w-3.5 h-3.5 text-indigo-400" />
                    Mock Exams
                  </span>
                  <p className="text-xl font-bold text-white mt-1">{totalTests} Completed</p>
                  <p className="text-[10px] text-slate-500 mt-0.5">{totalQuestions} questions solved</p>
                </div>

                <div className="p-4 bg-white/5 border border-white/10 rounded-2xl">
                  <span className="text-[10px] uppercase font-bold text-slate-400 flex items-center gap-1">
                    <Award className="w-3.5 h-3.5 text-emerald-400" />
                    Accuracy
                  </span>
                  <p className="text-xl font-bold text-emerald-400 mt-1">{aggregateAccuracy}%</p>
                  <p className="text-[10px] text-slate-500 mt-0.5">{totalCorrect} correct answers</p>
                </div>

                <div className="p-4 bg-white/5 border border-white/10 rounded-2xl">
                  <span className="text-[10px] uppercase font-bold text-slate-400 flex items-center gap-1">
                    <Target className="w-3.5 h-3.5 text-amber-400" />
                    Daily Target
                  </span>
                  <p className="text-xl font-bold text-white mt-1">{user.dailyQuestionGoal} Qs</p>
                  <p className="text-[10px] text-slate-500 mt-0.5">Per day target</p>
                </div>

                <div className="p-4 bg-white/5 border border-white/10 rounded-2xl">
                  <span className="text-[10px] uppercase font-bold text-slate-400 flex items-center gap-1">
                    <Bookmark className="w-3.5 h-3.5 text-purple-400" />
                    Saved Qs
                  </span>
                  <p className="text-xl font-bold text-purple-300 mt-1">{bookmarks.length} Qs</p>
                  <p className="text-[10px] text-slate-500 mt-0.5">In revision vault</p>
                </div>
              </div>

              {/* Candidate Info Breakdown */}
              <div className="p-5 bg-white/5 border border-white/10 rounded-2xl space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-indigo-400" />
                  <span>Candidate Profile & Curriculum Targets</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="text-slate-400">Candidate Role / Focus:</span>
                    <p className="text-white font-semibold text-sm mt-0.5">{user.roleTitle}</p>
                  </div>
                  <div>
                    <span className="text-slate-400">Target Examination Year:</span>
                    <p className="text-white font-semibold text-sm mt-0.5">{user.targetYear} Batch</p>
                  </div>
                  <div>
                    <span className="text-slate-400">Member Since:</span>
                    <p className="text-slate-200 font-semibold mt-0.5">{formattedJoinDate}</p>
                  </div>
                  <div>
                    <span className="text-slate-400">Weekly Commitment:</span>
                    <p className="text-slate-200 font-semibold mt-0.5">{user.weeklyStudyHoursGoal} Hours / week</p>
                  </div>
                </div>

                {/* Subscribed Target Exam Badges */}
                <div className="pt-3 border-t border-white/10 space-y-2">
                  <span className="text-xs font-semibold text-slate-400">
                    Enrolled Target Exam Syllabi:
                  </span>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {user.targetExams.map((examId) => {
                      const course = getCourseById(examId);
                      return (
                        <div
                          key={examId}
                          className="px-3 py-1.5 rounded-xl bg-indigo-500/20 text-indigo-200 border border-indigo-500/30 text-xs font-semibold flex items-center gap-1.5"
                        >
                          <span className="text-emerald-400">●</span>
                          <span>{course?.name || examId}</span>
                          <span className="text-[10px] text-indigo-300 font-mono">({course?.code})</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* =========================================================================
                EDIT ACCOUNT DETAILS FORM
               ========================================================================= */
            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-indigo-400"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                    Candidate Role / Title
                  </label>
                  <input
                    type="text"
                    value={roleTitle}
                    onChange={(e) => setRoleTitle(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-indigo-400"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                    Target Year
                  </label>
                  <select
                    value={targetYear}
                    onChange={(e) => setTargetYear(e.target.value)}
                    className="w-full p-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-indigo-400 cursor-pointer"
                  >
                    <option value="2025" className="bg-[#0f172a]">2025</option>
                    <option value="2026" className="bg-[#0f172a]">2026</option>
                    <option value="2027" className="bg-[#0f172a]">2027</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                    Daily Questions
                  </label>
                  <input
                    type="number"
                    min="5"
                    max="100"
                    value={dailyGoal}
                    onChange={(e) => setDailyGoal(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-indigo-400"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                    Weekly Hours
                  </label>
                  <input
                    type="number"
                    min="2"
                    max="50"
                    value={weeklyGoal}
                    onChange={(e) => setWeeklyGoal(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-indigo-400"
                  />
                </div>
              </div>

              {/* Target Courses Selector Checkboxes */}
              <div className="space-y-2 pt-2">
                <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                  Select Target Exam Curricula
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {OFFICIAL_COURSES.map((course) => {
                    const isChecked = selectedExams.includes(course.id);
                    return (
                      <button
                        key={course.id}
                        type="button"
                        onClick={() => handleToggleExam(course.id)}
                        className={`p-2.5 rounded-xl border text-left flex items-center justify-between text-xs transition-all cursor-pointer ${
                          isChecked
                            ? 'bg-indigo-500/20 border-indigo-400 text-white font-semibold'
                            : 'bg-white/5 border-white/10 text-slate-400 hover:text-white'
                        }`}
                      >
                        <span className="truncate">{course.name}</span>
                        {isChecked && <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0 ml-1" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="pt-3 border-t border-white/10 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-xs font-semibold text-slate-300 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 shadow-lg shadow-indigo-500/20 cursor-pointer"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Save Changes</span>
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 bg-white/5 border-t border-white/10 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                onClose();
                onSwitchAccount();
              }}
              className="px-3.5 py-2 bg-white/10 hover:bg-white/20 border border-white/10 rounded-xl text-xs font-semibold text-slate-200 flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5 text-indigo-400" />
              <span>Switch Account</span>
            </button>
          </div>

          <button
            onClick={() => {
              onLogout();
              onClose();
            }}
            className="px-4 py-2 bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/30 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>
    </div>
  );
};
