
"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Code2,
  Terminal,
  Globe,
  Shield,
  Zap,
  Layers,
  BookOpen,
  Copy,
  Check,
  ArrowRight,
  Package,
  Key,
  Send,
  Users,
  Vote,
  Fingerprint,
  Boxes,
  FileCode,
  Cpu,
} from "lucide-react";
import Link from "next/link";

// ─── Constants ──────────────────────────────────────────────────────────────

const CHAIN_API = "https://chain.thharko.com";
const RPC_ENDPOINT = "https://rpc.thharko.com";

const LANGUAGES = [
  { id: "javascript", label: "JavaScript", icon: <FileCode size={14} /> },
  { id: "rust", label: "Rust", icon: <Cpu size={14} /> },
  { id: "python", label: "Python", icon: <Terminal size={14} /> },
];

const CODE_EXAMPLES: Record<string, { install: string; code: string }> = {
  javascript: {
    install: "npm install @popp/sdk",
    code: `import { PoPPClient } from "@popp/sdk";

// Initialize with chain endpoint
const client = new PoPPClient({
  rpc: "https://rpc.thharko.com",
  rest: "https://chain.thharko.com",
  chainId: "popp-mainnet-1",
});

// Submit a problem
const ticket = await client.submitProblem({
  description: "Water pollution in River Ganga",
  latitude: 26.4625,
  longitude: 83.9708,
  category: "Environment",
  evidence: [photoHash1, photoHash2],
});

// Query validators
const validators = await client.getValidators({
  active: true,
  limit: 10,
});

// Vote on a problem (requires validator key)
await client.castVote({
  ticketId: ticket.id,
  verdict: "approve",
  confidence: 0.95,
});`,
  },
  rust: {
    install: '[dependencies]\npopp-sdk = "0.1"',
    code: `use popp_sdk::{Client, Problem, Vote};

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let client = Client::new(
        "https://rpc.thharko.com",
        "https://chain.thharko.com",
    )?;

    // Submit a problem
    let ticket = client.submit_problem(Problem {
        description: "Lack of electricity in Village X".into(),
        latitude: 26.85,
        longitude: 83.97,
        category: "Infrastructure".into(),
        evidence: vec![hash1, hash2],
    }).await?;

    // Query validators
    let validators = client.get_validators()
        .active_only()
        .limit(10)
        .send()
        .await?;

    // Cast a vote
    client.cast_vote(Vote {
        ticket_id: ticket.id,
        verdict: Verdict::Approve,
        confidence: 0.95,
    }).await?;

    Ok(())
}`,
  },
  python: {
    install: "pip install popp-sdk",
    code: `from popp_sdk import PoPPClient

# Initialize client
client = PoPPClient(
    rpc="https://rpc.thharko.com",
    rest="https://chain.thharko.com",
    chain_id="popp-mainnet-1",
)

# Submit a problem
ticket = client.submit_problem(
    description="Poor internet connectivity in Region Y",
    latitude=28.6139,
    longitude=77.2090,
    category="Infrastructure",
    evidence=[hash1, hash2],
)

# Query active validators
validators = client.get_validators(active=True, limit=10)

# Cast a validation vote
client.cast_vote(
    ticket_id=ticket.id,
    verdict="approve",
    confidence=0.95,
)

# Query governance proposals
proposals = client.get_proposals(status="voting")`,
  },
};

const API_ENDPOINTS = [
  { method: "GET", path: "/popp/ticket/tickets", desc: "List all problem tickets" },
  { method: "POST", path: "/popp/ticket/submit", desc: "Submit a new problem" },
  { method: "GET", path: "/popp/validation/validators", desc: "List registered validators" },
  { method: "POST", path: "/popp/validation/vote", desc: "Cast a validation vote" },
  { method: "GET", path: "/popp/proof/proofs", desc: "List all proofs" },
  { method: "GET", path: "/cosmos/gov/v1beta1/proposals", desc: "List governance proposals" },
  { method: "GET", path: "/cosmos/staking/v1beta1/validators", desc: "List staking validators" },
  { method: "GET", path: "/cosmos/bank/v1beta1/supply", desc: "Query total token supply" },
];

// ─── Page ───────────────────────────────────────────────────────────────────

