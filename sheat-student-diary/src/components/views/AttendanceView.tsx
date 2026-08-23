import React, { useState } from 'react';
import { AttendanceData, SubjectAttendance } from '../../types';
import { ArrowLeft, PlusCircle, Calculator, FileText, CheckCircle2, AlertTriangle, Calendar, UserCheck } from 'lucide-react';

interface AttendanceViewProps {
  attendanceData: AttendanceData;
  onUpdateAttendance: (newAttendance: AttendanceData) => void;
  onBack: () => void;
}

export const AttendanceView: React.FC<AttendanceViewProps> = ({
  attendanceData,
  onUpdateAttendance,
  onBack
}) => {
  const [selectedSubject, setSelectedSubject] = useState<SubjectAttendance | null>(null);
  const [targetPercent, setTargetPercent] = useState<number>(75);
  const [activeTab, setActiveTab] = useState<'subjects' | 'history' | 'calculator' | 'leave'>('subjects');

  // Leave Form State
  const [leaveReason, setLeaveReason] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [leaveSubmitted, setLeaveSubmitted] = useState(false);

  // Helper to update individual subject attendance
  const handleLogAttendance = (subjectId: string, isPresent: boolean) => {
    const updatedSubjects = attendanceData.subjects.map((sub) => {
      if (sub.id === subjectId) {
        const newAttended = isPresent ? sub.attended + 1 : sub.attended;
        const newTotal = sub.total + 1;
        const newPercentage = Number(((newAttended / newTotal) * 100).toFixed(1));
        return {
          ...sub,
          attended: newAttended,
          total: newTotal,
          percentage: newPercentage,
          lastUpdated: 'Just Now'
        };
      }
      return sub;
    });

    // Recalculate totals
    const theorySubs = updatedSubjects.filter((s) => s.type === 'Theory');
    const practicalSubs = updatedSubjects.filter((s) => s.type === 'Practical');

    const totalTheoryAttended = theorySubs.reduce((acc, s) => acc + s.attended, 0);
    const totalTheoryClasses = theorySubs.reduce((acc, s) => acc + s.total, 0);
    const theoryOverall = Number(((totalTheoryAttended / totalTheoryClasses) * 100).toFixed(1));

    const totalPracAttended = practicalSubs.reduce((acc, s) => acc + s.attended, 0);
    const totalPracClasses = practicalSubs.reduce((acc, s) => acc + s.total, 0);
    const practicalOverall = Number(((totalPracAttended / totalPracClasses) * 100).toFixed(1));

    const totalAttended = updatedSubjects.reduce((acc, s) => acc + s.attended, 0);
    const totalClasses = updatedSubjects.reduce((acc, s) => acc + s.total, 0);
    const overall = Number(((totalAttended / totalClasses) * 100).toFixed(1));

    const newHistory = [
      {
        date: 'Today',
        status: isPresent ? ('Present' as const) : ('Absent' as const),
        subject: updatedSubjects.find((s) => s.id === subjectId)?.subjectName || '',
        period: 'Period Today'
      },
      ...attendanceData.history
    ];

    onUpdateAttendance({
      theoryOverall,
      practicalOverall,
      overall,
      subjects: updatedSubjects,
      history: newHistory
    });
  };

  // Calculate classes needed for target percentage
  const calculateClassesNeeded = (attended: number, total: number, target: number) => {
    if ((attended / total) * 100 >= target) return 0;
    // (attended + x) / (total + x) = target / 100
    // 100 * attended + 100 * x = target * total + target * x
    // x * (100 - target) = target * total - 100 * attended
    const numerator = target * total - 100 * attended;
    const denominator = 100 - target;
    if (denominator <= 0) return 999;
    return Math.ceil(numerator / denominator);
  };

  const handleSubmitLeave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!leaveReason || !startDate || !endDate) return;
    setLeaveSubmitted(true);
    setTimeout(() => {
      setLeaveSubmitted(false);
      setLeaveReason('');
      setStartDate('');
      setEndDate('');
      setActiveTab('subjects');
    }, 2500);
  };

  return (
    <div className="pb-20 p-4 space-y-4">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <button
            onClick={onBack}
            className="p-2 text-[#2D2926] hover:bg-[#F2F0ED] rounded-full transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h2 className="text-xl font-serif font-bold text-[#2D2926] tracking-tight">Attendance Manager</h2>
        </div>
        <span className="text-xs font-bold bg-[#F2F0ED] text-[#435585] border border-[#E8E4E1] px-2.5 py-1 rounded-full">
          Overall: {attendanceData.overall}%
        </span>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-3 gap-2 text-center">
        <div className="bg-white p-3 rounded-2xl border border-[#E8E4E1] shadow-2xs">
          <span className="text-[10px] font-bold text-[#8C8885] uppercase">Theory</span>
          <p className="text-lg font-bold text-[#435585] mt-0.5">{attendanceData.theoryOverall}%</p>
        </div>
        <div className="bg-white p-3 rounded-2xl border border-[#E8E4E1] shadow-2xs">
          <span className="text-[10px] font-bold text-[#8C8885] uppercase">Practical</span>
          <p className="text-lg font-bold text-[#2D2926] mt-0.5">{attendanceData.practicalOverall}%</p>
        </div>
        <div className="bg-white p-3 rounded-2xl border border-[#E8E4E1] shadow-2xs">
          <span className="text-[10px] font-bold text-[#8C8885] uppercase">Overall</span>
          <p className="text-lg font-bold text-[#435585] mt-0.5">{attendanceData.overall}%</p>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex bg-[#F2F0ED] p-1 rounded-xl border border-[#E8E4E1] text-xs font-bold text-[#8C8885]">
        <button
          onClick={() => setActiveTab('subjects')}
          className={`flex-1 py-1.5 rounded-lg transition-all ${
            activeTab === 'subjects' ? 'bg-white text-[#2D2926] shadow-2xs' : 'hover:text-[#2D2926]'
          }`}
        >
          Subjects ({attendanceData.subjects.length})
        </button>
        <button
          onClick={() => setActiveTab('calculator')}
          className={`flex-1 py-1.5 rounded-lg transition-all ${
            activeTab === 'calculator' ? 'bg-white text-[#2D2926] shadow-2xs' : 'hover:text-[#2D2926]'
          }`}
        >
          Target Calc
        </button>
        <button
          onClick={() => setActiveTab('history')}
          className={`flex-1 py-1.5 rounded-lg transition-all ${
            activeTab === 'history' ? 'bg-white text-[#2D2926] shadow-2xs' : 'hover:text-[#2D2926]'
          }`}
        >
          Log History
        </button>
        <button
          onClick={() => setActiveTab('leave')}
          className={`flex-1 py-1.5 rounded-lg transition-all ${
            activeTab === 'leave' ? 'bg-white text-[#2D2926] shadow-2xs' : 'hover:text-[#2D2926]'
          }`}
        >
          Apply Leave
        </button>
      </div>

      {/* Tab Content: Subject Breakdown */}
      {activeTab === 'subjects' && (
        <div className="space-y-3">
          {attendanceData.subjects.map((sub) => (
            <div
              key={sub.id}
              className="bg-white p-3.5 rounded-2xl border border-gray-200/80 shadow-2xs space-y-2"
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[9px] font-bold bg-purple-100 text-purple-800 px-1.5 py-0.2 rounded uppercase">
                    {sub.type} • {sub.subjectCode}
                  </span>
                  <h3 className="text-sm font-bold text-gray-900 mt-1 leading-snug">
                    {sub.subjectName}
                  </h3>
                  <p className="text-[11px] text-gray-500 font-medium">Faculty: {sub.faculty}</p>
                </div>

                <div className="text-right">
                  <span
                    className={`text-base font-black ${
                      sub.percentage >= 75 ? 'text-emerald-600' : 'text-amber-600'
                    }`}
                  >
                    {sub.percentage}%
                  </span>
                  <p className="text-[10px] text-gray-500">
                    {sub.attended}/{sub.total} Classes
                  </p>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all ${
                    sub.percentage >= 75 ? 'bg-emerald-500' : 'bg-amber-500'
                  }`}
                  style={{ width: `${sub.percentage}%` }}
                ></div>
              </div>

              {/* Interactive Log buttons */}
              <div className="flex items-center justify-between pt-1 border-t border-gray-100 text-[11px]">
                <span className="text-gray-400">Updated: {sub.lastUpdated}</span>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleLogAttendance(sub.id, true)}
                    className="bg-emerald-50 text-emerald-700 hover:bg-emerald-100 font-bold px-2.5 py-1 rounded-lg border border-emerald-200 transition-colors"
                  >
                    + Present
                  </button>
                  <button
                    onClick={() => handleLogAttendance(sub.id, false)}
                    className="bg-rose-50 text-rose-700 hover:bg-rose-100 font-bold px-2.5 py-1 rounded-lg border border-rose-200 transition-colors"
                  >
                    + Absent
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab Content: Target Attendance Calculator */}
      {activeTab === 'calculator' && (
        <div className="bg-white p-4 rounded-2xl border border-purple-100 shadow-2xs space-y-4">
          <div className="flex items-center space-x-2">
            <Calculator className="w-5 h-5 text-purple-700" />
            <h3 className="text-sm font-bold text-gray-900">Attendance Goal Calculator</h3>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-xs font-semibold text-gray-700">Target Attendance %:</span>
            {[75, 80, 85, 90].map((pct) => (
              <button
                key={pct}
                onClick={() => setTargetPercent(pct)}
                className={`px-3 py-1 rounded-lg text-xs font-bold border ${
                  targetPercent === pct
                    ? 'bg-purple-900 text-white border-purple-900'
                    : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
                }`}
              >
                {pct}%
              </button>
            ))}
          </div>

          <div className="space-y-2">
            {attendanceData.subjects.map((sub) => {
              const needed = calculateClassesNeeded(sub.attended, sub.total, targetPercent);
              return (
                <div key={sub.id} className="p-3 bg-purple-50/50 rounded-xl border border-purple-100 flex items-center justify-between text-xs">
                  <div>
                    <p className="font-bold text-gray-900">{sub.subjectName}</p>
                    <p className="text-gray-500 text-[10px]">Current: {sub.percentage}% ({sub.attended}/{sub.total})</p>
                  </div>
                  <div className="text-right">
                    {needed === 0 ? (
                      <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        Target Met ✓
                      </span>
                    ) : (
                      <span className="text-amber-800 font-bold bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                        Attend Next {needed} Classes
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tab Content: History */}
      {activeTab === 'history' && (
        <div className="bg-white p-4 rounded-2xl border border-gray-200/80 shadow-2xs space-y-2">
          <h3 className="text-sm font-bold text-gray-900 mb-2">Recent Attendance Log</h3>
          {attendanceData.history.map((log, index) => (
            <div key={index} className="flex items-center justify-between p-2.5 bg-gray-50 rounded-xl border border-gray-100 text-xs">
              <div>
                <p className="font-bold text-gray-800">{log.subject}</p>
                <p className="text-[10px] text-gray-500">{log.date} • {log.period}</p>
              </div>
              <span
                className={`font-black px-2 py-0.5 rounded text-[10px] ${
                  log.status === 'Present'
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-rose-100 text-rose-800'
                }`}
              >
                {log.status}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Tab Content: Apply Leave */}
      {activeTab === 'leave' && (
        <div className="bg-white p-4 rounded-2xl border border-gray-200/80 shadow-2xs">
          {leaveSubmitted ? (
            <div className="text-center py-6 space-y-2">
              <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
              <h3 className="text-base font-bold text-gray-900">Leave Application Submitted</h3>
              <p className="text-xs text-gray-600">
                Your leave application has been routed to Head of Department (Dr. A.K. Sharma) for approval.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmitLeave} className="space-y-3">
              <h3 className="text-sm font-bold text-gray-900">Official Student Leave Form</h3>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Reason for Leave</label>
                <textarea
                  value={leaveReason}
                  onChange={(e) => setLeaveReason(e.target.value)}
                  placeholder="E.g., Medical emergency / Family function / Gate exam preparation..."
                  required
                  rows={3}
                  className="w-full text-xs p-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-600"
                ></textarea>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">From Date</label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    required
                    className="w-full text-xs p-2 rounded-xl border border-gray-300"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">To Date</label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    required
                    className="w-full text-xs p-2 rounded-xl border border-gray-300"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-purple-900 hover:bg-purple-950 text-white font-bold text-xs rounded-xl shadow-xs transition-colors"
              >
                Submit Leave Application →
              </button>
            </form>
          )}
        </div>
      )}
    </div>
  );
};
