"use client";
import { motion } from "framer-motion";

const events = [
  {
    title: "Space Innovation Summit",
    date: "2025-08-20",
    location: "Virtual Event",
    image: "/images/space-summit.jpg",
    description: "A gathering of the brightest minds in space technology.",
    type: "upcoming",
  },
  {
    title: "PoPP Developer Meetup",
    date: "2025-09-05",
    location: "Dubai, UAE",
    image: "/images/dev-meet.jpg",
    description: "Hands-on coding, networking, and building PoPP tools.",
    type: "upcoming",
  },
  {
    title: "Hackathon 2025",
    date: "2025-07-15",
    location: "Bangalore, India",
    image: "/images/hackathon.jpg",
    description: "48-hour innovation challenge to solve real-world problems.",
    type: "past",
  },
];

export default function EventsPage() {
  return (
    <div className="bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
      {/* Hero Section */}
      <section
        className="relative h-[60vh] flex items-center justify-center text-center"
        style={{
          backgroundImage: "url('/images/events-bg.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10">
          <h1 className="text-5xl font-bold mb-4">🚀 PoPP Events</h1>
          <p className="text-lg max-w-2xl mx-auto">
            Connect, learn, and innovate with the global PoPP community.
          </p>
        </div>
      </section>

      {/* Upcoming Events Timeline */}
      <section className="py-16 max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold mb-8">Upcoming Events</h2>
        <div className="relative border-l border-gray-700 pl-8">
          {events
            .filter((e) => e.type === "upcoming")
            .map((event, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: i * 0.2 }}
                className="mb-10"
              >
                <div className="absolute -left-4 top-2 w-8 h-8 bg-orange-500 rounded-full border-4 border-gray-900" />
                <div className="bg-gray-800/60 p-6 rounded-xl shadow-lg hover:shadow-orange-500/40 transition-all">
                  <h3 className="text-xl font-semibold">{event.title}</h3>
                  <p className="text-sm text-gray-400">
                    {event.date} — {event.location}
                  </p>
                  <p className="mt-2">{event.description}</p>
                </div>
              </motion.div>
            ))}
        </div>
      </section>

      {/* Past Events Grid */}
      <section className="py-16 bg-gray-950">
        <h2 className="text-3xl font-bold mb-8 text-center">Past Events</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {events
            .filter((e) => e.type === "past")
            .map((event, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="relative overflow-hidden rounded-2xl shadow-lg hover:scale-105 transition-transform"
              >
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-64 object-cover"
                />
                <div className="absolute inset-0 bg-black/60 p-4 flex flex-col justify-end">
                  <h3 className="text-lg font-bold">{event.title}</h3>
                  <p className="text-sm text-gray-300">{event.date}</p>
                </div>
              </motion.div>
            ))}
        </div>
      </section>
    </div>
  );
}
