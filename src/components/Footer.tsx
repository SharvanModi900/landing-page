'use client';

import Link from 'next/link';
import { megaMenuSections } from './Navigation';
import { Mail, Twitter, Linkedin, Github } from 'lucide-react';

// Generate deterministic particle positions using a simple hash function
function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return Math.abs(hash);
}

// Generate deterministic particle properties
function getParticleProperties(index: number): { top: string; left: string; duration: string; delay: string } {
  // Create a unique seed for each particle
  const seed = `particle-${index}`;
  
  // Use hash to generate deterministic "random" values
  const hash = hashString(seed);
  
  // Generate values in predictable ranges
  const top = `${(hash % 100)}%`;
  const left = `${((hash * 31) % 100)}%`;
  const duration = `${4 + (hash % 6)}s`;
  const delay = `${(hash * 17) % 5}s`;
  
  return {
    top,
    left,
    duration,
    delay
  };
}

export default function Footer() {
  return (
    <footer className="relative bg-[#010519] text-gray-300 overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0">
        <div className="absolute -top-40 left-0 w-[600px] h-[600px] rounded-full bg-purple-600/20 blur-3xl animate-pulse-slow"></div>
        <div className="absolute -bottom-40 right-0 w-[700px] h-[700px] rounded-full bg-blue-500/20 blur-3xl animate-pulse-slower"></div>
      </div>

      {/* ✨ Animated Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 25 }).map((_, i) => {
          const { top, left, duration, delay } = getParticleProperties(i);
          return (
            <span
              key={i}
              className="absolute w-1 h-1 bg-white/70 rounded-full animate-float"
              style={{
                top,
                left,
                animationDuration: duration,
                animationDelay: delay,
                opacity: 0.6,
              }}
            />
          );
        })}
      </div>

      {/* CTA Section */}
      <div className="relative max-w-7xl mx-auto px-6 md:px-16 py-16 text-center z-10">
        <h2 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          Join the PoPP Movement
        </h2>
        <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
          Stay connected with the Proof of Problem Protocol. Get updates, insights, and exclusive community invitations.
        </p>

        {/* Newsletter Input */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <input
            type="email"
            placeholder="Enter your email"
            className="px-4 py-3 rounded-xl bg-white/5 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm w-full sm:w-96"
          />
          <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl shadow-lg hover:scale-105 transition font-semibold">
            Subscribe
          </button>
        </div>

        {/* Social Links */}
        <div className="flex justify-center gap-6 mt-8">
          {[Twitter, Linkedin, Github, Mail].map((Icon, idx) => (
            <a
              key={idx}
              href="#"
              className="p-3 rounded-full bg-white/5 hover:bg-gradient-to-r from-blue-500 to-purple-600 transition"
            >
              <Icon className="w-5 h-5" />
            </a>
          ))}
        </div>
      </div>

      {/* Footer Links */}
      <div className="relative max-w-7xl mx-auto px-6 md:px-16 py-12 grid sm:grid-cols-2 md:grid-cols-5 gap-10 border-t border-white/10 z-10">
        {megaMenuSections.map((section) => (
          <div key={section.label}>
            <h6 className="text-sm font-bold text-white mb-5 uppercase tracking-wider">
              {section.label}
            </h6>
            <ul className="space-y-3">
              {section.submenu.map((item) => (
                <li key={item.title}>
                  <Link
                    href={item.href}
                    className="relative text-sm text-gray-400 hover:text-white transition group"
                  >
                    <span className="bg-gradient-to-r from-blue-400 to-purple-500 absolute left-0 bottom-0 h-[1px] w-0 group-hover:w-full transition-all"></span>
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom Bar */}
      <div className="relative text-center text-xs text-gray-500 border-t border-white/10 py-6 z-10">
        <p>© {new Date().getFullYear()} PoPP. All rights reserved.</p>
        <p className="text-gray-400 mt-2">Built with 🔮 to reimagine problem-solving.</p>
      </div>

      <style jsx>{`
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.9; }
        }
        @keyframes pulse-slower {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.7; }
        }
        @keyframes float {
          0% { transform: translateY(0) translateX(0); opacity: 0.6; }
          50% { transform: translateY(-20px) translateX(10px); opacity: 1; }
          100% { transform: translateY(0) translateX(0); opacity: 0.6; }
        }
        .animate-pulse-slow { animation: pulse-slow 6s infinite; }
        .animate-pulse-slower { animation: pulse-slower 10s infinite; }
        .animate-float { animation: float infinite ease-in-out; }
      `}</style>
    </footer>
  );
}