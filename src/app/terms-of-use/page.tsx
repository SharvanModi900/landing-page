'use client';
import React from "react";

export default function TermsOfUsePage() {
  const sections = [
    {
      id: "introduction",
      title: "1. Introduction",
      content: `Welcome to the Proof-of-Problem Protocol (PoPP). These Terms of Use 
      ("Terms") govern your access to and use of our platform, services, and tools. 
      By using PoPP, you agree to be bound by these Terms. If you do not agree, you 
      must discontinue use immediately.`,
    },
    {
      id: "eligibility",
      title: "2. Eligibility",
      content: `You must be at least 18 years old or the legal age of majority in your 
      jurisdiction to use PoPP. By accessing our platform, you represent that you 
      meet these requirements.`,
    },
    {
      id: "user-responsibilities",
      title: "3. User Responsibilities",
      content: `You agree to use PoPP in a lawful manner and not to misuse the platform. 
      Misuse includes, but is not limited to: submitting false problems, interfering 
      with security features, or violating applicable laws.`,
    },
    {
      id: "intellectual-property",
      title: "4. Intellectual Property",
      content: `All content, branding, and intellectual property associated with PoPP 
      are owned by the PoPP Foundation or its licensors. Unauthorized reproduction, 
      distribution, or modification is prohibited.`,
    },
    {
      id: "disclaimers",
      title: "5. Disclaimers",
      content: `PoPP is provided "as-is" and without warranties of any kind. We do not 
      guarantee that the platform will be error-free, secure, or uninterrupted.`,
    },
    {
      id: "liability",
      title: "6. Limitation of Liability",
      content: `To the maximum extent permitted by law, PoPP and its affiliates shall not 
      be liable for any indirect, incidental, or consequential damages arising from 
      your use of the platform.`,
    },
    {
      id: "governing-law",
      title: "7. Governing Law",
      content: `These Terms shall be governed by and construed in accordance with the 
      laws of your jurisdiction, without regard to conflict of law principles.`,
    },
    {
      id: "contact",
      title: "8. Contact",
      content: `If you have questions about these Terms, please contact us at 
      legal@popp.org.`,
    },
  ];

  return (
    <div className="min-h-screen bg-[#030712] text-white">
      <div className="pt-16">
        {/* Hero Section */}
        <div className="border-b border-white/10 py-12">
          <div className="max-w-6xl mx-auto px-6">
            <h1 className="text-5xl font-extrabold">
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Terms of Use
              </span>
            </h1>
            <p className="text-gray-400 mt-4 max-w-xl">
              Please read these terms carefully — they outline your rights, responsibilities, 
              and the rules for engaging with the Proof-of-Problem Protocol (PoPP).
            </p>
            <p className="mt-4 text-sm text-gray-500">Last Updated: August 2025</p>
          </div>
        </div>

        {/* Table of Contents */}
        <div className="max-w-5xl mx-auto px-6 py-8">
          <h2 className="text-2xl font-bold text-white mb-4">Table of Contents</h2>
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
              <h3 className="text-2xl font-semibold text-cyan-400 mb-3">
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
