'use client';
import { usePathname } from 'next/navigation';
import { Navbar } from './Navbar';

export function ConditionalNavbar() {
  const pathname = usePathname();
  
  // Routes where navbar should be hidden
  const authRoutes = [
    '/auth/signin',
    '/auth/signup', 
    '/auth/register',
    '/auth/login',
    '/signin',
    '/signup',
    '/register',
    '/login'
  ];
  
  const shouldHideNavbar = authRoutes.some(route => pathname?.startsWith(route));
  
  if (shouldHideNavbar) {
    return null;
  }
  
  return <Navbar />;
}
