import React, { useState } from 'react';
import { DaySchedule } from '../../types';
import { sampleTimetable } from '../../mockData';
import { ArrowLeft, Clock, MapPin, User, Calendar, Sparkles } from 'lucide-react';

interface ScheduleViewProps {
  onBack: () => void;
}

export const ScheduleView: React.FC<ScheduleViewProps> = ({ onBack }) => {
  const days: DaySchedule['day'][] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  
  // Default to today's day if Mon-Sat, else Monday
  const todayName = new Date().toLocaleDateString('en-US', { weekday: 'long' }) as DaySchedule['day'];
  const initialDay = days.includes(todayName) ? todayName : 'Monday';

  const [selectedDay, setSelectedDay] = useState<DaySchedule['day']>(initialDay);

  const currentDaySchedule = sampleTimetable.find((s) => s.day === selectedDay) || sampleTimetable[0];

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
          <h2 className="text-xl font-black text-gray-900 tracking-tight">Class Schedule</h2>
        </div>
        <span className="text-xs font-bold bg-emerald-100 text-emerald-800 px-2.5 py-1 rounded-full">
          B.Tech CSE VI Sem
        </span>
      </div>

      {/* Day selector horizontal tabs */}
      <div className="flex overflow-x-auto space-x-2 py-1 scrollbar-none">
        {days.map((day) => {
          const isSelected = selectedDay === day;
          return (
            <button
              key={day}
              onClick={() => setSelectedDay(day)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all border shrink-0 ${
                isSelected
                  ? 'bg-purple-900 text-white border-purple-900 shadow-xs'
                  : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
              }`}
            >
              {day}
            </button>
          );
        })}
      </div>

      {/* Schedule Period List */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider">
            {selectedDay} Classes ({currentDaySchedule.periods.length} Periods)
          </h3>
          <span className="text-[10px] text-purple-700 font-semibold bg-purple-50 px-2 py-0.5 rounded border border-purple-200">
            Venue: SHEAT Academic Block
          </span>
        </div>

        {currentDaySchedule.periods.map((period, idx) => (
          <div
            key={idx}
            className="bg-white p-3.5 rounded-2xl border border-gray-200/80 shadow-2xs space-y-2 hover:border-purple-200 transition-all"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="w-6 h-6 rounded-full bg-purple-100 text-purple-900 text-xs font-black flex items-center justify-center shrink-0">
                  P{period.periodNo}
                </span>
                <span
                  className={`text-[9px] font-black px-2 py-0.5 rounded uppercase ${
                    period.type === 'Lab'
                      ? 'bg-fuchsia-100 text-fuchsia-800'
                      : period.type === 'Tutorial'
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-indigo-100 text-indigo-800'
                  }`}
                >
                  {period.type}
                </span>
              </div>

              <div className="flex items-center space-x-1 text-xs font-bold text-purple-900 bg-purple-50 px-2.5 py-0.5 rounded-lg border border-purple-100">
                <Clock className="w-3 h-3 text-purple-700" />
                <span>{period.time}</span>
              </div>
            </div>

            <h4 className="text-sm font-bold text-gray-900 leading-snug">
              {period.subject}
            </h4>

            <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-gray-100 text-xs text-gray-600">
              <div className="flex items-center space-x-1">
                <User className="w-3.5 h-3.5 text-gray-400" />
                <span>{period.teacher}</span>
              </div>
              <div className="flex items-center space-x-1 font-semibold text-purple-800">
                <MapPin className="w-3.5 h-3.5 text-purple-600" />
                <span>{period.room}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
