import React, { useState, useEffect } from 'react';
import { CourseId, StudySessionResult, UserProfile } from './types';
import { OFFICIAL_COURSES, getCourseById, convertAccuracyToExamScore } from './data/courses';
import { 
  getSavedSelectedCourse, 
  saveSelectedCourse, 
  loadStudySessions, 
  calculateAnalytics, 
  getCurrentUser, 
  logoutUser 
} from './utils/storage';
import { Navbar } from './components/Navbar';
import { Sidebar, SidebarTab } from './components/Sidebar';
import { CourseCardsGrid } from './components/CourseCardsGrid';
import { PerformanceScaleWidget } from './components/PerformanceScaleWidget';
import { PracticeModal } from './components/PracticeModal';
import { AnalyticsDashboard } from './components/AnalyticsDashboard';
import { CurriculumUpdatesModal } from './components/CurriculumUpdatesModal';
import { PerformanceScaleModal } from './components/PerformanceScaleModal';
import { AuthModal } from './components/AuthModal';
import { AccountDetailsModal } from './components/AccountDetailsModal';
import { 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Database, 
  BookOpen, 
  TrendingUp, 
  Award, 
  Calendar,
  ShieldCheck,
  Target,
  UserCheck
} from 'lucide-react';

export default function App() {
  const [selectedCourseId, setSelectedCourseId] = useState<CourseId | 'all'>('all');
  const [activeTab, setActiveTab] = useState<SidebarTab>('dashboard');
  const [isPracticeModalOpen, setIsPracticeModalOpen] = useState<boolean>(false);
  const [practiceCourseId, setPracticeCourseId] = useState<CourseId | 'all'>('all');
  const [isUpdatesModalOpen, setIsUpdatesModalOpen] = useState<boolean>(false);
  const [isScaleModalOpen, setIsScaleModalOpen] = useState<boolean>(false);
  const [studySessions, setStudySessions] = useState<StudySessionResult[]>([]);

  // Authentication & Account state
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'register'>('login');
  const [isAccountDetailsModalOpen, setIsAccountDetailsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    const saved = getSavedSelectedCourse();
    setSelectedCourseId(saved);
    setStudySessions(loadStudySessions());
    setCurrentUser(getCurrentUser());
  }, []);

  const handleSelectCourse = (id: CourseId | 'all') => {
    setSelectedCourseId(id);
    saveSelectedCourse(id);
  };

  const handleStartPractice = (courseId: CourseId | 'all' = selectedCourseId) => {
    setPracticeCourseId(courseId);
    setIsPracticeModalOpen(true);
  };

  const handleSessionComplete = (newSession: StudySessionResult) => {
    setStudySessions(prev => [newSession, ...prev]);
  };

  const handleAuthSuccess = (user: UserProfile) => {
    setCurrentUser(user);
    // If user has specific target exam, optionally set the selected course
    if (user.targetExams && user.targetExams.length > 0) {
      handleSelectCourse(user.targetExams[0]);
    }
  };

  const handleLogout = () => {
    logoutUser();
    setCurrentUser(null);
  };

  const currentCourse = selectedCourseId === 'all' ? getCourseById('jee-mains') || getCourseById('ap-calc')! : getCourseById(selectedCourseId)!;
  const analytics = calculateAnalytics(selectedCourseId);

  return (
    <div className="relative min-h-screen w-full bg-[#0f172a] text-slate-100 flex flex-col overflow-hidden font-sans">
      {/* Frosted Glass Mesh Gradient Background Blobs */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-purple-600/20 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute -bottom-40 left-1/3 w-96 h-96 bg-indigo-600/20 rounded-full blur-[120px] pointer-events-none"></div>

      {/* Top Navigation */}
      <Navbar
        selectedCourseId={selectedCourseId}
        currentUser={currentUser}
        onSelectCourse={handleSelectCourse}
        onOpenUpdatesModal={() => setIsUpdatesModalOpen(true)}
        onOpenLoginModal={() => {
          setAuthModalMode('login');
          setIsAuthModalOpen(true);
        }}
        onOpenRegisterModal={() => {
          setAuthModalMode('register');
          setIsAuthModalOpen(true);
        }}
        onOpenAccountDetailsModal={() => setIsAccountDetailsModalOpen(true)}
      />

      {/* Main Container with Sidebar + Bento Content */}
      <div className="flex flex-1 overflow-hidden relative z-10">
        <Sidebar
          activeTab={activeTab}
          currentUser={currentUser}
          onSelectTab={(tab) => {
            if (tab === 'practice') {
              handleStartPractice(selectedCourseId);
            } else if (tab === 'syllabus') {
              setIsUpdatesModalOpen(true);
            } else {
              setActiveTab(tab);
            }
          }}
          onStartQuickPractice={() => handleStartPractice(selectedCourseId)}
          onOpenLogin={() => {
            setAuthModalMode('login');
            setIsAuthModalOpen(true);
          }}
          onOpenRegister={() => {
            setAuthModalMode('register');
            setIsAuthModalOpen(true);
          }}
          onOpenAccountDetails={() => setIsAccountDetailsModalOpen(true)}
        />

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-8">
          {activeTab === 'analytics' ? (
            <AnalyticsDashboard
              selectedCourseId={selectedCourseId}
              onStartPracticeForCourse={(cId) => handleStartPractice(cId)}
            />
          ) : activeTab === 'courses' ? (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-white tracking-tight">Official Courses Database ({OFFICIAL_COURSES.length} Subjects)</h2>
                  <p className="text-xs text-slate-400 mt-1">
                    Verified with NTA JEE/NEET, SSC CGL/Govt, IBPS Banking, College Board, ETS, and AWS official exam standards
                  </p>
                </div>
                <button
                  onClick={() => handleStartPractice('all')}
                  className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-indigo-500/20 transition-all cursor-pointer"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Practice All Subjects</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {OFFICIAL_COURSES.map((course) => {
                  const isSelected = selectedCourseId === course.id;
                  return (
                    <div
                      key={course.id}
                      className={`bg-white/5 backdrop-blur-md border ${
                        isSelected ? 'border-indigo-400 bg-white/10' : 'border-white/10 hover:border-white/20'
                      } rounded-3xl p-6 flex flex-col justify-between transition-all`}
                    >
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-xs px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 font-bold border border-indigo-500/30">
                            {course.code}
                          </span>
                          <span className="text-xs text-slate-400">{course.syllabusYear}</span>
                        </div>

                        <div>
                          <h3 className="text-lg font-bold text-white">{course.name}</h3>
                          <p className="text-xs text-slate-400 mt-1">{course.officialDatabaseName}</p>
                        </div>

                        <div className="pt-2">
                          <p className="text-[11px] text-slate-400 uppercase font-semibold">Exam Scale</p>
                          <p className="text-sm text-indigo-300 font-semibold mt-0.5">{course.examScaleRange}</p>
                        </div>
                      </div>

                      <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                        <button
                          onClick={() => handleSelectCourse(course.id)}
                          className="text-xs font-semibold text-slate-300 hover:text-white transition-colors cursor-pointer"
                        >
                          {isSelected ? 'Active Subject ✓' : 'Select Subject'}
                        </button>

                        <button
                          onClick={() => handleStartPractice(course.id)}
                          className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 transition-all cursor-pointer shadow-md"
                        >
                          <span>Practice</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            /* Default Dashboard Bento Grid */
            <div className="space-y-6">
              {/* Top Action Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-2xl font-bold text-white tracking-tight">
                      {selectedCourseId === 'all'
                        ? 'ExamBook Official Curriculum Prep'
                        : `${currentCourse.name} Dashboard`}
                    </h2>
                    {currentUser && (
                      <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold">
                        {currentUser.targetYear} Batch
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5 flex items-center gap-2">
                    {currentUser ? (
                      <>
                        <span>Welcome back, <strong className="text-indigo-300">{currentUser.fullName}</strong> ({currentUser.roleTitle}).</span>
                        <span>• Target: <strong className="text-amber-300">{currentUser.dailyQuestionGoal} Qs/day</strong></span>
                      </>
                    ) : (
                      <span>Welcome to ExamBook. Synchronized with latest 2025–2026 exam blueprints.</span>
                    )}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  {currentUser ? (
                    <button
                      onClick={() => setIsAccountDetailsModalOpen(true)}
                      className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-xs font-semibold text-slate-200 transition-all cursor-pointer flex items-center gap-1.5"
                    >
                      <UserCheck className="w-3.5 h-3.5 text-indigo-400" />
                      <span>My Account Details</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        setAuthModalMode('login');
                        setIsAuthModalOpen(true);
                      }}
                      className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-xs font-semibold text-slate-200 transition-all cursor-pointer"
                    >
                      Candidate Log In
                    </button>
                  )}

                  <button
                    onClick={() => handleStartPractice(selectedCourseId)}
                    className="px-5 py-2.5 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white font-bold rounded-xl text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-indigo-500/20 transition-all cursor-pointer"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Start Practice Session</span>
                  </button>
                </div>
              </div>

              {/* Bento Grid layout */}
              <div className="grid grid-cols-12 gap-6">
                {/* Course Cards Grid (col-span-8) */}
                <CourseCardsGrid
                  selectedCourseId={selectedCourseId}
                  onSelectCourse={handleSelectCourse}
                  onStartCoursePractice={(id) => handleStartPractice(id)}
                />

                {/* Overall Performance Scale Gauge (col-span-4 row-span-3) */}
                <PerformanceScaleWidget
                  selectedCourseId={selectedCourseId}
                  overallAccuracy={analytics.overallAccuracy}
                  streakDays={analytics.streakDays}
                  onOpenScaleModal={() => setIsScaleModalOpen(true)}
                />

                {/* Quick Start Challenge Card (col-span-8 row-span-1) */}
                <section className="col-span-12 md:col-span-8 row-span-1 bg-gradient-to-r from-indigo-900/40 to-slate-900/40 border border-white/10 rounded-3xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between relative overflow-hidden gap-6">
                  <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none"></div>

                  <div className="space-y-2 max-w-lg">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 font-bold text-[10px] border border-indigo-500/30 uppercase">
                        Featured Exam Challenge
                      </span>
                      <span className="text-xs text-slate-400">
                        {currentCourse.syllabusYear} Official Standard
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-white tracking-tight">
                      {currentCourse.name}: {currentCourse.standardsList[0]?.title || 'Core Syllabus Unit'}
                    </h3>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Practice randomized high-yield exam questions with detailed official step-by-step rationales and section navigation.
                    </p>
                    <div className="flex items-center gap-4 text-xs text-slate-400 pt-1">
                      <span>⏱️ 10 min / 30 min / 60 min sets</span>
                      <span>🎯 {currentCourse.standardsList[0]?.code} standard</span>
                      <span>📊 Official exam scale scoring</span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleStartPractice(selectedCourseId)}
                    className="px-6 py-3.5 bg-white text-indigo-950 hover:bg-slate-200 font-bold rounded-2xl text-sm flex items-center gap-2 shadow-xl shadow-white/10 transition-all cursor-pointer shrink-0"
                  >
                    <span>Start Timed Exam</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </section>

                {/* Bottom Left: Live Syllabus Updates Card (col-span-4) */}
                <section 
                  onClick={() => setIsUpdatesModalOpen(true)}
                  className="col-span-12 sm:col-span-6 md:col-span-4 bg-white/5 hover:bg-white/10 backdrop-blur-md border border-white/10 rounded-3xl p-6 flex flex-col justify-between cursor-pointer transition-all group"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400">
                        Database Updates
                      </h4>
                      <Database className="w-4 h-4 text-indigo-400 group-hover:rotate-12 transition-transform" />
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-xs text-slate-200">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span>NTA JEE Mains & NEET UG 2026 syllabus synced</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-slate-200">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span>IBPS Banking PO & SSC CGL question banks loaded</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-slate-200">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span>Digital SAT & AP College Board standard active</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-semibold text-indigo-300">
                    <span>Inspect All {OFFICIAL_COURSES.length} Syllabus Standards</span>
                    <span>→</span>
                  </div>
                </section>

                {/* Bottom Right: Study Performance Trend Card (col-span-4) */}
                <section 
                  onClick={() => setActiveTab('analytics')}
                  className="col-span-12 sm:col-span-6 md:col-span-4 bg-white/5 hover:bg-white/10 backdrop-blur-md border border-white/10 rounded-3xl p-6 flex flex-col justify-between cursor-pointer transition-all group"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400">
                        Study Performance
                      </h4>
                      <TrendingUp className="w-4 h-4 text-emerald-400" />
                    </div>

                    <div className="space-y-1">
                      <p className="text-2xl font-bold text-white">
                        {analytics.overallAccuracy.toFixed(1)}% Avg Accuracy
                      </p>
                      <p className="text-xs text-slate-400">
                        {analytics.streakDays} Day active study streak • {studySessions.length} total sessions
                      </p>
                    </div>

                    {/* Mini strength badge */}
                    <div className="p-2.5 bg-indigo-500/10 rounded-xl border border-indigo-500/20 text-xs text-indigo-200 flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-indigo-400 shrink-0" />
                      <span className="truncate">
                        Top Strength: {analytics.strengthTopics[0]}
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-semibold text-emerald-300">
                    <span>View Full Analytics Charts</span>
                    <span>→</span>
                  </div>
                </section>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Modals */}
      <PracticeModal
        courseId={practiceCourseId}
        isOpen={isPracticeModalOpen}
        onClose={() => setIsPracticeModalOpen(false)}
        onSessionComplete={handleSessionComplete}
      />

      <CurriculumUpdatesModal
        isOpen={isUpdatesModalOpen}
        onClose={() => setIsUpdatesModalOpen(false)}
        onSelectCourseToPractice={(id) => handleStartPractice(id)}
      />

      <PerformanceScaleModal
        isOpen={isScaleModalOpen}
        onClose={() => setIsScaleModalOpen(false)}
      />

      {/* Auth Modal (Sign In & Create Account) */}
      <AuthModal
        isOpen={isAuthModalOpen}
        initialMode={authModalMode}
        onClose={() => setIsAuthModalOpen(false)}
        onAuthSuccess={handleAuthSuccess}
      />

      {/* Account Details & Settings Modal */}
      {currentUser && (
        <AccountDetailsModal
          user={currentUser}
          isOpen={isAccountDetailsModalOpen}
          onClose={() => setIsAccountDetailsModalOpen(false)}
          onUpdateUser={(updated) => setCurrentUser(updated)}
          onLogout={handleLogout}
          onSwitchAccount={() => {
            setAuthModalMode('login');
            setIsAuthModalOpen(true);
          }}
        />
      )}
    </div>
  );
}
