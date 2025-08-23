'use client';

import { useState } from 'react';
import Editor from '@monaco-editor/react'; // install: npm i @monaco-editor/react
import { Terminal } from 'lucide-react';

export default function SandboxTestnetPage() {
  const [code, setCode] = useState(`// Example: Request Test Tokens
fetch("https://testnet.popp.io/faucet", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ address: "your-wallet-address" })
})
  .then(res => res.json())
  .then(console.log)
  .catch(console.error);`);

  const [output, setOutput] = useState<string>("");

  const runCode = async () => {
    try {
      // Simulate response (replace with real API later)
      const response = {
        success: true,
        txHash: "0xA23B9C...",
        tokens: "100 PoPP-test",
        explorer: "https://testnet-explorer.popp.io/tx/0xA23B9C"
      };
      setOutput(JSON.stringify(response, null, 2));
    } catch (err: any) {
      setOutput(`Error: ${err.message}`);
    }
  };

  return (
    <div className="relative bg-gradient-to-b from-[#010519] via-[#0a0e23] to-[#010519] text-gray-200 min-h-screen">
      
      {/* Hero Section */}
      <section className="text-center py-24">
        <h1 className="text-5xl font-extrabold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          PoPP Sandbox & Testnet
        </h1>
        <p className="mt-6 max-w-2xl mx-auto text-lg text-gray-400">
          Experiment safely with PoPP APIs, validators, and smart workflows in our secure testnet.
        </p>
      </section>

      {/* Interactive Playground */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold text-white mb-6 text-center">
          Interactive Sandbox Playground
        </h2>
        <p className="text-center text-gray-400 mb-12">
          Write and run API calls directly against the PoPP Testnet.  
          Try faucet requests, block queries, and validator interactions.
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Code Editor */}
          <div className="bg-[#0f1629] border border-blue-500/30 rounded-xl shadow-xl overflow-hidden">
            <Editor
              height="400px"
              defaultLanguage="javascript"
              value={code}
              onChange={(val) => setCode(val || "")}
              theme="vs-dark"
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                fontFamily: "JetBrains Mono, monospace",
              }}
            />
            <div className="p-4 border-t border-blue-500/30 flex justify-end">
              <button
                onClick={runCode}
                className="bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-400 hover:to-blue-500 transition-colors px-6 py-2 rounded-lg text-white font-semibold"
              >
                ▶ Run
              </button>
            </div>
          </div>

          {/* Console Output */}
          <div className="bg-[#0a0e23] border border-purple-500/30 rounded-xl shadow-xl p-4">
            <div className="flex items-center gap-2 border-b border-purple-500/20 pb-2 mb-4">
              <Terminal className="w-5 h-5 text-purple-400" />
              <span className="text-sm text-gray-400">Console Output</span>
            </div>
            <pre className="text-green-400 text-sm whitespace-pre-wrap">
              {output || "// Run the code to see output here..."}
            </pre>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="text-center py-24 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-blue-500/10">
        <h2 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          Ready to Build?
        </h2>
        <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
          Join thousands of developers testing workflows, validators, and governance on PoPP Testnet.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <button className="bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-400 hover:to-blue-500 transition-colors px-8 py-4 text-lg rounded-xl text-white font-semibold">
            🚀 Start Testing
          </button>
          <button className="border border-blue-400/40 px-8 py-4 text-lg rounded-xl text-white hover:bg-blue-500/10 transition">
            📖 View Docs
          </button>
        </div>
      </section>
    </div>
  );
}
