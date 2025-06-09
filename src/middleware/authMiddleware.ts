import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export const requireRole = (allowedRoles: string[]) => async () => {
  const session = await getServerSession(authOptions);
  if (
    !session ||
    !session.user.role ||
    !allowedRoles.includes(session.user.role)
  ) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 403 });
  }
  return session;
};