import React from 'react';
import TermsOfUse from '@/components/TermsOfUse';

export const metadata = {
  title: 'Terms of Use | Axivo',
  description: 'Terms of Use for Axivo',
};

export default function PrivacyPage() {
  return (
    <main>
      <TermsOfUse />
    </main>
  );
}