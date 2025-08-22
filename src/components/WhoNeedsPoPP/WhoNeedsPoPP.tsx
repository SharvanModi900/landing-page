"use client";

import { motion } from "framer-motion";
import { Users, Building2, Newspaper, Scale, Globe2, Landmark, Briefcase, User, Code2, GraduationCap } from "lucide-react";

export default function WhoNeedsPoPP() {
  const primaryUsers = [
    { 
      icon: <Users className="w-6 h-6 text-blue-400" />,
      group: "Civic Activists & NGOs", 
      needs: "Document issues, build evidence trails, escalate problems",
      benefits: "Cryptographic proof, community validation, media amplification"
    },
    { 
      icon: <Building2 className="w-6 h-6 text-blue-400" />,
      group: "Government Agencies", 
      needs: "Transparent issue tracking, public accountability, data-driven decisions",
      benefits: "Real-time monitoring, automated reporting, public trust"
    },
    { 
      icon: <Newspaper className="w-6 h-6 text-blue-400" />,
      group: "Media Organizations", 
      needs: "Verified stories, fact-checking, investigative leads",
      benefits: "Pre-validated content, source verification, community insights"
    },
    { 
      icon: <Scale className="w-6 h-6 text-blue-400" />,
      group: "Legal Professionals", 
      needs: "Evidence collection, case building, witness protection",
      benefits: "Immutable records, anonymous submissions, chain of custody"
    }
  ];

  const secondaryStakeholders = [
    { icon: <GraduationCap className="w-5 h-5 text-purple-400" />, group: "Academic Researchers", desc: "Study civic engagement patterns and governance effectiveness" },
    { icon: <Landmark className="w-5 h-5 text-purple-400" />, group: "Policy Makers", desc: "Data-driven policy formulation and impact assessment" },
    { icon: <Globe2 className="w-5 h-5 text-purple-400" />, group: "International Organizations", desc: "Cross-border transparency and human rights monitoring" },
    { icon: <Briefcase className="w-5 h-5 text-purple-400" />, group: "Private Sector", desc: "ESG compliance, stakeholder engagement, risk management" },
    { icon: <User className="w-5 h-5 text-purple-400" />, group: "Individual Citizens", desc: "Personal issue reporting and community participation" },
    { icon: <Code2 className="w-5 h-5 text-purple-400" />, group: "Technology Developers", desc: "Build applications and integrations on PoPP infrastructure" }
  ];

  const cardVariants = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } };

  return (
    <section className="py-24 px-6 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-blue-500/10 blur-3xl pointer-events-none"></div>
      
      <div className="relative max-w-6xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-20 relative z-10">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Who <span className="text-purple-400">Needs</span> PoPP?
          </h2>
          <p className="text-lg lg:text-xl text-gray-300 max-w-3xl mx-auto">
            From grassroots activists to government institutions, PoPP serves diverse stakeholders
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 relative z-10">
          {/* Primary Users */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-8">Primary Users</h3>
            <div className="space-y-6">
              {primaryUsers.map((user, idx) => (
                <motion.div
                  key={idx}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  variants={cardVariants}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md border border-white/10 rounded-xl p-5 shadow-lg hover:shadow-blue-500/30 transition"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">{user.icon}</div>
                    <div>
                      <h4 className="font-semibold text-white mb-2">{user.group}</h4>
                      <p className="text-sm text-gray-300 mb-1"><span className="text-blue-400">Needs:</span> {user.needs}</p>
                      <p className="text-sm text-gray-300"><span className="text-green-400">Benefits:</span> {user.benefits}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Secondary Stakeholders */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-8">Secondary Stakeholders</h3>
            <div className="grid gap-5">
              {secondaryStakeholders.map((stakeholder, idx) => (
                <motion.div
                  key={idx}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  variants={cardVariants}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  className="flex items-start gap-3 p-3 rounded-lg hover:bg-white/5 transition"
                >
                  <div className="flex-shrink-0 mt-1">{stakeholder.icon}</div>
                  <div>
                    <h4 className="font-medium text-white">{stakeholder.group}</h4>
                    <p className="text-sm text-gray-300">{stakeholder.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
