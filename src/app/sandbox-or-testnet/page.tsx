'use client';

import { useState } from 'react';
import Editor from '@monaco-editor/react';
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
    <div className="bg-[#030712] text-white min-h-screen">
      <div className="pt-16">
        {/* Hero Section */}
        <section className="max-w-5xl mx-auto px-6 py-12 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              PoPP Sandbox & Testnet
            </span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Experiment safely with PoPP APIs, validators, and smart workflows in our secure testnet.
          </p>
        </section>

        {/* Interactive Playground */}
        <section className="max-w-5xl mx-auto px-6 py-8">
          <h2 className="text-2xl font-bold mb-4 text-center">Interactive Sandbox Playground</h2>
          <p className="text-center text-gray-400 mb-6">
            Write and run API calls directly against the PoPP Testnet.
          </p>

          <div className="grid md:grid-cols-2 gap-5">
            {/* Code Editor */}
            <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
              <Editor
                height="350px"
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
              <div className="p-3 border-t border-white/10 flex justify-end">
                <button
                  onClick={runCode}
                  className="bg-gradient-to-r from-cyan-500 to-blue-600 px-5 py-2 rounded-lg text-sm font-semibold"
                >
                  Run
                </button>
              </div>
            </div>

            {/* Console Output */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <div className="flex items-center gap-2 border-b border-white/10 pb-2 mb-3">
                <Terminal className="w-4 h-4 text-cyan-400" />
                <span className="text-sm text-gray-500">Console Output</span>
              </div>
              <pre className="text-green-400 text-sm whitespace-pre-wrap">
                {output || "// Run the code to see output here..."}
              </pre>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-white/[0.03] border-y border-white/[0.06] py-10 px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-extrabold mb-3">Ready to Build?</h2>
          <p className="text-gray-400 max-w-2xl mx-auto mb-6">
            Join thousands of developers testing workflows, validators, and governance on PoPP Testnet.
          </p>
          <div className="flex justify-center gap-3">
            <button className="bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-2.5 rounded-xl font-semibold">
              Start Testing
            </button>
            <button className="border border-white/10 bg-white/5 px-6 py-2.5 rounded-xl hover:bg-white/10 transition font-semibold">
              View Docs
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
