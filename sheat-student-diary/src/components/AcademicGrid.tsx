import React from 'react';
import {
  BarChart3,
  UserCheck,
  Calendar,
  CalendarClock,
  IdCard,
  Trophy,
  BookOpenCheck,
  CreditCard,
  FileText
} from 'lucide-react';

export type AcademicViewTab =
  | 'dashboard'
  | 'attendance'
  | 'schedule'
  | 'timetable'
  | 'hallticket'
  | 'result'
  | 'diary'
  | 'fee'
  | 'syllabus';

interface AcademicGridProps {
  onSelectTab: (tab: AcademicViewTab) => void;
  pendingDiaryCount: number;
}

export const AcademicGrid: React.FC<AcademicGridProps> = ({ onSelectTab, pendingDiaryCount }) => {
  const academicItems = [
    {
      id: 'dashboard' as AcademicViewTab,
      label: 'Dashboard',
      icon: BarChart3,
      bgColor: 'bg-[#EDF1F7]',
      iconColor: 'text-[#435585]',
      badge: null
    },
    {
      id: 'attendance' as AcademicViewTab,
      label: 'Attendance',
      icon: UserCheck,
      bgColor: 'bg-[#F2F0ED]',
      iconColor: 'text-[#2D2926]',
      badge: null
    },
    {
      id: 'schedule' as AcademicViewTab,
      label: 'Class Schedule',
      icon: Calendar,
      bgColor: 'bg-[#EDF1F7]',
      iconColor: 'text-[#435585]',
      badge: null
    },
    {
      id: 'timetable' as AcademicViewTab,
      label: 'Exam Time Table',
      icon: CalendarClock,
      bgColor: 'bg-[#F2F0ED]',
      iconColor: 'text-[#2D2926]',
      badge: null
    },
    {
      id: 'hallticket' as AcademicViewTab,
      label: 'Exam Hall Ticket',
      icon: IdCard,
      bgColor: 'bg-[#EDF1F7]',
      iconColor: 'text-[#435585]',
      badge: 'NEW'
    },
    {
      id: 'result' as AcademicViewTab,
      label: 'Result',
      icon: Trophy,
      bgColor: 'bg-[#F2F0ED]',
      iconColor: 'text-[#2D2926]',
      badge: null
    }
  ];

  const cloudDiaryShortcut = {
    id: 'diary' as AcademicViewTab,
    label: 'Student Cloud Diary',
    subLabel: 'Homework, Notes & Reminders',
    icon: BookOpenCheck,
    bgColor: 'bg-[#F2F0ED]',
    iconColor: 'text-[#435585]'
  };

  const feeShortcut = {
    id: 'fee' as AcademicViewTab,
    label: 'Fee Receipts',
    subLabel: 'Tuition & Dues',
    icon: CreditCard,
    bgColor: 'bg-[#EDF1F7]',
    iconColor: 'text-[#435585]'
  };

  return (
    <section className="px-4 py-2 my-2">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-serif font-bold text-[#2D2926] tracking-tight">Academic</h2>
        <span className="text-xs text-[#8C8885] font-medium">B.Tech VI Sem</span>
      </div>

      {/* 3 x 2 Grid Matching Screenshot */}
      <div className="grid grid-cols-3 gap-y-5 gap-x-3 bg-white p-4 rounded-2xl border border-[#E8E4E1] shadow-2xs">
        {academicItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => onSelectTab(item.id)}
              className="flex flex-col items-center group focus:outline-none"
            >
              <div className="relative">
                <div
                  className={`w-14 h-14 rounded-2xl ${item.bgColor} border border-[#E8E4E1]/50 flex items-center justify-center transition-all duration-200 group-hover:scale-105 group-hover:shadow-xs group-active:scale-95`}
                >
                  <Icon className={`w-6 h-6 ${item.iconColor}`} />
                </div>
                {item.badge && (
                  <span className="absolute -top-1 -right-1 bg-[#435585] text-white text-[8px] font-extrabold px-1.5 py-0.5 rounded-full uppercase tracking-tighter">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className="mt-2 text-xs font-semibold text-[#4A4643] text-center leading-snug group-hover:text-[#435585] transition-colors">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Featured Cloud Diary Bar */}
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
        <button
          onClick={() => onSelectTab(cloudDiaryShortcut.id)}
          className="bg-[#435585] text-[#FCFAF7] p-3.5 rounded-2xl border border-[#E8E4E1] shadow-2xs flex items-center justify-between hover:bg-[#354368] transition-all group text-left"
        >
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-[#FCFAF7] text-[#435585] flex items-center justify-center shadow-2xs">
              <BookOpenCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="text-sm font-bold text-[#FCFAF7] group-hover:text-white transition-colors">
                  Student Cloud Diary
                </h3>
                {pendingDiaryCount > 0 && (
                  <span className="bg-[#2D2926] text-white font-bold text-[10px] px-2 py-0.2 rounded-full">
                    {pendingDiaryCount} Due
                  </span>
                )}
              </div>
              <p className="text-[11px] text-[#FCFAF7]/80">Daily Homework, Notes & Remarks</p>
            </div>
          </div>
          <span className="text-xs font-semibold text-[#FCFAF7] underline group-hover:translate-x-0.5 transition-transform">
            Open →
          </span>
        </button>

        <button
          onClick={() => onSelectTab(feeShortcut.id)}
          className="bg-white p-3.5 rounded-2xl border border-[#E8E4E1] shadow-2xs flex items-center justify-between hover:border-[#435585] transition-all group text-left"
        >
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-[#EDF1F7] text-[#435585] flex items-center justify-center border border-[#E8E4E1]">
              <CreditCard className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#2D2926] group-hover:text-[#435585] transition-colors">
                Fee Details & Receipts
              </h3>
              <p className="text-[11px] text-[#8C8885]">Paid: ₹50,000 | Pending: ₹12,000</p>
            </div>
          </div>
          <span className="text-xs font-semibold text-[#435585] group-hover:translate-x-0.5 transition-transform">
            View →
          </span>
        </button>
      </div>
    </section>
  );
};
