"use client";
import React from "react";
import { BookOpen } from "lucide-react";
import Link from "next/link";

export default function DeveloperDocsPage() {
  const sections = [
    { title: "Getting Started", desc: "Quick start guide for developers", href: "/docs" },
    { title: "API Reference", desc: "Complete API documentation", href: "/api-references" },
    { title: "SDK Documentation", desc: "Software development kit guides", href: "/sdk" },
    { title: "CLI Tools", desc: "Command-line interface documentation", href: "/cli" },
    { title: "Smart Contracts", desc: "Smart contract documentation", href: "/smart-contracts" },
    { title: "Examples", desc: "Code examples and tutorials", href: "/example-workflows" },
  ];

  return (
    <div className="min-h-screen bg-[#030712] text-white pt-16">
      <section className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 ring-1 ring-white/10">
            <BookOpen className="h-5 w-5 text-cyan-400" />
          </div>
          <h1 className="text-3xl font-bold">Developer Documentation</h1>
        </div>
        <p className="text-gray-400 max-w-3xl">
          Complete technical documentation for developers building on PoPP protocol.
        </p>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {sections.map((s, i) => (
            <Link key={i} href={s.href}>
              <div className="bg-white/5 border border-white/10 rounded-xl p-5 hover:bg-white/[0.07] transition">
                <h3 className="font-semibold text-lg mb-2">{s.title}</h3>
                <p className="text-gray-400 text-sm">{s.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
