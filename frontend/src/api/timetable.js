import { TIMETABLE } from '../mock/db';
import { getCurrentUser } from './auth';

const delay = (ms = 160) => new Promise((resolve) => setTimeout(resolve, ms));

const getDayName = () => {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const today = days[new Date().getDay()];
  // For demo realism on weekends, fallback to Monday if today is Sunday
  return today === 'Sunday' ? 'Monday' : today;
};

export const getMyTimetable = async () => {
  await delay();
  const currentUser = getCurrentUser();
  if (!currentUser) throw new Error('Unauthenticated');

  if (currentUser.role === 'STUDENT') {
    return TIMETABLE;
  }

  if (currentUser.role === 'FACULTY') {
    return TIMETABLE.filter((slot) => slot.facultyId === currentUser.id);
  }

  return TIMETABLE;
};

export const getClassesToday = async () => {
  await delay();
  const currentUser = getCurrentUser();
  if (!currentUser) throw new Error('Unauthenticated');

  const currentDay = getDayName();
  let daySlots = TIMETABLE.filter((slot) => slot.day === currentDay);

  if (currentUser.role === 'FACULTY') {
    daySlots = daySlots.filter((slot) => slot.facultyId === currentUser.id);
  }

  return {
    day: currentDay,
    count: daySlots.length,
    slots: daySlots,
    nextClass: daySlots[0] || null
  };
};
