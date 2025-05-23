import React from 'react';
import PrivacyPolicy from '@/components/PrivacyPolicy';

export const metadata = {
  title: 'Privacy Policy | Axivo',
  description: 'Learn how Axivo protects your privacy and personal data.',
};

export default function PrivacyPage() {
  return (
    <main>
      <PrivacyPolicy />
    </main>
  );
}