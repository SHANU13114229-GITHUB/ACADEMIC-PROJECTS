import React, { useState } from 'react';
import { DiaryNote } from '../../types';
import {
  ArrowLeft,
  Plus,
  CheckCircle2,
  Clock,
  Trash2,
  BookOpen,
  AlertCircle,
  Tag,
  Calendar,
  Filter,
  Sparkles
} from 'lucide-react';

interface CloudDiaryViewProps {
  diaryNotes: DiaryNote[];
  onAddDiaryNote: (note: Omit<DiaryNote, 'id' | 'createdAt'>) => void;
  onToggleComplete: (id: string) => void;
  onDeleteNote: (id: string) => void;
  onBack: () => void;
}

export const CloudDiaryView: React.FC<CloudDiaryViewProps> = ({
  diaryNotes,
  onAddDiaryNote,
  onToggleComplete,
  onDeleteNote,
  onBack
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [showAddModal, setShowAddModal] = useState<boolean>(false);

  // New Note Form State
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<DiaryNote['category']>('Homework');
  const [subject, setSubject] = useState('');
  const [content, setContent] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState<DiaryNote['priority']>('Medium');

  const categories = ['All', 'Homework', 'Class Note', 'Teacher Remark', 'Reminder', 'Personal'];

  const filteredNotes = diaryNotes.filter((note) => {
    if (selectedCategory === 'All') return true;
    return note.category === selectedCategory;
  });

  const handleCreateNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    onAddDiaryNote({
      title,
      category,
      subject: subject || undefined,
      content,
      dueDate: dueDate || undefined,
      isCompleted: false,
      priority
    });

    // Reset Form
    setTitle('');
    setContent('');
    setSubject('');
    setDueDate('');
    setPriority('Medium');
    setShowAddModal(false);
  };

  return (
    <div className="pb-20 p-4 space-y-4">
      {/* Top Title Bar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <button
            onClick={onBack}
            className="p-2 text-[#2D2926] hover:bg-[#F2F0ED] rounded-full transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h2 className="text-xl font-serif font-bold text-[#2D2926] tracking-tight flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-[#435585]" />
              <span>Student Cloud Diary</span>
            </h2>
          </div>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="bg-[#2D2926] hover:bg-[#435585] text-white font-bold text-xs px-3.5 py-2 rounded-xl shadow-xs flex items-center gap-1.5 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>New Entry</span>
        </button>
      </div>

      {/* Cloud Sync Status Info Banner */}
      <div className="bg-[#435585] text-white p-3.5 rounded-2xl shadow-xs border border-[#E8E4E1] flex items-center justify-between text-xs">
        <div className="flex items-center space-x-2.5">
          <div className="w-8 h-8 rounded-xl bg-[#FCFAF7] text-[#435585] font-bold flex items-center justify-center shrink-0">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <p className="font-bold text-white">Cloud Diary Active</p>
            <p className="text-[10px] text-[#FCFAF7]/80">
              {diaryNotes.filter((n) => !n.isCompleted).length} Pending Homework & Class Memos
            </p>
          </div>
        </div>
        <span className="text-[10px] bg-white/10 text-[#FCFAF7] font-bold px-2 py-1 rounded-full border border-white/20">
          ● Auto-Synced
        </span>
      </div>

      {/* Category Pills Filter */}
      <div className="flex overflow-x-auto space-x-2 py-1 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all border shrink-0 ${
              selectedCategory === cat
                ? 'bg-[#435585] text-white border-[#435585] shadow-xs'
                : 'bg-white text-[#2D2926] border-[#E8E4E1] hover:bg-[#F2F0ED]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Notes List */}
      <div className="space-y-3">
        {filteredNotes.length === 0 ? (
          <div className="text-center py-10 bg-white rounded-2xl border border-dashed border-[#E8E4E1] p-6">
            <BookOpen className="w-10 h-10 text-[#8C8885] mx-auto mb-2" />
            <h3 className="text-sm font-serif font-bold text-[#2D2926]">No diary entries found</h3>
            <p className="text-xs text-[#8C8885] mt-1">Tap "+ New Entry" to record homework, teacher remarks or class notes.</p>
          </div>
        ) : (
          filteredNotes.map((note) => (
            <div
              key={note.id}
              className={`bg-white p-4 rounded-2xl border transition-all shadow-2xs space-y-2 ${
                note.isCompleted
                  ? 'border-[#E8E4E1] opacity-75 bg-[#F2F0ED]/50'
                  : note.priority === 'High'
                  ? 'border-amber-300 bg-amber-50/30'
                  : 'border-[#E8E4E1] hover:border-[#435585]'
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-start space-x-2.5">
                  <button
                    onClick={() => onToggleComplete(note.id)}
                    className={`mt-0.5 w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 transition-colors ${
                      note.isCompleted
                        ? 'bg-[#435585] border-[#435585] text-white'
                        : 'border-[#8C8885] hover:border-[#435585]'
                    }`}
                  >
                    {note.isCompleted && <CheckCircle2 className="w-4 h-4" />}
                  </button>

                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="text-[9px] font-extrabold uppercase px-1.5 py-0.2 rounded bg-[#EDF1F7] text-[#435585]">
                        {note.category}
                      </span>
                      {note.priority === 'High' && (
                        <span className="text-[9px] font-extrabold uppercase px-1.5 py-0.2 rounded bg-amber-100 text-amber-900">
                          HIGH PRIORITY
                        </span>
                      )}
                    </div>

                    <h3
                      className={`text-sm font-bold mt-1 leading-snug ${
                        note.isCompleted ? 'line-through text-[#8C8885]' : 'text-[#2D2926]'
                      }`}
                    >
                      {note.title}
                    </h3>

                    {note.subject && (
                      <p className="text-[11px] font-semibold text-[#435585] mt-0.5">
                        Subject: {note.subject}
                      </p>
                    )}
                  </div>
                </div>

                <button
                  onClick={() => onDeleteNote(note.id)}
                  className="text-[#8C8885] hover:text-rose-600 p-1 rounded transition-colors"
                  title="Delete Entry"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <p className="text-xs text-[#4A4643] leading-relaxed pl-7">{note.content}</p>

              <div className="flex items-center justify-between pl-7 pt-2 border-t border-[#E8E4E1] text-[10px] text-[#8C8885]">
                <span>Created: {note.createdAt}</span>

                {note.dueDate && (
                  <span className="font-bold text-amber-900 bg-amber-50 px-2 py-0.5 rounded-lg border border-amber-200 flex items-center gap-1">
                    <Clock className="w-3 h-3 text-amber-700" /> Due: {note.dueDate}
                  </span>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add New Entry Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-[#FCFAF7] w-full max-w-md rounded-2xl p-5 shadow-xl border border-[#E8E4E1] space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-[#E8E4E1] pb-2">
              <h3 className="text-base font-serif font-bold text-[#2D2926]">Add Student Diary Entry</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-[#8C8885] hover:text-[#2D2926] font-bold text-sm"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateNote} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-[#2D2926] mb-1">Title / Task Name *</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="E.g., Complete Software Engineering Assignment 3"
                  required
                  className="w-full p-2.5 bg-white rounded-xl border border-[#E8E4E1] focus:outline-none focus:ring-2 focus:ring-[#435585]"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-[#2D2926] mb-1">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as DiaryNote['category'])}
                    className="w-full p-2.5 bg-white rounded-xl border border-[#E8E4E1]"
                  >
                    <option value="Homework">Homework</option>
                    <option value="Class Note">Class Note</option>
                    <option value="Teacher Remark">Teacher Remark</option>
                    <option value="Reminder">Reminder</option>
                    <option value="Personal">Personal</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-[#2D2926] mb-1">Priority</label>
                  <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value as DiaryNote['priority'])}
                    className="w-full p-2.5 bg-white rounded-xl border border-[#E8E4E1]"
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-[#2D2926] mb-1">Subject (Optional)</label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="E.g., KCS-601 Software Engineering"
                  className="w-full p-2.5 bg-white rounded-xl border border-[#E8E4E1]"
                />
              </div>

              <div>
                <label className="block font-bold text-[#2D2926] mb-1">Details & Description *</label>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Write assignment details, teacher remarks, or memo details here..."
                  required
                  rows={3}
                  className="w-full p-2.5 bg-white rounded-xl border border-[#E8E4E1]"
                ></textarea>
              </div>

              <div>
                <label className="block font-bold text-[#2D2926] mb-1">Due Date (Optional)</label>
                <input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="w-full p-2.5 bg-white rounded-xl border border-[#E8E4E1]"
                />
              </div>

              <div className="flex space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 py-2.5 bg-[#F2F0ED] hover:bg-[#E8E4E1] text-[#2D2926] font-bold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-[#435585] hover:bg-[#354368] text-white font-bold rounded-xl shadow-xs"
                >
                  Save to Diary
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
