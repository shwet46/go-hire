'use client';
import React from 'react';

const TrustIndicators = () => {
  const partners = [
    'Y Combinator Startups',
    'Top Engineering Colleges',
    'Freelancer Networks',
    'Student Communities',
    'Startup Accelerators',
  ];

  return (
    <div className="mt-16">
      <p className="text-center text-neutral-500 mb-8">
        Trusted by startups, students, and educational institutions
      </p>
      <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
        {partners.map((partner, index) => (
          <div key={index} className="text-neutral-400 font-medium text-sm">
            {partner}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrustIndicators;
