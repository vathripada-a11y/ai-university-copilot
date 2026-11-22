/**
 * Mock Database for AI University Copilot
 * Department: ISE | Semester: 5 | Section: A
 * Institute: SDM Institute of Technology, Ujire
 */

// Helper to generate dynamic dates relative to today
const getRelativeDate = (offsetDays) => {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  return d.toISOString().split('T')[0];
};

export const SUBJECTS = [
  { id: 'sub-dbms', code: '21IS51', name: 'Database Management Systems', shortName: 'DBMS', facultyId: 'fac-1', credits: 4 },
  { id: 'sub-cn', code: '21IS52', name: 'Computer Networks', shortName: 'CN', facultyId: 'fac-2', credits: 4 },
  { id: 'sub-se', code: '21IS53', name: 'Software Engineering', shortName: 'SE', facultyId: 'fac-1', credits: 3 },
  { id: 'sub-at', code: '21IS54', name: 'Automata Theory & Computability', shortName: 'Automata', facultyId: 'fac-2', credits: 3 },
  { id: 'sub-mp', code: '21ISP55', name: 'Mini Project in ISE', shortName: 'Mini Project', facultyId: 'fac-1', credits: 2 }
];

export const USERS = [
  // Students (10 students)
  {
    id: 'stu-1',
    name: 'Ananya Rao',
    email: 'student1@demo.edu',
    password: 'demo123',
    role: 'STUDENT',
    usn: '4SU24IS101',
    department: 'ISE',
    semester: 5,
    section: 'A',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
    phone: '+91 98451 12301'
  },
  {
    id: 'stu-2',
    name: 'Rahul Shetty',
    email: 'student2@demo.edu',
    password: 'demo123',
    role: 'STUDENT',
    usn: '4SU24IS102',
    department: 'ISE',
    semester: 5,
    section: 'A',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    phone: '+91 98451 12302'
  },
  {
    id: 'stu-3',
    name: 'Sneha Bhat',
    email: 'student3@demo.edu',
    password: 'demo123',
    role: 'STUDENT',
    usn: '4SU24IS103',
    department: 'ISE',
    semester: 5,
    section: 'A',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
    phone: '+91 98451 12303'
  },
  {
    id: 'stu-4',
    name: 'Karthik Pai',
    email: 'student4@demo.edu',
    password: 'demo123',
    role: 'STUDENT',
    usn: '4SU24IS104',
    department: 'ISE',
    semester: 5,
    section: 'A',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
    phone: '+91 98451 12304'
  },
  {
    id: 'stu-5',
    name: 'Pooja Hegde',
    email: 'student5@demo.edu',
    password: 'demo123',
    role: 'STUDENT',
    usn: '4SU24IS105',
    department: 'ISE',
    semester: 5,
    section: 'A',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150',
    phone: '+91 98451 12305'
  },
  {
    id: 'stu-6',
    name: 'Varun Nayak',
    email: 'student6@demo.edu',
    password: 'demo123',
    role: 'STUDENT',
    usn: '4SU24IS106',
    department: 'ISE',
    semester: 5,
    section: 'A',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150',
    phone: '+91 98451 12306'
  },
  {
    id: 'stu-7',
    name: 'Deepa Kulal',
    email: 'student7@demo.edu',
    password: 'demo123',
    role: 'STUDENT',
    usn: '4SU24IS107',
    department: 'ISE',
    semester: 5,
    section: 'A',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
    phone: '+91 98451 12307'
  },
  {
    id: 'stu-8',
    name: 'Manoj Gowda',
    email: 'student8@demo.edu',
    password: 'demo123',
    role: 'STUDENT',
    usn: '4SU24IS108',
    department: 'ISE',
    semester: 5,
    section: 'A',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150',
    phone: '+91 98451 12308'
  },
  {
    id: 'stu-9',
    name: 'Tanvi Shenoy',
    email: 'student9@demo.edu',
    password: 'demo123',
    role: 'STUDENT',
    usn: '4SU24IS109',
    department: 'ISE',
    semester: 5,
    section: 'A',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150',
    phone: '+91 98451 12309'
  },
  {
    id: 'stu-10',
    name: 'Aditya Acharya',
    email: 'student10@demo.edu',
    password: 'demo123',
    role: 'STUDENT',
    usn: '4SU24IS110',
    department: 'ISE',
    semester: 5,
    section: 'A',
    avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150',
    phone: '+91 98451 12310'
  },

  // Faculty Members
  {
    id: 'fac-1',
    name: 'Dr. Meera K',
    email: 'faculty1@demo.edu',
    password: 'demo123',
    role: 'FACULTY',
    designation: 'Associate Professor',
    department: 'ISE',
    subjectsTaught: ['sub-dbms', 'sub-se', 'sub-mp'],
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150',
    phone: '+91 94481 44501'
  },
  {
    id: 'fac-2',
    name: 'Prof. Suresh B',
    email: 'faculty2@demo.edu',
    password: 'demo123',
    role: 'FACULTY',
    designation: 'Assistant Professor',
    department: 'ISE',
    subjectsTaught: ['sub-cn', 'sub-at'],
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150',
    phone: '+91 94481 44502'
  },

  // Administrator
  {
    id: 'adm-1',
    name: 'SDMIT Admin Office',
    email: 'admin@demo.edu',
    password: 'demo123',
    role: 'ADMIN',
    designation: 'Academic Dean & Chief Administrator',
    department: 'ISE / Institutional Administration',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
    phone: '+91 8256 236221'
  }
];

