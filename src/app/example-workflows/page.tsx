'use client';
import React, { useState } from "react";
import Link from "next/link";

export default function ExampleWorkflowsPage() {
  const [activeTab, setActiveTab] = useState("Activists");

  const workflows = [
    {
      title: "Grassroots Activism Workflow",
      steps: ["Document local issue", "Gather community support", "Validate with peers", "Escalate to authorities"],
    },
    {
      title: "Government Agency Response",
      steps: ["Receive validated issue", "Assign department", "Track resolution progress", "Report outcomes"],
    },
    {
      title: "Media Amplification Flow",
      steps: ["Access verified data", "Craft report/story", "Broadcast to audiences", "Drive accountability"],
    },
  ];

  const tabs = {
    Activists: ["Capture evidence", "Validate with peers", "Push issue forward"],
    Validators: ["Review submissions", "Approve or reject", "Record decision immutably"],
    Researchers: ["Access datasets", "Analyze correlations", "Publish insights"],
    Media: ["Verify claims", "Highlight stories", "Amplify impact"],
    Agencies: ["Respond to issues", "Coordinate resources", "Resolve publicly"],
  };

  return (
    <div className="min-h-screen bg-[#030712] text-white">
      <div className="pt-16">
        {/* Hero Section */}
        <div className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-5xl font-extrabold">
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Example Workflows in Action
              </span>
            </h1>
            <p className="text-gray-400 text-lg mt-4">
              Workflows are the heartbeat of PoPP—transforming local problems into structured,
              verifiable, and impactful actions. Explore how activists, agencies, media,
              and researchers collaborate seamlessly.
            </p>
            <div className="flex gap-3 mt-4">
              <button className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl font-semibold">
                Explore Workflows
              </button>
              <Link href="/design-your-workflow">
                <button className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl font-semibold">
                  Design Your Own
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Zig-Zag Workflow Showcase */}
        <div className="max-w-7xl mx-auto px-6 py-10 space-y-8">
          {workflows.map((w, idx) => (
            <div key={idx} className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-2xl font-bold text-cyan-400">{w.title}</h2>
                <ul className="mt-4 space-y-2 text-gray-400">
                  {w.steps.map((s, i) => (
                    <li key={i} className="flex gap-2 items-start">
                      <span className="text-cyan-400">✔</span>
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Interactive Tabs */}
        <div className="bg-white/[0.03] border-y border-white/[0.06] py-10">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-3xl font-bold mb-6">Role-based Workflows</h2>
            <div className="flex gap-3 overflow-x-auto pb-3">
              {Object.keys(tabs).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded-lg font-semibold text-sm whitespace-nowrap ${
                    activeTab === tab ? "bg-gradient-to-r from-cyan-500 to-blue-600" : "bg-white/5 border border-white/10"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
            <div className="mt-6 grid sm:grid-cols-3 gap-6">
              {tabs[activeTab].map((step, idx) => (
                <div key={idx} className="bg-white/5 border border-white/10 rounded-xl p-5">
                  <h3 className="font-bold text-lg mb-1">Step {idx + 1}</h3>
                  <p className="text-gray-400 text-sm">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Timeline Section */}
        <div className="max-w-6xl mx-auto px-6 py-10">
          <h2 className="text-3xl font-bold mb-6">End-to-End Workflow Journey</h2>
          <div className="relative border-l-2 border-cyan-500 pl-6 space-y-6">
            {["Problem Submitted", "Community Validates", "Validators Confirm", "Media Amplifies", "Agencies Act"].map((step, idx) => (
              <div key={idx} className="relative">
                <div className="absolute -left-[30px] top-1 w-4 h-4 bg-cyan-500 rounded-full border-4 border-[#030712]" />
                <h3 className="text-lg font-bold text-cyan-400">{step}</h3>
                <p className="text-gray-400 text-sm mt-1">
                  Detailed explanation about how this stage ensures transparency, accountability, and problem-solving momentum.
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Case Studies */}
        <div className="bg-white/[0.03] border-y border-white/[0.06] py-10">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-3xl font-bold mb-6">Case Studies</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {["Local Water Crisis", "Election Monitoring", "Urban Pollution"].map((c, idx) => (
                <div key={idx} className="bg-white/5 border border-white/10 rounded-xl p-5">
                  <h3 className="text-lg font-bold text-cyan-400">{c}</h3>
                  <p className="text-gray-400 text-sm mt-2">
                    How PoPP workflows helped bring visibility, validation, and action to {c.toLowerCase()}.
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Impact Section */}
        <div className="max-w-7xl mx-auto px-6 py-10 grid md:grid-cols-3 gap-8 text-center md:text-left">
          <div>
            <h3 className="text-4xl font-bold text-cyan-400">12,400+</h3>
            <p className="text-gray-400">Problems Documented</p>
          </div>
          <div>
            <h3 className="text-4xl font-bold text-emerald-400">4,200+</h3>
            <p className="text-gray-400">Validators Engaged</p>
          </div>
          <div>
            <h3 className="text-4xl font-bold text-blue-400">1,800+</h3>
            <p className="text-gray-400">Media Amplifications</p>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-cyan-500 to-blue-600 py-10">
          <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 items-center gap-6">
            <div>
              <h2 className="text-3xl font-bold">Design Your Own Workflow</h2>
              <p className="text-white/90 mt-2">
                PoPP makes it easy for any group to build transparent, traceable, and effective workflows for real-world change.
              </p>
            </div>
            <div className="flex gap-3">
              <Link href="/design-your-workflow">
                <button className="px-4 py-2 bg-white text-gray-900 font-semibold rounded-xl">
                  Start Now
                </button>
              </Link>
              <button className="px-4 py-2 border border-white/40 text-white font-semibold rounded-xl">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
