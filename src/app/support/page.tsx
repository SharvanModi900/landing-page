'use client';
import { Mail, MessageCircle, BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';

export default function SupportPageHero() {
  const supportCards = [
    {
      title: 'Email Support',
      desc: 'Reach out to our friendly team via email for personalized help.',
      icon: <Mail className="w-8 h-8 text-cyan-400" />,
      btn: 'Send Email',
    },
    {
      title: 'Live Chat',
      desc: 'Get quick answers with our live chat feature.',
      icon: <MessageCircle className="w-8 h-8 text-cyan-400" />,
      btn: 'Start Chat',
    },
    {
      title: 'Knowledge Base',
      desc: 'Browse guides, FAQs, and documentation for self-help.',
      icon: <BookOpen className="w-8 h-8 text-cyan-400" />,
      btn: 'Explore Docs',
    },
  ];

  return (
    <div className="bg-[#030712] text-white min-h-screen overflow-x-hidden">
      <div className="">
        {/* Hero Section */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold mb-4">
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Need Help? We're Here
            </span>
          </h1>
          <p className="text-gray-400 max-w-2xl mb-6">
            Connect with the PoPP support team. Get guidance, report issues, or explore our knowledge base
            to resolve problems efficiently and securely.
          </p>
          <button className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl font-semibold">
            Contact Support
          </button>
        </section>

        {/* Support Cards Section */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 py-8 grid grid-cols-1 md:grid-cols-3 gap-5">
          {supportCards.map((card, idx) => (
            <motion.div
              key={idx}
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.15 }}
              className="bg-white/5 border border-white/10 rounded-xl p-5"
            >
              <div className="flex justify-center mb-3">{card.icon}</div>
              <h3 className="text-lg font-bold text-center mb-2">{card.title}</h3>
              <p className="text-gray-400 text-sm text-center">{card.desc}</p>
              <button className="mt-4 w-full py-2 px-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl text-sm font-semibold">
                {card.btn}
              </button>
            </motion.div>
          ))}
        </section>
      </div>
    </div>
  );
}
