"use client";
import React from "react";
import { Database, Download, ExternalLink } from "lucide-react";
import Link from "next/link";

export default function DatasetsPage() {
  const datasets = [
    {
      title: "Problem Ticket Registry",
      desc: "All problem tickets submitted through PoPP — including status, category, evidence hashes, and validator consensus.",
      status: "Coming Soon",
      format: "JSON, CSV",
    },
    {
      title: "Validator Performance Reports",
      desc: "Historical data on validator accuracy, response times, stake changes, and reputation scores.",
      status: "Coming Soon",
      format: "CSV, Parquet",
    },
    {
      title: "Governance & Proposal Data",
      desc: "On-chain governance proposals, voting records, and outcome data from the PoPP DAO.",
      status: "Coming Soon",
      format: "JSON",
    },
  ];

  return (
    <div className="min-h-screen bg-[#030712] text-white overflow-x-hidden">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 ring-1 ring-white/10">
            <Database className="h-5 w-5 text-cyan-400" />
          </div>
          <h1 className="text-3xl font-bold">Public Datasets</h1>
        </div>
        <p className="text-gray-400 max-w-3xl">
          Open and free datasets for researchers, developers, and analysts. All data is anonymized and compliant with privacy standards.
        </p>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        <div className="space-y-5">
          {datasets.map((ds, i) => (
            <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-5">
              <h3 className="font-semibold text-lg mb-2">{ds.title}</h3>
              <p className="text-gray-400 text-sm mb-4">{ds.desc}</p>
              <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                <div>
                  <div className="text-gray-400 text-xs">Status</div>
                  <div className="font-semibold text-amber-400">{ds.status}</div>
                </div>
                <div>
                  <div className="text-gray-400 text-xs">Format</div>
                  <div className="font-semibold">{ds.format}</div>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <button className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg text-sm font-semibold flex items-center gap-2">
                  <Download size={16} /> Download
                </button>
                <button className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm font-semibold flex items-center gap-2">
                  <ExternalLink size={16} /> View Schema
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