// Student Attendance Database
// Note: Ananya Rao (stu-1) has DBMS attendance at 68.75% (< 75% warning!)
export const ATTENDANCE = {
  'stu-1': [
    { subjectId: 'sub-dbms', subjectName: 'Database Management Systems', code: '21IS51', attended: 22, total: 32, percentage: 68.8, faculty: 'Dr. Meera K' },
    { subjectId: 'sub-cn', subjectName: 'Computer Networks', code: '21IS52', attended: 28, total: 32, percentage: 87.5, faculty: 'Prof. Suresh B' },
    { subjectId: 'sub-se', subjectName: 'Software Engineering', code: '21IS53', attended: 29, total: 32, percentage: 90.6, faculty: 'Dr. Meera K' },
    { subjectId: 'sub-at', subjectName: 'Automata Theory & Computability', code: '21IS54', attended: 26, total: 32, percentage: 81.3, faculty: 'Prof. Suresh B' },
    { subjectId: 'sub-mp', subjectName: 'Mini Project in ISE', code: '21ISP55', attended: 15, total: 16, percentage: 93.8, faculty: 'Dr. Meera K' }
  ],
  'stu-2': [
    { subjectId: 'sub-dbms', subjectName: 'Database Management Systems', code: '21IS51', attended: 28, total: 32, percentage: 87.5, faculty: 'Dr. Meera K' },
    { subjectId: 'sub-cn', subjectName: 'Computer Networks', code: '21IS52', attended: 30, total: 32, percentage: 93.8, faculty: 'Prof. Suresh B' },
    { subjectId: 'sub-se', subjectName: 'Software Engineering', code: '21IS53', attended: 27, total: 32, percentage: 84.4, faculty: 'Dr. Meera K' },
    { subjectId: 'sub-at', subjectName: 'Automata Theory & Computability', code: '21IS54', attended: 29, total: 32, percentage: 90.6, faculty: 'Prof. Suresh B' },
    { subjectId: 'sub-mp', subjectName: 'Mini Project in ISE', code: '21ISP55', attended: 16, total: 16, percentage: 100.0, faculty: 'Dr. Meera K' }
  ]
};

