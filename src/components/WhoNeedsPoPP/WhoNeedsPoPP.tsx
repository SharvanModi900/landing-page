"use client";

import { motion } from "framer-motion";
import { Users, Building2, Newspaper, Scale, Globe2, Landmark, Briefcase, User, Code2, GraduationCap } from "lucide-react";

const integrations = [
  { label: "Webhooks", icon: "🔗" },
  { label: "REST / GraphQL APIs", icon: "📊" },
  { label: "Plugin Architecture", icon: "🧩" },
  { label: "Industry Modules", icon: "🏭" },
];

export default function WhoNeedsPoPP() {
  const primaryUsers = [
    {
      icon: <Users className="w-6 h-6 text-cyan-400" />,
      group: "Civic Activists & NGOs",
      needs: "Document issues, build evidence trails, escalate problems",
      benefits: "Cryptographic proof, community validation, media amplification",
    },
    {
      icon: <Building2 className="w-6 h-6 text-cyan-400" />,
      group: "Government Agencies",
      needs: "Transparent issue tracking, public accountability, data-driven decisions",
      benefits: "Real-time monitoring, automated reporting, public trust",
    },
    {
      icon: <Newspaper className="w-6 h-6 text-cyan-400" />,
      group: "Media Organizations",
      needs: "Verified stories, fact-checking, investigative leads",
      benefits: "Pre-validated content, source verification, community insights",
    },
    {
      icon: <Scale className="w-6 h-6 text-cyan-400" />,
      group: "Legal Professionals",
      needs: "Evidence collection, case building, witness protection",
      benefits: "Immutable records, anonymous submissions, chain of custody",
    },
  ];

  const secondaryStakeholders = [
    { icon: <GraduationCap className="w-5 h-5 text-purple-400" />, group: "Academic Researchers", desc: "Study civic engagement patterns and governance effectiveness" },
    { icon: <Landmark className="w-5 h-5 text-purple-400" />, group: "Policy Makers", desc: "Data-driven policy formulation and impact assessment" },
    { icon: <Globe2 className="w-5 h-5 text-purple-400" />, group: "International Organizations", desc: "Cross-border transparency and human rights monitoring" },
    { icon: <Briefcase className="w-5 h-5 text-purple-400" />, group: "Private Sector", desc: "ESG compliance, stakeholder engagement, risk management" },
    { icon: <User className="w-5 h-5 text-purple-400" />, group: "Individual Citizens", desc: "Personal issue reporting and community participation" },
    { icon: <Code2 className="w-5 h-5 text-purple-400" />, group: "Technology Developers", desc: "Build applications and integrations on PoPP infrastructure" },
  ];

  return (
    <section className="py-24 px-6">
      <div className="relative max-w-6xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-extrabold text-white mb-4 tracking-tight">
            Who Needs <span className="text-purple-400">PoPP?</span>
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            From grassroots activists to government institutions, PoPP serves diverse stakeholders.
          </p>
        </div>

        {/* Integration strip */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {integrations.map((item) => (
            <div
              key={item.label}
              className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm text-gray-300"
            >
              <span>{item.icon}</span>
              {item.label}
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Primary Users */}
          <div>
            <h3 className="text-xl font-bold text-white mb-6">Primary Users</h3>
            <div className="space-y-4">
              {primaryUsers.map((user, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  className="bg-white/5 border border-white/10 rounded-xl p-5"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 mt-0.5">{user.icon}</div>
                    <div>
                      <h4 className="font-semibold text-white mb-1">{user.group}</h4>
                      <p className="text-sm text-gray-400 mb-1">
                        <span className="text-cyan-400">Needs:</span> {user.needs}
                      </p>
                      <p className="text-sm text-gray-400">
                        <span className="text-green-400">Benefits:</span> {user.benefits}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Secondary Stakeholders */}
          <div>
            <h3 className="text-xl font-bold text-white mb-6">Secondary Stakeholders</h3>
            <div className="grid gap-3">
              {secondaryStakeholders.map((stakeholder, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: idx * 0.08 }}
                  className="flex items-start gap-3 p-3 rounded-lg hover:bg-white/5 transition"
                >
                  <div className="flex-shrink-0 mt-0.5">{stakeholder.icon}</div>
                  <div>
                    <h4 className="font-medium text-white text-sm">{stakeholder.group}</h4>
                    <p className="text-sm text-gray-400">{stakeholder.desc}</p>
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
