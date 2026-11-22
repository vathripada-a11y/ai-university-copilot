import { ATTENDANCE, TIMETABLE } from '../mock/db';
import { getCurrentUser } from './auth';

const delay = (ms = 180) => new Promise((resolve) => setTimeout(resolve, ms));

export const getMyAttendance = async () => {
  await delay();
  const currentUser = getCurrentUser();
  if (!currentUser || currentUser.role !== 'STUDENT') {
    throw new Error('Unauthorized: Student session required.');
  }

  // Retrieve attendance for the current student
  const studentRecords = ATTENDANCE[currentUser.id] || ATTENDANCE['stu-1'] || [];

  let totalAttended = 0;
  let totalClasses = 0;
  const subjects = studentRecords.map((rec) => {
    totalAttended += rec.attended;
    totalClasses += rec.total;
    const pct = parseFloat(((rec.attended / rec.total) * 100).toFixed(1));
    return {
      ...rec,
      percentage: pct,
      isLowAttendance: pct < 75.0,
      shortageCount: pct < 75.0 ? Math.ceil((0.75 * rec.total - rec.attended) / 0.25) : 0
    };
  });

  const overallPercentage = totalClasses > 0
    ? parseFloat(((totalAttended / totalClasses) * 100).toFixed(1))
    : 0;

  const lowAttendanceSubjects = subjects.filter((s) => s.isLowAttendance);

  return {
    overallPercentage,
    totalAttended,
    totalClasses,
    subjects,
    hasWarning: lowAttendanceSubjects.length > 0,
    lowAttendanceSubjects
  };
};

export const getFacultyAttendanceStats = async () => {
  await delay();
  const currentUser = getCurrentUser();
  if (!currentUser || currentUser.role !== 'FACULTY') {
    throw new Error('Unauthorized: Faculty session required.');
  }

  // Simulated stats for faculty dashboard
  return {
    pendingToMarkCount: 1, // e.g., today's morning DBMS lecture pending attendance marking
    classesMarkedThisWeek: 8,
    averageClassAttendance: 84.5
  };
};
