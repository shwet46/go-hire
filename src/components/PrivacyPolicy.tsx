"use client";
import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-900 to-violet-950/20 pt-20">
      <div className="max-w-4xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-white mt-10 mb-4 bg-gradient-to-r from-violet-400 via-indigo-400 to-pink-400 bg-clip-text text-transparent">
            Privacy Policy
          </h1>
          <p className="text-zinc-400">Last updated: May 25, 2025</p>
        </div>

        <div className="prose prose-zinc prose-invert max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-zinc-100 mb-4">Introduction</h2>
            <p>
              Welcome to GoHire (&ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;us&rdquo;). We respect your privacy and are committed to protecting your personal data.
              This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our job portal platform and services.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-zinc-100 mb-4">Information We Collect</h2>
            
            <h3 className="text-xl font-medium text-zinc-200 mb-2">Personal Data</h3>
            <p>We collect the following personal data:</p>
            <ul className="list-disc pl-6 mb-4">
              <li className="mb-2"><strong className="text-zinc-200">Email Address</strong>: Used for account authentication, communication, and account recovery.</li>
              <li className="mb-2"><strong className="text-zinc-200">Profile Information</strong>: Such as your name, resume, skills, education, and work experience (for job seekers), or company details (for recruiters).</li>
            </ul>

            <h3 className="text-xl font-medium text-zinc-200 mb-2">Automatically Collected Information</h3>
            <p>When you visit our website, we automatically collect certain information about your device, including:</p>
            <ul className="list-disc pl-6">
              <li>IP address</li>
              <li>Browser type and version</li>
              <li>Pages visited</li>
              <li>Time and date of your visit</li>
              <li>Time spent on pages</li>
              <li>Referral source</li>
            </ul>
            <p className="mt-2">This information helps us improve our platform and provide a better user experience.</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-zinc-100 mb-4">How We Use Your Information</h2>
            <p>We use your information for the following purposes:</p>
            <ul className="list-disc pl-6">
              <li>Account creation and authentication</li>
              <li>Enabling job applications and recruiter postings</li>
              <li>Sending important notifications about your account or our services</li>
              <li>Responding to your inquiries or requests</li>
              <li>Sending periodic emails regarding jobs, applications, or platform updates (if you opt-in)</li>
              <li>Protecting our services and users from fraudulent activity</li>
              <li>Improving our platform and user experience</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-zinc-100 mb-4">Data Security</h2>
            <p>
              We implement appropriate technical and organizational measures to protect your personal data against unauthorized or unlawful processing,
              accidental loss, destruction, or damage. However, no method of transmission over the Internet or electronic storage is 100% secure,
              so we cannot guarantee absolute security.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-zinc-100 mb-4">Cookies and Tracking Technologies</h2>
            <p>
              We use cookies and similar tracking technologies to track activity on our platform and hold certain information.
              Cookies are files with small amounts of data that may include an anonymous unique identifier. You can instruct your browser to refuse all cookies
              or to indicate when a cookie is being sent.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-zinc-100 mb-4">Third-Party Services</h2>
            <p>We do not sell, trade, or otherwise transfer your personal data to outside parties except as described below:</p>
            <ul className="list-disc pl-6">
              <li>Service providers who assist us in operating our platform and conducting our business</li>
              <li>Legal authorities when required by law or to protect our rights</li>
              <li>In the event of a merger, acquisition, or asset sale, your personal data may be transferred</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-zinc-100 mb-4">Your Data Protection Rights</h2>
            <p>Depending on your location, you may have the following rights regarding your personal data:</p>
            <ul className="list-disc pl-6">
              <li>Right to access and receive a copy of your personal data</li>
              <li>Right to rectification of inaccurate personal data</li>
              <li>Right to erasure of your personal data</li>
              <li>Right to restrict processing of your personal data</li>
              <li>Right to data portability</li>
              <li>Right to object to processing of your personal data</li>
              <li>Right to withdraw consent</li>
            </ul>
            <p className="mt-2">To exercise any of these rights, please contact us using the information provided below.</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-zinc-100 mb-4">Children&apos;s Privacy</h2>
            <p>
              Our services are not intended for individuals under the age of 13. We do not knowingly collect personal data from children under 13.
              If you become aware that a child has provided us with personal data, please contact us.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-zinc-100 mb-4">Changes to This Privacy Policy</h2>
            <p>
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page
              and updating the &ldquo;Last updated&rdquo; date. You are advised to review this Privacy Policy periodically for any changes.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-zinc-100 mb-4">Contact Us</h2>
            <p>If you have any questions about this Privacy Policy, please contact us at:</p>
            <ul className="list-none pl-0 mt-2">
              <li><strong className="text-zinc-200">Email:</strong> support@gohire.com</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;