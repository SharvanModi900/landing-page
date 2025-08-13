"use client";
import Image from "next/image";

export default function MissionPage() {
  return (
    <main className="bg-black text-white min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <Image
          src=""
          alt="Mission Background"
          fill
          className="object-cover opacity-40"
          priority
        />
        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/90"></div>

        {/* Content */}
        <div className="relative z-10 text-center max-w-4xl px-6">
          <h1 className="text-6xl font-extrabold tracking-tight bg-gradient-to-r from-orange-500 via-yellow-400 to-red-500 bg-clip-text text-transparent drop-shadow-lg">
            Our Mission
          </h1>
          <p className="mt-6 text-lg md:text-xl text-gray-300 leading-relaxed">
            To redefine innovation through relentless pursuit of excellence, 
            harnessing technology to solve humanity’s most complex challenges.
          </p>
          <div className="mt-8">
            <a
              href="#learn-more"
              className="px-8 py-4 bg-orange-500 hover:bg-orange-600 rounded-full font-semibold text-lg shadow-lg transition-all duration-300"
            >
              Learn More
            </a>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section
        id="learn-more"
        className="py-20 px-6 bg-gradient-to-br from-zinc-900 via-black to-zinc-950"
      >
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-12">
          <div className="p-6 bg-zinc-800/60 backdrop-blur-md rounded-2xl border border-zinc-700 shadow-xl hover:scale-105 transition-transform duration-300">
            <h3 className="text-2xl font-bold text-orange-400 mb-4">
              Innovation
            </h3>
            <p className="text-gray-300">
              We push boundaries, challenge norms, and constantly seek new ways
              to create value.
            </p>
          </div>
          <div className="p-6 bg-zinc-800/60 backdrop-blur-md rounded-2xl border border-zinc-700 shadow-xl hover:scale-105 transition-transform duration-300">
            <h3 className="text-2xl font-bold text-orange-400 mb-4">
              Integrity
            </h3>
            <p className="text-gray-300">
              Our actions are guided by strong ethics, transparency, and
              accountability.
            </p>
          </div>
          <div className="p-6 bg-zinc-800/60 backdrop-blur-md rounded-2xl border border-zinc-700 shadow-xl hover:scale-105 transition-transform duration-300">
            <h3 className="text-2xl font-bold text-orange-400 mb-4">
              Impact
            </h3>
            <p className="text-gray-300">
              Every step we take aims to positively impact people, communities,
              and the planet.
            </p>
          </div>
        </div>
      </section>

      {/* Vision Statement */}
      <section className="py-24 px-6 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-orange-900/10 to-black"></div>
        <div className="relative max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-extrabold text-orange-500">
            Driving the Future Forward
          </h2>
          <p className="mt-6 text-lg text-gray-300 leading-relaxed">
            We believe in empowering the world with tools, knowledge, and
            technology that inspire progress and transform lives. Our mission is
            not just a statement – it’s a commitment to shaping a better
            tomorrow.
          </p>
        </div>
      </section>
    </main>
  );
}
