"use client";
import { motion } from "framer-motion";

const events = [
  {
    title: "PoPP Validator Onboarding Workshop",
    date: "2025-08-20",
    location: "Virtual Event",
    description: "Learn how to become a PoPP validator — staking, evidence review, and reputation scoring.",
    type: "upcoming",
  },
  {
    title: "PoPP Developer Meetup",
    date: "2025-09-05",
    location: "Bengaluru, India",
    description: "Hands-on coding, networking, and building PoPP tools with the core team.",
    type: "upcoming",
  },
  {
    title: "Civic Tech & PoPP: Governance Deep-Dive",
    date: "2025-09-18",
    location: "Virtual Event",
    description: "How NGOs and civic organizations can integrate PoPP for transparent problem reporting.",
    type: "upcoming",
  },
  {
    title: "PoPP Hackathon 2025",
    date: "2025-07-15",
    location: "Bengaluru, India",
    description: "48-hour challenge to build tools and integrations on the PoPP protocol.",
    type: "past",
  },
];

export default function EventsPage() {
  return (
    <div className="bg-[#030712] text-white min-h-screen overflow-x-hidden">
      <div className="pt-16">
        {/* Hero Section */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 py-12 text-center">
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold mb-4">
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              PoPP Events
            </span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Connect, learn, and innovate with the global PoPP community.
          </p>
        </section>

        {/* Upcoming Events Timeline */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
          <h2 className="text-2xl font-bold mb-6">Upcoming Events</h2>
          <div className="relative border-l border-white/10 pl-6">
            {events
              .filter((e) => e.type === "upcoming")
              .map((event, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.15 }}
                  className="mb-6"
                >
                  <div className="absolute -left-[9px] top-2 w-4 h-4 bg-cyan-500 rounded-full border-2 border-[#030712]" />
                  <div className="bg-white/5 border border-white/10 rounded-xl p-5">
                    <h3 className="text-lg font-semibold">{event.title}</h3>
                    <p className="text-sm text-gray-500">
                      {event.date} — {event.location}
                    </p>
                    <p className="text-gray-400 mt-1 text-sm">{event.description}</p>
                  </div>
                </motion.div>
              ))}
          </div>
        </section>

        {/* Past Events Grid */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 py-8 border-t border-white/10">
          <h2 className="text-2xl font-bold mb-6 text-center">Past Events</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {events
              .filter((e) => e.type === "past")
              .map((event, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                  className="rounded-xl bg-white/5 border border-white/10 overflow-hidden"
                >
                  <div className="p-4">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center mb-3">
                      <span className="text-white font-bold text-sm">{event.title[0]}</span>
                    </div>
                    <h3 className="text-base font-bold">{event.title}</h3>
                    <p className="text-sm text-gray-500">{event.date} — {event.location}</p>
                    <p className="text-sm text-gray-400 mt-1">{event.description}</p>
                  </div>
                </motion.div>
              ))}
          </div>
        </section>
      </div>
    </div>
  );
}
