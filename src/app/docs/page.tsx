"use client";
import { useState } from "react";
import { FiBookOpen, FiSettings, FiShield, FiServer, FiHelpCircle } from "react-icons/fi";

const sections = [
  { id: "overview", label: "Overview", icon: <FiBookOpen /> },
  { id: "policy", label: "Policy", icon: <FiShield /> },
  { id: "governance", label: "Governance", icon: <FiSettings /> },
  { id: "architecture", label: "Architecture", icon: <FiServer /> },
  { id: "faq", label: "FAQs", icon: <FiHelpCircle /> }
];

export default function DocsPage() {
  const [activeSection, setActiveSection] = useState("overview");

  return (
    <div className="min-h-screen bg-[#030712] pt-16 text-white flex">
      {/* Sidebar */}
      <aside className="w-56 p-5 border-r border-white/10 bg-white/[0.03]">
        <h2 className="text-lg font-bold mb-4">POPP Docs</h2>
        <nav className="space-y-2">
          {sections.map(sec => (
            <button
              key={sec.id}
              onClick={() => setActiveSection(sec.id)}
              className={`flex items-center gap-2 px-3 py-2 w-full rounded-lg transition-all text-sm ${
                activeSection === sec.id ? "bg-cyan-500/10 border-l-2 border-cyan-400 text-cyan-400" : "text-gray-400 hover:bg-white/5"
              }`}
            >
              {sec.icon}
              {sec.label}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 space-y-8">
        <section id="overview" className={`${activeSection === "overview" ? "block" : "hidden"}`}>
          <h1 className="text-2xl font-bold mb-3">Overview</h1>
          <p className="text-gray-400">
            The Proof-of-Problem Protocol (POPP) is a decentralized mechanism for verifying...
          </p>
        </section>

        <section id="policy" className={`${activeSection === "policy" ? "block" : "hidden"}`}>
          <h1 className="text-2xl font-bold mb-3">Policy</h1>
          <p className="text-gray-400">
            POPP's policy ensures fairness, transparency, and inclusivity in problem verification...
          </p>
        </section>

        <section id="governance" className={`${activeSection === "governance" ? "block" : "hidden"}`}>
          <h1 className="text-2xl font-bold mb-3">Governance</h1>
          <p className="text-gray-400">
            Governance is handled by a decentralized council with voting mechanisms...
          </p>
        </section>
      </main>

      {/* TOC */}
      <aside className="w-56 p-5 border-l border-white/10 bg-white/[0.03] hidden lg:block">
        <h3 className="font-semibold text-sm mb-3 text-gray-500">On This Page</h3>
        <ul className="space-y-2 text-gray-400 text-sm">
          {sections.map(sec => (
            <li key={sec.id} className="hover:text-cyan-400 cursor-pointer">{sec.label}</li>
          ))}
        </ul>
      </aside>
    </div>
  );
}
