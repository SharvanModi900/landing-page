'use client';
import React from 'react';

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
    <section className="bg-gradient-to-br from-slate-950 via-slate-900 to-black text-white min-h-screen">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-16 py-24 grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6 relative z-10">
            <h1 className="text-5xl md:text-6xl font-extrabold leading-tight bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400">
              PoPP Workshops
            </h1>
            <p className="text-gray-300 text-lg">
              Explore immersive workshops designed for activists, validators, civic leaders, and researchers. Learn, engage, and co-create solutions for real-world problems.
            </p>
            <div className="flex gap-4 mt-6">
              <button className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-xl shadow-lg hover:scale-105 transition-transform font-semibold">
                Join a Workshop
              </button>
              <button className="px-6 py-3 bg-white/10 border border-white/20 rounded-xl hover:bg-white/20 transition font-semibold">
                Explore Schedule
              </button>
            </div>
          </div>

          {/* Right Illustration */}
          <div className="relative flex justify-center">
            <svg viewBox="0 0 500 500" className="w-[380px] h-[380px] md:w-[450px] md:h-[450px]">
              <defs>
                <radialGradient id="glow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#00f6ff" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#7f5fff" stopOpacity="0" />
                </radialGradient>
              </defs>
              <circle cx="250" cy="250" r="200" fill="url(#glow)" />
              <path
                d="M100 250 C180 100, 320 100, 400 250 C320 400, 180 400, 100 250"
                stroke="#7f5fff"
                strokeWidth="4"
                fill="none"
                strokeLinecap="round"
              />
              {[0, 1, 2, 3].map((i) => (
                <circle
                  key={i}
                  r="12"
                  fill="#00f6ff"
                  className="animate-[orbit_8s_linear_infinite]"
                  style={{ animationDelay: `${i * 2}s` }}
                />
              ))}
              <style jsx>{`
                @keyframes orbit {
                  0% { offset-distance: 0%; }
                  100% { offset-distance: 100%; }
                }
                circle {
                  offset-path: path("M100 250 C180 100, 320 100, 400 250 C320 400, 180 400, 100 250");
                  offset-rotate: auto;
                }
              `}</style>
            </svg>
          </div>
        </div>
      </div>

      {/* Upcoming Workshops */}
      <div className="max-w-7xl mx-auto px-6 md:px-16 py-20">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
          Upcoming Workshops
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {upcomingWorkshops.map((ws, i) => (
            <div key={i} className="p-6 bg-gradient-to-br from-slate-800/60 to-slate-900/80 rounded-2xl shadow-lg border border-cyan-500/20 hover:scale-105 transition-transform">
              <h3 className="text-xl font-bold mb-2">{ws.title}</h3>
              <p className="text-gray-400 mb-1">{ws.date} • {ws.format}</p>
              <p className="text-gray-300 mb-4 text-sm">{ws.desc}</p>
              <button className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg font-semibold hover:scale-105 transition">
                Register
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-6 md:px-16 py-20">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          Why Join PoPP Workshops?
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((f, idx) => (
            <div key={idx} className="p-6 bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl shadow-lg border border-purple-500/20 hover:scale-105 transition">
              <div className="text-4xl mb-4">{f.icon}</div>
              <h3 className="font-bold text-lg mb-2">{f.title}</h3>
              <p className="text-gray-400 text-sm">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Process Flow */}
      <div className="bg-gradient-to-r from-cyan-900/30 to-purple-900/30 py-24">
        <div className="max-w-5xl mx-auto px-6 md:px-16">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            How Workshops Work
          </h2>
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            {[
              "Register",
              "Attend Live",
              "Submit Problems",
              "Collaborate",
              "Earn Rewards",
            ].map((step, i) => (
              <div key={i} className="flex flex-col items-center text-center relative">
                <div className="w-16 h-16 flex items-center justify-center rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 text-xl font-bold shadow-lg">
                  {i + 1}
                </div>
                <p className="mt-4 font-semibold">{step}</p>
                {i < 4 && (
                  <div className="hidden md:block absolute top-8 left-full w-24 h-[2px] bg-gradient-to-r from-cyan-500 to-purple-500"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-4xl mx-auto text-center px-6 py-24">
        <h2 className="text-4xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-orange-400">
          Ready to Join the Next PoPP Workshop?
        </h2>
        <p className="text-gray-300 mb-8">
          Be part of the global movement shaping decentralized trust and problem-solving.
        </p>
        <button className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl shadow-lg hover:scale-105 transition font-semibold text-lg">
          Register Now
        </button>
      </div>
    </section>
  );
}
