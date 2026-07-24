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
    <div className="bg-[#030712] text-gray-100 min-h-screen">
      <div className="pt-16">
        {/* Hero Section */}
        <div className="border-b border-white/10">
          <div className="max-w-5xl mx-auto px-6 py-12">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Privacy Policy
              </span>
            </h1>
            <p className="text-gray-400 mt-4 max-w-xl">
              We are committed to safeguarding your personal information while ensuring 
              transparency in how your data is collected, stored, and used.
            </p>
            <p className="mt-4 text-sm text-gray-500">Last Updated: August 2025</p>
          </div>
        </div>

        {/* Table of Contents */}
        <div className="max-w-5xl mx-auto px-6 py-8">
          <h2 className="text-xl font-bold text-white mb-4">Table of Contents</h2>
          <ul className="grid sm:grid-cols-2 gap-3 text-gray-400">
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
        <div className="max-w-5xl mx-auto px-6 py-8 space-y-8">
          {sections.map((s) => (
            <div key={s.id} id={s.id} className="scroll-mt-24">
              <h3 className="text-xl font-semibold text-cyan-400 mb-3">
                {s.title}
              </h3>
              <p className="text-gray-400 leading-relaxed whitespace-pre-line">
                {s.content}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
