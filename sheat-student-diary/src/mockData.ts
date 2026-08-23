import {
  StudentProfile,
  AttendanceData,
  DaySchedule,
  ExamScheduleItem,
  HallTicketData,
  SemesterResult,
  DiaryNote,
  CollegeNotice,
  ChatMessage,
  FeeReceipt
} from './types';

export const initialStudentProfile: StudentProfile = {
  name: 'SHANU VISHWAKARMA',
  rollNo: '2026041001',
  enrollmentNo: 'EN202688401',
  course: 'B.Tech',
  branch: 'Computer Science & Engineering (Data Science)',
  year: '3rd Year',
  semester: 'VI Semester',
  institution: 'SHEAT GROUP OF INSTITUTIONS',
  academicYear: '2026-2027',
  email: 'shanuvishwakarma2254@gmail.com',
  phone: '+91 98765 43210',
  dob: '15/08/2004',
  bloodGroup: 'O+',
  fatherName: 'Ram Shanker Vishwakarma',
  motherName: 'Sunita Devi',
  guardianPhone: '+91 98765 00000',
  address: 'H.No. 42, Airport Road, Babatpur, Varanasi, U.P. - 221006',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400', // high quality avatar placeholder
  logoUrl: 'https://images.unsplash.com/photo-1592280771190-3e2e4d571952?auto=format&fit=crop&q=80&w=200'
};

export const initialAttendanceData: AttendanceData = {
  theoryOverall: 78,
  practicalOverall: 85,
  overall: 81,
  subjects: [
    {
      id: 'sub1',
      subjectCode: 'KCS-601',
      subjectName: 'Software Engineering & Data Science',
      type: 'Theory',
      faculty: 'Dr. A.K. Sharma',
      attended: 32,
      total: 40,
      percentage: 80,
      lastUpdated: 'Today, 10:30 AM'
    },
    {
      id: 'sub2',
      subjectCode: 'KCS-602',
      subjectName: 'Web Technology & Cloud Computing',
      type: 'Theory',
      faculty: 'Prof. S.N. Singh',
      attended: 28,
      total: 36,
      percentage: 77.8,
      lastUpdated: 'Yesterday, 02:15 PM'
    },
    {
      id: 'sub3',
      subjectCode: 'KCS-603',
      subjectName: 'Big Data Analytics',
      type: 'Theory',
      faculty: 'Dr. Pooja Mishra',
      attended: 30,
      total: 38,
      percentage: 78.9,
      lastUpdated: 'Yesterday, 11:45 AM'
    },
    {
      id: 'sub4',
      subjectCode: 'KIT-601',
      subjectName: 'Machine Learning Algorithms',
      type: 'Theory',
      faculty: 'Prof. Rajesh Gupta',
      attended: 27,
      total: 36,
      percentage: 75.0,
      lastUpdated: '11 Aug 2026'
    },
    {
      id: 'sub5',
      subjectCode: 'KCS-651',
      subjectName: 'Software Engineering Lab',
      type: 'Practical',
      faculty: 'Er. R.P. Verma',
      attended: 14,
      total: 16,
      percentage: 87.5,
      lastUpdated: '12 Aug 2026'
    },
    {
      id: 'sub6',
      subjectCode: 'KCS-652',
      subjectName: 'Web Technology & Cloud Lab',
      type: 'Practical',
      faculty: 'Er. Neha Srivastava',
      attended: 13,
      total: 16,
      percentage: 81.25,
      lastUpdated: '10 Aug 2026'
    }
  ],
  history: [
    { date: '13 Aug 2026', status: 'Present', subject: 'KCS-601 Software Engineering', period: 'Period 1 (09:00 - 10:00)' },
    { date: '13 Aug 2026', status: 'Present', subject: 'KCS-602 Web Technology', period: 'Period 2 (10:00 - 11:00)' },
    { date: '12 Aug 2026', status: 'Present', subject: 'KCS-651 Software Engg Lab', period: 'Period 5-6 (02:00 - 04:00)' },
    { date: '11 Aug 2026', status: 'Absent', subject: 'KIT-601 Machine Learning', period: 'Period 3 (11:15 - 12:15)' },
    { date: '10 Aug 2026', status: 'Present', subject: 'KCS-603 Big Data Analytics', period: 'Period 4 (12:15 - 01:15)' }
  ]
};

export const sampleTimetable: DaySchedule[] = [
  {
    day: 'Monday',
    periods: [
      { periodNo: 1, time: '09:00 AM - 10:00 AM', subject: 'Software Engineering (KCS-601)', subjectCode: 'KCS-601', teacher: 'Dr. A.K. Sharma', room: 'LT-102', type: 'Lecture' },
      { periodNo: 2, time: '10:00 AM - 11:00 AM', subject: 'Web Technology (KCS-602)', subjectCode: 'KCS-602', teacher: 'Prof. S.N. Singh', room: 'LT-102', type: 'Lecture' },
      { periodNo: 3, time: '11:15 AM - 12:15 PM', subject: 'Big Data Analytics (KCS-603)', subjectCode: 'KCS-603', teacher: 'Dr. Pooja Mishra', room: 'LT-102', type: 'Lecture' },
      { periodNo: 4, time: '12:15 PM - 01:15 PM', subject: 'Machine Learning (KIT-601)', subjectCode: 'KIT-601', teacher: 'Prof. Rajesh Gupta', room: 'LT-102', type: 'Lecture' },
      { periodNo: 5, time: '02:00 PM - 04:00 PM', subject: 'Software Engg Lab (KCS-651)', subjectCode: 'KCS-651', teacher: 'Er. R.P. Verma', room: 'Computer Lab 3', type: 'Lab' }
    ]
  },
  {
    day: 'Tuesday',
    periods: [
      { periodNo: 1, time: '09:00 AM - 10:00 AM', subject: 'Web Technology (KCS-602)', subjectCode: 'KCS-602', teacher: 'Prof. S.N. Singh', room: 'LT-102', type: 'Lecture' },
      { periodNo: 2, time: '10:00 AM - 11:00 AM', subject: 'Machine Learning (KIT-601)', subjectCode: 'KIT-601', teacher: 'Prof. Rajesh Gupta', room: 'LT-102', type: 'Lecture' },
      { periodNo: 3, time: '11:15 AM - 12:15 PM', subject: 'Software Engineering (KCS-601)', subjectCode: 'KCS-601', teacher: 'Dr. A.K. Sharma', room: 'LT-102', type: 'Lecture' },
      { periodNo: 4, time: '02:00 PM - 04:00 PM', subject: 'Web Tech & Cloud Lab (KCS-652)', subjectCode: 'KCS-652', teacher: 'Er. Neha Srivastava', room: 'Cloud Computing Lab', type: 'Lab' }
    ]
  },
  {
    day: 'Wednesday',
    periods: [
      { periodNo: 1, time: '09:00 AM - 10:00 AM', subject: 'Big Data Analytics (KCS-603)', subjectCode: 'KCS-603', teacher: 'Dr. Pooja Mishra', room: 'LT-102', type: 'Lecture' },
      { periodNo: 2, time: '10:00 AM - 11:00 AM', subject: 'Software Engineering (KCS-601)', subjectCode: 'KCS-601', teacher: 'Dr. A.K. Sharma', room: 'LT-102', type: 'Lecture' },
      { periodNo: 3, time: '11:15 AM - 12:15 PM', subject: 'Compiler Design (KCS-604)', subjectCode: 'KCS-604', teacher: 'Prof. V.K. Yateen', room: 'LT-102', type: 'Lecture' },
      { periodNo: 4, time: '02:00 PM - 03:00 PM', subject: 'Mini Project Seminar', subjectCode: 'KCS-653', teacher: 'Dr. A.K. Sharma', room: 'Auditorium Hall B', type: 'Tutorial' }
    ]
  },
  {
    day: 'Thursday',
    periods: [
      { periodNo: 1, time: '09:00 AM - 10:00 AM', subject: 'Machine Learning (KIT-601)', subjectCode: 'KIT-601', teacher: 'Prof. Rajesh Gupta', room: 'LT-102', type: 'Lecture' },
      { periodNo: 2, time: '10:00 AM - 11:00 AM', subject: 'Big Data Analytics (KCS-603)', subjectCode: 'KCS-603', teacher: 'Dr. Pooja Mishra', room: 'LT-102', type: 'Lecture' },
      { periodNo: 3, time: '11:15 AM - 12:15 PM', subject: 'Web Technology (KCS-602)', subjectCode: 'KCS-602', teacher: 'Prof. S.N. Singh', room: 'LT-102', type: 'Lecture' },
      { periodNo: 4, time: '02:00 PM - 04:00 PM', subject: 'AI & Data Science Lab', subjectCode: 'KCS-654', teacher: 'Dr. Pooja Mishra', room: 'DS Lab 2', type: 'Lab' }
    ]
  },
  {
    day: 'Friday',
    periods: [
      { periodNo: 1, time: '09:00 AM - 10:00 AM', subject: 'Compiler Design (KCS-604)', subjectCode: 'KCS-604', teacher: 'Prof. V.K. Yateen', room: 'LT-102', type: 'Lecture' },
      { periodNo: 2, time: '10:00 AM - 11:00 AM', subject: 'Software Engineering (KCS-601)', subjectCode: 'KCS-601', teacher: 'Dr. A.K. Sharma', room: 'LT-102', type: 'Lecture' },
      { periodNo: 3, time: '11:15 AM - 12:15 PM', subject: 'Constitution of India (KNC-601)', subjectCode: 'KNC-601', teacher: 'Dr. S.P. Tiwari', room: 'LT-102', type: 'Lecture' },
      { periodNo: 4, time: '02:00 PM - 03:30 PM', subject: 'Library & Self Study', subjectCode: 'LIB-601', teacher: 'Librarian Desk', room: 'Central Library', type: 'Tutorial' }
    ]
  },
  {
    day: 'Saturday',
    periods: [
      { periodNo: 1, time: '09:00 AM - 11:00 AM', subject: 'Aptitude & Technical Soft Skills', subjectCode: 'KNC-602', teacher: 'Training Cell', room: 'Seminar Hall 1', type: 'Lecture' },
      { periodNo: 2, time: '11:15 AM - 01:15 PM', subject: 'Competitive Coding & Data Structures', subjectCode: 'CLUB-DS', teacher: 'Coding Club Mentor', room: 'Computer Lab 1', type: 'Lab' }
    ]
  }
];