// Weekly Timetable for ISE 5th Sem Section A (Monday - Saturday)
export const TIMETABLE = [
  // Monday
  { id: 'tt-mon-1', day: 'Monday', time: '09:00 - 10:00', slot: 1, subject: 'Database Management Systems', code: '21IS51', faculty: 'Dr. Meera K', room: 'LH-201', facultyId: 'fac-1' },
  { id: 'tt-mon-2', day: 'Monday', time: '10:00 - 11:00', slot: 2, subject: 'Computer Networks', code: '21IS52', faculty: 'Prof. Suresh B', room: 'LH-201', facultyId: 'fac-2' },
  { id: 'tt-mon-3', day: 'Monday', time: '11:15 - 12:15', slot: 3, subject: 'Software Engineering', code: '21IS53', faculty: 'Dr. Meera K', room: 'LH-201', facultyId: 'fac-1' },
  { id: 'tt-mon-4', day: 'Monday', time: '12:15 - 01:15', slot: 4, subject: 'Automata Theory & Computability', code: '21IS54', faculty: 'Prof. Suresh B', room: 'LH-201', facultyId: 'fac-2' },
  { id: 'tt-mon-5', day: 'Monday', time: '02:00 - 04:00', slot: 5, subject: 'DBMS Laboratory', code: '21IS51-L', faculty: 'Dr. Meera K', room: 'Database Lab (CS-02)', facultyId: 'fac-1' },

  // Tuesday
  { id: 'tt-tue-1', day: 'Tuesday', time: '09:00 - 10:00', slot: 1, subject: 'Computer Networks', code: '21IS52', faculty: 'Prof. Suresh B', room: 'LH-201', facultyId: 'fac-2' },
  { id: 'tt-tue-2', day: 'Tuesday', time: '10:00 - 11:00', slot: 2, subject: 'Software Engineering', code: '21IS53', faculty: 'Dr. Meera K', room: 'LH-201', facultyId: 'fac-1' },
  { id: 'tt-tue-3', day: 'Tuesday', time: '11:15 - 12:15', slot: 3, subject: 'Database Management Systems', code: '21IS51', faculty: 'Dr. Meera K', room: 'LH-201', facultyId: 'fac-1' },
  { id: 'tt-tue-4', day: 'Tuesday', time: '12:15 - 01:15', slot: 4, subject: 'Automata Theory & Computability', code: '21IS54', faculty: 'Prof. Suresh B', room: 'LH-201', facultyId: 'fac-2' },
  { id: 'tt-tue-5', day: 'Tuesday', time: '02:00 - 04:00', slot: 5, subject: 'Computer Networks Lab', code: '21IS52-L', faculty: 'Prof. Suresh B', room: 'Networks Lab (CS-04)', facultyId: 'fac-2' },

  // Wednesday
  { id: 'tt-wed-1', day: 'Wednesday', time: '09:00 - 10:00', slot: 1, subject: 'Automata Theory & Computability', code: '21IS54', faculty: 'Prof. Suresh B', room: 'LH-201', facultyId: 'fac-2' },
  { id: 'tt-wed-2', day: 'Wednesday', time: '10:00 - 11:00', slot: 2, subject: 'Database Management Systems', code: '21IS51', faculty: 'Dr. Meera K', room: 'LH-201', facultyId: 'fac-1' },
  { id: 'tt-wed-3', day: 'Wednesday', time: '11:15 - 12:15', slot: 3, subject: 'Software Engineering', code: '21IS53', faculty: 'Dr. Meera K', room: 'LH-201', facultyId: 'fac-1' },
  { id: 'tt-wed-4', day: 'Wednesday', time: '12:15 - 01:15', slot: 4, subject: 'Computer Networks', code: '21IS52', faculty: 'Prof. Suresh B', room: 'LH-201', facultyId: 'fac-2' },
  { id: 'tt-wed-5', day: 'Wednesday', time: '02:00 - 04:00', slot: 5, subject: 'Mini Project Mentoring Session', code: '21ISP55', faculty: 'Dr. Meera K', room: 'Project Lab (ISE-01)', facultyId: 'fac-1' },

  // Thursday
  { id: 'tt-thu-1', day: 'Thursday', time: '09:00 - 10:00', slot: 1, subject: 'Software Engineering', code: '21IS53', faculty: 'Dr. Meera K', room: 'LH-201', facultyId: 'fac-1' },
  { id: 'tt-thu-2', day: 'Thursday', time: '10:00 - 11:00', slot: 2, subject: 'Computer Networks', code: '21IS52', faculty: 'Prof. Suresh B', room: 'LH-201', facultyId: 'fac-2' },
  { id: 'tt-thu-3', day: 'Thursday', time: '11:15 - 12:15', slot: 3, subject: 'Database Management Systems', code: '21IS51', faculty: 'Dr. Meera K', room: 'LH-201', facultyId: 'fac-1' },
  { id: 'tt-thu-4', day: 'Thursday', time: '12:15 - 01:15', slot: 4, subject: 'Automata Theory & Computability', code: '21IS54', faculty: 'Prof. Suresh B', room: 'LH-201', facultyId: 'fac-2' },
  { id: 'tt-thu-5', day: 'Thursday', time: '02:00 - 04:00', slot: 5, subject: 'Self-Study & Tutorial', code: 'TUT', faculty: 'Dr. Meera K / Prof. Suresh B', room: 'LH-201', facultyId: 'fac-1' },

  // Friday
  { id: 'tt-fri-1', day: 'Friday', time: '09:00 - 10:00', slot: 1, subject: 'Database Management Systems', code: '21IS51', faculty: 'Dr. Meera K', room: 'LH-201', facultyId: 'fac-1' },
  { id: 'tt-fri-2', day: 'Friday', time: '10:00 - 11:00', slot: 2, subject: 'Automata Theory & Computability', code: '21IS54', faculty: 'Prof. Suresh B', room: 'LH-201', facultyId: 'fac-2' },
  { id: 'tt-fri-3', day: 'Friday', time: '11:15 - 12:15', slot: 3, subject: 'Computer Networks', code: '21IS52', faculty: 'Prof. Suresh B', room: 'LH-201', facultyId: 'fac-2' },
  { id: 'tt-fri-4', day: 'Friday', time: '12:15 - 01:15', slot: 4, subject: 'Software Engineering', code: '21IS53', faculty: 'Dr. Meera K', room: 'LH-201', facultyId: 'fac-1' },
  { id: 'tt-fri-5', day: 'Friday', time: '02:00 - 04:00', slot: 5, subject: 'Mini Project Coding Lab', code: '21ISP55', faculty: 'Dr. Meera K', room: 'Project Lab (ISE-01)', facultyId: 'fac-1' },

  // Saturday
  { id: 'tt-sat-1', day: 'Saturday', time: '09:00 - 10:00', slot: 1, subject: 'Computer Networks Remedial / Quiz', code: '21IS52', faculty: 'Prof. Suresh B', room: 'LH-201', facultyId: 'fac-2' },
  { id: 'tt-sat-2', day: 'Saturday', time: '10:00 - 11:00', slot: 2, subject: 'DBMS Case Study Discussion', code: '21IS51', faculty: 'Dr. Meera K', room: 'LH-201', facultyId: 'fac-1' },
  { id: 'tt-sat-3', day: 'Saturday', time: '11:15 - 12:15', slot: 3, subject: 'Automata Problem Solving', code: '21IS54', faculty: 'Prof. Suresh B', room: 'LH-201', facultyId: 'fac-2' },
  { id: 'tt-sat-4', day: 'Saturday', time: '12:15 - 01:15', slot: 4, subject: 'Technical Seminar & Association Hour', code: 'SEM', faculty: 'Dr. Meera K', room: 'ISE Seminar Hall', facultyId: 'fac-1' }
];

