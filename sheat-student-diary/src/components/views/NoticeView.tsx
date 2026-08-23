import React, { useState } from 'react';
import { CollegeNotice } from '../../types';
import { Bell, Search, Filter, Calendar, ChevronRight, Megaphone, CheckCircle2 } from 'lucide-react';

interface NoticeViewProps {
  notices: CollegeNotice[];
  selectedNotice: CollegeNotice | null;
  onSelectNotice: (notice: CollegeNotice | null) => void;
}

export const NoticeView: React.FC<NoticeViewProps> = ({
  notices,
  selectedNotice,
  onSelectNotice
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', 'Academic', 'Examination', 'Placement', 'Events', 'Holiday'];

  const filteredNotices = notices.filter((notice) => {
    const matchesCategory = selectedCategory === 'All' || notice.category === selectedCategory;
    const matchesSearch =
      notice.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      notice.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="pb-20 p-4 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-black text-gray-900 tracking-tight flex items-center gap-2">
            <Bell className="w-5 h-5 text-purple-700" />
            <span>Notice Board</span>
          </h2>
          <p className="text-xs text-gray-500">Official Circulars & College Announcements</p>
        </div>
        <span className="text-xs font-bold bg-amber-100 text-amber-900 px-2.5 py-1 rounded-full">
          {notices.length} Active Circulars
        </span>
      </div>

      {/* Search Input */}
      <div className="relative">
        <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search notices, exams, placement drives..."
          className="w-full pl-9 pr-4 py-2.5 bg-white text-xs rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-600 shadow-2xs"
        />
      </div>

      {/* Category Pills Filter */}
      <div className="flex overflow-x-auto space-x-2 py-1 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all border shrink-0 ${
              selectedCategory === cat
                ? 'bg-purple-900 text-white border-purple-900 shadow-xs'
                : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Detail Modal / Detailed View if selected */}
      {selectedNotice ? (
        <div className="bg-white p-5 rounded-2xl border-2 border-purple-900 shadow-md space-y-3">
          <div className="flex items-center justify-between border-b pb-2">
            <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-amber-100 text-amber-900">
              {selectedNotice.category}
            </span>
            <button
              onClick={() => onSelectNotice(null)}
              className="text-xs font-bold text-purple-700 hover:underline"
            >
              ← Back to All Notices
            </button>
          </div>

          <h2 className="text-base font-black text-gray-900 leading-snug">
            {selectedNotice.title}
          </h2>

          <div className="flex items-center space-x-2 text-[11px] text-gray-500 font-semibold">
            <span>Issued by: {selectedNotice.issuer}</span>
            <span>•</span>
            <span>Date: {selectedNotice.date}</span>
          </div>

          <div className="bg-purple-50/60 p-3 rounded-xl border border-purple-100 text-xs text-gray-800 leading-relaxed space-y-2">
            <p className="font-bold text-purple-900">Summary:</p>
            <p>{selectedNotice.summary}</p>
            <p className="pt-2 border-t border-purple-200">{selectedNotice.content}</p>
          </div>

          <button
            onClick={() => onSelectNotice(null)}
            className="w-full py-2.5 bg-purple-900 hover:bg-purple-950 text-white text-xs font-bold rounded-xl"
          >
            Close Circular
          </button>
        </div>
      ) : (
        /* Notice List */
        <div className="space-y-3">
          {filteredNotices.map((notice) => (
            <div
              key={notice.id}
              onClick={() => onSelectNotice(notice)}
              className="bg-white p-4 rounded-2xl border border-gray-200/80 shadow-2xs space-y-2 hover:border-purple-300 transition-all cursor-pointer group"
            >
              <div className="flex items-center justify-between">
                <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded bg-purple-100 text-purple-900">
                  {notice.category}
                </span>
                <span className="text-[10px] font-bold text-gray-500 flex items-center gap-1">
                  <Calendar className="w-3 h-3" /> {notice.date}
                </span>
              </div>

              <h3 className="text-sm font-bold text-gray-900 group-hover:text-purple-900 transition-colors leading-snug">
                {notice.title}
              </h3>

              <p className="text-xs text-gray-600 line-clamp-2">{notice.summary}</p>

              <div className="flex items-center justify-between pt-2 border-t border-gray-100 text-[11px] text-purple-700 font-bold">
                <span>{notice.issuer}</span>
                <span className="flex items-center gap-0.5 group-hover:translate-x-1 transition-transform">
                  Read Circular →
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
