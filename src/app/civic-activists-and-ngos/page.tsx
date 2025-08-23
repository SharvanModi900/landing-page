// 'use client';
// import React from 'react';

// export default function CivicActivistsPage() {
//   const features = [
//     { title: "Document Issues", desc: "Capture events, evidence, and reports securely and immutably.", icon: "📄", gradient: "from-purple-500 to-pink-500" },
//     { title: "Escalate Problems", desc: "Push verified issues to authorities, media, and community channels.", icon: "⚡", gradient: "from-blue-400 to-cyan-400" },
//     { title: "Community Validation", desc: "Engage citizens to verify reports and strengthen credibility.", icon: "🤝", gradient: "from-green-400 to-teal-400" },
//     { title: "Media Amplification", desc: "Share verified content with press and NGOs for wider impact.", icon: "📰", gradient: "from-yellow-400 to-orange-400" },
//   ];

//   return (
//     <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-black text-white min-h-screen">
//       {/* Hero Section */}
//       <div className="max-w-7xl mx-auto px-6 md:px-16 py-24 grid md:grid-cols-2 gap-12 items-center">
//         {/* Left Content */}
//         <div className="space-y-6">
//           <h1 className="text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400">
//             Empower Civic Activists & NGOs
//           </h1>
//           <p className="text-gray-300 text-lg md:text-xl">
//             PoPP provides activists and NGOs with tools to document, validate, and escalate problems
//             securely, transparently, and efficiently—turning local issues into global impact.
//           </p>
//           <div className="flex gap-4 mt-6">
//             <button className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl shadow-lg hover:scale-105 transition-transform font-semibold">
//               Submit a Problem
//             </button>
//             <button className="px-6 py-3 bg-white/10 border border-white/20 rounded-xl hover:bg-white/20 transition font-semibold">
//               Learn More
//             </button>
//           </div>
//         </div>

//         {/* Right SVG Flow */}
//         <div className="relative flex justify-center">
//           <svg
//             viewBox="0 0 400 400"
//             className="w-96 h-96"
//           >
//             {/* Glow background circle */}
//             <circle cx="200" cy="200" r="150" fill="url(#grad1)" opacity="0.2" />

//             {/* Define gradients */}
//             <defs>
//               <linearGradient id="grad1" x1="0" y1="0" x2="1" y2="1">
//                 <stop offset="0%" stopColor="#7f5fff" />
//                 <stop offset="100%" stopColor="#ff6a88" />
//               </linearGradient>
//               <radialGradient id="gradGlow" cx="50%" cy="50%" r="50%">
//                 <stop offset="0%" stopColor="#ff6a88" stopOpacity="0.6" />
//                 <stop offset="100%" stopColor="#7f5fff" stopOpacity="0" />
//               </radialGradient>
//             </defs>

//             {/* Flow Path */}
//             <path
//               d="M50 200 C120 100, 280 100, 350 200 C280 300, 120 300, 50 200"
//               stroke="#7f5fff"
//               strokeWidth="4"
//               fill="none"
//               strokeLinecap="round"
//             />

//             {/* Moving problems as circles */}
//             {[0, 1, 2, 3].map((i) => (
//               <circle
//                 key={i}
//                 cx={50 + i * 75}
//                 cy={200}
//                 r="12"
//                 fill="url(#gradGlow)"
//                 className={`animate-[moveProblem_6s_linear_infinite]`}
//                 style={{ animationDelay: `${i * 1.5}s` }}
//               />
//             ))}

//             {/* Keyframes */}
//             <style jsx>{`
//               @keyframes moveProblem {
//                 0% { offset-distance: 0%; }
//                 100% { offset-distance: 100%; }
//               }
//               circle {
//                 offset-path: path("M50 200 C120 100, 280 100, 350 200 C280 300, 120 300, 50 200");
//                 offset-rotate: auto;
//               }
//             `}</style>
//           </svg>
//         </div>
//       </div>

//       {/* Features Section */}
//       <div className="max-w-7xl mx-auto px-6 md:px-16 py-20 grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
//         {features.map((f, idx) => (
//           <div key={idx} className={`p-6 rounded-2xl bg-gradient-to-br ${f.gradient} shadow-lg hover:scale-105 transition-transform`}>
//             <div className="text-4xl mb-4">{f.icon}</div>
//             <h3 className="font-bold text-xl mb-2">{f.title}</h3>
//             <p className="text-gray-100 text-sm">{f.desc}</p>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// }

'use client';
import React from 'react';

export default function CivicActivistsPage() {
  const features = [
    {
      title: "Document Issues",
      desc: "Capture events, evidence, and reports securely and immutably.",
      icon: "📄",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      title: "Escalate Problems",
      desc: "Push verified issues to authorities, media, and community channels.",
      icon: "⚡",
      gradient: "from-blue-400 to-cyan-400",
    },
    {
      title: "Community Validation",
      desc: "Engage citizens to verify reports and strengthen credibility.",
      icon: "🤝",
      gradient: "from-green-400 to-teal-400",
    },
    {
      title: "Media Amplification",
      desc: "Share verified content with press and NGOs for wider impact.",
      icon: "📰",
      gradient: "from-yellow-400 to-orange-400",
    },
  ];

  const processSteps = [
    {
      step: "1",
      title: "Report Issues",
      desc: "Submit problems securely with verifiable data.",
      icon: "📝",
    },
    {
      step: "2",
      title: "Generate Proof",
      desc: "Cryptographically secure proofs generated automatically.",
      icon: "🔒",
    },
    {
      step: "3",
      title: "Validate",
      desc: "Community & NGO validation ensures trustworthiness.",
      icon: "✅",
    },
    {
      step: "4",
      title: "Escalate & Reward",
      desc: "Escalate critical problems and earn recognition.",
      icon: "⚡",
    },
  ];

  const stats = [
    { value: "12K+", label: "Problems Documented" },
    { value: "4K+", label: "Validated Reports" },
    { value: "1.2M", label: "People Impacted" },
  ];

  const partners = ["🌐 NGO One", "🤝 Civic Alliance", "📢 Community Org", "🏛️ Policy Group"];

  return (
    <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-black text-white">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 md:px-16 py-24 grid md:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <div className="space-y-6">
          <h1 className="text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400">
            Empower Civic Activists & NGOs
          </h1>
          <p className="text-gray-300 text-lg md:text-xl">
            PoPP provides activists and NGOs with tools to document, validate, and escalate problems
            securely, transparently, and efficiently—turning local issues into global impact.
          </p>
          <div className="flex gap-4 mt-6">
            <button className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl shadow-lg hover:scale-105 transition-transform font-semibold">
              Submit a Problem
            </button>
            <button className="px-6 py-3 bg-white/10 border border-white/20 rounded-xl hover:bg-white/20 transition font-semibold">
              Learn More
            </button>
          </div>
        </div>

        {/* Right SVG Flow */}
        <div className="relative flex justify-center">
          <svg viewBox="0 0 400 400" className="w-96 h-96">
            <circle cx="200" cy="200" r="150" fill="url(#grad1)" opacity="0.2" />
            <defs>
              <linearGradient id="grad1" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#7f5fff" />
                <stop offset="100%" stopColor="#ff6a88" />
              </linearGradient>
              <radialGradient id="gradGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#ff6a88" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#7f5fff" stopOpacity="0" />
              </radialGradient>
            </defs>
            <path
              d="M50 200 C120 100, 280 100, 350 200 C280 300, 120 300, 50 200"
              stroke="#7f5fff"
              strokeWidth="4"
              fill="none"
              strokeLinecap="round"
            />
            {[0, 1, 2, 3].map((i) => (
              <circle
                key={i}
                cx={50 + i * 75}
                cy={200}
                r="12"
                fill="url(#gradGlow)"
                className={`animate-[moveProblem_6s_linear_infinite]`}
                style={{ animationDelay: `${i * 1.5}s` }}
              />
            ))}
            <style jsx>{`
              @keyframes moveProblem_6s_linear_infinite {
                0% { offset-distance: 0%; }
                100% { offset-distance: 100%; }
              }
              circle {
                offset-path: path("M50 200 C120 100, 280 100, 350 200 C280 300, 120 300, 50 200");
                offset-rotate: auto;
              }
            `}</style>
          </svg>
        </div>
      </section>

      {/* Process Section */}
      <section className="max-w-7xl mx-auto px-6 md:px-16 py-20">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
          How PoPP Helps Civic Activists & NGOs
        </h2>
        <div className="grid md:grid-cols-4 gap-8 text-center">
          {processSteps.map((s, idx) => (
            <div
              key={idx}
              className="bg-[#0B0F1E]/80 p-6 rounded-2xl shadow-lg border border-white/10 hover:scale-105 transition-transform"
            >
              <div className="text-4xl mb-4">{s.icon}</div>
              <h3 className="font-bold text-xl mb-2">{s.title}</h3>
              <p className="text-gray-300 text-sm">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-6 md:px-16 py-20 grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
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
      </section>

      {/* Statistics Section */}
      <section className="bg-gradient-to-r from-purple-900 via-slate-900 to-black py-20 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-12 text-center">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="bg-[#0B0F1E]/70 p-8 rounded-2xl shadow-lg border border-white/10 hover:scale-105 transition-transform"
            >
              <h3 className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
                {stat.value}
              </h3>
              <p className="text-gray-300 mt-2">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-6 md:px-16 py-20 text-center bg-[#050B16] rounded-3xl mt-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-orange-400">
          Get Involved Today
        </h2>
        <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
          Join the PoPP ecosystem. Submit problems, validate reports, and help create a transparent, accountable, and safe society.
        </p>
        <div className="flex justify-center gap-6">
          <button className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl shadow-lg hover:scale-105 transition-transform font-semibold">
            Submit a Problem
          </button>
          <button className="px-8 py-3 bg-white/10 border border-white/20 rounded-xl hover:bg-white/20 transition font-semibold">
            Join as Validator
          </button>
        </div>
      </section>

      {/* Partners / Testimonials Section */}
      <section className="max-w-7xl mx-auto px-6 md:px-16 py-20">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
          Trusted by Civic Organizations
        </h2>
        <div className="flex flex-wrap justify-center gap-8">
          {partners.map((org, idx) => (
            <div
              key={idx}
              className="bg-[#0B0F1E]/70 p-6 rounded-2xl shadow-lg border border-white/10 hover:scale-105 transition-transform text-white font-semibold"
            >
              {org}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
