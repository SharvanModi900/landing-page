'use client';
import React from "react";

export default function TermsOfUsePage() {
  const sections = [
    {
      id: "introduction",
      title: "1. Introduction",
      content: `Welcome to the Proof-of-Problem Protocol (PoPP). These Terms of Use 
      (“Terms”) govern your access to and use of our platform, services, and tools. 
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
      content: `PoPP is provided “as-is” and without warranties of any kind. We do not 
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
    <div className="bg-slate-950 text-gray-100 min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border-b border-slate-800 overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 bg-[url('/patterns/legal-pattern.svg')] opacity-5 bg-cover bg-center"></div>

        {/* Glow circle */}
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-gradient-to-r from-purple-500/20 to-cyan-500/20 blur-3xl"></div>

        <div className="max-w-6xl mx-auto px-6 md:px-12 py-24 relative grid md:grid-cols-2 gap-12 items-center">
          {/* Left: Hero Content */}
          <div>
            <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-300 via-blue-300 to-cyan-300">
              Terms of Use
            </h1>
            <p className="text-lg text-gray-400 mt-6 max-w-xl">
              Please read these terms carefully — they outline your rights, responsibilities, 
              and the rules for engaging with the Proof-of-Problem Protocol (PoPP).
            </p>
            <p className="mt-8 text-sm text-gray-500">Last Updated: August 2025</p>
          </div>

          {/* Right: Illustration */}
          <div className="relative flex justify-center md:justify-end">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              className="w-64 h-64 text-purple-300/80"
              fill="currentColor"
            >
              {/* Justice Scales Illustration */}
              <path d="M256 32c-17.7 0-32 14.3-32 32v16h64V64c0-17.7-14.3-32-32-32zm0 96c-8.8 0-16 7.2-16 16v24H128c-8.8 0-16 7.2-16 16s7.2 16 16 16h112v64h-48c-8.8 0-16 7.2-16 16 0 3 1.2 6 3.5 8.5L240 376v72h-64c-17.7 0-32 14.3-32 32s14.3 32 32 32h160c17.7 0 32-14.3 32-32s-14.3-32-32-32h-64v-72l112.5-128.5c2.3-2.5 3.5-5.5 3.5-8.5 0-8.8-7.2-16-16-16h-48v-64h112c8.8 0 16-7.2 16-16s-7.2-16-16-16H272v-24c0-8.8-7.2-16-16-16z"/>
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
                className="hover:text-blue-400 transition-colors"
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
            <h3 className="text-2xl font-semibold text-purple-300 mb-4">
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
