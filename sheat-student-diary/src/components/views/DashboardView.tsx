import React from 'react';
import { StudentProfile, AttendanceData, SemesterResult, DiaryNote } from '../../types';
import { Trophy, BookOpen, Award, CheckCircle2, AlertCircle, ArrowLeft, TrendingUp } from 'lucide-react';

interface DashboardViewProps {
  student: StudentProfile;
  attendanceData: AttendanceData;
  results: SemesterResult[];
  diaryNotes: DiaryNote[];
  onBack: () => void;
  onNavigateTab: (tab: string) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  student,
  attendanceData,
  results,
  diaryNotes,
  onBack,
  onNavigateTab
}) => {
  const latestResult = results[0];
  const pendingDiaryCount = diaryNotes.filter((n) => !n.isCompleted).length;

  return (
    <div className="pb-20 p-4 space-y-4">
      {/* Top Title Bar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <button
            onClick={onBack}
            className="p-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h2 className="text-xl font-black text-gray-900 tracking-tight">Academic Dashboard</h2>
        </div>
        <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-2.5 py-1 rounded-full">
          Active Student
        </span>
      </div>

      {/* GPA & Performance Hero Card */}
      <div className="bg-gradient-to-br from-purple-900 via-indigo-900 to-purple-950 text-white rounded-2xl p-4 shadow-md border border-purple-700/50">
        <div className="flex items-center justify-between border-b border-purple-800/80 pb-3">
          <div>
            <p className="text-xs text-purple-200 font-semibold">{student.branch}</p>
            <h3 className="text-base font-bold text-white mt-0.5">{student.semester} Overview</h3>
          </div>
          <div className="w-10 h-10 rounded-full bg-amber-400 text-purple-950 flex items-center justify-center font-bold">
            <Trophy className="w-5 h-5" />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 mt-4 text-center">
          <div className="bg-purple-950/60 p-2.5 rounded-xl border border-purple-800/40">
            <p className="text-[10px] text-purple-300 font-medium uppercase">Latest SGPA</p>
            <p className="text-xl font-black text-amber-300 mt-0.5">
              {latestResult ? latestResult.sgpa : '8.64'}
            </p>
          </div>
          <div className="bg-purple-950/60 p-2.5 rounded-xl border border-purple-800/40">
            <p className="text-[10px] text-purple-300 font-medium uppercase">Overall CGPA</p>
            <p className="text-xl font-black text-amber-300 mt-0.5">
              {latestResult ? latestResult.cgpa : '8.42'}
            </p>
          </div>
          <div className="bg-purple-950/60 p-2.5 rounded-xl border border-purple-800/40">
            <p className="text-[10px] text-purple-300 font-medium uppercase">Earned Credits</p>
            <p className="text-xl font-black text-white mt-0.5">128/160</p>
          </div>
        </div>
      </div>

      {/* Quick KPI Stat Widgets */}
      <div className="grid grid-cols-2 gap-3">
        <div
          onClick={() => onNavigateTab('attendance')}
          className="bg-white p-3.5 rounded-2xl border border-gray-200/80 shadow-2xs cursor-pointer hover:border-purple-300 transition-all"
        >
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-bold text-gray-600">Attendance</span>
            <span className="text-xs font-black text-purple-700">{attendanceData.overall}%</span>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
            <div
              className="bg-purple-600 h-full rounded-full transition-all duration-500"
              style={{ width: `${attendanceData.overall}%` }}
            ></div>
          </div>
          <p className="text-[10px] text-gray-500 mt-2">
            Theory: {attendanceData.theoryOverall}% | Practical: {attendanceData.practicalOverall}%
          </p>
        </div>

        <div
          onClick={() => onNavigateTab('diary')}
          className="bg-white p-3.5 rounded-2xl border border-gray-200/80 shadow-2xs cursor-pointer hover:border-purple-300 transition-all"
        >
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-bold text-gray-600">Cloud Diary</span>
            <span className="text-xs font-black text-amber-600">{pendingDiaryCount} Pending</span>
          </div>
          <div className="flex items-center space-x-1.5 mt-2">
            <BookOpen className="w-4 h-4 text-purple-600" />
            <span className="text-xs font-bold text-gray-800">Homework & Tasks</span>
          </div>
          <p className="text-[10px] text-purple-700 font-semibold mt-1">Tap to add or view tasks →</p>
        </div>
      </div>

      {/* Subject Performance Breakdown */}
      <div className="bg-white p-4 rounded-2xl border border-gray-200/80 shadow-2xs space-y-3">
        <div className="flex items-center justify-between border-b border-gray-100 pb-2">
          <h3 className="text-sm font-bold text-gray-900 flex items-center gap-1.5">
            <TrendingUp className="w-4 h-4 text-purple-700" />
            <span>Subject-Wise Attendance & Progress</span>
          </h3>
          <span className="text-xs text-gray-500 font-medium">Semester VI</span>
        </div>

        <div className="space-y-3">
          {attendanceData.subjects.map((sub) => (
            <div key={sub.id} className="space-y-1">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-gray-800 truncate max-w-[200px]">
                  {sub.subjectCode} - {sub.subjectName}
                </span>
                <span
                  className={`${
                    sub.percentage >= 75 ? 'text-emerald-700' : 'text-amber-700'
                  }`}
                >
                  {sub.percentage}% ({sub.attended}/{sub.total})
                </span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                <div
                  className={`h-full rounded-full ${
                    sub.percentage >= 75 ? 'bg-emerald-500' : 'bg-amber-500'
                  }`}
                  style={{ width: `${sub.percentage}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Action Navigation Buttons */}
      <div className="grid grid-cols-2 gap-2">
        <button
          onClick={() => onNavigateTab('hallticket')}
          className="p-3 bg-purple-50 hover:bg-purple-100 text-purple-900 border border-purple-200 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-colors"
        >
          <Award className="w-4 h-4 text-purple-700" />
          <span>View Exam Hall Ticket</span>
        </button>
        <button
          onClick={() => onNavigateTab('result')}
          className="p-3 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-colors"
        >
          <Trophy className="w-4 h-4 text-amber-600" />
          <span>Semester Marksheets</span>
        </button>
      </div>
    </div>
  );
};
