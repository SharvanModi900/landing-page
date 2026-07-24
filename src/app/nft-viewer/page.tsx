"use client";
import React from "react";
import { Image as ImageIcon } from "lucide-react";
import Link from "next/link";

export default function NFTViewerPage() {
  const nfts = [
    { id: 1, title: "Water Contamination Proof", tokenId: "#001", status: "Verified" },
    { id: 2, title: "Road Repair Validation", tokenId: "#002", status: "Verified" },
    { id: 3, title: "Education Access Report", tokenId: "#003", status: "Verified" },
  ];

  return (
    <div className="min-h-screen bg-[#030712] text-white pt-16">
      <section className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 ring-1 ring-white/10">
            <ImageIcon className="h-5 w-5 text-cyan-400" />
          </div>
          <h1 className="text-3xl font-bold">Truth NFT Viewer</h1>
        </div>
        <p className="text-gray-400 max-w-3xl">
          View and verify Truth NFTs minted from validated problems on the PoPP network.
        </p>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {nfts.map((nft) => (
            <div key={nft.id} className="bg-white/5 border border-white/10 rounded-xl p-5">
              <div className="aspect-square bg-white/[0.03] rounded-lg mb-4 flex items-center justify-center text-4xl">
                🎨
              </div>
              <h3 className="font-semibold mb-1">{nft.title}</h3>
              <p className="text-gray-400 text-sm mb-3">Token ID: {nft.tokenId}</p>
              <span className="px-2 py-1 text-xs font-semibold rounded bg-cyan-500/20 text-cyan-400">
                {nft.status}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
