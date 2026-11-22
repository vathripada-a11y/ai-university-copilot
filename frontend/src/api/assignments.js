import { ASSIGNMENTS } from '../mock/db';
import { getCurrentUser } from './auth';

const delay = (ms = 180) => new Promise((resolve) => setTimeout(resolve, ms));

export const getMyAssignments = async () => {
  await delay();
  const currentUser = getCurrentUser();
  if (!currentUser) throw new Error('Unauthenticated');

  const isAnanya = currentUser.id === 'stu-1' || currentUser.email === 'student1@demo.edu';
  const isRahul = currentUser.id === 'stu-2' || currentUser.email === 'student2@demo.edu';

  const processed = ASSIGNMENTS.map((asg) => {
    let status = 'PENDING';
    if (isAnanya) {
      status = asg.statusForAnanya;
    } else if (isRahul) {
      status = asg.statusForRahul;
    } else {
      status = asg.statusForRahul; // default for other demo students
    }

    return {
      id: asg.id,
      title: asg.title,
      subject: asg.subject,
      code: asg.code,
      description: asg.description,
      dueDate: asg.dueDate,
      totalMarks: asg.totalMarks,
      facultyName: asg.facultyName,
      status
    };
  });

  const pendingCount = processed.filter((a) => a.status === 'PENDING').length;
  const overdueCount = processed.filter((a) => a.status === 'OVERDUE').length;
  const submittedCount = processed.filter((a) => a.status === 'SUBMITTED').length;

  return {
    assignments: processed,
    pendingCount,
    overdueCount,
    submittedCount,
    totalCount: processed.length
  };
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
