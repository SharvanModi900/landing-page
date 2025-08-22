"use client";

import { motion } from "framer-motion";

export default function ValidatorSection() {
  const validators = [
    {
      type: "Human Validators",
      requirements: "Must stake PoPP tokens, pass onboarding quiz, build reputation",
      benefits: "Higher rewards, governance voting rights, access to critical cases",
      icon: "👥",
      gradient: "from-purple-500 via-pink-500 to-red-500"
    },
    {
      type: "AI Validators",
      requirements: "Open-source or audit-verified, run in trusted enclaves",
      benefits: "Pattern detection, 24/7 availability, objective analysis",
      icon: "🤖",
      gradient: "from-blue-500 via-cyan-500 to-teal-500"
    },
    {
      type: "IoT/Sensor Validators",
      requirements: "Registered devices with metadata & calibration data",
      benefits: "Real-world signals, objective measurements, continuous monitoring",
      icon: "📡",
      gradient: "from-green-400 via-lime-400 to-yellow-300"
    }
  ];

  return (
    <section className="py-24 px-6 bg-gradient-to-b from-[#0b0e11] to-[#14181d]">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-20">
          <h2 className="text-5xl lg:text-6xl font-bold text-white mb-4">
            Who Can Be a <span className="text-blue-400">Validator?</span>
          </h2>
          <p className="text-lg lg:text-xl text-gray-400 max-w-3xl mx-auto">
            PoPP allows any qualified participant to become a validator—as long as they earn it
          </p>
        </div>

        {/* Premium Panel */}
        <div className="flex flex-col lg:flex-row gap-8">
          {validators.map((validator, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="relative flex-1 group rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-br from-white/5 to-white/2 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              {/* Left Gradient Sidebar */}
              <div
                className={`absolute left-0 top-0 h-full w-2 bg-gradient-to-b ${validator.gradient} animate-pulse-slow`}
              ></div>

              {/* Content */}
              <div className="p-8 flex flex-col justify-between h-full">
                {/* Icon + Type */}
                <div className="flex items-center gap-4 mb-6">
                  <div
                    className={`w-16 h-16 flex items-center justify-center text-3xl bg-gradient-to-tr ${validator.gradient} rounded-full shadow-lg`}
                  >
                    {validator.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-white">{validator.type}</h3>
                </div>

                {/* Requirements & Benefits */}
                <div className="space-y-4">
                  <div>
                    <h4 className="text-blue-400 font-semibold mb-1 uppercase tracking-wide text-sm">Requirements</h4>
                    <p className="text-gray-300 text-sm">{validator.requirements}</p>
                  </div>
                  <div>
                    <h4 className="text-green-400 font-semibold mb-1 uppercase tracking-wide text-sm">Benefits</h4>
                    <p className="text-gray-300 text-sm">{validator.benefits}</p>
                  </div>
                </div>

                {/* Bottom Glow Line */}
                <div className={`mt-6 h-1 w-full bg-gradient-to-r ${validator.gradient} rounded-full animate-pulse-slow`} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
