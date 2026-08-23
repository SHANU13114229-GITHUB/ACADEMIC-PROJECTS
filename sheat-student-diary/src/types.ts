export interface StudentProfile {
  name: string;
  rollNo: string;
  enrollmentNo: string;
  course: string;
  branch: string;
  year: string;
  semester: string;
  institution: string;
  academicYear: string;
  email: string;
  phone: string;
  dob: string;
  bloodGroup: string;
  fatherName: string;
  motherName: string;
  guardianPhone: string;
  address: string;
  avatarUrl: string;
  logoUrl: string;
}

export interface SubjectAttendance {
  id: string;
  subjectCode: string;
  subjectName: string;
  type: 'Theory' | 'Practical';
  faculty: string;
  attended: number;
  total: number;
  percentage: number;
  lastUpdated: string;
}

export interface AttendanceData {
  theoryOverall: number;
  practicalOverall: number;
  overall: number;
  subjects: SubjectAttendance[];
  history: {
    date: string;
    status: 'Present' | 'Absent' | 'Holiday' | 'Leave';
    subject: string;
    period: string;
  }[];
}

export interface ClassPeriod {
  periodNo: number;
  time: string;
  subject: string;
  subjectCode: string;
  teacher: string;
  room: string;
  type: 'Lecture' | 'Lab' | 'Tutorial';
}

export interface DaySchedule {
  day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday';
  periods: ClassPeriod[];
}

export interface ExamScheduleItem {
  id: string;
  subjectCode: string;
  subjectName: string;
  date: string;
  day: string;
  time: string;
  room: string;
  syllabus: string;
  type: 'Theory' | 'Practical';
}

export interface HallTicketData {
  hallTicketNo: string;
  examName: string;
  session: string;
  centerName: string;
  centerCode: string;
  rollNo: string;
  studentName: string;
  fatherName: string;
  branch: string;
  semester: string;
  qrCodeValue: string;
  subjects: {
    code: string;
    name: string;
    date: string;
    time: string;
    verified: boolean;
  }[];
}

export interface SemesterResult {
  semester: string;
  sgpa: number;
  cgpa: number;
  totalCredits: number;
  earnedCredits: number;
  status: 'PASS' | 'FAIL' | 'PROMOTED';
  marks: {
    subjectCode: string;
    subjectName: string;
    internal: number;
    external: number;
    total: number;
    grade: string;
    credits: number;
  }[];
}

export interface DiaryNote {
  id: string;
  title: string;
  category: 'Homework' | 'Class Note' | 'Reminder' | 'Teacher Remark' | 'Personal';
  subject?: string;
  content: string;
  dueDate?: string;
  isCompleted: boolean;
  createdAt: string;
  priority: 'Low' | 'Medium' | 'High';
}

export interface CollegeNotice {
  id: string;
  title: string;
  category: 'Academic' | 'Examination' | 'Placement' | 'Events' | 'Holiday' | 'General';
  date: string;
  issuer: string;
  summary: string;
  content: string;
  isImportant: boolean;
  fileAttachment?: string;
}

export interface ChatMessage {
  id: string;
  senderName: string;
  senderRole: string;
  senderAvatar: string;
  message: string;
  timestamp: string;
  isMe: boolean;
  read: boolean;
}

export interface FeeReceipt {
  id: string;
  receiptNo: string;
  date: string;
  description: string;
  amount: number;
  mode: string;
  status: 'Paid' | 'Pending' | 'Overdue';
}

export interface UserAccount {
  id: string;
  username: string;
  passwordHash: string; // stored password or hashed
  createdAt: string;
  profile: StudentProfile;
}

export interface AuthSession {
  user: UserAccount;
  token: string;
  loginTime: string;
}