// Assignments (Mix of Pending, Submitted, and 1 Overdue relative to current date)
export const ASSIGNMENTS = [
  {
    id: 'asg-1',
    subject: 'Database Management Systems',
    code: '21IS51',
    title: 'ER Modeling and Complex SQL Queries',
    description: 'Design the relational schema and write SQL queries for University Library DB with nested subqueries and joins.',
    dueDate: getRelativeDate(3), // 3 days in future -> Pending
    totalMarks: 25,
    facultyId: 'fac-1',
    facultyName: 'Dr. Meera K',
    statusForAnanya: 'PENDING',
    statusForRahul: 'SUBMITTED'
  },
  {
    id: 'asg-2',
    subject: 'Database Management Systems',
    code: '21IS51',
    title: 'Normalization (1NF to BCNF) Case Study',
    description: 'Analyze sample unnormalized relational tables from a healthcare system and decompose them into BCNF.',
    dueDate: getRelativeDate(-2), // 2 days ago -> OVERDUE for Ananya!
    totalMarks: 20,
    facultyId: 'fac-1',
    facultyName: 'Dr. Meera K',
    statusForAnanya: 'OVERDUE',
    statusForRahul: 'SUBMITTED'
  },
  {
    id: 'asg-3',
    subject: 'Computer Networks',
    code: '21IS52',
    title: 'Socket Programming & Subnetting Problem Set',
    description: 'Implement a TCP Client-Server echo application in Python/Java and solve Classless Inter-Domain Routing (CIDR) questions.',
    dueDate: getRelativeDate(5), // 5 days in future -> Pending
    totalMarks: 30,
    facultyId: 'fac-2',
    facultyName: 'Prof. Suresh B',
    statusForAnanya: 'PENDING',
    statusForRahul: 'PENDING'
  },
  {
    id: 'asg-4',
    subject: 'Computer Networks',
    code: '21IS52',
    title: 'Wireshark Packet Analysis Lab Report',
    description: 'Capture and inspect HTTP, DNS, and TCP handshake packets. Submit screenshot log with analysis.',
    dueDate: getRelativeDate(-6), // 6 days ago -> SUBMITTED
    totalMarks: 20,
    facultyId: 'fac-2',
    facultyName: 'Prof. Suresh B',
    statusForAnanya: 'SUBMITTED',
    statusForRahul: 'SUBMITTED'
  },
  {
    id: 'asg-5',
    subject: 'Software Engineering',
    code: '21IS53',
    title: 'SRS Document for AI Campus Platform',
    description: 'Prepare IEEE 830 compliant Software Requirements Specification for the semester mini project modules.',
    dueDate: getRelativeDate(8), // 8 days in future -> Pending
    totalMarks: 30,
    facultyId: 'fac-1',
    facultyName: 'Dr. Meera K',
    statusForAnanya: 'PENDING',
    statusForRahul: 'PENDING'
  },
  {
    id: 'asg-6',
    subject: 'Software Engineering',
    code: '21IS53',
    title: 'Agile Sprint Planning & User Story Mapping',
    description: 'Document 10 user stories with acceptance criteria, story points, and sprint backlog arrangement.',
    dueDate: getRelativeDate(-10), // 10 days ago -> SUBMITTED
    totalMarks: 25,
    facultyId: 'fac-1',
    facultyName: 'Dr. Meera K',
    statusForAnanya: 'SUBMITTED',
    statusForRahul: 'SUBMITTED'
  },
  {
    id: 'asg-7',
    subject: 'Automata Theory & Computability',
    code: '21IS54',
    title: 'DFA, NFA and Regular Expressions Assignment',
    description: 'Construct minimum state DFAs for given formal languages and convert NFA with epsilon transitions to DFA.',
    dueDate: getRelativeDate(12), // 12 days in future -> Pending
    totalMarks: 25,
    facultyId: 'fac-2',
    facultyName: 'Prof. Suresh B',
    statusForAnanya: 'PENDING',
    statusForRahul: 'SUBMITTED'
  },
  {
    id: 'asg-8',
    subject: 'Mini Project in ISE',
    code: '21ISP55',
    title: 'Phase 1 Architecture & API Specifications',
    description: 'Submit system architectural diagrams, module decomposition, and OpenAPI contracts for the mini project.',
    dueDate: getRelativeDate(4), // 4 days in future -> Pending
    totalMarks: 50,
    facultyId: 'fac-1',
    facultyName: 'Dr. Meera K',
    statusForAnanya: 'PENDING',
    statusForRahul: 'PENDING'
  }
];

