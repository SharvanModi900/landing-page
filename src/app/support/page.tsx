// 'use client';
// import { Mail, MessageCircle, BookOpen } from 'lucide-react';
// import { motion } from 'framer-motion';

// export default function SupportHeroSection() {
//   const supportCards = [
//     {
//       title: 'Email Support',
//       desc: 'Reach out to our friendly team via email for personalized help.',
//       icon: <Mail className="w-12 h-12 text-orange-400" />,
//       btn: 'Send Email',
//     },
//     {
//       title: 'Live Chat',
//       desc: 'Get quick answers with our live chat feature.',
//       icon: <MessageCircle className="w-12 h-12 text-orange-400" />,
//       btn: 'Start Chat',
//     },
//     {
//       title: 'Knowledge Base',
//       desc: 'Browse guides, FAQs, and documentation for self-help.',
//       icon: <BookOpen className="w-12 h-12 text-orange-400" />,
//       btn: 'Explore Docs',
//     },
//   ];

//   return (
//     <section className="relative bg-gradient-to-br from-[#010519] via-[#0a0e23] to-black text-white min-h-screen flex flex-col justify-center overflow-hidden">
//       {/* Background animated energy lines */}
//       <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
//         <defs>
//           <linearGradient id="neon" x1="0%" y1="0%" x2="100%" y2="100%">
//             <stop offset="0%" stopColor="#5dcfff" />
//             <stop offset="50%" stopColor="#c77dff" />
//             <stop offset="100%" stopColor="#ff884d" />
//           </linearGradient>
//         </defs>
//         {Array.from({ length: 20 }).map((_, idx) => (
//           <motion.line
//             key={idx}
//             x1={Math.random() * 100 + '%'}
//             y1={Math.random() * 100 + '%'}
//             x2={Math.random() * 100 + '%'}
//             y2={Math.random() * 100 + '%'}
//             stroke="url(#neon)"
//             strokeWidth="2"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: [0, 0.6, 0] }}
//             transition={{ repeat: Infinity, duration: 4 + idx * 0.3, delay: idx * 0.2 }}
//           />
//         ))}
//       </svg>

//       <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
//         {/* Left Text */}
//         <div className="flex-1 space-y-6 max-w-xl">
//           <h1 className="text-4xl lg:text-6xl font-extrabold">
//             <span className="bg-gradient-to-r from-[#5DCBFF] via-[#C77DFF] to-[#FF884D] bg-clip-text text-transparent">
//               Need Help? We’re Here
//             </span>
//           </h1>
//           <p className="text-lg text-gray-400 max-w-md">
//             Connect with the PoPP support team. Get guidance, report issues, or explore our knowledge base
//             to resolve problems efficiently and securely.
//           </p>
//         </div>

//         {/* Right Cards */}
//         <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-6">
//           {supportCards.map((card, idx) => (
//             <motion.div
//               key={idx}
//               initial={{ y: 40, opacity: 0 }}
//               animate={{ y: 0, opacity: 1 }}
//               transition={{ duration: 0.6, delay: idx * 0.2 }}
//               className="relative bg-gradient-to-br from-[#1a1f3a]/60 via-[#0a0e23]/40 to-[#011344]/70 backdrop-blur-lg rounded-3xl p-6 shadow-2xl border border-blue-400/20 hover:scale-105 transition-transform overflow-hidden"
//             >
//               {/* Neon floating blobs */}
//               <div className="absolute -top-6 -left-6 w-24 h-24 rounded-full bg-blue-400/20 blur-3xl animate-pulse-slow pointer-events-none"></div>
//               <div className="absolute -bottom-6 -right-6 w-24 h-24 rounded-full bg-orange-400/20 blur-3xl animate-pulse-slower pointer-events-none"></div>

//               <div className="flex justify-center">{card.icon}</div>
//               <h3 className="mt-4 text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#5DCBFF] via-[#C77DFF] to-[#FF884D]">
//                 {card.title}
//               </h3>
//               <p className="text-gray-400 mt-2 text-sm">{card.desc}</p>
//               <button className="mt-6 w-full bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 hover:from-pink-500 hover:to-orange-500 text-white py-2 px-4 rounded-xl shadow-lg transition-all transform hover:scale-105">
//                 {card.btn}
//               </button>
//             </motion.div>
//           ))}
//         </div>
//       </div>

