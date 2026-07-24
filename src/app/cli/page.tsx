// src/app/cli/page.tsx
"use client";

import { useState } from "react";
import { Terminal } from "lucide-react";

export default function CLIPage() {
  const [history, setHistory] = useState<string[]>([
    "Welcome to PoPP CLI Playground",
    "Type `help` to see available commands.",
  ]);
  const [input, setInput] = useState("");

  const commands: Record<string, string> = {
    help: "Available commands: help, version, submit-problem, stake, node status, clear",
    version: "PoPP CLI v1.2.3",
    "submit-problem": "Problem submitted successfully (id: prob-42)",
    stake: "Staked 500 POPP tokens to validator123",
    "node status": "Node running on Testnet — Block height: 105234",
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
    <div className="bg-[#030712] text-white min-h-screen">
      <div className="pt-16">
        {/* Hero */}
        <section className="max-w-5xl mx-auto px-6 py-12 text-center">
          <Terminal className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
          <h1 className="text-4xl font-extrabold mb-4">
            PoPP{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              CLI
            </span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Experiment with the Proof of Problem Protocol CLI directly in your
            browser. Try commands, learn the workflow, and get comfortable with
            PoPP without installing anything.
          </p>
        </section>

        {/* Interactive Playground */}
        <section className="max-w-4xl mx-auto px-6 py-8">
          <h2 className="text-2xl font-bold mb-4">CLI Playground</h2>
          <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
            <div className="bg-white/[0.03] text-gray-500 px-4 py-2 text-sm flex items-center gap-2 border-b border-white/10">
              <span className="w-3 h-3 rounded-full bg-red-500/70"></span>
              <span className="w-3 h-3 rounded-full bg-yellow-500/70"></span>
              <span className="w-3 h-3 rounded-full bg-green-500/70"></span>
              <span className="mx-auto">PoPP Terminal</span>
            </div>
            <div className="p-4 h-80 overflow-y-auto font-mono text-sm space-y-1">
              {history.map((line, i) => (
                <div key={i} className="whitespace-pre-wrap text-gray-400">
                  {line}
                </div>
              ))}
            </div>
            <div className="flex items-center px-4 py-3 border-t border-white/10 bg-white/[0.03]">
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
    </div>
  );
}
