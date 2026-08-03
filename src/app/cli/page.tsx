
"use client";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  Terminal,
  Download,
  Copy,
  Check,
  ChevronRight,
  BookOpen,
  Shield,
  Users,
  Vote,
  Boxes,
  Fingerprint,
  Send,
  Globe,
} from "lucide-react";
import Link from "next/link";

// ─── Constants ──────────────────────────────────────────────────────────────

const CHAIN_API = "https://chain.thharko.com";

const COMMANDS: Record<string, { output: string; description: string }> = {
  help: {
    output: `Available commands:

  popp init                    Initialize CLI configuration
  popp submit-problem          Submit a new problem to the network
  popp stake <amount>          Stake POPP tokens to a validator
  popp vote <ticket-id>        Cast a validation vote
  popp query tickets           List all problem tickets
  popp query validators        List active validators
  popp query proposals         List governance proposals
  popp node status             Show node connection status
  popp keys list               List local key pairs
  popp version                 Show CLI version
  popp clear                   Clear terminal history

Aliases: help, version, clear, status`,
    description: "Show available commands",
  },
  version: {
    output: "PoPP CLI v1.2.3\nChain ID: popp-mainnet-1\nGo Version: go1.21.5",
    description: "Show CLI version",
  },
  status: {
    output: "Node running on popp-mainnet-1\nBlock height: 1,052,347\nPeers: 12 connected\nSync status: synced",
    description: "Show node status",
  },
  "node status": {
    output: "Node running on popp-mainnet-1\nBlock height: 1,052,347\nPeers: 12 connected\nSync status: synced",
    description: "Show node status",
  },
  "submit-problem": {
    output: "Submitting problem...\n✓ Problem submitted successfully\n  Ticket ID: ticket-42\n  Hash: 0x7f3a...b2c1\n  Category: Environment\n  Location: 26.46°N, 83.97°E",
    description: "Submit a problem",
  },
  stake: {
    output: "Staking 500 POPP tokens...\n✓ Stake transaction confirmed\n  Validator: poppvaloper1abc...xyz\n  Amount: 500 POPP\n  Status: Active",
    description: "Stake tokens",
  },
  vote: {
    output: "Casting vote on ticket-42...\n✓ Vote recorded\n  Ticket: ticket-42\n  Verdict: Approve\n  Confidence: 95%\n  Reward: Pending",
    description: "Vote on a ticket",
  },
  "query tickets": {
    output: "Fetching tickets from chain...\n\nTotal tickets: 42\nActive: 12 | Validated: 28 | Escalated: 2\n\nRecent:\n  ticket-42  Water pollution      [Active]\n  ticket-41  Road damage          [Validated]\n  ticket-40  Power outage         [Active]",
    description: "List problem tickets",
  },
  "query validators": {
    output: "Fetching validators...\n\nActive validators: 8\nTotal stake: 1,250,000 POPP\n\nTop validators:\n  poppvaloper1abc...  250,000 POPP  (20%)\n  poppvaloper2def...  180,000 POPP  (14.4%)\n  poppvaloper3ghi...  150,000 POPP  (12%)",
    description: "List validators",
  },
  "query proposals": {
    output: "Fetching governance proposals...\n\nTotal proposals: 3\nVoting: 1 | Passed: 2 | Rejected: 0\n\nRecent:\n  #3  Increase validator rewards  [Voting]\n  #2  Add new problem category    [Passed]\n  #1  Update fee structure        [Passed]",
    description: "List governance proposals",
  },
  "keys list": {
    output: "Local key pairs:\n\n  mykey  popp1abc...xyz  [active]\n  backup popp1def...uvw  [inactive]",
    description: "List local keys",
  },
  init: {
    output: "Initializing PoPP CLI...\n✓ Configuration saved to ~/.popp/config.toml\n✓ Chain ID: popp-mainnet-1\n✓ RPC endpoint: https://rpc.thharko.com\n✓ REST endpoint: https://chain.thharko.com",
    description: "Initialize CLI",
  },
  clear: {
    output: "CLEAR",
    description: "Clear terminal",
  },
};

const INSTALL_COMMANDS = [
  { platform: "macOS / Linux", command: "curl -fsSL https://chain.thharko.com/install.sh | bash" },
  { platform: "Windows (PowerShell)", command: "iwr -useb https://chain.thharko.com/install.ps1 | iex" },
  { platform: "Go install", command: "go install github.com/popp-protocol/cli@latest" },
];

