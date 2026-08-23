import React from 'react';
import { CourseId } from '../types';
import { convertAccuracyToExamScore, getPerformanceTier } from '../data/courses';

interface PerformanceScaleWidgetProps {
  selectedCourseId: CourseId | 'all';
  overallAccuracy: number;
  streakDays: number;
  onOpenScaleModal?: () => void;
}

export const PerformanceScaleWidget: React.FC<PerformanceScaleWidgetProps> = ({
  selectedCourseId,
  overallAccuracy,
  streakDays,
  onOpenScaleModal,
}) => {
  const displayScore = Number(overallAccuracy.toFixed(1));
  const tier = getPerformanceTier(overallAccuracy);
  const examScoreLabel = convertAccuracyToExamScore(selectedCourseId, overallAccuracy);

  // Calculate SVG circle dashoffset for 140 diameter circle (radius 70 => circumference 440)
  const circumference = 2 * Math.PI * 70; // ~439.82
  const strokeDashoffset = circumference - (overallAccuracy / 100) * circumference;

  return (
    <section 
      onClick={onOpenScaleModal}
      className="col-span-12 md:col-span-4 row-span-3 bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-6 flex flex-col items-center justify-center text-center relative overflow-hidden cursor-pointer group hover:border-white/20 transition-all"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/5 to-transparent pointer-events-none"></div>

      <div className="w-full flex items-center justify-between mb-4 z-10">
        <h3 className="text-slate-400 text-xs font-bold uppercase tracking-widest">
          Overall Performance
        </h3>
        <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 font-semibold border border-indigo-500/30">
          Scale Guide ↗
        </span>
      </div>

      {/* SVG Circle Gauge */}
      <div className="relative w-40 h-40 flex items-center justify-center mb-4 z-10">
        <svg className="w-full h-full -rotate-90">
          <circle
            cx="80"
            cy="80"
            r="70"
            stroke="currentColor"
            strokeWidth="12"
            fill="transparent"
            className="text-white/5"
          />
          <circle
            cx="80"
            cy="80"
            r="70"
            stroke="currentColor"
            strokeWidth="12"
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className="text-indigo-400 shadow-lg transition-all duration-1000 ease-out"
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute flex flex-col items-center">
          <span className="text-4xl font-bold tracking-tight text-white">{displayScore}%</span>
          <span className="text-[10px] text-indigo-300 font-bold uppercase tracking-wider mt-0.5">
            {tier.toUpperCase()} LEVEL
          </span>
        </div>
      </div>

      {/* Official Exam Scale Badge */}
      <div className="z-10 w-full mb-3 px-3 py-2 bg-indigo-500/10 border border-indigo-500/30 rounded-xl">
        <p className="text-[10px] text-slate-400 uppercase font-semibold">Official Exam Scale Projection</p>
        <p className="text-sm font-bold text-indigo-200 mt-0.5">{examScoreLabel}</p>
      </div>

      <p className="text-xs text-slate-300 italic z-10">
        &ldquo;Top 5% of candidates based on {streakDays}-day curriculum study trend.&rdquo;
      </p>
    </section>
  );
};
