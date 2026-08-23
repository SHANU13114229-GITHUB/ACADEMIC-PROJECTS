import React, { useState } from 'react';
import { CourseId } from '../types';
import { OFFICIAL_COURSES } from '../data/courses';
import { 
  X, 
  Database, 
  CheckCircle2, 
  BookOpen, 
  Sparkles, 
  Calendar, 
  ShieldCheck, 
  ChevronRight 
} from 'lucide-react';

interface CurriculumUpdatesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectCourseToPractice: (id: CourseId) => void;
}

export const CurriculumUpdatesModal: React.FC<CurriculumUpdatesModalProps> = ({
  isOpen,
  onClose,
  onSelectCourseToPractice,
}) => {
  const [selectedCourseId, setSelectedCourseId] = useState<CourseId>('ap-calc');

  if (!isOpen) return null;

  const currentCourse = OFFICIAL_COURSES.find((c) => c.id === selectedCourseId) || OFFICIAL_COURSES[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0f172a]/80 backdrop-blur-md">
      <div className="w-full max-w-4xl bg-[#0f172a] border border-white/20 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 bg-white/5 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-500/20 border border-indigo-500/30 rounded-xl flex items-center justify-center text-indigo-300">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">
                Official Curriculum Database & Syllabus Standards
              </h2>
              <p className="text-xs text-slate-400">
                Synchronized with 2025–2026 College Board, AQA, ETS, and AWS certification exam blueprints
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-xl transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content layout */}
        <div className="flex-1 flex overflow-hidden">
          {/* Left Course selector list */}
          <div className="w-64 border-r border-white/10 p-4 space-y-2 overflow-y-auto bg-white/5 shrink-0">
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500 px-2 mb-1">
              Select Official Course
            </p>
            {OFFICIAL_COURSES.map((course) => {
              const isSelected = course.id === selectedCourseId;
              return (
                <button
                  key={course.id}
                  onClick={() => setSelectedCourseId(course.id)}
                  className={`w-full p-3 rounded-xl border text-left transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-indigo-500/20 border-indigo-500/40 text-white font-semibold shadow-sm'
                      : 'bg-white/5 border-white/5 text-slate-400 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <p className="text-sm">{course.name}</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">{course.code}</p>
                </button>
              );
            })}
          </div>

          {/* Right Standards details */}
          <div className="flex-1 p-6 overflow-y-auto space-y-6">
            <div className="p-4 bg-white/5 border border-white/10 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold text-white">{currentCourse.name}</h3>
                <p className="text-xs text-slate-400">{currentCourse.officialDatabaseName}</p>
                <div className="flex items-center gap-3 mt-2 text-xs">
                  <span className="px-2 py-0.5 bg-indigo-500/20 text-indigo-300 rounded-full font-semibold border border-indigo-500/30">
                    Syllabus: {currentCourse.syllabusYear}
                  </span>
                  <span className="text-slate-400">{currentCourse.examScaleRange}</span>
                </div>
              </div>

              <button
                onClick={() => {
                  onSelectCourseToPractice(currentCourse.id);
                  onClose();
                }}
                className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-xs flex items-center gap-2 transition-all cursor-pointer shadow-lg shadow-indigo-500/20"
              >
                <span>Test This Curriculum</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Standards List */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                Official Syllabus Standards & Weightage
              </h4>
              <div className="space-y-3">
                {currentCourse.standardsList.map((std, idx) => (
                  <div
                    key={idx}
                    className="p-4 bg-white/5 border border-white/10 rounded-2xl flex items-start justify-between gap-4 hover:border-white/20 transition-all"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-bold text-xs border border-indigo-500/30">
                          {std.code}
                        </span>
                        <h5 className="font-semibold text-white text-sm">{std.title}</h5>
                      </div>
                      <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                        {std.description}
                      </p>
                    </div>

                    {std.weightPercentage && (
                      <div className="text-right shrink-0">
                        <span className="text-xs font-bold text-slate-300">
                          {std.weightPercentage}%
                        </span>
                        <p className="text-[10px] text-slate-500">Exam Weight</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Database Updates card matching Frosted Glass HTML */}
            <div className="pt-4 border-t border-white/10">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                Recent Official Database Sync Log
              </h4>
              <div className="space-y-2">
                <div className="p-3 bg-white/5 rounded-xl border border-white/5 flex justify-between items-center text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    <span className="text-slate-200 font-medium">College Board AP Calculus AB 2026 Question Bank Imported</span>
                  </div>
                  <span className="text-slate-500 text-[10px]">2h ago</span>
                </div>
                <div className="p-3 bg-white/5 rounded-xl border border-white/5 flex justify-between items-center text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    <span className="text-slate-200 font-medium">Digital SAT Mathematics Question Pool Verified</span>
                  </div>
                  <span className="text-slate-500 text-[10px]">6h ago</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
