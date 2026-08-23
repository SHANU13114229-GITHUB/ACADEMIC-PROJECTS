import React from 'react';
import { StudentProfile } from '../types';
import { Bell, GraduationCap, ChevronDown } from 'lucide-react';

interface HeaderProps {
  student: StudentProfile;
  selectedSession: string;
  onSessionChange: (session: string) => void;
  onProfileClick: () => void;
  unreadNoticeCount: number;
  onNoticeClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  student,
  selectedSession,
  onSessionChange,
  onProfileClick,
  unreadNoticeCount,
  onNoticeClick
}) => {
  // Determine greeting based on local hour
  const hour = new Date().getHours();
  let greeting = 'Good Morning';
  if (hour >= 12 && hour < 17) {
    greeting = 'Good Afternoon';
  } else if (hour >= 17) {
    greeting = 'Good Evening';
  }

  return (
    <header className="bg-[#FCFAF7] text-[#2D2926] border-b border-[#E8E4E1] sticky top-0 z-30">
      {/* Top Profile and College Emblem Bar */}
      <div className="px-4 py-3 flex items-center justify-between">
        {/* Left: Avatar & Greeting */}
        <div className="flex items-center space-x-3 cursor-pointer group" onClick={onProfileClick}>
          <div className="relative">
            <img
              src={student.avatarUrl}
              alt={student.name}
              className="w-11 h-11 rounded-full object-cover border border-[#E8E4E1] shadow-2xs group-hover:border-[#435585] transition-colors"
            />
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full"></div>
          </div>
          <div>
            <p className="text-xs font-serif italic text-[#435585] leading-tight">{greeting}</p>
            <h1 className="text-sm font-bold text-[#2D2926] uppercase tracking-tight leading-snug">
              {student.name}
            </h1>
          </div>
        </div>

        {/* Right: College Seal & Notification */}
        <div className="flex items-center space-x-2">
          <button
            onClick={onNoticeClick}
            className="p-2 text-[#8C8885] hover:text-[#435585] hover:bg-[#F2F0ED] rounded-full transition-colors relative"
            title="Notifications & Notices"
          >
            <Bell className="w-5 h-5" />
            {unreadNoticeCount > 0 && (
              <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-amber-600 rounded-full animate-pulse"></span>
            )}
          </button>

          {/* SHEAT Group Emblem Logo */}
          <div className="flex items-center bg-[#F2F0ED] p-1.5 rounded-xl border border-[#E8E4E1]">
            <div className="w-8 h-8 rounded-full bg-[#435585] text-white flex items-center justify-center font-bold text-xs shadow-2xs overflow-hidden">
              <span className="text-[10px] text-center font-extrabold leading-none text-[#FCFAF7]">S</span>
            </div>
            <div className="ml-1.5 hidden xs:block">
              <span className="text-[9px] font-bold block text-[#435585] leading-none">SHEAT</span>
              <span className="text-[8px] text-[#8C8885] block leading-none font-medium">VARANASI</span>
            </div>
          </div>
        </div>
      </div>

      {/* Institution Name & Academic Session Bar */}
      <div className="bg-[#435585] text-[#FCFAF7] py-2 px-4 text-center border-t border-[#E8E4E1]/20">
        <h2 className="text-xs font-bold tracking-widest uppercase">
          {student.institution}
        </h2>
        <div className="flex items-center justify-center mt-0.5 space-x-1.5">
          <GraduationCap className="w-3.5 h-3.5 text-[#F2F0ED]" />
          <div className="relative inline-block">
            <select
              value={selectedSession}
              onChange={(e) => onSessionChange(e.target.value)}
              className="bg-white/10 text-[#FCFAF7] text-xs font-semibold px-2 py-0.5 rounded-lg border border-white/20 appearance-none pr-5 cursor-pointer focus:outline-none focus:ring-1 focus:ring-white"
            >
              <option value="2026-2027" className="text-[#2D2926]">2026-2027</option>
              <option value="2025-2026" className="text-[#2D2926]">2025-2026</option>
              <option value="2024-2025" className="text-[#2D2926]">2024-2025</option>
            </select>
            <ChevronDown className="w-3 h-3 text-[#FCFAF7] absolute right-1.5 top-1.5 pointer-events-none" />
          </div>
        </div>
      </div>
    </header>
  );
};
