"use client";
import React from "react";

const TrustIndicators = () => {
  const partners = [
    "Student Placement Cell", "Career Development Centers", "University Partners", "Industry Leaders", "Startup Ecosystem"
  ];

  return (
    <div className="mt-16">
      <p className="text-center text-neutral-500 mb-8">Trusted by educational institutions and industry partners</p>
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