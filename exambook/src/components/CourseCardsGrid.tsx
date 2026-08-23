import React, { useState } from 'react';
import { CourseId } from '../types';
import { OFFICIAL_COURSES } from '../data/courses';

interface CourseCardsGridProps {
  selectedCourseId: CourseId | 'all';
  onSelectCourse: (id: CourseId | 'all') => void;
  onStartCoursePractice: (id: CourseId) => void;
}

export const CourseCardsGrid: React.FC<CourseCardsGridProps> = ({
  selectedCourseId,
  onSelectCourse,
  onStartCoursePractice,
}) => {
  const [filterCategory, setFilterCategory] = useState<'all' | 'stem' | 'competitive'>('all');

  const getEmojiForCourse = (id: CourseId): string => {
    switch (id) {
      case 'jee-mains': return '⚛️';
      case 'neet-ug': return '🩺';
      case 'govt-exams': return '🏛️';
      case 'banking-exams': return '🏦';
      case 'ap-calc': return '📐';
      case 'ap-cs': return '💻';
      case 'sat-math': return '🎓';
      case 'gcse-bio': return '🧬';
      case 'gre-quant': return '📈';
      case 'aws-csa': return '☁️';
      default: return '📚';
    }
  };

  const getMasteryForCourse = (id: CourseId): number => {
    switch (id) {
      case 'jee-mains': return 89;
      case 'neet-ug': return 91;
      case 'govt-exams': return 85;
      case 'banking-exams': return 87;
      case 'ap-calc': return 88;
      case 'ap-cs': return 92;
      case 'sat-math': return 82;
      case 'gcse-bio': return 90;
      case 'gre-quant': return 76;
      case 'aws-csa': return 84;
      default: return 80;
    }
  };

  const getColorBgForCourse = (index: number): string => {
    const colors = [
      'bg-indigo-500/20 text-indigo-300 border-indigo-500/30',
      'bg-purple-500/20 text-purple-300 border-purple-500/30',
      'bg-blue-500/20 text-blue-300 border-blue-500/30',
      'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
      'bg-amber-500/20 text-amber-300 border-amber-500/30',
      'bg-rose-500/20 text-rose-300 border-rose-500/30',
      'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
      'bg-teal-500/20 text-teal-300 border-teal-500/30',
      'bg-violet-500/20 text-violet-300 border-violet-500/30',
    ];
    return colors[index % colors.length];
  };

  const filteredCourses = OFFICIAL_COURSES.filter(c => {
    if (filterCategory === 'competitive') {
      return ['jee-mains', 'neet-ug', 'govt-exams', 'banking-exams'].includes(c.id);
    }
    if (filterCategory === 'stem') {
      return ['ap-calc', 'ap-cs', 'sat-math', 'gcse-bio', 'gre-quant', 'aws-csa'].includes(c.id);
    }
    return true;
  });

  return (
    <section className="col-span-12 md:col-span-8 row-span-1 flex flex-col gap-3">
      {/* Category filter pills */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5 bg-white/5 border border-white/10 p-1 rounded-xl">
          <button
            onClick={() => setFilterCategory('all')}
            className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              filterCategory === 'all' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            All Exams ({OFFICIAL_COURSES.length})
          </button>
          <button
            onClick={() => setFilterCategory('competitive')}
            className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              filterCategory === 'competitive' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            JEE / NEET / Govt / Banking
          </button>
          <button
            onClick={() => setFilterCategory('stem')}
            className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              filterCategory === 'stem' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            AP / SAT / GRE / AWS
          </button>
        </div>

        <span className="text-[11px] text-slate-400 hidden sm:inline">
          10m (20Q) • 30m (50Q) • 1h (75Q) Timed Exams Available
        </span>
      </div>

      {/* Grid of Courses */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
        {filteredCourses.map((course, idx) => {
          const mastery = getMasteryForCourse(course.id);
          const emoji = getEmojiForCourse(course.id);
          const colorClass = getColorBgForCourse(idx);
          const isSelected = selectedCourseId === course.id;

          return (
            <div
              key={course.id}
              onClick={() => onSelectCourse(course.id)}
              className={`bg-white/5 hover:bg-white/10 border ${
                isSelected ? 'border-indigo-400 bg-white/10 shadow-lg shadow-indigo-500/10' : 'border-white/10'
              } rounded-2xl p-3.5 flex items-center justify-between gap-3 transition-all cursor-pointer group`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center text-xl border shrink-0 ${colorClass}`}>
                  {emoji}
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-slate-300 font-semibold truncate group-hover:text-white transition-colors">
                    {course.name}
                  </p>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="text-xs font-bold text-indigo-300">{mastery}% Mastery</span>
                    <span className="text-[10px] text-slate-500">• {course.code}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onStartCoursePractice(course.id);
                }}
                className="opacity-90 group-hover:opacity-100 px-2.5 py-1.5 bg-indigo-500/20 hover:bg-indigo-500 text-indigo-300 hover:text-white rounded-lg text-[10px] font-bold uppercase transition-all shrink-0 cursor-pointer"
                title="Start Timed Exam or Practice Set"
              >
                Test ↗
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
};
