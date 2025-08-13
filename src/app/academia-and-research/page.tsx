"use client";

import React from "react";

const researchPapers = [
  {
    title: "The Proof-of-Problem Protocol Whitepaper",
    authors: "Sharvan Kumar et al.",
    year: 2025,
    link: "/papers/popp-whitepaper.pdf",
  },
  {
    title: "Decentralized Validation in Real-World Problem Solving",
    authors: "Research Team",
    year: 2025,
    link: "https://arxiv.org/abs/1234.5678",
  },
  // Add more papers here...
];

const collaborations = [
  { name: "University of Blockchain", website: "https://blockchain.edu" },
  { name: "Open Research Lab", website: "https://openresearchlab.org" },
  // Add more collaborators here...
];

const AcademiaResearch: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      {/* Hero Section */}
      <header className="mb-16 text-center">
        <h1 className="text-5xl font-extrabold mb-4 text-indigo-700 dark:text-indigo-400">
          Academia & Research
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
          PoPP is grounded in rigorous academic research and collaboration with leading institutions. Explore our research, papers, and partnerships that push the boundaries of decentralized problem-solving.
        </p>
      </header>

      {/* Research Areas */}
      <section className="mb-14">
        <h2 className="text-3xl font-semibold mb-6 text-indigo-600 dark:text-indigo-300">
          Research Areas
        </h2>
        <ul className="list-disc list-inside space-y-2 text-gray-800 dark:text-gray-200 max-w-3xl mx-auto">
          <li>Decentralized Verification and Validation Methods</li>
          <li>Scalable Consensus Protocols for Real-World Problems</li>
          <li>Game Theory in Distributed Escalation Systems</li>
          <li>Trustless Reputation Systems and Incentives</li>
          <li>Blockchain and Smart Contract Integration</li>
        </ul>
      </section>

      {/* Publications */}
      <section className="mb-14">
        <h2 className="text-3xl font-semibold mb-6 text-indigo-600 dark:text-indigo-300">
          Publications & Papers
        </h2>
        <div className="space-y-4 max-w-3xl mx-auto">
          {researchPapers.map(({ title, authors, year, link }, idx) => (
            <a
              key={idx}
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="block p-5 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-lg transition-shadow bg-white dark:bg-gray-900"
            >
              <h3 className="text-xl font-semibold text-indigo-700 dark:text-indigo-400">{title}</h3>
              <p className="text-gray-600 dark:text-gray-400">{authors} &middot; {year}</p>
            </a>
          ))}
        </div>
      </section>

      {/* Collaborations */}
      <section className="mb-14">
        <h2 className="text-3xl font-semibold mb-6 text-indigo-600 dark:text-indigo-300">
          Collaborations & Partners
        </h2>
        <ul className="flex flex-wrap gap-6 justify-center max-w-3xl mx-auto">
          {collaborations.map(({ name, website }, idx) => (
            <li key={idx} className="bg-indigo-100 dark:bg-indigo-900 rounded-lg px-6 py-3 shadow-md hover:shadow-lg transition-shadow">
              <a
                href={website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-800 dark:text-indigo-300 font-medium"
              >
                {name}
              </a>
            </li>
          ))}
        </ul>
      </section>

      {/* Resources & CTA */}
      <section className="text-center max-w-3xl mx-auto">
        <h2 className="text-3xl font-semibold mb-6 text-indigo-600 dark:text-indigo-300">
          Resources & Get Involved
        </h2>
        <p className="mb-6 text-gray-700 dark:text-gray-300">
          Access datasets, tools, and contribute to advancing research with PoPP.
        </p>
        <a
          href="/research-contribute"
          className="inline-block px-8 py-4 bg-indigo-600 text-white rounded-lg font-semibold shadow hover:bg-indigo-700 transition"
        >
          Join Our Research Program
        </a>
      </section>
    </div>
  );
};

export default AcademiaResearch;
