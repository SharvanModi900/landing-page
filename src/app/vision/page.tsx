// "use client";

// import { motion } from "framer-motion";
// import { Rocket, Eye, Lightbulb, Target } from "lucide-react";

// export default function VisionPage() {
//   return (
//     <div className="min-h-screen bg-gradient-to-b from-[#0b0e11] to-[#14181d] text-white">
//       {/* Hero Section */}
//      {/* Hero Section */}
// <section className="relative flex flex-col md:flex-row items-center justify-between text-center md:text-left py-24 px-6 max-w-7xl mx-auto">
//   <div className="flex-1">
//     <motion.h1
//       initial={{ opacity: 0, y: -40 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.8 }}
//       className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
//     >
//       Our Vision for the Future
//     </motion.h1>
//     <motion.p
//       initial={{ opacity: 0, y: 30 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ delay: 0.3, duration: 0.8 }}
//       className="max-w-xl text-lg md:text-xl text-gray-300 mx-auto md:mx-0"
//     >
//       To revolutionize the way problems are identified, validated, and solved—creating a decentralized, transparent, and intelligent ecosystem for a better tomorrow.
//     </motion.p>
//   </div>

//   {/* Illustration */}
//   <motion.img
//     src="/vision.png"
//     alt="Vision Illustration"
//     initial={{ opacity: 0, scale: 0.9 }}
//     animate={{ opacity: 1, scale: 1 }}
//     transition={{ delay: 0.6, duration: 0.8 }}
//     className="flex-1 mt-10 md:mt-0 md:ml-12 w-full max-w-lg rounded-2xl shadow-lg"
//   />
// </section>

//       {/* Vision Statement */}
//       <section className="py-20 px-6 bg-[#14181d] text-center">
//         <motion.blockquote
//           initial={{ opacity: 0 }}
//           whileInView={{ opacity: 1 }}
//           transition={{ duration: 1 }}
//           className="max-w-4xl mx-auto text-2xl md:text-3xl font-semibold italic text-orange-400"
//         >
//           “We envision a world where collective intelligence and blockchain converge to transform challenges into opportunities for humanity.”
//         </motion.blockquote>
//       </section>

//       {/* Approach Section */}
//       <section className="py-20 px-6 max-w-6xl mx-auto">
//         <h2 className="text-4xl font-bold text-center mb-14">Our Approach</h2>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
//           <motion.div
//             whileHover={{ scale: 1.05 }}
//             className="p-6 bg-[#1c1f26] rounded-2xl shadow-lg flex flex-col items-center"
//           >
//             <Eye className="w-12 h-12 text-orange-400 mb-4" />
//             <h3 className="text-xl font-semibold mb-2">Identify</h3>
//             <p className="text-gray-400 text-center">
//               Gathering real-world problems and ensuring their authenticity.
//             </p>
//           </motion.div>
//           <motion.div
//             whileHover={{ scale: 1.05 }}
//             className="p-6 bg-[#1c1f26] rounded-2xl shadow-lg flex flex-col items-center"
//           >
//             <Lightbulb className="w-12 h-12 text-orange-400 mb-4" />
//             <h3 className="text-xl font-semibold mb-2">Validate</h3>
//             <p className="text-gray-400 text-center">
//               Leveraging AI & blockchain to verify, categorize, and prioritize.
//             </p>
//           </motion.div>
//           <motion.div
//             whileHover={{ scale: 1.05 }}
//             className="p-6 bg-[#1c1f26] rounded-2xl shadow-lg flex flex-col items-center"
//           >
//             <Rocket className="w-12 h-12 text-orange-400 mb-4" />
//             <h3 className="text-xl font-semibold mb-2">Solve</h3>
//             <p className="text-gray-400 text-center">
//               Empowering communities and organizations to deliver sustainable solutions.
//             </p>
//           </motion.div>
//         </div>
//       </section>

//       {/* Closing CTA */}
//       <section className="py-20 text-center bg-gradient-to-r from-orange-600 to-red-500">
//         <h2 className="text-3xl md:text-4xl font-bold mb-6">Building the Future Together</h2>
//         <p className="max-w-2xl mx-auto mb-8 text-gray-200">
//           Join us in shaping a transparent, intelligent, and decentralized future.
//         </p>
//         <button className="px-8 py-4 bg-black rounded-xl text-lg font-semibold hover:bg-gray-900 transition">
//           Get Involved
//         </button>
//       </section>
//     </div>
//   );
// }

"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight, Sparkles } from "lucide-react";

export default function VisionPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0b0e11] to-[#14181d] text-white overflow-hidden">
      
      {/* Hero Section */}
      <section className="relative flex flex-col lg:flex-row items-center justify-between px-10 lg:px-24 py-20 lg:py-28">
        
        {/* Left Side */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="flex-1 text-left"
        >
          <h1 className="text-5xl lg:text-6xl font-extrabold leading-tight bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
            Our Vision for the Future
          </h1>
          <p className="mt-6 text-lg text-gray-300 max-w-xl">
            At PoPP, we envision a decentralized world where real-world 
            challenges are not just identified, but collaboratively 
            solved through the power of collective intelligence, 
            blockchain integrity, and futuristic innovation.
          </p>
          <motion.a
            href="#approach"
            whileHover={{ scale: 1.05 }}
            className="inline-flex items-center gap-2 mt-8 px-6 py-3 bg-gradient-to-r from-orange-500 to-red-600 rounded-2xl shadow-lg text-lg font-semibold hover:opacity-90 transition"
          >
            Discover Our Approach <ArrowRight className="w-5 h-5" />
          </motion.a>
        </motion.div>

        {/* Right Side Illustration */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="flex-1 flex justify-center mt-12 lg:mt-0"
        >
          <motion.img
            src="/vision.png"
            alt="Vision Illustration"
            width={600}
            height={500}
            className="rounded-2xl shadow-2xl border border-orange-500/20"
          />
        </motion.div>
      </section>

      {/* Vision Statement */}
      <section className="text-center px-6 lg:px-24 py-20">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl font-bold mb-6"
        >
          <Sparkles className="inline-block w-8 h-8 text-orange-400 mr-2" />
          A World Built on Trust & Transparency
        </motion.h2>
        <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
          Our vision is to empower communities with a framework where problems are 
          validated, solutions are trusted, and collaboration is limitless.  
          Through blockchain-driven validation and intelligent data models, 
          we create a foundation of truth that drives real-world change.
        </p>
      </section>

      {/* Approach Section */}
      <section
        id="approach"
        className="px-6 lg:px-24 py-20 bg-gradient-to-b from-[#14181d] to-[#0b0e11]"
      >
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center text-4xl font-bold mb-16"
        >
          Our Approach
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-10">
          {[
            {
              title: "Decentralized Verification",
              desc: "Every problem is validated on the blockchain, ensuring authenticity and eliminating bias.",
            },
            {
              title: "Collective Intelligence",
              desc: "Harnessing communities and AI-driven insights to bring forth actionable solutions.",
            },
            {
              title: "Scalable Transparency",
              desc: "Building a system where every step is visible, auditable, and trusted globally.",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: i * 0.2 }}
              className="p-8 rounded-2xl bg-[#1a1f27] shadow-xl hover:shadow-orange-500/30 border border-gray-800 transition"
            >
              <h3 className="text-2xl font-semibold mb-4 text-orange-400">
                {item.title}
              </h3>
              <p className="text-gray-300">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
