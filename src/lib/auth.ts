import { getServerSession } from 'next-auth';
import { authOptions } from '@/auth'; // Adjust path as needed

export async function getSession() {
  return await getServerSession(authOptions);
}

export async function getCurrentUser() {
  const session = await getSession();
  return session?.user;
}

// Role-based authorization helpers
export async function isAdmin() {
  const user = await getCurrentUser();
  return user?.role === 'admin';
}

export async function isRecruiter() {
  const user = await getCurrentUser();
  return user?.role === 'recruiter';
}

export async function isStudent() {
  const user = await getCurrentUser();
  return user?.role === 'student';
}