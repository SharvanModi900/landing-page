"use client";
import React from "react";
import { motion } from "framer-motion";
import { BookOpen, FileText, Code, Shield, Zap, Users, Download, ExternalLink } from "lucide-react";
import Link from "next/link";

export default function ValidatorDocsPage() {
  const sections = [
    {
      icon: <BookOpen className="h-6 w-6 text-cyan-400" />,
      title: "Validator Handbook",
      desc: "Complete guide to becoming a PoPP validator, responsibilities, and best practices.",
      href: "/docs/validator-handbook",
    },
    {
      icon: <Shield className="h-6 w-6 text-cyan-400" />,
      title: "Verification Protocol",
      desc: "Technical specifications for problem verification, evidence validation, and consensus rules.",
      href: "/docs/verification-protocol",
    },
    {
      icon: <Code className="h-6 w-6 text-cyan-400" />,
      title: "API Reference",
      desc: "REST API endpoints for validators to submit verifications, query problems, and track metrics.",
      href: "/api-references",
    },
    {
      icon: <Zap className="h-6 w-6 text-cyan-400" />,
      title: "Staking & Rewards",
      desc: "Understand staking requirements, reward distribution, slashing conditions, and incentive mechanics.",
      href: "/staking-mechanics",
    },
    {
      icon: <Users className="h-6 w-6 text-cyan-400" />,
      title: "Governance & Ethics",
      desc: "Validator code of conduct, dispute resolution, and governance participation guidelines.",
      href: "/docs/governance",
    },
    {
      icon: <FileText className="h-6 w-6 text-cyan-400" />,
      title: "Technical Whitepapers",
      desc: "Peer-reviewed research and technical papers on PoPP protocol design.",
      href: "/whitepapers",
    },
  ];

  const quickLinks = [
    { title: "Validator Exam", href: "/validators/exam", desc: "Take the certification exam" },
    { title: "CLI Tools", href: "/cli", desc: "Command-line interface for validators" },
    { title: "SDK Documentation", href: "/sdk", desc: "Integrate PoPP into your systems" },
    { title: "Best Practices", href: "/best-practices", desc: "Operational guidelines" },
  ];

  return (
    <div className="min-h-screen bg-[#030712] text-white pt-16">
      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6 py-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 ring-1 ring-white/10">
              <BookOpen className="h-5 w-5 text-cyan-400" />
            </div>
            <h1 className="text-3xl font-bold">Validator Documentation</h1>
          </div>
          <p className="text-gray-400 max-w-3xl">
            Comprehensive resources for PoPP validators. Access technical documentation, protocol specifications, 
            API references, and operational guidelines to effectively verify problems and maintain network integrity.
          </p>
        </motion.div>
      </section>

      {/* Main Documentation Sections */}
      <section className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {sections.map((section, i) => (
            <motion.div
              key={section.title}
              className="bg-white/5 border border-white/10 rounded-xl p-5 hover:bg-white/[0.07] transition"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              <div className="flex items-start gap-3 mb-3">
                {section.icon}
                <h3 className="font-semibold text-lg">{section.title}</h3>
              </div>
              <p className="text-gray-400 text-sm mb-4">{section.desc}</p>
              <Link
                href={section.href}
                className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-400 hover:text-cyan-300 transition"
              >
                View Documentation <ExternalLink size={14} />
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Quick Links */}
      <div className="bg-white/[0.03] border-y border-white/[0.06]">
        <section className="max-w-7xl mx-auto px-6 py-10">
          <h2 className="text-xl font-bold mb-6">Quick Links for Validators</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickLinks.map((link, i) => (
              <motion.div
                key={link.title}
                className="bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/[0.07] transition"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
              >
                <Link href={link.href} className="block">
                  <h3 className="font-semibold text-sm mb-1">{link.title}</h3>
                  <p className="text-gray-400 text-xs">{link.desc}</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>
      </div>

      {/* Downloads */}
      <section className="max-w-7xl mx-auto px-6 py-10">
        <h2 className="text-xl font-bold mb-6">Downloads & Resources</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="bg-white/5 border border-white/10 rounded-xl p-5">
            <h3 className="font-semibold mb-2">Validator Toolkit</h3>
            <p className="text-gray-400 text-sm mb-4">
              Complete toolkit with verification scripts, testing utilities, and monitoring tools.
            </p>
            <button className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-400 hover:text-cyan-300">
              <Download size={14} /> Download Toolkit
            </button>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-5">
            <h3 className="font-semibold mb-2">Protocol Specification</h3>
            <p className="text-gray-400 text-sm mb-4">
              Detailed technical specification of the PoPP verification protocol.
            </p>
            <button className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-400 hover:text-cyan-300">
              <Download size={14} /> Download PDF
            </button>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-5">
            <h3 className="font-semibold mb-2">API Documentation</h3>
            <p className="text-gray-400 text-sm mb-4">
              Complete API reference with examples and integration guides.
            </p>
            <button className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-400 hover:text-cyan-300">
              <Download size={14} /> Download Docs
            </button>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-6 py-10">
        <div className="bg-white/5 border border-white/10 rounded-xl p-6 text-center">
          <h2 className="text-2xl font-bold mb-3">Ready to Become a Validator?</h2>
          <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
            Join the network of trusted validators and help verify real-world problems on the PoPP platform.
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/validators">
              <button className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl font-semibold">
                Learn More
              </button>
            </Link>
            <Link href="/validators/exam">
              <button className="px-6 py-2 bg-white/5 border border-white/10 rounded-xl font-semibold">
                Take the Exam
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