// Circulars & Notices (Audience filtered: ALL, STUDENTS, FACULTY, SECTION A)
export const NOTICES = [
  {
    id: 'not-1',
    title: 'Mandatory 75% Attendance Compliance Notice',
    content: 'All students are strictly advised to maintain minimum 75% attendance in each course as mandated by VTU regulations. Students with attendance shortages will not be eligible to appear for semester end examinations.',
    audience: 'STUDENTS',
    category: 'ACADEMIC',
    publishedDate: getRelativeDate(-1),
    publishedBy: 'Academic Dean Office',
    priority: 'HIGH'
  },
  {
    id: 'not-2',
    title: 'ISE 5th Sem Section A: Special DBMS Remedial Session',
    content: 'A supplementary revision session on SQL Subqueries and Indexing will be conducted for Section A students this Saturday from 10:00 AM in LH-201. Attendance is mandatory for students with queries.',
    audience: 'SECTION A',
    category: 'DEPARTMENT',
    publishedDate: getRelativeDate(-2),
    publishedBy: 'Dr. Meera K (Course Coordinator)',
    priority: 'MEDIUM'
  },
  {
    id: 'not-3',
    title: 'Faculty Meeting: CIE-1 Question Paper Scrutiny',
    content: 'All teaching faculty of the Department of ISE are requested to attend the Continuous Internal Evaluation scrutiny committee meeting in the Department Conference Hall on Wednesday at 4:15 PM.',
    audience: 'FACULTY',
    category: 'FACULTY_INTERNAL',
    publishedDate: getRelativeDate(-3),
    publishedBy: 'HOD - Information Science & Engineering',
    priority: 'HIGH'
  },
  {
    id: 'not-4',
    title: 'Campus Wi-Fi & IT Infrastructure Maintenance Schedule',
    content: 'Routine scheduled maintenance of core network switches and server infrastructure will occur on Sunday between 06:00 AM and 10:00 AM. Internet access across campus may face intermittent disruption.',
    audience: 'ALL',
    category: 'CAMPUS',
    publishedDate: getRelativeDate(-4),
    publishedBy: 'Network & System Administration Cell',
    priority: 'LOW'
  },
  {
    id: 'not-5',
    title: 'Mini Project Phase 1 Synopsis Submission Guidelines',
    content: '5th-semester students must upload approved project synopses along with guide endorsement signatures through the portal by next Friday.',
    audience: 'SECTION A',
    category: 'ACADEMIC',
    publishedDate: getRelativeDate(-5),
    publishedBy: 'Mini Project Committee - ISE',
    priority: 'MEDIUM'
  },
  {
    id: 'not-6',
    title: 'Institution Day & Annual Tech Fest Planning Committee Notice',
    content: 'Nominations are open for student representatives and faculty advisors for the upcoming annual SDMIT Technical Symposium. Interested members can submit expression of interest to the dean office.',
    audience: 'ALL',
    category: 'GENERAL',
    publishedDate: getRelativeDate(-7),
    publishedBy: 'Office of the Principal',
    priority: 'LOW'
  }
];
