import React, { useState, useEffect, useRef } from 'react';
import { CourseId, Difficulty, Question, StudySessionResult, ExamDurationPreset, ExamPresetConfig } from '../types';
import { OFFICIAL_COURSES, getCourseById, convertAccuracyToExamScore } from '../data/courses';
import { getRandomQuestions, shuffleQuestionOptions } from '../data/questions';
import { saveStudySession, toggleBookmark, loadBookmarks } from '../utils/storage';
import { 
  X, 
  CheckCircle2, 
  XCircle, 
  HelpCircle, 
  ArrowRight, 
  ArrowLeft,
  RotateCcw, 
  Sparkles, 
  Bookmark, 
  BookOpen,
  Award,
  Clock,
  Layers,
  Flag,
  Undo2,
  Eye,
  AlertTriangle,
  Menu,
  ChevronDown
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface PracticeModalProps {
  courseId: CourseId | 'all';
  isOpen: boolean;
  onClose: () => void;
  onSessionComplete: (session: StudySessionResult) => void;
}

const EXAM_PRESETS: ExamPresetConfig[] = [
  {
    id: '10min-20q',
    label: '10 Min Sprint',
    durationMinutes: 10,
    questionCount: 20,
    description: '20 High-yield Questions (Speed & Accuracy drill)',
    badge: '10 Min • 20 Qs'
  },
  {
    id: '30min-50q',
    label: '30 Min Standard',
    durationMinutes: 30,
    questionCount: 50,
    description: '50 Questions Sectional Mock Exam',
    badge: '30 Min • 50 Qs'
  },
  {
    id: '60min-75q',
    label: '1 Hour Full Exam',
    durationMinutes: 60,
    questionCount: 75,
    description: '75 Questions Comprehensive Official Blueprint',
    badge: '1 Hour • 75 Qs'
  },
  {
    id: 'practice-5q',
    label: '5 Qs Quick Practice',
    durationMinutes: 5,
    questionCount: 5,
    description: '5 Quick Questions with Instant Explanations',
    badge: '5 Min • 5 Qs'
  }
];

export const PracticeModal: React.FC<PracticeModalProps> = ({
  courseId,
  isOpen,
  onClose,
  onSessionComplete,
}) => {
  // Setup State
  const [activeCourseId, setActiveCourseId] = useState<CourseId | 'all'>(courseId);
  const [preset, setPreset] = useState<ExamDurationPreset>('10min-20q');
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty | 'All'>('All');
  const [examStarted, setExamStarted] = useState<boolean>(false);

  // Active Exam Session State
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  
  // User answers map: questionId -> selectedOptionIndex (or null)
  const [userAnswers, setUserAnswers] = useState<Record<number, number | null>>({});
  // Review flags: set of question indices marked for review
  const [markedForReview, setMarkedForReview] = useState<Set<number>>(new Set());
  // Visited indices: set of question indices visited
  const [visitedIndices, setVisitedIndices] = useState<Set<number>>(new Set());

  // Timer State
  const [timeRemainingSeconds, setTimeRemainingSeconds] = useState<number>(600);
  const [timerActive, setTimerActive] = useState<boolean>(false);
  const [startTime, setStartTime] = useState<number>(Date.now());

  // End screen & Review mode
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [reviewMode, setReviewMode] = useState<boolean>(false);
  const [isMobilePaletteOpen, setIsMobilePaletteOpen] = useState<boolean>(false);
  const [isGeneratingLive, setIsGeneratingLive] = useState<boolean>(false);
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>([]);
  
  // Section Navigation Filter
  const [activeSectionFilter, setActiveSectionFilter] = useState<string>('All');

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const currentCourse = activeCourseId === 'all' 
    ? (OFFICIAL_COURSES.find(c => c.id === 'jee-mains') || OFFICIAL_COURSES[0]) 
    : (getCourseById(activeCourseId) || OFFICIAL_COURSES[0]);

  // Sync initial courseId from props
  useEffect(() => {
    if (isOpen) {
      setActiveCourseId(courseId);
      setExamStarted(false);
      setIsCompleted(false);
      setReviewMode(false);
      const saved = loadBookmarks().map(b => b.questionId);
      setBookmarkedIds(saved);
    }
  }, [isOpen, courseId]);

  // Timer Countdown Effect
  useEffect(() => {
    if (examStarted && !isCompleted && timerActive) {
      timerRef.current = setInterval(() => {
        setTimeRemainingSeconds((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current!);
            handleAutoSubmit();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [examStarted, isCompleted, timerActive]);

  // Mark current index as visited
  useEffect(() => {
    if (examStarted && questions.length > 0) {
      setVisitedIndices((prev) => new Set(prev).add(currentIndex));
    }
  }, [currentIndex, examStarted, questions.length]);

  const handleStartExam = (selectedPreset: ExamDurationPreset = preset) => {
    const config = EXAM_PRESETS.find(p => p.id === selectedPreset) || EXAM_PRESETS[0];
    const targetCourse = activeCourseId === 'all' ? 'jee-mains' : activeCourseId;
    
    // Load randomized questions with options shuffled dynamically
    const pool = getRandomQuestions(
      targetCourse,
      config.questionCount,
      selectedDifficulty === 'All' ? undefined : selectedDifficulty
    );

    setQuestions(pool);
    setCurrentIndex(0);
    setUserAnswers({});
    setMarkedForReview(new Set());
    setVisitedIndices(new Set([0]));
    setTimeRemainingSeconds(config.durationMinutes * 60);
    setTimerActive(true);
    setExamStarted(true);
    setIsCompleted(false);
    setReviewMode(false);
    setStartTime(Date.now());
    setActiveSectionFilter('All');
  };

  const handleAutoSubmit = () => {
    finishExamSession(true);
  };

  const handleSelectOption = (optionIndex: number) => {
    setUserAnswers(prev => ({
      ...prev,
      [currentIndex]: optionIndex
    }));
  };

  const handleClearResponse = () => {
    setUserAnswers(prev => {
      const copy = { ...prev };
      delete copy[currentIndex];
      return copy;
    });
  };

  const handleToggleMarkForReview = () => {
    setMarkedForReview(prev => {
      const copy = new Set(prev);
      if (copy.has(currentIndex)) {
        copy.delete(currentIndex);
      } else {
        copy.add(currentIndex);
      }
      return copy;
    });
  };

  const handleNext = () => {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  const handleJumpToQuestion = (index: number) => {
    setCurrentIndex(index);
    setIsMobilePaletteOpen(false);
  };

  // Section list extracted from current questions
  const availableSections = React.useMemo(() => {
    const set = new Set<string>();
    questions.forEach(q => {
      if (q.sectionName) set.add(q.sectionName);
    });
    return Array.from(set);
  }, [questions]);

  // Jump to first question of a specific section
  const handleSwitchToSection = (sectionName: string) => {
    setActiveSectionFilter(sectionName);
    if (sectionName === 'All') return;
    const firstSecIdx = questions.findIndex(q => q.sectionName === sectionName);
    if (firstSecIdx !== -1) {
      setCurrentIndex(firstSecIdx);
    }
  };

  const finishExamSession = (isTimeout: boolean = false) => {
    if (timerRef.current) clearInterval(timerRef.current);
    setTimerActive(false);

    const timeSpent = Math.round((Date.now() - startTime) / 1000);
    
    // Calculate Score
    let correctCount = 0;
    const topicBreakdown: Record<string, { total: number; correct: number }> = {};

    questions.forEach((q, idx) => {
      const selected = userAnswers[idx];
      const isCorrect = selected !== undefined && selected === q.correctAnswerIndex;
      if (isCorrect) correctCount++;

      const sectionKey = q.sectionName || q.topic || 'General';
      if (!topicBreakdown[sectionKey]) {
        topicBreakdown[sectionKey] = { total: 0, correct: 0 };
      }
      topicBreakdown[sectionKey].total += 1;
      if (isCorrect) {
        topicBreakdown[sectionKey].correct += 1;
      }
    });

    const accuracy = questions.length > 0 ? (correctCount / questions.length) * 100 : 0;

    const sessionResult: StudySessionResult = {
      id: `session-${Date.now()}`,
      date: new Date().toISOString(),
      courseId: currentCourse.id,
      courseName: currentCourse.name,
      totalQuestions: questions.length,
      correctCount,
      timeSpentSeconds: timeSpent,
      accuracyPercentage: accuracy,
      mode: 'exam',
      difficultyFilter: selectedDifficulty,
      topicBreakdown
    };

    saveStudySession(sessionResult);
    setIsCompleted(true);
    onSessionComplete(sessionResult);

    if (accuracy >= 70) {
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  };

  const handleFetchLiveQuestion = async () => {
    setIsGeneratingLive(true);
    try {
      const res = await fetch('/api/fetch-live-question', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          courseId: currentCourse.id,
          difficulty: 'Official Exam Level',
          syllabusYear: currentCourse.syllabusYear
        })
      });
      const data = await res.json();
      if (data.success && data.question) {
        // Shuffled option positioning
        const randomized = shuffleQuestionOptions(data.question);
        setQuestions([randomized, ...questions]);
        setCurrentIndex(0);
      }
    } catch (e) {
      console.error('Failed to generate live question:', e);
    } finally {
      setIsGeneratingLive(false);
    }
  };

  const handleToggleBookmark = (questionId: string) => {
    const updated = toggleBookmark(questionId, currentCourse.id);
    setBookmarkedIds(updated.map(b => b.questionId));
  };

  const formatTimer = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    if (hrs > 0) {
      return `${hrs}:${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
    }
    return `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  if (!isOpen) return null;

  const currentQ = questions[currentIndex];
  const answeredCount = Object.keys(userAnswers).length;
  const markedCount = markedForReview.size;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-[#0f172a]/85 backdrop-blur-lg">
      <div className="w-full max-w-5xl bg-[#0f172a] border border-white/20 rounded-3xl shadow-2xl overflow-hidden flex flex-col h-[94vh] max-h-[900px]">
        
        {/* =========================================================================
            HEADER BAR
           ========================================================================= */}
        <div className="px-4 sm:px-6 py-3.5 bg-white/5 border-b border-white/10 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-indigo-500/20 border border-indigo-500/30 rounded-xl flex items-center justify-center text-indigo-300">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-bold text-white leading-tight">
                  {currentCourse.name}
                </h2>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 font-bold uppercase">
                  {currentCourse.code}
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                {currentCourse.officialDatabaseName} • {currentCourse.syllabusYear} Standard
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {examStarted && !isCompleted && (
              <div className={`flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-xl border font-mono font-bold text-sm sm:text-base ${
                timeRemainingSeconds < 120 
                  ? 'bg-rose-500/20 text-rose-300 border-rose-500/50 animate-pulse' 
                  : timeRemainingSeconds < 300 
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/40' 
                  : 'bg-white/10 text-white border-white/20'
              }`}>
                <Clock className="w-4 h-4 text-indigo-400" />
                <span>{formatTimer(timeRemainingSeconds)}</span>
              </div>
            )}

            {examStarted && !isCompleted && (
              <button
                onClick={() => setIsMobilePaletteOpen(prev => !prev)}
                className="lg:hidden p-2 bg-white/10 hover:bg-white/20 border border-white/10 text-white rounded-xl text-xs font-semibold flex items-center gap-1 cursor-pointer"
                title="Toggle question grid palette"
              >
                <Menu className="w-4 h-4" />
                <span className="hidden sm:inline">Palette</span>
              </button>
            )}

            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-xl transition-all cursor-pointer"
              title="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* =========================================================================
            STAGE 1: EXAM SETUP SCREEN (Select Timing & Subject)
           ========================================================================= */}
        {!examStarted ? (
          <div className="flex-1 p-6 sm:p-8 overflow-y-auto space-y-6 flex flex-col justify-between">
            <div className="space-y-6 max-w-3xl mx-auto w-full">
              {/* Subject selector bar */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Select Exam / Target Curriculum
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {OFFICIAL_COURSES.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => setActiveCourseId(c.id)}
                      className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                        activeCourseId === c.id
                          ? 'bg-indigo-500/20 border-indigo-400 text-white shadow-lg shadow-indigo-500/10'
                          : 'bg-white/5 border-white/10 text-slate-400 hover:text-white hover:bg-white/10'
                      }`}
                    >
                      <p className="font-bold text-xs truncate">{c.name}</p>
                      <p className="text-[10px] text-slate-400 mt-0.5">{c.examScaleRange.split('(')[0].trim()}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Timing & Question Count Presets */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Exam Timing & Question Count Configuration
                  </label>
                  <span className="text-[11px] text-indigo-300 font-semibold">
                    Free Section Switching Enabled
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {EXAM_PRESETS.map((p) => {
                    const isSelected = preset === p.id;
                    return (
                      <div
                        key={p.id}
                        onClick={() => setPreset(p.id)}
                        className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between relative overflow-hidden ${
                          isSelected
                            ? 'bg-gradient-to-br from-indigo-900/50 to-purple-900/30 border-indigo-400 shadow-xl shadow-indigo-500/10'
                            : 'bg-white/5 border-white/10 hover:border-white/20 hover:bg-white/10'
                        }`}
                      >
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className={`text-xs px-2.5 py-1 rounded-full font-bold uppercase ${
                              isSelected ? 'bg-indigo-500 text-white' : 'bg-white/10 text-slate-300'
                            }`}>
                              {p.badge}
                            </span>
                            <span className="text-xs text-slate-400 font-mono">
                              ⏱️ {p.durationMinutes} Minutes
                            </span>
                          </div>
                          <h3 className="text-base font-bold text-white">{p.label}</h3>
                          <p className="text-xs text-slate-400 leading-relaxed">
                            {p.description}
                          </p>
                        </div>

                        <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs font-semibold">
                          <span className={isSelected ? 'text-indigo-300' : 'text-slate-500'}>
                            {p.questionCount} Randomized Questions
                          </span>
                          <span className={isSelected ? 'text-white' : 'text-slate-400'}>
                            {isSelected ? 'Selected ✓' : 'Select'}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Exam Rules & Options Randomization info */}
              <div className="p-4 bg-white/5 border border-white/10 rounded-2xl space-y-2 text-xs text-slate-300">
                <div className="flex items-center gap-2 text-indigo-300 font-bold uppercase text-[11px]">
                  <Sparkles className="w-4 h-4" />
                  <span>Real Exam Features Active</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-400">
                  <div className="flex items-center gap-2">
                    <span className="text-emerald-400">✓</span>
                    <span>Randomized Option Positions (A, B, C, D)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-emerald-400">✓</span>
                    <span>Switch between sections anytime during the test</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-emerald-400">✓</span>
                    <span>Interactive Question Palette with Review Flags</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-emerald-400">✓</span>
                    <span>Instant Official Scale Scoring & Detailed Solutions</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Launch Button */}
            <div className="max-w-3xl mx-auto w-full pt-4 border-t border-white/10 flex justify-end gap-3">
              <button
                onClick={onClose}
                className="px-5 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-xs font-semibold text-slate-300 transition-all cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => handleStartExam()}
                className="px-8 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white font-bold rounded-xl text-sm shadow-xl shadow-indigo-500/20 flex items-center gap-2 transition-all cursor-pointer"
              >
                <span>Start Timed Exam</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : !isCompleted ? (
          /* =========================================================================
              STAGE 2: ACTIVE EXAM SCREEN WITH SECTION TABS & QUESTION PALETTE
             ========================================================================= */
          <div className="flex-1 flex overflow-hidden relative">
            
            {/* Main Question Arena */}
            <div className="flex-1 flex flex-col overflow-y-auto p-4 sm:p-6 space-y-4">
              
              {/* Section Tabs Switcher (Top of Exam Arena) */}
              {availableSections.length > 1 && (
                <div className="flex items-center gap-2 overflow-x-auto pb-1 shrink-0 no-scrollbar">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400 mr-1 flex items-center gap-1 shrink-0">
                    <Layers className="w-3.5 h-3.5 text-indigo-400" />
                    Sections:
                  </span>
                  <button
                    onClick={() => setActiveSectionFilter('All')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer shrink-0 ${
                      activeSectionFilter === 'All'
                        ? 'bg-indigo-600 text-white shadow-md'
                        : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white border border-white/10'
                    }`}
                  >
                    All Sections ({questions.length})
                  </button>
                  {availableSections.map((sec) => {
                    const secQuestions = questions.filter(q => q.sectionName === sec);
                    const secAnswered = secQuestions.filter((_, idx) => {
                      const overallIdx = questions.findIndex(q => q.id === secQuestions[idx].id);
                      return userAnswers[overallIdx] !== undefined;
                    }).length;
                    const isSecActive = activeSectionFilter === sec || currentQ?.sectionName === sec;

                    return (
                      <button
                        key={sec}
                        onClick={() => handleSwitchToSection(sec)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer shrink-0 flex items-center gap-1.5 ${
                          isSecActive
                            ? 'bg-indigo-500/30 text-indigo-200 border border-indigo-400 shadow-sm'
                            : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white border border-white/10'
                        }`}
                      >
                        <span>{sec}</span>
                        <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-white/10 text-slate-300 font-mono">
                          {secAnswered}/{secQuestions.length}
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Question Metadata Bar */}
              <div className="flex items-center justify-between text-xs text-slate-400 pt-1 shrink-0">
                <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                  <span className="px-3 py-1 bg-white/10 border border-white/15 rounded-full font-bold text-white text-xs">
                    Question {currentIndex + 1} of {questions.length}
                  </span>
                  {currentQ?.sectionName && (
                    <span className="px-2.5 py-1 bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 rounded-full font-semibold">
                      {currentQ.sectionName}
                    </span>
                  )}
                  <span className="px-2.5 py-1 bg-purple-500/20 text-purple-300 border border-purple-500/30 rounded-full font-semibold hidden sm:inline">
                    {currentQ?.difficulty || 'Official Exam Level'}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  {currentQ && (
                    <button
                      onClick={() => handleToggleBookmark(currentQ.id)}
                      className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full border transition-all cursor-pointer text-xs ${
                        bookmarkedIds.includes(currentQ.id)
                          ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                          : 'bg-white/5 text-slate-400 border-white/10 hover:text-white'
                      }`}
                    >
                      <Bookmark className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">
                        {bookmarkedIds.includes(currentQ.id) ? 'Saved' : 'Save'}
                      </span>
                    </button>
                  )}

                  <button
                    onClick={handleToggleMarkForReview}
                    className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full border transition-all cursor-pointer text-xs ${
                      markedForReview.has(currentIndex)
                        ? 'bg-purple-500/30 text-purple-300 border-purple-400'
                        : 'bg-white/5 text-slate-400 border-white/10 hover:text-white'
                    }`}
                  >
                    <Flag className="w-3.5 h-3.5" />
                    <span>{markedForReview.has(currentIndex) ? 'Marked for Review' : 'Mark Review'}</span>
                  </button>
                </div>
              </div>

              {/* Question Text & Options Card */}
              {currentQ ? (
                <div className="p-5 sm:p-6 bg-white/5 border border-white/10 rounded-2xl space-y-6 flex-1 flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-[11px] text-slate-400">
                      <span className="font-semibold text-indigo-300">
                        Topic: {currentQ.topic}
                      </span>
                      <span className="font-mono text-slate-500 truncate max-w-[200px]">
                        {currentQ.syllabusStandard}
                      </span>
                    </div>

                    <h3 className="text-base sm:text-lg font-semibold text-white leading-relaxed whitespace-pre-line">
                      {currentQ.questionText}
                    </h3>

                    {/* 4 Options with Randomized Positions */}
                    <div className="space-y-3 pt-2">
                      {currentQ.options.map((option, idx) => {
                        const isSelected = userAnswers[currentIndex] === idx;
                        return (
                          <button
                            key={idx}
                            onClick={() => handleSelectOption(idx)}
                            className={`w-full min-h-[52px] p-4 rounded-xl border text-left flex items-center justify-between transition-all cursor-pointer text-sm ${
                              isSelected
                                ? 'bg-indigo-600/30 border-indigo-400 text-white shadow-md shadow-indigo-500/10'
                                : 'bg-white/5 border-white/10 text-slate-200 hover:bg-white/10 hover:border-white/20'
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <span className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 ${
                                isSelected 
                                  ? 'bg-indigo-500 text-white' 
                                  : 'bg-white/10 text-slate-300 border border-white/10'
                              }`}>
                                {String.fromCharCode(65 + idx)}
                              </span>
                              <span className="leading-relaxed">{option}</span>
                            </div>
                            {isSelected && (
                              <CheckCircle2 className="w-5 h-5 text-indigo-400 shrink-0 ml-2" />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Navigation Bottom Controls */}
                  <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 shrink-0">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={handlePrev}
                        disabled={currentIndex === 0}
                        className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-xs font-semibold text-slate-300 disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-1.5 transition-all cursor-pointer"
                      >
                        <ArrowLeft className="w-4 h-4" />
                        <span>Previous</span>
                      </button>

                      {userAnswers[currentIndex] !== undefined && (
                        <button
                          onClick={handleClearResponse}
                          className="px-3 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-xs font-semibold text-rose-300 hover:text-rose-200 flex items-center gap-1 transition-all cursor-pointer"
                          title="Clear selected option"
                        >
                          <Undo2 className="w-3.5 h-3.5" />
                          <span>Clear</span>
                        </button>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      {currentIndex + 1 < questions.length ? (
                        <button
                          onClick={handleNext}
                          className="px-6 py-2.5 bg-white text-indigo-950 hover:bg-slate-200 font-bold rounded-xl text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-white/10 transition-all cursor-pointer"
                        >
                          <span>Save & Next</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      ) : (
                        <button
                          onClick={() => finishExamSession(false)}
                          className="px-6 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-bold rounded-xl text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-emerald-500/20 transition-all cursor-pointer"
                        >
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Submit Exam</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 text-slate-400">Loading exam questions...</div>
              )}
            </div>

            {/* Question Palette Sidebar (Desktop Side panel / Mobile Collapsible Drawer) */}
            <div className={`
              ${isMobilePaletteOpen ? 'absolute inset-0 z-30 bg-[#0f172a]' : 'hidden'} 
              lg:flex lg:static w-full lg:w-72 bg-white/5 border-l border-white/10 p-4 flex flex-col justify-between shrink-0 overflow-y-auto
            `}>
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-white/10">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                    <span>Question Palette</span>
                  </h4>
                  {isMobilePaletteOpen && (
                    <button
                      onClick={() => setIsMobilePaletteOpen(false)}
                      className="p-1 text-slate-400 hover:text-white"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {/* Legend */}
                <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-400">
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded bg-emerald-500"></span>
                    <span>Answered ({answeredCount})</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded bg-purple-500"></span>
                    <span>Review ({markedCount})</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded bg-rose-500/60"></span>
                    <span>Not Answered</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded bg-white/10"></span>
                    <span>Not Visited</span>
                  </div>
                </div>

                {/* Section filter in palette */}
                {availableSections.length > 1 && (
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-bold text-slate-500">Jump by Section</label>
                    <select
                      value={activeSectionFilter}
                      onChange={(e) => handleSwitchToSection(e.target.value)}
                      className="w-full p-2 bg-white/5 border border-white/10 rounded-xl text-xs text-white focus:outline-none cursor-pointer"
                    >
                      <option value="All" className="bg-[#0f172a]">All Sections ({questions.length})</option>
                      {availableSections.map(s => (
                        <option key={s} value={s} className="bg-[#0f172a]">{s}</option>
                      ))}
                    </select>
                  </div>
                )}

                {/* Palette Grid Buttons */}
                <div className="grid grid-cols-5 sm:grid-cols-5 gap-2 max-h-[380px] overflow-y-auto p-1">
                  {questions.map((q, idx) => {
                    const isAnswered = userAnswers[idx] !== undefined;
                    const isMarked = markedForReview.has(idx);
                    const isVisited = visitedIndices.has(idx);
                    const isCurrent = currentIndex === idx;

                    let btnClass = 'bg-white/5 border-white/10 text-slate-400';
                    if (isMarked) {
                      btnClass = 'bg-purple-600 text-white font-bold border-purple-400';
                    } else if (isAnswered) {
                      btnClass = 'bg-emerald-600 text-white font-bold border-emerald-400';
                    } else if (isVisited) {
                      btnClass = 'bg-rose-500/30 text-rose-300 border-rose-500/40';
                    }

                    if (isCurrent) {
                      btnClass += ' ring-2 ring-indigo-400 ring-offset-2 ring-offset-[#0f172a]';
                    }

                    return (
                      <button
                        key={idx}
                        onClick={() => handleJumpToQuestion(idx)}
                        className={`h-9 rounded-xl border text-xs font-semibold flex items-center justify-center transition-all cursor-pointer ${btnClass}`}
                        title={`Question ${idx + 1} (${q.sectionName || q.topic})`}
                      >
                        {idx + 1}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Submit Button in Sidebar */}
              <div className="pt-4 border-t border-white/10 space-y-2">
                <button
                  onClick={() => finishExamSession(false)}
                  className="w-full py-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-bold rounded-xl text-xs uppercase tracking-wider shadow-lg shadow-emerald-500/20 transition-all cursor-pointer"
                >
                  Submit & Finish Exam
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* =========================================================================
              STAGE 3: EXAM SCORECARD & SECTION-BY-SECTION REVIEW
             ========================================================================= */
          <div className="flex-1 p-6 sm:p-8 overflow-y-auto space-y-6">
            {!reviewMode ? (
              <div className="max-w-2xl mx-auto text-center space-y-6">
                <div className="w-16 h-16 rounded-2xl bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center text-indigo-300 mx-auto">
                  <Award className="w-8 h-8" />
                </div>
                
                <div>
                  <h3 className="text-2xl font-bold text-white">Exam Simulation Complete!</h3>
                  <p className="text-slate-400 text-xs mt-1">
                    {currentCourse.name} • {questions.length} Randomized Official Questions
                  </p>
                </div>

                {/* Score Projection Card with Official Scale */}
                <div className="p-6 bg-white/5 border border-white/10 rounded-3xl space-y-4">
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 border-b border-white/10 pb-4">
                    <div>
                      <p className="text-[10px] text-slate-400 uppercase font-semibold">Questions Attempted</p>
                      <p className="text-xl font-bold text-white mt-1">
                        {answeredCount} / {questions.length}
                      </p>
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-400 uppercase font-semibold">Correct Answers</p>
                      <p className="text-xl font-bold text-emerald-400 mt-1">
                        {questions.filter((q, i) => userAnswers[i] === q.correctAnswerIndex).length}
                      </p>
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                      <p className="text-[10px] text-slate-400 uppercase font-semibold">Accuracy</p>
                      <p className="text-xl font-bold text-indigo-300 mt-1">
                        {Math.round((questions.filter((q, i) => userAnswers[i] === q.correctAnswerIndex).length / questions.length) * 100)}%
                      </p>
                    </div>
                  </div>

                  {/* Standardized Exam Scale Output */}
                  <div className="p-4 bg-indigo-500/10 border border-indigo-500/30 rounded-2xl">
                    <p className="text-[11px] text-slate-400 uppercase font-semibold">
                      Standardized Exam Scaled Score
                    </p>
                    <p className="text-2xl font-bold text-white mt-1">
                      {convertAccuracyToExamScore(
                        currentCourse.id, 
                        (questions.filter((q, i) => userAnswers[i] === q.correctAnswerIndex).length / questions.length) * 100
                      )}
                    </p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap items-center justify-center gap-3">
                  <button
                    onClick={() => setReviewMode(true)}
                    className="px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/15 text-white font-semibold rounded-xl text-xs flex items-center gap-2 transition-all cursor-pointer"
                  >
                    <Eye className="w-4 h-4" />
                    <span>Review All Questions & Rationales</span>
                  </button>

                  <button
                    onClick={() => handleStartExam(preset)}
                    className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl text-xs flex items-center gap-2 transition-all cursor-pointer shadow-lg shadow-indigo-500/20"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Retake Another Set</span>
                  </button>

                  <button
                    onClick={onClose}
                    className="px-6 py-3 bg-white text-indigo-950 font-bold rounded-xl text-xs shadow-lg shadow-white/10 hover:bg-slate-200 transition-all cursor-pointer"
                  >
                    Dashboard
                  </button>
                </div>
              </div>
            ) : (
              /* Review Mode: Inspect each question, user response vs correct answer and rationale */
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-white/10">
                  <div>
                    <h3 className="text-lg font-bold text-white">Full Exam Question Solutions & Rationales</h3>
                    <p className="text-xs text-slate-400">
                      Step-by-step official explanations for all {questions.length} questions
                    </p>
                  </div>
                  <button
                    onClick={() => setReviewMode(false)}
                    className="px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/10 text-white rounded-xl text-xs font-semibold cursor-pointer"
                  >
                    Back to Score Summary
                  </button>
                </div>

                <div className="space-y-6">
                  {questions.map((q, idx) => {
                    const userSelected = userAnswers[idx];
                    const isCorrect = userSelected === q.correctAnswerIndex;
                    const isSkipped = userSelected === undefined;

                    return (
                      <div
                        key={idx}
                        className={`p-6 rounded-2xl border ${
                          isCorrect 
                            ? 'bg-emerald-950/20 border-emerald-500/30' 
                            : isSkipped 
                            ? 'bg-white/5 border-white/10' 
                            : 'bg-rose-950/20 border-rose-500/30'
                        } space-y-4`}
                      >
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-bold text-white px-2.5 py-0.5 rounded bg-white/10">
                            Q{idx + 1} • {q.sectionName || q.topic}
                          </span>
                          <span className={`px-2.5 py-0.5 rounded font-bold uppercase ${
                            isCorrect 
                              ? 'bg-emerald-500/20 text-emerald-300' 
                              : isSkipped 
                              ? 'bg-slate-500/20 text-slate-400' 
                              : 'bg-rose-500/20 text-rose-300'
                          }`}>
                            {isCorrect ? 'Correct ✓' : isSkipped ? 'Skipped' : 'Incorrect ✗'}
                          </span>
                        </div>

                        <p className="text-sm font-semibold text-white leading-relaxed">
                          {q.questionText}
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                          {q.options.map((opt, optIdx) => {
                            const isOptCorrect = optIdx === q.correctAnswerIndex;
                            const isOptChosen = userSelected === optIdx;

                            let optBg = 'bg-white/5 border-white/10 text-slate-300';
                            if (isOptCorrect) {
                              optBg = 'bg-emerald-500/20 border-emerald-500/50 text-emerald-200 font-bold';
                            } else if (isOptChosen && !isOptCorrect) {
                              optBg = 'bg-rose-500/20 border-rose-500/50 text-rose-200';
                            }

                            return (
                              <div
                                key={optIdx}
                                className={`p-3 rounded-xl border flex items-center justify-between ${optBg}`}
                              >
                                <div className="flex items-center gap-2">
                                  <span className="font-bold">{String.fromCharCode(65 + optIdx)}.</span>
                                  <span>{opt}</span>
                                </div>
                                {isOptCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />}
                                {isOptChosen && !isOptCorrect && <XCircle className="w-4 h-4 text-rose-400 shrink-0" />}
                              </div>
                            );
                          })}
                        </div>

                        {/* Rationale box */}
                        <div className="p-4 bg-indigo-500/10 border border-indigo-500/30 rounded-xl space-y-1 text-xs">
                          <p className="font-bold text-indigo-300 flex items-center gap-1.5">
                            <HelpCircle className="w-4 h-4" />
                            <span>Official Curriculum Rationale ({q.syllabusStandard}):</span>
                          </p>
                          <p className="text-slate-300 leading-relaxed pt-1">
                            {q.rationale}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
