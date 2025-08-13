// pages/our-story.tsx
import React from "react";

export default function OurStory() {
  return (
    <main className="bg-slate-900 text-white overflow-hidden">
      {/* HERO SECTION */}
      <section className="relative h-screen flex flex-col justify-center items-center text-center px-6">
        {/* Background blobs */}
        <div className="absolute top-0 left-0 w-[30rem] h-[30rem] bg-purple-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-[25rem] h-[25rem] bg-blue-500/20 rounded-full blur-3xl"></div>

        <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-4 relative z-10">
          Our <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">Story</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-6 relative z-10">
          From humble beginnings to making a global impact — discover the journey that shaped who we are today.
        </p>
        <button className="bg-gradient-to-r from-purple-500 to-blue-500 px-6 py-3 rounded-full font-semibold hover:scale-105 transition relative z-10">
          Join Our Journey
        </button>
      </section>

      {/* MISSION & VISION */}
      <section className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
          <p className="text-gray-300 leading-relaxed">
            To empower communities and businesses worldwide through innovative solutions, integrity, and dedication.
          </p>
        </div>
        <div>
          <h2 className="text-3xl font-bold mb-4">Our Vision</h2>
          <p className="text-gray-300 leading-relaxed">
            We envision a future where technology seamlessly connects and enhances human experiences.
          </p>
        </div>
      </section>

      {/* TIMELINE */}
      <section className="bg-gradient-to-b from-slate-800 to-slate-900 py-20 px-6">
        <h2 className="text-4xl font-bold text-center mb-16">
          Our Journey
        </h2>
        <div className="relative border-l border-white/20 max-w-3xl mx-auto pl-8 space-y-12">
          {[
            { year: "2018", title: "The Beginning", desc: "We started as a small team with big dreams." },
            { year: "2020", title: "First Breakthrough", desc: "Our first product launch changed everything." },
            { year: "2023", title: "Global Reach", desc: "We expanded globally, impacting thousands of lives." },
          ].map((event, index) => (
            <div key={index} className="relative">
              <div className="absolute -left-4 w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center text-sm font-bold shadow-lg">
                {index + 1}
              </div>
              <div className="bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10 shadow-lg">
                <span className="text-blue-400 font-semibold">{event.year}</span>
                <h3 className="text-xl font-bold mt-2 mb-2">{event.title}</h3>
                <p className="text-gray-300">{event.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* TEAM / CULTURE */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <h2 className="text-4xl font-bold text-center mb-16">Our Culture</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {["Innovation", "Collaboration", "Excellence"].map((value, idx) => (
            <div
              key={idx}
              className="bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10 shadow-lg text-center"
            >
              <h3 className="text-xl font-bold mb-2">{value}</h3>
              <p className="text-gray-300">
                {value === "Innovation" && "We constantly push boundaries to bring new ideas to life."}
                {value === "Collaboration" && "We believe in teamwork that amplifies our strengths."}
                {value === "Excellence" && "We strive for the highest quality in everything we do."}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="bg-gradient-to-r from-purple-500 to-blue-500 py-16 text-center">
        <h2 className="text-3xl font-bold mb-4">Be Part of Our Next Chapter</h2>
        <p className="max-w-xl mx-auto mb-6 text-gray-100">
          We’re just getting started — join us in shaping the future.
        </p>
        <button className="bg-white text-purple-600 px-6 py-3 rounded-full font-semibold hover:scale-105 transition">
          Get in Touch
        </button>
      </section>
    </main>
  );
}
