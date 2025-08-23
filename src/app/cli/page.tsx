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
