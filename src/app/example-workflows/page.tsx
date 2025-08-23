'use client';
import React, { useState } from "react";

export default function ExampleWorkflowsPage() {
  const [activeTab, setActiveTab] = useState("Activists");

  const workflows = [
    {
      title: "Grassroots Activism Workflow",
      steps: ["Document local issue", "Gather community support", "Validate with peers", "Escalate to authorities"],
      img: "/workflow-activist.png",
    },
    {
      title: "Government Agency Response",
      steps: ["Receive validated issue", "Assign department", "Track resolution progress", "Report outcomes"],
      img: "/workflow-agency.png",
    },
    {
      title: "Media Amplification Flow",
      steps: ["Access verified data", "Craft report/story", "Broadcast to audiences", "Drive accountability"],
      img: "/workflow-media.png",
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
    <section className="bg-slate-950 text-white">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-8 py-20 grid md:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <div className="space-y-6">
          <h1 className="text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500">
            Example Workflows in Action
          </h1>
          <p className="text-lg text-gray-300 leading-relaxed">
            Workflows are the heartbeat of PoPP—transforming local problems into structured,
            verifiable, and impactful actions. Explore how activists, agencies, media,
            and researchers collaborate seamlessly.
          </p>
          <div className="flex gap-4 mt-6">
            <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl shadow-lg hover:scale-105 transition">
              Explore Workflows
            </button>
            <a href="/design-your-workflow" className="px-6 py-3 bg-white/10 border border-white/20 rounded-xl hover:bg-white/20 transition">
              Design Your Own
            </a>
          </div>
        </div>

        {/* Right Illustration */}
        <div className="relative">
          <div className="absolute -top-10 -left-10 w-72 h-72 bg-blue-500/20 blur-3xl rounded-full animate-pulse" />
          <svg viewBox="0 0 500 300" className="w-full h-80">
            <path d="M50 150 Q150 50, 250 150 T450 150" stroke="#60a5fa" strokeWidth="4" fill="none" strokeLinecap="round" />
            {[80, 200, 320, 440].map((cx, i) => (
              <circle key={i} cx={cx} cy={150} r="18" fill="#9333ea" className="animate-pulse" />
            ))}
          </svg>
        </div>
      </div>

      {/* Zig-Zag Workflow Showcase */}
      <div className="max-w-7xl mx-auto px-8 py-24 space-y-24">
        {workflows.map((w, idx) => (
          <div key={idx} className={`grid md:grid-cols-2 gap-12 items-center ${idx % 2 === 1 ? "md:flex-row-reverse" : ""}`}>
            <img src={w.img} alt={w.title} className="rounded-2xl shadow-lg" />
            <div>
              <h2 className="text-3xl font-bold text-blue-400">{w.title}</h2>
              <ul className="mt-6 space-y-3 text-gray-300">
                {w.steps.map((s, i) => (
                  <li key={i} className="flex gap-2 items-start">
                    <span className="text-blue-400">✔</span>
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      {/* Interactive Tabs */}
      <div className="bg-slate-900 py-20">
        <div className="max-w-6xl mx-auto px-8">
          <h2 className="text-3xl font-bold mb-8">Role-based Workflows</h2>
          <div className="flex gap-6 overflow-x-auto pb-4">
            {Object.keys(tabs).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 rounded-lg font-semibold ${
                  activeTab === tab ? "bg-gradient-to-r from-blue-500 to-purple-500" : "bg-slate-800 hover:bg-slate-700"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="mt-10 grid sm:grid-cols-3 gap-8">
            {tabs[activeTab].map((step, idx) => (
              <div key={idx} className="p-6 bg-slate-800 rounded-xl border border-slate-700">
                <h3 className="font-bold text-lg mb-2">Step {idx + 1}</h3>
                <p className="text-gray-300">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Timeline Section */}
      <div className="max-w-6xl mx-auto px-8 py-24 relative">
        <h2 className="text-3xl font-bold mb-16">End-to-End Workflow Journey</h2>
        <div className="relative border-l-2 border-blue-500 pl-8 space-y-16">
          {["Problem Submitted", "Community Validates", "Validators Confirm", "Media Amplifies", "Agencies Act"].map((step, idx) => (
            <div key={idx} className="relative">
              <div className="absolute -left-5 top-1 w-6 h-6 bg-blue-500 rounded-full border-4 border-slate-950" />
              <h3 className="text-xl font-bold text-purple-400">{step}</h3>
              <p className="text-gray-300 mt-2">
                Detailed explanation about how this stage ensures transparency, accountability, and problem-solving momentum.
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Case Studies */}
      <div className="bg-slate-900 py-20">
        <div className="max-w-7xl mx-auto px-8">
          <h2 className="text-3xl font-bold mb-12">Case Studies</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {["Local Water Crisis", "Election Monitoring", "Urban Pollution"].map((c, idx) => (
              <div key={idx} className="p-6 bg-slate-800 rounded-xl shadow-lg hover:scale-105 transition">
                <h3 className="text-xl font-bold text-blue-400">{c}</h3>
                <p className="text-gray-300 mt-2">
                  How PoPP workflows helped bring visibility, validation, and action to {c.toLowerCase()}.
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Impact Section */}
      <div className="max-w-7xl mx-auto px-8 py-24 grid md:grid-cols-3 gap-12 text-center md:text-left">
        <div>
          <h3 className="text-4xl font-bold text-blue-400">12,400+</h3>
          <p className="text-gray-300">Problems Documented</p>
        </div>
        <div>
          <h3 className="text-4xl font-bold text-green-400">4,200+</h3>
          <p className="text-gray-300">Validators Engaged</p>
        </div>
        <div>
          <h3 className="text-4xl font-bold text-yellow-400">1,800+</h3>
          <p className="text-gray-300">Media Amplifications</p>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 py-20">
        <div className="max-w-7xl mx-auto px-8 grid md:grid-cols-2 items-center">
          <div>
            <h2 className="text-3xl font-bold">Design Your Own Workflow</h2>
            <p className="text-lg text-white/90 mt-4">
              PoPP makes it easy for any group to build transparent, traceable, and effective workflows for real-world change.
            </p>
          </div>
          <div className="mt-8 md:mt-0 flex gap-4">
            <button className="px-6 py-3 bg-white text-slate-900 font-semibold rounded-xl hover:bg-gray-200 transition">
              Start Now
            </button>
            <button className="px-6 py-3 border border-white/40 text-white font-semibold rounded-xl hover:bg-white/20 transition">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
