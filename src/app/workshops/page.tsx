'use client';
import React from 'react';
import Link from 'next/link';

export default function WorkshopsPage() {
  const upcomingWorkshops = [
    {
      title: "Intro to PoPP Protocol",
      date: "Sep 15, 2025",
      format: "Online",
      desc: "Understand the fundamentals of Proof-of-Problem Protocol and how it empowers global civic action.",
    },
    {
      title: "Validators & Proofers Deep Dive",
      date: "Oct 2, 2025",
      format: "Hybrid",
      desc: "Hands-on technical workshop on validator setup, proofer workflows, and governance mechanisms.",
    },
    {
      title: "Civic Impact Lab",
      date: "Oct 20, 2025",
      format: "In-Person",
      desc: "Collaborative workshop for NGOs, activists, and civic leaders to solve real-world challenges with PoPP.",
    },
  ];

  const features = [
    { icon: "🎓", title: "Skill Building", desc: "Gain practical knowledge of blockchain governance, problem validation, and digital trust." },
    { icon: "🌐", title: "Networking", desc: "Connect with validators, civic leaders, technologists, and global NGOs." },
    { icon: "⚡", title: "Hands-On Learning", desc: "Participate in live simulations and problem-solving exercises." },
    { icon: "🏆", title: "Earn Recognition", desc: "Get certified badges and PoPP tokens for your contributions." },
  ];

  return (
    <div className="min-h-screen bg-[#030712] text-white overflow-x-hidden">
      <div className="pt-16">
        {/* Hero Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold leading-tight">
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                PoPP Workshops
              </span>
            </h1>
            <p className="text-gray-400 text-lg mt-4">
              Explore immersive workshops designed for activists, validators, civic leaders, and researchers. Learn, engage, and co-create solutions for real-world problems.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 mt-4">
              <button className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl font-semibold">
                Join a Workshop
              </button>
              <button className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl font-semibold">
                Explore Schedule
              </button>
            </div>
          </div>
        </div>

        {/* Upcoming Workshops */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center">
            Upcoming Workshops
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {upcomingWorkshops.map((ws, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-5">
                <h3 className="text-lg font-bold mb-2">{ws.title}</h3>
                <p className="text-gray-400 text-sm mb-1">{ws.date} • {ws.format}</p>
                <p className="text-gray-400 text-sm mb-3">{ws.desc}</p>
                <button className="px-3 py-1.5 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg font-semibold text-sm">
                  Register
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Features Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center">
            Why Join PoPP Workshops?
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, idx) => (
              <div key={idx} className="bg-white/5 border border-white/10 rounded-xl p-5">
                <div className="text-3xl mb-3">{f.icon}</div>
                <h3 className="font-bold text-lg mb-1">{f.title}</h3>
                <p className="text-gray-400 text-sm">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Process Flow */}
        <div className="bg-white/[0.03] border-y border-white/[0.06] py-12">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8">
              How Workshops Work
            </h2>
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              {[
                "Register",
                "Attend Live",
                "Submit Problems",
                "Collaborate",
                "Earn Rewards",
              ].map((step, i) => (
                <div key={i} className="flex flex-col items-center text-center relative">
                  <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-lg font-bold">
                    {i + 1}
                  </div>
                  <p className="mt-3 font-semibold text-sm">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 py-12">
          <h2 className="text-2xl sm:text-4xl font-extrabold mb-4">
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Ready to Join the Next PoPP Workshop?
            </span>
          </h2>
          <p className="text-gray-400 mb-6">
            Be part of the global movement shaping decentralized trust and problem-solving.
          </p>
          <button className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl font-semibold">
            Register Now
          </button>
        </div>
      </div>
    </div>
  );
}
