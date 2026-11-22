import { NOTICES } from '../mock/db';
import { getCurrentUser } from './auth';

const delay = (ms = 150) => new Promise((resolve) => setTimeout(resolve, ms));

export const getMyNotices = async () => {
  await delay();
  const currentUser = getCurrentUser();
  if (!currentUser) throw new Error('Unauthenticated');

  let filtered = [];

  if (currentUser.role === 'ADMIN') {
    filtered = NOTICES;
  } else if (currentUser.role === 'STUDENT') {
    filtered = NOTICES.filter((n) =>
      ['ALL', 'STUDENTS', 'SECTION A'].includes(n.audience)
    );
  } else if (currentUser.role === 'FACULTY') {
    filtered = NOTICES.filter((n) =>
      ['ALL', 'FACULTY'].includes(n.audience)
    );
  }

  return filtered;
};

export const getAllNotices = async () => {
  await delay();
  const currentUser = getCurrentUser();
  if (!currentUser || currentUser.role !== 'ADMIN') {
    throw new Error('Unauthorized: Admin privilege required.');
  }
  return NOTICES;
};
