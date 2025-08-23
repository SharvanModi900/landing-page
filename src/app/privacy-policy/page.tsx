'use client';
import React from "react";

export default function PrivacyPolicyPage() {
  const sections = [
    {
      id: "introduction",
      title: "1. Introduction",
      content: `The Proof-of-Problem Protocol (PoPP) values your privacy. This Privacy Policy 
      describes how we collect, use, and protect your personal information when you 
      interact with our platform and services.`,
    },
    {
      id: "data-we-collect",
      title: "2. Data We Collect",
      content: `We may collect the following categories of information:\n
      • Account information (name, email, organization)\n
      • Problem submissions and related metadata\n
      • Usage data (logs, device type, IP address)\n
      • Cookies and tracking technologies for analytics.`,
    },
    {
      id: "how-we-use-data",
      title: "3. How We Use Your Data",
      content: `PoPP uses collected data to:\n
      • Provide and improve our services\n
      • Ensure security and fraud prevention\n
      • Support research and transparency\n
      • Communicate updates, changes, or opportunities.`,
    },
    {
      id: "data-sharing",
      title: "4. Data Sharing",
      content: `We do not sell your personal information. Data may be shared with:\n
      • Service providers assisting with hosting and analytics\n
      • Research collaborators with anonymized datasets\n
      • Regulators if required by law.`,
    },
    {
      id: "data-protection",
      title: "5. Data Protection",
      content: `We implement industry-standard security practices including:\n
      • End-to-end encryption where applicable\n
      • Pseudonymization of sensitive data\n
      • Role-based access controls\n
      • Regular audits and penetration testing.`,
    },
    {
      id: "your-rights",
      title: "6. Your Rights",
      content: `Depending on your jurisdiction, you may have rights to:\n
      • Access your data\n
      • Correct inaccuracies\n
      • Request deletion\n
      • Object to processing\n
      • Data portability.\n
      Contact us to exercise these rights.`,
    },
    {
      id: "retention",
      title: "7. Data Retention",
      content: `We retain data only as long as necessary for the purposes described in this 
      policy or as required by law. Anonymized data may be retained for research.`,
    },
    {
      id: "contact",
      title: "8. Contact",
      content: `If you have questions or concerns about this Privacy Policy, please contact 
      us at privacy@popp.org.`,
    },
  ];

  return (
    <div className="bg-slate-950 text-gray-100 min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border-b border-slate-800 overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 bg-[url('/patterns/security-pattern.svg')] opacity-5 bg-cover bg-center"></div>

        {/* Glow aura */}
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-gradient-to-r from-cyan-500/20 to-purple-500/20 blur-3xl"></div>

        <div className="max-w-6xl mx-auto px-6 md:px-12 py-24 relative grid md:grid-cols-2 gap-12 items-center">
          {/* Left: Content */}
          <div>
            <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 via-blue-300 to-purple-300">
              Privacy Policy
            </h1>
            <p className="text-lg text-gray-400 mt-6 max-w-xl">
              We are committed to safeguarding your personal information while ensuring 
              transparency in how your data is collected, stored, and used.
            </p>
            <p className="mt-8 text-sm text-gray-500">Last Updated: August 2025</p>
          </div>

          {/* Right: Illustration */}
          <div className="relative flex justify-center md:justify-end">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="w-64 h-64 text-cyan-300/80"
              fill="currentColor"
            >
              {/* Shield Lock Illustration */}
              <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 6c1.65 0 3 1.35 3 3 0 .74-.27 1.41-.72 1.93L12 18l-2.28-6.07A2.996 2.996 0 019 10c0-1.65 1.35-3 3-3z"/>
            </svg>
          </div>
        </div>
      </div>

      {/* Table of Contents */}
      <div className="max-w-5xl mx-auto px-6 md:px-12 py-12">
        <h2 className="text-2xl font-bold text-white mb-6">Table of Contents</h2>
        <ul className="grid sm:grid-cols-2 gap-4 text-gray-400">
          {sections.map((s) => (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                className="hover:text-cyan-400 transition-colors"
              >
                {s.title}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Sections */}
      <div className="max-w-5xl mx-auto px-6 md:px-12 py-12 space-y-16">
        {sections.map((s) => (
          <div key={s.id} id={s.id} className="scroll-mt-24">
            <h3 className="text-2xl font-semibold text-cyan-300 mb-4">
              {s.title}
            </h3>
            <p className="text-gray-300 leading-relaxed whitespace-pre-line">
              {s.content}
            </p>
          </div>
        ))}
      </div>

    
    </div>
  );
}
