import { ASSIGNMENTS } from '../mock/db';
import { getCurrentUser } from './auth';

const delay = (ms = 180) => new Promise((resolve) => setTimeout(resolve, ms));
const studentSubmissions = new Map();

export const getMyAssignments = async () => {
  await delay();
  const currentUser = getCurrentUser();
  if (!currentUser || currentUser.role !== 'STUDENT') {
    throw new Error('Unauthorized: Student session required.');
  }

  const isAnanya = currentUser.id === 'stu-1' || currentUser.email === 'student1@demo.edu';
  const isRahul = currentUser.id === 'stu-2' || currentUser.email === 'student2@demo.edu';
  const submissions = studentSubmissions.get(currentUser.id) || {};

  const processed = ASSIGNMENTS.map((asg) => {
    let status = 'PENDING';
    if (isAnanya) {
      status = asg.statusForAnanya;
    } else if (isRahul) {
      status = asg.statusForRahul;
    } else {
      status = asg.statusForRahul; // default for other demo students
    }

    const submission = submissions[asg.id];

    return {
      id: asg.id,
      title: asg.title,
      subject: asg.subject,
      code: asg.code,
      description: asg.description,
      dueDate: asg.dueDate,
      totalMarks: asg.totalMarks,
      facultyName: asg.facultyName,
      status: submission?.status || status,
      submissionText: submission?.text || '',
      fileName: submission?.fileName || ''
    };
  });

  const pendingCount = processed.filter((a) => a.status === 'PENDING').length;
  const overdueCount = processed.filter((a) => a.status === 'OVERDUE').length;
  const submittedCount = processed.filter((a) => ['SUBMITTED', 'LATE'].includes(a.status)).length;

  return {
    assignments: processed,
    pendingCount,
    overdueCount,
    submittedCount,
    totalCount: processed.length
  };
};

export const submitAssignment = async (assignmentId, { text, fileName } = {}) => {
  await delay();
  const currentUser = getCurrentUser();
  if (!currentUser || currentUser.role !== 'STUDENT') {
    throw new Error('Unauthorized: Student session required.');
  }

  const assignment = ASSIGNMENTS.find((item) => item.id === assignmentId);
  if (!assignment) throw new Error('Assignment not found.');

  if (!(text || '').trim() && !(fileName || '').trim()) {
    throw new Error('Add submission text or a file name before submitting.');
  }

  const submissions = studentSubmissions.get(currentUser.id) || {};
  const existing = submissions[assignmentId];
  if (existing) throw new Error('This assignment has already been submitted.');

  const today = new Date().toISOString().slice(0, 10);
  const status = assignment.dueDate < today ? 'LATE' : 'SUBMITTED';
  submissions[assignmentId] = {
    status,
    text: (text || '').trim(),
    fileName: (fileName || '').trim()
  };
  studentSubmissions.set(currentUser.id, submissions);

  return { id: assignmentId, status };
};

export const getFacultyAssignments = async () => {
  await delay();
  const currentUser = getCurrentUser();
  if (!currentUser || currentUser.role !== 'FACULTY') {
    throw new Error('Unauthorized: Faculty session required.');
  }

  const createdByMe = ASSIGNMENTS.filter((asg) => asg.facultyId === currentUser.id);

  return {
    assignments: createdByMe,
    totalCreated: createdByMe.length
  };
};
