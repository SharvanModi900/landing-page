// "use client";
// import { motion } from "framer-motion";
// import { Download, ArrowLeft, Lock, Zap, Globe } from "lucide-react";
// import Link from "next/link";

// export default function CoreProtocolWhitepaper() {
//   return (
//     <div className="min-h-screen bg-gradient-to-b from-[#0b0e11] to-[#14181d] text-white">
//       {/* Hero Section */}
//       <section className="relative max-w-7xl mx-auto px-6 pt-28 pb-20 grid lg:grid-cols-2 gap-12 items-center">
//         {/* Left */}
//         <div>
//           <Link
//             href="/whitepapers"
//             className="inline-flex items-center text-sm text-gray-400 hover:text-orange-500 mb-6"
//           >
//             <ArrowLeft className="w-4 h-4 mr-2" /> Back to Whitepapers
//           </Link>

//           <h1 className="text-4xl md:text-5xl font-bold mb-6">
//             Whitepaper: <span className="text-orange-500">Core Protocol</span>
//           </h1>
//           <p className="text-gray-300 mb-8 max-w-xl">
//             An in-depth look at the fundamental architecture, governance, and
//             security model powering PoPP’s decentralized system.
//           </p>

//           <div className="flex gap-4">
//             <button className="px-6 py-3 rounded-lg bg-orange-500 hover:bg-orange-600 font-medium flex items-center gap-2">
//               <Download className="w-4 h-4" /> Download PDF
//             </button>
//             <button className="px-6 py-3 rounded-lg border border-gray-600 hover:border-orange-500 font-medium">
//               Contribute
//             </button>
//           </div>
//         </div>

//         {/* Right (Illustration placeholder) */}
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="w-full h-72 bg-gradient-to-tr from-orange-500/20 to-purple-600/20 rounded-2xl flex items-center justify-center"
//         >
//           <span className="text-gray-400">[Illustration Here]</span>
//         </motion.div>
//       </section>

//       {/* Abstract Section */}
//       <section className="max-w-5xl mx-auto px-6 mb-20">
//         <h2 className="text-2xl font-semibold mb-4">Abstract</h2>
//         <p className="text-gray-400 leading-relaxed">
//           The Core Protocol establishes the foundation of PoPP’s decentralized
//           system. It includes consensus, security guarantees, and modular
//           upgrades.
//         </p>
//       </section>

//       {/* Features Grid */}
//       <section className="max-w-6xl mx-auto px-6 mb-20">
//         <h2 className="text-2xl font-semibold mb-8">Key Features</h2>
//         <div className="grid md:grid-cols-3 gap-6">
//           <FeatureCard
//             icon={<Lock className="w-6 h-6 text-orange-500" />}
//             title="Strong Cryptography"
//             description="Advanced cryptographic primitives securing every layer of PoPP."
//           />
//           <FeatureCard
//             icon={<Zap className="w-6 h-6 text-orange-500" />}
//             title="Lightweight Consensus"
//             description="Efficient, scalable consensus ensuring decentralization and speed."
//           />
//           <FeatureCard
//             icon={<Globe className="w-6 h-6 text-orange-500" />}
//             title="Interoperable Design"
//             description="Built to scale and interact across diverse ecosystems."
//           />
//         </div>
//       </section>

//       {/* Future Work */}
//       <section className="max-w-5xl mx-auto px-6 mb-20">
//         <h2 className="text-2xl font-semibold mb-4">Future Work</h2>
//         <ul className="list-disc list-inside text-gray-400 space-y-2">
//           <li>Enhancements in governance and scalability.</li>
//           <li>Community-driven innovation.</li>
//           <li>Next-gen interoperability solutions.</li>
//         </ul>
//       </section>

//       {/* CTA */}
//       <section className="max-w-6xl mx-auto px-6 pb-20">
//         <div className="bg-[#14181d] border border-orange-500/30 rounded-2xl p-10 flex flex-col md:flex-row items-center justify-between">
//           <h3 className="text-lg font-medium mb-4 md:mb-0">
//             Want to contribute to the{" "}
//             <span className="text-orange-500 font-semibold">Core Protocol</span>
//             ?
//           </h3>
//           <button className="px-6 py-3 rounded-lg bg-orange-500 hover:bg-orange-600 font-medium">
//             Become a Partner
//           </button>
//         </div>
//       </section>
//     </div>
//   );
// }

// function FeatureCard({ icon, title, description }: any) {
//   return (
//     <motion.div
//       whileHover={{ scale: 1.05 }}
//       className="bg-[#0b0e11] rounded-xl p-6 border border-gray-800 hover:border-orange-500/50 transition"
//     >
//       <div className="mb-4">{icon}</div>
//       <h3 className="text-lg font-semibold mb-2">{title}</h3>
//       <p className="text-gray-400 text-sm">{description}</p>
//     </motion.div>
//   );
// }
import CoreProtocolWhitepaper from "./CoreProtocolWhitepaper";

type Props = {
  params: Promise<{ category: string }>;
};

export async function generateStaticParams() {
  return [
    { category: "core-protocol" },
    { category: "ai" },
    { category: "blockchain" },
  ];
}

export default async function WhitepaperPage({ params }: Props) {
  const { category } = await params;
  return <CoreProtocolWhitepaper category={category} />;
}
