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
    path: "/api/validators/vote",
    desc: "Submit a validator vote on a submission",
    response: `{ "id": "...", "status": "voted" }`,
  },
  {
    method: "POST",
    path: "/api/emergency/activate",
    desc: "Activate emergency protocol for a submission (accelerated 1h timeline)",
    response: `{ "submission_id": "...", "urgency_level": "critical", "emergency_activated": true }`,
  },
  {
    method: "GET",
    path: "/api/reputation/nfts",
    desc: "List current user's soulbound reputation NFTs",
    response: `[{ "id": "...", "level": "bronze", "r_score_at_mint": 120, ... }]`,
  },
  {
    method: "POST",
    path: "/api/reputation/nfts/mint",
    desc: "Check R-Score and mint NFT if eligible",
    response: `{ "minted": [...], "current_r_score": 250 }`,
  },
  {
    method: "POST",
    path: "/api/did/register",
    desc: "Register a Decentralized ID (DID) for the current user",
    response: `{ "did": "did:example:123", "did_document_hash": "0x..." }`,
  },
  {
    method: "POST",
    path: "/api/did/verify",
    desc: "Verify a DID against stored hash",
    response: `{ "valid": true, "did": "did:example:123" }`,
  },
  {
    method: "POST",
    path: "/api/submissions/{id}/archive",
    desc: "Archive submission data to Arweave/chain",
    response: `{ "arweave_tx_id": "...", "arweave_url": "...", "data_hash": "..." }`,
  },
  {
    method: "GET",
    path: "/api/webhooks",
    desc: "List current user's registered webhooks",
    response: `[{ "id": "...", "url": "...", "events": [...], "active": true }]`,
  },
  {
    method: "POST",
    path: "/api/webhooks",
    desc: "Create a new webhook subscription",
    response: `{ "id": "...", "url": "...", "secret": "..." }`,
  },
  {
    method: "GET",
    path: "/api/api-keys",
    desc: "List current user's API keys",
    response: `[{ "id": "...", "name": "...", "key_prefix": "popp_abc..." }]`,
  },
  {
    method: "POST",
    path: "/api/api-keys",
    desc: "Create a new API key",
    response: `{ "id": "...", "api_key": "popp_...", "rate_limit": 1000 }`,
  },
  {
    method: "GET",
    path: "/api/zones",
    desc: "List all active PoPP zones",
    response: `[{ "id": "...", "name": "...", "latitude": ..., "longitude": ... }]`,
  },
  {
    method: "POST",
    path: "/api/sensors/register",
    desc: "Register a new IoT sensor device",
    response: `{ "id": "...", "name": "...", "type": "..." }`,
  },
  {
    method: "POST",
    path: "/api/disputes",
    desc: "File a dispute for a validated submission",
    response: `{ "id": "...", "status": "pending", "message": "Dispute created" }`,
  },
  {
    method: "GET",
    path: "/api/disputes",
    desc: "List all disputes",
    response: `[{ "id": "...", "submission_id": "...", "status": "pending", ... }]`,
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
    <div className="min-h-screen bg-[#030712] text-white overflow-x-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
        {/* Hero */}
        <div className="mb-10">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3">
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
