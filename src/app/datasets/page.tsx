"use client";
import React from "react";
import { Database, Download, ExternalLink } from "lucide-react";
import Link from "next/link";

export default function DatasetsPage() {
  const datasets = [
    {
      title: "Global Problem Reports Dataset",
      desc: "Comprehensive dataset of all problems reported through PoPP protocol.",
      size: "2.4 GB",
      records: "125,000+",
      format: "JSON, CSV",
    },
    {
      title: "Validator Performance Metrics",
      desc: "Historical data on validator accuracy, response times, and rewards.",
      size: "890 MB",
      records: "50,000+",
      format: "CSV, Parquet",
    },
    {
      title: "Problem Resolution Outcomes",
      desc: "Track resolution rates and impact metrics across different categories.",
      size: "1.2 GB",
      records: "75,000+",
      format: "JSON, CSV",
    },
  ];

  return (
    <div className="min-h-screen bg-[#030712] text-white pt-16">
      <section className="max-w-7xl mx-auto px-6 py-10">
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

      <section className="max-w-7xl mx-auto px-6 py-6">
        <div className="space-y-5">
          {datasets.map((ds, i) => (
            <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-5">
              <h3 className="font-semibold text-lg mb-2">{ds.title}</h3>
              <p className="text-gray-400 text-sm mb-4">{ds.desc}</p>
              <div className="grid grid-cols-3 gap-4 mb-4 text-sm">
                <div>
                  <div className="text-gray-400 text-xs">Size</div>
                  <div className="font-semibold">{ds.size}</div>
                </div>
                <div>
                  <div className="text-gray-400 text-xs">Records</div>
                  <div className="font-semibold">{ds.records}</div>
                </div>
                <div>
                  <div className="text-gray-400 text-xs">Format</div>
                  <div className="font-semibold">{ds.format}</div>
                </div>
              </div>
              <div className="flex gap-3">
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