export const sampleExams: ExamScheduleItem[] = [
  {
    id: 'ex1',
    subjectCode: 'KCS-601',
    subjectName: 'Software Engineering & Agile Methodologies',
    date: '18 Sep 2026',
    day: 'Monday',
    time: '10:00 AM - 01:00 PM',
    room: 'Examination Block A (Hall 102)',
    syllabus: 'Modules 1 to 5: Requirement Engg, Design Patterns, Agile Scrum, Software Testing',
    type: 'Theory'
  },
  {
    id: 'ex2',
    subjectCode: 'KCS-602',
    subjectName: 'Web Technology & Cloud Infrastructure',
    date: '20 Sep 2026',
    day: 'Wednesday',
    time: '10:00 AM - 01:00 PM',
    room: 'Examination Block A (Hall 104)',
    syllabus: 'HTML5, CSS3, React, REST APIs, Express, Docker & Cloud Deployment',
    type: 'Theory'
  },
  {
    id: 'ex3',
    subjectCode: 'KCS-603',
    subjectName: 'Big Data Analytics & Hadoop Architecture',
    date: '22 Sep 2026',
    day: 'Friday',
    time: '10:00 AM - 01:00 PM',
    room: 'Examination Block A (Hall 102)',
    syllabus: 'MapReduce, HDFS, Spark, NoSQL MongoDB, Data Pipeline Architecture',
    type: 'Theory'
  },
  {
    id: 'ex4',
    subjectCode: 'KIT-601',
    subjectName: 'Machine Learning Algorithms & Neural Networks',
    date: '25 Sep 2026',
    day: 'Monday',
    time: '10:00 AM - 01:00 PM',
    room: 'Examination Block B (Hall 201)',
    syllabus: 'Supervised/Unsupervised Learning, SVM, Decision Trees, Deep Neural Nets',
    type: 'Theory'
  },
  {
    id: 'ex5',
    subjectCode: 'KCS-651',
    subjectName: 'Software Engineering Practical Viva',
    date: '28 Sep 2026',
    day: 'Thursday',
    time: '09:30 AM - 04:00 PM',
    room: 'Software Lab 3',
    syllabus: 'Project Documentation, UML Diagrams, Automated Unit Testing with Jest',
    type: 'Practical'
  }
];

export const sampleHallTicket: HallTicketData = {
  hallTicketNo: 'HT-2026-EVEN-041001',
  examName: 'EVEN SEMESTER END EXAMINATIONS 2026-27',
  session: '2026-2027',
  centerName: 'SHEAT College of Engineering & Management (Code: 884)',
  centerCode: '884',
  rollNo: '2026041001',
  studentName: 'SHANU VISHWAKARMA',
  fatherName: 'Ram Shanker Vishwakarma',
  branch: 'B.Tech CSE (Data Science)',
  semester: '6th Semester',
  qrCodeValue: 'SHEAT-VERIFIED-2026041001-SHANU-VISHWAKARMA',
  subjects: [
    { code: 'KCS-601', name: 'Software Engineering', date: '18/09/2026', time: '10:00 AM - 01:00 PM', verified: true },
    { code: 'KCS-602', name: 'Web Technology', date: '20/09/2026', time: '10:00 AM - 01:00 PM', verified: true },
    { code: 'KCS-603', name: 'Big Data Analytics', date: '22/09/2026', time: '10:00 AM - 01:00 PM', verified: true },
    { code: 'KIT-601', name: 'Machine Learning', date: '25/09/2026', time: '10:00 AM - 01:00 PM', verified: true },
    { code: 'KCS-651', name: 'Software Engg Lab', date: '28/09/2026', time: '09:30 AM - 04:00 PM', verified: true }
  ]
};

