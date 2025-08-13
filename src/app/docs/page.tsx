// app/docs/page.tsx
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
    <div className="min-h-screen bg-gradient-to-br from-[#0A0F1C] via-[#0F1A2B] to-[#151E38] mt-[80px] text-white flex">
      
      {/* Sidebar */}
      <aside className="w-64 p-6 border-r border-white/10 bg-white/5 backdrop-blur-md">
        <h2 className="text-xl font-bold mb-6">POPP Docs</h2>
        <nav className="space-y-4">
          {sections.map(sec => (
            <button
              key={sec.id}
              onClick={() => setActiveSection(sec.id)}
              className={`flex items-center gap-3 px-4 py-2 w-full rounded-lg transition-all ${
                activeSection === sec.id ? "bg-[#FF7A00]/20 border-l-4 border-[#FF7A00]" : "hover:bg-white/10"
              }`}
            >
              {sec.icon}
              {sec.label}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10 space-y-10">
        <section id="overview" className={`${activeSection === "overview" ? "block" : "hidden"}`}>
          <h1 className="text-3xl font-bold mb-4">Overview</h1>
          <p className="text-lg text-gray-300">
            The Proof-of-Problem Protocol (POPP) is a decentralized mechanism for verifying...
          </p>
        </section>

        <section id="policy" className={`${activeSection === "policy" ? "block" : "hidden"}`}>
          <h1 className="text-3xl font-bold mb-4">Policy</h1>
          <p className="text-lg text-gray-300">
            POPP's policy ensures fairness, transparency, and inclusivity in problem verification...
          </p>
        </section>

        <section id="governance" className={`${activeSection === "governance" ? "block" : "hidden"}`}>
          <h1 className="text-3xl font-bold mb-4">Governance</h1>
          <p className="text-lg text-gray-300">
            Governance is handled by a decentralized council with voting mechanisms...
          </p>
        </section>
      </main>

      {/* TOC */}
      <aside className="w-64 p-6 border-l border-white/10 bg-white/5 backdrop-blur-md hidden lg:block">
        <h3 className="font-semibold text-sm mb-4 text-gray-400">On This Page</h3>
        <ul className="space-y-2 text-gray-300 text-sm">
          {sections.map(sec => (
            <li key={sec.id} className="hover:text-[#FF7A00] cursor-pointer">{sec.label}</li>
          ))}
        </ul>
      </aside>
    </div>
  );
}
