import React, { useState, useEffect } from 'react';
import {
  initialStudentProfile,
  initialAttendanceData,
  sampleDiaryNotes,
  sampleNotices,
  sampleMessages,
  sampleResults
} from './mockData';
import {
  StudentProfile,
  AttendanceData,
  DiaryNote,
  CollegeNotice,
  ChatMessage,
  AuthSession
} from './types';
import {
  getStoredSession,
  clearSession,
  updateUserAccountProfile
} from './utils/auth';
import { Header } from './components/Header';
import { BottomNav, BottomNavTab } from './components/BottomNav';
import { AcademicViewTab } from './components/AcademicGrid';

// Views
import { AuthView } from './components/views/AuthView';
import { HomeView } from './components/views/HomeView';
import { DashboardView } from './components/views/DashboardView';
import { AttendanceView } from './components/views/AttendanceView';
import { ScheduleView } from './components/views/ScheduleView';
import { ExamTimeTableView } from './components/views/ExamTimeTableView';
import { HallTicketView } from './components/views/HallTicketView';
import { ResultView } from './components/views/ResultView';
import { CloudDiaryView } from './components/views/CloudDiaryView';
import { MessageView } from './components/views/MessageView';
import { IdCardView } from './components/views/IdCardView';
import { NoticeView } from './components/views/NoticeView';
import { ProfileView } from './components/views/ProfileView';
import { FeeView } from './components/views/FeeView';