export const sampleResults: SemesterResult[] = [
  {
    semester: 'Semester V (Odd Sem 2025-26)',
    sgpa: 8.64,
    cgpa: 8.42,
    totalCredits: 22,
    earnedCredits: 22,
    status: 'PASS',
    marks: [
      { subjectCode: 'KCS-501', subjectName: 'Database Management Systems', internal: 28, external: 62, total: 90, grade: 'A+', credits: 4 },
      { subjectCode: 'KCS-502', subjectName: 'Design & Analysis of Algorithms', internal: 26, external: 58, total: 84, grade: 'A', credits: 4 },
      { subjectCode: 'KCS-503', subjectName: 'Computer Networks', internal: 27, external: 60, total: 87, grade: 'A+', credits: 4 },
      { subjectCode: 'KIT-501', subjectName: 'Python & Data Science Stack', internal: 29, external: 65, total: 94, grade: 'O', credits: 3 },
      { subjectCode: 'KCS-551', subjectName: 'DBMS Lab', internal: 48, external: 46, total: 94, grade: 'O', credits: 2 },
      { subjectCode: 'KCS-552', subjectName: 'Algorithms Lab', internal: 45, external: 44, total: 89, grade: 'A+', credits: 2 },
      { subjectCode: 'KNC-501', subjectName: 'Industrial Sociology', internal: 42, external: 40, total: 82, grade: 'A', credits: 3 }
    ]
  },
  {
    semester: 'Semester IV (Even Sem 2024-25)',
    sgpa: 8.35,
    cgpa: 8.32,
    totalCredits: 21,
    earnedCredits: 21,
    status: 'PASS',
    marks: [
      { subjectCode: 'KCS-401', subjectName: 'Operating Systems', internal: 25, external: 56, total: 81, grade: 'A', credits: 4 },
      { subjectCode: 'KCS-402', subjectName: 'Theory of Automata', internal: 24, external: 54, total: 78, grade: 'B+', credits: 4 },
      { subjectCode: 'KCS-403', subjectName: 'Microprocessor & Interfaces', internal: 26, external: 58, total: 84, grade: 'A', credits: 4 },
      { subjectCode: 'KCS-451', subjectName: 'Operating System Lab', internal: 46, external: 45, total: 91, grade: 'O', credits: 2 }
    ]
  }
];

export const sampleDiaryNotes: DiaryNote[] = [
  {
    id: 'd1',
    title: 'Complete Software Engineering Assignment 3',
    category: 'Homework',
    subject: 'KCS-601 Software Engineering',
    content: 'Draw UML Sequence Diagram & Use Case Diagram for E-Commerce Order Management System. Submit handwritten PDF before Friday 5:00 PM.',
    dueDate: '2026-08-16',
    isCompleted: false,
    createdAt: '12 Aug 2026',
    priority: 'High'
  },
  {
    id: 'd2',
    title: 'Prepare Lab Record for Web Technology',
    category: 'Class Note',
    subject: 'KCS-652 Web Tech Lab',
    content: 'Write Experiment 5: React State Management & Hooks with Tailwind CSS integration. Include output screenshots.',
    dueDate: '2026-08-18',
    isCompleted: false,
    createdAt: '11 Aug 2026',
    priority: 'Medium'
  },
  {
    id: 'd3',
    title: 'HOD Remark: Project Synopsis Approval',
    category: 'Teacher Remark',
    subject: 'KCS-653 Mini Project',
    content: 'Dr. A.K. Sharma requested to submit hard copy of Mini Project Synopsis with team signatures by Monday morning.',
    dueDate: '2026-08-17',
    isCompleted: true,
    createdAt: '10 Aug 2026',
    priority: 'High'
  },
  {
    id: 'd4',
    title: 'Library Book Return Reminder',
    category: 'Reminder',
    content: 'Return "Data Science with Python" (Accession No. 44812) to Central Library before due date to avoid overdue fine.',
    dueDate: '2026-08-19',
    isCompleted: false,
    createdAt: '09 Aug 2026',
    priority: 'Low'
  }
];

