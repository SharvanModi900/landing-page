"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Copy, Check, Globe, Lock } from "lucide-react";
import Link from "next/link";

const CHAIN_API = "https://chain.thharko.com";
const BACKEND_API = "https://popp.thharko.com";

type Endpoint = {
  method: "GET" | "POST";
  path: string;
  desc: string;
  response?: string;
};

const chainEndpoints: Endpoint[] = [
  {
    method: "GET",
    path: "/popp/ticket",
    desc: "List all submitted problem tickets",
    response: `{ "tickets": [...], "pagination": { ... } }`,
  },
  {
    method: "GET",
    path: "/popp/ticket/{id}",
    desc: "Get a specific ticket by ID",
    response: `{ "ticket": { "id": "...", "status": "...", ... } }`,
  },
  {
    method: "GET",
    path: "/popp/proofs",
    desc: "List all submitted proofs",
    response: `{ "proofs": [...], "pagination": { ... } }`,
  },
  {
    method: "GET",
    path: "/cosmos/staking/v1beta1/validators",
    desc: "List all active validators",
    response: `{ "validators": [...], "pagination": { ... } }`,
  },
  {
    method: "GET",
    path: "/cosmos/gov/v1beta1/proposals",
    desc: "List governance proposals",
    response: `{ "proposals": [...], "pagination": { ... } }`,
  },
  {
    method: "GET",
    path: "/cosmos/staking/v1beta1/pool",
    desc: "Get staking pool info (bonded tokens)",
    response: `{ "pool": { "bonded_tokens": "100000000", ... } }`,
  },
  {
    method: "GET",
    path: "/cosmos/base/tendermint/v1beta1/node_info",
    desc: "Get chain node information",
    response: `{ "default_node_info": { ... }, "application_version": { ... } }`,
  },
  {
    method: "GET",
    path: "/cosmos/bank/v1beta1/supply",
    desc: "Get total token supply",
    response: `{ "supply": [{ "denom": "stake", "amount": "..." }] }`,
  },
];

const backendEndpoints: Endpoint[] = [
  {
    method: "POST",
    path: "/api/submissions",
    desc: "Submit a new problem report to the off-chain backend",
    response: `{ "id": "...", "status": "pending", ... }`,
  },
  {
    method: "GET",
    path: "/api/submissions",
    desc: "List all submissions with pagination",
    response: `{ "submissions": [...], "total": ... }`,
  },
  {
    method: "GET",
    path: "/api/submissions/{id}",
    desc: "Get a specific submission by ID",
    response: `{ "id": "...", "title": "...", "status": "...", ... }`,
  },
  {
    method: "POST",
    path: "/api/validations",
    desc: "Submit a validation for a problem",
    response: `{ "id": "...", "ticket_id": "...", "verdict": "..." }`,
  },
  {
    method: "POST",
    path: "/api/proofs",
    desc: "Submit proof evidence for a ticket",
    response: `{ "id": "...", "ticket_id": "...", "evidence_hash": "..." }`,
  },
];

const methodColor = (method: string) =>
  method === "GET" ? "text-emerald-400 bg-emerald-500/10 border-emerald-500/20" : "text-blue-400 bg-blue-500/10 border-blue-500/20";

