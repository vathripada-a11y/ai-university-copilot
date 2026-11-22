import { USERS } from '../mock/db';

const delay = (ms = 150) => new Promise((resolve) => setTimeout(resolve, ms));

export const loginApi = async (email, password) => {
  await delay(200);

  const normalizedEmail = (email || '').trim().toLowerCase();
  const user = USERS.find((u) => u.email.toLowerCase() === normalizedEmail);

  if (!user || user.password !== password) {
    throw new Error('Invalid email or password');
  }

  // Clone user without password
  const { password: _, ...safeUser } = user;
  sessionStorage.setItem('campus_user', JSON.stringify(safeUser));
  return safeUser;
};

export const logoutApi = async () => {
  await delay(100);
  sessionStorage.removeItem('campus_user');
  return { success: true };
};

export const getCurrentUser = () => {
  try {
    const raw = sessionStorage.getItem('campus_user');
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};