const QUICK_START = [
  { step: "1", title: "Initialize", command: "popp init", desc: "Set up CLI configuration" },
  { step: "2", title: "Submit Problem", command: "popp submit-problem", desc: "Report a real-world problem" },
  { step: "3", title: "Stake Tokens", command: "popp stake 500", desc: "Stake POPP to become a validator" },
  { step: "4", title: "Vote", command: "popp vote ticket-42", desc: "Cast a validation vote" },
];

// ─── Page ───────────────────────────────────────────────────────────────────

export default function CLIPage() {
  const [history, setHistory] = useState<string[]>([
    "Welcome to PoPP CLI Playground",
    "Type `help` to see available commands.",
    "",
  ]);
  const [input, setInput] = useState("");
  const [copied, setCopied] = useState<string | null>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  const handleCommand = (cmd: string) => {
    const clean = cmd.trim().toLowerCase();
    if (!clean) return;

    if (clean === "clear") {
      setHistory([]);
    } else if (COMMANDS[clean]) {
      setHistory((h) => [...h, `$ popp ${cmd.trim()}`, COMMANDS[clean].output, ""]);
    } else {
      setHistory((h) => [...h, `$ popp ${cmd.trim()}`, `Unknown command: ${clean}\nType 'help' to see available commands.`, ""]);

// // src/app/cli/page.tsx
// "use client";

// import { Terminal, Download, Settings, Zap } from "lucide-react";

// export default function CLIPage() {
//   return (
//     <div className="bg-[#0a0e23] text-gray-200 min-h-screen">
//       {/* Hero */}
//       <section className="relative py-24 px-6 bg-gradient-to-r from-blue-900/40 to-purple-900/30">
//         <div className="max-w-6xl mx-auto text-center">
//           <Terminal className="w-14 h-14 text-blue-400 mx-auto mb-6" />
//           <h1 className="text-5xl font-extrabold text-white mb-6">
//             PoPP <span className="text-blue-400">CLI</span>
//           </h1>
//           <p className="text-lg text-gray-300 max-w-3xl mx-auto">
//             The command-line interface for interacting with the Proof of Problem Protocol network.  
//             Manage nodes, submit problems, stake, validate, and monitor the ecosystem — all from your terminal.
//           </p>
//         </div>
//       </section>

//       {/* Installation */}
//       <section className="max-w-6xl mx-auto px-6 py-20">
//         <h2 className="text-3xl font-bold text-white mb-8">⚡ Installation</h2>
//         <p className="text-gray-300 mb-6">
//           Install the CLI tool for your system using one of the following methods:
//         </p>
//         <div className="bg-[#1a213d] p-6 rounded-xl border border-gray-700 text-sm font-mono text-gray-300 space-y-4">
//           <div>
//             <span className="text-blue-400"># macOS / Linux</span>
//             <pre className="bg-black/40 p-3 rounded mt-2">$ curl -sSL https://popp.org/install.sh | bash</pre>
//           </div>
//           <div>
//             <span className="text-blue-400"># Windows (PowerShell)</span>
//             <pre className="bg-black/40 p-3 rounded mt-2">iwr -useb https://popp.org/install.ps1 | iex</pre>
//           </div>
//         </div>
//       </section>

//       {/* Usage */}
//       <section className="bg-[#11172e] py-20 px-6">
//         <div className="max-w-6xl mx-auto">
//           <h2 className="text-3xl font-bold text-white mb-8">🛠️ Usage Examples</h2>
//           <div className="grid md:grid-cols-2 gap-8">
//             {/* Example 1 */}
//             <div className="bg-[#1a213d] p-6 rounded-xl border border-gray-700">
//               <h3 className="text-xl font-semibold text-blue-400 mb-3">Submit a Problem</h3>
//               <pre className="bg-black/40 p-4 rounded text-sm font-mono text-gray-300">
//                 popp submit-problem --title "Clean Water Access" --category "Environment" --details "Rural areas lack clean water supply..."
//               </pre>
//             </div>
//             {/* Example 2 */}
//             <div className="bg-[#1a213d] p-6 rounded-xl border border-gray-700">
//               <h3 className="text-xl font-semibold text-blue-400 mb-3">Stake Tokens</h3>
//               <pre className="bg-black/40 p-4 rounded text-sm font-mono text-gray-300">
//                 popp stake --amount 500 --validator "validator123"
//               </pre>
//             </div>
//             {/* Example 3 */}
//             <div className="bg-[#1a213d] p-6 rounded-xl border border-gray-700">
//               <h3 className="text-xl font-semibold text-blue-400 mb-3">Check Validator Status</h3>
//               <pre className="bg-black/40 p-4 rounded text-sm font-mono text-gray-300">
//                 popp validator status --id validator123
//               </pre>
//             </div>
//             {/* Example 4 */}
//             <div className="bg-[#1a213d] p-6 rounded-xl border border-gray-700">
//               <h3 className="text-xl font-semibold text-blue-400 mb-3">Run Local Node</h3>
//               <pre className="bg-black/40 p-4 rounded text-sm font-mono text-gray-300">
//                 popp node start --network testnet
//               </pre>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Command Reference */}
//       <section className="max-w-6xl mx-auto px-6 py-20">
//         <h2 className="text-3xl font-bold text-white mb-8">📖 Command Reference</h2>
//         <div className="grid md:grid-cols-2 gap-6">
//           <div className="bg-[#1a213d] p-6 rounded-xl border border-gray-700">
//             <h3 className="text-lg font-semibold text-blue-400 mb-2">Core Commands</h3>
//             <ul className="text-gray-300 text-sm space-y-2">
//               <li>🔹 <code>popp submit-problem</code> — Submit a new problem</li>
//               <li>🔹 <code>popp stake</code> — Stake tokens for validation</li>
//               <li>🔹 <code>popp unstake</code> — Withdraw staked tokens</li>
//               <li>🔹 <code>popp validator</code> — Manage validator settings</li>
//             </ul>
//           </div>
//           <div className="bg-[#1a213d] p-6 rounded-xl border border-gray-700">
//             <h3 className="text-lg font-semibold text-blue-400 mb-2">Utility Commands</h3>
//             <ul className="text-gray-300 text-sm space-y-2">
//               <li>🔹 <code>popp node start</code> — Run a local node</li>
//               <li>🔹 <code>popp node status</code> — Check node status</li>
//               <li>🔹 <code>popp config</code> — Manage CLI configuration</li>
//               <li>🔹 <code>popp help</code> — Show help menu</li>
//             </ul>
//           </div>
//         </div>
//       </section>

//       {/* Roadmap */}
//       <section className="bg-[#11172e] py-20 px-6">
//         <div className="max-w-5xl mx-auto text-center">
//           <h2 className="text-3xl font-bold text-white mb-6">🚀 Roadmap</h2>
//           <p className="text-gray-300 mb-8">
//             Upcoming CLI improvements to make PoPP even easier to use:
//           </p>
//           <ul className="text-gray-400 space-y-3 text-sm max-w-xl mx-auto text-left">
//             <li>🔮 Interactive mode with guided commands</li>
//             <li>📊 Built-in analytics for problem validation</li>
//             <li>🛡️ Enhanced security with PGP signing</li>
//             <li>⚡ CLI plugins for SDK and smart contracts</li>
//           </ul>
//         </div>
//       </section>
//     </div>
//   );
// }

// src/app/cli/page.tsx
"use client";

import { useState } from "react";
import { Terminal } from "lucide-react";

export default function CLIPage() {
  const [history, setHistory] = useState<string[]>([
    "Welcome to PoPP CLI Playground 🌌",
    "Type `help` to see available commands.",
  ]);
  const [input, setInput] = useState("");

  const commands: Record<string, string> = {
    help: "Available commands: help, version, submit-problem, stake, node status, clear",
    version: "PoPP CLI v1.2.3",
    "submit-problem":
      "Problem submitted successfully ✅ (id: prob-42)",
    stake: "Staked 500 POPP tokens to validator123 ⚡",
    "node status": "Node running on Testnet 🌍 — Block height: 105234",
    clear: "CLEAR",
  };

  const handleCommand = (cmd: string) => {
    const clean = cmd.trim();
    if (!clean) return;
    if (commands[clean]) {
      if (commands[clean] === "CLEAR") {
        setHistory([]);
      } else {
        setHistory((h) => [...h, `$ ${clean}`, commands[clean]]);
      }
    } else {
      setHistory((h) => [...h, `$ ${clean}`, `Unknown command: ${clean}`]);

    }
    setInput("");
  };


  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(text);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <main className="min-h-screen bg-[#030712] text-white">
      <div className="pt-16">
        {/* ─── Hero ─────────────────────────────────────────────────────── */}
        <section className="relative py-8 px-6 text-center overflow-hidden border-b border-white/10">
          <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-cyan-600/10 blur-3xl" />

          <motion.div initial={{ opacity: 0, y: -15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="relative z-10">
            <div className="flex items-center justify-center gap-2 mb-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-600/20 ring-1 ring-cyan-500/30">
                <Terminal className="h-5 w-5 text-cyan-400" />
              </div>
              <h1 className="text-3xl md:text-4xl font-extrabold">
                PoPP{" "}
                <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">CLI</span>
              </h1>
            </div>
            <p className="text-gray-400 max-w-2xl mx-auto text-base mb-4">
              Command-line interface for the Proof of Problem Protocol. Submit problems, validate, stake, and govern — all from your terminal.
            </p>
            <div className="flex justify-center gap-3">
              <a href="#install" className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 font-semibold text-sm flex items-center gap-1.5">
                <Download size={14} /> Install CLI
              </a>
              <Link href="/docs" className="px-5 py-2.5 rounded-lg bg-white/5 border border-white/15 hover:bg-white/10 transition font-semibold text-sm text-gray-300">
                Documentation
              </Link>
            </div>
          </motion.div>
        </section>

        {/* ─── Interactive Playground ─────────────────────────────────────── */}
        <section className="max-w-4xl mx-auto px-6 py-8">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2"><Terminal size={18} className="text-cyan-400" /> CLI Playground</h2>
          <p className="text-sm text-gray-400 mb-4">
            Try commands in the interactive terminal below. Type <code className="text-cyan-400">help</code> to see available commands.
          </p>

          <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
            {/* Terminal Header */}
            <div className="bg-white/[0.03] text-gray-500 px-4 py-2 text-xs flex items-center gap-2 border-b border-white/10">
              <span className="w-3 h-3 rounded-full bg-red-500/70"></span>
              <span className="w-3 h-3 rounded-full bg-yellow-500/70"></span>
              <span className="w-3 h-3 rounded-full bg-green-500/70"></span>
              <span className="mx-auto font-mono">popp-cli — bash</span>
            </div>

            {/* Terminal Body */}
            <div ref={terminalRef} className="p-4 h-72 overflow-y-auto font-mono text-sm space-y-0.5 bg-[#0a0f1a]">
              {history.map((line, i) => (
                <div key={i} className={`whitespace-pre-wrap ${line.startsWith("$") ? "text-emerald-400" : "text-gray-400"}`}>
                  {line}
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="flex items-center px-4 py-3 border-t border-white/10 bg-white/[0.03]">
              <span className="text-emerald-400 mr-2 font-mono text-sm">$</span>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleCommand(input)}
                placeholder="Type a command..."
                className="flex-1 bg-transparent outline-none text-gray-200 placeholder-gray-600 font-mono text-sm"
              />
            </div>
          </div>

          {/* Quick Commands */}
          <div className="flex flex-wrap gap-2 mt-3">
            {["help", "status", "query tickets", "query validators", "submit-problem"].map((cmd) => (
              <button key={cmd} onClick={() => handleCommand(cmd)}
                className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition text-xs font-mono text-gray-400 hover:text-white">
                {cmd}
              </button>
            ))}
          </div>
        </section>

        {/* ─── Installation ─────────────────────────────────────────────── */}
        <section id="install" className="bg-white/[0.03] border-y border-white/[0.06] py-8">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-xl font-bold mb-2 flex items-center gap-2"><Download size={18} className="text-cyan-400" /> Installation</h2>
            <p className="text-sm text-gray-400 mb-4">
              Install the PoPP CLI on your system with a single command.
            </p>

            <div className="space-y-3">
              {INSTALL_COMMANDS.map((item) => (
                <div key={item.platform} className="bg-white/5 border border-white/10 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-gray-300">{item.platform}</span>
                    <button onClick={() => handleCopy(item.command)}
                      className="p-1.5 rounded-md bg-white/10 hover:bg-white/20 transition text-gray-400 hover:text-white">
                      {copied === item.command ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                    </button>
                  </div>
                  <code className="text-sm text-emerald-400 font-mono block">{item.command}</code>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Quick Start ──────────────────────────────────────────────── */}
        <section className="max-w-4xl mx-auto px-6 py-8">
          <h2 className="text-xl font-bold mb-4">Quick Start</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {QUICK_START.map((item) => (
              <div key={item.step} className="bg-white/5 border border-white/10 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-600/20 ring-1 ring-cyan-500/30 text-xs font-bold text-cyan-400">
                    {item.step}
                  </span>
                  <h3 className="text-sm font-bold">{item.title}</h3>
                </div>
                <code className="text-xs text-emerald-400 font-mono block mb-1">{item.command}</code>
                <p className="text-xs text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ─── Command Reference ────────────────────────────────────────── */}
        <section className="max-w-4xl mx-auto px-6 py-8">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2"><BookOpen size={18} className="text-cyan-400" /> Command Reference</h2>
          <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
            <div className="grid grid-cols-12 gap-3 px-4 py-2.5 bg-white/[0.03] border-b border-white/10 text-xs font-semibold text-gray-400 uppercase tracking-wider">
              <div className="col-span-4">Command</div>
              <div className="col-span-8">Description</div>
            </div>
            {Object.entries(COMMANDS)
              .filter(([k]) => k !== "clear" && !k.includes(" "))
              .map(([cmd, data]) => (
                <div key={cmd} className="grid grid-cols-12 gap-3 px-4 py-2.5 border-b border-white/10 last:border-0 hover:bg-white/[0.02] transition">
                  <div className="col-span-4 font-mono text-sm text-cyan-400">{cmd}</div>
                  <div className="col-span-8 text-sm text-gray-400">{data.description}</div>
                </div>
              ))}
          </div>
        </section>

        {/* ─── CTA ──────────────────────────────────────────────────────── */}
        <section className="max-w-4xl mx-auto px-6 py-8">
          <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-xl p-6 text-center">
            <h2 className="text-xl font-bold mb-2">Ready to Use the CLI?</h2>
            <p className="text-gray-400 text-sm mb-4">Install PoPP CLI and start interacting with the network from your terminal.</p>
            <div className="flex flex-wrap gap-3 justify-center">
              <a href="#install"><button className="px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg text-sm font-semibold">Install Now</button></a>
              <Link href="/docs"><button className="px-5 py-2.5 bg-white/5 border border-white/15 hover:bg-white/10 rounded-lg text-sm font-semibold text-gray-300 transition">Read Docs</button></Link>
              <Link href="/sdk"><button className="px-5 py-2.5 bg-white/5 border border-white/15 hover:bg-white/10 rounded-lg text-sm font-semibold text-gray-300 transition">SDK</button></Link>
            </div>
          </motion.div>
        </section>
      </div>
    </main>
=======
  return (
    <div className="bg-[#0a0e23] text-gray-200 min-h-screen">
      {/* Hero */}
      <section className="relative py-20 px-6 bg-gradient-to-r from-blue-900/40 to-purple-900/30 text-center">
        <Terminal className="w-14 h-14 text-blue-400 mx-auto mb-6" />
        <h1 className="text-5xl font-extrabold text-white mb-6">
          PoPP <span className="text-blue-400">CLI</span>
        </h1>
        <p className="text-lg text-gray-300 max-w-3xl mx-auto">
          Experiment with the Proof of Problem Protocol CLI directly in your
          browser. Try commands, learn the workflow, and get comfortable with
          PoPP without installing anything.
        </p>
      </section>

      {/* Interactive Playground */}
      <section className="max-w-4xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-white mb-6">🎮 CLI Playground</h2>
        <div className="bg-black rounded-xl border border-gray-700 overflow-hidden shadow-xl">
          <div className="bg-gray-900 text-gray-400 px-4 py-2 text-sm flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-red-500"></span>
            <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
            <span className="w-3 h-3 rounded-full bg-green-500"></span>
            <span className="mx-auto">PoPP Terminal</span>
          </div>
          <div className="p-4 h-96 overflow-y-auto font-mono text-sm space-y-1">
            {history.map((line, i) => (
              <div key={i} className="whitespace-pre-wrap">
                {line}
              </div>
            ))}
          </div>
          <div className="flex items-center px-4 py-3 border-t border-gray-700 bg-gray-950">
            <span className="text-green-400 mr-2">$</span>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleCommand(input)}
              placeholder="Type a command..."
              className="flex-1 bg-transparent outline-none text-gray-200 placeholder-gray-600 font-mono text-sm"
            />
          </div>
        </div>
      </section>
    </div>

  );
}
