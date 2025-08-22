"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function StudentZone() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0b0e11] to-[#14181d] text-white">
      
      {/* Hero Section */}
      <section className="relative py-24 px-8 lg:px-24 flex flex-col lg:flex-row items-center lg:items-start">
        {/* Text Content */}
        <div className="flex-1 lg:pr-16">
          <motion.h1
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7 }}
            className="text-5xl font-extrabold leading-tight mb-6"
          >
            Student Zone
          </motion.h1>
          <motion.p
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.9 }}
            className="text-lg text-gray-300 max-w-2xl"
          >
            The Student Zone is designed to empower learners, innovators, and
            future leaders by providing access to resources, events, and
            communities that foster collaboration, creativity, and growth.
          </motion.p>
        </div>

        {/* Image/Visual */}
        <motion.div
          initial={{ x: 60, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="flex-1 mt-12 lg:mt-0"
        >
          <Image
            src=""
            alt="Student Zone"
            width={600}
            height={400}
            className="rounded-2xl shadow-lg"
          />
        </motion.div>
      </section>

      {/* Content Sections */}
      <section className="px-8 lg:px-24 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-[#1a1f25] p-8 rounded-2xl shadow-lg"
        >
          <h3 className="text-2xl font-semibold mb-4">Workshops & Bootcamps</h3>
          <p className="text-gray-400">
            Hands-on technical and non-technical sessions to sharpen your skills
            and prepare you for real-world challenges.
          </p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-[#1a1f25] p-8 rounded-2xl shadow-lg"
        >
          <h3 className="text-2xl font-semibold mb-4">Innovation Labs</h3>
          <p className="text-gray-400">
            A creative space where students collaborate on projects, explore
            ideas, and develop innovative solutions.
          </p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-[#1a1f25] p-8 rounded-2xl shadow-lg"
        >
          <h3 className="text-2xl font-semibold mb-4">Student Community</h3>
          <p className="text-gray-400">
            Join a vibrant community of learners, share knowledge, and
            collaborate on impactful initiatives.
          </p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-[#1a1f25] p-8 rounded-2xl shadow-lg"
        >
          <h3 className="text-2xl font-semibold mb-4">Hackathons & Competitions</h3>
          <p className="text-gray-400">
            Participate in hackathons and competitions to showcase your talent
            and solve real-world problems.
          </p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-[#1a1f25] p-8 rounded-2xl shadow-lg"
        >
          <h3 className="text-2xl font-semibold mb-4">Learning Resources</h3>
          <p className="text-gray-400">
            Access curated study materials, guides, and mentorship from
            industry-leading experts.
          </p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-[#1a1f25] p-8 rounded-2xl shadow-lg"
        >
          <h3 className="text-2xl font-semibold mb-4">Career Support</h3>
          <p className="text-gray-400">
            Guidance, internships, and placement opportunities tailored to
            students’ career aspirations.
          </p>
        </motion.div>
      </section>
    </div>
  );
}