export default function ApiReferencesPage() {
  const [copied, setCopied] = useState<string | null>(null);

  const copyText = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(text);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="min-h-screen bg-[#030712] text-white">
      <div className="pt-16 max-w-5xl mx-auto px-6 py-12">
        {/* Hero */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold mb-3">
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              PoPP API Reference
            </span>
          </h1>
          <p className="text-gray-400 max-w-2xl">
            Interact with the Proof-of-Problem Protocol through the Cosmos SDK chain
            and the PoPP off-chain backend.
          </p>
        </div>

        {/* Base URLs */}
        <div className="grid sm:grid-cols-2 gap-4 mb-10">
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-center gap-3">
            <Globe className="w-5 h-5 text-cyan-400 shrink-0" />
            <div>
              <div className="text-xs text-gray-500 mb-0.5">Chain API (Cosmos SDK)</div>
              <div className="text-sm font-mono text-cyan-400">{CHAIN_API}</div>
            </div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-center gap-3">
            <Lock className="w-5 h-5 text-blue-400 shrink-0" />
            <div>
              <div className="text-xs text-gray-500 mb-0.5">Backend API (Off-chain)</div>
              <div className="text-sm font-mono text-blue-400">{BACKEND_API}</div>
            </div>
          </div>
        </div>

        {/* Chain Endpoints */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-2">Chain Endpoints</h2>
          <p className="text-sm text-gray-400 mb-6">
            Public REST endpoints on the PoPP Cosmos SDK chain. No authentication required for read-only queries.
          </p>

          <div className="space-y-3">
            {chainEndpoints.map((ep) => (
              <motion.div
                key={ep.path}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3 }}
                className="bg-white/5 border border-white/10 rounded-xl p-4"
              >
                <div className="flex items-start gap-3">
                  <span className={`px-2 py-0.5 rounded border text-xs font-mono font-bold shrink-0 ${methodColor(ep.method)}`}>
                    {ep.method}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <code className="text-sm font-mono text-white break-all">{ep.path}</code>
                      <button
                        onClick={() => copyText(`${CHAIN_API}${ep.path}`)}
                        className="shrink-0 text-gray-500 hover:text-cyan-400 transition-colors"
                      >
                        {copied === `${CHAIN_API}${ep.path}` ? (
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>
                    <p className="text-sm text-gray-400">{ep.desc}</p>
                    {ep.response && (
                      <pre className="mt-2 text-xs text-gray-500 bg-black/30 rounded p-2 overflow-x-auto">
                        <code>{ep.response}</code>
                      </pre>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Backend Endpoints */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-2">Backend Endpoints</h2>
          <p className="text-sm text-gray-400 mb-6">
            Off-chain API for submissions, validations, and proofs. These endpoints handle the bridge between user submissions and on-chain tickets.
          </p>

          <div className="space-y-3">
            {backendEndpoints.map((ep) => (
              <motion.div
                key={ep.path}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3 }}
                className="bg-white/5 border border-white/10 rounded-xl p-4"
              >
                <div className="flex items-start gap-3">
                  <span className={`px-2 py-0.5 rounded border text-xs font-mono font-bold shrink-0 ${methodColor(ep.method)}`}>
                    {ep.method}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <code className="text-sm font-mono text-white break-all">{ep.path}</code>
                      <button
                        onClick={() => copyText(`${BACKEND_API}${ep.path}`)}
                        className="shrink-0 text-gray-500 hover:text-cyan-400 transition-colors"
                      >
                        {copied === `${BACKEND_API}${ep.path}` ? (
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>
                    <p className="text-sm text-gray-400">{ep.desc}</p>
                    {ep.response && (
                      <pre className="mt-2 text-xs text-gray-500 bg-black/30 rounded p-2 overflow-x-auto">
                        <code>{ep.response}</code>
                      </pre>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Example */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Example</h2>
          <p className="text-sm text-gray-400 mb-3">Fetch all tickets from the chain:</p>
          <div className="bg-black/40 border border-white/10 rounded-xl p-4 flex items-start gap-3">
            <pre className="text-sm text-emerald-400 overflow-x-auto flex-1">
              <code>curl {CHAIN_API}/popp/ticket</code>
            </pre>
            <button
              onClick={() => copyText(`curl ${CHAIN_API}/popp/ticket`)}
              className="text-gray-500 hover:text-cyan-400 transition-colors shrink-0"
            >
              {copied === `curl ${CHAIN_API}/popp/ticket` ? (
                <Check className="w-4 h-4 text-emerald-400" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </button>
          </div>
        </section>

        {/* Links */}
        <div className="flex flex-wrap gap-4">
          <Link
            href="/sdk"
            className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-sm font-semibold hover:shadow-lg hover:shadow-cyan-500/20 transition"
          >
            SDK Documentation
          </Link>
          <Link
            href="/cli"
            className="px-5 py-2.5 rounded-lg bg-white/5 border border-white/10 text-sm font-semibold hover:bg-white/10 transition"
          >
            CLI Reference
          </Link>
          <Link
            href="/docs"
            className="px-5 py-2.5 rounded-lg bg-white/5 border border-white/10 text-sm font-semibold hover:bg-white/10 transition"
          >
            Developer Docs
          </Link>
        </div>
      </div>
    </div>
  );
}