//       <style jsx>{`
//         @keyframes pulse-slow {
//           0%,100% { opacity: 0.3; }
//           50% { opacity: 0.7; }
//         }
//         @keyframes pulse-slower {
//           0%,100% { opacity: 0.2; }
//           50% { opacity: 0.6; }
//         }
//         .animate-pulse-slow { animation: pulse-slow 5s infinite; }
//         .animate-pulse-slower { animation: pulse-slower 7s infinite; }
//       `}</style>
//     </section>
//   );
// }

'use client';
import { Mail, MessageCircle, BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';

export default function SupportPageHero() {
  const supportCards = [
    {
      title: 'Email Support',
      desc: 'Reach out to our friendly team via email for personalized help.',
      icon: <Mail className="w-12 h-12 text-orange-400" />,
      btn: 'Send Email',
    },
    {
      title: 'Live Chat',
      desc: 'Get quick answers with our live chat feature.',
      icon: <MessageCircle className="w-12 h-12 text-orange-400" />,
      btn: 'Start Chat',
    },
    {
      title: 'Knowledge Base',
      desc: 'Browse guides, FAQs, and documentation for self-help.',
      icon: <BookOpen className="w-12 h-12 text-orange-400" />,
      btn: 'Explore Docs',
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#010519] via-[#0a0e23] to-black text-white min-h-screen flex flex-col justify-center overflow-hidden">
        {/* Background neon lines */}
        <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
          <defs>
            <linearGradient id="neon" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#5dcfff" />
              <stop offset="50%" stopColor="#c77dff" />
              <stop offset="100%" stopColor="#ff884d" />
            </linearGradient>
          </defs>
          {Array.from({ length: 20 }).map((_, idx) => (
            <motion.line
              key={idx}
              x1={Math.random() * 100 + '%'}
              y1={Math.random() * 100 + '%'}
              x2={Math.random() * 100 + '%'}
              y2={Math.random() * 100 + '%'}
              stroke="url(#neon)"
              strokeWidth="2"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.6, 0] }}
              transition={{ repeat: Infinity, duration: 4 + idx * 0.3, delay: idx * 0.2 }}
            />
          ))}
        </svg>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 flex flex-col items-start gap-8">
          <h1 className="text-5xl lg:text-6xl font-extrabold">
            <span className="bg-gradient-to-r from-[#5DCBFF] via-[#C77DFF] to-[#FF884D] bg-clip-text text-transparent">
              Need Help? We’re Here
            </span>
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl">
            Connect with the PoPP support team. Get guidance, report issues, or explore our knowledge base
            to resolve problems efficiently and securely.
          </p>
          <button className="mt-6 px-6 py-3 bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 hover:from-pink-500 hover:to-orange-500 text-white rounded-xl shadow-lg transition-transform hover:scale-105">
            Contact Support
          </button>
        </div>
      </section>

      {/* Support Cards Section */}
      <section className="relative bg-black py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 grid md:grid-cols-3 gap-8">
          {supportCards.map((card, idx) => (
            <motion.div
              key={idx}
              initial={{ y: 40, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.2 }}
              className="relative bg-gradient-to-br from-[#1a1f3a]/60 via-[#0a0e23]/40 to-[#011344]/70 backdrop-blur-lg rounded-3xl p-6 shadow-2xl border border-blue-400/20 hover:scale-105 transition-transform overflow-hidden"
            >
              <div className="absolute -top-6 -left-6 w-24 h-24 rounded-full bg-blue-400/20 blur-3xl animate-pulse-slow pointer-events-none"></div>
              <div className="absolute -bottom-6 -right-6 w-24 h-24 rounded-full bg-orange-400/20 blur-3xl animate-pulse-slower pointer-events-none"></div>
              <div className="flex justify-center">{card.icon}</div>
              <h3 className="mt-4 text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#5DCBFF] via-[#C77DFF] to-[#FF884D]">
                {card.title}
              </h3>
              <p className="text-gray-400 mt-2 text-sm">{card.desc}</p>
              <button className="mt-6 w-full bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 hover:from-pink-500 hover:to-orange-500 text-white py-2 px-4 rounded-xl shadow-lg transition-all transform hover:scale-105">
                {card.btn}
              </button>
            </motion.div>
          ))}
        </div>
      </section>

      <style jsx>{`
        @keyframes pulse-slow {
          0%,100% { opacity: 0.3; }
          50% { opacity: 0.7; }
        }
        @keyframes pulse-slower {
          0%,100% { opacity: 0.2; }
          50% { opacity: 0.6; }
        }
        .animate-pulse-slow { animation: pulse-slow 5s infinite; }
        .animate-pulse-slower { animation: pulse-slower 7s infinite; }
      `}</style>
    </>
  );
}