export const sampleNotices: CollegeNotice[] = [
  {
    id: 'n1',
    title: 'Submitting Mid-Semester Examination Forms for Session 2026-27',
    category: 'Examination',
    date: '12 Aug 2026',
    issuer: 'Office of Controller of Examinations',
    summary: 'All B.Tech 3rd Year students are directed to submit their online mid-term exam forms through the student portal before 20th August 2026.',
    content: 'This is to inform all B.Tech, Polytechnic, and Paramedical students of SHEAT Group of Institutions that the registration for Even Semester Mid-Term Examination 2026-27 is now open. Please ensure all outstanding tuition fees are cleared before generating the hall ticket. Late fine of Rs. 500 will apply after 20th August 2026.',
    isImportant: true
  },
  {
    id: 'n2',
    title: 'Campus Placement Drive by Tech Mahindra & TCS',
    category: 'Placement',
    date: '10 Aug 2026',
    issuer: 'Training & Placement Cell',
    summary: 'Upcoming campus recruitment drive for B.Tech CSE / Data Science / IT passing out batch 2027.',
    content: 'The Training & Placement Cell of SHEAT Group of Institutions is organizing a mega placement drive with Tech Mahindra & TCS on 15th September 2026. Eligible candidates with aggregate CGPA above 7.0 without active backlog can register via the Placement Portal. Resume submission deadline: 25th August.',
    isImportant: true
  },
  {
    id: 'n3',
    title: 'Celebration of Independence Day & Annual Cultural Fest TechSurge 2026',
    category: 'Events',
    date: '08 Aug 2026',
    issuer: 'Dean Student Welfare (DSW)',
    summary: 'Flag hoisting ceremony at 8:00 AM on 15th August followed by auditions for TechSurge 2026.',
    content: 'All students and faculty members are cordially invited to celebrate 80th Independence Day on August 15, 2026 at SHEAT Main Campus Lawn. Attendance is compulsory. Registration for cultural dance, drama, and codeathon competition open at DSW Office.',
    isImportant: false
  },
  {
    id: 'n4',
    title: '75% Attendance Mandatory for Examination Eligibility',
    category: 'Academic',
    date: '05 Aug 2026',
    issuer: 'Director Academic',
    summary: 'Strict compliance notice regarding minimum 75% attendance criteria in theory and practical classes.',
    content: 'As per University Guidelines, students having less than 75% overall attendance will be debarred from appearing in the End Semester Examinations. Students with medical emergencies must submit official medical certificates signed by CMO within 3 days of leave.',
    isImportant: true
  }
];

export const sampleMessages: ChatMessage[] = [
  {
    id: 'm1',
    senderName: 'Dr. A.K. Sharma (HOD CSE)',
    senderRole: 'Head of Department',
    senderAvatar: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=200',
    message: 'Hello Shanu, please remind your team members to bring the printed circuit diagram and software architecture chart tomorrow at 10:00 AM.',
    timestamp: 'Today, 08:30 AM',
    isMe: false,
    read: true
  },
  {
    id: 'm2',
    senderName: 'SHANU VISHWAKARMA',
    senderRole: 'Student',
    senderAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
    message: 'Yes Sir! We have updated the UML diagrams and Data Pipeline flow chart as suggested in the last review. We will be present at 10 AM.',
    timestamp: 'Today, 08:42 AM',
    isMe: true,
    read: true
  },
  {
    id: 'm3',
    senderName: 'Prof. S.N. Singh (Web Tech)',
    senderRole: 'Class Coordinator',
    senderAvatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=200',
    message: 'Attention Class: Extra lecture on Cloud Infrastructure scheduled for Saturday 2:00 PM in LT-102.',
    timestamp: 'Yesterday, 04:15 PM',
    isMe: false,
    read: false
  }
];

export const sampleFeeReceipts: FeeReceipt[] = [
  {
    id: 'f1',
    receiptNo: 'SHEAT/2026/REC-88401',
    date: '10 July 2026',
    description: '3rd Year B.Tech 5th/6th Semester Tuition Fee & Development Charges',
    amount: 42500,
    mode: 'Online UPI / HDFC NetBanking',
    status: 'Paid'
  },
  {
    id: 'f2',
    receiptNo: 'SHEAT/2026/REC-88402',
    date: '12 July 2026',
    description: 'Exam Fee & University Security Deposit',
    amount: 7500,
    mode: 'Debit Card',
    status: 'Paid'
  },
  {
    id: 'f3',
    receiptNo: 'SHEAT/2026/REC-DUE-01',
    date: '15 Aug 2026',
    description: 'Bus Transportation & Library Subscription (Installment 2)',
    amount: 12000,
    mode: 'Pending Online Payment',
    status: 'Pending'
  }
];
