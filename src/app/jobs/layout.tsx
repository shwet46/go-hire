import type { Metadata } from 'next';
import '../globals.css';

export const metadata: Metadata = {
  title: 'Jobs - GoHire',
  description: 'Find your next opportunity with innovative startups and growing companies',
};

export default function JobsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
