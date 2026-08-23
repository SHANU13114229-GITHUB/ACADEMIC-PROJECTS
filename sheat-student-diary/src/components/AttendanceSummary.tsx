import React, { useState } from 'react';
import { AttendanceData } from '../types';
import { ChevronRight, Percent, RefreshCw, AlertTriangle, CheckCircle } from 'lucide-react';

interface AttendanceSummaryProps {
  attendanceData: AttendanceData;
  onViewDetails: () => void;
}

export const AttendanceSummary: React.FC<AttendanceSummaryProps> = ({
  attendanceData,
  onViewDetails
}) => {
  // Option to switch between default initial "0%" state (as shown in user screenshot) and actual real data
  const [showZeroInitial, setShowZeroInitial] = useState(false);

  const theory = showZeroInitial ? 0 : attendanceData.theoryOverall;
  const practical = showZeroInitial ? 0 : attendanceData.practicalOverall;
  const overall = showZeroInitial ? 0 : attendanceData.overall;

  // Helper to calculate SVG circular stroke progress
  const renderCircleGauge = (
    value: number,
    label: string,
    colorClass: string,
    strokeColor: string
  ) => {
    const radius = 38;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (value / 100) * circumference;

    return (
      <div
        onClick={onViewDetails}
        className="flex flex-col items-center bg-white rounded-2xl p-4 border border-[#E8E4E1] shadow-2xs hover:border-[#435585] transition-all cursor-pointer group"
      >
        <div className="relative w-24 h-24 flex items-center justify-center">
          <svg className="w-24 h-24 transform -rotate-90">
            {/* Background Circle */}
            <circle
              cx="48"
              cy="48"
              r={radius}
              className="text-[#F2F0ED]"
              strokeWidth="7"
              stroke="currentColor"
              fill="transparent"
            />
            {/* Animated Progress Circle */}
            <circle
              cx="48"
              cy="48"
              r={radius}
              stroke={strokeColor}
              strokeWidth="7"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              fill="transparent"
              className="transition-all duration-1000 ease-out"
            />
          </svg>
          <div className="absolute flex flex-col items-center justify-center">
            <span className="text-xl font-bold text-[#2D2926] tracking-tight">
              {value}%
            </span>
          </div>
        </div>

        <span className="mt-3 text-xs font-bold text-[#4A4643] tracking-wide group-hover:text-[#435585] transition-colors">
          {label}
        </span>
      </div>
    );
  };

  return (
    <section className="px-4 py-2 my-2">
      {/* Attendance Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <h2 className="text-lg font-serif font-bold text-[#2D2926] tracking-tight">Attendance</h2>
          <button
            onClick={() => setShowZeroInitial(!showZeroInitial)}
            className="text-[10px] bg-[#F2F0ED] text-[#435585] hover:bg-[#E8E4E1] font-semibold px-2.5 py-0.5 rounded-full border border-[#E8E4E1] flex items-center gap-1 transition-colors"
            title="Toggle between screenshot view (0%) and real data"
          >
            <RefreshCw className="w-2.5 h-2.5" />
            {showZeroInitial ? 'Show Demo Data' : 'Show 0% View'}
          </button>
        </div>

        <button
          onClick={onViewDetails}
          className="text-xs font-semibold text-[#435585] hover:text-[#2D2926] flex items-center gap-0.5 hover:underline"
        >
          <span>Subject Wise</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* 3 Circular Rings Grid */}
      <div className="grid grid-cols-3 gap-3">
        {renderCircleGauge(
          theory,
          'Theory',
          'text-[#435585]',
          theory < 75 && theory > 0 ? '#d97706' : '#435585'
        )}
        {renderCircleGauge(
          practical,
          'Practical',
          'text-[#2D2926]',
          practical < 75 && practical > 0 ? '#d97706' : '#2D2926'
        )}
        {renderCircleGauge(
          overall,
          'Overall',
          'text-[#8C8885]',
          overall < 75 && overall > 0 ? '#dc2626' : '#435585'
        )}
      </div>

      {/* Criteria alert tag */}
      {!showZeroInitial && overall < 75 && (
        <div className="mt-2.5 bg-amber-50 border border-amber-200 text-amber-900 text-xs px-3 py-1.5 rounded-xl flex items-center space-x-2">
          <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
          <span>Warning: Attendance below 75%. Attend next 6 lectures to clear shortage.</span>
        </div>
      )}
      {!showZeroInitial && overall >= 75 && (
        <div className="mt-2.5 bg-[#EDF1F7] border border-[#E8E4E1] text-[#435585] text-xs px-3 py-1.5 rounded-xl flex items-center space-x-1.5">
          <CheckCircle className="w-3.5 h-3.5 text-[#435585] shrink-0" />
          <span className="font-medium text-[11px]">Good Standing! Attendance meets university exam criteria (75%+).</span>
        </div>
      )}
    </section>
  );
};
