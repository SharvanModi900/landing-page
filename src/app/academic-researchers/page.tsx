'use client';
import React from 'react';

export default function AcademicResearchersPage() {
  const features = [
    {
      title: "Access Verified Data",
      desc: "Researchers can leverage PoPP’s verified problem reports for accurate studies.",
      icon: "📊",
      gradient: "from-indigo-500 to-purple-500",
    },
    {
      title: "Collaborative Studies",
      desc: "Work with civic organizations and legal professionals to enhance research quality.",
      icon: "🤝",
      gradient: "from-green-400 to-teal-400",
    },
    {
      title: "Publication Ready",
      desc: "Export findings and proofs in structured, auditable formats for journals.",
      icon: "📝",
      gradient: "from-yellow-400 to-orange-400",
    },
  ];

  return (
    <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white min-h-screen py-24 px-6 md:px-16">
      
      {/* Hero Section */}
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-12">
        {/* Left Content */}
        <div className="flex-1 space-y-6">
          <h1 className="text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
            Empower Academic Research
          </h1>
          <p className="text-gray-300 text-lg md:text-xl">
            PoPP provides researchers with reliable, validated problem data that can be leveraged
            for studies, analysis, and publications. Ensure your research is grounded in real-world proof.
          </p>
          <button className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl shadow-lg hover:scale-105 transition-transform font-semibold">
            Explore Verified Data
          </button>
        </div>

        {/* Right Illustration */}
        <div className="flex-1 relative flex justify-center items-center">
          <div className="w-64 h-64 md:w-72 md:h-72 bg-gradient-to-tr from-indigo-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse-slow absolute"></div>
          <div className="w-40 h-40 md:w-48 md:h-48 border-4 border-gradient-to-r from-indigo-400 to-purple-400 rounded-full flex items-center justify-center text-3xl md:text-4xl font-bold text-white">
            📚
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-5xl mx-auto mt-16 grid sm:grid-cols-1 md:grid-cols-3 gap-6">
        {features.map((f, idx) => (
          <div
            key={idx}
            className={`p-6 rounded-2xl bg-gradient-to-br ${f.gradient} shadow-lg hover:scale-105 transition-transform`}
          >
            <div className="text-4xl mb-4">{f.icon}</div>
            <h3 className="font-bold text-xl mb-2">{f.title}</h3>
            <p className="text-gray-100 text-sm">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
