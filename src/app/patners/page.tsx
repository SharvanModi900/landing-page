"use client";

import { motion } from "framer-motion";
export default function PartnersPage() {
  return (
    <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-black text-white min-h-screen">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-8 py-28 grid md:grid-cols-2 gap-16 items-center">
        {/* Left Content */}
        <div>
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight">
            <span className="bg-gradient-to-r from-orange-400 via-pink-500 to-purple-600 bg-clip-text text-transparent">
              Partner with PoPP
            </span>
          </h1>
          <p className="mt-6 text-lg text-gray-300 max-w-lg">
            Join forces with the Proof-of-Problem Protocol and be part of a global revolution. 
            Together, we solve real-world issues with blockchain-backed transparency.
          </p>
          <div className="mt-8 flex gap-4">
            <button className="px-6 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-pink-600 hover:opacity-90 transition shadow-lg shadow-orange-500/30">
              Become a Partner
            </button>
            <button className="px-6 py-3 rounded-xl border border-gray-600 hover:bg-gray-800 transition">
              Learn More
            </button>
          </div>
        </div>

        {/* Right Illustration */}
        <div className="relative">
          
          <img
            src="./patners.png"
            alt="Partnership"
            className="relative z-10 w-full max-w-md mx-auto"
          />
 </div>
      </section>

      {/* Why Partner With Us */}
      <section className="max-w-6xl mx-auto px-8 py-20">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-14">
          Why Partner With Us?
        </h2>
        <div className="grid md:grid-cols-3 gap-10">
          {[
            { title: "Global Reach", desc: "Expand your impact with a worldwide community." },
            { title: "Innovation", desc: "Be part of cutting-edge blockchain solutions." },
            { title: "Transparency", desc: "Work with trust and proof at the core." },
          ].map((card, idx) => (
            <div
              key={idx}
              className="p-8 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-lg hover:scale-105 hover:shadow-orange-500/30 transition"
            >
              <h3 className="text-xl font-semibold mb-3 bg-gradient-to-r from-orange-400 to-pink-500 bg-clip-text text-transparent">
                {card.title}
              </h3>
              <p className="text-gray-300">{card.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Types of Partnerships */}
      <section className="bg-gradient-to-r from-slate-900 to-slate-800 py-20 px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-14">
          Types of Partnerships
        </h2>
        <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {["Technology", "Community", "Enterprise", "Investors"].map((type, i) => (
            <div
              key={i}
              className="p-6 rounded-xl bg-white/5 border border-white/10 hover:border-orange-500 hover:shadow-lg hover:shadow-orange-500/20 transition text-center"
            >
              <h3 className="text-xl font-semibold">{type} Partners</h3>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-28 text-center relative">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 via-pink-500/20 to-purple-600/20 blur-3xl" />
        <h2 className="text-4xl font-extrabold relative z-10">
          Ready to Build the Future Together?
        </h2>
        <p className="mt-4 text-gray-300 relative z-10">
          Let’s collaborate and redefine problem-solving at scale.
        </p>
        <button className="mt-8 px-8 py-4 rounded-2xl bg-gradient-to-r from-orange-500 to-pink-600 text-lg font-semibold shadow-lg shadow-orange-500/30 hover:opacity-90 transition relative z-10">
          Get Started
        </button>
      </section>
    </div>
  );
}