export default function App() {
  // Authentication session state (checked on launch)
  const [authSession, setAuthSession] = useState<AuthSession | null>(() => getStoredSession());

  // Student Profile State
  const [student, setStudent] = useState<StudentProfile>(() => {
    const session = getStoredSession();
    if (session?.user?.profile) {
      return session.user.profile;
    }
    const saved = localStorage.getItem('sheat_student_profile');
    return saved ? JSON.parse(saved) : initialStudentProfile;
  });

  const [attendanceData, setAttendanceData] = useState<AttendanceData>(() => {
    const saved = localStorage.getItem('sheat_attendance_data');
    return saved ? JSON.parse(saved) : initialAttendanceData;
  });

  const [diaryNotes, setDiaryNotes] = useState<DiaryNote[]>(() => {
    const saved = localStorage.getItem('sheat_diary_notes');
    return saved ? JSON.parse(saved) : sampleDiaryNotes;
  });

  const [selectedSession, setSelectedSession] = useState<string>('2026-2027');

  // Navigation State
  const [activeBottomTab, setActiveBottomTab] = useState<BottomNavTab>('home');
  const [activeAcademicView, setActiveAcademicView] = useState<AcademicViewTab | null>(null);

  // Notice & Message State
  const [notices] = useState<CollegeNotice[]>(sampleNotices);
  const [selectedNotice, setSelectedNotice] = useState<CollegeNotice | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>(sampleMessages);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('sheat_student_profile', JSON.stringify(student));
  }, [student]);

  useEffect(() => {
    localStorage.setItem('sheat_attendance_data', JSON.stringify(attendanceData));
  }, [attendanceData]);

  useEffect(() => {
    localStorage.setItem('sheat_diary_notes', JSON.stringify(diaryNotes));
  }, [diaryNotes]);

  // Auth Handlers
  const handleLoginSuccess = (session: AuthSession) => {
    setAuthSession(session);
    setStudent(session.user.profile);
    setActiveBottomTab('home');
    setActiveAcademicView(null);
  };

  const handleLogout = () => {
    clearSession();
    setAuthSession(null);
    setActiveBottomTab('home');
    setActiveAcademicView(null);
  };

  const handleUpdateProfile = (updated: StudentProfile) => {
    setStudent(updated);
    if (authSession?.user?.id) {
      updateUserAccountProfile(authSession.user.id, updated);
      setAuthSession((prev) => (prev ? { ...prev, user: { ...prev.user, profile: updated } } : null));
    }
  };

  // Handlers
  const handleSelectBottomTab = (tab: BottomNavTab) => {
    setActiveBottomTab(tab);
    setActiveAcademicView(null);
    setSelectedNotice(null);
  };

  const handleSelectAcademicTab = (tab: AcademicViewTab) => {
    setActiveAcademicView(tab);
  };

  const handleAddDiaryNote = (newNoteData: Omit<DiaryNote, 'id' | 'createdAt'>) => {
    const newNote: DiaryNote = {
      ...newNoteData,
      id: `diary_${Date.now()}`,
      createdAt: 'Today'
    };
    setDiaryNotes([newNote, ...diaryNotes]);
  };

  const handleToggleDiaryComplete = (id: string) => {
    setDiaryNotes((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isCompleted: !n.isCompleted } : n))
    );
  };

  const handleDeleteDiaryNote = (id: string) => {
    setDiaryNotes((prev) => prev.filter((n) => n.id !== id));
  };

  const handleSendMessage = (text: string) => {
    const userMsg: ChatMessage = {
      id: `msg_${Date.now()}`,
      senderName: student.name,
      senderRole: 'Student',
      senderAvatar: student.avatarUrl,
      message: text,
      timestamp: 'Just now',
      isMe: true,
      read: true
    };

    setMessages((prev) => [...prev, userMsg]);

    // Simulated Auto response from Faculty / HOD
    setTimeout(() => {
      const autoReply: ChatMessage = {
        id: `msg_reply_${Date.now()}`,
        senderName: 'Dr. A.K. Sharma (HOD CSE)',
        senderRole: 'Head of Department',
        senderAvatar: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=200',
        message: `Thank you for your message, ${student.name.split(' ')[0]}. Your query has been logged into the Student Diary system and verified.`,
        timestamp: 'Just now',
        isMe: false,
        read: false
      };
      setMessages((prev) => [...prev, autoReply]);
    }, 1200);
  };

  // If no active authenticated session, show Login / Register screen on opening
  if (!authSession) {
    return <AuthView onLoginSuccess={handleLoginSuccess} />;
  }

  const unreadMessageCount = messages.filter((m) => !m.isMe && !m.read).length;
  const unreadNoticeCount = notices.filter((n) => n.isImportant).length;

  return (
    <div className="min-h-screen bg-[#F2F0ED] text-[#2D2926] font-sans flex flex-col justify-between items-center selection:bg-[#435585]/20">
      {/* Mobile viewport simulator container */}
      <div className="w-full max-w-md bg-[#FCFAF7] min-h-screen shadow-xl relative border-x border-[#E8E4E1] overflow-hidden flex flex-col">
        
        {/* Sticky App Header */}
        <Header
          student={student}
          selectedSession={selectedSession}
          onSessionChange={setSelectedSession}
          onProfileClick={() => handleSelectBottomTab('profile')}
          unreadNoticeCount={unreadNoticeCount}
          onNoticeClick={() => handleSelectBottomTab('notice')}
        />

        {/* Main View Area */}
        <main className="flex-1 overflow-y-auto">
          {/* Sub Academic Views (When user taps an item in Academic Grid or shortcuts) */}
          {activeAcademicView === 'dashboard' && (
            <DashboardView
              student={student}
              attendanceData={attendanceData}
              results={sampleResults}
              diaryNotes={diaryNotes}
              onBack={() => setActiveAcademicView(null)}
              onNavigateTab={(tab) => handleSelectAcademicTab(tab as AcademicViewTab)}
            />
          )}

          {activeAcademicView === 'attendance' && (
            <AttendanceView
              attendanceData={attendanceData}
              onUpdateAttendance={setAttendanceData}
              onBack={() => setActiveAcademicView(null)}
            />
          )}

          {activeAcademicView === 'schedule' && (
            <ScheduleView onBack={() => setActiveAcademicView(null)} />
          )}

          {activeAcademicView === 'timetable' && (
            <ExamTimeTableView
              onBack={() => setActiveAcademicView(null)}
              onOpenHallTicket={() => setActiveAcademicView('hallticket')}
            />
          )}

          {activeAcademicView === 'hallticket' && (
            <HallTicketView student={student} onBack={() => setActiveAcademicView(null)} />
          )}

          {activeAcademicView === 'result' && (
            <ResultView onBack={() => setActiveAcademicView(null)} />
          )}

          {activeAcademicView === 'diary' && (
            <CloudDiaryView
              diaryNotes={diaryNotes}
              onAddDiaryNote={handleAddDiaryNote}
              onToggleComplete={handleToggleDiaryComplete}
              onDeleteNote={handleDeleteDiaryNote}
              onBack={() => setActiveAcademicView(null)}
            />
          )}

          {activeAcademicView === 'fee' && (
            <FeeView onBack={() => setActiveAcademicView(null)} />
          )}

          {/* Primary Bottom Navigation Views */}
          {!activeAcademicView && (
            <>
              {activeBottomTab === 'home' && (
                <HomeView
                  student={student}
                  attendanceData={attendanceData}
                  diaryNotes={diaryNotes}
                  notices={notices}
                  onSelectAcademicTab={handleSelectAcademicTab}
                  onOpenNotice={(notice) => {
                    setSelectedNotice(notice);
                    setActiveBottomTab('notice');
                  }}
                  onOpenDiary={() => handleSelectAcademicTab('diary')}
                  onToggleDiaryComplete={handleToggleDiaryComplete}
                />
              )}

              {activeBottomTab === 'message' && (
                <MessageView
                  student={student}
                  messages={messages}
                  onSendMessage={handleSendMessage}
                />
              )}

              {activeBottomTab === 'idcard' && <IdCardView student={student} />}

              {activeBottomTab === 'notice' && (
                <NoticeView
                  notices={notices}
                  selectedNotice={selectedNotice}
                  onSelectNotice={setSelectedNotice}
                />
              )}

              {activeBottomTab === 'profile' && (
                <ProfileView
                  student={student}
                  currentUser={authSession.user}
                  onUpdateProfile={handleUpdateProfile}
                  onLogout={handleLogout}
                />
              )}
            </>
          )}
        </main>

        {/* Fixed Bottom Navigation Bar */}
        <BottomNav
          activeTab={activeBottomTab}
          onSelectTab={handleSelectBottomTab}
          unreadMessageCount={unreadMessageCount}
          unreadNoticeCount={unreadNoticeCount}
        />
      </div>
    </div>
  );
}
