"use client";

import WhitepaperCard from "@/components/WhitepaperCard";

export default function WhitepaperList() {
  const whitepapers = [
    {
      title: "The Proof-of-Problem Protocol (PoPP)",
      category: "core-protocol",
      description:
        "A decentralized framework for verifying, validating, and escalating real-world problems.",
    },
    {
      title: "Governance Model",
      category: "governance",
      description:
        "How PoPP ensures community-driven decision-making and consensus.",
    },
    {
      title: "Validator Mechanism",
      category: "validators",
      description:
        "Incentive models and cryptographic guarantees for validators in PoPP.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0b0e11] to-[#14181d] text-white pt-20 px-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
        {whitepapers.map((wp, i) => (
          <WhitepaperCard key={i} {...wp} />
        ))}
      </div>
    </div>
  );
}
