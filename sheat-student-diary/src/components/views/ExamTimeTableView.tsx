import React from 'react';
import { sampleExams } from '../../mockData';
import { ArrowLeft, Calendar, Clock, MapPin, Download, BookOpen, AlertCircle } from 'lucide-react';

interface ExamTimeTableViewProps {
  onBack: () => void;
  onOpenHallTicket: () => void;
}

export const ExamTimeTableView: React.FC<ExamTimeTableViewProps> = ({
  onBack,
  onOpenHallTicket
}) => {
  return (
    <div className="pb-20 p-4 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <button
            onClick={onBack}
            className="p-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h2 className="text-xl font-black text-gray-900 tracking-tight">Exam Time Table</h2>
        </div>
        <span className="text-xs font-bold bg-amber-100 text-amber-800 px-2.5 py-1 rounded-full">
          Even Sem 2026-27
        </span>
      </div>

      {/* Banner */}
      <div className="bg-gradient-to-r from-purple-900 via-indigo-900 to-purple-900 text-white p-4 rounded-2xl shadow-xs border border-purple-700/50 flex items-center justify-between">
        <div>
          <p className="text-[10px] text-amber-300 font-bold uppercase tracking-wider">OFFICIAL DATESHEET</p>
          <h3 className="text-base font-extrabold text-white mt-0.5">End Semester Examinations 2026</h3>
          <p className="text-xs text-purple-200 mt-1">SHEAT College of Engineering & Management</p>
        </div>
        <button
          onClick={onOpenHallTicket}
          className="bg-amber-400 hover:bg-amber-300 text-purple-950 font-bold text-xs px-3 py-2 rounded-xl shadow-xs shrink-0 transition-colors"
        >
          Hall Ticket →
        </button>
      </div>

      {/* Notice Banner */}
      <div className="bg-amber-50 border border-amber-200 text-amber-900 text-xs p-3 rounded-xl flex items-start space-x-2">
        <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
        <p>
          <span className="font-bold">Instructions:</span> Carry your official Student ID Card and Printed Hall Ticket to the examination hall. Mobile phones and smartwatches are strictly prohibited.
        </p>
      </div>

      {/* Date Sheet List */}
      <div className="space-y-3">
        {sampleExams.map((exam, idx) => (
          <div
            key={exam.id}
            className="bg-white p-4 rounded-2xl border border-gray-200/80 shadow-2xs space-y-2 hover:border-purple-300 transition-all"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="w-6 h-6 rounded-full bg-purple-100 text-purple-900 text-xs font-extrabold flex items-center justify-center">
                  #{idx + 1}
                </span>
                <span className="text-[10px] font-bold bg-purple-100 text-purple-800 px-2 py-0.5 rounded uppercase">
                  {exam.type} • {exam.subjectCode}
                </span>
              </div>
              <div className="flex items-center space-x-1 text-xs font-bold text-rose-700 bg-rose-50 px-2.5 py-0.5 rounded-lg border border-rose-200">
                <Calendar className="w-3.5 h-3.5" />
                <span>{exam.date}</span>
              </div>
            </div>

            <h3 className="text-sm font-bold text-gray-900 leading-snug">
              {exam.subjectName}
            </h3>

            <div className="grid grid-cols-2 gap-2 text-xs text-gray-600 pt-1">
              <div className="flex items-center space-x-1">
                <Clock className="w-3.5 h-3.5 text-gray-400" />
                <span>{exam.time}</span>
              </div>
              <div className="flex items-center space-x-1 font-semibold text-purple-800">
                <MapPin className="w-3.5 h-3.5 text-purple-600" />
                <span className="truncate">{exam.room}</span>
              </div>
            </div>

            <div className="bg-gray-50 p-2.5 rounded-xl border border-gray-100 text-[11px] text-gray-600 space-y-1">
              <span className="font-bold text-gray-800 flex items-center gap-1">
                <BookOpen className="w-3 h-3 text-purple-600" /> Syllabus Coverage:
              </span>
              <p>{exam.syllabus}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
