"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function WhitepaperCard({
  title,
  category,
  description,
}: {
  title: string;
  category: string;
  description: string;
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-[#14181d] border border-gray-800 hover:border-orange-500/50 rounded-xl p-6 transition"
    >
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-400 text-sm mb-4">{description}</p>

      <Link
        href={`/whitepapers/${category}`}
        className="text-orange-500 font-medium hover:underline"
      >
        Read Whitepaper →
      </Link>
    </motion.div>
  );
}
