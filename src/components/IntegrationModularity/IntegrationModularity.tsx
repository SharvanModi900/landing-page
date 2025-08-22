"use client";

import { motion } from "framer-motion";

export default function IntegrationModularityPremium() {
  const integrationComponents = [
    { name: "Webhook Support", desc: "Real-time alerts for institutions and civic organizations", icon: "🔗", gradient: "from-purple-500 to-pink-500" },
    { name: "Public Data Feeds", desc: "Live feed of validated issues via GraphQL/REST APIs", icon: "📊", gradient: "from-blue-400 to-cyan-400" },
    { name: "Plugin Architecture", desc: "Embed PoPP modules directly into dApps and DAOs", icon: "🧩", gradient: "from-green-400 to-lime-400" },
    { name: "Industry Modules", desc: "Sector-focused plugins for healthcare, education, environment", icon: "🏭", gradient: "from-yellow-400 to-orange-400" }
  ];

  const builtFor = [
    { target: "Governments & City Councils", icon: "🏛️", gradient: "from-purple-500 to-pink-500" },
    { target: "NGOs & Humanitarian Groups", icon: "🤝", gradient: "from-blue-400 to-cyan-400" },
    { target: "Civic Tech Developers", icon: "👨‍💻", gradient: "from-green-400 to-lime-400" },
    { target: "Media Watchdogs", icon: "📢", gradient: "from-yellow-400 to-orange-400" },
    { target: "Transparency Activists", icon: "🔍", gradient: "from-pink-500 to-red-500" },
    { target: "Startups & Enterprises", icon: "🚀", gradient: "from-teal-400 to-blue-400" }
  ];

  const cardVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 }
  };

  return (
    <section className="py-24 px-6 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900">
      <div className="max-w-7xl mx-auto text-center mb-12">
        <h2 className="text-4xl lg:text-5xl font-bold text-white mb-3">
          Integration & <span className="text-purple-400">Modularity</span>
        </h2>
        <p className="text-base lg:text-lg text-gray-400 max-w-3xl mx-auto">
          PoPP is a composable infrastructure layer meant to be extended and embedded
        </p>
      </div>

      {/* Integration Components */}
      <div className="flex flex-wrap justify-center gap-5 mb-16">
        {integrationComponents.map((item, idx) => (
          <motion.div
            key={idx}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={cardVariants}
            transition={{ duration: 0.5, delay: idx * 0.15 }}
            className="relative flex flex-col items-center p-4 w-[220px] rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 hover:scale-105 transition-transform duration-300 shadow-lg group"
          >
            {/* Icon */}
            <div className={`w-12 h-12 flex items-center justify-center rounded-full text-xl bg-gradient-to-tr ${item.gradient} shadow-lg mb-2`}>
              {item.icon}
            </div>

            {/* Title */}
            <h4 className="text-white font-semibold text-base text-center mb-1">{item.name}</h4>

            {/* Subtitle / Tag */}
            <span className="text-purple-400 text-xs font-medium mb-1">Module</span>

            {/* Description */}
            <p className="text-gray-300 text-xs text-center">{item.desc}</p>

            {/* Tooltip */}
            <div className="absolute bottom-full mb-2 px-3 py-1 rounded-lg bg-white/10 text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity">
              {`This module handles ${item.name.toLowerCase()}`}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Built For Section */}
      <div className="mb-10 text-center">
        <h3 className="text-4xl font-bold text-white mb-10">Built For</h3>
        <div className="flex flex-wrap justify-center gap-4">
          {builtFor.map((item, idx) => (
            <motion.div
              key={idx}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={cardVariants}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="flex items-center gap-2 p-3 w-[180px] rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 hover:scale-105 transition-transform duration-300 shadow-lg group relative"
            >
              {/* Icon */}
              <div className={`w-10 h-10 flex items-center justify-center rounded-full text-lg bg-gradient-to-tr ${item.gradient} shadow-lg`}>
                {item.icon}
              </div>

              {/* Target */}
              <span className="text-gray-300 text-xs font-medium">{item.target}</span>

              {/* Tooltip */}
              <div className="absolute bottom-full mb-2 px-3 py-1 rounded-lg bg-white/10 text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                {`Intended for ${item.target}`}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
