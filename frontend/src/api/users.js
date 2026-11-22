import { USERS, SUBJECTS, NOTICES } from '../mock/db';
import { getCurrentUser } from './auth';

const delay = (ms = 160) => new Promise((resolve) => setTimeout(resolve, ms));

export const getAdminStats = async () => {
  await delay();
  const currentUser = getCurrentUser();
  if (!currentUser || currentUser.role !== 'ADMIN') {
    throw new Error('Unauthorized: Admin privilege required.');
  }

  const students = USERS.filter((u) => u.role === 'STUDENT');
  const faculty = USERS.filter((u) => u.role === 'FACULTY');

  return {
    totalStudents: students.length,
    totalFaculty: faculty.length,
    noticesPublished: NOTICES.length,
    activeUsers: USERS.length
  };
};

export const getFacultyOfferings = async () => {
  await delay();
  const currentUser = getCurrentUser();
  if (!currentUser || currentUser.role !== 'FACULTY') {
    throw new Error('Unauthorized: Faculty privilege required.');
  }

  const offerings = SUBJECTS.filter((sub) => sub.facultyId === currentUser.id);

  return {
    offerings,
    count: offerings.length
  };
};

export const getAllUsers = async () => {
  await delay();
  const currentUser = getCurrentUser();
  if (!currentUser || currentUser.role !== 'ADMIN') {
    throw new Error('Unauthorized: Admin privilege required.');
  }

  return USERS.map(({ password: _, ...user }) => user);
};
