"use client";
import React from 'react';

const TermsOfUse = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-900 to-violet-950/20 pt-20">
      <div className="max-w-4xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-white mt-10 mb-4 bg-gradient-to-r from-violet-400 via-indigo-400 to-pink-400 bg-clip-text text-transparent">
            Terms of Use
          </h1>
          <p className="text-zinc-400">Last updated: May 25, 2025</p>
        </div>

        <div className="prose prose-zinc prose-invert max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-zinc-100 mb-4">Acceptance of Terms</h2>
            <p>
              By accessing or using GoHire (&ldquo;we&rdquo;, &ldquo;our&rdquo;, &ldquo;us&rdquo;), you agree to be bound by these Terms of Use and all applicable laws and regulations. If you do not agree, please do not use our platform.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-zinc-100 mb-4">User Accounts</h2>
            <ul className="list-disc pl-6">
              <li>You must provide accurate and complete information when creating an account.</li>
              <li>You are responsible for maintaining the confidentiality of your account credentials.</li>
              <li>You are responsible for all activities that occur under your account.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-zinc-100 mb-4">Use of Platform</h2>
            <ul className="list-disc pl-6">
              <li>You may use GoHire only for lawful purposes and in accordance with these Terms.</li>
              <li>You agree not to use the platform to post or transmit any unlawful, harmful, or misleading content.</li>
              <li>We reserve the right to suspend or terminate your account for violations of these Terms.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-zinc-100 mb-4">Intellectual Property</h2>
            <p>
              All content, trademarks, logos, and intellectual property on GoHire are owned by us or our licensors. You may not use, copy, or distribute any content without our written permission.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-zinc-100 mb-4">Job Postings & Applications</h2>
            <ul className="list-disc pl-6">
              <li>Recruiters must provide accurate job and internship postings.</li>
              <li>Applicants must provide truthful information in their applications.</li>
              <li>We are not responsible for the outcome of any job application or hiring process.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-zinc-100 mb-4">Limitation of Liability</h2>
            <p>
              GoHire is provided &ldquo;as is&rdquo; without warranties of any kind. We are not liable for any damages arising from your use of the platform.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-zinc-100 mb-4">Changes to Terms</h2>
            <p>
              We may update these Terms of Use at any time. Changes will be posted on this page with an updated &ldquo;Last updated&rdquo; date. Continued use of GoHire after changes constitutes acceptance of the new terms.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-zinc-100 mb-4">Contact Us</h2>
            <p>If you have any questions about these Terms, please contact us at:</p>
            <ul className="list-none pl-0 mt-2">
              <li><strong className="text-zinc-200">Email:</strong> support@gohire.com</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsOfUse;