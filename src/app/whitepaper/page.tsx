// "use client";

// import React from "react";
// import { motion } from "framer-motion";

// const categories = [
//   {
//     name: "Protocol Design",
//     description: "Core architecture, consensus, and cryptography.",
//     icon: "🔗",
//   },
//   {
//     name: "Governance",
//     description: "Decision-making, upgrades, and community roles.",
//     icon: "🏛️",
//   },
//   {
//     name: "Use Cases",
//     description: "Applications, integrations, and real-world impact.",
//     icon: "🚀",
//   },
//   {
//     name: "Security",
//     description: "Threat models, audits, and resilience.",
//     icon: "🛡️",
//   },
//   {
//     name: "Economics",
//     description: "Tokenomics, incentives, and sustainability.",
//     icon: "💸",
//   },
// ];

// const heroVariants = {
//   hidden: { opacity: 0, y: 40 },
//   visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
// };

// const WhitepaperPage: React.FC = () => {
//   return (
//     <main className="min-h-screen w-full bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 flex flex-col items-center">
//       {/* Hero Section - VIBE FOCUSED */}
//       <section className="w-full flex flex-col items-center justify-center pt-32 pb-24 relative overflow-hidden min-h-[520px]">
//         {/* Layered gradients and floating glassy shapes */}
//         <div className="absolute inset-0 z-0 pointer-events-none">
//           <div className="absolute -top-32 -left-32 w-[600px] h-[600px] bg-gradient-to-br from-indigo-500/30 via-fuchsia-400/20 to-yellow-300/10 rounded-full blur-3xl animate-pulse" />
//           <div className="absolute top-1/3 right-0 w-[320px] h-[320px] bg-gradient-to-br from-fuchsia-400/30 to-indigo-400/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1.5s' }} />
//           <div className="absolute bottom-0 left-1/4 w-[180px] h-[180px] bg-gradient-to-br from-yellow-300/30 to-fuchsia-400/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2.5s' }} />
//         </div>
//         {/* Glassy floating cards */}
//         <motion.div
//           className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex gap-8"
//           initial={{ opacity: 0, y: 60 }}
//           animate={{ opacity: 0.18, y: 0 }}
//           transition={{ duration: 1.2 }}
//         >
//           <div className="w-64 h-40 bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/10 rotate-[-8deg]" />
//           <div className="w-64 h-40 bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/10 rotate-[8deg]" />
//         </motion.div>
//         {/* Main headline and subheadline */}
//         <motion.div
//           className="relative z-20 flex flex-col items-center"
//           variants={heroVariants}
//           initial="hidden"
//           animate="visible"
//         >
//           <h1 className="text-6xl md:text-7xl font-extrabold text-white text-center drop-shadow-2xl tracking-tight leading-tight mb-6">
//             The PoPP Whitepaper
//           </h1>
//           <p className="text-2xl md:text-3xl text-gray-200 text-center max-w-3xl mb-8 font-medium drop-shadow-lg">
//             A new protocol for decentralized truth. <span className="bg-gradient-to-r from-indigo-400 via-fuchsia-400 to-yellow-300 bg-clip-text text-transparent font-bold">Dive deep into the architecture, vision, and future of PoPP.</span>
//           </p>
//         </motion.div>
//       </section>
//       {/* Categories Section */}
//       <section className="w-full max-w-5xl flex flex-wrap justify-center gap-8 px-4 pb-24 z-10">
//         {categories.map((cat, i) => (
//           <div
//             key={cat.name}
//             className="group relative bg-gradient-to-br from-gray-800/80 to-gray-900/90 border border-gray-700/40 rounded-2xl shadow-xl w-64 h-56 flex flex-col items-center justify-center p-6 transition-transform hover:scale-105 hover:shadow-2xl cursor-pointer overflow-hidden"
//             style={{ zIndex: 2 + i }}
//           >
//             <span className="text-4xl mb-3 drop-shadow-lg">{cat.icon}</span>
//             <h2 className="text-2xl font-bold text-white mb-2 text-center drop-shadow-sm">
//               {cat.name}
//             </h2>
//             <p className="text-base text-gray-300 text-center mb-2">
//               {cat.description}
//             </p>
//             {/* Decorative floating effect */}
//             <div className="absolute -bottom-8 -right-8 w-24 h-24 rounded-full bg-indigo-400/10 blur-2xl group-hover:opacity-60 opacity-30 transition-opacity" />
//             <div className="absolute -top-8 -left-8 w-16 h-16 rounded-full bg-yellow-400/10 blur-2xl group-hover:opacity-60 opacity-30 transition-opacity" />
//           </div>
//         ))}
//       </section>
//     </main>
//   );
// };

// export default WhitepaperPage; 


// components/WhitepaperCategories.tsx
'use client';
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";

const categories = [
  {
    title: "Core Protocol",
    description: "Technical architecture & cryptography details",
    count: 4,
    icon: "🌐",
  },
  {
    title: "Governance & DAO",
    description: "Voting rules, proposals, tokenomics",
    count: 3,
    icon: "⚖️",
  },
  {
    title: "Security & Privacy",
    description: "Threat models, zk-proof research",
    count: 2,
    icon: "🔒",
  },
  {
    title: "Use Cases & Case Studies",
    description: "Civic, NGO, AI applications",
    count: 5,
    icon: "📄",
  },
  {
    title: "Roadmap & Updates",
    description: "Version history & future milestones",
    count: 2,
    icon: "🗺️",
  },
  {
    title: "Glossary",
    description: "Terms and definitions",
    count: 1,
    icon: "📚",
  },
];

export default function WhitepaperCategories() {
  const [search, setSearch] = useState("");

  const filtered = categories.filter(
    (cat) =>
      cat.title.toLowerCase().includes(search.toLowerCase()) ||
      cat.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#0b0e11] text-white px-6 py-52">
      {/* Header */}
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Whitepapers & Research</h1>
        <p className="text-gray-400 mb-8 max-w-2xl">
          Explore PoPP’s technical documentation, governance models, and
          research papers.
        </p>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-10">
          <div className="relative w-full md:w-1/3">
            <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search..."
              className="w-full bg-[#14181d] rounded-lg py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="flex gap-3">
            {["All", "Technical", "Governance", "Security"].map((filter) => (
              <button
                key={filter}
                className="px-4 py-1.5 rounded-full bg-[#14181d] hover:bg-orange-500 hover:text-white text-gray-300 text-sm transition"
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Category Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((cat, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.02 }}
              className="bg-[#14181d] rounded-xl p-6 border border-transparent hover:border-orange-500 transition"
            >
              <div className="text-3xl mb-4">{cat.icon}</div>
              <h3 className="text-lg font-semibold mb-2">{cat.title}</h3>
              <p className="text-gray-400 text-sm mb-4">{cat.description}</p>
              <span className="text-orange-500 text-xs font-medium">
                {cat.count} WHITEPAPERS
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
