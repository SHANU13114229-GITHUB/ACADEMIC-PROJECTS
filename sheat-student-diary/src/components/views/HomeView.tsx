import React from 'react';
import { StudentProfile, AttendanceData, DiaryNote, CollegeNotice } from '../../types';
import { BannerCarousel } from '../BannerCarousel';
import { AttendanceSummary } from '../AttendanceSummary';
import { AcademicGrid, AcademicViewTab } from '../AcademicGrid';
import { Megaphone, Calendar, ArrowRight, CheckCircle2, Clock, Plus } from 'lucide-react';

interface HomeViewProps {
  student: StudentProfile;
  attendanceData: AttendanceData;
  diaryNotes: DiaryNote[];
  notices: CollegeNotice[];
  onSelectAcademicTab: (tab: AcademicViewTab) => void;
  onOpenNotice: (notice: CollegeNotice) => void;
  onOpenDiary: () => void;
  onToggleDiaryComplete: (id: string) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  student,
  attendanceData,
  diaryNotes,
  notices,
  onSelectAcademicTab,
  onOpenNotice,
  onOpenDiary,
  onToggleDiaryComplete
}) => {
  const pendingNotes = diaryNotes.filter((n) => !n.isCompleted);
  const urgentNotice = notices.find((n) => n.isImportant) || notices[0];

  return (
    <div className="pb-20 pt-1">
      {/* Hero Admission Banners Carousel */}
      <BannerCarousel />

      {/* Attendance Circular Progress Gauges (Theory, Practical, Overall) */}
      <AttendanceSummary
        attendanceData={attendanceData}
        onViewDetails={() => onSelectAcademicTab('attendance')}
      />

      {/* Academic Grid (Dashboard, Attendance, Class Schedule, Exam Time Table, Exam Hall Ticket, Result) */}
      <AcademicGrid
        onSelectTab={onSelectAcademicTab}
        pendingDiaryCount={pendingNotes.length}
      />

      {/* Notice Board Ticker Bar */}
      {urgentNotice && (
        <div className="mx-4 my-2">
          <div
            onClick={() => onOpenNotice(urgentNotice)}
            className="bg-[#EDF1F7] border border-[#E8E4E1] p-3 rounded-2xl flex items-center justify-between cursor-pointer hover:border-[#435585] transition-all shadow-2xs group"
          >
            <div className="flex items-center space-x-3 overflow-hidden">
              <div className="w-8 h-8 rounded-xl bg-[#435585] text-white flex items-center justify-center shrink-0 shadow-2xs">
                <Megaphone className="w-4 h-4" />
              </div>
              <div className="truncate">
                <div className="flex items-center space-x-2">
                  <span className="text-[9px] bg-[#2D2926] text-white font-bold px-1.5 py-0.2 rounded uppercase">
                    NOTICE
                  </span>
                  <span className="text-[10px] text-[#8C8885] font-semibold">{urgentNotice.date}</span>
                </div>
                <p className="text-xs font-bold text-[#2D2926] truncate mt-0.5 group-hover:text-[#435585] transition-colors">
                  {urgentNotice.title}
                </p>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-[#435585] shrink-0 ml-2 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      )}

      {/* Quick Student Cloud Diary Widget */}
      <div className="mx-4 my-3 bg-white p-4 rounded-2xl border border-[#E8E4E1] shadow-2xs">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 rounded-full bg-[#435585]"></div>
            <h3 className="text-sm font-serif font-bold text-[#2D2926]">Today's Diary Tasks & Homework</h3>
          </div>
          <button
            onClick={onOpenDiary}
            className="text-xs font-bold text-[#435585] hover:text-[#2D2926] flex items-center gap-1 bg-[#F2F0ED] px-2.5 py-1 rounded-xl border border-[#E8E4E1]"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Note</span>
          </button>
        </div>

        {pendingNotes.length === 0 ? (
          <div className="text-center py-4 bg-[#F2F0ED]/50 rounded-xl border border-dashed border-[#E8E4E1]">
            <CheckCircle2 className="w-6 h-6 text-[#435585] mx-auto mb-1" />
            <p className="text-xs font-semibold text-[#2D2926]">All caught up!</p>
            <p className="text-[11px] text-[#8C8885]">No pending homework or reminders for today.</p>
          </div>
        ) : (
          <div className="space-y-2">
            {pendingNotes.slice(0, 3).map((note) => (
              <div
                key={note.id}
                className="p-2.5 bg-[#FCFAF7] hover:bg-[#F2F0ED] rounded-xl border border-[#E8E4E1] transition-all flex items-start justify-between"
              >
                <div className="flex items-start space-x-2.5">
                  <button
                    onClick={() => onToggleDiaryComplete(note.id)}
                    className="mt-0.5 w-4 h-4 rounded border-2 border-[#435585] hover:border-[#2D2926] flex items-center justify-center shrink-0"
                  >
                    {note.isCompleted && <CheckCircle2 className="w-4 h-4 text-[#435585]" />}
                  </button>
                  <div>
                    <span className="text-[9px] font-extrabold uppercase px-1.5 py-0.2 rounded bg-[#EDF1F7] text-[#435585]">
                      {note.category}
                    </span>
                    <h4 className="text-xs font-bold text-[#2D2926] mt-0.5 leading-snug">
                      {note.title}
                    </h4>
                    {note.subject && (
                      <p className="text-[10px] text-[#8C8885] font-medium">{note.subject}</p>
                    )}
                  </div>
                </div>

                {note.dueDate && (
                  <div className="flex items-center space-x-1 text-[10px] text-amber-800 font-bold bg-amber-50 px-1.5 py-0.5 rounded-lg border border-amber-200 shrink-0">
                    <Clock className="w-3 h-3" />
                    <span>{note.dueDate.split('-').slice(1).join('/')}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        <div className="mt-3 text-center border-t border-[#E8E4E1] pt-2">
          <button
            onClick={onOpenDiary}
            className="text-xs font-semibold text-[#435585] hover:underline"
          >
            View All {diaryNotes.length} Student Diary Notes →
          </button>
        </div>
      </div>

      {/* College Quick Info Footer */}
      <div className="mx-4 my-4 p-3.5 bg-[#F2F0ED] rounded-2xl border border-[#E8E4E1] text-center text-[10px] text-[#8C8885] space-y-0.5">
        <p className="font-bold text-[#2D2926]">SHEAT GROUP OF INSTITUTIONS VARANASI</p>
        <p>Babatpur Airport Road, Varanasi (U.P.) | Helpdesk: +91 7753811344</p>
        <p className="text-[#435585] font-bold">Academic Session 2026-2027 • B.Tech CSE Data Science</p>
      </div>
    </div>
  );
};
