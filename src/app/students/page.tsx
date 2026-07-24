"use client";

import { motion } from "framer-motion";

export default function StudentZone() {
  const cards = [
    { title: "Workshops & Bootcamps", desc: "Hands-on technical and non-technical sessions to sharpen your skills and prepare you for real-world challenges." },
    { title: "Innovation Labs", desc: "A creative space where students collaborate on projects, explore ideas, and develop innovative solutions." },
    { title: "Student Community", desc: "Join a vibrant community of learners, share knowledge, and collaborate on impactful initiatives." },
    { title: "Hackathons & Competitions", desc: "Participate in hackathons and competitions to showcase your talent and solve real-world problems." },
    { title: "Learning Resources", desc: "Access curated study materials, guides, and mentorship from industry-leading experts." },
    { title: "Career Support", desc: "Guidance, internships, and placement opportunities tailored to students' career aspirations." },
  ];

  return (
    <div className="min-h-screen bg-[#030712] text-white">
      <div className="pt-16">
        {/* Hero Section */}
        <section className="max-w-5xl mx-auto px-6 py-12">
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4">
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Student Zone
            </span>
          </h1>
          <p className="text-gray-400 max-w-2xl">
            The Student Zone is designed to empower learners, innovators, and
            future leaders by providing access to resources, events, and
            communities that foster collaboration, creativity, and growth.
          </p>
        </section>

        {/* Content Cards */}
        <section className="max-w-5xl mx-auto px-6 py-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {cards.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="bg-white/5 border border-white/10 rounded-xl p-5"
            >
              <h3 className="text-lg font-semibold mb-2">{card.title}</h3>
              <p className="text-gray-400 text-sm">{card.desc}</p>
            </motion.div>
          ))}
        </section>
      </div>
    </div>
  );
}
