"use client";

import React from "react";

const resources = [
  {
    title: "Getting Started with PoPP",
    description: "Introductory tutorial to understand PoPP protocol basics.",
    link: "/tutorials/getting-started",
  },
  {
    title: "PoPP API Guide",
    description: "Comprehensive API documentation and usage examples.",
    link: "/api-reference",
  },
  {
    title: "Smart Contract Workshop",
    description: "Hands-on workshop for building smart contracts with PoPP.",
    link: "/workshops/smart-contracts",
  },
];

const challenges = [
  {
    title: "Submit Your First Problem",
    description: "Create and submit a real-world problem in PoPP system.",
    link: "/challenges/submit-problem",
  },
  {
    title: "Vote and Validate",
    description: "Participate by voting and validating others’ problems.",
    link: "/challenges/vote-validate",
  },
  {
    title: "Build a DApp",
    description: "Develop a decentralized app integrated with PoPP.",
    link: "/challenges/build-dapp",
  },
];

const communityLinks = [
  { name: "Discord Server", url: "https://discord.gg/popp" },
  { name: "GitHub Repo", url: "https://github.com/popp-project" },
  { name: "Forum", url: "https://forum.popp.io" },
];

const StudentZone: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      {/* Header */}
      <header className="text-center mb-16">
        <h1 className="text-5xl font-extrabold mb-4 text-gradient bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 bg-clip-text text-transparent">
          Student Zone
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
          Welcome to the PoPP Student Zone! Here you'll find resources, challenges,
          and community links to help you learn, contribute, and grow.
        </p>
      </header>

      {/* Resources */}
      <section className="mb-16">
        <h2 className="text-3xl font-semibold mb-8 text-blue-600 dark:text-blue-400">
          Learning Resources
        </h2>
        <div className="grid gap-8 md:grid-cols-3">
          {resources.map(({ title, description, link }, idx) => (
            <a
              key={idx}
              href={link}
              className="block p-6 bg-white dark:bg-gray-900 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200 dark:border-gray-700"
              target="_blank"
              rel="noopener noreferrer"
            >
              <h3 className="text-xl font-semibold mb-2 text-blue-700 dark:text-blue-300">
                {title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">{description}</p>
            </a>
          ))}
        </div>
      </section>

      {/* Challenges */}
      <section className="mb-16">
        <h2 className="text-3xl font-semibold mb-8 text-purple-600 dark:text-purple-400">
          Challenges
        </h2>
        <div className="space-y-6 max-w-3xl mx-auto">
          {challenges.map(({ title, description, link }, idx) => (
            <a
              key={idx}
              href={link}
              className="block p-5 border border-purple-300 dark:border-purple-700 rounded-lg hover:bg-purple-50 dark:hover:bg-purple-900 transition"
              target="_blank"
              rel="noopener noreferrer"
            >
              <h3 className="text-lg font-semibold text-purple-700 dark:text-purple-300">
                {title}
              </h3>
              <p className="text-purple-800 dark:text-purple-400">{description}</p>
            </a>
          ))}
        </div>
      </section>

      {/* Community */}
      <section className="mb-8 text-center">
        <h2 className="text-3xl font-semibold mb-6 text-pink-600 dark:text-pink-400">
          Join the Community
        </h2>
        <p className="mb-8 text-gray-700 dark:text-gray-300 max-w-xl mx-auto">
          Connect with fellow students and contributors on our channels.
        </p>
        <div className="flex justify-center gap-8 flex-wrap">
          {communityLinks.map(({ name, url }, idx) => (
            <a
              key={idx}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-pink-500 text-white rounded-lg font-semibold hover:bg-pink-600 transition"
            >
              {name}
            </a>
          ))}
        </div>
      </section>
    </div>
  );
};

export default StudentZone;