export default function SDKPage() {
  const [activeLang, setActiveLang] = useState("javascript");
  const [copied, setCopied] = useState(false);
  const [chainStatus, setChainStatus] = useState<{ network: string; blockHeight: string } | null>(null);

  useEffect(() => {
    fetch(`${CHAIN_API}/cosmos/base/tendermint/v1beta1/node_info`)
      .then((r) => r.json())
      .then((data) => {
        setChainStatus({
          network: data?.result?.node_info?.network || "popp-mainnet-1",
          blockHeight: data?.result?.sync_info?.latest_block_height || "—",
        });
      })
      .catch(() => {});
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(CODE_EXAMPLES[activeLang].code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const currentExample = CODE_EXAMPLES[activeLang];

  return (
    <main className="min-h-screen bg-[#030712] text-white overflow-x-hidden">
      <div className="">
        {/* ─── Hero ─────────────────────────────────────────────────────── */}
        <section className="relative py-8 px-4 sm:px-6 text-center overflow-hidden border-b border-white/10">
          <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-cyan-600/10 blur-3xl" />

          <motion.div initial={{ opacity: 0, y: -15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="relative z-10">
            <div className="flex items-center justify-center gap-2 mb-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-600/20 ring-1 ring-cyan-500/30">
                <Code2 className="h-5 w-5 text-cyan-400" />
              </div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold">
                PoPP SDK{" "}
                <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">for Developers</span>
              </h1>
            </div>
            <p className="text-gray-400 max-w-2xl mx-auto text-base mb-4">
              Build decentralized applications powered by Proof of Problem Protocol. Integrate problem submission, validation, and governance into your apps.
            </p>

            {/* Chain Status */}
            {chainStatus && (
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs mb-4">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-gray-400">{chainStatus.network}</span>
                <span className="text-gray-600">|</span>
                <span className="text-gray-400">Block #{chainStatus.blockHeight}</span>
              </div>
            )}

            <div className="flex justify-center gap-3">
              <a href="#install" className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 font-semibold text-sm">
                Get Started
              </a>
              <Link href="/docs" className="px-5 py-2.5 rounded-lg bg-white/5 border border-white/15 hover:bg-white/10 transition font-semibold text-sm text-gray-300">
                Read Docs
              </Link>
            </div>
          </motion.div>
        </section>

        {/* ─── Features ─────────────────────────────────────────────────── */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
          <h2 className="text-xl font-bold mb-4 text-center">Why Use the PoPP SDK?</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {[
              { icon: <Layers size={16} />, title: "Multi-language", desc: "JavaScript, Rust, and Python SDKs with identical APIs." },
              { icon: <Zap size={16} />, title: "Simple APIs", desc: "Minimal boilerplate — submit, validate, and govern in a few lines." },
              { icon: <Shield size={16} />, title: "Secure", desc: "Cryptographic signatures and zero-knowledge proof support." },
              { icon: <Globe size={16} />, title: "Interoperable", desc: "Works with Cosmos SDK, EVM chains, and WASM runtimes." },
              { icon: <Package size={16} />, title: "Open Source", desc: "MIT licensed — fork, modify, and contribute back." },
              { icon: <Key size={16} />, title: "Testnet Ready", desc: "Experiment safely on testnet before deploying to mainnet." },
            ].map((f, i) => (
              <motion.div key={f.title} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                className="bg-white/5 border border-white/10 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-cyan-400">{f.icon}</span>
                  <h3 className="text-sm font-bold">{f.title}</h3>
                </div>
                <p className="text-sm text-gray-400">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ─── Installation & Code ──────────────────────────────────────── */}
        <section id="install" className="bg-white/[0.03] border-y border-white/[0.06] py-8">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <h2 className="text-xl font-bold mb-2">Quick Start</h2>
            <p className="text-sm text-gray-400 mb-4">
              Install the SDK and start integrating PoPP into your application.
            </p>

            {/* Language Tabs */}
            <div className="flex gap-2 mb-3">
              {LANGUAGES.map((lang) => (
                <button key={lang.id} onClick={() => setActiveLang(lang.id)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition flex items-center gap-1.5 ${
                    activeLang === lang.id
                      ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white"
                      : "bg-white/5 border border-white/10 text-gray-400 hover:bg-white/10"
                  }`}>
                  {lang.icon} {lang.label}
                </button>
              ))}
            </div>

            {/* Install Command */}
            <div className="bg-white/5 border border-white/10 rounded-lg p-3 mb-3 flex items-center gap-2">
              <span className="text-xs text-gray-500 font-mono">$</span>
              <code className="text-sm text-emerald-400 font-mono flex-1">{currentExample.install}</code>
            </div>

            {/* Code Example */}
            <div className="relative">
              <button onClick={handleCopy}
                className="absolute top-3 right-3 p-1.5 rounded-md bg-white/10 hover:bg-white/20 transition text-gray-400 hover:text-white">
                {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
              </button>
              <pre className="bg-[#0a0f1a] border border-white/10 rounded-xl p-5 text-sm text-gray-300 overflow-x-auto leading-6 font-mono">
                {currentExample.code}
              </pre>
            </div>
          </div>
        </section>

        {/* ─── REST API Endpoints ───────────────────────────────────────── */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
          <h2 className="text-xl font-bold mb-2 flex items-center gap-2"><Send size={18} className="text-cyan-400" /> REST API</h2>
          <p className="text-sm text-gray-400 mb-4">
            The SDK wraps these REST endpoints. You can also call them directly.
          </p>
          <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
            <div className="grid grid-cols-12 gap-3 px-4 py-2.5 bg-white/[0.03] border-b border-white/10 text-xs font-semibold text-gray-400 uppercase tracking-wider">
              <div className="col-span-2">Method</div>
              <div className="col-span-6">Endpoint</div>
              <div className="col-span-4">Description</div>
            </div>
            {API_ENDPOINTS.map((ep, i) => (
              <div key={i} className="grid grid-cols-12 gap-3 px-4 py-2.5 border-b border-white/10 last:border-0 hover:bg-white/[0.02] transition">
                <div className="col-span-2">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    ep.method === "GET" ? "bg-emerald-500/20 text-emerald-400" : "bg-blue-500/20 text-blue-400"
                  }`}>{ep.method}</span>
                </div>
                <div className="col-span-6 font-mono text-sm text-cyan-400 truncate">{ep.path}</div>
                <div className="col-span-4 text-sm text-gray-400">{ep.desc}</div>
              </div>
            ))}
          </div>
          <div className="mt-3 text-xs text-gray-500">
            Base URL: <code className="text-gray-400 font-mono">{CHAIN_API}</code> &nbsp;|&nbsp; RPC: <code className="text-gray-400 font-mono">{RPC_ENDPOINT}</code>
          </div>
        </section>

        {/* ─── What Can You Build ───────────────────────────────────────── */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
          <h2 className="text-xl font-bold mb-4 text-center">What Can You Build?</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {[
              { icon: <Users size={16} />, title: "Citizen DApps", desc: "Enable users to submit and track real-world problems with location and evidence." },
              { icon: <Globe size={16} />, title: "NGO Dashboards", desc: "Integrate problem data into NGO workflows and impact reporting." },
              { icon: <Shield size={16} />, title: "Validator Tools", desc: "Build tools for validation, staking management, and reward tracking." },
              { icon: <BookOpen size={16} />, title: "Research Analytics", desc: "Analyze decentralized problem datasets for civic research and policy." },
              { icon: <Boxes size={16} />, title: "Mobile Integrations", desc: "Use SDK in React Native or Flutter apps for on-the-go problem reporting." },
              { icon: <Vote size={16} />, title: "Governance Portals", desc: "Implement proposal submission, voting, and treasury management UIs." },
            ].map((uc, i) => (
              <motion.div key={uc.title} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                className="bg-white/5 border border-white/10 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-cyan-400">{uc.icon}</span>
                  <h3 className="text-sm font-bold">{uc.title}</h3>
                </div>
                <p className="text-sm text-gray-400">{uc.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ─── Roadmap ──────────────────────────────────────────────────── */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
          <h2 className="text-xl font-bold mb-4 text-center">SDK Roadmap</h2>
          <div className="space-y-3">
            {[
              { version: "v1.0", title: "Testnet Release", status: "Current", color: "border-cyan-500", desc: "Core SDK functions: problem submission, validation voting, incentive tracking. JavaScript and Python SDKs." },
              { version: "v2.0", title: "Multi-Chain SDK", status: "Planned", color: "border-blue-500", desc: "CosmWasm, Ethereum, and Substrate chain integrations. Unified cross-chain API." },
              { version: "v3.0", title: "Privacy Features", status: "Planned", color: "border-purple-500", desc: "zk-SNARK proofs, encrypted submissions for sensitive problems, and anonymous validation." },
              { version: "v4.0", title: "AI Integration", status: "Planned", color: "border-emerald-500", desc: "Built-in AI classification, severity scoring, and duplicate detection via the offchain intelligence service." },
            ].map((item, i) => (
              <motion.div key={item.version} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}
                className={`bg-white/5 border border-white/10 border-l-4 ${item.color} rounded-xl p-4`}>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-bold">{item.version}</span>
                  <span className="text-sm font-semibold text-white">— {item.title}</span>
                  <span className={`ml-auto px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                    item.status === "Current" ? "bg-cyan-500/20 text-cyan-400" : "bg-white/5 text-gray-500"
                  }`}>{item.status}</span>
                </div>
                <p className="text-sm text-gray-400">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ─── CTA ──────────────────────────────────────────────────────── */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
          <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-xl p-6 text-center">
            <h2 className="text-xl font-bold mb-2">Ready to Build?</h2>
            <p className="text-gray-400 text-sm mb-4">Start integrating PoPP into your application today.</p>
            <div className="flex flex-wrap gap-3 justify-center">
              <a href="#install"><button className="px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg text-sm font-semibold">Install SDK</button></a>
              <Link href="/docs"><button className="px-5 py-2.5 bg-white/5 border border-white/15 hover:bg-white/10 rounded-lg text-sm font-semibold text-gray-300 transition">Documentation</button></Link>
              <Link href="/explorer"><button className="px-5 py-2.5 bg-white/5 border border-white/15 hover:bg-white/10 rounded-lg text-sm font-semibold text-gray-300 transition">Explore Network</button></Link>
            </div>
          </motion.div>
        </section>
      </div>
    </main>
  );
}
